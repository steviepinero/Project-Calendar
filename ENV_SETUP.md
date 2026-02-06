# 🔐 Sensitive Configuration Guide

## ⚠️ IMPORTANT: Protecting Your API Keys

Never commit API keys or sensitive credentials to Git! This guide shows you how to safely manage them.

### How the AI Summarization Feature Works

The app stores your OpenAI API key **locally in your browser's localStorage**, not in any file. This means:
- ✅ Your key is never sent to our servers
- ✅ Your key is never stored in files
- ✅ Your key is never committed to Git
- ✅ Only your browser can access it

### Setup Instructions

1. **Get Your OpenAI API Key**
   - Visit https://platform.openai.com/api-keys
   - Create a new secret key
   - Copy the entire key (starts with `sk-proj-`)

2. **Add the Key in the App**
   - Click ⚙️ **Settings** button in the header
   - Paste your API key in the "OpenAI API Key" field
   - Click "Save Settings"
   - The key is saved to your browser's localStorage

3. **Verify It's Safe**
   - Open browser DevTools (F12)
   - Go to Application → Storage → Local Storage
   - Look for `openai_api_key` entry
   - Only exists on your local browser, not in any files!

### Future Features & API Keys

When we add more features (email campaigns, company research, VoIP, etc.), follow the same pattern:
- **Never store keys in code**
- **Use the Settings modal** to configure them
- **Browser localStorage** keeps them private

### If Your Key Gets Exposed

1. **Immediately deactivate it** at https://platform.openai.com/api-keys
2. **Create a new key**
3. **Update your Settings** in the app

### Development Best Practices

If you're building additional features:

```javascript
// ❌ DON'T DO THIS (Security Risk!)
const API_KEY = "sk-proj-actual-key-here";

// ✅ DO THIS INSTEAD
const API_KEY = localStorage.getItem('openai_api_key');

// ✅ OR USE SETTINGS MODAL
function setupFeatureSettings() {
    const apiKey = localStorage.getItem('feature_api_key');
    if (!apiKey) {
        alert('Please configure this feature in Settings');
        return;
    }
}
```

### Additional Security Tips

- Use **separate API keys** for different purposes (one for dev, one for prod)
- Use **restrictive permissions** when generating keys (if the API supports it)
- **Rotate keys regularly** (e.g., monthly)
- **Monitor usage** at your API provider's dashboard for suspicious activity
- **Use rate limiting** if your API allows it

---

**Questions?** If you need to add another API key to the settings, just update `setupSettingsEventListeners()` in `app.js` to add another input field!





