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
 * Aplica el escenario completo
 */
function applyScenario(scenarioName) {
    const scenario = wayraData.scenarios[scenarioName];
    if (!scenario) {
        console.error(`[WAYRA] Escenario no encontrado: ${scenarioName}`);
        return;
    }

    wayraData.currentScenario = scenarioName;
    
    // Actualizar UI
    updateStatusIndicator(scenario);
    updateMetrics(scenario);
    
    // Actualizar timestamp
    updateLastRefresh();

    // Actualizar marcadores del mapa
    if (window.wayraMap && window.wayraMap.onScenarioChange) {
        window.wayraMap.onScenarioChange(scenarioName);
    }

    console.log(`[WAYRA] Escenario aplicado: ${scenarioName}`);
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

// ========== CONTROLES INTERACTIVOS ==========

/**
 * Crea botones de control para testing manual
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
    title.textContent = 'Controles Demo';
    title.style.cssText = `
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--wayra-tierra);
        margin-bottom: 0.5rem;
        text-align: center;
    `;
    controlsContainer.appendChild(title);

    // Crear botones para cada escenario
    Object.keys(wayraData.scenarios).forEach(scenarioName => {
        const button = document.createElement('button');
        button.textContent = scenarioName.toUpperCase();
        button.style.cssText = `
            display: block;
            width: 100%;
            margin-bottom: 0.25rem;
            padding: 0.5rem;
            border: none;
            border-radius: 4px;
            background: var(--wayra-azul-oceano);
            color: var(--texto-claro);
            font-size: 0.7rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
        `;
        
        button.addEventListener('click', () => {
            // Detener auto demo si está activo al hacer click manual
            if (isAutoDemoActive) {
                stopAutoDemo();
            }
            applyScenario(scenarioName);
        });
        
        button.addEventListener('mouseover', () => {
            button.style.background = 'var(--wayra-verde-andes)';
        });
        
        button.addEventListener('mouseout', () => {
            button.style.background = 'var(--wayra-azul-oceano)';
        });

        controlsContainer.appendChild(button);
    });

    // Botón auto demo
    const autoButton = document.createElement('button');
    autoButton.textContent = 'AUTO DEMO';
    autoButton.className = 'auto-demo-button';  // Agregar clase para encontrarlo fácil
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
    
    autoButton.addEventListener('click', startAutoDemo);  // Ya maneja toggle internamente
    controlsContainer.appendChild(autoButton);

    document.body.appendChild(controlsContainer);
    console.log('[WAYRA] Controles de demo creados');
}

// ========== INICIALIZACIÓN ==========

/**
 * Inicializa el sistema de alertas
 */
function initWayraAlerts() {
    console.log('🌪️ [WAYRA] Sistema de Alertas iniciando...');
    
    // Aplicar escenario inicial
    applyScenario(wayraData.currentScenario);
    
    // Crear controles de demo
    createControlButtons();
    
    // Actualizar timestamp cada minuto
    setInterval(updateLastRefresh, 60000);
    
    console.log('✅ [WAYRA] Sistema de Alertas inicializado correctamente');
    console.log(`📊 [WAYRA] Escenario actual: ${wayraData.currentScenario}`);
    console.log('🎮 [WAYRA] Controles de demo disponibles (esquina inferior derecha)');
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