/* Diagramas SVG con colores del tema (variables CSS). viewBox estrecho para que el texto sea legible en iPhone. */
(function(){
  const F = (v)=>`style="fill:var(${v})"`;
  const S = (v,w)=>`style="stroke:var(${v});stroke-width:${w||1.5};fill:none"`;
  const FS = (f,s,w)=>`style="fill:var(${f});stroke:var(${s});stroke-width:${w||1.5}"`;
  function esc(t){return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;')}
  // texto multilínea centrado; lines separadas por |
  function T(x,y,txt,o={}){
    const lines=String(txt).split('|'); const size=+((o.size||13)*1.1).toFixed(2); const lh=o.lh||size*1.2;
    const y0=y-(lines.length-1)*lh/2; const anchor=o.anchor||'middle'; const w=o.bold?'700':(o.weight||'400');
    return `<text x="${x}" y="${y0}" text-anchor="${anchor}" dominant-baseline="middle" font-size="${size}" font-weight="${w}" ${F(o.color||'--text')}>`+
      lines.map((l,i)=>`<tspan x="${x}" dy="${i?lh:0}">${esc(l)}</tspan>`).join('')+`</text>`;
  }
  function R(x,y,w,h,fill,stroke,rx){return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx==null?8:rx}" ${FS(fill||'--dfill',stroke||'--d1')}/>`}
  function arrowDefs(id){return `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" ${F('--dline')}/></marker></defs>`}
  function L(x1,y1,x2,y2,id,dash){return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${S('--dline',1.6)} ${id?`marker-end="url(#${id})"`:''} ${dash?'stroke-dasharray="4 4"':''}/>`}
  function svg(w,h,body,label){return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label||'Diagrama')}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`}

  const D = {};
  D.porter5 = ()=>{const a='a5f';return svg(420,330,arrowDefs(a)+
    R(130,125,160,80,'--dfill','--d1')+T(210,155,'Rivalidad entre|competidores',{bold:true})+T(210,190,'(intensidad)',{size:11,color:'--muted'})+
    R(140,10,140,60,'--dfill2','--d3')+T(210,40,'Amenaza de|nuevos entrantes')+
    R(140,260,140,60,'--dfill2','--d3')+T(210,290,'Amenaza de|sustitutos')+
    R(5,135,110,60,'--dfill3','--d2')+T(60,165,'Poder de|proveedores')+
    R(305,135,110,60,'--dfill3','--d2')+T(360,165,'Poder de|compradores')+
    L(210,72,210,122,a)+L(210,258,210,208,a)+L(117,165,127,165,a)+L(303,165,293,165,a),'Cinco fuerzas de Porter')};

  D.cadena = ()=>{const xs=[0,84,168,252,336],labs=['Abasteci-|miento','Produc-|ción','Distri-|bución','Marketing|y ventas','Servicio y|recompra'];
    let b='';xs.forEach((x,i)=>{b+=`<path d="M${x+2},20 L${x+70},20 L${x+82},60 L${x+70},100 L${x+2},100 L${x+14},60 Z" ${FS(i===3?'--dfill2':'--dfill',i===3?'--d3':'--d1')}/>`+T(x+44,60,labs[i],{size:10})});
    b+=`<path d="M10,118 L410,118" ${S('--dline',1.2)}/>`+T(210,135,'Actividades primarias → ¿en qué eslabón se crea (o se pierde) valor?',{size:11.5,color:'--muted'});
    return svg(420,150,b,'Cadena de valor: actividades primarias')};

  D.genericas = ()=>svg(420,290,
    T(165,14,'Ventaja en costo',{size:12,bold:true})+T(325,14,'Diferenciación',{size:12,bold:true})+
    T(40,90,'Todo el|sector',{size:12,bold:true})+T(40,215,'Un|segmento',{size:12,bold:true})+
    R(85,30,160,120,'--surface-2','--dline',4)+T(165,90,'Liderazgo|en costo',{bold:true,size:14})+
    R(250,30,160,120,'--dfill','--d1',4)+T(330,90,'Diferenciación',{bold:true,size:14})+
    R(85,155,325,120,'--dfill3','--d2',4)+T(247,195,'Segmentación / Enfoque',{bold:true,size:14})+
    T(165,240,'(especializada|en costo)',{size:12})+T(330,240,'(especializada en|diferenciación)',{size:12})+
    `<circle cx="247" cy="152" r="16" ${FS('--bad-bg','--d5',2)}/>`+T(247,152,'!',{bold:true,color:'--d5'})+
    T(247,286,'Círculo rojo = “atrapado a la mitad”: querer ser todo para todos',{size:11,color:'--muted'}),'Estrategias genéricas de Porter');

  D.ansoff = ()=>{const a='aan';return svg(420,300,arrowDefs(a)+
    T(205,14,'Productos actuales',{size:12,bold:true})+T(335,14,'Productos nuevos',{size:12,bold:true})+
    T(70,85,'Mercados|actuales',{size:12,bold:true})+T(70,195,'Mercados|nuevos',{size:12,bold:true})+
    R(140,30,130,105,'--dfill','--d1',6)+T(205,82,'Penetración|de mercados',{bold:true})+
    R(275,30,130,105,'--dfill2','--d3',6)+T(340,82,'Desarrollo de|nuevos|productos',{bold:true})+
    R(140,140,130,105,'--dfill3','--d2',6)+T(205,192,'Desarrollo de|nuevos|mercados',{bold:true})+
    R(275,140,130,105,'--orange-bg','--d4',6)+T(340,192,'Diversificación',{bold:true})+
    L(150,268,400,268,a)+T(275,284,'Mayor riesgo →',{size:11,color:'--muted'})+
    L(122,40,122,240,a)+T(16,140,'Mayor|riesgo|↓',{size:11,color:'--muted',anchor:'start'}),'Matriz de Ansoff')};

  D.uppsala = ()=>{const a='aup';const modes=['Exportación','Licencias y franquicias','Distribuidores o agentes','Filial comercial propia','Planta de producción o adquisición local'];
    let b=arrowDefs(a)+`<line x1="40" y1="20" x2="40" y2="250" ${S('--d4',4)} marker-end="url(#${a})"/>`+T(40,10,'− compromiso',{size:11,bold:true})+T(40,268,'+ compromiso',{size:11,bold:true});
    modes.forEach((m,i)=>{const y=34+i*46;b+=R(70,y,330,36,i<2?'--dfill':'--dfill2',i<2?'--d1':'--d3',6)+T(235,y+18,m,{size:12.5})});
    return svg(420,280,b,'Etapas de internacionalización (Uppsala) y compromiso')};

  D.schein = ()=>svg(420,270,
    `<path d="M210,10 L410,260 L10,260 Z" ${FS('--dfill','--d1',1.5)}/>`+
    `<line x1="130" y1="110" x2="290" y2="110" ${S('--d1',1.5)}/><line x1="70" y1="185" x2="350" y2="185" ${S('--d1',1.5)}/>`+
    T(210,75,'Artefactos|lo que se ve',{size:12.5,bold:true})+T(210,148,'Valores declarados|lo que se dice',{size:12.5,bold:true})+T(210,222,'Supuestos subyacentes|lo que se cree y siente',{size:12.5,bold:true}),'Niveles de la cultura de Schein');

  D.iceberg = ()=>svg(420,230,
    `<rect x="0" y="80" width="420" height="150" ${F('--dfill')}/>`+`<line x1="0" y1="80" x2="420" y2="80" ${S('--d1',2)} stroke-dasharray="6 4"/>`+
    `<path d="M170,80 L200,25 L230,45 L255,80 Z" ${FS('--surface','--d1',1.5)}/>`+`<path d="M150,80 L270,80 L320,150 L250,220 L150,215 L100,150 Z" ${FS('--dfill2','--d3',1.5)}/>`+
    T(330,40,'ARTEFACTOS|(creaciones)',{size:12,bold:true})+T(60,105,'VALORES',{size:12,bold:true})+T(210,175,'PRINCIPIOS|(asunciones)',{size:12,bold:true}),'Iceberg de la cultura: la necesidad de coherencia');

  D.satir = ()=>{const a='asa';return svg(420,250,arrowDefs(a)+
    L(30,215,410,215,a)+L(30,215,30,15,a)+T(14,115,'Desempeño',{size:11,color:'--muted'}).replace('<text','<text transform="rotate(-90 14 115)"')+T(395,232,'Tiempo',{size:11,color:'--muted'})+
    `<path d="M40,110 L120,110" ${S('--dline',5)}/>`+
    `<path d="M120,110 C130,90 135,95 140,100 C150,130 150,170 175,180 C200,190 205,150 215,175 C225,195 230,140 240,140" ${S('--d5',4)}/>`+
    `<path d="M240,140 C265,110 285,70 300,55" ${S('--warn',5)}/>`+`<path d="M300,55 L395,50" ${S('--ok',5)}/>`+
    R(78,16,104,30,'--text','--text',3)+T(130,31,'Elemento externo',{size:9.5,color:'--surface'})+
    R(190,16,118,30,'--text','--text',3)+T(249,31,'Idea transformadora',{size:9.5,color:'--surface'})+
    T(75,130,'1. Status|quo tardío',{size:10.5})+T(130,150,'2. Resis-|tencia',{size:10.5})+T(185,205,'3. Caos',{size:10.5})+T(275,110,'4. Integración',{size:10.5})+T(350,72,'5. Nuevo|status quo',{size:10.5}),'Modelo de cambio de Satir')};

  D.bscmap = ()=>{const a='abs';return svg(420,300,arrowDefs(a)+
    R(150,115,120,70,'--dfill','--d1')+T(210,150,'Visión y|estrategia',{bold:true})+
    R(140,8,140,62,'--dfill2','--d3')+T(210,30,'Financiera',{bold:true,size:12.5})+T(210,52,'¿Cómo nos ven los|accionistas?',{size:10.5})+
    R(295,118,120,64,'--dfill3','--d2')+T(355,138,'Clientes',{bold:true,size:12.5})+T(355,162,'¿Cómo nos ven|los clientes?',{size:10.5})+
    R(5,118,120,64,'--dfill3','--d2')+T(65,135,'Procesos',{bold:true,size:12.5})+T(65,160,'¿En qué debemos|ser excelentes?',{size:10.5})+
    R(130,230,160,62,'--dfill2','--d3')+T(210,250,'Aprendizaje y|crecimiento',{bold:true,size:12.5})+T(210,278,'¿Podemos seguir mejorando?',{size:10})+
    L(210,228,210,188,a)+L(127,150,147,150,a)+L(272,150,292,150,a)+L(210,112,210,72,a),'Mapa estratégico del Balanced Scorecard')};

  D.riesgos = ()=>{const col={1:'--ok-bg',2:'--ok-bg',3:'--warn-bg',4:'--warn-bg',6:'--orange-bg',9:'--bad-bg'};const lab={1:'Bajo',2:'Bajo',3:'Medio',4:'Medio',6:'Alto',9:'Crítico'};
    let b=T(250,12,'Probabilidad →',{size:12,bold:true});['Baja (1)','Media (2)','Alta (3)'].forEach((p,i)=>b+=T(150+i*100,32,p,{size:11.5}));
    b+=T(18,140,'Impacto →',{size:12,bold:true}).replace('<text','<text transform="rotate(-90 18 140)"');
    ['Alto (3)','Medio (2)','Bajo (1)'].forEach((p,r)=>{b+=T(65,75+r*70,p,{size:11.5});[1,2,3].forEach((pr,c)=>{const imp=3-r,v=imp*pr;b+=R(100+c*100,42+r*70,98,66,col[v],'--border',4)+T(149+c*100,68+r*70,String(v),{bold:true,size:16})+T(149+c*100,92+r*70,lab[v],{size:11})})});
    return svg(410,260,b,'Matriz de riesgos impacto por probabilidad')};

  D.dyllick = ()=>{let b='';const st=[['Business|as usual','--surface-2','--dline'],['BST 1.0|Valor al|accionista|refinado','--dfill','--d1'],['BST 2.0|Triple|resultado','--dfill2','--d3'],['BST 3.0|Sostenibilidad|verdadera','--dfill3','--d2']];
    st.forEach((s,i)=>{const h=70+i*45,x=10+i*102;b+=R(x,250-h,96,h,s[1],s[2],4)+T(x+48,250-h+Math.min(h/2,45),s[0],{size:10.5,bold:i===3})});
    b+=T(160,40,'+ palanca de|costo y riesgo',{size:10,color:'--muted'})+T(350,18,'Cambio de propósito',{size:10,color:'--d2',bold:true});
    return svg(420,260,b,'Tipología de sostenibilidad empresarial Dyllick y Muff')};

  D.embedded = ()=>svg(420,250,`<circle cx="210" cy="125" r="118" ${FS('--dfill3','--d2',2)}/><circle cx="235" cy="145" r="80" ${FS('--warn-bg','--warn',2)}/><circle cx="258" cy="162" r="42" ${FS('--bad-bg','--d5',2)}/>`+
    T(150,40,'Ambiente saludable',{size:12,bold:true})+T(205,95,'Sociedad',{size:12,bold:true})+T(258,162,'Sistema|económico',{size:10.5,bold:true}),'Perspectiva embedded de sostenibilidad (Giddings, 2002)');

  D.bocken = ()=>{const fam=[['Tecnológicos','1. Maximizar eficiencia|2. Crear valor del residuo|3. Sustituir por renovables','--dfill','--d1'],['Sociales','4. Funcionalidad, no propiedad|5. Rol de custodio|6. Fomentar la suficiencia','--dfill2','--d3'],['Organizacionales','7. Re-propósito para la|sociedad|8. Soluciones para escalar','--dfill3','--d2']];
    let b='';fam.forEach((f,i)=>{const y=6+i*80;b+=R(5,y,410,72,f[2],f[3],8)+T(70,y+36,f[0],{bold:true,size:13})+T(270,y+36,f[1],{size:12})});return svg(420,250,b,'Ocho arquetipos de Bocken en tres familias')};

  D.harvard = ()=>{const p=[['1 Personas','Separa a las personas|del problema'],['2 Intereses','Intereses, no|posiciones'],['3 Opciones','Opciones de|beneficio mutuo'],['4 Criterios','Criterios objetivos|(+ MAPAN)']];let b='';
    p.forEach((q,i)=>{const x=5+(i%2)*208,y=5+Math.floor(i/2)*92;b+=R(x,y,202,84,i%2?'--dfill2':'--dfill',i%2?'--d3':'--d1')+T(x+101,y+24,q[0],{bold:true,size:14})+T(x+101,y+56,q[1],{size:12})});return svg(420,190,b,'Cuatro pilares del método Harvard')};

  D.foda = ()=>{let b=R(5,5,120,60,'--surface-2','--border',4)+T(65,35,'FODA cruzado',{bold:true,size:12})+R(130,5,140,60,'--ok-bg','--ok',4)+T(200,35,'Oportunidades (O)',{bold:true,size:12})+R(275,5,140,60,'--bad-bg','--d5',4)+T(345,35,'Amenazas (A)',{bold:true,size:12})+
    R(5,70,120,90,'--ok-bg','--ok',4)+T(65,115,'Fortalezas|(F)',{bold:true,size:12})+R(5,165,120,90,'--bad-bg','--d5',4)+T(65,210,'Debilidades|(D)',{bold:true,size:12})+
    R(130,70,140,90,'--dfill','--d1',4)+T(200,115,'FO|usar F para|aprovechar O',{size:11.5})+R(275,70,140,90,'--dfill2','--d3',4)+T(345,115,'FA|usar F para|enfrentar A',{size:11.5})+
    R(130,165,140,90,'--dfill3','--d2',4)+T(200,210,'DO|superar D|aprovechando O',{size:11.5})+R(275,165,140,90,'--orange-bg','--d4',4)+T(345,210,'DA|reducir D|y evitar A',{size:11.5});return svg(420,260,b,'FODA cruzado')};

  D.mintzberg = ()=>{const p=[['Plan','lo que se|declara'],['Pauta de|acción','lo que se|hace'],['Posición','dónde|compite'],['Perspectiva','propósito|y visión'],['Patrón /|Estratagema','maniobra|táctica']];let b='';
    p.forEach((q,i)=>{const cx=44+i*83;b+=`<circle cx="${cx}" cy="70" r="40" ${FS(i%2?'--dfill2':'--dfill',i%2?'--d3':'--d1',1.5)}/>`+T(cx,70,q[0],{bold:true,size:10})+T(cx,138,q[1],{size:10,color:'--muted'})});
    return svg(420,165,b,'5P de Mintzberg')};

  D.lideres = ()=>{const p=[['A · Architect','Construye cultura|y capacidades|para colaborar,|experimentar|y aprender'],['B · Bridger','Puente entre|el interior y|el exterior: trae|talento y|tecnología'],['C · Catalyst','Acelera la|cocreación en|todo el ecosistema|(industria, país)']];let b='';
    p.forEach((q,i)=>{const x=5+i*138;b+=R(x,5,132,170,['--dfill','--dfill2','--dfill3'][i],['--d1','--d3','--d2'][i])+T(x+66,30,q[0],{bold:true,size:11.5})+T(x+66,105,q[1],{size:10.5})});return svg(420,180,b,'Habilidades del nuevo líder')};

  D.laglead = ()=>svg(420,150,R(5,5,200,140,'--dfill','--d1')+T(105,28,'LAG (pasado)',{bold:true})+T(105,88,'Indicadores de|resultado: miden|el éxito final.|Ej.: ROI, ventas,|satisfacción',{size:11})+
    R(215,5,200,140,'--dfill2','--d3')+T(315,28,'LEAD (futuro)',{bold:true})+T(315,88,'Inductores de|actuación: miden|las acciones que|llevan al logro. Ej.:|horas de capacitación',{size:11}),'Indicadores lag y lead');

  D.margen = (s,b)=>{ // s: punto de retiro vendedor, b: del comprador
    s=s||4000;b=b||4500;const lo=Math.min(s,b)*0.85,hi=Math.max(s,b)*1.12;const X=v=>20+(v-lo)/(hi-lo)*380;const ok=s<=b;
    let g=`<line x1="20" y1="70" x2="400" y2="70" ${S('--dline',2)}/>`;
    if(ok)g+=`<rect x="${X(s)}" y="58" width="${Math.max(2,X(b)-X(s))}" height="24" style="fill:var(--ok-bg);stroke:var(--ok)"/>`;
    g+=`<line x1="${X(s)}" y1="40" x2="${X(s)}" y2="100" ${S('--d1',2.5)}/>`+T(X(s),28,'Vendedor: mín.|'+s.toLocaleString('es-PE'),{size:11})+
      `<line x1="${X(b)}" y1="40" x2="${X(b)}" y2="100" ${S('--d3',2.5)}/>`+T(X(b),118,'Comprador: máx.|'+b.toLocaleString('es-PE'),{size:11});
    g+=T(210,145,ok?'Zona verde = margen de negociación (acuerdo posible)':'Sin traslape: no hay acuerdo que mejore ambas MAPAN',{size:11,color:ok?'--ok':'--d5'});
    return svg(420,155,g,'Margen de negociación entre puntos de retiro')};

  window.DIAGRAMS = D;
  window.diagram = function(id,caption,...args){const f=D[id];if(!f)return '';return `<figure class="diagram">${f(...args)}${caption?`<figcaption>${caption}</figcaption>`:''}</figure>`};
})();
