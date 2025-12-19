# 🤖 DEVIN: CODING AGENTS 101
## Hướng dẫn làm việc với AI Coding Agents

---

# 📖 MỤC LỤC

1. [Coding Agents là gì?](#1-coding-agents-là-gì)
2. [Evolution của Developer Tooling](#2-evolution-của-developer-tooling)
3. [Core Principles](#3-core-principles)
4. [Prompting Strategy](#4-prompting-strategy)
5. [Providing Context](#5-providing-context)
6. [Feedback Loops](#6-feedback-loops)
7. [Use Cases](#7-use-cases)
8. [Known Limitations](#8-known-limitations)
9. [Từ điển Keywords](#9-từ-điển-keywords)

---

# 1. CODING AGENTS LÀ GÌ?

## 📌 Định nghĩa

> "Coding agents aren't magic, but they're about the closest thing we have."

```
CODING AGENT = Autonomous system có thể:
┌─────────────────────────────────────────────────────┐
│                                                     │
│  • Nhận task description từ user                   │
│  • Tự tìm hiểu codebase                           │
│  • Viết code                                       │
│  • Test code                                       │
│  • Fix bugs                                        │
│  • Create pull requests                            │
│                                                     │
│  ...với minimal human intervention                 │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Đặc điểm của Coding Agents

| Đặc điểm | Mô tả |
|----------|-------|
| **Autonomous** | Tự thực hiện nhiều bước liên tiếp |
| **Tool-using** | Sử dụng được CLI, IDE, browser |
| **Iterative** | Có thể tự sửa lỗi qua nhiều vòng |
| **Context-aware** | Hiểu được codebase hiện có |

```
SO SÁNH VỚI CHATGPT/COPILOT:

ChatGPT:
User: "Write a function to sort array"
AI: "Here's the code: ..." [One-shot response]

Coding Agent:
User: "Add sorting to the user list"
AI:
  1. Reads existing UserList component
  2. Understands current state structure
  3. Implements sorting function
  4. Updates UI to add sort controls
  5. Writes tests
  6. Creates PR
  [Multi-step autonomous execution]
```

---

# 2. EVOLUTION CỦA DEVELOPER TOOLING

## 📌 Timeline phát triển

```
EVOLUTION OF AI DEV TOOLS:

2020: AUTOCOMPLETE
┌─────────────────────────────────────────────────────┐
│  User types: "function calc"                       │
│  AI suggests: "ulateTotal(items) {"                │
│                                                     │
│  → Single line/word completion                     │
└─────────────────────────────────────────────────────┘
            │
            ▼
2021-2022: COPILOTS
┌─────────────────────────────────────────────────────┐
│  User types: "// Sort array by date"               │
│  AI writes: Entire function                        │
│                                                     │
│  → Multi-line completion, comment-to-code          │
└─────────────────────────────────────────────────────┘
            │
            ▼
2023: CHATBOTS
┌─────────────────────────────────────────────────────┐
│  User asks: "How do I implement caching?"          │
│  AI explains: Architecture + code + best practices │
│                                                     │
│  → Conversational, educational                     │
└─────────────────────────────────────────────────────┘
            │
            ▼
2024-2025: CODING AGENTS
┌─────────────────────────────────────────────────────┐
│  User says: "Add caching to the API"               │
│  AI does: Research → Plan → Implement → Test → PR  │
│                                                     │
│  → Autonomous, end-to-end task completion          │
└─────────────────────────────────────────────────────┘
```

## 📌 Sự khác biệt chính

| Feature | Autocomplete | Copilot | Chatbot | Agent |
|---------|--------------|---------|---------|-------|
| Scope | Token/Line | Function | Conversation | Task |
| Autonomy | None | Low | Medium | High |
| Tools | None | None | None | CLI, IDE, Browser |
| Iteration | None | None | Manual | Automatic |

---

# 3. CORE PRINCIPLES

## 📌 Nguyên tắc cốt lõi khi làm việc với Coding Agents

### Principle 1: Treat as Junior Developer

```
MINDSET ĐÚNG:
┌─────────────────────────────────────────────────────┐
│                                                     │
│  Agent = Junior coding partner                     │
│                                                     │
│  ✅ Cần oversight                                  │
│  ✅ Cần detailed guidance                          │
│  ✅ Cần clear direction                            │
│  ✅ Work đang improve nhanh chóng                  │
│                                                     │
│  ❌ Không phải senior engineer                     │
│  ❌ Không nên trust blindly                        │
│  ❌ Không thể handle complex architecture alone    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Principle 2: Guidance > Goals

```
VÍ DỤ:

❌ CHỈ NÓI GOAL:
"Fix the login bug"

✅ NÓI GOAL + GUIDANCE:
"Fix the login bug.
 - Check AuthService.ts first
 - The issue is likely in token validation
 - Use the existing ErrorHandler pattern
 - Add a test case for empty tokens"

→ Articulate HOW you want things done
  không chỉ WHAT you want done
```

---

# 4. PROMPTING STRATEGY

## 📌 Cách viết prompt hiệu quả cho Agents

### Template cơ bản

```
EFFECTIVE AGENT PROMPT STRUCTURE:

┌─────────────────────────────────────────────────────┐
│ 1. TASK: What needs to be done                     │
│                                                     │
│ 2. CONTEXT: Where to start, relevant files         │
│                                                     │
│ 3. APPROACH: How to do it                          │
│                                                     │
│ 4. CONSTRAINTS: What to avoid                      │
│                                                     │
│ 5. VERIFICATION: How to know it's done             │
└─────────────────────────────────────────────────────┘
```

### Ví dụ áp dụng

```
❌ PROMPT KÉM:
"Add dark mode to the app"

✅ PROMPT TỐT:
"Add dark mode toggle to the settings page.

CONTEXT:
- Settings page: src/pages/Settings.tsx
- Theme system: src/styles/theme.ts (uses CSS variables)
- Similar toggle: src/components/NotificationToggle.tsx

APPROACH:
- Create a new ThemeToggle component following NotificationToggle pattern
- Store preference in localStorage
- Apply theme via CSS class on document.body

CONSTRAINTS:
- Don't modify existing color values, only add dark variants
- Keep toggle accessible (keyboard navigation)

VERIFICATION:
- Theme persists after refresh
- All text remains readable in both modes
- Toggle animates smoothly"
```

## 📌 Defensive Prompting

```
DEFENSIVE PROMPTING = Anticipate points of confusion

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Nghĩ trước: "Agent có thể hiểu sai ở đâu?"       │
│                                                     │
│  Ví dụ:                                            │
│                                                     │
│  Task: "Update the user model"                     │
│                                                     │
│  Potential confusions:                             │
│  • Which user model? (DB model vs API model)       │
│  • Update how? (Add field? Change type?)           │
│  • Migration needed?                               │
│                                                     │
│  → Address ALL in prompt upfront                   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 5. PROVIDING CONTEXT

## 📌 Specify WHERE to begin

```
CONTEXT CHECKLIST:

✅ Relevant repositories/directories
   "Start with /src/features/auth/"

✅ Key files to read first
   "Read AuthContext.tsx to understand current state"

✅ Related documentation
   "See docs/auth-flow.md for the current flow"

✅ Similar implementations
   "ProfileSettings.tsx has a similar pattern"

✅ External dependencies
   "We use @auth0/auth0-react for authentication"
```

## 📌 Ví dụ Context tốt

```
TASK: Add email verification to signup

CONTEXT PROVIDED:

📁 Repository structure:
├── src/
│   ├── features/
│   │   └── auth/           ← Start here
│   │       ├── SignUp.tsx
│   │       ├── AuthService.ts
│   │       └── types.ts
│   └── services/
│       └── EmailService.ts  ← Use this for sending

📄 Key files:
- SignUp.tsx: Current signup form
- AuthService.ts: API calls for auth
- EmailService.ts: Already has sendEmail()

📚 Docs:
- docs/api/email.md: Email API spec

🔗 Similar feature:
- PasswordReset.tsx: Uses similar email flow
```

---

# 6. FEEDBACK LOOPS

## 📌 Tầm quan trọng của Feedback Loops

> "Agents perform significantly better when given access to CI systems, unit tests, type checkers, and linters"

```
FEEDBACK LOOPS CHO AGENT:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Agent writes code                                 │
│         │                                          │
│         ▼                                          │
│  ┌─────────────────────────┐                       │
│  │    FEEDBACK SOURCES     │                       │
│  │                         │                       │
│  │  • TypeScript errors    │                       │
│  │  • ESLint warnings      │                       │
│  │  • Unit test results    │                       │
│  │  • CI/CD pipeline       │                       │
│  │                         │                       │
│  └───────────┬─────────────┘                       │
│              │                                     │
│              ▼                                     │
│  Agent sees errors → Self-corrects → Tries again  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Setup ideal cho Agent

| Tool | Purpose | Benefit |
|------|---------|---------|
| **TypeScript** | Type checking | Catch type errors immediately |
| **ESLint** | Code style | Maintain consistency |
| **Prettier** | Formatting | No manual formatting fixes |
| **Jest/Vitest** | Unit tests | Verify behavior |
| **CI Pipeline** | Integration | End-to-end validation |

```
AGENT VỚI FEEDBACK VS KHÔNG FEEDBACK:

Không có feedback:
Agent writes code → Commits → Humans find bugs later
                              (Expensive to fix)

Có feedback:
Agent writes code → Tests fail → Agent fixes →
Tests pass → Agent commits → Higher quality
                              (Self-correcting)
```

---

# 7. USE CASES

## 📌 Agent làm tốt việc gì?

### Best Use Cases

```
✅ AGENT PHÙ HỢP:

1. URGENT BUG FIXES (không interrupt focus)
   "Critical bug in production, need hotfix"
   → Agent investigates + fixes while you focus elsewhere

2. REPETITIVE TASKS
   • Documentation updates
   • Dependency upgrades
   • Adding logging/monitoring
   • Boilerplate generation

3. FIRST DRAFTS (1-6 hours of work)
   • New feature skeleton
   • API endpoint + tests
   • Component with basic functionality

4. CODE REVIEWS
   • Static analysis
   • Security scanning
   • Style checking
   • Test coverage analysis
```

### Workflow integration

```
PRACTICAL WORKFLOW:

Morning:
1. Review agent's overnight work
2. Assign new tasks to agent
3. Focus on complex architecture work

During day:
4. Agent handles interruptions (bug reports)
5. Agent does code reviews
6. You do creative/complex work

End of day:
7. Queue tasks for overnight
8. Agent works while you sleep
```

---

# 8. KNOWN LIMITATIONS

## 📌 Agents KHÔNG làm tốt việc gì?

```
❌ AGENT STRUGGLES WITH:

1. COMPLEX DEBUGGING
┌─────────────────────────────────────────────────────┐
│  Requires: Database logs, system metrics, network  │
│  traces, memory profiling                          │
│                                                     │
│  Agent limitation: No direct access to production  │
│  systems, logs scattered across tools              │
└─────────────────────────────────────────────────────┘

2. FINE-GRAINED VISUAL DESIGN
┌─────────────────────────────────────────────────────┐
│  Requires: Pixel-perfect matching to designs       │
│                                                     │
│  Agent limitation: Can't "see" visual output       │
│  accurately, struggles with design nuance          │
└─────────────────────────────────────────────────────┘

3. NEW/UNDOCUMENTED LIBRARIES
┌─────────────────────────────────────────────────────┐
│  Requires: Knowledge of latest APIs                │
│                                                     │
│  Agent limitation: Training data cutoff,           │
│  needs explicit documentation provided             │
└─────────────────────────────────────────────────────┘

4. COMPLEX ARCHITECTURE DECISIONS
┌─────────────────────────────────────────────────────┐
│  Requires: Business context, team preferences,     │
│  long-term maintenance considerations              │
│                                                     │
│  Agent limitation: Lacks organizational context    │
└─────────────────────────────────────────────────────┘
```

## 📌 Human expertise vẫn ESSENTIAL

```
VERIFICATION CHECKLIST (Human must do):

□ Security review
□ Performance implications
□ Business logic correctness
□ Edge case handling
□ Architectural fit
□ Code quality standards
□ Documentation completeness
```

---

# 9. TỪ ĐIỂN KEYWORDS

| Từ khóa | Nghĩa | Giải thích thêm |
|---------|-------|-----------------|
| **Coding Agent** | Agent lập trình | AI tự động hóa nhiều bước coding |
| **Autonomous** | Tự chủ | Tự thực hiện mà không cần hướng dẫn từng bước |
| **Defensive Prompting** | Prompt phòng thủ | Dự đoán và ngăn chặn hiểu sai |
| **Feedback Loop** | Vòng phản hồi | Hệ thống cho phép agent tự sửa lỗi |
| **CI/CD** | Continuous Integration/Deployment | Pipeline tự động test và deploy |
| **First Draft** | Bản nháp đầu | Phiên bản initial cần review |
| **Oversight** | Giám sát | Theo dõi và kiểm tra agent |
| **Iteration** | Lặp lại | Nhiều vòng cải tiến |
| **Pull Request (PR)** | Yêu cầu merge code | Request để merge code vào main |
| **Hotfix** | Sửa nóng | Fix bug khẩn cấp trên production |

---

# 📚 TÀI NGUYÊN

## Links
- [Devin Coding Agents 101](https://devin.ai/agents101) - Bài gốc từ Cognition
- [Devin AI](https://devin.ai) - Homepage

---

*Tài liệu hướng dẫn làm việc hiệu quả với AI Coding Agents, từ team phát triển Devin.*
