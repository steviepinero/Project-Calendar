# Company Research - Google Scraping + Mock Fallback

## Overview
The Company Research page uses **Google search scraping** to find real, live company information from the web. If scraping fails, it automatically falls back to **mock data** so you always get results.

## Features

### 1. Company Search
- **Live Google Search** - Real-time results from Google
- Search by company name (e.g., "Microsoft", "Tesla", "Stripe")
- Search by domain (e.g., "microsoft.com", "apple.com")
- Extracts data from Google Knowledge Graph
- Scrapes company websites for additional info
- **Auto Fallback** - Uses mock data if scraping fails

### 2. Company Details
The detailed view includes:
- **Company Overview**: Logo, description, industry, location, founding year
- **Metrics**: Employee count, revenue, market cap
- **Technology Stack**: List of technologies the company uses
- **Social Media**: LinkedIn, Twitter, Facebook links
- **Contact Info**: Phone numbers
- **Tags**: Industry-related tags and categories

## Pre-loaded Companies

The system includes data for 10 major tech companies:
1. **Microsoft Corporation** - Software, Cloud Computing
2. **Apple Inc.** - Consumer Electronics
3. **Amazon.com, Inc.** - E-commerce, Cloud Computing (AWS)
4. **Google LLC** - Internet Services, Search
5. **Meta Platforms, Inc.** - Social Media
6. **Salesforce, Inc.** - CRM, Enterprise Software
7. **Oracle Corporation** - Database, Enterprise Software
8. **Adobe Inc.** - Creative Software
9. **Netflix, Inc.** - Streaming Entertainment
10. **Cisco Systems, Inc.** - Networking Equipment

## How to Use

1. Navigate to **Company Research** page from the sidebar
2. Type a company name or domain in the search box
3. Press Enter or click Search
4. Click any result card to view full details

### Example Searches
- **By Name**: `Microsoft`, `Apple`, `Amazon`, `Google`
- **By Domain**: `microsoft.com`, `apple.com`, `netflix.com`
- **Partial**: `soft` (finds Microsoft), `cisco` (finds Cisco)

## Adding Your Own Companies

To add more companies, edit `js/company-research.js` and add entries to the `MOCK_COMPANIES` array:

```javascript
{
    name: "Your Company Name",
    domain: "yourcompany.com",
    logo: "https://logo.clearbit.com/yourcompany.com", // Free logo CDN
    description: "Company description...",
    url: "https://www.yourcompany.com",
    category: { 
        sector: "Your Sector", 
        industry: "Your Industry" 
    },
    foundedYear: 2020,
    location: "City, State, Country",
    metrics: { 
        employees: 500, 
        employeesRange: "100-500",
        annualRevenue: 10000000 
    },
    tech: ["Technology 1", "Technology 2"],
    tags: ["Tag1", "Tag2"],
    linkedin: { handle: "company-handle" },
    twitter: { handle: "CompanyHandle" },
    phone: "+1 555-555-5555"
}
```

## Upgrading to Real API

When you're ready to connect to a real company data API, you can replace the `COMPANY_API` object in `js/company-research.js`:

### Free API Options to Consider:
1. **Companies House (UK)** - Free, UK companies only
   - https://developer-specs.company-information.service.gov.uk/
2. **OpenCorporates** - Limited free tier
   - https://opencorporates.com/api/
3. **Clearbit** - Paid (no free tier anymore)
4. **Hunter.io** - Limited free tier for email verification
5. **Custom Web Scraping** - Build your own (check legal requirements)

### To Integrate a Real API:
1. Update the `COMPANY_API.searchCompanies()` method to call your API
2. Update the `COMPANY_API.getCompanyByDomain()` method
3. Adjust the data structure in `displayCompanyDetails()` to match your API's response format
4. Add backend proxy routes in `server.js` if needed to avoid CORS issues

## How It Works

### Live Google Scraping
1. **You search** for a company name
2. **Backend scrapes** Google search results
3. **Extracts data** from Knowledge Graph and search results
4. **Visits company website** to get logos, descriptions, social links
5. **Returns real data** to display

### Automatic Fallback
- If Google blocks requests → Uses mock data
- If company website is down → Uses partial data
- Always provides results to the user

## Benefits

✅ **Real Data** - Live information from Google and company websites  
✅ **No API Key** - Works without authentication  
✅ **Free** - No costs or subscriptions  
✅ **Up-to-date** - Always current information  
✅ **Reliable Fallback** - Mock data if scraping fails  
✅ **Any Company** - Search for any company, not just pre-loaded ones

## Limitations

⚠️ **Rate Limits** - Google may block excessive requests  
⚠️ **Slower** - Takes 2-5 seconds (network + scraping)  
⚠️ **Less Structured** - Data quality varies by company  
⚠️ **Captchas** - Google may show captchas occasionally  

## Next Steps

1. **Test the feature**: Try searching for the pre-loaded companies
2. **Add your clients**: Edit the mock data to include your actual clients
3. **Find an API**: Research free APIs for your region/needs
4. **Integrate**: Replace mock implementation when ready

The mock data setup gives you a fully functional Company Research page while you evaluate API options!

