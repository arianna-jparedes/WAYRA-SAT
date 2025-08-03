/**
 * WAYRA SAT - Datos CCM Simulados para 24 Provincias de Ecuador
 * Basado en patrones reales de El Niño y geografía ecuatoriana
 */

// Datos CCM por escenario y provincia (usando NAME_1 del GeoJSON)
const provinciasData = {
    // ========== ESCENARIO NORMAL ==========
    normal: {
        'Pichincha': {
            alertLevel: 'verde',
            ninoCorrelation: 0.32,
            leadTime: 'N/A',
            probability: '15%',
            risk: 'Sin riesgos inmediatos',
            events: []
        },
        'Guayas': {
            alertLevel: 'verde',
            ninoCorrelation: 0.28,
            leadTime: 'N/A',
            probability: '12%',
            risk: 'Condiciones normales',
            events: []
        },
        'Azuay': {
            alertLevel: 'verde',
            ninoCorrelation: 0.25,
            leadTime: 'N/A',
            probability: '10%',
            risk: 'Estable',
            events: []
        },
        'Manabí': {
            alertLevel: 'verde',
            ninoCorrelation: 0.35,
            leadTime: 'N/A',
            probability: '18%',
            risk: 'Normal',
            events: []
        },
        'El Oro': {
            alertLevel: 'verde',
            ninoCorrelation: 0.30,
            leadTime: 'N/A',
            probability: '14%',
            risk: 'Sin alertas',
            events: []
        },
        'Tungurahua': {
            alertLevel: 'verde',
            ninoCorrelation: 0.22,
            leadTime: 'N/A',
            probability: '8%',
            risk: 'Condiciones estables',
            events: []
        },
        'Los Ríos': {
            alertLevel: 'verde',
            ninoCorrelation: 0.38,
            leadTime: 'N/A',
            probability: '20%',
            risk: 'Normal',
            events: []
        },
        'Esmeraldas': {
            alertLevel: 'verde',
            ninoCorrelation: 0.42,
            leadTime: 'N/A',
            probability: '25%',
            risk: 'Estable',
            events: []
        },
        'Chimborazo': {
            alertLevel: 'verde',
            ninoCorrelation: 0.18,
            leadTime: 'N/A',
            probability: '6%',
            risk: 'Sin riesgos',
            events: []
        },
        'Imbabura': {
            alertLevel: 'verde',
            ninoCorrelation: 0.28,
            leadTime: 'N/A',
            probability: '12%',
            risk: 'Normal',
            events: []
        },
        'Loja': {
            alertLevel: 'verde',
            ninoCorrelation: 0.35,
            leadTime: 'N/A',
            probability: '18%',
            risk: 'Condiciones normales',
            events: []
        },
        'Cotopaxi': {
            alertLevel: 'verde',
            ninoCorrelation: 0.24,
            leadTime: 'N/A',
            probability: '10%',
            risk: 'Estable',
            events: []
        },
        'Carchi': {
            alertLevel: 'verde',
            ninoCorrelation: 0.26,
            leadTime: 'N/A',
            probability: '11%',
            risk: 'Sin alertas',
            events: []
        },
        'Cañar': {
            alertLevel: 'verde',
            ninoCorrelation: 0.20,
            leadTime: 'N/A',
            probability: '7%',
            risk: 'Normal',
            events: []
        },
        'Bolívar': {
            alertLevel: 'verde',
            ninoCorrelation: 0.22,
            leadTime: 'N/A',
            probability: '8%',
            risk: 'Estable',
            events: []
        },
        'Santa Elena': {
            alertLevel: 'verde',
            ninoCorrelation: 0.45,
            leadTime: 'N/A',
            probability: '28%',
            risk: 'Normal costero',
            events: []
        },
        'Santo Domingo de los Tsáchilas': {
            alertLevel: 'verde',
            ninoCorrelation: 0.32,
            leadTime: 'N/A',
            probability: '15%',
            risk: 'Condiciones normales',
            events: []
        },
        'Sucumbíos': {
            alertLevel: 'verde',
            ninoCorrelation: 0.15,
            leadTime: 'N/A',
            probability: '5%',
            risk: 'Estable amazónico',
            events: []
        },
        'Napo': {
            alertLevel: 'verde',
            ninoCorrelation: 0.12,
            leadTime: 'N/A',
            probability: '4%',
            risk: 'Normal',
            events: []
        },
        'Pastaza': {
            alertLevel: 'verde',
            ninoCorrelation: 0.10,
            leadTime: 'N/A',
            probability: '3%',
            risk: 'Sin riesgos',
            events: []
        },
        'Morona Santiago': {
            alertLevel: 'verde',
            ninoCorrelation: 0.14,
            leadTime: 'N/A',
            probability: '5%',
            risk: 'Estable',
            events: []
        },
        'Zamora Chinchipe': {
            alertLevel: 'verde',
            ninoCorrelation: 0.16,
            leadTime: 'N/A',
            probability: '6%',
            risk: 'Normal amazónico',
            events: []
        },
        'Orellana': {
            alertLevel: 'verde',
            ninoCorrelation: 0.11,
            leadTime: 'N/A',
            probability: '4%',
            risk: 'Sin alertas',
            events: []
        },
        'Galápagos': {
            alertLevel: 'verde',
            ninoCorrelation: 0.65,
            leadTime: 'N/A',
            probability: '35%',
            risk: 'Normal insular',
            events: []
        }
    },

    // ========== ESCENARIO VIGILANCIA ==========
    vigilancia: {
        'Pichincha': {
            alertLevel: 'amarillo',
            ninoCorrelation: 0.58,
            leadTime: '4-6 semanas',
            probability: '45%',
            risk: 'Lluvias moderadas posibles',
            events: ['precipitacion_moderada']
        },
        'Guayas': {
            alertLevel: 'amarillo',
            ninoCorrelation: 0.62,
            leadTime: '3-5 semanas',
            probability: '48%',
            risk: 'Incremento precipitaciones',
            events: ['lluvias_costeras']
        },
        'Azuay': {
            alertLevel: 'verde',
            ninoCorrelation: 0.38,
            leadTime: '6-8 semanas',
            probability: '25%',
            risk: 'Ligero incremento lluvias',
            events: []
        },
        'Manabí': {
            alertLevel: 'amarillo',
            ninoCorrelation: 0.71,
            leadTime: '2-4 semanas',
            probability: '55%',
            risk: 'Lluvias costeras intensas',
            events: ['precipitacion_costera']
        },
        'El Oro': {
            alertLevel: 'amarillo',
            ninoCorrelation: 0.66,
            leadTime: '4-5 semanas',
            probability: '50%',
            risk: 'Riesgo inundaciones menores',
            events: ['inundaciones_leves']
        },
        'Tungurahua': {
            alertLevel: 'verde',
            ninoCorrelation: 0.35,
            leadTime: '8-10 semanas',
            probability: '22%',
            risk: 'Condiciones estables serranas',
            events: []
        },
        'Los Ríos': {
            alertLevel: 'amarillo',
            ninoCorrelation: 0.68,
            leadTime: '3-4 semanas',
            probability: '52%',
            risk: 'Incremento nivel fluvial',
            events: ['crecida_rios']
        },
        'Esmeraldas': {
            alertLevel: 'amarillo',
            ninoCorrelation: 0.74,
            leadTime: '2-3 semanas',
            probability: '58%',
            risk: 'Lluvias intensas norte',
            events: ['precipitacion_intensa']
        },
        'Chimborazo': {
            alertLevel: 'verde',
            ninoCorrelation: 0.28,
            leadTime: '10-12 semanas',
            probability: '18%',
            risk: 'Mínimo impacto serrano',
            events: []
        },
        'Imbabura': {
            alertLevel: 'verde',
            ninoCorrelation: 0.42,
            leadTime: '6-7 semanas',
            probability: '28%',
            risk: 'Lluvias moderadas',
            events: []
        },
        'Loja': {
            alertLevel: 'verde',
            ninoCorrelation: 0.45,
            leadTime: '8-9 semanas',
            probability: '30%',
            risk: 'Incremento precipitación sur',
            events: []
        },
        'Cotopaxi': {
            alertLevel: 'verde',
            ninoCorrelation: 0.38,
            leadTime: '7-8 semanas',
            probability: '25%',
            risk: 'Condiciones variables',
            events: []
        },
        'Carchi': {
            alertLevel: 'verde',
            ninoCorrelation: 0.40,
            leadTime: '5-6 semanas',
            probability: '26%',
            risk: 'Lluvias fronterizas',
            events: []
        },
        'Cañar': {
            alertLevel: 'verde',
            ninoCorrelation: 0.32,
            leadTime: '9-10 semanas',
            probability: '20%',
            risk: 'Estable andino',
            events: []
        },
        'Bolívar': {
            alertLevel: 'verde',
            ninoCorrelation: 0.35,
            leadTime: '8-9 semanas',
            probability: '22%',
            risk: 'Condiciones normales',
            events: []
        },
        'Santa Elena': {
            alertLevel: 'amarillo',
            ninoCorrelation: 0.78,
            leadTime: '2-3 semanas',
            probability: '62%',
            risk: 'Impacto costero directo',
            events: ['mareas_altas', 'erosion_costera']
        },
        'Santo Domingo de los Tsáchilas': {
            alertLevel: 'amarillo',
            ninoCorrelation: 0.56,
            leadTime: '4-5 semanas',
            probability: '42%',
            risk: 'Transición costa-sierra',
            events: ['lluvias_transicion']
        },
        'Sucumbíos': {
            alertLevel: 'verde',
            ninoCorrelation: 0.22,
            leadTime: '12+ semanas',
            probability: '12%',
            risk: 'Mínimo impacto amazónico',
            events: []
        },
        'Napo': {
            alertLevel: 'verde',
            ninoCorrelation: 0.18,
            leadTime: '12+ semanas',
            probability: '10%',
            risk: 'Estable amazónico',
            events: []
        },
        'Pastaza': {
            alertLevel: 'verde',
            ninoCorrelation: 0.15,
            leadTime: '12+ semanas',
            probability: '8%',
            risk: 'Sin impacto significativo',
            events: []
        },
        'Morona Santiago': {
            alertLevel: 'verde',
            ninoCorrelation: 0.20,
            leadTime: '10-12 semanas',
            probability: '11%',
            risk: 'Condiciones normales',
            events: []
        },
        'Zamora Chinchipe': {
            alertLevel: 'verde',
            ninoCorrelation: 0.24,
            leadTime: '10-11 semanas',
            probability: '14%',
            risk: 'Ligero incremento lluvias',
            events: []
        },
        'Orellana': {
            alertLevel: 'verde',
            ninoCorrelation: 0.16,
            leadTime: '12+ semanas',
            probability: '9%',
            risk: 'Estable',
            events: []
        },
        'Galápagos': {
            alertLevel: 'amarillo',
            ninoCorrelation: 0.85,
            leadTime: '1-2 semanas',
            probability: '70%',
            risk: 'Impacto marino directo',
            events: ['temperatura_marina', 'corrientes_anomalas']
        }
    },

    // ========== ESCENARIO ALERTA ==========
    alerta: {
        'Pichincha': {
            alertLevel: 'naranja',
            ninoCorrelation: 0.84,
            leadTime: '2-3 meses',
            probability: '85%',
            risk: 'Lluvias intensas + deslizamientos',
            events: ['lluvias_intensas', 'deslizamientos', 'inundaciones_urbanas']
        },
        'Guayas': {
            alertLevel: 'naranja',
            ninoCorrelation: 0.89,
            leadTime: '1-2 meses',
            probability: '88%',
            risk: 'Inundaciones costeras severas',
            events: ['inundaciones_severas', 'mareas_extremas']
        },
        'Azuay': {
            alertLevel: 'amarillo',
            ninoCorrelation: 0.58,
            leadTime: '3-4 meses',
            probability: '45%',
            risk: 'Incremento significativo lluvias',
            events: ['precipitacion_alta']
        },
        'Manabí': {
            alertLevel: 'rojo',
            ninoCorrelation: 0.92,
            leadTime: '3-4 semanas',
            probability: '95%',
            risk: 'Inundaciones + erosión costera',
            events: ['inundaciones_criticas', 'erosion_severa', 'perdida_infraestructura']
        },
        'El Oro': {
            alertLevel: 'naranja',
            ninoCorrelation: 0.86,
            leadTime: '6-8 semanas',
            probability: '88%',
            risk: 'Lluvias extremas sur',
            events: ['lluvias_extremas', 'crecida_rios']
        },
        'Tungurahua': {
            alertLevel: 'amarillo',
            ninoCorrelation: 0.52,
            leadTime: '4-5 meses',
            probability: '38%',
            risk: 'Riesgo lahares + lluvias',
            events: ['precipitacion_volcanica']
        },
        'Los Ríos': {
            alertLevel: 'naranja',
            ninoCorrelation: 0.87,
            leadTime: '6-7 semanas',
            probability: '85%',
            risk: 'Desbordamiento fluvial masivo',
            events: ['desbordamiento_rios', 'inundaciones_rurales']
        },
        'Esmeraldas': {
            alertLevel: 'rojo',
            ninoCorrelation: 0.94,
            leadTime: '4-5 semanas',
            probability: '96%',
            risk: 'Lluvias torrenciales + huaicos',
            events: ['lluvias_torrenciales', 'huaicos', 'colapso_vias']
        },
        'Chimborazo': {
            alertLevel: 'verde',
            ninoCorrelation: 0.35,
            leadTime: '6+ meses',
            probability: '22%',
            risk: 'Impacto menor andino alto',
            events: []
        },
        'Imbabura': {
            alertLevel: 'amarillo',
            ninoCorrelation: 0.62,
            leadTime: '3-4 meses',
            probability: '48%',
            risk: 'Lluvias intensas norte andino',
            events: ['precipitacion_intensa']
        },
        'Loja': {
            alertLevel: 'amarillo',
            ninoCorrelation: 0.68,
            leadTime: '4-5 meses',
            probability: '52%',
            risk: 'Incremento precipitación sur',
            events: ['lluvias_sur']
        },
        'Cotopaxi': {
            alertLevel: 'amarillo',
            ninoCorrelation: 0.56,
            leadTime: '3-4 meses',
            probability: '42%',
            risk: 'Riesgo volcánico + lluvias',
            events: ['precipitacion_volcanica']
        },
        'Carchi': {
            alertLevel: 'amarillo',
            ninoCorrelation: 0.64,
            leadTime: '2-3 meses',
            probability: '50%',
            risk: 'Lluvias frontera norte',
            events: ['lluvias_frontera']
        },
        'Cañar': {
            alertLevel: 'verde',
            ninoCorrelation: 0.42,
            leadTime: '5-6 meses',
            probability: '28%',
            risk: 'Impacto menor andino',
            events: []
        },
        'Bolívar': {
            alertLevel: 'verde',
            ninoCorrelation: 0.45,
            leadTime: '4-5 meses',
            probability: '32%',
            risk: 'Condiciones variables',
            events: []
        },
        'Santa Elena': {
            alertLevel: 'rojo',
            ninoCorrelation: 0.96,
            leadTime: '3-4 semanas',
            probability: '98%',
            risk: 'Impacto costero extremo',
            events: ['mareas_extremas', 'erosion_critica', 'perdida_costera']
        },
        'Santo Domingo de los Tsáchilas': {
            alertLevel: 'naranja',
            ninoCorrelation: 0.78,
            leadTime: '6-8 semanas',
            probability: '72%',
            risk: 'Transición costa-sierra afectada',
            events: ['lluvias_intensas', 'deslizamientos_menores']
        },
        'Sucumbíos': {
            alertLevel: 'verde',
            ninoCorrelation: 0.28,
            leadTime: '8+ meses',
            probability: '18%',
            risk: 'Mínimo impacto amazónico',
            events: []
        },
        'Napo': {
            alertLevel: 'verde',
            ninoCorrelation: 0.25,
            leadTime: '8+ meses',
            probability: '15%',
            risk: 'Impacto menor amazónico',
            events: []
        },
        'Pastaza': {
            alertLevel: 'verde',
            ninoCorrelation: 0.22,
            leadTime: '8+ meses',
            probability: '12%',
            risk: 'Sin impacto significativo',
            events: []
        },
        'Morona Santiago': {
            alertLevel: 'verde',
            ninoCorrelation: 0.32,
            leadTime: '6-8 meses',
            probability: '20%',
            risk: 'Ligero incremento lluvias',
            events: []
        },
        'Zamora Chinchipe': {
            alertLevel: 'amarillo',
            ninoCorrelation: 0.48,
            leadTime: '4-6 meses',
            probability: '35%',
            risk: 'Incremento precipitación sur',
            events: ['precipitacion_sur']
        },
        'Orellana': {
            alertLevel: 'verde',
            ninoCorrelation: 0.24,
            leadTime: '8+ meses',
            probability: '14%',
            risk: 'Impacto mínimo',
            events: []
        },
        'Galápagos': {
            alertLevel: 'rojo',
            ninoCorrelation: 0.98,
            leadTime: '2-3 semanas',
            probability: '99%',
            risk: 'Impacto marino crítico',
            events: ['temperatura_extrema', 'corrientes_criticas', 'impacto_biodiversidad']
        }
    },

    // ========== ESCENARIO CRÍTICO ==========
    critico: {
        'Pichincha': {
            alertLevel: 'rojo',
            ninoCorrelation: 0.95,
            leadTime: '3-4 semanas',
            probability: '95%',
            risk: 'Inundaciones severas + deslizamientos masivos',
            events: ['inundaciones_severas', 'deslizamientos_masivos', 'colapso_infraestructura', 'evacuaciones']
        },
        'Guayas': {
            alertLevel: 'rojo',
            ninoCorrelation: 0.96,
            leadTime: '4-6 semanas',
            probability: '92%',
            risk: 'Inundaciones costeras devastadoras',
            events: ['inundaciones_devastadoras', 'mareas_criticas', 'perdida_territorial']
        },
        'Azuay': {
            alertLevel: 'naranja',
            ninoCorrelation: 0.74,
            leadTime: '2-3 meses',
            probability: '68%',
            risk: 'Lluvias intensas andinas',
            events: ['lluvias_intensas', 'deslizamientos']
        },
        'Manabí': {
            alertLevel: 'rojo',
            ninoCorrelation: 0.98,
            leadTime: '2-3 semanas',
            probability: '98%',
            risk: 'Devastación costera total',
            events: ['devastacion_costera', 'perdida_masiva_infraestructura', 'evacuacion_masiva']
        },
        'El Oro': {
            alertLevel: 'rojo',
            ninoCorrelation: 0.94,
            leadTime: '3-4 semanas',
            probability: '96%',
            risk: 'Lluvias extremas + huaicos devastadores',
            events: ['lluvias_extremas', 'huaicos_devastadores', 'colapso_minero']
        },
        'Tungurahua': {
            alertLevel: 'naranja',
            ninoCorrelation: 0.68,
            leadTime: '2-4 meses',
            probability: '58%',
            risk: 'Riesgo lahares críticos',
            events: ['lahares_criticos', 'precipitacion_volcanica_extrema']
        },
        'Los Ríos': {
            alertLevel: 'rojo',
            ninoCorrelation: 0.93,
            leadTime: '4-5 semanas',
            probability: '89%',
            risk: 'Desbordamiento fluvial catastrófico',
            events: ['desbordamiento_catastrofico', 'perdida_agricola_masiva']
        },
        'Esmeraldas': {
            alertLevel: 'rojo',
            ninoCorrelation: 0.97,
            leadTime: '2-3 semanas',
            probability: '98%',
            risk: 'Lluvias torrenciales + colapso total vías',
            events: ['lluvias_torrenciales', 'colapso_total_vias', 'aislamiento_poblaciones']
        },
        'Chimborazo': {
            alertLevel: 'amarillo',
            ninoCorrelation: 0.52,
            leadTime: '4-6 meses',
            probability: '38%',
            risk: 'Impacto moderado alta montaña',
            events: ['precipitacion_montana']
        },
        'Imbabura': {
            alertLevel: 'naranja',
            ninoCorrelation: 0.78,
            leadTime: '2-3 meses',
            probability: '72%',
            risk: 'Lluvias intensas + deslizamientos',
            events: ['lluvias_intensas', 'deslizamientos', 'afectacion_lagos']
        },
        'Loja': {
            alertLevel: 'naranja',
            ninoCorrelation: 0.82,
            leadTime: '2-4 meses',
            probability: '78%',
            risk: 'Precipitación extrema frontera sur',
            events: ['precipitacion_extrema', 'crecida_rios_frontera']
        },
        'Cotopaxi': {
            alertLevel: 'naranja',
            ninoCorrelation: 0.76,
            leadTime: '2-3 meses',
            probability: '70%',
            risk: 'Riesgo volcánico crítico + lluvias',
            events: ['riesgo_volcanico_critico', 'lahares_potenciales']
        },
        'Carchi': {
            alertLevel: 'naranja',
            ninoCorrelation: 0.80,
            leadTime: '4-6 semanas',
            probability: '75%',
            risk: 'Lluvias extremas frontera',
            events: ['lluvias_extremas_frontera', 'deslizamientos_carretera']
        },
        'Cañar': {
            alertLevel: 'amarillo',
            ninoCorrelation: 0.58,
            leadTime: '3-4 meses',
            probability: '45%',
            risk: 'Incremento precipitación andina',
            events: ['precipitacion_andina']
        },
        'Bolívar': {
            alertLevel: 'amarillo',
            ninoCorrelation: 0.62,
            leadTime: '3-4 meses',
            probability: '48%',
            risk: 'Lluvias intensas centro andino',
            events: ['lluvias_centro_andino']
        },
        'Santa Elena': {
            alertLevel: 'rojo',
            ninoCorrelation: 0.99,
            leadTime: '2-3 semanas',
            probability: '99%',
            risk: 'Destrucción costera completa',
            events: ['destruccion_costera_completa', 'perdida_territorio', 'evacuacion_total']
        },
        'Santo Domingo de los Tsáchilas': {
            alertLevel: 'rojo',
            ninoCorrelation: 0.88,
            leadTime: '3-4 semanas',
            probability: '85%',
            risk: 'Colapso vías principales + deslizamientos',
            events: ['colapso_vias_principales', 'deslizamientos_masivos', 'aislamiento']
        },
        'Sucumbíos': {
            alertLevel: 'amarillo',
            ninoCorrelation: 0.45,
            leadTime: '4-6 meses',
            probability: '32%',
            risk: 'Incremento precipitación amazónica',
            events: ['precipitacion_amazonca']
        },
        'Napo': {
            alertLevel: 'amarillo',
            ninoCorrelation: 0.42,
            leadTime: '4-6 meses',
            probability: '28%',
            risk: 'Crecida ríos amazónicos',
            events: ['crecida_rios_amazonicos']
        },
        'Pastaza': {
            alertLevel: 'verde',
            ninoCorrelation: 0.35,
            leadTime: '6+ meses',
            probability: '22%',
            risk: 'Impacto menor amazónico',
            events: []
        },
        'Morona Santiago': {
            alertLevel: 'amarillo',
            ninoCorrelation: 0.48,
            leadTime: '4-5 meses',
            probability: '35%',
            risk: 'Incremento precipitación sur amazónico',
            events: ['precipitacion_sur_amazonico']
        },
        'Zamora Chinchipe': {
            alertLevel: 'naranja',
            ninoCorrelation: 0.72,
            leadTime: '2-4 meses',
            probability: '65%',
            risk: 'Lluvias intensas sur oriente',
            events: ['lluvias_intensas_sur', 'crecida_rios_mineros']
        },
        'Orellana': {
            alertLevel: 'amarillo',
            ninoCorrelation: 0.38,
            leadTime: '5-6 meses',
            probability: '25%',
            risk: 'Ligero incremento amazónico',
            events: ['incremento_amazonico']
        },
        'Galápagos': {
            alertLevel: 'rojo',
            ninoCorrelation: 0.99,
            leadTime: '1-2 semanas',
            probability: '99%',
            risk: 'Colapso ecosistémico marino',
            events: ['colapso_ecosistemico', 'perdida_biodiversidad', 'impacto_turistico_total']
        }
    }
};

// Función helper para obtener datos de una provincia en un escenario
function getProvinciaData(provincia, escenario) {
    return provinciasData[escenario] && provinciasData[escenario][provincia] 
        ? provinciasData[escenario][provincia]
        : null;
}

// Función helper para obtener todas las provincias de un escenario
function getEscenarioData(escenario) {
    return provinciasData[escenario] || {};
}

// Exportar para uso en otros módulos
if (typeof window !== 'undefined') {
    window.provinciasData = {
        data: provinciasData,
        getProvincia: getProvinciaData,
        getEscenario: getEscenarioData
    };
}