# QA Metrics Summary – Release_2.5.1

## 1. Core Metrics

### Pass Rate
Formula: (passed ÷ totalTests) × 100  
Calculation: (108 ÷ 120) × 100 = 90%

Pass Rate = 90%

### Fail Rate
Formula: (failed ÷ totalTests) × 100  
Calculation: (12 ÷ 120) × 100 = 10%

Fail Rate = 10%

### Total Defect Density
Formula: defects ÷ totalTests  
Calculation: 9 ÷ 120 = 0.075

Total Defect Density = 0.075 defects per test (7.5%)

### Defect Density per Module (based on failures)

Login  
Total: 15, Failed: 0  
Failure Rate: (0 ÷ 15) × 100 = 0%

Checkout  
Total: 25, Failed: 5  
Failure Rate: (5 ÷ 25) × 100 = 20%

Search  
Total: 31, Failed: 1  
Failure Rate: (1 ÷ 31) × 100 ≈ 3.23%

Reports  
Total: 29, Failed: 4  
Failure Rate: (4 ÷ 29) × 100 ≈ 13.79%

---

## 2. Execution Analysis

- Average execution time: 1340 seconds (~22.3 minutes)
- Most unstable module: Checkout (20% failure rate)
- Second highest failure rate: Reports (~13.79%)
- Critical risk concentration: 3 critical defects (25% of total failures if mapped proportionally)

Checkout shows the highest instability and represents a revenue-sensitive area.

---

## 3. Risk & Improvement Analysis

### Areas Needing Immediate Attention
1. Checkout (highest failure rate: 20%)
2. Reports (second highest failure rate: ~13.8%)

### Warning Signals
- 10% overall failure rate is high for a regression suite.
- Presence of 3 critical defects increases release risk.
- Failures are concentrated in functional/business-critical modules.

### Prioritized Technical Focus
1. Fix Checkout module defects.
2. Investigate Reports instability.
3. Analyze root causes of critical defects.
4. Re-run targeted regression after fixes.

---

## 4. Management Summary

Release_2.5.1 shows a 90% pass rate with a 10% failure rate and 9 logged defects, including 3 critical issues. The highest risk lies in the Checkout module (20% failure rate), followed by Reports. Given the concentration of failures in business-critical functionality and the presence of critical defects, the release carries moderate-to-high risk. Immediate stabilization of Checkout and resolution of critical defects is recommended before production deployment.