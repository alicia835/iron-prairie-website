# Off-Page Entity Setup Guide — Iron Prairie Fabrication Group LLC

Complete these five platforms to unlock Map Pack, Apple Intelligence, Copilot, and local citation syndication. Website schema alone cannot replace them.

## Attribution URLs (required — paste exactly as website field)

| Platform | Website field (copy/paste) | Notes |
|----------|----------------------------|--------|
| **Google Business Profile** | `https://ironprairiefabrication.com/?utm_source=gbp&utm_medium=organic&utm_campaign=google_maps` | UTMs allowed. Alt: `/go/gbp` |
| **Apple Business Connect** | `https://ironprairiefabrication.com/go/apple` | **Apple rejects UTMs** (“without marketing parameters”). Clean path 302s to UTM homepage. |
| **Bing Places** | `https://ironprairiefabrication.com/?utm_source=bing_places&utm_medium=organic` | If Bing rejects UTMs, use `/go/bing` |

Source of truth: `src/config/siteConfig.ts` → `attributionUrls`. Redirects: `firebase.json` → `/go/apple`, `/go/gbp`, `/go/bing`.

### Verify after save
1. Open the public Maps / Places listing → click Website.
2. **Apple:** URL should be `/go/apple` (no `?utm_`). After click, browser lands on `/?utm_source=apple_maps&...`.
3. **GBP / Bing:** Landing URL includes matching `utm_source=` (or via `/go/*`).
4. In GA4 → Acquisition → Traffic acquisition, filter Session source for `gbp`, `apple_maps`, or `bing_places`.

---

## 1. Google Business Profile (≈10 min)
- Claim: https://business.google.com/
- Primary category: Metal Fabricator (or Welding Service if Fabricator unavailable)
- NAP must match site footer exactly:
  - Iron Prairie Fabrication Group LLC
  - 200 County Rd 170, Bay City, TX 77414
  - (979) 248-9266
- **Website:** paste the GBP attribution URL from the table above (do not use bare `ironprairiefabrication.com`)
- Cover photo: use `/og-banner.jpg`
- Add service areas: Bay City, Lake Jackson, Freeport, Angleton, Pearland, Houston, Matagorda County, Brazoria County
- Hours must match `siteConfig.hours` (site: Mon–Fri 7:00 AM–6:00 PM, Sat 8:00 AM–2:00 PM)

## 2. Apple Business Connect (≈5 min)
- Claim: https://businessconnect.apple.com/
- Powers Apple Maps, Siri, Spotlight, CarPlay
- Mirror the same NAP + hours as the website
- **Website:** paste `https://ironprairiefabrication.com/go/apple` (Apple blocks UTM query strings)

## 3. Bing Places (≈30 sec)
- https://www.bing.com/forbusiness
- One-click import from Google Business Profile (re-check website after import)
- **Website:** paste the Bing Places attribution URL from the table above
- Enables Bing Maps + Copilot AI citations

## 4. Nextdoor Business (≈5 min)
- https://nextdoor.com/create-business/
- Hyper-local neighbor recommendations in Matagorda / Brazoria ZIPs

## 5. Foursquare Places (≈5 min)
- https://foursquare.com/manage
- Syndicates location data to Uber, Snapchat, Waze, Samsung, and 100+ apps

## Measurement (Gate 100)
- [ ] Google Search Console domain verified + Generative AI performance monitored
- [ ] Bing Webmaster Tools imported + IndexNow key live (`53c078864d4b4fb2a69dfd5291244304.txt`)
- [ ] GBP / Apple / Bing website fields use attribution URLs (table above)
- [ ] CrUX mobile p75 LCP/INP/CLS in Good range
- [ ] Quarterly `robots.txt` crawler audit
