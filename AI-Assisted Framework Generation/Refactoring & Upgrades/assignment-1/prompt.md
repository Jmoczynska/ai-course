### Assignment 1 — Merge Repetitive Methods
Goal: Identify similar methods in one Page Object and merge them into a parameterized method.

Steps:
1. Choose one Page Object class with several similar methods.
2. Run the “Merging Similar Methods” prompt.
3. Compare before/after results and run tests to confirm functionality.

Expected result: Cleaner code, one method replacing multiple duplicates.


### prompt

You are a Senior QA Automation Engineer.
Refactor redundant filtering methods in DeskBookingAdminPage.ts by merging similar logic into one reusable, parameterized method - without changing behavior.

Context:
- Stack: TypeScript + Playwright
- Pattern: Page Object Model
- File to refactor: DeskBookingAdminPage.ts
- Framework already working — tests must remain 100% stable

Problem:
The following methods contain duplicated logic:
- filterRoomsByOffice(roomOffice: string)
- filterRoomsByFloor(roomFloor: number)
- filterRoomsByNumber(roomNumber: number)
- filterRoomsByType(roomType: string)

Task:
1. Replace the duplicated filtering methods with ONE generic method, for example:
   async filterRoomsBy(
       dropdown: DropdownAntControl,
       value: string | number
   )
2. Reuse existing private dropdown getters
3. Update existing filter methods to delegate to the new generic method
4. Keep:
   - selectors unchanged
   - locators unchanged
   - naming conventions consistent
   - class structure intact
   - logic and test results identical

6. Output ONLY modified files.
Use headers in the format:
// path: <relative_path>

If a file was refactored but original version should remain for review,
move the refactored version to:

refactored/DeskBookingAdminPage.ts

and leave the original unchanged.

Expected Result:
- Reduced duplication
- One reusable filtering method
