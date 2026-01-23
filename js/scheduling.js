// Scheduling & Gantt Chart Module

// ===== DATA STRUCTURES =====
let projects = [];
let selectedProjectId = null;
let editingProjectId = null;
let teamMembers = {
    person1: { name: 'John Smith', dailyLimit: 8, color: 'person1', gradient: ['#667eea', '#764ba2'] },
    person2: { name: 'Jane Doe', dailyLimit: 8, color: 'person2', gradient: ['#f093fb', '#f5576c'] },
    person3: { name: 'Bob Johnson', dailyLimit: 6, color: 'person3', gradient: ['#4facfe', '#00f2fe'] },
    person4: { name: 'Alice Williams', dailyLimit: 8, color: 'person4', gradient: ['#43e97b', '#38f9d7'] }
};

// Predefined color gradients for new employees
const colorPalette = [
    ['#ff6b6b', '#ee5a6f'], // Red
    ['#4ecdc4', '#44a08d'], // Teal
    ['#ffe66d', '#ffa500'], // Yellow/Orange
    ['#a8e6cf', '#88d8a3'], // Light Green
    ['#ff8b94', '#ffaaa5'], // Pink
    ['#95e1d3', '#f38181'], // Mint/Pink
    ['#aa96da', '#c5fad5'], // Purple/Green
    ['#fcbad3', '#ffd3a5'], // Pink/Peach
    ['#a8edea', '#fed6e3'], // Cyan/Pink
    ['#d299c2', '#fef9d7'], // Purple/Yellow
    ['#89f7fe', '#66a6ff'], // Blue
    ['#fdbb2d', '#22c1c3'], // Yellow/Teal
    ['#f093fb', '#f5576c'], // Pink/Red (already used but can repeat)
    ['#4facfe', '#00f2fe'], // Blue (already used but can repeat)
    ['#43e97b', '#38f9d7']  // Green (already used but can repeat)
];

let colorPaletteIndex = 0;

// Column resizing state
let columnWidths = [];
let isResizing = false;
let currentResizer = null;
let startX = 0;
let startWidth = 0;
let columnIndex = 0;

// View mode state
let viewMode = 'multi-week'; // 'multi-week' or 'single-week'
let currentWeekStart = null;
let isInitialLoad = true;
let shouldAnimateBars = false;
let newlyCreatedProjectId = null;

// ===== INITIALIZATION =====
function initializeSchedulingPage() {
    console.log('📊 Initializing scheduling page...');
    
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    
    // Set date values for Syncfusion date inputs
    const requestDate = document.getElementById('requestDate');
    const assignedStartDate = document.getElementById('assignedStartDate');
    const preferredStartDate = document.getElementById('preferredStartDate');
    
    if (requestDate) requestDate.value = todayString;
    if (assignedStartDate) assignedStartDate.value = todayString;
    if (preferredStartDate) preferredStartDate.value = todayString;
    
    // Render initial data
    renderGanttChart();
    renderProjectTree();
    
    console.log('✅ Scheduling page initialized');
}

// ===== PROJECT CRUD =====
function saveProject() {
    const name = document.getElementById('projectName').value;
    const assignedTo = document.getElementById('assignedTo').value;
    const dailyLimit = parseFloat(document.getElementById('dailyHourLimit').value);
    const duration = parseFloat(document.getElementById('taskDuration').value);
    const preferredStart = new Date(document.getElementById('preferredStartDate').value);
    const type = document.getElementById('projectType').value;

    // Check for scheduling conflicts
    const conflict = checkSchedulingConflict(assignedTo, preferredStart, duration, dailyLimit);
    
    if (conflict) {
        // Show alert with alternatives
        const alternatives = conflict.alternatives;
        const dateFormatter = new Intl.DateTimeFormat('en-US', { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
        
        let alertMessage = `⚠️ SCHEDULING CONFLICT\n\n`;
        alertMessage += `${teamMembers[assignedTo].name}'s capacity is exceeded on ${dateFormatter.format(preferredStart)}\n\n`;
        alertMessage += `Hours required: ${duration}h\n`;
        alertMessage += `Hours already scheduled: ${conflict.hoursOnPreferredDate}h\n`;
        alertMessage += `Daily limit: ${dailyLimit}h\n\n`;
        alertMessage += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        alertMessage += `WHAT WILL HAPPEN:\n`;
        alertMessage += `The project will be automatically rescheduled to the\n`;
        alertMessage += `next available date for this agent.\n\n`;
        alertMessage += `ALTERNATIVES (if you want to reassign):\n\n`;
        
        // Show alternatives
        if (alternatives.differentDays.length > 0) {
            alertMessage += `${teamMembers[assignedTo].name} available on:\n`;
            alternatives.differentDays.slice(0, 3).forEach(alt => {
                alertMessage += `  • ${dateFormatter.format(alt.date)} (${alt.availableHours}h)\n`;
            });
            alertMessage += `\n`;
        }
        
        if (alternatives.otherAgents.length > 0) {
            alertMessage += `Other agents available on ${dateFormatter.format(preferredStart)}:\n`;
            alternatives.otherAgents.slice(0, 3).forEach(alt => {
                alertMessage += `  • ${alt.name} (${alt.availableHours}h available)\n`;
            });
        }
        
        alertMessage += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        alertMessage += `Continue and auto-reschedule?`;
        
        if (!confirm(alertMessage)) {
            return; // Cancel the save
        }
    }

    // Calculate optimal start date based on team member's schedule
    const actualStart = calculateOptimalStartDate(assignedTo, preferredStart, duration, dailyLimit);

    const project = {
        id: Date.now(),
        name: name,
        assignedTo: assignedTo,
        assignedToName: teamMembers[assignedTo].name,
        dailyLimit: dailyLimit,
        duration: duration,
        startDate: actualStart,
        endDate: calculateEndDate(actualStart, duration, dailyLimit),
        type: type,
        status: 'Active',
        description: '',
        notes: ''
    };

    projects.push(project);
    newlyCreatedProjectId = project.id;
    renderAll();
    
    // Show notification if start date was changed from preferred date
    if (actualStart.toDateString() !== preferredStart.toDateString()) {
        const dateFormatter = new Intl.DateTimeFormat('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        setTimeout(() => {
            alert(`📅 Project Created with Schedule Adjustment\n\n` +
                  `Project: ${name}\n` +
                  `Assigned to: ${teamMembers[assignedTo].name}\n\n` +
                  `⚠️ Preferred Start: ${dateFormatter.format(preferredStart)}\n` +
                  `✓ Actual Start: ${dateFormatter.format(actualStart)}\n\n` +
                  `The preferred date had insufficient availability.\n` +
                  `Project has been scheduled for the next available slot.`);
        }, 300);
    }
    
    // Animate the newly created bar after rendering
    requestAnimationFrame(() => {
        const newBar = document.querySelector(`[data-project-id="${newlyCreatedProjectId}"]`);
        if (newBar) {
            newBar.classList.add('animate-in');
        }
        newlyCreatedProjectId = null;
    });
}

function openEditModal(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    editingProjectId = projectId;
    
    // Populate form fields
    document.getElementById('editProjectName').value = project.name;
    document.getElementById('editAssignedTo').value = project.assignedTo;
    document.getElementById('editStatus').value = project.status;
    document.getElementById('editDailyHourLimit').value = project.dailyLimit;
    document.getElementById('editTaskDuration').value = project.duration;
    
    // Set date for Syncfusion date input
    const editStartDate = document.getElementById('editStartDate');
    if (editStartDate && project.startDate) {
        const dateString = project.startDate instanceof Date 
            ? project.startDate.toISOString().split('T')[0]
            : new Date(project.startDate).toISOString().split('T')[0];
        editStartDate.value = dateString;
    }
    
    document.getElementById('editProjectType').value = project.type;
    document.getElementById('editDescription').value = project.description || '';
    document.getElementById('editNotes').value = project.notes || '';
    
    console.log('✏️ Opening edit modal for project:', project.id);
    if (typeof window.showDialog === 'function') {
        window.showDialog('edit');  // Use 'edit' not 'editModal'
    }
}

function updateProject() {
    const project = projects.find(p => p.id === editingProjectId);
    if (!project) return;

    const name = document.getElementById('editProjectName').value;
    const assignedTo = document.getElementById('editAssignedTo').value;
    const status = document.getElementById('editStatus').value;
    const dailyLimit = parseFloat(document.getElementById('editDailyHourLimit').value);
    const duration = parseFloat(document.getElementById('editTaskDuration').value);
    const startDate = new Date(document.getElementById('editStartDate').value);
    const type = document.getElementById('editProjectType').value;
    const description = document.getElementById('editDescription').value;
    const notes = document.getElementById('editNotes').value;

    // Update project
    project.name = name;
    project.assignedTo = assignedTo;
    project.assignedToName = teamMembers[assignedTo].name;
    project.status = status;
    project.dailyLimit = dailyLimit;
    project.duration = duration;
    project.startDate = startDate;
    project.endDate = calculateEndDate(startDate, duration, dailyLimit);
    project.type = type;
    project.description = description;
    project.notes = notes;

    renderAll();
    
    // Update right panel if this project is selected
    if (selectedProjectId === editingProjectId) {
        selectProject(editingProjectId);
    }
}

function deleteProject() {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    const index = projects.findIndex(p => p.id === editingProjectId);
    if (index !== -1) {
        projects.splice(index, 1);
    }
    
    if (selectedProjectId === editingProjectId) {
        selectedProjectId = null;
    }
    
    if (typeof window.hideDialog === 'function') {
        window.hideDialog('edit');  // Use 'edit' not 'editModal'
    }
    renderAll();
}

function selectProject(projectId) {
    selectedProjectId = projectId;
    const project = projects.find(p => p.id === projectId);
    
    if (project) {
        document.getElementById('summaryText').value = project.name;
        document.getElementById('projectStatus').value = project.status;
        document.getElementById('requestedBy').value = project.assignedToName;
        document.getElementById('hoursPerDay').value = project.dailyLimit;
        document.getElementById('estimatedHours').value = project.duration;
        document.getElementById('remainingHours').value = project.duration;
        
        // Set date for Syncfusion date input
        const assignedStartDate = document.getElementById('assignedStartDate');
        if (assignedStartDate && project.startDate) {
            const dateString = project.startDate instanceof Date 
                ? project.startDate.toISOString().split('T')[0]
                : new Date(project.startDate).toISOString().split('T')[0];
            assignedStartDate.value = dateString;
        }
    }
    
    renderProjectTree();
}

// ===== SCHEDULING LOGIC =====
function calculateOptimalStartDate(personId, preferredStart, taskDuration, dailyLimit) {
    let currentDate = new Date(preferredStart);
    currentDate.setHours(0, 0, 0, 0);
    
    let remainingHours = taskDuration;
    
    while (remainingHours > 0) {
        // Skip weekends
        if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
            currentDate.setDate(currentDate.getDate() + 1);
            continue;
        }

        const hoursScheduledToday = getHoursScheduledForDate(personId, currentDate);
        const availableHours = dailyLimit - hoursScheduledToday;

        if (availableHours > 0) {
            // We found a day with available hours - this is our start date
            return new Date(currentDate);
        }

        // Move to next day
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return new Date(preferredStart);
}

function checkSchedulingConflict(personId, preferredStart, taskDuration, dailyLimit) {
    const hoursOnPreferredDate = getHoursScheduledForDate(personId, preferredStart);
    const availableHours = dailyLimit - hoursOnPreferredDate;
    
    // If there's enough capacity for the first day, no conflict
    if (availableHours >= Math.min(taskDuration, dailyLimit)) {
        return null;
    }
    
    // There's a conflict - find alternatives
    const alternatives = {
        differentDays: [],
        otherAgents: []
    };
    
    // Find alternative days for this agent
    let checkDate = new Date(preferredStart);
    for (let i = 0; i < 30; i++) {
        if (checkDate.toDateString() !== preferredStart.toDateString()) {
            const hoursOnDate = getHoursScheduledForDate(personId, checkDate);
            const availableOnDate = dailyLimit - hoursOnDate;
            if (availableOnDate >= Math.min(taskDuration, dailyLimit)) {
                alternatives.differentDays.push({
                    date: new Date(checkDate),
                    availableHours: availableOnDate
                });
            }
        }
        checkDate.setDate(checkDate.getDate() + 1);
    }
    
    // Find other agents with availability on the preferred date
    Object.keys(teamMembers).forEach(agentId => {
        if (agentId !== personId) {
            const hoursOnDate = getHoursScheduledForDate(agentId, preferredStart);
            const dailyLimitForAgent = 8; // Default daily limit
            const availableOnDate = dailyLimitForAgent - hoursOnDate;
            if (availableOnDate >= Math.min(taskDuration, dailyLimitForAgent)) {
                alternatives.otherAgents.push({
                    name: teamMembers[agentId].name,
                    personId: agentId,
                    availableHours: availableOnDate
                });
            }
        }
    });
    
    return {
        hoursOnPreferredDate: hoursOnPreferredDate,
        conflict: true,
        alternatives: alternatives
    };
}

function getHoursScheduledForDate(personId, date) {
    const dateStr = date.toDateString();
    let totalHours = 0;

    projects.forEach(project => {
        if (project.assignedTo === personId) {
            let currentDate = new Date(project.startDate);
            let remainingHours = project.duration;
            const dailyLimit = project.dailyLimit;

            while (remainingHours > 0) {
                if (currentDate.toDateString() === dateStr) {
                    const hoursThisDay = Math.min(remainingHours, dailyLimit);
                    totalHours += hoursThisDay;
                }

                remainingHours -= dailyLimit;
                currentDate.setDate(currentDate.getDate() + 1);
                
                // Skip weekends
                while (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
                    currentDate.setDate(currentDate.getDate() + 1);
                }
            }
        }
    });

    return totalHours;
}

function calculateEndDate(startDate, duration, dailyLimit) {
    let currentDate = new Date(startDate);
    let remainingHours = duration;

    while (remainingHours > 0) {
        // Skip weekends
        if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
            remainingHours -= dailyLimit;
        }
        
        if (remainingHours > 0) {
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }

    return currentDate;
}

// ===== RENDERING =====
function renderAll() {
    renderProjectTree();
    renderGanttChart();
}

function renderProjectTree() {
    const container = document.getElementById('projectTreeContainer');
    if (!container) return;
    
    container.innerHTML = '';

    projects.forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.className = `project-item ${project.type}`;
        if (selectedProjectId === project.id) {
            projectItem.classList.add('selected');
        }

        projectItem.innerHTML = `
            <div class="project-item-name">${project.name}</div>
            <div class="project-item-info">
                ${project.assignedToName} | ${project.duration}h | ${formatDate(project.startDate)} - ${formatDate(project.endDate)}
            </div>
        `;

        projectItem.onclick = () => openEditModal(project.id);
        projectItem.ondblclick = () => selectProject(project.id);
        container.appendChild(projectItem);
    });
}

function renderGanttChart() {
    console.log('📊 renderGanttChart() called');
    console.log('📊 Projects count:', projects.length);
    
    const header = document.getElementById('ganttHeader');
    const body = document.getElementById('ganttBody');
    
    if (!header) {
        console.error('❌ ganttHeader element not found!');
        return;
    }
    
    if (!body) {
        console.error('❌ ganttBody element not found!');
        return;
    }
    
    console.log('✅ Gantt elements found');
    
    header.innerHTML = '';
    body.innerHTML = '';

    if (projects.length === 0) {
        console.log('⚠️ No projects to display');
        body.innerHTML = '<div style="padding: 40px; text-align: center; color: #999;">No projects scheduled. Click "Add Project" to get started.</div>';
        return;
    }
    
    console.log('📊 Rendering', projects.length, 'projects');

    // Calculate date range
    const dates = generateDateRange();
    
    // Initialize column widths if not set
    if (columnWidths.length !== dates.length) {
        columnWidths = new Array(dates.length).fill(150);
    }
    
    // Render header
    dates.forEach((weekDates, index) => {
        const weekHeader = document.createElement('div');
        weekHeader.className = viewMode === 'single-week' ? 'gantt-date-header day-view' : 'gantt-date-header';
        weekHeader.style.width = `${columnWidths[index]}px`;
        weekHeader.style.minWidth = `${columnWidths[index]}px`;
        weekHeader.setAttribute('data-column-index', index);
        
        const weekStart = weekDates[0];
        const weekEnd = weekDates[weekDates.length - 1];
        
        if (viewMode === 'single-week') {
            // Single day column
            const date = weekDates[0];
            weekHeader.innerHTML = `
                <div class="gantt-date-day-full">${getDayNameFull(date)}</div>
                <div class="gantt-date-date">${formatDateFull(date)}</div>
            `;
        } else {
            // Week column
            weekHeader.innerHTML = `
                <div class="gantt-date-week">${formatDateRange(weekStart, weekEnd)}</div>
                <div class="gantt-date-days">
                    ${weekDates.map(d => `<div class="gantt-day">${getDayName(d)}</div>`).join('')}
                </div>
            `;
        }
        
        // Add resizer
        const resizer = document.createElement('div');
        resizer.className = 'column-resizer';
        resizer.setAttribute('data-column-index', index);
        weekHeader.appendChild(resizer);
        
        header.appendChild(weekHeader);
    });

    // Add resize event listeners
    setupColumnResizers();

    // Render body
    projects.forEach((project, projectIndex) => {
        const row = document.createElement('div');
        row.className = 'gantt-row';
        
        dates.forEach((weekDates, index) => {
            const cell = document.createElement('div');
            cell.className = viewMode === 'single-week' ? 'gantt-cell day-view' : 'gantt-cell';
            cell.style.width = `${columnWidths[index]}px`;
            cell.style.minWidth = `${columnWidths[index]}px`;
            row.appendChild(cell);
        });

        // Create gantt bar
        const bar = createGanttBar(project, dates, projectIndex);
        if (bar) {
            row.appendChild(bar);
        }

        body.appendChild(row);
    });
    
    // Handle animation flags
    if (isInitialLoad) {
        isInitialLoad = false;
    }
    
    if (shouldAnimateBars) {
        shouldAnimateBars = false;
    }
}

function generateDateRange() {
    if (viewMode === 'single-week') {
        // Generate single week with individual days
        const days = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(currentWeekStart);
            date.setDate(date.getDate() + i);
            days.push([date]); // Wrap each day in an array for consistency
        }
        return days;
    } else {
        // Multi-week view
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Start from beginning of current week
        const startDate = new Date(today);
        startDate.setDate(startDate.getDate() - startDate.getDay());
        
        // Generate 8 weeks
        const weeks = [];
        for (let i = 0; i < 8; i++) {
            const week = [];
            for (let j = 0; j < 7; j++) {
                const date = new Date(startDate);
                date.setDate(date.getDate() + (i * 7) + j);
                week.push(date);
            }
            weeks.push(week);
        }
        
        return weeks;
    }
}

function createGanttBar(project, dateRange, index = 0) {
    const bar = document.createElement('div');
    // Use person color instead of project type
    bar.className = `gantt-bar ${project.assignedTo}`;
    
    // Apply gradient color from team member data (works for dynamic employees)
    const member = teamMembers[project.assignedTo];
    if (member && member.gradient) {
        bar.style.background = `linear-gradient(135deg, ${member.gradient[0]} 0%, ${member.gradient[1]} 100%)`;
    }
    
    // Add animation class on initial load or when switching views
    if (isInitialLoad || shouldAnimateBars) {
        bar.classList.add('animate-in');
        // Stagger animation for each bar (50ms delay per bar)
        bar.style.animationDelay = `${index * 0.05}s`;
    }
    
    const allDates = dateRange.flat();
    const startIndex = allDates.findIndex(d => d.toDateString() === project.startDate.toDateString());
    const endIndex = allDates.findIndex(d => d.toDateString() === project.endDate.toDateString());
    
    if (startIndex === -1) return null;
    
    // Calculate position based on view mode and dynamic column widths
    let left = 0;
    let width = 0;
    
    if (viewMode === 'single-week') {
        // In single-week view, each column is a day
        const defaultWidth = 120;
        
        // Calculate left position
        for (let i = 0; i < startIndex; i++) {
            left += columnWidths[i] || defaultWidth;
        }
        
        // Calculate width
        for (let i = startIndex; i <= endIndex; i++) {
            width += columnWidths[i] || defaultWidth;
        }
    } else {
        // Multi-week view
        const weekIndex = Math.floor(startIndex / 7);
        const dayInWeek = startIndex % 7;
        const weekWidth = columnWidths[weekIndex] || 150;
        const cellWidth = weekWidth / 7;
        
        // Calculate left position
        for (let i = 0; i < weekIndex; i++) {
            left += columnWidths[i] || 150;
        }
        left += dayInWeek * cellWidth;
        
        // Calculate width
        for (let i = startIndex; i <= endIndex; i++) {
            const wIndex = Math.floor(i / 7);
            const wWidth = columnWidths[wIndex] || 150;
            width += wWidth / 7;
        }
    }
    
    bar.style.left = `${left}px`;
    bar.style.width = `${width}px`;
    
    bar.innerHTML = `<div class="gantt-bar-content">${project.name} (${project.duration}h)</div>`;
    bar.setAttribute('data-project-id', project.id);
    
    bar.onclick = (e) => {
        e.stopPropagation();
        openEditModal(project.id);
    };
    
    // Add hover tooltip
    bar.addEventListener('mouseenter', (e) => showGanttTooltip(e, project));
    bar.addEventListener('mouseleave', () => hideGanttTooltip());
    
    return bar;
}

function showGanttTooltip(event, project) {
    const tooltip = document.getElementById('ganttTooltip');
    if (!tooltip) return;
    
    const member = teamMembers[project.assignedTo];
    
    // Format dates
    const startDate = project.startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const endDate = project.endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    // Build tooltip content
    const content = `
        <div class="gantt-tooltip-title">${project.name}</div>
        <div class="gantt-tooltip-item">
            <span class="gantt-tooltip-label">Agent:</span>
            <span class="gantt-tooltip-value">${member ? member.name : 'Unassigned'}</span>
        </div>
        <div class="gantt-tooltip-item">
            <span class="gantt-tooltip-label">Type:</span>
            <span class="gantt-tooltip-value">${project.type.charAt(0).toUpperCase() + project.type.slice(1)}</span>
        </div>
        <div class="gantt-tooltip-item">
            <span class="gantt-tooltip-label">Status:</span>
            <span class="gantt-tooltip-value">${project.status}</span>
        </div>
        <div class="gantt-tooltip-item">
            <span class="gantt-tooltip-label">Duration:</span>
            <span class="gantt-tooltip-value">${project.duration}h (${project.dailyLimit}h/day)</span>
        </div>
        <div class="gantt-tooltip-item">
            <span class="gantt-tooltip-label">Start:</span>
            <span class="gantt-tooltip-value">${startDate}</span>
        </div>
        <div class="gantt-tooltip-item">
            <span class="gantt-tooltip-label">End:</span>
            <span class="gantt-tooltip-value">${endDate}</span>
        </div>
    `;
    
    tooltip.innerHTML = content;
    
    // Position tooltip
    const barRect = event.target.getBoundingClientRect();
    const tooltipWidth = 300;
    const tooltipHeight = tooltip.offsetHeight || 150;
    
    let left = barRect.left + (barRect.width / 2) - (tooltipWidth / 2);
    let top = barRect.top - tooltipHeight - 10;
    
    // Adjust if tooltip goes off-screen
    if (left < 10) left = 10;
    if (left + tooltipWidth > window.innerWidth - 10) {
        left = window.innerWidth - tooltipWidth - 10;
    }
    
    if (top < 10) {
        top = barRect.bottom + 10;
    }
    
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
    tooltip.style.display = 'block';
}

function hideGanttTooltip() {
    const tooltip = document.getElementById('ganttTooltip');
    if (tooltip) {
        tooltip.style.display = 'none';
    }
}

// ===== COLUMN RESIZING =====
function setupColumnResizers() {
    const resizers = document.querySelectorAll('.column-resizer');
    
    resizers.forEach(resizer => {
        resizer.addEventListener('mousedown', startResize);
    });
}

function startResize(e) {
    e.preventDefault();
    isResizing = true;
    currentResizer = e.target;
    columnIndex = parseInt(currentResizer.getAttribute('data-column-index'));
    startX = e.pageX;
    startWidth = columnWidths[columnIndex];
    
    currentResizer.classList.add('resizing');
    
    document.addEventListener('mousemove', doResize);
    document.addEventListener('mouseup', stopResize);
}

function doResize(e) {
    if (!isResizing) return;
    
    const diff = e.pageX - startX;
    const newWidth = Math.max(100, startWidth + diff); // Minimum 100px
    
    columnWidths[columnIndex] = newWidth;
    updateColumnWidths();
}

function stopResize(e) {
    if (!isResizing) return;
    
    isResizing = false;
    if (currentResizer) {
        currentResizer.classList.remove('resizing');
    }
    currentResizer = null;
    
    document.removeEventListener('mousemove', doResize);
    document.removeEventListener('mouseup', stopResize);
    
    // Re-render to update gantt bar positions
    renderGanttChart();
}

function updateColumnWidths() {
    const headers = document.querySelectorAll('.gantt-date-header');
    const rows = document.querySelectorAll('.gantt-row');
    
    headers.forEach((header, index) => {
        if (index === columnIndex) {
            header.style.width = `${columnWidths[index]}px`;
            header.style.minWidth = `${columnWidths[index]}px`;
        }
    });
    
    rows.forEach(row => {
        const cells = row.querySelectorAll('.gantt-cell');
        cells.forEach((cell, index) => {
            if (index === columnIndex) {
                cell.style.width = `${columnWidths[index]}px`;
                cell.style.minWidth = `${columnWidths[index]}px`;
            }
        });
        
        // Update gantt bar positions in real-time
        const bar = row.querySelector('.gantt-bar');
        if (bar) {
            const projectId = parseInt(bar.getAttribute('data-project-id'));
            const project = projects.find(p => p.id === projectId);
            if (project) {
                const dates = generateDateRange();
                updateGanttBarPosition(bar, project, dates);
            }
        }
    });
}

function updateGanttBarPosition(bar, project, dateRange) {
    const allDates = dateRange.flat();
    const startIndex = allDates.findIndex(d => d.toDateString() === project.startDate.toDateString());
    const endIndex = allDates.findIndex(d => d.toDateString() === project.endDate.toDateString());
    
    if (startIndex === -1) return;
    
    let left = 0;
    let width = 0;
    
    if (viewMode === 'single-week') {
        const defaultWidth = 120;
        
        for (let i = 0; i < startIndex; i++) {
            left += columnWidths[i] || defaultWidth;
        }
        
        for (let i = startIndex; i <= endIndex; i++) {
            width += columnWidths[i] || defaultWidth;
        }
    } else {
        const weekIndex = Math.floor(startIndex / 7);
        const dayInWeek = startIndex % 7;
        const weekWidth = columnWidths[weekIndex] || 150;
        const cellWidth = weekWidth / 7;
        
        for (let i = 0; i < weekIndex; i++) {
            left += columnWidths[i] || 150;
        }
        left += dayInWeek * cellWidth;
        
        for (let i = startIndex; i <= endIndex; i++) {
            const wIndex = Math.floor(i / 7);
            const wWidth = columnWidths[wIndex] || 150;
            width += wWidth / 7;
        }
    }
    
    bar.style.left = `${left}px`;
    bar.style.width = `${width}px`;
}

// ===== HELPER FUNCTIONS =====
function formatDate(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
}

function formatDateRange(start, end) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[start.getMonth()]} ${start.getDate()} - ${months[end.getMonth()]} ${end.getDate()}, ${start.getFullYear()}`;
}

function getDayName(date) {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    return days[date.getDay()];
}

function getDayNameFull(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
}

function formatDateFull(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// ===== SAMPLE DATA =====
function loadSampleData() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sampleProjects = [
        {
            name: 'Server Migration - Phase 1',
            assignedTo: 'person1',
            dailyLimit: 6,
            duration: 16,
            preferredStart: new Date(today),
            type: 'project'
        },
        {
            name: 'Install Windows Server',
            assignedTo: 'person1',
            dailyLimit: 4,
            duration: 8,
            preferredStart: new Date(today),
            type: 'task'
        },
        {
            name: 'Network Configuration',
            assignedTo: 'person2',
            dailyLimit: 6,
            duration: 12,
            preferredStart: new Date(today),
            type: 'task'
        },
        {
            name: 'Firewall Setup',
            assignedTo: 'person2',
            dailyLimit: 4,
            duration: 6,
            preferredStart: new Date(today),
            type: 'subtask'
        },
        {
            name: 'Backup Configuration',
            assignedTo: 'person3',
            dailyLimit: 5,
            duration: 10,
            preferredStart: new Date(today),
            type: 'task'
        }
    ];

    sampleProjects.forEach(proj => {
        const actualStart = calculateOptimalStartDate(proj.assignedTo, proj.preferredStart, proj.duration, proj.dailyLimit);
        
        const project = {
            id: Date.now() + Math.random(),
            name: proj.name,
            assignedTo: proj.assignedTo,
            assignedToName: teamMembers[proj.assignedTo].name,
            dailyLimit: proj.dailyLimit,
            duration: proj.duration,
            startDate: actualStart,
            endDate: calculateEndDate(actualStart, proj.duration, proj.dailyLimit),
            type: proj.type,
            status: 'Active',
            description: '',
            notes: ''
        };
        
        projects.push(project);
    });

    renderAll();
}

// ===== EXPORTS =====
if (typeof window !== 'undefined') {
    window.Scheduling = {
        initializeSchedulingPage,
        saveProject,
        updateProject,
        deleteProject,
        openEditModal,
        selectProject,
        renderGanttChart,
        renderProjectTree,
        loadSampleData,
        // Expose data for other modules if needed
        get projects() { return projects; },
        get teamMembers() { return teamMembers; }
    };
}

