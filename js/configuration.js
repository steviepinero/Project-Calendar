/**
 * Configuration Page - Tabs: Email Campaign, E-Signature, VoIP, Proposals
 */
(function() {
    let configInitialized = false;

    function initConfigurationPage() {
        const panelEmail = document.getElementById('config-panel-email');
        const panelSignature = document.getElementById('config-panel-signature');
        const panelVoip = document.getElementById('config-panel-voip');
        const panelProposals = document.getElementById('config-panel-proposals');

        if (!panelEmail) return;

        // Move pages into panels (once)
        if (!configInitialized) {
            const pageEmail = document.getElementById('page-email-campaigns');
            const pageSignature = document.getElementById('page-e-signature');
            const pageVoip = document.getElementById('page-voip-calling');

            if (pageEmail && pageEmail.parentNode) {
                pageEmail.classList.remove('page-content');
                panelEmail.appendChild(pageEmail);
            }
            if (pageSignature && pageSignature.parentNode) {
                pageSignature.classList.remove('page-content');
                panelSignature.appendChild(pageSignature);
            }
            if (pageVoip && pageVoip.parentNode) {
                pageVoip.classList.remove('page-content');
                panelVoip.appendChild(pageVoip);
            }

            panelProposals.innerHTML = `
                <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px; text-align: center;">
                    <h3 style="color: #2c3e50; margin: 0 0 15px 0;">📄 Proposals Configuration</h3>
                    <p style="color: #666; font-size: 14px; line-height: 1.6; margin-bottom: 25px;">
                        Configure proposal templates and default settings.
                    </p>
                    <button type="button" class="e-btn e-primary" id="configViewProposalsBtn">View All Proposals</button>
                </div>
            `;

            configInitialized = true;
        }

        // Tab button handlers
        document.querySelectorAll('.config-tab-btn').forEach(btn => {
            btn.replaceWith(btn.cloneNode(true));
        });
        document.querySelectorAll('.config-tab-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const tab = this.getAttribute('data-config-tab');
                document.querySelectorAll('.config-tab-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                document.querySelectorAll('.config-panel').forEach(p => p.style.display = 'none');
                const panel = document.getElementById('config-panel-' + tab);
                if (panel) {
                    panel.style.display = 'block';
                    if (tab === 'email' && window.EmailCampaigns) {
                        window.EmailCampaigns.initializeEmailCampaignsPage();
                    } else if (tab === 'signature' && window.ESignature) {
                        window.ESignature.initializeESignaturePage();
                    } else if (tab === 'voip' && window.VoIP) {
                        window.VoIP.initializeVoIPPage();
                    }
                }
            });
        });

        document.querySelectorAll('.config-panel').forEach(p => p.style.display = 'none');
        panelEmail.style.display = 'block';
        if (window.EmailCampaigns) window.EmailCampaigns.initializeEmailCampaignsPage();

        const viewProposalsBtn = document.getElementById('configViewProposalsBtn');
        if (viewProposalsBtn) {
            viewProposalsBtn.onclick = function() {
                if (window.switchPage) window.switchPage('proposals');
            };
        }
    }

    window.initConfigurationPage = initConfigurationPage;
})();
