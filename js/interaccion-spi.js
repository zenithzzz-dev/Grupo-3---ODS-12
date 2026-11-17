document.addEventListener('DOMContentLoaded', function() {
  const btnEscanear = document.getElementById('btn-escanear');
  const areaCamara = document.getElementById('area-camara');
  const resultadoEscaneo = document.getElementById('resultado-escaneo');
  const textoTipoPlastico = document.getElementById('texto-tipo-plastico');
  const textoContenedor = document.getElementById('texto-contenedor');

  const baseDatosSPI = {
    1: { tipo: "1. PET (Botellas de bebida)", contenedor: "Plástico (limpio y sin tapa)" },
    2: { tipo: "2. HDPE (Envases de leche/detergente)", contenedor: "Plástico" },
    3: { tipo: "3. PVC (Tuberías, cables)", contenedor: "Punto de acopio especializado" },
    4: { tipo: "4. LDPE (Bolsas plásticas)", contenedor: "Plástico" },
    5: { tipo: "5. PP (Envases de comida, tapas)", contenedor: "Plástico" },
    6: { tipo: "6. PS (Tecnopor, cubiertos desechables)", contenedor: "Basura general (No reciclable en casa)" },
    7: { tipo: "7. OTROS (Mezclas de plásticos)", contenedor: "Punto de acopio especializado" }
  };

  if(btnEscanear) {
    btnEscanear.addEventListener('click', function() {
      // Estado visual: simulamos que la cámara se activa
      areaCamara.innerHTML = "<p><em>Escaneando símbolo SPI...</em></p>";
      areaCamara.style.backgroundColor = "var(--borde)";
      resultadoEscaneo.style.display = "none"; 
      btnEscanear.disabled = true;
      btnEscanear.textContent = "Procesando...";

      // Simular 2 segundos de lectura
      setTimeout(function() {
        const plasticoDetectado = 1; // Simulación de detección PET
        const datos = baseDatosSPI[plasticoDetectado];

        // Mostrar resultados
        areaCamara.innerHTML = "<p>¡Escaneo exitoso!</p>";
        areaCamara.style.backgroundColor = "var(--fondo)";
        
        textoTipoPlastico.textContent = "SPI " + datos.tipo;
        textoContenedor.textContent = "Contenedor: " + datos.contenedor;
        
        resultadoEscaneo.style.display = "block";
        btnEscanear.disabled = false;
        btnEscanear.textContent = "Escanear de nuevo";
        
      }, 2000); 
    });
  }
});