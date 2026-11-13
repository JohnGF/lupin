# LUPIN Presentation Materials Index

## 📊 Market Data & Sources (New - Nov 2026)

### Quick Access
| File | Purpose | Size | View |
|------|---------|------|------|
| **SOURCES.md** | Master reference for all market data, competitor financials, clinical evidence | 11K | [View](SOURCES.md) |
| **market_sources_appendix.html** | Standalone visual appendix deck with all sources | 19K | [Open in browser](market_sources_appendix.html) |
| **MARKET_DATA_SUMMARY.md** | Quick overview and integration guide | 11K | [View](MARKET_DATA_SUMMARY.md) |
| **README_MARKET_DATA.md** | Detailed integration guide, maintenance, best practices | 9.3K | [View](README_MARKET_DATA.md) |
| **early_pitch/market_data_slide.html** | Insertable market sizing slide for pitch decks | 4.9K | [View](early_pitch/market_data_slide.html) |

### Data Coverage
- ✅ BCI market sizing: $1.40B–$1.48B (2026)
- ✅ Neurorehab devices: $2.9B (2026)
- ✅ Rehab robots hardware: $580M–$598M (2026)
- ✅ Software layer growth: 23.88% CAGR
- ✅ Competitor financials: DIH/Hocoma, Tyromotion, Kinova, g.tec, Bionik
- ✅ Clinical benchmarks: BCI illiteracy (30–50%), stroke burden (93.8M)
- ✅ Regulatory precedent: IpsiHand FDA clearance + CMS codes

---

## 🎯 Existing Presentation Decks

### 1. Early Pitch (Embryonic/Pre-seed)
**Path:** `early_pitch/index.html`  
**Status:** ✅ Ready to integrate market data slide  
**Sections:**
1. Problem (BCI calibration slow, illiteracy blocks adoption)
2. Solution (LUPIN 2-class music imagery)
3. Architecture (spatial context, physiological gating, neural trigger)
4. Market — Dual Wedge (Independence 70%, Stroke Rehab 30%)
5. Go-to-Market (12-month roadmap)
6. The Ask ($150k seed, OEM partner, clinical site)

**Integration Point:** Insert `market_data_slide.html` after section 4 as "4b. Market Sizing & Growth"

---

### 2. Lupin Roadmap (Detailed Technical)
**Path:** `lupin_roadmap/index.html`  
**Status:** Comprehensive technical deck  
**Sections:**
1. Democratizing Neurorehabilitation via Context-Aware BCI
2. The Core Problem — Wearable BCI Failure
3. The Breakthrough: 2-Class Music Imagery
4. Why Music Imagery Works
5. Rigorous Validation (No Leaky Pipelines)
6. Strategic OEM Market Positioning

**Notable Content:**
- Pre-project discovery in nautilus_bci
- Data efficiency claims: 9.7–14 min active task data
- Multi-day LeaveOneGroupOut validation
- Prof. Mamede de Carvalho collaboration
- Kinova/Jaco OEM licensing strategy

---

### 3. Art Pitch
**Path:** `art_pitch/index.html`  
**Status:** Different project (campus marketplace)  
**Note:** Not LUPIN-related

---

## 📁 Directory Structure

```
decks/
├── SOURCES.md                          ← START HERE: Master reference
├── MARKET_DATA_SUMMARY.md              ← Quick overview (read second)
├── README_MARKET_DATA.md               ← Integration guide (read third)
├── INDEX.md                            ← This file
├── market_sources_appendix.html        ← Standalone visual appendix
│
├── early_pitch/
│   ├── index.html                      ← Main embryonic pitch deck
│   └── market_data_slide.html          ← NEW: Insertable market slide
│
├── lupin_roadmap/
│   └── index.html                      ← Technical roadmap deck
│
└── art_pitch/
    └── index.html                      ← Unrelated campus marketplace pitch
```

---

## 🚀 Quick Start Guides

### For Investors/Partners (Reading)
1. Open `market_sources_appendix.html` in browser (visual overview)
2. Reference `SOURCES.md` for detailed methodology
3. View `early_pitch/index.html` for business pitch
4. View `lupin_roadmap/index.html` for technical depth

### For Team Members (Integration)
1. Read `MARKET_DATA_SUMMARY.md` (5 min overview)
2. Read `README_MARKET_DATA.md` (integration guide)
3. Reference `SOURCES.md` when citing numbers
4. Update slides with `early_pitch/market_data_slide.html`

### For Due Diligence (Verification)
1. Check `SOURCES.md` for source reliability ratings
   - ✅ Audited = High confidence (SEC, M&A docs, peer-reviewed)
   - ⚠️ Estimate = Private intelligence (cite with caution)
2. Cross-reference claims to original sources
3. Note date of last update (currently Nov 2026)

---

## 📈 Key Numbers Quick Reference

### Market Sizing
| Metric | 2026 Value | 2030–35 Projection | CAGR | Source |
|--------|------------|-------------------|------|--------|
| BCI Market | $1.40B–$1.48B | $2.26B–$3.70B | 10.10% | Mordor, MRFR |
| Software Layer | (subset) | (subset) | **23.88%** | Mordor |
| Neurorehab Devices | $2.9B | $4.98B | 13.9% | Grand View |
| Rehab Robots HW | $580M–$598M | $1.03B–$1.95B | 15.2–16.4% | Fortune BI, Grand View |

### Competitors
| Company | Revenue | Reliability |
|---------|---------|------------|
| DIH/Hocoma | $62.9M (FY2025) | ✅ SEC 10-K |
| Tyromotion | €25M (~$27M, proj. 2026) | ✅ M&A docs |
| Kinova | $33M–$76M (est.) | ⚠️ Private |
| g.tec | $8M–$36M (est.) | ⚠️ Private |
| Bionik | $2.0M–$2.3M | ✅ OTC filing |

### Clinical
| Metric | Value | Source |
|--------|-------|--------|
| BCI Illiteracy | 30–50% | Allison & Neuper 2010; Vidaurre & Blankertz 2010 |
| Stroke Survivors | 93.8M globally | GBD 2021, Lancet Neurology |
| Unserved TAM | 28M–47M patients | (30–50% × 93.8M) |
| Cost Savings | $70k–$248k/patient | Health economics literature |
| FDA Precedent | IpsiHand De Novo | DEN200046, April 2021 |
| CMS Codes | E0738, E0739 | DME reimbursement |

---

## 🔄 Update Workflow

### Quarterly Review (Every 3 months)
1. Check DIH/Hocoma SEC filings: [EDGAR](https://www.sec.gov/cgi-bin/browse-edgar?company=dih+holding)
2. Review market intelligence: Mordor, MRFR, Grand View, Fortune BI
3. Update `SOURCES.md` with new figures
4. If >10% change, update `market_data_slide.html`
5. Commit: `git commit -m "Market data: Q[X] 2026 update"`

### Ad-Hoc Updates (As needed)
- M&A activity (e.g., Tyromotion sale finalizes)
- New FDA clearances in BCI space
- Major clinical trial results
- Significant competitor funding rounds

### Maintenance Checklist
- [ ] Last update date in SOURCES.md footer
- [ ] Source reliability badges accurate (✅/⚠️)
- [ ] Competitor revenue ranges updated if estimates changed >20%
- [ ] All hyperlinks to primary sources functional
- [ ] New intelligence platform reports incorporated

---

## 📧 Citation Templates

### Email/Slack (Quick)
```
BCI market: $1.48B growing 10.10% CAGR; software layer at 23.88% 
(Mordor 2026). 30–50% stroke patients fail standard BCI (Allison & 
Neuper 2010), creating 28M–47M TAM. Sources: decks/SOURCES.md
```

### Pitch Deck Footnote
```
Market: Mordor Intelligence, MRFR, Grand View (2026). Competitors: 
SEC filings, M&A docs, private estimates. Clinical: Allison & Neuper 
2010, GBD 2021. Full: decks/SOURCES.md
```

### Grant Application (Formal)
```
The global brain-computer interface market is estimated at $1.40B–$1.48B 
in 2026, with software/algorithm layers growing at 23.88% CAGR (Mordor 
Intelligence, 2026). However, 30–50% of stroke patients fail standard 
motor imagery protocols (Allison & Neuper, 2010; Vidaurre & Blankertz, 
2010), affecting 28–47M of the 93.8M global stroke survivors (GBD 2021 
Stroke Collaborators, Lancet Neurology, 2024). FDA precedent exists via 
Neurolutions' IpsiHand De Novo clearance (DEN200046, 2021) and CMS DME 
reimbursement codes (E0738/E0739).
```

---

## 🎨 Visual Presentation Options

### Option 1: Standalone Appendix
- Open `market_sources_appendix.html` in browser
- Use as backup slides or handout
- Beautiful color-coded source badges
- Interactive sections (overview, software growth, competitors, clinical)

### Option 2: Integrated Slide
- Copy `early_pitch/market_data_slide.html` into main deck
- Compact single-slide format
- Includes all key numbers + mini competitor table
- Styled to match existing deck (caixablue, emerald, tured colors)

### Option 3: Custom Extraction
- Use `SOURCES.md` as data source
- Build custom slides matching your deck's theme
- Reference reliability badges (✅/⚠️) for credibility
- Link to full sources in footnote

---

## ⚠️ Important Notes

### Source Reliability
- **Always specify source type** (audited vs. estimate)
- **Use ranges for private companies** (e.g., Kinova $33M–$76M)
- **Cite peer-reviewed sources** for clinical claims
- **Favor sources near M&A events** (e.g., Tyromotion)

### TAM Scoping
- **$580M–$600M:** Pure clinical rehab hardware (our comp set)
- **$4B–$11B:** Broad robotics (surgical, elderly, exoskeletons)
- **Always specify scope** to avoid overclaiming

### BCI Illiteracy
- **15–30%:** Healthy populations
- **30–50%:** Stroke/clinical populations
- **Always cite Allison & Neuper + Vidaurre & Blankertz**

---

## 📞 Support

**Questions about sources?**
- Check `README_MARKET_DATA.md` Q&A section
- Review `SOURCES.md` methodology notes
- Open an issue if primary source is missing

**Need to update data?**
- Follow workflow in `README_MARKET_DATA.md`
- Update `SOURCES.md` first, then slides
- Commit with descriptive message

**Want to contribute?**
- Add new intelligence reports to `SOURCES.md`
- Update competitor financials with source + date
- Improve citation templates in `README_MARKET_DATA.md`

---

## 📅 Document Status

**Created:** November 13, 2026  
**Last Updated:** November 13, 2026  
**Next Review:** February 2027 (quarterly)  
**Maintainer:** [Project Lead Name]

---

**Navigation:**
- 🏠 [Main README](../README.md)
- 📊 [Market Sources](SOURCES.md)
- 📝 [Quick Summary](MARKET_DATA_SUMMARY.md)
- 🛠️ [Integration Guide](README_MARKET_DATA.md)
- 🎯 [Early Pitch Deck](early_pitch/index.html)
- 🗺️ [Roadmap Deck](lupin_roadmap/index.html)
