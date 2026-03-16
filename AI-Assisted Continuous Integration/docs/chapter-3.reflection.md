# Chapter 3 Reflection

**Which fixes did AI handle effectively?**
- Selector fix (#docs -> getByRole) and removing waitForTimeout.
- Assertion improvements:toHaveText, specific toHaveURL patterns, added missing navigation tests.

**Which improvements required your judgment?**
- Removing async from getter methods — code compiled, so AI missed it.
- Path aliases - AI used relative imports until I checked tsconfig.json.

**What patterns to instruct AI next time?**
- Locator getters must be synchronous - never async
- Read tsconfig.json first, use path aliases