# 🔌 HƯỚNG DẪN MODEL CONTEXT PROTOCOL (MCP)
## Giao thức kết nối AI với thế giới bên ngoài

---

# 📖 MỤC LỤC

1. [MCP là gì?](#1-mcp-là-gì)
2. [Tại sao cần MCP?](#2-tại-sao-cần-mcp)
3. [Kiến trúc MCP](#3-kiến-trúc-mcp)
4. [3 Thành phần cốt lõi](#4-3-thành-phần-cốt-lõi)
5. [Cách MCP hoạt động](#5-cách-mcp-hoạt-động)
6. [Use Cases thực tế](#6-use-cases-thực-tế)
7. [So sánh với các giải pháp khác](#7-so-sánh-với-các-giải-pháp-khác)
8. [Bắt đầu với MCP](#8-bắt-đầu-với-mcp)
9. [Từ điển Keywords](#9-từ-điển-keywords)

---

# 1. MCP LÀ GÌ?

## 📌 Định nghĩa đơn giản

**MCP = Model Context Protocol = Giao thức Ngữ cảnh cho Model**

Hãy tưởng tượng MCP như **cổng USB-C cho AI** - một chuẩn kết nối thống nhất giúp các ứng dụng AI (Claude, ChatGPT) giao tiếp với mọi hệ thống bên ngoài.

---

## 📌 Ví von để hiểu

```
TRƯỚC KHI CÓ USB-C:
┌─────────────────────────────────────────────────────┐
│  Mỗi thiết bị cần cáp riêng:                        │
│  • iPhone: Lightning                                │
│  • Android: Micro USB                               │
│  • Laptop: Thunderbolt, USB-A                       │
│  • Camera: Mini USB                                 │
│  → Rất phức tạp, không tương thích!                │
└─────────────────────────────────────────────────────┘

SAU KHI CÓ USB-C:
┌─────────────────────────────────────────────────────┐
│  Một chuẩn duy nhất cho mọi thiết bị                │
│  → Đơn giản, thống nhất, plug & play!              │
└─────────────────────────────────────────────────────┘
```

```
TRƯỚC KHI CÓ MCP:
┌─────────────────────────────────────────────────────┐
│  Mỗi AI app cần integration riêng:                  │
│  • Claude + Google Calendar: Custom code            │
│  • ChatGPT + Notion: Plugin riêng                   │
│  • Custom Agent + Database: API wrapper             │
│  → Tốn công, không tái sử dụng được!               │
└─────────────────────────────────────────────────────┘

SAU KHI CÓ MCP:
┌─────────────────────────────────────────────────────┐
│  Một protocol duy nhất                              │
│  • MCP Server cho Google Calendar                   │
│  • Bất kỳ AI app nào cũng kết nối được!            │
│  → Viết 1 lần, dùng mọi nơi!                       │
└─────────────────────────────────────────────────────┘
```

---

## 📌 Đặc điểm chính

| Đặc điểm | Mô tả |
|----------|-------|
| **Open-source** | Mã nguồn mở, ai cũng có thể dùng và đóng góp |
| **Standardized** | Chuẩn hóa, thống nhất cách kết nối |
| **Language-agnostic** | Không phụ thuộc ngôn ngữ lập trình |
| **Bi-directional** | Giao tiếp 2 chiều giữa AI và tools |
| **Secure** | Có cơ chế authentication và authorization |

---

# 2. TẠI SAO CẦN MCP?

## 📌 Vấn đề trước khi có MCP

```
VẤN ĐỀ 1: FRAGMENTATION (Phân mảnh)
──────────────────────────────────────
Mỗi AI app tự build integration riêng:

Claude Desktop ──┬── Custom Google API integration
                 ├── Custom Slack integration
                 └── Custom Database integration

ChatGPT ─────────┬── Plugin cho Google
                 ├── Plugin cho Slack (khác code!)
                 └── Plugin cho Database (khác code!)

→ Lãng phí effort, không tái sử dụng được!


VẤN ĐỀ 2: MAINTENANCE NIGHTMARE
──────────────────────────────────────
• API Google thay đổi → Sửa code ở N chỗ
• Mỗi team phải maintain integration riêng
• Bug fixes không được chia sẻ


VẤN ĐỀ 3: LIMITED CAPABILITIES
──────────────────────────────────────
• AI chỉ "nói chuyện", không "làm" được gì
• Không access được data cá nhân
• Không thể tự động hóa workflow
```

## 📌 MCP giải quyết như thế nào?

```
┌─────────────────────────────────────────────────────────────┐
│                    MỘT MCP SERVER                           │
│                         ↓                                   │
│         ┌──────────────────────────────┐                    │
│         │   Google Calendar MCP Server │                    │
│         │   (Viết 1 lần)               │                    │
│         └──────────────┬───────────────┘                    │
│                        │                                    │
│         ┌──────────────┼──────────────┐                    │
│         ▼              ▼              ▼                    │
│   ┌──────────┐  ┌──────────┐  ┌──────────────┐            │
│   │  Claude  │  │ ChatGPT  │  │ Custom Agent │            │
│   │ Desktop  │  │          │  │              │            │
│   └──────────┘  └──────────┘  └──────────────┘            │
│                                                             │
│   → Tất cả AI apps dùng chung 1 server!                    │
└─────────────────────────────────────────────────────────────┘
```

## 📌 Lợi ích theo vai trò

| Vai trò | Lợi ích |
|---------|---------|
| **Developers** | Giảm thời gian dev, code reusable, ecosystem sẵn có |
| **AI Applications** | Access hàng trăm tools/data sources có sẵn |
| **End Users** | AI mạnh hơn, làm được nhiều việc hơn |
| **Enterprises** | Dễ integrate AI vào hệ thống có sẵn |

---

# 3. KIẾN TRÚC MCP

## 📌 Tổng quan kiến trúc

```
┌─────────────────────────────────────────────────────────────────┐
│                    MCP ARCHITECTURE                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                      HOST                                │   │
│   │   (Claude Desktop, VS Code, Custom App)                  │   │
│   │                                                          │   │
│   │   ┌──────────────────────────────────────────────────┐   │   │
│   │   │                  MCP CLIENT                       │   │   │
│   │   │   • Maintains connections to servers              │   │   │
│   │   │   • Routes requests/responses                     │   │   │
│   │   └──────────────────────────────────────────────────┘   │   │
│   └─────────────────────────┬───────────────────────────────┘   │
│                             │                                   │
│                             │ MCP Protocol                      │
│                             │ (JSON-RPC 2.0)                    │
│                             │                                   │
│   ┌─────────────────────────┴───────────────────────────────┐   │
│   │                                                          │   │
│   │  ┌────────────┐  ┌────────────┐  ┌────────────────────┐ │   │
│   │  │MCP Server 1│  │MCP Server 2│  │   MCP Server 3     │ │   │
│   │  │ (Files)    │  │ (Database) │  │ (Google Calendar)  │ │   │
│   │  └─────┬──────┘  └─────┬──────┘  └─────────┬──────────┘ │   │
│   │        │               │                    │            │   │
│   │        ▼               ▼                    ▼            │   │
│   │   Local Files      PostgreSQL         Google API        │   │
│   │                                                          │   │
│   └──────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 📌 3 Thành phần chính

### 1. HOST (Ứng dụng chủ)

```
HOST = Ứng dụng AI mà user tương tác trực tiếp

Ví dụ:
• Claude Desktop
• VS Code với AI extension
• Cursor IDE
• Custom chatbot application

Vai trò:
• Giao diện với user
• Quản lý các MCP clients
• Quyết định server nào được phép kết nối
```

### 2. CLIENT (Bộ kết nối)

```
CLIENT = Component trong Host để giao tiếp với Server

Đặc điểm:
• 1 Host có thể có nhiều Clients
• 1 Client kết nối với 1 Server
• Maintains stateful connection

Client ──┬── Server 1 (Files)
         ├── Server 2 (Database)
         └── Server 3 (Calendar)
```

### 3. SERVER (Bộ cung cấp)

```
SERVER = Cung cấp Tools, Resources, Prompts cho Client

Đặc điểm:
• Độc lập, chạy riêng biệt
• Có thể local hoặc remote
• Expose capabilities qua MCP protocol

Server Types:
• Local Server: Chạy trên máy user (stdio transport)
• Remote Server: Chạy trên cloud (HTTP/WebSocket transport)
```

## 📌 Transport Types

| Transport | Use Case | Đặc điểm |
|-----------|----------|----------|
| **STDIO** | Local servers | Giao tiếp qua stdin/stdout, đơn giản |
| **HTTP + SSE** | Remote servers | Server-Sent Events cho real-time |
| **WebSocket** | Real-time apps | Full-duplex communication |

---

# 4. 3 THÀNH PHẦN CỐT LÕI

## 📌 Tổng quan

```
MCP Server expose 3 loại capabilities:

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   1. TOOLS        2. RESOURCES        3. PROMPTS           │
│   ────────        ────────────        ─────────            │
│   Actions         Data Access         Templates            │
│   (Làm gì đó)     (Lấy/ghi data)     (Prompt mẫu)         │
│                                                             │
│   Ví dụ:          Ví dụ:              Ví dụ:               │
│   • Search web    • Read file         • Code review        │
│   • Send email    • Query DB          • Summarize doc      │
│   • Create file   • Get calendar      • Translate          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📌 1. TOOLS (Công cụ hành động)

```
TOOLS = Functions mà AI có thể GỌI để THỰC HIỆN hành động

Đặc điểm:
• Được model-controlled (AI quyết định khi nào gọi)
• Có input schema (định nghĩa parameters)
• Trả về kết quả

Ví dụ Tool Definition:
{
  "name": "search_web",
  "description": "Tìm kiếm thông tin trên web",
  "inputSchema": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "Từ khóa tìm kiếm"
      },
      "limit": {
        "type": "number",
        "description": "Số kết quả tối đa"
      }
    },
    "required": ["query"]
  }
}
```

**Use cases phổ biến:**
- Web search
- Send email/message
- Create/edit files
- Execute code
- API calls

## 📌 2. RESOURCES (Tài nguyên dữ liệu)

```
RESOURCES = Data mà AI có thể ĐỌC/GHI

Đặc điểm:
• Được application-controlled (Host quyết định expose gì)
• Có URI để identify
• Có thể là static hoặc dynamic

Ví dụ Resource:
{
  "uri": "file:///home/user/documents/report.pdf",
  "name": "Q4 Report",
  "mimeType": "application/pdf",
  "description": "Báo cáo quý 4 năm 2024"
}
```

**Use cases phổ biến:**
- Local files
- Database records
- Configuration data
- Real-time feeds
- API responses

## 📌 3. PROMPTS (Prompt mẫu)

```
PROMPTS = Các prompt templates có sẵn

Đặc điểm:
• User-controlled (User chọn prompt nào)
• Có thể có arguments
• Chuẩn hóa workflows

Ví dụ Prompt:
{
  "name": "code_review",
  "description": "Review code và đưa ra suggestions",
  "arguments": [
    {
      "name": "code",
      "description": "Code cần review",
      "required": true
    },
    {
      "name": "language",
      "description": "Ngôn ngữ lập trình",
      "required": false
    }
  ]
}
```

**Use cases phổ biến:**
- Code review templates
- Document summarization
- Translation workflows
- Analysis frameworks

## 📌 So sánh 3 thành phần

| Aspect | Tools | Resources | Prompts |
|--------|-------|-----------|---------|
| **Control** | Model-controlled | App-controlled | User-controlled |
| **Purpose** | Execute actions | Access data | Reusable templates |
| **Trigger** | AI tự quyết định | Host expose | User chọn |
| **Example** | `search_web()` | `file://doc.pdf` | "Review code này" |

---

# 5. CÁCH MCP HOẠT ĐỘNG

## 📌 Flow cơ bản

```
┌─────────────────────────────────────────────────────────────────┐
│                    MCP COMMUNICATION FLOW                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   USER                HOST                 MCP SERVER           │
│    │                   │                       │                │
│    │  "Check calendar" │                       │                │
│    │──────────────────▶│                       │                │
│    │                   │                       │                │
│    │                   │  1. List Tools        │                │
│    │                   │──────────────────────▶│                │
│    │                   │                       │                │
│    │                   │  2. Tools List        │                │
│    │                   │◀──────────────────────│                │
│    │                   │  [get_events,         │                │
│    │                   │   create_event, ...]  │                │
│    │                   │                       │                │
│    │                   │                       │                │
│    │                   │  3. Call Tool         │                │
│    │                   │  get_events({         │                │
│    │                   │    date: "today"      │                │
│    │                   │  })                   │                │
│    │                   │──────────────────────▶│                │
│    │                   │                       │                │
│    │                   │  4. Tool Result       │                │
│    │                   │◀──────────────────────│                │
│    │                   │  [{meeting: 9am},     │                │
│    │                   │   {lunch: 12pm}]      │                │
│    │                   │                       │                │
│    │  "Bạn có 2        │                       │                │
│    │   events hôm nay" │                       │                │
│    │◀──────────────────│                       │                │
│    │                   │                       │                │
└─────────────────────────────────────────────────────────────────┘
```

## 📌 Lifecycle chi tiết

```
1. INITIALIZATION (Khởi tạo)
───────────────────────────────
Host ──▶ Khởi động MCP Server
Host ◀── Server sẵn sàng
Host ──▶ Initialize handshake
Host ◀── Capabilities (tools, resources, prompts)


2. DISCOVERY (Khám phá)
───────────────────────────────
Host ──▶ tools/list
Host ◀── Available tools với schemas

Host ──▶ resources/list
Host ◀── Available resources

Host ──▶ prompts/list
Host ◀── Available prompts


3. OPERATION (Vận hành)
───────────────────────────────
User asks question
    ↓
AI analyzes và decides to use tool
    ↓
Host ──▶ tools/call (tool_name, arguments)
Host ◀── Tool result
    ↓
AI incorporates result vào response
    ↓
User receives answer


4. SHUTDOWN (Kết thúc)
───────────────────────────────
Host ──▶ Disconnect
Server ──▶ Cleanup resources
```

---

# 6. USE CASES THỰC TẾ

## 📌 Use Case 1: Personal AI Assistant

```
SCENARIO: AI truy cập data cá nhân

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   User: "Tôi có meeting nào ngày mai không?                │
│          Và remind tôi mua quà sinh nhật cho vợ"           │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                  Claude Desktop                      │   │
│   │                       │                              │   │
│   │     ┌─────────────────┼─────────────────┐           │   │
│   │     ▼                 ▼                 ▼           │   │
│   │ ┌─────────┐    ┌───────────┐    ┌────────────┐     │   │
│   │ │Calendar │    │  Notion   │    │  Reminders │     │   │
│   │ │MCP Server│   │MCP Server │    │ MCP Server │     │   │
│   │ └────┬────┘    └─────┬─────┘    └──────┬─────┘     │   │
│   │      │               │                  │           │   │
│   │      ▼               ▼                  ▼           │   │
│   │ Google Calendar  Notion DB         Apple Reminders │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│   AI Response:                                              │
│   "Ngày mai bạn có 2 meetings:                             │
│    - 9:00 AM: Team standup                                 │
│    - 2:00 PM: Client presentation                          │
│                                                             │
│    Tôi đã tạo reminder mua quà sinh nhật cho vợ            │
│    vào 6:00 PM hôm nay."                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📌 Use Case 2: Design-to-Code

```
SCENARIO: Chuyển Figma design thành code

User: "Tạo web app từ file Figma này"

Flow:
1. Figma MCP Server → Extract design components
2. AI analyzes design → Generate React code
3. Filesystem MCP Server → Write code files
4. Git MCP Server → Create branch và commit

Result: Complete web app trong vài phút!
```

## 📌 Use Case 3: Enterprise Data Analysis

```
SCENARIO: Phân tích dữ liệu doanh nghiệp

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   User: "So sánh doanh thu Q3 và Q4,                       │
│          highlight sản phẩm tăng trưởng tốt nhất"          │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │              Enterprise AI Assistant                 │   │
│   │                       │                              │   │
│   │     ┌─────────────────┼─────────────────┐           │   │
│   │     ▼                 ▼                 ▼           │   │
│   │ ┌─────────┐    ┌───────────┐    ┌────────────┐     │   │
│   │ │Postgres │    │Salesforce │    │   Slack    │     │   │
│   │ │MCP Server│   │MCP Server │    │ MCP Server │     │   │
│   │ └────┬────┘    └─────┬─────┘    └──────┬─────┘     │   │
│   │      │               │                  │           │   │
│   │      ▼               ▼                  ▼           │   │
│   │  Sales DB        CRM Data          Post Report     │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📌 Use Case 4: 3D Design & Manufacturing

```
SCENARIO: Tạo và in 3D model

User: "Thiết kế phone stand và gửi đến máy in 3D"

Flow:
1. AI generates design specifications
2. Blender MCP Server → Create 3D model
3. Slicer MCP Server → Prepare for printing
4. Printer MCP Server → Send to 3D printer

Result: Physical product từ text description!
```

---

# 7. SO SÁNH VỚI CÁC GIẢI PHÁP KHÁC

## 📌 MCP vs Traditional API Integration

| Aspect | Traditional API | MCP |
|--------|-----------------|-----|
| **Setup** | Custom code cho mỗi API | Standardized protocol |
| **Reusability** | Không, viết lại cho mỗi app | Có, 1 server cho mọi apps |
| **Discovery** | Manual documentation | Auto-discovery tools |
| **AI-native** | Phải wrap manually | Built for AI |

## 📌 MCP vs OpenAI Plugins/GPTs

| Aspect | OpenAI Plugins | MCP |
|--------|----------------|-----|
| **Platform** | Chỉ ChatGPT | Mọi AI apps |
| **Open source** | Không | Có |
| **Local support** | Không | Có (STDIO) |
| **Flexibility** | Limited | High |

## 📌 MCP vs LangChain Tools

| Aspect | LangChain | MCP |
|--------|-----------|-----|
| **Scope** | Python library | Protocol/Standard |
| **Language** | Python-first | Language agnostic |
| **Standalone** | Không | Có |
| **Interoperability** | Within LangChain | Cross-platform |

---

# 8. BẮT ĐẦU VỚI MCP

## 📌 3 Con đường chính

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   PATH 1: SỬ DỤNG MCP SERVERS CÓ SẴN                       │
│   ─────────────────────────────────────                     │
│   • Cài đặt Claude Desktop                                 │
│   • Kết nối với existing servers                           │
│   • Bắt đầu sử dụng ngay!                                  │
│                                                             │
│   → Phù hợp: End users, quick start                        │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   PATH 2: XÂY DỰNG MCP SERVER                              │
│   ─────────────────────────────────                         │
│   • Cài đặt SDK (TypeScript hoặc Python)                   │
│   • Define tools, resources, prompts                       │
│   • Deploy và test                                         │
│                                                             │
│   → Phù hợp: Developers muốn expose data/tools             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   PATH 3: XÂY DỰNG MCP CLIENT                              │
│   ─────────────────────────────────                         │
│   • Cài đặt client SDK                                     │
│   • Connect to MCP servers                                 │
│   • Integrate vào AI application                           │
│                                                             │
│   → Phù hợp: Developers xây dựng AI apps                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📌 Quick Start: Dùng Claude Desktop

```bash
# 1. Download Claude Desktop
# https://claude.ai/download

# 2. Mở config file
# macOS: ~/Library/Application Support/Claude/claude_desktop_config.json
# Windows: %APPDATA%\Claude\claude_desktop_config.json

# 3. Thêm MCP server config
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/folder"]
    }
  }
}

# 4. Restart Claude Desktop
# 5. Bắt đầu dùng: "Đọc file X trong folder Y"
```

## 📌 Quick Start: Build MCP Server

```typescript
// 1. Install SDK
// npm install @modelcontextprotocol/server

// 2. Create server
import { McpServer } from "@modelcontextprotocol/server";

const server = new McpServer({
  name: "my-server",
  version: "1.0.0"
});

// 3. Define a tool
server.tool(
  "greet",
  "Say hello to someone",
  {
    name: { type: "string", description: "Name to greet" }
  },
  async ({ name }) => {
    return { text: `Hello, ${name}!` };
  }
);

// 4. Start server
server.start();
```

---

# 9. TỪ ĐIỂN KEYWORDS

## A-H

| Keyword | Nghĩa | Giải thích |
|---------|-------|------------|
| **Client** | Bộ kết nối | Component trong Host để giao tiếp với Server |
| **Capabilities** | Khả năng | Tools, Resources, Prompts mà server cung cấp |
| **Discovery** | Khám phá | Quá trình client tìm hiểu server có gì |
| **Host** | Ứng dụng chủ | AI app mà user tương tác (Claude Desktop) |

## I-P

| Keyword | Nghĩa | Giải thích |
|---------|-------|------------|
| **JSON-RPC** | - | Protocol format cho MCP messages |
| **MCP** | Model Context Protocol | Giao thức kết nối AI với external systems |
| **Prompts** | Prompt mẫu | Templates có sẵn cho workflows |
| **Protocol** | Giao thức | Chuẩn giao tiếp giữa các components |

## R-Z

| Keyword | Nghĩa | Giải thích |
|---------|-------|------------|
| **Resources** | Tài nguyên | Data mà AI có thể access |
| **Server** | Máy chủ | Component cung cấp capabilities |
| **STDIO** | Standard I/O | Transport cho local servers |
| **Tools** | Công cụ | Functions mà AI có thể gọi |
| **Transport** | Vận chuyển | Cách giao tiếp (STDIO, HTTP, WebSocket) |

---

# 📚 TÀI NGUYÊN THAM KHẢO

## Official

- [MCP Documentation](https://modelcontextprotocol.io)
- [MCP Specification](https://spec.modelcontextprotocol.io)
- [MCP GitHub](https://github.com/modelcontextprotocol)

## SDKs

- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Python SDK](https://github.com/modelcontextprotocol/python-sdk)

## Servers

- [Official Servers](https://github.com/modelcontextprotocol/servers)
- [MCP Registry](https://registry.modelcontextprotocol.io)

---

*Tài liệu giới thiệu Model Context Protocol (MCP) - Giao thức kết nối AI với thế giới bên ngoài.*
