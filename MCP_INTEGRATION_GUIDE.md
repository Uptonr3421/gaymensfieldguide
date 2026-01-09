# MCP (Model Context Protocol) Integration Guide

## Overview

This document describes how MCP (Model Context Protocol) plugins are loaded and initialized in the Gay Men's Field Guide Codex TypeScript scripts using the GitHub Copilot SDK.

## Problem & Solution

### The Issue
The `@github/copilot` package depends on peer dependencies that were not installed:
- `@modelcontextprotocol/sdk` - Core MCP protocol implementation
- `openai` - OpenAI SDK for type definitions  
- `zod` - Schema validation library

Without these dependencies, MCP servers (including Web Search) could not be loaded, breaking functionality.

### The Fix
Install the required peer dependencies:

```bash
npm install @modelcontextprotocol/sdk openai zod
```

## MCP Architecture

### What are MCPs?
Model Context Protocol (MCP) servers are plugins that extend LLM capabilities. They provide:
- **Web Search** - Real-time web search functionality
- **GitHub Integration** - Repository operations
- **File System Access** - Local file operations
- **Custom Tools** - Any capability you can code

### How MCPs Work
1. **Configuration** - Define MCP servers in your session config
2. **On-Demand Loading** - Servers start when their tools are needed
3. **Tool Execution** - LLM can call tools provided by MCP servers
4. **Result Integration** - Tool results are fed back to the LLM

## Implementation Guide

### 1. Import the SDK

```typescript
import { LocalSession, ConsoleLogger } from '@github/copilot/sdk';
```

### 2. Configure MCP Servers

```typescript
const mcpConfig = {
  'web-search': {
    type: 'local',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-web-search'],
    tools: ['*'], // Enable all tools
    env: {}
  },
  'github': {
    type: 'local',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-github'],
    tools: ['*'],
    env: {
      'GITHUB_TOKEN': 'GITHUB_TOKEN' // References process.env.GITHUB_TOKEN
    }
  }
};
```

### 3. Create a Session with MCP Configuration

```typescript
const logger = new ConsoleLogger();

const session = new LocalSession({
  logger,
  mcpServers: mcpConfig,
  integrationId: 'your-app-id'
});
```

### 4. MCP Servers Load Automatically

When the LLM needs a tool (e.g., web search), the corresponding MCP server:
1. Starts automatically
2. Provides its tools to the LLM
3. Executes tool calls when requested
4. Returns results to the LLM

## MCP Server Types

### Local (stdio)
Executes a command locally and communicates via stdin/stdout.

```typescript
{
  type: 'local',
  command: 'npx',
  args: ['-y', '@modelcontextprotocol/server-web-search'],
  tools: ['*']
}
```

### Remote (HTTP/SSE)
Connects to a remote MCP server via HTTP or Server-Sent Events.

```typescript
{
  type: 'http',
  url: 'https://mcp-server.example.com',
  tools: ['*'],
  headers: {
    'Authorization': 'Bearer ${API_TOKEN}'
  }
}
```

### In-Memory
Runs an MCP server instance directly in your process.

```typescript
{
  type: 'memory',
  serverInstance: myMcpServerInstance,
  tools: ['*']
}
```

## Environment Variables

MCP servers often need environment variables for configuration:

```typescript
env: {
  'GITHUB_TOKEN': 'GITHUB_TOKEN' // indirect mode: reads from process.env.GITHUB_TOKEN
}
```

### Environment Variable Modes

**Indirect Mode (default):**
- Value is the name of an env var to read
- `{ "FOO": "BAR" }` → sets FOO=process.env.BAR

**Direct Mode:**
- Value is the literal value to set
- `{ "FOO": "bar" }` → sets FOO=bar
- Supports variable expansion: `${VAR}` or `$VAR`

## Available MCP Servers

### Official MCP Servers

```bash
# Web Search
npm install -g @modelcontextprotocol/server-web-search

# GitHub
npm install -g @modelcontextprotocol/server-github

# File System
npm install -g @modelcontextprotocol/server-filesystem

# Memory (KV store)
npm install -g @modelcontextprotocol/server-memory

# Postgres
npm install -g @modelcontextprotocol/server-postgres
```

## Testing MCP Loading

Run the demo script to verify MCP loading:

```bash
node codex-mcp-demo.mjs
```

Expected output:
```
✅ MCP Configuration Successfully Loaded!
```

## Error Handling

### Common Errors

#### 1. Missing Dependencies
```
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '@modelcontextprotocol/sdk'
```

**Solution:** Install peer dependencies
```bash
npm install @modelcontextprotocol/sdk openai zod
```

#### 2. Node Version Mismatch
```
npm warn EBADENGINE required: { node: '>=22' }
```

**Note:** The SDK requires Node.js 22+, but works with Node 20 for basic functionality. Some features may require Node 22+.

#### 3. MCP Server Not Found
```
Error: Command not found: npx @modelcontextprotocol/server-web-search
```

**Solution:** Install the MCP server package
```bash
npm install -g @modelcontextprotocol/server-web-search
```

## Integration with Antigravity

To integrate MCP with the existing Antigravity system:

1. **Add MCP Config to antigravity.config.js:**

```javascript
module.exports = {
  // ... existing config ...
  
  mcp: {
    enabled: true,
    servers: {
      'web-search': {
        type: 'local',
        command: 'npx',
        args: ['-y', '@modelcontextprotocol/server-web-search'],
        tools: ['*']
      }
    }
  }
};
```

2. **Update Agent Scripts to Use MCP:**

```javascript
const { LocalSession, ConsoleLogger } = require('@github/copilot/sdk');
const config = require('./antigravity.config.js');

const session = new LocalSession({
  logger: new ConsoleLogger(),
  mcpServers: config.mcp.servers
});
```

## Best Practices

1. **Use On-Demand Loading** - MCP servers start when needed, reducing overhead
2. **Configure Only What You Need** - Don't enable all MCP servers if you only need a few
3. **Handle Errors Gracefully** - MCP servers may fail to start; handle errors appropriately
4. **Log MCP Activity** - Use the ConsoleLogger or FileLogger to track MCP operations
5. **Secure Credentials** - Never commit API keys; use environment variables

## Troubleshooting

### Enable Debug Logging

```typescript
import { ConsoleLogger, LogLevel } from '@github/copilot/sdk';

const logger = new ConsoleLogger();
logger.setLogLevel(LogLevel.DEBUG);
```

### Check MCP Server Status

MCP servers log their startup and activity. Check the console output for:
- `Starting MCP server: <server-name>`
- `MCP server ready: <server-name>`
- `MCP tool called: <tool-name>`

### Verify Dependencies

```bash
npm list @modelcontextprotocol/sdk openai zod
```

All three should be installed and at compatible versions.

## References

- [Model Context Protocol Specification](https://modelcontextprotocol.io)
- [GitHub Copilot SDK Documentation](https://github.com/github/copilot-cli)
- [MCP Server List](https://github.com/modelcontextprotocol/servers)

## Maintainer Notes

**Last Updated:** 2026-01-09  
**Status:** ✅ Working  
**Dependencies:**
- `@github/copilot`: ^0.0.362
- `@modelcontextprotocol/sdk`: ^1.25.2
- `openai`: ^6.15.0
- `zod`: ^4.3.5

**Key Files:**
- `codex-mcp-demo.ts` - Demonstration script
- `codex-mcp-demo.mjs` - Compiled demo (runnable)
- `MCP_INTEGRATION_GUIDE.md` - This document
