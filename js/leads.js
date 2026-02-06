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
            pageSettings: { pageSize: 25 },
            filterSettings: { type: 'Excel' },
            columns: [
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
            ],
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
    
    // Initialize the Profile tab by default (after a small delay to ensure tabs are ready)
    setTimeout(() => {
        initializeProfileTab();
    }, 100);
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
                content: '<div class="tab-content-section"><h3>Site Overview</h3><p>Website and online presence details will be displayed here.</p></div>'
            },
            {
                header: { text: 'Proposals' },
                content: '<div class="tab-content-section proposals-tab" id="proposalsTabContent"></div>'
            }
        ];
        
        const tabObj = new ej.navigations.Tab({
            items: tabItems,
            heightAdjustMode: 'Auto',
            selected: function(args) {
                // When Profile tab is selected, initialize the profile
                if (args.selectedIndex === 0) {
                    initializeProfileTab();
                }
                // When Touch's tab is selected, initialize the grid
                if (args.selectedIndex === 1) {
                    initializeTouchesGrid();
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
}

/**
 * Initialize the Proposals Tab
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
    
    // Build the proposals interface HTML
    const proposalsHTML = `
        <div class="proposals-layout">
            <div class="proposals-left">
                <!-- Documents To Include Section -->
                <div class="proposals-section">
                    <h3>Documents To Include</h3>
                    <div class="document-checklist">
                        <label class="document-item">
                            <input type="checkbox" class="e-checkbox" id="doc-cover" checked>
                            <span>Cover Letter</span>
                        </label>
                        <label class="document-item">
                            <input type="checkbox" class="e-checkbox" id="doc-executive">
                            <span>#VALUE! Executive Summary</span>
                        </label>
                        <label class="document-item">
                            <input type="checkbox" class="e-checkbox" id="doc-problem">
                            <span>Problem Statement</span>
                        </label>
                        <label class="document-item">
                            <input type="checkbox" class="e-checkbox" id="doc-solution">
                            <span>#VALUE! Proposed Solution</span>
                        </label>
                        <label class="document-item">
                            <input type="checkbox" class="e-checkbox" id="doc-deliverables">
                            <span>Deliverables</span>
                        </label>
                        <label class="document-item">
                            <input type="checkbox" class="e-checkbox" id="doc-timeline">
                            <span>#VALUE! Timeline</span>
                        </label>
                        <label class="document-item">
                            <input type="checkbox" class="e-checkbox" id="doc-budget">
                            <span>#VALUE! Budget</span>
                        </label>
                        <label class="document-item">
                            <input type="checkbox" class="e-checkbox" id="doc-team">
                            <span>About The Team</span>
                        </label>
                        <label class="document-item">
                            <input type="checkbox" class="e-checkbox" id="doc-press">
                            <span>Press Releases</span>
                        </label>
                    </div>
                </div>
                
                <!-- Variables Section -->
                <div class="proposals-section">
                    <h3>Variables</h3>
                    <div id="proposalVariablesGrid"></div>
                </div>
                
                <div class="proposals-actions">
                    <button id="generateProposalBtn" class="e-btn e-primary">Generate Proposal</button>
                    <button id="previewProposalBtn" class="e-btn e-outline">Preview</button>
                </div>
            </div>
            
            <div class="proposals-right">
                <div class="proposal-preview" id="proposalPreview">
                    <div class="proposal-document">
                        <div class="proposal-header">
                            <div class="proposal-logo">
                                <div class="handshake-icon">🤝</div>
                            </div>
                            <h1>Cover Letter</h1>
                            <h2>of Business Proposal</h2>
                        </div>
                        
                        <div class="proposal-body">
                            <p class="proposal-greeting">Dear <span class="variable">XYZ</span>,</p>
                            
                            <p class="proposal-intro">
                                Here you will give a one-liner about your company, brief background information about how your company came to be, and a short overview of what makes your company better than the rest. Make it friendly and encourage your reader to reach out with any questions.
                            </p>
                            
                            <div class="proposal-signature">
                                <p><strong>Regards,</strong></p>
                                <p class="signature-name">User Name</p>
                                <p class="signature-title">Designation</p>
                                <p class="signature-company">Company Name</p>
                            </div>
                        </div>
                        
                        <div class="proposal-footer">
                            <p class="proposal-note">This slide is 100% editable. Adapt it to your needs and capture your audience's attention.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    proposalsContainer.innerHTML = proposalsHTML;
    
    // Initialize the variables grid
    initializeProposalVariablesGrid(currentCompany);
    
    // Set up event listeners
    setupProposalEventListeners();
    
    console.log('✅ Proposals tab initialized');
}

/**
 * Initialize Variables Grid
 */
function initializeProposalVariablesGrid(company) {
    const gridContainer = document.getElementById('proposalVariablesGrid');
    if (!gridContainer) return;
    
    const variablesData = [
        { Field: 'Client Name', Value: company.Company },
        { Field: 'Address', Value: company.City },
        { Field: 'Date Of Next Meeting', Value: company.FollowUp }
    ];
    
    if (typeof window.ej !== 'undefined' && typeof window.ej.grids !== 'undefined') {
        try {
            const grid = new ej.grids.Grid({
                dataSource: variablesData,
                allowSorting: false,
                allowPaging: false,
                editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' },
                columns: [
                    { field: 'Field', headerText: 'Field', width: 150, textAlign: 'Left' },
                    { field: 'Value', headerText: 'Value', width: 250, textAlign: 'Left' }
                ],
                height: 200
            });
            
            grid.appendTo('#proposalVariablesGrid');
            console.log('✅ Proposal Variables Grid initialized');
        } catch (error) {
            console.error('❌ Error initializing Variables Grid:', error);
        }
    }
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
    } else if (selectedIndex === 3) {
        // Proposals tab - reinitialize the proposals with new company data
        initializeProposalsTab();
    }
    // Site Overview tab is static, no need to refresh
}

/**
 * Set up event listeners for proposal buttons
 */
function setupProposalEventListeners() {
    const generateBtn = document.getElementById('generateProposalBtn');
    const previewBtn = document.getElementById('previewProposalBtn');
    
    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            alert('Proposal generation coming soon! This will create a PDF document with all selected sections.');
        });
    }
    
    if (previewBtn) {
        previewBtn.addEventListener('click', () => {
            alert('Preview functionality coming soon! This will show a full preview of the proposal document.');
        });
    }
}

// Export functions and data
if (typeof window !== 'undefined') {
    window.initializeLeadsPage = initializeLeadsPage;
    window.leadsData = leadsData; // Export leadsData for use by other modules
    console.log('✅ Leads data exported to window:', leadsData.length, 'companies');
}

