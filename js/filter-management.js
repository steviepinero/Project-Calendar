// Filter Management Module

// ===== INITIALIZATION =====
function initializeFilterManagementPage() {
    console.log('🔒 Initializing filter management page...');
    
    populateClientFilter();
    setupCategoryFilters();
    setupFilterControls();
    setupFilterActions();
    setupCreateFilterButton();
    
    console.log('✅ Filter management page initialized');
}

// ===== CLIENT FILTER =====
function populateClientFilter() {
    const clientSelect = document.getElementById('filterClientSelect');
    if (!clientSelect) return;
    
    let companies = [];
    if (window.leadsData && window.leadsData.length > 0) {
        companies = [...new Set(window.leadsData.map(lead => lead.Company))].sort();
    } else {
        companies = ['Anderson Cabinet Designs', 'Tech Innovators LLC', 'Green Energy Solutions', 'Harbor Light Financial'];
    }
    
    companies.forEach(company => {
        const option = document.createElement('option');
        option.value = company;
        option.textContent = company;
        clientSelect.appendChild(option);
    });
}

// ===== CATEGORY FILTERS =====
function setupCategoryFilters() {
    const categoryCards = document.querySelectorAll('.filter-category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            categoryCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card
            this.classList.add('active');
            
            // Get selected category
            const category = this.getAttribute('data-category');
            
            // Hide all filter sections
            document.querySelectorAll('.filters-section').forEach(section => {
                section.style.display = 'none';
            });
            
            // Show selected category section
            const selectedSection = document.querySelector(`.filters-section[data-category="${category}"]`);
            if (selectedSection) {
                selectedSection.style.display = 'block';
            }
            
            console.log('📂 Switched to category:', category);
        });
    });
}

// ===== FILTER CONTROLS =====
function setupFilterControls() {
    const clientFilter = document.getElementById('filterClientSelect');
    const statusFilter = document.getElementById('filterStatusSelect');
    const searchInput = document.getElementById('filterSearchInput');
    const clearBtn = document.getElementById('clearFilterSearch');
    
    if (clientFilter) {
        clientFilter.addEventListener('change', applyFilterControls);
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', applyFilterControls);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', applyFilterControls);
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', clearFilterControls);
    }
}

function applyFilterControls() {
    const clientValue = document.getElementById('filterClientSelect').value;
    const statusValue = document.getElementById('filterStatusSelect').value;
    const searchValue = document.getElementById('filterSearchInput').value.toLowerCase();
    
    // Get all visible filter items
    const visibleSection = document.querySelector('.filters-section:not([style*="display: none"])');
    if (!visibleSection) return;
    
    const filterItems = visibleSection.querySelectorAll('.filter-item');
    
    filterItems.forEach(item => {
        let show = true;
        
        // Client filter
        if (clientValue) {
            const itemMeta = item.querySelector('.filter-meta').textContent;
            if (!itemMeta.includes(clientValue)) {
                show = false;
            }
        }
        
        // Status filter
        if (statusValue) {
            const statusBadge = item.querySelector('.status-badge');
            if (statusBadge) {
                const itemStatus = statusBadge.textContent.trim();
                if (itemStatus !== statusValue) {
                    show = false;
                }
            }
        }
        
        // Search filter
        if (searchValue) {
            const itemText = item.textContent.toLowerCase();
            if (!itemText.includes(searchValue)) {
                show = false;
            }
        }
        
        item.style.display = show ? 'flex' : 'none';
    });
    
    console.log('🔍 Filters applied:', { clientValue, statusValue, searchValue });
}

function clearFilterControls() {
    document.getElementById('filterClientSelect').value = '';
    document.getElementById('filterStatusSelect').value = '';
    document.getElementById('filterSearchInput').value = '';
    applyFilterControls();
}

// ===== FILTER ACTIONS =====
function setupFilterActions() {
    // Edit buttons
    document.querySelectorAll('.edit-filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const filterItem = this.closest('.filter-item');
            const filterName = filterItem.querySelector('.filter-name').textContent;
            
            alert(`✏️ Edit Filter: ${filterName}\n\nThis would open a dialog to edit the filter settings:\n\n• Filter name\n• Conditions\n• Actions\n• Target clients\n• Priority\n• Status`);
        });
    });
    
    // Delete buttons
    document.querySelectorAll('.delete-filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const filterItem = this.closest('.filter-item');
            const filterName = filterItem.querySelector('.filter-name').textContent;
            
            if (confirm(`Are you sure you want to delete the filter "${filterName}"?\n\nThis action cannot be undone.`)) {
                filterItem.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    filterItem.remove();
                    console.log('🗑️ Filter deleted:', filterName);
                }, 300);
            }
        });
    });
    
    // Add buttons for each section
    document.querySelectorAll('.section-add-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const filterType = this.getAttribute('data-type');
            openCreateFilterDialog(filterType);
        });
    });
}

// ===== CREATE FILTER =====
function setupCreateFilterButton() {
    const createBtn = document.getElementById('createFilterBtn');
    
    if (createBtn) {
        createBtn.addEventListener('click', function() {
            // Show filter type selection
            const filterType = prompt('Select Filter Type:\n\n1. Email Filter\n2. Spam Filter\n3. Firewall Rule\n4. Content Filter\n\nEnter 1, 2, 3, or 4:', '1');
            
            if (filterType) {
                const types = {
                    '1': 'email',
                    '2': 'spam',
                    '3': 'firewall',
                    '4': 'content'
                };
                
                openCreateFilterDialog(types[filterType] || 'email');
            }
        });
    }
}

function openCreateFilterDialog(filterType) {
    const typeNames = {
        'email': 'Email Filter',
        'spam': 'Spam Filter',
        'firewall': 'Firewall Rule',
        'content': 'Content Filter'
    };
    
    const typeName = typeNames[filterType] || 'Filter';
    
    let dialogContent = `🆕 Create New ${typeName}\n\nThis would open a comprehensive form to create a new filter:\n\n`;
    
    switch(filterType) {
        case 'email':
            dialogContent += `• Filter name
• Conditions (from, to, subject, body)
• Actions (move, flag, categorize, forward)
• Target folder/category
• Priority level
• Apply to specific clients or all`;
            break;
        case 'spam':
            dialogContent += `• Filter name
• Spam detection method (keywords, domains, patterns)
• Action (quarantine, delete, flag)
• Whitelist exceptions
• Sensitivity level
• Apply to specific clients or all`;
            break;
        case 'firewall':
            dialogContent += `• Rule name
• Source IP/Network
• Destination IP/Network
• Protocol (TCP/UDP/ICMP)
• Port(s)
• Action (allow/deny/drop)
• Priority/order
• Logging enabled`;
            break;
        case 'content':
            dialogContent += `• Filter name
• Category/Keywords to block
• Time-based restrictions
• User/group exceptions
• Action (block, warn, log)
• Apply to specific clients or all
• Override password option`;
            break;
    }
    
    alert(dialogContent);
    console.log('➕ Creating new filter:', filterType);
}

// ===== EXPORTS =====
if (typeof window !== 'undefined') {
    window.FilterManagement = {
        initializeFilterManagementPage
    };
}

