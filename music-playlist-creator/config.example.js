// =============================================================================
// API CONFIGURATION EXAMPLE
// =============================================================================
//
// This is an EXAMPLE file showing the structure.
// To use:
// 1. Copy this file to 'config.js' (in the same directory)
// 2. Get your free OpenRouter API key from: https://openrouter.ai/keys
// 3. Replace 'YOUR_OPENROUTER_API_KEY_HERE' with your actual API key
// 4. Save config.js (it won't be committed to git)
//
// =============================================================================

const CONFIG = {
    OPENROUTER_API_KEY: 'YOUR_OPENROUTER_API_KEY_HERE',

    // API Configuration
    OPENROUTER_API_URL: 'https://openrouter.ai/api/v1/chat/completions',
    MODEL: 'google/gemma-2-9b-it:free',  // Free Gemma 2 9B model
    // Alternative free model: 'meta-llama/llama-3.2-3b-instruct:free'

    // Request settings
    MAX_TOKENS: 200,
    TIMEOUT_MS: 10000  // 10 second timeout
};
