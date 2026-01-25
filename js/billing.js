/**
 * BILLING MODULE
 * Handles billing overview with hierarchical grouped data
 */

// Billing data structure matching the screenshot
const billingOverviewData = [
    {
        TaskID: 1,
        TaskName: 'January 1, 2025',
        isMonth: true,
        Total: '$17,546.21'
    },
    {
        TaskID: 2,
        TaskName: 'February 1, 2025',
        isMonth: true,
        Total: '$18,241.11'
    },
    {
        TaskID: 3,
        TaskName: 'March 1, 2025',
        isMonth: true,
        Total: '$18,843.54'
    },
    {
        TaskID: 4,
        TaskName: 'April 1, 2025',
        isMonth: true,
        Total: '$17,976.76',
        subtasks: [
            {
                TaskID: 41,
                TaskName: 'Cohort Creative',
                isCompany: true,
                Total: '$2,858.79',
                subtasks: [
                    { TaskID: 411, TaskName: 'Firewall (TZ)', Qty: 1, Each: '$72.75', Total: '$72.75' },
                    { TaskID: 412, TaskName: 'MS (Email - additional storage)', Qty: 3, Each: '$5.25', Total: '$9.25' },
                    { TaskID: 413, TaskName: 'MS (Office 365 - Basic)', Qty: 3, Each: '$14.20', Total: '$8.21' },
                    { TaskID: 414, TaskName: 'MS (Office 365 - Enterprise)', Qty: 2, Each: '$26.65', Total: '$31.46' },
                    { TaskID: 415, TaskName: 'MS (Office 365 - Premium)', Qty: 34, Each: '$28.13', Total: '$26.33' },
                    { TaskID: 416, TaskName: 'MS (Office 365 Project / Planners)', Qty: 4, Each: '$19.54', Total: '$35.92' },
                    { TaskID: 417, TaskName: 'RAM (Desktop)', Qty: 19, Each: '$125.00', Total: '$2,375.00' },
                    { TaskID: 418, TaskName: 'RAM (server)', Qty: 17, Each: '$158.00', Total: '$300.00' },
                    { TaskID: 419, TaskName: 'SentinelONE', Qty: 10, Each: '$1.85', Total: '$0.00' }
                ]
            },
            {
                TaskID: 42,
                TaskName: 'Echo Valley Logistics',
                isCompany: true,
                Total: '$3,749.13'
            },
            {
                TaskID: 43,
                TaskName: 'Flex Innovation',
                isCompany: true,
                Total: '$1,845.21'
            },
            {
                TaskID: 44,
                TaskName: 'Golden Hour Bakery',
                isCompany: true,
                Total: '$1,287.23'
            },
            {
                TaskID: 45,
                TaskName: 'Harbor Light Financial',
                isCompany: true,
                Total: '$924.85'
            },
            {
                TaskID: 46,
                TaskName: 'Ironwood Construction',
                isCompany: true,
                Total: '$2,385.60'
            },
            {
                TaskID: 47,
                TaskName: 'Lemon Cove Laundry',
                isCompany: true,
                Total: '$678.05'
            },
            {
                TaskID: 48,
                TaskName: 'Mosaic Marketing',
                isCompany: true,
                Total: '$3,315.21'
            },
            {
                TaskID: 49,
                TaskName: 'North Star Provisions',
                isCompany: true,
                Total: '$2,946.54'
            }
        ]
    },
    {
        TaskID: 5,
        TaskName: 'May 1, 2025',
        isMonth: true,
        Total: '$21,452.48'
    },
    {
        TaskID: 6,
        TaskName: 'June 1, 2025',
        isMonth: true,
        Total: '$22,890.54'
    },
    {
        TaskID: 7,
        TaskName: 'July 1, 2025',
        isMonth: true,
        Total: '$24,511.65'
    },
    {
        TaskID: 8,
        TaskName: 'August 1, 2025',
        isMonth: true,
        Total: '$25,124.11'
    },
    {
        TaskID: 9,
        TaskName: 'September 1, 2025',
        isMonth: true,
        Total: '$25,947.12'
    },
    {
        TaskID: 10,
        TaskName: 'October 1, 2025',
        isMonth: true,
        Total: '$25,947.12'
    }
];

let billingTreeGrid = null;

/**
 * Initialize the Billing page
 */
function initializeBillingPage() {
    console.log('💰 Initializing Billing page...');
    
    const billingPage = document.getElementById('page-billing');
    if (!billingPage || !billingPage.classList.contains('active')) {
        return;
    }
    
    // Initialize the tree grid
    setTimeout(() => initializeBillingTreeGrid(), 200);
}

/**
 * Initialize Billing Tree Grid
 */
function initializeBillingTreeGrid() {
    const gridContainer = document.getElementById('billingOverviewGrid');
    if (!gridContainer) {
        console.warn('⚠️ billingOverviewGrid container not found');
        return;
    }
    
    // Don't reinitialize if already exists
    if (billingTreeGrid && gridContainer.querySelector('.e-treegrid')) {
        console.log('✅ Billing overview grid already initialized');
        return;
    }
    
    if (typeof window.ej === 'undefined' || typeof window.ej.treegrid === 'undefined') {
        console.warn('⚠️ Syncfusion TreeGrid not available');
        return;
    }
    
    try {
        // Destroy existing grid if it exists
        if (billingTreeGrid) {
            billingTreeGrid.destroy();
        }
        
        billingTreeGrid = new ej.treegrid.TreeGrid({
            dataSource: billingOverviewData,
            childMapping: 'subtasks',
            treeColumnIndex: 0,
            allowSorting: false,
            allowFiltering: false,
            height: 'calc(100vh - 200px)',
            rowHeight: 36,
            columns: [
                { 
                    field: 'TaskName', 
                    headerText: 'Billing (overview)', 
                    width: 400,
                    template: function(args) {
                        if (args.isMonth) {
                            return '<span style="font-weight: bold;">' + args.TaskName + '</span>';
                        } else if (args.isCompany) {
                            return '<span style="padding-left: 20px; font-weight: 600;">' + args.TaskName + '</span>';
                        }
                        return '<span style="padding-left: 40px;">' + args.TaskName + '</span>';
                    }
                },
                { 
                    field: 'Qty', 
                    headerText: 'Qty', 
                    width: 100, 
                    textAlign: 'Right',
                    template: function(args) {
                        return args.Qty ? '<span>' + args.Qty + '</span>' : '';
                    }
                },
                { 
                    field: 'Each', 
                    headerText: 'Each', 
                    width: 100, 
                    textAlign: 'Right',
                    template: function(args) {
                        return args.Each ? '<span>' + args.Each + '</span>' : '';
                    }
                },
                { 
                    field: 'Total', 
                    headerText: 'Total', 
                    width: 120, 
                    textAlign: 'Right',
                    template: function(args) {
                        if (args.isMonth) {
                            return '<span style="font-weight: bold;">' + args.Total + '</span>';
                        } else if (args.isCompany) {
                            return '<span style="font-weight: 600;">' + args.Total + '</span>';
                        }
                        return '<span>' + (args.Total || '') + '</span>';
                    }
                }
            ],
            rowDataBound: function(args) {
                // Style month rows
                if (args.data.isMonth) {
                    args.row.style.backgroundColor = '#f5f5f5';
                    args.row.style.fontWeight = 'bold';
                }
                // Style company rows
                else if (args.data.isCompany) {
                    args.row.style.backgroundColor = '#fafafa';
                    args.row.style.fontWeight = '600';
                }
            },
            created: function() {
                // Expand the April 2025 row by default to show companies
                if (billingTreeGrid) {
                    setTimeout(() => {
                        billingTreeGrid.expandRow(document.querySelector('[data-uid="4"]'));
                    }, 100);
                }
            }
        });
        
        billingTreeGrid.appendTo('#billingOverviewGrid');
        
        console.log('✅ Billing Tree Grid initialized');
    } catch (error) {
        console.error('❌ Error initializing Billing Tree Grid:', error);
    }
}

// Export functions
if (typeof window !== 'undefined') {
    window.Billing = {
        initializeBillingPage,
        initializeBillingTreeGrid
    };
}
