/**
 * BILLING MODULE
 * Handles billing import and processed data display
 */

// Sample billing/endpoint data
const billingImportData = [
    { Site: 'Saramana Internal', SerialNumber: 'Default string', DeviceType: 'laptop', ModelName: 'ALASKA - A_M_I_', EndpointName: 'IT-Phone', LastLoggedInUser: 'SaraadminOS', Domain: 'WORKGROUP', ConsoleVisibleIP: '47.206.175.75', AgentVersion: '24.2.3.471', SerialNumber2: 'Default string' },
    { Site: 'Patients First Home Care', SerialNumber: 'PF5CVSD0', DeviceType: 'laptop', ModelName: 'LENOVO - 21MAA00BUS', EndpointName: 'PFHC-LT149', LastLoggedInUser: 'SaraAdmin2', Domain: 'WORKGROUP', ConsoleVisibleIP: '47.206.175.75', AgentVersion: '24.2.3.471', SerialNumber2: 'PF5CVSD0' },
    { Site: 'Patients First Home Care', SerialNumber: 'PF41R4CF', DeviceType: 'laptop', ModelName: 'LENOVO - 21JNSDF300', EndpointName: 'PFHC-LT82', LastLoggedInUser: 'StuChristensen', Domain: 'WORKGROUP', ConsoleVisibleIP: '47.199.91.234', AgentVersion: '24.2.3.471', SerialNumber2: 'PF41R4CF' },
    { Site: 'Saramana Internal', SerialNumber: 'BTWS30600B1', DeviceType: 'desktop', ModelName: 'NUC12WSHi7', EndpointName: 'PAPERCUT-SERV', LastLoggedInUser: 'Eql_Controller', Domain: 'GHPA', ConsoleVisibleIP: '47.206.241.140', AgentVersion: '24.2.3.471', SerialNumber2: 'BTWS30600B1' },
    { Site: 'Patients First Home Care', SerialNumber: 'PF5D35F8', DeviceType: 'laptop', ModelName: 'LENOVO - 21MAA00BUS', EndpointName: 'PFHC-LT147', LastLoggedInUser: 'SaraAdmin2', Domain: 'WORKGROUP', ConsoleVisibleIP: '47.206.175.75', AgentVersion: '24.2.3.471', SerialNumber2: 'PF5D35F8' },
    { Site: 'Patients First Home Care', SerialNumber: 'PF5DO3B5', DeviceType: 'laptop', ModelName: 'LENOVO - 21MAA00BUS', EndpointName: 'PFHC-LT146', LastLoggedInUser: 'SaraAdmin2', Domain: 'WORKGROUP', ConsoleVisibleIP: '47.206.175.75', AgentVersion: '24.2.3.471', SerialNumber2: 'PF5DO3B5' },
    { Site: 'EG Solutions', SerialNumber: 'YX0DEVBZ', DeviceType: 'laptop', ModelName: 'LENOVO - 83DL', EndpointName: 'EGS-LT08', LastLoggedInUser: 'HenriBurton', Domain: 'WORKGROUP', ConsoleVisibleIP: '64.156.221.194', AgentVersion: '24.2.3.471', SerialNumber2: 'YX0DEVBZ' },
    { Site: 'DEME Construction', SerialNumber: '031636214857', DeviceType: 'laptop', ModelName: 'Surface Laptop 4', EndpointName: 'ASSISTANTPM-LT', LastLoggedInUser: 'AmandaKricos', Domain: 'WORKGROUP', ConsoleVisibleIP: '71.228.95.15', AgentVersion: '24.2.3.471', SerialNumber2: '031636214857' },
    { Site: 'Patients First Home Care', SerialNumber: 'PF5D3D0L', DeviceType: 'laptop', ModelName: 'LENOVO - 21MAA00BUS', EndpointName: 'PFHC-LT145', LastLoggedInUser: 'SaraAdmin2', Domain: 'WORKGROUP', ConsoleVisibleIP: '47.206.175.75', AgentVersion: '24.2.3.471', SerialNumber2: 'PF5D3D0L' },
    { Site: 'Patients First Home Care', SerialNumber: 'PF5CT7H1', DeviceType: 'laptop', ModelName: 'LENOVO - 21MAA00BUS', EndpointName: 'PFHC-LT144', LastLoggedInUser: 'TiffanyCamacho', Domain: 'WORKGROUP', ConsoleVisibleIP: '96.79.128.233', AgentVersion: '24.2.3.471', SerialNumber2: 'PF5CT7H1' },
    { Site: 'EG Solutions', SerialNumber: 'BYD1HX3', DeviceType: 'laptop', ModelName: 'Dell Inc. - Precision 3571', EndpointName: 'EGS-LT07', LastLoggedInUser: 'AdeshRamdhanas', Domain: 'WORKGROUP', ConsoleVisibleIP: '47.207.92.171', AgentVersion: '24.2.3.471', SerialNumber2: 'BYD1HX3' },
    { Site: 'EG Solutions', SerialNumber: 'YX0OYPK', DeviceType: 'laptop', ModelName: 'LENOVO - 83DU', EndpointName: 'EGS-LT05', LastLoggedInUser: 'JeanMeroni', Domain: 'WORKGROUP', ConsoleVisibleIP: '143.105.2.1104', AgentVersion: '24.2.3.471', SerialNumber2: 'YX0OYPK' },
    { Site: 'DEME Construction', SerialNumber: '5CD3053L4S', DeviceType: 'laptop', ModelName: 'HP - HP Laptop 15-efxxxx', EndpointName: 'Project-Mgt-2LT', LastLoggedInUser: 'JustinWise', Domain: 'WORKGROUP', ConsoleVisibleIP: '172.58.134.120', AgentVersion: '24.2.3.471', SerialNumber2: '5CD3053L4S' },
    { Site: 'EG Solutions', SerialNumber: 'YX0DTGV1', DeviceType: 'laptop', ModelName: 'LENOVO - 83DL', EndpointName: 'EGS-LT06', LastLoggedInUser: 'BrianThereault', Domain: 'WORKGROUP', ConsoleVisibleIP: '64.156.221.194', AgentVersion: '24.2.3.471', SerialNumber2: 'YX0DTGV1' },
    { Site: 'DEME Construction', SerialNumber: '5CD5122M10', DeviceType: 'laptop', ModelName: 'HP - HP Laptop 15-fdxxxx', EndpointName: 'PROJECT-MGT-3LT', LastLoggedInUser: 'TylerMcGorian', Domain: 'WORKGROUP', ConsoleVisibleIP: '47.201.47.2', AgentVersion: '24.2.3.471', SerialNumber2: '5CD5122M10' },
    { Site: 'Patients First Home Care', SerialNumber: 'PF5D34CD', DeviceType: 'laptop', ModelName: 'LENOVO - 21MAA00BUS', EndpointName: 'PFHC-LT143', LastLoggedInUser: 'DebraTalbot', Domain: 'WORKGROUP', ConsoleVisibleIP: '47.197.176.184', AgentVersion: '24.2.3.471', SerialNumber2: 'PF5D34CD' },
    { Site: 'Patients First Home Care', SerialNumber: 'PF5CQGSG', DeviceType: 'laptop', ModelName: 'LENOVO - 21MAA00BUS', EndpointName: 'PFHC-LT142', LastLoggedInUser: 'GracePentecost', Domain: 'WORKGROUP', ConsoleVisibleIP: '96.79.128.233', AgentVersion: '24.2.3.471', SerialNumber2: 'PF5CQGSG' },
    { Site: 'Patients First Home Care', SerialNumber: 'PF5G6D84', DeviceType: 'laptop', ModelName: 'LENOVO - 21MAA00BUS', EndpointName: 'PFHC-LT140', LastLoggedInUser: 'AnaVillegas-Cogguila', Domain: 'WORKGROUP', ConsoleVisibleIP: '70.241.150.81', AgentVersion: '24.2.3.471', SerialNumber2: 'PF5G6D84' },
    { Site: 'Saramana Internal', SerialNumber: 'YX0B45FZ', DeviceType: 'laptop', ModelName: 'LENOVO - 83DK', EndpointName: 'Addison-LT', LastLoggedInUser: 'Addison-LT', Domain: 'WORKGROUP', ConsoleVisibleIP: '174.230.83.103', AgentVersion: '24.2.3.471', SerialNumber2: 'YX0B45FZ' },
    { Site: 'Patients First Home Care', SerialNumber: 'PF4XWXCG', DeviceType: 'laptop', ModelName: 'LENOVO - 21JNSDF300', EndpointName: 'PFHC-LT96', LastLoggedInUser: 'MarciSuttiff', Domain: 'WORKGROUP', ConsoleVisibleIP: '47.205.51.37', AgentVersion: '24.2.3.471', SerialNumber2: 'PF4XWXCG' },
    { Site: 'Patients First Home Care', SerialNumber: 'PF6O2RNQ', DeviceType: 'laptop', ModelName: 'LENOVO - 21MAA00BUS', EndpointName: 'PFHC-LT141', LastLoggedInUser: 'BethanielMcGuire', Domain: 'WORKGROUP', ConsoleVisibleIP: '47.196.102.111', AgentVersion: '24.2.3.471', SerialNumber2: 'PF6O2RNQ' },
    { Site: 'DEME Construction', SerialNumber: '1492-4550-7637-9492', DeviceType: 'server', ModelName: 'Microsoft Corporation', EndpointName: 'Sage-Serv', LastLoggedInUser: 'N/A', Domain: 'WORKGROUP', ConsoleVisibleIP: '108.190.149.225', AgentVersion: '24.2.3.471', SerialNumber2: '1492-4550-7637' },
    { Site: 'DEME Construction', SerialNumber: '5840-0b69-7815-7313', DeviceType: 'server', ModelName: 'Microsoft Corporation', EndpointName: 'BZVV-Serv', LastLoggedInUser: 'N/A', Domain: 'WORKGROUP', ConsoleVisibleIP: '108.190.149.225', AgentVersion: '24.2.3.471', SerialNumber2: '5840-0b69-7815' },
    { Site: 'Garcia Deli', SerialNumber: '2M2D1P0QCX', DeviceType: 'server', ModelName: 'HPE - ProLiant ML30 Gen11', EndpointName: 'GDL-HYPSERV', LastLoggedInUser: 'N/A', Domain: 'WORKGROUP', ConsoleVisibleIP: '73.27.8.135', AgentVersion: '24.2.3.471', SerialNumber2: '2M2D1P0QCX' },
    { Site: 'Byrd Law', SerialNumber: '2M2D260032', DeviceType: 'server', ModelName: 'HPE - ProLiant ML30 Gen11', EndpointName: 'TBLF-HYPSERV', LastLoggedInUser: 'N/A', Domain: 'WORKGROUP', ConsoleVisibleIP: '47.206.61.7', AgentVersion: '24.2.3.471', SerialNumber2: '2M2D260032' }
];

const billingProcessedData = [
    { Site: 'EG Solutions', SerialNumber: 'YX0DEVBZ', DeviceType: 'laptop', ModelName: 'LENOVO - 83DL', EndpointName: 'EGS-LT08', LastLoggedInUser: 'HenriBurton', Domain: 'WORKGROUP', ConsoleVisibleIP: '64.156.221.194', AgentVersion: '24.2.3.471', SerialNumber2: 'YX0DEVBZ' },
    { Site: 'DEME Construction', SerialNumber: '031636214857', DeviceType: 'laptop', ModelName: 'Surface Laptop 4', EndpointName: 'ASSISTANTPM-LT', LastLoggedInUser: 'AmandaKricos', Domain: 'WORKGROUP', ConsoleVisibleIP: '71.228.95.15', AgentVersion: '24.2.3.471', SerialNumber2: '031636214857' }
];

let billingImportGrid = null;
let billingProcessedGrid = null;

/**
 * Initialize the Billing page
 */
function initializeBillingPage() {
    console.log('💰 Initializing Billing page...');
    
    const billingPage = document.getElementById('page-billing');
    if (!billingPage || !billingPage.classList.contains('active')) {
        return;
    }
    
    // Initialize Syncfusion Tabs
    if (typeof window.ej !== 'undefined' && typeof window.ej.navigations !== 'undefined') {
        initializeBillingTabs();
    } else {
        console.warn('⚠️ Syncfusion Tab not available for Billing page');
    }
}

/**
 * Initialize Billing Tabs
 */
function initializeBillingTabs() {
    const tabsContainer = document.getElementById('billingTabs');
    if (!tabsContainer) {
        console.warn('⚠️ billingTabs container not found');
        return;
    }
    
    try {
        const tabItems = [
            {
                header: { text: 'Import' },
                content: '<div class="billing-tab-content"><div id="billingImportGrid"></div></div>'
            },
            {
                header: { text: 'Processed' },
                content: '<div class="billing-tab-content"><div id="billingProcessedGrid"></div></div>'
            }
        ];
        
        const tabObj = new ej.navigations.Tab({
            items: tabItems,
            heightAdjustMode: 'Auto',
            selected: function(args) {
                if (args.selectedIndex === 0) {
                    // Import tab selected
                    setTimeout(() => initializeBillingImportGrid(), 100);
                } else if (args.selectedIndex === 1) {
                    // Processed tab selected
                    setTimeout(() => initializeBillingProcessedGrid(), 100);
                }
            }
        });
        
        tabObj.appendTo('#billingTabs');
        
        // Initialize the first tab's grid
        setTimeout(() => initializeBillingImportGrid(), 200);
        
        console.log('✅ Billing Tabs initialized');
    } catch (error) {
        console.error('❌ Error initializing Billing Tabs:', error);
    }
}

/**
 * Initialize Import Grid
 */
function initializeBillingImportGrid() {
    const gridContainer = document.getElementById('billingImportGrid');
    if (!gridContainer) {
        console.warn('⚠️ billingImportGrid container not found');
        return;
    }
    
    // Don't reinitialize if already exists
    if (billingImportGrid && gridContainer.querySelector('.e-grid')) {
        console.log('✅ Billing Import grid already initialized');
        return;
    }
    
    if (typeof window.ej === 'undefined' || typeof window.ej.grids === 'undefined') {
        console.warn('⚠️ Syncfusion Grid not available');
        return;
    }
    
    try {
        // Destroy existing grid if it exists
        if (billingImportGrid) {
            billingImportGrid.destroy();
        }
        
        billingImportGrid = new ej.grids.Grid({
            dataSource: billingImportData,
            allowSorting: true,
            allowFiltering: true,
            allowPaging: true,
            pageSettings: { pageSize: 20 },
            filterSettings: { type: 'Excel' },
            columns: [
                { field: 'Site', headerText: 'Site', width: 180 },
                { field: 'SerialNumber', headerText: 'Serial Number', width: 150 },
                { field: 'DeviceType', headerText: 'Device Type', width: 110 },
                { field: 'ModelName', headerText: 'Model Name', width: 200 },
                { field: 'EndpointName', headerText: 'Endpoint Name', width: 150 },
                { field: 'LastLoggedInUser', headerText: 'Last Logged In User', width: 160 },
                { field: 'Domain', headerText: 'Domain', width: 120 },
                { field: 'ConsoleVisibleIP', headerText: 'Console Visible IP', width: 140 },
                { field: 'AgentVersion', headerText: 'Agent Version', width: 120 },
                { field: 'SerialNumber2', headerText: 'Serial Number', width: 150 }
            ],
            height: 'calc(100vh - 300px)',
            rowHeight: 36
        });
        
        billingImportGrid.appendTo('#billingImportGrid');
        
        console.log('✅ Billing Import Grid initialized with', billingImportData.length, 'records');
    } catch (error) {
        console.error('❌ Error initializing Billing Import Grid:', error);
    }
}

/**
 * Initialize Processed Grid
 */
function initializeBillingProcessedGrid() {
    const gridContainer = document.getElementById('billingProcessedGrid');
    if (!gridContainer) {
        console.warn('⚠️ billingProcessedGrid container not found');
        return;
    }
    
    // Don't reinitialize if already exists
    if (billingProcessedGrid && gridContainer.querySelector('.e-grid')) {
        console.log('✅ Billing Processed grid already initialized');
        return;
    }
    
    if (typeof window.ej === 'undefined' || typeof window.ej.grids === 'undefined') {
        console.warn('⚠️ Syncfusion Grid not available');
        return;
    }
    
    try {
        // Destroy existing grid if it exists
        if (billingProcessedGrid) {
            billingProcessedGrid.destroy();
        }
        
        billingProcessedGrid = new ej.grids.Grid({
            dataSource: billingProcessedData,
            allowSorting: true,
            allowFiltering: true,
            allowPaging: true,
            pageSettings: { pageSize: 20 },
            filterSettings: { type: 'Excel' },
            columns: [
                { field: 'Site', headerText: 'Site', width: 180 },
                { field: 'SerialNumber', headerText: 'Serial Number', width: 150 },
                { field: 'DeviceType', headerText: 'Device Type', width: 110 },
                { field: 'ModelName', headerText: 'Model Name', width: 200 },
                { field: 'EndpointName', headerText: 'Endpoint Name', width: 150 },
                { field: 'LastLoggedInUser', headerText: 'Last Logged In User', width: 160 },
                { field: 'Domain', headerText: 'Domain', width: 120 },
                { field: 'ConsoleVisibleIP', headerText: 'Console Visible IP', width: 140 },
                { field: 'AgentVersion', headerText: 'Agent Version', width: 120 },
                { field: 'SerialNumber2', headerText: 'Serial Number', width: 150 }
            ],
            height: 'calc(100vh - 300px)',
            rowHeight: 36
        });
        
        billingProcessedGrid.appendTo('#billingProcessedGrid');
        
        console.log('✅ Billing Processed Grid initialized with', billingProcessedData.length, 'records');
    } catch (error) {
        console.error('❌ Error initializing Billing Processed Grid:', error);
    }
}

// Export functions
if (typeof window !== 'undefined') {
    window.Billing = {
        initializeBillingPage,
        initializeBillingTabs,
        initializeBillingImportGrid,
        initializeBillingProcessedGrid
    };
}


