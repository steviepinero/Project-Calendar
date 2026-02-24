# PostgreSQL API Settings Database Setup

## Overview
This setup stores all API keys in PostgreSQL instead of localStorage, providing better security and centralized management.

## 📦 Files Created

### 1. Database Schema
**`scripts/create-api-settings-table.sql`**
- Creates `api_settings` table
- Stores API keys with metadata
- Includes automatic `updated_at` trigger
- Pre-populates default API key entries

### 2. Repository Layer
**`db/repositories/apiSettingsRepository.js`**
- `getAll()` - Get all settings
- `getByKey(key)` - Get specific setting
- `upsert(key, value, description)` - Create or update
- `update(key, value)` - Update value
- `delete(key)` - Delete setting
- `bulkUpdate(settings)` - Update multiple settings at once
- `getAllAsObject()` - Get settings as key-value object
- `maskValue(value)` - Mask sensitive values for display

### 3. API Endpoints
**Added to `server.js`:**
- `GET /api/settings` - Get all API settings as object
- `GET /api/settings/:key` - Get specific setting by key
- `PUT /api/settings/:key` - Update a single setting
- `POST /api/settings/bulk` - Bulk update multiple settings
- `DELETE /api/settings/:key` - Delete a setting

### 4. Frontend Module
**`js/api-settings.js`**
- `loadSettingsFromDB()` - Load from database
- `saveSettingsToDB(settings)` - Save to database
- `updateSetting(key, value)` - Update single setting
- `maskValue(value)` - Mask for display
- Fallback to localStorage if database unavailable

### 5. Updated Application Logic
**`js/app-main.js`**
- Changed `loadSettings()` to async, loads from database
- Changed `saveSettings()` to async, saves to database
- Changed `displaySettingsInModal()` to async, uses database values
- Filters out masked values when saving (doesn't overwrite with `***`)

## 🚀 Setup Instructions

### Step 1: Create the Database Table
Run the SQL script to create the table:

```bash
# Option 1: Using psql command line
psql -U postgres -d msp_calendar_dev -f scripts/create-api-settings-table.sql

# Option 2: Using Node.js script (create this if needed)
node -e "const pool = require('./db/connection'); const fs = require('fs'); const sql = fs.readFileSync('./scripts/create-api-settings-table.sql', 'utf8'); pool.query(sql).then(() => { console.log('✅ Table created'); process.exit(); }).catch(err => { console.error('❌ Error:', err); process.exit(1); });"
```

### Step 2: Ensure Database Connection
Make sure your `.env` file has the correct database credentials:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=msp_calendar_dev
DB_USER=postgres
DB_PASSWORD=your_password
DB_POOL_MIN=2
DB_POOL_MAX=10
```

### Step 3: Start the Server
```bash
npm start
# or for development with auto-restart:
npm run dev
```

### Step 4: Test the Setup
1. Open your application in the browser
2. Click the Settings button
3. Enter API keys
4. Click Save
5. Refresh the page - settings should persist from database

## 🔍 Verification

### Check if table exists:
```sql
\dt api_settings
```

### View all settings:
```sql
SELECT * FROM api_settings;
```

### Check specific setting:
```sql
SELECT * FROM api_settings WHERE setting_key = 'openai_api_key';
```

## 📊 API Keys Stored

| Key Name | Description |
|----------|-------------|
| `openai_api_key` | OpenAI API key for AI features |
| `twilio_account_sid` | Twilio Account SID for VoIP |
| `twilio_auth_token` | Twilio Auth Token for VoIP |
| `twilio_phone_number` | Twilio phone number |
| `docusign_client_id` | DocuSign Client ID for e-signature |
| `docusign_client_secret` | DocuSign Client Secret |
| `docusign_base_url` | DocuSign base URL |
| `sendgrid_api_key` | SendGrid API key for email campaigns |
| `clearbit_api_key` | Clearbit API key for company research |

## 🔒 Security Features

1. **No Git Tracking**: API keys stored in database, not in code
2. **Masked Display**: Keys are masked in the UI (e.g., `sk-proj-****`)
3. **Fallback**: If database is unavailable, falls back to localStorage
4. **Validation**: Only non-masked values are saved
5. **Server-side**: API keys never exposed in frontend code

## 🔄 Migration from localStorage

If you have existing API keys in localStorage, they will be used as fallback. To migrate:

1. Open the Settings modal
2. Your existing keys will load from localStorage
3. Click Save - they will be saved to the database
4. Future loads will come from the database

## 📝 Example API Usage

### Frontend (JavaScript)
```javascript
// Load settings
const settings = await window.ApiSettings.loadSettingsFromDB();
console.log(settings.openai_api_key);

// Save settings
await window.ApiSettings.saveSettingsToDB({
    openai_api_key: 'sk-...',
    twilio_account_sid: 'AC...'
});

// Update single setting
await window.ApiSettings.updateSetting('openai_api_key', 'sk-...');
```

### Backend (REST API)
```javascript
// Get all settings
fetch('/api/settings')
    .then(res => res.json())
    .then(data => console.log(data));

// Update single setting
fetch('/api/settings/openai_api_key', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ value: 'sk-...' })
});

// Bulk update
fetch('/api/settings/bulk', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        openai_api_key: 'sk-...',
        twilio_account_sid: 'AC...'
    })
});
```

## 🛠️ Troubleshooting

### "Database connection failed"
- Check your `.env` file
- Ensure PostgreSQL is running
- Verify database exists: `psql -U postgres -l`

### "Table does not exist"
- Run the SQL script again
- Check connection: `psql -U postgres -d msp_calendar_dev`

### Settings not persisting
- Check browser console for errors
- Verify server is running
- Check network tab for API calls
- Verify database table has data: `SELECT * FROM api_settings;`

### "Settings saved to localStorage as backup"
- This means database save failed
- Settings will work but won't sync across devices
- Fix database connection issue

## ✅ Complete!

Your API keys are now securely stored in PostgreSQL!






