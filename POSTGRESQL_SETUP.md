# PostgreSQL Database Setup Guide

This guide will help you set up PostgreSQL for the MSP Project Calendar application.

## 📋 Prerequisites

- PostgreSQL 12+ installed
- Node.js 14+ installed
- npm or yarn package manager

## 🔧 Installation

### 1. Install PostgreSQL

**Windows:**
```bash
# Download from https://www.postgresql.org/download/windows/
# Or use Chocolatey
choco install postgresql
```

**macOS:**
```bash
# Using Homebrew
brew install postgresql
brew services start postgresql
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### 2. Create Database User

```bash
# Connect to PostgreSQL
psql -U postgres

# Create a new user
CREATE ROLE msp_user WITH LOGIN PASSWORD 'your_secure_password';

# Grant privileges
ALTER ROLE msp_user CREATEDB;
```

### 3. Setup Environment Variables

```bash
# Copy the example file
cp env.example .env

# Edit .env with your database credentials
DB_HOST=localhost
DB_PORT=5432
DB_NAME=msp_calendar_dev
DB_USER=msp_user
DB_PASSWORD=your_secure_password
```

### 4. Install Dependencies

```bash
# Install npm packages
npm install
```

### 5. Initialize Database

```bash
# Run the initialization script
npm run db:init
```

This will create:
- ✅ Database `msp_calendar_dev`
- ✅ All required tables
- ✅ Indexes for performance
- ✅ Foreign key relationships

## 📊 Database Schema

### Tables Created

| Table | Purpose |
|-------|---------|
| **users** | System users and authentication |
| **team_members** | MSP team members and staff |
| **projects** | Scheduling and projects |
| **tasks** | Project subtasks |
| **call_history** | VoIP call logs |
| **contacts** | Phone/email contacts |
| **email_campaigns** | Email campaign data |
| **e_signature_documents** | Signed documents |
| **network_mac_addresses** | Network device MAC list |
| **hardware_inventory** | Hardware asset tracking |
| **settings** | API credentials and config |
| **activity_logs** | User activity audit trail |

### Relationships

```
users
├── team_members (1:N)
├── settings (1:N)
└── activity_logs (1:N)

projects
├── team_members (N:1 via assigned_to)
└── tasks (1:N)

tasks
└── team_members (N:1 via assigned_to)
```

## 🚀 Running the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server will start on `http://localhost:8000`

## 📝 Available Scripts

```bash
# Initialize database
npm run db:init

# Run migrations
npm run db:migrate

# Seed sample data
npm run db:seed

# Start development server
npm run dev

# Start production server
npm start

# Run tests
npm test
```

## 🔌 API Endpoints

### Projects
```
GET  /api/projects              - List all projects
GET  /api/projects/:id          - Get project details
GET  /api/projects-with-team    - Get projects with team info
POST /api/projects              - Create project
PUT  /api/projects/:id          - Update project
DELETE /api/projects/:id        - Delete project
GET  /api/projects/range        - Get by date range
```

### Team Members
```
GET  /api/team-members          - List all team members
POST /api/team-members          - Add team member
```

### Call History
```
GET  /api/calls                 - Get call history
POST /api/calls                 - Log a call
```

### Health Check
```
GET  /api/health                - Server health status
```

## 📦 Data Persistence

All data is now persisted in PostgreSQL:

### Before (Browser localStorage)
- Data lost on browser clear
- Single device only
- Limited storage (~5-10MB)

### After (PostgreSQL)
- ✅ Persistent across sessions
- ✅ Multi-device access
- ✅ No size limits
- ✅ Secure server storage
- ✅ Backup capable
- ✅ Query-able and reportable

## 🛡️ Security Best Practices

1. **Environment Variables**
   - Never commit `.env` file
   - Use strong passwords
   - Rotate credentials regularly

2. **Database User**
   - Use least-privilege principle
   - Create separate users for different apps
   - Use role-based access control

3. **Connection Pooling**
   - Automatically managed by pg library
   - Min: 2, Max: 10 connections
   - Configurable via environment

4. **Encryption**
   - Use SSL/TLS for production
   - Encrypt sensitive data (API keys, tokens)
   - Hash passwords with bcrypt

## 🔄 Backup & Recovery

### Backup
```bash
# Backup entire database
pg_dump -U msp_user msp_calendar_dev > backup.sql

# Backup to compressed file
pg_dump -U msp_user -Fc msp_calendar_dev > backup.dump
```

### Restore
```bash
# From SQL backup
psql -U msp_user msp_calendar_dev < backup.sql

# From compressed backup
pg_restore -U msp_user -d msp_calendar_dev backup.dump
```

### Automated Backups
```bash
# Add to cron (Linux/macOS)
0 2 * * * /usr/bin/pg_dump -U msp_user msp_calendar_dev > /backups/msp_$(date +\%Y\%m\%d).sql

# Windows Task Scheduler
# Create scheduled task to run backup batch file
```

## 🧪 Testing Database Connection

```bash
# From Node.js REPL
node -e "require('pg').Client; console.log('✅ pg module loaded')"

# Test connection
npm run dev
# Check console for "✅ Database connection successful"
```

## 🐛 Troubleshooting

### "Role does not exist"
```bash
# Create the role
psql -U postgres -c "CREATE ROLE msp_user WITH LOGIN PASSWORD 'password';"
```

### "Database does not exist"
```bash
# Run initialization
npm run db:init
```

### "Connection refused"
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql  # Linux
brew services list               # macOS
# Or ensure PostgreSQL is started
```

### "Too many connections"
```bash
# Increase max_connections in postgresql.conf
# On Linux: /etc/postgresql/12/main/postgresql.conf
# Restart PostgreSQL after changing
```

## 📚 Additional Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Node pg Documentation](https://node-postgres.com/)
- [PostgreSQL Best Practices](https://wiki.postgresql.org/wiki/Performance_Optimization)

## ✅ Verification Checklist

After setup, verify:
- [ ] PostgreSQL installed and running
- [ ] Database `msp_calendar_dev` created
- [ ] User `msp_user` has correct permissions
- [ ] `.env` file configured correctly
- [ ] Dependencies installed (`npm install`)
- [ ] Database initialized (`npm run db:init`)
- [ ] Server starts without errors (`npm run dev`)
- [ ] API endpoints respond (`curl http://localhost:8000/api/health`)
- [ ] Data persists after page reload

## 🎉 You're Ready!

Your MSP Project Calendar now has a full PostgreSQL backend. All data will be persisted securely in the database.

Next steps:
1. [Update frontend to use API endpoints](./API_INTEGRATION_GUIDE.md)
2. [Deploy to production](./DEPLOYMENT_GUIDE.md)
3. [Set up backups](./POSTGRESQL_SETUP.md#backup--recovery)








