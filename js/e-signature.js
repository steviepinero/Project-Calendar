// E-Signature Module

// ===== DATA STRUCTURES =====
let eSignatureDocuments = [];

// ===== INITIALIZATION =====
function initializeESignaturePage() {
    console.log('✍️ Initializing e-signature page...');
    setupESignatureEventListeners();
    renderESignatureDocuments();
    console.log('✅ E-signature page initialized');
}

function setupESignatureEventListeners() {
    const createBtn = document.getElementById('createDocumentBtn');
    if (createBtn) {
        createBtn.addEventListener('click', openCreateDocumentModal);
    }
}

// ===== DOCUMENT MANAGEMENT =====
function openCreateDocumentModal() {
    console.log('Opening create document modal');
    if (typeof window.showDialog === 'function') {
        window.showDialog('createDocumentModal');
    }
}

function createDocument() {
    const name = document.getElementById('documentName')?.value;
    const recipient = document.getElementById('recipientEmail')?.value;
    
    if (!name || !recipient) {
        alert('Please fill in all fields');
        return;
    }
    
    const document = {
        id: Date.now(),
        name,
        recipient,
        status: 'Pending',
        created: new Date()
    };
    
    eSignatureDocuments.push(document);
    renderESignatureDocuments();
    
    if (typeof window.hideDialog === 'function') {
        window.hideDialog('createDocumentModal');
    }
    
    alert('Document created successfully!');
}

function renderESignatureDocuments() {
    const container = document.getElementById('eSignatureDocumentsList');
    if (!container) return;
    
    container.innerHTML = '';
    
    eSignatureDocuments.forEach(doc => {
        const item = document.createElement('div');
        item.className = 'document-item';
        item.innerHTML = `
            <h4>${doc.name}</h4>
            <p>Recipient: ${doc.recipient}</p>
            <span class="document-status">${doc.status}</span>
        `;
        container.appendChild(item);
    });
}

// ===== EXPORTS =====
if (typeof window !== 'undefined') {
    window.ESignature = {
        initializeESignaturePage,
        openCreateDocumentModal,
        createDocument,
        renderESignatureDocuments
    };
}



