/* Temas del curso. Fuente: clases S9–S15 (carpeta clases/). Los temas S1–S7 se reconstruyen SOLO con lo que muestran S12 y S15 (repaso integrador). */
window.TEMAS = [
{
 id:'t1', n:1, titulo:'Identidad estratégica: 5P de Mintzberg', clases:'S1 (repasada en S15 · Parada 1)', fuente:'repaso',
 herramientas:['mintzberg'],
 preguntasCaso:['¿Cuál es la estrategia real de la empresa y coincide con la que planeó?','¿La decisión X fue deliberada o emergente? Da evidencia.','¿Qué brecha hay entre lo que la empresa dice (plan) y lo que hace (pauta)?'],
 html:`
<div class="note warn">Tu carpeta no trae la clase S1. Este tema se arma con lo que muestra la <b>Sesión 15 (Parada 1)</b>; no se agrega nada que no esté ahí.</div>
<h3>Idea central</h3>
<p>La estrategia no es solo lo que la empresa <b>dice</b>. Las 5P de Mintzberg miran la estrategia desde cinco ángulos y sirven para <b>detectar la brecha entre lo que la empresa dice (plan) y lo que hace (pauta)</b>.</p>
${diagram('mintzberg','Las 5P tal como se usan en la Parada 1 del caso Belcorp')}
<div class="tablewrap"><table><thead><tr><th>P</th><th>Pregunta</th><th>Ejemplo Belcorp (S15)</th></tr></thead><tbody>
<tr><td><b>Plan</b></td><td>¿Qué dice que hará?</td><td>Estrategia “Belcorp 2030”, alineada a los ODS.</td></tr>
<tr><td><b>Pauta de acción</b></td><td>¿Qué ha hecho de manera consistente?</td><td>Décadas creciendo con catálogo y consultoras.</td></tr>
<tr><td><b>Posición</b></td><td>¿Dónde y frente a quién compite?</td><td>Tres marcas para tres segmentos distintos.</td></tr>
<tr><td><b>Perspectiva</b></td><td>¿Cuál es su propósito o forma de ver el mundo?</td><td>“Impulsamos belleza para lograr realización personal”.</td></tr>
<tr><td><b>Patrón / Estratagema</b></td><td>¿Qué movimiento táctico haría?</td><td>¿Qué movimiento haría hoy para retener a sus consultoras? (pregunta abierta)</td></tr>
</tbody></table></div>
<h3>Deliberada vs. emergente</h3>
<p>En S15 se pregunta: “¿la omnicanalidad de Belcorp fue una estrategia <b>deliberada</b> (planeada) o <b>emergente</b> (surgió de la respuesta a los cambios)? Den una evidencia.” La clave es <b>justificar con un hecho</b>: si la empresa lo anunció y luego lo ejecutó → deliberada; si fue reaccionando a cambios del entorno (tiendas, e-commerce) → emergente.</p>
<div class="note"><b>Criterio (S15):</b> úsala cuando quieres contrastar lo que se dice con lo que se hace. <b>Error típico:</b> describir solo el “plan”.</div>`
},
{
 id:'t2', n:2, titulo:'Análisis externo: PESTEL y 5 fuerzas', clases:'S2 (repasada en S15 · Parada 2)', fuente:'repaso',
 herramientas:['pestel','porter5'],
 preguntasCaso:['¿Qué cambió en el entorno y qué implica para la empresa?','¿Qué tan atractiva es la industria? ¿Dónde aprieta?','Clasifica estos hechos según PESTEL / según la fuerza que afectan.'],
 html:`
<div class="note warn">La clase S2 no está en tu carpeta. Se usa lo que muestra la <b>Sesión 15 (Parada 2)</b>.</div>
<h3>PESTEL: solo lo que importa</h3>
<p>Analiza factores <b>P</b>olíticos, <b>E</b>conómicos, <b>S</b>ociales, <b>T</b>ecnológicos, <b>E</b>cológicos y <b>L</b>egales del entorno. En S15 el profesor solo usa los que mueven la decisión:</p>
<ul><li><b>Social:</b> el consumidor compra cada vez más en tiendas y en línea; crece la belleza asiática.</li><li><b>Tecnológico:</b> Copecoh proyecta que el canal digital crecerá 30–40 % por encima del promedio.</li><li><b>Económico:</b> la alta informalidad laboral mantiene la oferta de personas que buscan ingresos como consultoras.</li></ul>
<h3>5 fuerzas: ¿dónde aprieta?</h3>
${diagram('porter5','Las cinco fuerzas que se evalúan en la Parada 2')}
<div class="tablewrap"><table><thead><tr><th>Fuerza</th><th>Lectura Belcorp (S15)</th></tr></thead><tbody>
<tr><td>Rivalidad</td><td>↑ tiendas especializadas y marcas asiáticas.</td></tr>
<tr><td>Nuevos entrantes</td><td>↑ unas 70 empresas asiáticas de belleza llegaron al Perú.</td></tr>
<tr><td>Sustitutos</td><td>↑ dermocosmética en farmacias.</td></tr>
<tr><td>Compradores</td><td>↑ comparan precios en línea.</td></tr>
<tr><td>Proveedores</td><td>¿Y si las consultoras fueran el “proveedor” clave?</td></tr>
</tbody></table></div>
<p>La historia Yanbal–Belcorp (demandas por “Ebel París”, cambio a L’Bel Paris) se usó para preguntar <b>qué dice sobre la intensidad de la rivalidad</b>.</p>
<h3>Datos del tablero (S15)</h3>
<ul><li>Venta directa en cosmética: de &gt;60 % a 43 % (1.er semestre 2026).</li><li>56 % de las ventas ya pasan por retail (29,6 % moderno y 26,5 % tradicional).</li><li>380 tiendas especializadas de belleza en 2024 (+60 % vs. 2023).</li><li>China: de 3 % a 19 % de las importaciones cosméticas (2019 → 2025).</li></ul>
<div class="note"><b>Criterio (S15):</b> “No hagas listas largas: elige 2 o 3 factores y escribe su implicancia (<i>por lo tanto…</i>)”. <b>Error típico:</b> listas largas sin implicancias.</div>`
},
{
 id:'t3', n:3, titulo:'Ventaja y posición: VRIO, FODA cruzado, estrategias genéricas y cadena de valor', clases:'S3–S5 (repasadas en S15 · Parada 3 y en S12 · Paso 1)', fuente:'repaso',
 herramientas:['vrio','foda','genericas','cadena'],
 preguntasCaso:['¿Con qué compite realmente la empresa? Evalúa sus recursos con VRIO.','Arma el FODA cruzado y formula el reto estratégico.','¿Qué estrategia genérica sigue cada marca/unidad? ¿Está atrapada a la mitad?','¿En qué eslabón de la cadena de valor se crea o se pierde valor?'],
 html:`
<div class="note warn">S3–S5 no están en tu carpeta. Se usa lo que muestran la <b>Sesión 15 (Parada 3)</b> y la <b>Sesión 12 (Paso 1 del BSC)</b>.</div>
<h3>VRIO</h3>
<p>Evalúa un <b>recurso o capacidad concreto</b> con cuatro preguntas: <b>V</b>alor, <b>R</b>areza, <b>I</b>nimitabilidad, <b>O</b>rganización. La última columna es la <b>implicancia</b>.</p>
<div class="tablewrap"><table><thead><tr><th>Recurso (Belcorp, S15)</th><th>V</th><th>R</th><th>I</th><th>O</th><th>Implicancia</th></tr></thead><tbody>
<tr><td>Red de +300 mil consultoras</td><td>Sí</td><td>Sí</td><td>¿?</td><td>Sí</td><td>¿Ventaja sostenible… o se debilita si el canal pierde peso?</td></tr>
<tr><td>Portafolio de 3 marcas segmentadas</td><td>Sí</td><td>Parcial</td><td>Parcial</td><td>Sí</td><td>Ventaja temporal: imitable por grandes rivales</td></tr>
<tr><td>Planta y centro de distribución en Colombia</td><td>Sí</td><td>No</td><td>No</td><td>Sí</td><td>Paridad competitiva</td></tr>
<tr><td>Capacidades digitales (tienda online, datos)</td><td>Sí</td><td>No</td><td>No</td><td>¿?</td><td>Necesaria para competir, no diferencia</td></tr>
</tbody></table></div>
<p class="muted">Lectura de la tabla de la clase: Valor + Rareza + Inimitabilidad + Organización → ventaja sostenible; si es imitable (solo V y R) → ventaja temporal; si solo es valioso → paridad competitiva.</p>
<div class="note"><b>Criterio (S15):</b> VRIO se aplica a un recurso concreto, no a “la empresa”. Y su respuesta <b>cambia cuando cambia el entorno</b> (lo que viste en PESTEL/5 fuerzas).</div>
<h3>FODA (DAFO) cruzado → reto estratégico</h3>
${diagram('foda','Cruce de factores internos y externos')}
<p>En S15: “Del DAFO al reto: <b>cruza fortaleza con amenaza</b>. ‘¿Cómo usamos la red de consultoras para competir contra el retail?’ ya es un reto estratégico.” El FODA sin cruzar es solo una lista; el cruce produce la pregunta que la estrategia debe responder.</p>
<h3>Estrategias genéricas de Porter</h3>
${diagram('genericas','Matriz de Porter tal como aparece en S12 (Paso 1 del BSC)')}
<p>Ejemplo S15: <b>L’Bel</b> diferenciación con foco en un segmento de mayor precio · <b>Ésika</b> diferenciación con alcance masivo · <b>Cyzone</b> enfoque en público joven. <b>Error típico:</b> querer ser todo para todos (el círculo rojo de la matriz).</p>
<h3>Cadena de valor</h3>
${diagram('cadena','Eslabones usados en la Parada 3 (Belcorp)')}
<p>En Belcorp, la cadena es: abastecimiento → producción (Colombia) → distribución a consultoras → <b>marketing y venta por catálogo</b> (eslabón resaltado) → servicio y recompra. La pregunta es: ¿qué eslabón se ve afectado por el cambio del entorno y dónde se crea valor?</p>`
},
{
 id:'t4', n:4, titulo:'Crecimiento: Matriz de Ansoff', clases:'S9 (clase completa)', fuente:'directa',
 herramientas:['ansoff'],
 preguntasCaso:['¿Hacia dónde debe crecer la empresa? Ubica cada iniciativa en Ansoff.','¿Qué cuadrante representa la mayor oportunidad y cómo encaja con el modelo de negocio?','Clasifica la trayectoria de la empresa (línea de tiempo) según Ansoff.'],
 html:`
<p><b>Matriz de Ansoff</b> (Igor Ansoff, Harvard Business Review, 1957): herramienta para <b>analizar y planificar las estrategias de crecimiento</b> de una empresa. Cruza productos (actuales/nuevos) con mercados (actuales/nuevos). El riesgo crece al alejarse de “actuales–actuales”.</p>
${diagram('ansoff','Las cuatro estrategias de crecimiento')}
<div class="tablewrap"><table><thead><tr><th>Estrategia</th><th>Objetivo</th><th>¿Cómo?</th><th>Es positivo cuando</th></tr></thead><tbody>
<tr><td><b>Penetración de mercados</b></td><td>Aumentar la participación de mercado (tomando de otras empresas)</td><td>Reducir precios; más promoción y distribución (publicidad, puntos de venta); adquirir operaciones de un competidor</td><td>Se busca bajo riesgo; nuevas empresas (menor inversión)</td></tr>
<tr><td><b>Desarrollo de nuevos mercados</b></td><td>Crecer tomando participación en nuevos mercados (geográficos o de producto)</td><td>Nuevo segmento de clientes, nuevo uso o necesidad, nuevo canal (de lo físico a lo digital), nueva zona geográfica, nuevo contexto institucional</td><td>Se tiene buena participación de mercado; el producto alcanzó su saturación</td></tr>
<tr><td><b>Desarrollo de nuevos productos</b></td><td>Crecer con productos nuevos en el mercado actual</td><td>Crear nueva marca o producto; usar el poder de la marca y los canales para entrar más fácilmente</td><td>Se tiene buena participación; el producto alcanzó su saturación</td></tr>
<tr><td><b>Diversificación</b></td><td>Nuevos productos en nuevos mercados</td><td>Introducir un producto nuevo en un mercado nuevo</td><td>Mayor riesgo: exige justificar recursos</td></tr>
</tbody></table></div>
<h3>Primero define qué es el mercado</h3>
<p>Ejemplo de clase: un fabricante de refrigeradoras lanza televisores. Si el mercado es “electrodomésticos/electrónica de consumo para el hogar” → <b>desarrollo de producto</b>. Si el mercado es “consumidores que compran refrigeradores” → <b>diversificación</b>. <b>La clasificación depende de cómo definas el mercado: escríbelo explícitamente.</b></p>
<h3>Ejemplo Crehana (S9)</h3>
<div class="tablewrap"><table><thead><tr><th>Año</th><th>Hito</th><th>Ansoff</th></tr></thead><tbody>
<tr><td>2015</td><td>Lanzamiento en el Perú</td><td>—</td></tr><tr><td>2018</td><td>Nuevas categorías de cursos</td><td>Desarrollo de producto / penetración de mercado</td></tr>
<tr><td>2020</td><td>Ingreso a México y Colombia</td><td>Desarrollo de mercado</td></tr><tr><td>2021</td><td>Ingreso a Argentina con productos para empresas</td><td>Diversificación</td></tr>
<tr><td>2022</td><td>Alianzas con Google for Education (para entrar a centros educativos)</td><td>Desarrollo de mercado</td></tr><tr><td>2023</td><td>Soluciones de aprendizaje a medida</td><td>Desarrollo de producto</td></tr>
</tbody></table></div>
<h3>Ejercicios de la clase</h3>
<ul><li>Netflix permite descargar series para ver sin conexión → <b>penetración de mercados</b> (mismo servicio, mismos clientes, más uso).</li><li>Platanitos abre tiendas en Bolivia con los mismos productos → <b>desarrollo de nuevos mercados</b>.</li><li>Rimac lanza un seguro para mascotas → producto nuevo para sus clientes actuales (desarrollo de producto).</li><li>Platanitos abre en Bolivia con productos “adaptados al mercado” → en la clase se marcó <b>productos actuales + mercado nuevo</b>: adaptar el mismo producto no lo convierte en un producto nuevo.</li></ul>
<div class="note"><b>Criterio (S15):</b> “Ansoff dice <b>hacia dónde</b>, Uppsala <b>a qué ritmo</b> y las alianzas <b>con quién</b>. Úsalas en ese orden.” <b>Error típico:</b> crecer sin mirar recursos.</div>
<p><b>Trabajo de la clase:</b> aplicar Ansoff a tu empresa e indicar qué cuadrante es la mayor oportunidad, sustentando cómo hace <i>match</i> con el modelo de negocio y el reto estratégico.</p>`
},
{
 id:'t5', n:5, titulo:'Internacionalización y alianzas', clases:'S9 (internacionalización) · S7 alianzas (repasada en S15)', fuente:'directa',
 herramientas:['intl'],
 preguntasCaso:['¿Cómo debería entrar la empresa al país X: exportación, franquicia o IED? Justifica.','¿Qué nivel de compromiso implica cada modo de entrada?','¿La empresa sigue el patrón Uppsala o es born global?','¿Con quién crecer? ¿Una alianza ayuda o amenaza el modelo?'],
 html:`
<h3>Etapas de internacionalización (Uppsala: Johanson y Vahlne, 1977)</h3>
<ol><li>Etapa 1 — Sin actividad exportadora regular</li><li>Etapa 2 — Exportación vía agentes independientes</li><li>Etapa 3 — Subsidiaria de ventas en el exterior</li><li>Etapa 4 — Producción en el exterior</li></ol>
${diagram('uppsala','De menor a mayor compromiso')}
<h3>Tres estrategias de entrada</h3>
<div class="tablewrap"><table><thead><tr><th>Modo</th><th>Qué es</th><th>Funciona cuando</th><th>Ejemplo de clase</th></tr></thead><tbody>
<tr><td><b>Exportación</b></td><td>Vender desde la base local a mercados extranjeros, directo o vía agentes/distribuidores. La forma más ligera en activos; paso inicial en los modelos de proceso.</td><td>Se busca rapidez; se toleran pocos costos fijos; productos estandarizados; el servicio posventa puede externalizarse.</td><td>Anntarah</td></tr>
<tr><td><b>Licencias y franquicias</b></td><td>Cesión contractual del derecho de uso de la propiedad intelectual (licencias) o del formato completo de negocio (franquicias) a cambio de regalías o tarifas. Crece rápido con baja inversión; <b>se sacrifica control a cambio de velocidad</b>.</td><td>El conocimiento local del mercado es decisivo; el capital es limitado; el formato es fácilmente replicable.</td><td>McDonald’s; IKEA (inversión ~100 millones de euros; entrada a Perú prevista para 2026)</td></tr>
<tr><td><b>Inversión extranjera directa</b> (subsidiarias o joint ventures)</td><td>Comprometer capital en el mercado extranjero: plantas nuevas (greenfield), adquisiciones, joint venture. Maximiza el aprendizaje y la presencia en la cadena; <b>eleva el riesgo y el tiempo de entrada</b>.</td><td>La escala, la regulación, los tiempos de entrega o el aprendizaje exigen presencia permanente.</td><td>Nestlé, DHL</td></tr>
</tbody></table></div>
<h3>El compromiso</h3>
<p><b>Compromiso</b> = la magnitud de recursos que la empresa liga <b>irreversiblemente</b> a un mercado. Retirarlos implica pérdida de valor. Depende de:</p>
<ol><li><b>Tamaño del compromiso:</b> cuántos recursos (capital, personal, tiempo directivo, infraestructura) están invertidos y no son transferibles sin pérdida. <i>Bajo:</i> Belcorp con vendedoras en 14 países (recursos recuperables); bodegas de vino, maquinaria industrial, equipamiento médico. <i>Alto:</i> Nestlé (adapta productos, produce localmente, fábricas, logística: capital “hundido”); Toyota, Unilever, L’Oréal, Siemens, Michelin, Samsung.</li>
<li><b>Grado del compromiso:</b> qué tan reconvertibles son esos recursos a otro uso o mercado (“qué tan enganchado estás”). <i>Bajo:</i> un almacén genérico; LEGO en Perú (sin planta, productos importados; solo comercialización, almacenamiento y distribución con socios). <i>Alto:</i> DHL en Perú (centros logísticos, almacenes especializados, transporte multimodal, aduanas, distribución para minería, salud…).</li></ol>
<h3>Expansión geográfica ≠ internacionalización</h3>
<p>Expansión geográfica: aumentar cobertura territorial <b>dentro o fuera</b> del país. Internacionalización: aumentarla <b>fuera</b> de los límites del país. Toda internacionalización es expansión geográfica, pero no toda expansión geográfica es internacionalización.</p>
<h3>Lo que Uppsala no explica: born global</h3>
<p>Empresas que nacen internacionales desde el día uno, sin pasar por etapas (ejemplo de clase: OpenAI). En S15: Belcorp Perú (1968) → Colombia (1985) → región → EE. UU. = <b>patrón Uppsala</b>; muchas marcas asiáticas entran directo por e-commerce y redes = <b>más cercano a born global</b>.</p>
<h3>Alianzas: ¿con quién? (S7, repasada en S15)</h3>
<p>Belcorp Ventures invierte y se asocia con empresas que aprovechan su experiencia y acceso al mercado. Pregunta de clase: ¿aliarse con cadenas de retail <b>ayuda o amenaza</b> a la red de consultoras? Joint venture como forma de IED: Grameen Danone Foods (S14).</p>
<div class="note"><b>Criterio:</b> Ansoff → hacia dónde; Uppsala/born global → a qué ritmo; alianzas → con quién. <b>Error típico:</b> crecer sin mirar recursos.</div>`
},
{
 id:'t6', n:6, titulo:'Cultura organizacional y cambio (Schein y Satir)', clases:'S10 (clase completa)', fuente:'directa',
 herramientas:['schein','satir'],
 preguntasCaso:['¿Qué sostiene culturalmente a esta organización? (artefactos, valores, supuestos)','¿En qué etapa del cambio (Satir) está y cómo se mueve emocionalmente?','¿Qué elementos culturales bloquean el cambio?','¿Qué debe hacer el líder para llevar a la organización a la integración?'],
 html:`
<p><b>Objetivo de la sesión:</b> comprender cómo la cultura y el liderazgo condicionan el cambio y <b>por qué muchos cambios fracasan aunque la estrategia técnica sea correcta</b>.</p>
<div class="tablewrap"><table><thead><tr><th>Lo que asume la mayoría de líderes</th><th>Pero realmente</th></tr></thead><tbody>
<tr><td>El cambio es un evento con inicio, fin y fases definidas</td><td>Es un proceso con fases emocionales predecibles</td></tr>
<tr><td>La resistencia es un obstáculo a superar</td><td>Es una respuesta racional a la amenaza de identidad</td></tr>
<tr><td>Si el plan es bueno, la ejecución fluye</td><td>El mejor plan no elimina el caos; lo atraviesa</td></tr>
<tr><td>El caos indica que algo salió mal</td><td>El caos es parte estructural del cambio</td></tr></tbody></table></div>
<h3>Cultura organizacional</h3>
<p>“El sistema de supuestos, valores y creencias compartidos que rigen la interacción de una organización con el entorno interno y externo” (Stafford y Miles, 2013). Influye en el comportamiento con clientes y proveedores, en la motivación y en la <b>capacidad de reaccionar y cambiar</b>.</p>
${diagram('schein','Tres niveles de la cultura (Schein)')}
<ul><li><b>Artefactos (lo que se ve):</b> oficinas, vestimenta, logotipos, certificaciones, jerga, organigrama, celebraciones.</li><li><b>Valores declarados (lo que se dice):</b> estrategias, metas, filosofías; justificaciones declaradas del comportamiento (innovación, trabajo en equipo, meritocracia…).</li><li><b>Supuestos subyacentes (lo que se cree y siente):</b> inconscientes, se dan por sentado: “el jefe siempre sabe más”, “el error debe castigarse”, “trabajar mucho demuestra compromiso”.</li></ul>
<h4>Casos de clase</h4>
<p><b>Netflix</b> (autonomía): culture deck público; sin política de vacaciones; política de gastos “actúa en el mejor interés de Netflix”; <i>Keeper Test</i>. Supuestos: las personas talentosas trabajan mejor con libertad; los adultos se autogestionan; la burocracia reduce innovación; “somos un equipo profesional, no una familia” (frente a supuestos tradicionales: la gente necesita control, procedimientos escritos, estabilidad laboral).</p>
<p><b>Amazon</b> (ágil): artefacto <i>two-pizza team</i> (equipo con todos los recursos, orientado a resultados); valores “Day 1 culture” (obsesión por clientes, decisiones rápidas y de calidad, adoptar tendencias externas). Supuestos: el cambio es constante (todo es beta), el error es aprendizaje (fail fast), las organizaciones tienden a burocratizarse.</p>
${diagram('iceberg','La necesidad de coherencia: lo visible descansa sobre los supuestos')}
<p><b>¿Por dónde empiezo un cambio?</b> La clase plantea la necesidad de <b>coherencia</b> entre artefactos, valores y supuestos. En S15: “El cambio rara vez falla en los artefactos (una app nueva). <b>Falla cuando choca con los supuestos básicos</b>.”</p>
<h3>Modelo de cambio de Satir</h3>
${diagram('satir','Desempeño en el tiempo durante el cambio')}
<ol><li><b>Status quo tardío:</b> la organización funciona con sus reglas conocidas.</li><li><b>Resistencia:</b> aparece un <b>elemento externo</b> que desafía el statu quo.</li><li><b>Caos:</b> las reglas viejas ya no funcionan y las nuevas no existen; cae la productividad y sube el miedo. Normalmente se interpreta como fracaso.</li><li><b>Integración:</b> tras una <b>idea transformadora</b>, se adoptan nuevas prácticas y el desempeño sube.</li><li><b>Nuevo status quo:</b> desempeño estable y mayor.</li></ol>
<p><b>Rol del líder en el caos:</b> sostener la tensión sin resolverla prematuramente; dar sentido al caos como parte del proceso; proteger el espacio para que emerja el insight.</p>
<h3>¿Cómo diseñar un proceso de cambio? (S10)</h3>
<ol><li><b>Identificar qué está “doliendo”</b> (síntomas: resistencia, caída de productividad, conflictos, baja adopción tecnológica, lentitud, alta rotación, falta de coordinación, burnout).</li><li><b>Entender la cultura</b> (artefactos, valores, supuestos).</li><li><b>Diagnosticar el estadio del cambio</b> (Satir).</li><li><b>Identificar qué elementos culturales bloquean</b> el cambio.</li><li><b>Diseñar intervenciones</b>: qué cambiar en artefactos, valores y supuestos, y cómo ayudar a las personas a cambiar esos supuestos.</li></ol>
<div class="note"><b>Criterio (S15):</b> úsala cuando la estrategia exige cambiar conductas. <b>Error típico:</b> cambiar artefactos y no supuestos.</div>`
},
{
 id:'t7', n:7, titulo:'Liderazgo y negociación (Harvard, MAPAN)', clases:'S11 (clase completa)', fuente:'directa',
 herramientas:['liderazgo','harvard'],
 preguntasCaso:['¿Qué tipo de liderazgo (architect, bridger, catalyst) necesita la empresa?','Analiza la negociación: posiciones vs. intereses, opciones, criterios, MAPAN.','¿Cuál es la MAPAN de cada parte y hay margen de acuerdo?','Propón opciones de beneficio mutuo para el conflicto.'],
 html:`
<h3>El nuevo líder: de establecer una visión a cocrear el futuro con los demás</h3>
${diagram('lideres','Architect, Bridger y Catalyst')}
<ul><li><b>Architect:</b> construye la cultura y capacidades para que las personas colaboren, experimenten y aprendan. “Genio colectivo”, liberar el talento, enfoque en el potencial (lo que <i>podrían</i> hacer).</li><li><b>Bridger:</b> las organizaciones no tienen todo el talento ni herramientas para innovar rápido; actúa como <b>puente entre el interior y el exterior</b> (otras empresas, proveedores) para obtener talento y tecnología.</li><li><b>Catalyst:</b> acelera la cocreación en <b>todo el ecosistema</b>; ambición sistémica de cambiar una industria, un país o un continente.</li></ul>
<p>Otras habilidades: hacer crecer a las personas del equipo; estar en <i>learning mode</i>; <b>coraje</b> (empujar una visión, no pensar siempre en el corto plazo, tomar riesgos con las personas, hacer lo correcto, integridad, <i>speak truth to power</i>).</p>
<h3>Negociación: método de Harvard (Fisher, Ury y Patton)</h3>
<div class="tablewrap"><table><thead><tr><th>Lógica posicional</th><th>Lógica por principios</th></tr></thead><tbody>
<tr><td>Cada actor llega con una demanda; competencia de concesiones. Foco: quién gana más. Pregunta: <i>¿quién cede y cuánto?</i></td><td>Las posiciones son la manifestación superficial de intereses más profundos. Pregunta: <i>¿qué necesidades intentamos satisfacer y cómo hacerlo de la mejor manera?</i></td></tr>
<tr><td>Arrendador pide +20 %, inquilino ofrece +5 %; regateo hasta 12–13 %.</td><td>Arrendador quiere previsibilidad y evitar local vacío; inquilino necesita bajar su costo sin perder la ubicación → incremento menor con renovación a 3 años, o renta variable indexada a ventas.</td></tr></tbody></table></div>
${diagram('harvard','Los cuatro pilares del método')}
<ol><li><b>Separa a las personas del problema:</b> ataca el problema, no a la persona; escucha activa; reconoce las emociones sin que dominen.</li><li><b>Intereses, no posiciones:</b> posición = lo que alguien dice que quiere; interés = <b>por qué</b> lo quiere. Preguntas: ¿por qué?, ¿por qué no?, ¿qué necesidad sostiene esta postura? (Disputa por la ventana: aire fresco vs. evitar corriente → abrir la ventana de otra habitación.)</li><li><b>Opciones de beneficio mutuo:</b> lluvia de ideas; separar inventar de decidir; crear valor, no solo repartir; aprovechar diferencias de intereses, valores, recursos o pronósticos. (Generar opciones: empatizar —divergente, búsqueda de información— y definir —convergente, definición de la oportunidad.)</li><li><b>Criterios objetivos:</b> valor de mercado, precedentes, normativas, evaluación de expertos, criterios técnicos; tener una <b>MAPAN</b> para evaluar soluciones.</li></ol>
<h3>MAPAN / BATNA</h3>
<p><b>Mejor Alternativa a un Acuerdo Negociado.</b> Es la mejor opción disponible si no hay acuerdo; <b>define el punto a partir del cual conviene retirarse</b>. El poder negociador depende de lo atractivo que sea para la otra parte no llegar a un acuerdo. Hay que <b>estimar la MAPAN probable de la otra parte</b> para ver el margen de negociación.</p>
<p><b>Cómo crearla:</b> (1) generar ideas de qué haríamos si no hay acuerdo; (2) mejorar las alternativas y ver cuáles son más deseables; (3) seleccionar la mejor: <b>esa es la medida frente a la cual juzgar</b> cualquier oferta.</p>
<p><b>Casa de los Flores:</b> compraron a 1,3 millones, aspiran a 2 millones, fijaron un mínimo <i>arbitrario</i> de 1,6 millones y tienen una oferta “final” de 1,4 millones. No deben compararla con el mínimo arbitrario sino con su MAPAN: mantenerla en venta, alquilarla, derribarla y vender el solar, o cederla a cambio de mantenimiento.</p>
${diagram('margen','Caso Forma Studio – Raíz: retiro de Forma = S/ 4 000 (su MAPAN con el cliente de tecnología, mayor que su costo de S/ 3 200); máximo de Raíz = S/ 4 500 (su presupuesto)',4000,4500)}
<p><b>Limitaciones del modelo:</b> supone actores racionales con tiempo y recursos; falla con mala fe o con quien no piensa en intereses; ignora asimetrías de poder estructural; los “criterios objetivos” pueden naturalizar estándares de actores dominantes.</p>
<p><b>Escucha activa:</b> confirmar lo que creemos que el otro dijo y quiso decir observando señales verbales y no verbales, para comprender cómo percibe el problema antes de persuadir.</p>
<div class="note"><b>Criterio (S15):</b> úsala cuando hay intereses en conflicto. <b>Error típico:</b> negociar posiciones.</div>`
},
{
 id:'t8', n:8, titulo:'Control estratégico: Balanced Scorecard y matriz de riesgos', clases:'S12 (clase completa)', fuente:'directa',
 herramientas:['bsc','riesgos'],
 preguntasCaso:['Formula un objetivo SMART, KPI y meta por cada perspectiva del BSC.','Calcula el cumplimiento ponderado y el semáforo.','Propón indicadores lag y lead.','Identifica 2 riesgos, ubícalos en la matriz y propone mitigación.'],
 html:`
<p>“Lo que no se mide, no se controla, y lo que no se controla, no se puede mejorar.” La estrategia no solo se diseña: se monitorea y ajusta. Kaplan y Norton (1996) vieron que medir solo con estados financieros no bastaba (“conducir mirando el espejo retrovisor”) y ampliaron a <b>4 perspectivas</b>.</p>
${diagram('bscmap','Mapa estratégico: la visión y estrategia al centro')}
<div class="tablewrap"><table><thead><tr><th>Perspectiva</th><th>Pregunta</th><th>Ejemplos de medida</th></tr></thead><tbody>
<tr><td>Financiera</td><td>¿Cómo nos ven los accionistas?</td><td>ROI, crecimiento de ingresos, control de costos, rentabilidad</td></tr>
<tr><td>Cliente</td><td>¿Cómo nos ven nuestros clientes?</td><td>Satisfacción, retención, adquisición, valor percibido</td></tr>
<tr><td>Procesos internos</td><td>¿En qué debemos ser excelentes?</td><td>Calidad, eficiencia, cumplimiento de tiempos estándar</td></tr>
<tr><td>Aprendizaje y crecimiento</td><td>¿Podemos seguir mejorando y creando valor?</td><td>Capacitación, capacidades, clima</td></tr></tbody></table></div>
${diagram('laglead','Indicadores que trabajan en complemento')}
<p>“Sin lead indicators no sabemos <b>cómo mover la aguja</b>. Sin lag indicators no sabemos <b>si tuvimos éxito</b>.” S15: “Un KPI sin indicador lead es una promesa, no una estrategia.”</p>
<h3>Pasos para desarrollar el BSC (S12)</h3>
<ol><li><b>Definir metas estratégicas de largo plazo:</b> desde misión, visión y valores + FODA, matriz de Porter, Ansoff y estrategias de internacionalización.</li><li><b>Formular objetivos estratégicos SMART</b> (específico, medible, alcanzable, realista, con tiempo) por perspectiva, coherentes con la misión. Ej.: OE1 “Aumentar el margen operativo en 15 % en 2 años”; OE3 “Reducir los tiempos de entrega en 20 %”.</li><li><b>Definir indicadores (KPI) y metas</b>, luego <b>pesos y responsables</b>. Ej.: Financiera 45 % (Finanzas), Clientes 20 % (Ventas y Marketing), Procesos 20 % (Operaciones), Aprendizaje 15 % (RR. HH.) → suman 100 %.</li><li><b>Asignar indicadores visuales (semáforo):</b> % de cumplimiento <b>85–100 verde · 70–84 amarillo · 0–69 rojo</b>.</li><li><b>Identificar y gestionar riesgos estratégicos</b> (matriz de riesgos).</li></ol>
<h3>Cálculo (Excel de la clase)</h3>
<p><b>% cumplimiento</b> = Actual ÷ Meta · <b>Puntos</b> = Peso × % · <b>Total</b> = Σ puntos. Ejemplo de la clase: EBITDA meta 22 %, actual 10 % → 45 %; peso 15 → 6,82 puntos. Subtotales: Financiera 28,10/45 · Clientes 16,67/20 · Procesos 16,95/20 · Aprendizaje 12,20/15 → <b>total 73,9</b> (amarillo según la regla del Paso 4).</p>
<div class="note warn"><b>Ojo con el semáforo:</b> en el Excel de la lámina 30 los íconos parecen usar cortes más estrictos (p. ej., 89 % aparece en amarillo y 78 % en rojo). En esta web se usa la regla escrita del <b>Paso 4</b> (85/70). En el examen, <b>escribe siempre qué regla usas</b>.</div>
<div class="note"><b>Convención de esta web</b> (la clase no lo muestra): para indicadores donde <i>menor es mejor</i> (días de entrega, rotación), % = Meta ÷ Actual; y el cumplimiento tiene tope de 100 %.</div>
<h3>Matriz de riesgos (Paso 5)</h3>
<ol><li>Identificar riesgos (¿qué podría afectar los objetivos? ciberataques, rotación, inflación).</li><li>Evaluar probabilidad (1–3) e impacto (1–3).</li><li>Ubicar en la matriz (verde, amarillo, rojo).</li><li>Definir mitigación y contingencia.</li><li>Asignar responsables y revisar periódicamente.</li></ol>
${diagram('riesgos','Niveles según la matriz de la lámina 26 (P × I)')}
<p>Después, cada riesgo se integra al BSC según la perspectiva que afecta: aumento de costos (Financiera → contratos a largo plazo, fondo de reserva), pérdida de clientes clave (Clientes → diversificación, fidelización), fallos logísticos (Procesos → proveedores alternos, automatización), rotación (Aprendizaje → plan de retención y sucesión).</p>
<div class="note"><b>Criterio (S15):</b> úsalo para convertir la estrategia en metas e impacto. <b>Error típico:</b> medir solo resultados (lag).</div>`
},
{
 id:'t9', n:9, titulo:'Sostenibilidad: niveles (Dyllick y Muff), arquetipos (Bocken) y valor compartido', clases:'S14 (clase completa) · S13 CSV (repasada en S15)', fuente:'directa',
 herramientas:['bst','bocken'],
 preguntasCaso:['¿En qué nivel de sostenibilidad (BAU, 1.0, 2.0, 3.0) está la empresa? Justifica con piensa/hace/prueba.','¿La empresa mira inside-out u outside-in?','¿Qué arquetipo(s) de Bocken podría aplicar y qué eslabón del modelo de negocio cambia?','¿Esto es RSE o valor compartido (CSV)?'],
 html:`
<p><b>Desarrollo sostenible</b>: “satisface las necesidades del presente sin comprometer la capacidad de las generaciones futuras para satisfacer las suyas” (Informe Brundtland, 1987). <b>Perspectiva embedded</b> (Giddings, 2002): la economía está dentro de la sociedad, y esta dentro de un ambiente saludable.</p>
${diagram('embedded','Perspectiva embedded')}
<p><b>ODS:</b> 195 países, 17 objetivos, 169 metas, 231 indicadores; <b>no vinculantes</b>. <b>La gran desconexión:</b> progreso micro (las empresas reportan menos costos, menos riesgo y mejor reputación) vs. deterioro macro (los indicadores del planeta no mejoran). Se mide el valor para la empresa, no el aporte al planeta.</p>
<h3>Tres niveles de sostenibilidad (Dyllick y Muff, 2016)</h3>
${diagram('dyllick','Del business as usual al 3.0')}
<div class="tablewrap"><table><thead><tr><th>Paso</th><th>Piensa</th><th>Hace</th><th>Prueba</th><th>Ejemplo de clase</th></tr></thead><tbody>
<tr><td>BAU → 1.0</td><td>“Esto me afecta”</td><td>Ajusta sus procesos</td><td>Baja costos o riesgos</td><td>Backus: desde 2018 restaura amunas (47 km, US$ 6,7 millones)</td></tr>
<tr><td>1.0 → 2.0</td><td>“Debo crear valor social y ambiental”</td><td>Mide y reporta</td><td>Cifras publicadas</td><td>Alicorp: −17 % emisiones de distribución (2024 vs. 2022), +1200 lideresas de comedores formadas, S&amp;P Sustainability Yearbook</td></tr>
<tr><td>2.0 → 3.0</td><td>“¿Qué problema puedo resolver?”</td><td>Rediseña su negocio</td><td>Gana dinero resolviéndolo</td><td>Sinba: valoriza residuos orgánicos (S/ 3 millones en ventas 2022; capacidad ×10; formaliza recicladores)</td></tr></tbody></table></div>
<p>Tipología (tabla de la clase): BAU → preocupación económica, valor al accionista, <b>inside-out</b>. BST 1.0 → preocupaciones tridimensionales, valor al accionista refinado, inside-out. BST 2.0 → tridimensional, triple resultado, inside-out. BST 3.0 → parte de los desafíos de sostenibilidad, crea valor para el bien común, <b>outside-in</b>.</p>
<h3>Inside-out vs. outside-in</h3>
<div class="tablewrap"><table><thead><tr><th>Problema</th><th>Inside-out (1.0 y 2.0): ¿cómo reduzco mi consumo y mi riesgo?</th><th>Outside-in (3.0): ¿qué puede aportar mi negocio para resolverlo?</th></tr></thead><tbody>
<tr><td>Escasez de agua</td><td>Reducir consumo y riesgo</td><td>¿Qué aporta mi negocio a resolverla?</td></tr><tr><td>Obesidad</td><td>Reformular productos para no perder ventas</td><td>Rediseñar portafolio y marketing</td></tr><tr><td>Residuos plásticos</td><td>Envase más ligero y más barato</td><td>Vender la recarga, no el envase</td></tr></tbody></table></div>
<p>Casos 3.0 de la clase: Grameen Danone Foods (yogur fortificado Shokti Doi; JV; “sin pérdidas, sin dividendos”; planeaba 50 plantas y en 2011 tenía una — muestra la dificultad de escalar), La Casa de Carlota (trabajo digno para personas con síndrome de Down), baños dignos para quienes no tienen desagüe. <b>“Una empresa no es sostenible por lo que reduce, sino por el problema que decide resolver.”</b></p>
<h3>Arquetipos de modelos de negocio sostenibles (Bocken et al., 2014)</h3>
<p>Modelo de negocio = <b>propuesta de valor</b> (¿qué ofrezco y a quién?) + <b>creación y entrega</b> (¿cómo lo produzco y hago llegar?) + <b>captura de valor</b> (¿cómo gano dinero?). Un arquetipo sostenible cambia <b>al menos uno</b> de estos eslabones. La ecoeficiencia/ecodiseño/RSE mejora procesos pero <b>no cambia la lógica del negocio</b>.</p>
${diagram('bocken','8 arquetipos en 3 familias')}
<div class="tablewrap"><table><thead><tr><th>Arquetipo</th><th>Idea</th><th>Ejemplo de clase</th></tr></thead><tbody>
<tr><td>1. Maximizar eficiencia</td><td>Más con menos materiales y energía. Riesgo: <b>efecto rebote</b> (menos recurso → más barato → más ventas → sube el consumo total). El más usado y más cercano a BST 1.0.</td><td>Manufactura lean (Toyota)</td></tr>
<tr><td>2. Crear valor del residuo</td><td>El residuo de un proceso es insumo de otro.</td><td>Siderperú: chatarra en horno eléctrico; formaliza recicladores</td></tr>
<tr><td>3. Sustituir por renovables</td><td>Recursos renovables y procesos naturales; hoy lo convencional suele ser más barato → la regulación y los incentivos deciden.</td><td>Solar en planta, tintes naturales</td></tr>
<tr><td>4. Funcionalidad, no propiedad</td><td>El cliente paga por usar o por el resultado. Rompe el vínculo ganancia–volumen.</td><td>Xerox cobra por copia; car sharing; alquiler de ropa</td></tr>
<tr><td>5. Rol de custodio</td><td>¿Viven bien quienes producen los insumos? ¿Se regenera el recurso? ¿Qué le hace el producto a quien lo consume?</td><td>FSC, Fairtrade, Natura con comunidades amazónicas</td></tr>
<tr><td>6. Fomentar la suficiencia</td><td>Reducir activamente consumo y producción (informar el uso, durar más, segunda mano, vender sin empujar, limitar el volumen). Choca con crecer en ventas.</td><td>Unilever: lavar en frío; Patagonia: segunda mano</td></tr>
<tr><td>7. Re-propósito para la sociedad</td><td>Misión antes que utilidad, ingresos propios, viable a largo plazo y misión en el negocio central: solo la <b>empresa social</b> cumple las cuatro.</td><td>Empresa social vs. ONG vs. modelo híbrido</td></tr>
<tr><td>8. Soluciones para escalar</td><td>Llevar soluciones sostenibles a gran escala (franquicias, redes) sin perder el propósito.</td><td>—</td></tr></tbody></table></div>
<div class="note">“Ningún arquetipo es sostenible por sí solo. La sostenibilidad real exige combinarlos.”</div>
<h3>RSE vs. valor compartido (S13, repasado en S15)</h3>
<p>En S15: “el <b>CSV crea valor social que también mejora la competitividad</b>”. Pregunta de clase: ¿el emprendimiento de las consultoras de Belcorp es RSE o CSV? ¿Qué KPI lead lo demostraría? Meta Belcorp 2030: impacto positivo en 3 millones de personas. <i>(La clase S13 no está en tu carpeta; usa solo esta definición.)</i></p>`
},
{
 id:'t10', n:10, titulo:'Integración: criterio por herramienta (caso Belcorp)', clases:'S15 (sesión integradora)', fuente:'directa',
 herramientas:[],
 preguntasCaso:['¿Cómo debe competir la empresa cuando su ventaja pierde peso?','Elige las herramientas que responden la pregunta y termina cada una en “por lo tanto…”.','Decide: prioriza una opción y di explícitamente qué NO harás.'],
 html:`
<div class="note"><b>“Herramienta no es criterio.”</b> La herramienta se memoriza; el criterio (cuándo sirve, cuándo no y qué decides con ella) se entrena. “El directorio no te pide un PESTEL. Te pide una decisión… para el lunes.”</div>
<h3>Reglas del gimnasio (S15)</h3>
<ol><li>Nadie levanta todas las pesas a la vez: <b>elige la herramienta que responde TU pregunta</b>.</li><li>Toda repetición termina en <b>“por lo tanto…”</b>: un análisis sin implicancia es solo un dibujo.</li><li>No hay respuesta correcta; <b>hay respuestas mejor justificadas que otras</b>.</li><li>Escuchar y ceder también son músculos.</li></ol>
<h3>Ruta integradora</h3>
<div class="tablewrap"><table><thead><tr><th>Parada</th><th>Pregunta</th><th>Herramientas</th></tr></thead><tbody>
<tr><td>1. Identidad</td><td>¿Qué estrategia tenemos realmente?</td><td>5P de Mintzberg</td></tr>
<tr><td>2. Entorno</td><td>¿Qué cambió afuera y qué tan atractiva es la industria?</td><td>PESTEL y 5 fuerzas</td></tr>
<tr><td>3. Ventaja</td><td>¿Con qué competimos y dónde creamos valor?</td><td>VRIO, DAFO, Porter, cadena de valor</td></tr>
<tr><td>4. Crecimiento</td><td>¿Hacia dónde, a qué ritmo y con quién crecemos?</td><td>Ansoff, Uppsala/born global, alianzas</td></tr>
<tr><td>5. Ejecución</td><td>¿Cómo lo hacemos realidad y lo medimos?</td><td>Schein, Harvard, BSC y CSV</td></tr></tbody></table></div>
<h3>Síntesis: criterio por herramienta</h3>
<div class="tablewrap"><table><thead><tr><th>Herramienta</th><th>Úsala cuando…</th><th>Error típico</th></tr></thead><tbody>
<tr><td>5P de Mintzberg</td><td>quieres contrastar lo que se dice con lo que se hace</td><td>describir solo el “plan”</td></tr>
<tr><td>PESTEL y 5 fuerzas</td><td>necesitas entender qué cambió afuera</td><td>listas largas sin implicancias</td></tr>
<tr><td>VRIO y DAFO</td><td>evalúas con qué compites de verdad</td><td>aplicarlo a “la empresa” y no cruzar el DAFO</td></tr>
<tr><td>Porter y cadena de valor</td><td>defines posición y dónde se crea valor</td><td>querer ser todo para todos</td></tr>
<tr><td>Ansoff, Uppsala y alianzas</td><td>decides hacia dónde, a qué ritmo y con quién crecer</td><td>crecer sin mirar recursos</td></tr>
<tr><td>Schein y gestión del cambio</td><td>la estrategia exige cambiar conductas</td><td>cambiar artefactos y no supuestos</td></tr>
<tr><td>Modelo de Harvard</td><td>hay intereses en conflicto</td><td>negociar posiciones</td></tr>
<tr><td>BSC y CSV</td><td>conviertes la estrategia en metas e impacto</td><td>medir solo resultados (lag)</td></tr></tbody></table></div>
<h3>El caso Belcorp en una página</h3>
<p><b>Pregunta:</b> ¿Cómo debe competir Belcorp cuando el canal que construyó su ventaja (venta directa por catálogo con +300 mil consultoras en Perú) pierde peso? Opera en 13 países, 3 marcas (L’Bel, Ésika, Cyzone), planta principal en Tocancipá (Colombia), +6 000 trabajadores (68 % mujeres).</p>
<p><b>Opciones del comité:</b> A. Reinventar la venta directa (consultora digital) · B. Acelerar retail y e-commerce · C. Crecer fuera (comunidades latinas en EE. UU. o España). <b>Pueden combinar, pero deben priorizar una y decir explícitamente qué NO harán.</b></p>
<p><b>Lo que hizo Belcorp:</b> omnicanalidad (retail, e-commerce y puntos digitales); “Mi Tienda Online” para la consultora; Ésika llegó a 11 tiendas propias; en 2025 trasladó su holding de Suiza a España.</p>
<p><b>Ejecución:</b> supuesto básico “el negocio es la relación entre consultora y cliente” (+40 años sin e-commerce ni retail según su CTO, 2020); conflicto de canal negociado con Harvard (comisión por ventas en línea referidas, tienda online de cada consultora; MAAN de Belcorp: retail sin consultoras; de las consultoras: pasarse a otra marca); BSC con lag y lead por perspectiva.</p>`
}
];
