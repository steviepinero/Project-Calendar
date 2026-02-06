/**
 * Client Profile Page JavaScript
 * Handles client selection, tab navigation, and interactions
 */

(function() {
    'use strict';

    let currentClient = null;

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initClientProfile);
    } else {
        initClientProfile();
    }

    function initClientProfile() {
        // Set up event listeners (but don't populate yet - wait for page to be active)
        
        // Client selector functionality
        const clientSelector = document.getElementById('clientSelector');
        const clientProfileContent = document.getElementById('clientProfileContent');
        const clientEmptyState = document.getElementById('clientEmptyState');

        if (clientSelector) {
            // Try to populate on focus if empty
            clientSelector.addEventListener('focus', function() {
                if (this.options.length <= 1) {
                    console.log('📋 Client selector is empty on focus, attempting to populate...');
                    populateClientSelector();
                }
            });
            
            clientSelector.addEventListener('change', function() {
                console.log('Client selector changed:', this.value);
                if (this.value) {
                    // Find the selected client from leads data
                    const leadsData = window.leadsData || [];
                    currentClient = leadsData.find(lead => lead.Company === this.value);
                    
                    // Show client profile content
                    if (clientProfileContent) {
                        clientProfileContent.style.display = 'block';
                        console.log('Showing client profile content');
                    }
                    if (clientEmptyState) {
                        clientEmptyState.style.display = 'none';
                    }
                    
                    // Load client data
                    if (currentClient) {
                        loadClientData(currentClient);
                    }
                } else {
                    // Show empty state
                    if (clientProfileContent) clientProfileContent.style.display = 'none';
                    if (clientEmptyState) clientEmptyState.style.display = 'block';
                }
            });
        }

        // Client tab navigation
        const clientTabs = document.querySelectorAll('.client-tab');
        clientTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                switchClientTab(targetTab);
            });
        });

        // Add Client button handlers
        const addClientBtn = document.getElementById('addClientBtn');
        const addClientEmptyBtn = document.getElementById('addClientEmptyBtn');
        
        if (addClientBtn) {
            addClientBtn.addEventListener('click', showAddClientModal);
        }
        
        if (addClientEmptyBtn) {
            addClientEmptyBtn.addEventListener('click', showAddClientModal);
        }

        // Edit Client button
        const editClientBtn = document.getElementById('editClientBtn');
        if (editClientBtn) {
            editClientBtn.addEventListener('click', showEditClientModal);
        }

        // Add Contact button
        const addContactBtn = document.getElementById('addContactBtn');
        if (addContactBtn) {
            addContactBtn.addEventListener('click', showAddContactModal);
        }

        // Add Service button
        const addServiceBtn = document.getElementById('addServiceBtn');
        if (addServiceBtn) {
            addServiceBtn.addEventListener('click', showAddServiceModal);
        }

        // Upload Document button
        const uploadDocBtn = document.getElementById('uploadDocBtn');
        if (uploadDocBtn) {
            uploadDocBtn.addEventListener('click', showUploadDocumentModal);
        }

        // Add Note button
        const addNoteBtn = document.getElementById('addNoteBtn');
        if (addNoteBtn) {
            addNoteBtn.addEventListener('click', showAddNoteModal);
        }

        // Email and Call buttons in contacts
        setupContactButtons();
    }

    function switchClientTab(targetTab) {
        // Update tab buttons
        const clientTabs = document.querySelectorAll('.client-tab');
        clientTabs.forEach(tab => {
            const isActive = tab.getAttribute('data-tab') === targetTab;
            if (isActive) {
                tab.style.color = '#2c3e50';
                tab.style.borderBottom = '3px solid #3498db';
                tab.classList.add('active');
            } else {
                tab.style.color = '#555';
                tab.style.borderBottom = 'none';
                tab.classList.remove('active');
            }
        });

        // Update tab content
        const tabContents = document.querySelectorAll('.client-tab-content');
        tabContents.forEach(content => {
            if (content.id === `client-tab-${targetTab}`) {
                content.style.display = 'block';
            } else {
                content.style.display = 'none';
            }
        });
    }

    function populateClientSelector() {
        console.log('📋 populateClientSelector called');
        
        const clientSelector = document.getElementById('clientSelector');
        if (!clientSelector) {
            console.error('❌ clientSelector element not found');
            return;
        }
        
        console.log('✅ clientSelector element found');
        
        // Get leads data from window (set by leads.js)
        const leadsData = window.leadsData || [];
        
        console.log('📊 leadsData check:', {
            exists: !!window.leadsData,
            length: leadsData.length,
            sample: leadsData.length > 0 ? leadsData[0].Company : 'none'
        });
        
        if (leadsData.length === 0) {
            console.error('❌ No leads data available for client selector');
            console.log('💡 Tip: Make sure leads.js has loaded and exported window.leadsData');
            return;
        }
        
        // Clear ALL existing options (including placeholder)
        const initialOptionCount = clientSelector.options.length;
        clientSelector.innerHTML = '';
        console.log(`🗑️ Cleared ALL ${initialOptionCount} existing options`);
        
        // Re-add the placeholder
        const placeholderOption = document.createElement('option');
        placeholderOption.value = '';
        placeholderOption.textContent = 'Select a client...';
        clientSelector.appendChild(placeholderOption);
        console.log('✅ Re-added placeholder option');
        
        // Add each company as an option (sorted alphabetically)
        const sortedLeads = [...leadsData].sort((a, b) => a.Company.localeCompare(b.Company));
        sortedLeads.forEach((lead, index) => {
            const option = document.createElement('option');
            option.value = lead.Company;
            option.textContent = lead.Company;
            clientSelector.appendChild(option);
            if (index < 3) {
                console.log(`  ✓ Added: ${lead.Company}`);
            }
        });
        
        console.log(`✅ Client selector populated with ${leadsData.length} clients`);
        console.log(`📝 Total options now: ${clientSelector.options.length}`);
        
        // Force a visual refresh by toggling a property
        clientSelector.style.display = 'none';
        clientSelector.offsetHeight; // Force reflow
        clientSelector.style.display = '';
        
        // Log the actual HTML to verify
        console.log('📋 First 5 options HTML:', clientSelector.innerHTML.substring(0, 300));
        
        // Verify the options are actually there
        console.log('🔍 Option verification:');
        for (let i = 0; i < Math.min(5, clientSelector.options.length); i++) {
            console.log(`  [${i}]: ${clientSelector.options[i].value} - ${clientSelector.options[i].text}`);
        }
        
        // Try to programmatically select an option to test
        if (clientSelector.options.length > 1) {
            console.log('🧪 Test: Try selecting the second option programmatically');
            // Don't actually select it, just log what would happen
            console.log('   Would select:', clientSelector.options[1].value);
        }
        
        // Check if there's a parent element that might be hiding things
        console.log('👨‍👩‍👧 Parent element:', clientSelector.parentElement?.tagName, clientSelector.parentElement?.style.display);
    }

    function loadClientData(client) {
        console.log('Loading client data for:', client.Company);
        
        // Update company name in the overview tab
        const companyNameElement = document.querySelector('#client-tab-overview [style*="font-weight: 600"]');
        if (companyNameElement) {
            companyNameElement.textContent = client.Company;
        }
        
        // Update stats cards
        updateStatsCards(client);
        
        // Update company information section
        updateCompanyInfo(client);
        
        // Update account details
        updateAccountDetails(client);
    }
    
    function updateStatsCards(client) {
        // In production, these would come from actual data
        // For now, using placeholder values
        console.log('Updating stats for:', client.Company);
    }
    
    function updateCompanyInfo(client) {
        // Update company information fields
        const infoSection = document.querySelector('#client-tab-overview h3');
        if (infoSection) {
            const fields = infoSection.parentElement.querySelectorAll('[style*="font-size: 14px"]');
            if (fields.length >= 6) {
                fields[0].textContent = client.Company;
                fields[1].textContent = client.Industry || 'Technology Services';
                fields[2].textContent = '25-50 employees';
                fields[3].textContent = 'www.' + client.Company.toLowerCase().replace(/\s+/g, '') + '.com';
                fields[4].innerHTML = `${client.City || 'Unknown'}, FL`;
                fields[5].textContent = '(555) 123-4567';
            }
        }
    }
    
    function updateAccountDetails(client) {
        // Update account details
        const accountSection = document.querySelectorAll('#client-tab-overview h3')[1];
        if (accountSection) {
            const fields = accountSection.parentElement.querySelectorAll('[style*="font-size: 14px"]');
            if (fields.length >= 6) {
                fields[1].textContent = client.Rep || 'Unassigned';
                fields[5].textContent = 'ACH - Auto-pay (15th of month)';
            }
        }
    }

    function showAddClientModal() {
        alert('Add Client functionality would open a modal form here.\n\nFields would include:\n- Company Name\n- Industry\n- Address\n- Primary Contact\n- Phone\n- Email\n- Service Level\n- Billing Information');
    }

    function showEditClientModal() {
        const clientSelector = document.getElementById('clientSelector');
        if (!clientSelector || !clientSelector.value) {
            alert('Please select a client first.');
            return;
        }
        
        alert('Edit Client functionality would open a modal with pre-filled client data.\n\nYou could modify company information, contacts, and settings.');
    }

    function showAddContactModal() {
        alert('Add Contact functionality would open a modal form here.\n\nFields would include:\n- Name\n- Title\n- Email\n- Phone\n- Department\n- Role (Primary, Billing, Technical, etc.)');
    }

    function showAddServiceModal() {
        alert('Add Service functionality would open a modal form here.\n\nFields would include:\n- Service Name\n- Description\n- Monthly Cost\n- Start Date\n- Renewal Period\n- Status');
    }

    function showUploadDocumentModal() {
        alert('Upload Document functionality would open a file picker.\n\nYou could upload:\n- Contracts\n- SLAs\n- Network Diagrams\n- Proposals\n- Reports\n- Other documents');
    }

    function showAddNoteModal() {
        alert('Add Note functionality would open a modal form here.\n\nFields would include:\n- Note Title\n- Note Content\n- Category\n- Tags');
    }

    function setupContactButtons() {
        // Email buttons
        document.querySelectorAll('#contactsGrid .e-btn').forEach(btn => {
            if (btn.textContent.includes('Email')) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const card = this.closest('[style*="padding: 15px"]');
                    if (card) {
                        const emailText = card.textContent;
                        const emailMatch = emailText.match(/[\w.-]+@[\w.-]+\.\w+/);
                        if (emailMatch) {
                            window.location.href = `mailto:${emailMatch[0]}`;
                        }
                    }
                });
            }
            
            // Call buttons
            if (btn.textContent.includes('Call')) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const card = this.closest('[style*="padding: 15px"]');
                    if (card) {
                        const phoneText = card.textContent;
                        const phoneMatch = phoneText.match(/\(\d{3}\)\s*\d{3}-\d{4}/);
                        if (phoneMatch) {
                            // Open VoIP calling page with this number
                            alert(`Would dial: ${phoneMatch[0]}\n\n(In production, this would open the VoIP Calling page with this number pre-filled)`);
                        }
                    }
                });
            }
        });
    }
    
    // Export initialization function for use by app-main.js
    if (typeof window !== 'undefined') {
        window.initClientProfilePage = function() {
            console.log('👤 Client Profile page initialization triggered');
            
            // Check if the page is visible
            const profilePage = document.getElementById('page-client-profile');
            if (profilePage) {
                console.log('📄 Client profile page element found, display:', window.getComputedStyle(profilePage).display);
                console.log('📄 Has active class:', profilePage.classList.contains('active'));
            } else {
                console.error('❌ page-client-profile element not found!');
            }
            
            console.log('📊 Checking for leads data...', window.leadsData ? `Found ${window.leadsData.length} leads` : 'Not found');
            
            // Try to populate the client selector immediately
            populateClientSelector();
            
            // If that failed, try again after a short delay
            if (!window.leadsData || window.leadsData.length === 0) {
                console.log('⏳ Leads data not available yet, retrying in 200ms...');
                setTimeout(() => {
                    console.log('🔄 Retry: Checking for leads data...', window.leadsData ? `Found ${window.leadsData.length} leads` : 'Still not found');
                    populateClientSelector();
                }, 200);
            }
        };
    }

})();

