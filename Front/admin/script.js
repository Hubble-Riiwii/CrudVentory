// LÓGICA ECOMMERCE 
// Seleccionamos todos los encabezados de dropdown
const dropdownHeaders = document.querySelectorAll('.dropdown-header');
dropdownHeaders.forEach(header => {
  header.addEventListener('click', (e) => {
    e.preventDefault();
    // 1. Buscamos el submenú hermano de este header
    const submenu = header.nextElementSibling;
    // 2. Buscamos la flecha dentro de este header
    const arrow = header.querySelector('.arrow');
    if (submenu && submenu.classList.contains('submenu')) {
      submenu.classList.toggle('show');
    }
    
    if (arrow) {
      arrow.classList.toggle('rotate');
    }
  });
});

/* LÓGICA PARA MOSTRAR/OCULTAR EL MENÚ DE IDIOMAS */
const langSelector = document.getElementById('lang-selector');
const langMenu = document.getElementById('lang-menu');
langSelector.addEventListener('click', (e) => {
    // Esto evita que el clic cierre el menú inmediatamente
    e.stopPropagation(); 
    // Alterna la clase 'show' 
    langMenu.classList.toggle('show');
});

// Cerrar el menú si el usuario hace clic fuera de él
document.addEventListener('click', () => {
    langMenu.classList.remove('show');
});

const translation = {
  US: {
    "ferreteria": "Hardware Store",
    "mega-menu": "Mega Menu",
    "navigation": "Navigation",
    "dashboard": "Dashboard",
    "landing-page": "Landing Page",
    "APPS": "APPS",
    "Chat": "Chat",
    "calendar": "Calendar",
    "file-manager": "File Manager",
    "ecommerce": "Ecommerce",
    "products": "📦 Products",
    "listing": "Listing",
    "productsGrid": "Products Grid",
    "productsDetails": "Products Details",
    "addProduct": "Add Product",
    "categories": "🗂️ Categories",
    "orders": "🧾 Orders",
    "customers": "👥 Customers",
    "sellers": "🧑‍💼 Sellers"
  },
  ES: {
    "ferreteria": "Ferretería",
    "mega-menu": "Mega Menú",
    "navigation": "NAVEGACIÓN",
    "dashboard": "Panel de Control",
    "landing-page": "Página de Inicio",
    "APPS": "APLICACIONES",
    "Chat": "Chat",
    "calendar": "Calendario",
    "file-manager": "Gestor de Archivos",
    "ecommerce": "Comercio",
    "products": "📦 Productos",
    "listing": "Listado",
    "productsGrid": "Cuadrícula de Productos",
    "productsDetails": "Detalles del Producto",
    "addProduct": "Agregar Producto",
    "categories": "🗂️ Categorías",
    "orders": "🧾 Pedidos",
    "customers": "👥 Clientes",
    "sellers": "🧑‍💼 Vendedores"
  }
};

const elementos = document.querySelectorAll('[data-translate]');
// Función principal que recorre y traduce los elementos
function aplicarTraduccion(idioma) {
  // Seleccionamos todos los elementos con el atributo data-translate
  const elementos = document.querySelectorAll('[data-translate]');
  elementos.forEach((elemento) => {
    // Obtenemos la llave 
    const llave = elemento.getAttribute('data-translate');
    // Verificamos que la traducción exista en nuestro objeto 'translation'
    if (translation[idioma] && translation[idioma][llave]) {
      // Cambiamos el texto del elemento
      elemento.textContent = translation[idioma][llave];
    }
  });
}

// 2. Evento para detectar cuando el usuario elige un idioma en el menú
const langMenuLinks = document.querySelectorAll('#lang-menu a');
const currentLangText = document.getElementById('current-lang');

langMenuLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Obtenemos el idioma del atributo data-lang (ES o US)
    const nuevoIdioma = link.getAttribute('data-lang');
    
    // Actualizamos el texto visible en el nav
    currentLangText.textContent = nuevoIdioma;
    
    // Ejecutamos la traducción de toda la página
    aplicarTraduccion(nuevoIdioma);
  });
});
//LOGICA DE ICONO BRILLO
const btnBrillo = document.getElementById('brightness-icon');
const menuBrillo = document.getElementById('brightness-ctrl');
const barraBrillo = document.getElementById('brightness-range');
// A. Mostrar/Ocultar el menú al hacer clic
btnBrillo.addEventListener('click', (e) => {
  e.preventDefault();
  menuBrillo.classList.toggle('show');
});

// B. Cambiar el brillo de la página
barraBrillo.addEventListener('input', (e) => {
  const valor = e.target.value; // Obtenemos el número (10 a 100)
  // Aplicamos el filtro al body. Dividimos por 100 para que sea decimal (ej: 0.7)
  document.body.style.filter = `brightness(${valor}%)`;
});
const contenedorBrillo = document.querySelector('.brightness-container');
// Cerrar el menú si se hace clic fuera de él
document.addEventListener('click', (e) => {
  // El signo "!" significa "NO"
  if (!contenedorBrillo.contains(e.target)) {
    menuBrillo.classList.remove('show');
  }
});