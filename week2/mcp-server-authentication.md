# 🔐 HƯỚNG DẪN MCP SERVER AUTHENTICATION
## Bảo mật và xác thực cho MCP Servers

---

# 📖 MỤC LỤC

1. [Tại sao cần Authentication?](#1-tại-sao-cần-authentication)
2. [Các phương pháp Authentication](#2-các-phương-pháp-authentication)
3. [OAuth 2.0 cho MCP](#3-oauth-20-cho-mcp)
4. [Implement Authentication với Cloudflare](#4-implement-authentication-với-cloudflare)
5. [Security Best Practices](#5-security-best-practices)
6. [Testing Authenticated Servers](#6-testing-authenticated-servers)

---

# 1. TẠI SAO CẦN AUTHENTICATION?

## 📌 Vấn đề với Public MCP Servers

```
KHÔNG CÓ AUTHENTICATION:
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   MCP Server (Public)                                       │
│        │                                                    │
│        ├──── User A ✓                                       │
│        ├──── User B ✓                                       │
│        ├──── Hacker ✓  ← VẤN ĐỀ!                           │
│        └──── Bot ✓     ← VẤN ĐỀ!                           │
│                                                             │
│   Risks:                                                    │
│   ❌ Ai cũng có thể access                                 │
│   ❌ Không phân biệt được users                            │
│   ❌ Không thể giới hạn quyền                              │
│   ❌ Dễ bị abuse, DDoS                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘

CÓ AUTHENTICATION:
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   MCP Server (Protected)                                    │
│        │                                                    │
│        ├──── User A (token valid) ✓                        │
│        ├──── User B (token valid) ✓                        │
│        ├──── Hacker (no token) ✗                           │
│        └──── Bot (invalid token) ✗                         │
│                                                             │
│   Benefits:                                                 │
│   ✅ Chỉ authorized users access                           │
│   ✅ Phân biệt users, track usage                          │
│   ✅ Role-based permissions                                │
│   ✅ Rate limiting per user                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📌 Khi nào cần Authentication?

| Scenario | Cần Auth? | Lý do |
|----------|-----------|-------|
| Local server (STDIO) | Không | Chỉ user local access |
| Public remote server | **Có** | Ai cũng có thể access |
| Internal company server | **Có** | Cần phân quyền employees |
| Server với sensitive data | **Có** | Bảo vệ data |
| Demo/testing server | Tùy | Có thể public nếu không sensitive |

---

# 2. CÁC PHƯƠNG PHÁP AUTHENTICATION

## 📌 Tổng quan các phương pháp

```
┌─────────────────────────────────────────────────────────────┐
│              AUTHENTICATION METHODS FOR MCP                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   1. API KEY                                                │
│   ────────────                                              │
│   • Đơn giản nhất                                           │
│   • Static key trong header                                 │
│   • Phù hợp: Internal tools, simple use cases              │
│                                                             │
│   2. OAUTH 2.0                                              │
│   ────────────                                              │
│   • Standard industry                                       │
│   • User consent flow                                       │
│   • Phù hợp: User-facing apps, 3rd party data              │
│                                                             │
│   3. JWT (JSON Web Tokens)                                  │
│   ────────────────────────                                  │
│   • Stateless authentication                                │
│   • Self-contained tokens                                   │
│   • Phù hợp: Microservices, distributed systems            │
│                                                             │
│   4. mTLS (Mutual TLS)                                      │
│   ────────────────────                                      │
│   • Certificate-based                                       │
│   • Two-way authentication                                  │
│   • Phù hợp: High-security enterprise                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📌 So sánh các phương pháp

| Method | Complexity | Security | User Experience |
|--------|------------|----------|-----------------|
| API Key | ⭐ | ⭐⭐ | Simple |
| OAuth 2.0 | ⭐⭐⭐ | ⭐⭐⭐⭐ | Login flow |
| JWT | ⭐⭐ | ⭐⭐⭐ | Token-based |
| mTLS | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Complex setup |

---

# 3. OAUTH 2.0 CHO MCP

## 📌 OAuth 2.0 Flow Overview

```
┌─────────────────────────────────────────────────────────────┐
│                   OAUTH 2.0 FLOW FOR MCP                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌──────────┐                        ┌──────────────────┐  │
│   │   User   │                        │  OAuth Provider  │  │
│   │(Browser) │                        │ (GitHub, Google) │  │
│   └────┬─────┘                        └────────┬─────────┘  │
│        │                                       │            │
│        │  1. Click "Login with GitHub"         │            │
│        │──────────────────────────────────────▶│            │
│        │                                       │            │
│        │  2. Redirect to GitHub login          │            │
│        │◀──────────────────────────────────────│            │
│        │                                       │            │
│        │  3. User enters credentials           │            │
│        │──────────────────────────────────────▶│            │
│        │                                       │            │
│        │  4. Authorization code                │            │
│        │◀──────────────────────────────────────│            │
│        │                                       │            │
│   ┌────┴─────┐                                 │            │
│   │   MCP    │  5. Exchange code for token     │            │
│   │  Server  │────────────────────────────────▶│            │
│   │          │                                 │            │
│   │          │  6. Access token                │            │
│   │          │◀────────────────────────────────│            │
│   └────┬─────┘                                 │            │
│        │                                       │            │
│        │  7. Authenticated MCP requests        │            │
│        │◀─────────────────────────────────────▶│            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📌 Supported OAuth Providers

```
MCP hỗ trợ bất kỳ OAuth 2.0 provider nào:

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   POPULAR PROVIDERS:                                        │
│                                                             │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│   │  GitHub  │  │  Google  │  │   Slack  │  │   Auth0  │  │
│   └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
│                                                             │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│   │  Stytch  │  │  WorkOS  │  │   Okta   │  │  Custom  │  │
│   └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

# 4. IMPLEMENT AUTHENTICATION VỚI CLOUDFLARE

## 📌 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│           CLOUDFLARE MCP SERVER WITH AUTH                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────┐     ┌─────────────────────────────────┐   │
│   │ MCP Client  │     │    Cloudflare Worker            │   │
│   │(Claude etc.)│     │                                 │   │
│   └──────┬──────┘     │  ┌─────────────────────────┐   │   │
│          │            │  │     OAuthProvider       │   │   │
│          │            │  │                         │   │   │
│          │            │  │  • /authorize           │   │   │
│          │            │  │  • /token               │   │   │
│          │  SSE       │  │  • /register            │   │   │
│          │◀──────────▶│  │  • /callback            │   │   │
│          │            │  │                         │   │   │
│          │            │  └───────────┬─────────────┘   │   │
│          │            │              │                 │   │
│          │            │  ┌───────────▼─────────────┐   │   │
│          │            │  │      MCP Server         │   │   │
│          │            │  │   (Your Tools/APIs)     │   │   │
│          │            │  └─────────────────────────┘   │   │
│          │            │                                 │   │
│          │            └─────────────────────────────────┘   │
│          │                           │                      │
│          │            ┌──────────────▼──────────────┐       │
│          │            │      GitHub OAuth           │       │
│          │            │    (or other provider)      │       │
│          │            └─────────────────────────────┘       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📌 Step 1: Setup GitHub OAuth App

```
1. Đi đến: github.com/settings/developers

2. Click "New OAuth App"

3. Điền thông tin:
   ┌────────────────────────────────────────────┐
   │ Application name: My MCP Server            │
   │                                            │
   │ Homepage URL:                              │
   │ • Dev: http://localhost:8788               │
   │ • Prod: https://your-mcp.workers.dev       │
   │                                            │
   │ Callback URL:                              │
   │ • Dev: http://localhost:8788/callback      │
   │ • Prod: https://your-mcp.workers.dev/callback │
   └────────────────────────────────────────────┘

4. Lưu lại:
   • Client ID: ghp_xxxxxxxxxxxx
   • Client Secret: ghs_xxxxxxxxxxxx
```

## 📌 Step 2: Create Cloudflare Worker

```typescript
// src/index.ts

import { OAuthProvider } from "@cloudflare/workers-oauth-provider";
import { McpServer } from "@modelcontextprotocol/server";

// Define MCP Server với tools
class MyMCP extends McpServer {
  constructor() {
    super({ name: "my-authenticated-server", version: "1.0.0" });

    // Define tools
    this.tool(
      "get_user_repos",
      "Get authenticated user's repositories",
      {},
      async (args, context) => {
        // context.user chứa info từ OAuth
        const repos = await fetchUserRepos(context.user.accessToken);
        return { content: [{ type: "text", text: JSON.stringify(repos) }] };
      }
    );
  }
}

// GitHub OAuth Handler
const GitHubHandler = {
  async authorize(request: Request, env: Env) {
    const authUrl = new URL("https://github.com/login/oauth/authorize");
    authUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
    authUrl.searchParams.set("redirect_uri", `${request.url}/callback`);
    authUrl.searchParams.set("scope", "repo user");
    return Response.redirect(authUrl.toString());
  },

  async callback(request: Request, env: Env) {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");

    // Exchange code for token
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      }
    );

    const { access_token } = await tokenResponse.json();
    return { accessToken: access_token };
  },
};

// Export với OAuthProvider wrapper
export default new OAuthProvider({
  apiRoute: "/sse",
  apiHandler: MyMCP.Router,
  defaultHandler: GitHubHandler,
  authorizeEndpoint: "/authorize",
  tokenEndpoint: "/token",
  clientRegistrationEndpoint: "/register",
});
```

## 📌 Step 3: Configure Secrets

```bash
# Development (.dev.vars file)
GITHUB_CLIENT_ID="your-dev-client-id"
GITHUB_CLIENT_SECRET="your-dev-client-secret"
COOKIE_ENCRYPTION_KEY="random-32-char-string"

# Production (Wrangler CLI)
wrangler secret put GITHUB_CLIENT_ID
wrangler secret put GITHUB_CLIENT_SECRET
wrangler secret put COOKIE_ENCRYPTION_KEY
```

## 📌 Step 4: Configure KV for Sessions

```toml
# wrangler.toml

name = "my-mcp-server"
main = "src/index.ts"
compatibility_date = "2024-01-01"

[[kv_namespaces]]
binding = "OAUTH_KV"
id = "your-kv-namespace-id"
```

```bash
# Create KV namespace
wrangler kv:namespace create OAUTH_KV

# Note the ID và update wrangler.toml
```

## 📌 Step 5: Deploy

```bash
# Development
wrangler dev

# Production
wrangler deploy
```

---

# 5. SECURITY BEST PRACTICES

## 📌 Token Security

```
┌─────────────────────────────────────────────────────────────┐
│                    TOKEN SECURITY                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ✅ DO:                                                    │
│   • Sử dụng HTTPS everywhere                               │
│   • Set token expiration (short-lived)                     │
│   • Implement token refresh                                │
│   • Store secrets trong environment variables              │
│   • Use secure, httpOnly cookies                           │
│                                                             │
│   ❌ DON'T:                                                 │
│   • Hardcode secrets trong code                            │
│   • Log tokens hoặc sensitive data                         │
│   • Store tokens trong localStorage (XSS risk)             │
│   • Use long-lived tokens without refresh                  │
│   • Send tokens qua URL parameters                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📌 Scope Management

```typescript
// Chỉ request scopes cần thiết

// ❌ Bad: Request quá nhiều scopes
const scopes = "repo user admin:org delete_repo";

// ✅ Good: Chỉ request scopes thực sự cần
const scopes = "repo:read user:email";

// Scopes phổ biến cho GitHub:
// • repo        - Full access to repos
// • repo:read   - Read-only access
// • user        - User profile info
// • user:email  - User email only
```

## 📌 Rate Limiting

```typescript
// Implement rate limiting per user

const rateLimiter = {
  windowMs: 60 * 1000,  // 1 minute window
  maxRequests: 100,     // 100 requests per window

  async check(userId: string, kv: KVNamespace): Promise<boolean> {
    const key = `ratelimit:${userId}`;
    const current = await kv.get(key);
    const count = current ? parseInt(current) : 0;

    if (count >= this.maxRequests) {
      return false;  // Rate limited
    }

    await kv.put(key, String(count + 1), {
      expirationTtl: 60
    });
    return true;  // Allowed
  }
};
```

## 📌 Input Validation

```typescript
import { z } from "zod";

// Validate ALL inputs từ clients

const toolInputSchema = z.object({
  query: z.string()
    .min(1, "Query cannot be empty")
    .max(1000, "Query too long")
    .regex(/^[a-zA-Z0-9\s]+$/, "Invalid characters"),
  limit: z.number()
    .int()
    .min(1)
    .max(100)
    .default(10)
});

server.tool("search", "Search something", toolInputSchema, async (args) => {
  // args đã được validate
  const { query, limit } = args;
  // ...
});
```

---

# 6. TESTING AUTHENTICATED SERVERS

## 📌 Using MCP Inspector

```
MCP Inspector = Official debugging tool

Steps:
1. Mở MCP Inspector
2. Chọn "SSE" transport
3. Nhập server URL: https://your-mcp.workers.dev/sse
4. Click "Quick OAuth Flow"
5. Complete authentication
6. Test tools và resources
```

## 📌 Using curl for Testing

```bash
# 1. Get authorization URL
curl -X GET "https://your-mcp.workers.dev/authorize" \
  -H "Content-Type: application/json"

# 2. Exchange code for token (after OAuth callback)
curl -X POST "https://your-mcp.workers.dev/token" \
  -H "Content-Type: application/json" \
  -d '{"code": "auth_code_from_callback"}'

# 3. Call MCP endpoint with token
curl -X POST "https://your-mcp.workers.dev/sse" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"method": "tools/list"}'
```

## 📌 Automated Testing

```typescript
// test/auth.test.ts

import { describe, it, expect } from "vitest";

describe("MCP Authentication", () => {
  it("should reject requests without token", async () => {
    const response = await fetch("https://your-mcp.workers.dev/sse", {
      method: "POST",
      body: JSON.stringify({ method: "tools/list" })
    });

    expect(response.status).toBe(401);
  });

  it("should accept requests with valid token", async () => {
    const response = await fetch("https://your-mcp.workers.dev/sse", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${VALID_TOKEN}`
      },
      body: JSON.stringify({ method: "tools/list" })
    });

    expect(response.status).toBe(200);
  });

  it("should reject requests with expired token", async () => {
    const response = await fetch("https://your-mcp.workers.dev/sse", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${EXPIRED_TOKEN}`
      },
      body: JSON.stringify({ method: "tools/list" })
    });

    expect(response.status).toBe(401);
  });
});
```

---

# 📚 TÀI NGUYÊN

## Documentation

- [Cloudflare MCP Auth Guide](https://developers.cloudflare.com/agents/guides/remote-mcp-server/)
- [OAuth 2.0 Specification](https://oauth.net/2/)
- [MCP Security Guidelines](https://modelcontextprotocol.io/docs/security)

## Libraries

- [@cloudflare/workers-oauth-provider](https://www.npmjs.com/package/@cloudflare/workers-oauth-provider)
- [Stytch SDK](https://stytch.com/docs)
- [Auth0 SDK](https://auth0.com/docs)

---

*Tài liệu hướng dẫn Authentication cho MCP Servers.*
