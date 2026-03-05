## QA Summary – Regression Sprint 20

### Core Metrics

- Total tests: 100  
- Passed: 92  
- Failed: 8  
- Flaky: 3  

**Pass rate formula:**  
Pass rate = (Passed ÷ Total) × 100  
= (92 ÷ 100) × 100 = **92%**

**Fail rate formula:**  
Fail rate = (Failed ÷ Total) × 100  
= (8 ÷ 100) × 100 = **8%**

---

### Module Breakdown

| Module   | Passed | Failed | Total | Failure Rate % |
|----------|--------|--------|-------|----------------|
| Checkout | 20     | 4      | 24    | (4 ÷ 24) × 100 = 16.67% |
| Search   | 15     | 1      | 16    | (1 ÷ 16) × 100 = 6.25%  |
| Profile  | 25     | 0      | 25    | (0 ÷ 25) × 100 = 0%     |
| Orders   | 18     | 3      | 21    | (3 ÷ 21) × 100 = 14.29% |
| Login    | 14     | 0      | 14    | (0 ÷ 14) × 100 = 0%     |

### Top 2 Failing Modules

1. Checkout – 16.67%  
2. Orders – 14.29%

---

### Defect Breakdown

- Critical: 2  
- Major: 3  
- Minor: 4  
- Total defects: 9  

---

### ASCII Visualization – Overall Stability

Pass Rate (92%)
████████████████████████████████████████████████████████████████████████████████████████████

Fail Rate (8%)
████████

---

### Stability & Technical Risk

Overall stability is high (92% pass rate). However, failures are heavily concentrated in Checkout and Orders (7 of 8 failures = 87.5%). These modules appear most unstable and likely represent regression risk in transaction flows. Two critical defects increase release sensitivity. Flaky tests (3) suggest possible automation instability or intermittent functional issues.
