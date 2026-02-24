// Dashboard Page - Data Tracking Charts
let dashboardChartsInitialized = false;
let dashboardCharts = {};

// Common compact chart options
function getCompactChartOptions(title, type = 'pie') {
    const baseOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: type === 'bar' || type === 'line' ? 'top' : 'right',
                labels: {
                    padding: 6,
                    font: { size: 9 },
                    boxWidth: 10
                }
            },
            title: {
                display: true,
                text: title,
                font: { size: 12, weight: 'bold' },
                padding: { top: 4, bottom: 4 }
            }
        }
    };
    
    if (type === 'bar' || type === 'line') {
        baseOptions.scales = {
            x: {
                ticks: { font: { size: 9 } }
            },
            y: {
                ticks: { font: { size: 9 } }
            }
        };
    }
    
    return baseOptions;
}

function initDashboardPage() {
    if (dashboardChartsInitialized) {
        console.log('📊 Dashboard already initialized');
        return;
    }

    console.log('📊 Initializing Dashboard Page');

    // Initialize all charts
    initActiveProposalChart();
    initOneDriveSyncChart();
    initUserLoginTypeChart();
    initBackupStatusChart();
    initTicketStatusChart();
    initServerHealthChart();
    initLicenseUtilizationChart();
    initSecurityComplianceChart();
    initMonthlyRevenueChart();
    initDeviceTypeDistributionChart();
    initSupportResponseTimeChart();
    initNetworkUptimeChart();

    dashboardChartsInitialized = true;
    console.log('✅ Dashboard initialized successfully');
}

// Chart 1: Active Proposal Status
function initActiveProposalChart() {
    const ctx = document.getElementById('activeProposalChart');
    if (!ctx) return;

    if (dashboardCharts.activeProposal) {
        dashboardCharts.activeProposal.destroy();
    }

    dashboardCharts.activeProposal = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Dark Web Scan', 'Send Out Prep For Pitch', 'Network Analysis', 'Pitch Set'],
            datasets: [{
                data: [53.8, 28.8, 16.4, 1.0],
                backgroundColor: [
                    '#2196F3',
                    '#FF6B9D',
                    '#FFC107',
                    '#9C27B0'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 8,
                        font: { size: 10 },
                        boxWidth: 12,
                        generateLabels: function(chart) {
                            const data = chart.data;
                            return data.labels.map((label, i) => ({
                                text: `${label} (${data.datasets[0].data[i]}%)`,
                                fillStyle: data.datasets[0].backgroundColor[i],
                                hidden: false,
                                index: i
                            }));
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Active Proposal Status',
                    font: { size: 13, weight: 'bold' },
                    padding: { top: 5, bottom: 5 }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
}

// Chart 2: OneDrive Sync Status
function initOneDriveSyncChart() {
    const ctx = document.getElementById('oneDriveSyncChart');
    if (!ctx) return;

    if (dashboardCharts.oneDriveSync) {
        dashboardCharts.oneDriveSync.destroy();
    }

    dashboardCharts.oneDriveSync = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Not Installed', 'Not Running', 'Not Signed In', 'Paused'],
            datasets: [{
                data: [44, 17, 28, 11],
                backgroundColor: [
                    '#003B73',
                    '#5DADE2',
                    '#85C1E9',
                    '#AED6F1'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 15,
                        font: { size: 12 },
                        generateLabels: function(chart) {
                            const data = chart.data;
                            return data.labels.map((label, i) => ({
                                text: `${label} (${data.datasets[0].data[i]}%)`,
                                fillStyle: data.datasets[0].backgroundColor[i],
                                hidden: false,
                                index: i
                            }));
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'OneDrive Sync Status',
                    font: { size: 16, weight: 'bold' }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
}

// Chart 3: User Login Account Type
function initUserLoginTypeChart() {
    const ctx = document.getElementById('userLoginTypeChart');
    if (!ctx) return;

    if (dashboardCharts.userLoginType) {
        dashboardCharts.userLoginType.destroy();
    }

    dashboardCharts.userLoginType = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Entra ID', 'Active Directory', 'Local Account'],
            datasets: [{
                data: [77, 15, 9],
                backgroundColor: [
                    '#0078D4',
                    '#50E6FF',
                    '#E1E1E1'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 15,
                        font: { size: 12 },
                        generateLabels: function(chart) {
                            const data = chart.data;
                            return data.labels.map((label, i) => ({
                                text: `${label} (${data.datasets[0].data[i]}%)`,
                                fillStyle: data.datasets[0].backgroundColor[i],
                                hidden: false,
                                index: i
                            }));
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'User Login Account Type',
                    font: { size: 16, weight: 'bold' }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
}

// Chart 4: Backup Status
function initBackupStatusChart() {
    const ctx = document.getElementById('backupStatusChart');
    if (!ctx) return;

    if (dashboardCharts.backupStatus) {
        dashboardCharts.backupStatus.destroy();
    }

    dashboardCharts.backupStatus = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Successful', 'Failed', 'In Progress', 'Not Configured'],
            datasets: [{
                data: [68, 12, 8, 12],
                backgroundColor: [
                    '#4CAF50',
                    '#F44336',
                    '#FF9800',
                    '#9E9E9E'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 15,
                        font: { size: 12 },
                        generateLabels: function(chart) {
                            const data = chart.data;
                            return data.labels.map((label, i) => ({
                                text: `${label} (${data.datasets[0].data[i]}%)`,
                                fillStyle: data.datasets[0].backgroundColor[i],
                                hidden: false,
                                index: i
                            }));
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Backup Status',
                    font: { size: 16, weight: 'bold' }
                }
            }
        }
    });
}

// Chart 5: Service Ticket Status
function initTicketStatusChart() {
    const ctx = document.getElementById('ticketStatusChart');
    if (!ctx) return;

    if (dashboardCharts.ticketStatus) {
        dashboardCharts.ticketStatus.destroy();
    }

    dashboardCharts.ticketStatus = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Open', 'In Progress', 'Waiting', 'Resolved', 'Closed'],
            datasets: [{
                label: 'Tickets',
                data: [23, 45, 12, 67, 89],
                backgroundColor: [
                    '#F44336',
                    '#FF9800',
                    '#FFC107',
                    '#4CAF50',
                    '#2196F3'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Service Ticket Status',
                    font: { size: 16, weight: 'bold' }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 20 }
                }
            }
        }
    });
}

// Chart 6: Server Health
function initServerHealthChart() {
    const ctx = document.getElementById('serverHealthChart');
    if (!ctx) return;

    if (dashboardCharts.serverHealth) {
        dashboardCharts.serverHealth.destroy();
    }

    dashboardCharts.serverHealth = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Healthy', 'Warning', 'Critical', 'Offline'],
            datasets: [{
                data: [72, 18, 6, 4],
                backgroundColor: [
                    '#4CAF50',
                    '#FF9800',
                    '#F44336',
                    '#424242'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 15,
                        font: { size: 12 },
                        generateLabels: function(chart) {
                            const data = chart.data;
                            return data.labels.map((label, i) => ({
                                text: `${label} (${data.datasets[0].data[i]}%)`,
                                fillStyle: data.datasets[0].backgroundColor[i],
                                hidden: false,
                                index: i
                            }));
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Server Health Status',
                    font: { size: 16, weight: 'bold' }
                }
            }
        }
    });
}

// Chart 7: License Utilization
function initLicenseUtilizationChart() {
    const ctx = document.getElementById('licenseUtilizationChart');
    if (!ctx) return;

    if (dashboardCharts.licenseUtilization) {
        dashboardCharts.licenseUtilization.destroy();
    }

    dashboardCharts.licenseUtilization = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Microsoft 365', 'Adobe CC', 'AutoCAD', 'Slack', 'Zoom', 'Salesforce'],
            datasets: [
                {
                    label: 'Used',
                    data: [245, 42, 18, 67, 89, 34],
                    backgroundColor: '#2196F3'
                },
                {
                    label: 'Available',
                    data: [55, 8, 7, 13, 11, 16],
                    backgroundColor: '#90CAF9'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                title: {
                    display: true,
                    text: 'License Utilization',
                    font: { size: 16, weight: 'bold' }
                }
            },
            scales: {
                x: { stacked: true },
                y: { stacked: true, beginAtZero: true }
            }
        }
    });
}

// Chart 8: Security Compliance
function initSecurityComplianceChart() {
    const ctx = document.getElementById('securityComplianceChart');
    if (!ctx) return;

    if (dashboardCharts.securityCompliance) {
        dashboardCharts.securityCompliance.destroy();
    }

    dashboardCharts.securityCompliance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Compliant', 'Non-Compliant', 'Partially Compliant'],
            datasets: [{
                data: [65, 15, 20],
                backgroundColor: [
                    '#4CAF50',
                    '#F44336',
                    '#FF9800'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 15,
                        font: { size: 12 },
                        generateLabels: function(chart) {
                            const data = chart.data;
                            return data.labels.map((label, i) => ({
                                text: `${label} (${data.datasets[0].data[i]}%)`,
                                fillStyle: data.datasets[0].backgroundColor[i],
                                hidden: false,
                                index: i
                            }));
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Security Compliance',
                    font: { size: 16, weight: 'bold' }
                }
            }
        }
    });
}

// Chart 9: Monthly Revenue Trend
function initMonthlyRevenueChart() {
    const ctx = document.getElementById('monthlyRevenueChart');
    if (!ctx) return;

    if (dashboardCharts.monthlyRevenue) {
        dashboardCharts.monthlyRevenue.destroy();
    }

    dashboardCharts.monthlyRevenue = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Revenue ($K)',
                data: [120, 135, 142, 158, 165, 178, 185, 192, 205, 218, 235, 248],
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Monthly Revenue Trend (2026)',
                    font: { size: 16, weight: 'bold' }
                },
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value + 'K';
                        }
                    }
                }
            }
        }
    });
}

// Chart 10: Device Type Distribution
function initDeviceTypeDistributionChart() {
    const ctx = document.getElementById('deviceTypeChart');
    if (!ctx) return;

    if (dashboardCharts.deviceType) {
        dashboardCharts.deviceType.destroy();
    }

    dashboardCharts.deviceType = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Laptops', 'Desktops', 'Servers', 'Mobile Devices', 'Network Equipment'],
            datasets: [{
                data: [42, 28, 12, 13, 5],
                backgroundColor: [
                    '#2196F3',
                    '#4CAF50',
                    '#FF9800',
                    '#9C27B0',
                    '#F44336'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 15,
                        font: { size: 12 },
                        generateLabels: function(chart) {
                            const data = chart.data;
                            return data.labels.map((label, i) => ({
                                text: `${label} (${data.datasets[0].data[i]}%)`,
                                fillStyle: data.datasets[0].backgroundColor[i],
                                hidden: false,
                                index: i
                            }));
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Device Type Distribution',
                    font: { size: 16, weight: 'bold' }
                }
            }
        }
    });
}

// Chart 11: Support Response Time
function initSupportResponseTimeChart() {
    const ctx = document.getElementById('responseTimeChart');
    if (!ctx) return;

    if (dashboardCharts.responseTime) {
        dashboardCharts.responseTime.destroy();
    }

    dashboardCharts.responseTime = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['< 15 min', '15-30 min', '30-60 min', '1-2 hrs', '> 2 hrs'],
            datasets: [{
                label: 'Tickets',
                data: [85, 62, 38, 24, 12],
                backgroundColor: [
                    '#4CAF50',
                    '#8BC34A',
                    '#FFC107',
                    '#FF9800',
                    '#F44336'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Support Response Time',
                    font: { size: 16, weight: 'bold' }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Tickets'
                    }
                }
            }
        }
    });
}

// Chart 12: Network Uptime
function initNetworkUptimeChart() {
    const ctx = document.getElementById('networkUptimeChart');
    if (!ctx) return;

    if (dashboardCharts.networkUptime) {
        dashboardCharts.networkUptime.destroy();
    }

    dashboardCharts.networkUptime = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Uptime %',
                data: [99.8, 99.9, 99.7, 99.85, 99.92, 99.88, 99.95, 99.93, 99.89, 99.91, 99.94, 99.96],
                borderColor: '#2196F3',
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Network Uptime (2026)',
                    font: { size: 16, weight: 'bold' }
                },
                legend: { display: false }
            },
            scales: {
                y: {
                    min: 99.5,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

// Refresh dashboard when window resizes
window.addEventListener('resize', () => {
    if (dashboardChartsInitialized) {
        Object.values(dashboardCharts).forEach(chart => {
            if (chart && chart.resize) {
                chart.resize();
            }
        });
    }
});

// Export for use in app-main.js
if (typeof window !== 'undefined') {
    window.initDashboardPage = initDashboardPage;
}

