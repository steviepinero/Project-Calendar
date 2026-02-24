// Grid Utilities - Responsive Grid Management

/**
 * Make a Syncfusion Grid responsive to window resizing
 * @param {Object} gridInstance - Syncfusion Grid instance
 * @param {string} containerId - ID of the grid container
 */
function makeGridResponsive(gridInstance, containerId) {
    if (!gridInstance) return;
    
    const updateGridSize = () => {
        const container = document.getElementById(containerId)?.parentElement;
        if (!container) return;
        
        // Calculate available height
        const containerHeight = container.clientHeight;
        const gridElement = document.getElementById(containerId);
        
        if (gridElement && containerHeight > 0) {
            // Set grid height to fill container
            gridElement.style.height = `${containerHeight - 20}px`;
            
            // Refresh grid to recalculate layout
            if (gridInstance.refresh) {
                gridInstance.refresh();
            }
        }
    };
    
    // Initial size update
    setTimeout(updateGridSize, 100);
    
    // Update on window resize with debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateGridSize, 250);
    });
    
    return updateGridSize;
}

/**
 * Configure grid for optimal responsive behavior
 * @param {Object} config - Grid configuration object
 * @returns {Object} Enhanced configuration
 */
function getResponsiveGridConfig(config) {
    return {
        ...config,
        // Enable features for better responsiveness
        allowResizing: true,
        allowTextWrap: false,
        gridLines: 'Both',
        // Ensure grid takes full width
        width: '100%',
        // Enable horizontal scrolling if needed
        allowScrolling: true,
        scrollSettings: {
            enableVirtualization: false
        },
        // Auto-fit columns on load
        load: function() {
            if (this.autoFitColumns) {
                // Don't auto-fit immediately as it might hide columns
                // Instead, ensure all columns are visible with scroll
            }
        },
        // Recalculate on data bound
        dataBound: function() {
            // Ensure grid fits its container
            if (this.element) {
                this.element.style.width = '100%';
            }
        },
        // Handle window resize
        created: function() {
            const originalCreated = config.created;
            if (originalCreated) {
                originalCreated.call(this);
            }
            
            // Make this grid responsive
            const gridId = this.element.id;
            if (gridId) {
                makeGridResponsive(this, gridId);
            }
        }
    };
}

/**
 * Refresh all visible grids on the page
 */
function refreshAllGrids() {
    // Find all Syncfusion grid instances
    const grids = document.querySelectorAll('.e-grid');
    
    grids.forEach(gridElement => {
        const gridInstance = gridElement.ej2_instances;
        if (gridInstance && gridInstance[0]) {
            const grid = gridInstance[0];
            if (grid.refresh && typeof grid.refresh === 'function') {
                try {
                    grid.refresh();
                } catch (e) {
                    console.warn('Could not refresh grid:', e);
                }
            }
        }
    });
}

/**
 * Adjust grid columns to fit available width while maintaining visibility
 * @param {Object} gridInstance - Syncfusion Grid instance
 */
function adjustGridColumns(gridInstance) {
    if (!gridInstance || !gridInstance.element) return;
    
    const gridWidth = gridInstance.element.clientWidth;
    const columns = gridInstance.columns;
    
    if (!columns || columns.length === 0) return;
    
    // Calculate total width needed
    let totalWidth = 0;
    columns.forEach(col => {
        if (col.width) {
            totalWidth += parseInt(col.width);
        }
    });
    
    // If total width is less than grid width, distribute extra space
    if (totalWidth < gridWidth) {
        const extraSpace = gridWidth - totalWidth;
        const extraPerColumn = Math.floor(extraSpace / columns.length);
        
        columns.forEach(col => {
            if (col.width) {
                const currentWidth = parseInt(col.width);
                col.width = currentWidth + extraPerColumn;
            }
        });
    }
    
    // Refresh grid to apply changes
    if (gridInstance.refresh) {
        gridInstance.refreshColumns();
    }
}

// Export functions to global scope
if (typeof window !== 'undefined') {
    window.GridUtils = {
        makeGridResponsive,
        getResponsiveGridConfig,
        refreshAllGrids,
        adjustGridColumns
    };
    
    // Auto-refresh all grids on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            console.log('📐 Window resized - refreshing all grids');
            refreshAllGrids();
        }, 300);
    });
}




