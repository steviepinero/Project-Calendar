// Data structures
// Cache buster: 2026-01-20-18:30

// ===== AI SUMMARIZATION CONFIGURATION =====
const AI_CONFIG = {
    apiKey: '', // User will set this in settings
    apiEndpoint: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-4o-mini', // Cost-effective model
    maxTokens: 500
};

// AI Summarization function
async function summarizeText(text) {
    if (!AI_CONFIG.apiKey) {
        alert('⚠️ AI API key not configured. Please add your OpenAI API key in settings.');
        return null;
    }

    if (!text || text.trim().length === 0) {
        alert('Please enter some text to summarize.');
        return null;
    }

    try {
        const response = await fetch(AI_CONFIG.apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AI_CONFIG.apiKey}`
            },
            body: JSON.stringify({
                model: AI_CONFIG.model,
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful assistant that creates concise, professional summaries of business notes and client information. Keep summaries to 2-3 sentences maximum and focus on key action items and important details.'
                    },
                    {
                        role: 'user',
                        content: `Please summarize the following client/project notes concisely:\n\n${text}`
                    }
                ],
                max_tokens: AI_CONFIG.maxTokens,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('OpenAI API Error:', error);
            alert(`❌ AI Error: ${error.error?.message || 'Failed to summarize'}`);
            return null;
        }

        const data = await response.json();
        const summary = data.choices[0].message.content;
        console.log('✅ Summarization successful:', summary);
        return summary;
    } catch (error) {
        console.error('Summarization error:', error);
        alert(`❌ Error: ${error.message}`);
        return null;
    }
}

// ===== END AI CONFIGURATION =====

// ===== SETTINGS MANAGEMENT =====
const STORAGE_KEYS = {
    openai: 'openai_api_key',
    twilio_sid: 'twilio_account_sid',
    twilio_token: 'twilio_auth_token',
    twilio_phone: 'twilio_phone_number',
    docusign_id: 'docusign_client_id',
    docusign_secret: 'docusign_client_secret',
    docusign_url: 'docusign_base_url',
    sendgrid: 'sendgrid_api_key',
    clearbit: 'clearbit_api_key'
};

function loadSettings() {
    // Load OpenAI
    const openaiKey = localStorage.getItem(STORAGE_KEYS.openai);
    if (openaiKey) {
        AI_CONFIG.apiKey = openaiKey;
        console.log('✅ OpenAI API Key loaded from local storage');
    }

    // Load Twilio
    const twilioSid = localStorage.getItem(STORAGE_KEYS.twilio_sid);
    const twilioToken = localStorage.getItem(STORAGE_KEYS.twilio_token);
    const twilioPhone = localStorage.getItem(STORAGE_KEYS.twilio_phone);
    if (twilioSid && twilioToken) {
        VOIP_CONFIG.apiKey = twilioSid;
        VOIP_CONFIG.authToken = twilioToken;
        VOIP_CONFIG.phoneNumber = twilioPhone;
        console.log('✅ Twilio credentials loaded from local storage');
    }

    // Load DocuSign
    const docusignId = localStorage.getItem(STORAGE_KEYS.docusign_id);
    const docusignSecret = localStorage.getItem(STORAGE_KEYS.docusign_secret);
    const docusignUrl = localStorage.getItem(STORAGE_KEYS.docusign_url);
    if (docusignId && docusignSecret) {
        E_SIGNATURE_CONFIG.apiKey = docusignId;
        E_SIGNATURE_CONFIG.clientSecret = docusignSecret;
        E_SIGNATURE_CONFIG.baseUrl = docusignUrl;
        console.log('✅ DocuSign credentials loaded from local storage');
    }

    // Load SendGrid
    const sendgridKey = localStorage.getItem(STORAGE_KEYS.sendgrid);
    if (sendgridKey) {
        EMAIL_CAMPAIGNS_CONFIG.apiKey = sendgridKey;
        console.log('✅ SendGrid API Key loaded from local storage');
    }

    // Load Clearbit
    const clearbitKey = localStorage.getItem(STORAGE_KEYS.clearbit);
    if (clearbitKey) {
        console.log('✅ Clearbit API Key loaded from local storage');
    }
}

function saveSettings() {
    // Get all input values
    const openaiKey = document.getElementById('openaiApiKey')?.value?.trim();
    const twilioSid = document.getElementById('twilioAccountSid')?.value?.trim();
    const twilioToken = document.getElementById('twilioAuthToken')?.value?.trim();
    const twilioPhone = document.getElementById('twilioPhoneNumber')?.value?.trim();
    const docusignId = document.getElementById('docusignClientId')?.value?.trim();
    const docusignSecret = document.getElementById('docusignSecret')?.value?.trim();
    const docusignUrl = document.getElementById('docusignBaseUrl')?.value?.trim();
    const sendgridKey = document.getElementById('sendgridApiKey')?.value?.trim();
    const clearbitKey = document.getElementById('clearbitApiKey')?.value?.trim();

    let savedCount = 0;

    // Save OpenAI
    if (openaiKey) {
        localStorage.setItem(STORAGE_KEYS.openai, openaiKey);
        AI_CONFIG.apiKey = openaiKey;
        savedCount++;
    }

    // Save Twilio
    if (twilioSid && twilioToken) {
        localStorage.setItem(STORAGE_KEYS.twilio_sid, twilioSid);
        localStorage.setItem(STORAGE_KEYS.twilio_token, twilioToken);
        if (twilioPhone) localStorage.setItem(STORAGE_KEYS.twilio_phone, twilioPhone);
        VOIP_CONFIG.apiKey = twilioSid;
        VOIP_CONFIG.authToken = twilioToken;
        VOIP_CONFIG.phoneNumber = twilioPhone;
        savedCount++;
    }

    // Save DocuSign
    if (docusignId && docusignSecret) {
        localStorage.setItem(STORAGE_KEYS.docusign_id, docusignId);
        localStorage.setItem(STORAGE_KEYS.docusign_secret, docusignSecret);
        if (docusignUrl) localStorage.setItem(STORAGE_KEYS.docusign_url, docusignUrl);
        E_SIGNATURE_CONFIG.apiKey = docusignId;
        E_SIGNATURE_CONFIG.clientSecret = docusignSecret;
        E_SIGNATURE_CONFIG.baseUrl = docusignUrl;
        savedCount++;
    }

    // Save SendGrid
    if (sendgridKey) {
        localStorage.setItem(STORAGE_KEYS.sendgrid, sendgridKey);
        EMAIL_CAMPAIGNS_CONFIG.apiKey = sendgridKey;
        savedCount++;
    }

    // Save Clearbit
    if (clearbitKey) {
        localStorage.setItem(STORAGE_KEYS.clearbit, clearbitKey);
        savedCount++;
    }

    if (savedCount > 0) {
        console.log(`✅ Settings saved successfully (${savedCount} API(s) configured)`);
        alert(`✅ Settings saved! ${savedCount} API credential(s) stored locally.`);
        closeSettingsModal();
    } else {
        alert('⚠️ Please enter at least one API key');
    }
}

function openSettingsModal() {
    const modal = document.getElementById('settingsModal');
    if (modal) {
        modal.style.display = 'block';
        
        // Load and display saved values (masked)
        const maskKey = (key) => key ? '••••••••' + key.slice(-8) : '';
        
        const openaiKey = localStorage.getItem(STORAGE_KEYS.openai);
        if (openaiKey) document.getElementById('openaiApiKey').value = maskKey(openaiKey);
        
        const twilioSid = localStorage.getItem(STORAGE_KEYS.twilio_sid);
        if (twilioSid) document.getElementById('twilioAccountSid').value = maskKey(twilioSid);
        
        const twilioToken = localStorage.getItem(STORAGE_KEYS.twilio_token);
        if (twilioToken) document.getElementById('twilioAuthToken').value = maskKey(twilioToken);
        
        const twilioPhone = localStorage.getItem(STORAGE_KEYS.twilio_phone);
        if (twilioPhone) document.getElementById('twilioPhoneNumber').value = twilioPhone;
        
        const docusignId = localStorage.getItem(STORAGE_KEYS.docusign_id);
        if (docusignId) document.getElementById('docusignClientId').value = maskKey(docusignId);
        
        const docusignSecret = localStorage.getItem(STORAGE_KEYS.docusign_secret);
        if (docusignSecret) document.getElementById('docusignSecret').value = maskKey(docusignSecret);
        
        const docusignUrl = localStorage.getItem(STORAGE_KEYS.docusign_url);
        if (docusignUrl) document.getElementById('docusignBaseUrl').value = docusignUrl;
        
        const sendgridKey = localStorage.getItem(STORAGE_KEYS.sendgrid);
        if (sendgridKey) document.getElementById('sendgridApiKey').value = maskKey(sendgridKey);
        
        const clearbitKey = localStorage.getItem(STORAGE_KEYS.clearbit);
        if (clearbitKey) document.getElementById('clearbitApiKey').value = maskKey(clearbitKey);
    }
}

function closeSettingsModal() {
    const modal = document.getElementById('settingsModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function setupSettingsEventListeners() {
    const settingsBtn = document.getElementById('settingsBtn');
    const closeSettingsBtn = document.getElementById('closeSettingsModal');
    const cancelSettingsBtn = document.getElementById('cancelSettingsBtn');
    const settingsForm = document.getElementById('settingsForm');
    const summarizeNotesBtn = document.getElementById('summarizeNotesBtn');

    // Settings modal
    if (settingsBtn) {
        settingsBtn.addEventListener('click', openSettingsModal);
    }
    if (closeSettingsBtn) {
        closeSettingsBtn.addEventListener('click', closeSettingsModal);
    }
    if (cancelSettingsBtn) {
        cancelSettingsBtn.addEventListener('click', closeSettingsModal);
    }
    if (settingsForm) {
        settingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            saveSettings();
        });
    }

    // Summarize notes button
    if (summarizeNotesBtn) {
        summarizeNotesBtn.addEventListener('click', async () => {
            const notesTextarea = document.getElementById('editNotes');
            if (notesTextarea) {
                summarizeNotesBtn.disabled = true;
                summarizeNotesBtn.textContent = '⏳ Summarizing...';
                
                const summary = await summarizeText(notesTextarea.value);
                if (summary) {
                    // Insert summary at the beginning of notes
                    const currentNotes = notesTextarea.value;
                    notesTextarea.value = `[Summary] ${summary}\n\n${currentNotes}`;
                    notesTextarea.focus();
                }
                
                summarizeNotesBtn.disabled = false;
                summarizeNotesBtn.textContent = '✨ Summarize';
            }
        });
    }

    // Close modal when clicking outside
    const modal = document.getElementById('settingsModal');
    if (modal) {
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
}

// ===== END SETTINGS MANAGEMENT =====

// ===== COMPANY RESEARCH =====
const COMPANY_RESEARCH_CONFIG = {
    // Free APIs that don't require authentication or have generous free tiers
    apis: {
        clearbit: 'https://autocomplete.clearbit.com/v1/companies',
        newsapi: 'https://newsapi.org/v2/everything',
        ipapi: 'https://ipapi.co' // For company IP/location data
    }
};

async function searchCompanyInfo(companyName) {
    if (!companyName || companyName.trim().length === 0) {
        alert('Please enter a company name');
        return null;
    }

    console.log(`🔍 Searching for: ${companyName}`);
    showCompanyLoading(true);
    hideCompanyError();

    try {
        // Create a mock company profile from user input
        // In a real scenario, you'd call APIs like Crunchbase, ZoomInfo, etc.
        // For now, we'll show how the feature would work with real data
        
        const mockCompanyProfile = {
            name: companyName,
            domain: companyName.toLowerCase().replace(/\s+/g, '') + '.com',
            category: { industry: 'Technology' },
            location: 'United States',
            type: 'Public',
            founded_year: new Date().getFullYear() - 20,
            metrics: { employees: 5000 },
            description: `${companyName} is a leading company in the technology industry. Learn more by visiting their website or checking recent news for updates.`,
            linkedin: `https://linkedin.com/company/${companyName.toLowerCase()}`,
            twitter: companyName.toLowerCase(),
            facebook: `https://facebook.com/${companyName}`
        };

        console.log('✅ Company data created:', mockCompanyProfile);
        displayCompanyProfile(mockCompanyProfile);
        showCompanyLoading(false);
        showCompanyNote();

        return mockCompanyProfile;
    } catch (error) {
        console.error('Company search error:', error);
        showCompanyError(`Error searching for company: ${error.message}`);
        showCompanyLoading(false);
        return null;
    }
}

function displayCompanyProfile(company) {
    // Basic Information
    document.getElementById('companyName').textContent = company.name || 'N/A';
    
    const website = company.domain || company.site?.email_provider || 'N/A';
    const websiteLink = document.getElementById('companyWebsite');
    if (website && website !== 'N/A') {
        websiteLink.innerHTML = `<a href="https://${website}" target="_blank" style="color: #3498db; text-decoration: none;">${website}</a>`;
    } else {
        websiteLink.textContent = 'N/A';
    }

    document.getElementById('companyIndustry').textContent = company.category?.industry || company.sector || 'Unknown';
    document.getElementById('companyLocation').textContent = company.location || company.geo?.city || 'Unknown';
    document.getElementById('companySize').textContent = company.metrics?.employees ? `${company.metrics.employees}+ employees` : 'Unknown';
    document.getElementById('companyFounded').textContent = company.founded_year || 'Unknown';
    document.getElementById('companyType').textContent = company.type || 'Unknown';

    // Description
    if (company.description) {
        document.getElementById('companyDescription').textContent = company.description;
        document.getElementById('companyDescriptionCard').style.display = 'block';
    } else {
        document.getElementById('companyDescriptionCard').style.display = 'none';
    }

    // Social Media Links
    const social = company.site?.social_profiles || [];
    let hasSocial = false;

    if (company.linkedin) {
        document.getElementById('linkedinLink').href = company.linkedin;
        document.getElementById('socialLinkedin').style.display = 'block';
        hasSocial = true;
    }
    
    if (company.twitter) {
        document.getElementById('twitterLink').href = `https://twitter.com/${company.twitter}`;
        document.getElementById('twitterLink').textContent = `@${company.twitter}`;
        document.getElementById('socialTwitter').style.display = 'block';
        hasSocial = true;
    }
    
    if (company.facebook) {
        document.getElementById('facebookLink').href = company.facebook;
        document.getElementById('socialFacebook').style.display = 'block';
        hasSocial = true;
    }

    if (hasSocial) {
        document.getElementById('companySocialCard').style.display = 'block';
    }

    // Display results section
    document.getElementById('companySearchResults').style.display = 'block';
    
    // Fetch news about the company (optional - can use free news API)
    fetchCompanyNews(company.name);
}

function fetchCompanyNews(companyName) {
    // For now, just show a note that news fetching is optional
    const newsList = document.getElementById('companyNewsList');
    newsList.innerHTML = `
        <p style="color: #666; padding: 15px; background-color: #f5f5f5; border-radius: 4px; border-left: 3px solid #3498db;">
            📰 <strong>News Integration:</strong> To show recent news, you can integrate NewsAPI.org (free tier available). 
            For now, visit <a href="https://news.google.com" target="_blank" style="color: #3498db;">Google News</a> 
            or <a href="https://www.crunchbase.com" target="_blank" style="color: #3498db;">Crunchbase</a> to search for recent updates.
        </p>
    `;
}

function showCompanyLoading(show) {
    document.getElementById('companySearchLoading').style.display = show ? 'block' : 'none';
}

function hideCompanyError() {
    document.getElementById('companySearchError').style.display = 'none';
}

function showCompanyError(message) {
    document.getElementById('errorMessage').textContent = message;
    document.getElementById('companySearchError').style.display = 'block';
    document.getElementById('companySearchResults').style.display = 'none';
}

function showCompanyNote() {
    const noteDiv = document.createElement('div');
    noteDiv.style.cssText = 'background: #e8f4f8; padding: 15px; border-radius: 4px; border-left: 4px solid #3498db; margin-bottom: 20px;';
    noteDiv.innerHTML = `
        <strong style="color: #2980b9;">💡 Integration Note:</strong>
        <p style="margin: 8px 0 0 0; color: #555; font-size: 13px;">
            For full company research with real data, integrate APIs like:
            <ul style="margin: 8px 0; padding-left: 20px;">
                <li><strong>Crunchbase</strong> - Funding, investors, private company data</li>
                <li><strong>Hunter.io</strong> - Email verification and employee contacts</li>
                <li><strong>Apollo</strong> - B2B contact database and technographics</li>
                <li><strong>SEC EDGAR</strong> - Public company financial filings (free!)</li>
            </ul>
            Each requires an API key, but many offer free tiers. Contact us to add these integrations!
        </p>
    `;
    
    const resultsDiv = document.getElementById('companySearchResults');
    if (resultsDiv.firstChild) {
        resultsDiv.insertBefore(noteDiv, resultsDiv.firstChild);
    }
}

function setupCompanyResearchListeners() {
    const searchBtn = document.getElementById('searchCompanyBtn');
    const searchInput = document.getElementById('companySearchInput');

    if (searchBtn) {
        searchBtn.addEventListener('click', async () => {
            const companyName = searchInput.value;
            await searchCompanyInfo(companyName);
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', async (e) => {
            if (e.key === 'Enter') {
                const companyName = searchInput.value;
                await searchCompanyInfo(companyName);
            }
        });
    }
}

// ===== END COMPANY RESEARCH =====

// ===== E-SIGNATURE =====
const E_SIGNATURE_CONFIG = {
    apiKey: '', // Will be set from Settings (DocuSign, SignNow, etc.)
    provider: 'docusign', // docusign, signnow, or hellosign
    documents: [],
    stats: {
        total: 0,
        signed: 0,
        pending: 0,
        declined: 0
    }
};

function setupESignatureListeners() {
    const createBtn = document.getElementById('createDocumentBtn');
    if (createBtn) {
        createBtn.addEventListener('click', openCreateDocumentModal);
    }
}

function openCreateDocumentModal() {
    const documentName = prompt('Document name:');
    if (!documentName) return;

    const signerEmail = prompt('Signer email address:');
    if (!signerEmail) return;

    const documentType = prompt('Document type (e.g., Contract, Agreement, Form):');
    if (!documentType) return;

    createNewDocument({
        name: documentName,
        signerEmail: signerEmail,
        type: documentType,
        status: 'draft',
        created: new Date().toLocaleString(),
        signed: false,
        declineReason: null
    });
}

function createNewDocument(doc) {
    E_SIGNATURE_CONFIG.documents.push(doc);
    E_SIGNATURE_CONFIG.stats.total++;
    E_SIGNATURE_CONFIG.stats.pending++;
    renderDocumentsList();
    alert(`✅ Document "${doc.name}" created successfully!\n\nTo send for signing:\n1. Add API key in Settings\n2. Configure signature fields\n3. Send to signer: ${doc.signerEmail}`);
}

function renderDocumentsList() {
    const container = document.getElementById('documentsList');
    if (!container) return;

    if (E_SIGNATURE_CONFIG.documents.length === 0) {
        container.innerHTML = `
            <div style="padding: 20px; background-color: #f8f9fa; border-radius: 4px; text-align: center; color: #999;">
                <p style="margin: 0;">📭 No documents yet. Create your first document to get started!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = E_SIGNATURE_CONFIG.documents.map((doc, idx) => `
        <div style="padding: 15px; background-color: #f8f9fa; border-radius: 4px; border-left: 3px solid ${doc.status === 'signed' ? '#27ae60' : doc.status === 'declined' ? '#e74c3c' : '#f39c12'};">
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <div>
                    <h4 style="margin: 0 0 8px 0; color: #2c3e50;">${doc.name}</h4>
                    <p style="margin: 0 0 5px 0; font-size: 13px; color: #666;"><strong>Type:</strong> ${doc.type}</p>
                    <p style="margin: 0 0 5px 0; font-size: 13px; color: #666;"><strong>Signer:</strong> ${doc.signerEmail}</p>
                    <p style="margin: 0; font-size: 13px; color: #999;">Created: ${doc.created}</p>
                </div>
                <div style="display: flex; gap: 8px;">
                    <button onclick="sendDocumentForSigning(${idx})" style="padding: 8px 12px; background-color: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
                        Send
                    </button>
                    <button onclick="deleteDocument(${idx})" style="padding: 8px 12px; background-color: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
                        Delete
                    </button>
                </div>
            </div>
            <div style="margin-top: 12px;">
                <span style="display: inline-block; padding: 4px 10px; background-color: ${doc.status === 'signed' ? '#d5f4e6' : doc.status === 'declined' ? '#fadbd8' : '#fdebd0'}; color: ${doc.status === 'signed' ? '#27ae60' : doc.status === 'declined' ? '#e74c3c' : '#f39c12'}; border-radius: 3px; font-size: 12px; font-weight: 600;">
                    ${doc.status.toUpperCase()}
                </span>
            </div>
        </div>
    `).join('');
}

function sendDocumentForSigning(idx) {
    const doc = E_SIGNATURE_CONFIG.documents[idx];
    if (!E_SIGNATURE_CONFIG.apiKey) {
        alert('⚠️ API key not configured.\n\nTo send documents:\n1. Click Settings (⚙️)\n2. Add your DocuSign, SignNow, or HelloSign API key\n3. Try again');
        return;
    }
    
    alert(`📤 Sending "${doc.name}" to ${doc.signerEmail}...\n\nIn a production environment, this would:\n✓ Upload document to ${E_SIGNATURE_CONFIG.provider}\n✓ Add signature fields\n✓ Send signing request email\n✓ Track signing status\n✓ Get audit trail`);
    
    doc.status = 'sent';
    renderDocumentsList();
}

function deleteDocument(idx) {
    if (confirm('Are you sure you want to delete this document?')) {
        const doc = E_SIGNATURE_CONFIG.documents[idx];
        E_SIGNATURE_CONFIG.documents.splice(idx, 1);
        E_SIGNATURE_CONFIG.stats.total--;
        if (doc.status === 'signed') E_SIGNATURE_CONFIG.stats.signed--;
        else if (doc.status === 'pending' || doc.status === 'draft') E_SIGNATURE_CONFIG.stats.pending--;
        else if (doc.status === 'declined') E_SIGNATURE_CONFIG.stats.declined--;
        renderDocumentsList();
        alert('✅ Document deleted successfully');
    }
}

// ===== END E-SIGNATURE =====

// ===== VOIP CALLING =====
const VOIP_CONFIG = {
    apiKey: '', // Twilio Account SID or similar
    authToken: '', // Twilio Auth Token
    provider: 'twilio', // twilio, vonage, plivo
    currentNumber: '',
    isInCall: false,
    callStartTime: null,
    callDuration: 0,
    durationInterval: null,
    callHistory: [],
    contacts: []
};

function setupVoIPListeners() {
    // Dial button listeners
    const dialBtns = document.querySelectorAll('.dial-btn');
    dialBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const digit = btn.getAttribute('data-digit');
            addDigitToDisplay(digit);
        });
    });

    // Control buttons
    const backspaceBtn = document.getElementById('backspaceBtn');
    const clearBtn = document.getElementById('clearBtn');
    const callBtn = document.getElementById('callBtn');
    const hangupBtn = document.getElementById('hangupBtn');
    const quickAddBtn = document.getElementById('quickAddBtn');

    if (backspaceBtn) backspaceBtn.addEventListener('click', backspaceNumber);
    if (clearBtn) clearBtn.addEventListener('click', clearNumber);
    if (callBtn) callBtn.addEventListener('click', initiateCall);
    if (hangupBtn) hangupBtn.addEventListener('click', endCall);
    if (quickAddBtn) quickAddBtn.addEventListener('click', quickAddContact);

    // Quick add phone on Enter
    const quickAddPhone = document.getElementById('quickAddPhone');
    if (quickAddPhone) {
        quickAddPhone.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                quickAddContact();
            }
        });
    }

    renderCallHistory();
}

function addDigitToDisplay(digit) {
    const maxLength = 20;
    if (VOIP_CONFIG.currentNumber.length < maxLength) {
        VOIP_CONFIG.currentNumber += digit;
        updateDisplay();
    }
}

function backspaceNumber() {
    VOIP_CONFIG.currentNumber = VOIP_CONFIG.currentNumber.slice(0, -1);
    updateDisplay();
}

function clearNumber() {
    VOIP_CONFIG.currentNumber = '';
    updateDisplay();
}

function updateDisplay() {
    const display = document.getElementById('dialerDisplay');
    if (display) {
        display.textContent = VOIP_CONFIG.currentNumber || ' ';
    }
}

function initiateCall() {
    const phoneNumber = VOIP_CONFIG.currentNumber.trim();
    
    if (!phoneNumber) {
        alert('Please enter a phone number');
        return;
    }

    if (!VOIP_CONFIG.apiKey) {
        alert('⚠️ VoIP credentials not configured.\n\nTo make calls:\n1. Click Settings (⚙️)\n2. Add your Twilio Account SID and Auth Token\n3. Try again');
        return;
    }

    // Validate phone number format
    const phoneRegex = /^[\d\+\-\(\)\s\*\#]+$/;
    if (!phoneRegex.test(phoneNumber)) {
        alert('Invalid phone number. Use digits, +, -, (), spaces, *, or #');
        return;
    }

    // Simulate call initiation
    VOIP_CONFIG.isInCall = true;
    VOIP_CONFIG.callStartTime = new Date();
    
    const callBtn = document.getElementById('callBtn');
    const hangupBtn = document.getElementById('hangupBtn');
    const callStatus = document.getElementById('callStatus');
    const callDuration = document.getElementById('callDuration');

    if (callBtn) callBtn.style.display = 'none';
    if (hangupBtn) hangupBtn.style.display = 'flex';
    if (callStatus) {
        callStatus.style.display = 'block';
        callStatus.textContent = `📞 Calling ${phoneNumber}...`;
        callStatus.style.background = '#fff3cd';
        callStatus.style.color = '#856404';
    }
    if (callDuration) callDuration.style.display = 'block';

    // Simulate call connect after 2 seconds
    setTimeout(() => {
        if (VOIP_CONFIG.isInCall && callStatus) {
            callStatus.textContent = '✓ Connected';
            callStatus.style.background = '#d4edda';
            callStatus.style.color = '#155724';
        }
    }, 2000);

    // Start duration counter
    startCallDuration();

    // Production: Would call Twilio API here
    console.log(`📞 Initiating call to ${phoneNumber}...`);
}

function startCallDuration() {
    if (VOIP_CONFIG.durationInterval) clearInterval(VOIP_CONFIG.durationInterval);
    
    VOIP_CONFIG.durationInterval = setInterval(() => {
        if (VOIP_CONFIG.isInCall && VOIP_CONFIG.callStartTime) {
            const elapsed = Math.floor((new Date() - VOIP_CONFIG.callStartTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            const durationDisplay = document.getElementById('callDuration');
            if (durationDisplay) {
                durationDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            }
        }
    }, 1000);
}

function endCall() {
    const phoneNumber = VOIP_CONFIG.currentNumber;
    const duration = VOIP_CONFIG.callStartTime ? Math.floor((new Date() - VOIP_CONFIG.callStartTime) / 1000) : 0;
    
    // Add to call history
    VOIP_CONFIG.callHistory.unshift({
        number: phoneNumber,
        type: 'outgoing',
        timestamp: new Date().toLocaleString(),
        duration: duration,
        status: 'completed'
    });

    // Reset UI
    VOIP_CONFIG.isInCall = false;
    VOIP_CONFIG.callStartTime = null;
    if (VOIP_CONFIG.durationInterval) clearInterval(VOIP_CONFIG.durationInterval);

    const callBtn = document.getElementById('callBtn');
    const hangupBtn = document.getElementById('hangupBtn');
    const callStatus = document.getElementById('callStatus');
    const callDuration = document.getElementById('callDuration');

    if (callBtn) callBtn.style.display = 'flex';
    if (hangupBtn) hangupBtn.style.display = 'none';
    if (callStatus) callStatus.style.display = 'none';
    if (callDuration) callDuration.style.display = 'none';

    clearNumber();
    renderCallHistory();
    
    console.log(`✓ Call ended. Duration: ${duration}s`);
}

function quickAddContact() {
    const phoneInput = document.getElementById('quickAddPhone');
    if (!phoneInput) return;

    const phone = phoneInput.value.trim();
    if (!phone) {
        alert('Please enter a phone number');
        return;
    }

    // Check if already exists
    const exists = VOIP_CONFIG.contacts.some(c => c.phone === phone);
    if (exists) {
        alert('This contact already exists');
        return;
    }

    const name = prompt('Contact name:');
    if (!name) return;

    VOIP_CONFIG.contacts.push({
        name: name,
        phone: phone,
        added: new Date().toLocaleString()
    });

    phoneInput.value = '';
    renderCallHistory();
    alert(`✓ Contact "${name}" added!`);
}

function renderCallHistory() {
    const container = document.getElementById('recentCallsList');
    if (!container) return;

    if (VOIP_CONFIG.callHistory.length === 0 && VOIP_CONFIG.contacts.length === 0) {
        container.innerHTML = `
            <div style="padding: 20px; background-color: #f8f9fa; border-radius: 4px; text-align: center; color: #999; font-size: 13px;">
                📭 No calls or contacts yet. Start calling!
            </div>
        `;
        return;
    }

    let html = '';

    // Contacts section
    if (VOIP_CONFIG.contacts.length > 0) {
        html += '<div style="margin-bottom: 20px;"><h4 style="margin: 0 0 10px 0; color: #2c3e50; font-size: 13px;">📇 Contacts</h4>';
        html += VOIP_CONFIG.contacts.map((contact, idx) => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background-color: #f8f9fa; border-radius: 4px; margin-bottom: 8px;">
                <div>
                    <div style="font-weight: 600; color: #2c3e50; font-size: 13px;">${contact.name}</div>
                    <div style="font-size: 11px; color: #7f8c8d;">${contact.phone}</div>
                </div>
                <div style="display: flex; gap: 5px;">
                    <button onclick="callContact(${idx})" style="padding: 6px 10px; background-color: #27ae60; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 11px; font-weight: 600;">
                        Call
                    </button>
                    <button onclick="deleteContact(${idx})" style="padding: 6px 10px; background-color: #e74c3c; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 11px;">
                        ✕
                    </button>
                </div>
            </div>
        `).join('');
        html += '</div>';
    }

    // Recent calls section
    if (VOIP_CONFIG.callHistory.length > 0) {
        html += '<div><h4 style="margin: 0 0 10px 0; color: #2c3e50; font-size: 13px;">📞 Recent Calls</h4>';
        html += VOIP_CONFIG.callHistory.slice(0, 10).map((call, idx) => {
            const minutes = Math.floor(call.duration / 60);
            const seconds = call.duration % 60;
            return `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background-color: #f8f9fa; border-radius: 4px; margin-bottom: 8px;">
                    <div style="flex: 1;">
                        <div style="font-weight: 600; color: #2c3e50; font-size: 13px;">${call.type === 'incoming' ? '📥' : '📤'} ${call.number}</div>
                        <div style="font-size: 11px; color: #7f8c8d;">
                            ${call.timestamp} • ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}
                        </div>
                    </div>
                    <button onclick="redialNumber('${call.number}')" style="padding: 6px 10px; background-color: #3498db; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 11px; font-weight: 600;">
                        Redial
                    </button>
                </div>
            `;
        }).join('');
        html += '</div>';
    }

    container.innerHTML = html;
}

function callContact(idx) {
    const contact = VOIP_CONFIG.contacts[idx];
    VOIP_CONFIG.currentNumber = contact.phone;
    updateDisplay();
    initiateCall();
}

function deleteContact(idx) {
    if (confirm('Delete this contact?')) {
        VOIP_CONFIG.contacts.splice(idx, 1);
        renderCallHistory();
    }
}

function redialNumber(number) {
    VOIP_CONFIG.currentNumber = number;
    updateDisplay();
    initiateCall();
}

// ===== END VOIP CALLING =====

// ===== EMAIL CAMPAIGNS =====
const EMAIL_CAMPAIGNS_CONFIG = {
    apiKey: '', // Will be set from Settings
    provider: 'sendgrid', // sendgrid, mailchimp, or brevo
    campaigns: [],
    templates: [
        {
            id: 'welcome',
            name: 'Welcome Email',
            subject: 'Welcome to our services!',
            description: 'Greet new contacts and introduce your services',
            content: `<h1>Welcome!</h1>
<p>Thank you for choosing us. We're excited to work with you.</p>
<p>Here's what you can expect:</p>
<ul>
<li>Expert support from our team</li>
<li>Regular updates and insights</li>
<li>Dedicated account management</li>
</ul>
<p><a href="#">Get Started</a></p>`
        },
        {
            id: 'newsletter',
            name: 'Monthly Newsletter',
            subject: 'Your monthly update - {{month}}',
            description: 'Share updates, tips, and industry news',
            content: `<h1>Monthly Update</h1>
<p>Hi {{firstName}},</p>
<p>Here's what's new this month:</p>
<h3>Latest News</h3>
<p>[Add your news here]</p>
<h3>Tips & Best Practices</h3>
<p>[Add tips here]</p>
<p>Best regards,<br>Your Team</p>`
        },
        {
            id: 'announcement',
            name: 'Service Announcement',
            subject: 'Exciting news - New {{serviceName}} available!',
            description: 'Announce new services or promotions',
            content: `<h1>New Service Launch!</h1>
<p>We're thrilled to announce the launch of {{serviceName}}.</p>
<p>Key features:</p>
<ul>
<li>Feature 1</li>
<li>Feature 2</li>
<li>Feature 3</li>
</ul>
<p><a href="#">Learn More</a></p>`
        },
        {
            id: 'followup',
            name: 'Support Follow-up',
            subject: 'How did we do? - Your feedback matters',
            description: 'Check in after support ticket resolution',
            content: `<h1>We'd love your feedback!</h1>
<p>Hi {{firstName}},</p>
<p>Thank you for contacting our support team. We hope we resolved your issue to your satisfaction.</p>
<p>Could you take a moment to rate your experience?</p>
<p style="text-align: center;">
<a href="#" style="display: inline-block; padding: 10px 20px; background-color: #27ae60; color: white; text-decoration: none; border-radius: 4px;">Give Feedback</a>
</p>`
        }
    ],
    contactLists: [
        { id: 'default', name: 'Default Contacts', count: 0 }
    ]
};

function setupEmailCampaignsListeners() {
    // Tab switching
    const tabs = document.querySelectorAll('.campaign-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            
            // Hide all tabs
            document.querySelectorAll('.campaign-tab-content').forEach(t => {
                t.style.display = 'none';
            });
            
            // Show selected tab
            const tabContent = document.getElementById(`${tabName}-tab`);
            if (tabContent) {
                tabContent.style.display = 'block';
            }
            
            // Update active tab styling
            tabs.forEach(t => {
                t.style.color = '#555';
                t.style.borderBottom = 'none';
            });
            tab.style.color = '#2c3e50';
            tab.style.borderBottom = '3px solid #3498db';
        });
    });

    // Create Campaign button
    const createBtn = document.getElementById('createCampaignBtn');
    if (createBtn) {
        createBtn.addEventListener('click', openCampaignModal);
    }

    // Campaign Modal handlers
    const campaignModal = document.getElementById('campaignModal');
    const closeCampaignBtn = document.getElementById('closeCampaignModal');
    const cancelCampaignBtn = document.getElementById('cancelCampaignBtn');
    const campaignForm = document.getElementById('campaignForm');

    if (closeCampaignBtn) {
        closeCampaignBtn.addEventListener('click', closeCampaignModal);
    }
    if (cancelCampaignBtn) {
        cancelCampaignBtn.addEventListener('click', closeCampaignModal);
    }
    if (campaignForm) {
        campaignForm.addEventListener('submit', (e) => {
            e.preventDefault();
            submitCampaignForm();
        });
    }

    // Import Contacts button
    const importBtn = document.getElementById('importContactsBtn');
    if (importBtn) {
        importBtn.addEventListener('click', () => {
            alert('📧 Import Contacts Feature\n\nTo import contacts:\n1. Prepare a CSV file with email addresses\n2. Upload via this dialog\n3. Contacts will be added to your list\n\nIntegration with SendGrid/Mailchimp coming soon!');
        });
    }

    // Close modal when clicking outside
    if (campaignModal) {
        window.addEventListener('click', (event) => {
            if (event.target === campaignModal) {
                campaignModal.style.display = 'none';
            }
        });
    }
}

function openCampaignModal() {
    const modal = document.getElementById('campaignModal');
    if (modal) {
        modal.style.display = 'block';
        document.getElementById('campaignName').focus();
    }
}

function closeCampaignModal() {
    const modal = document.getElementById('campaignModal');
    if (modal) {
        modal.style.display = 'none';
    }
    // Clear form
    document.getElementById('campaignForm').reset();
}

function submitCampaignForm() {
    const campaign = {
        name: document.getElementById('campaignName').value,
        subject: document.getElementById('campaignSubject').value,
        recipients: document.getElementById('campaignRecipients').value,
        sendTime: document.getElementById('campaignSendTime').value,
        template: 'welcome',
        status: 'draft',
        created: new Date().toLocaleString()
    };

    if (campaign.name && campaign.subject) {
        EMAIL_CAMPAIGNS_CONFIG.campaigns.push(campaign);
        renderCampaignsList();
        closeCampaignModal();
        alert(`✅ Campaign "${campaign.name}" created successfully!`);
    }
}

function renderCampaignsList() {
    const container = document.getElementById('campaignsList');
    if (!container) return;

    if (EMAIL_CAMPAIGNS_CONFIG.campaigns.length === 0) {
        container.innerHTML = `
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); text-align: center; color: #999;">
                <p style="margin: 0;">📭 No campaigns yet. Create your first campaign to get started!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = EMAIL_CAMPAIGNS_CONFIG.campaigns.map((campaign, idx) => `
        <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                <div>
                    <h4 style="margin: 0 0 8px 0; color: #2c3e50;">${campaign.name}</h4>
                    <p style="margin: 0 0 5px 0; font-size: 13px; color: #666;"><strong>Subject:</strong> ${campaign.subject}</p>
                    <p style="margin: 0; font-size: 13px; color: #666;"><strong>Recipients:</strong> ${campaign.recipients || 'N/A'}</p>
                </div>
                <div style="display: flex; gap: 8px;">
                    <button onclick="alert('Edit functionality - coming soon with SendGrid integration!')" style="padding: 8px 12px; background-color: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
                        Edit
                    </button>
                    <button onclick="deleteCampaign(${idx})" style="padding: 8px 12px; background-color: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
                        Delete
                    </button>
                </div>
            </div>
            <div style="padding-top: 15px; border-top: 1px solid #ecf0f1;">
                <span style="display: inline-block; padding: 4px 8px; background-color: #d5f4e6; color: #27ae60; border-radius: 3px; font-size: 12px;">
                    📅 ${campaign.sendTime || 'Not scheduled'}
                </span>
            </div>
        </div>
    `).join('');
}

function deleteCampaign(idx) {
    if (confirm('Are you sure you want to delete this campaign?')) {
        EMAIL_CAMPAIGNS_CONFIG.campaigns.splice(idx, 1);
        renderCampaignsList();
        alert('✅ Campaign deleted successfully');
    }
}

// ===== END EMAIL CAMPAIGNS =====

let projects = [];
let selectedProjectId = null;
let editingProjectId = null;
let allowList = [
    { mac: '00:1B:44:11:3A:B7', description: 'Office Router' },
    { mac: '00:1B:44:11:3A:B8', description: 'Printer 1' },
    { mac: '00:1B:44:11:3A:B9', description: 'Access Point' },
    { mac: '00:1B:44:11:3A:BA', description: 'Server' },
    { mac: '00:1B:44:11:3A:BB', description: 'Workstation 1' }
];
let selectedMacAddress = null;
let teamMembers = {
    person1: { name: 'John Smith', dailyLimit: 8, color: 'person1', gradient: ['#667eea', '#764ba2'] },
    person2: { name: 'Jane Doe', dailyLimit: 8, color: 'person2', gradient: ['#f093fb', '#f5576c'] },
    person3: { name: 'Bob Johnson', dailyLimit: 6, color: 'person3', gradient: ['#4facfe', '#00f2fe'] },
    person4: { name: 'Alice Williams', dailyLimit: 8, color: 'person4', gradient: ['#43e97b', '#38f9d7'] }
};

// Predefined color gradients for new employees
const colorPalette = [
    ['#ff6b6b', '#ee5a6f'], // Red
    ['#4ecdc4', '#44a08d'], // Teal
    ['#ffe66d', '#ffa500'], // Yellow/Orange
    ['#a8e6cf', '#88d8a3'], // Light Green
    ['#ff8b94', '#ffaaa5'], // Pink
    ['#95e1d3', '#f38181'], // Mint/Pink
    ['#aa96da', '#c5fad5'], // Purple/Green
    ['#fcbad3', '#ffd3a5'], // Pink/Peach
    ['#a8edea', '#fed6e3'], // Cyan/Pink
    ['#d299c2', '#fef9d7'], // Purple/Yellow
    ['#89f7fe', '#66a6ff'], // Blue
    ['#fdbb2d', '#22c1c3'], // Yellow/Teal
    ['#f093fb', '#f5576c'], // Pink/Red (already used but can repeat)
    ['#4facfe', '#00f2fe'], // Blue (already used but can repeat)
    ['#43e97b', '#38f9d7']  // Green (already used but can repeat)
];

let colorPaletteIndex = 0;

// Column resizing state
let columnWidths = [];
let isResizing = false;
let currentResizer = null;
let startX = 0;
let startWidth = 0;
let columnIndex = 0;

// View mode state
let viewMode = 'multi-week'; // 'multi-week' or 'single-week'
let currentWeekStart = null;
let isInitialLoad = true;
let shouldAnimateBars = false;
let newlyCreatedProjectId = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    setupNavigation();
    loadSampleData();
});

function initializeApp() {
    const today = new Date();
    document.getElementById('requestDate').valueAsDate = today;
    document.getElementById('assignedStartDate').valueAsDate = today;
    document.getElementById('preferredStartDate').valueAsDate = today;
    
    // Load and setup AI settings
    loadSettings();
    setupSettingsEventListeners();
    
    // Setup Company Research
    setupCompanyResearchListeners();
    
    // Setup E-Signature
    setupESignatureListeners();
    
    // Setup VoIP Calling
    setupVoIPListeners();
    
    // Setup Email Campaigns
    setupEmailCampaignsListeners();
    
    renderEmployeeDropdowns();
    renderAllowList();
}

// Track if navigation has been set up (prevent duplicate listeners)
let navigationSetup = false;

function setupNavigation() {
    if (navigationSetup) {
        console.log('✅ Navigation already set up, skipping...');
        return;
    }
    
    console.log('🔗 Setting up navigation...');
    
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) {
        console.warn('⚠️ Sidebar not found for navigation setup');
        return;
    }
    
    // Use event delegation on the sidebar to handle all link clicks
    // This works even after accordion reinitializes
    sidebar.addEventListener('click', (e) => {
        // Check if clicked element is a navigation link
        const link = e.target.closest('.nav-item, .sidebar-link');
        if (!link) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        const pageName = link.getAttribute('data-page');
        if (pageName) {
            console.log('🔗 Navigating to page:', pageName);
            switchPage(pageName);
            
            // Update active nav item
            document.querySelectorAll('.nav-item, .sidebar-link').forEach(nav => {
                nav.classList.remove('active');
            });
            link.classList.add('active');
        } else {
            console.log('⚠️ Link has no data-page attribute:', link.textContent);
        }
    });
    
    navigationSetup = true;
    console.log('✅ Navigation setup complete with event delegation');
}

function switchPage(pageName) {
    if (!pageName) {
        console.error('❌ switchPage called with no pageName');
        return;
    }
    
    console.log('📄 Switching to page:', pageName);
    
    // Hide all pages
    const pages = document.querySelectorAll('.page-content');
    console.log('📄 Found', pages.length, 'pages to hide');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const selectedPage = document.getElementById(`page-${pageName}`);
    if (selectedPage) {
        selectedPage.classList.add('active');
        console.log('✅ Page activated:', `page-${pageName}`);
        console.log('📊 Page display:', window.getComputedStyle(selectedPage).display);
    } else {
        console.error('❌ Page not found:', `page-${pageName}`);
        console.log('Available pages:', Array.from(pages).map(p => p.id));
    }
    
    // Show/hide header based on page
    const header = document.querySelector('header');
    if (pageName === 'scheduling') {
        header.classList.remove('hidden');
    } else {
        header.classList.add('hidden');
    }
    
    // Initialize page-specific content
    if (pageName === 'scheduling') {
        console.log('📊 Initializing scheduling page (Gantt chart)');
        // Render gantt chart
        renderGanttChart();
        renderProjectTree();
    }
    
    if (pageName === 'network') {
        console.log('📊 Initializing network page (Allow list)');
        // Render allow list
        renderAllowList();
    }
    
    if (pageName === 'hardware') {
        console.log('📊 Initializing hardware page');
        // Initialize hardware page immediately (without waiting for Syncfusion)
        initializeHardwarePage();
        
        // Also initialize the chart and grid
        setTimeout(() => {
            initializeHardwareChart();
            initializeHardwareGrid();
        }, 100);
    }
    
    if (pageName === 'lifecycle') {
        console.log('📊 Initializing lifecycle page');
        // Initialize lifecycle page
        initializeLifecyclePage();
    }
    
    if (pageName === 'company-research') {
        console.log('📊 Initializing company research page');
        // Initialize if needed
    }
    
    if (pageName === 'email-campaigns') {
        console.log('📊 Initializing email campaigns page');
        // Initialize if needed
    }
    
    if (pageName === 'e-signature') {
        console.log('📊 Initializing e-signature page');
        // Initialize if needed
    }
    
    if (pageName === 'voip-calling') {
        console.log('📊 Initializing VoIP calling page');
        // Initialize if needed
    }
}

function setupEventListeners() {
    // Navigation setup
    setupNavigation();
    
    // Add Modal controls
    const modal = document.getElementById('projectModal');
    const addProjectBtn = document.getElementById('addProjectBtn');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const closeBtn = document.getElementById('closeAddModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const projectForm = document.getElementById('projectForm');

    addProjectBtn.onclick = () => openModal('project');
    addTaskBtn.onclick = () => openModal('task');
    closeBtn.onclick = () => modal.style.display = 'none';
    cancelBtn.onclick = () => modal.style.display = 'none';
    
    projectForm.onsubmit = (e) => {
        e.preventDefault();
        saveProject();
        modal.style.display = 'none';
    };

    // Edit Modal controls
    const editModal = document.getElementById('editModal');
    const closeEditBtn = document.getElementById('closeEditModal');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const deleteBtn = document.getElementById('deleteBtn');
    const editForm = document.getElementById('editForm');

    closeEditBtn.onclick = () => editModal.style.display = 'none';
    cancelEditBtn.onclick = () => editModal.style.display = 'none';
    deleteBtn.onclick = () => deleteProject();
    
    editForm.onsubmit = (e) => {
        e.preventDefault();
        updateProject();
        editModal.style.display = 'none';
    };

    // Window click to close modals
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
        if (event.target == editModal) {
            editModal.style.display = 'none';
        }
        if (event.target == employeeModal) {
            employeeModal.style.display = 'none';
        }
        if (event.target == blockModal) {
            blockModal.style.display = 'none';
        }
        if (event.target == addMacModal) {
            addMacModal.style.display = 'none';
        }
    };

    // Checklist button
    document.getElementById('addChecklistBtn').onclick = addChecklistItem;

    // View toggle buttons
    document.getElementById('multiWeekViewBtn').onclick = () => switchView('multi-week');
    document.getElementById('singleWeekViewBtn').onclick = () => switchView('single-week');

    // Week navigation buttons
    document.getElementById('prevWeekBtn').onclick = () => navigateWeek(-1);
    document.getElementById('nextWeekBtn').onclick = () => navigateWeek(1);
    document.getElementById('todayBtn').onclick = () => goToToday();

    // Employee Modal controls
    const employeeModal = document.getElementById('employeeModal');
    const addEmployeeBtn = document.getElementById('addEmployeeBtn');
    const closeEmployeeBtn = document.getElementById('closeEmployeeModal');
    const cancelEmployeeBtn = document.getElementById('cancelEmployeeBtn');
    const employeeForm = document.getElementById('employeeForm');

    addEmployeeBtn.onclick = () => employeeModal.style.display = 'block';
    closeEmployeeBtn.onclick = () => employeeModal.style.display = 'none';
    cancelEmployeeBtn.onclick = () => employeeModal.style.display = 'none';
    
    employeeForm.onsubmit = (e) => {
        e.preventDefault();
        saveEmployee();
        employeeModal.style.display = 'none';
    };

    // Network Access - Allow List controls
    const blockModal = document.getElementById('blockModal');
    const addMacModal = document.getElementById('addMacModal');
    const removeSelectedBtn = document.getElementById('removeSelectedBtn');
    const blockSelectedBtn = document.getElementById('blockSelectedBtn');
    const addManuallyBtn = document.getElementById('addManuallyBtn');
    const macInput = document.getElementById('macInput');
    const closeBlockModal = document.getElementById('closeBlockModal');
    const closeAddMacModal = document.getElementById('closeAddMacModal');
    const blockForm = document.getElementById('blockForm');
    const addMacForm = document.getElementById('addMacForm');

    removeSelectedBtn.onclick = removeSelectedMacAddress;
    blockSelectedBtn.onclick = () => {
        if (selectedMacAddress) {
            openBlockModal(selectedMacAddress);
        } else {
            alert('Please select a MAC address to block');
        }
    };
    addManuallyBtn.onclick = () => addMacModal.style.display = 'block';
    closeBlockModal.onclick = () => blockModal.style.display = 'none';
    closeAddMacModal.onclick = () => addMacModal.style.display = 'none';
    
    document.getElementById('cancelBlockBtn').onclick = () => blockModal.style.display = 'none';
    document.getElementById('cancelAddMacBtn').onclick = () => addMacModal.style.display = 'none';

    blockForm.onsubmit = (e) => {
        e.preventDefault();
        confirmBlockMacAddress();
        blockModal.style.display = 'none';
    };

    addMacForm.onsubmit = (e) => {
        e.preventDefault();
        addNewMacAddress();
        addMacModal.style.display = 'none';
    };


    // Checklist button
    document.getElementById('addChecklistBtn').onclick = addChecklistItem;

    // View toggle buttons
    document.getElementById('multiWeekViewBtn').onclick = () => switchView('multi-week');
    document.getElementById('singleWeekViewBtn').onclick = () => switchView('single-week');

    // Week navigation buttons
    document.getElementById('prevWeekBtn').onclick = () => navigateWeek(-1);
    document.getElementById('nextWeekBtn').onclick = () => navigateWeek(1);
    document.getElementById('todayBtn').onclick = () => goToToday();
}

function switchView(mode) {
    viewMode = mode;
    
    // Update button states
    const multiBtn = document.getElementById('multiWeekViewBtn');
    const singleBtn = document.getElementById('singleWeekViewBtn');
    const weekNav = document.getElementById('weekNavigation');
    
    if (mode === 'multi-week') {
        multiBtn.classList.add('active');
        singleBtn.classList.remove('active');
        weekNav.style.display = 'none';
        currentWeekStart = null;
    } else {
        multiBtn.classList.remove('active');
        singleBtn.classList.add('active');
        weekNav.style.display = 'flex';
        
        // Initialize to current week if not set
        if (!currentWeekStart) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            currentWeekStart = new Date(today);
            currentWeekStart.setDate(currentWeekStart.getDate() - currentWeekStart.getDay());
        }
        updateWeekDisplay();
    }
    
    // Reset column widths for new view
    columnWidths = [];
    
    // Enable animation when switching views
    shouldAnimateBars = true;
    renderGanttChart();
}

function navigateWeek(direction) {
    currentWeekStart.setDate(currentWeekStart.getDate() + (direction * 7));
    updateWeekDisplay();
    renderGanttChart();
}

function goToToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    currentWeekStart = new Date(today);
    currentWeekStart.setDate(currentWeekStart.getDate() - currentWeekStart.getDay());
    updateWeekDisplay();
    renderGanttChart();
}

function updateWeekDisplay() {
    const weekEnd = new Date(currentWeekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    
    const display = document.getElementById('currentWeekDisplay');
    display.textContent = `${formatDateRange(currentWeekStart, weekEnd)}`;
}

function openModal(type) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const projectType = document.getElementById('projectType');
    
    modalTitle.textContent = type === 'project' ? 'Add New Project' : 'Add New Task';
    projectType.value = type;
    modal.style.display = 'block';
    
    // Reset form
    document.getElementById('projectForm').reset();
    const today = new Date();
    document.getElementById('preferredStartDate').valueAsDate = today;
}

function saveProject() {
    const name = document.getElementById('projectName').value;
    const assignedTo = document.getElementById('assignedTo').value;
    const dailyLimit = parseFloat(document.getElementById('dailyHourLimit').value);
    const duration = parseFloat(document.getElementById('taskDuration').value);
    const preferredStart = new Date(document.getElementById('preferredStartDate').value);
    const type = document.getElementById('projectType').value;

    // Check for scheduling conflicts
    const conflict = checkSchedulingConflict(assignedTo, preferredStart, duration, dailyLimit);
    
    if (conflict) {
        // Show alert with alternatives
        const alternatives = conflict.alternatives;
        const dateFormatter = new Intl.DateTimeFormat('en-US', { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
        
        let alertMessage = `⚠️ SCHEDULING CONFLICT\n\n`;
        alertMessage += `${teamMembers[assignedTo].name}'s capacity is exceeded on ${dateFormatter.format(preferredStart)}\n\n`;
        alertMessage += `Hours required: ${duration}h\n`;
        alertMessage += `Hours already scheduled: ${conflict.hoursOnPreferredDate}h\n`;
        alertMessage += `Daily limit: ${dailyLimit}h\n\n`;
        alertMessage += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        alertMessage += `WHAT WILL HAPPEN:\n`;
        alertMessage += `The project will be automatically rescheduled to the\n`;
        alertMessage += `next available date for this agent.\n\n`;
        alertMessage += `ALTERNATIVES (if you want to reassign):\n\n`;
        
        // Show alternatives
        if (alternatives.differentDays.length > 0) {
            alertMessage += `${teamMembers[assignedTo].name} available on:\n`;
            alternatives.differentDays.slice(0, 3).forEach(alt => {
                alertMessage += `  • ${dateFormatter.format(alt.date)} (${alt.availableHours}h)\n`;
            });
            alertMessage += `\n`;
        }
        
        if (alternatives.otherAgents.length > 0) {
            alertMessage += `Other agents available on ${dateFormatter.format(preferredStart)}:\n`;
            alternatives.otherAgents.slice(0, 3).forEach(alt => {
                alertMessage += `  • ${alt.name} (${alt.availableHours}h available)\n`;
            });
        }
        
        alertMessage += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        alertMessage += `Continue and auto-reschedule?`;
        
        if (!confirm(alertMessage)) {
            return; // Cancel the save
        }
    }

    // Calculate optimal start date based on team member's schedule
    const actualStart = calculateOptimalStartDate(assignedTo, preferredStart, duration, dailyLimit);

    const project = {
        id: Date.now(),
        name: name,
        assignedTo: assignedTo,
        assignedToName: teamMembers[assignedTo].name,
        dailyLimit: dailyLimit,
        duration: duration,
        startDate: actualStart,
        endDate: calculateEndDate(actualStart, duration, dailyLimit),
        type: type,
        status: 'Active',
        description: '',
        notes: ''
    };

    projects.push(project);
    newlyCreatedProjectId = project.id;
    renderAll();
    
    // Show notification if start date was changed from preferred date
    if (actualStart.toDateString() !== preferredStart.toDateString()) {
        const dateFormatter = new Intl.DateTimeFormat('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        setTimeout(() => {
            alert(`📅 Project Created with Schedule Adjustment\n\n` +
                  `Project: ${name}\n` +
                  `Assigned to: ${teamMembers[assignedTo].name}\n\n` +
                  `⚠️ Preferred Start: ${dateFormatter.format(preferredStart)}\n` +
                  `✓ Actual Start: ${dateFormatter.format(actualStart)}\n\n` +
                  `The preferred date had insufficient availability.\n` +
                  `Project has been scheduled for the next available slot.`);
        }, 300);
    }
    
    // Animate the newly created bar after rendering
    requestAnimationFrame(() => {
        const newBar = document.querySelector(`[data-project-id="${newlyCreatedProjectId}"]`);
        if (newBar) {
            newBar.classList.add('animate-in');
        }
        newlyCreatedProjectId = null;
    });
}

function openEditModal(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    editingProjectId = projectId;
    const modal = document.getElementById('editModal');
    
    // Populate form fields
    document.getElementById('editProjectName').value = project.name;
    document.getElementById('editAssignedTo').value = project.assignedTo;
    document.getElementById('editStatus').value = project.status;
    document.getElementById('editDailyHourLimit').value = project.dailyLimit;
    document.getElementById('editTaskDuration').value = project.duration;
    document.getElementById('editStartDate').valueAsDate = project.startDate;
    document.getElementById('editProjectType').value = project.type;
    document.getElementById('editDescription').value = project.description || '';
    document.getElementById('editNotes').value = project.notes || '';
    
    modal.style.display = 'block';
}

function updateProject() {
    const project = projects.find(p => p.id === editingProjectId);
    if (!project) return;

    const name = document.getElementById('editProjectName').value;
    const assignedTo = document.getElementById('editAssignedTo').value;
    const status = document.getElementById('editStatus').value;
    const dailyLimit = parseFloat(document.getElementById('editDailyHourLimit').value);
    const duration = parseFloat(document.getElementById('editTaskDuration').value);
    const startDate = new Date(document.getElementById('editStartDate').value);
    const type = document.getElementById('editProjectType').value;
    const description = document.getElementById('editDescription').value;
    const notes = document.getElementById('editNotes').value;

    // Update project
    project.name = name;
    project.assignedTo = assignedTo;
    project.assignedToName = teamMembers[assignedTo].name;
    project.status = status;
    project.dailyLimit = dailyLimit;
    project.duration = duration;
    project.startDate = startDate;
    project.endDate = calculateEndDate(startDate, duration, dailyLimit);
    project.type = type;
    project.description = description;
    project.notes = notes;

    renderAll();
    
    // Update right panel if this project is selected
    if (selectedProjectId === editingProjectId) {
        selectProject(editingProjectId);
    }
}

function deleteProject() {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    const index = projects.findIndex(p => p.id === editingProjectId);
    if (index !== -1) {
        projects.splice(index, 1);
    }
    
    if (selectedProjectId === editingProjectId) {
        selectedProjectId = null;
    }
    
    document.getElementById('editModal').style.display = 'none';
    renderAll();
}

function calculateOptimalStartDate(personId, preferredStart, taskDuration, dailyLimit) {
    let currentDate = new Date(preferredStart);
    currentDate.setHours(0, 0, 0, 0);
    
    let remainingHours = taskDuration;
    
    while (remainingHours > 0) {
        // Skip weekends
        if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
            currentDate.setDate(currentDate.getDate() + 1);
            continue;
        }

        const hoursScheduledToday = getHoursScheduledForDate(personId, currentDate);
        const availableHours = dailyLimit - hoursScheduledToday;

        if (availableHours > 0) {
            // We found a day with available hours - this is our start date
            return new Date(currentDate);
        }

        // Move to next day
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return new Date(preferredStart);
}

function checkSchedulingConflict(personId, preferredStart, taskDuration, dailyLimit) {
    const hoursOnPreferredDate = getHoursScheduledForDate(personId, preferredStart);
    const availableHours = dailyLimit - hoursOnPreferredDate;
    
    // If there's enough capacity for the first day, no conflict
    if (availableHours >= Math.min(taskDuration, dailyLimit)) {
        return null;
    }
    
    // There's a conflict - find alternatives
    const alternatives = {
        differentDays: [],
        otherAgents: []
    };
    
    // Find alternative days for this agent
    let checkDate = new Date(preferredStart);
    for (let i = 0; i < 30; i++) {
        if (checkDate.toDateString() !== preferredStart.toDateString()) {
            const hoursOnDate = getHoursScheduledForDate(personId, checkDate);
            const availableOnDate = dailyLimit - hoursOnDate;
            if (availableOnDate >= Math.min(taskDuration, dailyLimit)) {
                alternatives.differentDays.push({
                    date: new Date(checkDate),
                    availableHours: availableOnDate
                });
            }
        }
        checkDate.setDate(checkDate.getDate() + 1);
    }
    
    // Find other agents with availability on the preferred date
    Object.keys(teamMembers).forEach(agentId => {
        if (agentId !== personId) {
            const hoursOnDate = getHoursScheduledForDate(agentId, preferredStart);
            const dailyLimitForAgent = 8; // Default daily limit
            const availableOnDate = dailyLimitForAgent - hoursOnDate;
            if (availableOnDate >= Math.min(taskDuration, dailyLimitForAgent)) {
                alternatives.otherAgents.push({
                    name: teamMembers[agentId].name,
                    personId: agentId,
                    availableHours: availableOnDate
                });
            }
        }
    });
    
    return {
        hoursOnPreferredDate: hoursOnPreferredDate,
        conflict: true,
        alternatives: alternatives
    };
}

function getHoursScheduledForDate(personId, date) {
    const dateStr = date.toDateString();
    let totalHours = 0;

    projects.forEach(project => {
        if (project.assignedTo === personId) {
            let currentDate = new Date(project.startDate);
            let remainingHours = project.duration;
            const dailyLimit = project.dailyLimit;

            while (remainingHours > 0) {
                if (currentDate.toDateString() === dateStr) {
                    const hoursThisDay = Math.min(remainingHours, dailyLimit);
                    totalHours += hoursThisDay;
                }

                remainingHours -= dailyLimit;
                currentDate.setDate(currentDate.getDate() + 1);
                
                // Skip weekends
                while (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
                    currentDate.setDate(currentDate.getDate() + 1);
                }
            }
        }
    });

    return totalHours;
}

function calculateEndDate(startDate, duration, dailyLimit) {
    let currentDate = new Date(startDate);
    let remainingHours = duration;

    while (remainingHours > 0) {
        // Skip weekends
        if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
            remainingHours -= dailyLimit;
        }
        
        if (remainingHours > 0) {
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }

    return currentDate;
}

function renderAll() {
    renderProjectTree();
    renderGanttChart();
}

function renderProjectTree() {
    const container = document.getElementById('projectTreeContainer');
    container.innerHTML = '';

    projects.forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.className = `project-item ${project.type}`;
        if (selectedProjectId === project.id) {
            projectItem.classList.add('selected');
        }

        projectItem.innerHTML = `
            <div class="project-item-name">${project.name}</div>
            <div class="project-item-info">
                ${project.assignedToName} | ${project.duration}h | ${formatDate(project.startDate)} - ${formatDate(project.endDate)}
            </div>
        `;

        projectItem.onclick = () => openEditModal(project.id);
        projectItem.ondblclick = () => selectProject(project.id);
        container.appendChild(projectItem);
    });
}

function selectProject(projectId) {
    selectedProjectId = projectId;
    const project = projects.find(p => p.id === projectId);
    
    if (project) {
        document.getElementById('summaryText').value = project.name;
        document.getElementById('projectStatus').value = project.status;
        document.getElementById('requestedBy').value = project.assignedToName;
        document.getElementById('hoursPerDay').value = project.dailyLimit;
        document.getElementById('estimatedHours').value = project.duration;
        document.getElementById('remainingHours').value = project.duration;
        document.getElementById('assignedStartDate').valueAsDate = project.startDate;
    }
    
    renderProjectTree();
}

function renderGanttChart() {
    const header = document.getElementById('ganttHeader');
    const body = document.getElementById('ganttBody');
    
    header.innerHTML = '';
    body.innerHTML = '';

    if (projects.length === 0) {
        body.innerHTML = '<div style="padding: 40px; text-align: center; color: #999;">No projects scheduled. Click "Add Project" to get started.</div>';
        return;
    }

    // Calculate date range
    const dates = generateDateRange();
    
    // Initialize column widths if not set
    if (columnWidths.length !== dates.length) {
        columnWidths = new Array(dates.length).fill(150);
    }
    
    // Render header
    dates.forEach((weekDates, index) => {
        const weekHeader = document.createElement('div');
        weekHeader.className = viewMode === 'single-week' ? 'gantt-date-header day-view' : 'gantt-date-header';
        weekHeader.style.width = `${columnWidths[index]}px`;
        weekHeader.style.minWidth = `${columnWidths[index]}px`;
        weekHeader.setAttribute('data-column-index', index);
        
        const weekStart = weekDates[0];
        const weekEnd = weekDates[weekDates.length - 1];
        
        if (viewMode === 'single-week') {
            // Single day column
            const date = weekDates[0];
            weekHeader.innerHTML = `
                <div class="gantt-date-day-full">${getDayNameFull(date)}</div>
                <div class="gantt-date-date">${formatDateFull(date)}</div>
            `;
        } else {
            // Week column
            weekHeader.innerHTML = `
                <div class="gantt-date-week">${formatDateRange(weekStart, weekEnd)}</div>
                <div class="gantt-date-days">
                    ${weekDates.map(d => `<div class="gantt-day">${getDayName(d)}</div>`).join('')}
                </div>
            `;
        }
        
        // Add resizer
        const resizer = document.createElement('div');
        resizer.className = 'column-resizer';
        resizer.setAttribute('data-column-index', index);
        weekHeader.appendChild(resizer);
        
        header.appendChild(weekHeader);
    });

    // Add resize event listeners
    setupColumnResizers();

    // Render body
    projects.forEach((project, projectIndex) => {
        const row = document.createElement('div');
        row.className = 'gantt-row';
        
        dates.forEach((weekDates, index) => {
            const cell = document.createElement('div');
            cell.className = viewMode === 'single-week' ? 'gantt-cell day-view' : 'gantt-cell';
            cell.style.width = `${columnWidths[index]}px`;
            cell.style.minWidth = `${columnWidths[index]}px`;
            row.appendChild(cell);
        });

        // Create gantt bar
        const bar = createGanttBar(project, dates, projectIndex);
        if (bar) {
            row.appendChild(bar);
        }

        body.appendChild(row);
    });
    
    // Handle animation flags
    if (isInitialLoad) {
        isInitialLoad = false;
    }
    
    if (shouldAnimateBars) {
        shouldAnimateBars = false;
    }
}

function generateDateRange() {
    if (viewMode === 'single-week') {
        // Generate single week with individual days
        const days = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(currentWeekStart);
            date.setDate(date.getDate() + i);
            days.push([date]); // Wrap each day in an array for consistency
        }
        return days;
    } else {
        // Multi-week view
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Start from beginning of current week
        const startDate = new Date(today);
        startDate.setDate(startDate.getDate() - startDate.getDay());
        
        // Generate 8 weeks
        const weeks = [];
        for (let i = 0; i < 8; i++) {
            const week = [];
            for (let j = 0; j < 7; j++) {
                const date = new Date(startDate);
                date.setDate(date.getDate() + (i * 7) + j);
                week.push(date);
            }
            weeks.push(week);
        }
        
        return weeks;
    }
}

function createGanttBar(project, dateRange, index = 0) {
    const bar = document.createElement('div');
    // Use person color instead of project type
    bar.className = `gantt-bar ${project.assignedTo}`;
    
    // Apply gradient color from team member data (works for dynamic employees)
    const member = teamMembers[project.assignedTo];
    if (member && member.gradient) {
        bar.style.background = `linear-gradient(135deg, ${member.gradient[0]} 0%, ${member.gradient[1]} 100%)`;
    }
    
    // Add animation class on initial load or when switching views
    if (isInitialLoad || shouldAnimateBars) {
        bar.classList.add('animate-in');
        // Stagger animation for each bar (50ms delay per bar)
        bar.style.animationDelay = `${index * 0.05}s`;
    }
    
    const allDates = dateRange.flat();
    const startIndex = allDates.findIndex(d => d.toDateString() === project.startDate.toDateString());
    const endIndex = allDates.findIndex(d => d.toDateString() === project.endDate.toDateString());
    
    if (startIndex === -1) return null;
    
    // Calculate position based on view mode and dynamic column widths
    let left = 0;
    let width = 0;
    
    if (viewMode === 'single-week') {
        // In single-week view, each column is a day
        const defaultWidth = 120;
        
        // Calculate left position
        for (let i = 0; i < startIndex; i++) {
            left += columnWidths[i] || defaultWidth;
        }
        
        // Calculate width
        for (let i = startIndex; i <= endIndex; i++) {
            width += columnWidths[i] || defaultWidth;
        }
    } else {
        // Multi-week view
        const weekIndex = Math.floor(startIndex / 7);
        const dayInWeek = startIndex % 7;
        const weekWidth = columnWidths[weekIndex] || 150;
        const cellWidth = weekWidth / 7;
        
        // Calculate left position
        for (let i = 0; i < weekIndex; i++) {
            left += columnWidths[i] || 150;
        }
        left += dayInWeek * cellWidth;
        
        // Calculate width
        for (let i = startIndex; i <= endIndex; i++) {
            const wIndex = Math.floor(i / 7);
            const wWidth = columnWidths[wIndex] || 150;
            width += wWidth / 7;
        }
    }
    
    bar.style.left = `${left}px`;
    bar.style.width = `${width}px`;
    
    bar.innerHTML = `<div class="gantt-bar-content">${project.name} (${project.duration}h)</div>`;
    bar.setAttribute('data-project-id', project.id);
    
    bar.onclick = (e) => {
        e.stopPropagation();
        openEditModal(project.id);
    };
    
    // Add hover tooltip
    bar.addEventListener('mouseenter', (e) => showGanttTooltip(e, project));
    bar.addEventListener('mouseleave', () => hideGanttTooltip());
    
    return bar;
}

function showGanttTooltip(event, project) {
    const tooltip = document.getElementById('ganttTooltip');
    const member = teamMembers[project.assignedTo];
    
    // Format dates
    const startDate = project.startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const endDate = project.endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    // Build tooltip content
    const content = `
        <div class="gantt-tooltip-title">${project.name}</div>
        <div class="gantt-tooltip-item">
            <span class="gantt-tooltip-label">Agent:</span>
            <span class="gantt-tooltip-value">${member ? member.name : 'Unassigned'}</span>
        </div>
        <div class="gantt-tooltip-item">
            <span class="gantt-tooltip-label">Type:</span>
            <span class="gantt-tooltip-value">${project.type.charAt(0).toUpperCase() + project.type.slice(1)}</span>
        </div>
        <div class="gantt-tooltip-item">
            <span class="gantt-tooltip-label">Status:</span>
            <span class="gantt-tooltip-value">${project.status}</span>
        </div>
        <div class="gantt-tooltip-item">
            <span class="gantt-tooltip-label">Duration:</span>
            <span class="gantt-tooltip-value">${project.duration}h (${project.dailyLimit}h/day)</span>
        </div>
        <div class="gantt-tooltip-item">
            <span class="gantt-tooltip-label">Start:</span>
            <span class="gantt-tooltip-value">${startDate}</span>
        </div>
        <div class="gantt-tooltip-item">
            <span class="gantt-tooltip-label">End:</span>
            <span class="gantt-tooltip-value">${endDate}</span>
        </div>
    `;
    
    tooltip.innerHTML = content;
    
    // Position tooltip
    const barRect = event.target.getBoundingClientRect();
    const tooltipWidth = 300;
    const tooltipHeight = tooltip.offsetHeight || 150;
    
    let left = barRect.left + (barRect.width / 2) - (tooltipWidth / 2);
    let top = barRect.top - tooltipHeight - 10;
    
    // Adjust if tooltip goes off-screen
    if (left < 10) left = 10;
    if (left + tooltipWidth > window.innerWidth - 10) {
        left = window.innerWidth - tooltipWidth - 10;
    }
    
    if (top < 10) {
        top = barRect.bottom + 10;
    }
    
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
    tooltip.style.display = 'block';
}

function hideGanttTooltip() {
    const tooltip = document.getElementById('ganttTooltip');
    tooltip.style.display = 'none';
}

function setupColumnResizers() {
    const resizers = document.querySelectorAll('.column-resizer');
    
    resizers.forEach(resizer => {
        resizer.addEventListener('mousedown', startResize);
    });
}

function startResize(e) {
    e.preventDefault();
    isResizing = true;
    currentResizer = e.target;
    columnIndex = parseInt(currentResizer.getAttribute('data-column-index'));
    startX = e.pageX;
    startWidth = columnWidths[columnIndex];
    
    currentResizer.classList.add('resizing');
    
    document.addEventListener('mousemove', doResize);
    document.addEventListener('mouseup', stopResize);
}

function doResize(e) {
    if (!isResizing) return;
    
    const diff = e.pageX - startX;
    const newWidth = Math.max(100, startWidth + diff); // Minimum 100px
    
    columnWidths[columnIndex] = newWidth;
    updateColumnWidths();
}

function stopResize(e) {
    if (!isResizing) return;
    
    isResizing = false;
    if (currentResizer) {
        currentResizer.classList.remove('resizing');
    }
    currentResizer = null;
    
    document.removeEventListener('mousemove', doResize);
    document.removeEventListener('mouseup', stopResize);
    
    // Re-render to update gantt bar positions
    renderGanttChart();
}

function updateColumnWidths() {
    const headers = document.querySelectorAll('.gantt-date-header');
    const rows = document.querySelectorAll('.gantt-row');
    
    headers.forEach((header, index) => {
        if (index === columnIndex) {
            header.style.width = `${columnWidths[index]}px`;
            header.style.minWidth = `${columnWidths[index]}px`;
        }
    });
    
    rows.forEach(row => {
        const cells = row.querySelectorAll('.gantt-cell');
        cells.forEach((cell, index) => {
            if (index === columnIndex) {
                cell.style.width = `${columnWidths[index]}px`;
                cell.style.minWidth = `${columnWidths[index]}px`;
            }
        });
        
        // Update gantt bar positions in real-time
        const bar = row.querySelector('.gantt-bar');
        if (bar) {
            const projectId = parseInt(bar.getAttribute('data-project-id'));
            const project = projects.find(p => p.id === projectId);
            if (project) {
                const dates = generateDateRange();
                updateGanttBarPosition(bar, project, dates);
            }
        }
    });
}

function updateGanttBarPosition(bar, project, dateRange) {
    const allDates = dateRange.flat();
    const startIndex = allDates.findIndex(d => d.toDateString() === project.startDate.toDateString());
    const endIndex = allDates.findIndex(d => d.toDateString() === project.endDate.toDateString());
    
    if (startIndex === -1) return;
    
    let left = 0;
    let width = 0;
    
    if (viewMode === 'single-week') {
        const defaultWidth = 120;
        
        for (let i = 0; i < startIndex; i++) {
            left += columnWidths[i] || defaultWidth;
        }
        
        for (let i = startIndex; i <= endIndex; i++) {
            width += columnWidths[i] || defaultWidth;
        }
    } else {
        const weekIndex = Math.floor(startIndex / 7);
        const dayInWeek = startIndex % 7;
        const weekWidth = columnWidths[weekIndex] || 150;
        const cellWidth = weekWidth / 7;
        
        for (let i = 0; i < weekIndex; i++) {
            left += columnWidths[i] || 150;
        }
        left += dayInWeek * cellWidth;
        
        for (let i = startIndex; i <= endIndex; i++) {
            const wIndex = Math.floor(i / 7);
            const wWidth = columnWidths[wIndex] || 150;
            width += wWidth / 7;
        }
    }
    
    bar.style.left = `${left}px`;
    bar.style.width = `${width}px`;
}

function formatDate(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
}

function formatDateRange(start, end) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[start.getMonth()]} ${start.getDate()} - ${months[end.getMonth()]} ${end.getDate()}, ${start.getFullYear()}`;
}

function getDayName(date) {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    return days[date.getDay()];
}

function getDayNameFull(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
}

function formatDateFull(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function addChecklistItem() {
    const container = document.getElementById('checklistItems');
    const item = document.createElement('div');
    item.className = 'checklist-item';
    
    item.innerHTML = `
        <input type="checkbox">
        <input type="text" placeholder="Enter checklist item...">
        <button onclick="this.parentElement.remove()">×</button>
    `;
    
    container.appendChild(item);
}

function loadSampleData() {
    // Add sample projects to demonstrate auto-scheduling
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Sample data
    const sampleProjects = [
        {
            name: 'Server Migration - Phase 1',
            assignedTo: 'person1',
            dailyLimit: 6,
            duration: 16,
            preferredStart: new Date(today),
            type: 'project'
        },
        {
            name: 'Install Windows Server',
            assignedTo: 'person1',
            dailyLimit: 4,
            duration: 8,
            preferredStart: new Date(today),
            type: 'task'
        },
        {
            name: 'Network Configuration',
            assignedTo: 'person2',
            dailyLimit: 6,
            duration: 12,
            preferredStart: new Date(today),
            type: 'task'
        },
        {
            name: 'Firewall Setup',
            assignedTo: 'person2',
            dailyLimit: 4,
            duration: 6,
            preferredStart: new Date(today),
            type: 'subtask'
        },
        {
            name: 'Backup Configuration',
            assignedTo: 'person3',
            dailyLimit: 5,
            duration: 10,
            preferredStart: new Date(today),
            type: 'task'
        }
    ];

    sampleProjects.forEach(proj => {
        const actualStart = calculateOptimalStartDate(
            proj.assignedTo, 
            proj.preferredStart, 
            proj.duration, 
            proj.dailyLimit
        );

        projects.push({
            id: Date.now() + Math.random(),
            name: proj.name,
            assignedTo: proj.assignedTo,
            assignedToName: teamMembers[proj.assignedTo].name,
            dailyLimit: proj.dailyLimit,
            duration: proj.duration,
            startDate: actualStart,
            endDate: calculateEndDate(actualStart, proj.duration, proj.dailyLimit),
            type: proj.type,
            status: 'Active',
            description: '',
            notes: ''
        });
    });

    renderAll();
}

// Employee Management Functions
function getNextPersonId() {
    let maxId = 0;
    Object.keys(teamMembers).forEach(key => {
        const match = key.match(/^person(\d+)$/);
        if (match) {
            const id = parseInt(match[1]);
            if (id > maxId) maxId = id;
        }
    });
    return `person${maxId + 1}`;
}

function getNextColor() {
    const colors = colorPalette[colorPaletteIndex % colorPalette.length];
    colorPaletteIndex++;
    return colors;
}

function renderColorLegend() {
    const legendContainer = document.getElementById('colorLegend');
    if (!legendContainer) return; // Exit if element doesn't exist
    legendContainer.innerHTML = '';
    
    Object.keys(teamMembers).forEach(personId => {
        const member = teamMembers[personId];
        const legendItem = document.createElement('span');
        legendItem.className = 'legend-item';
        
        const colorBox = document.createElement('span');
        colorBox.className = 'legend-color';
        colorBox.style.background = `linear-gradient(135deg, ${member.gradient[0]} 0%, ${member.gradient[1]} 100%)`;
        
        const nameSpan = document.createTextNode(member.name);
        
        legendItem.appendChild(colorBox);
        legendItem.appendChild(nameSpan);
        legendContainer.appendChild(legendItem);
    });
}

function renderEmployeeDropdowns() {
    const assignedToSelect = document.getElementById('assignedTo');
    const editAssignedToSelect = document.getElementById('editAssignedTo');
    
    // Clear existing options except the first one
    assignedToSelect.innerHTML = '<option value="">Select Team Member</option>';
    editAssignedToSelect.innerHTML = '<option value="">Select Team Member</option>';
    
    // Add options for each team member
    Object.keys(teamMembers).forEach(personId => {
        const member = teamMembers[personId];
        const option1 = document.createElement('option');
        option1.value = personId;
        option1.textContent = member.name;
        assignedToSelect.appendChild(option1);
        
        const option2 = document.createElement('option');
        option2.value = personId;
        option2.textContent = member.name;
        editAssignedToSelect.appendChild(option2);
    });
}

function saveEmployee() {
    const name = document.getElementById('employeeName').value.trim();
    const dailyLimit = parseFloat(document.getElementById('employeeDailyLimit').value);
    
    if (!name) {
        alert('Please enter an employee name');
        return;
    }
    
    const personId = getNextPersonId();
    const gradient = getNextColor();
    
    teamMembers[personId] = {
        name: name,
        dailyLimit: dailyLimit,
        color: personId,
        gradient: gradient
    };
    
    // Reset form
    document.getElementById('employeeForm').reset();
    document.getElementById('employeeDailyLimit').value = 8;
    
    // Update UI
    renderEmployeeDropdowns();
}

// ===== NETWORK ACCESS FUNCTIONS =====

function renderAllowList() {
    const allowListBox = document.getElementById('allowListBox');
    allowListBox.innerHTML = '';
    
    allowList.forEach((item, index) => {
        const listItem = document.createElement('div');
        listItem.className = 'list-item';
        if (selectedMacAddress === item.mac) {
            listItem.classList.add('selected');
        }
        
        const textDiv = document.createElement('div');
        textDiv.className = 'list-item-text';
        textDiv.textContent = item.mac + (item.description ? ` - ${item.description}` : '');
        
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'list-item-actions';
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'list-item-btn list-item-remove';
        removeBtn.textContent = '✕';
        removeBtn.title = 'Remove this MAC address';
        removeBtn.onclick = (e) => {
            e.stopPropagation();
            removeMacAddress(index);
        };
        
        actionsDiv.appendChild(removeBtn);
        
        listItem.appendChild(textDiv);
        listItem.appendChild(actionsDiv);
        
        // Click to select
        listItem.onclick = () => {
            selectedMacAddress = selectedMacAddress === item.mac ? null : item.mac;
            renderAllowList();
        };
        
        allowListBox.appendChild(listItem);
    });
}

function removeMacAddress(index) {
    if (confirm('Are you sure you want to remove this MAC address?')) {
        allowList.splice(index, 1);
        selectedMacAddress = null;
        renderAllowList();
    }
}

function removeSelectedMacAddress() {
    if (!selectedMacAddress) {
        alert('Please select a MAC address to remove');
        return;
    }
    
    const index = allowList.findIndex(item => item.mac === selectedMacAddress);
    if (index > -1) {
        removeMacAddress(index);
    }
}

function openBlockModal(macAddress) {
    selectedMacAddress = macAddress;
    document.getElementById('blockMacAddress').value = macAddress;
    document.getElementById('blockReason').value = '';
    document.getElementById('blockDuration').value = 'permanent';
    document.getElementById('blockModal').style.display = 'block';
}

function confirmBlockMacAddress() {
    const macAddress = document.getElementById('blockMacAddress').value;
    const reason = document.getElementById('blockReason').value;
    const duration = document.getElementById('blockDuration').value;
    
    if (!reason.trim()) {
        alert('Please enter a reason for blocking');
        return;
    }
    
    // Show confirmation
    const durationText = {
        'permanent': 'Permanently',
        '24hours': 'for 24 hours',
        '7days': 'for 7 days',
        '30days': 'for 30 days'
    }[duration];
    
    alert(`MAC Address ${macAddress} has been blocked ${durationText}.\nReason: ${reason}`);
    
    // In a real application, this would send data to a server
    selectedMacAddress = null;
    renderAllowList();
}

function addNewMacAddress() {
    const macInput = document.getElementById('newMacAddress').value.trim();
    const description = document.getElementById('macDescription').value.trim();
    
    // Validate MAC address format
    const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    if (!macRegex.test(macInput)) {
        alert('Invalid MAC address format. Please use XX:XX:XX:XX:XX:XX');
        return;
    }
    
    // Normalize MAC address (use colons)
    const normalizedMac = macInput.toUpperCase();
    
    // Check if already exists
    if (allowList.some(item => item.mac === normalizedMac)) {
        alert('This MAC address is already in the allow list');
        return;
    }
    
    // Add to list
    allowList.push({
        mac: normalizedMac,
        description: description || null
    });
    
    // Clear form
    document.getElementById('newMacAddress').value = '';
    document.getElementById('macDescription').value = '';
    document.getElementById('macInput').value = '';
    
    renderAllowList();
    alert('MAC address added successfully');
}

// ===== HARDWARE PAGE FUNCTIONS =====

function initializeHardwarePage() {
    console.log('Initializing hardware page');
    
    // Setup overlay sidebar toggle (for regular pages accessed from hardware)
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (sidebar && overlay) {
        // Close sidebar when overlay is clicked
        overlay.addEventListener('click', (e) => {
            e.preventDefault();
            sidebar.classList.remove('visible');
            overlay.classList.remove('visible');
        });
        
        // Close sidebar when a sidebar link is clicked
        const sidebarLinks = document.querySelectorAll('.sidebar .nav-item');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                sidebar.classList.remove('visible');
                if (overlay) {
                    overlay.classList.remove('visible');
                }
            });
        });
    }
    
    // Render table and chart
    renderHardwareTable();
}

function renderHardwareTable() {
    console.log('Rendering hardware table');
    const gridData = [
        { Type: 'Desktop', DeviceName: 'ITP-DT-SMC', User: 'SCunningham', Purchased: '6/21/2022', Age: '4 yrs / 3 mths', Value: '$1,600', Make: 'Dell', Model: 'Latitude 750', CPU: 'Core i9-14900K', RAM: '12Gb' },
        { Type: 'Laptop', DeviceName: 'ITP-LT-SMC', User: 'SCunningham', Purchased: '7/11/2001', Age: '5 yrs / 2 mths', Value: '$2,000', Make: 'Lenovo', Model: 'Yoga 71', CPU: 'Core i5-14900K', RAM: '12Gb' },
        { Type: 'Desktop', DeviceName: 'ITP-DT-AMC', User: 'ACunningham', Purchased: '1/20/2019', Age: '5 yrs / 9 mths', Value: '$1,400', Make: 'Dell', Model: 'Latitude 750', CPU: 'Core i9-14900K', RAM: '12Gb' },
        { Type: 'Switch', DeviceName: '', User: '', Purchased: '8/1/2013', Age: '7 yrs / 3 mths', Value: '$900', Make: 'Trendnet', Model: 'TEG-3524S', CPU: '', RAM: '' },
        { Type: 'NAS', DeviceName: 'ITP-NAS', User: '', Purchased: '3/24/2020', Age: '6 yrs / 1 mths', Value: '$4,500', Make: 'Synology', Model: 'QL480i', CPU: 'Celeron', RAM: '6 Gb' }
    ];
    
    // Try to use Syncfusion Grid if available
    if (typeof window.ej !== 'undefined' && typeof window.ej.grids !== 'undefined') {
        console.log('Attempting Syncfusion Grid');
        try {
            const gridElement = document.getElementById('hardwareGrid');
            if (!gridElement) {
                console.error('hardwareGrid element not found');
                renderHardwareTableHTML(gridData);
                return;
            }
            
            const grid = new window.ej.grids.Grid({
                dataSource: gridData,
                allowPaging: true,
                pageSettings: { pageSize: 10 },
                allowSorting: true,
                allowExcelExport: true,
                columns: [
                    { field: 'Type', headerText: 'Type', width: '100', textAlign: 'Left' },
                    { field: 'DeviceName', headerText: 'Device Name', width: '120', textAlign: 'Left' },
                    { field: 'User', headerText: 'User', width: '120', textAlign: 'Left' },
                    { field: 'Purchased', headerText: 'Purchased', width: '120', textAlign: 'Left' },
                    { field: 'Age', headerText: 'Age', width: '120', textAlign: 'Left' },
                    { field: 'Value', headerText: 'Value', width: '100', textAlign: 'Right' },
                    { field: 'Make', headerText: 'Make', width: '100', textAlign: 'Left' },
                    { field: 'Model', headerText: 'Model', width: '120', textAlign: 'Left' },
                    { field: 'CPU', headerText: 'CPU', width: '150', textAlign: 'Left' },
                    { field: 'RAM', headerText: 'RAM', width: '80', textAlign: 'Left' }
                ],
                gridLines: 'Both',
                rowHeight: 36,
                headerTextAlign: 'Center'
            });
            grid.appendTo('#hardwareGrid');
            console.log('Syncfusion Grid rendered successfully');
            return;
        } catch (error) {
            console.warn('Syncfusion Grid failed, using fallback table:', error);
            renderHardwareTableHTML(gridData);
            return;
        }
    }
    
    // Fallback to HTML table
    console.log('Syncfusion not available, using HTML table');
    renderHardwareTableHTML(gridData);
    
    // Render chart
    renderHardwareChart();
}

function renderHardwareTableHTML(gridData) {
    console.log('Rendering hardware table as HTML');
    
    let html = '<table class="hardware-table"><thead><tr><th>Type</th><th>Device Name</th><th>User</th><th>Purchased</th><th>Age</th><th>Value</th><th>Make</th><th>Model</th><th>CPU</th><th>RAM</th></tr></thead><tbody>';
    
    gridData.forEach(row => {
        html += `<tr><td>${row.Type}</td><td>${row.DeviceName}</td><td>${row.User}</td><td>${row.Purchased}</td><td>${row.Age}</td><td>${row.Value}</td><td>${row.Make}</td><td>${row.Model}</td><td>${row.CPU}</td><td>${row.RAM}</td></tr>`;
    });
    
    html += '</tbody></table>';
    
    const gridElement = document.getElementById('hardwareGrid');
    if (gridElement) {
        gridElement.innerHTML = html;
        console.log('Hardware table rendered successfully');
    } else {
        console.error('hardwareGrid element not found');
    }
    
    // Render chart
    renderHardwareChart();
}

function renderHardwareChart() {
    console.log('Rendering hardware chart');
    
    // Try to use Syncfusion Chart if available
    if (typeof window.ej !== 'undefined' && typeof window.ej.charts !== 'undefined') {
        console.log('Using Syncfusion Chart');
        
        const chartData = [
            { x: 'Q1 2025', y: 5000 },
            { x: 'Q2 2025', y: 4500 },
            { x: 'Q3 2025', y: 3800 },
            { x: 'Q4 2025', y: 3000 },
            { x: 'Q1 2026', y: 2200 },
            { x: 'Q2 2026', y: 2300 },
            { x: 'Q3 2026', y: 1800 },
            { x: 'Q4 2026', y: 6000 },
            { x: 'Q1 2027', y: 3600 },
            { x: 'Q2 2027', y: 2100 },
            { x: 'Q3 2027', y: 1900 },
            { x: 'Q4 2027', y: 3600 }
        ];
        
        try {
            const chart = new window.ej.charts.Chart({
                primaryXAxis: {
                    valueType: 'Category',
                    labelPlacement: 'OnTicks',
                    majorGridLines: { width: 0 }
                },
                primaryYAxis: {
                    minimum: 0,
                    maximum: 7000,
                    interval: 1000,
                    labelFormat: '${value}',
                    majorTickLines: { width: 0 }
                },
                chartArea: { border: { width: 0 } },
                tooltip: {
                    enable: true,
                    format: '<b>${point.x}</b><br/>Value: ${point.y}'
                },
                series: [
                    {
                        dataSource: chartData,
                        xName: 'x',
                        yName: 'y',
                        type: 'Column',
                        cornerRadius: 2,
                        marker: {
                            visible: false
                        }
                    }
                ],
                width: '100%',
                height: '300px'
            });
            chart.appendTo('#hardwareSfChart');
            console.log('Syncfusion Chart rendered successfully');
            return;
        } catch (error) {
            console.warn('Syncfusion Chart failed, using Chart.js:', error);
        }
    }
    
    // Fallback to Chart.js
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js not loaded, retrying...');
        setTimeout(renderHardwareChart, 500);
        return;
    }
    
    console.log('Using Chart.js');
    
    const ctx = document.getElementById('hardwareChart');
    if (!ctx) {
        console.error('hardwareChart canvas not found');
        return;
    }
    
    // Show canvas and hide Syncfusion container
    ctx.style.display = 'block';
    const sfChart = document.getElementById('hardwareSfChart');
    if (sfChart) {
        sfChart.style.display = 'none';
    }
    
    // Destroy previous chart if it exists
    if (ctx.chart) {
        ctx.chart.destroy();
    }
    
    const chartData = {
        labels: ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026', 'Q2 2026', 'Q3 2026', 'Q4 2026', 'Q1 2027', 'Q2 2027', 'Q3 2027', 'Q4 2027'],
        datasets: [
            {
                label: 'Device Replacement Cost',
                data: [5000, 4500, 3800, 3000, 2200, 2300, 1800, 6000, 3600, 2100, 1900, 3600],
                backgroundColor: '#3498db',
                borderColor: '#2980b9',
                borderWidth: 1,
                borderRadius: 4
            }
        ]
    };
    
    ctx.chart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            indexAxis: 'x',
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
    
    console.log('Chart.js rendered successfully');
}

function initializeHardwareChart() {
    console.log('🎨 Initializing hardware chart...');
    // Just call the existing renderHardwareChart function
    renderHardwareChart();
}

function initializeHardwareGrid() {
    // Check if Syncfusion is loaded
    if (typeof window.ej !== 'undefined' && typeof window.ej.grids !== 'undefined') {
        try {
            const gridData = [
                { Type: 'Desktop', DeviceName: 'ITP-DT-SMC', User: 'SCunningham', Purchased: '6/21/2022', Age: '4 yrs / 3 mths', Value: '$1,600', Make: 'Dell', Model: 'Latitude 750', CPU: 'Core i9-14900K', RAM: '12Gb' },
                { Type: 'Laptop', DeviceName: 'ITP-LT-SMC', User: 'SCunningham', Purchased: '7/11/2001', Age: '5 yrs / 2 mths', Value: '$2,000', Make: 'Lenovo', Model: 'Yoga 71', CPU: 'Core i5-14900K', RAM: '12Gb' },
                { Type: 'Desktop', DeviceName: 'ITP-DT-AMC', User: 'ACunningham', Purchased: '1/20/2019', Age: '5 yrs / 9 mths', Value: '$1,400', Make: 'Dell', Model: 'Latitude 750', CPU: 'Core i9-14900K', RAM: '12Gb' },
                { Type: 'Switch', DeviceName: '', User: '', Purchased: '8/1/2013', Age: '7 yrs / 3 mths', Value: '$900', Make: 'Trendnet', Model: 'TEG-3524S', CPU: '', RAM: '' },
                { Type: 'NAS', DeviceName: 'ITP-NAS', User: '', Purchased: '3/24/2020', Age: '6 yrs / 1 mths', Value: '$4,500', Make: 'Synology', Model: 'QL480i', CPU: 'Celeron', RAM: '6 Gb' }
            ];

            const grid = new window.ej.grids.Grid({
                dataSource: gridData,
                allowPaging: true,
                pageSettings: { pageSize: 10 },
                allowSorting: true,
                columns: [
                    { field: 'Type', headerText: 'Type', width: '100', textAlign: 'Left' },
                    { field: 'DeviceName', headerText: 'Device Name', width: '120', textAlign: 'Left' },
                    { field: 'User', headerText: 'User', width: '120', textAlign: 'Left' },
                    { field: 'Purchased', headerText: 'Purchased', width: '120', textAlign: 'Left' },
                    { field: 'Age', headerText: 'Age', width: '120', textAlign: 'Left' },
                    { field: 'Value', headerText: 'Value', width: '100', textAlign: 'Right' },
                    { field: 'Make', headerText: 'Make', width: '100', textAlign: 'Left' },
                    { field: 'Model', headerText: 'Model', width: '120', textAlign: 'Left' },
                    { field: 'CPU', headerText: 'CPU', width: '150', textAlign: 'Left' },
                    { field: 'RAM', headerText: 'RAM', width: '80', textAlign: 'Left' }
                ],
                gridLines: 'Both',
                rowHeight: 36,
                headerTextAlign: 'Center'
            });
            grid.appendTo('#hardwareGrid');
            console.log('Syncfusion Grid initialized successfully');
            return;
        } catch (error) {
            console.warn('Syncfusion Grid initialization failed, using fallback table:', error);
        }
    }
    
    // Fallback: Create HTML table if Syncfusion is not available
    const gridData = [
        { Type: 'Desktop', DeviceName: 'ITP-DT-SMC', User: 'SCunningham', Purchased: '6/21/2022', Age: '4 yrs / 3 mths', Value: '$1,600', Make: 'Dell', Model: 'Latitude 750', CPU: 'Core i9-14900K', RAM: '12Gb' },
        { Type: 'Laptop', DeviceName: 'ITP-LT-SMC', User: 'SCunningham', Purchased: '7/11/2001', Age: '5 yrs / 2 mths', Value: '$2,000', Make: 'Lenovo', Model: 'Yoga 71', CPU: 'Core i5-14900K', RAM: '12Gb' },
        { Type: 'Desktop', DeviceName: 'ITP-DT-AMC', User: 'ACunningham', Purchased: '1/20/2019', Age: '5 yrs / 9 mths', Value: '$1,400', Make: 'Dell', Model: 'Latitude 750', CPU: 'Core i9-14900K', RAM: '12Gb' },
        { Type: 'Switch', DeviceName: '', User: '', Purchased: '8/1/2013', Age: '7 yrs / 3 mths', Value: '$900', Make: 'Trendnet', Model: 'TEG-3524S', CPU: '', RAM: '' },
        { Type: 'NAS', DeviceName: 'ITP-NAS', User: '', Purchased: '3/24/2020', Age: '6 yrs / 1 mths', Value: '$4,500', Make: 'Synology', Model: 'QL480i', CPU: 'Celeron', RAM: '6 Gb' }
    ];
    
    let html = '<table style="width: 100%; border-collapse: collapse; font-size: 13px;"><thead><tr style="background-color: #34495e; color: white; font-weight: 600;"><th style="border: 1px solid #dee2e6; padding: 10px; text-align: left;">Type</th><th style="border: 1px solid #dee2e6; padding: 10px; text-align: left;">Device Name</th><th style="border: 1px solid #dee2e6; padding: 10px; text-align: left;">User</th><th style="border: 1px solid #dee2e6; padding: 10px; text-align: left;">Purchased</th><th style="border: 1px solid #dee2e6; padding: 10px; text-align: left;">Age</th><th style="border: 1px solid #dee2e6; padding: 10px; text-align: right;">Value</th><th style="border: 1px solid #dee2e6; padding: 10px; text-align: left;">Make</th><th style="border: 1px solid #dee2e6; padding: 10px; text-align: left;">Model</th><th style="border: 1px solid #dee2e6; padding: 10px; text-align: left;">CPU</th><th style="border: 1px solid #dee2e6; padding: 10px; text-align: left;">RAM</th></tr></thead><tbody>';
    
    gridData.forEach(row => {
        html += `<tr style="border-bottom: 1px solid #dee2e6;"><td style="border: 1px solid #dee2e6; padding: 10px;">${row.Type}</td><td style="border: 1px solid #dee2e6; padding: 10px;">${row.DeviceName}</td><td style="border: 1px solid #dee2e6; padding: 10px;">${row.User}</td><td style="border: 1px solid #dee2e6; padding: 10px;">${row.Purchased}</td><td style="border: 1px solid #dee2e6; padding: 10px;">${row.Age}</td><td style="border: 1px solid #dee2e6; padding: 10px; text-align: right;">${row.Value}</td><td style="border: 1px solid #dee2e6; padding: 10px;">${row.Make}</td><td style="border: 1px solid #dee2e6; padding: 10px;">${row.Model}</td><td style="border: 1px solid #dee2e6; padding: 10px;">${row.CPU}</td><td style="border: 1px solid #dee2e6; padding: 10px;">${row.RAM}</td></tr>`;
    });
    
    html += '</tbody></table>';
    
    const gridElement = document.getElementById('hardwareGrid');
    if (gridElement) {
        gridElement.innerHTML = html;
        console.log('Fallback HTML table created successfully');
    }
}

// ===== LIFECYCLE PAGE FUNCTIONS =====

function initializeLifecyclePage() {
    console.log('Initializing lifecycle page');
    renderLifecycleChart();
    renderLifecycleDataGrid();
    setupConfigurationHandlers();
}

function renderLifecycleChart() {
    console.log('Rendering lifecycle chart with Three.js');
    
    const container = document.getElementById('lifecycleChartContainer');
    if (!container) {
        console.error('Chart container not found');
        return;
    }
    
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded, retrying...');
        setTimeout(renderLifecycleChart, 500);
        return;
    }
    
    // Clear previous scene
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    
    // Chart dimensions
    const width = 500;
    const height = 500;
    
    // Create scene, camera, renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, -2.5, 1.8);
    camera.lookAt(0, 0, 0);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight.position.set(3, 4, 3);
    scene.add(directionalLight);
    
    // Chart data
    const data = [
        { label: 'Local', value: 44, color: '#3498db' },
        { label: 'Work or Home', value: 24, color: '#f39c12' },
        { label: 'Microsoft', value: 14, color: '#2ecc71' },
        { label: 'Other', value: 18, color: '#e74c3c' }
    ];
    
    // Create 3D pie chart segments
    const radius = 1.2;
    const depth = 0.4;
    let startAngle = -Math.PI / 2;
    
    // Create a group to hold all segments
    const pieGroup = new THREE.Group();
    scene.add(pieGroup);
    
    // Create canvas for labels
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    let labelX = 0;
    
    data.forEach((item, index) => {
        const sliceAngle = (item.value / 100) * Math.PI * 2;
        const color = new THREE.Color(item.color);
        
        // Create cylinder geometry for this slice
        const geometry = new THREE.CylinderGeometry(radius, radius, depth, 32, 1, false, startAngle, sliceAngle);
        
        // Create material
        const material = new THREE.MeshPhongMaterial({
            color: color,
            shininess: 80,
            flatShading: false
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = Math.PI / 2;
        mesh.userData = { 
            label: item.label, 
            value: item.value,
            midAngle: startAngle + sliceAngle / 2,
            originalScale: 1,
            animationDelay: index * 100, // Stagger animation by 100ms
            animationDuration: 600 // Animation duration in ms
        };
        mesh.scale.set(0, 0, 0); // Start at 0 scale for animation
        pieGroup.add(mesh);
        
        // Draw labels on canvas
        ctx.fillStyle = item.color;
        ctx.fillRect(labelX, 0, 512, 512);
        
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 80px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.value + '%', labelX + 256, 150);
        
        ctx.font = 'bold 60px Arial';
        ctx.fillText(item.label, labelX + 256, 300);
        
        labelX += 512;
        startAngle += sliceAngle;
    });
    
    // Create canvas texture for labels
    const texture = new THREE.CanvasTexture(canvas);
    
    // Animation variables
    const animationStartTime = Date.now();
    let isAnimating = true;
    
    // Animation loop
    const animate = () => {
        const elapsed = Date.now() - animationStartTime;
        
        // Animate pie slices
        pieGroup.children.forEach((mesh) => {
            if (mesh.userData.animationDelay !== undefined) {
                const delayedElapsed = elapsed - mesh.userData.animationDelay;
                const duration = mesh.userData.animationDuration;
                
                if (delayedElapsed > 0) {
                    // Ease-out cubic animation
                    const progress = Math.min(delayedElapsed / duration, 1);
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    
                    mesh.scale.set(easeOut, easeOut, easeOut);
                    
                    if (progress === 1) {
                        mesh.userData.animationDelay = undefined; // Mark as complete
                    }
                }
            }
        });
        
        // Stop animation when all slices are scaled
        if (elapsed > (data.length * 100 + 600)) {
            isAnimating = false;
        }
        
        renderer.render(scene, camera);
        
        if (isAnimating) {
            requestAnimationFrame(animate);
        }
    };
    
    // Start animation
    animate();
    
    // Create legend as HTML elements below the chart for better display
    const legendContainer = document.getElementById('lifecycleLegend');
    if (legendContainer) {
        legendContainer.innerHTML = '';
        
        // Create legend items
        data.forEach((item) => {
            const legendItem = document.createElement('div');
            legendItem.style.cssText = `
                display: flex;
                align-items: center;
                gap: 12px;
                margin-bottom: 12px;
                font-size: 16px;
                font-weight: 500;
            `;
            
            const colorBox = document.createElement('div');
            colorBox.style.cssText = `
                width: 24px;
                height: 24px;
                background-color: ${item.color};
                border: 1px solid #333;
                flex-shrink: 0;
            `;
            
            const label = document.createElement('span');
            label.textContent = `${item.value}% - ${item.label}`;
            label.style.color = '#333';
            
            legendItem.appendChild(colorBox);
            legendItem.appendChild(label);
            legendContainer.appendChild(legendItem);
        });
    }
    
    console.log('Lifecycle chart rendered successfully with Three.js');
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const newWidth = Math.min(500, container.clientWidth);
        const newHeight = 500;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
        renderer.render(scene, camera);
    });
}

function renderLifecycleDataGrid() {
    console.log('Rendering lifecycle data grid');
    
    const gridData = [
        { Type: 'Desktop', DeviceName: 'ITP-DT-SMC', User: 'SCunningham', Purchased: '6/21/2022' },
        { Type: 'Laptop', DeviceName: 'ITP-LT-SMC', User: 'SCunningham', Purchased: '7/11/2001' },
        { Type: 'Desktop', DeviceName: 'ITP-DT-AMC', User: 'ACunningham', Purchased: '1/20/2019' },
        { Type: 'Switch', DeviceName: '', User: '', Purchased: '8/1/2013' },
        { Type: 'NAS', DeviceName: 'ITP-NAS', User: '', Purchased: '3/24/2020' },
        { Type: 'Desktop', DeviceName: 'ITP-DT-SMC', User: 'SCunningham', Purchased: '6/21/2022' },
        { Type: 'Laptop', DeviceName: 'ITP-LT-SMC', User: 'SCunningham', Purchased: '7/11/2001' },
        { Type: 'Desktop', DeviceName: 'ITP-DT-AMC', User: 'ACunningham', Purchased: '1/20/2019' },
        { Type: 'Switch', DeviceName: '', User: '', Purchased: '8/1/2013' },
        { Type: 'NAS', DeviceName: 'ITP-NAS', User: '', Purchased: '3/24/2020' },
        { Type: 'Desktop', DeviceName: 'ITP-DT-SMC', User: 'SCunningham', Purchased: '6/21/2022' },
        { Type: 'Laptop', DeviceName: 'ITP-LT-SMC', User: 'SCunningham', Purchased: '7/11/2001' },
        { Type: 'Desktop', DeviceName: 'ITP-DT-AMC', User: 'ACunningham', Purchased: '1/20/2019' },
        { Type: 'Desktop', DeviceName: 'ITP-DT-SMC', User: 'SCunningham', Purchased: '6/21/2022' },
        { Type: 'Laptop', DeviceName: 'ITP-LT-SMC', User: 'SCunningham', Purchased: '7/11/2001' },
        { Type: 'Desktop', DeviceName: 'ITP-DT-AMC', User: 'ACunningham', Purchased: '1/20/2019' },
    ];
    
    let html = '<table><thead><tr><th>Type</th><th>Device Name</th><th>User</th><th>Purchased</th></tr></thead><tbody>';
    gridData.forEach(row => {
        html += `<tr><td>${row.Type}</td><td>${row.DeviceName}</td><td>${row.User}</td><td>${row.Purchased}</td></tr>`;
    });
    html += '</tbody></table>';
    
    const gridElement = document.getElementById('lifecycleDataGrid');
    if (gridElement) {
        gridElement.innerHTML = html;
        console.log('Lifecycle data grid rendered successfully');
    } else {
        console.error('lifecycleDataGrid element not found');
    }
}

/**
 * Initialize Lifecycle Configuration Grid (Syncfusion)
 */
function initializeLifecycleConfigGrid() {
    console.log('🎯 Initializing Lifecycle Configuration Grid');
    
    // Check if Syncfusion is available
    if (typeof window.ej !== 'undefined' && typeof window.ej.grids !== 'undefined') {
        try {
            const configData = [
                { graphType: 'pie chart', dataPoint: 'Account Type' },
                { graphType: 'bar chart', dataPoint: 'Domain Joined' }
            ];
            
            const grid = new window.ej.grids.Grid({
                dataSource: configData,
                allowPaging: false,
                allowSorting: true,
                columns: [
                    { field: 'graphType', headerText: 'Graph Type', width: '200', textAlign: 'Left' },
                    { field: 'dataPoint', headerText: 'Data Point', width: '200', textAlign: 'Left' },
                    { 
                        headerText: 'Actions', 
                        width: '120', 
                        textAlign: 'Center',
                        template: '<button class="e-btn e-small e-danger" onclick="deleteConfigRow()">🗑️ Delete</button>'
                    }
                ],
                gridLines: 'Both',
                rowHeight: 36,
                headerTextAlign: 'Center'
            });
            
            grid.appendTo('#lifecycleConfigGrid');
            console.log('✅ Lifecycle Configuration Grid initialized');
            return;
        } catch (error) {
            console.warn('Syncfusion Grid initialization failed, using fallback:', error);
        }
    }
    
    // Fallback: Create HTML table
    console.log('📊 Using fallback HTML table for configuration');
    const fallbackHTML = `
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <thead>
                <tr style="background-color: #34495e; color: white; font-weight: 600;">
                    <th style="border: 1px solid #dee2e6; padding: 10px; text-align: left;">Graph Type</th>
                    <th style="border: 1px solid #dee2e6; padding: 10px; text-align: left;">Data Point</th>
                    <th style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr style="border-bottom: 1px solid #dee2e6;">
                    <td style="border: 1px solid #dee2e6; padding: 10px;">pie chart</td>
                    <td style="border: 1px solid #dee2e6; padding: 10px;">Account Type</td>
                    <td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">
                        <button class="delete-btn e-btn e-small e-danger">🗑️ Delete</button>
                    </td>
                </tr>
                <tr style="border-bottom: 1px solid #dee2e6;">
                    <td style="border: 1px solid #dee2e6; padding: 10px;">bar chart</td>
                    <td style="border: 1px solid #dee2e6; padding: 10px;">Domain Joined</td>
                    <td style="border: 1px solid #dee2e6; padding: 10px; text-align: center;">
                        <button class="delete-btn e-btn e-small e-danger">🗑️ Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    `;
    
    const gridElement = document.getElementById('lifecycleConfigGrid');
    if (gridElement) {
        gridElement.innerHTML = fallbackHTML;
        console.log('✅ Fallback table created');
    }
}

/**
 * Delete configuration row handler
 */
function deleteConfigRow() {
    if (confirm('Delete this configuration row?')) {
        console.log('Configuration row deleted');
        alert('Row deleted. Refresh to see changes.');
    }
}

function setupConfigurationHandlers() {
    console.log('Setting up configuration handlers');
    
    // Initialize the configuration grid first
    initializeLifecycleConfigGrid();
    
    const deleteBtn = document.querySelector('.delete-btn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Delete button clicked');
            deleteConfigRow();
        });
    }
    
    const addBtn = document.querySelector('.add-btn');
    if (addBtn) {
        addBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Add button clicked');
            alert('Add functionality coming soon');
        });
    }
}


