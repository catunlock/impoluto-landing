// Textos en español. Mismas claves que en.js.
export default {
  lang: 'es',
  locale: 'es_ES',
  path: '/es/',
  label: 'Español',
  meta: {
    title: 'Impoluto: tareas de casa y limpieza, repartidas de forma justa',
    description:
      'Impoluto convierte tu casa en un mapa 3D con cada tarea de limpieza en su sitio, y reparte las tareas de forma justa entre quienes vivís en ella.',
    ogAlt: 'Impoluto: tu casa en un mapa 3D con las tareas que tocan',
  },
  skip: 'Ir al contenido',
  nav: { how: 'Cómo funciona', features: 'Qué hace', faq: 'Preguntas', cta: 'Abrir la app', menu: 'Menú' },
  langSuggest: { text: 'Prefer to read this page in English?', link: 'View in English', close: 'Cerrar' },
  hero: {
    eyebrow: 'Tareas de casa y limpieza',
    title: 'La casa en orden,<br>sin discutir.',
    lead:
      'Impoluto convierte tu casa en un mapa 3D con cada tarea de limpieza en su sitio, y las reparte de forma justa entre quienes vivís en ella.',
    cta: 'Crear mi casa',
    ctaNote: 'Gratis durante el acceso anticipado',
    secondary: 'Ver cómo funciona',
    platforms: 'Ya en la web. Las apps de Android y iPhone, muy pronto.',
    shotDesktop: 'El mapa 3D de una casa en Impoluto, con un punto sobre cada cosa que hay que limpiar',
    shotPhone: 'La pantalla Hoy: las tareas que te tocan, con la habitación y los minutos de cada una',
  },
  facts: [
    { n: '45', t: 'muebles y electrodomésticos, cada uno con sus tareas' },
    { n: '75', t: 'tareas preparadas solas en un piso típico de tres dormitorios' },
    { n: '4 semanas', t: 'de historial detrás de cada reparto' },
  ],
  how: {
    kicker: 'Cómo funciona',
    title: 'Del plano al reparto en cuatro pasos',
    steps: [
      {
        t: 'Dibuja tu casa',
        d: 'Sube el plano del anuncio de la inmobiliaria e Impoluto saca las habitaciones, las paredes, las puertas y las ventanas. ¿No tienes plano? Elige uno tipo por metros, dormitorios y baños, o dibújalo desde cero.',
      },
      {
        t: 'Pon lo que tienes',
        d: 'Elige del catálogo de muebles y electrodomésticos, con colores y acabados. O toca «Amueblar automáticamente» y ajusta a partir de ahí.',
      },
      {
        t: 'Las tareas salen solas',
        d: 'Cada cosa trae las suyas: la nevera, el horno, la campana, las ventanas. Cada habitación añade las de su tipo, según sus metros.',
      },
      {
        t: 'Invita a quienes viven contigo',
        d: 'Manda las invitaciones por email. Impoluto reparte lo que toca y va rotando para que a nadie le toque siempre lo mismo.',
      },
    ],
  },
  features: {
    kicker: 'Qué hace',
    title: 'Cada cosa en su sitio, también las tareas',
    rows: [
      {
        t: 'Lo que falta, de un vistazo',
        d: 'Tu casa en 3D con un punto sobre cada cosa pendiente: rojo si está atrasada, naranja si toca hoy, azul si toca pronto. Tocas el punto y la marcas como hecha.',
        points: ['Ver solo lo tuyo', 'En el móvil o en una pantalla grande'],
        img: 'map-phone',
        alt: 'El mapa 3D en el móvil, con puntos de colores para lo atrasado, lo de hoy y lo de pronto',
        kind: 'phone',
      },
      {
        t: 'Cada cosa trae sus tareas',
        d: 'Pones una nevera en la cocina y aparece «limpiar el interior, cada mes». Pones una ventana y salen los cristales. Tú decides qué hacéis de verdad, cada cuánto y cuánto se tarda.',
        points: ['Apaga lo que no hacéis', 'Cambia la frecuencia y los minutos', 'Añade tareas vuestras'],
        img: 'furniture-3d',
        alt: 'El editor de muebles en 3D junto al catálogo, con las tareas que trae cada mueble',
        kind: 'desktop',
      },
      {
        t: 'Justo por minutos, no por turnos',
        d: 'No es lo mismo sacar la basura que limpiar el horno. Cada tarea que toca va a quien menos minutos lleva en las últimas cuatro semanas, y nunca dos veces seguidas a la misma persona.',
        points: ['¿Alguien hace la mitad? Ponle su parte al 50 %', 'Las tareas de un dormitorio pueden ser de quien duerme en él', 'Todos veis cómo va el reparto'],
        img: 'fair-phone',
        alt: 'El reparto de las últimas cuatro semanas: tres personas con casi los mismos minutos',
        kind: 'phone',
      },
      {
        t: 'Tu plano, en 3D en minutos',
        d: 'Impoluto lee el plano en la propia app, sin IA, y saca la escala con los metros útiles. Luego corriges lo que haga falta en el editor 2D: mover esquinas, partir habitaciones, poner puertas y ventanas, elegir suelos y el color de las paredes.',
        points: ['Sube un plano, parte de uno tipo o dibújalo', 'Pasa de 2D a 3D cuando quieras'],
        img: 'plan-editor',
        alt: 'El editor del plano con las habitaciones de un piso y sus metros cuadrados',
        kind: 'desktop',
      },
    ],
  },
  more: {
    title: 'Y para todo lo demás',
    items: [
      { icon: 'megaphone', t: 'Avisos puntuales', d: 'Algo derramado, una bombilla, un fregadero atascado: avisas y va a quien menos carga tiene.' },
      { icon: 'list', t: 'Visita de limpieza', d: 'Dile cuántas horas viene quien limpia y te da la lista de lo más atrasado, lista para pasársela.' },
      { icon: 'mail', t: 'Invitaciones por email', d: 'Quien crea la casa invita a los demás y decide quién más puede administrarla.' },
      { icon: 'device', t: 'Pruébala sin cuenta', d: 'Tu casa se guarda en tu dispositivo. Crea una cuenta cuando quieras compartirla.' },
    ],
  },
  roadmap: {
    kicker: 'Lo próximo',
    title: 'En lo que estamos trabajando',
    items: [
      { icon: 'phone', t: 'Apps de Android y iPhone', d: 'La misma app, en las tiendas.' },
      { icon: 'bell', t: 'Recordatorios', d: 'Un aviso en el móvil cuando algo te toca.' },
      { icon: 'layers', t: 'Casas de varias plantas', d: 'Dúplex y casas, planta a planta.' },
      { icon: 'camera', t: 'Amueblar con fotos', d: 'Haz unas fotos de cada habitación y se amuebla sola. Será parte de un plan de pago.' },
    ],
  },
  faq: {
    kicker: 'Preguntas',
    title: 'Preguntas frecuentes',
    items: [
      { q: '¿Cuánto cuesta?', a: 'Impoluto es gratis durante el acceso anticipado. Algunos extras, como amueblar la casa a partir de fotos, serán parte de un plan de pago más adelante.' },
      { q: '¿Necesito el plano de mi casa?', a: 'No. Puedes elegir un plano tipo por metros, dormitorios y baños, o dibujar tu casa desde cero. Si tienes plano, basta con la imagen del anuncio de la inmobiliaria.' },
      { q: '¿Tengo que poner todos los muebles?', a: 'No. «Amueblar automáticamente» pone lo típico de cada habitación según su tipo y su tamaño. Luego mueves, giras o quitas lo que quieras.' },
      { q: '¿Cómo decide Impoluto quién hace qué?', a: 'Cuenta los minutos que ha hecho cada persona en las últimas cuatro semanas, más lo que ya tiene asignado, divididos por su parte del trabajo. La siguiente tarea va a quien menos lleva, y nunca dos veces seguidas a la misma persona.' },
      { q: '¿Para quién es?', a: 'Para cualquiera que comparta casa: parejas, familias y pisos compartidos. Una persona crea la casa e invita a las demás.' },
      { q: '¿En qué dispositivos funciona?', a: 'Hoy funciona en el navegador de cualquier ordenador o móvil. Las apps de Android y iPhone están en camino.' },
    ],
  },
  final: {
    title: 'Dale a cada tarea su sitio.',
    lead: 'Prepara tu casa en unos minutos y deja que Impoluto reparta el resto.',
    cta: 'Crear mi casa',
  },
  footer: {
    tagline: 'Tareas de casa y limpieza, repartidas de forma justa.',
    language: 'Idioma',
    rights: 'Impoluto',
  },
};
