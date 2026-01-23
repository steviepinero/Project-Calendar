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
                content: '<div class="tab-content-section"><h3>Company Profile</h3><p>Profile information will be displayed here.</p></div>'
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
                content: '<div class="tab-content-section"><h3>Proposals</h3><p>All proposals sent to this lead will be displayed here.</p></div>'
            }
        ];
        
        const tabObj = new ej.navigations.Tab({
            items: tabItems,
            heightAdjustMode: 'Auto',
            selected: function(args) {
                // When Touch's tab is selected, initialize the grid
                if (args.selectedIndex === 1) {
                    initializeTouchesGrid();
                }
            }
        });
        
        tabObj.appendTo('#leadDetailTabs');
        
        console.log('✅ Lead Detail Tabs initialized');
    } catch (error) {
        console.error('❌ Error initializing tabs:', error);
    }
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
    
    // Don't reinitialize if already exists
    if (touchesGridInstance && gridContainer.querySelector('.e-grid')) {
        console.log('✅ Touches grid already initialized');
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
        
        console.log('✅ Touches Grid initialized with', touches.length, 'touches');
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

// Export functions
if (typeof window !== 'undefined') {
    window.initializeLeadsPage = initializeLeadsPage;
}

