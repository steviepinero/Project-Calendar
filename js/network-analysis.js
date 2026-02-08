/**
 * NETWORK ANALYSIS MODULE
 * Provides real-time network monitoring and analysis for client networks
 */

// Sample network data for demonstration
const networkData = {
    'Anderson Cabinet Designs': {
        health: 92,
        totalDevices: 24,
        onlineDevices: 22,
        bandwidth: {
            current: 156,
            max: 500,
            unit: 'Mbps'
        },
        uptime: '99.8%',
        latency: '12ms',
        packetLoss: '0.1%',
        devices: [
            { name: 'Main Firewall', ip: '192.168.1.1', type: 'Firewall', status: 'online', uptime: '45d 12h', cpu: '23%', memory: '45%' },
            { name: 'Core Switch', ip: '192.168.1.2', type: 'Switch', status: 'online', uptime: '45d 12h', cpu: '15%', memory: '32%' },
            { name: 'WiFi AP - Floor 1', ip: '192.168.1.10', type: 'Access Point', status: 'online', uptime: '30d 5h', cpu: '8%', memory: '28%' },
            { name: 'WiFi AP - Floor 2', ip: '192.168.1.11', type: 'Access Point', status: 'online', uptime: '30d 5h', cpu: '12%', memory: '31%' },
            { name: 'NAS Storage', ip: '192.168.1.20', type: 'Storage', status: 'online', uptime: '45d 12h', cpu: '35%', memory: '68%' },
            { name: 'Backup Server', ip: '192.168.1.21', type: 'Server', status: 'warning', uptime: '2d 8h', cpu: '78%', memory: '82%' },
            { name: 'Print Server', ip: '192.168.1.30', type: 'Server', status: 'online', uptime: '45d 12h', cpu: '5%', memory: '18%' },
            { name: 'Workstation-01', ip: '192.168.1.101', type: 'Workstation', status: 'online', uptime: '3d 2h', cpu: '42%', memory: '55%' },
        ],
        alerts: [
            { severity: 'warning', message: 'Backup Server CPU usage above 75%', time: '5 minutes ago' },
            { severity: 'info', message: 'Firewall firmware update available', time: '2 hours ago' },
            { severity: 'info', message: 'Monthly bandwidth usage at 68%', time: '1 day ago' }
        ],
        securityScore: 87,
        securityIssues: [
            '2 devices need firmware updates',
            '1 device with high resource usage'
        ]
    }
};

// Generate network data for all companies
function ensureNetworkDataForAllCompanies() {
    // Use window.leadsData from leads.js module
    if (!window.leadsData) {
        console.warn('⚠️ window.leadsData not available yet');
        return;
    }
    
    console.log('📊 Generating network data for', window.leadsData.length, 'companies');
    window.leadsData.forEach(lead => {
        if (!networkData[lead.Company]) {
            networkData[lead.Company] = generateDefaultNetworkData(lead.Company);
        }
    });
    console.log('✅ Network data generated for', Object.keys(networkData).length, 'companies');
}

let currentBandwidthChart = null;

/**
 * Generate default network data for companies
 */
function generateDefaultNetworkData(companyName) {
    const deviceCount = Math.floor(Math.random() * 30) + 10;
    const onlineCount = Math.floor(deviceCount * (0.85 + Math.random() * 0.15));
    const health = Math.floor(Math.random() * 20) + 75;
    
    return {
        health: health,
        totalDevices: deviceCount,
        onlineDevices: onlineCount,
        bandwidth: {
            current: Math.floor(Math.random() * 400) + 50,
            max: 500,
            unit: 'Mbps'
        },
        uptime: (99 + Math.random()).toFixed(1) + '%',
        latency: Math.floor(Math.random() * 30) + 5 + 'ms',
        packetLoss: (Math.random() * 0.5).toFixed(2) + '%',
        devices: generateDeviceList(deviceCount),
        alerts: generateAlerts(),
        securityScore: Math.floor(Math.random() * 30) + 70,
        securityIssues: [
            Math.floor(Math.random() * 5) + ' devices need firmware updates',
            Math.floor(Math.random() * 3) + ' devices with high resource usage'
        ]
    };
}

/**
 * Generate device list
 */
function generateDeviceList(count) {
    const devices = [];
    const types = ['Firewall', 'Switch', 'Access Point', 'Server', 'Workstation', 'Storage', 'Printer'];
    const statuses = ['online', 'online', 'online', 'online', 'warning', 'offline'];
    
    for (let i = 0; i < Math.min(count, 10); i++) {
        const type = types[Math.floor(Math.random() * types.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        devices.push({
            name: `${type}-${String(i + 1).padStart(2, '0')}`,
            ip: `192.168.1.${Math.floor(Math.random() * 200) + 10}`,
            type: type,
            status: status,
            uptime: `${Math.floor(Math.random() * 60)}d ${Math.floor(Math.random() * 24)}h`,
            cpu: Math.floor(Math.random() * 80) + '%',
            memory: Math.floor(Math.random() * 90) + '%'
        });
    }
    
    return devices;
}

/**
 * Generate alerts
 */
function generateAlerts() {
    const alertTypes = [
        { severity: 'warning', message: 'High CPU usage detected', time: '5 minutes ago' },
        { severity: 'critical', message: 'Device offline', time: '10 minutes ago' },
        { severity: 'info', message: 'Firmware update available', time: '2 hours ago' },
        { severity: 'warning', message: 'Bandwidth threshold exceeded', time: '1 hour ago' },
        { severity: 'info', message: 'Backup completed successfully', time: '3 hours ago' }
    ];
    
    const alertCount = Math.floor(Math.random() * 4) + 1;
    const alerts = [];
    
    for (let i = 0; i < alertCount; i++) {
        alerts.push(alertTypes[Math.floor(Math.random() * alertTypes.length)]);
    }
    
    return alerts;
}

/**
 * Initialize the Network Analysis page
 */
function initializeNetworkAnalysis() {
    console.log('🌐 Initializing Network Analysis page...');
    console.log('📊 window.leadsData status:', window.leadsData ? `${window.leadsData.length} companies available` : 'NOT FOUND');
    
    // Check if we're on the network analysis page
    const networkPage = document.getElementById('page-network-analysis');
    if (!networkPage || !networkPage.classList.contains('active')) {
        console.log('❌ Network analysis page not active, skipping initialization');
        return;
    }
    
    console.log('✅ Network analysis page is active');
    
    // Ensure network data is generated for all companies
    ensureNetworkDataForAllCompanies();
    
    // Populate company selector with detailed logging
    const populateSuccess = populateCompanySelector();
    
    if (!populateSuccess) {
        console.error('❌ Failed to populate company selector');
        // Retry after a delay
        setTimeout(() => {
            console.log('🔄 Retrying company selector population...');
            if (populateCompanySelector()) {
                setupEventListeners();
                loadFirstCompany();
            }
        }, 1000);
        return;
    }
    
    // Set up event listeners
    setupEventListeners();
    
    // Load first company
    loadFirstCompany();
    
    console.log('✅ Network Analysis page initialized');
}

/**
 * Load first company's data
 */
function loadFirstCompany() {
    if (!window.leadsData || window.leadsData.length === 0) {
        console.warn('⚠️ No leads data available to load first company');
        return;
    }
    
    const selector = document.getElementById('networkCompanySelector');
    if (selector) {
        const firstCompany = window.leadsData[0].Company;
        selector.value = firstCompany;
        console.log('📍 Loading first company:', firstCompany);
        loadNetworkData(firstCompany);
    }
}

/**
 * Populate company selector dropdown
 */
function populateCompanySelector() {
    const selector = document.getElementById('networkCompanySelector');
    if (!selector) {
        console.error('❌ Network company selector element not found!');
        return false;
    }
    
    // Check if window.leadsData is available
    if (!window.leadsData || !Array.isArray(window.leadsData)) {
        console.error('❌ window.leadsData not available!');
        console.log('window.leadsData value:', window.leadsData);
        selector.innerHTML = '<option value="">-- Select a company --</option><option disabled>Loading companies...</option>';
        return false;
    }
    
    console.log('🔍 Found selector element, populating with', window.leadsData.length, 'companies');
    selector.innerHTML = '<option value="">-- Select a company --</option>';
    
    window.leadsData.forEach((lead, index) => {
        const option = document.createElement('option');
        option.value = lead.Company;
        option.textContent = lead.Company;
        selector.appendChild(option);
        if (index < 3) {
            console.log('  ✓ Added:', lead.Company);
        }
    });
    
    console.log('✅ Company selector populated with', selector.options.length - 1, 'companies');
    return true;
}

/**
 * Set up event listeners
 */
function setupEventListeners() {
    const selector = document.getElementById('networkCompanySelector');
    if (selector) {
        selector.addEventListener('change', (e) => {
            if (e.target.value) {
                loadNetworkData(e.target.value);
            }
        });
    }
    
    const refreshBtn = document.getElementById('refreshNetworkBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            const selector = document.getElementById('networkCompanySelector');
            if (selector && selector.value) {
                loadNetworkData(selector.value);
                alert('🔄 Network data refreshed!');
            }
        });
    }
}

/**
 * Load network data for selected company
 */
function loadNetworkData(companyName) {
    console.log('📊 Loading network data for:', companyName);
    
    const data = networkData[companyName];
    if (!data) {
        console.error('No network data found for:', companyName);
        return;
    }
    
    // Update health cards
    updateHealthCards(data);
    
    // Update network topology
    updateNetworkTopology(data);
    
    // Update bandwidth chart
    updateBandwidthChart();
    
    // Update device status table
    updateDeviceStatusTable(data.devices);
    
    // Update alerts
    updateAlerts(data.alerts);
    
    // Update security score
    updateSecurityScore(data.securityScore, data.securityIssues);
    
    // Update network info
    updateNetworkInfo(data);
}

/**
 * Update health overview cards
 */
function updateHealthCards(data) {
    const cardsContainer = document.getElementById('networkHealthCards');
    if (!cardsContainer) return;
    
    const healthColor = data.health >= 90 ? '#27ae60' : data.health >= 70 ? '#f39c12' : '#e74c3c';
    
    cardsContainer.innerHTML = `
        <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-left: 4px solid ${healthColor};">
            <div style="color: #999; font-size: 13px; margin-bottom: 5px;">Network Health</div>
            <div style="font-size: 32px; font-weight: 700; color: ${healthColor};">${data.health}%</div>
        </div>
        <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-left: 4px solid #3498db;">
            <div style="color: #999; font-size: 13px; margin-bottom: 5px;">Devices Online</div>
            <div style="font-size: 32px; font-weight: 700; color: #2c3e50;">${data.onlineDevices}/${data.totalDevices}</div>
        </div>
        <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-left: 4px solid #9b59b6;">
            <div style="color: #999; font-size: 13px; margin-bottom: 5px;">Bandwidth Usage</div>
            <div style="font-size: 32px; font-weight: 700; color: #2c3e50;">${data.bandwidth.current} ${data.bandwidth.unit}</div>
            <div style="font-size: 12px; color: #999;">of ${data.bandwidth.max} ${data.bandwidth.unit}</div>
        </div>
        <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-left: 4px solid #27ae60;">
            <div style="color: #999; font-size: 13px; margin-bottom: 5px;">Uptime</div>
            <div style="font-size: 32px; font-weight: 700; color: #2c3e50;">${data.uptime}</div>
        </div>
        <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-left: 4px solid #f39c12;">
            <div style="color: #999; font-size: 13px; margin-bottom: 5px;">Latency</div>
            <div style="font-size: 32px; font-weight: 700; color: #2c3e50;">${data.latency}</div>
        </div>
        <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-left: 4px solid #e74c3c;">
            <div style="color: #999; font-size: 13px; margin-bottom: 5px;">Packet Loss</div>
            <div style="font-size: 32px; font-weight: 700; color: #2c3e50;">${data.packetLoss}</div>
        </div>
    `;
}

/**
 * Update network topology visualization
 */
function updateNetworkTopology(data) {
    const container = document.getElementById('networkTopologyMap');
    if (!container) return;
    
    // Simple network diagram using HTML/CSS
    container.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; padding: 30px;">
            <!-- Internet -->
            <div style="background: #3498db; color: white; padding: 15px 30px; border-radius: 8px; font-weight: 600; box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3); margin-bottom: 20px;">
                ☁️ Internet
            </div>
            
            <div style="width: 2px; height: 30px; background: #95a5a6;"></div>
            
            <!-- Firewall -->
            <div style="background: #e74c3c; color: white; padding: 15px 30px; border-radius: 8px; font-weight: 600; box-shadow: 0 4px 8px rgba(231, 76, 60, 0.3); margin-bottom: 20px;">
                🛡️ Firewall
            </div>
            
            <div style="width: 2px; height: 30px; background: #95a5a6;"></div>
            
            <!-- Core Switch -->
            <div style="background: #27ae60; color: white; padding: 15px 30px; border-radius: 8px; font-weight: 600; box-shadow: 0 4px 8px rgba(39, 174, 96, 0.3); margin-bottom: 20px;">
                🔀 Core Switch
            </div>
            
            <!-- Branches -->
            <div style="display: flex; gap: 40px; position: relative;">
                <!-- Left branch line -->
                <div style="position: absolute; top: -20px; left: 50%; width: 200px; height: 2px; background: #95a5a6; transform: translateX(-100%);"></div>
                <!-- Right branch line -->
                <div style="position: absolute; top: -20px; left: 50%; width: 200px; height: 2px; background: #95a5a6;"></div>
                <!-- Center line -->
                <div style="position: absolute; top: -20px; left: 50%; width: 2px; height: 20px; background: #95a5a6; transform: translateX(-50%);"></div>
                
                <!-- Servers -->
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <div style="width: 2px; height: 20px; background: #95a5a6; margin-bottom: 5px;"></div>
                    <div style="background: #9b59b6; color: white; padding: 10px 20px; border-radius: 6px; font-size: 14px;">
                        🖥️ Servers (${data.devices.filter(d => d.type === 'Server').length})
                    </div>
                </div>
                
                <!-- Access Points -->
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <div style="width: 2px; height: 20px; background: #95a5a6; margin-bottom: 5px;"></div>
                    <div style="background: #f39c12; color: white; padding: 10px 20px; border-radius: 6px; font-size: 14px;">
                        📡 WiFi APs (${data.devices.filter(d => d.type === 'Access Point').length})
                    </div>
                </div>
                
                <!-- Workstations -->
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <div style="width: 2px; height: 20px; background: #95a5a6; margin-bottom: 5px;"></div>
                    <div style="background: #1abc9c; color: white; padding: 10px 20px; border-radius: 6px; font-size: 14px;">
                        💻 Workstations (${data.devices.filter(d => d.type === 'Workstation').length})
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Update bandwidth chart
 */
function updateBandwidthChart() {
    const canvas = document.getElementById('bandwidthChart');
    if (!canvas) return;
    
    // Destroy existing chart if it exists
    if (currentBandwidthChart) {
        currentBandwidthChart.destroy();
    }
    
    // Generate sample bandwidth data for last 24 hours
    const labels = [];
    const uploadData = [];
    const downloadData = [];
    
    for (let i = 23; i >= 0; i--) {
        labels.push(`${i}:00`);
        uploadData.push(Math.floor(Math.random() * 100) + 20);
        downloadData.push(Math.floor(Math.random() * 200) + 50);
    }
    
    const ctx = canvas.getContext('2d');
    currentBandwidthChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Download',
                    data: downloadData,
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Upload',
                    data: uploadData,
                    borderColor: '#27ae60',
                    backgroundColor: 'rgba(39, 174, 96, 0.1)',
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Mbps'
                    }
                }
            }
        }
    });
}

/**
 * Update device status table
 */
function updateDeviceStatusTable(devices) {
    const container = document.getElementById('deviceStatusGrid');
    if (!container) return;
    
    let tableHTML = `
        <table style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr style="background: #34495e; color: white;">
                    <th style="padding: 12px; text-align: left; font-size: 13px;">Device</th>
                    <th style="padding: 12px; text-align: left; font-size: 13px;">IP Address</th>
                    <th style="padding: 12px; text-align: left; font-size: 13px;">Type</th>
                    <th style="padding: 12px; text-align: center; font-size: 13px;">Status</th>
                    <th style="padding: 12px; text-align: left; font-size: 13px;">Uptime</th>
                    <th style="padding: 12px; text-align: center; font-size: 13px;">CPU</th>
                    <th style="padding: 12px; text-align: center; font-size: 13px;">Memory</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    devices.forEach((device, index) => {
        const statusColor = device.status === 'online' ? '#27ae60' : device.status === 'warning' ? '#f39c12' : '#e74c3c';
        const statusIcon = device.status === 'online' ? '✅' : device.status === 'warning' ? '⚠️' : '❌';
        const rowBg = index % 2 === 0 ? '#f8f9fa' : 'white';
        
        tableHTML += `
            <tr style="background: ${rowBg}; border-bottom: 1px solid #ecf0f1;">
                <td style="padding: 12px; font-size: 13px; font-weight: 600;">${device.name}</td>
                <td style="padding: 12px; font-size: 13px; color: #666;">${device.ip}</td>
                <td style="padding: 12px; font-size: 13px;">${device.type}</td>
                <td style="padding: 12px; text-align: center;">
                    <span style="color: ${statusColor}; font-size: 16px;">${statusIcon}</span>
                </td>
                <td style="padding: 12px; font-size: 13px; color: #666;">${device.uptime}</td>
                <td style="padding: 12px; text-align: center; font-size: 13px;">${device.cpu}</td>
                <td style="padding: 12px; text-align: center; font-size: 13px;">${device.memory}</td>
            </tr>
        `;
    });
    
    tableHTML += `
            </tbody>
        </table>
    `;
    
    container.innerHTML = tableHTML;
}

/**
 * Update alerts panel
 */
function updateAlerts(alerts) {
    const container = document.getElementById('networkAlerts');
    if (!container) return;
    
    if (alerts.length === 0) {
        container.innerHTML = `
            <div style="padding: 15px; text-align: center; color: #999; font-size: 13px;">
                ✅ No active alerts
            </div>
        `;
        return;
    }
    
    container.innerHTML = alerts.map(alert => {
        const bgColor = alert.severity === 'critical' ? '#fee' : alert.severity === 'warning' ? '#fff3cd' : '#e8f4f8';
        const iconColor = alert.severity === 'critical' ? '#e74c3c' : alert.severity === 'warning' ? '#f39c12' : '#3498db';
        const icon = alert.severity === 'critical' ? '🔴' : alert.severity === 'warning' ? '⚠️' : 'ℹ️';
        
        return `
            <div style="background: ${bgColor}; padding: 12px; border-radius: 6px; border-left: 3px solid ${iconColor};">
                <div style="display: flex; align-items: start; gap: 8px;">
                    <span style="font-size: 16px;">${icon}</span>
                    <div style="flex: 1;">
                        <div style="font-size: 13px; color: #2c3e50; font-weight: 600; margin-bottom: 3px;">
                            ${alert.message}
                        </div>
                        <div style="font-size: 11px; color: #666;">
                            ${alert.time}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

/**
 * Update security score
 */
function updateSecurityScore(score, issues) {
    const circle = document.getElementById('securityScoreCircle');
    const text = document.getElementById('securityScoreText');
    
    if (!circle || !text) return;
    
    const color = score >= 90 ? '#27ae60' : score >= 70 ? '#f39c12' : '#e74c3c';
    
    circle.innerHTML = `
        <svg width="120" height="120" style="transform: rotate(-90deg);">
            <circle cx="60" cy="60" r="50" stroke="#ecf0f1" stroke-width="10" fill="none"/>
            <circle cx="60" cy="60" r="50" stroke="${color}" stroke-width="10" fill="none"
                    stroke-dasharray="${(score / 100) * 314} 314" stroke-linecap="round"/>
        </svg>
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
            <div style="font-size: 28px; font-weight: 700; color: ${color};">${score}</div>
            <div style="font-size: 12px; color: #999;">/ 100</div>
        </div>
    `;
    
    text.innerHTML = `
        <div style="text-align: left; padding: 0 10px;">
            ${issues.map(issue => `<div style="margin-bottom: 5px;">• ${issue}</div>`).join('')}
        </div>
    `;
}

/**
 * Update network info
 */
function updateNetworkInfo(data) {
    const container = document.getElementById('networkInfoDetails');
    if (!container) return;
    
    container.innerHTML = `
        <div style="margin-bottom: 10px;">
            <strong>Public IP:</strong><br>
            203.0.113.${Math.floor(Math.random() * 255)}
        </div>
        <div style="margin-bottom: 10px;">
            <strong>Subnet:</strong><br>
            192.168.1.0/24
        </div>
        <div style="margin-bottom: 10px;">
            <strong>DNS Servers:</strong><br>
            8.8.8.8, 8.8.4.4
        </div>
        <div style="margin-bottom: 10px;">
            <strong>Gateway:</strong><br>
            192.168.1.1
        </div>
        <div style="margin-bottom: 10px;">
            <strong>DHCP Range:</strong><br>
            192.168.1.100 - 192.168.1.200
        </div>
        <div>
            <strong>Last Scan:</strong><br>
            ${new Date().toLocaleString()}
        </div>
    `;
}

/**
 * Initialize Network Analysis for a specific company (for use in leads tab)
 */
function initializeNetworkAnalysisForCompany(company, container) {
    console.log('🌐 Initializing network analysis for company:', company.Company);
    
    // Ensure network data exists for this company
    if (!networkData[company.Company]) {
        networkData[company.Company] = generateDefaultNetworkData(company.Company);
    }
    
    const data = networkData[company.Company];
    
    // Build the HTML for network analysis
    const networkHTML = `
        <!-- Network Health Overview Cards -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 25px; padding: 20px;">
            ${generateHealthCardsHTML(data)}
        </div>

        <!-- Main Content Area -->
        <div style="display: grid; grid-template-columns: 1fr 350px; gap: 20px; padding: 0 20px 20px;">
            <!-- Left Column: Charts and Analysis -->
            <div style="display: flex; flex-direction: column; gap: 20px;">
                <!-- Network Topology Map -->
                <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                    <h3 style="margin: 0 0 20px 0; color: #2c3e50; display: flex; align-items: center; gap: 10px;">
                        <span>🗺️ Network Topology</span>
                        <span style="font-size: 12px; background: #e8f4f8; color: #2980b9; padding: 4px 10px; border-radius: 12px; font-weight: normal;">Live View</span>
                    </h3>
                    <div id="networkTopologyMapTab" style="height: 400px; background: #f8f9fa; border-radius: 8px; position: relative; overflow: hidden;">
                        ${generateTopologyHTML(data)}
                    </div>
                </div>

                <!-- Bandwidth Usage Chart -->
                <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                    <h3 style="margin: 0 0 20px 0; color: #2c3e50;">📊 Bandwidth Usage (Last 24 Hours)</h3>
                    <canvas id="bandwidthChartTab" style="max-height: 300px;"></canvas>
                </div>

                <!-- Device Status Table -->
                <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                    <h3 style="margin: 0 0 20px 0; color: #2c3e50;">💻 Device Status Monitor</h3>
                    <div id="deviceStatusTab">
                        ${generateDeviceTableHTML(data.devices)}
                    </div>
                </div>
            </div>

            <!-- Right Column: Details and Alerts -->
            <div style="display: flex; flex-direction: column; gap: 20px;">
                <!-- Network Alerts -->
                <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                    <h3 style="margin: 0 0 15px 0; color: #2c3e50; font-size: 16px;">⚠️ Active Alerts</h3>
                    <div id="networkAlertsTab">
                        ${generateAlertsHTML(data.alerts)}
                    </div>
                </div>

                <!-- Security Score -->
                <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                    <h3 style="margin: 0 0 15px 0; color: #2c3e50; font-size: 16px;">🔒 Security Score</h3>
                    <div style="text-align: center; padding: 20px 0;">
                        ${generateSecurityScoreHTML(data.securityScore, data.securityIssues)}
                    </div>
                </div>

                <!-- Network Info -->
                <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                    <h3 style="margin: 0 0 15px 0; color: #2c3e50; font-size: 16px;">ℹ️ Network Info</h3>
                    <div style="font-size: 13px; color: #666; line-height: 1.8;">
                        ${generateNetworkInfoHTML(data)}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    container.innerHTML = networkHTML;
    
    // Initialize the bandwidth chart after a short delay
    setTimeout(() => {
        initializeBandwidthChartTab();
    }, 100);
    
    console.log('✅ Network analysis rendered for', company.Company);
}

// Helper functions to generate HTML sections
function generateHealthCardsHTML(data) {
    const healthColor = data.health >= 90 ? '#27ae60' : data.health >= 70 ? '#f39c12' : '#e74c3c';
    
    return `
        <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-left: 4px solid ${healthColor};">
            <div style="color: #999; font-size: 13px; margin-bottom: 5px;">Network Health</div>
            <div style="font-size: 32px; font-weight: 700; color: ${healthColor};">${data.health}%</div>
        </div>
        <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-left: 4px solid #3498db;">
            <div style="color: #999; font-size: 13px; margin-bottom: 5px;">Devices Online</div>
            <div style="font-size: 32px; font-weight: 700; color: #2c3e50;">${data.onlineDevices}/${data.totalDevices}</div>
        </div>
        <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-left: 4px solid #9b59b6;">
            <div style="color: #999; font-size: 13px; margin-bottom: 5px;">Bandwidth Usage</div>
            <div style="font-size: 32px; font-weight: 700; color: #2c3e50;">${data.bandwidth.current} ${data.bandwidth.unit}</div>
            <div style="font-size: 12px; color: #999;">of ${data.bandwidth.max} ${data.bandwidth.unit}</div>
        </div>
        <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-left: 4px solid #27ae60;">
            <div style="color: #999; font-size: 13px; margin-bottom: 5px;">Uptime</div>
            <div style="font-size: 32px; font-weight: 700; color: #2c3e50;">${data.uptime}</div>
        </div>
    `;
}

function generateTopologyHTML(data) {
    return `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; padding: 30px;">
            <!-- Internet -->
            <div style="background: #3498db; color: white; padding: 15px 30px; border-radius: 8px; font-weight: 600; box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3); margin-bottom: 20px;">
                ☁️ Internet
            </div>
            
            <div style="width: 2px; height: 30px; background: #95a5a6;"></div>
            
            <!-- Firewall -->
            <div style="background: #e74c3c; color: white; padding: 15px 30px; border-radius: 8px; font-weight: 600; box-shadow: 0 4px 8px rgba(231, 76, 60, 0.3); margin-bottom: 20px;">
                🛡️ Firewall
            </div>
            
            <div style="width: 2px; height: 30px; background: #95a5a6;"></div>
            
            <!-- Core Switch -->
            <div style="background: #27ae60; color: white; padding: 15px 30px; border-radius: 8px; font-weight: 600; box-shadow: 0 4px 8px rgba(39, 174, 96, 0.3); margin-bottom: 20px;">
                🔀 Core Switch
            </div>
            
            <!-- Branches -->
            <div style="display: flex; gap: 40px; position: relative;">
                <!-- Lines -->
                <div style="position: absolute; top: -20px; left: 50%; width: 200px; height: 2px; background: #95a5a6; transform: translateX(-100%);"></div>
                <div style="position: absolute; top: -20px; left: 50%; width: 200px; height: 2px; background: #95a5a6;"></div>
                <div style="position: absolute; top: -20px; left: 50%; width: 2px; height: 20px; background: #95a5a6; transform: translateX(-50%);"></div>
                
                <!-- Servers -->
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <div style="width: 2px; height: 20px; background: #95a5a6; margin-bottom: 5px;"></div>
                    <div style="background: #9b59b6; color: white; padding: 10px 20px; border-radius: 6px; font-size: 14px;">
                        🖥️ Servers (${data.devices.filter(d => d.type === 'Server').length})
                    </div>
                </div>
                
                <!-- Access Points -->
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <div style="width: 2px; height: 20px; background: #95a5a6; margin-bottom: 5px;"></div>
                    <div style="background: #f39c12; color: white; padding: 10px 20px; border-radius: 6px; font-size: 14px;">
                        📡 WiFi APs (${data.devices.filter(d => d.type === 'Access Point').length})
                    </div>
                </div>
                
                <!-- Workstations -->
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <div style="width: 2px; height: 20px; background: #95a5a6; margin-bottom: 5px;"></div>
                    <div style="background: #1abc9c; color: white; padding: 10px 20px; border-radius: 6px; font-size: 14px;">
                        💻 Workstations (${data.devices.filter(d => d.type === 'Workstation').length})
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateDeviceTableHTML(devices) {
    let tableHTML = `
        <table style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr style="background: #34495e; color: white;">
                    <th style="padding: 12px; text-align: left; font-size: 13px;">Device</th>
                    <th style="padding: 12px; text-align: left; font-size: 13px;">IP Address</th>
                    <th style="padding: 12px; text-align: left; font-size: 13px;">Type</th>
                    <th style="padding: 12px; text-align: center; font-size: 13px;">Status</th>
                    <th style="padding: 12px; text-align: center; font-size: 13px;">CPU</th>
                    <th style="padding: 12px; text-align: center; font-size: 13px;">Memory</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    devices.forEach((device, index) => {
        const statusColor = device.status === 'online' ? '#27ae60' : device.status === 'warning' ? '#f39c12' : '#e74c3c';
        const statusIcon = device.status === 'online' ? '✅' : device.status === 'warning' ? '⚠️' : '❌';
        const rowBg = index % 2 === 0 ? '#f8f9fa' : 'white';
        
        tableHTML += `
            <tr style="background: ${rowBg}; border-bottom: 1px solid #ecf0f1;">
                <td style="padding: 12px; font-size: 13px; font-weight: 600;">${device.name}</td>
                <td style="padding: 12px; font-size: 13px; color: #666;">${device.ip}</td>
                <td style="padding: 12px; font-size: 13px;">${device.type}</td>
                <td style="padding: 12px; text-align: center;">
                    <span style="color: ${statusColor}; font-size: 16px;">${statusIcon}</span>
                </td>
                <td style="padding: 12px; text-align: center; font-size: 13px;">${device.cpu}</td>
                <td style="padding: 12px; text-align: center; font-size: 13px;">${device.memory}</td>
            </tr>
        `;
    });
    
    tableHTML += '</tbody></table>';
    return tableHTML;
}

function generateAlertsHTML(alerts) {
    if (alerts.length === 0) {
        return '<div style="padding: 15px; text-align: center; color: #999; font-size: 13px;">✅ No active alerts</div>';
    }
    
    return alerts.map(alert => {
        const bgColor = alert.severity === 'critical' ? '#fee' : alert.severity === 'warning' ? '#fff3cd' : '#e8f4f8';
        const iconColor = alert.severity === 'critical' ? '#e74c3c' : alert.severity === 'warning' ? '#f39c12' : '#3498db';
        const icon = alert.severity === 'critical' ? '🔴' : alert.severity === 'warning' ? '⚠️' : 'ℹ️';
        
        return `
            <div style="background: ${bgColor}; padding: 12px; border-radius: 6px; border-left: 3px solid ${iconColor}; margin-bottom: 10px;">
                <div style="display: flex; align-items: start; gap: 8px;">
                    <span style="font-size: 16px;">${icon}</span>
                    <div style="flex: 1;">
                        <div style="font-size: 13px; color: #2c3e50; font-weight: 600; margin-bottom: 3px;">
                            ${alert.message}
                        </div>
                        <div style="font-size: 11px; color: #666;">
                            ${alert.time}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function generateSecurityScoreHTML(score, issues) {
    const color = score >= 90 ? '#27ae60' : score >= 70 ? '#f39c12' : '#e74c3c';
    
    return `
        <div style="width: 120px; height: 120px; margin: 0 auto 15px; position: relative;">
            <svg width="120" height="120" style="transform: rotate(-90deg);">
                <circle cx="60" cy="60" r="50" stroke="#ecf0f1" stroke-width="10" fill="none"/>
                <circle cx="60" cy="60" r="50" stroke="${color}" stroke-width="10" fill="none"
                        stroke-dasharray="${(score / 100) * 314} 314" stroke-linecap="round"/>
            </svg>
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
                <div style="font-size: 28px; font-weight: 700; color: ${color};">${score}</div>
                <div style="font-size: 12px; color: #999;">/ 100</div>
            </div>
        </div>
        <div style="text-align: left; padding: 0 10px; font-size: 14px; color: #666; line-height: 1.6;">
            ${issues.map(issue => `<div style="margin-bottom: 5px;">• ${issue}</div>`).join('')}
        </div>
    `;
}

function generateNetworkInfoHTML(data) {
    return `
        <div style="margin-bottom: 10px;">
            <strong>Public IP:</strong><br>
            203.0.113.${Math.floor(Math.random() * 255)}
        </div>
        <div style="margin-bottom: 10px;">
            <strong>Subnet:</strong><br>
            192.168.1.0/24
        </div>
        <div style="margin-bottom: 10px;">
            <strong>DNS Servers:</strong><br>
            8.8.8.8, 8.8.4.4
        </div>
        <div style="margin-bottom: 10px;">
            <strong>Gateway:</strong><br>
            192.168.1.1
        </div>
        <div style="margin-bottom: 10px;">
            <strong>Uptime:</strong><br>
            ${data.uptime}
        </div>
        <div>
            <strong>Last Scan:</strong><br>
            ${new Date().toLocaleString()}
        </div>
    `;
}

function initializeBandwidthChartTab() {
    const canvas = document.getElementById('bandwidthChartTab');
    if (!canvas) return;
    
    // Generate sample bandwidth data
    const labels = [];
    const uploadData = [];
    const downloadData = [];
    
    for (let i = 23; i >= 0; i--) {
        labels.push(`${i}:00`);
        uploadData.push(Math.floor(Math.random() * 100) + 20);
        downloadData.push(Math.floor(Math.random() * 200) + 50);
    }
    
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Download',
                    data: downloadData,
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Upload',
                    data: uploadData,
                    borderColor: '#27ae60',
                    backgroundColor: 'rgba(39, 174, 96, 0.1)',
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'top',
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Mbps'
                    }
                }
            }
        }
    });
}

// Export the initialization function
if (typeof window !== 'undefined') {
    window.initializeNetworkAnalysis = initializeNetworkAnalysis;
    window.initializeNetworkAnalysisForCompany = initializeNetworkAnalysisForCompany;
    console.log('✅ Network Analysis module loaded');
}

