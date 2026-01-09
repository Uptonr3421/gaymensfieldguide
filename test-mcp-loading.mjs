/**
 * Test script to verify MCP (Model Context Protocol) loading
 * This demonstrates the issue with importing from @github/copilot/sdk
 */

async function testMCPLoading() {
  try {
    console.log('Testing MCP loading...');
    console.log('Node version:', process.version);
    
    // Try to dynamically import the SDK
    const sdk = await import('@github/copilot/sdk');
    console.log('✅ SDK module loaded successfully!');
    console.log('Available exports:', Object.keys(sdk));
    
  } catch (error) {
    console.error('❌ MCP loading failed:');
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    
    if (error.code === 'MODULE_NOT_FOUND' || error.message.includes('@modelcontextprotocol/sdk')) {
      console.error('\n💡 Root cause: @modelcontextprotocol/sdk is missing!');
      console.error('   The @github/copilot package depends on it but it\'s not installed.');
    }
    
    process.exit(1);
  }
}

testMCPLoading();
