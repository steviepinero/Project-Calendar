# Complete API Integration Guide

This guide provides step-by-step instructions for integrating all external APIs with the MSP Project Calendar.

---

## 📚 Table of Contents

1. [OpenAI API - AI Summarization](#openai-api---ai-summarization)
2. [Twilio API - VoIP Calling](#twilio-api---voip-calling)
3. [DocuSign API - E-Signature](#docusign-api---e-signature)
4. [SendGrid API - Email Campaigns](#sendgrid-api---email-campaigns)
5. [Company Research APIs](#company-research-apis)
6. [Backend Integration Architecture](#backend-integration-architecture)

---

## 🤖 OpenAI API - AI Summarization

### 1. Create Developer Account

1. Visit https://platform.openai.com/signup
2. Create account with email and password
3. Verify email address
4. Accept terms and conditions

### 2. Create API Key

1. Go to https://platform.openai.com/api-keys
2. Click **Create new secret key**
3. Name it "MSP Calendar Production"
4. Copy the key (only shown once!)
5. Store securely in password manager

### 3. Add to Application

**Via Settings UI:**
1. Click **⚙️ Settings** in the top right
2. Paste API key in "OpenAI API Key" field
3. Click **Save Settings**
4. Key saved to browser localStorage

**Via Environment Variable:**
```bash
export OPENAI_API_KEY=sk-your-key-here
```

### 4. Test Integration

```javascript
// Test summarization
async function testSummarization() {
    const text = "The client is experiencing network congestion issues affecting their VoIP systems. They need immediate bandwidth optimization and a long-term network upgrade plan. Action: Schedule network assessment for next week.";
    
    const summary = await summarizeText(text);
    console.log("Summary:", summary);
}
```

### 5. Pricing & Quotas

| Model | Cost | Use Case |
|-------|------|----------|
| gpt-4o-mini | $0.00015 per 1K tokens | Summarization (current) |
| gpt-4o | $0.03 per 1K tokens | Complex tasks |
| gpt-3.5-turbo | $0.001 per 1K tokens | Legacy (fast) |

**Cost Estimation:**
- ~150 tokens per summarization
- ~$0.000025 per summarization
- 1 million summarizations = ~$25

### 6. Rate Limits & Error Handling

```javascript
// Handle rate limits
try {
    const summary = await summarizeText(notes);
} catch (error) {
    if (error.status === 429) {
        // Rate limited - wait and retry
        setTimeout(() => summarizeText(notes), 60000);
    } else if (error.status === 401) {
        // Invalid API key
        alert('Invalid API key. Please check Settings.');
    } else {
        // Other error
        console.error('Summarization failed:', error);
    }
}
```

### 7. Security Best Practices

- ✓ Never commit API key to Git
- ✓ Rotate keys monthly
- ✓ Use separate keys for dev/prod
- ✓ Monitor usage in OpenAI dashboard
- ✓ Set spending limits in billing settings
- ✓ Use `.env` files locally
- ✓ Use environment variables in production

---

## ☎️ Twilio API - VoIP Calling

### 1. Create Twilio Account

1. Visit https://www.twilio.com/console/
2. Sign up with email or Google
3. Verify phone number
4. Complete setup wizard
5. Get free $15 trial credit

### 2. Get Credentials

1. Go to https://www.twilio.com/console
2. Under **Account Info**, find:
   - **Account SID** (starts with AC...)
   - **Auth Token** (long alphanumeric)
3. Click the eye icon to reveal Auth Token
4. Copy and store securely

### 3. Purchase Virtual Phone Number

1. In Twilio Console, go to **Phone Numbers** → **Manage** → **Buy a Number**
2. Choose country and area code
3. Select a number (e.g., +1 (201) 555-0123)
4. Click **Buy** (typically $1/month)
5. Note the number for configuration

### 4. Add to Application

**Via Settings UI:**
1. Click **⚙️ Settings**
2. Add:
   - Twilio Account SID
   - Twilio Auth Token
   - Twilio Phone Number
3. Click **Save Settings**

**Via Environment Variables:**
```bash
export TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export TWILIO_AUTH_TOKEN=your_auth_token_here
export TWILIO_PHONE_NUMBER=+12015550123
```

### 5. Backend Implementation

```javascript
// server.js
const twilio = require('twilio');

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

// Initiate outbound call
app.post('/api/calls/make', async (req, res) => {
    const { toNumber } = req.body;
    
    try {
        const call = await client.calls.create({
            url: 'https://demo.twilio.com/docs/voice.xml', // TwiML URL
            to: toNumber,
            from: process.env.TWILIO_PHONE_NUMBER
        });
        
        res.json({ callSid: call.sid, status: call.status });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Receive incoming calls
app.post('/api/calls/incoming', (req, res) => {
    const twiml = new twilio.twiml.VoiceResponse();
    twiml.say('Hello! You have reached the MSP Calendar hotline.');
    twiml.gather({
        numDigits: 1,
        action: '/api/calls/gather'
    });
    
    res.type('text/xml');
    res.send(twiml.toString());
});

// Get call history
app.get('/api/calls/history', async (req, res) => {
    const calls = await client.calls.list({
        limit: 20
    });
    
    res.json(calls.map(call => ({
        sid: call.sid,
        from: call.from,
        to: call.to,
        status: call.status,
        startTime: call.dateCreated,
        duration: call.duration
    })));
});
```

### 6. Frontend JavaScript SDK

```html
<script src="https://sdk.twilio.com/js/client/v1.14.0/twilio.js"></script>

<script>
// Get token from backend
async function setupTwilioClient() {
    const response = await fetch('/api/twilio/token');
    const data = await response.json();
    
    const device = new Twilio.Device(data.token);
    
    device.on('ready', () => {
        console.log('Twilio device ready');
    });
    
    device.on('error', (error) => {
        console.error('Twilio error:', error);
    });
    
    return device;
}

// Make call through SDK
async function makeCallWithSdk(phoneNumber) {
    const device = await setupTwilioClient();
    const connection = await device.connect({
        phoneNumber: phoneNumber
    });
    
    connection.on('accept', () => {
        console.log('Call accepted');
    });
}
</script>
```

### 7. Pricing

| Service | Cost |
|---------|------|
| Outbound Call | $0.012 per minute (US) |
| Inbound Call | $0.0075 per minute |
| Virtual Phone # | $1/month |
| SMS | $0.0075 per message |
| MMS | $0.02 per message |

**Cost Estimation:**
- 100 minutes/month = $1.20 calling + $1 number = $2.20/month
- 1000 minutes/month = $12 calling + $1 number = $13/month

### 8. Testing & Debugging

```bash
# Using Twilio CLI
npm install -g twilio-cli

# List recent calls
twilio api:core:calls:list

# Get call details
twilio api:core:calls:fetch --sid CA1234567890abcdef1234567890abcde

# Test webhook
twilio debugger:logs:list
```

---

## ✍️ DocuSign API - E-Signature

### 1. Create Developer Account

1. Visit https://developer.docusign.com
2. Click **Sign Up**
3. Create account with email
4. Verify email
5. Choose "Developer" role during setup
6. Get access to sandbox environment

### 2. Register Integrator Key

1. Go to **Settings** → **Apps and Keys**
2. Click **Create Integrator Key**
3. Fill in:
   - App Name: "MSP Calendar"
   - App Description: "E-signature management"
   - Redirect URI: `https://yourdomain.com/auth/docusign/callback`
4. Submit
5. Copy credentials:
   - Client ID (Integration Key)
   - Client Secret

### 3. Add to Application

**Environment Variables:**
```bash
export DOCUSIGN_CLIENT_ID=your_client_id
export DOCUSIGN_CLIENT_SECRET=your_client_secret
export DOCUSIGN_BASE_URL=https://demo.docusign.net
```

### 4. OAuth Implementation

```javascript
// Get authorization token
app.post('/api/docusign/auth', async (req, res) => {
    const auth = Buffer.from(
        `${process.env.DOCUSIGN_CLIENT_ID}:${process.env.DOCUSIGN_CLIENT_SECRET}`
    ).toString('base64');
    
    const response = await fetch(
        `${process.env.DOCUSIGN_BASE_URL}/oauth/token`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&scope=signature'
        }
    );
    
    const token = await response.json();
    res.json(token);
});

// Send document for signing
app.post('/api/docusign/send', async (req, res) => {
    const { token, documentPath, signerEmail, signerName } = req.body;
    
    const docuSign = require('docusign-esign');
    const apiClient = new docuSign.ApiClient();
    apiClient.setBasePath(`${process.env.DOCUSIGN_BASE_URL}/restapi`);
    apiClient.addDefaultHeader('Authorization', `Bearer ${token}`);
    
    // Create envelope
    const envelope = {
        emailSubject: 'Please sign this document',
        documents: [{
            documentBase64: fs.readFileSync(documentPath).toString('base64'),
            name: 'Document.pdf',
            documentId: '1'
        }],
        recipients: {
            signers: [{
                email: signerEmail,
                name: signerName,
                recipientId: '1',
                tabs: {
                    signHereTabs: [{
                        pageNumber: '1',
                        xPosition: '100',
                        yPosition: '100'
                    }]
                }
            }]
        },
        status: 'sent'
    };
    
    // Send envelope
    const envelopesApi = new docuSign.EnvelopesApi(apiClient);
    const result = await envelopesApi.createEnvelope(
        process.env.DOCUSIGN_ACCOUNT_ID,
        { envelopeDefinition: envelope }
    );
    
    res.json({ envelopeId: result.envelopeId });
});

// Get signing status
app.get('/api/docusign/status/:envelopeId', async (req, res) => {
    const { envelopeId } = req.params;
    const token = await getDocuSignToken(); // Implement token refresh
    
    const apiClient = new docuSign.ApiClient();
    apiClient.setBasePath(`${process.env.DOCUSIGN_BASE_URL}/restapi`);
    apiClient.addDefaultHeader('Authorization', `Bearer ${token}`);
    
    const envelopesApi = new docuSign.EnvelopesApi(apiClient);
    const envelope = await envelopesApi.getEnvelope(
        process.env.DOCUSIGN_ACCOUNT_ID,
        envelopeId
    );
    
    res.json({
        status: envelope.status,
        recipients: envelope.recipients
    });
});
```

### 5. Webhook Setup for Status Updates

```javascript
// Configure webhook URL in DocuSign console
// Then handle incoming events

app.post('/webhooks/docusign', express.json(), (req, res) => {
    const event = req.body;
    
    switch (event.eventType) {
        case 'envelope-completed':
            // Download signed document
            downloadSignedDocument(event.envelopeId);
            break;
        case 'recipient-declined':
            // Notify user
            notifySigningDeclined(event.envelopeId);
            break;
        case 'envelope-sent':
            // Update UI
            updateEnvelopeStatus(event.envelopeId, 'sent');
            break;
    }
    
    res.json({ success: true });
});
```

### 6. Pricing

| Usage | Cost |
|-------|------|
| Sandbox (Development) | Free |
| Starter Plan | $10/month |
| Standard Plan | $15/month |
| Advanced Plan | $20+/month |

---

## 📧 SendGrid API - Email Campaigns

### 1. Create SendGrid Account

1. Visit https://sendgrid.com/free
2. Sign up with email
3. Verify email address
4. Complete onboarding

### 2. Get API Key

1. Go to **Settings** → **API Keys**
2. Click **Create API Key**
3. Name: "MSP Calendar"
4. Choose Full Access or restricted permissions
5. Copy the key (only shown once!)

### 3. Verify Sender Identity

1. Go to **Settings** → **Sender Authentication**
2. Click **Verify a Sender**
3. Enter company email: `noreply@yourdomain.com`
4. Follow verification steps
5. Confirm verification

### 4. Add to Application

**Environment Variable:**
```bash
export SENDGRID_API_KEY=SG.your_api_key_here
```

### 5. Backend Implementation

```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Send email campaign
app.post('/api/campaigns/send', async (req, res) => {
    const { campaign } = req.body;
    
    const recipients = campaign.contacts.map(contact => ({
        email: contact.email,
        name: contact.name
    }));
    
    const msg = {
        to: recipients,
        from: 'noreply@yourdomain.com',
        replyTo: 'support@yourdomain.com',
        subject: campaign.subject,
        html: campaign.content,
        trackingSettings: {
            clickTracking: {
                enable: true,
                enableText: true
            },
            openTracking: {
                enable: true
            }
        }
    };
    
    try {
        await sgMail.send(msg);
        res.json({ success: true, messageId: msg.headers['X-Message-Id'] });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get email stats
app.get('/api/campaigns/stats', async (req, res) => {
    const sgClient = require('@sendgrid/client');
    sgClient.setApiKey(process.env.SENDGRID_API_KEY);
    
    const response = await sgClient.request({
        method: 'GET',
        url: '/v3/stats',
        qs: {
            start_date: '2024-01-01',
            end_date: '2024-01-31',
            aggregated_by: 'day'
        }
    });
    
    res.json(response.body);
});
```

### 6. Frontend Integration

```javascript
// Track email opens and clicks
// SendGrid automatically adds tracking pixels/links
// Access reports in SendGrid dashboard
```

### 7. Pricing

| Tier | Emails/Month | Cost |
|------|--------------|------|
| Free | 100 | Free |
| Essentials | 200,000+ | $9.95-$99.95 |
| Standard | 500,000+ | $149-$399 |
| Advanced | 1M+ | Custom |

---

## 🔍 Company Research APIs

### Clearbit API (Company Data)

```javascript
const axios = require('axios');

async function getCompanyData(domain) {
    const response = await axios.get(
        `https://company-stream.clearbit.com/v1/domains/find?name=${domain}`,
        {
            auth: {
                username: process.env.CLEARBIT_API_KEY,
                password: ''
            }
        }
    );
    
    return response.data;
}

// Get full company profile
async function getCompanyProfile(companyId) {
    const response = await axios.get(
        `https://api.clearbit.com/v1/companies/${companyId}`,
        {
            auth: {
                username: process.env.CLEARBIT_API_KEY,
                password: ''
            }
        }
    );
    
    return {
        name: response.data.name,
        website: response.data.website,
        industry: response.data.industry,
        employees: response.data.metrics.employees,
        founded: response.data.founded.year,
        logo: response.data.logo,
        description: response.data.description
    };
}
```

### Google News API

```javascript
async function searchCompanyNews(companyName) {
    const response = await axios.get(
        'https://newsapi.org/v2/everything',
        {
            params: {
                q: companyName,
                sortBy: 'publishedAt',
                apiKey: process.env.NEWSAPI_KEY
            }
        }
    );
    
    return response.data.articles.map(article => ({
        title: article.title,
        url: article.url,
        source: article.source.name,
        publishedAt: article.publishedAt
    }));
}
```

### Hunter.io API (Email Discovery)

```javascript
async function findCompanyEmails(domain) {
    const response = await axios.get(
        `https://api.hunter.io/v2/domain-search`,
        {
            params: {
                domain: domain,
                api_key: process.env.HUNTER_IO_KEY
            }
        }
    );
    
    return response.data.data.emails;
}
```

---

## 🏗️ Backend Integration Architecture

### Recommended Structure

```
backend/
├── config/
│   ├── env.js          # Environment variables
│   ├── database.js     # Database configuration
│   └── apis.js         # API configurations
├── services/
│   ├── openai.js       # OpenAI wrapper
│   ├── twilio.js       # Twilio wrapper
│   ├── docusign.js     # DocuSign wrapper
│   ├── sendgrid.js     # SendGrid wrapper
│   └── cache.js        # Response caching
├── routes/
│   ├── calls.js        # Twilio routes
│   ├── signatures.js   # DocuSign routes
│   ├── campaigns.js    # SendGrid routes
│   └── ai.js           # OpenAI routes
├── middleware/
│   ├── auth.js         # Authentication
│   ├── rateLimit.js    # Rate limiting
│   ├── errorHandler.js # Error handling
│   └── logging.js      # Request logging
└── app.js              # Express setup
```

### Example Service Wrapper

```javascript
// services/openai.js
const OpenAI = require('openai');

class OpenAIService {
    constructor() {
        this.client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
        this.model = 'gpt-4o-mini';
        this.maxTokens = 150;
    }
    
    async summarize(text) {
        try {
            const response = await this.client.chat.completions.create({
                model: this.model,
                messages: [{
                    role: 'user',
                    content: `Summarize in 2-3 sentences:\n\n${text}`
                }],
                max_tokens: this.maxTokens
            });
            
            return response.choices[0].message.content.trim();
        } catch (error) {
            throw new Error(`Summarization failed: ${error.message}`);
        }
    }
}

module.exports = new OpenAIService();
```

---

## 🔐 Secure Credential Management

### Using Environment Variables

```bash
# .env.local (never commit)
OPENAI_API_KEY=sk-your-key
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
DOCUSIGN_CLIENT_ID=...
```

```javascript
// Load and validate
const requiredEnvVars = [
    'OPENAI_API_KEY',
    'TWILIO_ACCOUNT_SID',
    'TWILIO_AUTH_TOKEN'
];

requiredEnvVars.forEach(envVar => {
    if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
});
```

### Using AWS Secrets Manager

```javascript
const AWS = require('aws-sdk');
const secretsManager = new AWS.SecretsManager();

async function getSecret(secretName) {
    try {
        const response = await secretsManager.getSecretValue({
            SecretId: secretName
        }).promise();
        
        return JSON.parse(response.SecretString);
    } catch (error) {
        console.error('Failed to retrieve secret:', error);
        throw error;
    }
}

// Usage
const credentials = await getSecret('msp-calendar/prod');
const twilioToken = credentials.twilio_auth_token;
```

---

## 📞 Support & Resources

- **OpenAI Support:** https://help.openai.com
- **Twilio Support:** https://www.twilio.com/help
- **DocuSign Developers:** https://developers.docusign.com
- **SendGrid Support:** https://support.sendgrid.com

---

**Last Updated:** January 20, 2026  
**Version:** 1.0


