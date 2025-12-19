# 🔧 INTRODUCTION TO SITE RELIABILITY ENGINEERING
## SRE - Khi Software Engineer thiết kế Operations Team

---

# 📖 MỤC LỤC

1. [Tổng quan](#1-tổng-quan)
2. [SRE vs Traditional Operations](#2-sre-vs-traditional-operations)
3. [Core Tenets of SRE](#3-core-tenets-of-sre)
4. [Error Budget Framework](#4-error-budget-framework)
5. [SRE vs DevOps](#5-sre-vs-devops)
6. [Từ điển Keywords](#6-từ-điển-keywords)

---

# 1. TỔNG QUAN

## 📌 Định nghĩa SRE

```
SITE RELIABILITY ENGINEERING:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  "SRE is what happens when you ask a               │
│   SOFTWARE ENGINEER to design an OPERATIONS team"  │
│                                                     │
│  - Google SRE Book                                 │
│                                                     │
│  CORE PRINCIPLE:                                   │
│  Applying software engineering principles          │
│  to operations problems                            │
│                                                     │
│  RESULT:                                           │
│  Replace manual system administration              │
│  with AUTOMATED solutions                          │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 SRE Team Composition (Google)

```
GOOGLE SRE HIRING:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  50-60%: Software Engineers                        │
│  ════════════════════════                          │
│  Hired through standard engineering channels       │
│                                                     │
│  40-50%: System Specialists                        │
│  ═════════════════════════                         │
│  Strong system internals + networking              │
│  BUT excel at automation                           │
│                                                     │
│  KEY TRAIT:                                        │
│  Teams naturally AUTOMATE repetitive tasks         │
│  rather than doing manual labor                    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 2. SRE VS TRADITIONAL OPERATIONS

## 📌 Traditional Sysadmin Problems

```
TRADITIONAL OPS LIMITATIONS:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  PROBLEM 1: SCALING                                │
│  ══════════════════                                │
│  Team size grows LINEARLY with system complexity   │
│                                                     │
│  System size ████████████████████                  │
│  Team size   ████████████████████                  │
│  → Expensive, unsustainable                        │
│                                                     │
│  PROBLEM 2: DEV/OPS CONFLICT                       │
│  ═══════════════════════════                       │
│  Development: "Ship fast!"                         │
│  Operations:  "Don't break things!"                │
│  → Misaligned incentives                           │
│                                                     │
│  PROBLEM 3: COMMUNICATION GAPS                     │
│  ════════════════════════════                      │
│  • Different vocabularies                          │
│  • Different risk assumptions                      │
│  • Trust issues between teams                      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 SRE Solution

```
SRE APPROACH:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  TRADITIONAL:                                      │
│  ────────────                                      │
│  More systems → Hire more ops people               │
│                                                     │
│  SRE:                                              │
│  ────                                              │
│  More systems → Automate more                      │
│                                                     │
│  RESULT:                                           │
│  ═══════                                           │
│  • SUBLINEAR team growth                           │
│  • Lower operational costs                         │
│  • Rapid innovation WITH reliability               │
│                                                     │
│  System size ████████████████████                  │
│  Team size   ████████░░░░░░░░░░░░                  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 3. CORE TENETS OF SRE

## 📌 50% Operations Cap

```
THE 50% RULE:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  SRE TIME ALLOCATION:                              │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ OPERATIONS (max 50%)    │ ENGINEERING (50%+)│   │
│  │ • On-call               │ • Automation      │   │
│  │ • Tickets               │ • Tools           │   │
│  │ • Manual tasks          │ • Improvements    │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  WHY:                                              │
│  Engineering time REDUCES future ops burden        │
│                                                     │
│  IF ops > 50%:                                     │
│  → Redistribute work to dev teams                  │
│  → Or hire more SREs                               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 SRE Responsibilities

```
SRE OWNS:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  • AVAILABILITY      - Uptime targets              │
│  • LATENCY           - Response times              │
│  • PERFORMANCE       - System efficiency           │
│  • EFFICIENCY        - Resource utilization        │
│  • CAPACITY PLANNING - Future growth               │
│  • EMERGENCY RESPONSE- Incident handling           │
│  • CHANGE MANAGEMENT - Safe deployments            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Monitoring Philosophy

```
SRE MONITORING APPROACH:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  TRADITIONAL:                                      │
│  ────────────                                      │
│  Alert on everything → Human decides               │
│  → Alert fatigue                                   │
│                                                     │
│  SRE:                                              │
│  ────                                              │
│  Systems AUTOMATICALLY interpret data              │
│  Humans receive alerts ONLY when                   │
│  IMMEDIATE ACTION is necessary                     │
│                                                     │
│  RULE:                                             │
│  "Every alert should be ACTIONABLE"                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Change Management

```
SAFE DEPLOYMENTS:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  AUTOMATION DRIVES:                                │
│                                                     │
│  1. PROGRESSIVE ROLLOUTS                           │
│     1% → 5% → 25% → 100%                          │
│                                                     │
│  2. RAPID PROBLEM DETECTION                        │
│     Automated monitoring catches issues            │
│                                                     │
│  3. SAFE ROLLBACKS                                 │
│     One-click revert when needed                   │
│                                                     │
│  RESULT:                                           │
│  Fewer outages + Faster releases                   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 4. ERROR BUDGET FRAMEWORK

## 📌 The Error Budget Concept

```
ERROR BUDGET:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  KEY INSIGHT:                                      │
│  "100% availability is the WRONG target"           │
│                                                     │
│  WHY:                                              │
│  • Extremely expensive                             │
│  • Diminishing returns                             │
│  • Prevents innovation                             │
│                                                     │
│  INSTEAD:                                          │
│  Set REALISTIC availability targets                │
│                                                     │
│  EXAMPLE:                                          │
│  Target: 99.9% availability                        │
│  Allowed downtime: 0.1% = ~8.7 hours/year          │
│                                                     │
│  This 0.1% is your ERROR BUDGET                    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 How Error Budget Works

```
ERROR BUDGET IN PRACTICE:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  BUDGET AVAILABLE:                                 │
│  ═════════════════                                 │
│  • Teams can "spend" it on innovation              │
│  • Launch risky features                           │
│  • Experiment with new infrastructure              │
│                                                     │
│  BUDGET EXHAUSTED:                                 │
│  ═════════════════                                 │
│  • Focus shifts to stability                       │
│  • No new risky launches                           │
│  • Pay down reliability debt                       │
│                                                     │
│  BENEFIT:                                          │
│  Aligns Dev and Ops incentives!                    │
│  Both teams "own" the same budget                  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 5. SRE VS DEVOPS

## 📌 Relationship

```
SRE AND DEVOPS:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  TWO PERSPECTIVES:                                 │
│                                                     │
│  VIEW 1:                                           │
│  "SRE is a SPECIFIC IMPLEMENTATION of              │
│   DevOps principles"                               │
│                                                     │
│  VIEW 2:                                           │
│  "DevOps is a BROADER GENERALIZATION of            │
│   SRE concepts"                                    │
│                                                     │
│  SHARED VALUES:                                    │
│  ══════════════                                    │
│  • Engineering approach to operations              │
│  • Automation over manual effort                   │
│  • IT involvement throughout system design         │
│  • Break down Dev/Ops silos                        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Key Differences

```
SRE VS DEVOPS:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  ASPECT        │ DEVOPS         │ SRE              │
│  ══════════════╪════════════════╪══════════════════│
│  Origin        │ Community      │ Google           │
│  ─────────────-┼────────────────┼──────────────────│
│  Focus         │ Culture +      │ Concrete         │
│                │ Practices      │ Metrics (SLOs)   │
│  ─────────────-┼────────────────┼──────────────────│
│  Team          │ Developers do  │ Dedicated SRE    │
│                │ ops too        │ team             │
│  ─────────────-┼────────────────┼──────────────────│
│  Measurement   │ Varies         │ Error Budgets,   │
│                │                │ SLIs, SLOs       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 6. TỪ ĐIỂN KEYWORDS

| Từ khóa | Nghĩa | Giải thích thêm |
|---------|-------|-----------------|
| **SRE** | Site Reliability Engineering | Discipline kết hợp SE + Ops |
| **Error Budget** | Ngân sách lỗi | Allowed downtime for innovation |
| **SLI** | Service Level Indicator | Metric đo lường service |
| **SLO** | Service Level Objective | Target cho SLI |
| **SLA** | Service Level Agreement | Hợp đồng với customer |
| **On-call** | Trực ca | Responsibility for incidents |
| **Toil** | Công việc lặp lại | Manual, repetitive ops work |
| **Postmortem** | Hậu kiểm | Analysis after incident |
| **Runbook** | Sổ tay vận hành | Documented procedures |
| **Progressive Rollout** | Triển khai dần | Gradual deployment |

---

# 📚 TÀI NGUYÊN

## Links
- [Google SRE Book - Introduction](https://sre.google/sre-book/introduction/) - Nguồn gốc
- [Google SRE Workbook](https://sre.google/workbook/table-of-contents/) - Practical guide
- [SRE Weekly](https://sreweekly.com/) - Newsletter

---

*Tài liệu giới thiệu Site Reliability Engineering - discipline được Google phát triển để vận hành hệ thống scale lớn.*
