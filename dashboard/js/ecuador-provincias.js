/**
 * WAYRA SAT - Datos de 24 Provincias Ecuador
 * Coordenadas centrales y datos por provincia
 */

// ========== DATOS DE 24 PROVINCIAS ECUADOR ==========

const ecuadorProvincias = {
    // REGIÓN SIERRA (10 provincias)
    pichincha: {
        name: "Pichincha",
        coordinates: [-78.4678, -0.1807], // Quito
        region: "Sierra",
        capital: "Quito",
        population: "3,228,233"
    },
    imbabura: {
        name: "Imbabura", 
        coordinates: [-78.1193, 0.3500], // Ibarra
        region: "Sierra",
        capital: "Ibarra",
        population: "476,257"
    },
    carchi: {
        name: "Carchi",
        coordinates: [-77.7166, 0.8151], // Tulcán
        region: "Sierra", 
        capital: "Tulcán",
        population: "186,869"
    },
    cotopaxi: {
        name: "Cotopaxi",
        coordinates: [-78.6157, -0.9324], // Latacunga
        region: "Sierra",
        capital: "Latacunga", 
        population: "488,716"
    },
    tungurahua: {
        name: "Tungurahua",
        coordinates: [-78.6382, -1.2581], // Ambato
        region: "Sierra",
        capital: "Ambato",
        population: "590,600"
    },
    bolivar: {
        name: "Bolívar",
        coordinates: [-79.0007, -1.5941], // Guaranda
        region: "Sierra",
        capital: "Guaranda",
        population: "209,933"
    },
    chimborazo: {
        name: "Chimborazo", 
        coordinates: [-78.6589, -1.6650], // Riobamba
        region: "Sierra",
        capital: "Riobamba",
        population: "524,004"
    },
    canar: {
        name: "Cañar",
        coordinates: [-78.8488, -2.7409], // Azogues
        region: "Sierra",
        capital: "Azogues",
        population: "281,396"
    },
    azuay: {
        name: "Azuay",
        coordinates: [-79.0059, -2.9001], // Cuenca  
        region: "Sierra",
        capital: "Cuenca",
        population: "881,394"
    },
    loja: {
        name: "Loja",
        coordinates: [-79.2104, -3.9929], // Loja
        region: "Sierra", 
        capital: "Loja",
        population: "521,154"
    },

    // REGIÓN COSTA (7 provincias)
    esmeraldas: {
        name: "Esmeraldas",
        coordinates: [-79.6519, 0.9719], // Esmeraldas
        region: "Costa",
        capital: "Esmeraldas",
        population: "643,654"
    },
    manabi: {
        name: "Manabí", 
        coordinates: [-80.3884, -1.0578], // Portoviejo
        region: "Costa",
        capital: "Portoviejo",
        population: "1,562,079"
    },
    santa_elena: {
        name: "Santa Elena",
        coordinates: [-80.8584, -2.2269], // Santa Elena
        region: "Costa",
        capital: "Santa Elena", 
        population: "401,178"
    },
    guayas: {
        name: "Guayas",
        coordinates: [-79.8987, -2.1894], // Guayaquil
        region: "Costa",
        capital: "Guayaquil",
        population: "4,387,434"
    },
    los_rios: {
        name: "Los Ríos",
        coordinates: [-79.5288, -1.8028], // Babahoyo
        region: "Costa",
        capital: "Babahoyo",
        population: "921,763"
    },
    el_oro: {
        name: "El Oro", 
        coordinates: [-79.9553, -3.2677], // Machala
        region: "Costa",
        capital: "Machala",
        population: "715,751"
    },
    santo_domingo: {
        name: "Santo Domingo de los Tsáchilas",
        coordinates: [-79.2104, -0.2500], // Santo Domingo
        region: "Costa",
        capital: "Santo Domingo",
        population: "458,580"
    },

    // REGIÓN ORIENTE (6 provincias)
    sucumbios: {
        name: "Sucumbíos",
        coordinates: [-76.6067, 0.0833], // Nueva Loja
        region: "Oriente", 
        capital: "Nueva Loja",
        population: "230,503"
    },
    orellana: {
        name: "Orellana",
        coordinates: [-76.9873, -0.4619], // El Coca
        region: "Oriente",
        capital: "Francisco de Orellana",
        population: "161,338"
    },
    napo: {
        name: "Napo",
        coordinates: [-77.8140, -1.0049], // Tena
        region: "Oriente",
        capital: "Tena", 
        population: "133,705"
    },
    pastaza: {
        name: "Pastaza",
        coordinates: [-78.0067, -1.4896], // Puyo
        region: "Oriente",
        capital: "Puyo",
        population: "114,202"
    },
    morona_santiago: {
        name: "Morona Santiago",
        coordinates: [-78.1193, -2.3067], // Macas
        region: "Oriente",
        capital: "Macas",
        population: "196,535"
    },
    zamora_chinchipe: {
        name: "Zamora Chinchipe", 
        coordinates: [-78.9547, -4.0667], // Zamora
        region: "Oriente",
        capital: "Zamora",
        population: "120,416"
    },

    // REGIÓN INSULAR (1 provincia)
    galapagos: {
        name: "Galápagos",
        coordinates: [-90.9681, -0.7406], // Puerto Baquerizo Moreno
        region: "Insular",
        capital: "Puerto Baquerizo Moreno",
        population: "33,042"
    }
};

// ========== FUNCIONES HELPER ==========

/**
 * Obtiene array de todas las provincias
 */
function getAllProvincias() {
    return Object.values(ecuadorProvincias);
}

/**
 * Obtiene provincias por región
 */
function getProvinciasByRegion(region) {
    return Object.values(ecuadorProvincias).filter(p => p.region === region);
}

/**
 * Obtiene provincia por clave
 */
function getProvincia(key) {
    return ecuadorProvincias[key];
}

/**
 * Obtiene array de coordenadas para centrar mapa
 */
function getAllCoordinates() {
    return Object.values(ecuadorProvincias).map(p => p.coordinates);
}

// ========== EXPORTAR DATOS ==========

// Para uso en otros archivos
window.ecuadorProvincias = {
    data: ecuadorProvincias,
    getAll: getAllProvincias,
    getByRegion: getProvinciasByRegion,
    get: getProvincia,
    getCoordinates: getAllCoordinates
};

console.log('📍 [ECUADOR] 24 provincias cargadas correctamente');
console.log(`📊 [ECUADOR] Regiones: Sierra (10), Costa (7), Oriente (6), Insular (1)`);