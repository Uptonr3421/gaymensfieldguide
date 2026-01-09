/**
 * MCP Error Handling and Logging Utilities
 * 
 * This module provides enhanced error handling and logging for MCP operations.
 * Use these utilities in your Codex scripts to get better diagnostics.
 */

import { ConsoleLogger, LogLevel } from '@github/copilot/sdk';

/**
 * Enhanced logger with MCP-specific logging methods
 */
export class MCPLogger extends ConsoleLogger {
  private mcpContext: string;

  constructor(context: string = 'MCP') {
    super();
    this.mcpContext = context;
    this.logLevel = LogLevel.Info;
  }

  /**
   * Log MCP server startup
   */
  logServerStart(serverName: string, config: any) {
    this.info(`[${this.mcpContext}] Starting MCP server: ${serverName}`);
    this.debug(`[${this.mcpContext}] Config: ${JSON.stringify(config, null, 2)}`);
  }

  /**
   * Log MCP server startup success
   */
  logServerReady(serverName: string) {
    this.info(`[${this.mcpContext}] ✅ MCP server ready: ${serverName}`);
  }

  /**
   * Log MCP server startup failure
   */
  logServerError(serverName: string, error: Error) {
    this.error(`[${this.mcpContext}] ❌ MCP server failed: ${serverName}`);
    this.error(`[${this.mcpContext}] Error: ${error.message}`);
    
    // Provide helpful hints based on error type
    if (error.message.includes('ENOENT') || error.message.includes('not found')) {
      this.info(`[${this.mcpContext}] 💡 Hint: MCP server package may not be installed`);
      this.info(`[${this.mcpContext}]    Try: npm install -g @modelcontextprotocol/server-${serverName}`);
    } else if (error.message.includes('EACCES')) {
      this.info(`[${this.mcpContext}] 💡 Hint: Permission denied. Try running with appropriate permissions.`);
    } else if (error.message.includes('MODULE_NOT_FOUND')) {
      this.info(`[${this.mcpContext}] 💡 Hint: Missing dependency. Run: npm install`);
    }
  }

  /**
   * Log MCP tool execution
   */
  logToolCall(serverName: string, toolName: string, args: any) {
    this.info(`[${this.mcpContext}] 🔧 Tool call: ${serverName}.${toolName}`);
    this.debug(`[${this.mcpContext}] Arguments: ${JSON.stringify(args, null, 2)}`);
  }

  /**
   * Log MCP tool result
   */
  logToolResult(serverName: string, toolName: string, result: any) {
    this.info(`[${this.mcpContext}] ✅ Tool result: ${serverName}.${toolName}`);
    this.debug(`[${this.mcpContext}] Result: ${JSON.stringify(result, null, 2)}`);
  }

  /**
   * Log MCP configuration summary
   */
  logConfigSummary(mcpConfig: Record<string, any>) {
    const serverNames = Object.keys(mcpConfig);
    this.info(`[${this.mcpContext}] Configured ${serverNames.length} MCP server(s):`);
    serverNames.forEach(name => {
      const config = mcpConfig[name];
      const toolCount = Array.isArray(config.tools) ? config.tools.length : (config.tools === '*' ? 'all' : 0);
      this.info(`[${this.mcpContext}]   - ${name}: ${toolCount} tool(s)`);
    });
  }
}

/**
 * MCP-specific error types
 */
export class MCPError extends Error {
  constructor(
    message: string,
    public readonly serverName?: string,
    public readonly originalError?: Error
  ) {
    super(message);
    this.name = 'MCPError';
  }
}

export class MCPServerStartupError extends MCPError {
  constructor(serverName: string, originalError: Error) {
    super(
      `Failed to start MCP server: ${serverName}`,
      serverName,
      originalError
    );
    this.name = 'MCPServerStartupError';
  }
}

export class MCPToolExecutionError extends MCPError {
  constructor(
    serverName: string,
    toolName: string,
    originalError: Error
  ) {
    super(
      `Failed to execute tool ${toolName} on server ${serverName}: ${originalError.message}`,
      serverName,
      originalError
    );
    this.name = 'MCPToolExecutionError';
  }
}

/**
 * Error handler that provides detailed diagnostics
 */
export function handleMCPError(error: any, logger: MCPLogger): void {
  if (error instanceof MCPServerStartupError) {
    logger.logServerError(error.serverName!, error.originalError!);
  } else if (error instanceof MCPToolExecutionError) {
    logger.error(`Tool execution failed: ${error.message}`);
  } else if (error.message?.includes('@modelcontextprotocol/sdk')) {
    logger.error('❌ MCP SDK not found!');
    logger.info('💡 Install with: npm install @modelcontextprotocol/sdk openai zod');
  } else {
    logger.error(`Unexpected error: ${error.message}`);
    logger.debug(`Stack trace: ${error.stack}`);
  }
}

/**
 * Validate MCP configuration before use
 */
export function validateMCPConfig(mcpConfig: Record<string, any>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!mcpConfig || typeof mcpConfig !== 'object') {
    errors.push('MCP config must be an object');
    return { valid: false, errors };
  }

  for (const [serverName, config] of Object.entries(mcpConfig)) {
    if (!config.type) {
      errors.push(`Server "${serverName}": missing "type" field`);
    }

    if (config.type === 'local' || config.type === 'stdio') {
      if (!config.command) {
        errors.push(`Server "${serverName}": missing "command" field for local server`);
      }
      if (!Array.isArray(config.args)) {
        errors.push(`Server "${serverName}": "args" must be an array`);
      }
    }

    if (config.type === 'http' || config.type === 'sse') {
      if (!config.url) {
        errors.push(`Server "${serverName}": missing "url" field for remote server`);
      }
    }

    if (!config.tools) {
      errors.push(`Server "${serverName}": missing "tools" field`);
    } else if (!Array.isArray(config.tools) && config.tools !== '*') {
      errors.push(`Server "${serverName}": "tools" must be an array or "*"`);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Example usage:
 * 
 * import { MCPLogger, validateMCPConfig, handleMCPError } from './mcp-utils';
 * 
 * const logger = new MCPLogger('MyApp');
 * 
 * // Validate config
 * const validation = validateMCPConfig(mcpConfig);
 * if (!validation.valid) {
 *   logger.error('Invalid MCP config:', validation.errors);
 *   return;
 * }
 * 
 * // Log config summary
 * logger.logConfigSummary(mcpConfig);
 * 
 * // Handle errors
 * try {
 *   // ... MCP operations ...
 * } catch (error) {
 *   handleMCPError(error, logger);
 * }
 */
