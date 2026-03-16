You are a Senior QA Automation Engineer.

Goal:
Implement a complete Checkout flow with clean Page Objects, components, and a reusable test.

Project:
- Folder: AI Test Code Generation
- Stack: TypeScript + Playwright
- Fixtures: reuse src/fixtures/testData.ts from Exercise 1
- Pages to create:
  - SearchPage: queryInput(), submit(), productResult(name)
  - ProductPage: addToCart(), title(), price()
  - CartPage: items(), proceedToCheckout()
  - CheckoutPage: total(), placeOrder()
- Component: Header: cartBadge()
- Test file: tests/e2e/checkout.spec.ts

DOM context (outerHTML):
<div data-testid="cart-summary">
  <span data-testid="cart-total">$100</span>
  <button data-testid="checkout-btn">Checkout</button>
</div>

Rules:
1) Use getters for all locators (getByTestId/getByRole/getByLabel); no raw page.locator in tests.
2) Follow Page Object / Component Object pattern: locators and actions live in classes, not in tests.
3) Reuse testData.ts for product info, totals, and prices when possible; avoid inline hardcoded values.
4) Assertions: use Playwright web-first assertions (toBeVisible, toHaveText, toHaveURL).
5) Keep code DRY: extract repeated logic into Page Object methods or helpers.
6) Ensure parallel-safe tests; no shared mutable state.
7) Test scenario must be structured by steps:
   - // Initialization
   - // User actions
   - // Verification
8) Do not hardcode waits or timeouts; rely on built-in waits.
9) Output final code only with file headers, e.g.:
   // path: src/pages/SearchPage.ts
   // path: src/pages/ProductPage.ts
   // path: src/pages/CartPage.ts
   // path: src/pages/CheckoutPage.ts
   // path: src/components/Header.ts
   // path: tests/e2e/checkout.spec.ts

Task:
1) Generate all Page Objects and component classes.
2) Implement the checkout.spec.ts scenario:
   - // Initialization: open search page
   - // User actions: search product, select it, add to cart
   - // Verification: cart badge increments
   - // User actions: proceed to checkout
   - // Verification: total matches expected
3) Keep logic, selectors, and flow consistent.
4) Make test readable and structured as a scenario, not a list of raw selectors.