/* Generadores con autograder. Funciona en navegador (window.GEN) y en Node (module.exports). */
(function(root){
  function rng(seed){let a=(seed>>>0)||1;return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
  const pick=(r,arr)=>arr[Math.floor(r()*arr.length)];
  const between=(r,a,b)=>a+(b-a)*r();
  const randInt=(r,a,b)=>Math.floor(between(r,a,b+1));
  function shuffle(r,arr){const a=arr.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
  const fmt=(v,d)=>Number(v).toLocaleString('es-PE',{minimumFractionDigits:d,maximumFractionDigits:d});
  const fmtInt=v=>Number(v).toLocaleString('es-PE',{maximumFractionDigits:0});

  /* ---------- Normalización de respuestas ---------- */
  function normText(s){return String(s==null?'':s).normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/\s+/g,' ').trim()}
  function parseNum(input,kind){
    if(input==null)return NaN; let s=String(input).toLowerCase().replace(/ /g,' ').trim();
    if(!s)return NaN;
    s=s.replace(/s\/\.?|pen|soles?|puntos?|pts?|dias?|días?/g,'').replace(/\s+/g,'');
    let pct=false; if(s.endsWith('%')){pct=true;s=s.slice(0,-1)}
    if(/^[-+]?\d+(?:[.,]\d+)?\/[-+]?\d+(?:[.,]\d+)?$/.test(s)){const [a,b]=s.split('/');const v=parseNum(a)/parseNum(b);return v}
    const hasC=s.includes(','),hasD=s.includes('.');
    if(hasC&&hasD){ if(s.lastIndexOf(',')>s.lastIndexOf('.')) s=s.replace(/\./g,'').replace(',','.'); else s=s.replace(/,/g,''); }
    else if(hasC||hasD){ const sep=hasC?',':'.'; const n=s.split(sep).length-1;
      if(n>1) s=s.split(sep).join('');
      else if(kind==='money' && /^[-+]?\d{1,3}[.,]\d{3}$/.test(s)) s=s.replace(sep,'');
      else s=s.replace(',','.'); }
    if(!/^[-+]?\d*\.?\d+$/.test(s))return NaN;
    const v=parseFloat(s); return v;
  }
  function checkField(f,ans){
    if(f.type==='text'){const a=normText(ans);if(!a)return false;return f.accept.some(x=>normText(x)===a)}
    const v=parseNum(ans,f.type);if(!isFinite(v))return false;
    if(f.type==='pct'){return Math.abs(v-f.expected)<=f.tol||Math.abs(v*100-f.expected)<=f.tol}
    return Math.abs(v-f.expected)<=f.tol;
  }
  function grade(g,answers){const res={};let ok=0;g.fields.forEach(f=>{res[f.key]=checkField(f,answers[f.key]);if(res[f.key])ok++});return {res,ok,total:g.fields.length}}
  function semaforo(p){return p>=85?'verde':p>=70?'amarillo':'rojo'}

  /* ---------- 1. Balanced Scorecard ponderado ---------- */
  const POOL={
    'Financiera':[{n:'Margen operativo',u:'%',t:'max',m:[8,25],d:0},{n:'Crecimiento de ingresos',u:'%',t:'max',m:[6,20],d:0},{n:'Retorno de inversión (ROI)',u:'%',t:'max',m:[10,24],d:0},{n:'Costo operativo por pedido',u:'S/',t:'min',m:[12,30],d:0}],
    'Clientes':[{n:'Índice de satisfacción del cliente',u:'%',t:'max',m:[75,95],d:0},{n:'Tasa de retención de clientes',u:'%',t:'max',m:[60,85],d:0},{n:'Tasa de recompra',u:'%',t:'max',m:[30,60],d:0},{n:'Reclamos por cada 1 000 pedidos',u:'',t:'min',m:[4,12],d:0}],
    'Procesos internos':[{n:'Tiempo promedio de entrega',u:'días',t:'min',m:[3,10],d:0},{n:'Pedidos sin error',u:'%',t:'max',m:[90,99],d:0},{n:'Pedidos de consultoras hechos en digital',u:'%',t:'max',m:[40,80],d:0},{n:'Tiempo de atención',u:'min',t:'min',m:[8,20],d:0}],
    'Aprendizaje y crecimiento':[{n:'Equipo capacitado en herramientas digitales',u:'%',t:'max',m:[60,90],d:0},{n:'Horas de capacitación por empleado',u:'h',t:'max',m:[20,48],d:0},{n:'Rotación de personal clave',u:'%',t:'min',m:[6,15],d:0},{n:'Índice de clima laboral',u:'pts',t:'max',m:[70,90],d:0}]
  };
  const PERSP=Object.keys(POOL);
  const PW=[[45,20,20,15],[40,25,20,15],[35,25,25,15],[30,30,25,15],[40,30,20,10],[35,30,20,15],[30,25,25,20]];
  const EMPRESAS=['Andes Market','Pulso Fit','Lumina Belleza','AgroSense','Rapidito Delivery','Clínica Horizonte','Cacao Nativo','TecnoAndes'];
  function genBSC(seed){
    for(let attempt=0;attempt<50;attempt++){
      const r=rng(seed*7919+attempt*104729+11);
      const pw=pick(r,PW); const ind=[];
      PERSP.forEach((p,pi)=>{const k=pw[pi]>=20&&r()<0.7?2:1; const opts=shuffle(r,POOL[p]).slice(0,k);
        let w1=k===2?randInt(r,Math.max(2,Math.round(pw[pi]*0.35)),Math.round(pw[pi]*0.65)):pw[pi];
        opts.forEach((o,j)=>{const peso=k===2?(j===0?w1:pw[pi]-w1):pw[pi];
          const meta=randInt(r,o.m[0],o.m[1]); let actual;
          if(o.t==='max') actual=Math.max(1,Math.round(meta*between(r,0.5,1.12))); else actual=Math.max(1,Math.round(meta*between(r,0.88,1.6)));
          let pct=o.t==='max'?Math.min(actual/meta,1)*100:Math.min(meta/actual,1)*100;
          ind.push({p,n:o.n,u:o.u,t:o.t,peso,meta,actual,pct,pts:peso*pct/100});});});
      const totW=ind.reduce((s,x)=>s+x.peso,0); if(totW!==100)continue;
      const per=PERSP.map(p=>{const xs=ind.filter(x=>x.p===p);const w=xs.reduce((s,x)=>s+x.peso,0),pts=xs.reduce((s,x)=>s+x.pts,0);return {p,w,pts,ratio:pts/w*100}});
      const sorted=per.slice().sort((a,b)=>a.ratio-b.ratio); if(sorted[1].ratio-sorted[0].ratio<1)continue;
      const total=ind.reduce((s,x)=>s+x.pts,0);
      if(Math.abs(total-85)<0.6||Math.abs(total-70)<0.6)continue; // evita ambigüedad en el corte
      const hid=Math.floor(r()*ind.length);
      const empresa=pick(r,EMPRESAS);
      const fields=[{key:'peso',label:`Peso faltante del indicador “${ind[hid].n}”`,type:'num',expected:ind[hid].peso,tol:0.01}];
      ind.forEach((x,i)=>{fields.push({key:'pct'+i,label:`% de cumplimiento · ${x.n}`,type:'pct',expected:x.pct,tol:0.6});fields.push({key:'pts'+i,label:`Puntos · ${x.n}`,type:'num',expected:x.pts,tol:0.06})});
      fields.push({key:'total',label:'Puntaje total del BSC (sobre 100)',type:'num',expected:total,tol:0.15});
      const sem=semaforo(total);
      fields.push({key:'sem',label:'Semáforo global (verde / amarillo / rojo)',type:'text',expected:sem,accept:[sem]});
      const crit=sorted[0].p; const acc={'Financiera':['financiera','finanzas','perspectiva financiera'],'Clientes':['clientes','cliente','perspectiva clientes','perspectiva de clientes'],'Procesos internos':['procesos internos','procesos','proceso','perspectiva de procesos'],'Aprendizaje y crecimiento':['aprendizaje y crecimiento','aprendizaje','aprendizaje y desarrollo','desarrollo y crecimiento']};
      fields.push({key:'crit',label:'Perspectiva más crítica (menor % de logro sobre su peso)',type:'text',expected:crit,accept:acc[crit]});
      let rows=ind.map((x,i)=>`<tr><td>${x.p}</td><td>${x.n}${x.u?` (${x.u})`:''}<br><small>${x.t==='max'?'Mayor es mejor':'Menor es mejor'}</small></td><td class="num">${i===hid?'<b>?</b>':x.peso}</td><td class="num">${fmtInt(x.meta)}</td><td class="num">${fmtInt(x.actual)}</td></tr>`).join('');
      const enun=`<p><b>${empresa}</b> cerró el semestre y revisa su Balanced Scorecard. Calcula el cumplimiento con las reglas de la clase (Sesión 12):</p>
<ul><li><b>% de cumplimiento</b> = Actual ÷ Meta si <i>mayor es mejor</i>; Meta ÷ Actual si <i>menor es mejor</i>. Tope: 100 %.</li>
<li><b>Puntos</b> = Peso × % de cumplimiento. <b>Puntaje total</b> = suma de puntos (los pesos deben sumar 100).</li>
<li><b>Semáforo</b>: 85–100 verde · 70–84 amarillo · 0–69 rojo.</li></ul>
<div class="tablewrap"><table><thead><tr><th>Perspectiva</th><th>Indicador</th><th class="num">Peso</th><th class="num">Meta</th><th class="num">Actual</th></tr></thead><tbody>${rows}</tbody></table></div>`;
      const sumOthers=totW-ind[hid].peso;
      let sol=`<ol><li><b>Peso faltante</b>: 100 − ${fmtInt(sumOthers)} = <b>${ind[hid].peso}</b> (regla: los pesos suman 100).</li><li><b>Cumplimiento y puntos</b>:<div class="tablewrap"><table><thead><tr><th>Indicador</th><th>Cálculo</th><th class="num">%</th><th class="num">Puntos</th><th>Semáforo</th></tr></thead><tbody>`+
        ind.map(x=>{const raw=x.t==='max'?x.actual/x.meta:x.meta/x.actual;const calc=(x.t==='max'?`${fmtInt(x.actual)} ÷ ${fmtInt(x.meta)}`:`${fmtInt(x.meta)} ÷ ${fmtInt(x.actual)}`)+` = ${fmt(raw*100,1)} %`+(raw>1?' → tope 100 %':'');return `<tr><td>${x.n}</td><td>${calc}</td><td class="num">${fmt(x.pct,1)}</td><td class="num">${x.peso} × ${fmt(x.pct,1)} % = ${fmt(x.pts,2)}</td><td>${semaforo(x.pct)}</td></tr>`}).join('')+`</tbody></table></div></li>`+
        `<li><b>Subtotales</b>: `+per.map(q=>`${q.p}: ${fmt(q.pts,2)} de ${q.w} (${fmt(q.ratio,1)} %)`).join(' · ')+`.</li>`+
        `<li><b>Total</b> = ${fmt(total,2)} → semáforo <b>${sem}</b>.</li><li><b>Perspectiva más crítica</b>: ${crit} (${fmt(sorted[0].ratio,1)} % de su peso). <i>Por lo tanto…</i> ahí van las acciones correctivas y se revisan sus indicadores lead.</li></ol>`;
      return {id:'bsc',title:'BSC ponderado y semáforo',seed,enunciado:enun,fields,solucion:sol,data:{ind,total,hid,sumOthers},
        checks:(ans)=>{const v=parseNum(ans.peso,'num');if(!isFinite(v))return '';const s=sumOthers+v;return Math.abs(s-100)<0.01?`✓ Con tu peso, la suma es ${fmt(s,0)}: los pesos suman 100.`:`✗ Con tu peso, la suma es ${fmt(s,2)}: los pesos deben sumar 100.`}};
    }
    throw new Error('BSC: no se pudo generar con semilla '+seed);
  }

  /* ---------- 2. Matriz de riesgos (impacto × probabilidad, 1–3) ---------- */
  const RIESGOS=['Ciberataque al e-commerce','Alta rotación de personal clave','Inflación en insumos importados','Bloqueo de plataforma por regulación local','Demora en adaptaciones tecnológicas','Pérdida de un cliente clave','Fallo en la cadena logística','Campaña sin el impacto esperado','Conflicto de canal con distribuidores','Error en la traducción del catálogo','Tipo de cambio desfavorable','Huelga de transportistas','Retraso de un proveedor crítico','Cambio en la norma de etiquetado','Ingreso de un competidor asiático por e-commerce'];
  const LV=['','Baja','Media','Alta'];
  function nivelRiesgo(v){return v<=2?'bajo':v<=4?'medio':v===6?'alto':'critico'}
  const COLOR={bajo:'verde',medio:'amarillo',alto:'naranja',critico:'rojo'};
  function genRiesgos(seed){
    for(let attempt=0;attempt<80;attempt++){
      const r=rng(seed*6271+attempt*7907+3);const n=5;
      const rs=shuffle(r,RIESGOS).slice(0,n).map(name=>{const p=randInt(r,1,3),i=randInt(r,1,3);return {name,p,i,v:p*i}});
      const max=Math.max(...rs.map(x=>x.v)); if(rs.filter(x=>x.v===max).length!==1)continue;
      const top=rs.findIndex(x=>x.v===max);
      const fields=[];
      rs.forEach((x,k)=>{fields.push({key:'v'+k,label:`Nivel (P × I) · ${x.name}`,type:'num',expected:x.v,tol:0.01});const nv=nivelRiesgo(x.v);fields.push({key:'c'+k,label:`Clasificación · ${x.name}`,type:'text',expected:nv,accept:[nv,COLOR[nv],nv==='critico'?'extremo':nv,nv==='critico'?'muy alto':nv]})});
      fields.push({key:'top',label:'N.º del riesgo prioritario (1–5)',type:'num',expected:top+1,tol:0.01});
      const enun=`<p>Como parte del <b>Paso 5 del BSC</b> (Sesión 12), evalúa estos riesgos estratégicos. Probabilidad e impacto: Baja = 1, Media = 2, Alta = 3.</p>
<ul><li><b>Nivel</b> = Probabilidad × Impacto.</li><li><b>Clasificación</b> según la matriz de la clase: 1–2 <b>bajo</b> (verde) · 3–4 <b>medio</b> (amarillo) · 6 <b>alto</b> (naranja) · 9 <b>crítico</b> (rojo).</li><li>Puedes responder la clasificación con la palabra o con el color.</li></ul>
<div class="tablewrap"><table><thead><tr><th>N.º</th><th>Riesgo</th><th>Probabilidad</th><th>Impacto</th></tr></thead><tbody>${rs.map((x,k)=>`<tr><td>${k+1}</td><td>${x.name}</td><td>${LV[x.p]}</td><td>${LV[x.i]}</td></tr>`).join('')}</tbody></table></div>`;
      const sol=`<ol><li>Convierte a números y multiplica:<div class="tablewrap"><table><thead><tr><th>N.º</th><th>Riesgo</th><th>P × I</th><th>Clasificación</th></tr></thead><tbody>${rs.map((x,k)=>`<tr><td>${k+1}</td><td>${x.name}</td><td>${x.p} × ${x.i} = <b>${x.v}</b></td><td>${nivelRiesgo(x.v).replace('critico','crítico')} (${COLOR[nivelRiesgo(x.v)]})</td></tr>`).join('')}</tbody></table></div></li>
<li>Riesgo prioritario: <b>n.º ${top+1} · ${rs[top].name}</b> (nivel ${max}).</li><li>Siguiente paso (Pasos 4–5): definir mitigación y contingencia, asignar responsable y revisar periódicamente. Ubica cada riesgo en la perspectiva del BSC que afecta.</li></ol>`;
      return {id:'riesgos',title:'Matriz de riesgos',seed,enunciado:enun,fields,solucion:sol,data:{rs,top}};
    }
    throw new Error('Riesgos: semilla '+seed);
  }

  /* ---------- 3. Margen de negociación con MAPAN ---------- */
  const NEG=[{v:'una agencia de branding',c:'una tienda de ropa',srv:'el rediseño de marca',alt:'otro cliente que ofrece',altc:'otra agencia más genérica'},
    {v:'un taller de confección',c:'una marca de moda',srv:'un lote de 2 000 polos',alt:'un pedido de otro cliente por',altc:'un taller con más devoluciones'},
    {v:'una consultora de software',c:'una clínica',srv:'el sistema de citas',alt:'un proyecto con un banco por',altc:'un proveedor sin experiencia en salud'},
    {v:'un proveedor de cacao fino',c:'una chocolatería',srv:'la cosecha de la temporada',alt:'un exportador que ofrece',altc:'un cacao estándar de otro proveedor'},
    {v:'una productora audiovisual',c:'una cadena de gimnasios',srv:'la campaña de lanzamiento',alt:'una campaña para una marca de bebidas por',altc:'una productora con menos portafolio'}];
  function genNeg(seed){
    const r=rng(seed*3571+17);const s=pick(r,NEG);
    const costo=randInt(r,20,40)*100;
    const altV=costo+randInt(r,-4,10)*100; // oferta alternativa del vendedor
    const retV=Math.max(costo,altV);
    const presupuesto=randInt(r,35,70)*100;
    const precioAlt=randInt(r,25,50)*100; const extra=randInt(r,2,12)*100; // valor extra que el comprador asigna a este vendedor
    const retC=Math.min(presupuesto,precioAlt+extra);
    const posible=retV<=retC; const margen=posible?retC-retV:0;
    const fields=[{key:'rv',label:'Punto de retiro del vendedor (S/)',type:'money',expected:retV,tol:0.5},
      {key:'rc',label:'Punto de retiro del comprador (S/)',type:'money',expected:retC,tol:0.5},
      {key:'ok',label:'¿Hay acuerdo posible? (sí / no)',type:'text',expected:posible?'si':'no',accept:posible?['si','sí','yes']:['no']},
      {key:'m',label:'Amplitud del margen de negociación (S/; 0 si no hay)',type:'money',expected:margen,tol:0.5}];
    const enun=`<p>Negociación por <b>${s.srv}</b> entre <b>${s.v}</b> (vende) y <b>${s.c}</b> (compra). Información confidencial de cada parte:</p>
<div class="tablewrap"><table><tbody>
<tr><th colspan="2">Vendedor</th></tr><tr><td>Costo real del trabajo (debajo trabaja a pérdida)</td><td class="num">S/ ${fmtInt(costo)}</td></tr><tr><td>MAPAN: ${s.alt}</td><td class="num">S/ ${fmtInt(altV)}</td></tr>
<tr><th colspan="2">Comprador</th></tr><tr><td>Presupuesto máximo</td><td class="num">S/ ${fmtInt(presupuesto)}</td></tr><tr><td>MAPAN: contratar ${s.altc} por</td><td class="num">S/ ${fmtInt(precioAlt)}</td></tr><tr><td>Valor adicional que asigna a este vendedor (calidad, plazo, experiencia)</td><td class="num">S/ ${fmtInt(extra)}</td></tr>
</tbody></table></div>
<p><b>Reglas</b> (basadas en el caso Forma Studio – Raíz, Sesión 11): el vendedor no acepta menos que su costo ni menos que lo que le da su MAPAN → <i>retiro vendedor = máx(costo, MAPAN)</i>. El comprador no paga más que su presupuesto ni más que su MAPAN más el valor adicional → <i>retiro comprador = mín(presupuesto, MAPAN + valor adicional)</i>. Hay margen si retiro vendedor ≤ retiro comprador.</p>`;
    const sol=`<ol><li>Retiro del vendedor = máx(${fmtInt(costo)}; ${fmtInt(altV)}) = <b>S/ ${fmtInt(retV)}</b>.</li><li>Retiro del comprador = mín(${fmtInt(presupuesto)}; ${fmtInt(precioAlt)} + ${fmtInt(extra)} = ${fmtInt(precioAlt+extra)}) = <b>S/ ${fmtInt(retC)}</b>.</li>
<li>${posible?`${fmtInt(retV)} ≤ ${fmtInt(retC)} → <b>sí</b> hay acuerdo posible; margen = ${fmtInt(retC)} − ${fmtInt(retV)} = <b>S/ ${fmtInt(margen)}</b>.`:`${fmtInt(retV)} &gt; ${fmtInt(retC)} → <b>no</b> hay acuerdo que mejore la MAPAN de ambos; margen = <b>0</b>.`}</li>
<li>Lectura Harvard: ${posible?'dentro del margen, usa criterios objetivos (precio de mercado, precedentes) y opciones de beneficio mutuo (p. ej., visibilidad en portafolio, referidos, pago en partes) para repartir valor.':'antes de retirarse, explora intereses y opciones que cambien los números (alcance menor, plazos, pago por resultados); si no cambian, conviene ir a la MAPAN.'}</li></ol>`+(root.DIAGRAMS?root.DIAGRAMS.margen(retV,retC):'');
    return {id:'neg',title:'Margen de negociación (MAPAN)',seed,enunciado:enun,fields,solucion:sol,data:{costo,altV,presupuesto,precioAlt,extra,retV,retC,posible,margen}};
  }

  const GENS={bsc:genBSC,riesgos:genRiesgos,neg:genNeg};
  // respuesta de referencia (para pruebas): formatea expected como lo escribiría un estudiante
  function referenceAnswers(g,style){const a={};g.fields.forEach((f,i)=>{if(f.type==='text'){a[f.key]=f.accept[0]}else{let v=f.expected;let s=f.type==='money'?String(Math.round(v)):(Math.round(v*100)/100).toString();
    if(style===1)s=s.replace('.',',');if(style===2&&f.type==='pct')s=s+'%';if(style===3&&f.type==='pct')s=String(Math.round(v*10)/1000);a[f.key]=s}});return a}
  const API={rng,parseNum,normText,checkField,grade,GENS,genBSC,genRiesgos,genNeg,referenceAnswers,semaforo,nivelRiesgo};
  if(typeof module!=='undefined'&&module.exports)module.exports=API; else root.GEN=API;
})(typeof window!=='undefined'?window:globalThis);
