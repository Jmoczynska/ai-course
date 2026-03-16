You are a Senior QA Automation Engineer expert in TypeScript and Playwright.

Goal:
Generate a minimal Playwright E2E project for an authentication flow.

Project requirements:
- Stack: TypeScript + Playwright
- Pattern: Page Object Model
- Root folder: AI Test Code Generation

Project structure to generate:
AI Test Code Generation/
  playwright.config.ts
  package.json
  src/pages/AuthPage.ts
  src/pages/HomePage.ts
  src/fixtures/testData.ts
  tests/e2e/auth.spec.ts

Selectors:
Prefer getByTestId / getByLabel / getByRole.

DOM context:
<form>
  <label for="username">Username</label>
  <input id="username" data-testid="username-input" />
  <label for="password">Password</label>
  <input id="password" data-testid="password-input" type="password" />
  <button type="submit" data-testid="login-btn">Sign in</button>
</form>

Tasks:

1) Generate project setup
- package.json with Playwright dependencies
- playwright.config.ts with basic config

2) Create Page Objects
AuthPage methods:
- open()
- username()
- password()
- submit()
- errorMessage()
- login(user, pass)

HomePage methods:
- avatar()

3) Create reusable test data
- validUser
- invalidUser

4) Create test:
tests/e2e/auth.spec.ts

Test flow:
Positive login
- // Initialization: open login
- // User actions: enter valid credentials
- // Verification: avatar visible

Negative login
- // Initialization: open login
- // User actions: invalid credentials
- // Verification: error message visible

Rules:
- Locators only in Page Objects
- Use getByTestId/getByLabel/getByRole
- Use Playwright fixtures (test, expect)
- No hardcoded waits
- Reusable and readable code
- Do not 

Output:
Return only final code blocks with headers:
 // path: <relative_path>