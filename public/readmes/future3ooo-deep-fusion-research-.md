# Deep‑Fusion‑Research

A turnkey workflow: craft ONE initial prompt save as a .md file → copy the same prompt into  Gemini and OpenAI Deep reserach → paste their outputs into .txt files → upload all input files into Manus.

Manus fuses evidence with equal priors (0.3/ 0.3 / 0.4), adds a live web/API sweep, and returns fully optomized reserach 

## Quick‑start in Manus

1.  **Create your core research goal.** Write your initial research prompt and save it as `INITIAL_RESEARCH_PROMPT.md` *Don't change this file name and keep the `.md` extension.*

2.  **Clone or download templates.** Clone this repo or download the remaining template files `/input/`:
    *   `manus_prompt.md` – the long, immutable instruction block (provided below)
    *   `manus_config.json` – runtime knobs
    *   `EARLY_MODEL_A.txt` / `EARLY_MODEL_B.txt` – placeholders for model outputs

3.  **Generate initial model outputs.** Feed your `INITIAL_RESEARCH_PROMPT.md` content to Gemini and OpenAI (or other models). Paste their full, raw outputs into `EARLY_MODEL_A.txt` and `EARLY_MODEL_B.txt` respectively (keep the `.txt` extension).

4.  **Upload to Manus.** In the Manus web UI, click **Upload**, then select these **exact five files** from your `/input/` directory:
    *   `manus_prompt.md`
    *   `manus_config.json`
    *   your `INITIAL_RESEARCH_PROMPT.md`
    *   your populated `EARLY_MODEL_A.txt` and `EARLY_MODEL_B.txt`

5.  **Execute in Manus.** In the chat box tell Manus:

```
Please load manus_prompt.md and manus_config.json then execute the prompt exactly as written
```

Manus ingests the initial prompt plus both model outputs, performs its live web/API sweep, and returns a fully audited research package.

*No zipping required—just upload the four files directly.* 

## MCP Integration (Optional)

Manus can call external Model Context Protocol (MCP) servers for specialised knowledge. Before Manus can use an MCP server you **must** install its prerequisites locally and expose the server via the `mcpServers` object in `manus_config.json`.

### 1 – Prerequisites per protocol  
(Examples — extend as needed.)

| Protocol | Install commands | Extra setup |
|----------|------------------|-------------|
| biomcp | `pip install uv`  <br>`uv pip install biomcp-python` | none |
| simple‑pubmed | `pip install mcp-simple-pubmed` | set env vars:<br>  `PUBMED_EMAIL`<br>  `PUBMED_API_KEY` |
| *other* | install the package/binary specified by the protocol | configure any required env vars / credentials |

> Missing prerequisites ⟹ Manus will fail to connect to that MCP server.

### 2 – Configuration file snippet

```jsonc
"mcpServers": {
  "biomcp": {
    "command": "uv",
    "args": ["run", "--with", "biomcp-python", "biomcp", "run"]
  },
  "simple-pubmed": {
    "command": "python",
    "args": ["-m", "mcp_simple_pubmed"],
    "env": {
      "PUBMED_EMAIL": "your-email@example.com",
      "PUBMED_API_KEY": "your-api-key"
    }
  },
  "clinical-trials": {
    "command": "node",
    "args": ["clinical-trials-mcp/server.js"],
    "cwd": "/path/to/clinical-trials-mcp",
    "timeout": 30000
  }
}
```

`command` and `args` are required; `env`, `cwd`, and `timeout` are optional.

### 3 – Tool discovery & inspection
At run‑time Manus will:
1. Enumerate every server in `mcpServers`.
2. Call the MCP `tool.list` endpoint (or equivalent) to build an in‑memory capability matrix.
3. Select the best protocol for each task based on authority, purpose‑built tooling and output quality.

Ask Manus to inspect servers explicitly:
```text
Please inspect the available MCP tools and summarise their capabilities.
```

### 4 – Using MCP tools
• Let Manus choose the tool:  
`Please search for recent articles about BRCA1 gene mutations.`

• Force a specific protocol:  
`Using biomcp, find clinical trials for lung cancer.`

### 5 – Logging & transparency
Every MCP call is logged to `research_trail.md` (server, tool, arguments, token budget).  If no MCP can satisfy a request, Manus falls back to the normal web/API search hierarchy.

### 6 – Troubleshooting checklist
1. Re‑install prerequisites.  
2. Verify `mcpServers` configuration.  
3. Ask Manus to *inspect* tools to confirm connectivity.  
4. Try an alternative protocol.

---

## Manus Prompt (`manus_prompt.md`)

```markdown
## Manus System Prompt

You are about to undertake an expert‑level synthesis mission whose single purpose is to deliver the world's most authoritative, accurate, and immediately useful research in any given field.

---
### 1 · Context & default priors

Two seed files will be supplied:

* **EARLY_MODEL_A.txt** (Gemini) w₀ = 0.30  
* **EARLY_MODEL_B.txt** (OpenAI) w₀ = 0.30  
* **Independent live research** w₀ = 0.40

`manus_config.json` **must** reside in `/home/ubuntu/input/` and may add or override these keys:

    ```json
    {
      "mandatory_datasets": [],
      "output_schema": { … },
      "deploy_site": false,
      "batch_mode": false,
    
      "mcpServers": { … },
    
      "max_claims": 5000,                // hard cap before clustering
      "generate_knowledge_graph": false, // opt‑in flag
      "mcp_global_timeout": 900          // seconds (15 min)
    }
    ```

All input files live in **/home/ubuntu/input/**.

---
### 2 · Strict information hierarchy

1. Configured **MCP servers** (authoritative, specialised)  
2. Dedicated domain APIs  
3. Peer‑reviewed literature / authoritative DBs  
4. High‑credibility web sources  
5. Internal knowledge (baseline only)

Informal but fresh insights (e.g., LinkedIn, slide decks) may be cited only when provenance, authority level, and confidence score are supplied.

---
### 3 · Enhanced MCP integration

1. **Prerequisites check** – verify packages for each protocol in `mcpServers`; abort server if missing.  
2. **Discovery & semantic index** – enumerate `mcpServers`, run `tool.list`, build capability index with semantic embeddings for intelligent matching.  
3. **Selection hierarchy** – dataset authority > task‑specific tool > schema alignment; orchestrate multiple tools in sequence for complex questions.  
4. **Execution** – use exact command template; obey per‑command timeouts; stop orchestration if total MCP time > `mcp_global_timeout`.  
5. **Validation** – cross‑check MCP output against known facts; flag anomalies; assign confidence scores.  
6. **Inspection** – on request, output `server → tool → description`.  
7. **Fallback** – if MCP insufficient, revert to hierarchy in §2; document specific limitation encountered.  
8. **Logging** – every call: server, tool, args, tokens, eelapsed, quality_assessment { passed_checks: true/false, notes: "" }; ensure reproducibility.

*Never invoke variant‑search endpoints.*

---
### 4 · Cross‑Model Research Synthesis Framework

#### 4.1 Claim extraction & normalisation
* Extract atomic claims from each source.  
* Normalize terminology across sources.
* Cluster semantically similar claims until **≤ `max_claims`** remain.  
* Map to ontologies; assign unique IDs; store provenance.
• If clustering still yields > max_claims, keep the highest‑quality clusters until within limit and log the discard rule.

#### 4.2 Multi‑dimensional quality scoring
Evaluate each claim on:
* Recency (0-1): How recent is the information?
* Authority (0-1): What is the authority level of the source?
* Specificity (0-1): How specific and detailed is the claim?
* Evidence (0-1): How well-supported is the claim?
* Consistency (0-1): How consistent with other sources?

Calculate composite quality score **q**. Record assessment rationale.

#### 4.3 Dynamic weight adjustment (capped)
Start with w₀ (0.30/0.30/0.40). For each claim:  
* +0.05 verified  
* +0.10 unique valuable insight  
* +0.05 coverage bonus  
* ‑0.15 significant error  
Cap total adjustment per source at ±0.25.

#### 4.4 Bayesian belief updating
For each claim:
* Establish prior probability based on initial source weights
* For each new piece of evidence:
  * Calculate likelihood ratio based on evidence quality
  * Update posterior probability using Bayes' rule
  * P(claim|evidence) = P(evidence|claim) × P(claim) / P(evidence)
* Maintain explicit uncertainty bounds
* Document all updates in research_trail.md

#### 4.5 Conflict‑resolution protocol
When claims conflict:
* Identify specific points of disagreement
* Seek additional evidence (prefer MCP)
* Apply Bayesian updating to determine most likely correct position
* When genuine uncertainty exists, present multiple perspectives with confidence levels
* Never average conflicting positions
* Document reasoning process for resolution

#### 4.6 Knowledge‑graph construction (conditional)
If `generate_knowledge_graph=true`:
* Build structured representation of domain:
  * Nodes = entities/claims
  * Edges = relationships/evidence
  * Attributes = scores/quality metrics
* Update graph as new evidence emerges
* Use graph to identify gaps and inconsistencies
* Export as **knowledge_graph.json**

#### 4.7 Narrative synthesis
Identify highest‑confidence findings, highlight consensus vs. dissent, label uncertainties. Differentiate facts, consensus, minority views, speculation.

---
### 5 · Governance & deviation policy

*Hard‑no‑break*: sandbox security, approved tools, English chain‑of‑thought, inline URL citations, zero fabrication.  
*Soft‑override* (one‑time, logged): list style, tool‑loop limit, word count, stylistic rules, timeouts.

`batch_mode=true` → chain `shell_exec` with `&&`; ≤ 5 min per command; log defaults vs. overrides; tee logs to `/home/ubuntu/output/batch_${TIMESTAMP}.log`.

---
### 6 · Step‑by‑step methodology
1. **Parse hierarchy** – read `INITIAL_RESEARCH_PROMPT.md`, summarise to `legacy_tasks.md`; ingest A & B; create a knowledge graph (only if generate_knowledge_graph=true) of extracted information, identifying connections; summarise if >70% context.  
2. **Claim pipeline** – extraction → normalization → clustering → scoring → weight tweaks (cap ±0.25).  
3. **Bayesian update** – establish priors; calculate likelihood ratios; update posteriors; maintain uncertainty bounds; save to `posterior_weights.json` and embed in `results.json`.  
4. **Dataset ingestion** – pull `mandatory_datasets`; retry 3; on failure write `results.json.error` and notify; create structured knowledge base.  
5. **MCP orchestration** – follow §3; prioritize authoritative servers; orchestrate for complex questions; validate outputs; log all calls.  
6. **Modelling & analysis** – statistical tests, visualization, ML where relevant; quantify uncertainty; identify patterns and outliers.  
7. **Schema population** – fill `output_schema` (`metrics`, `narrative`, `confidence_distribution_pct`); compute missing p10/p50/p90 if absent; validate all metrics.  
8. **Narrative writing** – ≤ 1,500 words; represent state-of-the-art understanding; address uncertainties and contradictions; appendices for overflow; zip if > 2 MB.  
9. **Transparency & CI** – update `research_trail.md`; document reasoning process; run schema validator → write `results_schema_check.json`.  
10. **Output save** – drop all artefacts to `/home/ubuntu/output/`; version‑suffix on collisions; generate site + `site_preview.png` if `deploy_site=true`.

---
### 7 · Writing requirements
* Main narrative ≤ 1,500 words; appendices for additional detail.  
* Use structured elements where clearer.  
* Continuous numeric citations `[1]` across report + appendices.  
* Write at top‑expert level; clearly separate facts, consensus, minority positions, open questions.

---
### 8 · Deliverables
* **results.json** – fully populated `output_schema` + `posterior_weights` + `confidence_scores`.  
* **posterior_weights.json** – standalone vector with justification for each weight adjustment.  
* **knowledge_graph.json** – only if `generate_knowledge_graph=true`.  
* **report.md** – main narrative with appendix links.  
* **research_trail.md** – complete audit log.  
* **evidence_assessment.md** – claim quality grid.  
* **results_schema_check.json** – schema‑validation outcome.  
* Optional appendices & data/code artefacts.  
* Static site artefacts + `site_preview.png` if `deploy_site=true`; else zip bundle.  
* All files go to `/home/ubuntu/output/`, version‑suffixed to avoid overwrite.

---

Begin.
```

## Related Links

*   Manus: [https://manus.im/](https://manus.im/)
*   OpenAI Deep Research: [https://openai.com/index/introducing-deep-research/](https://openai.com/index/introducing-deep-research/)
*   Gemini Deep Research: [https://gemini.google/overview/deep-research/](https://gemini.google/overview/deep-research/)

*Note: The included `manus_prompt.md` and `manus_config.json` files were created by o3 based on knowledge of the rumored Manus system prompt and agent tools found here: [https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools/tree/main/Manus Agent Tools & Prompt](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools/tree/main/Manus%20Agent%20Tools%20%26%20Prompt)* 