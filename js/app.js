/* App principal: rutas, almacenamiento y vistas. */
(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const app=$('#app');
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=(v,d=2)=>Number(v).toLocaleString('es-PE',{minimumFractionDigits:d,maximumFractionDigits:d});

/* ---------- Almacenamiento seguro ---------- */
const P='efest:';
const store={get(k,d){try{const v=localStorage.getItem(P+k);if(v==null)return d;const j=JSON.parse(v);return j==null?d:j}catch(e){return d}},
  set(k,v){try{localStorage.setItem(P+k,JSON.stringify(v));return true}catch(e){return false}},
  del(k){try{localStorage.removeItem(P+k)}catch(e){}}};
let saveTimers={};
function saveLater(k,fn,ms=400){clearTimeout(saveTimers[k]);saveTimers[k]=setTimeout(fn,ms)}

/* ---------- Tema ---------- */
const themeBtn=$('#themeBtn');
function currentTheme(){return document.documentElement.getAttribute('data-theme')||'light'}
function applyTheme(t){document.documentElement.setAttribute('data-theme',t);themeBtn.textContent=t==='dark'?'☀️':'🌙';themeBtn.setAttribute('aria-label',t==='dark'?'Cambiar a tema claro':'Cambiar a tema oscuro')}
applyTheme(currentTheme());
const setHdr=()=>document.documentElement.style.setProperty('--hdr',($('.topbar')||{offsetHeight:104}).offsetHeight+'px');setHdr();window.addEventListener('resize',setHdr);
themeBtn.addEventListener('click',()=>{const t=currentTheme()==='dark'?'light':'dark';applyTheme(t);try{localStorage.setItem(P+'theme',t)}catch(e){}});

/* ---------- Datos ---------- */
const TEMAS=window.TEMAS||[], HERR=window.HERRAMIENTAS||[], CASOS=window.CASOS||[], EJ=window.EJERCICIOS||[], PREG=(window.PREGUNTAS||[]).map((q,i)=>Object.assign({id:'p'+i},q));
const H=Object.fromEntries(HERR.map(h=>[h.id,h])); const T=Object.fromEntries(TEMAS.map(t=>[t.id,t]));
const toolName=id=>H[id]?H[id].nombre.replace(/ \(.*\)$/,''):id;

const RUBRICA=[
 {k:'herr',n:'Uso correcto de herramientas',lv:[[0,'No usa herramientas del curso o las usa mal'],[2,'Usa alguna, incompleta o con errores (FODA sin cruzar, VRIO a “la empresa”, listas sin implicancia)'],[4,'Usa las herramientas pertinentes correctamente'],[6,'Elige las que responden la pregunta, las aplica bien y cada una termina en “por lo tanto…”']]},
 {k:'diag',n:'Profundidad del diagnóstico',lv:[[0,'Repite el caso'],[1.5,'Ve síntomas, no el problema central'],[3,'Identifica el problema central con datos'],[4,'Problema central claro, con datos y causas, separando hechos de opiniones']]},
 {k:'coh',n:'Coherencia análisis → recomendación',lv:[[0,'La recomendación no sale del análisis'],[1.5,'Relación débil o recomienda todo sin priorizar'],[3,'La recomendación se deriva del análisis'],[4,'Prioriza una opción, explica por qué y dice qué NO hará, citando el análisis']]},
 {k:'fact',n:'Factibilidad',lv:[[0,'Ignora recursos y riesgos'],[1,'Menciona recursos o riesgos genéricos'],[2,'Considera recursos, plazos y riesgos del caso'],[3,'Plan con recursos, KPI (lag y lead) y riesgos con mitigación']]},
 {k:'red',n:'Estructura y redacción',lv:[[0,'Desordenado'],[1,'Ordenado pero largo o confuso'],[2,'Estructurado por pregunta y claro'],[3,'Ejecutivo: estructura clara, conectores, sin relleno']]}
];
const RUB_MAX=RUBRICA.reduce((s,c)=>s+c.lv[c.lv.length-1][0],0); // 20

/* ---------- Utilidades UI ---------- */
function words(s){const m=String(s||'').trim().match(/\S+/g);return m?m.length:0}
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function setActiveTab(tab){$$('#tabs .tab').forEach(a=>a.classList.toggle('active',a.dataset.tab===tab))}
function subnav(items,active){return `<nav class="subnav">${items.map(([h,l,k])=>`<a href="${h}" class="${k===active?'active':''}">${l}</a>`).join('')}</nav>`}
function textarea(id,val,ph,rows){return `<textarea id="${id}" rows="${rows||8}" placeholder="${esc(ph||'Escribe tu respuesta…')}" autocapitalize="sentences" spellcheck="true">${esc(val||'')}</textarea><div class="wc" data-wc="${id}">${words(val)} palabras</div>`}
function bindTextarea(el,onSave){const wc=$(`[data-wc="${el.id}"]`);el.addEventListener('input',()=>{if(wc)wc.textContent=words(el.value)+' palabras';saveLater(el.id,()=>onSave(el.value))})}

/* ---------- Quiz ---------- */
function quizHTML(qs,prefix){return qs.map((q,i)=>`<div class="q card" data-qid="${q.id}"><div class="stem">${i+1}. ${esc(q.q)} <span class="tag gray">${esc(T[q.t]?('Tema '+T[q.t].n):'')}</span></div>${q.o.map((o,j)=>`<button class="opt" data-j="${j}">${String.fromCharCode(65+j)}) ${esc(o)}<span class="why hide">${esc(q.e[j])}</span></button>`).join('')}</div>`).join('')}
function bindQuiz(root,onAnswer){$$('.q',root).forEach(card=>{const q=PREG.find(x=>x.id===card.dataset.qid);$$('.opt',card).forEach(btn=>btn.addEventListener('click',()=>{if(card.dataset.done)return;card.dataset.done=1;const j=+btn.dataset.j;
  $$('.opt',card).forEach((b,k)=>{b.disabled=true;$('.why',b).classList.remove('hide');if(k===q.c)b.classList.add('correct');else if(k===j)b.classList.add('wrong')});
  const st=store.get('quiz',{});st[q.id]=(j===q.c);store.set('quiz',st);if(onAnswer)onAnswer(j===q.c)}))})}

/* =========================================================
   TEORÍA
   ========================================================= */
function viewTeoria(sub){
  setActiveTab('teoria');
  if(sub==='fichas'){return renderFichas()}
  if(sub&&T[sub])return renderTema(T[sub]);
  const quiz=store.get('quiz',{});
  app.innerHTML=`<h1>Teoría</h1><p class="muted">Basada en las clases de tu carpeta (S9–S15). Los temas S1–S7 se reconstruyen solo con lo que muestran las sesiones 12 y 15. Cada tema termina con un quiz corto.</p>
  ${subnav([['#/teoria','Temas','t'],['#/teoria/fichas','Fichas resumen','f']],'t')}
  <div class="grid">${TEMAS.map(t=>{const qs=PREG.filter(q=>q.t===t.id);const ans=qs.filter(q=>q.id in quiz).length;const ok=qs.filter(q=>quiz[q.id]).length;
   return `<a class="card tile" href="#/teoria/${t.id}"><div class="flex"><span class="tag">Tema ${t.n}</span>${t.fuente==='repaso'?'<span class="tag gray">vía repaso S15</span>':''}</div><h3>${esc(t.titulo)}</h3><p class="muted"><small>${esc(t.clases)}</small></p><div class="bar"><span style="width:${qs.length?Math.round(ans/qs.length*100):0}%"></span></div><small class="muted">Preguntas: ${ans}/${qs.length} respondidas · ${ok} correctas</small></a>`}).join('')}</div>`;
}
function fichaHTML(h){return `<div class="card"><h3>${esc(h.nombre)}</h3><p>${h.que}</p><div class="tablewrap"><table><tr><th>Cuándo usarla</th><td>${h.cuando}</td></tr><tr><th>Salida esperada</th><td>${h.salida}</td></tr><tr><th>Pasos</th><td><ol>${h.receta.map(r=>`<li>${r}</li>`).join('')}</ol></td></tr><tr><th>Error típico</th><td>${h.trampas[0]}</td></tr></table></div><p><small class="muted">Tema ${T[h.tema]?T[h.tema].n:''} · <a href="#/teoria/${h.tema}">ver teoría</a> · <a href="#/practica/ejercicios/${h.id}">practicar</a></small></p></div>`}
function renderFichas(){app.innerHTML=`<h1>Fichas resumen</h1>${subnav([['#/teoria','Temas','t'],['#/teoria/fichas','Fichas resumen','f']],'f')}<p class="muted">Una ficha por herramienta para repasar rápido.</p>${HERR.map(fichaHTML).join('')}`}
function renderTema(t){
  const idx=TEMAS.indexOf(t);const prev=TEMAS[idx-1],next=TEMAS[idx+1];
  const qs=shuffle(PREG.filter(q=>q.t===t.id)).slice(0,4);
  app.innerHTML=`<p><a href="#/teoria">← Temas</a></p><span class="tag">Tema ${t.n}</span> <span class="tag gray">${esc(t.clases)}</span><h1>${esc(t.titulo)}</h1>
  <div class="card">${t.html}</div>
  ${t.herramientas.length?`<h2>Fichas de este tema</h2>${t.herramientas.map(id=>H[id]?fichaHTML(H[id]):'').join('')}`:''}
  <div class="card"><h2>¿Qué te pueden preguntar en un caso?</h2><ul>${t.preguntasCaso.map(p=>`<li>${esc(p)}</li>`).join('')}</ul></div>
  <h2>Quiz corto</h2><div id="quiz">${quizHTML(qs)}</div><div class="btnrow"><button class="btn secondary" id="otroQuiz">Otras 4 preguntas</button><a class="btn ghost" href="#/practica/preguntas/${t.id}">Todas las de este tema</a></div>
  <div class="btnrow">${prev?`<a class="btn ghost" href="#/teoria/${prev.id}">← Tema ${prev.n}</a>`:''}<span class="spacer"></span>${next?`<a class="btn ghost" href="#/teoria/${next.id}">Tema ${next.n} →</a>`:''}</div>`;
  bindQuiz($('#quiz'));$('#otroQuiz').onclick=()=>renderTema(t);
  window.scrollTo(0,0);
}

/* =========================================================
   CÓMO RESOLVER UN CASO
   ========================================================= */
const MAPA=[
 ['¿Qué estrategia tiene realmente la empresa? ¿Fue deliberada o emergente?','5P de Mintzberg','mintzberg'],
 ['¿Qué cambió afuera? ¿Qué tendencias afectan?','PESTEL (2–3 factores)','pestel'],
 ['¿Qué tan atractiva es la industria? ¿Dónde aprieta la competencia?','5 fuerzas','porter5'],
 ['¿Con qué compite de verdad? ¿Su ventaja es sostenible?','VRIO (recurso concreto)','vrio'],
 ['¿Qué estrategias formular? ¿Cuál es el reto estratégico?','FODA cruzado → “¿Cómo usamos…?”','foda'],
 ['¿Cómo compite cada marca? ¿Está atrapada a la mitad?','Estrategias genéricas de Porter','genericas'],
 ['¿Dónde se crea o pierde valor? ¿Qué eslabón afecta el cambio?','Cadena de valor','cadena'],
 ['¿Hacia dónde crecer?','Ansoff (define el mercado)','ansoff'],
 ['¿Cómo y a qué ritmo entrar a otro país? ¿Con quién?','Modos de entrada, compromiso, Uppsala/born global, alianzas','intl'],
 ['¿Por qué el cambio no funciona? ¿Qué bloquea a la gente?','Schein (supuestos) + Satir (etapa)','schein'],
 ['¿Qué liderazgo se necesita para innovar?','Architect / Bridger / Catalyst','liderazgo'],
 ['¿Hay un conflicto de intereses (canal, proveedor, sindicato, socio)?','Harvard + MAPAN','harvard'],
 ['¿Cómo medir y controlar la estrategia?','BSC (lag + lead, pesos 100, semáforo)','bsc'],
 ['¿Qué puede salir mal? ¿Cómo mitigarlo?','Matriz de riesgos (P × I)','riesgos'],
 ['¿Qué tan sostenible es la empresa? ¿Inside-out u outside-in?','Dyllick y Muff (BST 1.0/2.0/3.0)','bst'],
 ['¿Cómo rediseñar el modelo de negocio para ser sostenible?','Arquetipos de Bocken','bocken']
];
function viewCaso(){
  setActiveTab('caso');
  app.innerHTML=`<h1>Cómo resolver un caso</h1>
  <div class="note"><b>La idea de la S15:</b> “El directorio no te pide un PESTEL. Te pide una decisión”. Herramienta no es criterio: elige la que responde la pregunta, termina cada análisis en <b>“por lo tanto…”</b>, prioriza una opción y di qué <b>NO</b> harás.</div>
  ${subnav([['#/caso','Guía','g'],['#caso-mapa','Mapa de decisión','m'],['#caso-recetas','Recetas por herramienta','r'],['#caso-frases','Frases y errores','f']],'g')}
  <div class="card"><h2>1. Lectura del caso (10–15 min de 120)</h2>
   <ol><li><b>Lee primero las preguntas</b>: te dicen qué herramientas buscar.</li><li><b>Primera lectura rápida</b>: ¿qué empresa, qué sector, qué decisión se pide y para cuándo?</li><li><b>Segunda lectura con lápiz.</b> Subraya:<ul><li>datos numéricos (participación, márgenes, crecimiento, caja disponible, inversión);</li><li>cambios del entorno (regulación, tecnología, hábitos, competidores nuevos) → PESTEL/5 fuerzas;</li><li>recursos y capacidades propios → VRIO/FODA;</li><li>señales culturales (rituales, frases, incentivos, quién decide) → Schein;</li><li>conflictos entre actores y sus alternativas → Harvard/MAPAN;</li><li>restricciones: caja, plazos, deudas, capacidades que faltan.</li></ul></li><li><b>Separa hechos de opiniones.</b> Hecho: dato verificable del caso (“la venta directa pasó de 60 % a 45 %”). Opinión: lo que dice un personaje (“basta con una campaña en redes”, “nos van a ganar”). Las opiniones son <i>posiciones</i> de actores: úsalas para entender intereses, no como evidencia.</li><li><b>Problema central vs. síntomas.</b> Síntoma: lo que se ve (caída de ventas, abandono, productividad −18 %, quejas). Problema central: la causa que, si se resuelve, elimina varios síntomas (p. ej., “el canal que construyó la ventaja pierde peso”, “un supuesto cultural bloquea el cambio”). Pregúntate “¿por qué pasa esto?” dos o tres veces.</li></ol>
   <p><b>Formula el problema central como pregunta</b>, al estilo de la S15: “¿Cómo debe competir X cuando…?”.</p></div>
  <div class="card"><h2>2. Estructura de respuesta recomendada</h2>
   <p>Basada en la ruta integradora de la S15 (identidad → entorno → ventaja → crecimiento → ejecución). Adáptala a lo que pide cada pregunta: <b>responde la pregunta que te hacen</b>, en el orden en que te la hacen.</p>
   <div class="tablewrap"><table><thead><tr><th>Parte</th><th>Qué justificar</th><th>Extensión orientativa*</th></tr></thead><tbody>
   <tr><td><b>1. Diagnóstico</b></td><td>Problema central (no síntomas) con 2–3 datos del caso; estrategia actual (5P si aplica).</td><td>3–5 líneas</td></tr>
   <tr><td><b>2. Análisis con herramientas</b></td><td>Solo las herramientas que responden la pregunta. Cada una en formato de salida (tabla/matriz) + “por lo tanto…”.</td><td>1 tabla + 2–3 líneas de implicancia por herramienta</td></tr>
   <tr><td><b>3. Alternativas</b></td><td>2–3 opciones reales del caso, evaluadas con el análisis (recursos, riesgo, ventaja).</td><td>1–2 líneas por opción</td></tr>
   <tr><td><b>4. Recomendación</b></td><td>Prioriza UNA; explica por qué con el análisis; di explícitamente qué NO harás.</td><td>4–6 líneas</td></tr>
   <tr><td><b>5. Implementación y riesgos</b></td><td>Cambio cultural/negociación si aplica; KPI lag y lead (BSC); 2 riesgos con P × I y mitigación.</td><td>Tabla corta</td></tr></tbody></table></div>
   <p class="muted"><small>* Estimación para 120 minutos y 3–5 preguntas: unos 20–30 minutos y 150–300 palabras por pregunta. La clase no fija extensiones: prioriza claridad sobre cantidad.</small></p></div>
  <div class="card" id="caso-mapa"><h2>3. Mapa de decisión: qué herramienta según la pregunta</h2><div class="tablewrap"><table><thead><tr><th>Si la pregunta es…</th><th>Usa</th></tr></thead><tbody>${MAPA.map(m=>`<tr><td>${esc(m[0])}</td><td><a href="#caso-r-${m[2]}">${esc(m[1])}</a></td></tr>`).join('')}</tbody></table></div><p class="muted"><small>Orden para crecimiento (S15): Ansoff dice <b>hacia dónde</b>, Uppsala <b>a qué ritmo</b>, alianzas <b>con quién</b>.</small></p></div>
  <h2 id="caso-recetas">4. Recetas por herramienta</h2><p class="muted">Pasos, trampas frecuentes y un ejemplo resuelto sobre un mini caso.</p>
  ${HERR.map(h=>`<details class="card" id="caso-r-${h.id}"><summary>${esc(h.nombre)}</summary><p>${h.que}</p><p><b>Cuándo:</b> ${h.cuando}</p><p><b>Salida:</b> ${h.salida}</p><h4>Receta</h4><ol>${h.receta.map(r=>`<li>${r}</li>`).join('')}</ol><h4>Trampas frecuentes</h4><ul>${h.trampas.map(r=>`<li>${r}</li>`).join('')}</ul><h4>Ejemplo resuelto</h4><div class="note"><b>Mini caso:</b> ${h.ejemplo.caso}</div><div class="model">${h.ejemplo.sol}</div>${['bsc','riesgos','harvard'].includes(h.id)?`<div class="btnrow"><button class="btn secondary" data-gen="${h.id==='harvard'?'neg':h.id}">Otro ejemplo con cálculo</button></div><div id="genx-${h.id}"></div>`:''}<p><a href="#/practica/ejercicios/${h.id}">Practicar ${esc(toolName(h.id))} →</a></p></details>`).join('')}
  <div class="card" id="caso-frases"><h2>5. Banco de frases y conectores</h2>
  <div class="tablewrap"><table><thead><tr><th>Para…</th><th>Frases</th></tr></thead><tbody>
  <tr><td>Diagnosticar</td><td>“El problema central no es X (síntoma) sino Y, porque…” · “Los datos muestran que…” · “Detrás de la caída de… está…”</td></tr>
  <tr><td>Cerrar un análisis</td><td>“Por lo tanto…” · “Esto implica que…” · “En consecuencia, la empresa debe…”</td></tr>
  <tr><td>Vincular análisis y recomendación</td><td>“Dado que el VRIO muestra que la ventaja sostenible es…, recomiendo…” · “Como la fuerza que más aprieta es…, conviene…”</td></tr>
  <tr><td>Priorizar</td><td>“Priorizo A porque… Dejo B para una segunda etapa porque… No haremos C porque…”</td></tr>
  <tr><td>Reconocer el costo</td><td>“Esta opción sacrifica… a cambio de…” · “El principal riesgo es…, que mitigaremos con…”</td></tr>
  <tr><td>Medir</td><td>“Sabremos que funciona si el KPI lag… y lo anticiparemos con el lead…”</td></tr></tbody></table></div>
  <h3>Errores que restan puntos</h3><ul>
   <li>Aplicar todas las herramientas sin decidir (“¿y qué decides?”).</li><li>Listas largas sin implicancia (PESTEL de 15 factores).</li><li>Confundir fortaleza con oportunidad, o debilidad con amenaza.</li><li>VRIO aplicado a “la empresa”; FODA sin cruzar.</li><li>Recomendar sin vincular al análisis, o recomendar todo sin priorizar.</li><li>No decir qué NO harás.</li><li>Clasificar en Ansoff sin definir el mercado.</li><li>Proponer IED sin capital o sin necesidad de presencia permanente.</li><li>Cambiar artefactos (una app) y no supuestos.</li><li>Negociar posiciones; comparar ofertas con un mínimo arbitrario y no con la MAPAN.</li><li>BSC solo con lag; metas sin número ni fecha; pesos que no suman 100.</li><li>Riesgos genéricos sin mitigación ni responsable.</li><li>Usar opiniones de personajes como si fueran hechos.</li><li>Traer datos o herramientas que no están en el caso ni en el curso.</li></ul></div>`;
  $$('[data-gen]').forEach(b=>b.addEventListener('click',()=>{const id=b.dataset.gen;const box=b.parentElement.nextElementSibling;const g=GEN.GENS[id](Math.floor(Math.random()*1e6)+1);box.innerHTML=`<div class="card"><h4>${esc(g.title)} · ejemplo ${g.seed}</h4>${g.enunciado}<h4>Solución paso a paso</h4>${g.solucion}</div>`}));
}

/* =========================================================
   PRÁCTICA
   ========================================================= */
const PRAC_NAV=a=>subnav([['#/practica/casos','Casos completos','casos'],['#/practica/ejercicios','Ejercicios por herramienta','ej'],['#/practica/generadores','Generadores con cálculo','gen'],['#/practica/preguntas','Preguntas para marcar','preg']],a);
function viewPractica(sub,arg){
  setActiveTab('practica');
  if(sub==='casos'&&arg)return renderCaso(arg);
  if(sub==='ejercicios')return renderEjercicios(arg);
  if(sub==='generadores')return renderGeneradores(arg);
  if(sub==='preguntas')return renderPreguntas(arg);
  return renderCasosList();
}
function caseScore(c){const g=store.get('grades',{})[c.id];return g&&g.nota!=null?g.nota:null}
function renderCasosList(){
  const drafts=store.get('drafts',{});
  app.innerHTML=`<h1>Práctica</h1>${PRAC_NAV('casos')}<p class="muted">${CASOS.length} casos con escenario, preguntas abiertas, respuesta modelo y rúbrica sobre 20. Tus respuestas se guardan como borrador en este dispositivo.</p>
  <div class="field" style="max-width:360px"><label for="fTema">Filtrar por tema</label><select id="fTema"><option value="">Todos los temas</option>${TEMAS.map(t=>`<option value="${t.id}">Tema ${t.n} · ${esc(t.titulo)}</option>`).join('')}</select></div>
  <div class="grid" id="clist"></div>`;
  const draw=()=>{const f=$('#fTema').value;$('#clist').innerHTML=CASOS.filter(c=>!f||c.temas.includes(f)).map(c=>{const n=caseScore(c);const hasD=Object.keys(drafts).some(k=>k.startsWith(c.id+':')&&drafts[k]);
    return `<a class="card tile" href="#/practica/casos/${c.id}"><div class="flex"><span class="tag gray">${esc(c.sector)}</span>${n!=null?`<span class="tag pill-ok">Nota ${fmt(n,1)}/20</span>`:hasD?'<span class="tag pill-warn">Borrador</span>':''}</div><h3>${esc(c.titulo)}</h3><small class="muted">${c.preguntas.length} preguntas · ${[...new Set(c.preguntas.flatMap(q=>q.tools))].map(toolName).join(', ')}</small></a>`}).join('')};
  $('#fTema').onchange=draw;draw();
}
function rubricHTML(prefix,sel){return `<div class="tablewrap"><table class="rubric"><thead><tr><th>Criterio</th><th colspan="4">Niveles (toca uno)</th></tr></thead><tbody>${RUBRICA.map(c=>`<tr><th>${c.n}<br><small class="muted">máx. ${c.lv[c.lv.length-1][0]}</small></th>${c.lv.map((l,i)=>`<td class="lvl ${sel&&sel[c.k]===i?'sel':''}" data-c="${c.k}" data-i="${i}" tabindex="0" role="button"><b>${fmt(l[0],l[0]%1?1:0)} pts</b><br><small>${esc(l[1])}</small></td>`).join('')}</tr>`).join('')}</tbody></table></div><div class="flex"><span>Nota:</span><span class="score" id="${prefix}-score">—</span><span class="muted">/ 20</span></div>`}
function rubricScore(sel){if(!sel)return null;let s=0;for(const c of RUBRICA){if(sel[c.k]==null)return null;s+=c.lv[sel[c.k]][0]}return s}
function bindRubric(root,prefix,sel,onChange){const upd=()=>{const s=rubricScore(sel);$('#'+prefix+'-score').textContent=s==null?'—':fmt(s,1)};
  $$('.lvl',root).forEach(td=>{const f=()=>{sel[td.dataset.c]=+td.dataset.i;$$(`.lvl[data-c="${td.dataset.c}"]`,root).forEach(x=>x.classList.toggle('sel',x===td));upd();onChange(sel)};td.addEventListener('click',f);td.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();f()}})});upd()}
function renderCaso(id){
  const c=CASOS.find(x=>x.id===id);if(!c){app.innerHTML='<p>Caso no encontrado.</p>';return}
  const drafts=store.get('drafts',{});const grades=store.get('grades',{});const g=grades[c.id]||{sel:{},pts:{}};
  app.innerHTML=`<p><a href="#/practica/casos">← Casos</a></p><span class="tag gray">${esc(c.sector)}</span><h1>${esc(c.titulo)}</h1>
  <div class="card scenario">${c.escenario}</div>
  ${c.preguntas.map((q,i)=>`<div class="card qblock"><h3>Pregunta ${i+1}</h3><p>${esc(q.q)}</p><p>${q.tools.map(t=>`<span class="tag">${esc(toolName(t))}</span>`).join('')}</p>${textarea(`d-${c.id}-${i}`,drafts[c.id+':'+i],'Tu respuesta (se guarda sola)…',9)}
   <details><summary>Ver respuesta modelo y puntos clave</summary><div class="model">${q.modelo}</div><h4>¿Tu respuesta incluye…?</h4>${q.puntos.map((p,k)=>`<label class="check"><input type="checkbox" data-pt="${i}:${k}" ${g.pts&&g.pts[i+':'+k]?'checked':''}> <span>${esc(p)}</span></label>`).join('')}</details></div>`).join('')}
  <div class="card"><h2>Autocorrección con rúbrica</h2><p class="muted">Compara tus respuestas con las modelo y elige un nivel por criterio. La nota se guarda.</p>${rubricHTML('cr',g.sel)}<p id="ptsum" class="muted"></p></div>`;
  c.preguntas.forEach((q,i)=>{const el=$(`#d-${c.id}-${i}`);bindTextarea(el,v=>{const d=store.get('drafts',{});d[c.id+':'+i]=v;store.set('drafts',d)})});
  const save=()=>{const gr=store.get('grades',{});gr[c.id]={sel:g.sel,pts:g.pts,nota:rubricScore(g.sel),fecha:new Date().toISOString()};store.set('grades',gr)};
  const ptsum=()=>{const tot=c.preguntas.reduce((s,q)=>s+q.puntos.length,0);const ok=Object.keys(g.pts||{}).filter(k=>g.pts[k]).length;$('#ptsum').textContent=`Puntos clave cubiertos: ${ok}/${tot}.`};
  $$('[data-pt]').forEach(cb=>cb.addEventListener('change',()=>{g.pts=g.pts||{};g.pts[cb.dataset.pt]=cb.checked;save();ptsum()}));
  bindRubric(app,'cr',g.sel,save);ptsum();window.scrollTo(0,0);
}
function renderEjercicios(tool){
  const st=store.get('ex',{});
  const list=EJ.filter(e=>!tool||e.tool===tool);
  app.innerHTML=`<h1>Práctica</h1>${PRAC_NAV('ej')}<p class="muted">${EJ.length} mini ejercicios (al menos 3 por herramienta). Escribe, luego revisa la respuesta modelo y marca el checklist.</p>
  <div class="field" style="max-width:360px"><label for="fTool">Herramienta</label><select id="fTool"><option value="">Todas</option>${HERR.map(h=>`<option value="${h.id}" ${h.id===tool?'selected':''}>${esc(h.nombre)}</option>`).join('')}</select></div>
  ${list.map(e=>{const s=st[e.id]||{};return `<div class="card" id="${e.id}"><div class="flex"><span class="tag">${esc(toolName(e.tool))}</span>${s.chk&&Object.values(s.chk).filter(Boolean).length===e.checklist.length?'<span class="tag pill-ok">Completo</span>':''}</div><h3>${esc(e.titulo)}</h3><p>${e.enunciado}</p>${textarea('x-'+e.id,s.txt,'Tu respuesta…',5)}<details><summary>Ver respuesta modelo y checklist</summary><div class="model">${e.modelo}</div>${e.checklist.map((c,k)=>`<label class="check"><input type="checkbox" data-ex="${e.id}" data-k="${k}" ${s.chk&&s.chk[k]?'checked':''}> <span>${esc(c)}</span></label>`).join('')}</details></div>`}).join('')}`;
  $('#fTool').onchange=e=>{location.hash='#/practica/ejercicios'+(e.target.value?'/'+e.target.value:'')};
  list.forEach(e=>bindTextarea($('#x-'+e.id),v=>{const s=store.get('ex',{});s[e.id]=s[e.id]||{};s[e.id].txt=v;store.set('ex',s)}));
  $$('[data-ex]').forEach(cb=>cb.addEventListener('change',()=>{const s=store.get('ex',{});const id=cb.dataset.ex;s[id]=s[id]||{};s[id].chk=s[id].chk||{};s[id].chk[cb.dataset.k]=cb.checked;store.set('ex',s)}));
}
const GEN_INFO=[['bsc','BSC ponderado y semáforo','Pesos que suman 100, % de cumplimiento, puntos, total y semáforo (S12).'],['riesgos','Matriz de riesgos','Probabilidad × impacto (1–3) y clasificación por colores (S12, Paso 5).'],['neg','Margen de negociación (MAPAN)','Puntos de retiro y margen de acuerdo (S11, caso Forma Studio – Raíz).']];
function renderGeneradores(which){
  which=which||'bsc';
  app.innerHTML=`<h1>Práctica</h1>${PRAC_NAV('gen')}<p class="muted">Datos aleatorios, corrección automática por campo y solución paso a paso. Acepta decimales con punto o coma, fracciones (3/4) y porcentajes (45,5 %).</p>
  ${subnav(GEN_INFO.map(g=>['#/practica/generadores/'+g[0],g[1],g[0]]),which)}
  <p class="muted">${esc((GEN_INFO.find(g=>g[0]===which)||GEN_INFO[0])[2])}</p><div id="genbox"></div>`;
  let seed=Math.floor(Math.random()*1e6)+1;
  const draw=()=>{const g=GEN.GENS[which](seed);const box=$('#genbox');
    box.innerHTML=`<div class="card"><div class="flex"><h3 style="margin:0">${esc(g.title)}</h3><span class="spacer"></span><small class="muted">Semilla ${seed}</small></div>${g.enunciado}</div>
    <div class="card"><h3>Tus respuestas</h3>${g.fields.map(f=>`<div class="gfield"><label for="g-${f.key}">${esc(f.label)}</label><input id="g-${f.key}" inputmode="${f.type==='text'?'text':'decimal'}" autocomplete="off" autocapitalize="off"><span class="mark" id="m-${f.key}"></span></div>`).join('')}
    <p id="gcheck" class="muted"></p><div class="btnrow"><button class="btn" id="gGrade">Corregir</button><button class="btn secondary" id="gSol">Ver solución</button><button class="btn ghost" id="gNew">Otro ejercicio</button></div><p id="gres"></p></div><div id="gsolbox"></div>`;
    const read=()=>Object.fromEntries(g.fields.map(f=>[f.key,$('#g-'+f.key).value]));
    if(g.checks){const pi=$('#g-peso');pi&&pi.addEventListener('input',()=>{$('#gcheck').textContent=g.checks(read())})}
    $('#gGrade').onclick=()=>{const r=GEN.grade(g,read());g.fields.forEach(f=>{const m=$('#m-'+f.key);m.textContent=r.res[f.key]?'✓':'✗';m.className='mark '+(r.res[f.key]?'ok':'bad')});$('#gres').innerHTML=`<b>${r.ok}/${r.total}</b> campos correctos.`;const h=store.get('genstats',{});h[which]=h[which]||{n:0,ok:0};h[which].n++;if(r.ok===r.total)h[which].ok++;store.set('genstats',h)};
    $('#gSol').onclick=()=>{$('#gsolbox').innerHTML=`<div class="card"><h3>Solución paso a paso</h3>${g.solucion}</div>`};
    $('#gNew').onclick=()=>{seed=Math.floor(Math.random()*1e6)+1;draw();window.scrollTo(0,0)};
  };
  draw();
}
function renderPreguntas(tema){
  const quiz=store.get('quiz',{});const list=PREG.filter(q=>!tema||q.t===tema);
  const ans=list.filter(q=>q.id in quiz).length,ok=list.filter(q=>quiz[q.id]).length;
  app.innerHTML=`<h1>Práctica</h1>${PRAC_NAV('preg')}<p class="muted">${PREG.length} preguntas de aplicación (al menos 10 por tema), con explicación de cada opción.</p>
  <div class="flex"><div class="field" style="min-width:240px;flex:1;max-width:420px"><label for="fT">Tema</label><select id="fT"><option value="">Todos (${PREG.length})</option>${TEMAS.map(t=>`<option value="${t.id}" ${t.id===tema?'selected':''}>Tema ${t.n} · ${esc(t.titulo)} (${PREG.filter(q=>q.t===t.id).length})</option>`).join('')}</select></div></div>
  <p>Respondidas: <b>${ans}/${list.length}</b> · correctas: <b>${ok}</b></p>
  <div class="btnrow"><button class="btn secondary" id="mix">Mezclar</button><button class="btn ghost" id="wrong">Solo las que fallé</button><button class="btn ghost" id="reset">Reiniciar progreso de este filtro</button></div><div id="qz"></div>`;
  const draw=(qs)=>{$('#qz').innerHTML=quizHTML(qs);bindQuiz($('#qz'))};
  draw(list);
  $('#fT').onchange=e=>{location.hash='#/practica/preguntas'+(e.target.value?'/'+e.target.value:'')};
  $('#mix').onclick=()=>draw(shuffle(list));
  $('#wrong').onclick=()=>{const q=store.get('quiz',{});const w=list.filter(x=>q[x.id]===false);draw(w);if(!w.length)$('#qz').innerHTML='<p class="note ok">No tienes preguntas falladas en este filtro.</p>'};
  $('#reset').onclick=()=>{if(!confirm('¿Borrar el progreso de estas preguntas?'))return;const q=store.get('quiz',{});list.forEach(x=>delete q[x.id]);store.set('quiz',q);renderPreguntas(tema)};
}

/* =========================================================
   SIMULACRO
   ========================================================= */
let simTimer=null;
function viewSimulacro(){
  setActiveTab('simulacro');clearInterval(simTimer);
  const act=store.get('sim',null);
  if(act&&act.phase==='exam')return renderSimExam(act);
  if(act&&act.phase==='review')return renderSimReview(act);
  const hist=store.get('simhist',[]);
  app.innerHTML=`<h1>Simulacro</h1><p class="muted">Formato del parcial: un caso (o dos) con preguntas abiertas, contra el tiempo. La respuesta modelo y la rúbrica quedan ocultas hasta que entregues.</p>
  <div class="card"><h2>Configurar</h2><div class="flex"><div class="field"><label for="sN">Casos</label><select id="sN"><option value="1">1 caso</option><option value="2">2 casos</option></select></div><div class="field"><label for="sM">Minutos</label><input id="sM" type="number" min="10" max="300" step="5" value="120" inputmode="numeric" style="width:120px"></div>
  <div class="field" style="flex:1;min-width:220px"><label for="sT">Tema (opcional)</label><select id="sT"><option value="">Cualquier tema</option>${TEMAS.map(t=>`<option value="${t.id}">Tema ${t.n} · ${esc(t.titulo)}</option>`).join('')}</select></div></div>
  <div class="btnrow"><button class="btn" id="sGo">Empezar simulacro</button></div></div>
  <div class="card"><h2>Historial</h2>${hist.length?`<div class="tablewrap"><table><thead><tr><th>Fecha</th><th>Casos</th><th class="num">Nota</th><th>A repasar</th></tr></thead><tbody>${hist.slice().reverse().map(h=>`<tr><td>${new Date(h.fecha).toLocaleString('es-PE',{dateStyle:'short',timeStyle:'short'})}</td><td>${h.casos.map(id=>{const c=CASOS.find(x=>x.id===id);return c?esc(c.titulo.split(':')[0]):id}).join('<br>')}</td><td class="num"><b>${fmt(h.nota,1)}</b></td><td>${(h.repasar||[]).map(t=>`<span class="tag pill-bad">${esc(toolName(t))}</span>`).join('')||'—'}</td></tr>`).join('')}</tbody></table></div><div class="btnrow"><button class="btn ghost" id="sClr">Borrar historial</button></div>`:'<p class="muted">Aún no tienes simulacros.</p>'}</div>`;
  $('#sGo').onclick=()=>{const n=+$('#sN').value;const m=Math.max(10,Math.min(300,+$('#sM').value||120));const t=$('#sT').value;
    let pool=CASOS.filter(c=>!t||c.temas.includes(t));const recent=new Set(hist.slice(-6).flatMap(h=>h.casos));const fresh=pool.filter(c=>!recent.has(c.id));if(fresh.length>=n)pool=fresh;
    const ids=shuffle(pool).slice(0,n).map(c=>c.id);const s={phase:'exam',ids,minutes:m,start:Date.now(),ans:{}};store.set('sim',s);renderSimExam(s)};
  const clr=$('#sClr');if(clr)clr.onclick=()=>{if(confirm('¿Borrar todo el historial de simulacros?')){store.set('simhist',[]);viewSimulacro()}};
}
function renderSimExam(s){
  const cs=s.ids.map(id=>CASOS.find(c=>c.id===id)).filter(Boolean);
  app.innerHTML=`<div class="timer" id="tm"><span>Tiempo restante</span><span class="t" id="tt">--:--</span><button class="btn" id="sSub">Entregar</button></div>
  ${cs.map((c,ci)=>`<div class="card scenario"><span class="tag">Caso ${ci+1} de ${cs.length}</span><h2>${esc(c.titulo)}</h2>${c.escenario}</div>${c.preguntas.map((q,i)=>`<div class="card qblock"><h3>Caso ${ci+1} · Pregunta ${i+1}</h3><p>${esc(q.q)}</p>${textarea(`s-${c.id}-${i}`,s.ans[c.id+':'+i],'Tu respuesta…',10)}</div>`).join('')}`).join('')}
  <div class="btnrow"><button class="btn" id="sSub2">Entregar</button><button class="btn ghost" id="sCancel">Abandonar simulacro</button></div>`;
  cs.forEach(c=>c.preguntas.forEach((q,i)=>bindTextarea($(`#s-${c.id}-${i}`),v=>{const a=store.get('sim',s);a.ans[c.id+':'+i]=v;store.set('sim',a);s.ans=a.ans})));
  const end=s.start+s.minutes*60000;
  const tick=()=>{const r=Math.max(0,end-Date.now());const mm=Math.floor(r/60000),ss=Math.floor(r%60000/1000);const el=$('#tt');if(!el){clearInterval(simTimer);return}el.textContent=`${mm}:${String(ss).padStart(2,'0')}`;$('#tm').classList.toggle('low',r<5*60000);if(r===0){clearInterval(simTimer);el.textContent='0:00 · tiempo terminado'}};
  tick();simTimer=setInterval(tick,1000);
  const submit=()=>{if(!confirm('¿Entregar el simulacro? Ya no podrás editar tus respuestas.'))return;clearInterval(simTimer);const a=store.get('sim',s);a.phase='review';a.end=Date.now();a.sel={};a.pts={};store.set('sim',a);renderSimReview(a)};
  $('#sSub').onclick=submit;$('#sSub2').onclick=submit;
  $('#sCancel').onclick=()=>{if(confirm('¿Abandonar? Se perderán las respuestas de este simulacro.')){clearInterval(simTimer);store.del('sim');viewSimulacro()}};
  window.scrollTo(0,0);
}
function renderSimReview(s){
  const cs=s.ids.map(id=>CASOS.find(c=>c.id===id)).filter(Boolean);
  s.sel=s.sel||{};s.pts=s.pts||{};
  const used=Math.round(((s.end||Date.now())-s.start)/60000);
  app.innerHTML=`<h1>Autocorrección del simulacro</h1><p class="muted">Tiempo usado: ${used} de ${s.minutes} min. Compara cada respuesta con la modelo, marca los puntos clave cubiertos y califica con la rúbrica.</p>
  ${cs.map((c,ci)=>`<h2>Caso ${ci+1}: ${esc(c.titulo)}</h2>${c.preguntas.map((q,i)=>`<div class="card qblock"><h3>Pregunta ${i+1}</h3><p>${esc(q.q)}</p><p>${q.tools.map(t=>`<span class="tag">${esc(toolName(t))}</span>`).join('')}</p><h4>Tu respuesta (${words(s.ans[c.id+':'+i])} palabras)</h4><div class="model" style="white-space:pre-wrap">${esc(s.ans[c.id+':'+i]||'(sin respuesta)')}</div><h4>Respuesta modelo</h4><div class="model">${q.modelo}</div><h4>Puntos clave</h4>${q.puntos.map((p,k)=>`<label class="check"><input type="checkbox" data-sp="${c.id}:${i}:${k}" ${s.pts[c.id+':'+i+':'+k]?'checked':''}> <span>${esc(p)}</span></label>`).join('')}</div>`).join('')}
   <div class="card" data-case="${c.id}"><h3>Rúbrica · Caso ${ci+1}</h3>${rubricHTML('sr'+ci,s.sel[c.id]||{})}</div>`).join('')}
  <div class="card"><h2>Resultado</h2><div id="sres"></div><div class="btnrow"><button class="btn" id="sSave">Guardar en el historial</button><button class="btn ghost" id="sDiscard">Descartar</button></div></div>`;
  const persist=()=>store.set('sim',s);
  const result=()=>{const notas=cs.map(c=>rubricScore(s.sel[c.id]));const ok=notas.every(n=>n!=null);const nota=ok?notas.reduce((a,b)=>a+b,0)/notas.length:null;
    const tool={};cs.forEach(c=>c.preguntas.forEach((q,i)=>{const tot=q.puntos.length;const got=q.puntos.filter((p,k)=>s.pts[c.id+':'+i+':'+k]).length;q.tools.forEach(t=>{tool[t]=tool[t]||{got:0,tot:0};tool[t].got+=got;tool[t].tot+=tot})}));
    const crit={};RUBRICA.forEach(r=>{const vals=cs.map(c=>s.sel[c.id]&&s.sel[c.id][r.k]!=null?r.lv[s.sel[c.id][r.k]][0]:null).filter(v=>v!=null);crit[r.k]=vals.length?vals.reduce((a,b)=>a+b,0)/vals.length:null});
    const toolPct=Object.fromEntries(Object.entries(tool).map(([k,v])=>[k,v.tot?v.got/v.tot*100:0]));const repasar=Object.entries(toolPct).filter(([k,v])=>v<60).sort((a,b)=>a[1]-b[1]).map(x=>x[0]);
    return {nota,crit,toolPct,repasar}};
  const draw=()=>{const r=result();$('#sres').innerHTML=`<div class="kpis"><div class="kpi"><div class="v">${r.nota==null?'—':fmt(r.nota,1)}</div><div class="l">Nota sobre 20 ${r.nota==null?'(completa la rúbrica)':''}</div></div></div>
    <h4>Desglose por criterio</h4><div class="tablewrap"><table><tbody>${RUBRICA.map(c=>{const v=r.crit[c.k];const mx=c.lv[c.lv.length-1][0];return `<tr><td>${c.n}</td><td class="num">${v==null?'—':fmt(v,1)} / ${mx}</td><td style="width:40%"><div class="bar"><span style="width:${v==null?0:v/mx*100}%"></span></div></td></tr>`}).join('')}</tbody></table></div>
    <h4>Desglose por herramienta (puntos clave cubiertos)</h4><div class="tablewrap"><table><tbody>${Object.entries(r.toolPct).sort((a,b)=>a[1]-b[1]).map(([k,v])=>`<tr><td>${esc(toolName(k))}</td><td class="num">${fmt(v,0)} %</td><td style="width:40%"><div class="bar"><span style="width:${v}%;background:var(${v<60?'--bad':v<85?'--warn':'--ok'})"></span></div></td><td>${v<60?`<a href="#/teoria/${H[k]?H[k].tema:''}">repasar</a>`:''}</td></tr>`).join('')}</tbody></table></div>`};
  $$('[data-sp]').forEach(cb=>cb.addEventListener('change',()=>{s.pts[cb.dataset.sp]=cb.checked;persist();draw()}));
  cs.forEach((c,ci)=>{s.sel[c.id]=s.sel[c.id]||{};bindRubric($(`[data-case="${c.id}"]`),'sr'+ci,s.sel[c.id],()=>{persist();draw()})});
  draw();
  $('#sSave').onclick=()=>{const r=result();if(r.nota==null){alert('Completa la rúbrica de cada caso para obtener la nota.');return}const h=store.get('simhist',[]);h.push({fecha:new Date().toISOString(),casos:s.ids,nota:r.nota,crit:r.crit,tools:r.toolPct,repasar:r.repasar,min:used});store.set('simhist',h);store.del('sim');viewSimulacro()};
  $('#sDiscard').onclick=()=>{if(confirm('¿Descartar este simulacro sin guardar?')){store.del('sim');viewSimulacro()}};
  window.scrollTo(0,0);
}

/* =========================================================
   NOTAS
   ========================================================= */
const EVALS=[['EC1','Evaluación Continua 1','Semanas 1–7',5],['EC2','Evaluación Continua 2','Semanas 8–15',5],['PC1','Práctica Calificada 1','Semana 6 · grupal',20],['PC2','Práctica Calificada 2','Semana 14 · grupal',20],['EP','Examen Parcial','Semana 8 · individual',25],['EF','Examen Final','Semana 16 · individual',25]];
function calcNotas(n,meta){
  let ase=0,wr=0,wp=0;EVALS.forEach(([k,,,w])=>{const v=n[k];if(v===''||v==null||isNaN(v))wp+=w;else{ase+=w*v/100;wr+=w}});
  const prom=wr?ase/(wr/100):null; const maxPos=ase+wp/100*20; const minPos=ase;
  const need=wp?(meta-ase)/(wp/100):null;
  let needEF=null; const efPend=(n.EF===''||n.EF==null||isNaN(n.EF));
  if(efPend){const otherPend=wp-25;const assume=otherPend>0?(prom!=null?prom:need):0;needEF=(meta-ase-otherPend/100*(assume==null?0:assume))/0.25}
  return {ase,wr,wp,prom,maxPos,minPos,need,needEF,efPend,final:wp===0?ase:null,assumeOthers:wp-25>0?(prom!=null?prom:need):null};
}
function viewNotas(){
  setActiveTab('notas');
  const st=store.get('notas',{n:{},meta:11});const n=st.n||{};let meta=st.meta==null?11:st.meta;
  const hist=store.get('simhist',[]);const last=hist[hist.length-1];
  app.innerHTML=`<h1>Notas</h1><p class="muted">Sistema de evaluación del ciclo regular (escala 0–20). Deja vacío lo que aún no rindes: cuenta como pendiente.</p>
  <div class="card grades">${EVALS.map(([k,name,when,w])=>`<div class="row"><div><div class="lab">${k} · ${name} <span class="tag">${w} %</span></div><small class="muted">${when}</small></div><input type="number" id="n-${k}" min="0" max="20" step="0.1" inputmode="decimal" placeholder="Pendiente" value="${n[k]==null?'':n[k]}"><input type="range" id="r-${k}" min="0" max="20" step="0.5" value="${n[k]==null||n[k]===''?0:n[k]}" aria-label="${k} deslizador"></div>`).join('')}
  <div class="row"><div><div class="lab">Meta</div><small class="muted">Nota aprobatoria por defecto: 11</small></div><input type="number" id="meta" min="0" max="20" step="0.5" inputmode="decimal" value="${meta}"></div>
  <div class="btnrow"><button class="btn secondary" id="useSim" ${last?'':'disabled'}>Usar último simulacro como EF${last?` (${fmt(last.nota,1)})`:''}</button><button class="btn ghost" id="clrN">Vaciar notas</button></div></div>
  <div class="card"><h2>Resultado</h2><div id="nres"></div></div>
  <p class="muted"><small>Fórmula: nota = 0,05·EC1 + 0,05·EC2 + 0,20·PC1 + 0,20·PC2 + 0,25·EP + 0,25·EF. No se aplica redondeo: revisa la regla de redondeo de tu universidad.</small></p>`;
  const read=()=>{const o={};EVALS.forEach(([k])=>{const v=$('#n-'+k).value.trim().replace(',','.');o[k]=v===''?'':Math.max(0,Math.min(20,parseFloat(v)))});return o};
  const draw=()=>{const nn=read();meta=parseFloat(String($('#meta').value).replace(',','.'));if(isNaN(meta))meta=11;store.set('notas',{n:nn,meta});const r=calcNotas(nn,meta);
    let msg='';
    if(r.final!=null){msg=r.final>=meta?`<p class="note ok">Nota final: <b>${fmt(r.final)}</b>. Alcanzas la meta de ${fmt(meta,1)}.</p>`:`<p class="note bad">Nota final: <b>${fmt(r.final)}</b>. No alcanzas la meta de ${fmt(meta,1)}.</p>`}
    else if(r.need<=0){msg=`<p class="note ok">Ya tienes asegurada la meta de ${fmt(meta,1)} aunque saques 0 en lo pendiente.</p>`}
    else if(r.need>20){msg=`<p class="note bad"><b>La meta de ${fmt(meta,1)} ya no se puede alcanzar.</b> Nota máxima posible (20 en todo lo pendiente): <b>${fmt(r.maxPos)}</b>.</p>`}
    else{msg=`<p class="note">Necesitas un promedio de <b>${fmt(r.need)}</b> en lo pendiente (${r.wp} % del curso) para llegar a ${fmt(meta,1)}.</p>`}
    let ef='';
    if(r.efPend&&r.final==null){if(r.wp===25)ef=r.needEF<=0?'<p>EF necesario: <b>0</b> (ya llegas a la meta).</p>':r.needEF>20?`<p>EF necesario: <b>${fmt(r.needEF)}</b> → imposible (máximo 20).</p>`:`<p>EF necesario: <b>${fmt(r.needEF)}</b>.</p>`;
      else ef=`<p>EF necesario si en las otras evaluaciones pendientes sacas ${r.assumeOthers==null?'—':fmt(Math.max(0,r.assumeOthers))} (${r.prom!=null?'tu promedio de lo rendido':'el promedio necesario'}): <b>${r.needEF<=0?'0':fmt(r.needEF)}</b>${r.needEF>20?' → imposible con ese supuesto':''}.</p>`}
    $('#nres').innerHTML=`<div class="kpis"><div class="kpi"><div class="v">${r.final!=null?fmt(r.final):'—'}</div><div class="l">Nota final ${r.final==null?'(faltan notas)':''}</div></div><div class="kpi"><div class="v">${fmt(r.ase)}</div><div class="l">Puntos asegurados (de 20)</div></div><div class="kpi"><div class="v">${r.prom==null?'—':fmt(r.prom)}</div><div class="l">Promedio de lo rendido (${r.wr} %)</div></div><div class="kpi"><div class="v">${fmt(r.maxPos)}</div><div class="l">Nota máxima posible</div></div></div>${msg}${ef}`};
  EVALS.forEach(([k])=>{const ni=$('#n-'+k),ri=$('#r-'+k);ni.addEventListener('input',()=>{const v=parseFloat(ni.value.replace(',','.'));if(!isNaN(v))ri.value=Math.max(0,Math.min(20,v));draw()});ri.addEventListener('input',()=>{ni.value=ri.value;draw()})});
  $('#meta').addEventListener('input',draw);
  $('#useSim').onclick=()=>{if(!last)return;$('#n-EF').value=Math.round(last.nota*10)/10;$('#r-EF').value=last.nota;draw()};
  $('#clrN').onclick=()=>{if(!confirm('¿Vaciar todas las notas?'))return;EVALS.forEach(([k])=>{$('#n-'+k).value='';$('#r-'+k).value=0});draw()};
  draw();
}

/* ---------- Router ---------- */
function route(){
  const h=location.hash||'#/teoria';
  if(h.startsWith('#caso-')){const el=document.getElementById(h.slice(1));if(!el){viewCaso();const e2=document.getElementById(h.slice(1));if(e2){if(e2.tagName==='DETAILS')e2.open=true;e2.scrollIntoView()}}else{if(el.tagName==='DETAILS')el.open=true;el.scrollIntoView()}return}
  const [,sec,sub,arg]=h.split('/');
  if(sec!=='simulacro')clearInterval(simTimer);
  try{
    if(sec==='teoria')viewTeoria(sub);
    else if(sec==='caso'){viewCaso();window.scrollTo(0,0)}
    else if(sec==='practica')viewPractica(sub,arg);
    else if(sec==='simulacro')viewSimulacro();
    else if(sec==='notas')viewNotas();
    else viewTeoria();
  }catch(e){console.error(e);app.innerHTML=`<div class="note bad">Ocurrió un error al mostrar esta sección: ${esc(e.message)}</div>`}
  if(!['practica'].includes(sec)||!arg)window.scrollTo(0,0);
}
window.addEventListener('hashchange',route);
route();
window.__APP={calcNotas,RUBRICA,RUB_MAX};
})();
