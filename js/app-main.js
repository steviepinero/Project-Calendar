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
function loadSettings() {
    console.log('📥 Loading settings from localStorage...');
    
    // Load OpenAI
    const openaiKey = localStorage.getItem('openai_api_key');
    if (openaiKey) {
        AI_CONFIG.apiKey = openaiKey;
        console.log('✅ OpenAI API Key loaded');
    }

    // Load Twilio
    const twilioSid = localStorage.getItem('twilio_account_sid');
    const twilioToken = localStorage.getItem('twilio_auth_token');
    const twilioPhone = localStorage.getItem('twilio_phone_number');
    if (twilioSid && twilioToken && window.VoIP) {
        window.VoIP.VOIP_CONFIG.apiKey = twilioSid;
        window.VoIP.VOIP_CONFIG.authToken = twilioToken;
        window.VoIP.VOIP_CONFIG.phoneNumber = twilioPhone;
        console.log('✅ Twilio credentials loaded');
    }
    
    console.log('✅ Settings loaded');
}

function displaySettingsInModal() {
    console.log('📋 Displaying settings in modal...');
    
    // Use localStorage directly (simple and reliable)
    const settings = {
        openai_api_key: localStorage.getItem('openai_api_key') || '',
        twilio_account_sid: localStorage.getItem('twilio_account_sid') || '',
        twilio_auth_token: localStorage.getItem('twilio_auth_token') || '',
        twilio_phone_number: localStorage.getItem('twilio_phone_number') || '',
        docusign_client_id: localStorage.getItem('docusign_client_id') || '',
        docusign_client_secret: localStorage.getItem('docusign_client_secret') || '',
        docusign_base_url: localStorage.getItem('docusign_base_url') || '',
        sendgrid_api_key: localStorage.getItem('sendgrid_api_key') || '',
        clearbit_api_key: localStorage.getItem('clearbit_api_key') || ''
    };
    
    // Mask sensitive keys for display
    const maskKey = (key) => {
        if (!key || key.length <= 8) return key;
        return key.substring(0, 8) + '*'.repeat(Math.max(0, key.length - 8));
    };
    
    // Display settings in form fields
    if (document.getElementById('openaiApiKey')) {
        document.getElementById('openaiApiKey').value = maskKey(settings.openai_api_key);
    }
    if (document.getElementById('twilioAccountSid')) {
        document.getElementById('twilioAccountSid').value = maskKey(settings.twilio_account_sid);
    }
    if (document.getElementById('twilioAuthToken')) {
        document.getElementById('twilioAuthToken').value = maskKey(settings.twilio_auth_token);
    }
    if (document.getElementById('twilioPhoneNumber')) {
        document.getElementById('twilioPhoneNumber').value = settings.twilio_phone_number;
    }
    if (document.getElementById('docusignClientId')) {
        document.getElementById('docusignClientId').value = maskKey(settings.docusign_client_id);
    }
    if (document.getElementById('docusignClientSecret')) {
        document.getElementById('docusignClientSecret').value = maskKey(settings.docusign_client_secret);
    }
    if (document.getElementById('docusignBaseUrl')) {
        document.getElementById('docusignBaseUrl').value = settings.docusign_base_url;
    }
    if (document.getElementById('sendgridApiKey')) {
        document.getElementById('sendgridApiKey').value = maskKey(settings.sendgrid_api_key);
    }
    if (document.getElementById('clearbitApiKey')) {
        document.getElementById('clearbitApiKey').value = maskKey(settings.clearbit_api_key);
    }
    
    console.log('✅ Settings displayed in modal');
}

function saveSettings() {
    console.log('💾 Saving settings...');
    
    const settings = {
        openai_api_key: document.getElementById('openaiApiKey')?.value || '',
        twilio_account_sid: document.getElementById('twilioAccountSid')?.value || '',
        twilio_auth_token: document.getElementById('twilioAuthToken')?.value || '',
        twilio_phone_number: document.getElementById('twilioPhoneNumber')?.value || '',
        docusign_client_id: document.getElementById('docusignClientId')?.value || '',
        docusign_client_secret: document.getElementById('docusignClientSecret')?.value || '',
        docusign_base_url: document.getElementById('docusignBaseUrl')?.value || '',
        sendgrid_api_key: document.getElementById('sendgridApiKey')?.value || '',
        clearbit_api_key: document.getElementById('clearbitApiKey')?.value || ''
    };

    // Save to localStorage (skip masked values)
    Object.keys(settings).forEach(key => {
        if (settings[key] && !settings[key].includes('*')) {
            localStorage.setItem(key, settings[key]);
            console.log(`✅ Saved ${key}`);
        }
    });
    
    alert('✅ Settings saved successfully!');
    
    // Close the dialog
    if (typeof window.hideDialog === 'function') {
        window.hideDialog('settings');
    } else {
        document.getElementById('settingsModal').style.display = 'none';
    }

    // Reload settings
    loadSettings();
}

function openSettingsModal() {
    console.log('⚙️ Opening settings modal...');
    
    // Load the settings first
    try {
        displaySettingsInModal();
    } catch (error) {
        console.error('❌ Error loading settings:', error);
    }
    
    // Then show the dialog
    if (typeof window.showDialog === 'function') {
        console.log('📊 Using Syncfusion dialog for settings');
        window.showDialog('settings');
    } else {
        console.log('📊 Using direct style for settings modal');
        const modal = document.getElementById('settingsModal');
        if (modal) {
            modal.style.display = 'block';
            console.log('✅ Settings modal opened');
        } else {
            console.error('❌ settingsModal element not found');
        }
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

    // Query for all navigation links, including those in collapsed accordion panels
    const navLinks = document.querySelectorAll('.nav-item[data-page], .sidebar-link[data-page]');
    console.log('📊 Found', navLinks.length, 'navigation links with data-page');

    if (navLinks.length === 0) {
        console.error('❌ No navigation links found! Retrying in 500ms...');
        setTimeout(setupNavigation, 500);
        return;
    }

    // Use event delegation on the sidebar instead of individual links
    sidebar.addEventListener('click', function(e) {
        // Find the closest link with data-page
        const link = e.target.closest('.nav-item[data-page], .sidebar-link[data-page]');
        
        if (link) {
            e.preventDefault();
            e.stopPropagation();
            
            const pageName = link.getAttribute('data-page');
            console.log('🔗 Link clicked:', link.textContent.trim(), '→', pageName);
            
            switchPage(pageName);
            
            // Update active state
            document.querySelectorAll('.nav-item, .sidebar-link').forEach(function(nav) {
                nav.classList.remove('active');
            });
            link.classList.add('active');
        }
    }, true); // Use capture phase

    window.navigationSetup = true;
    console.log('✅ Navigation setup complete - event delegation on sidebar for all', navLinks.length, 'links');
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
        if (pageName === 'leads' && window.initializeLeadsPage) {
            console.log('🎯 Initializing leads page');
            window.initializeLeadsPage();
        }
        
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
        
        if (pageName === 'billing' && window.Billing) {
            console.log('💰 Initializing billing page');
            window.Billing.initializeBillingPage();
        }
    }, 100);
}

// ===== EVENT LISTENERS SETUP =====
function setupEventListeners() {
    console.log('🔧 Setting up event listeners...');
    
    // Settings button
    const settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn) {
        console.log('✅ Found settings button');
        settingsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('⚙️ Settings button clicked');
            openSettingsModal();
        });
    } else {
        console.warn('⚠️ Settings button not found');
    }
    
    // Save settings button
    const saveSettingsBtn = document.getElementById('saveSettingsBtn');
    if (saveSettingsBtn) {
        console.log('✅ Found save settings button');
        saveSettingsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('💾 Save settings button clicked');
            saveSettings();
        });
    } else {
        console.warn('⚠️ Save settings button not found');
    }
    
    // Add Project button
    const addProjectBtn = document.getElementById('addProjectBtn');
    if (addProjectBtn) {
        console.log('✅ Found add project button');
        addProjectBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('➕ Add project button clicked');
            if (typeof window.showDialog === 'function') {
                console.log('📊 Opening project modal via Syncfusion');
                window.showDialog('project');  // Use 'project' not 'projectModal'
            } else {
                console.log('📊 Opening project modal via direct style');
                const modal = document.getElementById('projectModal');
                if (modal) {
                    modal.style.display = 'block';
                } else {
                    console.error('❌ projectModal not found');
                }
            }
        });
    } else {
        console.warn('⚠️ Add project button not found');
    }
    
    // Save Project button
    const saveProjectBtn = document.getElementById('saveProjectBtn');
    if (saveProjectBtn) {
        console.log('✅ Found save project button');
        saveProjectBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('💾 Save project button clicked');
            if (window.Scheduling) {
                window.Scheduling.saveProject();
                if (typeof window.hideDialog === 'function') {
                    window.hideDialog('project');  // Use 'project' not 'projectModal'
                } else {
                    const modal = document.getElementById('projectModal');
                    if (modal) modal.style.display = 'none';
                }
            } else {
                console.error('❌ Scheduling module not loaded');
            }
        });
    } else {
        console.warn('⚠️ Save project button not found');
    }
    
    // Update Project button
    const updateProjectBtn = document.getElementById('updateProjectBtn');
    if (updateProjectBtn) {
        console.log('✅ Found update project button');
        updateProjectBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('✏️ Update project button clicked');
            if (window.Scheduling) {
                window.Scheduling.updateProject();
                if (typeof window.hideDialog === 'function') {
                    window.hideDialog('edit');  // Use 'edit' not 'editModal'
                } else {
                    const modal = document.getElementById('editModal');
                    if (modal) modal.style.display = 'none';
                }
            } else {
                console.error('❌ Scheduling module not loaded');
            }
        });
    } else {
        console.warn('⚠️ Update project button not found');
    }
    
    // Delete Project button
    const deleteProjectBtn = document.getElementById('deleteProjectBtn');
    if (deleteProjectBtn) {
        console.log('✅ Found delete project button');
        deleteProjectBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🗑️ Delete project button clicked');
            if (window.Scheduling) {
                window.Scheduling.deleteProject();
            } else {
                console.error('❌ Scheduling module not loaded');
            }
        });
    } else {
        console.warn('⚠️ Delete project button not found');
    }
    
    console.log('✅ Event listeners setup complete');
    console.log('📊 Checking for Syncfusion dialog functions:', typeof window.showDialog, typeof window.hideDialog);
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

