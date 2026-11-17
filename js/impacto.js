// =============================================================================
// HISTORIA DE USUARIO HU-003: Registro de plástico e impacto ambiental (ODS 12)
// =============================================================================

// 1. SELECCIÓN DE ELEMENTOS DEL DOM
const inputPeso = document.getElementById('input-peso');
const btnConfirmar = document.getElementById('btn-confirmar');

const kpiTotalKg = document.getElementById('kpi-total-kg');
const kpiCo2 = document.getElementById('kpi-co2');
const kpiEnvases = document.getElementById('kpi-envases');

const contenedorInsignias = document.getElementById('contenedor-insignias');
const textoSinInsignias = document.getElementById('sin-insignias');

// 2. ESTADO Y FACTORES DE CONVERSIÓN
let acumuladoKg = 0;
const insigniasDesbloqueadas = new Set(); 

const FACTOR_CO2 = 1.5; 
const FACTOR_ENVASES = 30;

const HITOS = [
  { id: 'heroe-5kg', minKg: 5, titulo: '🌱 Héroe del Reciclaje (5 kg)' },
  { id: 'campeon-20kg', minKg: 20, titulo: '♻️ Campeón ODS 12 (20 kg)' },
  { id: 'guardian-50kg', minKg: 50, titulo: '🌍 Guardián del Planeta (50 kg)' }
];

// 3. ESCUCHA DE EVENTOS (CA-01)
btnConfirmar.addEventListener('click', function () {
  const pesoIngresado = parseFloat(inputPeso.value);

  // Validación de entrada
  if (isNaN(pesoIngresado) || pesoIngresado <= 0) {
    alert('Por favor, ingresa una cantidad válida y mayor a 0 en kilogramos.');
    inputPeso.focus();
    return;
  }

  // Sumar al total
  acumuladoKg += pesoIngresado;

  // Actualizar la interfaz
  actualizarMetricas();
  verificarInsignias();

  // Limpiar el input
  inputPeso.value = '';
  inputPeso.focus();
});

// 4. FUNCIONES DE ACTUALIZACIÓN Y LÓGICA

// Actualiza los indicadores en pantalla (CA-02)
function actualizarMetricas() {
  const co2Evitado = acumuladoKg * FACTOR_CO2;
  const envasesSalvados = Math.floor(acumuladoKg * FACTOR_ENVASES);

  kpiTotalKg.textContent = acumuladoKg.toFixed(2);
  kpiCo2.textContent = co2Evitado.toFixed(2);
  kpiEnvases.textContent = envasesSalvados.toLocaleString('es-ES');
}

// Verifica y otorga nuevas insignias (CA-03)
function verificarInsignias() {
  HITOS.forEach(function (hito) {
    if (acumuladoKg >= hito.minKg && !insigniasDesbloqueadas.has(hito.id)) {
      otorgarInsignia(hito);
    }
  });
}

// Crea visualmente la insignia en el HTML
function otorgarInsignia(hito) {
  insigniasDesbloqueadas.add(hito.id);

  // Ocultar mensaje de "sin insignias"
  if (textoSinInsignias) {
    textoSinInsignias.style.display = 'none';
  }

  // Crear y diseñar la nueva insignia
  const nuevaInsignia = document.createElement('span');
  nuevaInsignia.textContent = hito.titulo;
  nuevaInsignia.style.cssText = 'display: inline-block; background: #87402e; color: #ffffff; padding: 0.4rem 0.8rem; border-radius: 20px; font-size: 0.85rem; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.15);';

  // Insertar en la página
  contenedorInsignias.appendChild(nuevaInsignia);
}