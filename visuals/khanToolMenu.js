// khanToolMenu.js - Menu visual do KhanTool

(function() {
    if (document.getElementById('khanToolPanel')) {
        console.log('⚠️ KhanTool Menu já carregado!');
        return;
    }

    const features = [
        { id: 'questionSpoof', label: 'Question Spoofer', desc: 'Simula respostas de questões' },
        { id: 'videoSpoof', label: 'Video Spoofer', desc: 'Simula assistir vídeos' },
        { id: 'showAnswers', label: 'Answer Revealer', desc: 'Mostra as respostas' },
        { id: 'minuteFarmer', label: 'Minute farmer', desc: 'Farma minutos' },
        { id: 'customBanner', label: 'Custom Banner', desc: 'Banner customizado' },
        { id: 'autoAnswer', label: 'Auto Answer', desc: 'Responde automaticamente' },
        { id: 'rgbLogo', label: 'RGB Logo', desc: 'Logo com RGB' },
        { id: 'nextRecomendation', label: 'Next Recommendation', desc: 'Próxima recomendação' },
        { id: 'repeatQuestion', label: 'Repeat Question', desc: 'Repetir questão' }
    ];

    const panelHTML = `
        <div class="khantool-overlay" id="khanToolOverlay"></div>
        <div class="khantool-panel" id="khanToolPanel">
            <div class="khantool-header">
                <div class="khantool-logo">KhanTool</div>
                <button class="khantool-close" id="khanToolClose">×</button>
            </div>
            <div class="khantool-content">
                <div class="khantool-left">
                    <div class="khantool-features">
                        ${features.map(f => `
                            <div class="khantool-feature" data-feature="${f.id}">
                                <div class="khantool-checkbox ${window.features[f.id] ? 'checked' : ''}"></div>
                                <div>
                                    <div class="khantool-feature-label">${f.label}</div>
                                    <div class="khantool-feature-desc">${f.desc}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="khantool-right">
                    <div class="khantool-info">
                        <h3>Caso o script esteja com algum problema, recomendamos que você abra um ticket</h3>
                        <p>Lá nós vamos conseguir te ajudar com qualquer erro do script :D</p>
                        <p><strong>Enfim, faça um bom uso do KhanTool!</strong></p>
                    </div>
                </div>
            </div>
        </div>
        <button class="khantool-trigger" id="khanToolTrigger">Menu</button>
    `;

    const container = document.createElement('div');
    container.innerHTML = panelHTML;
    document.body.appendChild(container);

    const overlay = document.getElementById('khanToolOverlay');
    const panel = document.getElementById('khanToolPanel');
    const trigger = document.getElementById('khanToolTrigger');
    const closeBtn = document.getElementById('khanToolClose');
    const featureElements = document.querySelectorAll('.khantool-feature');

    function openPanel() {
        overlay.classList.add('active');
        panel.classList.add('active');
        if (typeof sendToast === 'function') {
            sendToast('Menu KhanTool aberto!', 1000);
        }
    }

    function closePanel() {
        overlay.classList.remove('active');
        panel.classList.remove('active');
    }

    function toggleFeature(featureId) {
        window.features[featureId] = !window.features[featureId];
        const isActive = window.features[featureId];
        
        const checkbox = document.querySelector(`[data-feature="${featureId}"] .khantool-checkbox`);
        if (checkbox) {
            checkbox.classList.toggle('checked', isActive);
        }

        if (typeof sendToast === 'function') {
            const feature = features.find(f => f.id === featureId);
            sendToast(`${isActive ? '✅' : '❌'} ${feature.label} ${isActive ? 'ativado' : 'desativado'}`, 2000);
        }

        if (typeof plppdo !== 'undefined') {
            plppdo.emit('featureToggle', featureId, isActive);
        }

        console.log(`[KhanTool] ${featureId}: ${isActive ? 'ON' : 'OFF'}`);
    }

    trigger.addEventListener('click', openPanel);
    closeBtn.addEventListener('click', closePanel);
    overlay.addEventListener('click', closePanel);

    featureElements.forEach(function(element) {
        element.addEventListener('click', function() {
            toggleFeature(this.dataset.feature);
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Insert' || e.key === '~') {
            e.preventDefault();
            if (panel.classList.contains('active')) {
                closePanel();
            } else {
                openPanel();
            }
        }
        if (e.key === 'Escape' && panel.classList.contains('active')) {
            closePanel();
        }
    });

    console.log('KhanTool Menu carregado!');
})();
