# 🗄️ PostgreSQL API Settings Setup Complete!

## ✅ What Was Created

### 1. **Database Schema**
- `scripts/create-api-settings-table.sql` - SQL script to create the table
- `scripts/setup-api-settings.js` - Node.js script to run the setup

### 2. **Repository Layer**
- `db/repositories/apiSettingsRepository.js` - CRUD operations for API settings

### 3. **API Endpoints** (in `server.js`)
- `GET /api/settings` - Get all settings
- `GET /api/settings/:key` - Get specific setting
- `PUT /api/settings/:key` - Update single setting
- `POST /api/settings/bulk` - Bulk update
- `DELETE /api/settings/:key` - Delete setting

### 4. **Frontend Module**
- `js/api-settings.js` - Frontend API client with fallback to localStorage

### 5. **Updated Files**
- `js/app-main.js` - Now uses database instead of localStorage
- `index.html` - Added api-settings.js script
- `package.json` - Added `db:setup-api` command

## 🚀 Quick Start

### Step 1: Configure Database
Create or update your `.env` file with PostgreSQL credentials:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=msp_calendar_dev
DB_USER=postgres
DB_PASSWORD=your_password
```

### Step 2: Create the Database (if it doesn't exist)
```bash
# Windows (using psql)
psql -U postgres -c "CREATE DATABASE msp_calendar_dev;"

# Or connect to postgres and run:
# CREATE DATABASE msp_calendar_dev;
```

### Step 3: Run the Setup Script
```bash
npm run db:setup-api
```

This will create the `api_settings` table and populate it with default entries.

### Step 4: Start the Server
```bash
npm start
```

### Step 5: Add Your API Keys
1. Open http://localhost:8000
2. Click the ⚙️ Settings button
3. Enter your API keys
4. Click Save

## 📋 API Keys Stored

The database will store these API keys:

| Key | Purpose |
|-----|---------|
| `openai_api_key` | OpenAI for AI features |
| `twilio_account_sid` | Twilio for VoIP |
| `twilio_auth_token` | Twilio authentication |
| `twilio_phone_number` | Your Twilio phone number |
| `docusign_client_id` | DocuSign for e-signatures |
| `docusign_client_secret` | DocuSign authentication |
| `docusign_base_url` | DocuSign API endpoint |
| `sendgrid_api_key` | SendGrid for emails |
| `clearbit_api_key` | Clearbit for company research |

## 🔍 Verify Setup

### Check if PostgreSQL is running:
```bash
# Windows
pg_ctl status

# Or try connecting:
psql -U postgres
```

### Verify the table was created:
```bash
psql -U postgres -d msp_calendar_dev
```

```sql
\dt api_settings

SELECT * FROM api_settings;
```

### Test the API:
```bash
curl http://localhost:8000/api/settings
```

## 🛠️ Troubleshooting

### "Cannot find module 'pg'"
Run: `npm install`

### "Database connection failed"
1. Check if PostgreSQL is installed and running
2. Verify your `.env` file has correct credentials
3. Try connecting manually: `psql -U postgres`

### "Database does not exist"
Create it:
```bash
psql -U postgres -c "CREATE DATABASE msp_calendar_dev;"
```

### "ECONNREFUSED"
PostgreSQL is not running. Start it:
```bash
# Windows
pg_ctl -D "C:\Program Files\PostgreSQL\16\data" start
```

## 🔒 Security Features

- ✅ API keys stored in PostgreSQL, not browser
- ✅ Masked in the UI (e.g., `sk-proj-****`)
- ✅ Not tracked in Git (.env is ignored)
- ✅ Automatic fallback to localStorage if DB unavailable
- ✅ Server-side validation and sanitization

## 📝 Usage Example

### Frontend (JavaScript)
```javascript
// Load all settings
const settings = await window.ApiSettings.loadSettingsFromDB();

// Save settings
await window.ApiSettings.saveSettingsToDB({
    openai_api_key: 'sk-...',
    twilio_account_sid: 'AC...'
});

// Update single setting
await window.ApiSettings.updateSetting('openai_api_key', 'sk-...');
```

### Backend API (REST)
```javascript
// Get all settings
fetch('/api/settings').then(res => res.json());

// Update setting
fetch('/api/settings/openai_api_key', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ value: 'sk-...' })
});
```

## ✨ Benefits

1. **Centralized Storage** - All API keys in one secure location
2. **Team Sync** - Keys available to entire team (when deployed)
3. **Backup & Recovery** - Database backups include API keys
4. **Audit Trail** - Track when keys are updated
5. **Environment Separation** - Different keys for dev/staging/prod

## 📚 Additional Resources

- **Detailed Guide**: See `DATABASE_API_SETUP.md`
- **Quick Reference**: See `API_SETTINGS_QUICKSTART.md`
- **PostgreSQL Docs**: https://www.postgresql.org/docs/

## ✅ You're All Set!

Your API keys are now securely stored in PostgreSQL and ready to use throughout the application!

For questions or issues, check the troubleshooting section above.






