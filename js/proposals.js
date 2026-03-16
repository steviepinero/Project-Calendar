/**
 * Proposals Page - All proposals grid (no pagination, show all, allow grouping)
 */
(function() {
    let allProposalsGridInstance = null;

    function initProposalsPage() {
        const gridEl = document.getElementById('allProposalsGrid');
        if (!gridEl) return;

        const data = window.proposalsData || [];

        if (allProposalsGridInstance) {
            allProposalsGridInstance.destroy();
            allProposalsGridInstance = null;
        }

        if (typeof ej === 'undefined') {
            console.warn('Syncfusion not loaded');
            return;
        }

        allProposalsGridInstance = new ej.grids.Grid({
            dataSource: data,
            allowSorting: true,
            allowFiltering: true,
            allowGrouping: true,
            allowPaging: false,
            groupSettings: { showDropArea: true },
            columns: [
                { field: 'Client', headerText: 'Client', width: 180 },
                { field: 'Name', headerText: 'Name', width: 200 },
                { field: 'Summary', headerText: 'Summary', width: 350 },
                { field: 'Created', headerText: 'Created', width: 110 },
                { field: 'Status', headerText: 'Status', width: 100 }
            ],
            height: '100%'
        });
        allProposalsGridInstance.appendTo('#allProposalsGrid');
    }

    window.initProposalsPage = initProposalsPage;
})();
