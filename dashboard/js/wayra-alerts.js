/**
 * WAYRA SAT - Sistema de Alertas Dinámico
 * Datos simulados realistas con cambios automáticos
 */

// ========== DATOS SIMULADOS REALISTAS ==========
const wayraData = {
    // Diferentes escenarios de El Niño (basados en eventos reales)
    scenarios: {
        normal: {
            ninoIndex: 0.2,
            status: 'alerta-verde',
            statusText: 'NORMAL',
            subtitle: 'Condiciones Estables',
            activeRegions: 3,
            skillScore: 0.67,
            leadTime: '1-2 meses',
            lastUpdate: '15:45',
            resolution: '0.1°'
        },
        vigilancia: {
            ninoIndex: 0.6,
            status: 'alerta-amarillo',
            statusText: 'VIGILANCIA',
            subtitle: 'El Niño Débil Detectado',
            activeRegions: 5,
            skillScore: 0.74,
            leadTime: '1-3 meses',
            lastUpdate: '14:20',
            resolution: '0.1°'
        },
        alerta: {
            ninoIndex: 1.2,
            status: 'alerta-naranja',
            statusText: 'ALERTA NARANJA',
            subtitle: 'El Niño Moderado Activo',
            activeRegions: 8,
            skillScore: 0.84,
            leadTime: '2-3 meses',
            lastUpdate: '14:30',
            resolution: '0.1°'
        },
        critico: {
            ninoIndex: 2.1,
            status: 'alerta-rojo',
            statusText: 'CRÍTICO',
            subtitle: 'El Niño Fuerte - Acción Inmediata',
            activeRegions: 12,
            skillScore: 0.91,
            leadTime: '3-4 meses',
            lastUpdate: '13:15',
            resolution: '0.05°'
        }
    },

    // Escenario actual (se puede cambiar dinámicamente)
    currentScenario: 'alerta',

    // Datos históricos simulados para gráfico
    historical: [
        { month: 'Jul', sst: 0.3, events: 1 },
        { month: 'Ago', sst: 0.6, events: 2 },
        { month: 'Sep', sst: 0.9, events: 3 },
        { month: 'Oct', sst: 1.2, events: 5 },
        { month: 'Nov', sst: 1.4, events: 7 },
        { month: 'Dic', sst: 1.2, events: 4 }
    ]
};

// ========== FUNCIONES DE ACTUALIZACIÓN UI ==========

/**
 * Actualiza el indicador de estado principal
 */
function updateStatusIndicator(scenario) {
    const statusElement = document.querySelector('.status-indicator');
    const titleElement = statusElement.querySelector('.status-title');
    const valueElement = statusElement.querySelector('.status-value');
    const subtitleElement = statusElement.querySelector('.status-subtitle');

    // Cambiar clase CSS para colores
    statusElement.className = `status-indicator ${scenario.status}`;
    
    // Actualizar textos
    valueElement.textContent = scenario.statusText;
    subtitleElement.textContent = scenario.subtitle;

    // Log para debugging
    console.log(`[WAYRA] Status actualizado: ${scenario.statusText}`);
}

/**
 * Actualiza todas las métricas del panel
 */
function updateMetrics(scenario) {
    const metrics = [
        {
            selector: '.metric-card:nth-child(1) .metric-value',
            value: `+${scenario.ninoIndex}°C`
        },
        {
            selector: '.metric-card:nth-child(2) .metric-value',
            value: scenario.leadTime
        },
        {
            selector: '.metric-card:nth-child(3) .metric-value',
            value: `${scenario.activeRegions} activas`
        },
        {
            selector: '.metric-card:nth-child(4) .metric-value',
            value: scenario.skillScore.toFixed(2)
        },
        {
            selector: '.metric-card:nth-child(5) .metric-value',
            value: scenario.lastUpdate
        },
        {
            selector: '.metric-card:nth-child(6) .metric-value',
            value: scenario.resolution
        }
    ];

    metrics.forEach(metric => {
        const element = document.querySelector(metric.selector);
        if (element) {
            element.textContent = metric.value;
        }
    });

    console.log(`[WAYRA] Métricas actualizadas para escenario: ${wayraData.currentScenario}`);
}

/**
 * Aplica el escenario - FASE 4: SOLO PANEL LATERAL
 */
function applyScenario(scenarioName) {
    const scenario = wayraData.scenarios[scenarioName];
    if (!scenario) {
        console.error(`[WAYRA] Escenario no encontrado: ${scenarioName}`);
        return;
    }

    wayraData.currentScenario = scenarioName;
    
    // Actualizar SOLO el panel lateral (UI)
    updateStatusIndicator(scenario);
    updateMetrics(scenario);
    
    // Actualizar timestamp
    updateLastRefresh();

    // EN FASE 4: NO actualizar marcadores del mapa
    // Los marcadores se controlan por los filtros independientes
    console.log(`[WAYRA] Panel lateral actualizado: ${scenarioName}`);
    console.log(`[WAYRA] Marcadores controlados por filtros independientes`);
}

/**
 * Actualiza timestamp de última actualización
 */
function updateLastRefresh() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    // Actualizar en métricas si existe
    const updateElement = document.querySelector('.metric-card:nth-child(5) .metric-value');
    if (updateElement) {
        updateElement.textContent = timeString;
    }
}

// ========== SIMULACIÓN AUTOMÁTICA ==========

// Variable para controlar el auto demo
let autoDemoInterval = null;
let isAutoDemoActive = false;

/**
 * Cambia automáticamente entre escenarios para demo
 */
function startAutoDemo() {
    // Si ya está activo, detenerlo
    if (isAutoDemoActive) {
        stopAutoDemo();
        return;
    }

    const scenarios = Object.keys(wayraData.scenarios);
    let currentIndex = scenarios.indexOf(wayraData.currentScenario);

    autoDemoInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % scenarios.length;
        applyScenario(scenarios[currentIndex]);
    }, 3000); // Cambiar cada 3 segundos

    isAutoDemoActive = true;
    updateAutoButton();
    console.log('[WAYRA] Demo automático iniciado (cambio cada 3s)');
}

/**
 * Detiene el auto demo
 */
function stopAutoDemo() {
    if (autoDemoInterval) {
        clearInterval(autoDemoInterval);
        autoDemoInterval = null;
    }
    isAutoDemoActive = false;
    updateAutoButton();
    console.log('[WAYRA] Demo automático detenido');
}

/**
 * Actualiza el texto del botón de auto demo
 */
function updateAutoButton() {
    const autoButton = document.querySelector('.auto-demo-button');
    if (autoButton) {
        autoButton.textContent = isAutoDemoActive ? 'STOP AUTO' : 'AUTO DEMO';
        autoButton.style.background = isAutoDemoActive ? 'var(--alerta-rojo)' : 'transparent';
        autoButton.style.color = isAutoDemoActive ? 'var(--texto-claro)' : 'var(--wayra-tierra)';
    }
}

// ========== CONTROLES INTERACTIVOS - FASE 4: FILTROS ==========

/**
 * Crea botones de control - VERSIÓN FILTROS FINALES
 */
function createControlButtons() {
    // Crear container para botones
    const controlsContainer = document.createElement('div');
    controlsContainer.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--blanco-puro);
        padding: 1rem;
        border-radius: 8px;
        box-shadow: var(--sombra-media);
        border: var(--borde-suave);
        z-index: 1000;
    `;

    // Título
    const title = document.createElement('div');
    title.textContent = 'Filtros de Alerta';
    title.style.cssText = `
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--wayra-tierra);
        margin-bottom: 0.5rem;
        text-align: center;
    `;
    controlsContainer.appendChild(title);

    // Crear botones filtro
    const filterButtons = [
        { name: 'normal', label: 'NORMAL', level: 'verde' },
        { name: 'vigilancia', label: 'VIGILANCIA', level: 'amarillo' },
        { name: 'alerta', label: 'ALERTA', level: 'naranja' },
        { name: 'critico', label: 'CRÍTICO', level: 'rojo' }
    ];

    filterButtons.forEach(buttonInfo => {
        const button = document.createElement('button');
        button.textContent = buttonInfo.label;
        button.className = `filter-btn-${buttonInfo.name}`;
        
        // ESTILOS INICIALES: Todos activos (azul)
        button.style.cssText = `
            display: block;
            width: 100%;
            margin-bottom: 0.25rem;
            padding: 0.5rem;
            border: 2px solid var(--wayra-azul-oceano);
            border-radius: 4px;
            background: var(--wayra-azul-oceano);
            color: var(--texto-claro);
            font-size: 0.7rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
        `;
        
        button.addEventListener('click', () => {
            // Detener auto demo si está activo
            if (isAutoDemoActive) {
                stopAutoDemo();
            }
            
            // NUEVA LÓGICA CON FALLBACK ROBUSTO
            if (window.wayraMap && typeof window.wayraMap.toggleAlertFilter === 'function') {
                window.wayraMap.toggleAlertFilter(buttonInfo.name, button);
            } else {
                console.warn('[WAYRA ALERTS] Esperando inicialización del mapa...');
                // Reintentar después de 500ms
                setTimeout(() => {
                    if (window.wayraMap && typeof window.wayraMap.toggleAlertFilter === 'function') {
                        window.wayraMap.toggleAlertFilter(buttonInfo.name, button);
                    } else {
                        console.error('[WAYRA ALERTS] wayraMap.toggleAlertFilter aún no disponible');
                        // Fallback visual temporal
                        if (button.style.background === 'var(--wayra-azul-oceano)') {
                            button.style.background = 'transparent';
                            button.style.color = 'var(--wayra-azul-oceano)';
                        } else {
                            button.style.background = 'var(--wayra-azul-oceano)';
                            button.style.color = 'var(--texto-claro)';
                        }
                    }
                }, 500);
            }
        });
        
        // Hover effects mejorados
        button.addEventListener('mouseover', () => {
            if (button.style.background === 'var(--wayra-azul-oceano)') {
                button.style.background = 'var(--wayra-verde-andes)';
            }
        });
        
        button.addEventListener('mouseout', () => {
            // Restaurar color según estado
            if (button.style.background === 'var(--wayra-verde-andes)') {
                button.style.background = 'var(--wayra-azul-oceano)';
            }
        });

        controlsContainer.appendChild(button);
    });

    // Botón auto demo (mantenido)
    const autoButton = document.createElement('button');
    autoButton.textContent = 'AUTO DEMO';
    autoButton.className = 'auto-demo-button';
    autoButton.style.cssText = `
        display: block;
        width: 100%;
        margin-top: 0.5rem;
        padding: 0.5rem;
        border: 2px solid var(--wayra-tierra);
        border-radius: 4px;
        background: transparent;
        color: var(--wayra-tierra);
        font-size: 0.7rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    
    autoButton.addEventListener('click', startAutoDemo);
    controlsContainer.appendChild(autoButton);

    document.body.appendChild(controlsContainer);
    console.log('[WAYRA ALERTS] 🔍 Controles de filtro creados - FASE 4');
}

/**
 * FUNCIÓN LEGACY DESHABILITADA - Ya no se usa en Fase 4
 */
function toggleScenario(scenarioName, buttonElement) {
    console.warn('[WAYRA ALERTS] ⚠️ toggleScenario() es legacy - usando filtros en Fase 4');
    // Esta función ya no se usa en Fase 4
}

// ========== INICIALIZACIÓN ==========

/**
 * Inicializa el sistema de alertas - FASE 4 ACTUALIZADA
 */
function initWayraAlerts() {
    console.log('🌪️ [WAYRA] Sistema de Alertas iniciando - FASE 4...');
    
    // Crear controles de filtro
    createControlButtons();
    
    // ESPERAR A QUE EL MAPA ESTÉ LISTO antes de aplicar escenario inicial
    function waitForMapAndApply() {
        if (window.wayraMapReady) {
            // Mapa listo, aplicar escenario inicial SOLO al panel lateral
            // Los marcadores se muestran según la fecha seleccionada, NO según el escenario
            applyScenario(wayraData.currentScenario);
            console.log('✅ [WAYRA] Sistema de Alertas inicializado - FASE 4');
            console.log(`📊 [WAYRA] Panel lateral: ${wayraData.currentScenario}`);
            console.log(`🗺️ [WAYRA] Marcadores: Basados en fecha seleccionada`);
        } else {
            // Mapa no listo, esperar 100ms y reintentar
            setTimeout(waitForMapAndApply, 100);
        }
    }
    
    waitForMapAndApply();
    
    // Actualizar timestamp cada minuto
    setInterval(updateLastRefresh, 60000);
    
    console.log('🔍 [WAYRA] Filtros de alerta disponibles (esquina inferior derecha)');
}

// ========== AUTO-INICIALIZACIÓN ==========

// Esperar a que el DOM esté cargado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWayraAlerts);
} else {
    initWayraAlerts();
}

// Exportar funciones para uso externo
window.wayraAlerts = {
    applyScenario,
    startAutoDemo,
    data: wayraData
};