# Suite Maintenance Summary

**Scope:** All spec files in `tests/`
**Files reviewed:** `main.navigation.spec.ts`, `main.navigation.refactored.spec.ts`, `main.navigation.professional.spec.ts`

---

## Spec Inventory

| File | Status | Purpose |
|---|---|---|
| `main.navigation.spec.ts` | ⚠️ Degraded — exercise artifact | Intentionally broken version used for Chapter 2 regression exercise |
| `main.navigation.refactored.spec.ts` | ⚠️ Superseded | AI-refactored version; all scenarios exist in professional spec with improvements |
| `main.navigation.professional.spec.ts` | ✅ Canonical | Fully reviewed, traced, structured, and passing |

---

## Issues Found

### `main.navigation.spec.ts` — Degraded (exercise artifact)

| Issue | Location | Type |
|---|---|---|
| `page.waitForTimeout(2000)` | `beforeEach:11` | Broken sync |
| `await homePage.getDocsNavLink()` — unnecessary await on a `Locator` | `spec:15–16` | Obsolete pattern |
| `toContainText` instead of `toHaveText` | `spec:16,19,22` | Weak assertion |
| `toHaveURL(/\/docs/)` — regex too broad | `spec:28` | Weak assertion |
| Relative imports `../src/pages/` | `spec:2–3` | Obsolete — aliases available |
| `let homePage: HomePage` without `!` | `spec:6` | TypeScript strict violation |
| Missing API and Community navigation tests | — | Coverage gap |
| All tests duplicated in professional spec with higher quality | — | Full redundancy |

### `main.navigation.refactored.spec.ts` — Superseded

| Issue | Location | Type |
|---|---|---|
| TC-NAV-001 duplicates professional spec visibility test | `spec:13` | Redundant scenario |
| TC-NAV-002 duplicates professional spec Docs routing test | `spec:28` | Redundant scenario |
| TC-NAV-003/004 duplicate professional routing tests, weakly (URL only) | `spec:35,41` | Redundant + weaker |
| No TC IDs — not traceable | all tests | Traceability gap |
| Flat `describe` structure | all tests | Readability gap |
| API/Community tests assert URL only — no heading/content check | `spec:35–45` | Weaker than professional |
| No edge case | — | Coverage gap |

---

## Redundancy Map

| Scenario | degraded | refactored | professional |
|---|---|---|---|
| All 3 links visible + correct labels | ✅ (broken) | ✅ | ✅ TC-NAV-001 |
| Docs link → `/docs/intro` + heading | ✅ (broken) | ✅ | ✅ TC-NAV-002 |
| API link → `/docs/api` | ❌ missing | ✅ (URL only) | ✅ TC-NAV-003 |
| Community link → `/community` | ❌ missing | ✅ (URL only) | ✅ TC-NAV-004 |
| Back navigation edge case | ❌ | ❌ | ✅ TC-NAV-005 |

The professional spec is a strict superset of both other files.

---

## Consolidation Plan

1. **Delete `main.navigation.spec.ts`** — exercise artifact; broken patterns (`waitForTimeout`, weak assertions, partial coverage); fully superseded.
2. **Delete `main.navigation.refactored.spec.ts`** — intermediate version; every scenario exists in the professional spec with better structure, TC IDs, and stronger assertions.
3. **Retain `main.navigation.professional.spec.ts`** as the single canonical spec.

Result: 1 file, 5 traced tests, 0 redundant scenarios.

---

## Diff — Recommended Cleanup of `main.navigation.refactored.spec.ts`

The diff shows how the refactored spec should be retired in favour of the professional spec. The key changes making the refactored version redundant:

```diff
--- a/tests/main.navigation.refactored.spec.ts
+++ b/tests/main.navigation.professional.spec.ts
@@ -5,38 +5,52 @@
 test.describe('Main page navigation', () => {
   let homePage!: HomePage;

   test.beforeEach(async ({ page }) => {
     homePage = new HomePage(page);
     await homePage.navigate();
   });

-  test('should display Docs, API and Community links with correct labels', async () => {
+  test.describe('Link visibility and labels', () => {
+  test('TC-NAV-001: all navigation links are visible with correct labels', async () => {
     const docsLink = homePage.getDocsNavLink();
     const apiLink = homePage.getApiNavLink();
     const communityLink = homePage.getCommunityNavLink();
     await expect(docsLink).toBeVisible();
     await expect(docsLink).toHaveText(testData.navigation.docs);
     await expect(apiLink).toBeVisible();
     await expect(apiLink).toHaveText(testData.navigation.api);
     await expect(communityLink).toBeVisible();
     await expect(communityLink).toHaveText(testData.navigation.community);
-  });
+  }); });

-  test('should navigate to the Docs page when the Docs link is clicked', async ({ page }) => {
+  test.describe('Link routing', () => {
+  test('TC-NAV-002: Docs link navigates to the installation guide', async ({ page }) => {
     await homePage.clickDocs();
     await expect(page).toHaveURL(testData.urls.docs);
     await expect(page.getByRole('heading', { name: testData.navigation.docsPageHeading })).toBeVisible();
-  });
+  });

-  test('should navigate to the API page when the API link is clicked', async ({ page }) => {
+  test('TC-NAV-003: API link navigates to the API reference', async ({ page }) => {
     await homePage.clickApi();
     await expect(page).toHaveURL(testData.urls.api);
-  });
+  await expect(page.getByRole('heading').first()).toBeVisible();
+  });

-  test('should navigate to the Community page when the Community link is clicked', async ({ page }) => {
+  test('TC-NAV-004: Community link navigates to the Community page', async ({ page }) => {
     await homePage.clickCommunity();
     await expect(page).toHaveURL(testData.urls.community);
-  });
+  await expect(page.getByRole('heading').first()).toBeVisible();
+  }); });

+  test.describe('Edge cases', () => {
+  test('TC-NAV-005: navigation links are still visible after browser back navigation', async ({ page }) => {
+    await homePage.clickDocs();
+    await expect(page).toHaveURL(testData.urls.docs);
+    await page.goBack();
+    await expect(homePage.getMainHeading()).toBeVisible();
+    await expect(homePage.getDocsNavLink()).toBeVisible();
+    await expect(homePage.getApiNavLink()).toBeVisible();
+    await expect(homePage.getCommunityNavLink()).toBeVisible();
+  }); });
 });
```

---

## Final State After Consolidation

```
tests/
└── main.navigation.professional.spec.ts   ← only file retained
```

**5 tests, 0 redundant scenarios, fully traced, all passing.**

---

## Selective Refactoring — `main.navigation.refactored.spec.ts`

File was restored for review. Only readability and duplication improvements were applied. Coverage additions (heading assertions for API/Community, edge case TC-NAV-005) were deferred.

### Changes approved

| Change | Before | After |
|---|---|---|
| Test names | Verbose (`should navigate to...`) | TC-ID prefixed (`TC-NAV-002: Docs link...`) |
| `describe` structure | Flat — all 4 tests in one block | Nested — `Link visibility and labels` / `Link routing` |

### Changes deferred (kept in professional spec only)

| Change | Reason deferred |
|---|---|
| Heading assertions for API/Community | Coverage addition, not readability |
| TC-NAV-005 back navigation edge case | New scenario, out of scope |

### Before / After

| Metric | Before | After |
|---|---|---|
| TC IDs | None | TC-NAV-001–004 |
| `describe` groups | 1 (flat) | 2 (nested) |
| Tests | 4 | 4 |
| Assertions | Same | Same |

**Current state:** 2 files in `tests/` — `refactored` under review, `professional` canonical.
