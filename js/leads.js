/**
 * LEADS/CRM PAGE MODULE
 * Handles lead management with list view and detail view
 */

// Sample lead data matching the mockup
const leadsData = [
    { Company: 'Aalderson Cabinet Designs', Industry: 'Healthcare', City: 'Sarasota', Source: 'Cold Call', Solutions: '📧📞💬', Amount: '$12,000', Rep: 'Jack Stone', Status: 'hot', LastTouch: '1/12/2026', Touches: 5, FollowUp: '1/12/2026', NextStep: 'Call' },
    { Company: 'Aerowisp Technologies', Industry: 'Healthcare', City: 'Tampa', Source: 'Referral', Solutions: '📧📞💬📊', Amount: '$6,500', Rep: 'Gary Grumbles', Status: 'cold', LastTouch: '1/1/2026', Touches: 5, FollowUp: '1/1/2026', NextStep: '' },
    { Company: 'Blue Heron Capital', Industry: 'Healthcare', City: 'Bradenton', Source: 'Cold Call', Solutions: '📧📞', Amount: '$3,500', Rep: 'Bobby Finkelstein', Status: '', LastTouch: '', Touches: 8, FollowUp: '', NextStep: '' },
    { Company: 'CipherGuard Security', Industry: 'Finance', City: 'Bradenton', Source: 'Networking', Solutions: '📧📞💬', Amount: '$6,000', Rep: 'Bobby Finkelstein', Status: '', LastTouch: '', Touches: 3, FollowUp: '', NextStep: '' },
    { Company: 'Cobalt Creative', Industry: 'Technology', City: 'Sarasota', Source: 'Direct Mail', Solutions: '📧', Amount: '$8,500', Rep: 'Nina Novak', Status: '', LastTouch: '1/18/2026', Touches: 6, FollowUp: '1/18/2026', NextStep: '' },
    { Company: 'EchoValley Logistics', Industry: 'Finance', City: 'Clearwater', Source: 'Trade Show', Solutions: '📧📞💬📊', Amount: '$7,250', Rep: 'Gary Grumbles', Status: '', LastTouch: '1/6/2026', Touches: 9, FollowUp: '1/6/2026', NextStep: '' },
    { Company: 'Flux Innovations', Industry: 'Insurance', City: 'Tampa', Source: 'Direct Mail', Solutions: '📧📞', Amount: '$6,500', Rep: 'Nina Novak', Status: '', LastTouch: '', Touches: 5, FollowUp: '', NextStep: '' },
    { Company: 'Golden Hour Bakery', Industry: 'Technology', City: 'Clearwater', Source: 'Web Site', Solutions: '📧📞💬', Amount: '$1,500', Rep: 'Chip McFlair', Status: '', LastTouch: '', Touches: 6, FollowUp: '', NextStep: '' },
    { Company: 'Harbor Light Financial', Industry: 'Finance', City: 'Naples', Source: 'Email Campaign', Solutions: '📧📞', Amount: '$1,800', Rep: 'Bobby Finkelstein', Status: '', LastTouch: '', Touches: 4, FollowUp: '', NextStep: '' },
    { Company: 'Ironwood Construction', Industry: 'Retail', City: 'Naples', Source: 'Direct Mail', Solutions: '📧', Amount: '$9,800', Rep: 'Bobby Finkelstein', Status: '', LastTouch: '11/5/2025', Touches: 8, FollowUp: '11/5/2025', NextStep: '' },
    { Company: 'Luminous Energy', Industry: 'Retail', City: 'Pensacola', Source: 'Web Site', Solutions: '📧📞', Amount: '$6,200', Rep: 'Nina Novak', Status: '', LastTouch: '12/5/2025', Touches: 9, FollowUp: '12/5/2025', NextStep: '' },
    { Company: 'Mosaic Marketing', Industry: 'Retail', City: 'Pensacola', Source: 'Web Site', Solutions: '📧📞💬', Amount: '$3,200', Rep: 'Gary Grumbles', Status: '', LastTouch: '1/5/2026', Touches: 6, FollowUp: '1/5/2026', NextStep: '' },
    { Company: 'North Star Provisions', Industry: 'Retail', City: 'Fort Myers', Source: 'Seminare', Solutions: '📞', Amount: '$700', Rep: 'Chip McFlair', Status: '', LastTouch: '1/10/2026', Touches: 5, FollowUp: '1/10/2026', NextStep: '' },
    { Company: 'Nexus Systems', Industry: 'Retail', City: 'Bradenton', Source: 'Networking', Solutions: '📧📞💬📊', Amount: '$7,800', Rep: 'Chip McFlair', Status: '', LastTouch: '', Touches: 6, FollowUp: '', NextStep: '' },
    { Company: 'Oak & Anvil', Industry: 'Finance', City: 'Venice', Source: 'Referral', Solutions: '📧📞💬📊', Amount: '$16,000', Rep: 'Nina Novak', Status: '', LastTouch: '1/8/2026', Touches: 3, FollowUp: '1/8/2026', NextStep: '' },
    { Company: 'Paper Boat Publishing', Industry: 'Real Estate', City: 'Fort Myers', Source: 'Cold Call', Solutions: '📧📞💬', Amount: '$4,250', Rep: 'Gary Grumbles', Status: '', LastTouch: '1/18/2026', Touches: 2, FollowUp: '1/18/2026', NextStep: '' },
    { Company: 'Prismatic Labs', Industry: 'Construction', City: 'Tampa', Source: 'Seminare', Solutions: '📞', Amount: '$8,700', Rep: 'Bobby Finkelstein', Status: '', LastTouch: '', Touches: 9, FollowUp: '', NextStep: '' },
    { Company: 'Quasar Gaming', Industry: 'Healthcare', City: 'Boca Raton', Source: 'Seminare', Solutions: '📧📞💬📊', Amount: '$6,500', Rep: 'Gary Grumbles', Status: '', LastTouch: '', Touches: 6, FollowUp: '', NextStep: '' },
    { Company: 'Red Rock Ventures', Industry: 'Healthcare', City: 'Clearwater', Source: 'Seminare', Solutions: '📧📞💬📊', Amount: '$6,500', Rep: 'Gary Grumbles', Status: '', LastTouch: '', Touches: 6, FollowUp: '', NextStep: '' },
    { Company: 'Rolling Rock Venture', Industry: 'Construction', City: 'Tampa', Source: 'Referral', Solutions: '📧', Amount: '$1,800', Rep: 'Chip McFlair', Status: '', LastTouch: '', Touches: 8, FollowUp: '', NextStep: '' },
    { Company: 'Silverline Transport', Industry: 'Healthcare', City: 'Sarasota', Source: 'Networking', Solutions: '📧📞', Amount: '$29,600', Rep: 'Nina Novak', Status: '', LastTouch: '', Touches: 6, FollowUp: '', NextStep: '' },
    { Company: 'Solstice Wellness', Industry: 'Retail', City: 'Sarasota', Source: 'Cold Call', Solutions: '📧📞💬📊', Amount: '$14,000', Rep: 'Nina Novak', Status: '', LastTouch: '', Touches: 7, FollowUp: '', NextStep: '' },
    { Company: 'Stratum Dynamics', Industry: 'Retail', City: 'Sarasota', Source: 'Cold Call', Solutions: '📧', Amount: '$8,600', Rep: 'Bobby Finkelstein', Status: '', LastTouch: '12/8/2025', Touches: 6, FollowUp: '12/8/2025', NextStep: '' },
    { Company: 'Summit Peak Solutions', Industry: 'Construction', City: 'Clearwater', Source: 'Email Campaign', Solutions: '📧📞💬', Amount: '$1,300', Rep: 'Chip McFlair', Status: '', LastTouch: '1/19/2026', Touches: 3, FollowUp: '1/19/2026', NextStep: '' },
    { Company: 'The Gilded Composer', Industry: 'Construction', City: 'Tampa', Source: 'Direct Mail', Solutions: '📧📞', Amount: '$5,200', Rep: 'Chip McFlair', Status: '', LastTouch: '1/3/2026', Touches: 7, FollowUp: '1/3/2026', NextStep: '' },
    { Company: 'Urban Drift Apparel', Industry: 'Technology', City: 'Tampa', Source: 'Direct Mail', Solutions: '📧📞💬📊', Amount: '$4,300', Rep: 'Gary Grumbles', Status: '', LastTouch: '', Touches: 9, FollowUp: '', NextStep: '' },
    { Company: 'Velvet & Vine', Industry: 'Communications', City: 'Tampa', Source: 'Trade Show', Solutions: '📧📞💬📊', Amount: '$9,800', Rep: 'Nina Novak', Status: '', LastTouch: '', Touches: 4, FollowUp: '', NextStep: '' },
    { Company: 'Zenithco Analytics', Industry: 'Retail', City: 'Sarasota', Source: 'Cold Call', Solutions: '📧📞💬📊', Amount: '$6,400', Rep: 'Nina Novak', Status: '', LastTouch: '10/5/2025', Touches: 4, FollowUp: '10/5/2025', NextStep: '' }
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
            { 
                field: 'Solutions', 
                headerText: 'Solutions', 
                width: 90,
                template: '<div style="font-size: 16px; letter-spacing: 2px;">${Solutions}</div>'
            },
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
                { 
                    field: 'Solutions', 
                    headerText: 'Solutions', 
                    width: 100,
                    template: '<div style="font-size: 16px; letter-spacing: 2px;">${Solutions}</div>'
                },
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
            },
            {
                header: { text: 'Network Analysis' },
                content: '<div class="tab-content-section" id="networkAnalysisTabContent" style="padding: 0;"></div>'
            },
            {
                header: { text: 'Device Analysis' },
                content: '<div class="tab-content-section" id="deviceAnalysisTabContent" style="padding: 0;"></div>'
            },
            {
                header: { text: 'Network Access' },
                content: '<div class="tab-content-section" id="networkAccessTabContent" style="padding: 0;"></div>'
            },
            {
                header: { text: 'Software' },
                content: '<div class="tab-content-section" id="softwareTabContent" style="padding: 0;"></div>'
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
                // When Network Analysis tab is selected, initialize the network analysis
                if (args.selectedIndex === 4) {
                    initializeNetworkAnalysisTab();
                }
                // When Device Analysis tab is selected, initialize the device analysis
                if (args.selectedIndex === 5) {
                    initializeDeviceAnalysisTab();
                }
                // When Network Access tab is selected, initialize the network access
                if (args.selectedIndex === 6) {
                    initializeNetworkAccessTab();
                }
                // When Software tab is selected, initialize the software
                if (args.selectedIndex === 7) {
                    initializeSoftwareTabWrapper();
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
 * Initialize the Profile Tab - Matching Mockup Layout
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
    
    // Build profile HTML matching the mockup
    const profileHTML = `
        <div style="display: grid; grid-template-columns: 420px 1fr; gap: 20px; padding: 20px; height: 100%;">
            <!-- Left Side: Client Information -->
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); overflow-y: auto;">
                <!-- Client Header -->
                <div style="margin-bottom: 25px; padding-bottom: 20px; border-bottom: 1px solid #e0e0e0;">
                    <h3 style="margin: 0 0 5px 0; font-size: 16px; font-weight: 600; color: #333;">Client</h3>
                    <div style="font-size: 14px; color: #0066cc; margin-bottom: 3px;">${currentCompany.Company}</div>
                    <div style="font-size: 13px; color: #666;">1234 Main St</div>
                    <div style="font-size: 13px; color: #666;">${currentCompany.City}, FL 34232</div>
                </div>

                <!-- Services Section -->
                <div style="margin-bottom: 25px; padding-bottom: 20px; border-bottom: 1px solid #e0e0e0;">
                    <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600; color: #333;">Services</h3>
                    <div style="font-size: 13px; color: #666; line-height: 1.8;">
                        <div>MSP</div>
                        <div>Copier/Print</div>
                        <div>VoIP</div>
                    </div>
                </div>

                <!-- Contact's Section -->
                <div style="margin-bottom: 25px; padding-bottom: 20px; border-bottom: 1px solid #e0e0e0;">
                    <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600; color: #333;">Contact's</h3>
                    <table style="width: 100%; font-size: 12px; border-collapse: collapse;">
                        <thead>
                            <tr style="background: #f5f5f5;">
                                <th style="padding: 8px 5px; text-align: left; font-weight: 600; border-bottom: 1px solid #ddd;">Name</th>
                                <th style="padding: 8px 5px; text-align: left; font-weight: 600; border-bottom: 1px solid #ddd;">Title</th>
                                <th style="padding: 8px 5px; text-align: left; font-weight: 600; border-bottom: 1px solid #ddd;">Email</th>
                                <th style="padding: 8px 5px; text-align: left; font-weight: 600; border-bottom: 1px solid #ddd;">Office</th>
                                <th style="padding: 8px 5px; text-align: left; font-weight: 600; border-bottom: 1px solid #ddd;">Cell</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 10px 5px; color: #0066cc;">Jessica Smithfield</td>
                                <td style="padding: 10px 5px; color: #666;">Owner</td>
                                <td style="padding: 10px 5px; color: #0066cc;">Jessica.Smithfield@BlueHeronCapital.co</td>
                                <td style="padding: 10px 5px; color: #0066cc;">(813) 908-541</td>
                                <td style="padding: 10px 5px; color: #0066cc;">(813) 431-511</td>
                            </tr>
                            <tr style="background: #e8f4ff;">
                                <td style="padding: 10px 5px; color: #0066cc; font-weight: 600;">Mark Ryburn</td>
                                <td style="padding: 10px 5px; color: #666;">IT</td>
                                <td style="padding: 10px 5px; color: #0066cc;">Mark.Ryburn@BlueHeronCapital.com</td>
                                <td style="padding: 10px 5px; color: #0066cc;">(813) 908-628</td>
                                <td style="padding: 10px 5px; color: #0066cc;">(813) 431-414</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Default Site Settings -->
                <div style="margin-bottom: 20px;">
                    <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600; color: #333;">Default Site Settings</h3>
                    <div style="font-size: 12px; line-height: 2;">
                        <div style="display: grid; grid-template-columns: 100px 1fr; gap: 5px;">
                            <span style="font-weight: 600;">Login Type</span>
                            <span style="color: #0066cc;">Entrra ID</span>
                            
                            <span style="font-weight: 600;">Public</span>
                            <span style="color: #0066cc;">72.186.117.61</span>
                            
                            <span style="font-weight: 600;">Private</span>
                            <span style="color: #0066cc;">192.168.1.x</span>
                            
                            <span style="font-weight: 600;">DNS</span>
                            <span style="color: #0066cc;">192.168.1.1</span>
                            
                            <span style="font-weight: 600;">DHCP</span>
                            <span style="color: #0066cc;">192.168.1.10 ~ 100</span>
                        </div>
                        
                        <div style="margin-top: 15px; display: grid; grid-template-columns: 100px 1fr; gap: 5px;">
                            <span style="font-weight: 600;">Antivirus</span>
                            <span style="color: #0066cc;">SentinelOne</span>
                            
                            <span style="font-weight: 600;">Mapped Drives</span>
                            <span style="color: #0066cc;">Admin (\\SharePoint\Sites) (S:</span>
                            
                            <span></span>
                            <span style="color: #0066cc;">HR (\\Server) (H:)</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Side: Schedule, Tasks, and Actions -->
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); display: flex; flex-direction: column;">
                <!-- Top Tabs -->
                <div style="display: flex; gap: 2px; margin-bottom: 20px; border-bottom: 2px solid #e0e0e0;">
                    <button class="profile-right-tab active" data-righttab="schedule" style="padding: 12px 24px; background: white; border: none; border-bottom: 3px solid #0066cc; color: #0066cc; font-weight: 600; cursor: pointer; font-size: 14px;">Schedule</button>
                    <button class="profile-right-tab" data-righttab="tasks" style="padding: 12px 24px; background: white; border: none; border-bottom: 3px solid transparent; color: #666; font-weight: 600; cursor: pointer; font-size: 14px;">Tasks</button>
                    <button class="profile-right-tab" data-righttab="summary" style="padding: 12px 24px; background: white; border: none; border-bottom: 3px solid transparent; color: #666; font-weight: 600; cursor: pointer; font-size: 14px;">Client AI Summary</button>
                    <button class="profile-right-tab" data-righttab="report" style="padding: 12px 24px; background: white; border: none; border-bottom: 3px solid transparent; color: #666; font-weight: 600; cursor: pointer; font-size: 14px;">Dark Web Report</button>
                </div>

                <!-- Schedule Tab Content -->
                <div id="profile-righttab-schedule" class="profile-righttab-content" style="flex: 1; overflow-y: auto;">
                    <!-- Gather Data On Client To Review -->
                    <div style="margin-bottom: 20px; border: 1px solid #ddd; border-radius: 6px;">
                        <div style="padding: 12px 15px; background: #f8f8f8; border-bottom: 1px solid #ddd; display: flex; align-items: center; gap: 8px; cursor: pointer;" onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'block' : 'none'">
                            <span style="font-weight: 600; font-size: 14px;">▶ Gather Data On Client To Review</span>
                        </div>
                        <div style="padding: 15px; display: block;">
                            <div style="font-size: 13px; line-height: 2; color: #666;">
                                <div style="padding: 5px 0; border-bottom: 1px dotted #ddd;">Web Site</div>
                                <div style="padding: 5px 0; border-bottom: 1px dotted #ddd;">LinkedIn</div>
                                <div style="padding: 5px 0; border-bottom: 1px dotted #ddd;">References</div>
                                <div style="padding: 5px 0; display: flex; justify-content: space-between;">
                                    <span>Other</span>
                                    <span style="color: #999;">???...</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Set "Initial Meeting" -->
                    <div style="margin-bottom: 20px; border: 1px solid #ddd; border-radius: 6px;">
                        <div style="padding: 12px 15px; background: #f8f8f8; border-bottom: 1px solid #ddd; display: flex; align-items: center; gap: 8px; cursor: pointer;" onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'block' : 'none'">
                            <span style="font-weight: 600; font-size: 14px;">▶ Set "Initial Meeting"</span>
                        </div>
                        <div style="padding: 15px; display: block;">
                            <div style="font-size: 13px; line-height: 2; color: #666;">
                                <div style="padding: 5px 0; display: flex; justify-content: space-between; border-bottom: 1px dotted #ddd;">
                                    <span>Identify Team</span>
                                    <span style="color: #999; font-style: italic;">determine the Rep, Backoffice, vCIO</span>
                                </div>
                                <div style="padding: 5px 0; display: flex; justify-content: space-between; border-bottom: 1px dotted #ddd;">
                                    <span>Review "Data" with team</span>
                                </div>
                                <div style="padding: 5px 0; display: flex; justify-content: space-between; border-bottom: 1px dotted #ddd;">
                                    <span>Identify Client's Needs</span>
                                    <span style="color: #999; font-style: italic;">identify if needs are: Regulatory, MSP Responsivenes...</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Present "Initial Meeting" -->
                    <div style="margin-bottom: 20px; border: 1px solid #ddd; border-radius: 6px;">
                        <div style="padding: 12px 15px; background: #f8f8f8; border-bottom: 1px solid #ddd; display: flex; align-items: center; gap: 8px; cursor: pointer;" onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'block' : 'none'">
                            <span style="font-weight: 600; font-size: 14px;">▶ Present "Initial Meeting"</span>
                        </div>
                        <div style="padding: 15px; display: block;">
                            <div style="font-size: 13px; line-height: 2; color: #666;">
                                <div style="padding: 5px 0; display: flex; justify-content: space-between; border-bottom: 1px dotted #ddd;">
                                    <span>Present MSP Presentation</span>
                                    <span style="color: #999; font-style: italic;">Presentation on Why MSP & Why</span>
                                </div>
                                <div style="padding: 5px 0; display: flex; justify-content: space-between; border-bottom: 1px dotted #ddd;">
                                    <span>Install Data Collect Agent On Endpoints</span>
                                    <span style="color: #999; font-style: italic;">determine if Web Based or Local Agent</span>
                                </div>
                                <div style="padding: 5px 0; border-bottom: 1px dotted #ddd;">
                                    <span>Set "Present Propsal" Meeting</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Review "Initial Meeting" -->
                    <div style="margin-bottom: 20px; border: 1px solid #ddd; border-radius: 6px;">
                        <div style="padding: 12px 15px; background: #f8f8f8; border-bottom: 1px solid #ddd; display: flex; align-items: center; gap: 8px; cursor: pointer;" onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'block' : 'none'">
                            <span style="font-weight: 600; font-size: 14px;">▶ Review "Initial Meeting"</span>
                        </div>
                        <div style="padding: 15px; display: block;">
                            <div style="font-size: 13px; line-height: 2; color: #666;">
                                <div style="padding: 5px 0; display: flex; justify-content: space-between; border-bottom: 1px dotted #ddd;">
                                    <span>Presentation</span>
                                    <span style="color: #999; font-style: italic;">Presentation on Why MSP & Why</span>
                                </div>
                                <div style="padding: 5px 0; border-bottom: 1px dotted #ddd;">
                                    <span>Collect Endpoint Data</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Tasks Tab Content (Hidden by default) -->
                <div id="profile-righttab-tasks" class="profile-righttab-content" style="flex: 1; overflow-y: auto; display: none;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; gap: 10px; flex-wrap: wrap;">
                        <h3 style="margin: 0; color: #2c3e50;">Tasks for ${currentCompany.Company}</h3>
                        <div style="display: flex; gap: 8px; align-items: center;">
                            <select id="profileTaskFilter" style="padding: 7px 10px; border: 1px solid #dcdcdc; border-radius: 6px; font-size: 12px;">
                                <option value="all">All Statuses</option>
                                <option value="open">Open</option>
                                <option value="in-progress">In Progress</option>
                                <option value="blocked">Blocked</option>
                                <option value="done">Done</option>
                            </select>
                            <button id="addProfileTaskBtn" class="e-btn e-primary e-small">+ Add Task</button>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: repeat(4, minmax(120px, 1fr)); gap: 10px; margin-bottom: 14px;">
                        <div style="background: #eef6ff; border: 1px solid #d5e9ff; border-radius: 8px; padding: 12px;">
                            <div style="font-size: 12px; color: #5f6b7a;">Open</div>
                            <div id="profileTaskOpenCount" style="font-size: 22px; font-weight: 700; color: #1b4f9c;">3</div>
                        </div>
                        <div style="background: #fff8ea; border: 1px solid #ffe1a8; border-radius: 8px; padding: 12px;">
                            <div style="font-size: 12px; color: #7d6224;">In Progress</div>
                            <div id="profileTaskInProgressCount" style="font-size: 22px; font-weight: 700; color: #9a6a00;">2</div>
                        </div>
                        <div style="background: #fff2f2; border: 1px solid #ffd5d5; border-radius: 8px; padding: 12px;">
                            <div style="font-size: 12px; color: #7d2f2f;">Blocked</div>
                            <div id="profileTaskBlockedCount" style="font-size: 22px; font-weight: 700; color: #b32222;">1</div>
                        </div>
                        <div style="background: #ecfff2; border: 1px solid #c7f2d7; border-radius: 8px; padding: 12px;">
                            <div style="font-size: 12px; color: #256842;">Done</div>
                            <div id="profileTaskDoneCount" style="font-size: 22px; font-weight: 700; color: #0f8a49;">2</div>
                        </div>
                    </div>

                    <div style="border: 1px solid #e4e4e4; border-radius: 8px; overflow: hidden;">
                        <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                            <thead>
                                <tr style="background: #f6f8fa;">
                                    <th style="padding: 10px 8px; text-align: left; border-bottom: 1px solid #e4e4e4;">Done</th>
                                    <th style="padding: 10px 8px; text-align: left; border-bottom: 1px solid #e4e4e4;">Task</th>
                                    <th style="padding: 10px 8px; text-align: left; border-bottom: 1px solid #e4e4e4;">Owner</th>
                                    <th style="padding: 10px 8px; text-align: left; border-bottom: 1px solid #e4e4e4;">Due</th>
                                    <th style="padding: 10px 8px; text-align: left; border-bottom: 1px solid #e4e4e4;">Status</th>
                                </tr>
                            </thead>
                            <tbody id="profileTaskTableBody">
                                <tr data-status="open">
                                    <td style="padding: 10px 8px; border-bottom: 1px solid #f0f0f0;"><input type="checkbox" class="profile-task-checkbox"></td>
                                    <td style="padding: 10px 8px; border-bottom: 1px solid #f0f0f0;">Confirm stakeholder list for kickoff</td>
                                    <td style="padding: 10px 8px; border-bottom: 1px solid #f0f0f0;">${currentCompany.Rep || 'Unassigned'}</td>
                                    <td style="padding: 10px 8px; border-bottom: 1px solid #f0f0f0;">2/28/2026</td>
                                    <td style="padding: 10px 8px; border-bottom: 1px solid #f0f0f0;"><span style="background:#eef6ff;color:#1b4f9c;padding:2px 8px;border-radius:10px;">Open</span></td>
                                </tr>
                                <tr data-status="in-progress">
                                    <td style="padding: 10px 8px; border-bottom: 1px solid #f0f0f0;"><input type="checkbox" class="profile-task-checkbox"></td>
                                    <td style="padding: 10px 8px; border-bottom: 1px solid #f0f0f0;">Gather endpoint inventory export</td>
                                    <td style="padding: 10px 8px; border-bottom: 1px solid #f0f0f0;">Back Office</td>
                                    <td style="padding: 10px 8px; border-bottom: 1px solid #f0f0f0;">3/01/2026</td>
                                    <td style="padding: 10px 8px; border-bottom: 1px solid #f0f0f0;"><span style="background:#fff8ea;color:#9a6a00;padding:2px 8px;border-radius:10px;">In Progress</span></td>
                                </tr>
                                <tr data-status="blocked">
                                    <td style="padding: 10px 8px; border-bottom: 1px solid #f0f0f0;"><input type="checkbox" class="profile-task-checkbox"></td>
                                    <td style="padding: 10px 8px; border-bottom: 1px solid #f0f0f0;">Validate DNS records with ISP</td>
                                    <td style="padding: 10px 8px; border-bottom: 1px solid #f0f0f0;">Network Team</td>
                                    <td style="padding: 10px 8px; border-bottom: 1px solid #f0f0f0;">3/02/2026</td>
                                    <td style="padding: 10px 8px; border-bottom: 1px solid #f0f0f0;"><span style="background:#fff2f2;color:#b32222;padding:2px 8px;border-radius:10px;">Blocked</span></td>
                                </tr>
                                <tr data-status="done">
                                    <td style="padding: 10px 8px; border-bottom: 1px solid #f0f0f0;"><input type="checkbox" class="profile-task-checkbox" checked></td>
                                    <td style="padding: 10px 8px; border-bottom: 1px solid #f0f0f0;">Schedule initial meeting</td>
                                    <td style="padding: 10px 8px; border-bottom: 1px solid #f0f0f0;">${currentCompany.Rep || 'Unassigned'}</td>
                                    <td style="padding: 10px 8px; border-bottom: 1px solid #f0f0f0;">2/25/2026</td>
                                    <td style="padding: 10px 8px; border-bottom: 1px solid #f0f0f0;"><span style="background:#ecfff2;color:#0f8a49;padding:2px 8px;border-radius:10px;">Done</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Client AI Summary Tab Content (Hidden by default) -->
                <div id="profile-righttab-summary" class="profile-righttab-content" style="flex: 1; overflow-y: auto; display: none;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; gap: 8px; flex-wrap: wrap;">
                        <h3 style="margin: 0; color: #2c3e50;">Client AI Summary</h3>
                        <div style="display: flex; gap: 8px;">
                            <button id="generateClientSummaryBtn" class="e-btn e-primary e-small">Generate Summary</button>
                            <button id="copyClientSummaryBtn" class="e-btn e-outline e-small">Copy</button>
                        </div>
                    </div>

                    <div id="clientSummaryStatus" style="font-size: 12px; color: #6c757d; margin-bottom: 10px;">
                        Click "Generate Summary" to research this company.
                    </div>

                    <div id="clientSummaryOutput" style="line-height: 1.6; font-size: 13px; color: #2c3e50; background: white; border: 1px solid #e3e7eb; border-radius: 8px; padding: 14px; min-height: 260px;">
                        <div style="background:#f7f9fc; border:1px dashed #c9d4e0; color:#607080; border-radius:8px; padding:14px;">
                            No summary generated yet.
                        </div>
                    </div>
                </div>

                <!-- Dark Web Report Tab Content (Hidden by default) -->
                <div id="profile-righttab-report" class="profile-righttab-content" style="flex: 1; overflow-y: auto; display: none;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; gap: 10px; flex-wrap: wrap;">
                        <h3 style="margin: 0; color: #2c3e50;">Dark Web Report — ${currentCompany.Company}</h3>
                        <div style="display: flex; gap: 8px; align-items: center;">
                            <span id="darkWebLastScan" style="font-size: 12px; color: #6c757d;">Last scan: —</span>
                            <button id="runDarkWebScanBtn" class="e-btn e-primary e-small">Run Scan</button>
                        </div>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(4, minmax(100px, 1fr)); gap: 10px; margin-bottom: 16px;">
                        <div style="background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px; padding: 12px;">
                            <div style="font-size: 12px; color: #5f6b7a;">Risk Level</div>
                            <div id="darkWebRiskLevel" style="font-size: 18px; font-weight: 700; color: #2c3e50;">—</div>
                        </div>
                        <div style="background: #fff2f2; border: 1px solid #ffd5d5; border-radius: 8px; padding: 12px;">
                            <div style="font-size: 12px; color: #7d2f2f;">Exposed Credentials</div>
                            <div id="darkWebExposedCount" style="font-size: 22px; font-weight: 700; color: #b32222;">0</div>
                        </div>
                        <div style="background: #fff8ea; border: 1px solid #ffe1a8; border-radius: 8px; padding: 12px;">
                            <div style="font-size: 12px; color: #7d6224;">Breached Emails</div>
                            <div id="darkWebBreachedCount" style="font-size: 22px; font-weight: 700; color: #9a6a00;">0</div>
                        </div>
                        <div style="background: #eef6ff; border: 1px solid #d5e9ff; border-radius: 8px; padding: 12px;">
                            <div style="font-size: 12px; color: #1b4f9c;">Domains Monitored</div>
                            <div id="darkWebDomainsCount" style="font-size: 22px; font-weight: 700; color: #0066cc;">0</div>
                        </div>
                    </div>
                    <div style="margin-bottom: 10px; font-size: 13px; font-weight: 600; color: #2c3e50;">Findings</div>
                    <div style="border: 1px solid #e4e4e4; border-radius: 8px; overflow: hidden;">
                        <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                            <thead>
                                <tr style="background: #f6f8fa;">
                                    <th style="padding: 10px 8px; text-align: left; border-bottom: 1px solid #e4e4e4;">Type</th>
                                    <th style="padding: 10px 8px; text-align: left; border-bottom: 1px solid #e4e4e4;">Value / Domain</th>
                                    <th style="padding: 10px 8px; text-align: left; border-bottom: 1px solid #e4e4e4;">Source</th>
                                    <th style="padding: 10px 8px; text-align: left; border-bottom: 1px solid #e4e4e4;">Detected</th>
                                </tr>
                            </thead>
                            <tbody id="darkWebFindingsBody">
                                <tr><td colspan="4" style="padding: 24px; text-align: center; color: #6c757d;">No scan run yet. Click "Run Scan" to check for exposed credentials and breaches.</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    profileContainer.innerHTML = profileHTML;
    
    // Set up right-side tab navigation and tasks interactions
    setupProfileRightTabs(currentCompany);
    setupProfileTasksTab();
    setupClientAISummaryTab(currentCompany);
    setupDarkWebReportTab(currentCompany);
    
    console.log('✅ Profile tab initialized for:', currentCompany.Company);
}

/**
 * Setup Profile Right-Side Tab Navigation
 */
function setupProfileRightTabs(currentCompany) {
    const tabs = document.querySelectorAll('.profile-right-tab');
    const contents = document.querySelectorAll('.profile-righttab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-righttab');
            
            // Update tab styles
            tabs.forEach(t => {
                t.style.borderBottomColor = 'transparent';
                t.style.color = '#666';
            });
            this.style.borderBottomColor = '#0066cc';
            this.style.color = '#0066cc';
            
            // Show/hide content
            contents.forEach(content => {
                content.style.display = 'none';
            });
            const targetContent = document.getElementById(`profile-righttab-${targetTab}`);
            if (targetContent) {
                targetContent.style.display = 'block';
                if (targetTab === 'summary' && currentCompany) {
                    initializeClientAISummaryPrompt(currentCompany);
                }
            }
        });
    });
}

function getGeminiApiKey() {
    return (
        window.CONFIG?.GEMINI_API_KEY ||
        localStorage.getItem('gemini_api_key') ||
        localStorage.getItem('geminiApiKey') ||
        ''
    );
}

function buildClientResearchPrompt(company) {
    return `Research company intelligence for "${company.Company}".

Known CRM context:
- Company: ${company.Company}
- Industry: ${company.Industry || 'Unknown'}
- City: ${company.City || 'Unknown'}
- Lead Source: ${company.Source || 'Unknown'}
- Account Rep: ${company.Rep || 'Unknown'}

Return a concise professional report with these sections:
1) Company Overview (what they do, headquarters, founded year)
2) Ownership & Leadership (owners/founders/executives)
3) Company Size (employee range)
4) Estimated Financials (revenue range if available)
5) Technology Footprint (likely stack, tools, security posture hints)
6) Recent Signals (news, hiring, funding, expansion, risks)
7) Sales Talking Points for an MSP (3-5 bullets)
8) Confidence & Gaps (what is verified vs unknown)

Rules:
- Do not invent facts.
- If data is unavailable, state "Unknown".
- Prefer bullet points and short paragraphs.
- Include a final "Suggested Discovery Questions" list (5 questions).`;
}

function initializeClientAISummaryPrompt(company) {
    // Prompt is intentionally hidden from UI per product request.
    // Keep this function to preserve call sites and future optional debug views.
    void company;
}

async function fetchClientAISummaryFromGemini(company) {
    const apiKey = getGeminiApiKey();
    if (!apiKey) {
        throw new Error('Gemini API key not found. Add GEMINI_API_KEY to config.js.');
    }

    const prompt = buildClientResearchPrompt(company);
    const API_BASE = 'https://generativelanguage.googleapis.com';
    const versionsToTry = ['v1', 'v1beta'];
    let lastError = 'Unknown Gemini error';
    const discoveredModels = [];

    function normalizeModelName(name) {
        return name.startsWith('models/') ? name : `models/${name}`;
    }

    function scoreModel(name) {
        const lower = name.toLowerCase();
        if (lower.includes('gemini-2.5-flash')) return 100;
        if (lower.includes('gemini-2.0-flash')) return 95;
        if (lower.includes('gemini-1.5-flash')) return 90;
        if (lower.includes('gemini-1.5-pro')) return 80;
        if (lower.includes('gemini') && lower.includes('flash')) return 70;
        if (lower.includes('gemini')) return 50;
        return 0;
    }

    for (const apiVersion of versionsToTry) {
        const listUrl = `${API_BASE}/${apiVersion}/models?key=${encodeURIComponent(apiKey)}`;
        try {
            const listResp = await fetch(listUrl);
            if (!listResp.ok) {
                const txt = await listResp.text();
                lastError = `ListModels ${apiVersion} failed (${listResp.status}): ${txt.slice(0, 140)}`;
                continue;
            }

            const listData = await listResp.json();
            const models = (listData.models || [])
                .filter(model => Array.isArray(model.supportedGenerationMethods) && model.supportedGenerationMethods.includes('generateContent'))
                .map(model => normalizeModelName(model.name))
                .filter(name => name.toLowerCase().includes('gemini'))
                .sort((a, b) => scoreModel(b) - scoreModel(a));

            models.forEach(modelName => discoveredModels.push({ apiVersion, modelName }));
        } catch (error) {
            lastError = `ListModels ${apiVersion} network error: ${error.message}`;
        }
    }

    if (discoveredModels.length === 0) {
        throw new Error(`No compatible Gemini model found from ListModels. ${lastError}`);
    }

    async function generateWithCandidate(candidateModel, basePrompt) {
        const endpoint = `${API_BASE}/${candidateModel.apiVersion}/${candidateModel.modelName}:generateContent?key=${encodeURIComponent(apiKey)}`;
        let combined = '';
        let currentPrompt = basePrompt;
        const maxChunks = 4; // Prevent runaway continuation loops

        for (let chunkIndex = 0; chunkIndex < maxChunks; chunkIndex++) {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: currentPrompt }] }],
                    generationConfig: {
                        temperature: 0.2,
                        maxOutputTokens: 4096
                    }
                })
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(`${candidateModel.modelName} (${candidateModel.apiVersion}) failed (${response.status}): ${errText.slice(0, 160)}`);
            }

            const data = await response.json();
            const candidateData = data?.candidates?.[0];
            const textChunk = (candidateData?.content?.parts || [])
                .map(part => part.text || '')
                .join('\n')
                .trim();
            const finishReason = candidateData?.finishReason || '';

            if (!textChunk) {
                throw new Error(`${candidateModel.modelName} returned empty response.`);
            }

            combined += (combined ? '\n\n' : '') + textChunk;

            // Continue only when the model explicitly stopped due to max token limit.
            if (finishReason === 'MAX_TOKENS') {
                currentPrompt = `Continue exactly where you left off from the previous response for "${company.Company}". Do not repeat previous content. Output only the continuation text.`;
                continue;
            }

            return combined;
        }

        return combined;
    }

    for (const candidate of discoveredModels) {
        try {
            const text = await generateWithCandidate(candidate, prompt);
            if (text) {
                return text;
            }
            lastError = `${candidate.modelName} returned empty response.`;
        } catch (error) {
            lastError = error.message || String(error);
        }
    }

    throw new Error(`No compatible Gemini model found. Last error: ${lastError}`);
}

function setupClientAISummaryTab(company) {
    initializeClientAISummaryPrompt(company);

    const generateBtn = document.getElementById('generateClientSummaryBtn');
    const copyBtn = document.getElementById('copyClientSummaryBtn');
    const output = document.getElementById('clientSummaryOutput');
    const status = document.getElementById('clientSummaryStatus');

    if (!generateBtn || !output || !status) return;

    generateBtn.addEventListener('click', async () => {
        const original = generateBtn.textContent;
        generateBtn.disabled = true;
        generateBtn.textContent = 'Generating...';
        status.textContent = `Researching ${company.Company} with Gemini...`;

        try {
            const summary = await fetchClientAISummaryFromGemini(company);
            output.dataset.rawSummary = summary;
            output.innerHTML = renderLeadClientSummary(summary);
            status.textContent = `Summary generated for ${company.Company}.`;
        } catch (error) {
            output.dataset.rawSummary = '';
            output.innerHTML = '';
            status.textContent = `Error: ${error.message}`;
        } finally {
            generateBtn.disabled = false;
            generateBtn.textContent = original;
        }
    });

    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(output.dataset.rawSummary || output.textContent || '');
                status.textContent = 'Summary copied to clipboard.';
            } catch (error) {
                status.textContent = 'Unable to copy summary.';
            }
        });
    }
}

/**
 * Setup Dark Web Report tab: wire Run Scan and display mock/sample findings
 */
function setupDarkWebReportTab(company) {
    const runBtn = document.getElementById('runDarkWebScanBtn');
    const lastScanEl = document.getElementById('darkWebLastScan');
    const riskEl = document.getElementById('darkWebRiskLevel');
    const exposedEl = document.getElementById('darkWebExposedCount');
    const breachedEl = document.getElementById('darkWebBreachedCount');
    const domainsEl = document.getElementById('darkWebDomainsCount');
    const tbody = document.getElementById('darkWebFindingsBody');
    if (!runBtn || !tbody) return;

    runBtn.addEventListener('click', () => {
        const now = new Date();
        const scanDateStr = now.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
        if (lastScanEl) lastScanEl.textContent = `Last scan: ${scanDateStr}`;

        // Sample findings for demo (domain derived from company name)
        const domain = (company.Company || '').replace(/\s+/g, '').toLowerCase() + '.com';
        const findings = [
            { type: 'Email', value: `contact@${domain}`, source: 'Breach (2023)', detected: 'Jan 2024' },
            { type: 'Credential', value: `admin@${domain}`, source: 'Paste site', detected: 'Feb 2024' },
            { type: 'Domain', value: domain, source: 'Monitoring', detected: scanDateStr }
        ];

        if (riskEl) riskEl.textContent = findings.length > 0 ? 'Medium' : 'Low';
        if (exposedEl) exposedEl.textContent = '1';
        if (breachedEl) breachedEl.textContent = String(findings.filter(f => f.type === 'Email' || f.source.includes('Breach')).length);
        if (domainsEl) domainsEl.textContent = '1';

        tbody.innerHTML = findings.map(f => `
            <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 10px 8px;">${f.type}</td>
                <td style="padding: 10px 8px; color: #0066cc;">${f.value}</td>
                <td style="padding: 10px 8px;">${f.source}</td>
                <td style="padding: 10px 8px;">${f.detected}</td>
            </tr>
        `).join('');
    });
}

function escapeLeadSummaryHtml(text) {
    return String(text || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function normalizeLeadSummaryInlineMarkdown(text) {
    const escaped = escapeLeadSummaryHtml(text);
    return escaped
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
}

function renderLeadClientSummary(rawText) {
    const lines = String(rawText || '')
        .split('\n')
        .map(line => line.trim());

    const sections = [];
    let currentSection = { title: 'Executive Summary', content: [] };

    const isHeading = (line) =>
        /^\*\*.+\*\*$/.test(line) ||
        /^\d+\)\s+.+/.test(line) ||
        /^[A-Za-z][A-Za-z0-9\s&/-]{2,}:\s*$/.test(line);

    const cleanHeading = (line) =>
        line
            .replace(/^\*\*/, '')
            .replace(/\*\*$/, '')
            .replace(/^\d+\)\s+/, '')
            .replace(/:\s*$/, '')
            .trim();

    for (const line of lines) {
        if (!line) {
            currentSection.content.push({ type: 'spacer', value: '' });
            continue;
        }

        if (isHeading(line)) {
            if (currentSection.content.length > 0) {
                sections.push(currentSection);
            }
            currentSection = { title: cleanHeading(line), content: [] };
            continue;
        }

        if (/^[-*•]\s+/.test(line)) {
            currentSection.content.push({ type: 'bullet', value: line.replace(/^[-*•]\s+/, '') });
            continue;
        }

        const keyValueMatch = line.match(/^\*\*?([^:*]{2,})\*?\*?:\s+(.+)$/);
        if (keyValueMatch) {
            currentSection.content.push({
                type: 'kv',
                key: keyValueMatch[1].trim(),
                value: keyValueMatch[2].trim()
            });
            continue;
        }

        currentSection.content.push({ type: 'text', value: line });
    }

    if (currentSection.content.length > 0) {
        sections.push(currentSection);
    }

    const cards = sections.map(section => {
        const body = section.content.map(item => {
            if (item.type === 'bullet') {
                return `<div style="display:flex; gap:8px; margin:6px 0;"><span style="color:#3498db;">•</span><span>${normalizeLeadSummaryInlineMarkdown(item.value)}</span></div>`;
            }
            if (item.type === 'kv') {
                return `<div style="display:grid; grid-template-columns:170px 1fr; gap:8px; margin:6px 0;"><div style="font-weight:600; color:#2f3f52;">${escapeLeadSummaryHtml(item.key)}</div><div>${normalizeLeadSummaryInlineMarkdown(item.value)}</div></div>`;
            }
            if (item.type === 'spacer') {
                return '<div style="height:6px;"></div>';
            }
            return `<p style="margin:6px 0; line-height:1.6;">${normalizeLeadSummaryInlineMarkdown(item.value)}</p>`;
        }).join('');

        return `
            <section style="background:#fff; border:1px solid #e3e7eb; border-radius:10px; padding:12px 14px; margin-bottom:10px; box-shadow:0 1px 2px rgba(0,0,0,0.03);">
                <h4 style="margin:0 0 8px 0; color:#1f2d3d; font-size:15px; border-left:3px solid #3498db; padding-left:8px;">
                    ${escapeLeadSummaryHtml(section.title)}
                </h4>
                <div style="font-size:13px; color:#2c3e50;">
                    ${body}
                </div>
            </section>
        `;
    }).join('');

    return `
        <div style="background:#f7f9fc; border:1px solid #dde5ef; border-radius:10px; padding:10px;">
            ${cards || '<p style="margin:0;">No summary available.</p>'}
        </div>
    `;
}

/**
 * Setup interactions for Profile Tasks tab
 */
function setupProfileTasksTab() {
    const filter = document.getElementById('profileTaskFilter');
    const tableBody = document.getElementById('profileTaskTableBody');
    const addTaskBtn = document.getElementById('addProfileTaskBtn');

    if (!tableBody) return;

    function updateCounts() {
        const rows = Array.from(tableBody.querySelectorAll('tr'));
        const counts = { open: 0, 'in-progress': 0, blocked: 0, done: 0 };
        rows.forEach(row => {
            const status = row.getAttribute('data-status');
            if (counts[status] !== undefined) counts[status] += 1;
        });

        const openEl = document.getElementById('profileTaskOpenCount');
        const progressEl = document.getElementById('profileTaskInProgressCount');
        const blockedEl = document.getElementById('profileTaskBlockedCount');
        const doneEl = document.getElementById('profileTaskDoneCount');
        if (openEl) openEl.textContent = String(counts.open);
        if (progressEl) progressEl.textContent = String(counts['in-progress']);
        if (blockedEl) blockedEl.textContent = String(counts.blocked);
        if (doneEl) doneEl.textContent = String(counts.done);
    }

    if (filter) {
        filter.addEventListener('change', function() {
            const selected = this.value;
            const rows = tableBody.querySelectorAll('tr');
            rows.forEach(row => {
                const status = row.getAttribute('data-status');
                row.style.display = selected === 'all' || selected === status ? '' : 'none';
            });
        });
    }

    tableBody.addEventListener('change', function(event) {
        const target = event.target;
        if (!(target instanceof HTMLInputElement) || !target.classList.contains('profile-task-checkbox')) return;

        const row = target.closest('tr');
        if (!row) return;

        if (target.checked) {
            row.setAttribute('data-status', 'done');
            row.cells[4].innerHTML = '<span style="background:#ecfff2;color:#0f8a49;padding:2px 8px;border-radius:10px;">Done</span>';
            row.style.opacity = '0.75';
        } else {
            row.setAttribute('data-status', 'open');
            row.cells[4].innerHTML = '<span style="background:#eef6ff;color:#1b4f9c;padding:2px 8px;border-radius:10px;">Open</span>';
            row.style.opacity = '1';
        }
        updateCounts();
    });

    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', function() {
            const newRow = document.createElement('tr');
            newRow.setAttribute('data-status', 'open');
            newRow.innerHTML = `
                <td style="padding: 10px 8px; border-bottom: 1px solid #f0f0f0;"><input type="checkbox" class="profile-task-checkbox"></td>
                <td style="padding: 10px 8px; border-bottom: 1px solid #f0f0f0;">New task item</td>
                <td style="padding: 10px 8px; border-bottom: 1px solid #f0f0f0;">Unassigned</td>
                <td style="padding: 10px 8px; border-bottom: 1px solid #f0f0f0;">TBD</td>
                <td style="padding: 10px 8px; border-bottom: 1px solid #f0f0f0;"><span style="background:#eef6ff;color:#1b4f9c;padding:2px 8px;border-radius:10px;">Open</span></td>
            `;
            tableBody.appendChild(newRow);
            updateCounts();
        });
    }

    updateCounts();
}

/**
 * Setup profile subtab navigation
 */
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
 * Initialize the Network Analysis Tab
 */
function initializeNetworkAnalysisTab() {
    console.log('🌐 Initializing Network Analysis tab...');
    
    if (currentLeadIndex === null) {
        console.error('No company selected');
        return;
    }
    
    const currentCompany = leadsData[currentLeadIndex];
    const networkContainer = document.getElementById('networkAnalysisTabContent');
    
    if (!networkContainer) {
        console.error('Network Analysis tab content container not found');
        return;
    }
    
    // Call the network analysis initialization from network-analysis.js
    if (window.initializeNetworkAnalysisForCompany) {
        window.initializeNetworkAnalysisForCompany(currentCompany, networkContainer);
    } else {
        console.error('Network analysis module not loaded');
    }
    
    console.log('✅ Network Analysis tab initialized');
}

/**
 * Initialize the Device Analysis Tab
 */
function initializeDeviceAnalysisTab() {
    console.log('💻 Initializing Device Analysis tab...');
    
    if (currentLeadIndex === null) {
        console.error('No company selected');
        return;
    }
    
    const currentCompany = leadsData[currentLeadIndex];
    const deviceContainer = document.getElementById('deviceAnalysisTabContent');
    
    if (!deviceContainer) {
        console.error('Device Analysis tab content container not found');
        return;
    }
    
    // Build the HTML for device analysis (identical to hardware page)
    const deviceHTML = `
        <div class="hardware-page" style="padding: 20px;">
            <!-- Main Content Area -->
            <div class="hardware-main-container">
                <!-- Content Area -->
                <div class="hardware-content">
                    <!-- Chart Section -->
                    <div class="hardware-chart-section e-card">
                        <div class="e-card-header">
                            <div class="e-card-header-title">Device Analysis - Lifecycle Replacement (4 year cycle)</div>
                        </div>
                        <div class="e-card-content">
                            <canvas id="hardwareChartTab" class="hardware-chart-container" style="display: none;"></canvas>
                            <div id="hardwareSfChartTab" class="hardware-chart-container"></div>
                        </div>
                    </div>

                    <!-- Table Section -->
                    <div class="hardware-table-section e-card">
                        <div class="e-card-header">
                            <div class="e-card-header-title">Device Inventory - ${currentCompany.Company}</div>
                        </div>
                        <div class="e-card-content">
                            <div id="hardwareGridTab"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    deviceContainer.innerHTML = deviceHTML;
    
    // Initialize the hardware chart and grid for this tab (only if still on Device Analysis tab when callback runs)
    const DEVICE_TAB_INDEX = 5;
    setTimeout(() => {
        if (window.leadDetailTabsInstance && window.leadDetailTabsInstance.selectedItem !== DEVICE_TAB_INDEX) return;
        if (window.Endpoint) {
            // Initialize chart
            if (window.Endpoint.initializeHardwareChartTab) {
                window.Endpoint.initializeHardwareChartTab();
            }
            // Initialize grid
            if (window.Endpoint.initializeHardwareGridTab) {
                window.Endpoint.initializeHardwareGridTab();
            }
        } else {
            console.error('Endpoint module not loaded');
        }
    }, 100);
    
    console.log('✅ Device Analysis tab initialized');
}

/**
 * Initialize the Network Access Tab
 */
function initializeNetworkAccessTab() {
    console.log('🔒 Initializing Network Access tab...');
    
    if (currentLeadIndex === null) {
        console.error('No company selected');
        return;
    }
    
    const currentCompany = leadsData[currentLeadIndex];
    const accessContainer = document.getElementById('networkAccessTabContent');
    
    if (!accessContainer) {
        console.error('Network Access tab content container not found');
        return;
    }
    
    // Build the HTML for network access with better layout
    const accessHTML = `
        <div class="network-content" style="padding: 20px;">
            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px; align-items: start;">
                <div class="allow-list-section e-card">
                    <div class="e-card-header">
                        <div class="e-card-header-title">Allow List</div>
                    </div>
                    <div class="e-card-content">
                        <div class="list-box e-listview" id="allowListBoxTab">
                            <!-- MAC addresses will be dynamically added here -->
                        </div>
                        <div class="list-actions">
                            <button class="e-btn e-small e-danger" id="removeSelectedBtnTab">Remove</button>
                            <button class="e-btn e-small e-danger" id="blockSelectedBtnTab">Block</button>
                            <button class="e-btn e-small e-primary" id="addManuallyBtnTab">+ Add Manually</button>
                            <input type="text" placeholder="XX:XX:XX:XX:XX:XX" class="e-field mac-input" id="macInputTab">
                        </div>
                    </div>
                </div>

                <div class="configuration-section e-card">
                    <div class="e-card-header">
                        <div class="e-card-header-title">Configuration</div>
                    </div>
                    <div class="e-card-content">
                        <div class="config-group">
                            <label>RMM</label>
                            <input type="text" placeholder="RMM connection string..." class="e-field" id="rmmConfigTab">
                        </div>
                        <div class="config-group">
                            <label>Watchguard</label>
                            <input type="text" placeholder="Watchguard connection string..." class="e-field" id="watchguardConfigTab">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    accessContainer.innerHTML = accessHTML;
    
    // Initialize the network access list for this tab (only if still on Network Access tab when callback runs)
    const NETWORK_ACCESS_TAB_INDEX = 6;
    setTimeout(() => {
        if (window.leadDetailTabsInstance && window.leadDetailTabsInstance.selectedItem !== NETWORK_ACCESS_TAB_INDEX) return;
        if (window.NetworkAccess) {
            if (window.NetworkAccess.renderAllowListTab) {
                window.NetworkAccess.renderAllowListTab();
            }
        } else {
            console.error('NetworkAccess module not loaded');
        }
    }, 100);
    
    console.log('✅ Network Access tab initialized');
}

/**
 * Initialize the Software Tab (Leads Page Wrapper)
 */
function initializeSoftwareTabWrapper() {
    console.log('🚀🚀🚀 SOFTWARE TAB WRAPPER FUNCTION CALLED 🚀🚀🚀');
    console.log('💿 Initializing Software tab...');
    console.log('📍 currentLeadIndex:', currentLeadIndex);
    console.log('📍 leadsData:', leadsData);
    console.log('📍 leadsData length:', leadsData ? leadsData.length : 'leadsData is null');
    
    if (currentLeadIndex === null || currentLeadIndex === undefined) {
        console.error('❌ EARLY RETURN: No company selected - currentLeadIndex is:', currentLeadIndex);
        return;
    }
    
    if (!leadsData || !leadsData[currentLeadIndex]) {
        console.error('❌ EARLY RETURN: No company data found at index:', currentLeadIndex);
        console.error('❌ leadsData:', leadsData);
        return;
    }
    
    const currentCompany = leadsData[currentLeadIndex];
    console.log('📍 Current Company object:', currentCompany);
    
    if (!currentCompany || !currentCompany.Company) {
        console.error('❌ EARLY RETURN: Current company or company name is undefined');
        console.error('❌ currentCompany:', currentCompany);
        return;
    }
    
    const companyName = currentCompany.Company;
    console.log('📍 Company name extracted:', companyName);
    console.log('📍 typeof companyName:', typeof companyName);
    
    const softwareContainer = document.getElementById('softwareTabContent');
    
    if (!softwareContainer) {
        console.error('❌ EARLY RETURN: Software tab content container not found');
        return;
    }
    
    console.log('✅ All checks passed, building HTML...');
    
    // Build the HTML for software management
    const softwareHTML = `
        <div class="software-page" style="padding: 20px; height: 100%;">
            <div class="software-header" style="margin-bottom: 20px;">
                <h3 style="margin: 0; color: #2c3e50;">Software Licenses - ${companyName}</h3>
                <button id="addSoftwareBtnTab" class="e-btn e-primary">+ Add Software</button>
            </div>

            <!-- Stats Cards -->
            <div class="software-stats">
                <div class="stat-card" style="border-left-color: #3498db;">
                    <div class="stat-label">Total Licenses</div>
                    <div class="stat-value" id="totalLicensesTab">0</div>
                </div>
                <div class="stat-card" style="border-left-color: #27ae60;">
                    <div class="stat-label">Active</div>
                    <div class="stat-value" id="activeLicensesTab">0</div>
                </div>
                <div class="stat-card" style="border-left-color: #f39c12;">
                    <div class="stat-label">Expiring Soon</div>
                    <div class="stat-value" id="expiringSoonTab">0</div>
                </div>
                <div class="stat-card" style="border-left-color: #e74c3c;">
                    <div class="stat-label">Expired</div>
                    <div class="stat-value" id="expiredLicensesTab">0</div>
                </div>
            </div>

            <!-- Filter Section -->
            <div class="software-filters e-card" style="margin-top: 20px;">
                <div class="filter-group">
                    <label>Software Type</label>
                    <select id="softwareTypeFilterTab" class="e-field">
                        <option value="">All Types</option>
                        <option value="Operating System">Operating System</option>
                        <option value="Office Suite">Office Suite</option>
                        <option value="Security">Security</option>
                        <option value="Business">Business</option>
                        <option value="Development">Development</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label>Status</label>
                    <select id="softwareStatusFilterTab" class="e-field">
                        <option value="">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Expiring Soon">Expiring Soon</option>
                        <option value="Expired">Expired</option>
                    </select>
                </div>
                <button id="clearFiltersTabBtn" class="e-btn e-small">Clear Filters</button>
            </div>

            <!-- Software Grid -->
            <div class="software-grid-container" style="margin-top: 20px;">
                <div id="softwareGridTab"></div>
            </div>
        </div>
    `;
    
    softwareContainer.innerHTML = softwareHTML;
    
    // Initialize the software management for this tab (only if still on Software tab when callback runs)
    const SOFTWARE_TAB_INDEX = 7;
    setTimeout(() => {
        // Don't update Software tab DOM if user has already switched to another tab - prevents tab snapping back
        if (window.leadDetailTabsInstance && window.leadDetailTabsInstance.selectedItem !== SOFTWARE_TAB_INDEX) {
            return;
        }
        if (window.Software) {
            if (window.Software.initializeSoftwareTab) {
                console.log('🔄 Calling initializeSoftwareTab with company:', companyName);
                window.Software.initializeSoftwareTab(companyName);
            } else {
                console.error('initializeSoftwareTab function not found');
            }
        } else {
            console.error('Software module not loaded');
        }
    }, 200);
    
    console.log('✅ Software tab initialized');
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
    } else if (selectedIndex === 4) {
        // Network Analysis tab - reinitialize with new company data
        initializeNetworkAnalysisTab();
    } else if (selectedIndex === 5) {
        // Device Analysis tab - reinitialize with new company data
        initializeDeviceAnalysisTab();
    } else if (selectedIndex === 6) {
        // Network Access tab - reinitialize with new company data
        initializeNetworkAccessTab();
    } else if (selectedIndex === 7) {
        // Software tab - reinitialize with new company data
        initializeSoftwareTabWrapper();
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
                } else if (tabIndex === 4) {
                    initializeNetworkAnalysisTab();
                } else if (tabIndex === 5) {
                    initializeDeviceAnalysisTab();
                } else if (tabIndex === 6) {
                    initializeNetworkAccessTab();
                } else if (tabIndex === 7) {
                    initializeSoftwareTabWrapper();
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

