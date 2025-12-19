# 🛠️ HƯỚNG DẪN MCP SERVER SDK
## Xây dựng MCP Server với TypeScript SDK

---

# 📖 MỤC LỤC

1. [Tổng quan SDK](#1-tổng-quan-sdk)
2. [Cài đặt và Setup](#2-cài-đặt-và-setup)
3. [Tạo MCP Server cơ bản](#3-tạo-mcp-server-cơ-bản)
4. [Định nghĩa Tools](#4-định-nghĩa-tools)
5. [Định nghĩa Resources](#5-định-nghĩa-resources)
6. [Định nghĩa Prompts](#6-định-nghĩa-prompts)
7. [Transports](#7-transports)
8. [Advanced Features](#8-advanced-features)
9. [Deployment](#9-deployment)

---

# 1. TỔNG QUAN SDK

## 📌 MCP TypeScript SDK là gì?

```
MCP TypeScript SDK = Official library để build MCP servers và clients

Repository: github.com/modelcontextprotocol/typescript-sdk

┌─────────────────────────────────────────────────────────────┐
│                    SDK PACKAGES                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   @modelcontextprotocol/server                              │
│   ────────────────────────────                              │
│   • Build MCP servers                                       │
│   • Define tools, resources, prompts                        │
│   • STDIO và HTTP transports                               │
│   • Authentication helpers                                  │
│                                                             │
│   @modelcontextprotocol/client                              │
│   ────────────────────────────                              │
│   • Build MCP clients                                       │
│   • Connect to MCP servers                                  │
│   • OAuth support                                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📌 Version Information

```
Current versions:

v1.x (Stable - Production recommended)
├── Branch: v1.x
├── Latest: 1.25.1
└── Support: 6+ months after v2 release

v2.x (Pre-alpha - Development)
├── Branch: main
├── Status: Breaking changes possible
└── Expected stable: Q1 2026
```

---

# 2. CÀI ĐẶT VÀ SETUP

## 📌 Installation

```bash
# Server package
npm install @modelcontextprotocol/server zod

# Client package (if needed)
npm install @modelcontextprotocol/client zod

# TypeScript (dev dependency)
npm install -D typescript @types/node
```

## 📌 Project Structure

```
my-mcp-server/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts           # Entry point
│   ├── server.ts          # Server definition
│   ├── tools/
│   │   ├── index.ts       # Export all tools
│   │   ├── search.ts      # Search tool
│   │   └── create.ts      # Create tool
│   ├── resources/
│   │   ├── index.ts       # Export all resources
│   │   └── config.ts      # Config resource
│   └── prompts/
│       ├── index.ts       # Export all prompts
│       └── templates.ts   # Prompt templates
└── dist/                  # Compiled output
```

## 📌 package.json

```json
{
  "name": "my-mcp-server",
  "version": "1.0.0",
  "type": "module",
  "main": "dist/index.js",
  "bin": {
    "my-mcp-server": "dist/index.js"
  },
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "tsx watch src/index.ts"
  },
  "dependencies": {
    "@modelcontextprotocol/server": "^1.0.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "tsx": "^4.0.0"
  }
}
```

## 📌 tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "declaration": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

---

# 3. TẠO MCP SERVER CƠ BẢN

## 📌 Minimal Server

```typescript
// src/index.ts

import { McpServer } from "@modelcontextprotocol/server";

// 1. Create server instance
const server = new McpServer({
  name: "my-mcp-server",
  version: "1.0.0",
  description: "My first MCP server"
});

// 2. Add a simple tool
server.tool(
  "hello",
  "Say hello to someone",
  {
    name: { type: "string", description: "Name to greet" }
  },
  async ({ name }) => {
    return {
      content: [
        { type: "text", text: `Hello, ${name}! Welcome to MCP.` }
      ]
    };
  }
);

// 3. Start server
server.start();

console.error("MCP Server started");
```

## 📌 Server với Zod Schemas

```typescript
import { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";

const server = new McpServer({
  name: "my-mcp-server",
  version: "1.0.0"
});

// Define schema với Zod
const greetSchema = z.object({
  name: z.string().min(1).describe("Name to greet"),
  formal: z.boolean().default(false).describe("Use formal greeting")
});

server.tool(
  "greet",
  "Greet someone with optional formality",
  greetSchema,
  async ({ name, formal }) => {
    const greeting = formal
      ? `Good day, ${name}. How may I assist you?`
      : `Hey ${name}! What's up?`;

    return {
      content: [{ type: "text", text: greeting }]
    };
  }
);

server.start();
```

---

# 4. ĐỊNH NGHĨA TOOLS

## 📌 Tool Structure

```
TOOL = Function mà AI có thể gọi

Components:
• name        - Unique identifier
• description - Mô tả cho AI hiểu khi nào dùng
• inputSchema - Parameters (Zod hoặc JSON Schema)
• handler     - Function thực thi
```

## 📌 Basic Tool

```typescript
server.tool(
  "add_numbers",                              // name
  "Add two numbers together",                 // description
  {                                           // schema
    a: z.number().describe("First number"),
    b: z.number().describe("Second number")
  },
  async ({ a, b }) => {                       // handler
    const result = a + b;
    return {
      content: [
        { type: "text", text: `${a} + ${b} = ${result}` }
      ]
    };
  }
);
```

## 📌 Tool với Multiple Content Types

```typescript
server.tool(
  "analyze_data",
  "Analyze data and return results",
  {
    data: z.array(z.number()).describe("Array of numbers")
  },
  async ({ data }) => {
    const sum = data.reduce((a, b) => a + b, 0);
    const avg = sum / data.length;
    const max = Math.max(...data);
    const min = Math.min(...data);

    return {
      content: [
        // Text content
        {
          type: "text",
          text: `Analysis of ${data.length} numbers:`
        },
        // JSON content
        {
          type: "text",
          text: JSON.stringify({
            sum,
            average: avg.toFixed(2),
            max,
            min
          }, null, 2)
        }
      ]
    };
  }
);
```

## 📌 Tool với External API Call

```typescript
server.tool(
  "get_weather",
  "Get current weather for a city",
  {
    city: z.string().describe("City name"),
    units: z.enum(["metric", "imperial"]).default("metric")
  },
  async ({ city, units }) => {
    const API_KEY = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch weather");
      }

      const weather = {
        city: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity
      };

      return {
        content: [{
          type: "text",
          text: `Weather in ${weather.city}:\n` +
                `Temperature: ${weather.temperature}°${units === "metric" ? "C" : "F"}\n` +
                `Conditions: ${weather.description}\n` +
                `Humidity: ${weather.humidity}%`
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: "text",
          text: `Error: ${error.message}`
        }],
        isError: true
      };
    }
  }
);
```

## 📌 Tool với Progress Updates

```typescript
server.tool(
  "long_running_task",
  "A task that takes time and reports progress",
  {
    items: z.number().min(1).max(100).describe("Number of items to process")
  },
  async ({ items }, context) => {
    const results = [];

    for (let i = 0; i < items; i++) {
      // Report progress
      await context.reportProgress({
        progress: i + 1,
        total: items,
        message: `Processing item ${i + 1} of ${items}`
      });

      // Simulate work
      await new Promise(resolve => setTimeout(resolve, 100));
      results.push(`Item ${i + 1} processed`);
    }

    return {
      content: [{
        type: "text",
        text: `Completed processing ${items} items:\n${results.join("\n")}`
      }]
    };
  }
);
```

---

# 5. ĐỊNH NGHĨA RESOURCES

## 📌 Resource Structure

```
RESOURCE = Data mà AI có thể đọc

Components:
• name        - Display name
• uri         - Unique identifier (URI format)
• description - Mô tả resource
• mimeType    - Content type
• handler     - Function trả về data
```

## 📌 Static Resource

```typescript
server.resource(
  "app-config",                              // name
  "config://app/settings",                   // uri
  "Application configuration settings",      // description
  async () => {
    const config = {
      version: "1.0.0",
      environment: process.env.NODE_ENV || "development",
      features: {
        darkMode: true,
        notifications: true
      }
    };

    return {
      contents: [{
        uri: "config://app/settings",
        mimeType: "application/json",
        text: JSON.stringify(config, null, 2)
      }]
    };
  }
);
```

## 📌 Dynamic Resource với Template

```typescript
// Resource template - matches multiple URIs
server.resourceTemplate(
  "user-profile",
  "user://{userId}/profile",                 // URI template
  "User profile information",
  async ({ userId }) => {
    // Fetch user from database
    const user = await db.users.findById(userId);

    if (!user) {
      throw new Error(`User ${userId} not found`);
    }

    return {
      contents: [{
        uri: `user://${userId}/profile`,
        mimeType: "application/json",
        text: JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt
        })
      }]
    };
  }
);
```

## 📌 File Resource

```typescript
import { readFile } from "fs/promises";
import { resolve } from "path";

server.resourceTemplate(
  "local-file",
  "file://{path}",
  "Read local file contents",
  async ({ path }) => {
    const allowedDir = "/home/user/documents";
    const fullPath = resolve(allowedDir, path);

    // Security check
    if (!fullPath.startsWith(allowedDir)) {
      throw new Error("Access denied: Path outside allowed directory");
    }

    const content = await readFile(fullPath, "utf-8");
    const mimeType = path.endsWith(".json")
      ? "application/json"
      : "text/plain";

    return {
      contents: [{
        uri: `file://${path}`,
        mimeType,
        text: content
      }]
    };
  }
);
```

---

# 6. ĐỊNH NGHĨA PROMPTS

## 📌 Prompt Structure

```
PROMPT = Template có sẵn cho user chọn

Components:
• name        - Unique identifier
• description - Mô tả prompt làm gì
• arguments   - Optional parameters
• handler     - Function trả về prompt messages
```

## 📌 Simple Prompt

```typescript
server.prompt(
  "code-review",
  "Review code and provide suggestions",
  [
    {
      name: "code",
      description: "The code to review",
      required: true
    },
    {
      name: "language",
      description: "Programming language",
      required: false
    }
  ],
  async ({ code, language }) => {
    const lang = language || "unknown";

    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Please review the following ${lang} code and provide:
1. Potential bugs or issues
2. Performance improvements
3. Code style suggestions
4. Security concerns (if any)

Code:
\`\`\`${lang}
${code}
\`\`\`

Please be thorough but concise.`
          }
        }
      ]
    };
  }
);
```

## 📌 Prompt với Multiple Messages

```typescript
server.prompt(
  "explain-concept",
  "Explain a technical concept",
  [
    {
      name: "concept",
      description: "The concept to explain",
      required: true
    },
    {
      name: "audience",
      description: "Target audience level",
      required: false
    }
  ],
  async ({ concept, audience }) => {
    const level = audience || "intermediate";

    return {
      messages: [
        {
          role: "system",
          content: {
            type: "text",
            text: `You are a technical educator. Explain concepts clearly for ${level} level audience.`
          }
        },
        {
          role: "user",
          content: {
            type: "text",
            text: `Please explain: ${concept}

Include:
- Simple definition
- Why it matters
- Real-world example
- Common misconceptions`
          }
        }
      ]
    };
  }
);
```

---

# 7. TRANSPORTS

## 📌 STDIO Transport (Default)

```typescript
// Best for: Local servers, Claude Desktop

import { McpServer } from "@modelcontextprotocol/server";

const server = new McpServer({
  name: "stdio-server",
  version: "1.0.0"
});

// ... define tools, resources, prompts ...

// Start với STDIO (default)
server.start();

// Hoặc explicit:
server.start({ transport: "stdio" });
```

## 📌 HTTP Transport

```typescript
// Best for: Remote servers, web deployment

import { McpServer } from "@modelcontextprotocol/server";

const server = new McpServer({
  name: "http-server",
  version: "1.0.0"
});

// ... define tools, resources, prompts ...

// Start với HTTP
server.start({
  transport: "http",
  port: 3000,
  host: "0.0.0.0"
});

// Server sẽ listen tại http://0.0.0.0:3000
```

## 📌 Streamable HTTP (SSE)

```typescript
// Best for: Real-time updates, streaming responses

import { McpServer } from "@modelcontextprotocol/server";

const server = new McpServer({
  name: "sse-server",
  version: "1.0.0"
});

// Start với SSE
server.start({
  transport: "sse",
  port: 3000
});

// Client connects to /sse endpoint
// Supports streaming tool responses
```

---

# 8. ADVANCED FEATURES

## 📌 Sampling (LLM Integration)

```typescript
// Cho phép server gọi LLM của client

server.tool(
  "generate_summary",
  "Generate a summary using the client's LLM",
  {
    text: z.string().describe("Text to summarize")
  },
  async ({ text }, context) => {
    // Request sampling từ client
    const response = await context.sample({
      messages: [
        {
          role: "user",
          content: { type: "text", text: `Summarize this in 2-3 sentences: ${text}` }
        }
      ],
      maxTokens: 200
    });

    return {
      content: [{
        type: "text",
        text: `Summary: ${response.content[0].text}`
      }]
    };
  }
);
```

## 📌 Error Handling

```typescript
import { McpError, ErrorCode } from "@modelcontextprotocol/server";

server.tool(
  "divide",
  "Divide two numbers",
  {
    a: z.number(),
    b: z.number()
  },
  async ({ a, b }) => {
    if (b === 0) {
      throw new McpError(
        ErrorCode.InvalidParams,
        "Division by zero is not allowed"
      );
    }

    return {
      content: [{
        type: "text",
        text: `${a} / ${b} = ${a / b}`
      }]
    };
  }
);
```

## 📌 Logging

```typescript
// Log ra stderr (không interfere với protocol)

const server = new McpServer({
  name: "logging-server",
  version: "1.0.0"
});

server.tool(
  "logged_operation",
  "An operation that logs",
  {},
  async (args, context) => {
    // Log info
    context.log("info", "Starting operation");

    // Do work...

    // Log debug
    context.log("debug", "Operation details", { args });

    // Log warning
    context.log("warning", "Something to note");

    return {
      content: [{ type: "text", text: "Done" }]
    };
  }
);
```

---

# 9. DEPLOYMENT

## 📌 Local Deployment (Claude Desktop)

```json
// claude_desktop_config.json

{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["/path/to/dist/index.js"],
      "env": {
        "API_KEY": "your-api-key"
      }
    }
  }
}
```

## 📌 NPM Package Deployment

```bash
# 1. Build
npm run build

# 2. Publish to npm
npm publish

# 3. Users can run with npx
npx my-mcp-server
```

```json
// User's claude_desktop_config.json
{
  "mcpServers": {
    "my-server": {
      "command": "npx",
      "args": ["-y", "my-mcp-server"]
    }
  }
}
```

## 📌 Docker Deployment

```dockerfile
# Dockerfile
FROM node:20-slim

WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY dist ./dist

EXPOSE 3000
CMD ["node", "dist/index.js"]
```

```bash
# Build và run
docker build -t my-mcp-server .
docker run -p 3000:3000 my-mcp-server
```

## 📌 Cloudflare Workers Deployment

```typescript
// src/index.ts for Cloudflare

import { McpServer } from "@modelcontextprotocol/server/cloudflare";

const server = new McpServer({
  name: "cloudflare-mcp",
  version: "1.0.0"
});

// Define tools...

export default {
  fetch: server.fetch.bind(server)
};
```

```bash
# Deploy
wrangler deploy
```

---

# 📚 TÀI NGUYÊN

## Official

- [TypeScript SDK Repository](https://github.com/modelcontextprotocol/typescript-sdk)
- [SDK Documentation](https://modelcontextprotocol.io/docs/sdk)
- [API Reference](https://github.com/modelcontextprotocol/typescript-sdk/tree/main/docs)

## Examples

- [Example Servers](https://github.com/modelcontextprotocol/typescript-sdk/tree/main/examples/server)
- [Example Clients](https://github.com/modelcontextprotocol/typescript-sdk/tree/main/examples/client)

---

*Tài liệu hướng dẫn sử dụng MCP TypeScript SDK để xây dựng servers.*
