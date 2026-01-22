// Main Application Coordinator
// This file initializes and coordinates all modules

// ===== AI CONFIGURATION =====
const AI_CONFIG = {
    apiKey: '',
    apiEndpoint: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-4o-mini',
    maxTokens: 500
};

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
        console.log('✅ OpenAI API Key loaded');
    }

    // Load Twilio
    const twilioSid = localStorage.getItem(STORAGE_KEYS.twilio_sid);
    const twilioToken = localStorage.getItem(STORAGE_KEYS.twilio_token);
    const twilioPhone = localStorage.getItem(STORAGE_KEYS.twilio_phone);
    if (twilioSid && twilioToken && window.VoIP) {
        window.VoIP.VOIP_CONFIG.apiKey = twilioSid;
        window.VoIP.VOIP_CONFIG.authToken = twilioToken;
        window.VoIP.VOIP_CONFIG.phoneNumber = twilioPhone;
        console.log('✅ Twilio credentials loaded');
    }

    // Load and display all settings in settings modal
    displaySettingsInModal();
}

function displaySettingsInModal() {
    const openaiKey = localStorage.getItem(STORAGE_KEYS.openai) || '';
    const twilioSid = localStorage.getItem(STORAGE_KEYS.twilio_sid) || '';
    const twilioToken = localStorage.getItem(STORAGE_KEYS.twilio_token) || '';
    const twilioPhone = localStorage.getItem(STORAGE_KEYS.twilio_phone) || '';
    const docusignId = localStorage.getItem(STORAGE_KEYS.docusign_id) || '';
    const docusignSecret = localStorage.getItem(STORAGE_KEYS.docusign_secret) || '';
    const docusignUrl = localStorage.getItem(STORAGE_KEYS.docusign_url) || '';
    const sendgridKey = localStorage.getItem(STORAGE_KEYS.sendgrid) || '';
    const clearbitKey = localStorage.getItem(STORAGE_KEYS.clearbit) || '';

    // Mask sensitive keys for display
    const maskKey = (key) => key ? `${key.substring(0, 8)}${'*'.repeat(Math.max(0, key.length - 8))}` : '';

    if (document.getElementById('openaiApiKey')) {
        document.getElementById('openaiApiKey').value = maskKey(openaiKey);
    }
    if (document.getElementById('twilioAccountSid')) {
        document.getElementById('twilioAccountSid').value = maskKey(twilioSid);
    }
    if (document.getElementById('twilioAuthToken')) {
        document.getElementById('twilioAuthToken').value = maskKey(twilioToken);
    }
    if (document.getElementById('twilioPhoneNumber')) {
        document.getElementById('twilioPhoneNumber').value = twilioPhone;
    }
    if (document.getElementById('docusignClientId')) {
        document.getElementById('docusignClientId').value = maskKey(docusignId);
    }
    if (document.getElementById('docusignClientSecret')) {
        document.getElementById('docusignClientSecret').value = maskKey(docusignSecret);
    }
    if (document.getElementById('docusignBaseUrl')) {
        document.getElementById('docusignBaseUrl').value = docusignUrl;
    }
    if (document.getElementById('sendgridApiKey')) {
        document.getElementById('sendgridApiKey').value = maskKey(sendgridKey);
    }
    if (document.getElementById('clearbitApiKey')) {
        document.getElementById('clearbitApiKey').value = maskKey(clearbitKey);
    }
}

function saveSettings() {
    const settings = {
        openai: document.getElementById('openaiApiKey')?.value || '',
        twilio_sid: document.getElementById('twilioAccountSid')?.value || '',
        twilio_token: document.getElementById('twilioAuthToken')?.value || '',
        twilio_phone: document.getElementById('twilioPhoneNumber')?.value || '',
        docusign_id: document.getElementById('docusignClientId')?.value || '',
        docusign_secret: document.getElementById('docusignClientSecret')?.value || '',
        docusign_url: document.getElementById('docusignBaseUrl')?.value || '',
        sendgrid: document.getElementById('sendgridApiKey')?.value || '',
        clearbit: document.getElementById('clearbitApiKey')?.value || ''
    };

    // Save to localStorage
    Object.keys(settings).forEach(key => {
        if (settings[key] && !settings[key].includes('*')) {
            localStorage.setItem(STORAGE_KEYS[key], settings[key]);
        }
    });

    alert('✅ Settings saved successfully!');
    if (typeof window.hideDialog === 'function') {
        window.hideDialog('settingsModal');
    } else {
        document.getElementById('settingsModal').style.display = 'none';
    }

    // Reload settings
    loadSettings();
}

function openSettingsModal() {
    displaySettingsInModal();
    if (typeof window.showDialog === 'function') {
        window.showDialog('settingsModal');
    } else {
        document.getElementById('settingsModal').style.display = 'block';
    }
}

// ===== NAVIGATION =====
function setupNavigation() {
    console.log('🔗 Setting up navigation...');

    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) {
        console.warn('⚠️ Sidebar not found for navigation setup');
        return;
    }

    const navLinks = document.querySelectorAll('.nav-item[data-page], .sidebar-link[data-page]');
    console.log('📊 Found', navLinks.length, 'navigation links with data-page');

    if (navLinks.length === 0) {
        console.error('❌ No navigation links found! Retrying in 500ms...');
        setTimeout(setupNavigation, 500);
        return;
    }

    navLinks.forEach(function(link, index) {
        const pageName = link.getAttribute('data-page');
        console.log(`  ${index + 1}. "${link.textContent.trim()}" → ${pageName}`);

        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);

        newLink.addEventListener('click', function(e) {
            e.preventDefault();

            console.log('🔗 Link clicked:', newLink.textContent.trim(), '→', pageName);
            switchPage(pageName);

            document.querySelectorAll('.nav-item, .sidebar-link').forEach(function(nav) {
                nav.classList.remove('active');
            });
            newLink.classList.add('active');
        });
    });

    window.navigationSetup = true;
    console.log('✅ Navigation setup complete - direct listeners attached to', navLinks.length, 'links');
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
    } else {
        console.error('❌ Page not found:', `page-${pageName}`);
        return;
    }
    
    // Initialize page-specific content based on page name
    setTimeout(() => {
        if (pageName === 'scheduling' && window.Scheduling) {
            console.log('📊 Initializing scheduling page');
            window.Scheduling.renderGanttChart();
            window.Scheduling.renderProjectTree();
        }
        
        if (pageName === 'network' && window.NetworkAccess) {
            console.log('🌐 Initializing network access page');
            window.NetworkAccess.renderAllowList();
        }
        
        if (pageName === 'hardware' && window.Endpoint) {
            console.log('💻 Initializing hardware page');
            window.Endpoint.initializeHardwarePage();
            window.Endpoint.initializeHardwareChart();
            window.Endpoint.initializeHardwareGrid();
        }
        
        if (pageName === 'lifecycle' && window.Lifecycle) {
            console.log('📊 Initializing lifecycle page');
            window.Lifecycle.initializeLifecyclePage();
        }
        
        if (pageName === 'company-research' && window.CompanyResearch) {
            console.log('🔍 Initializing company research page');
            window.CompanyResearch.initializeCompanyResearchPage();
        }
        
        if (pageName === 'email-campaigns' && window.EmailCampaigns) {
            console.log('📧 Initializing email campaigns page');
            window.EmailCampaigns.initializeEmailCampaignsPage();
        }
        
        if (pageName === 'e-signature' && window.ESignature) {
            console.log('✍️ Initializing e-signature page');
            window.ESignature.initializeESignaturePage();
        }
        
        if (pageName === 'voip-calling' && window.VoIP) {
            console.log('📞 Initializing VoIP calling page');
            window.VoIP.initializeVoIPPage();
        }
    }, 100);
}

// ===== EVENT LISTENERS SETUP =====
function setupEventListeners() {
    console.log('🔧 Setting up event listeners...');
    
    // Settings button
    const settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', openSettingsModal);
    }
    
    // Save settings button
    const saveSettingsBtn = document.getElementById('saveSettingsBtn');
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', saveSettings);
    }
    
    // Add Project button
    const addProjectBtn = document.getElementById('addProjectBtn');
    if (addProjectBtn && window.Scheduling) {
        addProjectBtn.addEventListener('click', () => {
            if (typeof window.showDialog === 'function') {
                window.showDialog('projectModal');
            }
        });
    }
    
    // Save Project button
    const saveProjectBtn = document.getElementById('saveProjectBtn');
    if (saveProjectBtn && window.Scheduling) {
        saveProjectBtn.addEventListener('click', () => {
            window.Scheduling.saveProject();
            if (typeof window.hideDialog === 'function') {
                window.hideDialog('projectModal');
            }
        });
    }
    
    // Update Project button
    const updateProjectBtn = document.getElementById('updateProjectBtn');
    if (updateProjectBtn && window.Scheduling) {
        updateProjectBtn.addEventListener('click', () => {
            window.Scheduling.updateProject();
            if (typeof window.hideDialog === 'function') {
                window.hideDialog('editModal');
            }
        });
    }
    
    // Delete Project button
    const deleteProjectBtn = document.getElementById('deleteProjectBtn');
    if (deleteProjectBtn && window.Scheduling) {
        deleteProjectBtn.addEventListener('click', () => {
            window.Scheduling.deleteProject();
        });
    }
    
    console.log('✅ Event listeners setup complete');
}

// ===== INITIALIZATION =====
function initializeApp() {
    console.log('🚀 Initializing MSP Project Calendar...');
    
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    
    // Set date values for any date inputs
    const dateInputs = ['requestDate', 'assignedStartDate', 'preferredStartDate'];
    dateInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) input.value = todayString;
    });
    
    // Load settings
    loadSettings();
    
    console.log('✅ App initialization complete');
}

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM Content Loaded');
    
    initializeApp();
    setupEventListeners();
    
    // Wait for accordion to finish initializing before setting up navigation
    setTimeout(function() {
        console.log('🔗 Setting up navigation after page load...');
        setupNavigation();
    }, 1500);
    
    // Load sample data for scheduling module
    if (window.Scheduling && typeof window.Scheduling.loadSampleData === 'function') {
        window.Scheduling.loadSampleData();
    }
    
    console.log('✅ Application ready!');
});

// ===== GLOBAL EXPORTS =====
if (typeof window !== 'undefined') {
    window.AppMain = {
        switchPage,
        openSettingsModal,
        saveSettings,
        loadSettings
    };
}

