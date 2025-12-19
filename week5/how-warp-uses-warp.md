# 🔄 HOW WARP USES WARP TO BUILD WARP
## Cách team Warp dùng sản phẩm của mình

---

# 📖 MỤC LỤC

1. [Tổng quan](#1-tổng-quan)
2. [Block Sharing](#2-block-sharing)
3. [Team Workflows](#3-team-workflows)
4. [Quake Mode](#4-quake-mode)
5. [AI Command Search](#5-ai-command-search)
6. [Onboarding Benefits](#6-onboarding-benefits)
7. [Key Takeaways](#7-key-takeaways)
8. [Từ điển Keywords](#8-từ-điển-keywords)

---

# 1. TỔNG QUAN

## 📌 Dogfooding at Warp

```
WARP TEAM PRACTICES:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  "Members of the Warp team have written about      │
│   how they've integrated some of Warp's cooler     │
│   features into their day-to-day workflows"        │
│                                                     │
│  FOCUS AREAS:                                      │
│  • Block Sharing                                   │
│  • Team Workflows                                  │
│  • Quake Mode                                      │
│  • AI Command Search                               │
│                                                     │
│  → Beyond expected features (split panes, etc.)    │
│  → Unique features improving terminal status quo   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Key Insight

> "Team members have become dependent on features like block sharing, launch configurations, and saved workflows that don't exist in other terminals like VS Code's integrated terminal."

---

# 2. BLOCK SHARING

## 📌 What is Block Sharing?

```
BLOCK SHARING = Shareable terminal permalinks

┌─────────────────────────────────────────────────────┐
│                                                     │
│  TRADITIONAL WAY:                                  │
│  • Screenshot terminal                             │
│  • Copy-paste output                               │
│  • Lose colors and formatting                      │
│                                                     │
│  WARP WAY:                                         │
│  • Create web permalink                            │
│  • Share link in Slack                             │
│  • Colors and ANSI escape sequences preserved      │
│  • Teammates see exact input + output              │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Real Use Case

```
EXAMPLE: Onboarding Question

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Intern asks: "How to know if a keyboard           │
│               shortcut is already mapped?"         │
│                                                     │
│  Team member shares block:                         │
│  ┌─────────────────────────────────────────────┐   │
│  │ $ grep -r "CMD+K" src/                      │   │
│  │ src/keybindings.rs:23: CMD+K -> new_tab     │   │
│  │ src/keybindings.rs:45: CMD+K+K -> close_all │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  → No need to explain command                      │
│  → Intern sees exact output                        │
│  → Colors preserved                                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Block Persistence

```
BLOCK STORAGE:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  "Blocks last FOREVER (or as long as you want)"    │
│                                                     │
│  • Stored under user settings indefinitely         │
│  • Until user decides to unshare                   │
│  • Data deleted from Warp servers permanently      │
│    when unshared                                   │
│                                                     │
│  → Great for documentation                         │
│  → Reusable references                             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 3. TEAM WORKFLOWS

## 📌 Repository-Level Workflows

```
TEAM WORKFLOWS CONCEPT:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Workflows can be created at REPOSITORY LEVEL      │
│                                                     │
│  repo/.warp/workflows/                             │
│  ├── deploy.yaml                                   │
│  ├── cherrypick.yaml                               │
│  └── allowlist-ip.yaml                             │
│                                                     │
│  → Shared across team                              │
│  → Searchable                                      │
│  → Documented                                      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Example: Cherrypick Workflow

```
ON-CALL SCENARIO:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  PROBLEM:                                          │
│  • Breaking change in production                   │
│  • Need to cherrypick commit to release branch     │
│  • Command is LONG and hard to remember            │
│  • On-call engineer running unfamiliar commands    │
│                                                     │
│  SOLUTION: Team Workflow                           │
│                                                     │
│  # cherrypick.yaml                                 │
│  name: Cherrypick to release                       │
│  command: |-                                       │
│    git fetch origin &&                             │
│    git checkout release/{{version}} &&            │
│    git cherry-pick {{commit_hash}} &&             │
│    git push origin release/{{version}}            │
│  arguments:                                        │
│    - name: version                                 │
│      description: Release version (e.g., 2.1)     │
│    - name: commit_hash                            │
│      description: Commit to cherrypick            │
│                                                     │
│  → Search "cherrypick" → Fill params → Run         │
│  → No memorization needed                          │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Example: Allowlist IP

```
COMMON SLACK QUESTION:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  #help channel: "How do I add my IP to staging?"   │
│                                                     │
│  → Most commonly asked question                    │
│  → Needed for accessing dev build                  │
│  → New team members ask repeatedly                 │
│                                                     │
│  SOLUTION:                                         │
│                                                     │
│  # allowlist-ip.yaml                               │
│  name: Allowlist IP address for staging            │
│  command: |-                                       │
│    curl -X POST https://staging.warp.dev/api/ip \  │
│    -H "Authorization: Bearer $STAGING_TOKEN" \     │
│    -d '{"ip": "{{ip_address}}"}'                   │
│  arguments:                                        │
│    - name: ip_address                              │
│      description: Your IP address                  │
│                                                     │
│  → People find it in workflow search               │
│  → Reduce Slack questions                          │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Adding Workflows is Simple

```
WORKFLOW CREATION:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Just fill out a YAML file:                        │
│                                                     │
│  1. name: Name of workflow                         │
│  2. command: The command(s)                        │
│  3. arguments: Parameters                          │
│  4. description: What it does                      │
│                                                     │
│  → Commit to repo                                  │
│  → Team instantly has access                       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 4. QUAKE MODE

## 📌 Global Hotkey Terminal

```
QUAKE MODE:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Named after Quake game's console (~ key)          │
│                                                     │
│  FEATURE:                                          │
│  • Global hotkey (e.g., CMD+J)                     │
│  • Terminal drops down from top                    │
│  • Available across ALL desktops                   │
│  • Press again to hide                             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 VS Code Integration Example

```
MICHELLE LIM'S WORKFLOW:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  PROBLEM:                                          │
│  • Uses VS Code for coding                         │
│  • VS Code terminal is CMD+J                       │
│  • Want same shortcut for Warp                     │
│                                                     │
│  SOLUTION:                                         │
│  • Configure Warp Quake Mode = CMD+J               │
│  • Same shortcut works everywhere                  │
│  • Unified workflow                                │
│                                                     │
│  RESULT:                                           │
│  • In VS Code → CMD+J → VS Code terminal           │
│  • On desktop → CMD+J → Warp drops down            │
│  • Consistent experience                           │
│  • Theme consistency maintained                    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 5. AI COMMAND SEARCH

## 📌 Natural Language → Commands

```
AI COMMAND SEARCH:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  TRADITIONAL WAY:                                  │
│  "I need to find slow API calls in logs..."        │
│                                                     │
│  1. Think about what tools to use                  │
│  2. grep? awk? cut? sort?                          │
│  3. Try command                                    │
│  4. Doesn't work                                   │
│  5. Google                                         │
│  6. Try again                                      │
│  7. Iterate...                                     │
│                                                     │
│  WARP AI WAY:                                      │
│  1. Describe what you want in English              │
│  2. AI generates optimized command                 │
│  3. Run                                            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Real Use Case

```
AGATA CIEPLIK'S EXAMPLE:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  TASK: Debug performance issues from logs          │
│                                                     │
│  INPUT (natural language):                         │
│  "Find all API calls taking more than 500ms        │
│   and show the endpoint and duration, sorted       │
│   by slowest first"                                │
│                                                     │
│  OUTPUT (generated command):                       │
│  grep "duration_ms" api.log | \                    │
│    awk -F',' '$3 > 500 {print $1, $3}' | \         │
│    sort -t' ' -k2 -rn | \                          │
│    head -20                                        │
│                                                     │
│  → Complex grep + awk + sort pipeline              │
│  → Generated in seconds                            │
│  → No manual construction needed                   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 6. ONBOARDING BENEFITS

## 📌 Workflows for New Engineers

```
ONBOARDING SCENARIOS:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  "Workflows are great for remembering commands     │
│   that are asked often, potentially from           │
│   engineers that are just onboarding"              │
│                                                     │
│  COMMON ONBOARDING COMMANDS:                       │
│  ──────────────────────────                        │
│  • Setup local development                         │
│  • Connect to staging                              │
│  • Run test suite                                  │
│  • Deploy to dev environment                       │
│  • Access internal tools                           │
│                                                     │
│  → All saved as workflows                          │
│  → New engineer searches and finds                 │
│  → No need to ask in Slack                         │
│  → Self-service onboarding                         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 7. KEY TAKEAWAYS

## 📌 Features That Create Dependency

```
DEPENDENT FEATURES:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Team members "have become dependent" on:          │
│                                                     │
│  1. BLOCK SHARING                                  │
│     → Don't exist in VS Code terminal              │
│     → Essential for collaboration                  │
│                                                     │
│  2. LAUNCH CONFIGURATIONS                          │
│     → Preconfigured sessions                       │
│     → One-click complex setups                     │
│                                                     │
│  3. SAVED WORKFLOWS                                │
│     → Team knowledge base                          │
│     → Reduces repeated questions                   │
│                                                     │
│  → These features LOCK IN users                    │
│  → Hard to go back to basic terminals              │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Cultural Impact

```
WARP'S INTERNAL CULTURE:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Before Warp:                                      │
│  • "How do I...?" → Slack → Wait for answer        │
│                                                     │
│  After Warp:                                       │
│  • "How do I...?" → Search workflows → Found       │
│                                                     │
│  Before Warp:                                      │
│  • Complex commands → Written in docs              │
│  • Docs get outdated                               │
│                                                     │
│  After Warp:                                       │
│  • Complex commands → Saved as workflows           │
│  • Workflows = living documentation                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 8. TỪ ĐIỂN KEYWORDS

| Từ khóa | Nghĩa | Giải thích thêm |
|---------|-------|-----------------|
| **Dogfooding** | Dùng sản phẩm mình | Dùng product của mình để test |
| **Block** | Khối | Input + output được group |
| **Permalink** | Link cố định | URL không thay đổi |
| **Workflow** | Quy trình | Reusable command sequence |
| **Quake Mode** | Chế độ Quake | Dropdown terminal với hotkey |
| **On-call** | Trực | Engineer responsible for incidents |
| **Cherrypick** | Chọn cherry | Git operation chọn commit cụ thể |
| **YAML** | YAML | Format file configuration |
| **ANSI Escape** | Escape ANSI | Codes for terminal colors |
| **Staging** | Môi trường staging | Pre-production environment |

---

# 📚 TÀI NGUYÊN

## Links
- [How Warp Uses Warp](https://www.warp.dev/blog/how-warp-uses-warp) - Blog chính thức
- [Warp Workflows Documentation](https://docs.warp.dev/features/entry/yaml-workflows)
- [Warp Drive](https://www.warp.dev/warp-drive)

---

*Tài liệu về cách team Warp sử dụng sản phẩm của mình để build Warp - dogfooding at its finest.*
