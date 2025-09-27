document.addEventListener('DOMContentLoaded', () => {
    // 1. Selección de Elementos del DOM 
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('pokemon-results-container');
    const favoritesContainer = document.getElementById('favorites-container');
    const loadInitialBtn = document.getElementById('load-initial-btn');
    const scrollToFavoritesBtn = document.getElementById('scroll-to-favorites-btn');
    const favoritesSection = document.getElementById('favorites-section');

    const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

    //  2. Lógica de Favoritos (localStorage) 
    let favorites = JSON.parse(localStorage.getItem('pokemonFavorites')) || [];

    const saveFavorites = () => {
        localStorage.setItem('pokemonFavorites', JSON.stringify(favorites));
    };

    const isFavorite = (pokemonId) => {
        return favorites.includes(pokemonId);
    };

    const toggleFavorite = (pokemonId, favBtn) => {
        if (isFavorite(pokemonId)) {
            // Eliminar de favoritos
            favorites = favorites.filter(id => id !== pokemonId);
            favBtn.classList.remove('pokemon-card--favorite');
            favBtn.textContent = '☆';
        } else {
            // Agregar a favoritos
            favorites.push(pokemonId);
            favBtn.classList.add('pokemon-card--favorite');
            favBtn.textContent = '★';
        }
        saveFavorites();
        renderFavorites(); // Actualizar la vista de favoritos
    };

    //  3. Fetch y Renderizado 

    // Función para obtener datos de un Pokémon
    const getPokemonData = async (query) => {
        try {
            // Convertimos el query a string para poder usar toLowerCase() sin errores
            const response = await fetch(`${API_URL}${String(query).toLowerCase()}`);
            if (!response.ok) {
                throw new Error('Pokémon no encontrado');
            }
            return await response.json();
        } catch (error) {
            console.error(error.message);
            resultsContainer.innerHTML = `<p>${error.message}</p>`;
            return null;
        }
    };

    // Función para renderizar una tarjeta de Pokémon
    const renderPokemonCard = (pokemonData, container) => {
        if (!pokemonData) return;

        const types = pokemonData.types.map(t => 
            `<span class="pokemon-card__type type--${t.type.name}">${t.type.name}</span>`
        ).join('');

        const stats = pokemonData.stats.map(s => `<li>${s.stat.name}: ${s.base_stat}</li>`).join('');

        const card = document.createElement('article');
        card.className = 'pokemon-card';

        card.innerHTML = `
            <div class="pokemon-card__header">
                <h2 class="pokemon-card__name">${pokemonData.name}</h2>
                <button class="pokemon-card__fav-btn" data-id="${pokemonData.id}">
                    ${isFavorite(pokemonData.id) ? '★' : '☆'}
                </button>
            </div>
            <img class="pokemon-card__image" src="${pokemonData.sprites.other['official-artwork'].front_default}" alt="${pokemonData.name}">
            <div class="pokemon-card__info">
                <p><strong>Altura:</strong> ${pokemonData.height / 10} m</p>
                <p><strong>Peso:</strong> ${pokemonData.weight / 10} kg</p>
                <div class="pokemon-card__types">${types}</div>
            </div>
            <div class="pokemon-card__stats">
                <h3>Estadísticas Base</h3>
                <ul>${stats}</ul>
            </div>
        `;
        
        // Agregar clase de modificador para favoritos
        const favBtn = card.querySelector('.pokemon-card__fav-btn');
        if (isFavorite(pokemonData.id)) {
            favBtn.classList.add('pokemon-card--favorite');
        }
        
        // Evento para el botón de favoritos
        favBtn.addEventListener('click', () => toggleFavorite(pokemonData.id, favBtn));

        container.appendChild(card);
    };
    
    // Función para renderizar la lista de favoritos
    const renderFavorites = async () => {
        favoritesContainer.innerHTML = '<p>Cargando favoritos...</p>';
        if (favorites.length === 0) {
            favoritesContainer.innerHTML = '<p>No tienes Pokémon favoritos todavía.</p>';
            return;
        }

        // Usamos Promise.all para cargar todos los favoritos en paralelo
        const favoritePokemonPromises = favorites.map(id => getPokemonData(id));
        const favoritePokemonData = await Promise.all(favoritePokemonPromises);

        favoritesContainer.innerHTML = ''; // Limpiar antes de renderizar
        favoritePokemonData.forEach(pokemonData => renderPokemonCard(pokemonData, favoritesContainer));
    };

    // --- 4. Event Listeners ---

    // Búsqueda de Pokémon
    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            resultsContainer.innerHTML = '<p>Buscando...</p>';
            const pokemonData = await getPokemonData(query);
            resultsContainer.innerHTML = ''; // Limpiar antes de renderizar
            if (pokemonData) {
                renderPokemonCard(pokemonData, resultsContainer);
            }
        }
    });

// Cargar Pokémon iniciales
loadInitialBtn.addEventListener('click', async () => {
    resultsContainer.innerHTML = '<p>Cargando Pokémon aleatorios...</p>';

    const randomIds = new Set();
    const MAX_POKEMON_ID = 1025; // Límite de Pokémon (Gen 9)

    // Generamos 20 pokemon aleatorios sin que se repitan
    while (randomIds.size < 20) {
        const randomId = Math.floor(Math.random() * MAX_POKEMON_ID) + 1;
        randomIds.add(randomId);
    }
    
    const pokemonIds = Array.from(randomIds); // Convertimos el Set a un Array
 
    // Cargamos los datos de los Pokémon
    const pokemonPromises = pokemonIds.map(id => getPokemonData(id));
    const allPokemonData = await Promise.all(pokemonPromises);

    resultsContainer.innerHTML = ''; // Limpiar el mensaje de "Cargando..."
    allPokemonData.forEach(pokemonData => renderPokemonCard(pokemonData, resultsContainer));
});

    scrollToFavoritesBtn.addEventListener('click', () => {
    favoritesSection.scrollIntoView({ behavior: 'smooth' });
    });


    //  5. Carga Inicial 
    renderFavorites(); // Renderizar favoritos al cargar la página
});