/**
 * COMPANY RESEARCH MODULE
 * Integrates with OpenCorporates API to search and display company information
 */

// ===== DATA STRUCTURES =====
let searchResults = [];
let selectedCompany = null;

// ===== MOCK COMPANY DATA =====
const MOCK_COMPANIES = [
    {
        name: "Microsoft Corporation",
        domain: "microsoft.com",
        logo: "https://logo.clearbit.com/microsoft.com",
        description: "Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide. The company operates in three segments: Productivity and Business Processes, Intelligent Cloud, and More Personal Computing.",
        url: "https://www.microsoft.com",
        category: { sector: "Information Technology", industry: "Software" },
        foundedYear: 1975,
        location: "Redmond, WA, USA",
        metrics: { employees: 221000, employeesRange: "100K+", marketCap: 3200000000000, annualRevenue: 211915000000 },
        tech: ["Azure", "Microsoft 365", "Windows", "SQL Server", "Active Directory", "Exchange"],
        tags: ["SAAS", "Enterprise", "Cloud Computing", "B2B", "AI"],
        linkedin: { handle: "microsoft" },
        twitter: { handle: "Microsoft" },
        phone: "+1 425-882-8080"
    },
    {
        name: "Apple Inc.",
        domain: "apple.com",
        logo: "https://logo.clearbit.com/apple.com",
        description: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, Mac, iPad, and Wearables, Home and Accessories.",
        url: "https://www.apple.com",
        category: { sector: "Consumer Electronics", industry: "Technology Hardware" },
        foundedYear: 1976,
        location: "Cupertino, CA, USA",
        metrics: { employees: 164000, employeesRange: "100K+", marketCap: 3500000000000, annualRevenue: 394328000000 },
        tech: ["iOS", "macOS", "Swift", "iCloud", "Apple Pay"],
        tags: ["Consumer Electronics", "Software", "Services", "B2C"],
        linkedin: { handle: "apple" },
        twitter: { handle: "Apple" },
        phone: "+1 408-996-1010"
    },
    {
        name: "Amazon.com, Inc.",
        domain: "amazon.com",
        logo: "https://logo.clearbit.com/amazon.com",
        description: "Amazon.com, Inc. engages in the retail sale of consumer products and subscriptions in North America and internationally. The company operates through three segments: North America, International, and Amazon Web Services (AWS).",
        url: "https://www.amazon.com",
        category: { sector: "E-commerce & Cloud Computing", industry: "Technology" },
        foundedYear: 1994,
        location: "Seattle, WA, USA",
        metrics: { employees: 1540000, employeesRange: "500K+", marketCap: 1900000000000, annualRevenue: 574785000000 },
        tech: ["AWS", "DynamoDB", "EC2", "S3", "Lambda", "Alexa"],
        tags: ["E-commerce", "Cloud Computing", "SAAS", "B2B", "B2C"],
        linkedin: { handle: "amazon" },
        twitter: { handle: "amazon" },
        phone: "+1 206-266-1000"
    },
    {
        name: "Google LLC",
        domain: "google.com",
        logo: "https://logo.clearbit.com/google.com",
        description: "Google LLC provides online advertising services worldwide. The company offers performance and brand advertising services. It operates through Google Services, Google Cloud, and Other Bets segments.",
        url: "https://www.google.com",
        category: { sector: "Internet Services", industry: "Technology" },
        foundedYear: 1998,
        location: "Mountain View, CA, USA",
        metrics: { employees: 190000, employeesRange: "100K+", marketCap: 2100000000000, annualRevenue: 307394000000 },
        tech: ["Google Cloud", "Kubernetes", "TensorFlow", "Android", "Chrome", "Firebase"],
        tags: ["Search Engine", "Advertising", "Cloud Computing", "AI", "B2B", "B2C"],
        linkedin: { handle: "google" },
        twitter: { handle: "Google" },
        phone: "+1 650-253-0000"
    },
    {
        name: "Meta Platforms, Inc.",
        domain: "meta.com",
        logo: "https://logo.clearbit.com/meta.com",
        description: "Meta Platforms, Inc. develops products that enable people to connect and share with friends and family through mobile devices, personal computers, virtual reality headsets, and wearables worldwide.",
        url: "https://www.meta.com",
        category: { sector: "Social Media", industry: "Technology" },
        foundedYear: 2004,
        location: "Menlo Park, CA, USA",
        metrics: { employees: 86482, employeesRange: "50K-100K", marketCap: 1200000000000, annualRevenue: 134902000000 },
        tech: ["React", "GraphQL", "PyTorch", "Oculus", "WhatsApp", "Instagram"],
        tags: ["Social Media", "VR/AR", "Advertising", "B2C"],
        linkedin: { handle: "meta" },
        twitter: { handle: "Meta" },
        facebook: { handle: "Meta" },
        phone: "+1 650-543-4800"
    },
    {
        name: "Salesforce, Inc.",
        domain: "salesforce.com",
        logo: "https://logo.clearbit.com/salesforce.com",
        description: "Salesforce, Inc. provides customer relationship management (CRM) technology that brings companies and customers together worldwide. The company's service includes sales, service, marketing, commerce, and platform.",
        url: "https://www.salesforce.com",
        category: { sector: "Enterprise Software", industry: "CRM" },
        foundedYear: 1999,
        location: "San Francisco, CA, USA",
        metrics: { employees: 79390, employeesRange: "50K-100K", marketCap: 320000000000, annualRevenue: 34857000000 },
        tech: ["Salesforce Platform", "Heroku", "MuleSoft", "Tableau", "Slack"],
        tags: ["SAAS", "CRM", "Enterprise", "Cloud Computing", "B2B"],
        linkedin: { handle: "salesforce" },
        twitter: { handle: "salesforce" },
        phone: "+1 415-901-7000"
    },
    {
        name: "Oracle Corporation",
        domain: "oracle.com",
        logo: "https://logo.clearbit.com/oracle.com",
        description: "Oracle Corporation offers products and services that address enterprise information technology (IT) environments worldwide. The company's cloud and license business engages in the sale, marketing, and delivery of applications and infrastructure technologies.",
        url: "https://www.oracle.com",
        category: { sector: "Enterprise Software", industry: "Database & Cloud" },
        foundedYear: 1977,
        location: "Austin, TX, USA",
        metrics: { employees: 164000, employeesRange: "100K+", marketCap: 450000000000, annualRevenue: 49954000000 },
        tech: ["Oracle Database", "Java", "MySQL", "Oracle Cloud", "NetSuite"],
        tags: ["Database", "Enterprise Software", "Cloud Computing", "B2B"],
        linkedin: { handle: "oracle" },
        twitter: { handle: "Oracle" },
        phone: "+1 737-867-1000"
    },
    {
        name: "Adobe Inc.",
        domain: "adobe.com",
        logo: "https://logo.clearbit.com/adobe.com",
        description: "Adobe Inc. operates as a diversified software company worldwide. The company operates through three segments: Digital Media, Digital Experience, and Publishing and Advertising.",
        url: "https://www.adobe.com",
        category: { sector: "Software", industry: "Creative Software" },
        foundedYear: 1982,
        location: "San Jose, CA, USA",
        metrics: { employees: 29239, employeesRange: "10K-50K", marketCap: 240000000000, annualRevenue: 19411000000 },
        tech: ["Adobe Creative Cloud", "Photoshop", "Illustrator", "Premiere Pro", "Adobe Experience Cloud"],
        tags: ["Creative Software", "SAAS", "Marketing", "B2B", "B2C"],
        linkedin: { handle: "adobe" },
        twitter: { handle: "Adobe" },
        phone: "+1 408-536-6000"
    },
    {
        name: "Netflix, Inc.",
        domain: "netflix.com",
        logo: "https://logo.clearbit.com/netflix.com",
        description: "Netflix, Inc. provides entertainment services. It offers TV series, documentaries, feature films, and mobile games across various genres and languages worldwide.",
        url: "https://www.netflix.com",
        category: { sector: "Entertainment", industry: "Streaming" },
        foundedYear: 1997,
        location: "Los Gatos, CA, USA",
        metrics: { employees: 12800, employeesRange: "10K-50K", marketCap: 280000000000, annualRevenue: 33723000000 },
        tech: ["AWS", "Node.js", "React", "Java", "Python"],
        tags: ["Streaming", "Entertainment", "B2C", "Subscription"],
        linkedin: { handle: "netflix" },
        twitter: { handle: "netflix" },
        phone: "+1 408-540-3700"
    },
    {
        name: "Cisco Systems, Inc.",
        domain: "cisco.com",
        logo: "https://logo.clearbit.com/cisco.com",
        description: "Cisco Systems, Inc. designs, manufactures, and sells Internet Protocol based networking and other products related to the communications and information technology industry worldwide.",
        url: "https://www.cisco.com",
        category: { sector: "Networking Equipment", industry: "Technology" },
        foundedYear: 1984,
        location: "San Jose, CA, USA",
        metrics: { employees: 83300, employeesRange: "50K-100K", marketCap: 240000000000, annualRevenue: 56998000000 },
        tech: ["Cisco IOS", "WebEx", "Meraki", "Cisco Security", "SD-WAN"],
        tags: ["Networking", "Enterprise", "Security", "B2B"],
        linkedin: { handle: "cisco" },
        twitter: { handle: "Cisco" },
        phone: "+1 408-526-4000"
    }
];

// ===== COMPANY API (GOOGLE SCRAPING) =====
const COMPANY_API = {
    baseUrl: window.location.origin + '/api/company',
    useMockFallback: true, // Enable mock data as fallback
    
    /**
     * Search for companies using Google scraping
     */
    async searchCompanies(query) {
        try {
            const url = `${this.baseUrl}/search?q=${encodeURIComponent(query)}`;
            console.log('🔍 Searching via Google scraping:', query);
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            if (!result.success) {
                throw new Error(result.error || 'Search failed');
            }
            
            // If Google returned 0 results, throw error to trigger fallback
            if (!result.data || result.data.length === 0) {
                console.warn('⚠️  Google returned 0 results - likely blocked by bot detection');
                throw new Error('Google scraping returned no results');
            }
            
            console.log(`✅ Found ${result.data.length} results via Google`);
            return result.data;
            
        } catch (error) {
            console.error('❌ Error searching companies:', error);
            
            // Fallback to mock data
            if (this.useMockFallback) {
                console.log('🔄 Google scraping failed - Falling back to mock data...');
                console.log('💡 Tip: Mock data includes Microsoft, Apple, Amazon, Google, Meta, and more');
                return this.searchCompaniesMock(query);
            }
            throw error;
        }
    },
    
    /**
     * Get detailed company information by domain using Google scraping
     */
    async getCompanyByDomain(domain) {
        try {
            const url = `${this.baseUrl}/lookup?domain=${encodeURIComponent(domain)}`;
            console.log('📊 Fetching company details via scraping:', domain);
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            if (!result.success) {
                throw new Error(result.error || 'Failed to fetch details');
            }
            
            console.log(`✅ Company details retrieved: ${result.data.name}`);
            return result.data || null;
            
        } catch (error) {
            console.error('❌ Error fetching company details:', error);
            
            // Fallback to mock data
            if (this.useMockFallback) {
                console.log('🔄 Falling back to mock data...');
                return this.getCompanyByDomainMock(domain);
            }
            throw error;
        }
    },
    
    /**
     * Mock search fallback
     */
    searchCompaniesMock(query) {
        const lowerQuery = query.toLowerCase();
        const results = MOCK_COMPANIES.filter(company => 
            company.name.toLowerCase().includes(lowerQuery) ||
            company.domain.toLowerCase().includes(lowerQuery) ||
            company.description.toLowerCase().includes(lowerQuery)
        );
        console.log(`🔍 Mock fallback found ${results.length} results`);
        return results;
    },
    
    /**
     * Mock lookup fallback
     */
    getCompanyByDomainMock(domain) {
        const lowerDomain = domain.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '');
        const company = MOCK_COMPANIES.find(c => c.domain.toLowerCase() === lowerDomain);
        if (company) {
            console.log(`📊 Mock fallback found: ${company.name}`);
        }
        return company || null;
    }
};

// ===== INITIALIZATION =====
function initializeCompanyResearchPage() {
    console.log('🔍 Initializing company research page...');
    setupSearchEventListeners();
    console.log('✅ Company research page initialized');
}

// ===== SEARCH FUNCTIONS =====
function setupSearchEventListeners() {
    const searchBtn = document.getElementById('searchCompanyBtn');
    const searchInput = document.getElementById('companySearchInput');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

async function performSearch() {
    const searchInput = document.getElementById('companySearchInput');
    const query = searchInput?.value.trim();
    
    if (!query) {
        alert('Please enter a company name or website');
        return;
    }
    
    // Show loading state
    showLoadingState(true);
    hideResults();
    hideSearchResults();
    
    try {
        console.log('🔍 Searching for:', query);
        
        // Check if input looks like a domain
        const isDomain = query.includes('.') && !query.includes(' ');
        
        if (isDomain) {
            // Direct lookup by domain
            const company = await COMPANY_API.getCompanyByDomain(query);
            if (company) {
                displayCompanyDetails(company);
            } else {
                const fallbackCompany = createFallbackCompanyFromQuery(query, true);
                displayCompanyDetails(fallbackCompany);
                showFallbackMessage(`No exact company record found for "${query}". Generated AI research profile from your search input.`);
            }
        } else {
            // Search by company name
            const results = await COMPANY_API.searchCompanies(query);
            
            if (results.length === 0) {
                const fallbackCompany = createFallbackCompanyFromQuery(query, false);
                displayCompanyDetails(fallbackCompany);
                showFallbackMessage(`No direct dataset match found for "${query}". Generated AI research profile from your search input.`);
                return;
            }
            
            console.log(`✅ Found ${results.length} results`);
            searchResults = results;
            
            // If only one result, show details directly
            if (results.length === 1) {
                displayCompanyDetails(results[0]);
            } else {
                // Display search results as clickable cards
                displaySearchResults(results);
            }
        }
        
    } catch (error) {
        console.error('❌ Search error:', error);
        const fallbackCompany = createFallbackCompanyFromQuery(query, query.includes('.') && !query.includes(' '));
        displayCompanyDetails(fallbackCompany);
        showFallbackMessage(`Search service had an issue. Showing AI-generated profile for "${query}".`);
    } finally {
        showLoadingState(false);
    }
}

function createFallbackCompanyFromQuery(query, isDomain) {
    const sanitized = (query || '').trim();
    const cleanDomain = isDomain
        ? sanitized.replace(/^https?:\/\//i, '').replace(/^www\./i, '')
        : `${sanitized.toLowerCase().replace(/[^a-z0-9]+/g, '') || 'company'}.com`;

    const companyName = isDomain
        ? cleanDomain.split('.')[0].replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
        : sanitized;

    return {
        name: companyName || 'Unknown Company',
        domain: cleanDomain,
        url: `https://${cleanDomain}`,
        description: 'AI-generated profile based on user search input.',
        location: 'Unknown',
        foundedYear: 'Unknown',
        category: { industry: 'Unknown', sector: 'Unknown' },
        metrics: { employeesRange: 'Unknown' },
        tags: ['AI Research'],
        tech: []
    };
}

function displaySearchResults(results) {
    const container = document.getElementById('companySearchResults');
    if (!container) return;
    
    // Clear previous results
    container.innerHTML = '';
    container.style.display = 'block';
    
    // Create header
    const header = document.createElement('div');
    header.style.cssText = 'background: white; padding: 15px 20px; border-radius: 8px; margin-bottom: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);';
    header.innerHTML = `
        <h3 style="margin: 0; color: #2c3e50; font-size: 18px;">
            📋 Found ${results.length} ${results.length === 1 ? 'match' : 'matches'} - Click to view details
        </h3>
    `;
    container.appendChild(header);
    
    // Create results grid
    const grid = document.createElement('div');
    grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 15px;';
    
    results.forEach((company, index) => {
        const card = createCompanyCard(company, index);
        grid.appendChild(card);
    });
    
    container.appendChild(grid);
}

function createCompanyCard(company, index) {
    const card = document.createElement('div');
    card.className = 'company-search-card';
    card.style.cssText = `
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        cursor: pointer;
        transition: all 0.3s ease;
        border: 2px solid transparent;
    `;
    
    // Clearbit data structure
    const logo = company.logo || '';
    const domain = company.domain || 'N/A';
    
    card.innerHTML = `
        <div style="display: flex; align-items: start; gap: 15px; margin-bottom: 12px;">
            ${logo ? `<img src="${logo}" alt="${company.name}" style="width: 48px; height: 48px; border-radius: 8px; object-fit: contain; background: #f8f9fa; padding: 4px;">` : ''}
            <div style="flex: 1;">
                <h4 style="margin: 0 0 4px 0; color: #2c3e50; font-size: 16px;">
                    ${company.name}
                </h4>
                <div style="font-size: 13px; color: #666;">
                    🌐 ${domain}
                </div>
            </div>
        </div>
        
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #ecf0f1;">
            <span style="color: #3498db; font-weight: 600; font-size: 13px;">
                → Click to view full details
            </span>
        </div>
    `;
    
    // Hover effects
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-2px)';
        card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        card.style.borderColor = '#3498db';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
        card.style.borderColor = 'transparent';
    });
    
    // Click to view details
    card.addEventListener('click', () => {
        selectCompany(company, index);
    });
    
    return card;
}

async function selectCompany(company, index) {
    console.log('📊 Selected company:', company.name);
    
    // Highlight selected card
    const cards = document.querySelectorAll('.company-search-card');
    cards.forEach((card, i) => {
        if (i === index) {
            card.style.borderColor = '#3498db';
            card.style.backgroundColor = '#f0f8ff';
        } else {
            card.style.borderColor = 'transparent';
            card.style.backgroundColor = 'white';
        }
    });
    
    // Show loading for details
    showDetailLoadingState(true);
    
    try {
        // Fetch detailed information by domain
        const details = await COMPANY_API.getCompanyByDomain(company.domain);
        
        if (details) {
            selectedCompany = details;
            displayCompanyDetails(details);
        } else {
            // Show basic info if detailed lookup fails
            displayCompanyDetails(company);
        }
    } catch (error) {
        console.error('❌ Error fetching company details:', error);
        showErrorMessage('Failed to load company details. Showing basic information.');
        displayCompanyDetails(company);
    } finally {
        showDetailLoadingState(false);
    }
}

// ===== COMPANY RESEARCH AI SUMMARY (GEMINI) =====
function getResearchGeminiApiKey() {
    return (
        window.CONFIG?.GEMINI_API_KEY ||
        localStorage.getItem('gemini_api_key') ||
        localStorage.getItem('geminiApiKey') ||
        ''
    );
}

function buildCompanyResearchPrompt(company) {
    const companyName = company?.name || company?.domain || 'Unknown Company';
    const industry = company?.category?.industry || 'Unknown';
    const sector = company?.category?.sector || 'Unknown';
    const location = company?.location || company?.geo?.city || 'Unknown';
    const founded = company?.foundedYear || 'Unknown';

    return `Research company intelligence for "${companyName}".

Known context:
- Company: ${companyName}
- Industry: ${industry}
- Sector: ${sector}
- Location: ${location}
- Founded: ${founded}
- Domain: ${company?.domain || 'Unknown'}

Return a concise professional report with these sections:
1) Company Overview
2) Ownership & Leadership (owners/founders/executives)
3) Company Size (employee range)
4) Estimated Financials (revenue range if available)
5) Technology Footprint
6) Recent Signals (news, hiring, funding, risks)
7) MSP Opportunity Assessment (3-5 bullets)
8) Confidence & Gaps
9) Suggested Discovery Questions (5)

Rules:
- Do not invent facts.
- If data is unavailable, state "Unknown".
- Use bullets and short paragraphs.`;
}

async function fetchCompanyResearchSummaryFromGemini(company) {
    const apiKey = getResearchGeminiApiKey();
    if (!apiKey) {
        throw new Error('Gemini API key not found. Add GEMINI_API_KEY to config.js.');
    }

    const API_BASE = 'https://generativelanguage.googleapis.com';
    const versionsToTry = ['v1', 'v1beta'];
    const prompt = buildCompanyResearchPrompt(company);
    const discoveredModels = [];
    let lastError = 'Unknown Gemini error';

    function normalizeModelName(name) {
        return name.startsWith('models/') ? name : `models/${name}`;
    }

    function scoreModel(name) {
        const lower = name.toLowerCase();
        if (lower.includes('gemini-2.5-flash')) return 100;
        if (lower.includes('gemini-2.0-flash')) return 95;
        if (lower.includes('gemini-1.5-flash')) return 90;
        if (lower.includes('gemini-1.5-pro')) return 80;
        if (lower.includes('gemini') && lower.includes('flash')) return 70;
        if (lower.includes('gemini')) return 50;
        return 0;
    }

    for (const apiVersion of versionsToTry) {
        const listUrl = `${API_BASE}/${apiVersion}/models?key=${encodeURIComponent(apiKey)}`;
        try {
            const listResp = await fetch(listUrl);
            if (!listResp.ok) {
                const txt = await listResp.text();
                lastError = `ListModels ${apiVersion} failed (${listResp.status}): ${txt.slice(0, 140)}`;
                continue;
            }

            const listData = await listResp.json();
            const models = (listData.models || [])
                .filter(model => Array.isArray(model.supportedGenerationMethods) && model.supportedGenerationMethods.includes('generateContent'))
                .map(model => normalizeModelName(model.name))
                .filter(name => name.toLowerCase().includes('gemini'))
                .sort((a, b) => scoreModel(b) - scoreModel(a));

            models.forEach(modelName => discoveredModels.push({ apiVersion, modelName }));
        } catch (error) {
            lastError = `ListModels ${apiVersion} network error: ${error.message}`;
        }
    }

    if (discoveredModels.length === 0) {
        throw new Error(`No compatible Gemini model found from ListModels. ${lastError}`);
    }

    async function generateWithCandidate(candidateModel, basePrompt) {
        const endpoint = `${API_BASE}/${candidateModel.apiVersion}/${candidateModel.modelName}:generateContent?key=${encodeURIComponent(apiKey)}`;
        let combined = '';
        let currentPrompt = basePrompt;
        const maxChunks = 4;

        for (let chunkIndex = 0; chunkIndex < maxChunks; chunkIndex++) {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: currentPrompt }] }],
                    generationConfig: {
                        temperature: 0.2,
                        maxOutputTokens: 4096
                    }
                })
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(`${candidateModel.modelName} (${candidateModel.apiVersion}) failed (${response.status}): ${errText.slice(0, 160)}`);
            }

            const data = await response.json();
            const candidateData = data?.candidates?.[0];
            const textChunk = (candidateData?.content?.parts || [])
                .map(part => part.text || '')
                .join('\n')
                .trim();
            const finishReason = candidateData?.finishReason || '';

            if (!textChunk) {
                throw new Error(`${candidateModel.modelName} returned empty response.`);
            }

            combined += (combined ? '\n\n' : '') + textChunk;

            if (finishReason === 'MAX_TOKENS') {
                currentPrompt = `Continue exactly where you left off for "${company?.name || 'the company'}". Do not repeat prior text. Output continuation only.`;
                continue;
            }

            return combined;
        }

        return combined;
    }

    for (const candidate of discoveredModels) {
        try {
            const text = await generateWithCandidate(candidate, prompt);
            if (text) return text;
            lastError = `${candidate.modelName} returned empty response.`;
        } catch (error) {
            lastError = error.message || String(error);
        }
    }

    throw new Error(`No compatible Gemini model found. Last error: ${lastError}`);
}

function setupCompanyResearchAISummary(company) {
    const generateBtn = document.getElementById('crGenerateAiSummary');
    const copyBtn = document.getElementById('crCopyAiSummary');
    const status = document.getElementById('crAiSummaryStatus');
    const output = document.getElementById('crAiSummaryOutput');

    if (!generateBtn || !status || !output) return;

    const runSummary = async () => {
        const originalText = generateBtn.textContent;
        generateBtn.disabled = true;
        generateBtn.textContent = 'Generating...';
        status.textContent = `Researching ${company?.name || 'company'} with Gemini...`;

        try {
            const summary = await fetchCompanyResearchSummaryFromGemini(company);
            output.dataset.rawSummary = summary;
            output.innerHTML = renderCompanyResearchSummary(summary);
            status.textContent = 'AI company summary generated.';
        } catch (error) {
            output.dataset.rawSummary = '';
            output.innerHTML = '';
            status.textContent = `Error: ${error.message}`;
        } finally {
            generateBtn.disabled = false;
            generateBtn.textContent = originalText;
        }
    };

    generateBtn.addEventListener('click', runSummary);

    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(output.dataset.rawSummary || output.textContent || '');
                status.textContent = 'Summary copied to clipboard.';
            } catch (error) {
                status.textContent = 'Unable to copy summary.';
            }
        });
    }

    // Auto-generate so users get intelligence for any searched company immediately.
    runSummary();
}

function escapeHtml(text) {
    return String(text || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function normalizeInlineMarkdown(text) {
    const escaped = escapeHtml(text);
    return escaped
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
}

function renderCompanyResearchSummary(rawText) {
    const lines = String(rawText || '')
        .split('\n')
        .map(line => line.trim());

    const sections = [];
    let currentSection = { title: 'Executive Summary', content: [] };

    const isHeading = (line) =>
        /^\*\*.+\*\*$/.test(line) ||
        /^\d+\)\s+.+/.test(line) ||
        /^[A-Za-z][A-Za-z0-9\s&/-]{2,}:\s*$/.test(line);

    const cleanHeading = (line) =>
        line
            .replace(/^\*\*/, '')
            .replace(/\*\*$/, '')
            .replace(/^\d+\)\s+/, '')
            .replace(/:\s*$/, '')
            .trim();

    for (const line of lines) {
        if (!line) {
            currentSection.content.push({ type: 'spacer', value: '' });
            continue;
        }

        if (isHeading(line)) {
            if (currentSection.content.length > 0) {
                sections.push(currentSection);
            }
            currentSection = { title: cleanHeading(line), content: [] };
            continue;
        }

        if (/^[-*•]\s+/.test(line)) {
            currentSection.content.push({ type: 'bullet', value: line.replace(/^[-*•]\s+/, '') });
            continue;
        }

        const keyValueMatch = line.match(/^\*\*?([^:*]{2,})\*?\*?:\s+(.+)$/);
        if (keyValueMatch) {
            currentSection.content.push({
                type: 'kv',
                key: keyValueMatch[1].trim(),
                value: keyValueMatch[2].trim()
            });
            continue;
        }

        currentSection.content.push({ type: 'text', value: line });
    }

    if (currentSection.content.length > 0) {
        sections.push(currentSection);
    }

    const cards = sections.map(section => {
        const body = section.content.map(item => {
            if (item.type === 'bullet') {
                return `<div style="display:flex; gap:8px; margin:6px 0;"><span style="color:#3498db;">•</span><span>${normalizeInlineMarkdown(item.value)}</span></div>`;
            }
            if (item.type === 'kv') {
                return `<div style="display:grid; grid-template-columns:170px 1fr; gap:8px; margin:6px 0;"><div style="font-weight:600; color:#2f3f52;">${escapeHtml(item.key)}</div><div>${normalizeInlineMarkdown(item.value)}</div></div>`;
            }
            if (item.type === 'spacer') {
                return '<div style="height:6px;"></div>';
            }
            return `<p style="margin:6px 0; line-height:1.6;">${normalizeInlineMarkdown(item.value)}</p>`;
        }).join('');

        return `
            <section style="background:#fff; border:1px solid #e3e7eb; border-radius:10px; padding:12px 14px; margin-bottom:10px; box-shadow:0 1px 2px rgba(0,0,0,0.03);">
                <h4 style="margin:0 0 8px 0; color:#1f2d3d; font-size:15px; border-left:3px solid #3498db; padding-left:8px;">
                    ${escapeHtml(section.title)}
                </h4>
                <div style="font-size:13px; color:#2c3e50;">
                    ${body}
                </div>
            </section>
        `;
    }).join('');

    return `
        <div style="background:#f7f9fc; border:1px solid #dde5ef; border-radius:10px; padding:10px;">
            ${cards || '<p style="margin:0;">No summary available.</p>'}
        </div>
    `;
}

function displayCompanyDetails(company) {
    const container = document.getElementById('companyProfileCard');
    if (!container) return;
    
    container.style.display = 'block';
    container.style.maxHeight = 'calc(100vh - 180px)';
    container.style.overflowY = 'auto';

    container.innerHTML = `
        <div style="border-bottom: 2px solid #3498db; padding-bottom: 15px; margin-bottom: 16px;">
            <h2 style="margin: 0 0 5px 0; color: #2c3e50; font-size: 24px;">${company.name || 'Company Research'}</h2>
            <div style="color: #666; font-size: 14px;">
                🌐 ${company.domain || 'N/A'}
                ${company.url ? ` • <a href="${company.url}" target="_blank" style="color: #3498db;">Visit Website ↗</a>` : ''}
            </div>
        </div>

        <div>
            <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 10px;">
                <h3 style="margin: 0; color: #2c3e50;">🤖 AI Company Intelligence</h3>
                <div style="display: flex; gap: 8px;">
                    <button id="crGenerateAiSummary" class="e-btn e-primary e-small">Generate AI Summary</button>
                    <button id="crCopyAiSummary" class="e-btn e-outline e-small">Copy</button>
                </div>
            </div>
            <div id="crAiSummaryStatus" style="font-size: 12px; color: #6c757d; margin-bottom: 10px;">
                Generate a full company intelligence report using Gemini.
            </div>
            <div id="crAiSummaryOutput" style="line-height: 1.6; font-size: 13px; color: #2c3e50; background: white; border: 1px solid #e3e7eb; border-radius: 8px; padding: 14px; min-height: 220px;">
                <div style="background:#f7f9fc; border:1px dashed #c9d4e0; color:#607080; border-radius:8px; padding:14px;">
                    No AI summary generated yet.
                </div>
            </div>
        </div>
    `;

    setupCompanyResearchAISummary(company);
}

function formatAddress(address) {
    if (typeof address === 'string') {
        return address;
    }
    
    const parts = [];
    if (address.street_address) parts.push(address.street_address);
    if (address.locality) parts.push(address.locality);
    if (address.region) parts.push(address.region);
    if (address.postal_code) parts.push(address.postal_code);
    if (address.country) parts.push(address.country);
    
    return parts.join('<br>') || 'Address not available';
}

// ===== UI STATE FUNCTIONS =====
function showLoadingState(show) {
    const loading = document.getElementById('companySearchLoading');
    if (loading) {
        loading.style.display = show ? 'block' : 'none';
    }
}

function showDetailLoadingState(show) {
    const container = document.getElementById('companyProfileCard');
    if (!container) return;
    
    if (show) {
        container.style.display = 'block';
        container.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <p style="color: #666; font-size: 16px;">⏳ Loading company details...</p>
            </div>
        `;
    }
}

function hideResults() {
    const container = document.getElementById('companyProfileCard');
    if (container) {
        container.style.display = 'none';
    }
}

function hideSearchResults() {
    const container = document.getElementById('companySearchResults');
    if (container) {
        container.style.display = 'none';
    }
}

function showNoResultsMessage() {
    const container = document.getElementById('companySearchResults');
    if (!container) return;
    
    container.style.display = 'block';
    container.innerHTML = `
        <div style="background: white; padding: 40px; border-radius: 8px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
            <p style="font-size: 18px; color: #666; margin: 0;">
                🔍 No companies found matching your search.
            </p>
            <p style="font-size: 14px; color: #999; margin: 10px 0 0 0;">
                Try a different company name or check the spelling.
            </p>
        </div>
    `;
}

function showFallbackMessage(message) {
    const container = document.getElementById('companySearchResults');
    if (!container) return;

    container.style.display = 'block';
    container.innerHTML = `
        <div style="background: #eef8ff; padding: 16px; border-radius: 8px; border-left: 4px solid #3498db;">
            <p style="font-size: 14px; color: #2c3e50; margin: 0;">
                🤖 ${message}
            </p>
        </div>
    `;
}

function showErrorMessage(message) {
    const container = document.getElementById('companySearchResults');
    if (!container) return;
    
    container.style.display = 'block';
    container.innerHTML = `
        <div style="background: #fee; padding: 20px; border-radius: 8px; border-left: 4px solid #e74c3c;">
            <p style="font-size: 16px; color: #c0392b; margin: 0;">
                ❌ ${message}
            </p>
        </div>
    `;
}

// ===== EXPORTS =====
if (typeof window !== 'undefined') {
    window.CompanyResearch = {
        initializeCompanyResearchPage,
        performSearch,
        COMPANY_API
    };
}
