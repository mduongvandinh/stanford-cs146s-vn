# 👁️ HOW TO REVIEW CODE EFFECTIVELY
## Triết lý của một GitHub Staff Engineer với 7,000+ PR reviews

---

# 📖 MỤC LỤC

1. [Tổng quan](#1-tổng-quan)
2. [Core Philosophy](#2-core-philosophy)
3. [Good vs Bad Reviews](#3-good-vs-bad-reviews)
4. [Key Practices for Reviewers](#4-key-practices-for-reviewers)
5. [Author Best Practices](#5-author-best-practices)
6. [Managing Reviews](#6-managing-reviews)
7. [Từ điển Keywords](#7-từ-điển-keywords)

---

# 1. TỔNG QUAN

## 📌 About the Author

```
SARAH VESSELS - GITHUB STAFF ENGINEER:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  EXPERIENCE:                                       │
│  • 7,000+ pull request reviews                    │
│  • GitHub Staff Engineer                           │
│                                                     │
│  CORE BELIEF:                                      │
│  "Code review is FOUNDATIONAL to software quality" │
│                                                     │
│  KEY INSIGHT:                                      │
│  "Reviewing pull requests should often take        │
│   PRIORITY over personal work"                     │
│                                                     │
│  WHY?                                              │
│  "Reviewed code is CLOSER to being shipped"        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Review Priority

```
PRIORITY PRINCIPLE:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  YOUR CODE (in progress)                           │
│       ↓                                            │
│  ─────────────── vs ───────────────                │
│       ↓                                            │
│  TEAMMATE'S CODE (waiting for review)              │
│                                                     │
│  OFTEN, REVIEW TEAMMATE'S FIRST!                   │
│                                                     │
│  Because:                                          │
│  • Unblocks team progress                          │
│  • Reviewed code → Ready to ship                   │
│  • Your WIP → Still needs more work                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 2. CORE PHILOSOPHY

## 📌 Clarity and Direction

```
EFFECTIVE REVIEWS HAVE:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  1. CLARITY                                        │
│     ─────────                                      │
│     Author knows exactly what to change            │
│                                                     │
│  2. DIRECTION                                      │
│     ──────────                                     │
│     Path forward is clear                          │
│                                                     │
│  3. DISTINCTION                                    │
│     ────────────                                   │
│     Differentiate between:                         │
│     • Personal preferences (optional)              │
│     • Blocking concerns (required)                 │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 The Gold Standard

```
WHAT GOOD FEEDBACK LOOKS LIKE:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  ✅ GOOD:                                          │
│  "Provides specific details"                       │
│  "References specific code or issues"              │
│  "Suggests a resolution"                           │
│                                                     │
│  EXAMPLE:                                          │
│  "This function duplicates logic from              │
│   utils/auth.js:45. Consider using                 │
│   `validateToken()` instead."                      │
│                                                     │
│  ❌ BAD:                                           │
│  "I don't like this"                               │
│  "This won't work"                                 │
│  "Change this"                                     │
│                                                     │
│  → Vague comments CONFUSE authors                  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 3. GOOD VS BAD REVIEWS

## 📌 Comparison

```
REVIEW QUALITY COMPARISON:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  ❌ POOR REVIEW:                                   │
│  ═══════════════                                   │
│  "This is wrong"                                   │
│                                                     │
│  Problems:                                         │
│  • No specifics                                    │
│  • No solution                                     │
│  • Author confused                                 │
│                                                     │
│  ✅ GOOD REVIEW:                                   │
│  ═══════════════                                   │
│  "This authentication check on line 45 might       │
│   allow null tokens. Consider adding:              │
│   `if (!token) throw new AuthError()`              │
│   See similar pattern in auth/middleware.js:23"    │
│                                                     │
│  Benefits:                                         │
│  • Specific location                               │
│  • Clear problem                                   │
│  • Concrete solution                               │
│  • Pattern reference                               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Reference Existing Patterns

```
CITING PATTERNS:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  INSTEAD OF:                                       │
│  "Don't do it this way"                            │
│                                                     │
│  SAY:                                              │
│  "Looks like this matches the pattern used         │
│   in [specific file]. Consider following           │
│   that approach for consistency."                  │
│                                                     │
│  BENEFITS:                                         │
│  • Shows existing precedent                        │
│  • Gives concrete example                          │
│  • Maintains codebase consistency                  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 4. KEY PRACTICES FOR REVIEWERS

## 📌 Ask Strategic Questions

```
QUESTIONING TECHNIQUE:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  TREAT AUTHOR AS SUBJECT MATTER EXPERT             │
│                                                     │
│  QUESTIONS TO ASK:                                 │
│  ─────────────────                                 │
│  • "What assumptions are we making about           │
│     the shape of this data?"                       │
│                                                     │
│  • "Have we considered the performance             │
│     implications of this approach?"                │
│                                                     │
│  • "What edge cases might we be missing?"          │
│                                                     │
│  • "Do we have tests or empirical data             │
│     supporting this decision?"                     │
│                                                     │
│  → Questions encourage deeper thinking             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Balance Criticism with Affirmation

```
POSITIVE REINFORCEMENT:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  DON'T ONLY POINT OUT PROBLEMS                     │
│                                                     │
│  ACKNOWLEDGE GOOD WORK:                            │
│  • "Looks like this matches the pattern used ✓"    │
│  • "Thanks for adding a test! ✓"                   │
│  • "Good catch on that edge case ✓"                │
│  • "Clean refactor, much more readable ✓"          │
│                                                     │
│  WHY:                                              │
│  • Shows review was thorough                       │
│  • Supportive, not just critical                   │
│  • Reinforces good practices                       │
│  • Builds trust                                    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Be Conscious of Bias

```
AVOIDING BIAS:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  FACT: Everyone makes mistakes                     │
│        regardless of seniority                     │
│                                                     │
│  MAINTAIN EQUAL SCRUTINY:                          │
│  • Junior developers                               │
│  • Senior developers                               │
│  • Tech leads                                      │
│  • Anyone                                          │
│                                                     │
│  TESTS REMOVE SUBJECTIVITY:                        │
│  • Tests provide OBJECTIVE verification            │
│  • Not based on who wrote the code                 │
│  • Clear pass/fail criteria                        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Use Approval Judiciously

```
APPROVAL GUIDELINES:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  WITHHOLD APPROVAL ONLY FOR:                       │
│  • Genuine blockers                                │
│  • Serious security issues                         │
│  • Breaking changes                                │
│                                                     │
│  OPTIONAL SUGGESTIONS:                             │
│  • Can proceed in separate PRs                     │
│  • Don't block for nice-to-haves                   │
│                                                     │
│  "REQUEST CHANGES" RESERVED FOR:                   │
│  • Security vulnerabilities                        │
│  • Breaking production                             │
│  • Data loss risks                                 │
│                                                     │
│  → Don't be a bottleneck                           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 5. AUTHOR BEST PRACTICES

## 📌 Self-Review First

```
BEFORE REQUESTING REVIEW:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  1. SELF-REVIEW YOUR OWN CODE                      │
│     ──────────────────────────                     │
│     Read through like you're the reviewer          │
│                                                     │
│  2. ADD COMMENTS ON NON-OBVIOUS CHANGES            │
│     ────────────────────────────────               │
│     Explain "why" for complex logic                │
│                                                     │
│  3. CHECK PR SIZE                                  │
│     ─────────────                                  │
│     Should this be split?                          │
│                                                     │
│  → Catches issues before wasting reviewer time     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Use Draft Status

```
DRAFT PR BENEFITS:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  KEEP WIP AS DRAFTS:                               │
│                                                     │
│  [DRAFT] Add user authentication                   │
│                                                     │
│  SIGNALS:                                          │
│  • "Not ready for review yet"                      │
│  • "Still working on it"                           │
│  • "Don't spend time reviewing"                    │
│                                                     │
│  CONVERT TO READY when:                            │
│  • Tests pass                                      │
│  • Self-review done                                │
│  • Ready for feedback                              │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Respond Graciously

```
HANDLING FEEDBACK:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  REACT POSITIVELY:                                 │
│  • Use emoji reactions (👍, ❤️)                    │
│  • Acknowledge comments                            │
│  • Thank reviewers                                 │
│                                                     │
│  WHEN IMPLEMENTING LATER:                          │
│  • Tag original reviewer                           │
│  • Include credit link                             │
│  • "Addressed per @reviewer's suggestion"          │
│                                                     │
│  BUILDS TRUST:                                     │
│  → Reviewers more likely to quick-approve          │
│    future PRs                                      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Welcome Post-Merge Reviews

```
AFTER MERGE:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  EVEN MERGED CODE benefits from review feedback    │
│                                                     │
│  WHY:                                              │
│  • Creates documentation trails                    │
│  • Helps future developers                         │
│  • Improves next iterations                        │
│                                                     │
│  ACCEPT:                                           │
│  • Suggestions for follow-up PRs                   │
│  • Learning opportunities                          │
│  • Continuous improvement                          │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 6. MANAGING REVIEWS

## 📌 Finding Reviews

```
DISCOVERY STRATEGIES:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  1. GITHUB NOTIFICATIONS                           │
│     ────────────────────                           │
│     Check inbox regularly                          │
│                                                     │
│  2. SLACK INTEGRATION                              │
│     ─────────────────                              │
│     Team-specific labels for discovery             │
│                                                     │
│  3. SEARCH QUERIES                                 │
│     ──────────────                                 │
│     is:open archived:false is:pr org:github        │
│     -is:draft team-review-requested                │
│                                                     │
│  4. CODEOWNERS                                     │
│     ──────────                                     │
│     Automatic assignment based on file paths       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Automation and Standards

```
PROCESS AUTOMATION:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  DOCUMENT TEAM PROCESSES:                          │
│  • Code review guidelines                          │
│  • Response time expectations                      │
│  • Approval requirements                           │
│                                                     │
│  BRANCH PROTECTION:                                │
│  • Required reviews before merge                   │
│  • CI checks must pass                             │
│  • CODEOWNERS approval                             │
│                                                     │
│  ROTATION SYSTEMS:                                 │
│  • First responder rotation                        │
│  • Manage notification load                        │
│  • Prevent review fatigue                          │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 7. TỪ ĐIỂN KEYWORDS

| Từ khóa | Nghĩa | Giải thích thêm |
|---------|-------|-----------------|
| **Pull Request (PR)** | Yêu cầu merge | Code changes để review |
| **Blocking Concern** | Vấn đề chặn | Phải fix trước khi merge |
| **CODEOWNERS** | Chủ sở hữu code | File config chỉ định reviewers |
| **Draft PR** | PR nháp | PR chưa sẵn sàng review |
| **Request Changes** | Yêu cầu thay đổi | Chặn merge cho đến khi fix |
| **Self-Review** | Tự review | Kiểm tra code của mình |
| **Branch Protection** | Bảo vệ branch | Rules cho việc merge |
| **First Responder** | Người phản hồi đầu | Reviewer được chỉ định |
| **Notification Fatigue** | Mệt mỏi thông báo | Quá nhiều notifications |
| **Subject Matter Expert** | Chuyên gia chủ đề | Người hiểu rõ nhất về code |

---

# 📚 TÀI NGUYÊN

## Links
- [How to Review Code Effectively - GitHub Blog](https://github.blog/developer-skills/github/how-to-review-code-effectively-a-github-staff-engineers-philosophy/) - Nguồn gốc
- [GitHub CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) - Docs
- [Branch Protection Rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches) - GitHub Docs

---

*Tài liệu về cách review code hiệu quả từ Sarah Vessels - GitHub Staff Engineer với 7,000+ PR reviews.*
