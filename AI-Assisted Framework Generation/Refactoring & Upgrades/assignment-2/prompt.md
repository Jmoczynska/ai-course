### Assignment 2 — Refactor Test Steps
Goal: Move repeated test steps into shared helper methods.
Steps:
Find repeated sequences in your tests.
Run the “Extract Common Steps” prompt.
Validate by running test suite to ensure same results.
Expected result: Reduced duplication and improved readability.

### prompt

You are a Senior QA Automation Engineer.

Extract repeated step sequences from adc-is-able-to-*.spec.ts tests into reusable Page Object or helper methods.

Context:
- TypeScript + Playwright
- Page Object Model
- Stable framework — no regressions allowed

Task:
1. Identify duplicated flows across test files.
2. Move them into existing Page Objects (preferred) or a shared helper file.
3. Replace inline duplicated steps with calls to the new methods.
