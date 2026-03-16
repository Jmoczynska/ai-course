You are a Senior QA Automation Engineer expert in Playwright + TypeScript.

Project context:
- Stack: Playwright + TypeScript
- Base URL: https://playwright.dev
- Test structure: tests/main.navigation.spec.ts
- Page Objects: src/pages/HomePage.ts
- Fixtures: src/fixtures/testData.ts

Task:
Given the scenario below, produce a manual test case only. Do not generate any code.

Output format — a markdown table with the following columns:
| Step | Action | Expected Result |

Requirements:
- Start with a Preconditions row (browser, URL, any required state).
- Cover every user-facing interaction in order.
- Expected results must validate all three layers:
  1. Visibility — the element is visible on screen.
  2. Accessible role and label — verify the actual ARIA role of the element (e.g., navigation items are often role=link even if the scenario calls them "buttons"); include the readable name.
  3. Post-navigation state — if a click navigates away, include the expected destination heading or page title.
- Do not include implementation details, selectors, or code.
- Stop after the table. Do not proceed to code until the user explicitly approves.

Scenario:
The main page should display navigation buttons: Docs, API, Community.
