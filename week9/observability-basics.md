# 👁️ OBSERVABILITY BASICS YOU SHOULD KNOW
## Traces, Spans và nền tảng Observability

---

# 📖 MỤC LỤC

1. [Tổng quan](#1-tổng-quan)
2. [Traces và Spans](#2-traces-và-spans)
3. [Ba trụ cột Observability](#3-ba-trụ-cột-observability)
4. [OpenTelemetry](#4-opentelemetry)
5. [Từ điển Keywords](#5-từ-điển-keywords)

---

# 1. TỔNG QUAN

## 📌 Observability là gì?

```
OBSERVABILITY:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  DEFINITION:                                       │
│  Khả năng hiểu trạng thái internal của hệ thống    │
│  thông qua các outputs (logs, metrics, traces)     │
│                                                     │
│  WHY IMPORTANT:                                    │
│  Distributed systems = Hard to debug               │
│  Request đi qua nhiều services                     │
│  Cần visibility vào toàn bộ journey                │
│                                                     │
│  THREE PILLARS:                                    │
│  ┌─────────────────────────────────────────────┐   │
│  │   LOGS    │   METRICS   │   TRACES         │   │
│  │  Events   │   Numbers   │   Journeys       │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 2. TRACES VÀ SPANS

## 📌 What is a Trace?

```
TRACE:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  "The complete story of a request from start       │
│   to finish—from when a user clicks a button       │
│   until they see the result"                       │
│                                                     │
│  EXAMPLE:                                          │
│  ─────────                                         │
│  User clicks "Buy" button                          │
│       ↓                                            │
│  Frontend → API Gateway → Order Service            │
│       ↓                                            │
│  Payment Service → Inventory → Notification        │
│       ↓                                            │
│  User sees "Order Confirmed"                       │
│                                                     │
│  ENTIRE JOURNEY = ONE TRACE                        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 What is a Span?

```
SPAN:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  "Each span represents ONE OPERATION"              │
│                                                     │
│  EXAMPLES:                                         │
│  • Database query                                  │
│  • API call                                        │
│  • Function execution                              │
│  • Cache lookup                                    │
│                                                     │
│  RELATIONSHIP:                                     │
│  ══════════════                                    │
│  TRACE contains multiple SPANS                     │
│  SPANS can NEST (parent-child relationships)       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Trace-Span Hierarchy

```
TRACE AND SPAN STRUCTURE:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  TRACE: Order Purchase (trace_id: abc123)          │
│  ═══════════════════════════════════════           │
│                                                     │
│  ├── SPAN: API Gateway (50ms)                      │
│  │   └── SPAN: Auth Check (10ms)                   │
│  │                                                 │
│  ├── SPAN: Order Service (200ms)                   │
│  │   ├── SPAN: Validate Order (20ms)               │
│  │   └── SPAN: Save to DB (80ms)                   │
│  │                                                 │
│  ├── SPAN: Payment Service (300ms)                 │
│  │   ├── SPAN: Process Payment (250ms)             │
│  │   └── SPAN: Update Balance (30ms)               │
│  │                                                 │
│  └── SPAN: Notification (100ms)                    │
│      └── SPAN: Send Email (90ms)                   │
│                                                     │
│  TOTAL TRACE DURATION: ~650ms                      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Span Metadata

```
SPAN CONTENTS:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  SPAN: Payment Processing                          │
│  ════════════════════════                          │
│                                                     │
│  REQUIRED:                                         │
│  • trace_id: "abc123"                              │
│  • span_id: "span456"                              │
│  • parent_span_id: "span123"                       │
│  • operation_name: "process_payment"               │
│  • start_time: 1234567890                          │
│  • duration: 250ms                                 │
│                                                     │
│  OPTIONAL METADATA:                                │
│  • status: "OK" / "ERROR"                          │
│  • attributes: {                                   │
│      "payment.method": "credit_card",              │
│      "payment.amount": 99.99,                      │
│      "user.id": "user789"                          │
│    }                                               │
│  • events: ["payment_authorized", "receipt_sent"]  │
│  • links: [related_span_ids]                       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Context Propagation

```
CONTEXT PROPAGATION:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  HOW TRACES WORK ACROSS SERVICES:                  │
│                                                     │
│  Service A                   Service B             │
│  ┌──────────┐               ┌──────────┐           │
│  │ Span 1   │──HTTP call──→│ Span 2   │           │
│  │trace:abc │  (headers)   │trace:abc │           │
│  │span:111  │              │span:222  │           │
│  └──────────┘              │parent:111│           │
│                            └──────────┘           │
│                                                     │
│  HEADERS PASSED:                                   │
│  • traceparent: 00-abc-111-01                      │
│  • tracestate: (optional vendor data)              │
│                                                     │
│  → Each service creates OWN spans                  │
│  → But links to SAME trace ID                      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 3. BA TRỤ CỘT OBSERVABILITY

## 📌 Logs, Metrics, Traces

```
THREE PILLARS:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  LOGS                                              │
│  ═════                                             │
│  • Discrete events                                 │
│  • Text-based records                              │
│  • "What happened at this moment"                  │
│                                                     │
│  Example:                                          │
│  [ERROR] 2024-01-15 10:30:45 User auth failed      │
│                                                     │
│  METRICS                                           │
│  ═══════                                           │
│  • Numeric measurements over time                  │
│  • Aggregatable                                    │
│  • "How is the system performing"                  │
│                                                     │
│  Example:                                          │
│  request_latency_p99: 250ms                        │
│  error_rate: 0.1%                                  │
│                                                     │
│  TRACES                                            │
│  ══════                                            │
│  • Request journeys                                │
│  • Distributed context                             │
│  • "How did this request flow through system"      │
│                                                     │
│  Example:                                          │
│  Trace showing 5 service hops taking 650ms total   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 How They Complement Each Other

```
COMPLEMENTARY SIGNALS:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  "Traces COMPLEMENT metrics and logs"              │
│                                                     │
│  METRICS:                                          │
│  → Reveal system health AT SCALE                   │
│  → "Error rate is 5%"                              │
│                                                     │
│  LOGS:                                             │
│  → Capture DISCRETE EVENTS                         │
│  → "This specific error happened"                  │
│                                                     │
│  TRACES:                                           │
│  → Show HOW OPERATIONS CONNECT                     │
│  → "The error happened because Service B           │
│     took 5 seconds to respond"                     │
│                                                     │
│  TOGETHER:                                         │
│  → Comprehensive system visibility                 │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 When to Use What

```
USE CASE GUIDE:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  QUESTION                    │ USE                 │
│  ════════════════════════════╪═════════════════════│
│  "Is the system healthy?"    │ METRICS             │
│  ────────────────────────────┼─────────────────────│
│  "What error occurred?"      │ LOGS                │
│  ────────────────────────────┼─────────────────────│
│  "Why is this request slow?" │ TRACES              │
│  ────────────────────────────┼─────────────────────│
│  "Where is the bottleneck?"  │ TRACES + METRICS    │
│  ────────────────────────────┼─────────────────────│
│  "What led to this error?"   │ TRACES + LOGS       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 4. OPENTELEMETRY

## 📌 Industry Standard

```
OPENTELEMETRY:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  "Industry standard for implementing traces"       │
│                                                     │
│  FEATURES:                                         │
│  ══════════                                        │
│  • Vendor-neutral APIs                             │
│  • Automatic instrumentation                       │
│  • Support for popular frameworks                  │
│  • Multiple programming languages                  │
│                                                     │
│  LANGUAGES SUPPORTED:                              │
│  ┌─────────────────────────────────────────────┐   │
│  │ Java │ Python │ Go │ JS │ .NET │ Ruby │ etc │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  BACKENDS:                                         │
│  • Jaeger                                          │
│  • Zipkin                                          │
│  • Datadog                                         │
│  • New Relic                                       │
│  • And more...                                     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Auto-Instrumentation

```
EASY SETUP:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  WITHOUT OPENTELEMETRY:                            │
│  ──────────────────────                            │
│  Manually add tracing code everywhere              │
│  Maintain vendor-specific SDKs                     │
│  → Lots of work                                    │
│                                                     │
│  WITH OPENTELEMETRY:                               │
│  ────────────────────                              │
│  Auto-instrumentation for:                         │
│  • HTTP requests                                   │
│  • Database queries                                │
│  • Message queues                                  │
│  • gRPC calls                                      │
│                                                     │
│  → Minimal code changes                            │
│  → Switch backends easily                          │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 5. TỪ ĐIỂN KEYWORDS

| Từ khóa | Nghĩa | Giải thích thêm |
|---------|-------|-----------------|
| **Observability** | Khả năng quan sát | Hiểu system qua outputs |
| **Trace** | Vết theo dõi | Complete request journey |
| **Span** | Khoảng | Single operation in trace |
| **Context Propagation** | Truyền context | Pass trace ID across services |
| **Instrumentation** | Đo lường | Adding observability code |
| **OpenTelemetry** | OTel | Industry standard framework |
| **Distributed Tracing** | Tracing phân tán | Tracing across services |
| **Latency** | Độ trễ | Response time |
| **Three Pillars** | Ba trụ cột | Logs, Metrics, Traces |
| **Telemetry** | Dữ liệu đo lường | Data collected for analysis |

---

# 📚 TÀI NGUYÊN

## Links
- [Observability Basics - Last9](https://last9.io/blog/traces-spans-observability-basics/) - Nguồn gốc
- [OpenTelemetry](https://opentelemetry.io/) - Official site
- [Distributed Tracing Guide](https://www.datadoghq.com/knowledge-center/distributed-tracing/) - Datadog

---

*Tài liệu về Observability basics - Traces, Spans và cách chúng hoạt động cùng nhau.*
