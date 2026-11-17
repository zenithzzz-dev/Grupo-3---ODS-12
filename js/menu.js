// PASO 1. DOM: localizar los elementos del HTML usando sus identificadores.
const botonMenu = document.querySelector('#boton-menu');
const navegacion = document.querySelector('#navegacion');
const textoMenu = document.querySelector('#texto-menu');
const submenu = document.querySelector('#resolver');

// PASO 2. Usar exactamente el mismo límite que la media query del CSS.
const pantallaMovil = window.matchMedia('(max-width: 600px)');

// PASO 3. Una función concentra los cambios para abrir o cerrar el menú.
function cambiarMenu(abrir) {
  // En escritorio, la navegación siempre está visible.
  navegacion.hidden = pantallaMovil.matches && !abrir;
  botonMenu.setAttribute('aria-expanded', String(abrir));
  botonMenu.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
  textoMenu.textContent = abrir ? 'Cerrar' : 'Menú';

  // Si cerramos el menú principal, cerramos también Resolver.
  if (!abrir) {
    submenu.open = false;
  }
}

// PASO 4. Evento clic: invertir el estado del botón.
botonMenu.addEventListener('click', function () {
  const estaAbierto = botonMenu.getAttribute('aria-expanded') === 'true';
  cambiarMenu(!estaAbierto);
});

// PASO 5. Cerrar el menú al seleccionar cualquiera de sus enlaces.
navegacion.addEventListener('click', function (evento) {
  const enlace = evento.target.closest('a');
  if (!enlace) return;

  cambiarMenu(false);

  // Llevar el foco al destino. El enlace conserva su navegación normal.
  const ruta = enlace.getAttribute('href');
  const destino = ruta.startsWith('#') ? document.querySelector(ruta) : null;
  if (destino) {
    destino.focus({ preventScroll: true });
  }
});

// La marca también regresa al inicio y cierra la navegación.
document.querySelector('.marca').addEventListener('click', function () {
  cambiarMenu(false);
  const inicio = document.querySelector('#inicio');
  if (inicio) inicio.focus({ preventScroll: true });
});

// PASO 6. Escape cierra el menú móvil y devuelve el foco al botón.
document.addEventListener('keydown', function (evento) {
  if (evento.key !== 'Escape') return;

  if (pantallaMovil.matches && !navegacion.hidden) {
    cambiarMenu(false);
    botonMenu.focus();
  } else if (submenu.open) {
    // En escritorio solo se cierra el desplegable Resolver.
    submenu.open = false;
    submenu.querySelector('summary').focus();
  }
});

// PASO 7. Evitar estados incorrectos al pasar de celular a escritorio.
function ajustarPantalla() {
  const focoEstabaEnNavegacion = navegacion.contains(document.activeElement);
  const focoEstabaEnBoton = document.activeElement === botonMenu;
  cambiarMenu(false);

  if (pantallaMovil.matches && focoEstabaEnNavegacion) {
    botonMenu.focus();
  } else if (!pantallaMovil.matches && focoEstabaEnBoton) {
    navegacion.querySelector('a').focus();
  }
}
pantallaMovil.addEventListener('change', ajustarPantalla);

// PASO 8. Estado inicial: cerrado en celular y visible en escritorio.
ajustarPantalla();