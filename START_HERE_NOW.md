# 🚀 START HERE - Quick Setup Guide

## What's Been Added

1. **📊 New Billing Page** - Hierarchical billing overview with months/companies/services
2. **🗄️ PostgreSQL API Storage** - Secure database storage for all API keys

---

## ⚡ Quick Start (2 Steps)

### Step 1: Setup the Database
```bash
npm run db:setup-api
```

**Note**: If this fails, you need to:
1. Install PostgreSQL (if not already installed)
2. Create a `.env` file with your database credentials (see below)

### Step 2: Start the Server
```bash
npm start
```

Then open: **http://localhost:8000**

---

## 🔧 If Database Setup Fails

### Create `.env` file in the root directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=msp_calendar_dev
DB_USER=postgres
DB_PASSWORD=your_postgres_password

# Server Configuration
PORT=8000
HOST=localhost
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:8000
```

### Create the database:
```bash
# Connect to PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE msp_calendar_dev;

# Exit
\q
```

### Run setup again:
```bash
npm run db:setup-api
```

---

## 📋 What You Can Do Now

### 1. View the New Billing Page
- Open the app
- Click **"Billing"** in the sidebar
- See hierarchical billing data:
  - Monthly totals
  - Company breakdowns
  - Service details with Qty/Each/Total

### 2. Store API Keys Securely
- Click **⚙️ Settings** in the header
- Add your API keys:
  - OpenAI
  - Twilio
  - DocuSign
  - SendGrid
  - Clearbit
- Click **Save**
- Keys are now in PostgreSQL (not localStorage!)

### 3. Verify It Works
- Refresh the page
- Click Settings again
- Your keys should still be there (masked for security)

---

## 🔍 Verify Database

```bash
# Connect to your database
psql -U postgres -d msp_calendar_dev

# Check the table
SELECT * FROM api_settings;

# Exit
\q
```

---

## 📚 Documentation

- **`SETUP_POSTGRESQL_API.md`** - Full setup guide
- **`COMPLETED_FEATURES.md`** - What's been built
- **`API_SETTINGS_QUICKSTART.md`** - Quick reference

---

## ❓ Troubleshooting

### "Cannot find module 'pg'"
```bash
npm install
```

### "Database connection failed"
- Check if PostgreSQL is running
- Verify `.env` file has correct password
- Make sure database exists: `psql -U postgres -l`

### "Port 8000 already in use"
- Stop other server: `Ctrl + C` in the terminal
- Or change port in `.env` file

### Billing page not showing new design
- Hard refresh: **`Ctrl + Shift + R`** (Windows/Linux) or **`Cmd + Shift + R`** (Mac)

---

## ✅ You're Done!

Once the server is running and the database is set up, you're ready to go!

**Open http://localhost:8000 and explore the new features!** 🎉



