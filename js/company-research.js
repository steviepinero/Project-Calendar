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
                showNoResultsMessage();
            }
        } else {
            // Search by company name
            const results = await COMPANY_API.searchCompanies(query);
            
            if (results.length === 0) {
                showNoResultsMessage();
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
        showErrorMessage('Failed to search companies. Please try again.');
    } finally {
        showLoadingState(false);
    }
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

function displayCompanyDetails(company) {
    const container = document.getElementById('companyProfileCard');
    if (!container) return;
    
    container.style.display = 'block';
    
    // Clearbit data structure
    const logo = company.logo || '';
    const description = company.description || 'No description available';
    const location = company.location || company.geo?.city || 'N/A';
    const employees = company.metrics?.employees || company.metrics?.employeesRange || 'N/A';
    const founded = company.foundedYear || 'N/A';
    const industry = company.category?.industry || 'N/A';
    const sector = company.category?.sector || '';
    const tags = company.tags || [];
    const tech = company.tech || [];
    
    container.innerHTML = `
        <div style="border-bottom: 2px solid #3498db; padding-bottom: 15px; margin-bottom: 20px;">
            <div style="display: flex; align-items: center; gap: 15px;">
                ${logo ? `<img src="${logo}" alt="${company.name}" style="width: 64px; height: 64px; border-radius: 8px; object-fit: contain; background: #f8f9fa; padding: 8px;">` : ''}
                <div style="flex: 1;">
                    <h2 style="margin: 0 0 5px 0; color: #2c3e50; font-size: 24px;">${company.name}</h2>
                    <div style="color: #666; font-size: 14px;">
                        🌐 ${company.domain || 'N/A'}
                        ${company.url ? ` • <a href="${company.url}" target="_blank" style="color: #3498db;">Visit Website ↗</a>` : ''}
                    </div>
                </div>
            </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
            <!-- Left Column -->
            <div style="display: grid; gap: 20px;">
                <div>
                    <h3 style="margin: 0 0 10px 0; color: #2c3e50; font-size: 16px; border-bottom: 1px solid #ecf0f1; padding-bottom: 8px;">
                        📋 Company Overview
                    </h3>
                    <div style="font-size: 14px; color: #555; line-height: 1.6; margin-bottom: 15px;">
                        ${description}
                    </div>
                    <div style="display: grid; gap: 10px; font-size: 14px;">
                        <div>
                            <strong style="color: #555;">Industry:</strong>
                            <span style="color: #2c3e50;">${industry}${sector ? ` (${sector})` : ''}</span>
                        </div>
                        <div>
                            <strong style="color: #555;">Location:</strong>
                            <span style="color: #2c3e50;">${location}</span>
                        </div>
                        <div>
                            <strong style="color: #555;">Founded:</strong>
                            <span style="color: #2c3e50;">${founded}</span>
                        </div>
                        <div>
                            <strong style="color: #555;">Employees:</strong>
                            <span style="color: #2c3e50;">${employees}</span>
                        </div>
                        ${company.metrics?.marketCap ? `
                        <div>
                            <strong style="color: #555;">Market Cap:</strong>
                            <span style="color: #2c3e50;">$${company.metrics.marketCap.toLocaleString()}</span>
                        </div>
                        ` : ''}
                        ${company.metrics?.annualRevenue ? `
                        <div>
                            <strong style="color: #555;">Annual Revenue:</strong>
                            <span style="color: #2c3e50;">$${company.metrics.annualRevenue.toLocaleString()}</span>
                        </div>
                        ` : ''}
                    </div>
                </div>
                
                ${tags.length > 0 ? `
                <div>
                    <h3 style="margin: 0 0 10px 0; color: #2c3e50; font-size: 16px; border-bottom: 1px solid #ecf0f1; padding-bottom: 8px;">
                        🏷️ Tags
                    </h3>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                        ${tags.map(tag => `
                            <span style="background: #e8f4f8; color: #3498db; padding: 4px 12px; border-radius: 12px; font-size: 12px;">
                                ${tag}
                            </span>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
            </div>
            
            <!-- Right Column -->
            <div style="display: grid; gap: 20px;">
                ${tech.length > 0 ? `
                <div>
                    <h3 style="margin: 0 0 10px 0; color: #2c3e50; font-size: 16px; border-bottom: 1px solid #ecf0f1; padding-bottom: 8px;">
                        💻 Technology Stack
                    </h3>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                        ${tech.slice(0, 15).map(t => `
                            <span style="background: #f0f0f0; color: #555; padding: 4px 10px; border-radius: 4px; font-size: 12px;">
                                ${t}
                            </span>
                        `).join('')}
                        ${tech.length > 15 ? `
                            <span style="color: #666; font-size: 12px; font-style: italic; padding: 4px 10px;">
                                +${tech.length - 15} more
                            </span>
                        ` : ''}
                    </div>
                </div>
                ` : ''}
                
                ${company.linkedin?.handle || company.twitter?.handle || company.facebook?.handle ? `
                <div>
                    <h3 style="margin: 0 0 10px 0; color: #2c3e50; font-size: 16px; border-bottom: 1px solid #ecf0f1; padding-bottom: 8px;">
                        🔗 Social Media
                    </h3>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        ${company.linkedin?.handle ? `
                            <a href="https://linkedin.com/company/${company.linkedin.handle}" target="_blank" style="color: #0077b5; text-decoration: none; font-size: 14px;">
                                → LinkedIn ↗
                            </a>
                        ` : ''}
                        ${company.twitter?.handle ? `
                            <a href="https://twitter.com/${company.twitter.handle}" target="_blank" style="color: #1da1f2; text-decoration: none; font-size: 14px;">
                                → Twitter ↗
                            </a>
                        ` : ''}
                        ${company.facebook?.handle ? `
                            <a href="https://facebook.com/${company.facebook.handle}" target="_blank" style="color: #1877f2; text-decoration: none; font-size: 14px;">
                                → Facebook ↗
                            </a>
                        ` : ''}
                    </div>
                </div>
                ` : ''}
                
                ${company.phone || company.emailProvider ? `
                <div>
                    <h3 style="margin: 0 0 10px 0; color: #2c3e50; font-size: 16px; border-bottom: 1px solid #ecf0f1; padding-bottom: 8px;">
                        📞 Contact Information
                    </h3>
                    <div style="display: grid; gap: 8px; font-size: 14px;">
                        ${company.phone ? `
                            <div>
                                <strong style="color: #555;">Phone:</strong>
                                <span style="color: #2c3e50;">${company.phone}</span>
                            </div>
                        ` : ''}
                        ${company.emailProvider ? `
                            <div>
                                <strong style="color: #555;">Email Provider:</strong>
                                <span style="color: #2c3e50;">${company.emailProvider}</span>
                            </div>
                        ` : ''}
                    </div>
                </div>
                ` : ''}
            </div>
        </div>
    `;
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
