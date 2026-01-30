/**
 * Express Server Setup
 * Main server file for MSP Project Calendar
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');

const pool = require('./db/connection');
const ProjectRepository = require('./db/repositories/projectRepository');
const ApiSettingsRepository = require('./db/repositories/apiSettingsRepository');

const app = express();

// ===== MIDDLEWARE =====

// Security
app.use(helmet());

// Logging
app.use(morgan('combined'));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true
}));

// Serve static files (frontend)
app.use(express.static('.'));

// ===== ROUTES =====

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// ===== PROJECT ROUTES =====

// Get all projects
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await ProjectRepository.getAll(req.query);
        res.json({
            success: true,
            data: projects,
            count: projects.length
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get project by ID
app.get('/api/projects/:id', async (req, res) => {
    try {
        const project = await ProjectRepository.getById(req.params.id);
        if (!project) {
            return res.status(404).json({ success: false, error: 'Project not found' });
        }
        res.json({ success: true, data: project });
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get projects with team members
app.get('/api/projects-with-team', async (req, res) => {
    try {
        const projects = await ProjectRepository.getWithTeamMembers();
        res.json({ success: true, data: projects });
    } catch (error) {
        console.error('Error fetching projects with team:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Create project
app.post('/api/projects', async (req, res) => {
    try {
        const project = await ProjectRepository.create(req.body);
        res.status(201).json({ success: true, data: project });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Update project
app.put('/api/projects/:id', async (req, res) => {
    try {
        const project = await ProjectRepository.update(req.params.id, req.body);
        if (!project) {
            return res.status(404).json({ success: false, error: 'Project not found' });
        }
        res.json({ success: true, data: project });
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Delete project
app.delete('/api/projects/:id', async (req, res) => {
    try {
        const result = await ProjectRepository.delete(req.params.id);
        if (!result) {
            return res.status(404).json({ success: false, error: 'Project not found' });
        }
        res.json({ success: true, message: 'Project deleted' });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get projects by date range
app.get('/api/projects/range', async (req, res) => {
    try {
        const { start_date, end_date } = req.query;
        if (!start_date || !end_date) {
            return res.status(400).json({ 
                success: false, 
                error: 'start_date and end_date are required' 
            });
        }
        const projects = await ProjectRepository.getByDateRange(start_date, end_date);
        res.json({ success: true, data: projects });
    } catch (error) {
        console.error('Error fetching projects by date range:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// ===== TEAM MEMBERS ROUTES =====

// Get all team members
app.get('/api/team-members', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM team_members WHERE is_active = true;');
        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error fetching team members:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Create team member
app.post('/api/team-members', async (req, res) => {
    try {
        const { name, email, role, color_gradient, max_daily_hours } = req.body;
        const result = await pool.query(
            `INSERT INTO team_members (name, email, role, color_gradient, max_daily_hours) 
             VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
            [name, email, role, color_gradient, max_daily_hours || 8]
        );
        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error creating team member:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// ===== COMPANY RESEARCH (GOOGLE SCRAPING) =====
const axios = require('axios');
const cheerio = require('cheerio');

// Helper function to scrape Google search results
async function scrapeGoogleForCompany(query) {
    try {
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query + ' company official website')}`;
        
        console.log('🌐 Scraping URL:', searchUrl);
        
        const response = await axios.get(searchUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Accept-Encoding': 'gzip, deflate',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'none'
            },
            timeout: 10000
        });
        
        const $ = cheerio.load(response.data);
        const results = [];
        
        console.log('📄 Response status:', response.status);
        console.log('📄 HTML length:', response.data.length);
        
        // Try multiple selectors for search results
        const selectors = [
            'div.g',           // Standard result
            'div[data-sokoban-container]', // New Google layout
            '.tF2Cxc',         // Another common selector
            'div[jscontroller]' // JS-rendered results
        ];
        
        let foundResults = false;
        for (const selector of selectors) {
            const elements = $(selector);
            console.log(`🔍 Selector "${selector}" found ${elements.length} elements`);
            
            if (elements.length > 0) {
                foundResults = true;
                elements.each((i, element) => {
                    if (i >= 5) return; // Limit to 5 results
                    
                    const $result = $(element);
                    
                    // Try multiple title selectors
                    const title = $result.find('h3').first().text().trim() ||
                                $result.find('div[role="heading"]').first().text().trim() ||
                                $result.find('.LC20lb').first().text().trim();
                    
                    // Try multiple link selectors
                    const link = $result.find('a').first().attr('href') ||
                               $result.find('a[href^="http"]').first().attr('href');
                    
                    // Try multiple description selectors
                    const snippet = $result.find('.VwiC3b').first().text().trim() ||
                                  $result.find('.IsZvec').first().text().trim() ||
                                  $result.find('.lEBKkf').first().text().trim() ||
                                  $result.find('span').first().text().trim();
                    
                    if (title && link && link.startsWith('http')) {
                        console.log(`✓ Found result ${i + 1}: ${title.substring(0, 50)}...`);
                        results.push({
                            name: title,
                            url: link,
                            description: snippet || 'No description available',
                            domain: extractDomain(link)
                        });
                    }
                });
                
                if (results.length > 0) break;
            }
        }
        
        if (!foundResults || results.length === 0) {
            console.warn('⚠️  No results found with any selector. HTML snippet:');
            console.log(response.data.substring(0, 500));
            
            // Check if Google is blocking us
            if (response.data.includes('enablejs') || response.data.includes('captcha')) {
                console.error('🚫 Google is blocking our requests (bot detection)');
                throw new Error('Google blocked the request - using fallback');
            }
        }
        
        return {
            knowledgeGraph: null, // Simplified for now
            results: results
        };
    } catch (error) {
        console.error('❌ Error scraping Google:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        }
        throw error;
    }
}

// Helper to extract domain from URL
function extractDomain(url) {
    try {
        const urlObj = new URL(url);
        return urlObj.hostname.replace('www.', '');
    } catch {
        return null;
    }
}

// Helper to scrape company website for additional info
async function scrapeCompanyWebsite(url) {
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            timeout: 5000,
            maxRedirects: 5
        });
        
        const $ = cheerio.load(response.data);
        
        // Extract meta description
        const description = $('meta[name="description"]').attr('content') || 
                          $('meta[property="og:description"]').attr('content') || '';
        
        // Extract company name from title or og:title
        const name = $('meta[property="og:title"]').attr('content') || 
                    $('title').text().trim();
        
        // Look for logo
        const logo = $('meta[property="og:image"]').attr('content') || 
                    $('link[rel="icon"]').attr('href') ||
                    $('link[rel="apple-touch-icon"]').attr('href');
        
        // Try to find social media links
        const social = {
            linkedin: $('a[href*="linkedin.com"]').attr('href'),
            twitter: $('a[href*="twitter.com"]').attr('href') || $('a[href*="x.com"]').attr('href'),
            facebook: $('a[href*="facebook.com"]').attr('href')
        };
        
        return {
            name: name,
            description: description,
            logo: logo,
            social: social
        };
    } catch (error) {
        console.warn('Could not scrape company website:', error.message);
        return null;
    }
}

// API route: Search for companies using Google
app.get('/api/company/search', async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ success: false, error: 'Query parameter required' });
        }
        
        console.log('🔍 Searching Google for company:', q);
        
        const googleData = await scrapeGoogleForCompany(q);
        
        // Combine knowledge graph and search results
        const results = [];
        
        if (googleData.knowledgeGraph) {
            results.push({
                name: googleData.knowledgeGraph.name,
                domain: extractDomain(googleData.knowledgeGraph.website || googleData.knowledgeGraph.url || ''),
                url: googleData.knowledgeGraph.website || googleData.knowledgeGraph.url,
                description: googleData.knowledgeGraph.description,
                logo: googleData.knowledgeGraph.website ? `https://logo.clearbit.com/${extractDomain(googleData.knowledgeGraph.website)}` : null,
                source: 'knowledge_graph'
            });
        }
        
        // Add search results
        googleData.results.forEach(result => {
            // Skip if already in results
            if (!results.find(r => r.domain === result.domain)) {
                results.push({
                    name: result.name,
                    domain: result.domain,
                    url: result.url,
                    description: result.description,
                    logo: result.domain ? `https://logo.clearbit.com/${result.domain}` : null,
                    source: 'search_result'
                });
            }
        });
        
        if (results.length === 0) {
            console.warn('⚠️  Returning empty results - frontend will use mock fallback');
        } else {
            console.log('✅ Found', results.length, 'companies via Google search');
        }
        
        res.json({ success: true, data: results });
        
    } catch (error) {
        console.error('❌ Error in company search:', error);
        res.status(500).json({ success: false, error: 'Failed to search companies. Please try again.' });
    }
});

// API route: Get detailed company info by domain
app.get('/api/company/lookup', async (req, res) => {
    try {
        const { domain } = req.query;
        if (!domain) {
            return res.status(400).json({ success: false, error: 'Domain parameter required' });
        }
        
        console.log('📊 Looking up company details for:', domain);
        
        // Build the URL
        let url = domain;
        if (!url.startsWith('http')) {
            url = 'https://' + url;
        }
        
        // Scrape the company website
        const websiteData = await scrapeCompanyWebsite(url);
        
        // Also search Google for more info
        const googleData = await scrapeGoogleForCompany(domain);
        
        // Combine data
        const companyData = {
            name: websiteData?.name || googleData.knowledgeGraph?.name || domain,
            domain: extractDomain(url),
            url: url,
            description: websiteData?.description || googleData.knowledgeGraph?.description || 'No description available',
            logo: websiteData?.logo || `https://logo.clearbit.com/${extractDomain(url)}`,
            location: 'N/A',
            foundedYear: 'N/A',
            category: {
                sector: 'N/A',
                industry: 'N/A'
            },
            metrics: {
                employees: 'N/A',
                employeesRange: 'N/A'
            },
            social: websiteData?.social || {},
            linkedin: websiteData?.social?.linkedin ? { handle: extractDomain(websiteData.social.linkedin) } : null,
            twitter: websiteData?.social?.twitter ? { handle: extractDomain(websiteData.social.twitter) } : null,
            facebook: websiteData?.social?.facebook ? { handle: extractDomain(websiteData.social.facebook) } : null,
            tags: [],
            tech: []
        };
        
        console.log('✅ Company details retrieved:', companyData.name);
        res.json({ success: true, data: companyData });
        
    } catch (error) {
        console.error('❌ Error looking up company:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch company details. Please try again.' });
    }
});

// ===== API SETTINGS ROUTES =====

// Get all API settings (masked values)
app.get('/api/settings', async (req, res) => {
    try {
        const settings = await ApiSettingsRepository.getAllAsObject();
        res.json({ success: true, data: settings });
    } catch (error) {
        console.error('Error fetching settings:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get a specific setting by key
app.get('/api/settings/:key', async (req, res) => {
    try {
        const setting = await ApiSettingsRepository.getByKey(req.params.key);
        if (!setting) {
            return res.status(404).json({ success: false, error: 'Setting not found' });
        }
        res.json({ success: true, data: setting });
    } catch (error) {
        console.error('Error fetching setting:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Update a single setting
app.put('/api/settings/:key', async (req, res) => {
    try {
        const { value } = req.body;
        if (value === undefined) {
            return res.status(400).json({ success: false, error: 'value is required' });
        }
        const setting = await ApiSettingsRepository.update(req.params.key, value);
        if (!setting) {
            return res.status(404).json({ success: false, error: 'Setting not found' });
        }
        res.json({ success: true, data: setting });
    } catch (error) {
        console.error('Error updating setting:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Bulk update multiple settings
app.post('/api/settings/bulk', async (req, res) => {
    try {
        const settings = req.body;
        if (!settings || typeof settings !== 'object') {
            return res.status(400).json({ 
                success: false, 
                error: 'settings object is required' 
            });
        }
        const results = await ApiSettingsRepository.bulkUpdate(settings);
        res.json({ success: true, data: results, count: results.length });
    } catch (error) {
        console.error('Error bulk updating settings:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Delete a setting
app.delete('/api/settings/:key', async (req, res) => {
    try {
        const result = await ApiSettingsRepository.delete(req.params.key);
        if (!result) {
            return res.status(404).json({ success: false, error: 'Setting not found' });
        }
        res.json({ success: true, message: 'Setting deleted' });
    } catch (error) {
        console.error('Error deleting setting:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// ===== CALL HISTORY ROUTES =====

// Get call history
app.get('/api/calls', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM call_history ORDER BY created_at DESC LIMIT 100;'
        );
        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error fetching call history:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Log a call
app.post('/api/calls', async (req, res) => {
    try {
        const { from_number, to_number, call_type, duration_seconds, status } = req.body;
        const result = await pool.query(
            `INSERT INTO call_history (from_number, to_number, call_type, duration_seconds, status) 
             VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
            [from_number, to_number, call_type, duration_seconds, status]
        );
        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error logging call:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// ===== ERROR HANDLING =====

// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ 
        success: false, 
        error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message 
    });
});

// ===== START SERVER =====

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, HOST, () => {
    console.log(`
╔════════════════════════════════════════════╗
║  MSP Project Calendar Server               ║
║  Started on http://${HOST}:${PORT}        ║
║  Environment: ${process.env.NODE_ENV || 'development'}          ║
╚════════════════════════════════════════════╝
    `);
});

module.exports = app;



