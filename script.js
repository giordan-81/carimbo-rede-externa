// Modern Telecommunications Form JavaScript
// Preserving all original functionality while adding modern enhancements

class TelecomForm {
    constructor() {
        this.selectedValues = {
            txFisico: [],
            rxFisico: [],
            txFisicoA: [],
            rxFisicoA: []
        };
        
        this.technicians = JSON.parse(localStorage.getItem('carimboTecnicos') || '[]');
        this.sites = JSON.parse(localStorage.getItem('carimboSitesPontaB') || '[]');
        this.sitesA = JSON.parse(localStorage.getItem('carimboSitesPontaA') || '[]');
        this.equipamentos = JSON.parse(localStorage.getItem('carimboEquipamentos') || '[]');
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.generateFibraButtons();
        this.loadStoredData();
        this.populateSelects();
    }

    setupEventListeners() {
        // Selection button handlers
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-selection')) {
                this.handleSelectionClick(e.target);
            }
        });

        // Form validation
        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('form-control-modern') || 
                e.target.classList.contains('form-control-technical')) {
                this.validateField(e.target);
            }
        });

        // Auto-save functionality
        document.addEventListener('change', () => {
            this.autoSave();
        });
    }

    handleSelectionClick(button) {
        const container = button.closest('.selection-container');
        const campo = container.dataset.campo;
        const value = button.dataset.value;
        const input = document.getElementById(campo);
        if (!input) return;

        // Get current values from input (use / as separator like original)
        const currentValues = input.value.split('/').filter(v => v.trim() !== '');
        
        // Toggle button state
        const isActive = button.classList.contains('active');
        
        if (isActive) {
            // Remove value
            const newValues = currentValues.filter(v => v !== value);
            input.value = newValues.join('/');
            button.classList.remove('active');
        } else {
            // Add value
            currentValues.push(value);
            input.value = currentValues.join('/');
            button.classList.add('active');
        }
        
        // Add visual feedback
        this.addVisualFeedback(button);
    }

    isSingleSelectGroup(group) {
        const label = group.querySelector('.group-label').textContent.trim();
        return ['Outdoor', 'Indoor FILA', 'Indoor BT', 'DGO'].includes(label);
    }

    addValue(campo, value) {
        if (!this.selectedValues[campo]) {
            this.selectedValues[campo] = [];
        }
        
        if (!this.selectedValues[campo].includes(value)) {
            this.selectedValues[campo].push(value);
        }
    }

    removeValue(campo, value) {
        if (this.selectedValues[campo]) {
            this.selectedValues[campo] = this.selectedValues[campo].filter(v => v !== value);
        }
    }

    updateInputField(campo) {
        const input = document.getElementById(campo);
        if (input && this.selectedValues[campo]) {
            input.value = this.selectedValues[campo].join(' - ');
        }
    }

    addVisualFeedback(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }

    generateFibraButtons() {
        const containers = [
            document.getElementById('txFibrasButtons'),
            document.getElementById('rxFibrasButtons'),
            document.getElementById('txFibrasButtonsA'),
            document.getElementById('rxFibrasButtonsA')
        ];
        
        containers.forEach(container => {
            if (container) {
                for (let i = 1; i <= 36; i++) {
                    const num = i.toString().padStart(2, '0');
                    
                    const btn = document.createElement('button');
                    btn.type = 'button';
                    btn.className = 'btn-selection';
                    btn.dataset.value = `F${num}`;
                    btn.textContent = num;
                    container.appendChild(btn);
                }
            }
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const isValid = this.isValidInput(field, value);
        
        if (isValid) {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
        } else {
            field.classList.remove('is-valid');
            field.classList.add('is-invalid');
        }
    }

    isValidInput(field, value) {
        if (field.id === 'ta') {
            return /^\d{9}$/.test(value) || value === '';
        }
        
        if (field.id === 'txPotencia' || field.id === 'rxPotencia') {
            return /^-?\d+(\.\d+)?$/.test(value) || value === '';
        }
        
        return true;
    }

    populateSelects() {
        this.populateTechnicians();
        this.populateSites();
        this.populateSitesA();
        this.populateEquipamentos();
    }

    populateTechnicians() {
        const select = document.getElementById('tecnicoSelect');
        if (select) {
            select.innerHTML = '<option value="">Selecione o técnico</option>';
            this.technicians.forEach(tech => {
                const option = document.createElement('option');
                option.value = tech;
                option.textContent = tech;
                select.appendChild(option);
            });
        }
    }

    populateSites() {
        const select = document.getElementById('siteSelect');
        if (select) {
            select.innerHTML = '<option value="">Selecione o site Ponta B</option>';
            this.sites.forEach(site => {
                const option = document.createElement('option');
                option.value = site;
                option.textContent = site;
                select.appendChild(option);
            });
        }
    }

    populateSitesA() {
        const select = document.getElementById('siteSelectA');
        if (select) {
            select.innerHTML = '<option value="">Selecione o site Ponta A</option>';
            this.sitesA.forEach(site => {
                const option = document.createElement('option');
                option.value = site;
                option.textContent = site;
                select.appendChild(option);
            });
        }
    }

    populateEquipamentos() {
        const select = document.getElementById('equipamentoSelect');
        if (select) {
            select.innerHTML = '<option value="">Selecione o equipamento</option>';
            this.equipamentos.forEach(equip => {
                const option = document.createElement('option');
                option.value = equip;
                option.textContent = equip;
                select.appendChild(option);
            });
        }
    }

    autoSave() {
        const formData = this.getFormData();
        localStorage.setItem('formData', JSON.stringify(formData));
    }

    loadStoredData() {
        const stored = localStorage.getItem('formData');
        if (stored) {
            const data = JSON.parse(stored);
            this.restoreFormData(data);
        }
    }

    getFormData() {
        const inputs = document.querySelectorAll('input, select, textarea');
        const data = {};
        
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                data[input.id] = input.checked;
            } else {
                data[input.id] = input.value;
            }
        });
        
        data.selectedValues = this.selectedValues;
        return data;
    }

    restoreFormData(data) {
        Object.keys(data).forEach(key => {
            if (key === 'selectedValues') {
                this.selectedValues = data[key] || {};
                return;
            }
            
            const element = document.getElementById(key);
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = data[key];
                } else {
                    element.value = data[key];
                }
            }
        });
        
        // Restore button states
        this.restoreButtonStates();
    }

    restoreButtonStates() {
        Object.keys(this.selectedValues).forEach(campo => {
            const values = this.selectedValues[campo];
            if (values && values.length > 0) {
                values.forEach(value => {
                    const button = document.querySelector(
                        `[data-campo="${campo}"] .btn-selection[data-value="${value}"]`
                    );
                    if (button) {
                        button.classList.add('active');
                    }
                });
                this.updateInputField(campo);
            }
        });
    }
}

// Global functions to maintain compatibility with existing code
function adicionarTecnico() {
    const input = document.getElementById('novoTecnico');
    const select = document.getElementById('tecnicoSelect');
    const value = input.value.trim();
    
    if (value && !telecomForm.technicians.includes(value)) {
        telecomForm.technicians.push(value);
        localStorage.setItem('carimboTecnicos', JSON.stringify(telecomForm.technicians));
        
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
        
        select.value = value;
        input.value = '';
        
        showNotification('Técnico adicionado com sucesso!', 'success');
    } else if (value === '') {
        showNotification('Por favor, insira o nome do técnico.', 'warning');
    } else {
        showNotification('Este técnico já existe na lista.', 'info');
    }
}

function adicionarSite() {
    const input = document.getElementById('novoSite');
    const select = document.getElementById('siteSelect');
    const value = input.value.trim();
    
    if (value && !telecomForm.sites.includes(value)) {
        telecomForm.sites.push(value);
        localStorage.setItem('carimboSitesPontaB', JSON.stringify(telecomForm.sites));
        
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
        
        select.value = value;
        input.value = '';
        
        showNotification('Site Ponta B adicionado com sucesso!', 'success');
    } else if (value === '') {
        showNotification('Por favor, insira o nome do site.', 'warning');
    } else {
        showNotification('Este site já existe na lista.', 'info');
    }
}

function adicionarSiteA() {
    const input = document.getElementById('novoSiteA');
    const select = document.getElementById('siteSelectA');
    const value = input.value.trim();
    
    if (value && !telecomForm.sitesA.includes(value)) {
        telecomForm.sitesA.push(value);
        localStorage.setItem('carimboSitesPontaA', JSON.stringify(telecomForm.sitesA));
        
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
        
        select.value = value;
        input.value = '';
        
        showNotification('Site Ponta A adicionado com sucesso!', 'success');
    } else if (value === '') {
        showNotification('Por favor, insira o nome do site.', 'warning');
    } else {
        showNotification('Este site já existe na lista.', 'info');
    }
}

function adicionarEquipamento() {
    const input = document.getElementById('novoEquipamento');
    const select = document.getElementById('equipamentoSelect');
    const value = input.value.trim();
    
    if (value && !telecomForm.equipamentos.includes(value)) {
        telecomForm.equipamentos.push(value);
        localStorage.setItem('carimboEquipamentos', JSON.stringify(telecomForm.equipamentos));
        
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
        
        select.value = value;
        input.value = '';
        
        showNotification('Equipamento adicionado com sucesso!', 'success');
    } else if (value === '') {
        showNotification('Por favor, insira o nome do equipamento.', 'warning');
    } else {
        showNotification('Este equipamento já existe na lista.', 'info');
    }
}

function toggleCheckbox(idChecked, others) {
    others.forEach(id => {
        if (id !== idChecked) {
            document.getElementById(id).checked = false;
        }
    });
    const cb = document.getElementById(idChecked);
    if (!cb.checked) cb.checked = true;
}

function compartilharWhatsapp() {
    const output = document.getElementById('output').textContent;
    if (output && output !== 'Clique em "Gerar Carimbo" para visualizar o resultado...') {
        const url = `https://wa.me/?text=${encodeURIComponent(output)}`;
        window.open(url, '_blank');
    }
}

function gerarCarimbo() {
    const formData = telecomForm.getFormData();
    const output = document.getElementById('output');
    
    // Validate required fields
    if (!formData.ta) {
        showNotification('Por favor, preencha o campo TA.', 'warning');
        return;
    }
    
    // Generate the stamp content
    const carimbo = generateStampContent(formData);
    output.textContent = carimbo;
    
    // Show WhatsApp button
    document.getElementById('btnWhatsapp').style.display = 'inline-flex';
    
    // Scroll to output
    output.scrollIntoView({ behavior: 'smooth' });
    
    showNotification('Carimbo gerado com sucesso!', 'success');
}

function generateStampContent(data) {
    const lines = [];
    
    lines.push('CARIMBO REDE EXTERNA                                                 =================================');
    lines.push('    ');
    lines.push('    ');
    
    if (data.ta) {
        lines.push(`TA: ${data.ta}`);
        lines.push('');
    }
    
    // REDE com VIVO
    const vivo1 = data.vivo1 ? '( X )' : '( )';
    const vivo2 = data.vivo2 ? '( X )' : '( )';
    lines.push(`REDE: ${vivo1} VIVO1 ${vivo2} VIVO2`);
    lines.push('');
    
    // Ponta B
    if (data.siteSelect) {
        lines.push(`Ponta B: ${data.siteSelect}`);
    }
    lines.push('POSIÇÕES SALA DE TRANSMISSÃO/DGO:');
    
    // TX e RX da Ponta B - formatação exata como exemplo
    const txB = data.txFisico ? data.txFisico.replace(/\//g, '/') : '';
    const txPotB = data.txPotencia || '';
    const rxB = data.rxFisico ? data.rxFisico.replace(/\//g, '/') : '';
    const rxPotB = data.rxPotencia || '';
    
    if (txB || txPotB) {
        lines.push(`TX: ${txB}     TX: ${txPotB}`);
    }
    if (rxB || rxPotB) {
        lines.push(`RX: ${rxB}     RX: ${rxPotB}`);
    }
    lines.push('');
    
    // Ponta A
    if (data.siteSelectA) {
        lines.push(`Ponta A: ${data.siteSelectA}`);
    }
    lines.push('POSIÇÕES SALA DE TRANSMISSÃO/DGO:');
    
    // TX e RX da Ponta A - formatação exata como exemplo
    const txA = data.txFisicoA ? data.txFisicoA.replace(/\//g, '/') : '';
    const txPotA = data.txPotenciaA || '';
    const rxA = data.rxFisicoA ? data.rxFisicoA.replace(/\//g, '/') : '';
    const rxPotA = data.rxPotenciaA || '';
    
    if (txA || txPotA) {
        lines.push(`TX: ${txA}     TX: ${txPotA}`);
    }
    if (rxA || rxPotA) {
        lines.push(`RX: ${rxA}     RX: ${rxPotA}`);
    }
    lines.push('');
    
    // Afetação
    lines.push('Afetação:');
    
    // Backbone
    const backboneReg = data.backboneRegional ? '(X)' : '( )';
    const backboneNac = data.backboneNacional ? '(X)' : '( )';
    lines.push(`Backbone: ${backboneReg} Regional ${backboneNac} Nacional`);
    
    // Causa
    const causaRomp = data.causaRompimento ? '(x)' : '( )';
    const causaAten = data.causaAtenuacao ? '(x)' : '( )';
    lines.push(`Causa: ${causaRomp} Rompimento ${causaAten} Atenuação`);
    
    // Outros campos
    if (data.equipamentoSelect) {
        lines.push(`Nome do equipamento: ${data.equipamentoSelect}`);
    }
    
    lines.push(`Número do cabo: ${data.numeroCabo || ''}`);
    
    if (data.tecnicoSelect) {
        lines.push(`Técnico: ${data.tecnicoSelect}`);
    }
    
    lines.push(`Contato: ${data.contato || ''}`);
    lines.push(`OBS: ${data.obs || ''}`);
    
    return lines.join('\n');
}

function limparFormulario() {
    if (confirm('Tem certeza que deseja limpar todos os campos?')) {
        // Clear form inputs
        document.querySelectorAll('input, select, textarea').forEach(input => {
            if (input.type === 'checkbox') {
                input.checked = false;
            } else {
                input.value = '';
            }
            input.classList.remove('is-valid', 'is-invalid');
        });
        
        // Clear selection buttons
        document.querySelectorAll('.btn-selection').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Clear selected values
        telecomForm.selectedValues = { txFisico: [], rxFisico: [], txFisicoA: [], rxFisicoA: [] };
        
        // Clear output
        document.getElementById('output').textContent = 'Clique em "Gerar Carimbo" para visualizar o resultado...';
        
        // Clear auto-saved data
        localStorage.removeItem('formData');
        
        showNotification('Formulário limpo com sucesso!', 'info');
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: var(--shadow-lg);
    `;
    
    const icons = {
        success: 'fas fa-check-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle',
        danger: 'fas fa-exclamation-circle'
    };
    
    notification.innerHTML = `
        <i class="${icons[type]} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Initialize the application
let telecomForm;

document.addEventListener('DOMContentLoaded', () => {
    telecomForm = new TelecomForm();
    
    // Add loading animation
    document.body.classList.add('fade-in');
    
    // Initialize tooltips if Bootstrap is loaded
    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl+Enter to generate stamp
    if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        gerarCarimbo();
    }
    
    // Ctrl+R to clear form (prevent browser refresh)
    if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        limparFormulario();
    }
});

// Add service worker for offline capability (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}