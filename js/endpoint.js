// Endpoint (Hardware) Page Module

// ===== HARDWARE DATA =====
const hardwareGridData = [
    { Type: 'Desktop', DeviceName: 'ITP-DT-SMC', User: 'SCunningham', Purchased: '6/21/2022', Age: '4 yrs / 3 mths', Value: '$1,600', Make: 'Dell', Model: 'Latitude 750', CPU: 'Core i9-14900K', RAM: '12Gb' },
    { Type: 'Laptop', DeviceName: 'ITP-LT-SMC', User: 'SCunningham', Purchased: '7/11/2001', Age: '5 yrs / 2 mths', Value: '$2,000', Make: 'Lenovo', Model: 'Yoga 71', CPU: 'Core i5-14900K', RAM: '12Gb' },
    { Type: 'Desktop', DeviceName: 'ITP-DT-AMC', User: 'ACunningham', Purchased: '1/20/2019', Age: '5 yrs / 9 mths', Value: '$1,400', Make: 'Dell', Model: 'Latitude 750', CPU: 'Core i9-14900K', RAM: '12Gb' },
    { Type: 'Switch', DeviceName: '', User: '', Purchased: '8/1/2013', Age: '7 yrs / 3 mths', Value: '$900', Make: 'Trendnet', Model: 'TEG-3524S', CPU: '', RAM: '' },
    { Type: 'NAS', DeviceName: 'ITP-NAS', User: '', Purchased: '3/24/2020', Age: '6 yrs / 1 mths', Value: '$4,500', Make: 'Synology', Model: 'QL480i', CPU: 'Celeron', RAM: '6 Gb' }
];

const hardwareChartData = {
    labels: ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026', 'Q2 2026', 'Q3 2026', 'Q4 2026', 'Q1 2027', 'Q2 2027', 'Q3 2027', 'Q4 2027'],
    values: [5000, 4500, 3800, 3000, 2200, 2300, 1800, 6000, 3600, 2100, 1900, 3600]
};

// ===== INITIALIZATION =====
function initializeHardwarePage() {
    console.log('💻 Initializing hardware page...');
    
    // Setup overlay sidebar toggle
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (sidebar && overlay) {
        // Close sidebar when overlay is clicked
        overlay.addEventListener('click', (e) => {
            e.preventDefault();
            sidebar.classList.remove('visible');
            overlay.classList.remove('visible');
        });
        
        // Close sidebar when a sidebar link is clicked
        const sidebarLinks = document.querySelectorAll('.sidebar .nav-item');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                sidebar.classList.remove('visible');
                if (overlay) {
                    overlay.classList.remove('visible');
                }
            });
        });
    }
    
    // Render table and chart
    renderHardwareTable();
    console.log('✅ Hardware page initialized');
}

function initializeHardwareChart() {
    console.log('🎨 Initializing hardware chart...');
    renderHardwareChart();
}

function initializeHardwareGrid() {
    console.log('📊 Initializing hardware grid...');
    renderHardwareTable();
}

// ===== RENDERING =====
function renderHardwareTable() {
    console.log('Rendering hardware table');
    
    // Try to use Syncfusion Grid if available
    if (typeof window.ej !== 'undefined' && typeof window.ej.grids !== 'undefined') {
        console.log('Attempting Syncfusion Grid');
        try {
            const gridElement = document.getElementById('hardwareGrid');
            if (!gridElement) {
                console.error('hardwareGrid element not found');
                renderHardwareTableHTML(hardwareGridData);
                return;
            }
            
            const grid = new window.ej.grids.Grid({
                dataSource: hardwareGridData,
                allowPaging: true,
                pageSettings: { pageSize: 10 },
                allowSorting: true,
                allowExcelExport: true,
                columns: [
                    { field: 'Type', headerText: 'Type', width: '100', textAlign: 'Left' },
                    { field: 'DeviceName', headerText: 'Device Name', width: '120', textAlign: 'Left' },
                    { field: 'User', headerText: 'User', width: '120', textAlign: 'Left' },
                    { field: 'Purchased', headerText: 'Purchased', width: '120', textAlign: 'Left' },
                    { field: 'Age', headerText: 'Age', width: '120', textAlign: 'Left' },
                    { field: 'Value', headerText: 'Value', width: '100', textAlign: 'Right' },
                    { field: 'Make', headerText: 'Make', width: '100', textAlign: 'Left' },
                    { field: 'Model', headerText: 'Model', width: '120', textAlign: 'Left' },
                    { field: 'CPU', headerText: 'CPU', width: '150', textAlign: 'Left' },
                    { field: 'RAM', headerText: 'RAM', width: '80', textAlign: 'Left' }
                ],
                gridLines: 'Both',
                rowHeight: 36,
                headerTextAlign: 'Center'
            });
            grid.appendTo('#hardwareGrid');
            console.log('Syncfusion Grid rendered successfully');
            return;
        } catch (error) {
            console.warn('Syncfusion Grid failed, using fallback table:', error);
            renderHardwareTableHTML(hardwareGridData);
            return;
        }
    }
    
    // Fallback to HTML table
    console.log('Syncfusion not available, using HTML table');
    renderHardwareTableHTML(hardwareGridData);
    
    // Render chart
    renderHardwareChart();
}

function renderHardwareTableHTML(gridData) {
    console.log('Rendering hardware table as HTML');
    
    let html = '<table class="hardware-table"><thead><tr><th>Type</th><th>Device Name</th><th>User</th><th>Purchased</th><th>Age</th><th>Value</th><th>Make</th><th>Model</th><th>CPU</th><th>RAM</th></tr></thead><tbody>';
    
    gridData.forEach(row => {
        html += `<tr><td>${row.Type}</td><td>${row.DeviceName}</td><td>${row.User}</td><td>${row.Purchased}</td><td>${row.Age}</td><td>${row.Value}</td><td>${row.Make}</td><td>${row.Model}</td><td>${row.CPU}</td><td>${row.RAM}</td></tr>`;
    });
    
    html += '</tbody></table>';
    
    const gridElement = document.getElementById('hardwareGrid');
    if (gridElement) {
        gridElement.innerHTML = html;
        console.log('Hardware table rendered successfully');
    } else {
        console.error('hardwareGrid element not found');
    }
    
    // Render chart
    renderHardwareChart();
}

function renderHardwareChart() {
    console.log('Rendering hardware chart');
    
    // Try to use Syncfusion Chart if available
    if (typeof window.ej !== 'undefined' && typeof window.ej.charts !== 'undefined') {
        console.log('Using Syncfusion Chart');
        
        const chartDataSf = hardwareChartData.labels.map((label, index) => ({
            x: label,
            y: hardwareChartData.values[index]
        }));
        
        try {
            const chart = new window.ej.charts.Chart({
                primaryXAxis: {
                    valueType: 'Category',
                    labelPlacement: 'OnTicks',
                    majorGridLines: { width: 0 }
                },
                primaryYAxis: {
                    minimum: 0,
                    maximum: 7000,
                    interval: 1000,
                    labelFormat: '${value}',
                    majorTickLines: { width: 0 }
                },
                chartArea: { border: { width: 0 } },
                tooltip: {
                    enable: true,
                    format: '<b>${point.x}</b><br/>Value: ${point.y}'
                },
                series: [
                    {
                        dataSource: chartDataSf,
                        xName: 'x',
                        yName: 'y',
                        type: 'Column',
                        cornerRadius: 2,
                        marker: {
                            visible: false
                        }
                    }
                ],
                width: '100%',
                height: '300px'
            });
            chart.appendTo('#hardwareSfChart');
            console.log('Syncfusion Chart rendered successfully');
            return;
        } catch (error) {
            console.warn('Syncfusion Chart failed, using Chart.js:', error);
        }
    }
    
    // Fallback to Chart.js
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js not loaded, retrying...');
        setTimeout(renderHardwareChart, 500);
        return;
    }
    
    console.log('Using Chart.js');
    
    const ctx = document.getElementById('hardwareChart');
    if (!ctx) {
        console.error('hardwareChart canvas not found');
        return;
    }
    
    // Show canvas and hide Syncfusion container
    ctx.style.display = 'block';
    const sfChart = document.getElementById('hardwareSfChart');
    if (sfChart) {
        sfChart.style.display = 'none';
    }
    
    // Destroy previous chart if it exists
    if (ctx.chart) {
        ctx.chart.destroy();
    }
    
    const chartData = {
        labels: hardwareChartData.labels,
        datasets: [
            {
                label: 'Device Replacement Cost',
                data: hardwareChartData.values,
                backgroundColor: '#3498db',
                borderColor: '#2980b9',
                borderWidth: 1,
                borderRadius: 4
            }
        ]
    };
    
    ctx.chart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            indexAxis: 'x',
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
    
    console.log('Chart.js rendered successfully');
}

// ===== EXPORTS =====
if (typeof window !== 'undefined') {
    window.Endpoint = {
        initializeHardwarePage,
        initializeHardwareChart,
        initializeHardwareGrid,
        renderHardwareTable,
        renderHardwareChart
    };
}

