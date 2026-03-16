# Legacy Test Analysis — `tests/main.navigation.spec.ts`

**Scope:** Review against manual test case expectations: Docs, API, Community links are visible, accessible by role+name, and navigate correctly.
**Files reviewed:** `tests/main.navigation.spec.ts`, `src/pages/HomePage.ts`, `src/fixtures/testData.ts`
**Action:** No fixes applied. Analysis only.

---

## Prioritized Issues Checklist

### P1 — Critical (Immediate test failure or indeterminate results)

- [ ] **[SELECTOR] `docsNavLink` uses `locator('#docs')` — `HomePage.ts:8`**
  CSS ID selector `#docs` does not exist on playwright.dev. Every test that touches `getDocsNavLink()` or `clickDocs()` will fail with element not found. This includes both tests in the spec.
  _Fix category: Replace with `getByRole('link', { name: 'Docs' })`_

- [ ] **[SYNC] `page.waitForTimeout(2000)` in `beforeEach` — `spec:11`**
  Hardcoded 2-second pause applied before every test regardless of actual page state. Bypasses Playwright's auto-waiting mechanism. On slow networks it may still be insufficient; on fast machines it adds dead time to every run. Does not guarantee the page is ready — it just delays.
  _Fix category: Remove. Let state-based assertions (`toBeVisible`, `toHaveURL`) handle readiness._

---

### P2 — High (Accessibility and coverage gaps against manual test case)

- [ ] **[ACCESSIBILITY] No ARIA role validation for the Docs link — `spec:15–16`**
  `locator('#docs')` bypasses role checking entirely. `getByRole('link', { name: 'Docs' })` implicitly asserts role=link AND accessible name simultaneously. The API and Community locators correctly use `getByRole`; Docs is inconsistent and unvalidated.
  _Fix category: Align `docsNavLink` with `apiNavLink`/`communityNavLink` pattern._

- [ ] **[COVERAGE] Navigation to API and Community pages is not tested — `spec:24–30`**
  Test 2 only covers Docs → docs page. The manual test case requires verifying that all three navigation links open correct pages. Clicking API and Community and asserting destinations is entirely absent.
  _Fix category: Add tests or extend test 2 to cover API and Community click-throughs._

- [ ] **[COVERAGE] No accessible name assertion on the Docs link — `spec:16`**
  `toContainText('Docs')` on a `locator('#docs')` locator does not validate the accessible name of the element (computed from ARIA). For API and Community, `getByRole('link', { name: '...' })` embeds accessible name validation into the locator itself. Docs has no equivalent.
  _Fix category: Switch selector; accessible name check becomes implicit._

---

### P3 — Medium (Flakiness and maintenance cost)

- [ ] **[SYNC] Regex `/\/docs/` in `toHaveURL` is too broad — `spec:28`**
  `/\/docs/` matches any URL containing `/docs` as a substring — including `/api/docs`, `/docs-v2`, or `/undocs`. A more precise pattern like `/\/docs\/intro/` or an exact URL string reduces false positives.
  _Fix category: Tighten regex or use exact URL string._

- [ ] **[DUPLICATION] Each locator getter called twice per assertion pair — `spec:15–22`**
  ```
  await expect(await homePage.getDocsNavLink()).toBeVisible();
  await expect(await homePage.getDocsNavLink()).toContainText(...);
  ```
  The locator factory is invoked twice per link (six unnecessary extra calls total). While Playwright locators are lazy, the pattern increases verbosity and maintenance surface. If the locator logic changes, both lines must be updated.
  _Fix category: Assign to a `const` variable per link; call getter once._

- [ ] **[READABILITY] `let homePage: HomePage;` declared without initialisation — `spec:6`**
  In TypeScript strict mode this triggers a "used before being assigned" risk. The compiler infers it may be `undefined` inside tests, which suppresses meaningful type errors. Conventional pattern is `let homePage!: HomePage;`.
  _Fix category: Add definite assignment assertion (`!`)._

- [ ] **[FIXTURE] `docsPageHeading: 'Installation'` may be fragile — `testData.ts:6`**
  The string `'Installation'` could appear in multiple headings on the docs page. It also has no equivalent fixture entries for API or Community destination pages — inconsistent fixture coverage.
  _Fix category: Validate the heading is unique; add destination assertions for all three links in testData._

---

### P4 — Low (Code quality and dead code)

- [ ] **[DEAD CODE] `clickApi()`, `clickCommunity()`, `clickGetStarted()`, `getMainHeading()` are never called — `HomePage.ts:32–46`**
  Four methods exist in `HomePage.ts` with no test consuming them. Dead code increases cognitive load, misleads reviewers into assuming coverage exists, and inflates the class surface unnecessarily.
  _Fix category: Remove or add corresponding tests._

- [ ] **[READABILITY] Inconsistent `{ page }` destructuring between tests — `spec:14` vs `spec:25`**
  Test 1 uses `async ()` (no `page`), test 2 uses `async ({ page })`. While both compile, the inconsistency suggests test 1 may have been written before the `page` fixture was needed, implying incomplete test design.
  _Fix category: Standardise to `async ({ page })` or extract `page` from `homePage` if no direct access needed._

- [ ] **[ASSERTION] `toContainText` instead of `toHaveText` for nav labels — `spec:16,19,22`**
  `toContainText('Docs')` matches any element containing "Docs" as a substring (e.g. "Docs & API", "All Docs"). `toHaveText` enforces an exact match, which is more appropriate for discrete navigation labels.
  _Fix category: Replace `toContainText` with `toHaveText` for nav link label assertions._

---

## Issues an AI-only Review Is Likely to Miss

| Issue | Why AI may overlook it |
|---|---|
| `locator('#docs')` exists in the POM but tests still compile — AI sees no TypeScript error | Type system does not validate whether a selector resolves at runtime |
| `waitForTimeout(2000)` silently passes even when the page is broken — no assertion fails | AI may accept the test "passes" without checking whether the wait masks a real failure |
| `clickApi()` / `clickCommunity()` appear implemented — AI may assume coverage exists | Dead methods look like implemented behaviour unless cross-referenced with the spec |
| `toContainText('Docs')` on a `#docs` locator — the assertion is never actually evaluated | If locator fails first, the assertion error is hidden behind an element-not-found error, masking the real quality gap |
| `toHaveURL(/\/docs/)` passes even on redirect or error pages that contain `/docs` in path | Regex-based URL assertions require human judgment about specificity |
| Missing API and Community navigation tests — visible omission, not a code error | AI reviews code structure, not absence of tests against a documented manual checklist |

---

## Summary by Category

| Category | Count | Highest Severity |
|---|---|---|
| Selector quality | 3 | P1 |
| Synchronization | 2 | P1 |
| Accessibility | 2 | P2 |
| Coverage | 2 | P2 |
| Fixture quality | 1 | P3 |
| Duplication / readability | 3 | P3–P4 |
| Dead code | 1 | P4 |
| **Total** | **14** | |
