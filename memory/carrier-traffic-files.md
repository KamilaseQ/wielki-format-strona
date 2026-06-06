---
name: carrier-traffic-files
description: Where the billboard traffic-estimate logic and data live
metadata:
  type: reference
---

Billboard ("nośniki") traffic-estimate feature lives in `src/features/carriers/`:

- `traffic-estimates.ts` — the whole estimation engine (`estimateCarrierTraffic`, road references, highway/size logic). Pure, runs at build time, O(n), no async.
- `data.ts` — `parseBillboardsXml`, `Carrier` type, `SEGMENT_DEFAULTS`, region-from-ZIP.
- `DetailPanel.tsx` / `ListPanel.tsx` — render `trafficEstimate` (the `~N poj./dobę` chip + "Potencjał ruchu" panel + method/source tooltip). DetailPanel also shows "Kontakty/mies." = trafficValue×30.
- `CarriersPage.tsx` — sort-by-traffic and map cluster averages use `trafficEstimate?.dailyVehicles ?? carrier.traffic`.
- Data source: `data/billboard_data_full.xml` (~1491 rows, **windows-1250** encoded), loaded by `xml-loader.ts`.

See [[carrier-traffic-estimation]] for the behavioural rules.
