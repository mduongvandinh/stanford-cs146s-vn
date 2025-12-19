# 🏢 HOW FAANG VIBE CODES
## Cách các kỹ sư FAANG sử dụng AI để code

---

# 📖 MỤC LỤC

1. [Tổng quan FAANG Workflow](#1-tổng-quan-faang-workflow)
2. [Technical Design Document](#2-technical-design-document)
3. [Sprint Planning](#3-sprint-planning)
4. [AI-Assisted Development](#4-ai-assisted-development)
5. [Code Review Process](#5-code-review-process)
6. [Testing & Deployment](#6-testing--deployment)
7. [Security Considerations](#7-security-considerations)
8. [Từ điển Keywords](#8-từ-điển-keywords)

---

# 1. TỔNG QUAN FAANG WORKFLOW

## 📌 FAANG là gì?

```
FAANG = Facebook (Meta), Amazon, Apple, Netflix, Google

Đặc điểm chung:
┌─────────────────────────────────────────────────────┐
│                                                     │
│  • Massive scale codebases (millions LOC)          │
│  • Rigorous engineering processes                  │
│  • High-stakes production environments             │
│  • Dedicated infrastructure teams                  │
│  • Mature CI/CD pipelines                          │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Complete Workflow

```
FAANG VIBE CODING WORKFLOW:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Phase 1: TECHNICAL DESIGN (Tuần 1-2)              │
│  ────────────────────────────────────              │
│  • Write Technical Design Document (TDD)           │
│  • Stakeholder review & approval                   │
│                                                     │
│           ↓                                        │
│                                                     │
│  Phase 2: PLANNING (Tuần 3)                        │
│  ──────────────────────────                        │
│  • Backlog development                             │
│  • Sprint planning với PM/TPM                      │
│  • Break down into task tickets                    │
│                                                     │
│           ↓                                        │
│                                                     │
│  Phase 3: DEVELOPMENT (Ongoing)                    │
│  ─────────────────────────────                     │
│  • AI-assisted coding                              │
│  • Test-Driven Development                         │
│                                                     │
│           ↓                                        │
│                                                     │
│  Phase 4: REVIEW (Per PR)                          │
│  ────────────────────────                          │
│  • Two-dev approval process                        │
│  • AI-assisted review                              │
│                                                     │
│           ↓                                        │
│                                                     │
│  Phase 5: DEPLOY (After review)                    │
│  ──────────────────────────────                    │
│  • Test in staging                                 │
│  • Push to production                              │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 2. TECHNICAL DESIGN DOCUMENT

## 📌 First weeks = Documentation

> "You still ALWAYS start with a technical design document. This is where a BULK of the work happens."

```
TECHNICAL DESIGN DOCUMENT (TDD):

┌─────────────────────────────────────────────────────┐
│                                                     │
│  PURPOSE: Capture architecture decisions BEFORE     │
│           writing any code                         │
│                                                     │
│  CONTENT:                                          │
│  ─────────────────────────────────────────────     │
│                                                     │
│  1. PROBLEM STATEMENT                              │
│     • What are we solving?                         │
│     • Why now?                                     │
│     • Success metrics                              │
│                                                     │
│  2. PROPOSED SOLUTION                              │
│     • High-level architecture                      │
│     • Key components                               │
│     • Data flow diagrams                           │
│                                                     │
│  3. ALTERNATIVES CONSIDERED                        │
│     • Other approaches                             │
│     • Why rejected                                 │
│                                                     │
│  4. DETAILED DESIGN                                │
│     • API specifications                           │
│     • Database schema                              │
│     • Service interactions                         │
│                                                     │
│  5. RISKS & MITIGATIONS                            │
│     • Technical risks                              │
│     • Security considerations                      │
│     • Rollback plan                                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Design Doc starts as Proposal

```
PROCESS:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Step 1: Author writes initial proposal            │
│           │                                        │
│           ▼                                        │
│  Step 2: Share với stakeholders                    │
│           │                                        │
│           ▼                                        │
│  Step 3: Gather feedback                           │
│           │                                        │
│           ▼                                        │
│  Step 4: Iterate on design                         │
│           │                                        │
│           ▼                                        │
│  Step 5: Final approval                            │
│           │                                        │
│           ▼                                        │
│  Step 6: Design doc becomes "source of truth"      │
│                                                     │
└─────────────────────────────────────────────────────┘

KEY INSIGHT:
"The design doc starts off as a proposal doc.
 If you can get enough stakeholders to agree that
 your proposal has merit..."
```

---

# 3. SPRINT PLANNING

## 📌 From Design to Tasks

```
SPRINT PLANNING PROCESS:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  INPUT: Technical Design Document                  │
│                                                     │
│           ↓                                        │
│                                                     │
│  1. BACKLOG DEVELOPMENT                            │
│  ─────────────────────────                         │
│  • Break design into discrete tasks                │
│  • Estimate complexity                             │
│  • Identify dependencies                           │
│                                                     │
│           ↓                                        │
│                                                     │
│  2. SPRINT PLANNING MEETING                        │
│  ──────────────────────────                        │
│  • PMs (Product Managers) - What to build          │
│  • TPMs (Technical PMs) - Timeline & resources     │
│  • Devs - How to build                             │
│                                                     │
│           ↓                                        │
│                                                     │
│  OUTPUT: Task tickets (Jira/Linear)                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Task Ticket Structure

```
GOOD TASK TICKET:

┌─────────────────────────────────────────────────────┐
│ TICKET-1234: Implement User Authentication         │
├─────────────────────────────────────────────────────┤
│                                                     │
│ DESCRIPTION:                                        │
│ Add JWT-based authentication to the API            │
│                                                     │
│ ACCEPTANCE CRITERIA:                               │
│ □ Users can login with email/password              │
│ □ JWT tokens have 24h expiry                       │
│ □ Refresh tokens implemented                       │
│ □ Rate limiting on auth endpoints                  │
│                                                     │
│ TECHNICAL NOTES:                                   │
│ • Reference design doc section 4.2                 │
│ • Use existing UserService for validation          │
│ • Follow auth patterns in PaymentService           │
│                                                     │
│ LINKS:                                             │
│ • Design Doc: [link]                               │
│ • Related PR: [link]                               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 4. AI-ASSISTED DEVELOPMENT

## 📌 Where AI becomes "Force Multiplier"

> "This is where AI has been a force multiplier."

```
AI IN DEVELOPMENT PHASE:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  WORKFLOW: Test-Driven Development (TDD) với AI    │
│                                                     │
│  Step 1: AI writes tests FIRST                     │
│  ────────────────────────────────                  │
│  Developer: "Write tests for user auth feature"    │
│  AI Agent: Creates test file with:                 │
│            • Test valid login                      │
│            • Test invalid password                 │
│            • Test expired token                    │
│            • Test rate limiting                    │
│                                                     │
│           ↓                                        │
│                                                     │
│  Step 2: AI implements feature                     │
│  ────────────────────────────────                  │
│  Developer: "Now implement to pass these tests"    │
│  AI Agent: Writes implementation code              │
│                                                     │
│           ↓                                        │
│                                                     │
│  Step 3: Tests validate implementation             │
│  ────────────────────────────────                  │
│  CI runs tests → Pass/Fail feedback                │
│                                                     │
│           ↓                                        │
│                                                     │
│  Step 4: Iterate until all tests pass              │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Tại sao TDD với AI hiệu quả?

```
TDD + AI = POWERFUL COMBINATION

┌─────────────────────────────────────────────────────┐
│                                                     │
│  WITHOUT TDD:                                      │
│  ────────────────                                  │
│  AI writes code → Human reviews → Find bugs →      │
│  AI fixes → Human reviews again → ...              │
│  (Many back-and-forth cycles)                      │
│                                                     │
│  WITH TDD:                                         │
│  ──────────                                        │
│  AI writes tests → AI writes code → Tests run →    │
│  AI sees failures → AI fixes → Tests pass → Done   │
│  (AI self-corrects via test feedback)              │
│                                                     │
│  → Tests act as AUTOMATED REVIEWER                 │
│  → Reduces human review burden                     │
│  → Catches issues earlier                          │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 5. CODE REVIEW PROCESS

## 📌 Two-Dev Approval

> "We have a two dev approval process before code can get merged into main."

```
CODE REVIEW PROCESS:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Developer creates PR                              │
│           │                                        │
│           ▼                                        │
│  ┌─────────────────────────────────────────────┐   │
│  │        REVIEWER 1 (Human)                   │   │
│  │                                             │   │
│  │  Checks:                                    │   │
│  │  □ Business logic correctness              │   │
│  │  □ Architecture alignment                  │   │
│  │  □ Code clarity                            │   │
│  │                                             │   │
│  │  Decision: ✅ Approve / ❌ Request changes  │   │
│  └─────────────────────────────────────────────┘   │
│           │                                        │
│           ▼                                        │
│  ┌─────────────────────────────────────────────┐   │
│  │        REVIEWER 2 (Human)                   │   │
│  │                                             │   │
│  │  Checks:                                    │   │
│  │  □ Security implications                   │   │
│  │  □ Performance concerns                    │   │
│  │  □ Test coverage                           │   │
│  │                                             │   │
│  │  Decision: ✅ Approve / ❌ Request changes  │   │
│  └─────────────────────────────────────────────┘   │
│           │                                        │
│           ▼                                        │
│  Both approved → Merge to main                     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 AI in Code Review

> "AI is also showing great promise in assisting with the review."

```
AI-ASSISTED CODE REVIEW:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  AI CAN HELP WITH:                                 │
│  ─────────────────                                 │
│  ✅ Static analysis (bugs, anti-patterns)          │
│  ✅ Security scanning (vulnerabilities)            │
│  ✅ Style checking (formatting, naming)            │
│  ✅ Test coverage analysis                         │
│  ✅ Performance hints                              │
│  ✅ Documentation suggestions                      │
│                                                     │
│  HUMAN STILL NEEDED FOR:                           │
│  ────────────────────────                          │
│  • Business logic validation                       │
│  • Architectural decisions                         │
│  • Edge case reasoning                             │
│  • Final approval                                  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 6. TESTING & DEPLOYMENT

## 📌 Staging to Production

> "Test in staging, and if staging is good to go, we push to prod."

```
DEPLOYMENT PIPELINE:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Code merged to main                               │
│           │                                        │
│           ▼                                        │
│  ┌─────────────────────────────────────────────┐   │
│  │              CI PIPELINE                     │   │
│  │                                             │   │
│  │  □ Unit tests                               │   │
│  │  □ Integration tests                        │   │
│  │  □ Security scans                           │   │
│  │  □ Build artifacts                          │   │
│  │                                             │   │
│  └─────────────────────────────────────────────┘   │
│           │                                        │
│           ▼                                        │
│  ┌─────────────────────────────────────────────┐   │
│  │           STAGING ENVIRONMENT               │   │
│  │                                             │   │
│  │  • Deploy to staging                        │   │
│  │  • Run E2E tests                            │   │
│  │  • Manual QA (if needed)                    │   │
│  │  • Performance testing                      │   │
│  │                                             │   │
│  └─────────────────────────────────────────────┘   │
│           │                                        │
│           ▼                                        │
│  Staging good? ─── No ──→ Fix & retry             │
│           │                                        │
│           │ Yes                                    │
│           ▼                                        │
│  ┌─────────────────────────────────────────────┐   │
│  │            PRODUCTION                       │   │
│  │                                             │   │
│  │  • Canary deployment (small %)              │   │
│  │  • Monitor metrics                          │   │
│  │  • Gradual rollout                          │   │
│  │  • Full deployment                          │   │
│  │                                             │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 7. SECURITY CONSIDERATIONS

## 📌 Carnegie Mellon Research

```
SECURITY WARNING:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  CARNEGIE MELLON PAPER FINDINGS:                   │
│                                                     │
│  "With the strongest setup:"                       │
│                                                     │
│  ┌───────────────────────────────────────────┐     │
│  │                                           │     │
│  │   61% of tasks run CORRECTLY              │     │
│  │   but only                                │     │
│  │   10.5% are SECURE                        │     │
│  │                                           │     │
│  └───────────────────────────────────────────┘     │
│                                                     │
│  → Code that WORKS ≠ Code that is SAFE             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Why FAANG Process Works

```
WHY FAANG VIBE CODING IS SAFER:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  SAFEGUARD 1: Design Doc Review                    │
│  • Security implications discussed upfront         │
│                                                     │
│  SAFEGUARD 2: Two-Dev Approval                     │
│  • Multiple eyes catch issues                      │
│                                                     │
│  SAFEGUARD 3: Automated Security Scans             │
│  • CI catches known vulnerabilities                │
│                                                     │
│  SAFEGUARD 4: Staging Environment                  │
│  • Test before production                          │
│                                                     │
│  SAFEGUARD 5: Gradual Rollout                      │
│  • Canary catches issues early                     │
│                                                     │
│  → AI is a TOOL within a SECURE PROCESS            │
│  → Process prevents AI's security blindspots       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 8. TỪ ĐIỂN KEYWORDS

| Từ khóa | Nghĩa | Giải thích thêm |
|---------|-------|-----------------|
| **FAANG** | Facebook, Amazon, Apple, Netflix, Google | Các big tech companies |
| **TDD** | Technical Design Document | Tài liệu thiết kế kỹ thuật |
| **TDD** (2) | Test-Driven Development | Viết test trước code |
| **PM** | Product Manager | Quản lý sản phẩm |
| **TPM** | Technical Program Manager | PM kỹ thuật |
| **Sprint** | Chu kỳ dev | Thường 2 tuần |
| **Backlog** | Danh sách tasks | Tasks chờ implement |
| **PR** | Pull Request | Request merge code |
| **CI/CD** | Continuous Integration/Deployment | Pipeline tự động |
| **Staging** | Môi trường test | Giống production nhưng không public |
| **Canary** | Triển khai thử | Deploy cho % nhỏ users trước |
| **Force Multiplier** | Bộ nhân lực | Tool tăng productivity |

---

# 📚 TÀI NGUYÊN

## Links
- [Original Twitter Thread](https://x.com/rohanpaul_ai/status/1959414096589422619) - Rohan Paul
- [Reddit Discussion](https://www.reddit.com/r/vibecoding/) - r/vibecoding
- [Carnegie Mellon Security Study](https://www.cmu.edu/) - AI Code Security Research

---

*Tài liệu về cách các kỹ sư FAANG tích hợp AI vào quy trình phát triển phần mềm.*
