# Frontend API Integration Guide

This guide shows you how to update your `app.js` to use the PostgreSQL backend API instead of localStorage.

## 📋 Overview

**Before:** Data stored in browser localStorage  
**After:** Data stored in PostgreSQL database via API calls

## 🔧 Integration Steps

### Step 1: Include API Service

Add this to your `index.html` right before `app.js`:

```html
<!-- API Service Layer -->
<script src="api-service.js"></script>
<!-- Main Application -->
<script src="app.js"></script>
```

### Step 2: Initialize API Connection on App Start

Update `initializeApp()` function to sync with backend:

```javascript
function initializeApp() {
    const today = new Date();
    document.getElementById('requestDate').valueAsDate = today;
    document.getElementById('assignedStartDate').valueAsDate = today;
    document.getElementById('preferredStartDate').valueAsDate = today;
    
    // Load settings from localStorage (for API keys)
    loadSettings();
    setupSettingsEventListeners();
    
    // NEW: Load data from backend
    loadAllData();
    
    renderEmployeeDropdowns();
}

// NEW: Load all data from backend
async function loadAllData() {
    try {
        console.log('📡 Loading data from backend...');
        
        // Load projects
        const projectsResponse = await APIService.getProjectsWithTeam();
        if (projectsResponse.success) {
            projects = projectsResponse.data;
            console.log('✅ Projects loaded:', projects.length);
        }
        
        // Load team members
        const teamResponse = await APIService.getTeamMembers();
        if (teamResponse.success) {
            teamMembers = {};
            teamResponse.data.forEach(member => {
                teamMembers[member.id] = {
                    id: member.id,
                    name: member.name,
                    email: member.email,
                    color_gradient: member.color_gradient
                };
            });
            console.log('✅ Team members loaded:', Object.keys(teamMembers).length);
        }
        
        // Render UI
        renderGanttChart();
        renderAllowList();
        
    } catch (error) {
        console.error('❌ Error loading data:', error);
        alert('Failed to load data from server. Please check your connection.');
    }
}
```

### Step 3: Update saveProject() Function

**Before (localStorage):**
```javascript
function saveProject() {
    // ... validation ...
    projects.push(newProject);
    renderGanttChart();
}
```

**After (API):**
```javascript
async function saveProject() {
    // ... validation ...
    
    try {
        // Determine if creating new or updating
        if (editingProjectId) {
            // Update existing
            const response = await APIService.updateProject(editingProjectId, projectData);
            if (response.success) {
                // Update local projects array
                const index = projects.findIndex(p => p.id === editingProjectId);
                if (index > -1) {
                    projects[index] = response.data;
                }
                console.log('✅ Project updated');
            }
        } else {
            // Create new
            const response = await APIService.createProject(projectData);
            if (response.success) {
                projects.push(response.data);
                console.log('✅ Project created');
            }
        }
        
        closeProjectModal();
        renderGanttChart();
        
    } catch (error) {
        console.error('❌ Error saving project:', error);
        alert(`Failed to save project: ${error.message}`);
    }
}
```

### Step 4: Update deleteProject() Function

**Before (localStorage):**
```javascript
function deleteProject(projectId) {
    projects = projects.filter(p => p.id !== projectId);
    renderGanttChart();
}
```

**After (API):**
```javascript
async function deleteProject(projectId) {
    if (!confirm('Are you sure you want to delete this project?')) {
        return;
    }
    
    try {
        const response = await APIService.deleteProject(projectId);
        if (response.success) {
            projects = projects.filter(p => p.id !== projectId);
            console.log('✅ Project deleted');
            renderGanttChart();
        }
    } catch (error) {
        console.error('❌ Error deleting project:', error);
        alert(`Failed to delete project: ${error.message}`);
    }
}
```

### Step 5: Update saveEmployee() Function

**Before (localStorage):**
```javascript
function saveEmployee() {
    // ... validation ...
    teamMembers[newId] = newMember;
    renderEmployeeDropdowns();
}
```

**After (API):**
```javascript
async function saveEmployee() {
    // ... validation ...
    
    try {
        const memberData = {
            name: name,
            email: email,
            role: 'Team Member',
            color_gradient: newColor,
            max_daily_hours: 8
        };
        
        const response = await APIService.createTeamMember(memberData);
        if (response.success) {
            teamMembers[response.data.id] = response.data;
            console.log('✅ Team member created');
            renderEmployeeDropdowns();
        }
    } catch (error) {
        console.error('❌ Error saving employee:', error);
        alert(`Failed to save employee: ${error.message}`);
    }
}
```

### Step 6: Update logCall() Function

**Before (localStorage):**
```javascript
function logCall(phoneNumber, callType, duration) {
    callHistory.push({
        number: phoneNumber,
        type: callType,
        duration: duration,
        timestamp: new Date().toLocaleString()
    });
    renderCallHistory();
}
```

**After (API):**
```javascript
async function logCall(phoneNumber, callType, duration) {
    try {
        const callData = {
            to_number: phoneNumber,
            call_type: callType,
            duration_seconds: duration,
            status: 'completed'
        };
        
        const response = await APIService.logCall(callData);
        if (response.success) {
            VOIP_CONFIG.callHistory.unshift(response.data);
            console.log('✅ Call logged');
            renderCallHistory();
        }
    } catch (error) {
        console.error('❌ Error logging call:', error);
        alert(`Failed to log call: ${error.message}`);
    }
}
```

## 🔄 Migration Path

### Phase 1: API Service Layer (Done)
- ✅ Create `api-service.js`
- ✅ Implement all endpoints
- ✅ Error handling

### Phase 2: Update Core Functions (Next)
- [ ] Update `initializeApp()` to load from API
- [ ] Update `saveProject()` to use API
- [ ] Update `deleteProject()` to use API
- [ ] Update `saveEmployee()` to use API

### Phase 3: Update Feature Functions
- [ ] Update `logCall()` for VoIP
- [ ] Update task management
- [ ] Update network MAC functions

### Phase 4: Testing & Verification
- [ ] Test all CRUD operations
- [ ] Test error handling
- [ ] Test data persistence
- [ ] Verify multi-device sync

## 📊 Data Flow

### Current (localStorage):
```
User Action
    ↓
app.js logic
    ↓
Update projects array
    ↓
localStorage.setItem()
    ↓
Data persisted locally
```

### New (PostgreSQL API):
```
User Action
    ↓
app.js logic
    ↓
API call (fetch)
    ↓
Express server
    ↓
PostgreSQL database
    ↓
Response with data
    ↓
Update projects array
    ↓
Re-render UI
```

## ✅ Benefits of API Integration

✅ **Centralized Data** - Single source of truth in database  
✅ **Multi-Device** - Access from any device  
✅ **Persistent** - Data survives browser clear  
✅ **Scalable** - Handle millions of records  
✅ **Backup-able** - Database backups  
✅ **Queryable** - Advanced filtering/search  
✅ **Secure** - Server-side validation  

## 🧪 Testing the Integration

### Test 1: Health Check
```javascript
// In browser console
APIService.healthCheck().then(console.log);
// Expected: {"status":"ok","message":"Server is running"}
```

### Test 2: Get Projects
```javascript
// In browser console
APIService.getProjectsWithTeam().then(console.log);
// Expected: {"success":true,"data":[...projects]}
```

### Test 3: Create Project
```javascript
APIService.createProject({
    name: "Test Project",
    description: "Testing API",
    duration_hours: 40
}).then(console.log);
```

## 🔐 Error Handling

All API calls include error handling:

```javascript
try {
    const response = await APIService.createProject(projectData);
    if (response.success) {
        // Handle success
    }
} catch (error) {
    console.error('API Error:', error);
    alert(`Error: ${error.message}`);
}
```

## 📝 Summary of Changes

| Function | Change | Impact |
|----------|--------|--------|
| `initializeApp()` | Add `loadAllData()` | Loads data from database on startup |
| `saveProject()` | Use API call | Creates/updates in database |
| `deleteProject()` | Use API call | Deletes from database |
| `saveEmployee()` | Use API call | Adds to database |
| `logCall()` | Use API call | Logs to database |

## 🚀 Next Phase

After updating these core functions, the remaining features (email campaigns, e-signature, etc.) can continue using localStorage or also be migrated to the database.

## 📞 Support

If you encounter issues:
1. Check browser console for errors (F12)
2. Verify backend is running (`npm run dev`)
3. Check network tab in DevTools
4. Review API response in network requests

---

**Status**: Integration guide complete  
**Next**: Implement changes in app.js

