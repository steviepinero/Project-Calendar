# Deployment & Production Guide

This guide covers everything needed to deploy the MSP Project Calendar to production.

---

## 📋 Pre-Deployment Checklist

### Security
- [ ] Remove all test/dummy data
- [ ] Enable HTTPS only
- [ ] Set up `.gitignore` properly
- [ ] Review all API keys and credentials
- [ ] Enable input validation and sanitization
- [ ] Set up CORS headers correctly
- [ ] Implement rate limiting on APIs

### Testing
- [ ] Test all features in a staging environment
- [ ] Verify mobile responsiveness
- [ ] Test cross-browser compatibility
- [ ] Performance test with realistic data volume
- [ ] Test API integrations with real credentials
- [ ] Security audit and penetration testing
- [ ] User acceptance testing with team

### Documentation
- [ ] Create user documentation
- [ ] Document admin procedures
- [ ] Create troubleshooting guides
- [ ] Document API integrations
- [ ] Create disaster recovery plan

### Performance
- [ ] Optimize images and assets
- [ ] Minify CSS and JavaScript
- [ ] Enable gzip compression
- [ ] Set up CDN for static files
- [ ] Implement browser caching
- [ ] Monitor API response times

---

## 🚀 Deployment Steps

### Step 1: Prepare Environment

```bash
# Create a production branch
git checkout -b production
git push origin production

# Verify .gitignore exists and is correct
cat .gitignore
```

### Step 2: Environment Variables

Create a `.env` file (DO NOT commit to Git):

```env
# Twilio
TWILIO_ACCOUNT_SID=your_sid_here
TWILIO_AUTH_TOKEN=your_token_here
TWILIO_PHONE_NUMBER=+1234567890

# DocuSign
DOCUSIGN_CLIENT_ID=your_client_id
DOCUSIGN_CLIENT_SECRET=your_secret
DOCUSIGN_BASE_URL=https://demo.docusign.net

# SendGrid
SENDGRID_API_KEY=your_api_key

# OpenAI
OPENAI_API_KEY=your_api_key

# Application
APP_ENV=production
APP_DEBUG=false
LOG_LEVEL=info
```

### Step 3: Database/Storage Setup

If using backend storage:

```bash
# Set up database
npm run db:migrate
npm run db:seed

# Configure backups
# - Daily backups to S3 or similar
# - Keep 30-day retention
# - Test restore procedures
```

### Step 4: API Configuration

#### OpenAI Setup:
```javascript
// Already configured via localStorage in settings
// But for backend integration:
const openaiClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
```

#### Twilio Setup:
```javascript
const twilio = require('twilio');
const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);
```

#### DocuSign Setup:
```javascript
// Requires OAuth implementation
// See: https://developers.docusign.com/docs/esign-rest-api/oauth2/
```

### Step 5: Deploy to Hosting

#### Option A: Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Set environment variables in Vercel dashboard
```

#### Option B: Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod

# Set environment variables in Netlify dashboard
```

#### Option C: Docker
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8000

CMD ["npm", "start"]
```

```bash
# Build and push
docker build -t msp-calendar:1.0 .
docker run -p 8000:8000 msp-calendar:1.0
```

#### Option D: Traditional Server (AWS, Azure, DigitalOcean)

```bash
# SSH into server
ssh ubuntu@your-server-ip

# Install dependencies
sudo apt update
sudo apt install -y nodejs npm nginx

# Clone repository
git clone https://github.com/yourname/msp-calendar.git
cd msp-calendar

# Install packages
npm install

# Configure nginx
sudo nano /etc/nginx/sites-available/default
# Configure reverse proxy to localhost:8000

# Start application
npm start

# Use PM2 for process management
npm install -g pm2
pm2 start app.js
pm2 startup
pm2 save
```

### Step 6: SSL/TLS Certificate

```bash
# Using Let's Encrypt (Certbot)
sudo apt install certbot python3-certbot-nginx

sudo certbot certonly --nginx -d yourdomain.com

# Auto-renew
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

### Step 7: Monitoring & Logging

```javascript
// Add error logging
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

// Send logs to external service
// - Sentry for error tracking
// - LogRocket for session replay
// - DataDog for comprehensive monitoring
```

### Step 8: Database Backup

```bash
# Set up automated backups
0 2 * * * /usr/local/bin/backup-db.sh

# Test restore procedures monthly
/usr/local/bin/restore-db.sh --test
```

---

## 🔒 Security Hardening

### API Security
```javascript
// Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use(limiter);

// CORS
const cors = require('cors');
app.use(cors({
    origin: 'https://yourdomain.com',
    methods: ['GET', 'POST'],
    credentials: true
}));

// Helmet for security headers
const helmet = require('helmet');
app.use(helmet());
```

### API Key Management
```javascript
// Use environment variables
const apiKey = process.env.TWILIO_AUTH_TOKEN;

// Rotate keys regularly (monthly)
// Implement key versioning
// Store in secure vault (AWS Secrets Manager, Vault, etc.)

// Never log API keys
console.log('❌ WRONG:', apiKey); // Don't do this
console.log('✅ RIGHT:', 'API key configured');
```

### Database Security
```sql
-- Use strong passwords
CREATE USER production_user WITH PASSWORD 'strong_random_password_32_chars';

-- Limit permissions
GRANT SELECT, INSERT, UPDATE ON * TO production_user;
REVOKE DELETE ON * FROM production_user;

-- Enable encryption at rest
ALTER TABLE sensitive_data ENCRYPTION = 'AES256';
```

---

## 📊 Monitoring & Alerts

### Key Metrics to Monitor
1. **API Response Time** - Alert if > 2 seconds
2. **Error Rate** - Alert if > 1%
3. **Uptime** - Alert if < 99.9%
4. **CPU Usage** - Alert if > 80%
5. **Memory Usage** - Alert if > 85%
6. **Database Connections** - Alert if > 90% of pool
7. **Failed Logins** - Alert if > 5 in 5 minutes
8. **API Usage** - Track costs for third-party APIs

### Setup Monitoring
```bash
# Using PM2 Plus
pm2 install pm2-logrotate
pm2 link

# Using DataDog
npm install datadog-browser-rum
```

---

## 🔄 Continuous Deployment

### GitHub Actions Example

```yaml
name: Deploy to Production

on:
  push:
    branches: [production]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build

      - name: Deploy
        run: |
          ssh-keyscan -H ${{ secrets.DEPLOY_HOST }} >> ~/.ssh/known_hosts
          scp -r dist/* ${{ secrets.DEPLOY_USER }}@${{ secrets.DEPLOY_HOST }}:/var/www/html/

      - name: Notify Slack
        if: always()
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          text: 'Production deployment complete'
```

---

## 🆘 Troubleshooting

### Issue: High Memory Usage
```bash
# Check processes
top

# Increase Node heap
NODE_OPTIONS=--max_old_space_size=4096 npm start

# Profile with clinic
npm install clinic
clinic doctor -- node app.js
```

### Issue: API Timeouts
```javascript
// Increase timeout
const axios = require('axios');
const instance = axios.create({
    timeout: 30000 // 30 seconds
});
```

### Issue: Database Connection Errors
```bash
# Check database status
nc -zv database.example.com 5432

# View connection pool stats
SELECT * FROM pg_stat_activity;

# Increase pool size if needed
pool: new Pool({
    max: 50,
    idleTimeoutMillis: 30000,
})
```

---

## 📋 Post-Deployment

### Day 1:
- [ ] Verify all pages load correctly
- [ ] Test user login/authentication
- [ ] Confirm email sending works
- [ ] Test API integrations
- [ ] Monitor error logs

### Week 1:
- [ ] Monitor system performance
- [ ] Gather user feedback
- [ ] Fix any critical issues
- [ ] Document any changes needed

### Ongoing:
- [ ] Weekly backup verification
- [ ] Monthly security audit
- [ ] Quarterly performance optimization
- [ ] API usage cost tracking

---

## 📞 Emergency Procedures

### Site Down
1. Check server status
2. Check API provider status pages
3. Review error logs
4. Restart application
5. Rollback if necessary
6. Notify users via status page

### Data Breach
1. Take system offline if necessary
2. Assess scope of breach
3. Notify affected users
4. Reset compromised API keys
5. Implement additional security measures
6. Document incident

### API Provider Outage
1. Enable read-only mode if possible
2. Use cached data where available
3. Notify users with estimated recovery time
4. Failover to backup provider if available

---

## 🔗 Useful Resources

- [Node.js Production Best Practices](https://nodejs.org/en/docs/guides/nodejs-performance/)
- [OWASP Security Checklists](https://owasp.org/www-project-web-security-testing-guide/)
- [12 Factor App](https://12factor.net/)
- [Kubernetes Deployment](https://kubernetes.io/docs/concepts/workloads/)

---

**Last Updated:** January 20, 2026  
**Version:** 1.0

