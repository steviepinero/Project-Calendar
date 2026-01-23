// Shared Utilities for MSP Project Calendar
// Note: Settings management is handled in app-main.js
// Note: Dialog helpers (showDialog/hideDialog) are in syncfusion-init.js

// ===== DATE UTILITIES =====
function formatDate(date) {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getWeekDates(startDate) {
    const dates = [];
    const start = new Date(startDate);
    
    for (let i = 0; i < 7; i++) {
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        dates.push(date);
    }
    
    return dates;
}

function getMonday(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
}

// ===== COLOR UTILITIES =====
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

function getEmployeeColor(employeeName, teamMembers) {
    const member = teamMembers.find(m => m.name === employeeName);
    return member ? member.color : '#999';
}

function assignColor(index) {
    return COLORS[index % COLORS.length];
}

// ===== API HELPERS =====
async function apiCall(url, options = {}) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const error = await response.json();
            console.error('API Error:', error);
            return { success: false, error };
        }
        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('API Call Failed:', error);
        return { success: false, error: error.message };
    }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.Utils = {
        formatDate,
        getWeekDates,
        getMonday,
        COLORS,
        getEmployeeColor,
        assignColor,
        apiCall
    };
}

