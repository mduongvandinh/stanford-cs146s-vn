# 🤖 AI-ASSISTED ASSESSMENT OF CODING PRACTICES
## AutoCommenter: Hệ thống AI Code Review của Google

---

# 📖 MỤC LỤC

1. [Tổng quan](#1-tổng-quan)
2. [AutoCommenter System](#2-autocommenter-system)
3. [Technical Approach](#3-technical-approach)
4. [Deployment Strategy](#4-deployment-strategy)
5. [Results & Impact](#5-results--impact)
6. [Từ điển Keywords](#6-từ-điển-keywords)

---

# 1. TỔNG QUAN

## 📌 Paper Overview

```
AI-ASSISTED ASSESSMENT OF CODING PRACTICES:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  PAPER: arXiv:2405.13565                           │
│  VENUE: ACM AIware '24                             │
│  DATE: July 2024                                   │
│                                                     │
│  AUTHORS:                                          │
│  Google Research team including:                   │
│  • Manushree Vijayvergiya                         │
│  • Goran Petrović                                 │
│  • Daniel Tarlow                                  │
│  • And others                                      │
│                                                     │
│  KEY CONTRIBUTION:                                 │
│  "An end-to-end system for LEARNING and            │
│   ENFORCING coding best practices"                 │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 The Problem

```
MODERN CODE REVIEW CHALLENGE:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  CURRENT STATE:                                    │
│  ───────────────                                   │
│  • Peer reviewers verify code meets standards      │
│  • Some best practices CAN be automated            │
│  • Others are LEFT to human reviewers              │
│                                                     │
│  THE GAP:                                          │
│  ─────────                                         │
│  Human reviewers spend time on:                    │
│  • Checking style conventions                      │
│  • Spotting common mistakes                        │
│  • Enforcing best practices                        │
│                                                     │
│  → Time that could be spent on                     │
│    higher-value architectural review               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 2. AUTOCOMMENTER SYSTEM

## 📌 What is AutoCommenter?

```
AUTOCOMMENTER:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  DEFINITION:                                       │
│  "Automated code-review assistant backed by        │
│   a Large Language Model"                          │
│                                                     │
│  DEPLOYMENT:                                       │
│  • Currently used at Google                        │
│  • Tens of thousands of developers daily           │
│                                                     │
│  LANGUAGES SUPPORTED:                              │
│  ┌───────────────────────────────────┐             │
│  │  C++  │  Java  │  Python  │  Go   │             │
│  └───────────────────────────────────┘             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 How It Works

```
AUTOCOMMENTER WORKFLOW:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  1. DEVELOPER SUBMITS CODE                         │
│     ──────────────────────                         │
│     Code change submitted for review               │
│                                                     │
│     ↓                                              │
│                                                     │
│  2. AUTOCOMMENTER ANALYZES                         │
│     ─────────────────────                          │
│     LLM checks for best practice violations        │
│                                                     │
│     ↓                                              │
│                                                     │
│  3. FEEDBACK DELIVERED                             │
│     ──────────────────                             │
│     Two channels:                                  │
│     • IDE: Blue curly underline                    │
│     • Code Review System: Comments                 │
│                                                     │
│     ↓                                              │
│                                                     │
│  4. DEVELOPER FIXES                                │
│     ─────────────────                              │
│     Hover for details + link to docs               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 User Experience

```
IDE INTEGRATION:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  IN THE IDE:                                       │
│  ───────────                                       │
│                                                     │
│  function processData(data) {                      │
│    const result = data.map(x => x * 2)            │
│                    ˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜             │
│                    ↑ Blue curly underline          │
│  }                                                 │
│                                                     │
│  HOVER POPUP:                                      │
│  ┌─────────────────────────────────────┐           │
│  │ Consider adding explicit return type │           │
│  │ [Link to best practice document]    │           │
│  └─────────────────────────────────────┘           │
│                                                     │
│  BENEFIT:                                          │
│  • Real-time feedback                              │
│  • No context switching                            │
│  • Quick fixes                                     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 3. TECHNICAL APPROACH

## 📌 Model Architecture

```
TECHNICAL DETAILS:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  BASE MODEL:                                       │
│  ───────────                                       │
│  • T5 (Text-to-Text Transfer Transformer)          │
│  • Implementation: T5X                             │
│                                                     │
│  APPROACH:                                         │
│  ──────────                                        │
│  Text-to-text transformation                       │
│                                                     │
│  Input:  [Code snippet with context]               │
│  Output: [Best practice violation + suggestion]    │
│                                                     │
│  TRAINING DATA:                                    │
│  ──────────────                                    │
│  • Over 3 BILLION examples                         │
│  • 800,000 specifically for best practice          │
│    violations                                      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 What It Detects

```
BEST PRACTICE CATEGORIES:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  STYLE:                                            │
│  • Naming conventions                              │
│  • Code formatting                                 │
│  • Comment style                                   │
│                                                     │
│  LOGIC:                                            │
│  • Common bugs                                     │
│  • Error handling patterns                         │
│  • Null checks                                     │
│                                                     │
│  PERFORMANCE:                                      │
│  • Inefficient patterns                            │
│  • Resource management                             │
│                                                     │
│  SECURITY:                                         │
│  • Input validation                                │
│  • Sensitive data handling                         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 4. DEPLOYMENT STRATEGY

## 📌 Phased Rollout

```
GOOGLE'S DEPLOYMENT STRATEGY:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  PHASE 1: Paper Authors (~1 month)                 │
│  ═══════════════════════════════                   │
│  • Internal dogfooding                             │
│  • Fix critical bugs                               │
│  • Validate core functionality                     │
│                                                     │
│  PHASE 2: Early Adopters (~1 year)                 │
│  ════════════════════════════════                  │
│  • 3,000 volunteers                                │
│  • Gather extensive feedback                       │
│  • Iterate on features                             │
│                                                     │
│  PHASE 3: Half of Developers                       │
│  ═══════════════════════════                       │
│  • A/B testing at scale                            │
│  • Measure impact                                  │
│                                                     │
│  PHASE 4: Full Rollout                             │
│  ═════════════════════                             │
│  • All Google developers                           │
│  • Tens of thousands daily users                   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Key Learnings

```
DEPLOYMENT INSIGHTS:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  1. GRADUAL ROLLOUT IS ESSENTIAL                   │
│     ────────────────────────────                   │
│     • Catch issues early                           │
│     • Build trust incrementally                    │
│     • Allow feedback loops                         │
│                                                     │
│  2. EARLY ADOPTERS ARE CRUCIAL                     │
│     ───────────────────────────                    │
│     • 3,000 volunteers provided                    │
│       invaluable feedback                          │
│     • Identified edge cases                        │
│                                                     │
│  3. ITERATE CONTINUOUSLY                           │
│     ────────────────────                           │
│     • Year of refinement before                    │
│       broad deployment                             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 5. RESULTS & IMPACT

## 📌 Key Findings

```
EVALUATION RESULTS:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  MAIN CONCLUSION:                                  │
│  ════════════════                                  │
│                                                     │
│  "An end-to-end system for learning and            │
│   enforcing coding best practices is               │
│   FEASIBLE and has a POSITIVE IMPACT               │
│   on the developer workflow"                       │
│                                                     │
│  DEMONSTRATED:                                     │
│  ─────────────                                     │
│  • Scalability to tens of thousands of users       │
│  • Integration into existing workflows             │
│  • Positive developer reception                    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Impact on Developer Workflow

```
WORKFLOW IMPROVEMENTS:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  BEFORE AUTOCOMMENTER:                             │
│  ─────────────────────                             │
│  • Reviewers spend time on style issues            │
│  • Best practices inconsistently enforced          │
│  • Knowledge gaps across team                      │
│                                                     │
│  AFTER AUTOCOMMENTER:                              │
│  ────────────────────                              │
│  • Automated best practice enforcement             │
│  • Reviewers focus on architecture/logic           │
│  • Consistent standards across codebase            │
│  • Real-time learning for developers               │
│                                                     │
│  KEY BENEFIT:                                      │
│  Human reviewers freed for HIGH-VALUE work         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Implications for Industry

```
BROADER IMPLICATIONS:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  THIS RESEARCH SHOWS:                              │
│  ════════════════════                              │
│                                                     │
│  1. LLM-BASED CODE REVIEW IS VIABLE                │
│     At massive scale (Google-level)                │
│                                                     │
│  2. HYBRID APPROACH WORKS                          │
│     AI handles routine checks                      │
│     Humans handle complex decisions                │
│                                                     │
│  3. DEPLOYMENT TAKES TIME                          │
│     Successful rollout requires                    │
│     careful phased approach                        │
│                                                     │
│  4. DEVELOPER EXPERIENCE MATTERS                   │
│     IDE integration + docs links                   │
│     = Better adoption                              │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 6. TỪ ĐIỂN KEYWORDS

| Từ khóa | Nghĩa | Giải thích thêm |
|---------|-------|-----------------|
| **AutoCommenter** | Trợ lý review tự động | Hệ thống AI của Google |
| **T5** | Text-to-Text Transformer | Model architecture từ Google |
| **Best Practices** | Thực hành tốt nhất | Coding standards |
| **Phased Rollout** | Triển khai theo giai đoạn | Gradual deployment |
| **Early Adopters** | Người dùng sớm | Volunteers trong pilot |
| **IDE Integration** | Tích hợp IDE | Hiển thị trong code editor |
| **Text-to-Text** | Văn bản sang văn bản | Transformation approach |
| **Dogfooding** | Tự dùng sản phẩm | Internal testing |
| **Code Review** | Đánh giá code | Peer review process |
| **LLM** | Large Language Model | Mô hình ngôn ngữ lớn |

---

# 📚 TÀI NGUYÊN

## Links
- [arXiv Paper](https://arxiv.org/abs/2405.13565) - Original paper
- [Google Research](https://research.google/pubs/ai-assisted-assessment-of-coding-practices-in-industrial-code-review/) - Google publication
- [ACM AIware '24](https://dl.acm.org/doi/10.1145/3664646.3665664) - Conference proceedings

---

*Tài liệu về AutoCommenter - hệ thống AI code review của Google được deploy cho hàng chục ngàn developers.*
