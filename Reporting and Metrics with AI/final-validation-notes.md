## What Was Verified

- UAT failure trend: 50 -> 70 -> 80 (confirmed from dataset).
- Flaky trend: 15 -> 22 -> 30 (confirmed progressive increase).
- Retry growth: 22 -> 30 -> 40 (aligned with instability).
- Execution time increase: 870 -> 920 ms (validated).
- Redis CPU alerts present only in UAT (85%, 90%).
- jwt_refresh_v2 flag enabled only in UAT runs.