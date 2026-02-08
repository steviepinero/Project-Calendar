// Software Management Module

// ===== DATA STRUCTURES =====
let softwareData = [
    {
        id: 1,
        name: 'Microsoft Office 365 E3',
        company: 'Anderson Cabinet Designs',
        type: 'Office Suite',
        licenseKey: 'XXXXX-XXXXX-XXXXX-XXXXX',
        licenseCount: 25,
        purchaseDate: new Date('2024-01-15'),
        expirationDate: new Date('2026-01-15'),
        annualCost: 5250.00,
        status: 'Active',
        notes: 'Enterprise subscription'
    },
    {
        id: 2,
        name: 'Windows 11 Pro',
        company: 'Anderson Cabinet Designs',
        type: 'Operating System',
        licenseKey: 'XXXXX-XXXXX-XXXXX-XXXXX',
        licenseCount: 30,
        purchaseDate: new Date('2023-06-01'),
        expirationDate: null,
        annualCost: 0,
        status: 'Active',
        notes: 'Perpetual licenses'
    },
    {
        id: 3,
        name: 'Norton Security Premium',
        company: 'Tech Innovators LLC',
        type: 'Security',
        licenseKey: 'XXXXX-XXXXX-XXXXX-XXXXX',
        licenseCount: 15,
        purchaseDate: new Date('2024-03-01'),
        expirationDate: new Date('2026-04-30'),
        annualCost: 1200.00,
        status: 'Expiring Soon',
        notes: 'Renewal needed'
    },
    {
        id: 4,
        name: 'Adobe Creative Cloud',
        company: 'Green Energy Solutions',
        type: 'Business',
        licenseKey: 'XXXXX-XXXXX-XXXXX-XXXXX',
        licenseCount: 5,
        purchaseDate: new Date('2023-11-01'),
        expirationDate: new Date('2025-12-31'),
        annualCost: 3000.00,
        status: 'Expired',
        notes: 'Design team subscription'
    },
    {
        id: 5,
        name: 'Salesforce CRM',
        company: 'Tech Innovators LLC',
        type: 'Business',
        licenseKey: 'XXXXX-XXXXX-XXXXX-XXXXX',
        licenseCount: 20,
        purchaseDate: new Date('2024-02-01'),
        expirationDate: new Date('2027-02-01'),
        annualCost: 12000.00,
        status: 'Active',
        notes: 'Sales team platform'
    },
    {
        id: 6,
        name: 'Visual Studio Professional',
        company: 'Tech Innovators LLC',
        type: 'Development',
        licenseKey: 'XXXXX-XXXXX-XXXXX-XXXXX',
        licenseCount: 10,
        purchaseDate: new Date('2024-01-01'),
        expirationDate: new Date('2026-01-01'),
        annualCost: 4500.00,
        status: 'Active',
        notes: 'Development team'
    }
];

let softwareGridInstance = null;
let addSoftwareDialog = null;

// ===== INITIALIZATION =====
function initializeSoftwarePage() {
    console.log('💿 Initializing software management page...');
    
    populateCompanyFilter();
    updateStats();
    initializeSoftwareGrid();
    setupEventListeners();
    
    console.log('✅ Software page initialized');
}

// ===== STATS CALCULATION =====
function updateStats() {
    const total = softwareData.length;
    const active = softwareData.filter(s => s.status === 'Active').length;
    const expiring = softwareData.filter(s => s.status === 'Expiring Soon').length;
    const expired = softwareData.filter(s => s.status === 'Expired').length;
    
    document.getElementById('totalLicenses').textContent = total;
    document.getElementById('activeLicenses').textContent = active;
    document.getElementById('expiringSoon').textContent = expiring;
    document.getElementById('expiredLicenses').textContent = expired;
}

// ===== COMPANY FILTER =====
function populateCompanyFilter() {
    const companyFilter = document.getElementById('softwareCompanyFilter');
    const addSoftwareCompany = document.getElementById('softwareCompany');
    
    if (!companyFilter) return;
    
    // Get unique companies from leadsData
    let companies = [];
    if (window.leadsData && window.leadsData.length > 0) {
        companies = [...new Set(window.leadsData.map(lead => lead.Company))].sort();
    } else {
        // Fallback to companies in software data
        companies = [...new Set(softwareData.map(s => s.company))].sort();
    }
    
    companies.forEach(company => {
        const option = document.createElement('option');
        option.value = company;
        option.textContent = company;
        companyFilter.appendChild(option);
        
        if (addSoftwareCompany) {
            const option2 = document.createElement('option');
            option2.value = company;
            option2.textContent = company;
            addSoftwareCompany.appendChild(option2);
        }
    });
}

// ===== GRID INITIALIZATION =====
function initializeSoftwareGrid() {
    const gridContainer = document.getElementById('softwareGrid');
    if (!gridContainer) return;
    
    // Format data for grid
    const gridData = softwareData.map(software => ({
        ...software,
        purchaseDateFormatted: software.purchaseDate ? software.purchaseDate.toLocaleDateString() : 'N/A',
        expirationDateFormatted: software.expirationDate ? software.expirationDate.toLocaleDateString() : 'Perpetual',
        annualCostFormatted: `$${software.annualCost.toFixed(2)}`,
        statusBadge: getStatusBadge(software.status)
    }));
    
    softwareGridInstance = new ej.grids.Grid({
        dataSource: gridData,
        allowPaging: true,
        allowSorting: true,
        allowFiltering: true,
        allowSelection: true,
        pageSettings: { pageSize: 20, pageSizes: [10, 20, 50, 100] },
        filterSettings: { type: 'Excel' },
        selectionSettings: { type: 'Single' },
        columns: [
            { field: 'name', headerText: 'Software Name', width: 200, textAlign: 'Left' },
            { field: 'company', headerText: 'Company', width: 150, textAlign: 'Left' },
            { field: 'type', headerText: 'Type', width: 130, textAlign: 'Left' },
            { field: 'licenseCount', headerText: 'Licenses', width: 90, textAlign: 'Center' },
            { field: 'purchaseDateFormatted', headerText: 'Purchase Date', width: 120, textAlign: 'Center' },
            { field: 'expirationDateFormatted', headerText: 'Expiration', width: 120, textAlign: 'Center' },
            { field: 'annualCostFormatted', headerText: 'Annual Cost', width: 120, textAlign: 'Right' },
            { 
                field: 'statusBadge', 
                headerText: 'Status', 
                width: 120, 
                textAlign: 'Center',
                template: '<div class="${statusBadge}">${status}</div>'
            },
            { 
                headerText: 'Actions', 
                width: 120, 
                textAlign: 'Center',
                template: '<button class="e-btn e-small e-outline view-software-btn" data-id="${id}">View</button>'
            }
        ],
        created: function() {
            console.log('✅ Software grid created');
        }
    });
    
    softwareGridInstance.appendTo(gridContainer);
    
    // Add event listener for view buttons
    setTimeout(() => {
        document.querySelectorAll('.view-software-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const softwareId = parseInt(this.getAttribute('data-id'));
                viewSoftwareDetails(softwareId);
            });
        });
    }, 500);
}

function getStatusBadge(status) {
    switch(status) {
        case 'Active':
            return 'status-badge status-active';
        case 'Expiring Soon':
            return 'status-badge status-expiring';
        case 'Expired':
            return 'status-badge status-expired';
        default:
            return 'status-badge';
    }
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Add Software Button
    const addBtn = document.getElementById('addSoftwareBtn');
    if (addBtn) {
        addBtn.addEventListener('click', openAddSoftwareDialog);
    }
    
    // Filter Changes
    const companyFilter = document.getElementById('softwareCompanyFilter');
    const typeFilter = document.getElementById('softwareTypeFilter');
    const statusFilter = document.getElementById('softwareStatusFilter');
    
    if (companyFilter) {
        companyFilter.addEventListener('change', applyFilters);
    }
    if (typeFilter) {
        typeFilter.addEventListener('change', applyFilters);
    }
    if (statusFilter) {
        statusFilter.addEventListener('change', applyFilters);
    }
    
    // Clear Filters Button
    const clearBtn = document.getElementById('clearFiltersBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearFilters);
    }
    
    // Add Software Form
    const form = document.getElementById('addSoftwareForm');
    if (form) {
        form.addEventListener('submit', handleAddSoftware);
    }
    
    // Cancel Button
    const cancelBtn = document.getElementById('cancelAddSoftwareBtn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeAddSoftwareDialog);
    }
}

// ===== FILTERS =====
function applyFilters() {
    const companyValue = document.getElementById('softwareCompanyFilter').value;
    const typeValue = document.getElementById('softwareTypeFilter').value;
    const statusValue = document.getElementById('softwareStatusFilter').value;
    
    let filtered = [...softwareData];
    
    if (companyValue) {
        filtered = filtered.filter(s => s.company === companyValue);
    }
    if (typeValue) {
        filtered = filtered.filter(s => s.type === typeValue);
    }
    if (statusValue) {
        filtered = filtered.filter(s => s.status === statusValue);
    }
    
    // Update grid with filtered data
    if (softwareGridInstance) {
        const gridData = filtered.map(software => ({
            ...software,
            purchaseDateFormatted: software.purchaseDate ? software.purchaseDate.toLocaleDateString() : 'N/A',
            expirationDateFormatted: software.expirationDate ? software.expirationDate.toLocaleDateString() : 'Perpetual',
            annualCostFormatted: `$${software.annualCost.toFixed(2)}`,
            statusBadge: getStatusBadge(software.status)
        }));
        softwareGridInstance.dataSource = gridData;
    }
}

function clearFilters() {
    document.getElementById('softwareCompanyFilter').value = '';
    document.getElementById('softwareTypeFilter').value = '';
    document.getElementById('softwareStatusFilter').value = '';
    applyFilters();
}

// ===== ADD SOFTWARE DIALOG =====
function openAddSoftwareDialog() {
    if (!addSoftwareDialog) {
        addSoftwareDialog = new ej.popups.Dialog({
            header: 'Add New Software',
            content: document.getElementById('addSoftwareModal').innerHTML,
            width: '500px',
            isModal: true,
            visible: false,
            showCloseIcon: true,
            target: document.body,
            animationSettings: { effect: 'Zoom' }
        });
        addSoftwareDialog.appendTo('#addSoftwareModal');
    }
    
    addSoftwareDialog.show();
    
    // Re-attach event listeners after dialog content is rendered
    setTimeout(() => {
        const form = addSoftwareDialog.element.querySelector('#addSoftwareForm');
        if (form) {
            form.addEventListener('submit', handleAddSoftware);
        }
        
        const cancelBtn = addSoftwareDialog.element.querySelector('#cancelAddSoftwareBtn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', closeAddSoftwareDialog);
        }
    }, 100);
}

function closeAddSoftwareDialog() {
    if (addSoftwareDialog) {
        addSoftwareDialog.hide();
    }
}

// ===== ADD SOFTWARE =====
function handleAddSoftware(e) {
    e.preventDefault();
    
    const formElement = e.target.closest ? e.target : e.target.form;
    
    const newSoftware = {
        id: softwareData.length + 1,
        name: formElement.querySelector('#softwareName').value,
        company: formElement.querySelector('#softwareCompany').value,
        type: formElement.querySelector('#softwareType').value,
        licenseKey: formElement.querySelector('#licenseKey').value || 'N/A',
        licenseCount: parseInt(formElement.querySelector('#licenseCount').value),
        purchaseDate: new Date(formElement.querySelector('#purchaseDate').value),
        expirationDate: formElement.querySelector('#expirationDate').value ? 
                        new Date(formElement.querySelector('#expirationDate').value) : null,
        annualCost: parseFloat(formElement.querySelector('#annualCost').value || 0),
        status: calculateStatus(formElement.querySelector('#expirationDate').value),
        notes: formElement.querySelector('#softwareNotes').value || ''
    };
    
    softwareData.push(newSoftware);
    
    // Refresh grid
    initializeSoftwareGrid();
    updateStats();
    
    // Close dialog
    closeAddSoftwareDialog();
    
    // Reset form
    formElement.reset();
    
    alert(`✓ ${newSoftware.name} has been added successfully`);
}

function calculateStatus(expirationDate) {
    if (!expirationDate) return 'Active';
    
    const expDate = new Date(expirationDate);
    const today = new Date();
    const daysUntilExpiry = Math.floor((expDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) return 'Expired';
    if (daysUntilExpiry < 90) return 'Expiring Soon';
    return 'Active';
}

// ===== VIEW SOFTWARE DETAILS =====
function viewSoftwareDetails(softwareId) {
    const software = softwareData.find(s => s.id === softwareId);
    if (!software) return;
    
    const details = `
Software: ${software.name}
Company: ${software.company}
Type: ${software.type}
License Key: ${software.licenseKey}
Number of Licenses: ${software.licenseCount}
Purchase Date: ${software.purchaseDate.toLocaleDateString()}
Expiration: ${software.expirationDate ? software.expirationDate.toLocaleDateString() : 'Perpetual'}
Annual Cost: $${software.annualCost.toFixed(2)}
Status: ${software.status}
Notes: ${software.notes || 'None'}
    `;
    
    alert(details);
}

// ===== EXPORTS =====
if (typeof window !== 'undefined') {
    window.Software = {
        initializeSoftwarePage,
        softwareData
    };
}

