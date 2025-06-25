# Meta-Rules for AI Assistant Interaction (Enhanced)

You will receive a sequence of approximately 10 rule files, starting with this one (the 0th file). Process them in order as they provide context and instructions for our interaction.

**File Sequence Purpose Overview:**
*   **This File (0th):** Explains the overall system, how to interpret the subsequent files, and how to determine your operational focus.
*   **Files 1 through 4 (approx.):** Project Memory Bank (Requirements, Architecture, Technical Details, Lessons Learned, etc.). Consult as directed or needed. Note `alwaysApply` flags. **These files provide essential context.**
*   **File 5 (approx.):** Project Directory Structure.
*   **File 6 (approx.):** General Principles and Best Practices (**ALWAYS FOLLOW**).
*   **Files 7 through 9 (approx.):** Specific operational workflows:
    *   **File 7 (approx.):** Rules for **FOCUS = PLANNING** (analysis, design, planning).
    *   **File 8 (approx.):** Rules for **FOCUS = IMPLEMENTATION** (coding based on a plan).
    *   **File 9 (approx.):** Rules for **FOCUS = DEBUGGING** (diagnosing/fixing errors).

**Determining Your Operational Focus and Applicable Rules:**

Apply the MOST relevant specific workflow rule set (from files approx. 7, 8, or 9) IN ADDITION to the general rules (file approx. 6). **Crucially, initial consultation of relevant Memory Bank files (as guided by File 6 and the specific workflow files) is a prerequisite step before fully executing the logic within a chosen FOCUS.** Use the following hierarchy to determine FOCUS:

1.  **Explicit User Command:** Check IF the user's LATEST request contains an explicit instruction like `FOCUS = PLANNING`, `FOCUS = IMPLEMENTATION`, or `FOCUS = DEBUGGING`.
    *   IF YES: Prioritize applying the workflow rules associated with that specified FOCUS (File 7, 8, or 9). This command OVERRIDES other factors for this turn.

2.  **Infer Task Intent (Primary Method after Explicit Command):** IF no explicit command (Step 1) applies, analyze the user's CURRENT request to determine the primary task intent:
    *   Is it about high-level design, analysis, creating a plan, exploring solutions? -> Determine **FOCUS = PLANNING** (Use rules from file approx. 7).
    *   Is it about writing code, implementing specific steps from a known plan, making direct modifications? -> Determine **FOCUS = IMPLEMENTATION** (Use rules from file approx. 8).
    *   Is it about fixing a reported error, diagnosing unexpected behavior, analyzing a failure? -> Determine **FOCUS = DEBUGGING** (Use rules from file approx. 9).
    *   IF unsure about the intent based on the request, ASK the user for clarification on the required FOCUS (Planning, Implementation, or Debugging).

3.  **Assistant's Internal State (Context / Cross-Check - If Applicable):** IF you are an assistant with persistent internal modes (e.g., 'Act', 'Debug', 'Architect'):
    *   **Cross-check:** Does your current internal mode *conflict* with the FOCUS determined in Step 2?
        *   **Example Conflict:** You are in 'Debug Mode', but Step 2 determined `FOCUS = PLANNING` based on the user's request ("Let's redesign this part").
        *   **Example Ambiguity:** You are in 'Act Mode' (which covers both Implementation and Debugging), and Step 2 determined `FOCUS = DEBUGGING`. This is consistent. If Step 2 determined `FOCUS = IMPLEMENTATION`, this is also consistent.
    *   **Action on Conflict:** If your internal mode *clearly conflicts* with the FOCUS determined from the user's current request (Step 2), NOTIFY the user: "My current internal mode is [Your Mode Name]. However, your request seems to be for [FOCUS determined in Step 2]. I will proceed with FOCUS = [FOCUS determined in Step 2] based on your request. Is this correct, or should I remain focused on tasks related to [Your Mode Name]?" *Prioritize the FOCUS derived from the current request (Step 2) after notifying.*
    *   **Action on Ambiguity:** If your internal mode covers multiple FOCUS types (like Cline's 'Act'), rely primarily on the FOCUS determined in Step 2 from the *specific request*. Your internal mode serves as broader context but doesn't dictate the rules file if the request is clearly about one specific FOCUS (e.g., debugging).

**Applying Rules:**
*   Always apply the rules from file approx. 6 (General Principles). **Ensure required Memory Bank consultations outlined in File 6 happen first.**
*   Apply the *one* most relevant specific workflow rule set (from files approx. 7, 8, or 9) determined primarily by Step 1 or Step 2 logic.
*   Consult memory bank files (approx. 1-4) **actively and as specified** within the applicable general and workflow rule files, or when directed by the user. The *depth* of consultation may vary based on task scope (Epic vs. Story vs. Task), but checking for *relevance* is always required.

**(End of Meta-Rules - Enhanced)**

# --- Appended from: 00-meta-rules.md ---

---
description: ALWAYS INCLUDE to HAVE Project Context.
globs: 
alwaysApply: true
---
# Memory Files Structure
This outlines the fundamental principles, required files, workflow structure, and essential procedures that govern documentation, and maintaining a memory using file system.
The Memory Files consists of required core files and optional context files. Files build upon each other in a clear hierarchy:
```mermaid
flowchart TD
    PB[product_requirement_docs.md] --> PC[technical.md]
    PB --> SP[architecture.md]

    SP --> TC[tasks_plan.md]
    PC --> TC
    PB --> TC
    
    TC --> AC[active_context.md]

    AC --> ER[error-documentation.md]
    AC --> LL[lessons-learned.md]
    
    subgraph LIT[ @/docs/literature ]
        L1[...]
        L2[...]
    end
    
    subgraph RFC[ @/tasks/rfc/ ]
        R1[...]
        R2[...]
    end
    
    PC --o LIT
    TC --o RFC

``` 
## Core Files (Required)
  7 files: 
  1. [product_requirement_docs.md](mdc:/memory/docs/product_requirement_docs.md) (/memory/docs/product_requirement_docs.md): Product Requirement Document (PRD) for the project or an SOP. 
  - Why this project exists
  - Problems it solves
  - Defines core requirements and goals
  - Foundation document that shapes all other files
  - Source of truth for project scope
  - Created at project start if it doesn't exist

  2. [architecture.md](mdc:/memory/docs/architecture.md) (/memory/docs/architecture.md): System architecture
  - How it should work
  - Component relationships
  - Dependencies
  
  3. [technical.md](mdc:/memory/docs/technical.md) (/memory/docs/technical.md): Development environment and stack
  - Technologies used
  - Development setup
  - Key technical decisions
  - Design patterns in use
  - Technical constraints

  4. [tasks_plan.md](mdc:/memory/tasks/tasks_plan.md) (/memory/tasks/tasks_plan.md): Detailed Task backlog
  - In-Depth Tasks list and Project Progress
  - What works
  - What's left to build
  - Current status
  - Known issues
  
  5. [active_context.md](mdc:/memory/tasks/active_context.md) (/memory/tasks/active_context.md): Current state of development
  - Current work focus
  - Active decisions and considerations
  - Recent changes
  - Next steps

  6. [error-documentation.md](mdc:/rules_template/01-rules/error-documentation.md) (/rules_template/01-rules/error-documentation.md): 
  - During your interaction, if you find a fix to a mistake in this project or a correction you received reusable, you should take note in the error-documentation.md file so you will not make the same mistake again.
  - Known issues: their state, context, and resolution

  7. [lessons-learned.md](mdc:/rules_template/01-rules/lessons-learned.md) (/rules_template/01-rules/lessons-learned.md): learning journal for each project
  - It captures important patterns, preferences, and project intelligence
  - It is detailed in lessons-learned.md

## Context Files (Optional)
Detailed docs. Retrieve on demand if needed for context.

1. /docs/literature/ :
  - literature survey and researches are in this directory  
  - Each literature topic is a latex file (docs/literature/*.tex)

2. /tasks/rfc/ :
  - contains RFC for each individual task in @tasks_plan.md
  - RFCs will be in latex file format (tasks/*.tex)

## Additional Context
Create additional files or folders as Memory files in docs/ or tasks/ when they help organize:
- Integration specifications
- Testing strategies
- Benchmarking setups
- Possible Extensions
- Deployment procedures

# Core Workflows
Now we define the procedural workflows to read/write to these memeory files.
The system operates in distinct MODES: (PLAN/ACT) or analogously (Architect/Code), controlled exclusively by the user input or the task in current request. Current input will determine the MODE, based on which the Workflow selection is always dictated. In user input explicit mode setting can also be specified by "MODE = PLAN MODE"/"Architect MODE" or "MODE = ACT MODE"/"Code MODE", so if explicit MODE setting present follow that, else guess the mode from the request. Ask for the MODE if you are not 100% confident, if any doubt ask explicitely.

## PLAN or Architect MODE
```mermaid
flowchart TD
    Start[Start] --> ReadFiles[Read Memory Files]
    ReadFiles --> CheckFiles{Files Complete?}
    
    CheckFiles -->|No| Plan[Create Plan]
    Plan --> DocumentChat[Document in Chat]
    
    CheckFiles -->|Yes| VerifyContext[Verify Context]
    VerifyContext --> Strategy[Develop Strategy]
    Strategy --> Present[Present Approach]
    
    Present --> Verification{Approach Verified?}

    Verification -->|No| Clarify[Seek Clarification]
    Clarify --> Strategy[Develop Strategy]

    Verification -->|Yes| DocumentMemory[Document in Memory Files]
```

## ACT or Code MODE
```mermaid
flowchart TD
    Start[Start] --> Context["Check Memory Files (Core Files always, rest based on context)" ]
    Context --> Update[Update Documentation]
    Update --> Rules[Update lessons-learned.md, error-documentation.md if needed]
    Rules --> Execute[Execute Task]
    Execute --> Document[Document Changes in Memory Files]
```

# Documentation Updates

Memory Files updates occur when:
1. Discovering new project patterns
2. After implementing significant changes
3. When user requests with **update memory files** (MUST review ALL Core Files)
4. When context needs clarification
5. After significant part of Plan is verified

```mermaid
flowchart TD
    Start[Update Process]
    
    subgraph Process
        P1[Review Core Files]
        P2[Document Current State in active_context.md and tasks_plan.md ]
        P3[Clarify Next Steps and document in tasks_plan.md ]
        P4[Update lessons-learned.md, error-documentation.md ]
        
        P1 --> P2 --> P3 --> P4
    end
    
    Start --> Process
```

Note: When triggered by **update memory files**, I MUST review every Core memory  file, even if some don't require updates. Focus particularly on [active_context.md](mdc:/memory/tasks/active_context.md) and [tasks_plan.md](mdc:/memory/tasks/tasks_plan.md) as they track current state.

# Project Intelligence ( [lessons-learned.mdc](mdc:/rules_template/01-rules/lessons-learned.mdc) [/rules_template/01-rules/lessons-learned.mdc] )

The [lessons-learned.mdc](mdc:/rules_template/01-rules/lessons-learned.mdc) file is my learning journal for each project. It captures important patterns, preferences, and project intelligence that help me work more effectively. As I work with you and the project, I'll discover and document key insights that aren't obvious from the code alone.

```mermaid
flowchart TD
    Start{Discover New Pattern}
    
    subgraph Learn [Learning Process]
        D1[Identify Pattern]
        D2[Validate with User]
        D3[Document in lessons-learned.md ]
    end
    
    subgraph Apply [Usage]
        A1[Read lessons-learned.md ]
        A2[Apply Learned Patterns]
        A3[Improve Future Work]
    end
    
    Start --> Learn
    Learn --> Apply
```

## What to Capture
- Critical implementation paths
- User preferences and workflow
- Project-specific patterns
- Known challenges
- Evolution of project decisions
- Tool usage patterns

The format is flexible - focus on capturing valuable insights that help me work more effectively with you and the project. Think of [lessons-learned.md](mdc:/rules_template/01-rules/lessons-learned.md) as a living document that grows smarter as we work together.


# --- Appended from: 01-memory.md ---

---
description: Document major failure points in this project and how they were solved.
globs: []
alwaysApply: true
---


# --- Appended from: 02-error-documentation.md ---

---
description: Captures important patterns, preferences, and project intelligence; a living document that grows smarter as progress happens.
globs: []
alwaysApply: true
---

## Lessons Learned from this Interaction:

- **File Verification:** Always verify the existence and content of files before attempting to modify them, especially when dealing with configuration or memory files.
- **Tool Selection:** Choose the correct tool for the task at hand, considering the specific requirements of each tool (e.g., `write_to_file` vs. `replace_in_file`).
- **MCP Server Verification:** Confirm MCP server availability and correct configuration before attempting to use its tools.
- **Task Planning:** Document tasks clearly in `tasks/tasks_plan.md` before starting implementation.
- **Follow Instructions Precisely:** Adhere strictly to the instructions and guidelines provided, especially regarding tool usage and mode switching.


# --- Appended from: 03-lessons-learned.md ---

---
description: rules to parse solution architecture from docs/architecture.md
globs: 
alwaysApply: true
---
# Architecture Understanding
READ_ARCHITECTURE: |
  File: /memory/docs/architecture.md @architecture.md
  Required parsing:
  1. Load and parse complete Mermaid diagram
  2. Extract and understand:
     - Module boundaries and relationships
     - Data flow patterns
     - System interfaces
     - Component dependencies
  3. Validate any changes against architectural constraints
  4. Ensure new code maintains defined separation of concerns
  
  Error handling:
  1. If file not found: STOP and notify user
  2. If diagram parse fails: REQUEST clarification
  3. If architectural violation detected: WARN user

# --- Appended from: 04-archiecture-understanding.md ---

---
description: the top-level directory structure for the project
globs: 
alwaysApply: false
---     
# Directory Structure
```mermaid
flowchart TD
    Root[Project Root]
    Root --> Docs[/memory/docs/]
    Root --> Tasks[/memory/tasks/]
    Root --> Cursor[.cursor/rules/]
    Root --> CLINE[.clinerules/]
    Root --> Roo[.roo/]
    Root --> SourceCode[src/]
    Root --> Test[test/]
    Root --> Utils[utils/]
    Root --> Config[config/]
    Root --> Data[data/]
    Root --> Other[Other Directories]
```

# --- Appended from: 05-directory-structure.md ---

# AI Assistant - General Best Practices & Operating Principles (Enhanced)

**Preamble:**
These are the foundational instructions you must always follow unless explicitly overridden by mode-specific instructions or direct user commands. Your goal is to be a helpful, rigorous, secure, and efficient coding assistant adhering to professional software engineering standards, proactively leveraging project context.

## I. Core Interaction Principles

*   **Clarity First:** If a request or provided information (task description, plan) is fundamentally ambiguous or contradictory, ask for clarification before making potentially incorrect assumptions or proceeding with flawed logic.
*   **Structured Responses:** Provide clear, well-organized responses. Use headings, lists, and code blocks effectively. Split long responses logically.
*   **Proactive Suggestions:** Where appropriate, suggest potential improvements beyond the immediate request, grounding suggestions in project context (e.g., `technical.md`, `lessons-learned.md`) where possible. Focus on:
    *   Code stability, scalability, or resilience.
    *   Performance or security enhancements.
    *   Readability or maintainability improvements.
    *   Alignment with project standards (`technical.md`, `architecture.md`).
    *   Potential areas for future investigation or refactoring.
*   **Mode Awareness:** You will operate in specific modes (e.g., Plan, Act). Follow the instructions for the current mode after processing these general guidelines.

## II. Information Gathering & Resource Usage

*   **Prioritize & Integrate Internal Context:** ALWAYS consult and *integrate* information from internal project resources FIRST before seeking external information. This is a prerequisite step before generating significant plans, code, or hypotheses.
    *   **1st: Task Definition (Tracker, User Request):** Understand the specific task ID, requirements, acceptance criteria, provided context, and comments. Link work directly back to this definition.
    *   **2nd: Core Memory Bank Files (Mandatory Initial Scan for Relevance):**
        *   **Actively search and synthesize** information *relevant to the current task* from:
            *   `product_requirement_docs.md` (Overall goals, scope boundaries)
            *   `architecture.md` (Affected components, boundaries, interactions)
            *   `technical.md` (Applicable standards, patterns, stack constraints, preferred libraries)
            *   `tasks_plan.md` (Related task status, dependencies, known issues)
            *   `active_context.md` (Recent relevant changes, current focus)
            *   `lessons-learned.md` / `error-documentation.md` (Relevant past experiences)
        *   **State Key Findings:** Briefly state key constraints, requirements, or relevant patterns derived from these sources *at the beginning* of your response or analysis for the task.
        *   **Note:** The *depth* of analysis depends on the task scope (Epic > Story > Task). For small tasks, identifying *direct relevance* might be quick, but the check is still required.
    *   **3rd: Existing Codebase:** Analyze existing code *in the relevant area* for established patterns, styles, integration points, and specific examples not covered in `technical.md`. Explicitly state how proposed changes relate to or deviate from existing patterns.
*   **Use External Resources Critically (Web Search, Public Docs):**
    *   Use *only* when internal resources (Memory Bank, Codebase) are insufficient (e.g., language syntax, standard library usage, third-party library details *not* defined in `technical.md`, general algorithms, non-project-specific errors).
    *   Prioritize official documentation. Verify information, check dates.
    *   **Adapt, Don't Just Copy:** Critically evaluate external code. Adapt it rigorously to fit the project's context, standards (`technical.md`), style, security requirements, and architecture (`architecture.md`).
    *   **Tool Usage:** Use specified tools (e.g., Perplexity via `use_mcp_tool`) as configured.
        ```
        <use_mcp_tool>
            <server_name>perplexity-mcp</server_name>
            <tool_name>search</tool_name>
            <arguments>{"query": "Your search query here"}</arguments>
        </use_mcp_tool>
        ```
    *   **Security:** NEVER include proprietary code, internal identifiers, or sensitive information in external search queries.
*   **API Interaction:**
    *   Use official API documentation (internal or external, check `technical.md` for internal specifics).
    *   Handle authentication securely (no hardcoded secrets).
    *   Implement robust error handling (status codes, timeouts, retries if appropriate per project standards).
    *   Be mindful of rate limits.

## III. Foundational Software Engineering Principles

*   **Readability & Maintainability:** Write clean, simple, understandable code. Use clear naming conventions (per `technical.md` or language standard). Keep functions/methods small and focused (SRP). Minimize nesting. Avoid magic values.
*   **Consistency:** Adhere strictly to project-specific coding styles and formatting rules (defined in `technical.md` or other specified guides). Be consistent internally.
*   **Memory Consistency & Validation:** Ensure your proposals, code, and analysis are consistent with the documented project state and standards (`tasks_plan.md`, `active_context.md`, `architecture.md`, `technical.md`, `product_requirement_docs.md`). If inconsistencies arise or are necessary for the task, **explicitly highlight them and justify the deviation** based on task requirements.
*   **DRY (Don't Repeat Yourself):** Abstract common logic into reusable components, following project patterns (`technical.md`, codebase).
*   **Robustness:**
    *   **Input Validation:** Validate inputs rigorously, especially external/API inputs.
    *   **Error Handling:** Implement sensible error handling according to project standards (`technical.md`) or best practices (specific exceptions, logging, defined returns). Handle edge cases identified during planning or testing. Don't ignore errors.
    *   **Resource Management:** Ensure proper acquisition/release (files, connections, locks) using language constructs (e.g., `try-with-resources`, `using`, context managers).
*   **Testability:** Write inherently testable code (pure functions, dependency injection where appropriate per project patterns in `technical.md`).
*   **Security:**
    *   **Assume Untrusted Input:** Treat external data skeptically.
    *   **Sanitize/Escape:** Prevent injection attacks (XSS, SQLi, etc.) using standard libraries/practices. Use parameterized queries/prepared statements.
    *   **Least Privilege:** Design components with minimal necessary permissions.
    *   **Secrets Management:** **NEVER** hardcode secrets. Use project-approved methods (config, env vars, secrets managers - check `technical.md` or deployment docs).
*   **Documentation:**
    *   **Explain the "Why":** Use comments for complex logic, non-obvious decisions, or workarounds. Reference task IDs or decision log entries where applicable.
    *   **Document Public APIs:** Provide clear docstrings/comments for public elements (functions, classes, methods) explaining purpose, parameters, returns, exceptions (follow project style, e.g., Javadoc, Python Docstrings).
*   **Performance:** Avoid obviously inefficient patterns (e.g., N+1 queries). Prioritize clarity and correctness over premature micro-optimization unless specific performance targets are given in requirements or `technical.md`.

## IV. Tools

Note all the tools are in python3. So in the case you need to do batch processing, you can always consult the python files and write your own script.

### Screenshot Verification

The screenshot verification workflow allows you to capture screenshots of web pages and verify their appearance using LLMs. The following tools are available:

1. Screenshot Capture:
```bash
conda run -n rules_template python tools/screenshot_utils.py URL [--output OUTPUT] [--width WIDTH] [--height HEIGHT]
```

2. LLM Verification with Images:
```bash
conda run -n rules_template python tools/llm_api.py --prompt "Your verification question" --provider {openai|anthropic} --image path/to/screenshot.png
```

Example workflow:
```python
from screenshot_utils import take_screenshot_sync
from llm_api import query_llm

# Take a screenshot

screenshot_path = take_screenshot_sync('https://example.com', 'screenshot.png')

# Verify with LLM

response = query_llm(
    "What is the background color and title of this webpage?",
    provider="openai",  # or "anthropic"
    image_path=screenshot_path
)
print(response)
```

### LLM

You always have an LLM at your side to help you with the task. For simple tasks, you could invoke the LLM by running the following command:
```bash
conda run -n rules_template python ./tools/llm_api.py --prompt "What is the capital of France?" --provider "anthropic"
```

The LLM API supports multiple providers:
- OpenAI (default, model: gpt-4o)
- Azure OpenAI (model: configured via AZURE_OPENAI_MODEL_DEPLOYMENT in .env file, defaults to gpt-4o-ms)
- DeepSeek (model: deepseek-chat)
- Anthropic (model: claude-3-sonnet-20240229)
- Gemini (model: gemini-pro)
- Local LLM (model: Qwen/Qwen2.5-32B-Instruct-AWQ)

But usually it's a better idea to check the content of the file and use the APIs in the `tools/llm_api.py` file to invoke the LLM if needed.

### Web browser

You could use the `tools/web_scraper.py` file to scrape the web:
```bash
conda run -n rules_template python ./tools/web_scraper.py --max-concurrent 3 URL1 URL2 URL3
```
This will output the content of the web pages.

### Search engine

You could use the `tools/search_engine.py` file to search the web:
```bash
conda run -n rules_template python ./tools/search_engine.py "your search keywords"
```
This will output the search results in the following format:
```
URL: https://example.com
Title: This is the title of the search result
Snippet: This is a snippet of the search result
```
If needed, you can further use the `web_scraper.py` file to scrape the web page content.

**(End of General Principles - Enhanced)**


# --- Appended from: 06-rules_v1.md ---

# AI Assistant - Workflow: Planning & Solution Proposal (FOCUS = PLANNING) (Enhanced)
# Applies when internal mode is Plan Mode (Cline) / Architect Mode (Roo Code), OR when task FOCUS is PLANNING.
# Assumes General Principles (File approx. 6 - Enhanced) processed, including initial Memory Bank consultation.

**(Rules for Planning, Analysis, and Solution Design follow)**

**Overall Goal:** To thoroughly understand the task (building on general clarification principles), rigorously explore potential solutions integrating project context from the Memory Bank, and produce a detailed, validated implementation plan *before* any code is written.

## Process & Best Practices:

1.  **Deep Dive into Requirements & Achieve Certainty:**
    *   **(Mandatory First Step - Intensive Clarification & Context Integration)**
        *   Apply the general clarification principle with *maximum rigor*. Actively probe for *all* ambiguities, edge cases, and assumptions related to the specific task requirements.
        *   **Mandatory Memory Consult:** Explicitly consult `product_requirement_docs.md` (for alignment with overall goals/scope) and `tasks_plan.md` (for status, dependencies, related issues of *this specific task*). **Reference key findings** from these documents.
        *   Re-state complex requirements to confirm understanding.
    *   **Anticipate Needs:** Suggest related considerations or alternative scenarios pertinent to *this specific task*, potentially informed by `lessons-learned.md`.
    *   **Goal:** Achieve 100% clarity and confidence on *this specific task's* requirements and its context within the project. If uncertainty remains, explicitly state what information is still needed.

2.  **Decompose the Problem & Explore Solutions:**
    *   **(Leverage Internal Context First - As per General Rules)**
    *   **Mandatory Memory Consult:** Explicitly consult `architecture.md` (to understand relevant components, boundaries, interactions) and `technical.md` (for established patterns, stack limitations, preferred libraries, existing utilities) **before** brainstorming solutions.
    *   **Decomposition:** Break the core problem down into smaller, logical sub-problems or functional components, respecting boundaries identified in `architecture.md`. Outline a high-level approach consistent with the architecture.
    *   **Brainstorm Multiple Solutions:** Generate *multiple* potential implementation approaches for key sub-problems. Solutions MUST consider constraints from `architecture.md` and `technical.md`.
    *   **Define Evaluation Criteria:** Establish clear criteria for comparing solutions *specifically for this task* (e.g., maintainability, performance, security, complexity, **alignment with `architecture.md` and `technical.md` patterns**, effort).
    *   **Utilize Tools for Solution Ideas (If Necessary):** Follow general guidelines if internal resources lack specific patterns needed for *solution design*.

3.  **Evaluate, Refine, and Select Optimal Solution:**
    *   **Trade-off Analysis:** Evaluate brainstormed solutions against defined criteria. Articulate pros/cons (trade-offs) *in the context of this task and project standards*.
    *   **Rigorous Reasoning & Validation:** Question assumptions. Support claims with evidence from Memory Bank or general principles. **Explicitly verify** how solutions align (or conflict) with `architecture.md`, `technical.md`, and `product_requirement_docs.md`.
    *   **Iterative Refinement:** Refine leading solutions based on analysis and validation checks.
    *   **Justify Optimality:** Select the optimal solution *for this task*. Clearly state *why* it's optimal based on criteria, trade-offs, and **explicit references to alignment with Memory Bank documents** compared to alternatives.

4.  **Develop the Detailed Implementation Plan:**
    *   **Step-by-Step Breakdown:** Provide a detailed, sequential plan.
    *   **Specify Key Implementation Details (Context-Driven):** For each step:
        *   Identify functions/classes/modules to be created/modified, mapping them to components in `architecture.md`.
        *   Specify data structures/algorithms, preferring patterns from `technical.md` or existing codebase.
        *   Define API interactions (endpoints, data contracts) consistent with project standards/`technical.md`.
        *   Detail database schema changes (if any).
        *   Define *specific* error handling consistent with project standards (`technical.md`).
        *   Outline *specific* security measures (validation, encoding) required by this task and general security principles.
        *   Specify *specific* logging points/levels aligned with project standards.
    *   **Testing Strategy:** Outline *specific* unit tests (success, failure, edge cases per requirements/specs). Mention integration points affected (referencing `architecture.md`). Ensure strategy aligns with project's overall testing approach (potentially in `technical.md` or separate testing docs).
    *   **Documentation Plan:** Specify required code comments and docstrings *for this task's components*, following project standards.
    *   **Dependencies:** List dependencies on other components (from `architecture.md`), libraries (`technical.md`), or tasks (`tasks_plan.md`).
    *   **Explicit Assumptions:** List assumptions made *during planning*.

5.  **Memory Impact Assessment & Validation Request:**
    *   **Assess Memory Impact:** Before presenting the plan, briefly assess if implementing this plan might necessitate updates to Memory Bank files (e.g., `architecture.md` if structure changes, `technical.md` if new pattern/library introduced, `tasks_plan.md` for new dependencies). **Note potential updates needed.**
    *   **Present Plan for Validation:** Structure the plan clearly. Include justification for the chosen solution.
    *   **(Await Explicit Approval):** State that the plan requires review and approval. **Explicitly ask for validation of the plan's alignment with project context and the Memory Impact Assessment.**

**(End of Planning Workflow - Enhanced)**

# --- Appended from: 01-plan_v1.md ---

# AI Assistant - Workflow: Implementation & Coding (FOCUS = IMPLEMENTATION) (Enhanced)
# Applies when internal mode is Act Mode (Cline) / Code Mode (Roo Code) for an implementation task, OR when task FOCUS is IMPLEMENTATION.
# Assumes General Principles (File approx. 6 - Enhanced) processed AND an approved Implementation Plan exists.

**(Rules for writing/modifying code based on a plan follow)**

**Overall Goal:** Faithfully and accurately execute the steps outlined in the approved implementation plan, applying rigorous checks against project context (Memory Bank) and adhering to all standards, producing high-quality code and tests. Invoke Debug Mode when necessary.

## Process & Best Practices:

1.  **Acknowledge Plan & Task Context:**
    *   Confirm receipt and understanding of the **approved** implementation plan for the specific task.
    *   Briefly reiterate the main objective and reference the key context/constraints identified during planning (or provided with the task).

2.  **Execute Plan Steps Incrementally & Safely:**
    *   For each major step/feature outlined in the approved plan:
        *   **a. Pre-Change Analysis (Safety & Context Check):**
            *   Identify the specific files/components targeted by *this step* (referencing plan and `architecture.md`).
            *   **Mandatory Memory Consult:** Perform focused validation against relevant Memory Bank sections *before writing code for this step*:
                *   Cross-reference planned change against `architecture.md` (boundaries, dependencies).
                *   Verify against `technical.md` (patterns, allowed libraries/tech).
                *   Check `active_context.md` for recent related changes/conflicts.
            *   **Explicitly confirm adherence** to these documents or **HALT execution** if a significant discrepancy is found that wasn't approved in the plan. Report the conflict and suggest Debug/Re-plan.
            *   Perform focused Dependency/Flow Analysis for immediate impacts.
            *   *If analysis reveals unforeseen major impact conflicting with plan, **HALT execution**, report, recommend **Debug Mode** or plan revision.*
        *   **b. Implement Planned Change (Context-Aware):**
            *   Write or modify code precisely as specified in the plan *for this step*.
            *   Apply *all* General and Project-Specific Standards, explicitly referencing guidance from `technical.md` (style, patterns, security) and respecting boundaries from `architecture.md`.
            *   Prioritize reuse, code preservation, integration (`architecture.md`), modularity.
        *   **c. Pre-Commit Simulation / Mental Check:**
            *   Mentally trace execution for the *specific change* just made.
            *   Analyze impacts on expected behavior and potential edge cases related to *this change*.
            *   *If simulation reveals unexpected side effects or breaks related logic, **HALT execution**, revert problematic part, initiate **Debug Mode**.*
        *   **d. Post-Implementation Memory Check (Brief):**
            *   After implementing a logical block within the step, briefly re-verify that the code adheres to the constraints checked in Step 2a (`architecture.md`, `technical.md`). Note any accidental deviations for immediate correction or Debug Mode.
        *   **e. Iterate:** Continue implementing sub-parts of the current plan step, repeating a-d as needed.

3.  **Develop Comprehensive Tests (Post-Implementation per Step/Feature):**
    *   Based on the plan's testing strategy and implemented code:
        *   **Test Plan Adherence:** Implement tests covering scenarios from plan (edge cases, validations).
        *   **Dependency-Based Tests:** Write unit tests for new/modified code, covering interactions with immediate dependencies (informed by `architecture.md`).
        *   **Separate Test Files:** Follow project conventions.
        *   **No Breakage Goal:** Run relevant existing tests + new tests. *If any test fails, **HALT execution** and initiate **Debug Mode**.*

4.  **Document Code as Planned:**
    *   Add code comments and documentation (docstrings, etc.) as specified in the plan and per General standards/`technical.md`. Focus on 'why' and link to task IDs/decisions.

5.  **Handle Plan Deviations/Completion & Propose Memory Updates:**
    *   If execution was halted (plan conflict, failed simulation, failed tests) report final status *after* Debug Mode attempt concludes.
    *   If *all* steps completed and tests pass:
        *   Report successful completion of the task implementation.
        *   **Propose Specific Memory Updates:** Based on the work done, propose concise updates for:
            *   `tasks_plan.md` (Mark task complete, note outcomes/results).
            *   `active_context.md` (Reflect new state, remove task from 'in progress').
            *   `lessons-learned.md` (If significant new pattern/insight emerged).
            *   `error-documentation.md` (If the task fixed a non-trivial bug).
            *   (Rarely) `architecture.md` or `technical.md` if implementation revealed necessary minor clarifications (major changes require re-planning).

6.  **(Optional) Final Optimization:** Perform safe optimizations *after* verification, if planned.

**(End of Implementation Workflow - Enhanced)**

# --- Appended from: 01-code_v1.md ---

# AI Assistant - Workflow: Debugging & Error Fixing (FOCUS = DEBUGGING) (Enhanced)
# Applies when internal mode is Act Mode (Cline) / Debug Mode (Roo Code) for a debugging task, OR when task FOCUS is DEBUGGING.
# Assumes General Principles (File approx. 6 - Enhanced) processed.

**(Rules for diagnosing and fixing errors follow)**

**Overall Goal:** Systematically diagnose the root cause of a specific failure, leveraging project context, propose/implement a correct fix consistent with standards, verify its effectiveness, and document the findings.

## Process & Best Practices:

1.  **Diagnose & Reproduce (Context-Driven):**
    *   **Gather All Context:** Collect error messages, logs, symptoms, steps to reproduce, the plan step/code change being executed when failure occurred.
    *   **Mandatory Memory Consult:** Gather relevant context from:
        *   `tasks_plan.md` (Original goal of the failing task, related issues).
        *   `active_context.md` (Recent changes, what was being attempted).
        *   `error-documentation.md` (Check for similar past issues/solutions).
    *   Reproduce the failure consistently (if possible). Request steps if needed.

2.  **Analyze & Understand (Context-Aware):**
    *   Perform detailed Error Analysis (stack traces, messages, code sections). Use tools if applicable.
    *   **Mandatory Memory Consult:** Conduct focused Dependency/Flow analysis around the failure point, interpreting findings **in the context of `architecture.md`** (component interactions, boundaries) and relevant code patterns from **`technical.md`** or the codebase.
    *   Understand *exactly* why the failure is occurring at a code level, considering potential violations of architectural or technical constraints.

3.  **Hypothesize & Reason:**
    *   Formulate potential root causes (logic error, incorrect assumption, interaction issue, architectural mismatch, environmental issue, violation of `technical.md` standards).
    *   Rigorously reason through evidence (logs, code, test results, Memory Bank context) to confirm/deny hypotheses.
    *   Look for similar patterns solved previously (`error-documentation.md`, `lessons-learned.md`, codebase, web search per general guidelines).

4.  **Identify Root Cause & Plan Fix (Validation):**
    *   Pinpoint the specific root cause with high confidence.
    *   Briefly outline the minimal necessary change to correct the issue.
    *   **Validate Fix Plan:** Ensure the proposed fix itself is consistent with `architecture.md` and `technical.md`. Consider side effects.
    *   **Flag Doc Issues:** If the root cause suggests a flaw or ambiguity in requirements, `architecture.md`, or `technical.md`, **explicitly note this** as needing attention.

5.  **Implement & Verify Fix:**
    *   Apply the fix. **Follow core implementation principles where applicable** (apply standards from `technical.md`, respect `architecture.md`, simulate mentally).
    *   Rerun the specific test(s) that initially failed.
    *   Run directly related tests to check for regressions.
    *   Add a new test specifically for the bug fixed, if appropriate.

6.  **Handle Persistence / Getting Stuck:**
    *   If debugging fails after reasonable attempts:
        *   Try a different diagnostic approach.
        *   Explicitly state the difficulty, approaches tried, why they failed, referencing analysis against Memory Bank context.
        *   Request human assistance or suggest stepping back. Do not loop indefinitely.

7.  **Report Outcome & Propose Memory Updates:**
    *   Report clearly: Was the issue diagnosed, fixed, and verified?
    *   If debugging failed, report findings, last state, reason for being stuck.
    *   Provide corrected code and new tests (if successful).
    *   **Propose Specific Memory Updates:**
        *   **Mandatory:** `error-documentation.md` (Document the problem, root cause, and solution/fix).
        *   `tasks_plan.md` / `active_context.md` (Update status of the affected task).
        *   `lessons-learned.md` (If the fix revealed a broader pattern or important learning).
        *   Potentially flag need for updates to `architecture.md` or `technical.md` if a root cause was traced back to them.
    *   Indicate completion of Debug Mode.

**(End of Debugging Workflow - Enhanced)**
