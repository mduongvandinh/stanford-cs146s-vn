# 🔧 WRITING EFFECTIVE TOOLS FOR AGENTS
## Hướng dẫn từ Anthropic Engineering Team

---

# 📖 MỤC LỤC

1. [Tổng quan về Tools](#1-tổng-quan-về-tools)
2. [Core Principles](#2-core-principles)
3. [Selecting Tools](#3-selecting-tools)
4. [Tool Response Optimization](#4-tool-response-optimization)
5. [Namespacing Conventions](#5-namespacing-conventions)
6. [Implementation Process](#6-implementation-process)
7. [Prompt Engineering cho Tool Descriptions](#7-prompt-engineering-cho-tool-descriptions)
8. [Từ điển Keywords](#8-từ-điển-keywords)

---

# 1. TỔNG QUAN VỀ TOOLS

## 📌 Tools trong AI Agents là gì?

```
TOOLS = Bridge giữa AI Agent và External Systems

┌─────────────────────────────────────────────────────┐
│                                                     │
│     ┌──────────┐                                   │
│     │   AI     │                                   │
│     │  Agent   │                                   │
│     └────┬─────┘                                   │
│          │                                         │
│          │ Calls tools                             │
│          ▼                                         │
│  ┌───────────────────────────────────────────┐     │
│  │               TOOLS                        │     │
│  │                                           │     │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐     │     │
│  │  │search_  │ │send_    │ │read_    │     │     │
│  │  │contacts │ │message  │ │file     │     │     │
│  │  └────┬────┘ └────┬────┘ └────┬────┘     │     │
│  └───────┼───────────┼───────────┼───────────┘     │
│          │           │           │                 │
│          ▼           ▼           ▼                 │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│   │ Contacts │ │  Email   │ │   File   │          │
│   │   API    │ │   API    │ │  System  │          │
│   └──────────┘ └──────────┘ └──────────┘          │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Tools ≠ Traditional Functions

```
KEY DIFFERENCE:

TRADITIONAL FUNCTION:
┌─────────────────────────────────────────────────────┐
│                                                     │
│  Input A → Function → Output X (always)            │
│                                                     │
│  • Deterministic                                   │
│  • Predictable                                     │
│  • Same input = Same output                        │
│                                                     │
└─────────────────────────────────────────────────────┘

TOOL FOR AGENT:
┌─────────────────────────────────────────────────────┐
│                                                     │
│  Context + Input → Tool → Output (varies)          │
│                                                     │
│  • Non-deterministic caller (AI)                   │
│  • May hallucinate parameters                      │
│  • May misunderstand tool purpose                  │
│  • May call differently based on context           │
│                                                     │
└─────────────────────────────────────────────────────┘

→ Tools need different design principles than APIs
```

---

# 2. CORE PRINCIPLES

## 📌 Key Insight từ Anthropic

> "Tools that are most 'ergonomic' for agents also end up being surprisingly intuitive to grasp as humans."

```
DESIGN PRINCIPLE:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  If a tool is GOOD for AI agents,                  │
│  it's probably GOOD for humans too.                │
│                                                     │
│  Why?                                              │
│  • Clear purpose                                   │
│  • Intuitive naming                                │
│  • Predictable behavior                            │
│  • Helpful error messages                          │
│                                                     │
│  → Design for agents = Design for clarity          │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Ba trụ cột

| Principle | Mô tả | Ví dụ |
|-----------|-------|-------|
| **Selectivity** | Chọn đúng tools | Không wrap mọi API endpoint |
| **Consolidation** | Gom tools liên quan | Combine 3 tools thành 1 |
| **Clarity** | Tên và mô tả rõ ràng | `search_contacts` > `get_users_v2` |

---

# 3. SELECTING TOOLS

## 📌 More Tools ≠ Better

```
COMMON MISTAKE:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  "Let's wrap ALL our API endpoints as tools!"      │
│                                                     │
│  API Endpoints: 50+                                │
│  Tools created: 50+                                │
│                                                     │
│  Result: Agent confused, poor performance          │
│                                                     │
└─────────────────────────────────────────────────────┘

BETTER APPROACH:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  "Focus on HIGH-IMPACT workflows"                  │
│                                                     │
│  API Endpoints: 50+                                │
│  Tools created: 10-15 (carefully designed)         │
│                                                     │
│  Result: Agent efficient, good performance         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Consolidation Examples

```
BEFORE (Too many tools):
┌─────────────────────────────────────────────────────┐
│                                                     │
│  • list_contacts()                                 │
│  • get_contact(id)                                 │
│  • send_message(to, body)                          │
│                                                     │
│  → 3 separate tools                                │
│  → Agent must chain: list → get → send             │
│                                                     │
└─────────────────────────────────────────────────────┘

AFTER (Consolidated):
┌─────────────────────────────────────────────────────┐
│                                                     │
│  • search_contacts(query)                          │
│    Returns: contacts matching query                │
│    → 1 tool that does intelligent search           │
│                                                     │
└─────────────────────────────────────────────────────┘


BEFORE:
┌─────────────────────────────────────────────────────┐
│                                                     │
│  • read_logs(file)                                 │
│  → Returns ALL logs (thousands of lines)           │
│                                                     │
└─────────────────────────────────────────────────────┘

AFTER:
┌─────────────────────────────────────────────────────┐
│                                                     │
│  • search_logs(query, time_range, severity)        │
│  → Returns RELEVANT logs only                      │
│                                                     │
└─────────────────────────────────────────────────────┘


BEFORE:
┌─────────────────────────────────────────────────────┐
│                                                     │
│  • get_customer_by_id(id)                          │
│  • list_transactions(customer_id)                  │
│  • list_notes(customer_id)                         │
│                                                     │
└─────────────────────────────────────────────────────┘

AFTER:
┌─────────────────────────────────────────────────────┐
│                                                     │
│  • get_customer_context(identifier)                │
│    Returns: customer + recent transactions +       │
│             relevant notes                         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 4. TOOL RESPONSE OPTIMIZATION

## 📌 Return Meaningful Context

```
PRIORITIZE SEMANTIC CLARITY OVER TECHNICAL PRECISION

❌ TECHNICAL (Hard for agent):
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "mime_type": "image/png",
  "256px_image_url": "https://..."
}

✅ SEMANTIC (Easy for agent):
{
  "name": "John Smith",
  "file_type": "image",
  "image_url": "https://..."
}
```

## 📌 Control Response Verbosity

```
IMPLEMENT RESPONSE_FORMAT PARAMETER:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  search_contacts(query, response_format)           │
│                                                     │
│  response_format = "concise":                      │
│  ┌─────────────────────────────────────────────┐   │
│  │ {                                           │   │
│  │   "name": "John",                           │   │
│  │   "email": "john@company.com"               │   │
│  │ }                                           │   │
│  │                                             │   │
│  │ → 72 tokens                                 │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  response_format = "detailed":                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ {                                           │   │
│  │   "name": "John Smith",                     │   │
│  │   "email": "john@company.com",              │   │
│  │   "phone": "+1-555-0123",                   │   │
│  │   "department": "Engineering",              │   │
│  │   "manager": "Jane Doe",                    │   │
│  │   "location": "San Francisco",              │   │
│  │   "joined": "2023-01-15",                   │   │
│  │   "projects": ["Alpha", "Beta"]             │   │
│  │ }                                           │   │
│  │                                             │   │
│  │ → 206 tokens                                │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  → Agent chooses based on need                     │
│  → Better token efficiency                         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Pagination và Truncation

```
SMART TRUNCATION:

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Agent requests: list_files("/documents")          │
│  Folder has: 10,000 files                          │
│                                                     │
│  ❌ BAD: Return all 10,000 files                   │
│     → Context overflow                             │
│                                                     │
│  ✅ GOOD: Return first 50 with helpful message     │
│                                                     │
│  {                                                 │
│    "files": [...first 50 files...],               │
│    "total": 10000,                                 │
│    "showing": 50,                                  │
│    "hint": "Too many results. Try a more specific │
│             search like: list_files('/documents',  │
│             filter='*.pdf', modified_after='2024') │
│  }                                                 │
│                                                     │
│  → Guide agent toward better queries               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 5. NAMESPACING CONVENTIONS

## 📌 Group Related Tools

```
WITHOUT NAMESPACING:
┌─────────────────────────────────────────────────────┐
│                                                     │
│  Tools:                                            │
│  • search_tasks                                    │
│  • search_issues                                   │
│  • create_task                                     │
│  • create_issue                                    │
│  • get_project                                     │
│  • get_sprint                                      │
│                                                     │
│  → Confusing: Is "search_issues" for Jira? GitHub? │
│                                                     │
└─────────────────────────────────────────────────────┘

WITH NAMESPACING:
┌─────────────────────────────────────────────────────┐
│                                                     │
│  Tools (by service):                               │
│                                                     │
│  ASANA:                                            │
│  • asana_search_tasks                              │
│  • asana_create_task                               │
│  • asana_get_project                               │
│                                                     │
│  JIRA:                                             │
│  • jira_search_issues                              │
│  • jira_create_issue                               │
│  • jira_get_sprint                                 │
│                                                     │
│  → Clear which service each tool belongs to        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Namespace Patterns

| Pattern | Example | Best For |
|---------|---------|----------|
| **By Service** | `asana_*`, `jira_*` | Multi-service integrations |
| **By Resource** | `asana_projects_*`, `asana_users_*` | Complex services |
| **By Action** | `*_search`, `*_create` | Action-focused UIs |

---

# 6. IMPLEMENTATION PROCESS

## 📌 Three-Phase Process

```
PHASE 1: PROTOTYPING
┌─────────────────────────────────────────────────────┐
│                                                     │
│  1. Start with QUICK prototypes                    │
│     • Use Claude Code / Claude Desktop             │
│     • Provide API documentation                    │
│                                                     │
│  2. Deploy as LOCAL tools first                    │
│     • MCP servers for testing                      │
│     • Desktop extensions                           │
│                                                     │
│  3. Test with REAL scenarios                       │
│     • Not hypothetical queries                     │
│     • Actual business workflows                    │
│                                                     │
└─────────────────────────────────────────────────────┘

PHASE 2: EVALUATION
┌─────────────────────────────────────────────────────┐
│                                                     │
│  1. Generate REALISTIC eval tasks                  │
│     • Based on actual workflows                    │
│     • Multiple tool calls required                 │
│                                                     │
│  ❌ BAD eval task:                                 │
│     "Get user with ID 123"                         │
│     (Too simple, sandbox query)                    │
│                                                     │
│  ✅ GOOD eval task:                                │
│     "Find all customers who signed up last month   │
│      but haven't made a purchase, then send them   │
│      a personalized discount email"                │
│     (Real workflow, multiple tools)                │
│                                                     │
│  2. Metrics to track:                              │
│     • Accuracy                                     │
│     • Runtime                                      │
│     • Total tool calls                             │
│     • Token consumption                            │
│     • Error rates                                  │
│                                                     │
└─────────────────────────────────────────────────────┘

PHASE 3: ITERATIVE IMPROVEMENT
┌─────────────────────────────────────────────────────┐
│                                                     │
│  1. Analyze evaluation TRANSCRIPTS                 │
│     • Where did agent struggle?                    │
│     • What caused errors?                          │
│     • What took too many calls?                    │
│                                                     │
│  2. Use CLAUDE to refactor tools                   │
│     • Feed transcripts to Claude                   │
│     • Ask for improvement suggestions              │
│     • Implement refinements                        │
│                                                     │
│  3. Maintain HELD-OUT test sets                    │
│     • Prevent overfitting to training evals        │
│     • Ensure general improvements                  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 7. PROMPT ENGINEERING CHO TOOL DESCRIPTIONS

## 📌 Descriptions Matter A LOT

> "Small refinements to tool descriptions can yield DRAMATIC improvements"

```
CASE STUDY: Claude Sonnet 3.5

┌─────────────────────────────────────────────────────┐
│                                                     │
│  Before tool description refinement:               │
│  Performance: 65%                                  │
│                                                     │
│  After precise tool descriptions:                  │
│  Performance: 89%                                  │
│                                                     │
│  → 24% improvement from DESCRIPTIONS ALONE         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 What to Include in Descriptions

```
TREAT DESCRIPTIONS LIKE EXPLAINING TO NEW TEAM MEMBER

┌─────────────────────────────────────────────────────┐
│                                                     │
│  1. CLARIFY SPECIALIZED FORMATS                    │
│  ─────────────────────────────────                 │
│  ❌ "query: search query"                          │
│  ✅ "query: JQL search string (e.g., 'project =   │
│      ALPHA AND status = Open')"                    │
│                                                     │
│  2. DEFINE NICHE TERMINOLOGY                       │
│  ─────────────────────────────────                 │
│  ❌ "Gets the epic"                                │
│  ✅ "Gets the epic (a large feature that contains │
│      multiple related stories/tasks)"             │
│                                                     │
│  3. DESCRIBE RELATIONSHIPS                         │
│  ─────────────────────────────────                 │
│  ❌ "project_id: the project ID"                  │
│  ✅ "project_id: ID of the Asana project.         │
│      Projects contain tasks and belong to teams.   │
│      Get IDs using asana_list_projects."          │
│                                                     │
│  4. USE UNAMBIGUOUS PARAMETER NAMES               │
│  ─────────────────────────────────                 │
│  ❌ "id", "type", "value"                          │
│  ✅ "customer_id", "file_type", "discount_amount" │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 📌 Example: Good vs Bad Description

```
❌ BAD TOOL DESCRIPTION:

{
  "name": "search",
  "description": "Searches for things",
  "parameters": {
    "q": "query string",
    "t": "type"
  }
}


✅ GOOD TOOL DESCRIPTION:

{
  "name": "search_customer_support_tickets",
  "description": "Searches customer support tickets in Zendesk.
                  Returns tickets matching the query, sorted by
                  creation date (newest first). Use this to find
                  tickets by customer name, issue type, or status.",
  "parameters": {
    "query": {
      "description": "Search query. Supports: customer name
                     (e.g., 'John Smith'), ticket ID (e.g., '#12345'),
                     or keywords (e.g., 'billing issue')",
      "type": "string"
    },
    "status_filter": {
      "description": "Filter by ticket status. Options: 'open',
                     'pending', 'solved', 'all'. Default: 'all'",
      "type": "string",
      "enum": ["open", "pending", "solved", "all"]
    },
    "limit": {
      "description": "Maximum number of tickets to return (1-100).
                     Default: 25. Use smaller values for faster
                     responses.",
      "type": "integer",
      "default": 25
    }
  }
}
```

---

# 8. TỪ ĐIỂN KEYWORDS

| Từ khóa | Nghĩa | Giải thích thêm |
|---------|-------|-----------------|
| **Tool** | Công cụ | Function mà agent có thể gọi |
| **Ergonomic** | Dễ sử dụng | Thiết kế thoải mái cho người dùng |
| **Consolidation** | Gom nhóm | Combine nhiều tools thành ít hơn |
| **Namespacing** | Đặt tên theo nhóm | Prefix để phân loại tools |
| **Response Format** | Định dạng trả về | Cách format output của tool |
| **Truncation** | Cắt ngắn | Giới hạn output length |
| **Pagination** | Phân trang | Chia results thành pages |
| **Eval Task** | Bài test đánh giá | Scenario để test tool performance |
| **Held-out Test** | Test riêng biệt | Test set không dùng để training |
| **JQL** | Jira Query Language | Ngôn ngữ query của Jira |

---

# 📚 TÀI NGUYÊN

## Links
- [Writing Effective Tools for Agents](https://www.anthropic.com/engineering/writing-tools-for-agents) - Bài gốc từ Anthropic
- [MCP Documentation](https://modelcontextprotocol.io) - Model Context Protocol
- [Claude Tool Use Guide](https://docs.anthropic.com/claude/docs/tool-use) - Official docs

---

*Tài liệu hướng dẫn thiết kế và xây dựng tools hiệu quả cho AI agents, từ Anthropic Engineering Team.*
