# 🎯 CLAUDE CODE BEST PRACTICES
## Hướng dẫn sử dụng Claude Code hiệu quả từ Anthropic

---

# 📖 MỤC LỤC

1. [Customizing Your Setup](#1-customizing-your-setup)
2. [Expanding Capabilities](#2-expanding-capabilities)
3. [Effective Workflows](#3-effective-workflows)
4. [Workflow Optimization](#4-workflow-optimization)
5. [Automation với Headless Mode](#5-automation-với-headless-mode)
6. [Multi-Claude Workflows](#6-multi-claude-workflows)
7. [Từ điển Keywords](#7-từ-điển-keywords)

---

# 1. CUSTOMIZING YOUR SETUP

## 📌 CLAUDE.md Files

```
CLAUDE.md = Special configuration files

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Claude tự động đọc và incorporate vào prompts     │
│                                                     │
│  NÊN DOCUMENT:                                     │
│  ──────────────                                    │
│  • Common bash commands                            │
│  • Core files và utility functions                 │
│  • Code style guidelines                           │
│  • Testing instructions                            │
│  • Deployment procedures                           │
│  • Repository conventions                          │
│  • Dev environment setup                           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Vị trí đặt CLAUDE.md

```
CÁC VỊ TRÍ CÓ THỂ ĐẶT:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  1. Repo root: ./CLAUDE.md                         │
│     → Áp dụng cho toàn bộ project                  │
│                                                     │
│  2. Parent directories (monorepo)                  │
│     → Áp dụng cho all child projects               │
│                                                     │
│  3. Child directories                              │
│     → Áp dụng cho specific modules                 │
│                                                     │
│  4. Home folder: ~/.claude/CLAUDE.md               │
│     → Áp dụng GLOBAL cho all sessions              │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Tuning Configuration

> "CLAUDE.md files become part of Claude's prompts, so they should be refined like any frequently used prompt."

```
TIPS TỐI ƯU CLAUDE.md:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  1. Dùng # key để tự động add frequently used      │
│                                                     │
│  2. Chạy qua prompt improvers định kỳ              │
│                                                     │
│  3. Nhấn mạnh keywords quan trọng:                 │
│     • "IMPORTANT"                                  │
│     • "YOU MUST"                                   │
│     • "ALWAYS"                                     │
│     • "NEVER"                                      │
│     → Improves adherence                           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Curate Allowed Tools

```
CÁCH CUSTOMIZE PERMISSIONS:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Option 1: During sessions                         │
│  → Select "Always allow" khi được hỏi              │
│                                                     │
│  Option 2: /permissions command                    │
│  → Manage trong Claude Code                        │
│                                                     │
│  Option 3: Edit config files                       │
│  → .claude/settings.json (project)                 │
│  → ~/.claude.json (global)                         │
│                                                     │
│  Option 4: CLI flag                                │
│  → --allowedTools                                  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 2. EXPANDING CAPABILITIES

## 📌 Bash Tools Integration

```
CLAUDE INHERITS YOUR SHELL ENVIRONMENT

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Custom tools cần provide:                         │
│                                                     │
│  1. Tool names với usage examples                  │
│                                                     │
│  2. Encourage --help                               │
│     "Run tool --help to see full options"          │
│                                                     │
│  3. Entries trong CLAUDE.md                        │
│     ```                                            │
│     # Available Tools                              │
│     - mytool: Custom deployment script             │
│       Usage: mytool deploy --env staging           │
│     ```                                            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 MCP Servers

```
MCP (Model Context Protocol) CONFIGURATION:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  3 CÁCH CONFIGURE:                                 │
│                                                     │
│  1. Project config                                 │
│     → Directory-specific access                    │
│     → File: .claude/mcp.json                       │
│                                                     │
│  2. Global config                                  │
│     → Available everywhere                         │
│     → File: ~/.claude/mcp.json                     │
│                                                     │
│  3. Checked-in .mcp.json                          │
│     → Team-wide availability                       │
│     → Commit to repo                               │
│                                                     │
│  DEBUG:                                            │
│  → Use --mcp-debug flag                            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Custom Slash Commands

```
SLASH COMMANDS = Prompt templates

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Location: .claude/commands/                       │
│                                                     │
│  Example: .claude/commands/fix-github-issue.md     │
│  ─────────────────────────────────────────────     │
│  ```markdown                                       │
│  Fix GitHub issue #$ARGUMENTS                      │
│                                                     │
│  Steps:                                            │
│  1. Read the issue details                         │
│  2. Understand the problem                         │
│  3. Find relevant code                             │
│  4. Implement fix                                  │
│  5. Write tests                                    │
│  6. Create PR                                      │
│  ```                                               │
│                                                     │
│  Usage: /project:fix-github-issue 123              │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 3. EFFECTIVE WORKFLOWS

## 📌 Explore → Plan → Code → Commit

```
4-STEP WORKFLOW (Suits most problems):

┌─────────────────────────────────────────────────────┐
│                                                     │
│  STEP 1: EXPLORE                                   │
│  ─────────────────                                 │
│  • Read relevant files                             │
│  • DON'T write code yet                            │
│  • Understand context first                        │
│                                                     │
│  STEP 2: PLAN                                      │
│  ─────────────────                                 │
│  • Use thinking modes:                             │
│    - "think" → basic                               │
│    - "think hard" → deeper                         │
│    - "ultrathink" → deepest analysis               │
│  • Create plan before coding                       │
│                                                     │
│  STEP 3: CODE                                      │
│  ─────────────────                                 │
│  • Implement solution                              │
│  • Verify reasonableness during coding             │
│                                                     │
│  STEP 4: COMMIT                                    │
│  ─────────────────                                 │
│  • Document changes                                │
│  • Commit with good message                        │
│                                                     │
└─────────────────────────────────────────────────────┘

"Early exploration and planning significantly
 improve outcomes for complex problems"
```

## 📌 Test-Driven Development (TDD)

```
TDD WORKFLOW VỚI CLAUDE:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  1. Write tests first                              │
│     → Based on expected inputs/outputs             │
│                                                     │
│  2. Confirm tests FAIL                             │
│     → Verify tests work correctly                  │
│                                                     │
│  3. Commit tests                                   │
│     → Lock in the contract                         │
│                                                     │
│  4. Write code iteratively                         │
│     → Until tests pass                             │
│                                                     │
│  5. Commit implementation                          │
│     → Final working code                           │
│                                                     │
└─────────────────────────────────────────────────────┘

"Claude performs BEST when it has a CLEAR TARGET
 to iterate against"
```

## 📌 Visual Iteration

```
UI DEVELOPMENT WORKFLOW:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  1. Provide screenshot capability                  │
│     • Puppeteer                                    │
│     • iOS Simulator                                │
│     • Manual screenshots                           │
│                                                     │
│  2. Share visual mocks                             │
│     • Figma exports                                │
│     • Design screenshots                           │
│                                                     │
│  3. Claude implements                              │
│         ↓                                          │
│  4. Claude screenshots result                      │
│         ↓                                          │
│  5. Claude compares with mock                      │
│         ↓                                          │
│  6. Iterate until matching                         │
│         ↓                                          │
│  7. Commit when satisfied                          │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Git và GitHub Interactions

```
CLAUDE CÓ THỂ:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  GIT:                                              │
│  • Search git history cho context                  │
│  • Write commit messages based on changes          │
│  • Complex operations (revert, rebase)             │
│  • Resolve merge conflicts                         │
│                                                     │
│  GITHUB:                                           │
│  • Create pull requests                            │
│  • Fix code review comments                        │
│  • Triage issues                                   │
│  • Categorize issues                               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 4. WORKFLOW OPTIMIZATION

## 📌 Be Specific

```
SPECIFICITY = BETTER RESULTS

❌ VAGUE:
"Add tests for foo.py"

✅ SPECIFIC:
"Write a new test case for foo.py covering the
 edge case where the user is logged out.
 Avoid mocks. Use real database fixtures."

→ Specificity reduces course corrections
```

## 📌 Use Visual Context

```
VISUAL INPUT OPTIONS:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  1. Paste screenshots                              │
│     macOS: Cmd+Ctrl+Shift+4 → clipboard            │
│     Then: Ctrl+V to paste                          │
│                                                     │
│  2. Drag-and-drop images                           │
│                                                     │
│  3. File paths to images                           │
│     "Look at ./designs/mock.png"                   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Course Correct Early

```
INTERRUPTION TECHNIQUES:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  • Ask Claude to plan BEFORE coding                │
│    → Confirm before proceeding                     │
│                                                     │
│  • Press Escape                                    │
│    → Interrupt and redirect                        │
│                                                     │
│  • Double-tap Escape                               │
│    → Jump back, explore alternatives               │
│                                                     │
│  • Ask Claude to undo                              │
│    → Revert changes when needed                    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Keep Context Focused

```
/clear COMMAND:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Use /clear between tasks                          │
│                                                     │
│  Benefits:                                         │
│  • Reset context window                            │
│  • Improve performance                             │
│  • Reduce distractions from old context            │
│                                                     │
│  When to use:                                      │
│  • Starting new task                               │
│  • Context getting cluttered                       │
│  • Claude seems confused                           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Use Checklists

```
CHECKLISTS FOR COMPLEX TASKS:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Task: Large migration với nhiều files             │
│                                                     │
│  Approach:                                         │
│  1. Have Claude create Markdown checklist          │
│  2. Work through items systematically              │
│  3. Verify each before moving forward              │
│                                                     │
│  Example checklist:                                │
│  - [ ] Update User model                           │
│  - [ ] Update UserController                       │
│  - [ ] Update UserService                          │
│  - [ ] Update tests                                │
│  - [ ] Run migrations                              │
│  - [ ] Verify all tests pass                       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 5. AUTOMATION VỚI HEADLESS MODE

## 📌 CLI Automation

```
HEADLESS MODE:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Flag: -p với --output-format stream-json          │
│                                                     │
│  Use cases:                                        │
│  • CI pipelines                                    │
│  • Pre-commit hooks                                │
│  • Build scripts                                   │
│  • Automated workflows                             │
│                                                     │
│  Example:                                          │
│  claude -p "Review this PR" --output-format json   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Example Use Cases

```
AUTOMATION EXAMPLES:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  1. ISSUE TRIAGE                                   │
│     → Auto-label new GitHub issues                 │
│                                                     │
│  2. CODE REVIEW                                    │
│     → Detect typos                                 │
│     → Find stale comments                          │
│     → Identify misleading names                    │
│     → Beyond traditional linting                   │
│                                                     │
│  3. DOCUMENTATION                                  │
│     → Auto-update docs on code changes             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 6. MULTI-CLAUDE WORKFLOWS

## 📌 Parallel Verification

```
TWO-CLAUDE PATTERN:

┌─────────────────────────────────────────────────────┐
│                                                     │
│   Claude 1            Claude 2                     │
│   ┌───────────┐       ┌───────────┐               │
│   │  WRITES   │       │  REVIEWS  │               │
│   │   code    │  ───► │   code    │               │
│   └───────────┘       └───────────┘               │
│                                                     │
│   Different contexts = Better results              │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Multiple Repository Checkouts

```
PARALLEL SESSIONS:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Create 3-4 checkouts:                             │
│                                                     │
│  ~/projects/myapp/              → Claude 1         │
│  ~/projects/myapp-feature-a/    → Claude 2         │
│  ~/projects/myapp-feature-b/    → Claude 3         │
│  ~/projects/myapp-bugfix/       → Claude 4         │
│                                                     │
│  Run parallel Claude sessions on different tasks   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Git Worktrees

```
LIGHTER-WEIGHT APPROACH:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Create worktree:                                  │
│  git worktree add ../project-feature-a feature-a   │
│                                                     │
│  Run Claude in each:                               │
│  cd ../project-feature-a && claude                 │
│                                                     │
│  Clean up:                                         │
│  git worktree remove ../project-feature-a          │
│                                                     │
│  Benefits:                                         │
│  • Lighter than full checkouts                     │
│  • Shared git history                              │
│  • Independent working directories                 │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 7. TỪ ĐIỂN KEYWORDS

| Từ khóa | Nghĩa | Giải thích thêm |
|---------|-------|-----------------|
| **CLAUDE.md** | Config file | File cấu hình cho Claude Code |
| **MCP** | Model Context Protocol | Protocol kết nối tools |
| **Slash Commands** | Lệnh / | Custom commands trong .claude/commands/ |
| **Headless Mode** | Chế độ không UI | Chạy automation không cần interactive |
| **TDD** | Test-Driven Development | Viết test trước code |
| **Git Worktrees** | Nhánh làm việc | Multiple branches trong separate directories |
| **Course Correct** | Điều chỉnh hướng | Thay đổi direction khi cần |
| **Context Window** | Cửa sổ ngữ cảnh | Bộ nhớ làm việc của AI |
| **Thinking Modes** | Chế độ suy nghĩ | think, think hard, ultrathink |
| **YOLO Mode** | Chế độ không permission | --dangerously-skip-permissions |

---

# 📚 TÀI NGUYÊN

## Links
- [Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices) - Bài gốc
- [Claude Code Documentation](https://docs.anthropic.com/claude-code)
- [MCP Documentation](https://modelcontextprotocol.io)

---

*Tài liệu hướng dẫn best practices cho Claude Code từ Anthropic Engineering team.*
