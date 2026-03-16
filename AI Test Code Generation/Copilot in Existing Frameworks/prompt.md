### Assignment:

Imagine your project already has some Page Objects and Components. A new UI element has been introduced — for example, a toggle, checkbox, or dropdown. Your task is to use the prompt pattern provided earlier, adapt it to your own framework, and:

Extend an existing Page Object by adding a new method for this element.
Update one of your tests to interact with this element (e.g., enable the toggle, select a dropdown value).
Reuse existing files and patterns instead of creating duplicates.
Follow the same conventions already used in your project (locators inside classes, stable selectors, reusable methods).
Output code with // path: headers so it matches your repo structure.
Hints:

Use the reusable prompt pattern from the previous section, and replace placeholders with your own values.
If possible, provide the outerHTML of the new element so Copilot knows how to generate the locator.
Enforce your style: “methods must follow the same pattern as in other Page Objects.”
Ask for comments in the test: // Initialization, // User actions, // Verification.
Why this exercise matters:

Framework alignment: You learn how to keep AI-generated code consistent with your project’s existing standards.
Scalability: When UI changes, extending objects is cleaner than duplicating them.
Best practices: Explicit prompts reduce “hallucinations” and enforce DRY (Don’t Repeat Yourself).
Real-world workflow: In large regression suites, you rarely start from scratch — you adapt to what’s already in place.
Use the prompt pattern from the previous topic, run it in your environment, and review the generated output. Did Copilot extend the correct file? Did it match your coding style? If not, refine your prompt and try again until the result integrates seamlessly with your framework.

### prompt

You are a Senior QA Automation Engineer.

Goal:
Extend the existing Page Object `HolidaysRaiseRequestPage` by properly supporting the **Medical Certificate available** checkbox and update an existing sick-leave test to interact with it.

Context:
- Framework: Playwright + TypeScript
- Pattern: Page Object Model
- Reuse existing locators, controls, and utilities already used in the framework. Methods must follow the same pattern as in other Page Objects

UI element (outerHTML snippet provided):
<label class="request__sick-leave_checkbox__1HLAn" for="medicalCertificateAvailable">
  <input type="checkbox" name="medicalCertificateAvailable" id="medicalCertificateAvailable">
  <div class="Checkbox_label__O-SB1">Medical Certificate available</div>
</label>

Expected result:
- `HolidaysRaiseRequestPage` extended with a clean checkbox interaction method
- test updated to use the new Page Object method