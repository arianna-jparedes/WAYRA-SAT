// Colores de alertas (mismo sistema)
const ALERT_COLORS = {
    verde: '#16a34a',
    amarillo: '#ca8a04', 
    naranja: '#ea580c',
    rojo: '#dc2626'
};

// ========== INICIALIZACIÓN DEL DROPDOWN ==========

/**
 * Inicializa el selector de fechas
 */
function initDateSelector() {
    const dropdown = document.getElementById('date-selector');
    if (!dropdown) {
        console.error('[WAYRA MAP] Dropdown de fechas no encontrado');
        return;
    }
    
    // Establecer fecha inicial
    dropdown.value = currentDate;
    
    // Event listener para cambio de fecha
    dropdown.addEventListener('change', function(event) {
        const newDate = event.target.value;
        console.log(`[WAYRA MAP] Cambiando a fecha: ${newDate}`);
        
        if (loadDataByDate(newDate)) {
            console.log(`[WAYRA MAP] ✅ Fecha cambiada exitosamente a ${newDate}`);
        } else {
            console.error(`[WAYRA MAP] ❌ Error cambiando a fecha ${newDate}`);
        }
    });
    
    console.log('[WAYRA MAP] 📅 Selector de fechas inicializado');
}

/**
 * Actualiza colores de marcadores (nueva función optimizada)
 */
function updateMarkerColors() {
    if (!wayraMap) {
        console.warn('[WAYRA MAP] Mapa no inicializado para actualizar colores');
        return;
    }
    
    const alertData = getCurrentAlertData();
    if (!alertData || Object.keys(alertData).length === 0) {
        console.error(`[WAYRA MAP] No hay datos de alertas para fecha: ${currentDate}`);
        return;
    }
    
    // En lugar de recrear marcadores, solo actualizamos colores
    // (Por ahora usamos la función existente, optimizaremos en Fase 3)
    updateMapMarkers('date_based');
    
    console.log(`[WAYRA MAP] 🎨 Colores actualizados para ${Object.keys(alertData).length} provincias`);
}

/**
 * Función de testing para verificar estructura de datos
 */
function testDataStructure() {
    console.log('🧪 [WAYRA TEST] Verificando estructura de datos...');
    
    // Test 1: Provincias demo definidas
    console.log(`📍 Provincias demo: ${PROVINCIAS_DEMO.length} definidas`);
    PROVINCIAS_DEMO.forEach(provincia => {
        console.log(`  - ${provincia}`);
    });
    
    // Test 2: Fechas disponibles
    const fechas = Object.keys(alertsByDate);
    console.log(`📅 Fechas disponibles: ${fechas.length}`);
    fechas.forEach(fecha => {
        const info = getDateInfo(fecha);
        console.log(`  - ${fecha}: ${info.event} (${info.severity})`);
    });
    
    // Test 3: Datos por fecha
    fechas.forEach(fecha => {
        const data = alertsByDate[fecha];
        const provinciasConDatos = Object.keys(data).length;
        console.log(`📊 ${fecha}: ${provinciasConDatos} provincias con datos`);
    });
    
    // Test 4: Fecha actual
    console.log(`🎯 Fecha actual: ${currentDate}`);
    console.log(`📋 Datos actuales:`, getCurrentAlertData());
    
    console.log('✅ [WAYRA TEST] Estructura de datos verificada');
}/**
 * WAYRA SAT - Sistema de Mapas Interactivo
 * Mapa base con marcadores de alertas
 */

// ========== CONFIGURACIÓN DEL MAPA ==========

// ⚠️ IMPORTANTE: Token de Mapbox
const MAPBOX_TOKEN = 'pk.eyJ1IjoiamFja21hbHVjYXJkIiwiYSI6ImNtZHY4bWRvOTFwaGUybHEzb3ZzOTE5ZGcifQ.qgV1LXaX38wPsJ7B8Tw7ug';

// Configuración inicial del mapa
const MAP_CONFIG = {
    center: [-78.4678, -0.1807], // Centrado en Ecuador (Quito)
    zoom: 6,
    style: 'mapbox://styles/mapbox/satellite-streets-v12', // Estilo inicial: Satélite + calles
    projection: 'mercator'
};

// ESTILOS ALTERNATIVOS disponibles:
// 'mapbox://styles/mapbox/streets-v12'     // Calles estándar
// 'mapbox://styles/mapbox/light-v11'       // Limpio y claro
// 'mapbox://styles/mapbox/dark-v11'        // Tema oscuro
// 'mapbox://styles/mapbox/satellite-v9'    // Vista satélite
// 'mapbox://styles/mapbox/satellite-streets-v12' // Satélite + calles
// 'mapbox://styles/mapbox/outdoors-v12'    // Estilo que muestra topografía andina

// Estilos disponibles para el toggle
const MAP_STYLES = {
    outdoors: {
        url: 'mapbox://styles/mapbox/outdoors-v12', // Topografía Andes
        name: 'Outdoor'
    },
    satellite: {
        url: 'mapbox://styles/mapbox/satellite-streets-v12', // Satélite + calles
        name: 'Satellite'
    }
};

// Estilo actual
let currentMapStyle = 'satellite';

// Variable global para el mapa
let wayraMap = null;

// ========== DATOS DE MARCADORES POR ESCENARIO ==========

// ========== PROVINCIAS FIJAS SIEMPRE VISIBLES ==========

// 12 provincias estratégicas para demo
const PROVINCIAS_DEMO = [
    'azuay',        // Cuenca - Sierra Sur
    'bolivar',      // Guaranda - Sierra Centro
    'canar',        // Azogues - Sierra Sur  
    'carchi',       // Tulcán - Sierra Norte
    'chimborazo',   // Riobamba - Sierra Centro
    'santa_elena',  // Santa Elena - Costa Sur
    'el_oro',       // Machala - Costa Sur
    'esmeraldas',   // Esmeraldas - Costa Norte
    'guayas',       // Guayaquil - Costa Centro
    'los_rios',     // Babahoyo - Costa Centro
    'manabi',       // Portoviejo - Costa Centro
    'pichincha'     // Quito - Sierra Norte
];

// ========== DATOS DE ALERTAS POR FECHA HISTÓRICA ==========

const alertsByDate = {
    "2015-12-15": {
        // El Niño Fuerte 2015-2016 - Peak
        azuay: "naranja",
        bolivar: "amarillo", 
        canar: "amarillo",
        carchi: "amarillo",
        chimborazo: "amarillo",
        santa_elena: "rojo",
        el_oro: "naranja",
        esmeraldas: "rojo",
        guayas: "rojo",
        los_rios: "rojo",
        manabi: "rojo", 
        pichincha: "rojo"
    },
    "2018-06-20": {
        // La Niña Moderada 2018
        azuay: "verde",
        bolivar: "verde",
        canar: "verde", 
        carchi: "verde",
        chimborazo: "verde",
        santa_elena: "verde",
        el_oro: "verde",
        esmeraldas: "amarillo",
        guayas: "amarillo",
        los_rios: "verde",
        manabi: "verde",
        pichincha: "verde"
    },
    "2023-03-10": {
        // El Niño Costero 2023
        azuay: "amarillo",
        bolivar: "verde",
        canar: "verde",
        carchi: "verde", 
        chimborazo: "verde",
        santa_elena: "naranja",
        el_oro: "amarillo",
        esmeraldas: "naranja",
        guayas: "naranja",
        los_rios: "amarillo",
        manabi: "naranja",
        pichincha: "naranja"
    }
};

// Fecha inicial por defecto
let currentDate = "2015-12-15";

// ========== FUNCIONES DE DATOS ==========

/**
 * Obtiene datos de alertas para la fecha actual
 */
function getCurrentAlertData() {
    return alertsByDate[currentDate] || {};
}

/**
 * Cambia la fecha y actualiza datos
 */
function loadDataByDate(newDate) {
    if (alertsByDate[newDate]) {
        currentDate = newDate;
        console.log(`[WAYRA MAP] Datos cargados para fecha: ${newDate}`);
        
        // Actualizar marcadores con nuevos datos
        updateMarkerColors();
        
        // Actualizar panel lateral con info de la fecha
        updateDateInfo(newDate);
        
        return true;
    } else {
        console.error(`[WAYRA MAP] No hay datos para fecha: ${newDate}`);
        return false;
    }
}

/**
 * Obtiene información descriptiva de la fecha
 */
function getDateInfo(date) {
    const dateInfo = {
        "2015-12-15": {
            event: "El Niño Fuerte 2015-2016",
            description: "Peak del evento más fuerte en 18 años",
            severity: "Crítico"
        },
        "2018-06-20": {
            event: "La Niña Moderada 2018", 
            description: "Condiciones de enfriamiento oceánico",
            severity: "Normal"
        },
        "2023-03-10": {
            event: "El Niño Costero 2023",
            description: "Evento regional significativo",
            severity: "Moderado"
        }
    };
    return dateInfo[date] || {};
}

/**
 * Actualiza información de fecha en el panel lateral
 */
function updateDateInfo(date) {
    const info = getDateInfo(date);
    console.log(`[WAYRA MAP] Evento: ${info.event} - ${info.description}`);
    
    // Aquí se actualizará el panel lateral en siguientes fases
}

// Array para guardar marcadores fijos (no se destruyen)
let fixedMapMarkers = [];

// Array legacy para compatibilidad (evitar errores)
let currentMapMarkers = [];

// ========== FUNCIONES DE MARCADORES FIJOS ==========

/**
 * Crea marcadores fijos para todas las provincias demo (solo una vez)
 */
function createFixedMarkers() {
    if (!wayraMap) {
        console.error('[WAYRA MAP] Mapa no inicializado para crear marcadores fijos');
        return;
    }
    
    // Limpiar marcadores existentes si los hay
    clearFixedMarkers();
    
    // Verificar datos de provincias
    if (!window.ecuadorProvincias) {
        console.error('[WAYRA MAP] Datos de provincias no cargados');
        return;
    }
    
    // Crear un marcador fijo para cada provincia demo
    PROVINCIAS_DEMO.forEach(provinciaKey => {
        const provinciaData = window.ecuadorProvincias.get(provinciaKey);
        if (provinciaData) {
            createFixedProvinciaMarker(provinciaData, provinciaKey);
        } else {
            console.warn(`[WAYRA MAP] Provincia no encontrada: ${provinciaKey}`);
        }
    });
    
    console.log(`[WAYRA MAP] ✅ ${fixedMapMarkers.length} marcadores fijos creados`);
    
    // Aplicar colores iniciales
    updateFixedMarkerColors();
}

/**
 * Crea un marcador fijo para una provincia específica - VERSIÓN ULTRA SIMPLE
 */
function createFixedProvinciaMarker(provinciaData, provinciaKey) {
    // Debug: Verificar coordenadas
    console.log(`[WAYRA MAP] 📍 Creando marcador para ${provinciaData.name} en [${provinciaData.coordinates}]`);
    
    // Crear elemento visual - MUY SIMPLE
    const markerElement = document.createElement('div');
    markerElement.className = `wayra-fixed-marker`;
    markerElement.setAttribute('data-provincia', provinciaKey);
    
    // Estilos inline básicos (sin transitions complejas)
    markerElement.style.width = '16px';
    markerElement.style.height = '16px';
    markerElement.style.borderRadius = '50%';
    markerElement.style.backgroundColor = '#16a34a'; // Verde inicial
    markerElement.style.border = '2px solid white';
    markerElement.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
    markerElement.style.cursor = 'pointer';
    
    // Crear popup simple
    const popup = new mapboxgl.Popup({ 
        offset: 15,
        closeButton: true,
        closeOnClick: false
    });
    
    // Crear marcador con configuración mínima
    const marker = new mapboxgl.Marker(markerElement)
        .setLngLat(provinciaData.coordinates)
        .setPopup(popup)
        .addTo(wayraMap);
    
    // Guardar referencia
    fixedMapMarkers.push({
        marker: marker,
        element: markerElement,
        popup: popup,
        provinciaKey: provinciaKey,
        provinciaData: provinciaData
    });
    
    console.log(`[WAYRA MAP] ✅ Marcador fijo creado: ${provinciaData.name} en [${provinciaData.coordinates}]`);
}

/**
 * Actualiza solo los colores de los marcadores fijos (sin recrear)
 */
function updateFixedMarkerColors() {
    const alertData = getCurrentAlertData();
    if (!alertData) {
        console.error('[WAYRA MAP] No hay datos de alertas para actualizar colores');
        return;
    }
    
    let updatedCount = 0;
    
    fixedMapMarkers.forEach(markerInfo => {
        const { element, popup, provinciaKey, provinciaData } = markerInfo;
        const alertLevel = alertData[provinciaKey] || 'verde'; // Default verde si no hay datos
        const color = ALERT_COLORS[alertLevel];
        
        // SOLO CAMBIOS SEGUROS (no transforms ni propiedades que afecten positioning)
        element.style.backgroundColor = color;
        
        // Indicador visual SIN transform (usando border en lugar de scale)
        if (alertLevel === 'rojo' || alertLevel === 'naranja') {
            element.style.border = '3px solid white'; // Borde más grueso
            element.style.boxShadow = '0 0 8px ' + color; // Glow effect
        } else {
            element.style.border = '2px solid white'; // Borde normal
            element.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)'; // Sombra normal
        }
        
        // Actualizar contenido del popup
        popup.setHTML(createProvinciaPopup(provinciaData, alertLevel, currentDate));
        
        updatedCount++;
        
        console.log(`[WAYRA MAP] 🎨 ${provinciaData.name}: ${alertLevel} (${color})`);
    });
    
    console.log(`[WAYRA MAP] ✅ ${updatedCount} marcadores actualizados con colores para fecha: ${currentDate}`);
}

/**
 * Limpia marcadores fijos
 */
function clearFixedMarkers() {
    fixedMapMarkers.forEach(markerInfo => {
        markerInfo.marker.remove();
    });
    fixedMapMarkers = [];
    console.log('[WAYRA MAP] 🧹 Marcadores fijos limpiados');
}

/**
 * Función legacy para compatibilidad
 */
function clearMapMarkers() {
    // Para compatibilidad con código existente
    currentMapMarkers.forEach(marker => {
        marker.remove();
    });
    currentMapMarkers = [];
}

// ========== FUNCIONES DE INICIALIZACIÓN ==========

/**
 * Inicializa el mapa base
 */
function initWayraMap() {
    // Verificar que Mapbox GL JS esté cargado
    if (typeof mapboxgl === 'undefined') {
        console.error('[WAYRA MAP] Mapbox GL JS no está cargado');
        showMapError('Error: Mapbox GL JS no cargado');
        return;
    }
    
    // Configurar token
    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    // Crear mapa
    try {
        wayraMap = new mapboxgl.Map({
            container: 'wayra-map',
            style: MAP_CONFIG.style,
            center: MAP_CONFIG.center,
            zoom: MAP_CONFIG.zoom,
            projection: MAP_CONFIG.projection
        });
        
        // Cuando el mapa carga
        wayraMap.on('load', () => {
            console.log('🗺️ [WAYRA MAP] Mapa cargado correctamente');
            
            // Agregar controles de navegación
            wayraMap.addControl(new mapboxgl.NavigationControl());

            // Crear controles de estilo
            createStyleToggle();
            
            // Inicializar selector de fechas
            initDateSelector();
            
            // CREAR MARCADORES FIJOS (nueva funcionalidad)
            createFixedMarkers();
            
            // SEÑALAR AL SISTEMA DE ALERTAS QUE EL MAPA ESTÁ LISTO
            window.wayraMapReady = true;
        });
        
        // Manejar errores
        wayraMap.on('error', (e) => {
            console.error('[WAYRA MAP] Error del mapa:', e);
            showMapError('Error de conexión con el mapa');
        });
        
    } catch (error) {
        console.error('[WAYRA MAP] Error inicializando mapa:', error);
        showMapError('Error inicializando mapa');
    }
}

/**
 * Muestra mensaje de error en lugar del mapa
 */
function showMapError(message) {
    const mapContainer = document.querySelector('#wayra-map');
    if (mapContainer) {
        mapContainer.innerHTML = `
            <div style="
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                background: var(--fondo-claro);
                color: var(--texto-oscuro);
                text-align: center;
                padding: 2rem;
            ">
                <div>
                    <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
                    <div style="font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem;">
                        ${message}
                    </div>
                    <div style="font-size: 0.9rem; color: var(--gris-suave);">
                        Verificar conexión a internet y token de Mapbox
                    </div>
                </div>
            </div>
        `;
    }
}

// ========== FUNCIONES DE MARCADORES ==========

/**
 * Actualiza marcadores - NUEVA VERSIÓN SOLO COLORES (no crea marcadores)
 */
function updateMapMarkers(scenario) {
    // Esta función ahora solo actualiza colores de marcadores fijos
    console.log(`[WAYRA MAP] 🎨 Actualizando colores para: ${scenario}`);
    updateFixedMarkerColors();
}

/**
 * FUNCIÓN DESHABILITADA - Crear marcadores individuales (causa duplicados)
 */
function createProvinciaMarker(provinciaData, alertLevel, scenario) {
    // DESHABILITADA para evitar duplicados
    console.warn('[WAYRA MAP] ⚠️ createProvinciaMarker() deshabilitada - usando marcadores fijos');
    return;
}

/**
 * Crea contenido del popup para provincia
 */
function createProvinciaPopup(provinciaData, alertLevel, scenario) {
    const alertTexts = {
        verde: 'NORMAL',
        amarillo: 'VIGILANCIA', 
        naranja: 'ALERTA',
        rojo: 'CRÍTICO'
    };
    
    const riskTexts = {
        verde: 'Sin riesgos significativos',
        amarillo: 'Condiciones de vigilancia',
        naranja: 'Riesgo moderado a alto', 
        rojo: 'Riesgo crítico'
    };
    
    return `
        <div style="padding: 0.75rem; min-width: 220px;">
            <h3 style="margin: 0 0 0.5rem 0; color: #1e293b; font-size: 1.1rem;">
                ${provinciaData.name}
            </h3>
            
            <div style="
                display: inline-block;
                padding: 0.25rem 0.6rem;
                border-radius: 4px;
                font-size: 0.8rem;
                font-weight: bold;
                text-transform: uppercase;
                margin-bottom: 0.75rem;
                background: ${ALERT_COLORS[alertLevel]};
                color: white;
            ">${alertTexts[alertLevel]}</div>
            
            <div style="font-size: 0.9rem; line-height: 1.4;">
                <p style="margin: 0 0 0.4rem 0;">
                    <strong>Región:</strong> ${provinciaData.region}
                </p>
                <p style="margin: 0 0 0.4rem 0;">
                    <strong>Capital:</strong> ${provinciaData.capital}
                </p>
                <p style="margin: 0 0 0.4rem 0;">
                    <strong>Riesgo:</strong> ${riskTexts[alertLevel]}
                </p>
                <p style="margin: 0; font-size: 0.8rem; color: #64748b;">
                    <em>Correlación CCM basada en análisis histórico</em>
                </p>
            </div>
        </div>
    `;
}

/**
 * Limpia todos los marcadores del mapa
 */
function clearMapMarkers() {
    currentMapMarkers.forEach(marker => {
        marker.remove();
    });
    currentMapMarkers = [];
}

// ========== INTEGRACIÓN CON SISTEMA DE ALERTAS ==========

/**
 * Función que se llama cuando cambia el escenario
 */
function onScenarioChange(newScenario) {
    updateMapMarkers(newScenario);
}

// ========== FUNCIONES DE CONTROLES DE MAPA ==========

/**
 * Crea el toggle de estilos de mapa
 */
function createStyleToggle() {
    // Esperar a que el div del mapa exista
    const mapDiv = document.querySelector('#wayra-map');
    if (!mapDiv) {
        console.error('[WAYRA MAP] Div #wayra-map no encontrado para toggle');
        return;
    }
    
    // Verificar si ya existe el toggle (evitar duplicados)
    if (document.querySelector('.map-style-toggle')) {
        console.log('[WAYRA MAP] Toggle ya existe, saltando creación');
        return;
    }

    // Crear container del toggle
    const toggleContainer = document.createElement('div');
    toggleContainer.className = 'map-style-toggle';

    // Crear botones para cada estilo
    Object.entries(MAP_STYLES).forEach(([key, style]) => {
        const button = document.createElement('button');
        button.className = `style-btn ${key === currentMapStyle ? 'active' : ''}`;
        button.setAttribute('data-style', key);
        button.textContent = style.name;
        
        // Event listener para cambio de estilo
        button.addEventListener('click', () => {
            changeMapStyle(key);
        });
        
        toggleContainer.appendChild(button);
    });

    // Agregar al container del mapa (parent del div #wayra-map)
    const mapContainer = mapDiv.parentElement;
    mapContainer.appendChild(toggleContainer);
    
    console.log('[WAYRA MAP] Toggle de estilos creado correctamente');
}

/**
 * Cambia el estilo del mapa
 */
function changeMapStyle(newStyle) {
    if (!wayraMap || !MAP_STYLES[newStyle]) {
        console.error(`[WAYRA MAP] Estilo no válido: ${newStyle}`);
        return;
    }
    
    if (newStyle === currentMapStyle) {
        return; // Ya está activo
    }
    
    // Cambiar estilo del mapa
    wayraMap.setStyle(MAP_STYLES[newStyle].url);
    
    // Actualizar variable de estado
    currentMapStyle = newStyle;
    
    // Actualizar botones activos
    updateStyleButtons();
    
    // Re-agregar marcadores cuando el estilo cargue
    wayraMap.once('styledata', () => {
        console.log(`[WAYRA MAP] Estilo cambiado a: ${MAP_STYLES[newStyle].name}`);
        
        // Re-cargar marcadores (se pierden al cambiar estilo)
        updateMapMarkers(window.wayraAlerts?.data?.currentScenario || 'alerta');
    });
}

/**
 * Actualiza el estado visual de los botones
 */
function updateStyleButtons() {
    const buttons = document.querySelectorAll('.style-btn');
    buttons.forEach(btn => {
        const style = btn.getAttribute('data-style');
        if (style === currentMapStyle) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// ========== FUNCIONES AUXILIARES ==========

/**
 * Centra el mapa en una región específica
 */
function flyToRegion(region) {
    if (!wayraMap) return;
    
    const regions = {
        ecuador: {
            center: [-78.4678, -0.1807],
            zoom: 6
        },
        peru: {
            center: [-77.0428, -12.0464],
            zoom: 6
        },
        lac: {
            center: [-75.0152, -8.7832],
            zoom: 4.5
        }
    };
    
    const regionData = regions[region];
    if (regionData) {
        wayraMap.flyTo({
            center: regionData.center,
            zoom: regionData.zoom,
            duration: 2000
        });
    }
}

// ========== VARIABLES PARA FILTROS (NUEVA FUNCIONALIDAD) ==========

// Set para tracking qué niveles de alerta están visibles
let visibleAlertLevels = new Set(['verde', 'amarillo', 'naranja', 'rojo']); // Todos visibles por defecto

/**
 * Toggle de filtro de alertas - NUEVA FUNCIÓN FASE 4
 */
function toggleAlertFilter(scenarioName, buttonElement) {
    console.log(`[WAYRA MAP] 🔍 toggleAlertFilter llamado: ${scenarioName}`);
    
    // Mapeo de nombres de escenario a niveles de alerta
    const SCENARIO_TO_ALERT = {
        'normal': 'verde',
        'vigilancia': 'amarillo',
        'alerta': 'naranja', 
        'critico': 'rojo'
    };
    
    const alertLevel = SCENARIO_TO_ALERT[scenarioName];
    
    if (!alertLevel) {
        console.error(`[WAYRA MAP] Nivel de alerta no encontrado para: ${scenarioName}`);
        return;
    }
    
    if (visibleAlertLevels.has(alertLevel)) {
        // Desactivar filtro - ocultar este nivel
        visibleAlertLevels.delete(alertLevel);
        buttonElement.style.background = 'transparent';
        buttonElement.style.color = 'var(--wayra-azul-oceano)';
        buttonElement.style.borderColor = 'var(--wayra-azul-oceano)';
        
        console.log(`[WAYRA MAP] Filtro desactivado: ${alertLevel}`);
    } else {
        // Activar filtro - mostrar este nivel
        visibleAlertLevels.add(alertLevel);
        buttonElement.style.background = 'var(--wayra-azul-oceano)';
        buttonElement.style.color = 'var(--texto-claro)';
        buttonElement.style.borderColor = 'var(--wayra-azul-oceano)';
        
        console.log(`[WAYRA MAP] Filtro activado: ${alertLevel}`);
    }
    
    // Aplicar filtros a marcadores
    applyMarkerFilters();
}

/**
 * Aplica filtros de visibilidad a marcadores - NUEVA FUNCIÓN FASE 4
 */
function applyMarkerFilters() {
    const alertData = getCurrentAlertData();
    if (!alertData) {
        console.warn('[WAYRA MAP] No hay datos de alertas para aplicar filtros');
        return;
    }
    
    let visibleCount = 0;
    let hiddenCount = 0;
    
    fixedMapMarkers.forEach(markerInfo => {
        const { element, provinciaKey } = markerInfo;
        const alertLevel = alertData[provinciaKey] || 'verde';
        
        if (visibleAlertLevels.size === 0 || visibleAlertLevels.has(alertLevel)) {
            // Mostrar marcador
            element.style.display = 'block';
            visibleCount++;
        } else {
            // Ocultar marcador
            element.style.display = 'none';
            hiddenCount++;
        }
    });
    
    console.log(`[WAYRA MAP] 🔍 Filtros aplicados: ${visibleCount} visibles, ${hiddenCount} ocultos`);
    console.log(`[WAYRA MAP] 🎯 Niveles visibles:`, Array.from(visibleAlertLevels));
}

// ========== INICIALIZACIÓN ==========

/**
 * Inicializa el sistema de mapas
 */
function initWayraMapSystem() {
    console.log('🗺️ [WAYRA MAP] Iniciando sistema de mapas...');
    
    // Reemplazar placeholder con div del mapa
    const mapContainer = document.querySelector('.map-placeholder');
    if (mapContainer) {
        mapContainer.innerHTML = '<div id="wayra-map" style="width: 100%; height: 100%;"></div>';
        
        // Inicializar mapa después de un pequeño delay
        setTimeout(() => {
            initWayraMap();
        }, 100);
    } else {
        console.error('[WAYRA MAP] Container del mapa no encontrado');
    }
}

// ========== CSS ADICIONAL PARA ANIMACIONES ==========

// Agregar estilos para animación de marcadores
const mapStyles = document.createElement('style');
mapStyles.textContent = `
    @keyframes pulso-marcador {
        0%, 100% { 
            transform: scale(1);
            opacity: 1;
        }
        50% { 
            transform: scale(1.1);
            opacity: 0.8;
        }
    }
    
    /* Estilos para popups de Mapbox */
    .mapboxgl-popup-content {
        border-radius: 8px !important;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15) !important;
        padding: 0 !important;
    }
    
    .mapboxgl-popup-close-button {
        font-size: 18px !important;
        padding: 0.5rem !important;
    }
`;
document.head.appendChild(mapStyles);

// ========== AUTO-INICIALIZACIÓN ==========

// Esperar a que el DOM esté cargado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWayraMapSystem);
} else {
    initWayraMapSystem();
}

// ========== EXPORTACIÓN FINAL (después de todas las definiciones) ==========

// Exportar funciones para uso externo - DEBE IR AL FINAL
window.wayraMap = {
    updateMarkers: updateMapMarkers,
    flyToRegion: flyToRegion,
    onScenarioChange: onScenarioChange,
    changeStyle: changeMapStyle,
    toggleAlertFilter: toggleAlertFilter, // ✅ FUNCIÓN DEFINIDA ARRIBA
    applyMarkerFilters: applyMarkerFilters // ✅ FUNCIÓN DEFINIDA ARRIBA
};

console.log('[WAYRA MAP] 🔗 Funciones exportadas:', Object.keys(window.wayraMap));