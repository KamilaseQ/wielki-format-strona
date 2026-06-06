---
name: carrier-traffic-estimation
description: How the billboard traffic-estimate system must behave (no underestimation, size matters, highway visibility)
metadata:
  type: project
---

The `nośniki` traffic estimator ([[carrier-traffic-files]]) is a client-facing selling point on /nosniki. Rules the user insists on:

- **No underestimations, no obvious disproportions between carriers.** Bias slightly HIGH — it's explicitly orientacyjne ("~", disclaimers in the tooltip), so over-estimating a bit is preferred over under-estimating.
- **Descriptions are often EMPTY/incomplete**, so estimation must not depend on description text alone. Billboard **size (width×height)** is a critical robust fallback signal and was previously unused. Big board ⇒ arterial/highway-grade location even with no description.
- **Highway visibility beats the road it physically stands on.** A board next to a small access road ("droga dojazdowa do A2", "zjazd z S17") that is **big enough to be seen from the highway** must use the HIGHWAY traffic, not the access road. Distinguish FRONTING ("przy/na trasie/widoczny z") vs PROXIMITY ("dojazd/zjazd/wjazd") — but escalate PROXIMITY to highway when the board is large.
- At intersections take MAX of the crossing roads plus a fraction of the second (sum-ish), never just the smaller road.
- **Calibrate to public reports** (GDDKiA GPR 2025/2020, ZDM Warszawa APR/ArcGIS). Keep source links honest in the tooltip.

**Why:** the estimator is a competitive feature for clients picking carriers; a visibly under-counted premium board (e.g. 80k road shown as 20k) destroys trust and undersells inventory.

**How to apply:** resolve the estimate as the MAX of independent candidates (address reference / highway corridor / local model / size floor), then clamp by a size-aware ceiling. ~74% of carriers are labelled "SUPER PREMIUM" so `type` is NOT a useful discriminator — prefer size.
