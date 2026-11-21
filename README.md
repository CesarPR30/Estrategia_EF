# Estrategia EF

Web estática para estudiar el **Examen Final de Estrategia y Organización** (semana 16): teoría, cómo resolver un caso, práctica, simulacro y simulador de notas. Funciona sin conexión y se puede instalar como app (PWA).

## Secciones

| Sección | Contenido |
|---|---|
| **Teoría** | 10 temas basados en las clases S9–S15 (los temas S1–S7 se reconstruyen solo con lo que muestran S12 y S15), diagramas SVG, 17 fichas resumen y un quiz corto por tema. |
| **Cómo resolver un caso** | Guía de lectura, estructura de respuesta, mapa de decisión (qué herramienta según la pregunta), receta + trampas + ejemplo resuelto por herramienta, banco de frases y errores que restan puntos. |
| **Práctica** | 22 casos completos con respuesta modelo y rúbrica sobre 20 · 51 ejercicios por herramienta · 3 generadores con autograder (BSC ponderado, matriz de riesgos, margen de negociación/MAPAN) · 110 preguntas para marcar. |
| **Simulacro** | 1 o 2 casos al azar, temporizador configurable (120 min por defecto), autocorrección con rúbrica, desglose por criterio y por herramienta, historial. |
| **Notas** | EC1 5 %, EC2 5 %, PC1 20 %, PC2 20 %, EP 25 %, EF 25 %. Puntos asegurados, promedio necesario, EF necesario y nota máxima posible. |

El progreso, los borradores, las autocorrecciones y las notas se guardan en `localStorage` del dispositivo.

## Estructura

```
index.html            # página única con pestañas (sin build)
css/styles.css        # tema claro/oscuro con variables CSS
js/app.js             # rutas, almacenamiento y vistas
js/svg.js             # diagramas SVG con colores del tema
js/gen.js             # generadores + autograder (también corre en Node)
js/data/*.js          # teoría, fichas, casos, ejercicios y preguntas
sw.js                 # service worker (caché versionado)
manifest.webmanifest  # PWA
icons/                # íconos PNG
```

## Publicar en GitHub Pages

1. En el repositorio: **Settings → Pages**.
2. En *Build and deployment*, elige **Deploy from a branch**, rama **main** y carpeta **/ (root)**. Guarda.
3. Espera 1–2 minutos. La web queda en `https://<usuario>.github.io/Estrategia_EF/`.

Al cambiar archivos, sube `CACHE_VERSION` en `sw.js` para que los dispositivos descarguen la versión nueva.

## Instalar en iPhone o iPad

1. Abre la URL en **Safari**.
2. Toca **Compartir** (cuadro con flecha) → **Agregar a pantalla de inicio** → **Agregar**.
3. Ábrela una vez con conexión; luego funciona sin internet.

## Probar en local

```
python -m http.server 8000
```

y abre `http://localhost:8000`. (El service worker necesita `http://`, no `file://`.)
