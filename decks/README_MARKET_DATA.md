# Market Data Integration Guide

## Overview
This directory contains comprehensive market sizing, competitive intelligence, and clinical evidence sources for LUPIN pitch materials.

## Files Created

### 1. `SOURCES.md` (Master Reference Document)
**Purpose:** Central repository for all market data sources, competitor financials, and clinical evidence.

**When to use:**
- Preparing investor pitch decks
- Writing grant applications
- Responding to due diligence questions
- Updating market slides with latest data

**Key Sections:**
- Macro market sizing (BCI, neurorehab, rehab robots)
- Company financial data with reliability ratings
- Clinical & health-economic benchmarks
- Citation templates for quick reference

### 2. `market_sources_appendix.html` (Standalone Appendix Deck)
**Purpose:** Beautiful, standalone HTML presentation of all market data and sources.

**When to use:**
- As appendix slides for formal pitch decks
- For investor due diligence meetings
- To share sourcing methodology with partners
- As a reference during Q&A sessions

**How to view:**
```bash
# Open in browser
firefox decks/market_sources_appendix.html

# Or use Python server
cd decks
python -m http.server 8080
# Then navigate to http://localhost:8080/market_sources_appendix.html
```

### 3. `early_pitch/market_data_slide.html` (Insertable Slide)
**Purpose:** Compact market sizing slide ready to insert into existing presentations.

**How to integrate into `early_pitch/index.html`:**

1. Open `decks/early_pitch/index.html`
2. Find the section `<!-- 4. Market / Wedge -->`
3. After that section (around line 91), insert:
   ```html
   <!-- Include market data slide -->
   <?php include 'market_data_slide.html'; ?>
   ```
   OR copy-paste the entire content of `market_data_slide.html`

4. Adjust section numbering:
   - Current Market/Wedge is section 4
   - New Market Sizing becomes section 4b (or renumber as 5)
   - Adjust subsequent sections accordingly

## Data Reliability Framework

### ✅ High Confidence
- **DIH/Hocoma:** Audited SEC 10-K filings
- **Tyromotion:** M&A sale preparation documents
- **Bionik:** Public OTC market filings
- **Clinical studies:** Peer-reviewed publications in major journals

### ⚠️ Estimates (Use with Caution)
- **Kinova:** Wide range ($33M–$76M) across intelligence platforms
- **g.tec:** Very wide range ($8M–$36M); favor lower Austrian registry figures
- **Market sizing:** Different methodologies across firms (always cite source)

## Citation Best Practices

### For Investor Decks
Always specify source type:
- ✅ "DIH/Hocoma: $62.9M (SEC 10-K, 2025)"
- ✅ "Tyromotion: €25M projected (M&A documents, 2026)"
- ⚠️ "Kinova: $33M–$76M estimated (private intelligence platforms)"

### For Grant Applications
Use peer-reviewed sources when possible:
- ✅ "30–50% BCI illiteracy rate (Allison & Neuper 2010, Springer)"
- ✅ "93.8M stroke survivors globally (GBD 2021, Lancet Neurology)"

### For Internal Strategy
Can use broader estimates but document assumptions:
- "TAM calculation based on $1.48B BCI market (MRFR 2026) × 23.88% software CAGR"

## Quick Integration Checklist

### Adding to Early Pitch Deck
- [ ] Review `SOURCES.md` for latest figures
- [ ] Copy `early_pitch/market_data_slide.html` content
- [ ] Insert after Market/Wedge section in `index.html`
- [ ] Adjust section numbering (4 → 4a/4b or renumber to 5)
- [ ] Update navigation if deck has table of contents
- [ ] Test in browser to verify styling consistency

### Adding to Lupin Roadmap Deck
Similar process for `decks/lupin_roadmap/index.html`:
- Market sizing slide can go after "The Core Problem" section
- Adjust Tailwind color classes to match (caixablue already defined)

### Creating New Pitch Deck
1. Copy `market_sources_appendix.html` as template
2. Extract relevant sections (don't include everything)
3. Match styling to your deck's theme
4. Always link back to `SOURCES.md` for full methodology

## Updating Sources

### Quarterly Review (Recommended)
```bash
# 1. Check for new SEC filings
# DIH/Hocoma earnings: https://www.sec.gov/cgi-bin/browse-edgar?company=dih+holding

# 2. Review market intelligence reports
# Mordor, MRFR, Grand View Research, Fortune Business Insights

# 3. Update SOURCES.md with new figures and dates

# 4. Regenerate market slides if numbers changed significantly
```

### When Private Company Estimates Change
- If Kinova/g.tec estimates shift >20%, update range in `SOURCES.md`
- Always cite the intelligence platform (RocketReach, Exactitude, Growjo)
- Document the date of the estimate

### Ad-Hoc Updates
- M&A activity (company sales, acquisitions) → immediate update
- New FDA clearances in BCI space → add to regulatory precedent section
- Major clinical trial results → update clinical evidence section

## Source Verification Workflow

```
New data found
    ↓
1. Verify primary source (not just press release)
    ↓
2. Classify reliability (✅ Audited / ⚠️ Estimate)
    ↓
3. Update SOURCES.md with source type & date
    ↓
4. Decide if slide update needed (>10% change? New competitor?)
    ↓
5. If yes: Update market_data_slide.html
    ↓
6. Commit with message: "Market data: [Source] updated [Metric]"
    ↓
7. Notify team if material change (e.g., TAM estimate shifts)
```

## Common Questions

### Q: Why such a wide range for Kinova ($33M–$76M)?
**A:** Kinova is private. Different B2B intelligence platforms use different methodologies:
- Exactitude: Historical baseline, 50/50 healthcare/industrial split
- RocketReach: Higher 2026 run-rate modeling
- **Recommendation:** Cite the range and note it's private estimates

### Q: Should I use $580M or $4B+ for rehab robots TAM?
**A:** Depends on your claim:
- **$580M–$600M:** Pure clinical rehabilitation hardware (our direct comp set)
- **$4B–$11B:** Broader robotics including surgical, elderly care, exoskeletons
- **Always specify scope** to avoid overclaiming

### Q: How often does the BCI illiteracy rate get challenged?
**A:** The 30–50% figure is well-established in literature (2010 benchmarks, replicated since). However:
- Healthy populations: ~15–30% fail
- Stroke/clinical populations: ~30–50% fail
- **Always cite Allison & Neuper + Vidaurre & Blankertz** for credibility

### Q: Can I cite the IpsiHand FDA clearance for LUPIN's pathway?
**A:** Yes, as precedent:
- ✅ Shows FDA accepts non-invasive EEG for stroke rehab
- ✅ Shows CMS will reimburse (DME codes exist)
- ❌ Don't claim LUPIN has clearance (we don't, yet)
- **Frame as:** "Neurolutions established the pathway in 2021"

## Integration Examples

### Example 1: Investor Email
```
The BCI software market is growing at 23.88% CAGR (Mordor Intelligence, 
Aug 2026), more than 2× the overall hardware market. LUPIN's SaMD approach 
targets this high-growth segment while avoiding manufacturing overhead.

Market leader DIH/Hocoma reported $62.9M revenue (SEC 10-K, FY2025), 
while emerging OEM partner targets like Kinova are estimated at $33M–$76M 
(private intelligence platforms).

Our clinical wedge addresses 30–50% of stroke patients (93.8M globally, 
GBD 2021) who fail standard BCI protocols, representing $70k–$248k per-patient 
cost savings.

Full sourcing: [Link to SOURCES.md]
```

### Example 2: Grant Application (Clinical Section)
```
Background: Brain-computer interfaces (BCIs) for neurorehabilitation face 
a critical adoption barrier: 30–50% of stroke patients cannot reliably 
generate motor imagery signals (Allison & Neuper, 2010; Vidaurre & 
Blankertz, 2010). With 93.8 million stroke survivors globally (GBD 2021 
Stroke Collaborators, Lancet Neurology, 2024), this "BCI illiteracy" 
affects 28–47 million potential beneficiaries.

Regulatory Precedent: The FDA's De Novo clearance of Neurolutions' 
IpsiHand (DEN200046, April 2021) for non-invasive EEG-based upper-extremity 
chronic stroke rehabilitation, coupled with CMS assignment of DME 
reimbursement codes (HCPCS E0738/E0739), establishes a viable regulatory 
and reimbursement pathway for LUPIN's approach.
```

### Example 3: Quick Deck Footnote
```
<!-- Footer of market slide -->
<div class="text-[9px] text-slate-500 mt-4 text-center">
  Market sizing: Mordor Intelligence, MRFR, Grand View Research (2026). 
  Competitor financials: SEC filings (DIH/Hocoma, Bionik), M&A documents 
  (Tyromotion), private estimates (Kinova, g.tec). Clinical: Allison & 
  Neuper 2010, GBD 2021. Full sources: decks/SOURCES.md
</div>
```

## Visual Guide

```
decks/
├── SOURCES.md                          ← Master reference (Markdown)
├── market_sources_appendix.html        ← Standalone appendix deck (HTML)
├── README_MARKET_DATA.md               ← This file
└── early_pitch/
    ├── index.html                      ← Main pitch deck
    └── market_data_slide.html          ← Insertable market slide
```

## Maintenance

**Document Owner:** Update with project lead name
**Last Full Review:** November 2026
**Next Scheduled Review:** February 2027 (quarterly)

**Update Triggers:**
- [ ] DIH/Hocoma quarterly earnings (check SEC EDGAR)
- [ ] New market intelligence reports (Mordor, MRFR, Grand View)
- [ ] Competitor M&A activity
- [ ] Major clinical trial results in BCI/neurorehab space
- [ ] FDA clearances for competing BCI devices
- [ ] CMS reimbursement policy changes

---

**Questions or corrections?** Open an issue or update `SOURCES.md` directly with proper citations.
