# Mini Pokédex

**Proyecto para el curso de Programación Web**
* **Estudiante:** Pablo Fernando Contreras
* **Catedratico:** Brandon Antony Chitay Coutiño
* **Universidad:** Universidad Da Vinci de Guatemala

---

## 🚀 Ver Proyecto en Vivo

Puedes ver y probar la aplicación en vivo en el siguiente enlace:

**[https://OculusViridis.github.io/pokedex](https://OculusViridis.github.io/pokedex)**

---

## Descripción

Una aplicación web sencilla que funciona como una Pokédex. Consume datos de la [PokéAPI](https://pokeapi.co/) para mostrar información sobre diferentes Pokémon, permitiendo a los usuarios buscar, ver detalles y guardar una lista de sus favoritos.

## ✨ Características Principales
* **Búsqueda Dinámica**: Busca cualquier Pokémon por su nombre o número de ID.
* **Carga Aleatoria**: Descubre nuevos Pokémon con un botón que carga 20 criaturas al azar.
* **Vista de Detalles Completa**: Muestra la imagen oficial, tipo(s), altura, peso y estadísticas base de cada Pokémon.
* **Sistema de Favoritos**: Guarda tus Pokémon preferidos. La lista persiste incluso si recargas o cierras la página gracias al uso de `localStorage`.
* **Diseño Responsivo**: La interfaz se adapta perfectamente a dispositivos de escritorio y móviles.
* **Navegación Mejorada**: Incluye un botón para desplazarse suavemente a la sección de favoritos, ideal para la vista móvil.

## 💻 Tecnologías Utilizadas
* **HTML5**: Para la estructura y maquetación del contenido.
* **CSS3**: Para los estilos, utilizando la metodología **BEM** y un diseño responsivo con Flexbox y Grid.
* **JavaScript (Puro/Vanilla)**: Para toda la lógica de la aplicación, incluyendo:
    * **Fetch API**: para el consumo de datos desde la PokéAPI.
    * **Manipulación del DOM**: para renderizar la información dinámicamente.
    * **LocalStorage API**: para la persistencia de los favoritos.

## ⚙️ Cómo Ejecutar Localmente
Si deseas ejecutar el proyecto en tu propia máquina:
1. Clona este repositorio.
2. Abre la carpeta del proyecto.
3. Haz doble clic en el archivo `index.html` para abrirlo en tu navegador.