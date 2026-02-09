// Reports & Analytics Module

// ===== INITIALIZATION =====
function initializeReportsPage() {
    console.log('📊 Initializing reports page...');
    
    populateClientFilter();
    setupCategoryFilters();
    setupReportButtons();
    setupScheduleButton();
    setupCustomReportButton();
    
    console.log('✅ Reports page initialized');
}

// ===== CLIENT FILTER =====
function populateClientFilter() {
    const clientFilter = document.getElementById('reportClientFilter');
    if (!clientFilter) return;
    
    // Get clients from leadsData if available
    let companies = [];
    if (window.leadsData && window.leadsData.length > 0) {
        companies = [...new Set(window.leadsData.map(lead => lead.Company))].sort();
    } else {
        // Fallback to sample companies
        companies = ['Anderson Cabinet Designs', 'Tech Innovators LLC', 'Green Energy Solutions', 'Harbor Light Financial'];
    }
    
    companies.forEach(company => {
        const option = document.createElement('option');
        option.value = company;
        option.textContent = company;
        clientFilter.appendChild(option);
    });
}

// ===== CATEGORY FILTERS =====
function setupCategoryFilters() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            categoryCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card
            this.classList.add('active');
            
            // Get selected category
            const category = this.getAttribute('data-category');
            
            // Hide all report sections
            document.querySelectorAll('.report-section').forEach(section => {
                section.style.display = 'none';
            });
            
            // Show selected category section
            const selectedSection = document.querySelector(`.report-section[data-category="${category}"]`);
            if (selectedSection) {
                selectedSection.style.display = 'block';
            }
            
            console.log('📂 Switched to category:', category);
        });
    });
}

// ===== REPORT GENERATION =====
function setupReportButtons() {
    const reportButtons = document.querySelectorAll('.generate-report-btn');
    
    reportButtons.forEach(button => {
        button.addEventListener('click', function() {
            const reportType = this.getAttribute('data-report');
            const client = document.getElementById('reportClientFilter').value;
            const dateRange = document.getElementById('reportDateRange').value;
            const format = document.getElementById('reportFormat').value;
            
            generateReport(reportType, client, dateRange, format);
        });
    });
}

function generateReport(reportType, client, dateRange, format) {
    console.log('📊 Generating report:', reportType);
    console.log('Client:', client || 'All Clients');
    console.log('Date Range:', dateRange);
    console.log('Format:', format);
    
    // Show loading state
    const button = document.querySelector(`[data-report="${reportType}"]`);
    const originalText = button.textContent;
    button.textContent = 'Generating...';
    button.disabled = true;
    
    // Simulate report generation
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        
        // Show success message
        const reportName = getReportName(reportType);
        const clientText = client ? `for ${client}` : 'for all clients';
        
        alert(`✓ Report "${reportName}" has been generated successfully ${clientText}!\n\nFormat: ${format.toUpperCase()}\nDate Range: ${getDateRangeText(dateRange)}\n\nThe report would normally be downloaded automatically.`);
        
        console.log('✅ Report generated successfully');
    }, 1500);
}

function getReportName(reportType) {
    const reportNames = {
        'executive-summary': 'Executive Summary',
        'business-performance': 'Business Performance',
        'sla-compliance': 'SLA Compliance',
        'incident-summary': 'Incident Summary',
        'client-satisfaction': 'Client Satisfaction',
        'device-inventory': 'Device Inventory',
        'security-assessment': 'Security Assessment',
        'network-performance': 'Network Performance',
        'backup-recovery': 'Backup & Recovery',
        'system-uptime': 'System Uptime',
        'access-logs': 'Access Logs',
        'software-licensing': 'Software Licensing',
        'web-traffic': 'Web Traffic Analysis',
        'billing-summary': 'Billing Summary',
        'revenue-analysis': 'Revenue Analysis',
        'cost-analysis': 'Cost Analysis',
        'profitability': 'Profitability Report',
        'hipaa': 'HIPAA Compliance',
        'gdpr': 'GDPR Compliance',
        'audit-trail': 'Audit Trail'
    };
    
    return reportNames[reportType] || reportType;
}

function getDateRangeText(dateRange) {
    const ranges = {
        'today': 'Today',
        'week': 'This Week',
        'month': 'This Month',
        'quarter': 'This Quarter',
        'year': 'This Year',
        'custom': 'Custom Range'
    };
    
    return ranges[dateRange] || dateRange;
}

// ===== SCHEDULE REPORT =====
function setupScheduleButton() {
    const scheduleBtn = document.getElementById('scheduleReportBtn');
    
    if (scheduleBtn) {
        scheduleBtn.addEventListener('click', function() {
            alert('📅 Schedule Report Feature\n\nThis would open a dialog to schedule automated report generation and delivery:\n\n• Select report type\n• Choose frequency (daily, weekly, monthly)\n• Set delivery time\n• Add recipients\n• Configure format and filters\n\nScheduled reports would be automatically generated and emailed to recipients.');
        });
    }
}

// ===== CUSTOM REPORTS =====
function setupCustomReportButton() {
    const customBtn = document.getElementById('createCustomReportBtn');
    
    if (customBtn) {
        customBtn.addEventListener('click', function() {
            alert('📝 Create Custom Report\n\nThis would open a report builder interface allowing you to:\n\n• Select data sources\n• Choose metrics and KPIs\n• Apply filters and groupings\n• Design layout and visualizations\n• Save as reusable template\n\nCustom reports can combine data from multiple sources to create tailored insights.');
        });
    }
}

// ===== DATE RANGE HANDLER =====
function setupDateRangeHandler() {
    const dateRangeSelect = document.getElementById('reportDateRange');
    
    if (dateRangeSelect) {
        dateRangeSelect.addEventListener('change', function() {
            if (this.value === 'custom') {
                alert('📅 Custom Date Range\n\nThis would open a date picker to select:\n\n• Start date\n• End date\n\nYou can then generate reports for any specific time period.');
            }
        });
    }
}

// ===== EXPORTS =====
if (typeof window !== 'undefined') {
    window.Reports = {
        initializeReportsPage
    };
}

