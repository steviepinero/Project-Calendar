// VoIP Calling Module

// ===== DATA STRUCTURES =====
const VOIP_CONFIG = {
    apiKey: '',
    authToken: '',
    phoneNumber: ''
};

let callHistory = [];
let contacts = [];
let currentCall = null;

// ===== INITIALIZATION =====
function initializeVoIPPage() {
    console.log('📞 Initializing VoIP page...');
    setupVoIPEventListeners();
    renderCallHistory();
    renderContacts();
    console.log('✅ VoIP page initialized');
}

function setupVoIPEventListeners() {
    // Dial pad buttons
    const dialPadButtons = document.querySelectorAll('.dial-pad-button');
    dialPadButtons.forEach(button => {
        button.addEventListener('click', () => {
            const digit = button.textContent;
            appendToDialer(digit);
        });
    });
    
    // Call button
    const callBtn = document.getElementById('callButton');
    if (callBtn) {
        callBtn.addEventListener('click', makeCall);
    }
    
    // Hangup button
    const hangupBtn = document.getElementById('hangupButton');
    if (hangupBtn) {
        hangupBtn.addEventListener('click', hangupCall);
    }
}

// ===== DIALER FUNCTIONS =====
function appendToDialer(digit) {
    const display = document.getElementById('dialerDisplay');
    if (display) {
        display.value += digit;
    }
}

function makeCall() {
    const number = document.getElementById('dialerDisplay')?.value;
    if (!number) {
        alert('Please enter a phone number');
        return;
    }
    
    if (!VOIP_CONFIG.apiKey) {
        alert('⚠️ Twilio not configured. Please add your credentials in Settings.');
        return;
    }
    
    console.log('Making call to:', number);
    
    // Mock call
    currentCall = {
        number,
        startTime: new Date(),
        status: 'active'
    };
    
    alert(`📞 Calling ${number}...`);
}

function hangupCall() {
    if (!currentCall) {
        alert('No active call');
        return;
    }
    
    const endTime = new Date();
    const duration = Math.floor((endTime - currentCall.startTime) / 1000);
    
    // Add to call history
    callHistory.unshift({
        number: currentCall.number,
        date: currentCall.startTime,
        duration: `${duration}s`,
        type: 'outgoing'
    });
    
    currentCall = null;
    renderCallHistory();
    
    alert('📞 Call ended');
}

// ===== RENDERING =====
function renderCallHistory() {
    const container = document.getElementById('callHistoryList');
    if (!container) return;
    
    container.innerHTML = '';
    
    callHistory.forEach(call => {
        const item = document.createElement('div');
        item.className = 'call-history-item';
        item.innerHTML = `
            <span>${call.number}</span>
            <span>${call.duration}</span>
            <span>${call.type}</span>
        `;
        container.appendChild(item);
    });
}

function renderContacts() {
    const container = document.getElementById('contactList');
    if (!container) return;
    
    container.innerHTML = '';
    
    contacts.forEach(contact => {
        const item = document.createElement('div');
        item.className = 'contact-item';
        item.innerHTML = `
            <span>${contact.name}</span>
            <span>${contact.number}</span>
            <button onclick="window.VoIP.callContact('${contact.number}')">Call</button>
        `;
        container.appendChild(item);
    });
}

function callContact(number) {
    document.getElementById('dialerDisplay').value = number;
    makeCall();
}

// ===== EXPORTS =====
if (typeof window !== 'undefined') {
    window.VoIP = {
        VOIP_CONFIG,
        initializeVoIPPage,
        appendToDialer,
        makeCall,
        hangupCall,
        callContact,
        renderCallHistory,
        renderContacts
    };
}





