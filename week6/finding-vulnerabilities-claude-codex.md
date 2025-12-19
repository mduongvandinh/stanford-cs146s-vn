# 🔍 FINDING VULNERABILITIES IN WEB APPS
## Sử dụng Claude Code và OpenAI Codex để tìm lỗ hổng bảo mật

---

# 📖 MỤC LỤC

1. [Tổng quan](#1-tổng-quan)
2. [Research Methodology](#2-research-methodology)
3. [Detection Performance](#3-detection-performance)
4. [Non-Determinism Problem](#4-non-determinism-problem)
5. [Benchmark Limitations](#5-benchmark-limitations)
6. [Practical Implications](#6-practical-implications)
7. [Từ điển Keywords](#7-từ-điển-keywords)

---

# 1. TỔNG QUAN

## 📌 Research Overview

```
SEMGREP RESEARCH:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  QUESTION:                                         │
│  "AI coding agents có thể detect vulnerabilities   │
│   trong real-world applications không?"            │
│                                                     │
│  TESTED TOOLS:                                     │
│  ├── Claude Code (v1.0.32, Sonnet 4)              │
│  └── OpenAI Codex (v0.2.0, o4-mini)               │
│                                                     │
│  TARGET:                                           │
│  • 11 large, production Python web apps            │
│  • Django, Flask, FastAPI frameworks               │
│                                                     │
│  RESULT:                                           │
│  ~20 high-severity vulnerabilities confirmed       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Key Findings Summary

| Metric | Claude Code | OpenAI Codex |
|--------|-------------|--------------|
| **Vulnerabilities Found** | 46 | 21 |
| **True Positive Rate** | 14% | 18% |
| **False Positive Rate** | 86% | 82% |
| **High-Severity Confirmed** | ~20 (combined) | |

---

# 2. RESEARCH METHODOLOGY

## 📌 Test Setup

```
METHODOLOGY:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  APPLICATION CRITERIA:                             │
│  ─────────────────────                             │
│  • Large, production codebases                     │
│  • Real-world Python web apps                      │
│  • Multiple frameworks (Django, Flask, FastAPI)    │
│  • 11 applications total                           │
│                                                     │
│  WHY PRODUCTION APPS?                              │
│  ─────────────────────                             │
│  • Avoid training data contamination               │
│  • Test against realistic complexity               │
│  • No suggestive variable names                    │
│  • Real architectural patterns                     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Evaluation Approach

```
EVALUATION PROCESS:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Step 1: Deploy AI Agent                           │
│  ───────────────────────                           │
│  Point agent at codebase                           │
│                                                     │
│  Step 2: Request Vulnerability Scan                │
│  ──────────────────────────────────                │
│  "Find security vulnerabilities in this app"       │
│                                                     │
│  Step 3: Collect Findings                          │
│  ────────────────────────                          │
│  Record all reported vulnerabilities               │
│                                                     │
│  Step 4: Manual Validation                         │
│  ─────────────────────────                         │
│  Security experts verify each finding              │
│  Classify: True Positive / False Positive          │
│                                                     │
│  Step 5: Multiple Runs                             │
│  ─────────────────────                             │
│  Test non-determinism với same prompts             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 3. DETECTION PERFORMANCE

## 📌 Vulnerability Class Performance

```
CLAUDE CODE PERFORMANCE:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  VULNERABILITY TYPE        │ SUCCESS RATE          │
│  ══════════════════════════╪═══════════════════════│
│  IDOR (Insecure Direct     │                       │
│  Object Reference)         │ 22% ← Best            │
│  ──────────────────────────┼───────────────────────│
│  XSS (Cross-Site Scripting)│ 16%                   │
│  ──────────────────────────┼───────────────────────│
│  SQL Injection             │ 5%  ← Struggles       │
│                                                     │
│  Overall True Positive: 14%                        │
│  Overall False Positive: 86%                       │
│                                                     │
└─────────────────────────────────────────────────────┘

OPENAI CODEX PERFORMANCE:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  VULNERABILITY TYPE        │ SUCCESS RATE          │
│  ══════════════════════════╪═══════════════════════│
│  Path Traversal            │ 47% ← Best            │
│  ──────────────────────────┼───────────────────────│
│  IDOR                      │ 0%  ← Fails           │
│  ──────────────────────────┼───────────────────────│
│  SQL Injection             │ 0%  ← Fails           │
│  ──────────────────────────┼───────────────────────│
│  XSS                       │ 0%  ← Fails           │
│                                                     │
│  Overall True Positive: 18%                        │
│  Overall False Positive: 82%                       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Complementary Strengths

```
CONTRASTING PERFORMANCE:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  CLAUDE CODE excels at:                            │
│  • IDOR (22% success)                              │
│  • XSS (16% success)                               │
│  • Authorization logic flaws                       │
│                                                     │
│  OPENAI CODEX excels at:                           │
│  • Path Traversal (47% success)                    │
│  • File system vulnerabilities                     │
│                                                     │
│  IMPLICATION:                                      │
│  → Sử dụng BOTH tools có thể tăng coverage        │
│  → Mỗi tool có blind spots khác nhau              │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 4. NON-DETERMINISM PROBLEM

## 📌 Inconsistent Results

```
THE NON-DETERMINISM PROBLEM:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  SAME APP, SAME PROMPT, 3 CONSECUTIVE RUNS:        │
│                                                     │
│  Run 1: 3 findings                                 │
│  Run 2: 6 findings                                 │
│  Run 3: 11 findings                                │
│                                                     │
│  ⚠️ COMPLETELY DIFFERENT RESULTS!                  │
│                                                     │
│  This means:                                       │
│  • Cannot rely on single scan                      │
│  • Results may miss vulnerabilities                │
│  • Or report different ones each time              │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Root Causes

```
WHY NON-DETERMINISM?

┌─────────────────────────────────────────────────────┐
│                                                     │
│  1. CONTEXT ROT                                    │
│     ─────────────                                  │
│     Performance degrades với long contexts         │
│     Large codebases exceed optimal window          │
│                                                     │
│  2. LOSSY COMPRESSION                              │
│     ─────────────────                              │
│     AI summarizes/compresses massive codebases     │
│     Different compressions → Different results     │
│                                                     │
│  3. TEMPERATURE/SAMPLING                           │
│     ───────────────────────                        │
│     Random sampling trong generation               │
│     Different paths through search space           │
│                                                     │
│  4. ATTENTION PATTERNS                             │
│     ──────────────────                             │
│     Model may focus on different code areas        │
│     depending on context positioning               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 5. BENCHMARK LIMITATIONS

## 📌 Traditional SAST Benchmark Problems

```
WHY TRADITIONAL BENCHMARKS FAIL:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  PROBLEM 1: Training Data Contamination            │
│  ══════════════════════════════════════            │
│  • Models may have seen benchmark apps             │
│  • Recognize memorized patterns                    │
│  • NOT genuine analysis                            │
│                                                     │
│  PROBLEM 2: Unrealistic Code                       │
│  ═══════════════════════════                       │
│  Known-vulnerable apps contain:                    │
│  • Suggestive variable names                       │
│     ("unsafeInput", "vulnerableQuery")             │
│  • Comments explaining vulnerabilities             │
│  • Obvious anti-patterns                           │
│                                                     │
│  PROBLEM 3: Insufficient Scale                     │
│  ═════════════════════════════                     │
│  Benchmark statistics:                             │
│  • Average: <98 lines of code                      │
│  • Average: 3 files                                │
│  → Missing real architectural complexity           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Real vs Benchmark Apps

```
COMPARISON:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  BENCHMARK APPS:        │ REAL-WORLD APPS:         │
│  ═══════════════════════╪═════════════════════════ │
│  ~98 lines              │ 10,000+ lines            │
│  3 files                │ 100+ files               │
│  Obvious vulnerabilities│ Subtle, complex bugs     │
│  Suggestive naming      │ Normal naming            │
│  Isolated issues        │ Interconnected systems   │
│  No dependencies        │ Many dependencies        │
│                                                     │
│  → Benchmark performance ≠ Real-world performance  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 6. PRACTICAL IMPLICATIONS

## 📌 What This Means for Security Teams

```
PRACTICAL TAKEAWAYS:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  ✅ AI CAN find real vulnerabilities               │
│     ~20 high-severity bugs confirmed               │
│                                                     │
│  ⚠️ BUT generates substantial noise                │
│     82-86% false positive rates                    │
│                                                     │
│  ⚠️ Results are non-deterministic                  │
│     Multiple scans needed                          │
│                                                     │
│  📋 HUMAN EXPERTISE STILL ESSENTIAL                │
│     • Validate findings                            │
│     • Interpret results                            │
│     • Prioritize remediation                       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Cost Considerations

```
COST IMPLICATIONS:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  NON-DETERMINISM → MULTIPLE SCANS NEEDED           │
│                                                     │
│  If single scan costs $X:                          │
│  • Need 3-5 scans for confidence                   │
│  • Total cost: 3X-5X                               │
│                                                     │
│  PLUS validation costs:                            │
│  • 86% false positives need human review           │
│  • Each review takes time                          │
│                                                     │
│  RECOMMENDATION:                                   │
│  Use AI as TRIAGE tool, not replacement            │
│  for security expertise                            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Workflow Integration

```
RECOMMENDED WORKFLOW:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  1. RUN MULTIPLE AI SCANS                          │
│     ─────────────────────                          │
│     3-5 runs per codebase                          │
│     Aggregate unique findings                       │
│                                                     │
│  2. COMBINE TOOLS                                  │
│     ─────────────                                  │
│     Claude Code + Codex + Traditional SAST         │
│     Different tools, different blind spots         │
│                                                     │
│  3. HUMAN TRIAGE                                   │
│     ────────────                                   │
│     Security expert reviews all findings           │
│     Filters false positives                        │
│                                                     │
│  4. PRIORITIZED REMEDIATION                        │
│     ───────────────────────                        │
│     Focus on confirmed vulnerabilities             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 7. TỪ ĐIỂN KEYWORDS

| Từ khóa | Nghĩa | Giải thích thêm |
|---------|-------|-----------------|
| **True Positive** | Dương tính thật | Vulnerability thực sự tồn tại |
| **False Positive** | Dương tính giả | Báo lỗi không có thật |
| **IDOR** | Insecure Direct Object Reference | Truy cập object không an toàn |
| **XSS** | Cross-Site Scripting | Chèn script độc hại |
| **Path Traversal** | Duyệt đường dẫn | Truy cập file ngoài ý muốn |
| **Context Rot** | Suy giảm context | Performance giảm khi context dài |
| **Non-Determinism** | Không xác định | Kết quả khác nhau mỗi lần chạy |
| **SAST** | Static Application Security Testing | Kiểm tra bảo mật tĩnh |
| **Benchmark** | Điểm chuẩn | Test đánh giá performance |
| **Triage** | Phân loại | Sàng lọc và ưu tiên |

---

# 📚 TÀI NGUYÊN

## Links
- [Semgrep Research Blog](https://semgrep.dev/blog/2025/finding-vulnerabilities-in-modern-web-apps-using-claude-code-and-openai-codex/) - Nguồn gốc
- [Claude Code](https://claude.ai/code) - Anthropic
- [OpenAI Codex](https://openai.com/codex) - OpenAI

---

*Tài liệu phân tích nghiên cứu Semgrep về việc sử dụng AI agents để tìm vulnerabilities trong web apps.*
