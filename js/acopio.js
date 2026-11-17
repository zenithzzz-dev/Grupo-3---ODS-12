// =============================================================================
// MÓDULO PUNTOS DE ACOPIO - MAPA REAL CON LEAFLET (ODS 12)
// =============================================================================

const DATOS_PUNTOS = [
  {
    id: '1',
    nombre: 'Centro Eco Miraflores',
    direccion: 'Av. José Larco 770, Miraflores',
    distancia: '0.8 km',
    horario: '8:00 - 18:00',
    aceptaSPI: [1, 2, 5],
    lat: -12.1265,
    lng: -77.0298,
    linkGoogleMaps: 'https://maps.google.com/?q=-12.1265,-77.0298'
  },
  {
    id: '2',
    nombre: 'Punto Verde San Isidro',
    direccion: 'Av. Rivera Navarrete 450, San Isidro',
    distancia: '1.4 km',
    horario: '9:00 - 17:00',
    aceptaSPI: [1, 3, 4],
    lat: -12.0945,
    lng: -77.0268,
    linkGoogleMaps: 'https://maps.google.com/?q=-12.0945,-77.0268'
  },
  {
    id: '3',
    nombre: 'Estación Recicla Surco',
    direccion: 'Av. Caminos del Inca 1200, Santiago de Surco',
    distancia: '2.1 km',
    horario: '8:30 - 19:00',
    aceptaSPI: [2, 4, 5],
    lat: -12.1380,
    lng: -76.9930,
    linkGoogleMaps: 'https://maps.google.com/?q=-12.1380,-76.9930'
  }
];

let map = null;
let marcadoresMap = {};
let filtroActual = 'todos';
let puntoSeleccionadoId = '1';

document.addEventListener('DOMContentLoaded', function () {
  inicializarMapaReal();

  const contenedorLista = document.getElementById('lista-puntos');
  const chipsFiltro = document.querySelectorAll('.chip-spi');

  renderizarPuntos();

  // Escuchar clics en los filtros de plástico SPI
  chipsFiltro.forEach(chip => {
    chip.addEventListener('click', function () {
      chipsFiltro.forEach(c => c.classList.remove('activo'));
      this.classList.add('activo');

      filtroActual = this.getAttribute('data-spi');
      renderizarPuntos();
    });
  });

  function inicializarMapaReal() {
    // Centrar mapa en Miraflores / San Isidro
    map = L.map('mapa-real').setView([-12.1150, -77.0150], 13);

    // Cargar capas de calles reales desde OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap | SCRAPP ODS 12'
    }).addTo(map);

    // Definir icono personalizado verde para los marcadores
    const iconoVerde = L.divIcon({
      className: 'marcador-custom-verde',
      html: `<div style="background-color: #17573A; border: 3px solid #FFB020; width: 24px; height: 24px; border-radius: 50%; box-shadow: 0 3px 6px rgba(0,0,0,0.3);"></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    // Crear marcadores reales en el mapa
    DATOS_PUNTOS.forEach(punto => {
      const marker = L.marker([punto.lat, punto.lng], { icon: iconoVerde }).addTo(map);

      // Popup informativo al hacer clic en el pin del mapa
      marker.bindPopup(`
        <div style="font-family: 'Nunito Sans', sans-serif; font-size: 13px;">
          <strong style="color: #17573A; font-size: 14px;">${punto.nombre}</strong><br>
          📍 ${punto.direccion}<br>
          🕒 ${punto.horario}<br>
          <a href="${punto.linkGoogleMaps}" target="_blank" style="display:inline-block; margin-top: 5px; color: #17573A; font-weight: bold;">Cómo llegar ➔</a>
        </div>
      `);

      marker.on('click', function () {
        seleccionarPunto(punto.id);
      });

      marcadoresMap[punto.id] = marker;
    });
  }

  function renderizarPuntos() {
    contenedorLista.innerHTML = '';

    const puntosFiltrados = DATOS_PUNTOS.filter(p => {
      if (filtroActual === 'todos') return true;
      return p.aceptaSPI.includes(parseInt(filtroActual));
    });

    if (puntosFiltrados.length === 0) {
      contenedorLista.innerHTML = '<p style="font-size: 14px; color: #666; padding: 1rem;">No hay puntos de acopio para este plástico.</p>';
    }

    puntosFiltrados.forEach(punto => {
      const tarjeta = document.createElement('article');
      tarjeta.className = `tarjeta-punto ${punto.id === puntoSeleccionadoId ? 'seleccionada' : ''}`;
      
      const tagsSPIHTML = punto.aceptaSPI.map(spi => `<span class="tag-spi">SPI ${spi}</span>`).join('');

      tarjeta.innerHTML = `
        <h3>${punto.nombre}</h3>
        <p>📍 ${punto.direccion} · <strong>${punto.distancia}</strong></p>
        <p>🕒 ${punto.horario}</p>
        <div class="etiquetas-recibe">
          ${tagsSPIHTML}
        </div>
        <button type="button" class="btn-como-llegar" onclick="abrirMapa('${punto.linkGoogleMaps}')">Cómo llegar</button>
      `;

      tarjeta.addEventListener('click', function (e) {
        if (e.target.tagName === 'BUTTON') return;
        seleccionarPunto(punto.id);
      });

      contenedorLista.appendChild(tarjeta);
    });

    actualizarMarcadoresVisibilidad(puntosFiltrados);
  }

  function seleccionarPunto(id) {
    puntoSeleccionadoId = id;
    renderizarPuntos();

    const punto = DATOS_PUNTOS.find(p => p.id === id);
    if (punto && map) {
      // Centrar y hacer zoom suave en la ubicación seleccionada
      map.flyTo([punto.lat, punto.lng], 15, { duration: 1.2 });
      if (marcadoresMap[id]) {
        marcadoresMap[id].openPopup();
      }
    }
  }

  function actualizarMarcadoresVisibilidad(puntosVisibles) {
    const idsVisibles = puntosVisibles.map(p => p.id);

    DATOS_PUNTOS.forEach(punto => {
      const marker = marcadoresMap[punto.id];
      if (marker) {
        if (idsVisibles.includes(punto.id)) {
          marker.addTo(map);
        } else {
          map.removeLayer(marker);
        }
      }
    });
  }
});

function abrirMapa(url) {
  window.open(url, '_blank', 'noopener,noreferrer');
}