/**
 * API SETTINGS MODULE
 * Handles loading and saving API keys from/to the database
 */

const API_BASE_URL = window.location.origin;

/**
 * Load all settings from the database
 */
async function loadSettingsFromDB() {
    try {
        console.log('📥 Loading settings from database...');
        const response = await fetch(`${API_BASE_URL}/api/settings`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
            const settings = result.data;
            console.log('✅ Settings loaded from database');
            
            // Apply settings to the appropriate modules
            if (settings.openai_api_key && window.AI_CONFIG) {
                window.AI_CONFIG.apiKey = settings.openai_api_key;
            }
            
            if (settings.twilio_account_sid && settings.twilio_auth_token && window.VoIP) {
                window.VoIP.VOIP_CONFIG.apiKey = settings.twilio_account_sid;
                window.VoIP.VOIP_CONFIG.authToken = settings.twilio_auth_token;
                window.VoIP.VOIP_CONFIG.phoneNumber = settings.twilio_phone_number;
            }
            
            if (settings.docusign_client_id && window.ESignature) {
                window.ESignature.DOCUSIGN_CONFIG.clientId = settings.docusign_client_id;
                window.ESignature.DOCUSIGN_CONFIG.clientSecret = settings.docusign_client_secret;
                window.ESignature.DOCUSIGN_CONFIG.redirectUrl = settings.docusign_redirect_url;
            }
            
            if (settings.sendgrid_api_key && window.EmailCampaigns) {
                window.EmailCampaigns.EMAIL_CONFIG.apiKey = settings.sendgrid_api_key;
            }
            
            if (settings.clearbit_api_key && window.CompanyResearch) {
                window.CompanyResearch.CLEARBIT_CONFIG.apiKey = settings.clearbit_api_key;
            }
            
            return settings;
        } else {
            throw new Error(result.error || 'Failed to load settings');
        }
    } catch (error) {
        console.error('❌ Error loading settings from database:', error);
        // Fall back to localStorage if database is unavailable
        console.log('⚠️ Falling back to localStorage...');
        return loadSettingsFromLocalStorage();
    }
}

/**
 * Save settings to the database (bulk update)
 */
async function saveSettingsToDB(settings) {
    try {
        console.log('💾 Saving settings to database...');
        const response = await fetch(`${API_BASE_URL}/api/settings/bulk`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(settings)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
            console.log('✅ Settings saved to database');
            return true;
        } else {
            throw new Error(result.error || 'Failed to save settings');
        }
    } catch (error) {
        console.error('❌ Error saving settings to database:', error);
        // Fall back to localStorage if database is unavailable
        console.log('⚠️ Falling back to localStorage...');
        saveSettingsToLocalStorage(settings);
        throw error;
    }
}

/**
 * Update a single setting
 */
async function updateSetting(key, value) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/settings/${key}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ value })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        return result.success ? result.data : null;
    } catch (error) {
        console.error(`❌ Error updating setting ${key}:`, error);
        throw error;
    }
}

/**
 * Fallback: Load settings from localStorage
 */
function loadSettingsFromLocalStorage() {
    console.log('📥 Loading settings from localStorage...');
    const settings = {};
    const keys = [
        'openai_api_key',
        'twilio_account_sid',
        'twilio_auth_token',
        'twilio_phone_number',
        'docusign_client_id',
        'docusign_client_secret',
        'docusign_redirect_url',
        'sendgrid_api_key',
        'clearbit_api_key'
    ];
    
    keys.forEach(key => {
        const value = localStorage.getItem(key);
        if (value) {
            settings[key] = value;
        }
    });
    
    return settings;
}

/**
 * Fallback: Save settings to localStorage
 */
function saveSettingsToLocalStorage(settings) {
    console.log('💾 Saving settings to localStorage...');
    Object.entries(settings).forEach(([key, value]) => {
        if (value) {
            localStorage.setItem(key, value);
        } else {
            localStorage.removeItem(key);
        }
    });
}

/**
 * Mask sensitive values for display
 */
function maskValue(value, showChars = 8) {
    if (!value || value.length <= showChars) {
        return value;
    }
    return value.substring(0, showChars) + '*'.repeat(Math.max(0, value.length - showChars));
}

// Export functions
if (typeof window !== 'undefined') {
    window.ApiSettings = {
        loadSettingsFromDB,
        saveSettingsToDB,
        updateSetting,
        maskValue,
        loadSettingsFromLocalStorage,
        saveSettingsToLocalStorage
    };
}

