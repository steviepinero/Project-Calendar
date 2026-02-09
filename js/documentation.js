// Documentation & Knowledge Base Module

// ===== INITIALIZATION =====
function initializeDocumentationPage() {
    console.log('📚 Initializing documentation page...');
    
    populateClientFilter();
    setupSearchAndFilters();
    setupFavoriteButtons();
    setupDocumentActions();
    setupCreateDocButton();
    
    console.log('✅ Documentation page initialized');
}

// ===== CLIENT FILTER =====
function populateClientFilter() {
    const clientSelect = document.getElementById('docClientFilter');
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

// ===== SEARCH AND FILTERS =====
function setupSearchAndFilters() {
    const searchInput = document.getElementById('docSearchInput');
    const categoryFilter = document.getElementById('docCategoryFilter');
    const clientFilter = document.getElementById('docClientFilter');
    const clearBtn = document.getElementById('clearDocFilters');
    
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }
    
    if (clientFilter) {
        clientFilter.addEventListener('change', applyFilters);
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', clearFilters);
    }
}

function applyFilters() {
    const searchValue = document.getElementById('docSearchInput').value.toLowerCase();
    const categoryValue = document.getElementById('docCategoryFilter').value;
    const clientValue = document.getElementById('docClientFilter').value;
    
    // Get all doc categories
    const docCategories = document.querySelectorAll('.doc-category');
    
    docCategories.forEach(category => {
        const categoryTitle = category.querySelector('.category-header h3').textContent;
        const docCards = category.querySelectorAll('.doc-card');
        let visibleCount = 0;
        
        docCards.forEach(card => {
            let show = true;
            
            // Search filter
            if (searchValue) {
                const cardText = card.textContent.toLowerCase();
                if (!cardText.includes(searchValue)) {
                    show = false;
                }
            }
            
            // Category filter
            if (categoryValue) {
                const cardCategory = card.getAttribute('data-category');
                if (cardCategory !== categoryValue) {
                    show = false;
                }
            }
            
            // Client filter (search in meta tags)
            if (clientValue) {
                const cardText = card.textContent;
                if (!cardText.includes(clientValue)) {
                    show = false;
                }
            }
            
            card.style.display = show ? 'flex' : 'none';
            if (show) visibleCount++;
        });
        
        // Hide category if no visible cards
        category.style.display = visibleCount > 0 ? 'block' : 'none';
    });
    
    console.log('🔍 Filters applied:', { searchValue, categoryValue, clientValue });
}

function clearFilters() {
    document.getElementById('docSearchInput').value = '';
    document.getElementById('docCategoryFilter').value = '';
    document.getElementById('docClientFilter').value = '';
    applyFilters();
}

// ===== FAVORITE BUTTONS =====
function setupFavoriteButtons() {
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    
    favoriteButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            
            const docCard = this.closest('.doc-card');
            const docTitle = docCard.querySelector('.doc-title').textContent;
            
            if (this.classList.contains('active')) {
                console.log('⭐ Added to favorites:', docTitle);
            } else {
                console.log('☆ Removed from favorites:', docTitle);
            }
        });
    });
}

// ===== DOCUMENT ACTIONS =====
function setupDocumentActions() {
    // View buttons
    document.querySelectorAll('.view-doc-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const docCard = this.closest('.doc-card');
            const docTitle = docCard.querySelector('.doc-title').textContent;
            const docDescription = docCard.querySelector('.doc-description').textContent;
            
            viewDocument(docTitle, docDescription);
        });
    });
    
    // Edit buttons
    document.querySelectorAll('.edit-doc-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const docCard = this.closest('.doc-card');
            const docTitle = docCard.querySelector('.doc-title').textContent;
            
            editDocument(docTitle);
        });
    });
}

function viewDocument(title, description) {
    alert(`📄 Viewing Document: ${title}\n\n${description}\n\nThis would open the full document in a viewer with:\n\n• Complete content\n• Version history\n• Comments and annotations\n• Print and export options\n• Related documents`);
    
    console.log('👁️ Viewing document:', title);
}

function editDocument(title) {
    alert(`✏️ Editing Document: ${title}\n\nThis would open the document editor with:\n\n• Rich text editing\n• Image and file attachments\n• Collaborative editing\n• Version control\n• Auto-save\n• Formatting tools`);
    
    console.log('✏️ Editing document:', title);
}

// ===== CREATE DOCUMENT =====
function setupCreateDocButton() {
    const createBtn = document.getElementById('createDocBtn');
    
    if (createBtn) {
        createBtn.addEventListener('click', function() {
            // Show category selection
            const category = prompt('Select Document Category:\n\n1. Procedures\n2. Troubleshooting\n3. Setup Guides\n4. Client Documentation\n5. Policies\n6. Training Materials\n\nEnter 1-6:', '1');
            
            if (category) {
                const categories = {
                    '1': 'Procedures',
                    '2': 'Troubleshooting',
                    '3': 'Setup Guides',
                    '4': 'Client Documentation',
                    '5': 'Policies',
                    '6': 'Training Materials'
                };
                
                openCreateDocumentDialog(categories[category] || 'Procedures');
            }
        });
    }
}

function openCreateDocumentDialog(category) {
    alert(`📝 Create New ${category} Document\n\nThis would open a form to create a new document:\n\n• Document title\n• Category: ${category}\n• Description\n• Tags\n• Client assignment (optional)\n• Visibility (public/private)\n• Template selection\n\nAfter creation, you would be taken to the editor to add content.`);
    
    console.log('➕ Creating new document in category:', category);
}

// ===== EXPORTS =====
if (typeof window !== 'undefined') {
    window.Documentation = {
        initializeDocumentationPage
    };
}

