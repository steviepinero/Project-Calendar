# Google Scraping for Company Research

## Overview
The Company Research page now uses **Google search scraping** to find real, up-to-date company information. This provides live data without requiring API keys or accounts.

## How It Works

### 1. Backend Scraping (server.js)
The backend acts as a proxy to avoid CORS issues and scrape Google:

**Search Process:**
1. User searches for a company name
2. Backend queries Google with `"{query} company"`
3. Parses Google's search results using Cheerio
4. Extracts:
   - **Knowledge Graph** (right panel on Google) - primary company info
   - **Search Results** - top 5 organic results
   - Company names, websites, descriptions, domains

**Detail Lookup:**
1. User clicks on a company
2. Backend visits the company's actual website
3. Scrapes meta tags and structured data:
   - Meta description
   - Open Graph tags (og:title, og:description, og:image)
   - Social media links (LinkedIn, Twitter, Facebook)
   - Logo/favicon

### 2. Frontend (js/company-research.js)
- Makes API calls to backend endpoints
- Displays results in a clean UI
- **Falls back to mock data** if scraping fails

## API Endpoints

### Search Companies
```
GET /api/company/search?q={query}
```

**Example:**
```
GET /api/company/search?q=Microsoft
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "name": "Microsoft Corporation",
      "domain": "microsoft.com",
      "url": "https://www.microsoft.com",
      "description": "Company description from Google...",
      "logo": "https://logo.clearbit.com/microsoft.com",
      "source": "knowledge_graph"
    }
  ]
}
```

### Get Company Details
```
GET /api/company/lookup?domain={domain}
```

**Example:**
```
GET /api/company/lookup?domain=microsoft.com
```

**Response:**
```json
{
  "success": true,
  "data": {
    "name": "Microsoft Corporation",
    "domain": "microsoft.com",
    "url": "https://www.microsoft.com",
    "description": "Scraped from website meta tags...",
    "logo": "https://www.microsoft.com/favicon.ico",
    "social": {
      "linkedin": "https://linkedin.com/company/microsoft",
      "twitter": "https://twitter.com/Microsoft"
    }
  }
}
```

## Features

### ✅ Advantages
- **Real Data** - Live information from Google and company websites
- **No API Key** - Works without authentication
- **Free** - No costs or subscriptions
- **Up-to-date** - Always current information
- **Logos** - Uses Clearbit's free logo CDN
- **Fallback** - Mock data if scraping fails

### ⚠️ Limitations
- **Rate Limits** - Google may block if too many requests
- **Captchas** - Google may show captchas for suspicious activity
- **Slower** - Takes 2-5 seconds per search (network + scraping)
- **Less Data** - Limited to what's publicly available
- **Fragile** - May break if Google changes HTML structure

## Best Practices

### 1. Avoid Rate Limiting
- Don't make rapid consecutive searches
- Add delays between requests
- Use mock data for development/testing
- Consider caching results

### 2. Handle Failures Gracefully
- The system automatically falls back to mock data
- Shows user-friendly error messages
- Logs errors for debugging

### 3. Improve Scraping
If Google starts blocking:
- Rotate User-Agent strings
- Add proxy support
- Implement request delays
- Use residential proxies (paid services)

## Usage

### Search for Any Company
```javascript
// Try searching for:
- "Apple"
- "Tesla"
- "Stripe"
- "Your Client Company Name"
```

### Direct Domain Lookup
```javascript
// Enter a domain directly:
- "apple.com"
- "tesla.com"
- "stripe.com"
```

## Troubleshooting

### "Failed to search companies"
**Possible causes:**
1. Google is blocking the requests (captcha/rate limit)
2. Network connectivity issues
3. Company website is down/unreachable

**Solutions:**
- Wait a few minutes and try again
- System will use mock data as fallback
- Check server logs for specific errors

### Getting Blocked by Google
If you see frequent failures:

1. **Add delays** in `server.js`:
```javascript
// Add this before scrapeGoogleForCompany()
await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay
```

2. **Rotate User-Agents**:
```javascript
const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64)...',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)...',
  // Add more
];
const randomUA = userAgents[Math.floor(Math.random() * userAgents.length)];
```

3. **Use Proxy Services** (paid):
   - ScraperAPI
   - Bright Data
   - Oxylabs

### No Results Found
- Try searching with more specific terms
- Check if the company has a web presence
- Falls back to mock data automatically

## Legal Considerations

### ✅ Generally Acceptable
- Google's public search results (grey area, but common)
- Publicly accessible website data
- Meta tags and Open Graph data
- Data for internal business use (not reselling)

### ⚠️ Be Aware
- Respect robots.txt (currently not implemented)
- Don't hammer servers with requests
- Don't resell scraped data commercially
- Terms may vary by country/jurisdiction

### 📝 Recommendations
1. Add rate limiting (already implemented on Express)
2. Cache results to reduce requests
3. Use for internal tools only
4. Consider paid APIs for production

## Future Improvements

### Enhance Data Quality
- Scrape company LinkedIn pages (with caution)
- Extract employee count from "About" pages
- Find funding information from Crunchbase
- Parse industry/category from content

### Better Reliability
- Implement caching (Redis/database)
- Add retry logic with exponential backoff
- Support multiple search engines (Bing, DuckDuckGo)
- Proxy rotation

### More Data Sources
- Crunchbase API (limited free tier)
- Companies House API (UK companies)
- SEC Edgar (US public companies)
- Custom crawlers for specific industries

## Testing

1. **Basic Search**:
   ```
   Navigate to Company Research → Search "Microsoft"
   ```

2. **Domain Lookup**:
   ```
   Search "microsoft.com" → Should show detailed info
   ```

3. **Fallback Test**:
   ```
   Disconnect internet → Search → Should use mock data
   ```

4. **Error Handling**:
   ```
   Search gibberish → Should show "No results found"
   ```

## Monitor & Maintain

Check server logs regularly for:
- Scraping failures
- Google blocking (403/429 errors)
- Slow response times
- Captcha challenges

The system is designed to be resilient with automatic fallbacks to ensure users always get results!

