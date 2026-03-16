You are a Senior QA Automation Engineer.

Goal:
Implement a Search flow with filters, exposing collection-based helper methods and a reusable test.

Project:
- Folder: AI Test Code Generation
- Stack: TypeScript + Playwright
- Pages to create:
  - SearchPage: queryInput(), submit(), applyFilter(filterName)
  - ResultsPage: items(), titleOf(index), priceOf(index)
- Test file: tests/e2e/search.spec.ts

DOM context (outerHTML):
<div role="list" data-testid="results">
  <div data-testid="result-item">
    <span class="title">Laptop</span>
    <span class="price">$999</span>
  </div>
</div>

Rules:
1) Use getters for all locators (getByTestId/getByRole/getByLabel); no raw page.locator in tests.
2) Follow Page Object pattern: locators and actions live in classes, not in tests.
3) Expose collection-based helpers in ResultsPage (e.g., getAllPrices()).
4) Assertions: use Playwright web-first assertions (toBeVisible, toHaveText, toHaveURL).
5) Keep code DRY: extract repeated logic into Page Object methods or helpers.
6) Ensure parallel-safe tests; no shared mutable state.
7) Test scenario must be structured as steps: Initialization → User actions → Verification.
8) Do not hardcode waits or timeouts; rely on built-in waits.
9) Do not include extra comments in generated files.
10) Output final code only with file headers, e.g.:
   // path: src/pages/SearchPage.ts
   // path: src/pages/ResultsPage.ts
   // path: tests/e2e/search.spec.ts

Task:
1) Generate all Page Objects with methods listed above.
2) Implement search.spec.ts scenario:
   - Initialization: open search page
   - User actions: type "Laptop", apply filter "Price < $1000"
   - Verification: each result price < 1000
3) Ensure ResultsPage helpers loop through all items; assert conditions dynamically.
4) Keep test readable and structured as a scenario, not a list of raw selectors.