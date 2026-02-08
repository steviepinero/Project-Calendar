/**
 * LEADS/CRM PAGE MODULE
 * Handles lead management with list view and detail view
 */

// Sample lead data matching the mockup
const leadsData = [
    { Company: 'Anderson Cabinet Designs', Industry: 'Healthcare', City: 'Sarasota', Source: 'Cold Call', Solutions: '#VALUE!', Amount: '$12,000', Rep: 'Jack Stone', Status: 'hot', LastTouch: '', Touches: 5, FollowUp: '1/12/2026', NextStep: 'call' },
    { Company: 'Aerowisp Technologies', Industry: 'Healthcare', City: 'Tampa', Source: 'Referal', Solutions: 'ALL', Amount: '$6,500', Rep: 'Gary Grumbles', Status: 'cold', LastTouch: '', Touches: 5, FollowUp: '1/1/2026', NextStep: '' },
    { Company: 'Blue Heron Capital', Industry: 'Healthcare', City: 'Bradenton', Source: 'Cold Call', Solutions: '#VALUE!', Amount: '$3,500', Rep: 'Bobby Finkelstein', Status: '', LastTouch: '', Touches: 8, FollowUp: '12/22/2025', NextStep: '' },
    { Company: 'CipherGuard Security', Industry: 'Finance', City: 'Bradenton', Source: 'Networking', Solutions: '#VALUE!', Amount: '$6,000', Rep: 'Bobby Finkelstein', Status: '', LastTouch: '', Touches: 3, FollowUp: '12/14/2025', NextStep: '' },
    { Company: 'Cobalt Creative', Industry: 'Technology', City: 'Sarasota', Source: 'Direct Mail', Solutions: 'ALUE!', Amount: '$8,500', Rep: 'Nina Novak', Status: '', LastTouch: '', Touches: 6, FollowUp: '1/3/2026', NextStep: '' },
    { Company: 'EchoValley Logistics', Industry: 'Finance', City: 'Clearwater', Source: 'Trade Show', Solutions: 'ALUE!', Amount: '$7,250', Rep: 'Gary Grumbles', Status: '', LastTouch: '', Touches: 9, FollowUp: '1/6/2026', NextStep: '' },
    { Company: 'Flux Innovation', Industry: 'Manufacturing', City: 'Sarasota', Source: 'Seminare', Solutions: 'ALL', Amount: '$3,500', Rep: 'Nina Novak', Status: '', LastTouch: '', Touches: 5, FollowUp: '12/20/2025', NextStep: '' },
    { Company: 'Golden Hour Bakery', Industry: 'Technology', City: 'Clearwater', Source: 'Web Site', Solutions: '#VALUE!', Amount: '$1,500', Rep: 'Chip McFlair', Status: '', LastTouch: '', Touches: 6, FollowUp: '1/25/2025', NextStep: '' },
    { Company: 'Harbor Light Financial', Industry: 'Finance', City: 'Naples', Source: 'Email Campaign', Solutions: '#VALUE!', Amount: '$1,800', Rep: 'Bobby Finkelstein', Status: '', LastTouch: '', Touches: 4, FollowUp: '11/18/2025', NextStep: '' },
    { Company: 'Ironwood Construction', Industry: 'Retail', City: 'Naples', Source: 'Direct Mail', Solutions: 'ALUE!', Amount: '$9,800', Rep: 'Bobby Finkelstein', Status: '', LastTouch: '', Touches: 8, FollowUp: '1/5/2025', NextStep: '' },
    { Company: 'LumenCore Energy', Industry: 'Retail', City: 'Pensacola', Source: 'Web Site', Solutions: '#VALUE!', Amount: '$6,200', Rep: 'Nina Novak', Status: '', LastTouch: '', Touches: 9, FollowUp: '12/2/2025', NextStep: '' },
    { Company: 'Mosaic Marketing', Industry: 'Retail', City: 'Pensacola', Source: 'Web Site', Solutions: '#VALUE!', Amount: '$3,200', Rep: 'Gary Grumbles', Status: '', LastTouch: '', Touches: 6, FollowUp: '1/5/2026', NextStep: '' },
    { Company: 'North Star Provisions', Industry: 'Retail', City: 'Fort Myers', Source: 'Seminare', Solutions: '#VALUE!', Amount: '$700', Rep: 'Chip McFlair', Status: '', LastTouch: '', Touches: 5, FollowUp: '1/10/2026', NextStep: '' },
    { Company: 'Novuri Systems', Industry: 'Manufacturing', City: 'Bradenton', Source: 'Cold Call', Solutions: 'ALUE!', Amount: '$7,800', Rep: 'Chip McFlair', Status: '', LastTouch: '', Touches: 6, FollowUp: '12/10/2025', NextStep: '' },
    { Company: 'Oak & Anvil', Industry: 'Finance', City: 'Venice', Source: 'Referal', Solutions: 'ALL', Amount: '$16,000', Rep: 'Nina Novak', Status: '', LastTouch: '', Touches: 3, FollowUp: '1/8/2026', NextStep: '' },
    { Company: 'Paper Boat Publishing', Industry: 'Real Estate', City: 'Fort Myers', Source: 'Cold Call', Solutions: 'ALL', Amount: '$4,250', Rep: 'Gary Grumbles', Status: '', LastTouch: '', Touches: 2, FollowUp: '1/18/2026', NextStep: '' },
    { Company: 'Prismatix Labs', Industry: 'Construction', City: 'Tampa', Source: 'Seminare', Solutions: '#VALUE!', Amount: '$8,700', Rep: 'Bobby Finkelstein', Status: '', LastTouch: '', Touches: 9, FollowUp: '12/18/2025', NextStep: '' },
    { Company: 'Quasar Gaming', Industry: 'Healthcare', City: 'Clearwater', Source: 'Seminare', Solutions: '#VALUE!', Amount: '$6,500', Rep: 'Gary Grumbles', Status: '', LastTouch: '', Touches: 6, FollowUp: '12/25/2025', NextStep: '' },
    { Company: 'Red Rock Ventures', Industry: 'Healthcare', City: 'Clearwater', Source: 'Seminare', Solutions: '#VALUE!', Amount: '$6,500', Rep: 'Gary Grumbles', Status: '', LastTouch: '', Touches: 6, FollowUp: '12/25/2025', NextStep: '' },
    { Company: 'Rolling Rock Venture', Industry: 'Construction', City: 'Tampa', Source: 'Referal', Solutions: 'ALUE!', Amount: '$1,800', Rep: 'Chip McFlair', Status: '', LastTouch: '', Touches: 8, FollowUp: '1/1/8/2025', NextStep: '' },
    { Company: 'Silverline Transport', Industry: 'Manufacturing', City: 'Tampa', Source: 'Referal', Solutions: '#VALUE!', Amount: '$23,000', Rep: 'Nina Novak', Status: '', LastTouch: '', Touches: 5, FollowUp: '11/29/2025', NextStep: '' },
    { Company: 'Solstice Wellness', Industry: 'Retail', City: 'Sarasota', Source: 'Cold Call', Solutions: 'ALL', Amount: '$14,000', Rep: 'Nina Novak', Status: '', LastTouch: '', Touches: 7, FollowUp: '12/29/2025', NextStep: '' },
    { Company: 'Stratum Dynamics', Industry: 'Retail', City: 'Sarasota', Source: 'Cold Call', Solutions: 'ALUE!', Amount: '$8,600', Rep: 'Bobby Finkelstein', Status: '', LastTouch: '', Touches: 6, FollowUp: '1/28/2025', NextStep: '' },
    { Company: 'Summit Peak Solutions', Industry: 'Construction', City: 'Clearwater', Source: 'Email Campaign', Solutions: '#VALUE!', Amount: '$1,300', Rep: 'Chip McFlair', Status: '', LastTouch: '', Touches: 3, FollowUp: '1/19/2026', NextStep: '' },
    { Company: 'The Gilded Compass', Industry: 'Construction', City: 'Tampa', Source: 'Direct Mail', Solutions: '#VALUE!', Amount: '$5,200', Rep: 'Chip McFlair', Status: '', LastTouch: '', Touches: 7, FollowUp: '1/3/2026', NextStep: '' },
    { Company: 'Urban Drift Apparel', Industry: 'Technology', City: 'Tampa', Source: 'Direct Mail', Solutions: 'ALL', Amount: '$4,300', Rep: 'Gary Grumbles', Status: '', LastTouch: '', Touches: 9, FollowUp: '12/16/2025', NextStep: '' },
    { Company: 'Velvet & Vine', Industry: 'Communications', City: 'Tampa', Source: 'Trade Show', Solutions: 'ALL', Amount: '$9,800', Rep: 'Nina Novak', Status: '', LastTouch: '', Touches: 4, FollowUp: '12/11/2025', NextStep: '' },
    { Company: 'Zenthos Analytics', Industry: 'Retail', City: 'Sarasota', Source: 'Cold Call', Solutions: 'ALUE!', Amount: '$6,400', Rep: 'Nina Novak', Status: '', LastTouch: '', Touches: 4, FollowUp: '10/5/2025', NextStep: '' }
];

let leadsGridInstance = null;
let currentLeadIndex = null;
let touchesGridInstance = null;
let leadDetailTabsInstance = null; // Store the tabs instance
let isDeepLinking = false; // Flag to prevent double initialization during deep linking

// Sample touch history data for each company
const touchHistoryData = {
    'Blue Heron Capital': [
        { Initiator: 'SCunningham', Contact: 'Dana Belew', Date: '1/12/2026', Time: '12:15 PM', Channel: 'email', Summary: 'Initial outreach regarding MSP services' },
        { Initiator: 'SCunningham', Contact: 'Dana Belew', Date: '1/10/2026', Time: '2:30 PM', Channel: 'phone', Summary: 'Follow-up call, left voicemail' },
        { Initiator: 'JStone', Contact: 'Dana Belew', Date: '1/8/2026', Time: '10:00 AM', Channel: 'website', Summary: 'Website inquiry form submitted' },
        { Initiator: 'SCunningham', Contact: 'Dana Belew', Date: '1/5/2026', Time: '3:45 PM', Channel: 'social media', Summary: 'LinkedIn connection request accepted' },
        { Initiator: 'JStone', Contact: 'Mike Johnson', Date: '12/28/2025', Time: '11:20 AM', Channel: 'drop in', Summary: 'In-person visit to office' },
        { Initiator: 'SCunningham', Contact: 'Dana Belew', Date: '12/20/2025', Time: '9:00 AM', Channel: 'cold call', Summary: 'Initial cold call introduction' },
        { Initiator: 'JStone', Contact: 'Dana Belew', Date: '12/15/2025', Time: '4:15 PM', Channel: 'email', Summary: 'Sent proposal document' },
        { Initiator: 'SCunningham', Contact: 'Mike Johnson', Date: '12/10/2025', Time: '1:30 PM', Channel: 'phone', Summary: 'Discussed security requirements' }
    ],
    'Anderson Cabinet Designs': [
        { Initiator: 'JStone', Contact: 'Sarah Anderson', Date: '1/11/2026', Time: '9:30 AM', Channel: 'email', Summary: 'Sent pricing information' },
        { Initiator: 'JStone', Contact: 'Sarah Anderson', Date: '1/8/2026', Time: '2:00 PM', Channel: 'phone', Summary: 'Discovery call completed' },
        { Initiator: 'JStone', Contact: 'Tom Wilson', Date: '1/5/2026', Time: '10:30 AM', Channel: 'cold call', Summary: 'Initial contact established' },
        { Initiator: 'JStone', Contact: 'Sarah Anderson', Date: '1/3/2026', Time: '3:15 PM', Channel: 'email', Summary: 'Follow-up on quote request' },
        { Initiator: 'JStone', Contact: 'Sarah Anderson', Date: '12/30/2025', Time: '11:00 AM', Channel: 'phone', Summary: 'Scheduled demo meeting' }
    ],
    'Aerowisp Technologies': [
        { Initiator: 'GGrumbles', Contact: 'Alex Martinez', Date: '1/10/2026', Time: '1:45 PM', Channel: 'email', Summary: 'Proposal sent for cloud migration' },
        { Initiator: 'GGrumbles', Contact: 'Alex Martinez', Date: '1/7/2026', Time: '10:15 AM', Channel: 'phone', Summary: 'Technical consultation call' },
        { Initiator: 'GGrumbles', Contact: 'Jennifer Lee', Date: '1/4/2026', Time: '3:00 PM', Channel: 'website', Summary: 'Demo request received' },
        { Initiator: 'GGrumbles', Contact: 'Alex Martinez', Date: '12/29/2025', Time: '2:30 PM', Channel: 'email', Summary: 'Referral introduction from Oak & Anvil' },
        { Initiator: 'GGrumbles', Contact: 'Alex Martinez', Date: '12/22/2025', Time: '9:45 AM', Channel: 'phone', Summary: 'Initial needs assessment' }
    ]
};

// Generate default touches for companies without specific history
function getDefaultTouches(companyName, touchCount) {
    const channels = ['email', 'phone', 'website', 'social media', 'drop in', 'cold call'];
    const initiators = ['SCunningham', 'JStone', 'GGrumbles', 'BFinkelstein', 'NNovak', 'CMcFlair'];
    const contacts = ['Contact Person', 'Decision Maker', 'Receptionist'];
    const summaries = [
        'Initial outreach call',
        'Follow-up email sent',
        'Product demo scheduled',
        'Pricing information provided',
        'Technical discussion',
        'Meeting scheduled'
    ];
    
    const touches = [];
    for (let i = 0; i < touchCount; i++) {
        const date = new Date(2026, 0, 15 - i); // Count backwards from Jan 15, 2026
        touches.push({
            Initiator: initiators[Math.floor(Math.random() * initiators.length)],
            Contact: contacts[Math.floor(Math.random() * contacts.length)],
            Date: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
            Time: `${Math.floor(Math.random() * 12) + 1}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
            Channel: channels[Math.floor(Math.random() * channels.length)],
            Summary: summaries[Math.floor(Math.random() * summaries.length)]
        });
    }
    return touches;
}

/**
 * Initialize the Leads page
 */
function initializeLeadsPage() {
    console.log('🎯 Initializing Leads page...');
    
    // Check if we're on the leads page
    const leadsPage = document.getElementById('page-leads');
    if (!leadsPage || !leadsPage.classList.contains('active')) {
        return;
    }
    
    // Check if already initialized - if tabs exist, don't re-initialize
    if (leadDetailTabsInstance !== null) {
        console.log('⚠️ Leads page already initialized, skipping re-initialization');
        return;
    }
    
    // Initialize the grid if Syncfusion is available
    if (typeof window.ej !== 'undefined' && typeof window.ej.grids !== 'undefined') {
        initializeLeadsGrid();
    } else {
        console.warn('⚠️ Syncfusion not available for Leads Grid');
    }
    
    // Set up event listeners
    setupLeadsEventListeners();
}

/**
 * Get responsive column widths based on screen size
 */
function getResponsiveColumns() {
    const screenWidth = window.innerWidth;
    
    // Phone: < 768px - Show minimal columns
    if (screenWidth < 768) {
        return [
            { 
                field: 'Company', 
                headerText: 'Company', 
                width: 150,
                template: '<span class="company-name-cell">${Company}</span>'
            },
            { field: 'Status', headerText: 'Status', width: 70 },
            { field: 'Amount', headerText: 'Amount', width: 90, textAlign: 'Right' },
            { field: 'FollowUp', headerText: 'Follow Up', width: 100 }
        ];
    }
    
    // Tablet: 768px - 1024px - Show important columns
    if (screenWidth < 1024) {
        return [
            { 
                field: 'Company', 
                headerText: 'Company', 
                width: 140,
                template: '<span class="company-name-cell">${Company}</span>'
            },
            { field: 'Industry', headerText: 'Industry', width: 100 },
            { field: 'City', headerText: 'City', width: 90 },
            { field: 'Amount', headerText: 'Amount', width: 85, textAlign: 'Right' },
            { field: 'Rep', headerText: 'Rep', width: 110 },
            { field: 'Status', headerText: 'Status', width: 70 },
            { field: 'Touches', headerText: "# Touch's", width: 70, textAlign: 'Right' },
            { field: 'FollowUp', headerText: 'Follow Up', width: 100 }
        ];
    }
    
    // Small desktop: 1024px - 1366px
    if (screenWidth < 1366) {
        return [
            { 
                field: 'Company', 
                headerText: 'Company', 
                width: 150,
                template: '<span class="company-name-cell">${Company}</span>'
            },
            { field: 'Industry', headerText: 'Industry', width: 100 },
            { field: 'City', headerText: 'City', width: 100 },
            { field: 'Source', headerText: 'Source', width: 100 },
            { field: 'Solutions', headerText: 'Solutions', width: 90 },
            { field: 'Amount', headerText: 'Amount', width: 90, textAlign: 'Right' },
            { field: 'Rep', headerText: 'Rep', width: 120 },
            { field: 'Status', headerText: 'Status', width: 70 },
            { field: 'Touches', headerText: "# Touch's", width: 80, textAlign: 'Right' },
            { field: 'FollowUp', headerText: 'Follow Up', width: 100 }
        ];
    }
    
    // Full desktop: >= 1366px - Show all columns
    return [
        { 
            field: 'Company', 
            headerText: 'Company', 
            width: 180,
            template: '<span class="company-name-cell">${Company}</span>'
        },
        { field: 'Industry', headerText: 'Industry', width: 120 },
        { field: 'City', headerText: 'City', width: 120 },
        { field: 'Source', headerText: 'Source', width: 130 },
        { field: 'Solutions', headerText: 'Solutions', width: 100 },
        { field: 'Amount', headerText: 'Amount', width: 100, textAlign: 'Right' },
        { field: 'Rep', headerText: 'Rep', width: 150 },
        { field: 'Status', headerText: 'Status', width: 80 },
        { field: 'LastTouch', headerText: 'Last Touch', width: 120 },
        { field: 'Touches', headerText: "# Touch's", width: 90, textAlign: 'Right' },
        { field: 'FollowUp', headerText: 'Follow Up', width: 120 },
        { field: 'NextStep', headerText: 'Next Step', width: 100 }
    ];
}

/**
 * Initialize Syncfusion Grid for leads
 */
function initializeLeadsGrid() {
    const gridContainer = document.getElementById('leadsGrid');
    if (!gridContainer) {
        console.warn('⚠️ leadsGrid container not found');
        return;
    }
    
    try {
        // Destroy existing grid if it exists
        if (leadsGridInstance) {
            leadsGridInstance.destroy();
        }
        
        leadsGridInstance = new ej.grids.Grid({
            dataSource: leadsData,
            allowSorting: true,
            allowFiltering: true,
            allowPaging: true,
            allowResizing: true,
            pageSettings: { pageSize: 25 },
            filterSettings: { type: 'Excel' },
            columns: getResponsiveColumns(),
            height: '100%',
            rowHeight: 40
        });
        
        leadsGridInstance.appendTo('#leadsGrid');
        
        // Add click event for company names
        setTimeout(() => {
            const companyNameCells = document.querySelectorAll('.company-name-cell');
            companyNameCells.forEach((cell, index) => {
                cell.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const companyName = cell.textContent;
                    showLeadDetail(companyName, index);
                });
            });
        }, 500);
        
        console.log('✅ Leads Grid initialized');
    } catch (error) {
        console.error('❌ Error initializing Leads Grid:', error);
    }
}

/**
 * Show lead detail view
 */
function showLeadDetail(companyName, leadIndex) {
    console.log('📊 Showing detail for:', companyName);
    
    currentLeadIndex = leadIndex;
    
    // Hide list view, show detail view
    document.getElementById('leadsListView').style.display = 'none';
    document.getElementById('leadDetailView').style.display = 'block';
    
    // Update company name in detail view
    document.getElementById('leadCompanyName').textContent = companyName;
    
    // Populate companies sidebar
    populateCompaniesSidebar();
    
    // Initialize tabs for detail view
    initializeLeadDetailTabs();
}

/**
 * Populate the companies sidebar
 */
function populateCompaniesSidebar() {
    const companiesList = document.getElementById('companiesList');
    companiesList.innerHTML = '';
    
    leadsData.forEach((lead, index) => {
        const item = document.createElement('div');
        item.className = 'company-list-item';
        if (index === currentLeadIndex) {
            item.classList.add('active');
        }
        item.textContent = lead.Company;
        item.addEventListener('click', () => {
            // Update active state
            document.querySelectorAll('.company-list-item').forEach(el => el.classList.remove('active'));
            item.classList.add('active');
            
            // Update detail view
            currentLeadIndex = index;
            document.getElementById('leadCompanyName').textContent = lead.Company;
            
            // Refresh the current tab's content
            refreshCurrentTabContent();
        });
        companiesList.appendChild(item);
    });
}

/**
 * Initialize Syncfusion Tabs for lead detail
 */
function initializeLeadDetailTabs() {
    const tabsContainer = document.getElementById('leadDetailTabs');
    if (!tabsContainer) return;
    
    // Check if Syncfusion Tab is available
    if (typeof window.ej === 'undefined' || typeof window.ej.navigations === 'undefined') {
        console.warn('⚠️ Syncfusion Tab not available');
        return;
    }
    
    try {
        const tabItems = [
            {
                header: { text: 'Profile' },
                content: '<div class="tab-content-section" id="profileTabContent" style="padding: 0;"></div>'
            },
            {
                header: { text: "Touch's" },
                content: '<div class="tab-content-section" id="touchesTabContent"><div id="touchesGrid" style="width: 100%; min-height: 400px;"></div></div>'
            },
            {
                header: { text: 'Site Overview' },
                content: '<div class="tab-content-section" id="siteOverviewTabContent" style="padding: 0;"></div>'
            },
            {
                header: { text: 'Proposals' },
                content: '<div class="tab-content-section proposals-tab" id="proposalsTabContent"></div>'
            }
        ];
        
        const tabObj = new ej.navigations.Tab({
            items: tabItems,
            heightAdjustMode: 'Auto',
            created: function() {
                // Initialize the first tab (Profile) when tabs are created
                // But only if we're not deep linking (which will handle initialization itself)
                if (!isDeepLinking) {
                    console.log('🎨 Tabs created, initializing Profile tab');
                    setTimeout(() => {
                        initializeProfileTab();
                    }, 100);
                } else {
                    console.log('🎨 Tabs created during deep linking, skipping auto-init');
                }
            },
            selected: function(args) {
                console.log('📑 Tab selected:', args.selectedIndex, 'isDeepLinking:', isDeepLinking);
                
                // Skip initialization during deep linking - openLeadWithTab will handle it
                if (isDeepLinking) {
                    console.log('⏭️ Skipping tab init during deep linking');
                    return;
                }
                
                // When Profile tab is selected, initialize the profile
                if (args.selectedIndex === 0) {
                    initializeProfileTab();
                }
                // When Touch's tab is selected, initialize the grid
                if (args.selectedIndex === 1) {
                    initializeTouchesGrid();
                }
                // When Site Overview tab is selected, initialize the site survey
                if (args.selectedIndex === 2) {
                    initializeSiteOverviewTab();
                }
                // When Proposals tab is selected, initialize the proposals interface
                if (args.selectedIndex === 3) {
                    initializeProposalsTab();
                }
            }
        });
        
        tabObj.appendTo('#leadDetailTabs');
        
        // Store the tab instance globally for later access
        leadDetailTabsInstance = tabObj;
        window.leadDetailTabsInstance = tabObj; // Also expose globally for deep linking
        
        console.log('✅ Lead Detail Tabs initialized');
    } catch (error) {
        console.error('❌ Error initializing tabs:', error);
    }
}

/**
 * Initialize the Profile Tab
 */
function initializeProfileTab() {
    const profileContainer = document.getElementById('profileTabContent');
    if (!profileContainer) {
        console.warn('⚠️ profileTabContent container not found');
        return;
    }
    
    const currentCompany = leadsData[currentLeadIndex];
    if (!currentCompany) {
        console.warn('⚠️ No company data available');
        return;
    }
    
    // Build comprehensive profile HTML
    const profileHTML = `
        <div style="padding: 20px;">
            <!-- Company Overview Stats -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 25px;">
                <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-left: 4px solid #3498db;">
                    <div style="color: #999; font-size: 13px; margin-bottom: 5px;">Account Status</div>
                    <div style="font-size: 18px; font-weight: 700; color: #27ae60;">${currentCompany.Status || 'Active'}</div>
                </div>
                <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-left: 4px solid #27ae60;">
                    <div style="color: #999; font-size: 13px; margin-bottom: 5px;">Estimated Value</div>
                    <div style="font-size: 18px; font-weight: 700; color: #2c3e50;">${currentCompany.Amount || 'N/A'}</div>
                </div>
                <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-left: 4px solid #f39c12;">
                    <div style="color: #999; font-size: 13px; margin-bottom: 5px;">Total Touches</div>
                    <div style="font-size: 18px; font-weight: 700; color: #2c3e50;">${currentCompany.Touches || 0}</div>
                </div>
                <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-left: 4px solid #9b59b6;">
                    <div style="color: #999; font-size: 13px; margin-bottom: 5px;">Next Follow-up</div>
                    <div style="font-size: 18px; font-weight: 700; color: #2c3e50;">${currentCompany.FollowUp || 'TBD'}</div>
                </div>
            </div>

            <!-- Tabs for Different Sections -->
            <div style="margin-bottom: 20px;">
                <div style="display: flex; gap: 10px; border-bottom: 2px solid #ecf0f1;">
                    <button class="profile-subtab active" data-tab="overview" style="padding: 12px 20px; background: none; border: none; color: #2c3e50; font-weight: 600; cursor: pointer; border-bottom: 3px solid #3498db; margin-bottom: -2px;">
                        Overview
                    </button>
                    <button class="profile-subtab" data-tab="contacts" style="padding: 12px 20px; background: none; border: none; color: #555; font-weight: 600; cursor: pointer;">
                        Contacts
                    </button>
                    <button class="profile-subtab" data-tab="services" style="padding: 12px 20px; background: none; border: none; color: #555; font-weight: 600; cursor: pointer;">
                        Services
                    </button>
                    <button class="profile-subtab" data-tab="notes" style="padding: 12px 20px; background: none; border: none; color: #555; font-weight: 600; cursor: pointer;">
                        Notes
                    </button>
                </div>
            </div>

            <!-- Tab Content: Overview -->
            <div id="profile-subtab-overview" class="profile-subtab-content">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <!-- Company Information -->
                    <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                        <h3 style="margin: 0 0 20px 0; color: #2c3e50; display: flex; align-items: center; gap: 8px;">
                            🏢 Company Information
                        </h3>
                        <div style="display: grid; gap: 12px;">
                            <div>
                                <label style="font-size: 12px; color: #999; display: block; margin-bottom: 3px;">Company Name</label>
                                <div style="font-size: 14px; color: #2c3e50; font-weight: 600;">${currentCompany.Company}</div>
                            </div>
                            <div>
                                <label style="font-size: 12px; color: #999; display: block; margin-bottom: 3px;">Industry</label>
                                <div style="font-size: 14px; color: #2c3e50;">${currentCompany.Industry || 'N/A'}</div>
                            </div>
                            <div>
                                <label style="font-size: 12px; color: #999; display: block; margin-bottom: 3px;">Location</label>
                                <div style="font-size: 14px; color: #2c3e50;">${currentCompany.City || 'N/A'}, FL</div>
                            </div>
                            <div>
                                <label style="font-size: 12px; color: #999; display: block; margin-bottom: 3px;">Website</label>
                                <div style="font-size: 14px; color: #3498db;"><a href="#" style="text-decoration: none; color: #3498db;">www.${currentCompany.Company.toLowerCase().replace(/\s+/g, '')}.com</a></div>
                            </div>
                            <div>
                                <label style="font-size: 12px; color: #999; display: block; margin-bottom: 3px;">Lead Source</label>
                                <div style="font-size: 14px; color: #2c3e50;">${currentCompany.Source || 'N/A'}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Account Details -->
                    <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                        <h3 style="margin: 0 0 20px 0; color: #2c3e50; display: flex; align-items: center; gap: 8px;">
                            📋 Sales Information
                        </h3>
                        <div style="display: grid; gap: 12px;">
                            <div>
                                <label style="font-size: 12px; color: #999; display: block; margin-bottom: 3px;">Account Representative</label>
                                <div style="font-size: 14px; color: #2c3e50; font-weight: 600;">${currentCompany.Rep || 'Unassigned'}</div>
                            </div>
                            <div>
                                <label style="font-size: 12px; color: #999; display: block; margin-bottom: 3px;">Lead Status</label>
                                <div style="font-size: 14px; color: #2c3e50;">${currentCompany.Status || 'Active'}</div>
                            </div>
                            <div>
                                <label style="font-size: 12px; color: #999; display: block; margin-bottom: 3px;">Solutions Interest</label>
                                <div style="font-size: 14px; color: #2c3e50;">${currentCompany.Solutions || 'N/A'}</div>
                            </div>
                            <div>
                                <label style="font-size: 12px; color: #999; display: block; margin-bottom: 3px;">Estimated Value</label>
                                <div style="font-size: 14px; color: #2c3e50;">${currentCompany.Amount || 'N/A'}</div>
                            </div>
                            <div>
                                <label style="font-size: 12px; color: #999; display: block; margin-bottom: 3px;">Next Step</label>
                                <div style="font-size: 14px; color: #2c3e50;">${currentCompany.NextStep || 'TBD'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tab Content: Contacts -->
            <div id="profile-subtab-contacts" class="profile-subtab-content" style="display: none;">
                <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h3 style="margin: 0; color: #2c3e50;">Contact List</h3>
                        <button class="e-btn e-primary" style="padding: 10px 16px;">+ Add Contact</button>
                    </div>
                    <div style="display: grid; gap: 15px;">
                        <div style="padding: 15px; border: 1px solid #eee; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
                            <div style="display: flex; gap: 15px; align-items: center;">
                                <div style="width: 50px; height: 50px; border-radius: 50%; background: #3498db; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 18px;">${currentCompany.Company.substring(0, 2).toUpperCase()}</div>
                                <div>
                                    <div style="font-weight: 600; color: #2c3e50; margin-bottom: 3px;">Primary Contact</div>
                                    <div style="font-size: 13px; color: #666; margin-bottom: 2px;">Decision Maker</div>
                                    <div style="font-size: 13px; color: #999;">
                                        📧 contact@${currentCompany.Company.toLowerCase().replace(/\s+/g, '')}.com | ☎️ (555) 123-4567
                                    </div>
                                </div>
                            </div>
                            <div style="display: flex; gap: 8px;">
                                <button class="e-btn e-outline e-small">✉️ Email</button>
                                <button class="e-btn e-outline e-small">☎️ Call</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tab Content: Services -->
            <div id="profile-subtab-services" class="profile-subtab-content" style="display: none;">
                <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h3 style="margin: 0; color: #2c3e50;">Proposed Services</h3>
                        <button class="e-btn e-primary" style="padding: 10px 16px;">+ Add Service</button>
                    </div>
                    <div style="display: grid; gap: 15px;">
                        <div style="padding: 15px; border: 1px solid #eee; border-radius: 6px;">
                            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
                                <div>
                                    <div style="font-weight: 600; color: #2c3e50; font-size: 16px; margin-bottom: 5px;">🖥️ Managed IT Services</div>
                                    <div style="font-size: 13px; color: #666; line-height: 1.6;">
                                        24/7 monitoring, helpdesk support, patch management, and proactive maintenance.
                                    </div>
                                </div>
                                <span style="background: #f39c12; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; white-space: nowrap; margin-left: 15px;">Proposed</span>
                            </div>
                            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; padding-top: 10px; border-top: 1px solid #eee;">
                                <div>
                                    <span style="font-size: 12px; color: #999;">Estimated Monthly:</span>
                                    <div style="font-weight: 600; color: #2c3e50;">${currentCompany.Amount || 'TBD'}</div>
                                </div>
                                <div>
                                    <span style="font-size: 12px; color: #999;">Solutions:</span>
                                    <div style="font-weight: 600; color: #2c3e50;">${currentCompany.Solutions || 'ALL'}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tab Content: Notes -->
            <div id="profile-subtab-notes" class="profile-subtab-content" style="display: none;">
                <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h3 style="margin: 0; color: #2c3e50;">Lead Notes</h3>
                        <button class="e-btn e-primary" style="padding: 10px 16px;">+ Add Note</button>
                    </div>
                    <div style="display: grid; gap: 15px;">
                        <div style="padding: 15px; border-left: 4px solid #3498db; background: #f8f9fa; border-radius: 4px;">
                            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
                                <div style="font-weight: 600; color: #2c3e50;">Initial Contact - ${currentCompany.Source}</div>
                                <span style="font-size: 12px; color: #999; white-space: nowrap; margin-left: 15px;">Follow-up: ${currentCompany.FollowUp}</span>
                            </div>
                            <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.6;">
                                Lead source: ${currentCompany.Source}. Interested in ${currentCompany.Solutions || 'multiple solutions'}. 
                                Estimated value: ${currentCompany.Amount}. Total touches: ${currentCompany.Touches}.
                                ${currentCompany.NextStep ? 'Next step: ' + currentCompany.NextStep : 'Planning next engagement.'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    profileContainer.innerHTML = profileHTML;
    
    // Set up subtab navigation
    setupProfileSubtabs();
    
    console.log('✅ Profile tab initialized for:', currentCompany.Company);
}

/**
 * Setup profile subtab navigation
 */
function setupProfileSubtabs() {
    const subtabs = document.querySelectorAll('.profile-subtab');
    subtabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Update tab buttons
            subtabs.forEach(t => {
                const isActive = t.getAttribute('data-tab') === targetTab;
                if (isActive) {
                    t.style.color = '#2c3e50';
                    t.style.borderBottom = '3px solid #3498db';
                    t.classList.add('active');
                } else {
                    t.style.color = '#555';
                    t.style.borderBottom = 'none';
                    t.classList.remove('active');
                }
            });
            
            // Update tab content
            const tabContents = document.querySelectorAll('.profile-subtab-content');
            tabContents.forEach(content => {
                if (content.id === `profile-subtab-${targetTab}`) {
                    content.style.display = 'block';
                } else {
                    content.style.display = 'none';
                }
            });
        });
    });
}

/**
 * Initialize the Site Overview Tab with Site Survey, Layout, and Devices
 */
function initializeSiteOverviewTab() {
    const siteOverviewContainer = document.getElementById('siteOverviewTabContent');
    if (!siteOverviewContainer) {
        console.warn('⚠️ siteOverviewTabContent container not found');
        return;
    }
    
    const currentCompany = leadsData[currentLeadIndex];
    if (!currentCompany) {
        console.warn('⚠️ No company data available');
        return;
    }
    
    // Generate sample device data
    const devices = generateDeviceList(currentCompany);
    
    // Build comprehensive site overview HTML
    const siteOverviewHTML = `
        <div style="padding: 20px;">
            <h2 style="color: #2c3e50; margin-bottom: 20px;">🏢 ${currentCompany.Company} - Site Survey</h2>
            
            <!-- Site Information Cards -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin-bottom: 30px;">
                <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-left: 4px solid #3498db;">
                    <div style="color: #999; font-size: 13px; margin-bottom: 5px;">Total Devices</div>
                    <div style="font-size: 28px; font-weight: 700; color: #2c3e50;">${devices.length}</div>
                </div>
                <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-left: 4px solid #27ae60;">
                    <div style="color: #999; font-size: 13px; margin-bottom: 5px;">Network Type</div>
                    <div style="font-size: 18px; font-weight: 700; color: #2c3e50;">Hybrid (Wired/WiFi)</div>
                </div>
                <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-left: 4px solid #f39c12;">
                    <div style="color: #999; font-size: 13px; margin-bottom: 5px;">Internet Provider</div>
                    <div style="font-size: 18px; font-weight: 700; color: #2c3e50;">Comcast Business</div>
                </div>
                <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-left: 4px solid #9b59b6;">
                    <div style="color: #999; font-size: 13px; margin-bottom: 5px;">Bandwidth</div>
                    <div style="font-size: 18px; font-weight: 700; color: #2c3e50;">500 Mbps</div>
                </div>
            </div>

            <!-- Network Layout Diagram -->
            <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); margin-bottom: 30px;">
                <h3 style="margin: 0 0 20px 0; color: #2c3e50; display: flex; align-items: center; gap: 8px;">
                    🌐 Network Layout
                </h3>
                <div style="background: #f8f9fa; padding: 30px; border-radius: 8px; border: 2px solid #e0e0e0;">
                    <div style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
                        <!-- Internet -->
                        <div style="background: #3498db; color: white; padding: 15px 30px; border-radius: 8px; font-weight: 600; box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);">
                            ☁️ Internet
                        </div>
                        
                        <div style="width: 2px; height: 30px; background: #95a5a6;"></div>
                        
                        <!-- Firewall -->
                        <div style="background: #e74c3c; color: white; padding: 15px 30px; border-radius: 8px; font-weight: 600; box-shadow: 0 4px 8px rgba(231, 76, 60, 0.3);">
                            🛡️ Firewall (WatchGuard)
                        </div>
                        
                        <div style="width: 2px; height: 30px; background: #95a5a6;"></div>
                        
                        <!-- Core Switch -->
                        <div style="background: #27ae60; color: white; padding: 15px 30px; border-radius: 8px; font-weight: 600; box-shadow: 0 4px 8px rgba(39, 174, 96, 0.3);">
                            🔌 Core Switch (48-port)
                        </div>
                        
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; margin-top: 20px;">
                            <!-- Left Branch -->
                            <div style="display: flex; flex-direction: column; align-items: center; gap: 15px;">
                                <div style="width: 2px; height: 30px; background: #95a5a6;"></div>
                                <div style="background: #f39c12; color: white; padding: 12px 20px; border-radius: 6px; font-weight: 600; text-align: center; box-shadow: 0 3px 6px rgba(243, 156, 18, 0.3);">
                                    📡 WiFi AP<br><span style="font-size: 11px; font-weight: 400;">2.4/5 GHz</span>
                                </div>
                            </div>
                            
                            <!-- Middle Branch -->
                            <div style="display: flex; flex-direction: column; align-items: center; gap: 15px;">
                                <div style="width: 2px; height: 30px; background: #95a5a6;"></div>
                                <div style="background: #9b59b6; color: white; padding: 12px 20px; border-radius: 6px; font-weight: 600; text-align: center; box-shadow: 0 3px 6px rgba(155, 89, 182, 0.3);">
                                    🖥️ Server<br><span style="font-size: 11px; font-weight: 400;">Windows Server</span>
                                </div>
                            </div>
                            
                            <!-- Right Branch -->
                            <div style="display: flex; flex-direction: column; align-items: center; gap: 15px;">
                                <div style="width: 2px; height: 30px; background: #95a5a6;"></div>
                                <div style="background: #16a085; color: white; padding: 12px 20px; border-radius: 6px; font-weight: 600; text-align: center; box-shadow: 0 3px 6px rgba(22, 160, 133, 0.3);">
                                    💻 Workstations<br><span style="font-size: 11px; font-weight: 400;">${devices.filter(d => d.Type === 'Workstation').length} devices</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Network Details -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
                    <div style="padding: 15px; background: #e8f4f8; border-radius: 6px; border-left: 4px solid #3498db;">
                        <strong style="color: #2980b9; display: block; margin-bottom: 8px;">📍 Primary Location</strong>
                        <p style="margin: 0; color: #555; font-size: 13px;">
                            ${currentCompany.City}, FL<br>
                            Single-site deployment<br>
                            Office: 5,000 sq ft
                        </p>
                    </div>
                    <div style="padding: 15px; background: #e8f8e8; border-radius: 6px; border-left: 4px solid #27ae60;">
                        <strong style="color: #27ae60; display: block; margin-bottom: 8px;">🔒 Security Features</strong>
                        <p style="margin: 0; color: #555; font-size: 13px;">
                            • Unified Threat Management<br>
                            • Content Filtering<br>
                            • VPN Access (SSL/IPSec)
                        </p>
                    </div>
                </div>
            </div>

            <!-- Device Inventory -->
            <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h3 style="margin: 0; color: #2c3e50;">💻 Device Inventory</h3>
                    <button class="e-btn e-outline e-small" onclick="alert('Export functionality coming soon!')">📥 Export List</button>
                </div>
                
                <!-- Device Summary Cards -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 20px;">
                    <div style="background: #e3f2fd; padding: 15px; border-radius: 6px; text-align: center;">
                        <div style="font-size: 24px; font-weight: 700; color: #1976d2;">${devices.filter(d => d.Type === 'Workstation').length}</div>
                        <div style="font-size: 13px; color: #666; margin-top: 5px;">Workstations</div>
                    </div>
                    <div style="background: #f3e5f5; padding: 15px; border-radius: 6px; text-align: center;">
                        <div style="font-size: 24px; font-weight: 700; color: #7b1fa2;">${devices.filter(d => d.Type === 'Laptop').length}</div>
                        <div style="font-size: 13px; color: #666; margin-top: 5px;">Laptops</div>
                    </div>
                    <div style="background: #fff3e0; padding: 15px; border-radius: 6px; text-align: center;">
                        <div style="font-size: 24px; font-weight: 700; color: #f57c00;">${devices.filter(d => d.Type === 'Server').length}</div>
                        <div style="font-size: 13px; color: #666; margin-top: 5px;">Servers</div>
                    </div>
                    <div style="background: #e8f5e9; padding: 15px; border-radius: 6px; text-align: center;">
                        <div style="font-size: 24px; font-weight: 700; color: #388e3c;">${devices.filter(d => d.Type === 'Network').length}</div>
                        <div style="font-size: 13px; color: #666; margin-top: 5px;">Network Devices</div>
                    </div>
                </div>
                
                <!-- Device List Table -->
                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: #34495e; color: white;">
                                <th style="padding: 12px; text-align: left; font-size: 13px; font-weight: 600;">Device Name</th>
                                <th style="padding: 12px; text-align: left; font-size: 13px; font-weight: 600;">Type</th>
                                <th style="padding: 12px; text-align: left; font-size: 13px; font-weight: 600;">Model</th>
                                <th style="padding: 12px; text-align: left; font-size: 13px; font-weight: 600;">OS/Version</th>
                                <th style="padding: 12px; text-align: left; font-size: 13px; font-weight: 600;">Location</th>
                                <th style="padding: 12px; text-align: center; font-size: 13px; font-weight: 600;">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${devices.map((device, index) => `
                                <tr style="border-bottom: 1px solid #ecf0f1; ${index % 2 === 0 ? 'background: #f8f9fa;' : ''}">
                                    <td style="padding: 12px; font-size: 14px; color: #2c3e50; font-weight: 600;">${device.Name}</td>
                                    <td style="padding: 12px; font-size: 14px; color: #2c3e50;">${device.Type}</td>
                                    <td style="padding: 12px; font-size: 14px; color: #555;">${device.Model}</td>
                                    <td style="padding: 12px; font-size: 14px; color: #555;">${device.OS}</td>
                                    <td style="padding: 12px; font-size: 14px; color: #555;">${device.Location}</td>
                                    <td style="padding: 12px; text-align: center;">
                                        <span style="background: ${device.Status === 'Active' ? '#27ae60' : device.Status === 'Aging' ? '#f39c12' : '#95a5a6'}; color: white; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 600;">
                                            ${device.Status}
                                        </span>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                
                <!-- Notes Section -->
                <div style="margin-top: 20px; padding: 15px; background: #fff8e1; border-radius: 6px; border-left: 4px solid #ffc107;">
                    <strong style="color: #f57c00; display: block; margin-bottom: 8px;">📝 Survey Notes</strong>
                    <p style="margin: 0; color: #555; font-size: 13px; line-height: 1.6;">
                        Network assessment conducted on initial site visit. Current infrastructure is adequate for basic operations. 
                        Recommendations: Consider firewall upgrade for enhanced security, implement backup solution, 
                        replace aging workstations (3+ units over 4 years old).
                    </p>
                </div>
            </div>
        </div>
    `;
    
    siteOverviewContainer.innerHTML = siteOverviewHTML;
    
    console.log('✅ Site Overview tab initialized for:', currentCompany.Company);
}

/**
 * Generate sample device list for a company
 */
function generateDeviceList(company) {
    const deviceTypes = ['Workstation', 'Laptop', 'Server', 'Network'];
    const models = {
        'Workstation': ['Dell OptiPlex 7090', 'HP EliteDesk 800', 'Lenovo ThinkCentre M920'],
        'Laptop': ['Dell Latitude 5420', 'HP EliteBook 840', 'Lenovo ThinkPad X1'],
        'Server': ['Dell PowerEdge R740', 'HP ProLiant DL380', 'Dell PowerEdge T440'],
        'Network': ['Cisco Catalyst 2960', 'UniFi Dream Machine', 'WatchGuard Firebox']
    };
    const os = {
        'Workstation': ['Windows 11 Pro', 'Windows 10 Pro'],
        'Laptop': ['Windows 11 Pro', 'Windows 10 Pro'],
        'Server': ['Windows Server 2019', 'Windows Server 2022', 'Ubuntu 20.04'],
        'Network': ['IOS 15.2', 'UniFi OS', 'Fireware OS 12.8']
    };
    const locations = ['Main Office', 'Conference Room', 'Server Room', 'Reception', 'Sales Floor'];
    const statuses = ['Active', 'Active', 'Active', 'Aging', 'Active']; // Mostly active
    
    const devices = [];
    const companyPrefix = company.Company.substring(0, 3).toUpperCase();
    
    // Generate 8-15 devices
    const deviceCount = Math.floor(Math.random() * 8) + 8;
    
    for (let i = 0; i < deviceCount; i++) {
        const type = deviceTypes[Math.floor(Math.random() * deviceTypes.length)];
        const device = {
            Name: `${companyPrefix}-${type.substring(0, 2).toUpperCase()}-${String(i + 1).padStart(3, '0')}`,
            Type: type,
            Model: models[type][Math.floor(Math.random() * models[type].length)],
            OS: os[type][Math.floor(Math.random() * os[type].length)],
            Location: locations[Math.floor(Math.random() * locations.length)],
            Status: statuses[Math.floor(Math.random() * statuses.length)]
        };
        devices.push(device);
    }
    
    // Ensure we have at least one server and one network device
    if (!devices.find(d => d.Type === 'Server')) {
        devices[0] = {
            Name: `${companyPrefix}-SV-001`,
            Type: 'Server',
            Model: 'Dell PowerEdge R740',
            OS: 'Windows Server 2019',
            Location: 'Server Room',
            Status: 'Active'
        };
    }
    
    if (!devices.find(d => d.Type === 'Network')) {
        devices[1] = {
            Name: `${companyPrefix}-NE-001`,
            Type: 'Network',
            Model: 'Cisco Catalyst 2960',
            OS: 'IOS 15.2',
            Location: 'Server Room',
            Status: 'Active'
        };
    }
    
    return devices.sort((a, b) => a.Name.localeCompare(b.Name));
}

/**
 * Initialize the Touches Grid
 */
function initializeTouchesGrid() {
    const gridContainer = document.getElementById('touchesGrid');
    if (!gridContainer) {
        console.warn('⚠️ touchesGrid container not found');
        return;
    }
    
    // Check if Syncfusion Grid is available
    if (typeof window.ej === 'undefined' || typeof window.ej.grids === 'undefined') {
        console.warn('⚠️ Syncfusion Grid not available');
        return;
    }
    
    try {
        // Get touch history for current company
        const currentCompany = leadsData[currentLeadIndex];
        let touches = touchHistoryData[currentCompany.Company];
        
        // If no specific touch history, generate default touches
        if (!touches) {
            touches = getDefaultTouches(currentCompany.Company, currentCompany.Touches || 5);
        }
        
        // Destroy existing grid if it exists
        if (touchesGridInstance) {
            touchesGridInstance.destroy();
            touchesGridInstance = null;
        }
        
        touchesGridInstance = new ej.grids.Grid({
            dataSource: touches,
            allowSorting: true,
            allowFiltering: true,
            filterSettings: { type: 'Excel' },
            columns: [
                { field: 'Initiator', headerText: 'Initiator', width: 130 },
                { field: 'Contact', headerText: 'Contact', width: 150 },
                { field: 'Date', headerText: 'Date', width: 120 },
                { field: 'Time', headerText: 'Time', width: 100 },
                { field: 'Channel', headerText: 'Channel', width: 120 },
                { field: 'Summary', headerText: 'Summary', width: 300 }
            ],
            height: '100%',
            rowHeight: 40
        });
        
        touchesGridInstance.appendTo('#touchesGrid');
        
        console.log('✅ Touches Grid initialized with', touches.length, 'touches for', currentCompany.Company);
    } catch (error) {
        console.error('❌ Error initializing Touches Grid:', error);
    }
}

/**
 * Set up event listeners
 */
function setupLeadsEventListeners() {
    // Back to list button
    const backBtn = document.getElementById('backToLeadsBtn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            document.getElementById('leadDetailView').style.display = 'none';
            document.getElementById('leadsListView').style.display = 'block';
            currentLeadIndex = null;
        });
    }
    
    // Window resize handler for responsive grid
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Only re-initialize if on leads page and grid exists
            const leadsPage = document.getElementById('page-leads');
            if (leadsPage && leadsPage.classList.contains('active') && leadsGridInstance) {
                console.log('📐 Window resized, updating grid columns');
                initializeLeadsGrid();
            }
        }, 300); // Debounce resize events
    });
}

/**
 * Initialize the Proposals Tab
 */
/**
 * Initialize the Proposals Tab - Business Proposal Generator
 */
function initializeProposalsTab() {
    const proposalsContainer = document.getElementById('proposalsTabContent');
    if (!proposalsContainer) {
        console.warn('⚠️ proposalsTabContent container not found');
        return;
    }
    
    // Clear existing content to force refresh
    proposalsContainer.innerHTML = '';
    
    const currentCompany = leadsData[currentLeadIndex];
    
    // Build the comprehensive proposal generator HTML
    const proposalsHTML = `
        <div style="padding: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
                <h2 style="color: #2c3e50; margin: 0;">📄 Business Proposal Generator</h2>
                <div style="display: flex; gap: 10px;">
                    <button id="saveProposalBtn" class="e-btn e-outline" onclick="window.saveProposalDraft()">💾 Save Draft</button>
                    <button id="generateProposalBtn" class="e-btn e-primary" onclick="window.generateCurrentProposalPDF()">📥 Generate PDF</button>
                </div>
            </div>

            <!-- Proposal Configuration -->
            <div style="display: grid; grid-template-columns: 350px 1fr; gap: 20px;">
                <!-- Left Panel: Configuration -->
                <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                    <h3 style="margin: 0 0 20px 0; color: #2c3e50;">⚙️ Configuration</h3>
                    
                    <!-- Client Information -->
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; font-size: 12px; color: #666; margin-bottom: 5px; font-weight: 600;">Client Name</label>
                        <input type="text" id="proposalClientName" value="${currentCompany.Company}" class="e-field" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 13px;">
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; font-size: 12px; color: #666; margin-bottom: 5px; font-weight: 600;">Contact Person</label>
                        <input type="text" id="proposalContactPerson" value="Primary Contact" class="e-field" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 13px;">
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; font-size: 12px; color: #666; margin-bottom: 5px; font-weight: 600;">Proposal Date</label>
                        <input type="date" id="proposalDate" value="${new Date().toISOString().split('T')[0]}" class="e-field" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 13px;">
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; font-size: 12px; color: #666; margin-bottom: 5px; font-weight: 600;">Valid Until</label>
                        <input type="date" id="proposalValidUntil" value="${new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0]}" class="e-field" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 13px;">
                    </div>
                    
                    <!-- Sections to Include -->
                    <h4 style="margin: 20px 0 10px 0; color: #2c3e50; font-size: 14px;">Sections to Include</h4>
                    <div style="display: grid; gap: 8px;">
                        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                            <input type="checkbox" checked id="section-cover" style="cursor: pointer;">
                            <span style="font-size: 13px;">Cover Letter</span>
                        </label>
                        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                            <input type="checkbox" checked id="section-executive" style="cursor: pointer;">
                            <span style="font-size: 13px;">Executive Summary</span>
                        </label>
                        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                            <input type="checkbox" checked id="section-problem" style="cursor: pointer;">
                            <span style="font-size: 13px;">Problem Statement</span>
                        </label>
                        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                            <input type="checkbox" checked id="section-solution" style="cursor: pointer;">
                            <span style="font-size: 13px;">Proposed Solution</span>
                        </label>
                        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                            <input type="checkbox" checked id="section-services" style="cursor: pointer;">
                            <span style="font-size: 13px;">Services & Pricing</span>
                        </label>
                        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                            <input type="checkbox" checked id="section-timeline" style="cursor: pointer;">
                            <span style="font-size: 13px;">Implementation Timeline</span>
                        </label>
                        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                            <input type="checkbox" id="section-team" style="cursor: pointer;">
                            <span style="font-size: 13px;">About Our Team</span>
                        </label>
                        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                            <input type="checkbox" id="section-terms" style="cursor: pointer;">
                            <span style="font-size: 13px;">Terms & Conditions</span>
                        </label>
                    </div>
                    
                    <!-- Template Selection -->
                    <h4 style="margin: 20px 0 10px 0; color: #2c3e50; font-size: 14px;">Template Style</h4>
                    <select id="proposalTemplate" class="e-field" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 13px;">
                        <option value="professional">Professional</option>
                        <option value="modern">Modern</option>
                        <option value="minimal">Minimal</option>
                        <option value="classic">Classic</option>
                    </select>
                </div>
                
                <!-- Right Panel: Proposal Editor -->
                <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); max-height: 800px; overflow-y: auto;">
                    <div style="max-width: 800px;">
                        <!-- Cover Section -->
                        <div class="proposal-section" id="cover-section">
                            <div style="text-align: center; padding: 40px 20px; border-bottom: 3px solid #3498db;">
                                <div style="font-size: 48px; margin-bottom: 20px;">📋</div>
                                <h1 style="color: #2c3e50; margin: 0 0 10px 0; font-size: 32px;">Business Proposal</h1>
                                <h2 style="color: #7f8c8d; margin: 0 0 30px 0; font-weight: 400; font-size: 20px;">Managed IT Services</h2>
                                <div style="border-top: 2px solid #ecf0f1; padding-top: 30px; margin-top: 30px;">
                                    <p style="font-size: 24px; font-weight: 600; color: #34495e; margin: 0 0 10px 0;">${currentCompany.Company}</p>
                                    <p style="font-size: 16px; color: #95a5a6; margin: 0;">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Executive Summary -->
                        <div class="proposal-section" id="executive-section" style="margin-top: 30px;">
                            <h3 style="color: #2c3e50; border-left: 4px solid #3498db; padding-left: 15px; margin: 0 0 20px 0;">Executive Summary</h3>
                            <textarea id="executiveSummary" rows="6" class="e-field" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; line-height: 1.6; font-family: inherit;" placeholder="Enter executive summary...">${currentCompany.Company} is seeking a comprehensive managed IT services solution to enhance operational efficiency, improve security posture, and reduce technology-related downtime. Our proposal outlines a complete IT infrastructure management approach tailored to your business needs, including 24/7 monitoring, proactive maintenance, and strategic technology guidance.</textarea>
                        </div>

                        <!-- Problem Statement -->
                        <div class="proposal-section" id="problem-section" style="margin-top: 30px;">
                            <h3 style="color: #2c3e50; border-left: 4px solid #e74c3c; padding-left: 15px; margin: 0 0 20px 0;">Problem Statement</h3>
                            <textarea id="problemStatement" rows="6" class="e-field" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; line-height: 1.6; font-family: inherit;" placeholder="Enter problem statement...">Many organizations in the ${currentCompany.Industry || 'business'} industry face challenges with:
• Managing complex IT infrastructure without dedicated internal resources
• Maintaining security compliance and protecting against cyber threats
• Minimizing downtime and ensuring business continuity
• Scaling technology to support business growth
• Controlling IT costs while maintaining service quality</textarea>
                        </div>

                        <!-- Proposed Solution -->
                        <div class="proposal-section" id="solution-section" style="margin-top: 30px;">
                            <h3 style="color: #2c3e50; border-left: 4px solid #27ae60; padding-left: 15px; margin: 0 0 20px 0;">Proposed Solution</h3>
                            <textarea id="proposedSolution" rows="8" class="e-field" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; line-height: 1.6; font-family: inherit;" placeholder="Enter proposed solution...">We propose a comprehensive Managed IT Services package that includes:

1. 24/7 Network Monitoring & Management
   - Proactive monitoring of all systems and devices
   - Immediate incident response and resolution
   - Performance optimization and capacity planning

2. Security & Compliance
   - Advanced threat protection and firewall management
   - Regular security audits and vulnerability assessments
   - Compliance reporting and documentation

3. Help Desk Support
   - Unlimited support tickets
   - Remote and on-site assistance
   - Average response time: 15 minutes

4. Strategic IT Consulting
   - Technology roadmap planning
   - Vendor management
   - Budget optimization</textarea>
                        </div>

                        <!-- Services & Pricing -->
                        <div class="proposal-section" id="services-section" style="margin-top: 30px;">
                            <h3 style="color: #2c3e50; border-left: 4px solid #f39c12; padding-left: 15px; margin: 0 0 20px 0;">Services & Pricing</h3>
                            
                            <div style="border: 1px solid #ddd; border-radius: 6px; overflow: hidden; margin-bottom: 20px;">
                                <table style="width: 100%; border-collapse: collapse;">
                                    <thead style="background: #34495e; color: white;">
                                        <tr>
                                            <th style="padding: 12px; text-align: left; font-size: 14px; font-weight: 600;">Service</th>
                                            <th style="padding: 12px; text-align: left; font-size: 14px; font-weight: 600;">Description</th>
                                            <th style="padding: 12px; text-align: right; font-size: 14px; font-weight: 600;">Monthly Cost</th>
                                        </tr>
                                    </thead>
                                    <tbody id="servicesTable">
                                        <tr style="border-bottom: 1px solid #ecf0f1;">
                                            <td style="padding: 12px; font-size: 14px;"><input type="text" value="Managed IT Services" class="e-field" style="width: 100%; padding: 6px; border: 1px solid #ddd; border-radius: 3px; font-size: 13px;"></td>
                                            <td style="padding: 12px; font-size: 14px;"><input type="text" value="Complete infrastructure management" class="e-field" style="width: 100%; padding: 6px; border: 1px solid #ddd; border-radius: 3px; font-size: 13px;"></td>
                                            <td style="padding: 12px; text-align: right; font-size: 14px;"><input type="number" value="2500" class="e-field service-cost" style="width: 120px; padding: 6px; border: 1px solid #ddd; border-radius: 3px; font-size: 13px;"></td>
                                        </tr>
                                        <tr style="border-bottom: 1px solid #ecf0f1; background: #f8f9fa;">
                                            <td style="padding: 12px; font-size: 14px;"><input type="text" value="Cloud Backup & DR" class="e-field" style="width: 100%; padding: 6px; border: 1px solid #ddd; border-radius: 3px; font-size: 13px;"></td>
                                            <td style="padding: 12px; font-size: 14px;"><input type="text" value="Automated cloud backup (500GB)" class="e-field" style="width: 100%; padding: 6px; border: 1px solid #ddd; border-radius: 3px; font-size: 13px;"></td>
                                            <td style="padding: 12px; text-align: right; font-size: 14px;"><input type="number" value="750" class="e-field service-cost" style="width: 120px; padding: 6px; border: 1px solid #ddd; border-radius: 3px; font-size: 13px;"></td>
                                        </tr>
                                        <tr style="border-bottom: 1px solid #ecf0f1;">
                                            <td style="padding: 12px; font-size: 14px;"><input type="text" value="Cybersecurity Suite" class="e-field" style="width: 100%; padding: 6px; border: 1px solid #ddd; border-radius: 3px; font-size: 13px;"></td>
                                            <td style="padding: 12px; font-size: 14px;"><input type="text" value="Advanced threat protection" class="e-field" style="width: 100%; padding: 6px; border: 1px solid #ddd; border-radius: 3px; font-size: 13px;"></td>
                                            <td style="padding: 12px; text-align: right; font-size: 14px;"><input type="number" value="250" class="e-field service-cost" style="width: 120px; padding: 6px; border: 1px solid #ddd; border-radius: 3px; font-size: 13px;"></td>
                                        </tr>
                                    </tbody>
                                    <tfoot style="background: #ecf0f1; font-weight: 600;">
                                        <tr>
                                            <td colspan="2" style="padding: 15px; text-align: right; font-size: 16px;">Total Monthly Investment:</td>
                                            <td style="padding: 15px; text-align: right; font-size: 18px; color: #27ae60;" id="totalCost">$3,500</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            
                            <button id="addServiceRow" class="e-btn e-outline e-small">+ Add Service</button>
                        </div>

                        <!-- Implementation Timeline -->
                        <div class="proposal-section" id="timeline-section" style="margin-top: 30px;">
                            <h3 style="color: #2c3e50; border-left: 4px solid #9b59b6; padding-left: 15px; margin: 0 0 20px 0;">Implementation Timeline</h3>
                            <textarea id="implementationTimeline" rows="6" class="e-field" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; line-height: 1.6; font-family: inherit;" placeholder="Enter implementation timeline...">Phase 1 (Week 1-2): Initial Assessment & Planning
• Complete network assessment
• Document current infrastructure
• Define migration strategy

Phase 2 (Week 3-4): Infrastructure Setup
• Deploy monitoring agents
• Configure backup solutions
• Implement security measures

Phase 3 (Week 5-6): Go-Live & Training
• Cutover to managed services
• Staff training sessions
• 24/7 support activation</textarea>
                        </div>

                        <!-- About Our Team -->
                        <div class="proposal-section" id="team-section" style="margin-top: 30px;">
                            <h3 style="color: #2c3e50; border-left: 4px solid #16a085; padding-left: 15px; margin: 0 0 20px 0;">About Our Team</h3>
                            <textarea id="aboutTeam" rows="5" class="e-field" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; line-height: 1.6; font-family: inherit;" placeholder="Enter team information...">Our team of certified IT professionals brings over 20 years of combined experience in managing enterprise-level IT infrastructure. We hold industry certifications including Microsoft Certified Professional, Cisco CCNA, CompTIA Security+, and ITIL Foundation. Our local presence ensures rapid on-site response when needed, while our 24/7 Network Operations Center provides round-the-clock monitoring and support.</textarea>
                        </div>

                        <!-- Terms & Conditions -->
                        <div class="proposal-section" id="terms-section" style="margin-top: 30px;">
                            <h3 style="color: #2c3e50; border-left: 4px solid #7f8c8d; padding-left: 15px; margin: 0 0 20px 0;">Terms & Conditions</h3>
                            <textarea id="termsConditions" rows="5" class="e-field" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; line-height: 1.6; font-family: inherit;" placeholder="Enter terms and conditions...">• This proposal is valid for 30 days from the date above
• Services are provided on a month-to-month basis with 30-day termination notice
• Setup fees: One-time $500 implementation fee
• Payment terms: Net 15 days from invoice date
• Service Level Agreement (SLA) guarantees 99.9% uptime
• All prices are in USD and subject to applicable taxes</textarea>
                        </div>

                        <!-- Call to Action -->
                        <div style="margin-top: 40px; padding: 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; text-align: center; color: white;">
                            <h3 style="margin: 0 0 15px 0; font-size: 24px;">Ready to Get Started?</h3>
                            <p style="margin: 0 0 20px 0; font-size: 16px; opacity: 0.9;">Let's discuss how we can help transform your IT infrastructure.</p>
                            <div style="display: flex; justify-content: center; gap: 15px;">
                                <div style="text-align: center;">
                                    <div style="font-size: 12px; opacity: 0.8;">Contact</div>
                                    <div style="font-size: 16px; font-weight: 600;">${currentCompany.Rep || 'Sales Representative'}</div>
                                </div>
                                <div style="border-left: 1px solid rgba(255,255,255,0.3); margin: 0 10px;"></div>
                                <div style="text-align: center;">
                                    <div style="font-size: 12px; opacity: 0.8;">Email</div>
                                    <div style="font-size: 16px; font-weight: 600;">sales@yourcompany.com</div>
                                </div>
                                <div style="border-left: 1px solid rgba(255,255,255,0.3); margin: 0 10px;"></div>
                                <div style="text-align: center;">
                                    <div style="font-size: 12px; opacity: 0.8;">Phone</div>
                                    <div style="font-size: 16px; font-weight: 600;">(555) 123-4567</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    proposalsContainer.innerHTML = proposalsHTML;
    
    // Set up event listeners (PDF and Save buttons use onclick, so they're handled separately)
    setupProposalEventListeners(currentCompany);
    
    // Calculate initial total
    calculateTotalCost();
    
    console.log('✅ Proposals tab initialized with business proposal generator');
}

/**
 * Generate PDF from proposal content
 */
function generateProposalPDF(company) {
    console.log('🔄 Starting PDF generation for:', company.Company);
    
    // Check if jsPDF is loaded
    if (!window.jspdf || !window.jspdf.jsPDF) {
        console.error('❌ jsPDF library not loaded');
        alert('⚠️ PDF library not loaded. Please refresh the page and try again.');
        return;
    }
    
    try {
        // Access jsPDF from the global scope
        const { jsPDF } = window.jspdf;
        console.log('✅ jsPDF loaded successfully');
        const doc = new jsPDF();
        
        // Get current date for the proposal
        const currentDate = new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        let yPos = 20;
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        const margin = 20;
        const maxWidth = pageWidth - (margin * 2);
        
        // Helper function to add new page if needed
        const checkPageBreak = (requiredSpace = 10) => {
            if (yPos + requiredSpace > pageHeight - 20) {
                doc.addPage();
                yPos = 20;
                return true;
            }
            return false;
        };
        
        // Header
        doc.setFillColor(52, 152, 219);
        doc.rect(0, 0, pageWidth, 40, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(24);
        doc.setFont(undefined, 'bold');
        doc.text('BUSINESS PROPOSAL', pageWidth / 2, 25, { align: 'center' });
        
        yPos = 50;
        doc.setTextColor(0, 0, 0);
        
        // Company Name
        doc.setFontSize(20);
        doc.setFont(undefined, 'bold');
        doc.text(company.Company, margin, yPos);
        yPos += 10;
        
        // Date
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(100, 100, 100);
        doc.text(`Proposal Date: ${currentDate}`, margin, yPos);
        yPos += 15;
        
        // Divider line
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 15;
        
        doc.setTextColor(0, 0, 0);
        
        // Executive Summary Section
        if (document.getElementById('section-executive')?.checked !== false) {
            checkPageBreak(30);
            doc.setFontSize(16);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(52, 152, 219);
            doc.text('Executive Summary', margin, yPos);
            yPos += 8;
            
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(0, 0, 0);
            const execText = document.getElementById('execSummaryText')?.value || 
                `We are pleased to present this comprehensive proposal for ${company.Company}. Our managed IT services are designed to enhance your business operations, improve security, and provide reliable technical support for your organization.`;
            const execLines = doc.splitTextToSize(execText, maxWidth);
            doc.text(execLines, margin, yPos);
            yPos += (execLines.length * 5) + 10;
        }
        
        // Company Overview Section
        if (document.getElementById('section-company')?.checked !== false) {
            checkPageBreak(30);
            doc.setFontSize(16);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(52, 152, 219);
            doc.text('Company Overview', margin, yPos);
            yPos += 8;
            
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(0, 0, 0);
            const companyText = document.getElementById('companyOverviewText')?.value || 
                `Our MSP has been serving businesses in the ${company.City} area for over 15 years. We specialize in providing comprehensive IT solutions tailored to organizations in the ${company.Industry} industry.`;
            const companyLines = doc.splitTextToSize(companyText, maxWidth);
            doc.text(companyLines, margin, yPos);
            yPos += (companyLines.length * 5) + 10;
        }
        
        // Services & Pricing Section
        if (document.getElementById('section-services')?.checked !== false) {
            checkPageBreak(30);
            doc.setFontSize(16);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(52, 152, 219);
            doc.text('Proposed Services & Pricing', margin, yPos);
            yPos += 10;
            
            // Get services from the table
            const servicesTable = document.getElementById('servicesTable');
            if (servicesTable) {
                const rows = servicesTable.querySelectorAll('tr');
                let totalCost = 0;
                
                doc.setFontSize(10);
                doc.setFont(undefined, 'bold');
                doc.setTextColor(100, 100, 100);
                
                // Table header
                checkPageBreak(15);
                doc.text('Service', margin, yPos);
                doc.text('Description', margin + 60, yPos);
                doc.text('Monthly Cost', pageWidth - margin - 30, yPos, { align: 'right' });
                yPos += 5;
                doc.setDrawColor(200, 200, 200);
                doc.line(margin, yPos, pageWidth - margin, yPos);
                yPos += 8;
                
                doc.setFont(undefined, 'normal');
                doc.setTextColor(0, 0, 0);
                
                // Table rows
                rows.forEach((row, index) => {
                    checkPageBreak(20);
                    
                    const cells = row.querySelectorAll('td');
                    if (cells.length >= 3) {
                        const service = cells[0].querySelector('input')?.value || cells[0].textContent.trim();
                        const description = cells[1].querySelector('input')?.value || cells[1].textContent.trim();
                        const cost = parseFloat(cells[2].querySelector('input')?.value || cells[2].textContent.replace(/[$,]/g, '')) || 0;
                        totalCost += cost;
                        
                        // Service name (bold)
                        doc.setFont(undefined, 'bold');
                        doc.text(service.substring(0, 25), margin, yPos);
                        
                        // Description
                        doc.setFont(undefined, 'normal');
                        const descLines = doc.splitTextToSize(description, 60);
                        doc.text(descLines[0].substring(0, 35), margin + 60, yPos);
                        
                        // Cost
                        doc.text('$' + cost.toLocaleString(), pageWidth - margin - 5, yPos, { align: 'right' });
                        
                        yPos += 8;
                    }
                });
                
                // Total
                yPos += 5;
                doc.setDrawColor(200, 200, 200);
                doc.line(margin, yPos, pageWidth - margin, yPos);
                yPos += 8;
                
                doc.setFont(undefined, 'bold');
                doc.setFontSize(12);
                doc.text('Total Monthly Investment:', margin, yPos);
                doc.setTextColor(52, 152, 219);
                doc.text('$' + totalCost.toLocaleString(), pageWidth - margin - 5, yPos, { align: 'right' });
                doc.setTextColor(0, 0, 0);
                yPos += 15;
            }
        }
        
        // Implementation Timeline Section
        if (document.getElementById('section-timeline')?.checked !== false) {
            checkPageBreak(30);
            doc.setFontSize(16);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(52, 152, 219);
            doc.text('Implementation Timeline', margin, yPos);
            yPos += 8;
            
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(0, 0, 0);
            const timelineText = document.getElementById('timelineText')?.value || 
                `Phase 1 (Week 1-2): Discovery & Planning\nPhase 2 (Week 3-4): Infrastructure Setup\nPhase 3 (Week 5-6): Migration & Testing\nPhase 4 (Week 7-8): Training & Go-Live`;
            const timelineLines = doc.splitTextToSize(timelineText, maxWidth);
            doc.text(timelineLines, margin, yPos);
            yPos += (timelineLines.length * 5) + 10;
        }
        
        // Terms & Conditions Section
        if (document.getElementById('section-terms')?.checked !== false) {
            checkPageBreak(30);
            doc.setFontSize(16);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(52, 152, 219);
            doc.text('Terms & Conditions', margin, yPos);
            yPos += 8;
            
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(0, 0, 0);
            const termsText = document.getElementById('termsText')?.value || 
                `• Contract term: 12 months with automatic renewal\n• Payment terms: Net 30 days\n• Services provided during business hours (8 AM - 6 PM EST)\n• 24/7 emergency support available\n• 30-day notice required for service changes`;
            const termsLines = doc.splitTextToSize(termsText, maxWidth);
            doc.text(termsLines, margin, yPos);
            yPos += (termsLines.length * 5) + 10;
        }
        
        // Footer on last page
        checkPageBreak(40);
        yPos = pageHeight - 40;
        doc.setDrawColor(52, 152, 219);
        doc.setLineWidth(0.5);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 8;
        
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text('Thank you for considering our proposal!', margin, yPos);
        yPos += 6;
        doc.setFont(undefined, 'normal');
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        doc.text('For questions or to accept this proposal, please contact your account representative.', margin, yPos);
        
        // Page numbers
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(150, 150, 150);
            doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
        }
        
        // Save the PDF
        const filename = `Proposal_${company.Company.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
        doc.save(filename);
        
        console.log('✅ PDF generated successfully:', filename);
        
        // Show success message
        alert(`📄 PDF Generated Successfully!\n\nFile: ${filename}\n\nThe proposal has been downloaded to your device.`);
        
    } catch (error) {
        console.error('❌ Error generating PDF:', error);
        alert('⚠️ Error generating PDF. Please check the console for details.');
    }
}

/**
 * Calculate total cost from service items
 */
function calculateTotalCost() {
    const costInputs = document.querySelectorAll('.service-cost');
    let total = 0;
    costInputs.forEach(input => {
        total += parseFloat(input.value) || 0;
    });
    const totalElement = document.getElementById('totalCost');
    if (totalElement) {
        totalElement.textContent = '$' + total.toLocaleString();
    }
}

/**
 * Set up event listeners for proposal buttons and features
 */
function setupProposalEventListeners(company) {
    console.log('🔧 Setting up proposal event listeners for:', company.Company);
    
    // Note: Generate PDF and Save Draft buttons use onclick attributes
    // and don't need event listeners here
    
    // Add service row button
    const addServiceBtn = document.getElementById('addServiceRow');
    if (addServiceBtn) {
        addServiceBtn.addEventListener('click', () => {
            const tbody = document.getElementById('servicesTable');
            const rowCount = tbody.children.length;
            const newRow = document.createElement('tr');
            newRow.style.borderBottom = '1px solid #ecf0f1';
            if (rowCount % 2 === 0) {
                newRow.style.background = '#f8f9fa';
            }
            newRow.innerHTML = `
                <td style="padding: 12px; font-size: 14px;"><input type="text" value="New Service" class="e-field" style="width: 100%; padding: 6px; border: 1px solid #ddd; border-radius: 3px; font-size: 13px;"></td>
                <td style="padding: 12px; font-size: 14px;"><input type="text" value="Service description" class="e-field" style="width: 100%; padding: 6px; border: 1px solid #ddd; border-radius: 3px; font-size: 13px;"></td>
                <td style="padding: 12px; text-align: right; font-size: 14px;"><input type="number" value="0" class="e-field service-cost" style="width: 120px; padding: 6px; border: 1px solid #ddd; border-radius: 3px; font-size: 13px;"></td>
            `;
            tbody.appendChild(newRow);
            
            // Add event listener to new cost input
            const newCostInput = newRow.querySelector('.service-cost');
            newCostInput.addEventListener('input', calculateTotalCost);
            
            calculateTotalCost();
        });
    }
    
    // Cost calculation on input change
    const costInputs = document.querySelectorAll('.service-cost');
    costInputs.forEach(input => {
        input.addEventListener('input', calculateTotalCost);
    });
    
    // Section checkbox toggles
    const sectionCheckboxes = document.querySelectorAll('[id^="section-"]');
    sectionCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const sectionId = this.id.replace('section-', '') + '-section';
            const section = document.getElementById(sectionId);
            if (section) {
                section.style.display = this.checked ? 'block' : 'none';
            }
        });
    });
}

/**
 * Initialize Variables Grid (deprecated - kept for compatibility)
 */
function initializeProposalVariablesGrid(company) {
    // This function is deprecated but kept for backwards compatibility
    // New proposal generator doesn't use this grid anymore
    console.log('📝 Proposal variables initialized for:', company.Company);
}

/**
 * Refresh the current tab content when company changes
 */
function refreshCurrentTabContent() {
    if (!leadDetailTabsInstance) {
        console.warn('⚠️ Tab instance not available');
        return;
    }
    
    const selectedIndex = leadDetailTabsInstance.selectedItem;
    console.log('🔄 Refreshing tab content for tab index:', selectedIndex);
    
    // Refresh based on which tab is currently active
    if (selectedIndex === 0) {
        // Profile tab - reinitialize with new company data
        initializeProfileTab();
    } else if (selectedIndex === 1) {
        // Touch's tab - reinitialize the grid with new company data
        initializeTouchesGrid();
    } else if (selectedIndex === 2) {
        // Site Overview tab - reinitialize with new company data
        initializeSiteOverviewTab();
    } else if (selectedIndex === 3) {
        // Proposals tab - reinitialize the proposals with new company data
        initializeProposalsTab();
    }
}

/**
 * Open a specific lead with a specific tab (for deep linking)
 */
function openLeadWithTab(companyName, leadIndex, tabIndex) {
    console.log('🔗 Deep linking to:', companyName, 'tab:', tabIndex);
    isDeepLinking = true;
    
    // Open the lead detail
    showLeadDetail(companyName, leadIndex);
    
    // Wait for tabs to be ready, then select the specified tab
    setTimeout(() => {
        if (window.leadDetailTabsInstance) {
            // Select the tab
            window.leadDetailTabsInstance.select(tabIndex);
            console.log('✅ Deep link tab selected:', tabIndex);
            
            // Now manually initialize the selected tab since we skipped it in the selected event
            setTimeout(() => {
                console.log('🎯 Manually initializing tab:', tabIndex);
                if (tabIndex === 0) {
                    initializeProfileTab();
                } else if (tabIndex === 1) {
                    initializeTouchesGrid();
                } else if (tabIndex === 2) {
                    initializeSiteOverviewTab();
                } else if (tabIndex === 3) {
                    initializeProposalsTab();
                }
                
                // Reset the flag after initialization
                setTimeout(() => {
                    isDeepLinking = false;
                    console.log('🏁 Deep linking complete');
                }, 100);
            }, 100);
        } else {
            console.error('❌ Tab instance not available for deep linking');
            isDeepLinking = false;
        }
    }, 400);
}

// Export functions and data
if (typeof window !== 'undefined') {
    window.initializeLeadsPage = initializeLeadsPage;
    window.leadsData = leadsData; // Export leadsData for use by other modules
    window.showLeadDetail = showLeadDetail; // Export for deep linking to proposals
    window.openLeadWithTab = openLeadWithTab; // Export for deep linking with specific tab
    window.leadDetailTabsInstance = null; // Will be set when tabs are initialized
    
    // Global wrapper functions for proposal actions
    window.generateCurrentProposalPDF = function() {
        console.log('🌍 Global generateCurrentProposalPDF called');
        if (currentLeadIndex !== null && leadsData[currentLeadIndex]) {
            generateProposalPDF(leadsData[currentLeadIndex]);
        } else {
            console.error('❌ No current lead selected');
            alert('Please select a company first');
        }
    };
    
    window.saveProposalDraft = function() {
        console.log('💾 Save proposal draft clicked');
        alert('💾 Proposal saved as draft!\n\nIn production, this would save to database for later editing.');
    };
    
    console.log('✅ Leads data exported to window:', leadsData.length, 'companies');
}

