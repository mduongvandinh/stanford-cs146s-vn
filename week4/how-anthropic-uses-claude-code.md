# 🏢 HOW ANTHROPIC USES CLAUDE CODE
## Cách các team tại Anthropic sử dụng Claude Code nội bộ

---

# 📖 MỤC LỤC

1. [Tổng quan](#1-tổng-quan)
2. [Use Cases theo Team](#2-use-cases-theo-team)
3. [Productivity Gains](#3-productivity-gains)
4. [Usage Evolution](#4-usage-evolution)
5. [Key Insights](#5-key-insights)
6. [Sandboxing & Security](#6-sandboxing--security)
7. [Từ điển Keywords](#7-từ-điển-keywords)

---

# 1. TỔNG QUAN

## 📌 Claude Code trong Anthropic

```
ANTHROPIC SỬ DỤNG CLAUDE CODE NỘI BỘ NHƯ THẾ NÀO?

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Claude Code được dùng bởi:                        │
│                                                     │
│  • Engineering teams (Product, Security, Infra)    │
│  • Non-engineering teams (Legal, Marketing)        │
│  • Data Scientists                                 │
│  • Product Designers                               │
│                                                     │
│  Insight chính:                                    │
│  "Agentic coding tools dissolve boundaries         │
│   between technical and non-technical work"        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Triết lý thiết kế

> "Claude Code is intentionally low-level and unopinionated, providing close to raw model access without forcing specific workflows."

```
DESIGN PHILOSOPHY:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Claude Code = Power Tool                          │
│                                                     │
│  ✅ Flexible - Linh hoạt theo workflow             │
│  ✅ Customizable - Tùy chỉnh được                  │
│  ✅ Scriptable - Có thể script/automate            │
│  ✅ Safe - An toàn với permissions                 │
│                                                     │
│  Không ép buộc workflow cụ thể                     │
│  → Users tự tìm cách dùng hiệu quả nhất            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 2. USE CASES THEO TEAM

## 📌 Engineering Teams

### Codebase Navigation

```
USE CASE: Onboarding vào codebase mới

TRƯỚC ĐÂY:
┌─────────────────────────────────────────────────────┐
│  • Đọc documentation (nếu có)                      │
│  • Hỏi teammates                                   │
│  • Tự explore code                                 │
│  • Timeline: Days to weeks                         │
└─────────────────────────────────────────────────────┘

VỚI CLAUDE CODE:
┌─────────────────────────────────────────────────────┐
│  • Feed entire codebase vào Claude                 │
│  • Claude đọc CLAUDE.md files                      │
│  • Identify relevant files cho task               │
│  • Explain data pipeline dependencies              │
│  • Timeline: Hours                                 │
└─────────────────────────────────────────────────────┘

→ "Claude Code is our first stop for programming tasks"
  - Product Engineering team
```

### Testing & Code Review

```
SECURITY ENGINEERING TEAM WORKFLOW TRANSFORMATION:

TRƯỚC:
┌─────────────────────────────────────────────────────┐
│                                                     │
│  Design Doc → Janky Code → Refactor → Give up      │
│                                     on tests       │
│                                                     │
└─────────────────────────────────────────────────────┘

SAU:
┌─────────────────────────────────────────────────────┐
│                                                     │
│  Ask Claude for pseudocode → Guide through TDD →   │
│  Check in periodically → Reliable, testable code   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Debugging & Incident Response

```
PRODUCTION INCIDENT EXAMPLE:

Vấn đề: Kubernetes cluster ngừng scheduling pods

TRƯỚC:
┌─────────────────────────────────────────────────────┐
│  • Manual investigation: 10-15 minutes             │
│  • Check logs                                      │
│  • Search documentation                            │
│  • Ask colleagues                                  │
└─────────────────────────────────────────────────────┘

VỚI CLAUDE CODE:
┌─────────────────────────────────────────────────────┐
│  • Claude analyzes dashboard                       │
│  • Identifies pod IP exhaustion                    │
│  • Guides through UI to fix                        │
│  • Time saved: ~20 minutes during outage           │
└─────────────────────────────────────────────────────┘

→ 3x faster diagnostic time
```

## 📌 Product Design Team

```
FEATURE DEVELOPMENT WORKFLOW:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  1. Feed Figma files to Claude Code                │
│                                                     │
│  2. Claude autonomously develops feature           │
│     • Writes code                                  │
│     • Runs tests                                   │
│     • Iterates on feedback                         │
│                                                     │
│  3. Minimal human review needed                    │
│                                                     │
│  CASE STUDY: Vim Mode                              │
│  ────────────────────                              │
│  "Claude Code autonomously wrote 70% of           │
│   Vim mode code with minimal review"              │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Non-Engineering Teams

### Growth Marketing

```
AD VARIATION GENERATION:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  INPUT:                                            │
│  • CSV với hundreds of ads                         │
│  • Character limits                                │
│  • Performance data                                │
│                                                     │
│  CLAUDE CODE DOES:                                 │
│  • Identifies underperforming ads                  │
│  • Generates variations within limits              │
│  • Up to 100 variations via Figma plugin           │
│                                                     │
│  RESULT:                                           │
│  Hours of work → Minutes                           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Legal Team

```
PHONE TREE SYSTEM:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Lawyers (không phải developers) tự build:         │
│                                                     │
│  • Prototype phone tree system                     │
│  • Helps connect team members với đúng lawyers     │
│  • Custom tool without developer resources         │
│                                                     │
│  → Non-technical staff building solutions          │
│    by describing problems                          │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Data Scientists

```
VISUALIZATION WITHOUT LANGUAGE KNOWLEDGE:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Task: Build React app for RL model performance    │
│                                                     │
│  Challenge: Data scientists không biết TypeScript  │
│                                                     │
│  Solution: Claude Code builds complete app         │
│                                                     │
│  "Data scientists created complex visualizations   │
│   without knowing JavaScript"                      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 3. PRODUCTIVITY GAINS

## 📌 Research Time Reduction

```
RESEARCH TIME COMPARISON:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  TRƯỚC:                                            │
│  • Google searching: 30 mins                       │
│  • Reading documentation: 30 mins                  │
│  • Total: ~1 hour                                  │
│                                                     │
│  SAU:                                              │
│  • Ask Claude to explain: 10-20 mins               │
│                                                     │
│  → 80% REDUCTION in research time                  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Task Complexity Handling

| Metric | Feb 2025 | Aug 2025 | Change |
|--------|----------|----------|--------|
| New feature implementation | 14.3% | 36.9% | +22.6% |
| Code design/planning | 1.0% | 9.9% | +8.9% |
| Task complexity (1-5 scale) | 3.2 | 3.8 | +0.6 |

```
INSIGHT:

"Engineers delegate increasingly complex work to Claude
 and Claude requires less oversight"

1 = Basic edits
5 = Expert-level tasks

Average moved from 3.2 → 3.8
→ More complex tasks being delegated
```

---

# 4. USAGE EVOLUTION

## 📌 February to August 2025

```
USAGE PATTERN CHANGES:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  FEBRUARY 2025:                                    │
│  ├── Basic edits: High                             │
│  ├── New features: 14.3%                           │
│  └── Code planning: 1.0%                           │
│                                                     │
│  AUGUST 2025:                                      │
│  ├── Basic edits: Lower                            │
│  ├── New features: 36.9% (+158%)                   │
│  └── Code planning: 9.9% (+890%)                   │
│                                                     │
└─────────────────────────────────────────────────────┘

KEY TREND:
• People increasingly delegate MORE AUTONOMY to Claude
• More complex, end-to-end tasks
• Less oversight required
```

---

# 5. KEY INSIGHTS

## 📌 Thought Partner, Not Code Generator

```
MOST SUCCESSFUL PATTERN:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  ❌ KHÔNG NÊN:                                     │
│  "Claude, viết code cho feature X"                 │
│                                                     │
│  ✅ NÊN:                                           │
│  "Claude, let's explore how feature X could work.  │
│   What are the tradeoffs? What edge cases should   │
│   we consider? Then let's prototype together."     │
│                                                     │
│  → Treat as THOUGHT PARTNER                        │
│  → Explore possibilities together                  │
│  → Prototype rapidly                               │
│  → Share discoveries                               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Cross-Functional Discoveries

```
PATTERN: Non-technical → Technical capabilities

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Lawyers → Built phone tree systems                │
│  Marketers → Generated hundreds of ad variations   │
│  Data scientists → Built React apps                │
│  Designers → Autonomous feature development        │
│                                                     │
│  "Anyone can build solutions by describing         │
│   problems"                                         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 6. SANDBOXING & SECURITY

## 📌 Permission Reduction

```
SANDBOXING RESULTS:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Internal usage với sandboxing:                    │
│                                                     │
│  Permission prompts reduced by 84%                 │
│                                                     │
│  HOW IT WORKS:                                     │
│  ┌───────────────────────────────────────────┐     │
│  │                                           │     │
│  │   Define clear boundaries                 │     │
│  │         ↓                                 │     │
│  │   Claude works freely within bounds       │     │
│  │         ↓                                 │     │
│  │   Increased security AND agency           │     │
│  │                                           │     │
│  └───────────────────────────────────────────┘     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 7. TỪ ĐIỂN KEYWORDS

| Từ khóa | Nghĩa | Giải thích thêm |
|---------|-------|-----------------|
| **Claude Code** | CLI tool của Anthropic | Agentic coding assistant |
| **Agentic** | Tự chủ | AI tự thực hiện nhiều bước |
| **Sandboxing** | Cô lập | Giới hạn permissions trong sandbox |
| **TDD** | Test-Driven Development | Viết test trước code |
| **Codebase Navigation** | Điều hướng code | Hiểu và tìm file trong codebase |
| **Onboarding** | Làm quen | Quá trình học hệ thống mới |
| **Thought Partner** | Đối tác tư duy | AI như người cộng tác suy nghĩ |
| **Task Complexity** | Độ phức tạp task | Thang đo từ 1-5 |
| **Auto-accept Mode** | Chế độ tự chấp nhận | Không cần approve mỗi action |
| **Phone Tree** | Cây điện thoại | Hệ thống định tuyến cuộc gọi |

---

# 📚 TÀI NGUYÊN

## Links
- [How Anthropic Teams Use Claude Code](https://claude.com/blog/how-anthropic-teams-use-claude-code) - Blog chính thức
- [PDF Version](https://www-cdn.anthropic.com/58284b19e702b49db9302d5b6f135ad8871e7658.pdf)
- [Ernest Chiang's Summary](https://www.ernestchiang.com/en/posts/2025/how-anthropic-teams-use-claude-code/)

---

*Tài liệu về cách các team tại Anthropic sử dụng Claude Code trong công việc hàng ngày.*
