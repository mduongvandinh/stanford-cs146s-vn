# 🔍 PEEKING UNDER THE HOOD OF CLAUDE CODE
## Phân tích kiến trúc và kỹ thuật của Claude Code

---

# 📖 MỤC LỤC

1. [Tổng quan](#1-tổng-quan)
2. [Three-Tier Architecture](#2-three-tier-architecture)
3. [Prompt Engineering Insights](#3-prompt-engineering-insights)
4. [Pre-Session Intelligence](#4-pre-session-intelligence)
5. [System Reminders](#5-system-reminders)
6. [Permission System](#6-permission-system)
7. [Extended Capabilities](#7-extended-capabilities)
8. [Từ điển Keywords](#8-từ-điển-keywords)

---

# 1. TỔNG QUAN

## 📌 Reverse Engineering Claude Code

```
METHODOLOGY:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Anthropic chưa public nhiều về cách Claude Code   │
│  được xây dựng.                                    │
│                                                     │
│  APPROACH:                                         │
│  • Setup LiteLLM proxy                             │
│  • Observe requests/responses                      │
│  • Analyze minified JavaScript                     │
│  • Extract instructional prompts                   │
│                                                     │
│  KEY FINDING:                                      │
│  "It's NOT a single magic trick - it's a careful   │
│   stack of prompt scaffolding, safety rails, and   │
│   tiny reminders"                                  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Core Components

| Component | Purpose |
|-----------|---------|
| **Prompt Scaffolding** | Structured instructions |
| **Safety Rails** | Prevent harmful actions |
| **System Reminders** | Keep agent on track |
| **Permission Gates** | Security checkpoints |

---

# 2. THREE-TIER ARCHITECTURE

## 📌 Agent Layer

```
AGENT LAYER = Multi-turn conversation loop

┌─────────────────────────────────────────────────────┐
│                                                     │
│   User Request                                     │
│        │                                           │
│        ▼                                           │
│   ┌─────────────────────────────────────────┐      │
│   │           AGENT LAYER                    │      │
│   │                                          │      │
│   │   Loop until:                            │      │
│   │   • Task complete                        │      │
│   │   • New user input                       │      │
│   │                                          │      │
│   │   Actions:                               │      │
│   │   • Process request                      │      │
│   │   • Make tool calls                      │      │
│   │   • Handle responses                     │      │
│   │                                          │      │
│   └─────────────────────────────────────────┘      │
│        │                                           │
│        ▼                                           │
│   Response to User                                 │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Sub-Agent Layer

```
SUB-AGENT LAYER = Isolated conversation scopes

┌─────────────────────────────────────────────────────┐
│                                                     │
│  PURPOSE:                                          │
│  • Complex tasks requiring multiple reasoning steps│
│  • Reduce token overhead                           │
│                                                     │
│  HOW IT WORKS:                                     │
│  ┌─────────────────────────────────────────┐       │
│  │         MAIN AGENT                       │       │
│  │                                          │       │
│  │   Complex task detected                  │       │
│  │         │                                │       │
│  │         ▼                                │       │
│  │   ┌─────────────────────────────┐       │       │
│  │   │      SUB-AGENT              │       │       │
│  │   │                             │       │       │
│  │   │  Fresh context              │       │       │
│  │   │  Multiple reasoning steps   │       │       │
│  │   │  Returns: final output only │       │       │
│  │   │                             │       │       │
│  │   └─────────────────────────────┘       │       │
│  │         │                                │       │
│  │         ▼                                │       │
│  │   Main agent receives summary            │       │
│  │   (not full working process)             │       │
│  │                                          │       │
│  └─────────────────────────────────────────┘       │
│                                                     │
│  BENEFIT: Working process NOT in main context      │
│           → Token efficiency                       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Tool Calls Layer

```
TOOL CALLS = Individual prompts for specific functions

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Examples:                                         │
│  • Bash command execution                          │
│  • File editing                                    │
│  • Task management                                 │
│                                                     │
│  Each tool has:                                    │
│  • Specific prompt                                 │
│  • Safety constraints                              │
│  • Output format                                   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 3. PROMPT ENGINEERING INSIGHTS

## 📌 Safety & Deterministic Constraints

```
EXPLICIT PROHIBITIONS:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  EXAMPLE: Interactive Git Commands                 │
│                                                     │
│  Prompt instructs model:                           │
│  "NEVER use git rebase -i or git add -i"           │
│  "These interactive commands would hang            │
│   indefinitely"                                    │
│                                                     │
│  WHY:                                              │
│  • Interactive mode waits for user input           │
│  • Agent can't provide interactive input           │
│  • Would cause infinite hang                       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Technical Constraints as Requirements

```
EDIT TOOL EXAMPLE:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  REQUIREMENT:                                      │
│  "You must use your Read tool at least once        │
│   before editing"                                  │
│                                                     │
│  TRANSFORMS:                                       │
│  Best practice → Non-negotiable requirement        │
│                                                     │
│  WHY:                                              │
│  • Ensures agent understands current state         │
│  • Prevents blind edits                            │
│  • Reduces errors                                  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Edge Case Handling

```
SPECIFIC TECHNICAL ISSUES ADDRESSED:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  1. INDENTATION PRESERVATION                       │
│     ─────────────────────────                      │
│     "Preserve exact indentation for Python/YAML"   │
│     → Prevents syntax errors                       │
│                                                     │
│  2. FILE PATH QUOTING                              │
│     ────────────────────                           │
│     "Quote file paths containing spaces"           │
│     → Prevents command failures                    │
│                                                     │
│  3. PRE-COMMIT HOOK RECOVERY                       │
│     ──────────────────────────                     │
│     "If pre-commit hook modifies staged changes,   │
│      handle appropriately"                         │
│     → Recovers from hook modifications             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 4. PRE-SESSION INTELLIGENCE

## 📌 Magic Before Session Starts

```
PRE-SESSION PROCESSING:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  BEFORE you even type:                             │
│                                                     │
│  Step 1: Project Detection                         │
│  ─────────────────────────                         │
│  • Check if existing project                       │
│  • Read project files                              │
│                                                     │
│  Step 2: Conversation Summary                      │
│  ────────────────────────────                      │
│  • Summarize previous conversation                 │
│  • Extract titles                                  │
│                                                     │
│  Step 3: Topic Analysis                            │
│  ──────────────────────                            │
│  • Analyze current message                         │
│  • Judge: new topic or continuation?               │
│                                                     │
│  "Claude Code front-loads context with tiny,       │
│   targeted prompts before doing real work"         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 5. SYSTEM REMINDERS

## 📌 Sprinkled Everywhere

```
SYSTEM REMINDERS = Drift prevention

┌─────────────────────────────────────────────────────┐
│                                                     │
│  LOCATIONS:                                        │
│  • System prompts                                  │
│  • User prompts                                    │
│  • Tool calls                                      │
│  • Tool results                                    │
│                                                     │
│  PURPOSE:                                          │
│  • Reduce drift                                    │
│  • Keep agent focused                              │
│  • Reinforce important rules                       │
│                                                     │
│  EXAMPLE:                                          │
│  After a long conversation, system reminder:       │
│  "Remember: Always quote file paths with spaces"   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 6. PERMISSION SYSTEM

## 📌 Generative Permissions

```
SURPRISING FINDING:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Permissions are NOT hard-coded!                   │
│                                                     │
│  They are GENERATIVE:                              │
│  • Claude uses specific sub-prompts                │
│  • To request permissions                          │
│  • To detect command injection                     │
│                                                     │
│  PROCESS:                                          │
│  ┌─────────────────────────────────────────┐       │
│  │                                          │       │
│  │  Command to execute: "rm -rf /"          │       │
│  │         │                                │       │
│  │         ▼                                │       │
│  │  Injection check sub-prompt              │       │
│  │         │                                │       │
│  │         ▼                                │       │
│  │  Permission request sub-prompt           │       │
│  │         │                                │       │
│  │         ▼                                │       │
│  │  "This command is dangerous.             │       │
│  │   Do you want to proceed?"               │       │
│  │                                          │       │
│  └─────────────────────────────────────────┘       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Command Prefix Extraction

```
RISK GATING:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Before Bash runs:                                 │
│                                                     │
│  1. Extract command prefix                         │
│  2. Check for injection patterns                   │
│  3. Assess risk level                              │
│  4. Request appropriate permission                 │
│                                                     │
│  "Gates risk with explicit command-prefix          │
│   extraction and injection checks"                 │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 7. EXTENDED CAPABILITIES

## 📌 Thinking Intensity Classifier

```
KEYWORD RECOGNITION:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  System recognizes via regex:                      │
│                                                     │
│  • "think"           → Basic thinking mode         │
│  • "think harder"    → Deeper analysis             │
│  • "ultrathink"      → Maximum reasoning           │
│                                                     │
│  "Users don't need to know proprietary syntax"     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Proactivity Constraints

```
PREVENTING EXCESSIVE PROACTIVITY:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  PROBLEM (Claude 3.7):                             │
│  • Frequently made unwanted changes                │
│  • Modified multiple files without asking          │
│                                                     │
│  SOLUTION (newer versions):                        │
│  • Trained to take action only when requested      │
│  • Explicit prompts constrain proactivity          │
│                                                     │
│  "Prompts constrain excessive proactivity"         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Implementation Details

```
TECHNICAL STACK:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  • Vercel AI SDK for communication                 │
│                                                     │
│  • Backend routing support:                        │
│    - Bedrock                                       │
│    - Vertex                                        │
│    - Custom models                                 │
│                                                     │
│  • Via environment variables                       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 8. TỪ ĐIỂN KEYWORDS

| Từ khóa | Nghĩa | Giải thích thêm |
|---------|-------|-----------------|
| **Prompt Scaffolding** | Khung prompt | Structured prompt organization |
| **Safety Rails** | Rào an toàn | Prevent harmful actions |
| **System Reminders** | Nhắc nhở hệ thống | Keep agent focused |
| **Sub-Agent** | Agent phụ | Isolated context for subtasks |
| **Injection Check** | Kiểm tra injection | Detect malicious commands |
| **Command Prefix** | Tiền tố lệnh | First part of bash command |
| **Drift** | Trôi | Agent going off-track |
| **Generative** | Sinh ra | Created by model, not hardcoded |
| **LiteLLM Proxy** | Proxy LiteLLM | Tool to observe API calls |
| **Minified JavaScript** | JS nén | Compressed JS code |

---

# 📚 TÀI NGUYÊN

## Links
- [Peeking Under the Hood - OutSight AI](https://medium.com/@outsightai/peeking-under-the-hood-of-claude-code-70f5a94a9a62)
- [Under the Hood - Pierce Freeman](https://pierce.dev/notes/under-the-hood-of-claude-code)
- [Claude's System Prompt Analysis](https://dzlab.github.io/ai/2025/05/12/peeking-under-the-hood-claude/)

## Key Insight

> "Every constraint in Claude Code probably came from someone's 3am debugging session or frustrated support issue."
>
> — Pierce Freeman

---

*Tài liệu phân tích kiến trúc và kỹ thuật prompt engineering của Claude Code.*
