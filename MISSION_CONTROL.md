## Mission Control – Iron Prairie Website

**Mode**: Method B ownership transfer — Firebase + GitHub **COMPLETE** (billing optional)  
**Goal**: Alicia = sole Owner on Firebase + GitHub; UDCS = Editor / Collaborator IT only. Do NOT touch completed GSC/GA4/GBP/DNS.

### Identity Lock
- **Corporate / IT**: `michael@universal-dynamic.com` / GitHub `Michaelh-UDCS`
- **Client Owner**: `alicia@ironprairiefabrication.com` / GitHub `alicia835`
- **Phase-out**: `michaelhuerta16@gmail.com` (must NOT be Owner on client assets)
- **Firebase**: `iron-prairie-website` (project number `786531503671`)
- **Domain**: https://ironprairiefabrication.com
- **CLI lock**: Firebase CLI + `gh` + git = UDCS ✓
- **Git remote**: `origin` → `https://github.com/alicia835/iron-prairie-website.git`

### Verified Live IDs (Locked — do not re-do)
| Asset | ID / Status |
|-------|-------------|
| GitHub | **`alicia835/iron-prairie-website`** (public) · Alicia **Owner** · UDCS **Collaborator** ✓ |
| Firebase | Project `iron-prairie-website` · **Alicia Owner** · **UDCS Editor** ✓ |
| GSC Domain | Alicia **Owner · Verified** · UDCS **Full** |
| GSC URL-prefix | Alicia **Owner · Verified** · UDCS **Full** |
| GA4 | Acc `385081454` · Prop `533579330` · `G-39362MRM5F` · UDCS access |
| GA4↔GSC | URL-prefix ↔ stream `iron-prairie-web` (`14388835911`) |
| GBP | CID `12180860875323553231` · UDCS manages (Verified) |
| Apple | Loc `1545151277392992454` · Org `996979639062` · **editable in Business Connect** (set website UTM) |
| Bing Places | BizID `c8b0d161-6b1a-4888-bbdc-f3e441146c56` · PIN in transit |

### Final Firebase IAM (Method B)
| Member | Role |
|--------|------|
| `alicia@ironprairiefabrication.com` | **Owner** |
| `michael@universal-dynamic.com` | **Editor** |

### Final GitHub (Method B) — COMPLETE for personal-account repo
| Party | Role |
|-------|------|
| `alicia835` | **Owner** of https://github.com/alicia835/iron-prairie-website ✓ |
| `Michaelh-UDCS` | **Collaborator** (push/pull) ✓ |

**Note:** Personal GitHub accounts only have Owner + Collaborator (no Admin dropdown). Collaborator is the max IT role. True Admin would require an Iron Prairie **Organization** (optional later). Local `origin` already points at Alicia’s repo.

**Billing note:** Firebase still **Blaze \| Free Trial** — Alicia should attach her Cloud billing when ready.

### Sprint plan status
#### Phase 2 — Firebase / GCP
- [x] Alicia Owner · UDCS Editor
- [ ] Billing → Alicia’s billing account

#### Phase 3 — GitHub
- [x] Alicia user `alicia835`
- [x] Empty mistaken repo deleted
- [x] Transfer completed → `alicia835/iron-prairie-website`
- [x] Local `origin` updated
- [x] UDCS = Collaborator (personal-repo max; no Admin role exists here)
- [ ] Confirm deploy path still works (optional smoke)

#### Phase 4 — Verify & Maintain Contributor Access
- [x] Firebase: Alicia Owner; UDCS Editor
- [x] GitHub: Alicia owns (`alicia835`); Michaelh-UDCS Authorized Collaborator (IT)
- [x] Contributor Git Access Verified: `Michaelh-UDCS` keyring active (`gh auth status`), `git fetch origin` success
- [x] Contributor Firebase Access Verified: `michael@universal-dynamic.com` Editor active on `iron-prairie-website` (`firebase projects:list`)
- [x] Site Logic & Config Sync: `siteConfig.ts`, `package.json`, `MEMORY.md`, `README.md` updated with Method B ownership and contributor roles
- [x] Live site serves (HTTP 200)
- [x] No personal Gmail as Owner on Firebase

### Already complete (do not re-do)
1. [x] Namecheap / GSC Domain + URL-prefix · Alicia Owner · UDCS Full
2. [x] Live HTML/meta GSC tokens removed and redeployed
3. [x] GA4 / GA4↔GSC / GBP / identity lock

### Optional follow-ups
- [ ] MFA on `michael@universal-dynamic.com` before Oct 20, 2026
- [ ] **Attribution fix (blocking clean Apple/Google Maps/Bing Places splits in GA4):**
  - [ ] GBP website → `attributionUrls.gbp` (live Maps still has bare domain as of 2026-09-10)
  - [ ] Apple website → `https://ironprairiefabrication.com/go/apple` (Apple rejects UTMs; needs Hosting redirect deploy)
  - [ ] Bing Places PIN complete + website → `attributionUrls.bingPlaces` (or `/go/bing` if UTMs blocked)
- [ ] GA4: strip personal / Alicia as primary owner if desired
- [ ] (Optional) Move repo to an Iron Prairie GitHub Org for granular Admin roles
- [ ] Firebase billing → Alicia’s Cloud billing account

### Session log
- **2026-09-05 Phase 2**: Firebase Method B complete (Alicia Owner · UDCS Editor).
- **2026-09-05 Phase 3**: Repo transferred to **`alicia835/iron-prairie-website`**. Local origin updated. Personal-account repos have no Collaborator Admin role — UDCS **Collaborator** is correct Method B IT end-state.
- **2026-09-05 Phase 4**: Contributor access verified & site logic updated. Confirmed `Michaelh-UDCS` active GitHub collaborator access and `michael@universal-dynamic.com` active Firebase Editor access. Synchronized `siteConfig.ts`, `package.json`, `MEMORY.md`, and project documentation.
