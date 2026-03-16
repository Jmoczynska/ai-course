# Refactoring Summary — Main Page Navigation Test

## Three Versions Compared

### Version 1 — Degraded (`tests/main.navigation.spec.ts`)

| Issue | Detail |
|---|---|
| Brittle selector | `locator('#docs')` — ID does not exist on playwright.dev; both tests fail immediately |
| Fixed wait | `page.waitForTimeout(2000)` in `beforeEach` — adds 2s per test, masks real failures |
| Accessor anti-pattern | `async getDocsNavLink()` returns `Promise<Locator>`, forcing unnecessary `await` at call sites |
| Weak assertions | `toContainText` allows substring matches; `toHaveURL(/\/docs/)` regex too broad |
| Duplicated locator calls | Each locator getter called twice per assertion pair |

---

### Version 2 — AI-Refactored (`tests/main.navigation.refactored.spec.ts`)

| Fix | Detail |
|---|---|
| Selector restored | `getByRole('link', { name: 'Docs' })` — role + accessible name validated |
| Fixed wait removed | `beforeEach` relies on Playwright's auto-waiting via assertions |
| Assertions strengthened | `toHaveText` (exact), `toHaveURL` with specific patterns (`/\/docs\/intro/`, `/\/docs\/api/`, `/\/community/`) |
| Locators assigned to `const` | Each locator fetched once per test, reused across assertions |
| Coverage added | Navigation tests for Docs, API, and Community destinations |
| Path aliases used | `@pages/HomePage`, `@fixtures/testData` |
| Definite assignment | `let homePage!: HomePage` |

---

### Version 3 — Manually Improved (`src/pages/HomePage.ts`)

Human review identified and fixed the anti-pattern AI missed:

| Fix | Before | After |
|---|---|---|
| Getter return type | `async getDocsNavLink(): Promise<Locator>` | `getDocsNavLink(): Locator` |
| Same for API, Community, MainHeading | `async` on all four getters | All four synchronous |
| Call sites in spec | `await homePage.getDocsNavLink()` | `homePage.getDocsNavLink()` |

---

## Key Takeaway

| Capability | AI | Human |
|---|---|---|
| Catch planted regressions | ✅ | ✅ |
| Fix selector and assertion quality | ✅ | ✅ |
| Detect absence of tests | ✅ (with checklist) | ✅ |
| Spot structural anti-patterns in POM design | ❌ | ✅ |
| Recognise unnecessary `async` on sync methods | ❌ | ✅ |

