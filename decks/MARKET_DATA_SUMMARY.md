# Market Data Integration - Summary

## What Was Added

Three comprehensive files have been created to integrate market sizing, competitive intelligence, and clinical evidence into LUPIN presentations:

### ✅ Files Created

1. **`SOURCES.md`** (7,500+ words)
   - Master reference document for all market data
   - Company financials with reliability ratings (✅ Audited / ⚠️ Estimate)
   - Clinical benchmarks (BCI illiteracy, stroke burden)
   - Citation templates for quick reference
   - **Use for:** Due diligence, grant writing, pitch prep

2. **`market_sources_appendix.html`**
   - Beautiful standalone HTML appendix deck
   - Interactive visualization of market data
   - Color-coded source reliability badges
   - Competitive landscape table
   - **Use for:** Investor meetings, as backup slides, sharing methodology

3. **`early_pitch/market_data_slide.html`**
   - Compact, insertable market sizing slide
   - Ready to drop into existing pitch decks
   - Includes TAM, growth rates, competitor revenue, clinical evidence
   - **Use for:** Quick pitch deck updates

4. **`README_MARKET_DATA.md`**
   - Integration guide and maintenance schedule
   - Citation best practices
   - Source update workflow
   - Common Q&A

---

## Key Data Points Now Documented

### Market Sizing
- **BCI Market 2026:** $1.40B–$1.48B → $2.26B–$3.70B by 2031–35 (10.10% CAGR)
- **Software/Algorithm Layer:** Growing at **23.88% CAGR** (2× hardware growth)
- **Neurorehab Devices:** $2.9B in 2026 → $4.98B by 2030 (13.9% CAGR)
- **Rehab Robots Hardware:** $580M–$598M in 2026 → $1.03B–$1.95B by 2030–34

### Competitive Landscape
| Company | Revenue | Source Reliability |
|---------|---------|-------------------|
| DIH/Hocoma | $62.9M (FY2025) | ✅ SEC 10-K |
| Tyromotion | €25M (~$27M proj. 2026) | ✅ M&A documents |
| Kinova | $33M–$76M (est.) | ⚠️ Private estimates |
| g.tec | $8M–$36M (est.) | ⚠️ Wide range |
| Bionik | $2.0M–$2.3M | ✅ OTC filing |

### Clinical Evidence
- **BCI Illiteracy:** 30–50% of stroke patients fail standard motor imagery
  - Sources: Allison & Neuper 2010; Vidaurre & Blankertz 2010
- **Stroke Burden:** 93.8M survivors globally (GBD 2021, Lancet Neurology)
- **Cost Savings:** $70k–$248k per patient enabled by home rehabilitation
- **FDA Precedent:** Neurolutions IpsiHand (De Novo DEN200046, April 2021) + CMS codes E0738/E0739

---

## How to Use

### Quick Start: Add Market Slide to Early Pitch
```bash
# 1. View the insertable slide
cat decks/early_pitch/market_data_slide.html

# 2. Copy its content into decks/early_pitch/index.html
#    Insert after the "Market — Dual Wedge" section (around line 91)

# 3. Adjust section numbering:
#    - Market/Wedge: Section 4
#    - NEW Market Sizing: Section 4b (or renumber to 5)
#    - Go-to-Market: Section 5 (or renumber to 6)
```

### View Standalone Appendix
```bash
# Open in browser
firefox decks/market_sources_appendix.html

# Or serve locally
cd decks
python -m http.server 8080
# Navigate to http://localhost:8080/market_sources_appendix.html
```

### Cite Sources in Documents
```markdown
<!-- For investor decks -->
"The global BCI market is estimated at $1.40B–$1.48B in 2026, with 
software layers growing at 23.88% CAGR (Mordor Intelligence, MRFR 2026)."

<!-- For grant applications -->
"30–50% of stroke patients fail standard BCI protocols (Allison & Neuper 
2010; Vidaurre & Blankertz 2010), representing 28–47M unserved patients 
among 93.8M global stroke survivors (GBD 2021, Lancet Neurology)."

<!-- For competitive analysis -->
"Market leader DIH/Hocoma generated $62.9M in FY2025 (SEC 10-K), while 
Tyromotion projects €25M for 2026 (M&A sale documents)."
```

---

## Source Reliability Framework

### ✅ High Confidence (Use freely in pitch materials)
- **DIH/Hocoma:** Audited SEC filings
- **Tyromotion:** M&A preparation documents (company actively for sale)
- **Bionik:** Public OTC market reports
- **Market sizing:** Major intelligence firms (Mordor, MRFR, Grand View, Fortune BI)
- **Clinical studies:** Peer-reviewed (Springer, Lancet Neurology, Brain Topography)
- **FDA/CMS:** Federal regulatory filings

### ⚠️ Estimates (Always cite as "estimated" with source)
- **Kinova:** Private company, wide range ($33M–$76M) across platforms
- **g.tec:** Private company, very wide range ($8M–$36M)
- **Why ranges exist:** Different B2B intelligence platforms use different methodologies
  - Exactitude: Historical baseline
  - RocketReach: Modeled 2026 run-rate
  - Growjo: Employee-count extrapolation

**Best practice:** Cite the range and specify "private estimates"

---

## Key Strategic Insights

### 1. Software Growing 2× Faster Than Hardware
**Finding:** Software/algorithm layer CAGR is 23.88% vs. 10.10% overall BCI hardware
**Source:** Mordor Intelligence, Aug 2026
**Implication for LUPIN:** 
- SaMD (Software as Medical Device) strategy aligns with fastest-growing segment
- Avoids manufacturing overhead
- Higher margins than hardware
- Can license to existing OEMs

### 2. BCI Illiteracy Creates Wedge Opportunity
**Finding:** 30–50% of stroke patients fail standard motor imagery protocols
**Sources:** Allison & Neuper 2010; Vidaurre & Blankertz 2010
**Implication for LUPIN:**
- 28M–47M underserved patients globally (30–50% of 93.8M stroke survivors)
- Music imagery approach bypasses motor imagery illiteracy
- "Zero-Fatigue Rescue" positioning for clinical wedge

### 3. Regulatory Pathway Established
**Finding:** Neurolutions received FDA De Novo + CMS reimbursement for non-invasive EEG stroke rehab
**Source:** FDA DEN200046 (April 2021), CMS HCPCS E0738/E0739
**Implication for LUPIN:**
- Precedent set for non-invasive EEG-based upper-extremity rehabilitation
- CMS willing to reimburse as home DME
- De Novo pathway proven (vs. more costly 510(k) or PMA)

### 4. Competitive Revenue Benchmarks
**Finding:** Market leader (DIH/Hocoma) at $62.9M; emerging players at $2M–$76M
**Implication for LUPIN:**
- Space for new entrants (not winner-take-all)
- OEM licensing model validated (Kinova $33M–$76M as potential partner)
- Tyromotion actively for sale (M&A activity signals investor interest)

---

## Citation Examples

### Investor Deck Footnote
```
Market: Mordor Intelligence, MRFR, Grand View Research (2026). 
Competitors: SEC filings (DIH, Bionik), M&A docs (Tyromotion), 
private estimates (Kinova, g.tec). Clinical: Allison & Neuper 
2010, GBD 2021. Full: decks/SOURCES.md
```

### Grant Application (Long Form)
```
The global brain-computer interface market is estimated at $1.40B–$1.48B 
in 2026, with software and algorithm layers growing at 23.88% CAGR—more 
than double the 10.10% overall market growth (Mordor Intelligence, 2026; 
Market Research Future, 2026). However, 30–50% of stroke patients cannot 
reliably generate motor imagery signals required by standard BCI protocols 
(Allison & Neuper, 2010; Vidaurre & Blankertz, 2010), creating a 
significant adoption barrier. With 93.8 million stroke survivors globally 
(GBD 2021 Stroke Collaborators, The Lancet Neurology, 2024), this "BCI 
illiteracy" affects an estimated 28–47 million potential beneficiaries.

The regulatory pathway for non-invasive EEG-based rehabilitation has been 
established through Neurolutions' IpsiHand, which received FDA De Novo 
clearance (DEN200046) in April 2021 and subsequent CMS DME reimbursement 
codes (HCPCS E0738/E0739). This precedent demonstrates both regulatory 
acceptance and payor willingness to reimburse for home-based BCI 
neurorehabilitation.
```

### Executive Summary (Bullet Points)
- **Market:** $1.48B BCI market growing 10.10% CAGR; software layer at 23.88% CAGR
- **Problem:** 30–50% BCI illiteracy affects 28M–47M stroke patients (Allison & Neuper 2010)
- **Competition:** Leader (DIH/Hocoma) $62.9M; OEM targets (Kinova) $33M–$76M
- **Regulatory:** FDA De Novo precedent (IpsiHand, 2021) + CMS DME reimbursement codes

---

## Maintenance Schedule

### Quarterly Review (Recommended)
- [ ] Check DIH/Hocoma earnings (SEC EDGAR)
- [ ] Review new market intelligence reports
- [ ] Update competitor estimates if changed >20%
- [ ] Check for new FDA clearances in BCI space

### Ad-Hoc Updates
- [ ] M&A activity (immediate update)
- [ ] New regulatory precedents
- [ ] Major clinical trial results

### Update Workflow
```
1. Find new data
2. Verify primary source
3. Update SOURCES.md with date + reliability rating
4. If material change (>10%), update market_data_slide.html
5. Commit: "Market data: [Source] updated [Metric]"
6. Notify team if TAM/competitive landscape shifts significantly
```

---

## Quick Reference

| Question | Answer | File |
|----------|--------|------|
| What's the BCI TAM? | $1.40B–$1.48B (2026) | SOURCES.md §1 |
| Software growth rate? | 23.88% CAGR | SOURCES.md §6 |
| BCI illiteracy rate? | 30–50% | SOURCES.md §3 |
| Hocoma revenue? | $62.9M (FY2025) | SOURCES.md §2 |
| Kinova revenue? | $33M–$76M (est.) | SOURCES.md §2 |
| FDA precedent? | IpsiHand DEN200046 | SOURCES.md §3 |
| Full methodology? | SOURCES.md | All sections |
| Visual appendix? | market_sources_appendix.html | Standalone deck |
| Quick slide insert? | early_pitch/market_data_slide.html | Copy into decks |

---

## Next Steps

### Immediate
1. ✅ Review `SOURCES.md` for accuracy
2. ✅ Open `market_sources_appendix.html` in browser to preview
3. ✅ Decide if `early_pitch/market_data_slide.html` should be integrated now

### Short-term (This Week)
- [ ] Add market data slide to early_pitch/index.html
- [ ] Update lupin_roadmap deck with key competitor benchmarks
- [ ] Share SOURCES.md with team for review

### Medium-term (Next Month)
- [ ] Set calendar reminders for quarterly source updates
- [ ] Build automated scraper for DIH/Hocoma SEC filings
- [ ] Subscribe to Mordor/MRFR/Grand View newsletters

### Long-term (Ongoing)
- [ ] Add new competitors as they emerge
- [ ] Track M&A activity in rehab robotics space
- [ ] Monitor CMS reimbursement policy changes

---

## File Structure

```
decks/
├── SOURCES.md                          ← Master reference (START HERE)
├── market_sources_appendix.html        ← Standalone visual appendix
├── README_MARKET_DATA.md               ← Integration guide
├── MARKET_DATA_SUMMARY.md              ← This file (quick overview)
└── early_pitch/
    ├── index.html                      ← Main pitch deck
    └── market_data_slide.html          ← Insertable market slide
```

---

**Document Status:** ✅ Complete and ready for use  
**Last Updated:** November 2026  
**Maintained by:** [Project Lead Name]  
**Questions?** See README_MARKET_DATA.md or open an issue
