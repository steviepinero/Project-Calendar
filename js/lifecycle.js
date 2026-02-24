// Lifecycle Management Module

// ===== DATA STRUCTURES =====
let lifecycleData = [
    // Sample device data - in production this would come from an API
    { id: 1, company: 'Anderson Cabinet Designs', deviceType: 'Laptop', model: 'Dell Latitude 5520', serialNumber: 'SN12345', purchaseDate: new Date('2020-03-15'), warrantyExpiry: new Date('2023-03-15'), lifecycleYears: 4, status: 'Overdue', user: 'John Smith' },
    { id: 2, company: 'Anderson Cabinet Designs', deviceType: 'Desktop', model: 'HP EliteDesk 800', serialNumber: 'SN12346', purchaseDate: new Date('2021-06-20'), warrantyExpiry: new Date('2024-06-20'), lifecycleYears: 4, status: 'Active', user: 'Jane Doe' },
    { id: 3, company: 'Tech Innovators LLC', deviceType: 'Server', model: 'Dell PowerEdge R740', serialNumber: 'SN12347', purchaseDate: new Date('2019-01-10'), warrantyExpiry: new Date('2024-01-10'), lifecycleYears: 5, status: 'Due Soon', user: 'Server Room' },
    { id: 4, company: 'Harbor Light Financial', deviceType: 'Laptop', model: 'Lenovo ThinkPad X1', serialNumber: 'SN12348', purchaseDate: new Date('2022-08-15'), warrantyExpiry: new Date('2025-08-15'), lifecycleYears: 4, status: 'Active', user: 'Mike Johnson' },
    { id: 5, company: 'Green Energy Solutions', deviceType: 'Network Device', model: 'Cisco Catalyst 9300', serialNumber: 'SN12349', purchaseDate: new Date('2020-11-30'), warrantyExpiry: new Date('2023-11-30'), lifecycleYears: 5, status: 'Overdue', user: 'IT Closet' },
];

let lifecycleGridInstance = null;
let lifecycleChartInstance = null;

// ===== INITIALIZATION =====
function initializeLifecyclePage() {
    console.log('🔄 Initializing lifecycle page...');
    
    populateCompanyFilter();
    updateSummaryCards();
    initializeLifecycleChart();
    initializeLifecycleGrid();
    setupEventListeners();
    
    console.log('✅ Lifecycle page initialized');
}

// ===== SUMMARY CARDS =====
function updateSummaryCards() {
    // Calculate summary statistics
    const overdue = lifecycleData.filter(d => d.status === 'Overdue').length;
    const dueSoon = lifecycleData.filter(d => d.status === 'Due Soon').length;
    const dueThisYear = lifecycleData.filter(d => {
        const replacementDate = calculateReplacementDate(d);
        const oneYearFromNow = new Date();
        oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
        return replacementDate <= oneYearFromNow;
    }).length;
    const withinLifecycle = lifecycleData.filter(d => d.status === 'Active').length;
    
    // Update the display (values are already hardcoded in HTML for demo)
    console.log('📊 Summary:', { overdue, dueSoon, dueThisYear, withinLifecycle });
}

// ===== COMPANY FILTER =====
function populateCompanyFilter() {
    const companyFilter = document.getElementById('lifecycleCompanyFilter');
    if (!companyFilter) return;
    
    let companies = [];
    if (window.leadsData && window.leadsData.length > 0) {
        companies = [...new Set(window.leadsData.map(lead => lead.Company))].sort();
    } else {
        companies = [...new Set(lifecycleData.map(d => d.company))].sort();
    }
    
    companies.forEach(company => {
        const option = document.createElement('option');
        option.value = company;
        option.textContent = company;
        companyFilter.appendChild(option);
    });
}

// ===== LIFECYCLE CHART =====
function initializeLifecycleChart() {
    const chartContainer = document.getElementById('lifecycleChart');
    if (!chartContainer) return;
    
    // Generate monthly data for next 12 months
    const months = [];
    const overdueData = [];
    const dueSoonData = [];
    const scheduledData = [];
    
    for (let i = 0; i < 12; i++) {
        const date = new Date();
        date.setMonth(date.getMonth() + i);
        months.push(date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }));
        
        // Simulate data - in production this would be calculated from actual devices
        overdueData.push(Math.floor(Math.random() * 10) + 5);
        dueSoonData.push(Math.floor(Math.random() * 15) + 10);
        scheduledData.push(Math.floor(Math.random() * 20) + 15);
    }
    
    // Create chart using Chart.js
    lifecycleChartInstance = new Chart(chartContainer, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Overdue',
                    data: overdueData,
                    backgroundColor: '#e74c3c',
                    borderColor: '#c0392b',
                    borderWidth: 1
                },
                {
                    label: 'Due Soon',
                    data: dueSoonData,
                    backgroundColor: '#f39c12',
                    borderColor: '#d68910',
                    borderWidth: 1
                },
                {
                    label: 'Scheduled',
                    data: scheduledData,
                    backgroundColor: '#3498db',
                    borderColor: '#2980b9',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Devices'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false // Using custom legend
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            }
        }
    });
}

// ===== LIFECYCLE GRID =====
function initializeLifecycleGrid() {
    const gridContainer = document.getElementById('lifecycleGrid');
    if (!gridContainer) return;
    
    // Format data for grid
    const gridData = lifecycleData.map(device => ({
        ...device,
        purchaseDateFormatted: device.purchaseDate.toLocaleDateString(),
        warrantyExpiryFormatted: device.warrantyExpiry.toLocaleDateString(),
        age: calculateDeviceAge(device),
        replacementDate: calculateReplacementDate(device).toLocaleDateString(),
        daysUntilReplacement: calculateDaysUntilReplacement(device),
        statusBadge: getStatusBadgeClass(device.status)
    }));
    
    lifecycleGridInstance = new ej.grids.Grid({
        dataSource: gridData,
        allowPaging: true,
        allowSorting: true,
        allowFiltering: true,
        allowSelection: true,
        pageSettings: { pageSize: 20, pageSizes: [10, 20, 50, 100] },
        filterSettings: { type: 'Excel' },
        selectionSettings: { type: 'Single' },
        columns: [
            { field: 'company', headerText: 'Company', width: 150, textAlign: 'Left' },
            { field: 'deviceType', headerText: 'Type', width: 100, textAlign: 'Left' },
            { field: 'model', headerText: 'Model', width: 150, textAlign: 'Left' },
            { field: 'serialNumber', headerText: 'Serial Number', width: 120, textAlign: 'Left' },
            { field: 'user', headerText: 'Assigned To', width: 120, textAlign: 'Left' },
            { field: 'purchaseDateFormatted', headerText: 'Purchase Date', width: 110, textAlign: 'Center' },
            { field: 'age', headerText: 'Age', width: 80, textAlign: 'Center', template: '<span class="${ageClass}">${age}</span>' },
            { field: 'lifecycleYears', headerText: 'Lifecycle', width: 80, textAlign: 'Center', template: '${lifecycleYears} years' },
            { field: 'replacementDate', headerText: 'Replacement Due', width: 120, textAlign: 'Center' },
            { field: 'daysUntilReplacement', headerText: 'Days Until', width: 90, textAlign: 'Center' },
            { field: 'warrantyExpiryFormatted', headerText: 'Warranty Expiry', width: 120, textAlign: 'Center' },
            { 
                field: 'statusBadge', 
                headerText: 'Status', 
                width: 130, 
                textAlign: 'Center',
                template: '<div class="lifecycle-status-badge ${statusBadge}">${status}</div>'
            },
            { 
                headerText: 'Actions', 
                width: 120, 
                textAlign: 'Center',
                template: '<button class="e-btn e-small e-outline view-device-btn" data-id="${id}">View</button>'
            }
        ],
        created: function() {
            console.log('✅ Lifecycle grid created');
        }
    });
    
    lifecycleGridInstance.appendTo(gridContainer);
    
    // Add event listeners for view buttons
    setTimeout(() => {
        document.querySelectorAll('.view-device-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const deviceId = parseInt(this.getAttribute('data-id'));
                viewDeviceDetails(deviceId);
            });
        });
    }, 500);
}

// ===== HELPER FUNCTIONS =====
function calculateDeviceAge(device) {
    const ageInMonths = Math.floor((new Date() - device.purchaseDate) / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(ageInMonths / 12);
    const months = ageInMonths % 12;
    
    return `${years}y ${months}m`;
}

function calculateReplacementDate(device) {
    const replacementDate = new Date(device.purchaseDate);
    replacementDate.setFullYear(replacementDate.getFullYear() + device.lifecycleYears);
    return replacementDate;
}

function calculateDaysUntilReplacement(device) {
    const replacementDate = calculateReplacementDate(device);
    const daysUntil = Math.floor((replacementDate - new Date()) / (1000 * 60 * 60 * 24));
    
    return daysUntil > 0 ? `${daysUntil} days` : `${Math.abs(daysUntil)} days overdue`;
}

function getStatusBadgeClass(status) {
    const classes = {
        'Overdue': 'status-overdue',
        'Due Soon': 'status-due-soon',
        'Scheduled': 'status-scheduled',
        'Active': 'status-active',
        'Warranty Expired': 'status-warranty-expired'
    };
    
    return classes[status] || '';
}

function viewDeviceDetails(deviceId) {
    const device = lifecycleData.find(d => d.id === deviceId);
    if (!device) return;
    
    const age = calculateDeviceAge(device);
    const replacementDate = calculateReplacementDate(device).toLocaleDateString();
    const daysUntil = calculateDaysUntilReplacement(device);
    
    const details = `
Device Details:

Company: ${device.company}
Type: ${device.deviceType}
Model: ${device.model}
Serial Number: ${device.serialNumber}
Assigned To: ${device.user}

Purchase Date: ${device.purchaseDate.toLocaleDateString()}
Device Age: ${age}
Lifecycle: ${device.lifecycleYears} years
Replacement Due: ${replacementDate}
Days Until Replacement: ${daysUntil}

Warranty Expiry: ${device.warrantyExpiry.toLocaleDateString()}
Status: ${device.status}
    `;
    
    alert(details);
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Add Device Button
    const addBtn = document.getElementById('addDeviceBtn');
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            alert('📝 Add New Device\n\nThis would open a form to add a new device to lifecycle tracking:\n\n• Company selection\n• Device type\n• Model and serial number\n• Purchase date\n• Warranty information\n• Lifecycle duration\n• Assigned user');
        });
    }
    
    // Filter Changes
    const companyFilter = document.getElementById('lifecycleCompanyFilter');
    const deviceTypeFilter = document.getElementById('lifecycleDeviceType');
    const statusFilter = document.getElementById('lifecycleStatus');
    const lifecycleYearsFilter = document.getElementById('lifecycleYears');
    
    if (companyFilter) companyFilter.addEventListener('change', applyFilters);
    if (deviceTypeFilter) deviceTypeFilter.addEventListener('change', applyFilters);
    if (statusFilter) statusFilter.addEventListener('change', applyFilters);
    if (lifecycleYearsFilter) lifecycleYearsFilter.addEventListener('change', applyFilters);
    
    // Clear Filters Button
    const clearBtn = document.getElementById('clearLifecycleFilters');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearFilters);
    }
}

function applyFilters() {
    const companyValue = document.getElementById('lifecycleCompanyFilter').value;
    const typeValue = document.getElementById('lifecycleDeviceType').value;
    const statusValue = document.getElementById('lifecycleStatus').value;
    const yearsValue = document.getElementById('lifecycleYears').value;
    
    let filtered = [...lifecycleData];
    
    if (companyValue) {
        filtered = filtered.filter(d => d.company === companyValue);
    }
    if (typeValue) {
        filtered = filtered.filter(d => d.deviceType === typeValue);
    }
    if (statusValue) {
        filtered = filtered.filter(d => d.status === statusValue);
    }
    if (yearsValue) {
        filtered = filtered.filter(d => d.lifecycleYears === parseInt(yearsValue));
    }
    
    // Update grid
    if (lifecycleGridInstance) {
        const gridData = filtered.map(device => ({
            ...device,
            purchaseDateFormatted: device.purchaseDate.toLocaleDateString(),
            warrantyExpiryFormatted: device.warrantyExpiry.toLocaleDateString(),
            age: calculateDeviceAge(device),
            replacementDate: calculateReplacementDate(device).toLocaleDateString(),
            daysUntilReplacement: calculateDaysUntilReplacement(device),
            statusBadge: getStatusBadgeClass(device.status)
        }));
        lifecycleGridInstance.dataSource = gridData;
    }
    
    console.log('🔍 Filters applied:', { companyValue, typeValue, statusValue, yearsValue });
}

function clearFilters() {
    document.getElementById('lifecycleCompanyFilter').value = '';
    document.getElementById('lifecycleDeviceType').value = '';
    document.getElementById('lifecycleStatus').value = '';
    document.getElementById('lifecycleYears').value = '4';
    applyFilters();
}

// ===== EXPORTS =====
if (typeof window !== 'undefined') {
    window.Lifecycle = {
        initializeLifecyclePage
    };
}




