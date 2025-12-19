# 🤔 MCP FOOD FOR THOUGHT
## Tại sao APIs không làm MCP Tools tốt?

---

# 📖 MỤC LỤC

1. [Vấn đề với việc chuyển API thành MCP Tools](#1-vấn-đề-với-việc-chuyển-api-thành-mcp-tools)
2. [Tool Overload Problem](#2-tool-overload-problem)
3. [Context Window Inefficiency](#3-context-window-inefficiency)
4. [Missed Design Opportunities](#4-missed-design-opportunities)
5. [Agents có thể gọi APIs trực tiếp](#5-agents-có-thể-gọi-apis-trực-tiếp)
6. [Thiết kế MCP Tools đúng cách](#6-thiết-kế-mcp-tools-đúng-cách)
7. [Kết luận](#7-kết-luận)

---

# 1. VẤN ĐỀ VỚI VIỆC CHUYỂN API THÀNH MCP TOOLS

## 📌 Suy nghĩ phổ biến (nhưng sai)

```
CÁCH NGHĨ THÔNG THƯỜNG:
──────────────────────

"Tôi có REST API sẵn rồi, chỉ cần wrap nó thành MCP tools!"

API Endpoints:
• GET /users
• GET /users/{id}
• POST /users
• PUT /users/{id}
• DELETE /users/{id}
• GET /users/{id}/posts
• GET /users/{id}/followers
• ...

         ↓ Chuyển thành ↓

MCP Tools:
• get_users
• get_user
• create_user
• update_user
• delete_user
• get_user_posts
• get_user_followers
• ...

"Xong! AI agent giờ có thể dùng API của tôi!"
```

## 📌 Tại sao cách này KHÔNG TỐT?

```
┌─────────────────────────────────────────────────────────────┐
│                    4 VẤN ĐỀ CHÍNH                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   1. TOOL OVERLOAD                                          │
│      Quá nhiều tools → AI confused                          │
│                                                             │
│   2. CONTEXT WINDOW WASTE                                   │
│      APIs return dữ liệu không cần thiết                   │
│                                                             │
│   3. MISSED OPPORTUNITIES                                   │
│      Không tận dụng khả năng của AI agents                 │
│                                                             │
│   4. REDUNDANT MIDDLEMAN                                    │
│      AI có thể gọi APIs trực tiếp                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

# 2. TOOL OVERLOAD PROBLEM

## 📌 Giới hạn về số lượng Tools

```
HARD LIMITS:
──────────────
• VS Code có hard limit: 128 tools
• Nhiều models struggle trước khi đạt limit đó
• Mỗi tool định nghĩa chiếm context window

VÍ DỤ:
──────────────

Một API thông thường có thể có:
• 50+ endpoints
• Mỗi endpoint = 1 tool
• Mỗi tool definition = 100-500 tokens

→ 50 tools × 300 tokens = 15,000 tokens
→ Chỉ riêng tool definitions đã chiếm 15K tokens!
```

## 📌 AI Performance với nhiều Tools

```
SỐ TOOLS         AI PERFORMANCE
──────────        ──────────────
5-10 tools       ✅ Excellent - AI chọn đúng tool
10-20 tools      ⚠️ Good - Đôi khi confused
20-50 tools      ❌ Degraded - Hay chọn sai tool
50+ tools        ❌❌ Poor - Thường xuyên fail

TẠI SAO?
──────────
• AI phải "đọc" và "hiểu" mọi tool definitions
• Nhiều tools tương tự → dễ confused
• Context bị diluted với quá nhiều options
```

## 📌 Ví dụ thực tế

```
API CỦA MỘT E-COMMERCE PLATFORM:

Products:
• list_products
• get_product
• search_products
• get_product_reviews
• get_product_inventory
• ...

Orders:
• list_orders
• get_order
• create_order
• update_order
• cancel_order
• get_order_items
• ...

Users:
• list_users
• get_user
• get_user_orders
• get_user_cart
• ...

→ Chỉ 3 domains đã có 15+ tools
→ Full API có thể có 50-100 tools

KẾT QUẢ:
User: "Tôi muốn xem đơn hàng gần nhất"
AI:   *confused giữa get_order, list_orders, get_user_orders*
      *có thể gọi sai tool hoặc gọi nhiều tools không cần thiết*
```

---

# 3. CONTEXT WINDOW INEFFICIENCY

## 📌 APIs return quá nhiều data

```
VÍ DỤ: GET /users/123

API RESPONSE (full):
{
  "id": 123,
  "username": "john_doe",
  "email": "john@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "avatar_url": "https://...",
  "bio": "Software developer...",
  "location": "San Francisco",
  "website": "https://johndoe.com",
  "twitter": "@johndoe",
  "github": "johndoe",
  "linkedin": "johndoe",
  "created_at": "2020-01-15T10:30:00Z",
  "updated_at": "2024-12-20T15:45:00Z",
  "last_login": "2024-12-20T15:45:00Z",
  "email_verified": true,
  "phone_verified": false,
  "two_factor_enabled": true,
  "preferences": {
    "theme": "dark",
    "language": "en",
    "notifications": {...},
    ...
  },
  "stats": {
    "posts": 42,
    "followers": 1234,
    "following": 567,
    ...
  },
  ...
}

→ 500+ tokens cho 1 user
→ AI chỉ cần "John Doe" nhưng nhận được mọi thứ
```

## 📌 Pagination không phù hợp

```
TRADITIONAL API PAGINATION:

GET /products?page=1&limit=20

Vấn đề:
• Mỗi product có thể từ 100 → 10,000 tokens
• Product A: 150 tokens (simple product)
• Product B: 5,000 tokens (product với long description)

API trả về 20 products nhưng:
• Có thể chỉ có 3,000 tokens
• Hoặc có thể lên đến 100,000 tokens

→ Agent không thể predict context usage
→ Có thể exceed context window unexpectedly
```

## 📌 JSON là format tệ cho LLMs

```
SO SÁNH FORMATS:

JSON:
───────
[
  {"id": 1, "name": "Apple", "price": 1.99, "stock": 100},
  {"id": 2, "name": "Banana", "price": 0.99, "stock": 150},
  {"id": 3, "name": "Orange", "price": 2.49, "stock": 80}
]
→ ~200 tokens

CSV:
───────
id,name,price,stock
1,Apple,1.99,100
2,Banana,0.99,150
3,Orange,2.49,80
→ ~50 tokens (75% less!)

TSV (Tab-separated):
───────
id	name	price	stock
1	Apple	1.99	100
2	Banana	0.99	150
3	Orange	2.49	80
→ ~45 tokens

→ CSV/TSV tiết kiệm 50-75% tokens so với JSON
→ Nhưng APIs hầu hết chỉ return JSON
```

---

# 4. MISSED DESIGN OPPORTUNITIES

## 📌 MCP Tools có thể làm nhiều hơn APIs

```
API CHỈ LÀM MỘT VIỆC:
─────────────────────

GET /weather?city=hanoi

Response:
{
  "temperature": 25,
  "humidity": 80,
  "conditions": "cloudy"
}

→ Trả về data, xong!


MCP TOOL CÓ THỂ:
─────────────────────

1. LAYERED RESPONSE
   Trả về data + suggestions cho next steps

   {
     "data": { temperature, humidity, conditions },
     "suggestions": [
       "Nhiệt độ thoải mái, có thể đi dạo",
       "Độ ẩm cao, nhớ mang ô phòng mưa"
     ],
     "related_queries": [
       "Dự báo 7 ngày tới",
       "So sánh với tuần trước"
     ]
   }

2. CONTEXT-AWARE
   Adjust response based on user intent

3. INTELLIGENT FORMATTING
   Return format tối ưu cho LLM (CSV, summary, etc.)
```

## 📌 Ví dụ thiết kế tốt

```
❌ BAD: API-style MCP Tool
────────────────────────────

Tools:
• search_products(query)      → Returns all product fields
• get_product(id)             → Returns all product fields
• get_product_reviews(id)     → Returns all reviews
• get_product_inventory(id)   → Returns inventory data

User: "Tìm laptop dưới 20 triệu có đánh giá tốt"
→ Agent phải gọi 4-5 tools
→ Receive redundant data
→ Waste context window


✅ GOOD: Purpose-built MCP Tool
────────────────────────────

Tool:
• find_products(
    query: string,
    filters: {...},
    fields: ["name", "price", "rating"],  // Select only needed fields
    format: "csv",                         // Compact format
    include_summary: true                  // AI-friendly summary
  )

Response:
{
  "summary": "Found 15 laptops under 20M VND with 4+ stars rating",
  "data": "name,price,rating\nLaptop A,18M,4.5\nLaptop B,19M,4.8\n...",
  "suggestions": ["Sort by: rating", "Filter by: brand"]
}

→ 1 tool call
→ Only needed data
→ Token-efficient format
→ AI-friendly summary
```

## 📌 RAG-style Tools

```
TRADITIONAL SEARCH TOOL:
────────────────────────

search_database(query) → Returns matching records (structured data)

VẤN ĐỀ:
• AI phải parse và summarize data
• Có thể miss relevant info
• Không flexible


RAG-STYLE MCP TOOL:
────────────────────────

search_knowledge(
  query: string,
  return_type: "summary" | "detailed" | "raw"
)

Response:
{
  "answer": "Dựa trên documents, câu trả lời là...",
  "sources": ["doc1.pdf:page5", "doc2.pdf:page12"],
  "confidence": 0.85,
  "raw_data": [...] // Optional
}

→ Tool đã pre-process và summarize
→ AI có thể sử dụng ngay
→ Citations cho verification
```

---

# 5. AGENTS CÓ THỂ GỌI APIs TRỰC TIẾP

## 📌 Code Execution Capabilities

```
TREND HIỆN TẠI:
────────────────

AI Agents đang ngày càng có khả năng:
• Execute code in sandbox
• Make HTTP requests directly
• Handle authentication

VÍ DỤ:
────────────────

User: "Lấy data từ API XYZ"

CÁCH CŨ (với MCP Tool):
Agent → MCP Tool → API → Response → Agent
(Cần build và maintain MCP Tool)

CÁCH MỚI (Code Execution):
Agent viết code:
```python
import requests
response = requests.get("https://api.xyz.com/data",
                        headers={"Authorization": f"Bearer {API_KEY}"})
data = response.json()
print(data["results"])
```
Agent → Execute → Done!
(Không cần MCP Tool)


KHI NÀO DÙNG MCP TOOL VẪN TỐT HƠN:
────────────────────────────────────
• Complex authentication (OAuth flows)
• Need stateful connections
• Performance critical (persistent connections)
• Security requirements (sandboxed environments)
```

## 📌 Khi MCP Tool vẫn cần thiết

```
USE MCP TOOLS KHI:
──────────────────

1. COMPLEX AUTH
   • OAuth with refresh tokens
   • Certificate-based auth
   • Multi-step authentication

2. STATEFUL CONNECTIONS
   • Database connections
   • WebSocket connections
   • Session management

3. SPECIALIZED PROCESSING
   • Binary file handling
   • Image/video processing
   • Complex data transformations

4. SECURITY BOUNDARIES
   • Access to sensitive systems
   • Audit logging requirements
   • Rate limiting per tool

5. PERFORMANCE
   • Connection pooling
   • Caching
   • Batch operations
```

---

# 6. THIẾT KẾ MCP TOOLS ĐÚNG CÁCH

## 📌 Principles

```
┌─────────────────────────────────────────────────────────────┐
│               MCP TOOL DESIGN PRINCIPLES                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   1. PURPOSE-BUILT                                          │
│      ─────────────                                          │
│      Design cho AI agents, không phải humans                │
│      Consider context window limits                         │
│      Optimize for LLM consumption                           │
│                                                             │
│   2. FEWER BUT SMARTER                                      │
│      ─────────────────                                      │
│      Ít tools hơn, nhưng mỗi tool làm nhiều hơn            │
│      Combine related operations                             │
│      Parameterize thay vì tạo nhiều tools                  │
│                                                             │
│   3. FIELD PROJECTION                                       │
│      ────────────────                                       │
│      Cho phép select chỉ fields cần thiết                  │
│      Default to minimal fields                             │
│      Support expand for more details                       │
│                                                             │
│   4. FLEXIBLE FORMATS                                       │
│      ────────────────                                       │
│      Support multiple output formats                        │
│      CSV/TSV cho tabular data                              │
│      Summaries cho complex data                            │
│                                                             │
│   5. INTELLIGENT RESPONSES                                  │
│      ─────────────────────                                  │
│      Include suggestions và next steps                     │
│      Provide context và explanations                       │
│      Help AI make better decisions                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📌 Ví dụ thiết kế tốt

```typescript
// ❌ BAD: Many narrow tools

server.tool("list_users", ...);
server.tool("get_user", ...);
server.tool("search_users", ...);
server.tool("get_user_stats", ...);
server.tool("get_user_recent_activity", ...);


// ✅ GOOD: One flexible tool

server.tool(
  "query_users",
  "Query and analyze users with flexible options",
  {
    // What to do
    action: z.enum(["list", "get", "search", "analyze"])
      .describe("Action to perform"),

    // Filters
    filters: z.object({
      id: z.string().optional(),
      query: z.string().optional(),
      created_after: z.string().optional(),
      status: z.enum(["active", "inactive"]).optional()
    }).optional(),

    // Field selection
    fields: z.array(z.string())
      .default(["id", "name", "email"])
      .describe("Fields to return"),

    // Output format
    format: z.enum(["json", "csv", "summary"])
      .default("summary")
      .describe("Output format"),

    // Pagination
    limit: z.number().max(100).default(10),

    // Include extras
    include: z.object({
      stats: z.boolean().default(false),
      suggestions: z.boolean().default(true)
    }).optional()
  },
  async (args) => {
    // Implementation handles all cases
    const result = await handleUserQuery(args);

    // Format based on preference
    if (args.format === "summary") {
      return {
        content: [{
          type: "text",
          text: `Found ${result.count} users.\n\n` +
                `Summary: ${result.summary}\n\n` +
                `Top users: ${result.top.map(u => u.name).join(", ")}`
        }]
      };
    }

    if (args.format === "csv") {
      return {
        content: [{
          type: "text",
          text: convertToCSV(result.data, args.fields)
        }]
      };
    }

    // JSON format
    return {
      content: [{
        type: "text",
        text: JSON.stringify(result.data, null, 2)
      }]
    };
  }
);
```

## 📌 Checklist thiết kế Tool

```
TRƯỚC KHI BUILD MCP TOOL, HỎI:

□ Tool này có thực sự cần không?
  → AI có thể làm điều này qua code execution không?

□ Có thể combine với tools khác không?
  → Giảm số lượng tools

□ Data trả về có tối ưu chưa?
  → Field projection
  → Format selection
  → Pagination với token awareness

□ Tool có "thông minh" không?
  → Suggestions
  → Summaries
  → Context-aware responses

□ Tool name và description có clear không?
  → AI cần hiểu KHI NÀO dùng tool này
```

---

# 7. KẾT LUẬN

## 📌 Key Takeaways

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   1. APIs ≠ MCP Tools                                       │
│      Don't just wrap APIs, design for AI agents            │
│                                                             │
│   2. Less is More                                           │
│      Fewer, smarter tools > many narrow tools              │
│                                                             │
│   3. Context Window Matters                                 │
│      Optimize for token efficiency                         │
│      Use compact formats (CSV > JSON)                      │
│      Support field projection                              │
│                                                             │
│   4. Design for AI                                          │
│      Summaries and suggestions                             │
│      Intelligent responses                                 │
│      Context-aware behavior                                │
│                                                             │
│   5. Consider Alternatives                                  │
│      Code execution may be simpler                         │
│      MCP Tools for complex/stateful/secure cases          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📌 Khi nào dùng MCP Tools

```
✅ USE MCP TOOLS:
• Complex authentication
• Stateful connections
• Security-sensitive operations
• Performance-critical paths
• Specialized data processing

❌ CONSIDER ALTERNATIVES:
• Simple API calls → Code execution
• One-off queries → Direct HTTP
• Generic CRUD → Let AI write code
```

---

# 📚 TÀI NGUYÊN

## Article gốc

- [APIs Don't Make Good MCP Tools](https://www.reillywood.com/blog/apis-dont-make-good-mcp-tools/) - Reilly Wood

## Related

- [MCP Best Practices](https://modelcontextprotocol.io/docs/best-practices)
- [Tool Design Guidelines](https://modelcontextprotocol.io/docs/design/tools)

---

*Tài liệu phân tích tại sao việc chuyển APIs thành MCP Tools không phải lúc nào cũng là ý tưởng tốt.*
