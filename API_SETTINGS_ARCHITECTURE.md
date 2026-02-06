# 🏗️ API Settings Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER INTERFACE                           │
│                                                                 │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    │
│  │   Settings   │    │   Billing    │    │    Other     │    │
│  │    Modal     │    │     Page     │    │    Pages     │    │
│  └──────┬───────┘    └──────────────┘    └──────────────┘    │
│         │                                                       │
└─────────┼───────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────────┐
│                     FRONTEND LAYER                              │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              js/api-settings.js                          │  │
│  │                                                          │  │
│  │  • loadSettingsFromDB()                                 │  │
│  │  • saveSettingsToDB(settings)                           │  │
│  │  • updateSetting(key, value)                            │  │
│  │  • maskValue(value)                                     │  │
│  │  • Fallback to localStorage                             │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              js/app-main.js                              │  │
│  │                                                          │  │
│  │  • async loadSettings()                                 │  │
│  │  • async saveSettings()                                 │  │
│  │  • async displaySettingsInModal()                       │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────┬───────────────────────────────────────────────────────┘
          │
          │ HTTP/REST API
          │
          ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND LAYER                              │
│                       (server.js)                               │
│                                                                 │
│  ┌────────────────────────────────────────────────────────┐    │
│  │              API ENDPOINTS                             │    │
│  │                                                        │    │
│  │  GET    /api/settings          - Get all settings     │    │
│  │  GET    /api/settings/:key     - Get one setting      │    │
│  │  PUT    /api/settings/:key     - Update setting       │    │
│  │  POST   /api/settings/bulk     - Bulk update          │    │
│  │  DELETE /api/settings/:key     - Delete setting       │    │
│  └────────────────┬───────────────────────────────────────┘    │
│                   │                                             │
│                   ▼                                             │
│  ┌────────────────────────────────────────────────────────┐    │
│  │     db/repositories/apiSettingsRepository.js           │    │
│  │                                                        │    │
│  │  • getAll()                                           │    │
│  │  • getByKey(key)                                      │    │
│  │  • upsert(key, value, description)                    │    │
│  │  • update(key, value)                                 │    │
│  │  • delete(key)                                        │    │
│  │  • bulkUpdate(settings)                               │    │
│  │  • getAllAsObject()                                   │    │
│  └────────────────┬───────────────────────────────────────┘    │
│                   │                                             │
└───────────────────┼─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                    DATABASE LAYER                               │
│                    (PostgreSQL)                                 │
│                                                                 │
│  ┌────────────────────────────────────────────────────────┐    │
│  │              api_settings TABLE                        │    │
│  │                                                        │    │
│  │  Columns:                                             │    │
│  │  • id (SERIAL PRIMARY KEY)                            │    │
│  │  • setting_key (VARCHAR UNIQUE)                       │    │
│  │  • setting_value (TEXT)                               │    │
│  │  • description (TEXT)                                 │    │
│  │  • is_encrypted (BOOLEAN)                             │    │
│  │  • created_at (TIMESTAMP)                             │    │
│  │  • updated_at (TIMESTAMP)                             │    │
│  │                                                        │    │
│  │  Default Entries:                                     │    │
│  │  • openai_api_key                                     │    │
│  │  • twilio_account_sid                                 │    │
│  │  • twilio_auth_token                                  │    │
│  │  • twilio_phone_number                                │    │
│  │  • docusign_client_id                                 │    │
│  │  • docusign_client_secret                             │    │
│  │  • docusign_base_url                                  │    │
│  │  • sendgrid_api_key                                   │    │
│  │  • clearbit_api_key                                   │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Loading Settings (Page Load)

```
User Opens App
     │
     ▼
app-main.js: loadSettings()
     │
     ▼
api-settings.js: loadSettingsFromDB()
     │
     ▼
HTTP GET → /api/settings
     │
     ▼
apiSettingsRepository.getAll()
     │
     ▼
PostgreSQL: SELECT * FROM api_settings
     │
     ▼
Return as JSON object
     │
     ▼
Apply to AI_CONFIG, VOIP_CONFIG, etc.
     │
     ▼
Settings Loaded ✓
```

### 2. Saving Settings (User Clicks Save)

```
User Enters API Keys
     │
     ▼
User Clicks "Save"
     │
     ▼
app-main.js: saveSettings()
     │
     ▼
api-settings.js: saveSettingsToDB(settings)
     │
     ▼
HTTP POST → /api/settings/bulk
     │
     ▼
apiSettingsRepository.bulkUpdate(settings)
     │
     ▼
PostgreSQL: BEGIN TRANSACTION
     │
     ▼
For each setting:
  INSERT ... ON CONFLICT UPDATE
     │
     ▼
COMMIT TRANSACTION
     │
     ▼
Return success
     │
     ▼
Show "Settings saved!" alert
     │
     ▼
Reload settings from DB
```

### 3. Fallback Mechanism (DB Unavailable)

```
loadSettingsFromDB() fails
     │
     ▼
Catch error
     │
     ▼
Log warning: "Falling back to localStorage"
     │
     ▼
loadSettingsFromLocalStorage()
     │
     ▼
Read from localStorage
     │
     ▼
Return settings
     │
     ▼
App continues working ✓
```

## Security Layers

```
┌─────────────────────────────────────────┐
│   1. UI Layer                           │
│   • Masked display (sk-proj-****)       │
│   • Input validation                    │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│   2. Network Layer                      │
│   • HTTPS (in production)               │
│   • CORS protection                     │
│   • Rate limiting                       │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│   3. Application Layer                  │
│   • Input sanitization                  │
│   • Server-side validation              │
│   • Error handling                      │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│   4. Database Layer                     │
│   • Connection pooling                  │
│   • Prepared statements                 │
│   • Access control                      │
└─────────────────────────────────────────┘
```

## File Structure

```
msp-project-calendar/
│
├── Frontend
│   ├── index.html
│   ├── js/
│   │   ├── api-settings.js       ← API client
│   │   └── app-main.js           ← Uses api-settings
│   └── styles.css
│
├── Backend
│   ├── server.js                 ← API endpoints
│   └── db/
│       ├── connection.js         ← Pool connection
│       └── repositories/
│           └── apiSettingsRepository.js  ← Data access
│
├── Database
│   └── scripts/
│       ├── create-api-settings-table.sql
│       └── setup-api-settings.js
│
└── Documentation
    ├── SETUP_POSTGRESQL_API.md
    ├── API_SETTINGS_QUICKSTART.md
    ├── DATABASE_API_SETUP.md
    └── API_SETTINGS_ARCHITECTURE.md (this file)
```

## API Contract

### Request: Save Settings
```json
POST /api/settings/bulk
Content-Type: application/json

{
  "openai_api_key": "sk-proj-...",
  "twilio_account_sid": "AC...",
  "sendgrid_api_key": "SG..."
}
```

### Response: Success
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "setting_key": "openai_api_key",
      "setting_value": "sk-proj-...",
      "created_at": "2026-01-29T10:00:00.000Z",
      "updated_at": "2026-01-29T14:30:00.000Z"
    }
  ],
  "count": 3
}
```

### Response: Error
```json
{
  "success": false,
  "error": "Database connection failed"
}
```

## Deployment Considerations

### Development
- Use `.env` file (ignored by Git)
- localhost database
- Debug logging enabled

### Production
- Environment variables (not .env file)
- Remote PostgreSQL (RDS, Heroku, etc.)
- SSL/TLS for database connections
- HTTPS for API endpoints
- Production logging (errors only)

### GitHub Spaces
- Set environment variables in Spaces settings
- Use connection pooling (already configured)
- Enable CORS for your domain
- Monitor rate limits

## Benefits

1. **Centralized**: All API keys in one place
2. **Secure**: Not in browser storage or Git
3. **Scalable**: Database-backed, not localStorage
4. **Team-friendly**: Shared across team members
5. **Backup-friendly**: Included in database backups
6. **Audit-ready**: Timestamps track changes

## Future Enhancements

- [ ] Add encryption at rest for sensitive values
- [ ] Implement API key rotation
- [ ] Add audit logging for all changes
- [ ] Create admin interface for key management
- [ ] Add role-based access control
- [ ] Implement key expiration dates
- [ ] Add key usage tracking
- [ ] Create backup/restore functionality



