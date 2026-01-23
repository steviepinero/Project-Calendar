// Network Access & Allow List Module

// ===== DATA STRUCTURES =====
let allowList = [
    { mac: '00:1B:44:11:3A:B7', description: 'Office Router' },
    { mac: '00:1B:44:11:3A:B8', description: 'Printer 1' },
    { mac: '00:1B:44:11:3A:B9', description: 'Access Point' },
    { mac: '00:1B:44:11:3A:BA', description: 'Server' },
    { mac: '00:1B:44:11:3A:BB', description: 'Workstation 1' }
];

let selectedMacAddress = null;

// ===== INITIALIZATION =====
function initializeNetworkAccessPage() {
    console.log('🌐 Initializing network access page...');
    renderAllowList();
    console.log('✅ Network access page initialized');
}

// ===== ALLOW LIST MANAGEMENT =====
function renderAllowList() {
    const allowListBox = document.getElementById('allowListBox');
    if (!allowListBox) return;
    
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
    
    if (typeof window.showDialog === 'function') {
        window.showDialog('blockMac');  // Use 'blockMac' not 'blockModal'
    } else {
        document.getElementById('blockModal').style.display = 'block';
    }
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
    
    if (typeof window.hideDialog === 'function') {
        window.hideDialog('blockMac');  // Use 'blockMac' not 'blockModal'
    }
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
    
    // Clear inputs
    document.getElementById('newMacAddress').value = '';
    document.getElementById('macDescription').value = '';
    
    // Re-render list
    renderAllowList();
    
    // Show success message
    alert(`✓ MAC address ${normalizedMac} has been added to the allow list`);
    
    if (typeof window.hideDialog === 'function') {
        window.hideDialog('addMac');  // Use 'addMac' not 'addMacModal'
    }
}

// ===== EXPORTS =====
if (typeof window !== 'undefined') {
    window.NetworkAccess = {
        initializeNetworkAccessPage,
        renderAllowList,
        removeMacAddress,
        removeSelectedMacAddress,
        openBlockModal,
        confirmBlockMacAddress,
        addNewMacAddress,
        // Expose data for other modules if needed
        get allowList() { return allowList; }
    };
}

