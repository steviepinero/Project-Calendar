// Data structures
// Cache buster: 2026-01-15-15:03
let projects = [];
let selectedProjectId = null;
let editingProjectId = null;
let allowList = [
    { mac: '00:1B:44:11:3A:B7', description: 'Office Router' },
    { mac: '00:1B:44:11:3A:B8', description: 'Printer 1' },
    { mac: '00:1B:44:11:3A:B9', description: 'Access Point' },
    { mac: '00:1B:44:11:3A:BA', description: 'Server' },
    { mac: '00:1B:44:11:3A:BB', description: 'Workstation 1' }
];
let selectedMacAddress = null;
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

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    setupNavigation();
    loadSampleData();
});

function initializeApp() {
    const today = new Date();
    document.getElementById('requestDate').valueAsDate = today;
    document.getElementById('assignedStartDate').valueAsDate = today;
    document.getElementById('preferredStartDate').valueAsDate = today;
    renderEmployeeDropdowns();
    renderAllowList();
}

function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const pageName = item.getAttribute('data-page');
            switchPage(pageName);
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });
}

function switchPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const selectedPage = document.getElementById(`page-${pageName}`);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }
    
    // Show/hide header based on page
    const header = document.querySelector('header');
    if (pageName === 'scheduling') {
        header.classList.remove('hidden');
    } else {
        header.classList.add('hidden');
    }
    
    // Initialize page-specific content
    if (pageName === 'hardware') {
        // Initialize hardware page immediately (without waiting for Syncfusion)
        initializeHardwarePage();
    }
}

function setupEventListeners() {
    // Navigation setup
    setupNavigation();
    
    // Add Modal controls
    const modal = document.getElementById('projectModal');
    const addProjectBtn = document.getElementById('addProjectBtn');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const closeBtn = document.getElementById('closeAddModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const projectForm = document.getElementById('projectForm');

    addProjectBtn.onclick = () => openModal('project');
    addTaskBtn.onclick = () => openModal('task');
    closeBtn.onclick = () => modal.style.display = 'none';
    cancelBtn.onclick = () => modal.style.display = 'none';
    
    projectForm.onsubmit = (e) => {
        e.preventDefault();
        saveProject();
        modal.style.display = 'none';
    };

    // Edit Modal controls
    const editModal = document.getElementById('editModal');
    const closeEditBtn = document.getElementById('closeEditModal');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const deleteBtn = document.getElementById('deleteBtn');
    const editForm = document.getElementById('editForm');

    closeEditBtn.onclick = () => editModal.style.display = 'none';
    cancelEditBtn.onclick = () => editModal.style.display = 'none';
    deleteBtn.onclick = () => deleteProject();
    
    editForm.onsubmit = (e) => {
        e.preventDefault();
        updateProject();
        editModal.style.display = 'none';
    };

    // Window click to close modals
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
        if (event.target == editModal) {
            editModal.style.display = 'none';
        }
        if (event.target == employeeModal) {
            employeeModal.style.display = 'none';
        }
        if (event.target == blockModal) {
            blockModal.style.display = 'none';
        }
        if (event.target == addMacModal) {
            addMacModal.style.display = 'none';
        }
    };

    // Checklist button
    document.getElementById('addChecklistBtn').onclick = addChecklistItem;

    // View toggle buttons
    document.getElementById('multiWeekViewBtn').onclick = () => switchView('multi-week');
    document.getElementById('singleWeekViewBtn').onclick = () => switchView('single-week');

    // Week navigation buttons
    document.getElementById('prevWeekBtn').onclick = () => navigateWeek(-1);
    document.getElementById('nextWeekBtn').onclick = () => navigateWeek(1);
    document.getElementById('todayBtn').onclick = () => goToToday();

    // Employee Modal controls
    const employeeModal = document.getElementById('employeeModal');
    const addEmployeeBtn = document.getElementById('addEmployeeBtn');
    const closeEmployeeBtn = document.getElementById('closeEmployeeModal');
    const cancelEmployeeBtn = document.getElementById('cancelEmployeeBtn');
    const employeeForm = document.getElementById('employeeForm');

    addEmployeeBtn.onclick = () => employeeModal.style.display = 'block';
    closeEmployeeBtn.onclick = () => employeeModal.style.display = 'none';
    cancelEmployeeBtn.onclick = () => employeeModal.style.display = 'none';
    
    employeeForm.onsubmit = (e) => {
        e.preventDefault();
        saveEmployee();
        employeeModal.style.display = 'none';
    };

    // Network Access - Allow List controls
    const blockModal = document.getElementById('blockModal');
    const addMacModal = document.getElementById('addMacModal');
    const removeSelectedBtn = document.getElementById('removeSelectedBtn');
    const blockSelectedBtn = document.getElementById('blockSelectedBtn');
    const addManuallyBtn = document.getElementById('addManuallyBtn');
    const macInput = document.getElementById('macInput');
    const closeBlockModal = document.getElementById('closeBlockModal');
    const closeAddMacModal = document.getElementById('closeAddMacModal');
    const blockForm = document.getElementById('blockForm');
    const addMacForm = document.getElementById('addMacForm');

    removeSelectedBtn.onclick = removeSelectedMacAddress;
    blockSelectedBtn.onclick = () => {
        if (selectedMacAddress) {
            openBlockModal(selectedMacAddress);
        } else {
            alert('Please select a MAC address to block');
        }
    };
    addManuallyBtn.onclick = () => addMacModal.style.display = 'block';
    closeBlockModal.onclick = () => blockModal.style.display = 'none';
    closeAddMacModal.onclick = () => addMacModal.style.display = 'none';
    
    document.getElementById('cancelBlockBtn').onclick = () => blockModal.style.display = 'none';
    document.getElementById('cancelAddMacBtn').onclick = () => addMacModal.style.display = 'none';

    blockForm.onsubmit = (e) => {
        e.preventDefault();
        confirmBlockMacAddress();
        blockModal.style.display = 'none';
    };

    addMacForm.onsubmit = (e) => {
        e.preventDefault();
        addNewMacAddress();
        addMacModal.style.display = 'none';
    };


    // Checklist button
    document.getElementById('addChecklistBtn').onclick = addChecklistItem;

    // View toggle buttons
    document.getElementById('multiWeekViewBtn').onclick = () => switchView('multi-week');
    document.getElementById('singleWeekViewBtn').onclick = () => switchView('single-week');

    // Week navigation buttons
    document.getElementById('prevWeekBtn').onclick = () => navigateWeek(-1);
    document.getElementById('nextWeekBtn').onclick = () => navigateWeek(1);
    document.getElementById('todayBtn').onclick = () => goToToday();
}

function switchView(mode) {
    viewMode = mode;
    
    // Update button states
    const multiBtn = document.getElementById('multiWeekViewBtn');
    const singleBtn = document.getElementById('singleWeekViewBtn');
    const weekNav = document.getElementById('weekNavigation');
    
    if (mode === 'multi-week') {
        multiBtn.classList.add('active');
        singleBtn.classList.remove('active');
        weekNav.style.display = 'none';
        currentWeekStart = null;
    } else {
        multiBtn.classList.remove('active');
        singleBtn.classList.add('active');
        weekNav.style.display = 'flex';
        
        // Initialize to current week if not set
        if (!currentWeekStart) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            currentWeekStart = new Date(today);
            currentWeekStart.setDate(currentWeekStart.getDate() - currentWeekStart.getDay());
        }
        updateWeekDisplay();
    }
    
    // Reset column widths for new view
    columnWidths = [];
    
    // Enable animation when switching views
    shouldAnimateBars = true;
    renderGanttChart();
}

function navigateWeek(direction) {
    currentWeekStart.setDate(currentWeekStart.getDate() + (direction * 7));
    updateWeekDisplay();
    renderGanttChart();
}

function goToToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    currentWeekStart = new Date(today);
    currentWeekStart.setDate(currentWeekStart.getDate() - currentWeekStart.getDay());
    updateWeekDisplay();
    renderGanttChart();
}

function updateWeekDisplay() {
    const weekEnd = new Date(currentWeekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    
    const display = document.getElementById('currentWeekDisplay');
    display.textContent = `${formatDateRange(currentWeekStart, weekEnd)}`;
}

function openModal(type) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const projectType = document.getElementById('projectType');
    
    modalTitle.textContent = type === 'project' ? 'Add New Project' : 'Add New Task';
    projectType.value = type;
    modal.style.display = 'block';
    
    // Reset form
    document.getElementById('projectForm').reset();
    const today = new Date();
    document.getElementById('preferredStartDate').valueAsDate = today;
}

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
    const modal = document.getElementById('editModal');
    
    // Populate form fields
    document.getElementById('editProjectName').value = project.name;
    document.getElementById('editAssignedTo').value = project.assignedTo;
    document.getElementById('editStatus').value = project.status;
    document.getElementById('editDailyHourLimit').value = project.dailyLimit;
    document.getElementById('editTaskDuration').value = project.duration;
    document.getElementById('editStartDate').valueAsDate = project.startDate;
    document.getElementById('editProjectType').value = project.type;
    document.getElementById('editDescription').value = project.description || '';
    document.getElementById('editNotes').value = project.notes || '';
    
    modal.style.display = 'block';
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
    
    document.getElementById('editModal').style.display = 'none';
    renderAll();
}

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

function renderAll() {
    renderProjectTree();
    renderGanttChart();
}

function renderProjectTree() {
    const container = document.getElementById('projectTreeContainer');
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
        document.getElementById('assignedStartDate').valueAsDate = project.startDate;
    }
    
    renderProjectTree();
}

function renderGanttChart() {
    const header = document.getElementById('ganttHeader');
    const body = document.getElementById('ganttBody');
    
    header.innerHTML = '';
    body.innerHTML = '';

    if (projects.length === 0) {
        body.innerHTML = '<div style="padding: 40px; text-align: center; color: #999;">No projects scheduled. Click "Add Project" to get started.</div>';
        return;
    }

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
    tooltip.style.display = 'none';
}

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

function addChecklistItem() {
    const container = document.getElementById('checklistItems');
    const item = document.createElement('div');
    item.className = 'checklist-item';
    
    item.innerHTML = `
        <input type="checkbox">
        <input type="text" placeholder="Enter checklist item...">
        <button onclick="this.parentElement.remove()">×</button>
    `;
    
    container.appendChild(item);
}

function loadSampleData() {
    // Add sample projects to demonstrate auto-scheduling
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Sample data
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
        const actualStart = calculateOptimalStartDate(
            proj.assignedTo, 
            proj.preferredStart, 
            proj.duration, 
            proj.dailyLimit
        );

        projects.push({
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
        });
    });

    renderAll();
}

// Employee Management Functions
function getNextPersonId() {
    let maxId = 0;
    Object.keys(teamMembers).forEach(key => {
        const match = key.match(/^person(\d+)$/);
        if (match) {
            const id = parseInt(match[1]);
            if (id > maxId) maxId = id;
        }
    });
    return `person${maxId + 1}`;
}

function getNextColor() {
    const colors = colorPalette[colorPaletteIndex % colorPalette.length];
    colorPaletteIndex++;
    return colors;
}

function renderColorLegend() {
    const legendContainer = document.getElementById('colorLegend');
    if (!legendContainer) return; // Exit if element doesn't exist
    legendContainer.innerHTML = '';
    
    Object.keys(teamMembers).forEach(personId => {
        const member = teamMembers[personId];
        const legendItem = document.createElement('span');
        legendItem.className = 'legend-item';
        
        const colorBox = document.createElement('span');
        colorBox.className = 'legend-color';
        colorBox.style.background = `linear-gradient(135deg, ${member.gradient[0]} 0%, ${member.gradient[1]} 100%)`;
        
        const nameSpan = document.createTextNode(member.name);
        
        legendItem.appendChild(colorBox);
        legendItem.appendChild(nameSpan);
        legendContainer.appendChild(legendItem);
    });
}

function renderEmployeeDropdowns() {
    const assignedToSelect = document.getElementById('assignedTo');
    const editAssignedToSelect = document.getElementById('editAssignedTo');
    
    // Clear existing options except the first one
    assignedToSelect.innerHTML = '<option value="">Select Team Member</option>';
    editAssignedToSelect.innerHTML = '<option value="">Select Team Member</option>';
    
    // Add options for each team member
    Object.keys(teamMembers).forEach(personId => {
        const member = teamMembers[personId];
        const option1 = document.createElement('option');
        option1.value = personId;
        option1.textContent = member.name;
        assignedToSelect.appendChild(option1);
        
        const option2 = document.createElement('option');
        option2.value = personId;
        option2.textContent = member.name;
        editAssignedToSelect.appendChild(option2);
    });
}

function saveEmployee() {
    const name = document.getElementById('employeeName').value.trim();
    const dailyLimit = parseFloat(document.getElementById('employeeDailyLimit').value);
    
    if (!name) {
        alert('Please enter an employee name');
        return;
    }
    
    const personId = getNextPersonId();
    const gradient = getNextColor();
    
    teamMembers[personId] = {
        name: name,
        dailyLimit: dailyLimit,
        color: personId,
        gradient: gradient
    };
    
    // Reset form
    document.getElementById('employeeForm').reset();
    document.getElementById('employeeDailyLimit').value = 8;
    
    // Update UI
    renderEmployeeDropdowns();
}

// ===== NETWORK ACCESS FUNCTIONS =====

function renderAllowList() {
    const allowListBox = document.getElementById('allowListBox');
    allowListBox.innerHTML = '';
    
    allowList.forEach((item, index) => {
        const listItem = document.createElement('div');
        listItem.className = 'list-item';
        if (selectedMacAddress === item.mac) {
            listItem.classList.add('selected');
        }
        
        const textDiv = document.createElement('div');
        textDiv.className = 'list-item-text';
        textDiv.textContent = item.mac + (item.description ? ` - ${item.description}` : '');
        
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'list-item-actions';
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'list-item-btn list-item-remove';
        removeBtn.textContent = '✕';
        removeBtn.title = 'Remove this MAC address';
        removeBtn.onclick = (e) => {
            e.stopPropagation();
            removeMacAddress(index);
        };
        
        actionsDiv.appendChild(removeBtn);
        
        listItem.appendChild(textDiv);
        listItem.appendChild(actionsDiv);
        
        // Click to select
        listItem.onclick = () => {
            selectedMacAddress = selectedMacAddress === item.mac ? null : item.mac;
            renderAllowList();
        };
        
        allowListBox.appendChild(listItem);
    });
}

function removeMacAddress(index) {
    if (confirm('Are you sure you want to remove this MAC address?')) {
        allowList.splice(index, 1);
        selectedMacAddress = null;
        renderAllowList();
    }
}

function removeSelectedMacAddress() {
    if (!selectedMacAddress) {
        alert('Please select a MAC address to remove');
        return;
    }
    
    const index = allowList.findIndex(item => item.mac === selectedMacAddress);
    if (index > -1) {
        removeMacAddress(index);
    }
}

function openBlockModal(macAddress) {
    selectedMacAddress = macAddress;
    document.getElementById('blockMacAddress').value = macAddress;
    document.getElementById('blockReason').value = '';
    document.getElementById('blockDuration').value = 'permanent';
    document.getElementById('blockModal').style.display = 'block';
}

function confirmBlockMacAddress() {
    const macAddress = document.getElementById('blockMacAddress').value;
    const reason = document.getElementById('blockReason').value;
    const duration = document.getElementById('blockDuration').value;
    
    if (!reason.trim()) {
        alert('Please enter a reason for blocking');
        return;
    }
    
    // Show confirmation
    const durationText = {
        'permanent': 'Permanently',
        '24hours': 'for 24 hours',
        '7days': 'for 7 days',
        '30days': 'for 30 days'
    }[duration];
    
    alert(`MAC Address ${macAddress} has been blocked ${durationText}.\nReason: ${reason}`);
    
    // In a real application, this would send data to a server
    selectedMacAddress = null;
    renderAllowList();
}

function addNewMacAddress() {
    const macInput = document.getElementById('newMacAddress').value.trim();
    const description = document.getElementById('macDescription').value.trim();
    
    // Validate MAC address format
    const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    if (!macRegex.test(macInput)) {
        alert('Invalid MAC address format. Please use XX:XX:XX:XX:XX:XX');
        return;
    }
    
    // Normalize MAC address (use colons)
    const normalizedMac = macInput.toUpperCase();
    
    // Check if already exists
    if (allowList.some(item => item.mac === normalizedMac)) {
        alert('This MAC address is already in the allow list');
        return;
    }
    
    // Add to list
    allowList.push({
        mac: normalizedMac,
        description: description || null
    });
    
    // Clear form
    document.getElementById('newMacAddress').value = '';
    document.getElementById('macDescription').value = '';
    document.getElementById('macInput').value = '';
    
    renderAllowList();
    alert('MAC address added successfully');
}

// ===== HARDWARE PAGE FUNCTIONS =====

function initializeHardwarePage() {
    console.log('Initializing hardware page');
    
    // Setup hamburger menu toggle for original sidebar overlay
    const menuToggle = document.getElementById('hardwareMenuToggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Menu toggle clicked');
            
            // Toggle the sidebar and overlay
            sidebar.classList.toggle('visible');
            if (overlay) {
                overlay.classList.toggle('visible');
            }
            
            console.log('Sidebar visible:', sidebar.classList.contains('visible'));
        });
    }
    
    // Close sidebar when overlay is clicked
    if (overlay && sidebar) {
        overlay.addEventListener('click', (e) => {
            e.preventDefault();
            sidebar.classList.remove('visible');
            overlay.classList.remove('visible');
        });
    }
    
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
    
    // Render table and chart
    renderHardwareTable();
}

function renderHardwareTable() {
    console.log('Rendering hardware table');
    const gridData = [
        { Type: 'Desktop', DeviceName: 'ITP-DT-SMC', User: 'SCunningham', Purchased: '6/21/2022', Age: '4 yrs / 3 mths', Value: '$1,600', Make: 'Dell', Model: 'Latitude 750', CPU: 'Core i9-14900K', RAM: '12Gb' },
        { Type: 'Laptop', DeviceName: 'ITP-LT-SMC', User: 'SCunningham', Purchased: '7/11/2001', Age: '5 yrs / 2 mths', Value: '$2,000', Make: 'Lenovo', Model: 'Yoga 71', CPU: 'Core i5-14900K', RAM: '12Gb' },
        { Type: 'Desktop', DeviceName: 'ITP-DT-AMC', User: 'ACunningham', Purchased: '1/20/2019', Age: '5 yrs / 9 mths', Value: '$1,400', Make: 'Dell', Model: 'Latitude 750', CPU: 'Core i9-14900K', RAM: '12Gb' },
        { Type: 'Switch', DeviceName: '', User: '', Purchased: '8/1/2013', Age: '7 yrs / 3 mths', Value: '$900', Make: 'Trendnet', Model: 'TEG-3524S', CPU: '', RAM: '' },
        { Type: 'NAS', DeviceName: 'ITP-NAS', User: '', Purchased: '3/24/2020', Age: '6 yrs / 1 mths', Value: '$4,500', Make: 'Synology', Model: 'QL480i', CPU: 'Celeron', RAM: '6 Gb' }
    ];
    
    let html = '<table><thead><tr><th>Type</th><th>Device Name</th><th>User</th><th>Purchased</th><th>Age</th><th>Value</th><th>Make</th><th>Model</th><th>CPU</th><th>RAM</th></tr></thead><tbody>';
    
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
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js not loaded yet, retrying...');
        setTimeout(renderHardwareChart, 500);
        return;
    }
    
    const ctx = document.getElementById('hardwareChart');
    if (!ctx) {
        console.error('hardwareChart canvas not found');
        return;
    }
    
    // Destroy previous chart if it exists
    if (ctx.chart) {
        ctx.chart.destroy();
    }
    
    const chartData = {
        labels: ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026', 'Q2 2026', 'Q3 2026', 'Q4 2026', 'Q1 2027', 'Q2 2027', 'Q3 2027', 'Q4 2027'],
        datasets: [
            {
                label: 'Device Replacement Cost',
                data: [5000, 4500, 3800, 3000, 2200, 2300, 1800, 6000, 3600, 2100, 1900, 3600],
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
    
    console.log('Hardware chart rendered successfully');
}

function initializeHardwareChart() {
    // Check if Syncfusion is loaded
    if (typeof window.ej === 'undefined' || typeof window.ej.charts === 'undefined') {
        console.error('Syncfusion charts library not loaded');
        return;
    }
    
    const chartData = [
        { x: 'Qtr 1 (2025)', y: 5000 },
        { x: 'Qtr 2 (2025)', y: 4500 },
        { x: 'Qtr 3 (2025)', y: 3800 },
        { x: 'Qtr 4 (2025)', y: 3000 },
        { x: 'Qtr 1 (2026)', y: 2200 },
        { x: 'Qtr 2 (2026)', y: 2300 },
        { x: 'Qtr 3 (2026)', y: 1800 },
        { x: 'Qtr 4 (2026)', y: 6000 },
        { x: 'Qtr 1 (2027)', y: 3600 },
        { x: 'Qtr 2 (2027)', y: 2100 },
        { x: 'Qtr 3 (2027)', y: 1900 },
        { x: 'Qtr 4 (2027)', y: 3600 }
    ];

    const chart = new window.ej.charts.Chart({
        primaryXAxis: {
            valueType: 'Category',
            labelPlacement: 'OnTicks',
            majorGridLines: { width: 0 }
        },
        primaryYAxis: {
            minimum: 0,
            maximum: 6500,
            interval: 500,
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
                dataSource: chartData,
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
    chart.appendTo('#hardwareChart');
}

function initializeHardwareGrid() {
    // Check if Syncfusion is loaded
    if (typeof window.ej !== 'undefined' && typeof window.ej.grids !== 'undefined') {
        try {
            const gridData = [
                { Type: 'Desktop', DeviceName: 'ITP-DT-SMC', User: 'SCunningham', Purchased: '6/21/2022', Age: '4 yrs / 3 mths', Value: '$1,600', Make: 'Dell', Model: 'Latitude 750', CPU: 'Core i9-14900K', RAM: '12Gb' },
                { Type: 'Laptop', DeviceName: 'ITP-LT-SMC', User: 'SCunningham', Purchased: '7/11/2001', Age: '5 yrs / 2 mths', Value: '$2,000', Make: 'Lenovo', Model: 'Yoga 71', CPU: 'Core i5-14900K', RAM: '12Gb' },
                { Type: 'Desktop', DeviceName: 'ITP-DT-AMC', User: 'ACunningham', Purchased: '1/20/2019', Age: '5 yrs / 9 mths', Value: '$1,400', Make: 'Dell', Model: 'Latitude 750', CPU: 'Core i9-14900K', RAM: '12Gb' },
                { Type: 'Switch', DeviceName: '', User: '', Purchased: '8/1/2013', Age: '7 yrs / 3 mths', Value: '$900', Make: 'Trendnet', Model: 'TEG-3524S', CPU: '', RAM: '' },
                { Type: 'NAS', DeviceName: 'ITP-NAS', User: '', Purchased: '3/24/2020', Age: '6 yrs / 1 mths', Value: '$4,500', Make: 'Synology', Model: 'QL480i', CPU: 'Celeron', RAM: '6 Gb' }
            ];

            const grid = new window.ej.grids.Grid({
                dataSource: gridData,
                allowPaging: true,
                pageSettings: { pageSize: 10 },
                allowSorting: true,
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
            console.log('Syncfusion Grid initialized successfully');
            return;
        } catch (error) {
            console.warn('Syncfusion Grid initialization failed, using fallback table:', error);
        }
    }
    
    // Fallback: Create HTML table if Syncfusion is not available
    const gridData = [
        { Type: 'Desktop', DeviceName: 'ITP-DT-SMC', User: 'SCunningham', Purchased: '6/21/2022', Age: '4 yrs / 3 mths', Value: '$1,600', Make: 'Dell', Model: 'Latitude 750', CPU: 'Core i9-14900K', RAM: '12Gb' },
        { Type: 'Laptop', DeviceName: 'ITP-LT-SMC', User: 'SCunningham', Purchased: '7/11/2001', Age: '5 yrs / 2 mths', Value: '$2,000', Make: 'Lenovo', Model: 'Yoga 71', CPU: 'Core i5-14900K', RAM: '12Gb' },
        { Type: 'Desktop', DeviceName: 'ITP-DT-AMC', User: 'ACunningham', Purchased: '1/20/2019', Age: '5 yrs / 9 mths', Value: '$1,400', Make: 'Dell', Model: 'Latitude 750', CPU: 'Core i9-14900K', RAM: '12Gb' },
        { Type: 'Switch', DeviceName: '', User: '', Purchased: '8/1/2013', Age: '7 yrs / 3 mths', Value: '$900', Make: 'Trendnet', Model: 'TEG-3524S', CPU: '', RAM: '' },
        { Type: 'NAS', DeviceName: 'ITP-NAS', User: '', Purchased: '3/24/2020', Age: '6 yrs / 1 mths', Value: '$4,500', Make: 'Synology', Model: 'QL480i', CPU: 'Celeron', RAM: '6 Gb' }
    ];
    
    let html = '<table style="width: 100%; border-collapse: collapse; font-size: 13px;"><thead><tr style="background-color: #34495e; color: white; font-weight: 600;"><th style="border: 1px solid #dee2e6; padding: 10px; text-align: left;">Type</th><th style="border: 1px solid #dee2e6; padding: 10px; text-align: left;">Device Name</th><th style="border: 1px solid #dee2e6; padding: 10px; text-align: left;">User</th><th style="border: 1px solid #dee2e6; padding: 10px; text-align: left;">Purchased</th><th style="border: 1px solid #dee2e6; padding: 10px; text-align: left;">Age</th><th style="border: 1px solid #dee2e6; padding: 10px; text-align: right;">Value</th><th style="border: 1px solid #dee2e6; padding: 10px; text-align: left;">Make</th><th style="border: 1px solid #dee2e6; padding: 10px; text-align: left;">Model</th><th style="border: 1px solid #dee2e6; padding: 10px; text-align: left;">CPU</th><th style="border: 1px solid #dee2e6; padding: 10px; text-align: left;">RAM</th></tr></thead><tbody>';
    
    gridData.forEach(row => {
        html += `<tr style="border-bottom: 1px solid #dee2e6;"><td style="border: 1px solid #dee2e6; padding: 10px;">${row.Type}</td><td style="border: 1px solid #dee2e6; padding: 10px;">${row.DeviceName}</td><td style="border: 1px solid #dee2e6; padding: 10px;">${row.User}</td><td style="border: 1px solid #dee2e6; padding: 10px;">${row.Purchased}</td><td style="border: 1px solid #dee2e6; padding: 10px;">${row.Age}</td><td style="border: 1px solid #dee2e6; padding: 10px; text-align: right;">${row.Value}</td><td style="border: 1px solid #dee2e6; padding: 10px;">${row.Make}</td><td style="border: 1px solid #dee2e6; padding: 10px;">${row.Model}</td><td style="border: 1px solid #dee2e6; padding: 10px;">${row.CPU}</td><td style="border: 1px solid #dee2e6; padding: 10px;">${row.RAM}</td></tr>`;
    });
    
    html += '</tbody></table>';
    
    const gridElement = document.getElementById('hardwareGrid');
    if (gridElement) {
        gridElement.innerHTML = html;
        console.log('Fallback HTML table created successfully');
    }
}


