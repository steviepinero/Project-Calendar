// API Configuration Example
// Copy this file to config.js and add your actual API keys
// config.js is gitignored for security - DO NOT commit config.js to version control

const CONFIG = {
    // OpenAI API Key for AI summarization
    // Get your key from: https://platform.openai.com/api-keys
    OPENAI_API_KEY: 'sk-YOUR_OPENAI_API_KEY_HERE',
    // Gemini API Key for company intelligence summaries
    // Get your key from: https://aistudio.google.com/apikey
    GEMINI_API_KEY: 'YOUR_GEMINI_API_KEY_HERE'
};

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.CONFIG = CONFIG;
}





