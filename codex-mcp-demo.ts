/**
 * MCP (Model Context Protocol) Loading Demo & Documentation
 * 
 * This script demonstrates:
 * 1. How to properly import and use the GitHub Copilot SDK
 * 2. How to configure and initialize MCP servers
 * 3. How to enable web search and other capabilities through MCPs
 * 4. Proper error handling and logging
 * 
 * MCP Architecture Overview:
 * - MCPs are plugins that extend LLM capabilities (e.g., web search, file operations)
 * - The @github/copilot SDK provides an McpHost to manage MCP servers
 * - MCP servers can be local (stdio), remote (HTTP), or in-memory
 */

import { McpHost, Session, ConsoleLogger } from '@github/copilot/sdk';
import type { MCPServersConfig } from '@github/copilot/sdk';

/**
 * Example MCP Configuration
 * This shows how to configure various MCP servers including web search
 */
const MCP_CONFIG: MCPServersConfig = {
  // Example: Web Search MCP (if available)
  'web-search': {
    type: 'local',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-web-search'],
    tools: ['*'], // Enable all tools from this server
    env: {
      // Environment variables for the MCP server
      // In 'indirect' mode, these reference process.env vars
    }
  },
  
  // Example: GitHub MCP Server (if installed)
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

/**
 * Initialize and demonstrate MCP loading
 */
async function demonstrateMCPLoading() {
  console.log('🚀 MCP Loading Demonstration\n');
  console.log('=' .repeat(60));
  
  try {
    // Step 1: Verify SDK is loaded
    console.log('\n✅ Step 1: SDK imported successfully');
    console.log('   Available exports: McpHost, Session, ConsoleLogger, etc.');
    
    // Step 2: Create an MCP Host
    console.log('\n📦 Step 2: Creating MCP Host...');
    const logger = new ConsoleLogger();
    
    // Create McpHost with configuration
    const mcpHost = new McpHost(
      logger,
      MCP_CONFIG,
      [] // No disabled servers
    );
    
    console.log('   ✅ McpHost created successfully');
    console.log('   Configuration:', JSON.stringify(MCP_CONFIG, null, 2));
    
    // Step 3: Start MCP servers
    console.log('\n🔌 Step 3: Starting MCP servers...');
    console.log('   Note: This will attempt to start configured servers');
    console.log('   Servers may fail to start if their packages are not installed');
    
    try {
      await mcpHost.startServers();
      console.log('   ✅ MCP servers started successfully');
      
      // Get available tools
      console.log('\n🔧 Step 4: Retrieving available tools...');
      const tools = await mcpHost.getTools(
        { model: 'gpt-4' } as any, // Runtime settings
        logger,
        {} as any // Permissions config
      );
      
      console.log(`   ✅ Found ${tools.length} available tools`);
      if (tools.length > 0) {
        console.log('   Available tools:');
        tools.forEach(tool => {
          console.log(`     - ${tool.name}: ${tool.description || 'No description'}`);
        });
      }
      
    } catch (serverError: any) {
      console.error('   ⚠️  Server startup failed:', serverError.message);
      console.error('   This is expected if MCP server packages are not installed');
      console.error('   To fix: npm install @modelcontextprotocol/server-web-search');
    }
    
    // Cleanup
    console.log('\n🧹 Step 5: Cleaning up...');
    await mcpHost.stopServers();
    console.log('   ✅ MCP servers stopped');
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ MCP Loading Demonstration Complete!\n');
    
    console.log('📝 Key Takeaways:');
    console.log('   1. The SDK loads successfully from @github/copilot/sdk');
    console.log('   2. McpHost manages the lifecycle of MCP servers');
    console.log('   3. MCP servers provide tools (capabilities) to the LLM');
    console.log('   4. Servers can be local (stdio), remote (HTTP), or in-memory');
    console.log('   5. Web search and other features require MCP server packages\n');
    
  } catch (error: any) {
    console.error('\n❌ Error during MCP loading:');
    console.error('   Message:', error.message);
    console.error('   Code:', error.code);
    console.error('   Stack:', error.stack);
    
    // Provide helpful debugging info
    if (error.message.includes('@modelcontextprotocol/sdk')) {
      console.error('\n💡 Solution: The @modelcontextprotocol/sdk is missing!');
      console.error('   Install it with: npm install @modelcontextprotocol/sdk');
    }
    
    process.exit(1);
  }
}

/**
 * Alternative: Simple Session-based usage without explicit MCP management
 */
async function demonstrateSimpleSession() {
  console.log('\n\n🔹 Alternative: Simple Session Usage\n');
  console.log('=' .repeat(60));
  
  try {
    // Session can auto-manage MCPs if configured
    console.log('Creating a simple session...');
    console.log('(This is a lower-level alternative to direct MCP management)');
    console.log('Sessions can automatically load MCPs based on configuration\n');
    
    // Note: Full Session setup requires more infrastructure
    // This is just to show the concept exists
    
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

// Run the demonstration
console.log('\n🎯 GitHub Copilot SDK - MCP Loading Test\n');
console.log('This script tests MCP (Model Context Protocol) loading');
console.log('which enables features like web search in Codex.\n');

demonstrateMCPLoading()
  .then(() => demonstrateSimpleSession())
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
