/**
 * WAYRA SAT - Sistema de Mapas Interactivo
 * Mapa base con marcadores de alertas
 */

// ========== CONFIGURACIÓN DEL MAPA ==========

// ⚠️ IMPORTANTE: Token de Mapbox
const MAPBOX_TOKEN = 'pk.eyJ1IjoiamFja21hbHVjYXJkIiwiYSI6ImNtZHY4bWRvOTFwaGUybHEzb3ZzOTE5ZGcifQ.qgV1LXaX38wPsJ7B8Tw7ug';

// Configuración inicial del mapa
const MAP_CONFIG = {
    center: [-75.0152, -8.7832], // Centrado entre Ecuador y Perú
    zoom: 4.5,
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

const mapMarkers = {
    normal: [
        {
            coordinates: [-78.4678, -0.1807], // Quito
            city: "Quito",
            country: "Ecuador",
            alertLevel: "verde",
            alertText: "NORMAL",
            risk: "Sin riesgos inmediatos",
            leadTime: "N/A",
            probability: "10%",
            lastUpdate: "Hace 1 hora"
        },
        {
            coordinates: [-77.0428, -12.0464], // Lima
            city: "Lima", 
            country: "Perú",
            alertLevel: "verde",
            alertText: "NORMAL",
            risk: "Condiciones estables",
            leadTime: "N/A", 
            probability: "15%",
            lastUpdate: "Hace 2 horas"
        }
    ],
    
    vigilancia: [
        {
            coordinates: [-78.4678, -0.1807], // Quito
            city: "Quito",
            country: "Ecuador",
            alertLevel: "amarillo",
            alertText: "VIGILANCIA",
            risk: "Lluvias moderadas posibles",
            leadTime: "4-6 semanas",
            probability: "45%",
            lastUpdate: "Hace 30 min"
        },
        {
            coordinates: [-77.0428, -12.0464], // Lima
            city: "Lima", 
            country: "Perú",
            alertLevel: "verde",
            alertText: "NORMAL",
            risk: "Temperaturas ligeramente altas",
            leadTime: "6-8 semanas", 
            probability: "25%",
            lastUpdate: "Hace 1 hora"
        },
        {
            coordinates: [-79.8987, -2.1894], // Guayaquil
            city: "Guayaquil",
            country: "Ecuador",
            alertLevel: "amarillo",
            alertText: "VIGILANCIA",
            risk: "Humedad alta",
            leadTime: "3-5 semanas",
            probability: "40%",
            lastUpdate: "Hace 45 min"
        }
    ],
    
    alerta: [
        {
            coordinates: [-78.4678, -0.1807], // Quito
            city: "Quito",
            country: "Ecuador",
            alertLevel: "naranja",
            alertText: "ALERTA",
            risk: "Lluvias intensas",
            leadTime: "2-3 meses",
            probability: "85%",
            lastUpdate: "Hace 2 horas"
        },
        {
            coordinates: [-77.0428, -12.0464], // Lima
            city: "Lima", 
            country: "Perú",
            alertLevel: "amarillo",
            alertText: "VIGILANCIA",
            risk: "Temperaturas altas",
            leadTime: "1-2 meses", 
            probability: "72%",
            lastUpdate: "Hace 4 horas"
        },
        {
            coordinates: [-79.8987, -2.1894], // Guayaquil
            city: "Guayaquil",
            country: "Ecuador",
            alertLevel: "naranja",
            alertText: "ALERTA",
            risk: "Inundaciones costeras",
            leadTime: "6-8 semanas",
            probability: "78%",
            lastUpdate: "Hace 1 hora"
        },
        {
            coordinates: [-80.6328, -5.1944], // Piura
            city: "Piura",
            country: "Perú",
            alertLevel: "naranja", 
            alertText: "ALERTA",
            risk: "Lluvias extremas",
            leadTime: "6-8 semanas",
            probability: "88%",
            lastUpdate: "Hace 3 horas"
        }
    ],
    
    critico: [
        {
            coordinates: [-78.4678, -0.1807], // Quito
            city: "Quito",
            country: "Ecuador",
            alertLevel: "rojo",
            alertText: "CRÍTICO",
            risk: "Inundaciones severas + deslizamientos",
            leadTime: "3-4 semanas",
            probability: "95%",
            lastUpdate: "Hace 30 min"
        },
        {
            coordinates: [-77.0428, -12.0464], // Lima
            city: "Lima", 
            country: "Perú",
            alertLevel: "rojo",
            alertText: "CRÍTICO",
            risk: "Lluvias torrenciales",
            leadTime: "4-6 semanas", 
            probability: "92%",
            lastUpdate: "Hace 1 hora"
        },
        {
            coordinates: [-79.8987, -2.1894], // Guayaquil
            city: "Guayaquil",
            country: "Ecuador",
            alertLevel: "rojo",
            alertText: "CRÍTICO",
            risk: "Inundaciones costeras severas",
            leadTime: "2-3 semanas",
            probability: "98%",
            lastUpdate: "Hace 15 min"
        },
        {
            coordinates: [-80.6328, -5.1944], // Piura
            city: "Piura",
            country: "Perú",
            alertLevel: "rojo", 
            alertText: "CRÍTICO",
            risk: "Lluvias extremas + huaicos",
            leadTime: "3-4 semanas",
            probability: "96%",
            lastUpdate: "Hace 45 min"
        },
        {
            coordinates: [-76.5319, -8.1116], // Trujillo
            city: "Trujillo",
            country: "Perú",
            alertLevel: "naranja",
            alertText: "ALERTA",
            risk: "Temperaturas extremas",
            leadTime: "4-5 semanas",
            probability: "85%",
            lastUpdate: "Hace 2 horas"
        },
        {
            coordinates: [-76.9426, -12.0621], // Huancayo
            city: "Huancayo",
            country: "Perú",
            alertLevel: "rojo",
            alertText: "CRÍTICO",
            risk: "Heladas + sequía",
            leadTime: "2-3 meses",
            probability: "89%",
            lastUpdate: "Hace 1 hora"
        }
    ]
};

// Colores de marcadores por nivel de alerta
const ALERT_COLORS = {
    verde: '#16a34a',
    amarillo: '#ca8a04', 
    naranja: '#ea580c',
    rojo: '#dc2626'
};

// Array para guardar marcadores actuales
let currentMapMarkers = [];

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
            
            // Cargar marcadores del escenario actual
            updateMapMarkers(window.wayraAlerts?.data?.currentScenario || 'alerta');
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
 * Actualiza marcadores según el escenario
 */
function updateMapMarkers(scenario) {
    if (!wayraMap) {
        console.warn('[WAYRA MAP] Mapa no inicializado');
        return;
    }
    
    // Limpiar marcadores existentes
    clearMapMarkers();
    
    // Obtener datos del escenario
    const markersData = mapMarkers[scenario];
    if (!markersData) {
        console.error(`[WAYRA MAP] Datos no encontrados para escenario: ${scenario}`);
        return;
    }
    
    // Crear nuevos marcadores
    markersData.forEach(markerData => {
        createMapMarker(markerData);
    });
    
    console.log(`[WAYRA MAP] ${markersData.length} marcadores actualizados para escenario: ${scenario}`);
}

/**
 * Crea un marcador individual
 */
function createMapMarker(data) {
    // Crear elemento visual del marcador
    const markerElement = document.createElement('div');
    markerElement.style.cssText = `
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: ${ALERT_COLORS[data.alertLevel]};
        border: 3px solid white;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    
    // Animación para alertas críticas
    if (data.alertLevel === 'rojo' || data.alertLevel === 'naranja') {
        markerElement.style.animation = 'pulso-marcador 2s infinite';
    }
    
    // Efecto hover
    markerElement.addEventListener('mouseenter', () => {
        markerElement.style.transform = 'scale(1.2)';
    });
    
    markerElement.addEventListener('mouseleave', () => {
        markerElement.style.transform = 'scale(1)';
    });
    
    // Crear popup con información
    const popup = new mapboxgl.Popup({ 
        offset: 25,
        closeButton: true,
        closeOnClick: false
    }).setHTML(createPopupContent(data));
    
    // Crear marcador en el mapa
    const marker = new mapboxgl.Marker(markerElement)
        .setLngLat(data.coordinates)
        .setPopup(popup)
        .addTo(wayraMap);
    
    // Guardar referencia para poder limpiarlo después
    currentMapMarkers.push(marker);
}

/**
 * Crea el contenido HTML del popup
 */
function createPopupContent(data) {
    return `
        <div style="padding: 0.5rem; min-width: 200px;">
            <div style="
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin-bottom: 0.75rem;
            ">
                <h3 style="
                    margin: 0;
                    color: var(--texto-oscuro);
                    font-size: 1.1rem;
                ">${data.city}, ${data.country}</h3>
            </div>
            
            <div style="
                display: inline-block;
                padding: 0.25rem 0.5rem;
                border-radius: 4px;
                font-size: 0.8rem;
                font-weight: bold;
                text-transform: uppercase;
                margin-bottom: 0.75rem;
                background: ${ALERT_COLORS[data.alertLevel]};
                color: white;
            ">${data.alertText}</div>
            
            <div style="font-size: 0.9rem; line-height: 1.4;">
                <p style="margin: 0 0 0.5rem 0;">
                    <strong>Riesgo:</strong> ${data.risk}
                </p>
                <p style="margin: 0 0 0.5rem 0;">
                    <strong>Lead Time:</strong> ${data.leadTime}
                </p>
                <p style="margin: 0 0 0.5rem 0;">
                    <strong>Probabilidad:</strong> ${data.probability}
                </p>
                <p style="margin: 0; font-size: 0.8rem; color: var(--gris-suave);">
                    <em>Actualizado: ${data.lastUpdate}</em>
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

// Exportar funciones para uso externo
window.wayraMap = {
    updateMarkers: updateMapMarkers,
    flyToRegion: flyToRegion,
    onScenarioChange: onScenarioChange,
    changeStyle: changeMapStyle
};