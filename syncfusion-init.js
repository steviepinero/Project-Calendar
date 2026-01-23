/**
 * Syncfusion Control Initialization
 * This file initializes all Syncfusion controls across the application
 */

// ============================================
// SYNCFUSION INITIALIZATION MANAGER
// ============================================

class SyncfusionManager {
    constructor() {
        this.registeredControls = {
            textboxes: [],
            dropdowns: [],
            datepickers: [],
            numerics: [],
            dialogs: [],
            grids: [],
            buttons: [],
            checkboxes: [],
            sidebars: [],
            menus: [],
            trees: []
        };
        this.initialized = false;
    }

    /**
     * Initialize all Syncfusion controls on page load or page change
     */
    initializeAll() {
        console.log('🎨 Initializing Syncfusion Controls...');
        
        this.initializeTextBoxes();
        this.initializeDropDownLists();
        this.initializeDatePickers();
        this.initializeNumericTextBoxes();
        this.initializeCheckBoxes();
        this.initializeButtons();
        
        console.log('✅ Syncfusion Controls Initialized');
        this.initialized = true;
    }

    /**
     * Initialize TextBoxes
     */
    initializeTextBoxes() {
        document.querySelectorAll('input[type="text"].e-field, textarea.e-field').forEach(element => {
            if (!element.classList.contains('e-textbox-initialized')) {
                // Syncfusion automatically enhances inputs with e-field class
                element.classList.add('e-textbox-initialized');
                
                // Add focus styling
                element.addEventListener('focus', () => {
                    element.classList.add('e-field-focus');
                });
                element.addEventListener('blur', () => {
                    element.classList.remove('e-field-focus');
                });
            }
        });
        console.log('✅ TextBoxes initialized');
    }

    /**
     * Initialize DropDownLists
     */
    initializeDropDownLists() {
        document.querySelectorAll('select.e-field').forEach(element => {
            if (!element.classList.contains('e-dropdown-initialized')) {
                const dropdownOptions = {
                    value: element.value || ''
                };
                
                const dropdown = new ej.dropdowns.DropDownList(dropdownOptions, element);
                element.classList.add('e-dropdown-initialized');
                this.registeredControls.dropdowns.push(dropdown);
            }
        });
        console.log('✅ DropDownLists initialized');
    }

    /**
     * Initialize DatePickers
     */
    initializeDatePickers() {
        document.querySelectorAll('input[type="date"].e-field').forEach(element => {
            if (!element.classList.contains('e-datepicker-initialized')) {
                const datePickerOptions = {
                    value: element.value ? new Date(element.value) : new Date()
                };
                
                const datePicker = new ej.calendars.DatePicker(datePickerOptions, element);
                element.classList.add('e-datepicker-initialized');
                this.registeredControls.datepickers.push(datePicker);
            }
        });
        console.log('✅ DatePickers initialized');
    }

    /**
     * Initialize NumericTextBoxes
     */
    initializeNumericTextBoxes() {
        document.querySelectorAll('input[type="number"].e-field').forEach(element => {
            if (!element.classList.contains('e-numeric-initialized')) {
                const numericOptions = {
                    value: element.value ? parseFloat(element.value) : 0,
                    min: element.min ? parseFloat(element.min) : 0,
                    max: element.max ? parseFloat(element.max) : 999999,
                    step: element.step ? parseFloat(element.step) : 0.01
                };
                
                const numeric = new ej.inputs.NumericTextBox(numericOptions, element);
                element.classList.add('e-numeric-initialized');
                this.registeredControls.numerics.push(numeric);
            }
        });
        console.log('✅ NumericTextBoxes initialized');
    }

    /**
     * Initialize CheckBoxes
     */
    initializeCheckBoxes() {
        document.querySelectorAll('input[type="checkbox"].e-field').forEach(element => {
            if (!element.classList.contains('e-checkbox-initialized')) {
                const checkboxOptions = {
                    checked: element.checked || false
                };
                
                const checkbox = new ej.buttons.CheckBox(checkboxOptions, element);
                element.classList.add('e-checkbox-initialized');
                this.registeredControls.checkboxes.push(checkbox);
            }
        });
        console.log('✅ CheckBoxes initialized');
    }

    /**
     * Initialize Buttons (just ensure they have proper classes)
     */
    initializeButtons() {
        document.querySelectorAll('button.e-btn').forEach(button => {
            if (!button.classList.contains('e-button-initialized')) {
                // Buttons are styled by CSS, but we can add ripple effect
                button.addEventListener('click', function() {
                    // Add ripple animation if desired
                });
                button.classList.add('e-button-initialized');
            }
        });
        console.log('✅ Buttons initialized');
    }

    /**
     * Create a Syncfusion Dialog
     * @param {string} id - Dialog element ID
     * @param {object} options - Dialog options
     */
    createDialog(id, options = {}) {
        const dialogElement = document.getElementById(id);
        if (!dialogElement) return null;

        const defaultOptions = {
            header: options.header || 'Dialog',
            content: options.content || '',
            buttons: options.buttons || [
                { buttonModel: { content: 'Close', cssClass: 'e-btn e-outline' }, click: function(e) { this.hide(); } }
            ],
            width: options.width || '500px',
            visible: false,
            target: options.target || document.body,
            animationSettings: { effect: options.effect || 'Zoom', duration: 400 },
            ...options
        };

        const dialog = new ej.popups.Dialog(defaultOptions, dialogElement);
        this.registeredControls.dialogs.push(dialog);
        return dialog;
    }

    /**
     * Show a Dialog
     * @param {string} id - Dialog element ID
     */
    showDialog(id) {
        const dialogElement = document.getElementById(id);
        if (dialogElement && dialogElement.ej2_instances && dialogElement.ej2_instances[0]) {
            dialogElement.ej2_instances[0].show();
        }
    }

    /**
     * Hide a Dialog
     * @param {string} id - Dialog element ID
     */
    hideDialog(id) {
        const dialogElement = document.getElementById(id);
        if (dialogElement && dialogElement.ej2_instances && dialogElement.ej2_instances[0]) {
            dialogElement.ej2_instances[0].hide();
        }
    }

    /**
     * Create a Syncfusion Grid
     * @param {string} id - Grid element ID
     * @param {object} options - Grid options
     */
    createGrid(id, options = {}) {
        const gridElement = document.getElementById(id);
        if (!gridElement) return null;

        const defaultOptions = {
            dataSource: options.dataSource || [],
            columns: options.columns || [],
            allowPaging: options.allowPaging !== false,
            allowSorting: options.allowSorting !== false,
            allowSelection: options.allowSelection !== false,
            pageSettings: { pageSize: 10 },
            selectionSettings: { type: 'Multiple', mode: 'Row' },
            ...options
        };

        const grid = new ej.grids.Grid(defaultOptions, gridElement);
        this.registeredControls.grids.push(grid);
        return grid;
    }

    /**
     * Create a Syncfusion Menu
     * @param {string} id - Menu element ID
     * @param {object} options - Menu options
     */
    createMenu(id, options = {}) {
        const menuElement = document.getElementById(id);
        if (!menuElement) return null;

        const defaultOptions = {
            items: options.items || [],
            ...options
        };

        const menu = new ej.navigations.Menu(defaultOptions, menuElement);
        this.registeredControls.menus.push(menu);
        return menu;
    }

    /**
     * Get all TextBox values
     */
    getTextBoxValues() {
        const values = {};
        document.querySelectorAll('input[type="text"].e-field, textarea.e-field').forEach(element => {
            if (element.id) {
                values[element.id] = element.value;
            }
        });
        return values;
    }

    /**
     * Set TextBox values
     */
    setTextBoxValues(values) {
        Object.keys(values).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.value = values[id];
            }
        });
    }

    /**
     * Clear all form controls
     */
    clearAllForms() {
        document.querySelectorAll('.e-field').forEach(element => {
            if (element.type === 'text' || element.type === 'number' || element.type === 'date' || element.tagName === 'TEXTAREA') {
                element.value = '';
            } else if (element.type === 'checkbox') {
                element.checked = false;
            }
        });
    }

    /**
     * Reinitialize controls after page navigation
     */
    reinitialize() {
        console.log('🔄 Reinitializing Syncfusion Controls...');
        this.initializeAll();
    }

    /**
     * Destroy all controls (cleanup)
     */
    destroyAll() {
        console.log('🧹 Destroying Syncfusion Controls...');
        
        Object.values(this.registeredControls).forEach(controlArray => {
            if (Array.isArray(controlArray)) {
                controlArray.forEach(control => {
                    if (control && typeof control.destroy === 'function') {
                        control.destroy();
                    }
                });
            }
        });

        this.registeredControls = {
            textboxes: [],
            dropdowns: [],
            datepickers: [],
            numerics: [],
            dialogs: [],
            grids: [],
            buttons: [],
            checkboxes: [],
            sidebars: [],
            menus: [],
            trees: []
        };

        this.initialized = false;
        console.log('✅ Controls destroyed');
    }
}

// Create global Syncfusion Manager instance
const syncfusionManager = new SyncfusionManager();

// ============================================
// AUTO-INITIALIZE ON DOCUMENT READY
// ============================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('📄 DOM Ready - Initializing Syncfusion');
        syncfusionManager.initializeAll();
    });
} else {
    console.log('📄 DOM Already Loaded - Initializing Syncfusion');
    syncfusionManager.initializeAll();
}

// ============================================
// UTILITY FUNCTIONS FOR COMMON TASKS
// ============================================

/**
 * Get value from a form field
 */
function getFieldValue(fieldId) {
    const element = document.getElementById(fieldId);
    if (!element) return null;
    
    if (element.ej2_instances && element.ej2_instances[0]) {
        return element.ej2_instances[0].value;
    }
    return element.value;
}

/**
 * Set value to a form field
 */
function setFieldValue(fieldId, value) {
    const element = document.getElementById(fieldId);
    if (!element) return;
    
    if (element.ej2_instances && element.ej2_instances[0]) {
        element.ej2_instances[0].value = value;
    } else {
        element.value = value;
    }
}

/**
 * Enable/Disable a field
 */
function setFieldEnabled(fieldId, enabled) {
    const element = document.getElementById(fieldId);
    if (!element) return;
    
    if (element.ej2_instances && element.ej2_instances[0]) {
        element.ej2_instances[0].enabled = enabled;
    } else {
        element.disabled = !enabled;
    }
}

/**
 * Show a Syncfusion message dialog
 */
function showMessageDialog(title, message, onClose) {
    const dialogContainer = document.createElement('div');
    dialogContainer.id = 'messageDialog_' + Date.now();
    dialogContainer.innerHTML = `<p>${message}</p>`;
    document.body.appendChild(dialogContainer);

    const dialog = new ej.popups.Dialog({
        header: title,
        content: `<p>${message}</p>`,
        buttons: [
            { buttonModel: { content: 'OK', cssClass: 'e-btn e-primary' }, click: function() { 
                this.hide();
                if (onClose) onClose();
                setTimeout(() => dialogContainer.remove(), 500);
            }}
        ],
        width: '400px',
        animationSettings: { effect: 'Zoom', duration: 400 }
    }, dialogContainer);

    dialog.show();
}

/**
 * Show a Syncfusion confirmation dialog
 */
function showConfirmDialog(title, message, onConfirm, onCancel) {
    const dialogContainer = document.createElement('div');
    dialogContainer.id = 'confirmDialog_' + Date.now();
    dialogContainer.innerHTML = `<p>${message}</p>`;
    document.body.appendChild(dialogContainer);

    const dialog = new ej.popups.Dialog({
        header: title,
        content: `<p>${message}</p>`,
        buttons: [
            { buttonModel: { content: 'Confirm', cssClass: 'e-btn e-primary' }, click: function() { 
                this.hide();
                if (onConfirm) onConfirm();
                setTimeout(() => dialogContainer.remove(), 500);
            }},
            { buttonModel: { content: 'Cancel', cssClass: 'e-btn e-outline' }, click: function() { 
                this.hide();
                if (onCancel) onCancel();
                setTimeout(() => dialogContainer.remove(), 500);
            }}
        ],
        width: '400px',
        animationSettings: { effect: 'Zoom', duration: 400 }
    }, dialogContainer);

    dialog.show();
}

// ============================================
// MODAL INITIALIZATION
// ============================================

// Store dialog instances globally for easy access
window.dialogInstances = {
    project: null,
    employee: null,
    edit: null,
    settings: null,
    blockMac: null,
    addMac: null,
    campaign: null
};

/**
 * Initialize all Syncfusion Dialogs
 */
function initializeDialogs() {
    console.log('🎯 Initializing Syncfusion Dialogs...');
    
    try {
        // Project Modal
        const projectModalEl = document.getElementById('projectModal');
        if (projectModalEl) {
            console.log('✅ Found projectModal element');
            window.dialogInstances.project = new ej.popups.Dialog({
                header: 'Add/Edit Project',
                showCloseIcon: true,
                visible: false,
                isModal: true,
                width: '600px',
                position: { X: 'center', Y: 'center' },
                animationSettings: { effect: 'Zoom', duration: 400 },
                zIndex: 1050
            });
            window.dialogInstances.project.appendTo('#projectModal');
            console.log('✅ Project dialog initialized');
        } else {
            console.warn('⚠️ projectModal element not found');
        }
        
        // Settings Modal
        const settingsModalEl = document.getElementById('settingsModal');
        if (settingsModalEl) {
            console.log('✅ Found settingsModal element');
            window.dialogInstances.settings = new ej.popups.Dialog({
                header: '⚙️ Settings & API Configuration',
                showCloseIcon: true,
                visible: false,
                isModal: true,
                width: '650px',
                height: '80vh',
                position: { X: 'center', Y: 'center' },
                animationSettings: { effect: 'Zoom', duration: 400 },
                allowDragging: true,
                zIndex: 1050
            });
            window.dialogInstances.settings.appendTo('#settingsModal');
            console.log('✅ Settings dialog initialized');
        } else {
            console.warn('⚠️ settingsModal element not found');
        }
        
        // Edit Modal (Large)
        const editModalEl = document.getElementById('editModal');
        if (editModalEl) {
            console.log('✅ Found editModal element');
            window.dialogInstances.edit = new ej.popups.Dialog({
                header: 'Edit Project/Task',
                showCloseIcon: true,
                visible: false,
                isModal: true,
                width: '700px',
                position: { X: 'center', Y: 'center' },
                animationSettings: { effect: 'Zoom', duration: 400 },
                zIndex: 1050
            });
            window.dialogInstances.edit.appendTo('#editModal');
            console.log('✅ Edit dialog initialized');
        } else {
            console.warn('⚠️ editModal element not found');
        }
        
        // Employee Modal
        const employeeModalEl = document.getElementById('employeeModal');
        if (employeeModalEl) {
            window.dialogInstances.employee = new ej.popups.Dialog({
                header: 'Add New Employee',
                showCloseIcon: true,
                visible: false,
                isModal: true,
                width: '500px',
                position: { X: 'center', Y: 'center' },
                animationSettings: { effect: 'Zoom', duration: 400 },
                zIndex: 1050
            });
            window.dialogInstances.employee.appendTo('#employeeModal');
        }
        
        // Block MAC Modal
        const blockModalEl = document.getElementById('blockModal');
        if (blockModalEl) {
            window.dialogInstances.blockMac = new ej.popups.Dialog({
                header: 'Block MAC Address',
                showCloseIcon: true,
                visible: false,
                isModal: true,
                width: '500px',
                position: { X: 'center', Y: 'center' },
                animationSettings: { effect: 'Zoom', duration: 400 },
                zIndex: 1050
            });
            window.dialogInstances.blockMac.appendTo('#blockModal');
        }
        
        // Add MAC Modal
        const addMacModalEl = document.getElementById('addMacModal');
        if (addMacModalEl) {
            window.dialogInstances.addMac = new ej.popups.Dialog({
                header: 'Add MAC Address',
                showCloseIcon: true,
                visible: false,
                isModal: true,
                width: '500px',
                position: { X: 'center', Y: 'center' },
                animationSettings: { effect: 'Zoom', duration: 400 },
                zIndex: 1050
            });
            window.dialogInstances.addMac.appendTo('#addMacModal');
        }
        
        // Campaign Modal
        const campaignModalEl = document.getElementById('campaignModal');
        if (campaignModalEl) {
            window.dialogInstances.campaign = new ej.popups.Dialog({
                header: 'Create New Campaign',
                showCloseIcon: true,
                visible: false,
                isModal: true,
                width: '600px',
                position: { X: 'center', Y: 'center' },
                animationSettings: { effect: 'Zoom', duration: 400 },
                zIndex: 1050
            });
            window.dialogInstances.campaign.appendTo('#campaignModal');
        }
        
        console.log('✅ All Dialogs Initialized');
    } catch (error) {
        console.error('Error initializing dialogs:', error);
    }
}

/**
 * Helper to show a dialog by name
 */
function showDialog(dialogName) {
    console.log(`📊 Attempting to show dialog: ${dialogName}`);
    if (window.dialogInstances[dialogName]) {
        console.log(`✅ Dialog instance found, calling show()`);
        window.dialogInstances[dialogName].show();
        console.log(`✅ Dialog show() called, visible:`, window.dialogInstances[dialogName].visible);
    } else {
        console.error(`❌ Dialog '${dialogName}' not found in instances:`, Object.keys(window.dialogInstances));
    }
}

/**
 * Helper to hide a dialog by name
 */
function hideDialog(dialogName) {
    if (window.dialogInstances[dialogName]) {
        window.dialogInstances[dialogName].hide();
    }
}

// ============================================
// AUTO-INITIALIZE DIALOGS ON DOM READY
// ============================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('📄 Initializing Dialogs on DOM Ready');
        initializeDialogs();
    });
} else {
    console.log('📄 Initializing Dialogs (DOM already loaded)');
    initializeDialogs();
}

// ============================================
// SIDEBAR ACCORDION INITIALIZATION
// ============================================

/**
 * Initialize Sidebar Accordion (Syncfusion)
 */
function initializeSidebarAccordion() {
    console.log('🎯 [ACCORDION] Starting initialization...');
    
    // Verify Syncfusion is loaded
    if (typeof ej === 'undefined') {
        console.error('❌ [ACCORDION] Syncfusion library (ej) not loaded!');
        return;
    }
    
    if (typeof ej.navigations === 'undefined' || typeof ej.navigations.Accordion === 'undefined') {
        console.error('❌ [ACCORDION] Syncfusion Accordion component not available!');
        console.log('Available ej objects:', Object.keys(ej));
        return;
    }
    
    console.log('✅ [ACCORDION] Syncfusion Accordion component available');
    
    try {
        const accordionElement = document.getElementById('sidebarAccordion');
        if (!accordionElement) {
            console.error('❌ [ACCORDION] Element #sidebarAccordion not found in DOM');
            return;
        }
        
        console.log('✅ [ACCORDION] Found accordion element:', accordionElement);
        
        // Check if already initialized
        if (accordionElement.classList.contains('e-accordion-initialized')) {
            console.warn('⚠️ [ACCORDION] Already initialized, destroying previous instance');
            if (window.sidebarAccordionInstance) {
                try {
                    window.sidebarAccordionInstance.destroy();
                } catch (e) {
                    console.warn('Could not destroy previous instance:', e);
                }
            }
            accordionElement.classList.remove('e-accordion-initialized');
        }
        
        // Count items
        const items = accordionElement.querySelectorAll('.e-acrdn-item');
        console.log(`📊 [ACCORDION] Found ${items.length} accordion items`);
        
        // Create Syncfusion Accordion from existing HTML structure
        console.log('🔨 [ACCORDION] Creating new Accordion instance...');
        const accordion = new ej.navigations.Accordion({
            expandMode: 'Multiple',
            animation: { 
                collapse: { 
                    effect: 'SlideUp', 
                    duration: 300, 
                    easing: 'ease' 
                },
                expand: { 
                    effect: 'SlideDown', 
                    duration: 300, 
                    easing: 'ease' 
                }
            },
            expandedIndices: [0],  // Expand first item by default (ONBOARDING)
            expanding: function(args) {
                console.log('🔽 [ACCORDION] Expanding item index:', args.index);
            },
            expanded: function(args) {
                console.log('✅ [ACCORDION] Expanded item index:', args.index);
            },
            collapsing: function(args) {
                console.log('🔼 [ACCORDION] Collapsing item index:', args.index);
            },
            collapsed: function(args) {
                console.log('✅ [ACCORDION] Collapsed item index:', args.index);
            },
            created: function() {
                console.log('🎉 [ACCORDION] Created event fired');
            }
        });
        
        // Append to element
        console.log('🔗 [ACCORDION] Appending to DOM...');
        accordion.appendTo(accordionElement);
        
        // Mark as initialized
        accordionElement.classList.add('e-accordion-initialized');
        
        // Store instance globally for debugging
        window.sidebarAccordionInstance = accordion;
        
        console.log('✅ [ACCORDION] Initialization complete!');
        console.log('📊 [ACCORDION] Instance:', accordion);
        console.log('📊 [ACCORDION] Element classes:', accordionElement.className);
        
        // Verify it worked
        setTimeout(() => {
            const hasAccordionClass = accordionElement.classList.contains('e-control') && 
                                     accordionElement.classList.contains('e-accordion');
            if (hasAccordionClass) {
                console.log('✅ [ACCORDION] Verification passed - Syncfusion classes applied');
            } else {
                console.error('❌ [ACCORDION] Verification failed - Syncfusion classes NOT applied');
                console.log('Current classes:', accordionElement.className);
            }
            
            // Navigation will be set up by app.js after it loads
            console.log('✅ [ACCORDION] Accordion ready for navigation setup');
        }, 500);
        
        // Setup toggle button
        setupSidebarToggle();
        
    } catch (error) {
        console.error('❌ [ACCORDION] Error during initialization:', error);
        console.error('Stack trace:', error.stack);
    }
}

/**
 * Setup Sidebar Toggle Button
 */
function setupSidebarToggle() {
    const toggleBtn = document.getElementById('toggleSidebarBtn');
    const sidebar = document.querySelector('.sidebar');
    const toggleIcon = document.getElementById('sidebarToggleIcon');
    
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sidebar.classList.toggle('sidebar-collapsed');
            if (toggleIcon) {
                toggleIcon.textContent = sidebar.classList.contains('sidebar-collapsed') ? '+' : '−';
            }
            console.log('🔄 [SIDEBAR] Toggled:', sidebar.classList.contains('sidebar-collapsed') ? 'collapsed' : 'expanded');
        });
        console.log('✅ [SIDEBAR] Toggle button initialized');
    } else {
        console.warn('⚠️ [SIDEBAR] Toggle button or sidebar element not found');
    }
}

// Initialize accordion after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('📄 [ACCORDION] DOM ready, initializing...');
        // Add delay to ensure Syncfusion is fully loaded
        setTimeout(initializeSidebarAccordion, 100);
    });
} else {
    console.log('📄 [ACCORDION] DOM already loaded, initializing...');
    // Add delay to ensure Syncfusion is fully loaded
    setTimeout(initializeSidebarAccordion, 100);
}

// ============================================
// EXPORT FOR USE IN OTHER FILES
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { syncfusionManager, getFieldValue, setFieldValue, setFieldEnabled, showMessageDialog, showConfirmDialog, initializeDialogs, showDialog, hideDialog, initializeSidebarAccordion, setupSidebarToggle };
}

