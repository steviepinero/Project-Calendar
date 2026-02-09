// Data Points & KPIs Module

// ===== INITIALIZATION =====
function initializeDataPointsPage() {
    console.log('📊 Initializing data points page...');
    
    setupPeriodButtons();
    setupComparisonToggle();
    setupRefreshButton();
    setupExportButton();
    
    console.log('✅ Data points page initialized');
}

// ===== PERIOD SELECTOR =====
function setupPeriodButtons() {
    const periodButtons = document.querySelectorAll('.period-btn');
    
    periodButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            periodButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get selected period
            const period = this.getAttribute('data-period');
            
            console.log('📅 Period changed to:', period);
            
            // Show loading message
            showLoadingMessage('Updating data for ' + getPeriodText(period) + '...');
            
            // Simulate data refresh
            setTimeout(() => {
                hideLoadingMessage();
                // In a real app, this would fetch new data from the API
                console.log('✅ Data refreshed for period:', period);
            }, 800);
        });
    });
}

function getPeriodText(period) {
    const texts = {
        'today': 'Today',
        'week': 'This Week',
        'month': 'This Month',
        'quarter': 'This Quarter',
        'year': 'This Year'
    };
    
    return texts[period] || period;
}

// ===== COMPARISON TOGGLE =====
function setupComparisonToggle() {
    const toggle = document.getElementById('showComparisonToggle');
    
    if (toggle) {
        toggle.addEventListener('change', function() {
            const metricChanges = document.querySelectorAll('.metric-change');
            
            metricChanges.forEach(change => {
                if (this.checked) {
                    change.style.display = 'flex';
                } else {
                    change.style.display = 'none';
                }
            });
            
            console.log('📊 Comparison display:', this.checked ? 'enabled' : 'disabled');
        });
    }
}

// ===== REFRESH BUTTON =====
function setupRefreshButton() {
    const refreshBtn = document.getElementById('refreshDataBtn');
    
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            console.log('🔄 Refreshing all data points...');
            
            // Show loading state
            const originalText = this.textContent;
            this.textContent = '🔄 Refreshing...';
            this.disabled = true;
            
            // Simulate data refresh
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
                
                showTemporaryMessage('✓ All data points have been refreshed successfully!');
                console.log('✅ Data refresh complete');
            }, 1500);
        });
    }
}

// ===== EXPORT BUTTON =====
function setupExportButton() {
    const exportBtn = document.getElementById('exportDataBtn');
    
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            const period = document.querySelector('.period-btn.active')?.getAttribute('data-period') || 'month';
            const showComparison = document.getElementById('showComparisonToggle')?.checked || false;
            
            console.log('📥 Exporting data points...');
            console.log('Period:', period);
            console.log('Include comparison:', showComparison);
            
            // Show export options
            const format = prompt('Export Format:\n\n1. Excel (.xlsx)\n2. CSV (.csv)\n3. PDF Report\n\nEnter 1, 2, or 3:', '1');
            
            if (format) {
                const formatNames = {
                    '1': 'Excel',
                    '2': 'CSV',
                    '3': 'PDF Report'
                };
                
                const formatName = formatNames[format] || 'Excel';
                
                // Simulate export
                showLoadingMessage(`Generating ${formatName} export...`);
                
                setTimeout(() => {
                    hideLoadingMessage();
                    alert(`✓ Data Points exported successfully!\n\nFormat: ${formatName}\nPeriod: ${getPeriodText(period)}\nComparison Included: ${showComparison ? 'Yes' : 'No'}\n\nThe file would normally be downloaded automatically.`);
                    console.log('✅ Export complete');
                }, 1000);
            }
        });
    }
}

// ===== HELPER FUNCTIONS =====
function showLoadingMessage(message) {
    // Create or update loading overlay
    let overlay = document.getElementById('loadingOverlay');
    
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'loadingOverlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        const messageBox = document.createElement('div');
        messageBox.id = 'loadingMessage';
        messageBox.style.cssText = `
            background: white;
            padding: 30px 40px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            font-size: 16px;
            font-weight: 600;
            color: #2c3e50;
        `;
        
        overlay.appendChild(messageBox);
        document.body.appendChild(overlay);
    }
    
    const messageBox = document.getElementById('loadingMessage');
    messageBox.textContent = message;
}

function hideLoadingMessage() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.remove();
    }
}

function showTemporaryMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 25px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}

// ===== METRIC CARD INTERACTIONS =====
function setupMetricCardInteractions() {
    const metricCards = document.querySelectorAll('.metric-card');
    
    metricCards.forEach(card => {
        card.addEventListener('click', function() {
            const label = this.querySelector('.metric-label')?.textContent || 'This metric';
            
            alert(`📊 ${label}\n\nClick here to view:\n\n• Historical trends\n• Detailed breakdown\n• Comparative analysis\n• Custom reports\n\nThis feature would open a detailed analytics view.`);
        });
        
        // Add cursor pointer
        card.style.cursor = 'pointer';
    });
}

// ===== EXPORTS =====
if (typeof window !== 'undefined') {
    window.DataPoints = {
        initializeDataPointsPage
    };
}

