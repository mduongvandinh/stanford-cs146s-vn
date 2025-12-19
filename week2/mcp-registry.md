# 📋 HƯỚNG DẪN MCP REGISTRY
## Khám phá và đăng ký MCP Servers

---

# 📖 MỤC LỤC

1. [MCP Registry là gì?](#1-mcp-registry-là-gì)
2. [Cách sử dụng Registry](#2-cách-sử-dụng-registry)
3. [Đăng ký Server của bạn](#3-đăng-ký-server-của-bạn)
4. [Tích hợp cho Client Developers](#4-tích-hợp-cho-client-developers)
5. [Sub-Registries](#5-sub-registries)
6. [Moderation và Guidelines](#6-moderation-và-guidelines)

---

# 1. MCP REGISTRY LÀ GÌ?

## 📌 Định nghĩa

**MCP Registry = Catalog mở và API cho các MCP servers công khai**

```
Website: registry.modelcontextprotocol.io

┌─────────────────────────────────────────────────────────────┐
│                    MCP REGISTRY                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   "Một nơi duy nhất để tìm và chia sẻ MCP servers"         │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                                                     │   │
│   │   🔍 DISCOVER        📝 REGISTER       🔗 CONNECT   │   │
│   │   Tìm servers       Đăng ký          Kết nối       │   │
│   │   có sẵn            server mới       dễ dàng       │   │
│   │                                                     │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📌 Tại sao cần Registry?

```
VẤN ĐỀ TRƯỚC KHI CÓ REGISTRY:
──────────────────────────────
• MCP servers phân tán ở nhiều nơi (GitHub, NPM, ...)
• Khó tìm server phù hợp
• Không có cách verify chất lượng
• Mỗi client phải tự maintain list servers

GIẢI PHÁP VỚI REGISTRY:
──────────────────────────────
✅ Một nguồn tin cậy duy nhất
✅ Dễ dàng tìm kiếm và lọc
✅ Community ratings và reviews
✅ API cho clients tự động discover
✅ Moderation để đảm bảo chất lượng
```

## 📌 Đặc điểm chính

| Đặc điểm | Mô tả |
|----------|-------|
| **Open Source** | Mã nguồn mở, ai cũng có thể đóng góp |
| **Centralized** | Một nguồn chính thức |
| **API Access** | Programmatic access cho clients |
| **Searchable** | Tìm kiếm theo tên, category, functionality |
| **Community-driven** | Đánh giá và đóng góp từ cộng đồng |

---

# 2. CÁCH SỬ DỤNG REGISTRY

## 📌 Browse trên Website

```
1. Truy cập: registry.modelcontextprotocol.io

2. Browse theo categories:
   ┌──────────────┬─────────────────────────────┐
   │ Category     │ Ví dụ servers              │
   ├──────────────┼─────────────────────────────┤
   │ Data         │ PostgreSQL, MongoDB, S3    │
   │ Dev Tools    │ GitHub, Git, Docker        │
   │ Productivity │ Notion, Slack, Calendar    │
   │ AI/ML        │ Memory, Sequential Thinking│
   │ Utilities    │ Fetch, Time, Filesystem    │
   └──────────────┴─────────────────────────────┘

3. Click vào server để xem chi tiết:
   • Description
   • Installation instructions
   • Tools/Resources/Prompts available
   • Author information
   • GitHub repository link
```

## 📌 Search và Filter

```
SEARCH EXAMPLES:

"github"          → Servers liên quan đến GitHub
"database"        → Database servers (Postgres, MongoDB, ...)
"file"            → File system related servers
"ai"              → AI/ML related servers

FILTERS:

• Category        → Data, Dev Tools, Productivity, ...
• Transport       → STDIO, HTTP, SSE
• Language        → TypeScript, Python, Go, ...
• License         → MIT, Apache, GPL, ...
• Verified        → Chỉ servers đã verified
```

## 📌 API Access

```typescript
// Fetch servers từ Registry API

// List all servers
const response = await fetch(
  "https://registry.modelcontextprotocol.io/api/servers"
);
const servers = await response.json();

// Search servers
const searchResponse = await fetch(
  "https://registry.modelcontextprotocol.io/api/servers?q=github"
);
const results = await searchResponse.json();

// Get server details
const serverResponse = await fetch(
  "https://registry.modelcontextprotocol.io/api/servers/github-mcp"
);
const serverDetails = await serverResponse.json();

// Response format
{
  "id": "github-mcp",
  "name": "GitHub MCP Server",
  "description": "Access GitHub repositories, issues, and PRs",
  "version": "1.0.0",
  "author": "anthropic",
  "repository": "https://github.com/modelcontextprotocol/servers",
  "package": "@modelcontextprotocol/server-github",
  "transport": ["stdio"],
  "tools": ["search_repos", "get_issues", "create_pr"],
  "resources": [],
  "prompts": [],
  "category": "dev-tools",
  "downloads": 15000,
  "rating": 4.8
}
```

---

# 3. ĐĂNG KÝ SERVER CỦA BẠN

## 📌 Yêu cầu trước khi đăng ký

```
CHECKLIST:

✅ Server hoạt động và đã test
✅ Documentation đầy đủ (README)
✅ Public repository (GitHub, GitLab, ...)
✅ License rõ ràng (MIT, Apache, ...)
✅ Tuân thủ MCP specification
✅ Không vi phạm moderation guidelines
```

## 📌 Bước đăng ký

```
STEP 1: Chuẩn bị metadata
───────────────────────────

Tạo file mcp-registry.json trong repo:

{
  "name": "my-awesome-server",
  "description": "Short description of what your server does",
  "version": "1.0.0",
  "author": {
    "name": "Your Name",
    "email": "you@example.com",
    "url": "https://yourwebsite.com"
  },
  "repository": "https://github.com/you/my-awesome-server",
  "package": "@yourorg/my-awesome-server",
  "homepage": "https://my-awesome-server.docs.com",
  "transport": ["stdio", "http"],
  "category": "dev-tools",
  "tags": ["git", "code", "automation"],
  "tools": [
    {
      "name": "do_something",
      "description": "Does something useful"
    }
  ],
  "resources": [],
  "prompts": [],
  "requirements": {
    "node": ">=18.0.0"
  },
  "env": [
    {
      "name": "API_KEY",
      "description": "API key for external service",
      "required": true
    }
  ]
}


STEP 2: Submit to Registry
───────────────────────────

Option A - GitHub PR:
1. Fork github.com/modelcontextprotocol/registry
2. Add entry trong servers/ directory
3. Submit Pull Request
4. Wait for review và approval

Option B - Web Form:
1. Go to registry.modelcontextprotocol.io/submit
2. Fill out form với server info
3. Link đến GitHub repo
4. Submit và wait for review


STEP 3: Verification
───────────────────────────

Registry team sẽ:
• Check server functionality
• Review code for security
• Verify documentation
• Test installation process

Timeline: Usually 1-5 business days
```

## 📌 Best Practices cho Server Registration

```
DOCUMENTATION:
✅ Clear README với getting started
✅ API documentation cho mọi tools
✅ Examples và use cases
✅ Troubleshooting section

CODE QUALITY:
✅ Clean, readable code
✅ Error handling
✅ Input validation
✅ Security considerations

MAINTENANCE:
✅ Respond to issues promptly
✅ Regular updates
✅ Semantic versioning
✅ Changelog
```

---

# 4. TÍCH HỢP CHO CLIENT DEVELOPERS

## 📌 Auto-discovery từ Registry

```typescript
// MCP Client với Registry integration

import { McpClient } from "@modelcontextprotocol/client";

class RegistryEnabledClient {
  private registryUrl = "https://registry.modelcontextprotocol.io/api";

  // Discover servers từ registry
  async discoverServers(query?: string): Promise<Server[]> {
    const url = query
      ? `${this.registryUrl}/servers?q=${encodeURIComponent(query)}`
      : `${this.registryUrl}/servers`;

    const response = await fetch(url);
    return response.json();
  }

  // Get installation instructions
  async getInstallInstructions(serverId: string): Promise<InstallInfo> {
    const response = await fetch(
      `${this.registryUrl}/servers/${serverId}/install`
    );
    return response.json();
  }

  // Auto-connect to a registry server
  async connectToServer(serverId: string): Promise<McpClient> {
    const serverInfo = await this.getInstallInstructions(serverId);

    // Generate config based on server info
    const config = this.generateConfig(serverInfo);

    // Connect
    const client = new McpClient();
    await client.connect(config);

    return client;
  }
}
```

## 📌 Caching và Updates

```typescript
// Cache registry data locally

class RegistryCache {
  private cache: Map<string, CachedServer> = new Map();
  private cacheTTL = 3600 * 1000; // 1 hour

  async getServers(): Promise<Server[]> {
    const cacheKey = "all_servers";
    const cached = this.cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
      return cached.data;
    }

    // Fetch fresh data
    const servers = await this.fetchFromRegistry();
    this.cache.set(cacheKey, {
      data: servers,
      timestamp: Date.now()
    });

    return servers;
  }

  // Check for updates
  async checkForUpdates(installedServers: InstalledServer[]): Promise<Update[]> {
    const registryServers = await this.getServers();
    const updates: Update[] = [];

    for (const installed of installedServers) {
      const registry = registryServers.find(s => s.id === installed.id);
      if (registry && registry.version !== installed.version) {
        updates.push({
          server: installed,
          currentVersion: installed.version,
          newVersion: registry.version
        });
      }
    }

    return updates;
  }
}
```

---

# 5. SUB-REGISTRIES

## 📌 Sub-Registry là gì?

```
SUB-REGISTRY = Registry riêng dựa trên MCP Registry chính

Use cases:
• Enterprise internal servers
• Curated collections
• Regional/language-specific servers
• Industry-specific servers

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   ┌───────────────────────────────────────────────────┐     │
│   │           MCP Registry (Main)                      │     │
│   │                                                    │     │
│   │   ┌──────────────────────────────────────────┐    │     │
│   │   │         All Public Servers                │    │     │
│   │   └──────────────────────────────────────────┘    │     │
│   └───────────────────────────────────────────────────┘     │
│                          │                                  │
│            ┌─────────────┼─────────────┐                    │
│            ▼             ▼             ▼                    │
│   ┌──────────────┐ ┌──────────────┐ ┌──────────────┐       │
│   │   Company    │ │  AI/ML      │ │   Finance    │       │
│   │ Sub-Registry │ │ Sub-Registry│ │ Sub-Registry │       │
│   │  (Private)   │ │  (Public)   │ │  (Private)   │       │
│   └──────────────┘ └──────────────┘ └──────────────┘       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📌 Tạo Sub-Registry

```yaml
# sub-registry.yaml

name: "My Company MCP Servers"
description: "Internal MCP servers for MyCompany"
type: "private"  # or "public"

# Inherit từ main registry
inherit:
  enabled: true
  filter:
    categories: ["dev-tools", "data"]
    verified: true

# Additional servers (internal)
servers:
  - id: "internal-crm"
    name: "Internal CRM Server"
    description: "Access company CRM data"
    repository: "https://github.internal.com/mcp/crm-server"
    access: "employees-only"

  - id: "internal-jira"
    name: "Jira Integration"
    description: "Access Jira tickets"
    repository: "https://github.internal.com/mcp/jira-server"
    access: "employees-only"

# Access control
access:
  type: "oauth"
  provider: "okta"
  allowed_groups: ["engineering", "product"]
```

## 📌 Enterprise Sub-Registry

```
ENTERPRISE USE CASES:

1. INTERNAL TOOLS
   • Company-specific integrations
   • Internal databases
   • Proprietary APIs

2. COMPLIANCE
   • Pre-approved servers only
   • Security-reviewed
   • Audit logging

3. CUSTOMIZATION
   • Modified versions of public servers
   • Company-specific configurations
   • Internal documentation

SETUP:

1. Deploy registry software (open source)
2. Configure authentication (SSO)
3. Sync với main registry (optional)
4. Add internal servers
5. Configure access policies
```

---

# 6. MODERATION VÀ GUIDELINES

## 📌 Community Guidelines

```
CÁC QUY TẮC:

✅ ALLOWED:
• Useful, functional servers
• Clear documentation
• Open source với proper license
• Servers cho legitimate use cases

❌ NOT ALLOWED:
• Spam hoặc duplicate servers
• Malicious code
• Servers vi phạm privacy
• Impersonation (giả danh)
• Servers cho illegal activities
```

## 📌 Reporting Issues

```
NẾU PHÁT HIỆN SERVER CÓ VẤN ĐỀ:

1. Click "Report" trên server page
2. Chọn reason:
   • Spam
   • Malicious code
   • Broken/non-functional
   • Inappropriate content
   • Copyright violation
   • Other

3. Provide details
4. Submit report

TIMELINE:
• Initial review: 24-48 hours
• Decision: 3-5 business days
• Appeal process available
```

## 📌 Verification Badges

```
BADGE TYPES:

🔵 Verified Publisher
   • Author identity confirmed
   • Email verified
   • GitHub profile linked

⭐ Official Server
   • From Anthropic team
   • Or official MCP partners
   • Highest trust level

🛡️ Security Reviewed
   • Code reviewed for security
   • No known vulnerabilities
   • Regular security updates

📈 Popular
   • High download count
   • Positive community feedback
   • Active maintenance
```

---

# 📚 TÀI NGUYÊN

## Links

- [MCP Registry](https://registry.modelcontextprotocol.io)
- [Registry GitHub](https://github.com/modelcontextprotocol/registry)
- [Registry API Docs](https://registry.modelcontextprotocol.io/docs/api)

## Community

- [MCP Discord](https://discord.gg/mcp)
- [GitHub Discussions](https://github.com/modelcontextprotocol/registry/discussions)

---

*Tài liệu hướng dẫn sử dụng MCP Registry - Nơi khám phá và chia sẻ MCP Servers.*
