// Email Campaigns Module

// ===== DATA STRUCTURES =====
let emailCampaigns = [];

// ===== INITIALIZATION =====
function initializeEmailCampaignsPage() {
    console.log('📧 Initializing email campaigns page...');
    setupEmailCampaignsEventListeners();
    renderEmailCampaigns();
    console.log('✅ Email campaigns page initialized');
}

function setupEmailCampaignsEventListeners() {
    const createBtn = document.getElementById('createCampaignBtn');
    if (createBtn) {
        createBtn.addEventListener('click', openCreateCampaignModal);
    }
}

// ===== CAMPAIGN MANAGEMENT =====
function openCreateCampaignModal() {
    console.log('Opening create campaign modal');
    if (typeof window.showDialog === 'function') {
        window.showDialog('createCampaignModal');
    }
}

function createCampaign() {
    const name = document.getElementById('campaignName')?.value;
    const subject = document.getElementById('campaignSubject')?.value;
    const body = document.getElementById('campaignBody')?.value;
    
    if (!name || !subject || !body) {
        alert('Please fill in all fields');
        return;
    }
    
    const campaign = {
        id: Date.now(),
        name,
        subject,
        body,
        status: 'Draft',
        created: new Date()
    };
    
    emailCampaigns.push(campaign);
    renderEmailCampaigns();
    
    if (typeof window.hideDialog === 'function') {
        window.hideDialog('createCampaignModal');
    }
    
    alert('Campaign created successfully!');
}

function renderEmailCampaigns() {
    const container = document.getElementById('emailCampaignsList');
    if (!container) return;
    
    container.innerHTML = '';
    
    emailCampaigns.forEach(campaign => {
        const item = document.createElement('div');
        item.className = 'campaign-item';
        item.innerHTML = `
            <h4>${campaign.name}</h4>
            <p>${campaign.subject}</p>
            <span class="campaign-status">${campaign.status}</span>
        `;
        container.appendChild(item);
    });
}

// ===== EXPORTS =====
if (typeof window !== 'undefined') {
    window.EmailCampaigns = {
        initializeEmailCampaignsPage,
        openCreateCampaignModal,
        createCampaign,
        renderEmailCampaigns
    };
}

