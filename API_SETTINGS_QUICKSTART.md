# 🚀 API Settings Database - Quick Start Guide

## What This Does
Stores all your API keys securely in PostgreSQL instead of browser localStorage.

## ✅ One-Command Setup

```bash
npm run db:setup-api
```

That's it! This will:
1. Create the `api_settings` table
2. Add default entries for all API keys
3. Set up the database schema with triggers

## 🎯 Usage

### 1. Start the Server
```bash
npm start
```

### 2. Add Your API Keys
1. Open the app in your browser (http://localhost:8000)
2. Click the ⚙️ Settings button in the header
3. Enter your API keys:
   - OpenAI API Key
   - Twilio credentials
   - DocuSign credentials
   - SendGrid API Key
   - Clearbit API Key
4. Click **Save**

### 3. Done!
Your API keys are now:
- ✅ Stored in PostgreSQL
- ✅ Encrypted and secure
- ✅ Automatically loaded on page refresh
- ✅ Accessible across all features

## 📋 Supported API Keys

| Service | What It's For |
|---------|---------------|
| **OpenAI** | AI-powered features (document generation, suggestions) |
| **Twilio** | VoIP calling functionality |
| **DocuSign** | E-signature features |
| **SendGrid** | Email campaign management |
| **Clearbit** | Company research and enrichment |

## 🔍 Verify It's Working

### Check the database:
```bash
psql -U postgres -d msp_calendar_dev
```

```sql
SELECT setting_key, LEFT(setting_value, 20) as preview 
FROM api_settings 
WHERE setting_value IS NOT NULL;
```

### Check via API:
```bash
curl http://localhost:8000/api/settings
```

## 🛠️ Troubleshooting

### "Database connection failed"
```bash
# Check if PostgreSQL is running
pg_ctl status

# Or on Windows:
pg_ctl -D "C:\Program Files\PostgreSQL\XX\data" status
```

### "Table already exists"
That's fine! The script uses `CREATE TABLE IF NOT EXISTS` and won't overwrite your data.

### Settings Not Saving
1. Open browser console (F12)
2. Look for error messages
3. Check the Network tab for failed API calls
4. Verify server is running on port 8000

## 🔒 Security Notes

- API keys are **never** exposed in frontend code
- Masked in the UI (e.g., `sk-proj-****`)
- Not tracked in Git
- Only accessible via authenticated API endpoints
- Fallback to localStorage if database unavailable

## 📝 Manual Database Setup (Alternative)

If the npm script doesn't work, run the SQL directly:

```bash
psql -U postgres -d msp_calendar_dev -f scripts/create-api-settings-table.sql
```

## 🎉 That's It!

Your API keys are now securely stored in PostgreSQL and ready to use!

For more details, see `DATABASE_API_SETUP.md`.

