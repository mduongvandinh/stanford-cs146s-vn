# 🗂️ HƯỚNG DẪN CÁC MCP SERVER IMPLEMENTATIONS
## Tổng hợp từ GitHub modelcontextprotocol/servers

---

# 📖 MỤC LỤC

1. [Tổng quan về MCP Servers](#1-tổng-quan-về-mcp-servers)
2. [Reference Servers (Official)](#2-reference-servers-official)
3. [Data & Knowledge Servers](#3-data--knowledge-servers)
4. [Developer Tools Servers](#4-developer-tools-servers)
5. [Productivity Servers](#5-productivity-servers)
6. [Communication Servers](#6-communication-servers)
7. [Cách cài đặt và sử dụng](#7-cách-cài-đặt-và-sử-dụng)
8. [Tự build MCP Server](#8-tự-build-mcp-server)

---

# 1. TỔNG QUAN VỀ MCP SERVERS

## 📌 MCP Server là gì?

**MCP Server = Chương trình cung cấp Tools, Resources, Prompts cho AI apps**

```
┌─────────────────────────────────────────────────────────────┐
│                     MCP SERVER ECOSYSTEM                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │              AI Application (Client)                 │   │
│   │                  (Claude Desktop)                    │   │
│   └────────────────────────┬────────────────────────────┘   │
│                            │                                │
│            ┌───────────────┼───────────────┐                │
│            ▼               ▼               ▼                │
│     ┌────────────┐  ┌────────────┐  ┌────────────┐         │
│     │ Filesystem │  │  Database  │  │   GitHub   │         │
│     │   Server   │  │   Server   │  │   Server   │         │
│     └─────┬──────┘  └─────┬──────┘  └─────┬──────┘         │
│           │               │               │                 │
│           ▼               ▼               ▼                 │
│      Local Files      PostgreSQL     GitHub API            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📌 Phân loại MCP Servers

| Category | Mô tả | Ví dụ |
|----------|-------|-------|
| **Reference** | Servers mẫu từ Anthropic | Everything, Fetch, Filesystem |
| **Data** | Truy cập databases, files | PostgreSQL, SQLite, S3 |
| **Dev Tools** | Công cụ phát triển | Git, GitHub, Docker |
| **Productivity** | Ứng dụng văn phòng | Google Drive, Notion, Slack |
| **Communication** | Giao tiếp | Email, Discord, Telegram |

## 📌 Nơi tìm MCP Servers

```
1. OFFICIAL REPOSITORY
   https://github.com/modelcontextprotocol/servers
   → Servers chính thức từ Anthropic

2. MCP REGISTRY
   https://registry.modelcontextprotocol.io
   → Community servers, dễ browse

3. GITHUB SEARCH
   topic:mcp-server
   → Tìm servers từ cộng đồng

4. NPM
   @modelcontextprotocol/*
   → Packages có thể cài qua npm
```

---

# 2. REFERENCE SERVERS (OFFICIAL)

## 📌 Tổng quan Reference Servers

```
Reference Servers = Servers mẫu từ Anthropic team
                   → Demo đầy đủ capabilities của MCP
                   → Code sạch, document tốt
                   → Cơ sở để học và extend
```

## 📌 1. Everything Server

```
┌─────────────────────────────────────────────────────────────┐
│  EVERYTHING SERVER                                          │
│  ─────────────────                                          │
│                                                             │
│  Mục đích: Reference/test server với MỌI features          │
│                                                             │
│  Features:                                                  │
│  ✅ Tools (functions có thể gọi)                            │
│  ✅ Resources (data có thể đọc)                             │
│  ✅ Prompts (templates có sẵn)                              │
│  ✅ Sampling (LLM integration)                              │
│                                                             │
│  Use case:                                                  │
│  • Testing MCP client implementations                       │
│  • Learning MCP features                                    │
│  • Debugging connection issues                              │
│                                                             │
│  Install:                                                   │
│  npx @modelcontextprotocol/server-everything                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📌 2. Filesystem Server

```
┌─────────────────────────────────────────────────────────────┐
│  FILESYSTEM SERVER                                          │
│  ────────────────                                           │
│                                                             │
│  Mục đích: Secure file operations với access controls       │
│                                                             │
│  Tools:                                                     │
│  • read_file     - Đọc nội dung file                       │
│  • write_file    - Ghi file mới                            │
│  • edit_file     - Sửa file có sẵn                         │
│  • list_directory - Liệt kê thư mục                        │
│  • create_directory - Tạo folder                           │
│  • move_file     - Di chuyển file                          │
│  • search_files  - Tìm kiếm files                          │
│  • get_file_info - Thông tin file                          │
│                                                             │
│  Security:                                                  │
│  ⚠️ CHỈ access folders được allow explicitly               │
│  ⚠️ Không thể escape ra ngoài allowed paths                │
│                                                             │
│  Install:                                                   │
│  npx @modelcontextprotocol/server-filesystem /path/to/allow │
│                                                             │
│  Config example:                                            │
│  {                                                          │
│    "mcpServers": {                                          │
│      "filesystem": {                                        │
│        "command": "npx",                                    │
│        "args": [                                            │
│          "-y",                                              │
│          "@modelcontextprotocol/server-filesystem",         │
│          "/Users/me/Documents",                             │
│          "/Users/me/Projects"                               │
│        ]                                                    │
│      }                                                      │
│    }                                                        │
│  }                                                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📌 3. Git Server

```
┌─────────────────────────────────────────────────────────────┐
│  GIT SERVER                                                 │
│  ──────────                                                 │
│                                                             │
│  Mục đích: Read, search, và manipulate Git repositories     │
│                                                             │
│  Tools:                                                     │
│  • git_status      - Xem trạng thái repo                   │
│  • git_log         - Xem commit history                    │
│  • git_diff        - Xem changes                           │
│  • git_show        - Xem commit cụ thể                     │
│  • git_branch      - Quản lý branches                      │
│  • git_checkout    - Switch branches                       │
│  • git_commit      - Tạo commit                            │
│  • git_add         - Stage files                           │
│  • git_reset       - Unstage files                         │
│  • git_stash       - Stash changes                         │
│                                                             │
│  Use cases:                                                 │
│  • AI-assisted code review                                  │
│  • Automated commit messages                                │
│  • Repository analysis                                      │
│                                                             │
│  Install:                                                   │
│  npx @modelcontextprotocol/server-git                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📌 4. Fetch Server

```
┌─────────────────────────────────────────────────────────────┐
│  FETCH SERVER                                               │
│  ────────────                                               │
│                                                             │
│  Mục đích: Web content fetching và conversion cho LLM       │
│                                                             │
│  Tools:                                                     │
│  • fetch_url       - Lấy nội dung từ URL                   │
│  • fetch_html      - Lấy raw HTML                          │
│  • fetch_markdown  - Convert HTML → Markdown               │
│  • fetch_text      - Extract plain text                    │
│                                                             │
│  Features:                                                  │
│  ✅ Auto-convert HTML to Markdown                          │
│  ✅ Remove scripts, styles, ads                            │
│  ✅ Extract main content                                   │
│  ✅ Handle different encodings                             │
│                                                             │
│  Use cases:                                                 │
│  • Research assistant                                       │
│  • Content summarization                                    │
│  • Web scraping for AI                                      │
│                                                             │
│  Install:                                                   │
│  npx @modelcontextprotocol/server-fetch                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📌 5. Memory Server

```
┌─────────────────────────────────────────────────────────────┐
│  MEMORY SERVER                                              │
│  ─────────────                                              │
│                                                             │
│  Mục đích: Knowledge graph-based persistent memory          │
│                                                             │
│  Concept:                                                   │
│  Lưu trữ thông tin dưới dạng ENTITIES và RELATIONS         │
│                                                             │
│  ┌──────────┐    works_at    ┌──────────┐                  │
│  │   John   │───────────────▶│  Google  │                  │
│  │ (Person) │                │(Company) │                  │
│  └──────────┘                └──────────┘                  │
│       │                                                     │
│       │ knows                                               │
│       ▼                                                     │
│  ┌──────────┐                                               │
│  │   Jane   │                                               │
│  │ (Person) │                                               │
│  └──────────┘                                               │
│                                                             │
│  Tools:                                                     │
│  • create_entity   - Tạo entity mới                        │
│  • create_relation - Tạo relation giữa entities            │
│  • search_entities - Tìm kiếm                              │
│  • delete_entity   - Xóa entity                            │
│  • get_graph       - Lấy toàn bộ graph                     │
│                                                             │
│  Use cases:                                                 │
│  • Personal knowledge base                                  │
│  • AI with long-term memory                                 │
│  • Relationship mapping                                     │
│                                                             │
│  Install:                                                   │
│  npx @modelcontextprotocol/server-memory                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📌 6. Sequential Thinking Server

```
┌─────────────────────────────────────────────────────────────┐
│  SEQUENTIAL THINKING SERVER                                 │
│  ──────────────────────────                                 │
│                                                             │
│  Mục đích: Dynamic, reflective problem-solving              │
│                                                             │
│  Concept:                                                   │
│  Giúp AI suy nghĩ TỪNG BƯỚC với khả năng:                  │
│  • Revise previous thoughts                                 │
│  • Branch into alternatives                                 │
│  • Adjust total steps dynamically                           │
│                                                             │
│  Tools:                                                     │
│  • think_step      - Tạo một bước suy nghĩ                 │
│  • revise_thought  - Sửa thought trước đó                  │
│  • branch_thought  - Tạo nhánh alternative                 │
│  • conclude        - Kết luận                              │
│                                                             │
│  Use cases:                                                 │
│  • Complex problem solving                                  │
│  • Multi-step reasoning                                     │
│  • Decision making with alternatives                        │
│                                                             │
│  Install:                                                   │
│  npx @modelcontextprotocol/server-sequential-thinking       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📌 7. Time Server

```
┌─────────────────────────────────────────────────────────────┐
│  TIME SERVER                                                │
│  ───────────                                                │
│                                                             │
│  Mục đích: Time và timezone conversion                      │
│                                                             │
│  Tools:                                                     │
│  • get_current_time     - Lấy thời gian hiện tại           │
│  • convert_timezone     - Convert múi giờ                  │
│  • calculate_duration   - Tính khoảng thời gian            │
│  • add_time             - Cộng thời gian                   │
│  • format_time          - Format thời gian                 │
│                                                             │
│  Use cases:                                                 │
│  • Scheduling across timezones                              │
│  • Date calculations                                        │
│  • Time-aware AI responses                                  │
│                                                             │
│  Install:                                                   │
│  npx @modelcontextprotocol/server-time                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

# 3. DATA & KNOWLEDGE SERVERS

## 📌 Database Servers

### PostgreSQL Server

```
Tools:
• query           - Execute SQL query
• list_tables     - Liệt kê tables
• describe_table  - Schema của table
• insert/update/delete - Data manipulation

Config:
{
  "postgresql": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-postgres"],
    "env": {
      "DATABASE_URL": "postgresql://user:pass@localhost/db"
    }
  }
}
```

### SQLite Server

```
Tools:
• read_query      - SELECT queries
• write_query     - INSERT/UPDATE/DELETE
• create_table    - DDL operations
• list_tables     - Schema info

Use case: Local databases, prototyping
```

### MongoDB Server

```
Tools:
• find            - Query documents
• insert          - Insert documents
• update          - Update documents
• aggregate       - Aggregation pipelines
```

## 📌 Cloud Storage Servers

### AWS S3 Server

```
Tools:
• list_buckets    - Liệt kê buckets
• list_objects    - Liệt kê files trong bucket
• get_object      - Download file
• put_object      - Upload file
• delete_object   - Xóa file
```

### Google Drive Server

```
Tools:
• list_files      - Liệt kê files
• read_file       - Đọc nội dung
• create_file     - Tạo file mới
• update_file     - Update file
• share_file      - Chia sẻ file
```

---

# 4. DEVELOPER TOOLS SERVERS

## 📌 GitHub Server

```
┌─────────────────────────────────────────────────────────────┐
│  GITHUB SERVER                                              │
│  ─────────────                                              │
│                                                             │
│  Tools:                                                     │
│  • search_repositories  - Tìm repos                        │
│  • get_repository       - Info về repo                     │
│  • list_issues          - Liệt kê issues                   │
│  • create_issue         - Tạo issue mới                    │
│  • get_pull_requests    - Liệt kê PRs                      │
│  • create_pull_request  - Tạo PR                           │
│  • get_file_contents    - Đọc file trong repo              │
│  • push_files           - Push changes                     │
│  • fork_repository      - Fork repo                        │
│                                                             │
│  Config với Personal Access Token:                          │
│  {                                                          │
│    "github": {                                              │
│      "command": "npx",                                      │
│      "args": ["-y", "@modelcontextprotocol/server-github"], │
│      "env": {                                               │
│        "GITHUB_TOKEN": "ghp_xxxxxxxxxxxx"                   │
│      }                                                      │
│    }                                                        │
│  }                                                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📌 Docker Server

```
Tools:
• list_containers  - Liệt kê containers
• start_container  - Start container
• stop_container   - Stop container
• container_logs   - Xem logs
• exec_command     - Run command trong container
• list_images      - Liệt kê images
• pull_image       - Pull image
```

## 📌 Kubernetes Server

```
Tools:
• list_pods        - Liệt kê pods
• get_pod_logs     - Xem pod logs
• describe_pod     - Chi tiết pod
• list_deployments - Liệt kê deployments
• scale_deployment - Scale replicas
• apply_manifest   - Apply YAML
```

---

# 5. PRODUCTIVITY SERVERS

## 📌 Notion Server

```
Tools:
• search_pages     - Tìm pages
• read_page        - Đọc nội dung page
• create_page      - Tạo page mới
• update_page      - Update page
• query_database   - Query Notion database
• create_database_item - Thêm item vào database
```

## 📌 Google Calendar Server

```
Tools:
• list_events      - Liệt kê events
• create_event     - Tạo event mới
• update_event     - Sửa event
• delete_event     - Xóa event
• find_free_time   - Tìm slot trống
```

## 📌 Todoist Server

```
Tools:
• list_tasks       - Liệt kê tasks
• create_task      - Tạo task mới
• complete_task    - Hoàn thành task
• update_task      - Sửa task
• list_projects    - Liệt kê projects
```

---

# 6. COMMUNICATION SERVERS

## 📌 Slack Server

```
Tools:
• send_message     - Gửi message
• list_channels    - Liệt kê channels
• read_messages    - Đọc messages
• search_messages  - Tìm kiếm
• create_channel   - Tạo channel
• add_reaction     - Thêm emoji reaction
```

## 📌 Discord Server

```
Tools:
• send_message     - Gửi message
• list_channels    - Liệt kê channels
• read_messages    - Đọc messages
• list_members     - Liệt kê members
• create_thread    - Tạo thread
```

## 📌 Email Server (Gmail/SMTP)

```
Tools:
• send_email       - Gửi email
• read_inbox       - Đọc inbox
• search_emails    - Tìm kiếm emails
• get_email        - Đọc email cụ thể
• reply_email      - Reply email
• create_draft     - Tạo draft
```

---

# 7. CÁCH CÀI ĐẶT VÀ SỬ DỤNG

## 📌 Bước 1: Cài đặt Claude Desktop

```bash
# Download từ:
# https://claude.ai/download

# Hoặc với Homebrew (macOS):
brew install --cask claude
```

## 📌 Bước 2: Tìm config file

```bash
# macOS:
~/Library/Application Support/Claude/claude_desktop_config.json

# Windows:
%APPDATA%\Claude\claude_desktop_config.json

# Linux:
~/.config/Claude/claude_desktop_config.json
```

## 📌 Bước 3: Thêm MCP servers

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/me/Documents"
      ]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_your_token_here"
      }
    },
    "fetch": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"]
    }
  }
}
```

## 📌 Bước 4: Restart Claude Desktop

```
1. Quit Claude Desktop hoàn toàn
2. Mở lại Claude Desktop
3. Kiểm tra MCP servers đã connect:
   - Click icon MCP (🔌) ở góc dưới
   - Xem list của connected servers
```

## 📌 Bước 5: Sử dụng

```
Ví dụ prompts:

"Đọc file README.md trong folder Documents"
→ Filesystem server xử lý

"Tìm repos về MCP trên GitHub"
→ GitHub server xử lý

"Lấy nội dung từ trang web này: https://example.com"
→ Fetch server xử lý
```

---

# 8. TỰ BUILD MCP SERVER

## 📌 Template cơ bản (TypeScript)

```typescript
import { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";

// 1. Tạo server instance
const server = new McpServer({
  name: "my-custom-server",
  version: "1.0.0",
  description: "My custom MCP server"
});

// 2. Define một tool
server.tool(
  "hello",                              // Tool name
  "Say hello to someone",               // Description
  {                                     // Input schema
    name: z.string().describe("Name to greet")
  },
  async ({ name }) => {                 // Handler
    return {
      content: [
        { type: "text", text: `Hello, ${name}!` }
      ]
    };
  }
);

// 3. Define một resource
server.resource(
  "config",                             // Resource name
  "config://app",                       // URI
  "Application configuration",          // Description
  async () => {
    return {
      contents: [
        {
          uri: "config://app",
          mimeType: "application/json",
          text: JSON.stringify({ version: "1.0" })
        }
      ]
    };
  }
);

// 4. Start server
server.start({
  transport: "stdio"                    // hoặc "http"
});
```

## 📌 Cấu trúc project

```
my-mcp-server/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts         # Entry point
│   ├── tools/           # Tool definitions
│   │   ├── search.ts
│   │   └── create.ts
│   ├── resources/       # Resource definitions
│   │   └── config.ts
│   └── prompts/         # Prompt templates
│       └── templates.ts
└── README.md
```

## 📌 Package.json mẫu

```json
{
  "name": "my-mcp-server",
  "version": "1.0.0",
  "type": "module",
  "bin": {
    "my-mcp-server": "./dist/index.js"
  },
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "@modelcontextprotocol/server": "^1.0.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

---

# 📚 TÀI NGUYÊN

## Official

- [MCP Servers Repository](https://github.com/modelcontextprotocol/servers)
- [MCP Registry](https://registry.modelcontextprotocol.io)
- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)

## Community

- [Awesome MCP Servers](https://github.com/wong2/awesome-mcp-servers)
- [MCP Discord](https://discord.gg/mcp)

---

*Tài liệu tổng hợp các MCP Server implementations phổ biến.*
