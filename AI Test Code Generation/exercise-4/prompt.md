You are a Senior QA Automation Engineer.

Goal:
Update a single locator in an existing Page Object without touching other code.

Project:
- Folder: AI Test Code Generation
- Stack: TypeScript + Playwright
- File to fix: // path: src/pages/ProductPage.ts

Rules:
1) Update only the `addToCart()` locator using data-testid="add-to-cart-btn".
2) Keep all class, method names, signatures, and other code unchanged.
3) Use Page Object pattern: getters for locators (getByTestId/getByRole/getByLabel).
4) Do not add comments or modify unrelated code.

