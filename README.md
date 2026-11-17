# SCRAPP - Economía Circular

Un dashboard web interactivo diseñado para empoderar a los ciudadanos en el seguimiento de su impacto ambiental, promover el reciclaje responsable y visibilizar puntos de acopio, alineado con el **ODS 12: Producción y Consumo Responsables**.

## Características Principales

*   **Dashboard de Impacto Ambiental:** Panel de control que calcula en tiempo real los kilogramos de plástico reciclado, el CO₂ evitado y los envases salvados.
*   **Escáner de Código SPI (Simulador):** Una herramienta interactiva que permite a los usuarios "escanear" el símbolo de reciclaje de los plásticos para recibir instrucciones precisas sobre cómo desecharlos.
*   **Mapa Real de Puntos de Acopio:** Integración con Leaflet.js para ubicar centros de reciclaje cercanos, permitiendo filtrar por el tipo de plástico que aceptan (PET, HDPE, PVC, etc.).
*   **Sistema de Gamificación:** Otorgamiento automático de insignias (Héroe del Reciclaje, Campeón ODS 12) a medida que el usuario registra nuevos depósitos y alcanza metas en kilogramos.
*   **Diseño Responsivo:** Interfaz adaptable a dispositivos móviles, tablets y escritorio, incluyendo un menú de navegación tipo hamburguesa.

## Tecnologías Utilizadas

*   **HTML5 & CSS3:** Estructura semántica y diseño con variables de color, grid/flexbox y diseño responsivo.
*   **JavaScript (Vanilla):** Lógica del DOM, cálculos de impacto, interacción del menú y simulador del escáner.
*   **Leaflet.js:** Biblioteca Open Source para la renderización del mapa interactivo y los marcadores de geolocalización.

## Estructura del Proyecto

```text
/
├── index_3.html         # Archivo principal de la aplicación
├── css/
│   └── estilos_3.css    # Hoja de estilos principal
├── js/
│   ├── acopio.js        # Lógica del mapa de puntos de acopio (Leaflet)
│   ├── impacto.js       # Cálculos de KPIs y sistema de insignias
│   ├── interaccion-spi.js # Simulador de lectura de códigos de plástico
│   └── menu.js          # Control de estado y accesibilidad del menú móvil
└── README.md            # Documentación del proyecto