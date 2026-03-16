You are a Senior QA Automation Engineer.

Goal:
Create reusable authentication test data fixtures.

Project:
- src/fixtures/testData.ts

Task:
Define two credential sets:
- validUser
- invalidUser

Structure example:
validUser:
  username
  password

invalidUser:
  username
  password

Rules:
- Export reusable objects
- Do not hardcode values inside tests
- Keep data simple and readable

Output:
Only final code block with header:
 // path: src/fixtures/testData.ts