You are a Senior QA Automation Engineer.

Goal:
Fix a single method in ResultsPage to handle edge cases safely without rewriting the class.

Project:
- Folder: AI Test Code Generation
- Stack: TypeScript + Playwright
- File to fix: // path: src/pages/ResultsPage.ts

Current code:
// buggy method
async getAllPrices(): Promise<number[]> {
  const count = await this.items().count();
  const prices: number[] = [];

  for (let index = 0; index < count; index += 1) {
    const rawPrice = await this.priceOf(index).innerText();
    const normalized = Number(rawPrice.replace(/[^\d.]/g, ''));
    prices.push(normalized);
  }

  return prices;
}

Problem:
Method throws if `priceOf(index)` returns null or if the innerText cannot be converted to a number.

Fix:
1) Add null/undefined guard for rawPrice.
2) Skip or treat non-parsable text as 0.
3) Keep the rest of the method unchanged.
4) Do not modify other class methods or signatures.