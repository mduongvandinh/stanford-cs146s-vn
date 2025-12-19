# 📋 CODE REVIEW ESSENTIALS FOR SOFTWARE TEAMS
## Những nguyên tắc cơ bản để code review hiệu quả

---

# 📖 MỤC LỤC

1. [Tổng quan](#1-tổng-quan)
2. [Five Key Benefits](#2-five-key-benefits)
3. [Pre-Submission Questions](#3-pre-submission-questions)
4. [Pull Request Best Practices](#4-pull-request-best-practices)
5. [Constructive Feedback](#5-constructive-feedback)
6. [Style Considerations](#6-style-considerations)
7. [Từ điển Keywords](#7-từ-điển-keywords)

---

# 1. TỔNG QUAN

## 📌 Core Purpose of Code Review

```
CODE REVIEW PURPOSE:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  "Code review serves as a critical mechanism       │
│   for collaborative software development"          │
│                                                     │
│  KEY FUNCTION:                                     │
│  "Keeps every member of the team moving            │
│   in the RIGHT DIRECTION"                          │
│                                                     │
│  HOW:                                              │
│  Maintains SHARED UNDERSTANDING of system          │
│  changes across the entire team                    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 2. FIVE KEY BENEFITS

## 📌 Primary Functions

```
5 KEY BENEFITS OF CODE REVIEW:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  1. ALIGN TEAM UNDERSTANDING                       │
│     ════════════════════════                       │
│     As systems evolve, keep everyone               │
│     on the same page                               │
│                                                     │
│  2. VALIDATE SOLUTIONS                             │
│     ═══════════════════                            │
│     Verify changes solve the intended problem      │
│                                                     │
│  3. FACILITATE DESIGN DISCUSSION                   │
│     ════════════════════════════                   │
│     Discuss strengths and weaknesses               │
│     of approaches                                  │
│                                                     │
│  4. IDENTIFY BUGS EARLY                            │
│     ═══════════════════                            │
│     Catch issues before production                 │
│                                                     │
│  5. MAINTAIN CONSISTENCY                           │
│     ═══════════════════════                        │
│     Consistent code style and organization         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Benefit Visualization

```
CODE REVIEW IMPACT:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  WITHOUT CODE REVIEW:                              │
│  ────────────────────                              │
│                                                     │
│  Developer A   Developer B   Developer C           │
│      ↓             ↓             ↓                 │
│   [Code]        [Code]        [Code]               │
│      ↓             ↓             ↓                 │
│  ──────────────────────────────────────            │
│  DIVERGENT understanding, INCONSISTENT code        │
│                                                     │
│  WITH CODE REVIEW:                                 │
│  ─────────────────                                 │
│                                                     │
│  Developer A ←→ Developer B ←→ Developer C         │
│      ↓             ↓             ↓                 │
│  ══════════════════════════════════════            │
│  SHARED understanding, CONSISTENT code             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 3. PRE-SUBMISSION QUESTIONS

## 📌 Before Writing Code

```
QUESTIONS TO ASK BEFORE CODING:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  □ Is this the CORRECT PRIORITY to work on?       │
│    (Should I be doing something else?)             │
│                                                     │
│  □ Has the team AGREED this change is necessary?  │
│    (Is there consensus on the approach?)           │
│                                                     │
│  □ Can this be broken into SMALLER chunks?        │
│    (Is my PR going to be too big?)                │
│                                                     │
│  □ How will TESTING verify correctness?           │
│    (What tests will I write?)                      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 The Small PR Principle

```
SMALL CHANGES ARE BETTER:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  "Small changes are easier to think about          │
│   and understand"                                  │
│                                                     │
│  LARGE PR:                                         │
│  ──────────                                        │
│  • Hard to review thoroughly                       │
│  • Easy to miss bugs                               │
│  • Reviewer fatigue                                │
│  • Delayed feedback                                │
│                                                     │
│  SMALL PR:                                         │
│  ──────────                                        │
│  • Easy to understand                              │
│  • Quick to review                                 │
│  • Focused feedback                                │
│  • Faster iteration                                │
│                                                     │
│  RULE OF THUMB:                                    │
│  If PR is >400 lines, consider splitting           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 4. PULL REQUEST BEST PRACTICES

## 📌 Effective PR Descriptions

```
PR DESCRIPTION ESSENTIALS:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  ✅ INCLUDE:                                       │
│  ───────────                                       │
│                                                     │
│  1. CLEAR, SPECIFIC TITLE                          │
│     "Add user authentication via OAuth2"           │
│     NOT: "Updates" or "Fix stuff"                  │
│                                                     │
│  2. CONTEXT AND ISSUE NUMBER                       │
│     "Fixes #1234"                                  │
│     Link to related issues/tickets                 │
│                                                     │
│  3. PROBLEM EXPLANATION                            │
│     What problem does this solve?                  │
│     What was the impact?                           │
│                                                     │
│  4. HIGH-LEVEL SUMMARY                             │
│     Overview of structural changes                 │
│                                                     │
│  5. TESTING DESCRIPTION                            │
│     How was this tested?                           │
│     What scenarios were covered?                   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Good vs Bad PR Descriptions

```
PR DESCRIPTION COMPARISON:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  ❌ BAD DESCRIPTION:                               │
│  ═══════════════════                               │
│  Title: "Fix bug"                                  │
│  Description: "Fixed the thing"                    │
│                                                     │
│  Problems:                                         │
│  • What bug?                                       │
│  • What thing?                                     │
│  • Forces reviewer to investigate                  │
│                                                     │
│  ✅ GOOD DESCRIPTION:                              │
│  ════════════════════                              │
│  Title: "Fix null pointer in UserService.getUser()"│
│  Description:                                      │
│  "## Problem                                       │
│   Users were seeing 500 errors when profile was    │
│   empty. Root cause: getUser() didn't handle null  │
│   profiles.                                        │
│                                                     │
│   ## Solution                                      │
│   Added null check and default empty profile.      │
│                                                     │
│   ## Testing                                       │
│   Added unit test for null profile case.           │
│   Verified fix in staging."                        │
│                                                     │
│  "Vague descriptions force reviewers into          │
│   unnecessary mental work and delay feedback"      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 5. CONSTRUCTIVE FEEDBACK

## 📌 How to Give Feedback

```
CONSTRUCTIVE FEEDBACK PRINCIPLES:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  ❌ AVOID DISMISSIVE STATEMENTS:                   │
│  ══════════════════════════════                    │
│  "This design is broken"                           │
│  "This is wrong"                                   │
│  "Don't do this"                                   │
│                                                     │
│  ✅ USE SPECIFIC, QUESTION-BASED FEEDBACK:         │
│  ═══════════════════════════════════════           │
│  "Have you considered what happens when            │
│   the input is null?"                              │
│                                                     │
│  "Could you walk me through why you chose          │
│   this approach over X?"                           │
│                                                     │
│  "What's the expected behavior when                │
│   the connection times out?"                       │
│                                                     │
│  WHY QUESTIONS WORK:                               │
│  Help developers think through implications        │
│  themselves, building understanding                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 The Socratic Method

```
ASK, DON'T TELL:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  INSTEAD OF:                                       │
│  "You need to add error handling here"             │
│                                                     │
│  ASK:                                              │
│  "What happens if this API call fails?"            │
│                                                     │
│  INSTEAD OF:                                       │
│  "This will be slow"                               │
│                                                     │
│  ASK:                                              │
│  "Have you considered the performance impact       │
│   when dealing with 10,000 records?"               │
│                                                     │
│  BENEFIT:                                          │
│  Developer discovers the issue themselves          │
│  → Deeper learning                                 │
│  → Better retention                                │
│  → Less defensive reaction                         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 6. STYLE CONSIDERATIONS

## 📌 Don't Overemphasize Style

```
STYLE NITPICKS:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  AUTHOR'S ADVICE:                                  │
│  "Caution against overemphasizing style nitpicks"  │
│                                                     │
│  WHY:                                              │
│  • Preserves review time for HIGH-VALUE discussions│
│  • Reduces friction                                │
│  • Avoids bikeshedding                             │
│                                                     │
│  BETTER SOLUTIONS:                                 │
│  ═══════════════                                   │
│                                                     │
│  1. AUTOMATION                                     │
│     • Linters (ESLint, Pylint)                     │
│     • Formatters (Prettier, Black)                 │
│     • Pre-commit hooks                             │
│                                                     │
│  2. STYLE GUIDES                                   │
│     • Document team conventions                    │
│     • Link to guide, don't argue                   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Focus Priority

```
REVIEW PRIORITY PYRAMID:

┌─────────────────────────────────────────────────────┐
│                                                     │
│              /\                                    │
│             /  \   SECURITY                        │
│            /    \  (Highest priority)              │
│           /──────\                                 │
│          /        \   CORRECTNESS                  │
│         /          \  (Does it work?)              │
│        /────────────\                              │
│       /              \   PERFORMANCE               │
│      /                \  (Is it efficient?)        │
│     /──────────────────\                           │
│    /                    \   MAINTAINABILITY        │
│   /                      \  (Can others understand?)│
│  /────────────────────────\                        │
│ /                          \   STYLE               │
│/                            \  (Lowest priority,   │
│──────────────────────────────\ automate this)      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 7. TỪ ĐIỂN KEYWORDS

| Từ khóa | Nghĩa | Giải thích thêm |
|---------|-------|-----------------|
| **Pull Request (PR)** | Yêu cầu merge | Code changes để review |
| **Bikeshedding** | Tranh luận vặt | Argue về trivial things |
| **Socratic Method** | Phương pháp Socrates | Dạy qua đặt câu hỏi |
| **Linter** | Công cụ lint | Kiểm tra style tự động |
| **Pre-commit Hook** | Hook trước commit | Scripts chạy trước commit |
| **Style Guide** | Hướng dẫn style | Tài liệu conventions |
| **Nitpick** | Bắt bẻ vặt | Minor style comments |
| **Constructive Feedback** | Phản hồi xây dựng | Helpful, not critical |
| **Context** | Ngữ cảnh | Background information |
| **Reviewer Fatigue** | Mệt mỏi reviewer | Exhaustion from reviewing |

---

# 📚 TÀI NGUYÊN

## Links
- [Code Review Essentials - Blake Smith](https://blakesmith.me/2015/02/09/code-review-essentials-for-software-teams.html) - Nguồn gốc
- [Google Code Review Guidelines](https://google.github.io/eng-practices/review/) - Best practices
- [Conventional Comments](https://conventionalcomments.org/) - Comment conventions

---

*Tài liệu về những nguyên tắc cơ bản để code review hiệu quả cho software teams.*
