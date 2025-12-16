// Antigravity Configuration
// Enforcing usage of specifically granted billing-backed models.
// PRIMARY PROJECT: Cadence-Chatbot (gen-lang-client-0957286112)
// BACKUP PROJECT: BespokeEthos (bespokeethos-analytics-475007)

const config = {
  // Primary project with billing credits
  project_id: "gen-lang-client-0957286112",
  location: "us-central1",
  
  // Backup project for rate limit fallback
  backup: {
    project_id: "bespokeethos-analytics-475007",
    api_key_ref: "GOOGLE_GEMINI_API_BACKUP_1"
  },
  
  models: {
    // High-intelligence model (The "Brain") - "Nano Banana 3" 
    // UPGRADED to Gemini 2.5 Pro for best reasoning + higher rate limits
    // BEST FOR: Complex Layouts, Reasoning, Architecture
    main: "models/gemini-2.5-pro", 
    
    // High-speed/efficiency model (The "Nano Banana")
    // UPGRADED to Gemini 2.0 Flash for faster responses + higher limits
    // BEST FOR: Quick fixes, simple text, fast iterations
    fast: "models/gemini-2.0-flash",
    
    // Aliases for specific tasks
    complex_layout: "models/gemini-2.5-pro",
    nano_banana_3: "models/gemini-2.5-pro",
    
    // Fallbacks (if 2.x has issues)
    legacy_pro: "models/gemini-1.5-pro",
    legacy_flash: "models/gemini-1.5-flash"
  },
  
  // IMAGE GENERATION: Nano Banana 3 primary, Imagen 3 fallback
  imageGen: {
    primary: "gemini-2.0-flash-exp",      // Nano Banana 3 native image gen
    fallback: "imagen-3.0-generate-001",  // Imagen 3 for high-quality fallback
    location: "us-central1"
  },
  
  billing: {
    status: "verified",
    source: "Google Cloud Credits (My Billing Account 1)",
    api_key_ref: "GOOGLE_GEMINI_API",
    // Service account key should be stored as env var GOOGLE_APPLICATION_CREDENTIALS
    // NEVER commit service account JSON files to git!
    service_account_env: "GOOGLE_APPLICATION_CREDENTIALS"
  },
  arsenal: {
    grounding: { enabled: true, source: "google_search" },
    pipe: { enabled: true, path: "pipe/vibe_scanner.py" },
    voice: { enabled: true, path: "lib/antigravity-tts.js" },
    editor: { enabled: true, agent: "gemini-docs-agent" }
  },
  
  // Helper to ensure we always get the right model config
  getModel: (type = 'main') => {
    if (type === 'layout' || type === 'complex' || type === 'nano_banana_3') {
      return config.models.complex_layout;
    }
    return type === 'fast' ? config.models.fast : config.models.main;
  }
};

module.exports = config;
