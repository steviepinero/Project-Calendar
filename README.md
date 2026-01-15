# MSP Project Calendar

A smart project scheduling application for Managed Service Providers that automatically manages resource allocation based on daily hour limits.

## Features

### 🚀 Core Functionality

- **Smart Auto-Scheduling**: Automatically assigns projects to available time slots based on team member availability
- **Hour Management**: Tracks daily hour limits per person and prevents over-allocation
- **Visual Gantt Chart**: Interactive timeline view showing all projects and their durations
- **Dual View Modes**: Switch between multi-week overview and single-week daily view
- **Resizable Columns**: Drag column edges to resize weeks/days for better visibility and customization
- **Weekend Skipping**: Automatically skips weekends when calculating project schedules
- **Multiple Project Types**: Support for projects, tasks, and sub-tasks with visual differentiation

### 📊 Project Management

- **Project Tree View**: Hierarchical display of all projects and tasks
- **Full Edit Modal**: Click any project to open a comprehensive edit dialog with all details
- **Delete Projects**: Remove projects directly from the edit modal
- **Detailed Status Tracking**: Monitor hours, dates, and project status
- **Checklist System**: Add and track checklist items for each project
- **Project Summary & Details**: Document project scope and requirements
- **Person-Specific Colors**: Each team member has a unique color for easy visual identification

### 🎯 Key Benefits

1. **No Over-Allocation**: System prevents scheduling conflicts by automatically finding the next available day when daily hours would be exceeded
2. **Visual Clarity**: Color-coded Gantt bars make it easy to see project timelines at a glance
3. **Team Management**: Track multiple team members with individual hour allocations
4. **Automatic Calculation**: End dates are calculated automatically based on work duration and daily limits

## How It Works

### Auto-Scheduling Logic

When you add a new project or task:

1. You specify the assigned person, task duration, and daily hour limit
2. You choose a preferred start date
3. The system checks if that person has available hours on that date
4. If the daily limit would be exceeded, it automatically moves to the next available workday
5. The project is scheduled optimally without manual date juggling

### Example Scenario

**Team Member**: John Smith (8 hours/day limit)

**Projects**:
- Project A: 6 hours/day for 3 days (starts Monday)
- Project B: 4 hours/day for 2 days (preferred start: Monday)

**Result**: 
- Project A: Monday-Wednesday (6h/day)
- Project B: Automatically scheduled to Thursday-Friday (since Monday-Wednesday only have 2 hours available each day)

## Usage

### Getting Started

1. Open `index.html` in a web browser
2. The calendar loads with sample data to demonstrate functionality
3. Click "Add Project" or "Add Task" to create new items

### Adding a Project

1. Click the "+ Add Project" button
2. Fill in the details:
   - **Project/Task Name**: Descriptive name
   - **Assigned To**: Select team member
   - **Daily Hour Limit**: How many hours per day to allocate
   - **Task Duration**: Total hours needed
   - **Preferred Start Date**: When you'd like to start (system will adjust if needed)
   - **Type**: Project, Task, or Sub-task
3. Click "Save"

The system will automatically:
- Find the optimal start date
- Calculate the end date
- Display the project on the Gantt chart
- Update the project tree

### Editing Projects

**Single Click** on any project (in the left panel or Gantt chart) to open the full edit modal:
- Edit project/task name
- Change assigned team member
- Update status (Active, Pending, Completed, On Hold)
- Modify hours and duration
- Adjust start date
- Change project type
- Add detailed descriptions and notes
- Delete the project

**Double Click** on a project in the left panel to select it and view details in the right panel

### Person Color Legend

Each team member has a distinct color for easy identification:
- **John Smith**: Purple gradient
- **Jane Doe**: Pink/red gradient
- **Bob Johnson**: Blue gradient
- **Alice Williams**: Green/cyan gradient

The color legend is displayed in the header for quick reference.

### View Modes

**Multi-Week View** (Default):
- Shows 8 weeks at once for big-picture planning
- Each column represents one week
- Great for long-term scheduling and resource allocation

**Single Week View** (Detailed):
- Shows 7 individual day columns for a single week
- Each column represents one day (Sunday - Saturday)
- Navigate between weeks using Previous/Next buttons
- Click "Today" to jump to the current week
- Perfect for daily task management and detailed scheduling

**Switching Views:**
Click the view toggle buttons at the top of the Gantt chart:
- "Multi-Week View" - Overview of multiple weeks
- "Single Week View" - Drill down into daily details

### Resizing Columns

To adjust the width of week/day columns in the Gantt chart:
1. Hover over the right edge of any column header
2. When the cursor changes to a resize cursor, click and drag
3. Release to set the new width
4. All project bars automatically adjust to the new column widths
5. Minimum column width is 100px for readability

### Team Member Configuration

Edit the `teamMembers` object in `app.js` to customize your team:

```javascript
let teamMembers = {
    person1: { name: 'Your Name', dailyLimit: 8 },
    person2: { name: 'Team Member 2', dailyLimit: 6 },
    // Add more team members as needed
};
```

## Technical Details

### Files

- `index.html` - Main application structure (now using Syncfusion UI)
- `styles.css` - Complete styling and layout with Syncfusion customizations
- `app.js` - Application logic and scheduling algorithm
- `README.md` - This documentation

### UI Framework

**Syncfusion Enterprise UI Components** - The application now uses Syncfusion's Material Design theme for a modern, professional interface:

- **Material Design Theme**: Modern, clean aesthetic with smooth animations
- **Responsive Components**: Buttons, dialogs, forms, and cards that adapt to different screen sizes
- **Consistent Styling**: Unified visual language across all UI elements
- **Built-in Accessibility**: ARIA labels and keyboard navigation support
- **Professional Look**: Enterprise-grade UI components

#### Syncfusion Components Used:
- Buttons (`.e-btn`) - Primary, outline, danger variants
- Dialogs (`.e-dialog`) - Modal windows for forms and confirmations
- Cards (`.e-card`) - Content containers with headers
- Form Fields (`.e-field`) - Styled inputs, selects, and textareas
- List View (`.e-listview`) - MAC address allow/block lists

### Browser Compatibility

Works in all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari

### Dependencies

The application uses **Syncfusion EJ2** (community/commercial license):
- **CSS**: `https://cdn.syncfusion.com/ej2/23.1.36/material.css`
- **JavaScript**: `https://cdn.syncfusion.com/ej2/23.1.36/dist/ej2.umd.js`

These are loaded from CDN for convenience and are optional (fallback to vanilla styling works without them).

## Customization

### Colors

Edit the gradient colors in `styles.css` for different project types:

```css
.gantt-bar.project {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Date Range

Modify the `generateDateRange()` function in `app.js` to change the number of weeks displayed:

```javascript
// Change this number to show more/fewer weeks
for (let i = 0; i < 8; i++) {
```

### Working Days

To modify weekend behavior or add holidays, edit the scheduling logic in `calculateOptimalStartDate()` and `calculateEndDate()`.

## Future Enhancements

Potential features to add:
- Data persistence (localStorage or database)
- Export to Excel/PDF
- Drag-and-drop rescheduling
- Resource conflict warnings
- Multi-project dependencies
- Email notifications
- Mobile responsive design improvements
- Holiday calendar integration

## License

Free to use and modify for your MSP needs.

