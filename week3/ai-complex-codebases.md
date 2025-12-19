# 🏗️ GETTING AI TO WORK IN COMPLEX CODEBASES
## Advanced Context Engineering for Coding Agents

---

# 📖 MỤC LỤC

1. [Vấn đề với Complex Codebases](#1-vấn-đề-với-complex-codebases)
2. [Frequent Intentional Compaction](#2-frequent-intentional-compaction)
3. [Three-Phase Workflow](#3-three-phase-workflow)
4. [Context Window Optimization](#4-context-window-optimization)
5. [Sub-Agents](#5-sub-agents)
6. [Real-World Results](#6-real-world-results)
7. [Critical Caveats](#7-critical-caveats)
8. [Từ điển Keywords](#8-từ-điển-keywords)

---

# 1. VẤN ĐỀ VỚI COMPLEX CODEBASES

## 📌 Brownfield vs Greenfield

```
GREENFIELD PROJECT:
┌─────────────────────────────────────────────────────┐
│                                                     │
│  ┌───────────┐                                     │
│  │   Empty   │  → AI writes from scratch           │
│  │  project  │  → No existing patterns to follow   │
│  └───────────┘  → No conflicts with existing code  │
│                                                     │
│  AI Performance: ████████████████████ EXCELLENT    │
│                                                     │
└─────────────────────────────────────────────────────┘

BROWNFIELD PROJECT (Complex codebase):
┌─────────────────────────────────────────────────────┐
│                                                     │
│  ┌───────────────────────────────────────────┐     │
│  │ 📁 src/                                   │     │
│  │ ├── 📁 components/ (200 files)           │     │
│  │ ├── 📁 services/ (50 files)              │     │
│  │ ├── 📁 utils/ (100 files)                │     │
│  │ ├── 📁 hooks/ (30 files)                 │     │
│  │ └── 📁 types/ (40 files)                 │     │
│  │                                           │     │
│  │ Established patterns                      │     │
│  │ Internal conventions                      │     │
│  │ Complex dependencies                      │     │
│  └───────────────────────────────────────────┘     │
│                                                     │
│  AI Performance: ████████░░░░░░░░░░░ STRUGGLES     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Tại sao AI struggles?

```
RESEARCH FINDINGS:

"AI-generated code often requires SIGNIFICANT REWORK
 and becomes COUNTERPRODUCTIVE in complex, established
 systems rather than greenfield projects."

VẤN ĐỀ CHÍNH:

1. Context Overload
   • 300k LOC không fit trong context window
   • AI không thể "thấy" toàn bộ codebase

2. Pattern Mismatch
   • AI generates code không match existing patterns
   • Integration friction cao

3. Dependency Blindness
   • Không hiểu internal dependencies
   • Breaks existing functionality
```

---

# 2. FREQUENT INTENTIONAL COMPACTION

## 📌 Core Solution

> "Rather than treating context as UNLIMITED, successful AI-assisted development requires DELIBERATE CONTEXT MANAGEMENT throughout the entire workflow."

```
KEY PRINCIPLE:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  MAINTAIN 40-60% CONTEXT UTILIZATION               │
│                                                     │
│  Context Window Usage:                             │
│                                                     │
│  ████████████████████░░░░░░░░░░░░░░░░░░░  40-60%  │
│       ↑                                            │
│       OPTIMAL                                      │
│                                                     │
│  ██████████████████████████████████████░  90-100% │
│       ↑                                            │
│       DANGEROUS - approaching failure modes        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Compaction là gì?

```
COMPACTION = Tóm tắt và loại bỏ context không cần thiết

BEFORE COMPACTION:
┌─────────────────────────────────────────────────────┐
│ Context: 150k tokens                               │
│                                                     │
│ • Full file contents (50k tokens)                  │
│ • All search results (30k tokens)                  │
│ • Complete conversation history (40k tokens)       │
│ • Tool outputs (30k tokens)                        │
└─────────────────────────────────────────────────────┘

AFTER COMPACTION:
┌─────────────────────────────────────────────────────┐
│ Context: 60k tokens                                │
│                                                     │
│ • Summary of file structures (5k tokens)           │
│ • Relevant search results only (10k tokens)        │
│ • Key decisions from conversation (15k tokens)     │
│ • Current working state (30k tokens)               │
└─────────────────────────────────────────────────────┘

→ SAME INFORMATION, LESS NOISE
```

---

# 3. THREE-PHASE WORKFLOW

## 📌 Overview

```
THREE-PHASE WORKFLOW:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Phase 1: RESEARCH                                 │
│  ──────────────────                                │
│  • Understand codebase architecture                │
│  • Identify relevant files                         │
│  • Trace information flow                          │
│                                                     │
│           ↓                                        │
│                                                     │
│  Phase 2: PLANNING                                 │
│  ─────────────────                                 │
│  • Create precise implementation steps             │
│  • Explicit file modifications                     │
│  • Testing strategies                              │
│                                                     │
│           ↓                                        │
│                                                     │
│  Phase 3: IMPLEMENTATION                           │
│  ───────────────────────                           │
│  • Execute plan in phases                          │
│  • Compact after each verified stage              │
│  • Human review at checkpoints                     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Phase 1: Research

```
RESEARCH PHASE ACTIVITIES:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  1. MAP THE ARCHITECTURE                           │
│     • What are the main modules?                   │
│     • How do they communicate?                     │
│     • What are the key patterns?                   │
│                                                     │
│  2. IDENTIFY RELEVANT FILES                        │
│     • Which files will we modify?                  │
│     • What files depend on them?                   │
│     • What tests exist?                            │
│                                                     │
│  3. TRACE INFORMATION FLOW                         │
│     • How does data move through the system?       │
│     • Where are the entry/exit points?             │
│     • What are the side effects?                   │
│                                                     │
└─────────────────────────────────────────────────────┘

OUTPUT: Research document (saved for future reference)
```

## 📌 Phase 2: Planning

```
PLANNING PHASE ACTIVITIES:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  CREATE PRECISE IMPLEMENTATION STEPS:              │
│                                                     │
│  Step 1: Modify src/auth/AuthService.ts           │
│          - Add validateToken() method              │
│          - Update TokenPayload interface           │
│                                                     │
│  Step 2: Update src/middleware/authMiddleware.ts  │
│          - Call new validateToken()                │
│          - Add error handling for invalid tokens   │
│                                                     │
│  Step 3: Add tests in tests/auth/                 │
│          - Test valid token scenarios              │
│          - Test expired token handling             │
│          - Test malformed token rejection          │
│                                                     │
│  Step 4: Update documentation                      │
│          - Add new auth flow to docs/auth.md       │
│                                                     │
└─────────────────────────────────────────────────────┘

KEY INSIGHT:
"Plans derived from THOROUGH RESEARCH outperform
 those created WITHOUT this groundwork"
```

## 📌 Phase 3: Implementation

```
IMPLEMENTATION PHASE:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Execute plan in PHASES with COMPACTION:           │
│                                                     │
│  Phase A: Core changes                             │
│  ────────────────────                              │
│  1. Implement AuthService changes                  │
│  2. Run tests                                      │
│  3. ✓ Verify working                               │
│  4. 🗜️ COMPACT: Summarize phase A results          │
│                                                     │
│  Phase B: Integration                              │
│  ────────────────────                              │
│  1. Update middleware                              │
│  2. Run integration tests                          │
│  3. ✓ Verify working                               │
│  4. 🗜️ COMPACT: Summarize phase B results          │
│                                                     │
│  Phase C: Tests & Docs                             │
│  ────────────────────                              │
│  1. Add remaining tests                            │
│  2. Update documentation                           │
│  3. ✓ Final verification                           │
│  4. 🗜️ FINAL COMPACT: Complete summary             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 4. CONTEXT WINDOW OPTIMIZATION

## 📌 The ONLY lever affecting output quality

> "Context window contents are the ONLY lever affecting output quality."

```
OPTIMIZATION PRIORITIES (theo thứ tự):

┌─────────────────────────────────────────────────────┐
│                                                     │
│  #1 CORRECTNESS  ⚠️ Highest Priority               │
│  ─────────────────────────────────                 │
│  Wrong information is WORST                        │
│  • Outdated code samples                           │
│  • Incorrect API signatures                        │
│  • Hallucinated patterns                           │
│                                                     │
│  #2 COMPLETENESS                                   │
│  ─────────────────────────────────                 │
│  Missing information is BAD                        │
│  • Forgot to include key files                     │
│  • Missing dependencies                            │
│  • Incomplete requirements                         │
│                                                     │
│  #3 SIZE                                           │
│  ─────────────────────────────────                 │
│  Excessive noise is problematic                    │
│  • Too many irrelevant files                       │
│  • Verbose tool outputs                            │
│  • Old conversation history                        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Context Quality Checklist

| Check | Question | Fix |
|-------|----------|-----|
| ✓ | Is this information CORRECT? | Verify before including |
| ✓ | Is this information NECESSARY? | Remove if not needed |
| ✓ | Is this information CURRENT? | Update outdated content |
| ✓ | Is this DUPLICATED elsewhere? | Remove duplicates |

---

# 5. SUB-AGENTS

## 📌 Tại sao dùng Sub-Agents?

```
PROBLEM:
┌─────────────────────────────────────────────────────┐
│                                                     │
│  Main agent context:                               │
│  ┌───────────────────────────────────────────┐     │
│  │ User request                              │     │
│  │ System prompt                             │     │
│  │ Current working files                     │     │
│  │                                           │     │
│  │ + Search results (polluting context)      │←─┐  │
│  │ + File listings (polluting context)       │  │  │
│  │ + Tool outputs (polluting context)        │  │  │
│  └───────────────────────────────────────────┘  │  │
│                                                  │  │
│  Search tool returns 50 files                   ─┘  │
│  → Context bloated with search results              │
│                                                     │
└─────────────────────────────────────────────────────┘

SOLUTION: SUB-AGENTS
┌─────────────────────────────────────────────────────┐
│                                                     │
│  Main agent context:                               │
│  ┌───────────────────────────────────────────┐     │
│  │ User request                              │     │
│  │ System prompt                             │     │
│  │ Current working files                     │     │
│  │ Summary from sub-agent ← Clean summary    │     │
│  └───────────────────────────────────────────┘     │
│                                                     │
│  Sub-agent (fresh context):                        │
│  ┌───────────────────────────────────────────┐     │
│  │ "Find all files related to auth"         │     │
│  │ [Search results - 50 files]              │     │
│  │ [Analysis of results]                    │     │
│  │ → Returns: "3 key files: AuthService.ts, │     │
│  │    authMiddleware.ts, TokenValidator.ts" │     │
│  └───────────────────────────────────────────┘     │
│                                                     │
│  → Main context stays CLEAN                        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Sub-Agent Use Cases

| Task | Why Sub-Agent? |
|------|----------------|
| **Code search** | Returns many results, need summary |
| **File analysis** | Large files, need key points |
| **Documentation lookup** | Verbose docs, need relevant parts |
| **Test analysis** | Many test files, need failure summary |

---

# 6. REAL-WORLD RESULTS

## 📌 Case Study

```
IMPRESSIVE RESULTS:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Developer: Unfamiliar with Rust                   │
│  Codebase: 300k LOC                                │
│  Task: Bug fixes + new features                    │
│                                                     │
│  RESULTS:                                          │
│  ─────────────────────────────────────────────     │
│                                                     │
│  ✅ Fixed bugs in unfamiliar codebase              │
│  ✅ Shipped 35k lines of code                      │
│  ✅ Added cancellation support                     │
│  ✅ Added WASM support                             │
│                                                     │
│  TIME COMPARISON:                                  │
│  ─────────────────────────────────────────────     │
│  Senior engineer estimate: 3-5 days per feature   │
│  With ACE methodology: ~7 hours total              │
│                                                     │
│  → 5-10x speedup                                   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Key Success Factors

```
WHY IT WORKED:

1. ✅ Three-phase workflow (Research → Plan → Implement)
2. ✅ Frequent context compaction
3. ✅ Sub-agents for searching
4. ✅ Human validation at each phase
5. ✅ Building leverage into pipeline

WHY IT MIGHT NOT WORK:

1. ❌ Skipping research phase
2. ❌ Letting context bloat
3. ❌ No human review
4. ❌ Looking for "magic prompt"
```

---

# 7. CRITICAL CAVEATS

## 📌 This is NOT a magic solution

```
CRITICAL CAVEAT:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  "This approach requires ENGAGED HUMAN              │
│   PARTICIPATION"                                   │
│                                                     │
│  ❌ NOT: "Paste task, get code"                    │
│  ✅ IS: "Collaborate with AI strategically"        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Human responsibilities

| Phase | Human Must Do |
|-------|---------------|
| **Research** | Validate research outputs |
| **Planning** | Review and approve plan |
| **Implementation** | Verify each phase works |
| **Throughout** | Guide direction, catch errors |

```
THE GOAL:

"Success depends on BUILDING LEVERAGE into the pipeline,
 NOT finding a magical prompt"

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Human expertise amplified by AI                   │
│       ≠                                            │
│  AI replacing human expertise                      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 8. TỪ ĐIỂN KEYWORDS

| Từ khóa | Nghĩa | Giải thích thêm |
|---------|-------|-----------------|
| **Brownfield** | Dự án đã có code | Codebase existing với patterns có sẵn |
| **Greenfield** | Dự án mới | Bắt đầu từ đầu, không có code cũ |
| **Compaction** | Nén context | Tóm tắt và loại bỏ context không cần |
| **Context Utilization** | Sử dụng context | Phần trăm context đang dùng |
| **Sub-Agent** | Agent phụ | Agent con với context riêng |
| **ACE** | Advanced Context Engineering | Phương pháp quản lý context |
| **LOC** | Lines of Code | Số dòng code |
| **WASM** | WebAssembly | Format chạy code trong browser |
| **Leverage** | Đòn bẩy | Tăng hiệu quả thông qua tool/process |
| **Pipeline** | Quy trình | Chuỗi các bước xử lý |

---

# 📚 TÀI NGUYÊN

## Links
- [Advanced Context Engineering for Coding Agents](https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/ace-fca.md) - Bài gốc
- [HumanLayer](https://humanlayer.dev) - Team phát triển

---

*Tài liệu về Advanced Context Engineering - phương pháp giúp AI làm việc hiệu quả với complex codebases.*
