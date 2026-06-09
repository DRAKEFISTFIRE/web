/* ══════════════════════════════════════════════════════════════
   PROJECTS DATA — Aniol Rodríguez Portfolio
   i18n: EN / ES / CA for all text content
   Images: local paths where available, Unsplash fallback
   ══════════════════════════════════════════════════════════════ */

const PROJECTS_I18N = {

  /* ─────────────────────────────────────────
     SUSHIKICK
  ───────────────────────────────────────── */
  sushikick: {
    id: 'sushikick',
    year: '2025–2026',
    status: 'in-development',
    tags: ['Vue.js', 'Laravel', 'Leaflet', 'Sanctum', 'MySQL'],
    hero: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1600&q=85',
    links: [
      { label: 'GitHub', url: 'https://github.com/DRAKEFISTFIRE/SushiKick', icon: 'github' }
    ],
    gallery: [
      { url: 'https://drakefistfire.github.io/web/images/projectes/menu.png',  captionKey: 'g1' },
      { url: 'https://drakefistfire.github.io/web/images/projectes/pedido.png',                                                           captionKey: 'g2' },
      { url: 'https://drakefistfire.github.io/web/images/projectes/mapa-pedido.png',  captionKey: 'g3' },
      { url: 'https://drakefistfire.github.io/web/images/projectes/perfil-sushi.png',     captionKey: 'g4' }
    ],
    tech: {
      frontend: ['Vue 3 (Composition API, script setup)', 'Vite', 'Vue Router', 'Leaflet.js', 'CSS Custom Properties', 'Bebas Neue + Noto Sans JP'],
      backend:  ['Laravel 11', 'Laravel Sanctum', 'RESTful API', 'MySQL', 'PHP 8.2'],
      tools:    ['Git / GitHub', 'Postman', 'VS Code', 'Docker (dev)']
    },
    i18n: {
      en: {
        title:        'SushiKick',
        subtitle:     'Full-Stack Japanese Restaurant Platform',
        role:         'Full Stack Developer',
        duration:     '3+ months',
        overview:     `SushiKick is an end-to-end restaurant management and ordering platform built for a fictional Japanese sushi restaurant based in Barcelona. The project covers the complete customer journey — from browsing the menu to real-time order tracking — and serves as the capstone demonstration of full-stack development skills acquired throughout my studies at Escola Pía.\n\nThe platform was designed with a premium dark aesthetic inspired by high-end Japanese restaurant experiences, using a custom design system built entirely with CSS custom properties. Every component was built mobile-first with strict file-separation architecture: <code>.vue</code> templates, <code>.js</code> composables for all logic, and <code>.css</code> for styles.`,
        challenge:    `The biggest technical challenge was the real-time order tracker. I needed to render a Leaflet.js map inside a Vue 3 component with an animated delivery marker, countdown timers, and a live status timeline — all without any black-tile rendering artifacts. The root cause was CSS height constraints conflicting with Leaflet's internal container calculation. Solving this required a combination of <code>nextTick()</code> calls, explicit container sizing, and tile layer invalidation after DOM attachment.\n\nAnother challenge was designing the authentication flow with Laravel Sanctum, ensuring token persistence across sessions via <code>localStorage</code> while maintaining security and clean API conventions throughout all 6+ frontend pages.`,
        architecture: `The app follows a strict composable-driven architecture. Each page has a corresponding <code>use[Page].js</code> composable that handles all API calls, state, and lifecycle. The <code>.vue</code> file is reserved purely for template markup. This ensures maximum testability and reusability.\n\nAPI endpoints follow REST conventions: <code>GET /api/checkout</code> returns user, payment methods and local data in one request. Cart state is persisted as <code>cart_items: [{ product, qty }]</code> in localStorage. Authentication tokens are stored under the key <code>token</code> and user ID under <code>user_id</code>.`,
        highlights: [
          { icon: '🗺️', title: 'Live Delivery Tracker',  desc: 'Animated Leaflet map with real marker movement, countdown timers, and a status timeline for each order phase.' },
          { icon: '🛒', title: 'Full Cart System',        desc: 'Desktop sidebar + mobile bottom drawer cart with persistent localStorage state and real-time quantity management.' },
          { icon: '🔐', title: 'Laravel Sanctum Auth',    desc: 'Complete login/register flow with sliding tab indicator, field validation with touched state, and password strength bar.' },
          { icon: '💳', title: 'Multi-Payment Support',   desc: 'Cash, card, Bizum, and PayPal payment method cards with live card number masking and localStorage pre-fill.' },
          { icon: '👤', title: 'User Profile',            desc: 'Banner/avatar upload, three-tab layout, payment method management, order history, and skeleton loading states.' },
          { icon: '📱', title: 'Mobile First',            desc: 'Category pills with horizontal scroll and mask-image fade, responsive grid breakpoints, and touch-optimised interactions.' }
        ],
        gallery_captions: {
          g1: 'Menu page with category filtering and search',
          g2: 'Order checkout with payment method selection',
          g3: 'Real-time delivery tracking with Leaflet map',
          g4: 'User profile with order history'
        }
      },
      es: {
        title:        'SushiKick',
        subtitle:     'Plataforma Full-Stack de Restaurante Japonés',
        role:         'Desarrollador Full Stack',
        duration:     '3+ meses',
        overview:     `SushiKick es una plataforma integral de gestión de restaurante y pedidos construida para un restaurante de sushi japonés ficticio con sede en Barcelona. El proyecto cubre el viaje completo del cliente — desde explorar el menú hasta el seguimiento de pedidos en tiempo real — y sirve como proyecto final de demostración de las habilidades de desarrollo full-stack adquiridas durante mis estudios en Escola Pía.\n\nLa plataforma fue diseñada con una estética oscura premium inspirada en restaurantes japoneses de alta gama, usando un sistema de diseño construido íntegramente con propiedades CSS personalizadas. Cada componente fue construido mobile-first con arquitectura de separación estricta de archivos: plantillas <code>.vue</code>, composables <code>.js</code> para toda la lógica, y <code>.css</code> para los estilos.`,
        challenge:    `El mayor desafío técnico fue el rastreador de pedidos en tiempo real. Necesitaba renderizar un mapa Leaflet.js dentro de un componente Vue 3 con un marcador de entrega animado, temporizadores de cuenta regresiva y una línea de tiempo de estado en vivo — todo sin artefactos de tiles negros. La causa raíz era que las restricciones CSS de altura conflictuaban con el cálculo interno del contenedor de Leaflet. Resolverlo requirió combinar llamadas <code>nextTick()</code>, dimensionamiento explícito del contenedor e invalidación de la capa de tiles tras el adjuntado al DOM.\n\nOtro desafío fue diseñar el flujo de autenticación con Laravel Sanctum, asegurando la persistencia del token entre sesiones via <code>localStorage</code> mientras se mantenía la seguridad y las convenciones limpias de API a lo largo de las 6+ páginas del frontend.`,
        architecture: `La app sigue una arquitectura estricta basada en composables. Cada página tiene un composable <code>use[Pagina].js</code> correspondiente que gestiona todas las llamadas a la API, el estado y el ciclo de vida. El archivo <code>.vue</code> está reservado únicamente para el markup de la plantilla, lo que garantiza máxima testabilidad y reutilización.\n\nLos endpoints de la API siguen convenciones REST: <code>GET /api/checkout</code> devuelve usuario, métodos de pago y datos locales en una sola petición. El estado del carrito se persiste como <code>cart_items: [{ product, qty }]</code> en localStorage. Los tokens de autenticación se almacenan bajo la clave <code>token</code> y el ID de usuario bajo <code>user_id</code>.`,
        highlights: [
          { icon: '🗺️', title: 'Rastreador de Entrega',        desc: 'Mapa Leaflet animado con movimiento real del marcador, temporizadores de cuenta regresiva y timeline de estado para cada fase del pedido.' },
          { icon: '🛒', title: 'Sistema de Carrito Completo',   desc: 'Carrito en sidebar de escritorio + cajón inferior móvil con estado persistente en localStorage y gestión de cantidades en tiempo real.' },
          { icon: '🔐', title: 'Auth Laravel Sanctum',          desc: 'Flujo completo de login/registro con indicador de tab deslizante, validación de campos con estado touched y barra de fortaleza de contraseña.' },
          { icon: '💳', title: 'Soporte Multipago',             desc: 'Tarjetas de método de pago (efectivo, tarjeta, Bizum, PayPal) con enmascaramiento de número de tarjeta en vivo y relleno previo desde localStorage.' },
          { icon: '👤', title: 'Perfil de Usuario',             desc: 'Subida de banner/avatar, diseño de tres pestañas, gestión de métodos de pago, historial de pedidos y estados de carga skeleton.' },
          { icon: '📱', title: 'Mobile First',                  desc: 'Pills de categoría con scroll horizontal y fade con mask-image, breakpoints de grid responsivo e interacciones optimizadas para táctil.' }
        ],
        gallery_captions: {
          g1: 'Página de menú con filtrado por categoría y búsqueda',
          g2: 'Checkout del pedido con selección de método de pago',
          g3: 'Seguimiento de entrega en tiempo real con mapa Leaflet',
          g4: 'Perfil de usuario con historial de pedidos'
        }
      },
      ca: {
        title:        'SushiKick',
        subtitle:     'Plataforma Full-Stack de Restaurant Japonès',
        role:         'Desenvolupador Full Stack',
        duration:     '3+ mesos',
        overview:     `SushiKick és una plataforma integral de gestió de restaurant i comandes construïda per a un restaurant de sushi japonès fictici amb seu a Barcelona. El projecte cobreix el viatge complet del client — des d'explorar el menú fins al seguiment de comandes en temps real — i serveix com a projecte final de demostració de les habilitats de desenvolupament full-stack adquirides durant els meus estudis a l'Escola Pía.\n\nLa plataforma va ser dissenyada amb una estètica fosca premium inspirada en restaurants japonesos d'alta gamma, usant un sistema de disseny construït íntegrament amb propietats CSS personalitzades. Cada component va ser construït mobile-first amb arquitectura de separació estricta de fitxers: plantilles <code>.vue</code>, composables <code>.js</code> per a tota la lògica, i <code>.css</code> per als estils.`,
        challenge:    `El major repte tècnic va ser el rastrejador de comandes en temps real. Necessitava renderitzar un mapa Leaflet.js dins d'un component Vue 3 amb un marcador de lliurament animat, temporitzadors de compte enrere i una línia de temps d'estat en viu — tot sense artefactes de tiles negres. La causa arrel era que les restriccions CSS d'alçada conflictuaven amb el càlcul intern del contenidor de Leaflet. Resoldre-ho va requerir combinar crides <code>nextTick()</code>, dimensionament explícit del contenidor i invalidació de la capa de tiles després de l'adjuntament al DOM.\n\nUn altre repte va ser dissenyar el flux d'autenticació amb Laravel Sanctum, assegurant la persistència del token entre sessions via <code>localStorage</code> mentre es mantenia la seguretat i les convencions netes d'API al llarg de les 6+ pàgines del frontend.`,
        architecture: `L'app segueix una arquitectura estricta basada en composables. Cada pàgina té un composable <code>use[Pagina].js</code> corresponent que gestiona totes les crides a l'API, l'estat i el cicle de vida. El fitxer <code>.vue</code> està reservat únicament per al markup de la plantilla, la qual cosa garanteix màxima testabilitat i reutilització.\n\nEls endpoints de l'API segueixen convencions REST: <code>GET /api/checkout</code> retorna usuari, mètodes de pagament i dades locals en una sola petició. L'estat del carret es persisteix com <code>cart_items: [{ product, qty }]</code> en localStorage. Els tokens d'autenticació s'emmagatzemen sota la clau <code>token</code> i l'ID d'usuari sota <code>user_id</code>.`,
        highlights: [
          { icon: '🗺️', title: 'Rastrejador de Lliurament',       desc: 'Mapa Leaflet animat amb moviment real del marcador, temporitzadors de compte enrere i timeline d\'estat per a cada fase de la comanda.' },
          { icon: '🛒', title: 'Sistema de Carret Complet',        desc: 'Carret en sidebar d\'escriptori + calaix inferior mòbil amb estat persistent en localStorage i gestió de quantitats en temps real.' },
          { icon: '🔐', title: 'Auth Laravel Sanctum',             desc: 'Flux complet de login/registre amb indicador de pestanya lliscant, validació de camps amb estat touched i barra de fortalesa de contrasenya.' },
          { icon: '💳', title: 'Suport Multipagament',             desc: 'Targetes de mètode de pagament (efectiu, targeta, Bizum, PayPal) amb emmascarament de número en viu i preomplert des de localStorage.' },
          { icon: '👤', title: 'Perfil d\'Usuari',                 desc: 'Pujada de banner/avatar, disseny de tres pestanyes, gestió de mètodes de pagament, historial de comandes i estats de càrrega skeleton.' },
          { icon: '📱', title: 'Mobile First',                     desc: 'Pills de categoria amb scroll horitzontal i fade amb mask-image, breakpoints de grid responsiu i interaccions optimitzades per a tàctil.' }
        ],
        gallery_captions: {
          g1: 'Pàgina de menú amb filtratge per categoria i cerca',
          g2: 'Checkout de la comanda amb selecció de mètode de pagament',
          g3: 'Seguiment de lliurament en temps real amb mapa Leaflet',
          g4: 'Perfil d\'usuari amb historial de comandes'
        }
      }
    }
  },

  /* ─────────────────────────────────────────
     PDDC
  ───────────────────────────────────────── */
  pddc: {
    id: 'pddc',
    year: '2024–2025',
    status: 'completed',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT'],
    hero: '/images/bannerHome.jpg',
    links: [
      { label: 'GitHub', url: 'https://github.com/DRAKEFISTFIRE/PDDC', icon: 'github' }
    ],
    gallery: [
      { url: 'https://drakefistfire.github.io/web/images/projectes/homePolis.png', captionKey: 'g1' },
      { url: 'https://drakefistfire.github.io/web/images/projectes/gestioCasos.png',   captionKey: 'g2' },
      { url: 'https://drakefistfire.github.io/web/images/projectes/nivel-policia.png', captionKey: 'g3' },
      { url: 'https://drakefistfire.github.io/web/images/projectes/departament.png',   captionKey: 'g4' }
    ],
    tech: {
      frontend: ['React 18', 'React Router', 'Context API', 'CSS Modules', 'Chart.js', 'leaflet.js'],
      backend:  ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT Authentication'],
      tools:    ['Git / GitHub', 'MongoDB Compass', 'Postman', 'Figma']
    },
    i18n: {
      en: {
        title:        'PDDC — Police System',
        subtitle:     'Gamified Police Management Platform',
        role:         'Full Stack Developer',
        duration:     '4 months',
        overview:     `PDDC (Police Department Digital Command) is a gamified web platform built as a final degree project. It simulates a police department management system for a GTA-style roleplay server, allowing officers and citizens to interact through a structured digital interface.\n\nThe platform features two distinct user roles — citizens and officers — each with their own dashboard, permissions, and workflow. Officers can manage cases, assign tasks, and track department progress, while citizens can submit reports, check case status, and access learning modules.`,
        challenge:    `The main challenge was designing a dual-role permission system that felt intuitive for both user types while maintaining strict data isolation. Using JWT-based authentication with role claims allowed the same API to serve radically different UI experiences from a single codebase.\n\nBuilding the gamification layer — XP points, rank progression, badges, and leaderboards — required careful database design in MongoDB to avoid N+1 query problems when aggregating user stats across large datasets.`,
        architecture: `The backend follows an MVC-inspired pattern with Express.js. Routes are versioned under <code>/api/v1/</code>, with middleware layers for authentication, role validation, and request logging. MongoDB Atlas handles persistence, with Mongoose schemas enforcing data integrity.\n\nThe React frontend uses Context API for global auth state and per-feature contexts for module-level state. Code splitting via React.lazy ensures fast initial load times despite the large feature set.`,
        highlights: [
        { icon: '👮', title: 'Dual Role System', desc: 'Citizen and officer dashboards with separate permissions, views, and workflows from a single codebase.' },
        { icon: '🎮', title: 'Gamification Engine', desc: 'XP points, rank progression system, achievement badges, and department leaderboards.' },
        { icon: '📁', title: 'Case Management', desc: 'Full CRUD case management with status tracking, officer assignment, and evidence attachment.' },
        { icon: '🗺️', title: 'Case Map Search (Leaflet)', desc: 'Interactive geospatial case search and visualization using Leaflet maps for real-time location-based filtering.' },
        { icon: '📚', title: 'Learning Modules', desc: 'Interactive training modules for new officers with progress tracking and completion certificates.' },
        { icon: '📊', title: 'Analytics Dashboard', desc: 'Department statistics, activity charts, and KPI monitoring for senior officers.' },
        { icon: '🔔', title: 'Real-time Notifications', desc: 'Live status updates for case changes and assignment notifications.' }
      ],
        gallery_captions: { g1: 'Officer command dashboard overview', g2: 'Case management and evidence tracking', g3: 'Gamification rank and XP system', g4: 'Department analytics dashboard' }
      },
      es: {
        title:        'PDDC — Sistema Policial',
        subtitle:     'Plataforma Gamificada de Gestión Policial',
        role:         'Desarrollador Full Stack',
        duration:     '4 meses',
        overview:     `PDDC (Police Department Digital Command) es una plataforma web gamificada construida como proyecto de fin de ciclo. Simula un sistema de gestión de departamento policial para un servidor de roleplay estilo GTA, permitiendo a agentes y ciudadanos interactuar a través de una interfaz digital estructurada.\n\nLa plataforma presenta dos roles de usuario distintos — ciudadanos y agentes — cada uno con su propio panel, permisos y flujo de trabajo. Los agentes pueden gestionar casos, asignar tareas y hacer seguimiento del progreso del departamento, mientras que los ciudadanos pueden enviar informes, consultar el estado de casos y acceder a módulos de aprendizaje.`,
        challenge:    `El principal desafío fue diseñar un sistema de permisos de doble rol que resultara intuitivo para ambos tipos de usuario manteniendo un aislamiento estricto de los datos. Usar autenticación basada en JWT con claims de rol permitió que la misma API sirviera experiencias de UI radicalmente diferentes desde una única base de código.\n\nConstruir la capa de gamificación — puntos XP, progresión de rango, insignias y clasificaciones — requirió un diseño cuidadoso de la base de datos en MongoDB para evitar problemas de consultas N+1 al agregar estadísticas de usuario en grandes conjuntos de datos.`,
        architecture: `El backend sigue un patrón inspirado en MVC con Express.js. Las rutas están versionadas bajo <code>/api/v1/</code>, con capas de middleware para autenticación, validación de rol y registro de peticiones. MongoDB Atlas gestiona la persistencia, con esquemas Mongoose que garantizan la integridad de los datos.\n\nEl frontend React usa Context API para el estado de autenticación global y contextos por funcionalidad para el estado a nivel de módulo. El code splitting mediante React.lazy garantiza tiempos de carga inicial rápidos a pesar del amplio conjunto de funcionalidades.`,
        highlights: [
        { icon: '👮', title: 'Sistema de Doble Rol', desc: 'Paneles de ciudadano y agente con permisos, vistas y flujos de trabajo separados desde una única base de código.' },
        { icon: '🎮', title: 'Motor de Gamificación', desc: 'Puntos XP, sistema de progresión de rangos, insignias de logros y clasificaciones departamentales.' },
        { icon: '📁', title: 'Gestión de Casos', desc: 'Gestión CRUD completa de casos con seguimiento de estado, asignación de agentes y adjuntos de evidencias.' },
        { icon: '🗺️', title: 'Búsqueda de Casos en Mapa (Leaflet)', desc: 'Visualización geográfica interactiva de casos mediante Leaflet con filtros en tiempo real.' },
        { icon: '📚', title: 'Módulos de Aprendizaje', desc: 'Módulos de formación interactivos para nuevos agentes con seguimiento de progreso y certificados.' },
        { icon: '📊', title: 'Panel de Analíticas', desc: 'Estadísticas departamentales, gráficos de actividad y monitorización de KPIs para agentes senior.' },
        { icon: '🔔', title: 'Notificaciones en Tiempo Real', desc: 'Actualizaciones en vivo sobre cambios de casos y asignaciones.' }
        ],
        gallery_captions: { g1: 'Vista general del panel de mando del agente', g2: 'Gestión de casos y seguimiento de evidencias', g3: 'Sistema de gamificación con rangos y XP', g4: 'Panel de analíticas departamentales' }
      },
      ca: {
        title:        'PDDC — Sistema Policial',
        subtitle:     'Plataforma Gamificada de Gestió Policial',
        role:         'Desenvolupador Full Stack',
        duration:     '4 mesos',
        overview:     `PDDC (Police Department Digital Command) és una plataforma web gamificada construïda com a projecte de fi de cicle. Simula un sistema de gestió de departament policial per a un servidor de roleplay estil GTA, permetent a agents i ciutadans interactuar a través d'una interfície digital estructurada.\n\nLa plataforma presenta dos rols d'usuari distints — ciutadans i agents — cadascun amb el seu propi panell, permisos i flux de treball. Els agents poden gestionar casos, assignar tasques i fer el seguiment del progrés del departament, mentre que els ciutadans poden enviar informes, consultar l'estat de casos i accedir a mòduls d'aprenentatge.`,
        challenge:    `El principal repte va ser dissenyar un sistema de permisos de doble rol que resultés intuïtiu per a tots dos tipus d'usuari mantenint un aïllament estricte de les dades. Usar autenticació basada en JWT amb claims de rol va permetre que la mateixa API servís experiències d'UI radicalment diferents des d'una única base de codi.\n\nConstruir la capa de gamificació — punts XP, progressió de rang, insígnies i classificacions — va requerir un disseny acurat de la base de dades en MongoDB per evitar problemes de consultes N+1 en agregar estadístiques d'usuari en grans conjunts de dades.`,
        architecture: `El backend segueix un patró inspirat en MVC amb Express.js. Les rutes estan versionades sota <code>/api/v1/</code>, amb capes de middleware per a autenticació, validació de rol i registre de peticions. MongoDB Atlas gestiona la persistència, amb esquemes Mongoose que garanteixen la integritat de les dades.\n\nEl frontend React usa Context API per a l'estat d'autenticació global i contextos per funcionalitat per a l'estat a nivell de mòdul. El code splitting mitjançant React.lazy garanteix temps de càrrega inicial ràpids malgrat l'ampli conjunt de funcionalitats.`,
        highlights: [
          { icon: '👮', title: 'Sistema de Doble Rol', desc: 'Taulers de ciutadà i agent amb permisos i fluxos de treball separats des d’una única base de codi.' },
          { icon: '🎮', title: 'Motor de Gamificació', desc: 'Punts XP, sistema de progressió de rangs, insígnies i classificacions departamentals.' },
          { icon: '📁', title: 'Gestió de Casos', desc: 'Gestió CRUD completa amb seguiment d’estat, assignació d’agents i evidències.' },
          { icon: '🗺️', title: 'Cerca de Casos al Mapa (Leaflet)', desc: 'Visualització i cerca geoespacial de casos amb Leaflet i filtres en temps real.' },
          { icon: '📚', title: 'Mòduls d’Aprenentatge', desc: 'Formació interactiva per a agents amb seguiment de progrés i certificats.' },
          { icon: '📊', title: 'Tauler d’Analítiques', desc: 'Estadístiques del departament, gràfics d’activitat i KPIs per a comandament.' },
          { icon: '🔔', title: 'Notificacions en Temps Real', desc: 'Actualitzacions en viu sobre canvis de casos i assignacions.' }
        ],
        gallery_captions: { g1: 'Vista general del tauler de comandament de l\'agent', g2: 'Gestió de casos i seguiment d\'evidències', g3: 'Sistema de gamificació amb rangs i XP', g4: 'Tauler d\'analítiques departamentals' }
      }
    }
  },

  /* ─────────────────────────────────────────
     MONTMELO
  ───────────────────────────────────────── */
  montmelo: {
    id: 'montmelo',
    year: '2024',
    status: 'completed',
    tags: ['React Native', 'Node.js', 'MongoDB', 'Maps API'],
    hero: 'images/circuito.png',
    links: [
      { label: 'GitHub', url: 'https://github.com/aniolepiaedu/montmeloInside', icon: 'github' }
    ],
    gallery: [
      { url: 'https://drakefistfire.github.io/web/images/projectes/montmelo-mapa.png', captionKey: 'g1' },
      { url: 'https://drakefistfire.github.io/web/images/projectes/seguiment.png', captionKey: 'g2' },
      { url: 'https://drakefistfire.github.io/web/images/projectes/montmeloEvents.png', captionKey: 'g3' },
      { url: 'https://drakefistfire.github.io/web/images/projectes/historial.png', captionKey: 'g4' }
    ],
    tech: {
      frontend: ['React Native', 'Expo', 'React Navigation', 'react-native-maps'],
      backend:  ['Node.js', 'Express.js', 'MongoDB', 'Firebase Push Notifications'],
      tools:    ['Git / GitHub', 'Expo Go', 'Android Studio', 'Figma']
    },
    i18n: {
      en: {
        title:        'MontmeloInside',
        subtitle:     'Circuit Navigation Mobile App',
        role:         'Mobile Developer',
        duration:     '3 months',
        overview:     `MontmeloInside is a mobile navigation application designed to help visitors explore the Circuit de Barcelona-Catalunya in Montmeló. The app provides interactive maps, real-time location guidance, sector information, and essential details about facilities and services throughout the circuit.\n\nDeveloped as a collaborative project at Escola Pía, the app targets motorsport fans attending events at the circuit, giving them a comprehensive digital companion throughout their visit — from parking guidance to hospitality locations and track sector information.`,
        challenge:    `The primary challenge was handling accurate indoor-level positioning within a large outdoor venue. Standard GPS accuracy degrades in crowded areas, so the app uses a combination of GPS, Wi-Fi positioning signals, and manually curated waypoint data to improve location accuracy across different zones of the circuit.\n\nBuilding a smooth map interaction experience on mobile required careful performance tuning — tile caching, marker clustering for dense areas, and lazy loading of POI data as the user pans the map.`,
        architecture: `The app is built with Expo for cross-platform iOS/Android deployment from a single codebase. Navigation uses React Navigation's stack + bottom tab pattern. Map rendering is handled by <code>react-native-maps</code> with custom tile overlays for the circuit-specific cartography.\n\nThe backend exposes a lightweight REST API for POI data, event schedules, and push notification registration. All map assets are cached locally on first launch for offline functionality during events with poor connectivity.`,
        highlights: [
          { icon: '🗺️', title: 'Interactive Circuit Map',  desc: 'Full-scale vectorised map of the circuit with zoomable sectors, grandstands, and facility markers.' },
          { icon: '📍', title: 'Live Location Tracking',   desc: 'Real-time GPS positioning with circuit-specific accuracy improvements and zone detection.' },
          { icon: '🏁', title: 'Sector Information',       desc: 'Detailed information panels for each circuit sector, corner, and landmark.' },
          { icon: '🍔', title: 'Facilities Guide',          desc: 'Complete directory of food vendors, toilets, medical points, and viewing areas.' },
          { icon: '🚗', title: 'Parking Navigation',       desc: 'Dedicated parking zone guidance with capacity indicators and recommended routes.' },
          { icon: '📅', title: 'Event Schedule',            desc: 'Session timetables, broadcast information, and push notification reminders.' }
        ],
        gallery_captions: { g1: 'Circuit map overview with sector markers', g2: 'Live location tracking within the circuit', g3: 'Facilities directory and navigation', g4: 'Event schedule and session information' }
      },
      es: {
        title:        'MontmeloInside',
        subtitle:     'App Móvil de Navegación por el Circuito',
        role:         'Desarrollador Móvil',
        duration:     '3 meses',
        overview:     `MontmeloInside es una aplicación móvil de navegación diseñada para ayudar a los visitantes a explorar el Circuit de Barcelona-Catalunya en Montmeló. La app proporciona mapas interactivos, guía de ubicación en tiempo real, información de sectores y detalles esenciales sobre instalaciones y servicios en todo el circuito.\n\nDesarrollada como proyecto colaborativo en Escola Pía, la app está dirigida a aficionados al motor que asisten a eventos en el circuito, proporcionándoles un compañero digital completo durante su visita — desde la guía de aparcamiento hasta las ubicaciones de hospitalidad e información de sectores de la pista.`,
        challenge:    `El principal desafío fue gestionar el posicionamiento preciso a nivel interior dentro de un gran recinto exterior. La precisión GPS estándar se degrada en zonas concurridas, por lo que la app usa una combinación de GPS, señales de posicionamiento Wi-Fi y datos de waypoints curados manualmente para mejorar la precisión de ubicación en las diferentes zonas del circuito.\n\nConstruir una experiencia fluida de interacción con el mapa en móvil requirió un ajuste cuidadoso del rendimiento — caché de tiles, agrupación de marcadores en zonas densas y carga diferida de los datos de puntos de interés al desplazar el mapa.`,
        architecture: `La app está construida con Expo para despliegue multiplataforma iOS/Android desde una única base de código. La navegación usa el patrón de pila + pestañas inferiores de React Navigation. El renderizado del mapa está gestionado por <code>react-native-maps</code> con capas de tiles personalizadas para la cartografía específica del circuito.\n\nEl backend expone una API REST ligera para datos de puntos de interés, horarios de eventos y registro de notificaciones push. Todos los assets del mapa se cachean localmente en el primer lanzamiento para funcionalidad offline durante eventos con mala conectividad.`,
        highlights: [
          { icon: '🗺️', title: 'Mapa Interactivo del Circuito', desc: 'Mapa vectorizado a escala completa del circuito con sectores ampliables, tribunas y marcadores de instalaciones.' },
          { icon: '📍', title: 'Seguimiento de Ubicación en Vivo', desc: 'Posicionamiento GPS en tiempo real con mejoras de precisión específicas del circuito y detección de zonas.' },
          { icon: '🏁', title: 'Información de Sectores',        desc: 'Paneles de información detallada para cada sector, curva y punto de referencia del circuito.' },
          { icon: '🍔', title: 'Guía de Instalaciones',          desc: 'Directorio completo de puestos de comida, aseos, puntos médicos y zonas de visión.' },
          { icon: '🚗', title: 'Navegación de Aparcamiento',     desc: 'Guía dedicada de zonas de aparcamiento con indicadores de capacidad y rutas recomendadas.' },
          { icon: '📅', title: 'Horario de Eventos',             desc: 'Horarios de sesiones, información de retransmisión y recordatorios de notificaciones push.' }
        ],
        gallery_captions: { g1: 'Vista general del mapa del circuito con marcadores de sectores', g2: 'Seguimiento de ubicación en vivo dentro del circuito', g3: 'Directorio de instalaciones y navegación', g4: 'Horario de eventos e información de sesiones' }
      },
      ca: {
        title:        'MontmeloInside',
        subtitle:     'App Mòbil de Navegació pel Circuit',
        role:         'Desenvolupador Mòbil',
        duration:     '3 mesos',
        overview:     `MontmeloInside és una aplicació mòbil de navegació dissenyada per ajudar els visitants a explorar el Circuit de Barcelona-Catalunya a Montmeló. L'app proporciona mapes interactius, guia d'ubicació en temps real, informació de sectors i detalls essencials sobre instal·lacions i serveis a tot el circuit.\n\nDesenvolupada com a projecte col·laboratiu a l'Escola Pía, l'app està dirigida a aficionats al motor que assisteixen a esdeveniments al circuit, proporcionant-los un company digital complet durant la seva visita — des de la guia d'aparcament fins a les ubicacions d'hospitalitat i informació de sectors de la pista.`,
        challenge:    `El principal repte va ser gestionar el posicionament precís a nivell interior dins d'un gran recinte exterior. La precisió GPS estàndard es degrada en zones concorregudes, de manera que l'app usa una combinació de GPS, senyals de posicionament Wi-Fi i dades de waypoints curats manualment per millorar la precisió d'ubicació a les diferents zones del circuit.\n\nConstruir una experiència fluida d'interacció amb el mapa en mòbil va requerir un ajust acurat del rendiment — caché de tiles, agrupació de marcadors en zones denses i càrrega diferida de les dades de punts d'interès en desplaçar el mapa.`,
        architecture: `L'app està construïda amb Expo per a desplegament multiplataforma iOS/Android des d'una única base de codi. La navegació usa el patró de pila + pestanyes inferiors de React Navigation. El renderitzat del mapa és gestionat per <code>react-native-maps</code> amb capes de tiles personalitzades per a la cartografia específica del circuit.\n\nEl backend exposa una API REST lleugera per a dades de punts d'interès, horaris d'esdeveniments i registre de notificacions push. Tots els assets del mapa es cachegen localment en el primer llançament per a funcionalitat offline durant esdeveniments amb mala connectivitat.`,
        highlights: [
          { icon: '🗺️', title: 'Mapa Interactiu del Circuit',     desc: 'Mapa vectoritzat a escala completa del circuit amb sectors ampliables, tribunes i marcadors d\'instal·lacions.' },
          { icon: '📍', title: 'Seguiment d\'Ubicació en Viu',    desc: 'Posicionament GPS en temps real amb millores de precisió específiques del circuit i detecció de zones.' },
          { icon: '🏁', title: 'Informació de Sectors',           desc: 'Panells d\'informació detallada per a cada sector, corba i punt de referència del circuit.' },
          { icon: '🍔', title: 'Guia d\'Instal·lacions',          desc: 'Directori complet de parades de menjar, lavabos, punts mèdics i zones de visió.' },
          { icon: '🚗', title: 'Navegació d\'Aparcament',         desc: 'Guia dedicada de zones d\'aparcament amb indicadors de capacitat i rutes recomanades.' },
          { icon: '📅', title: 'Horari d\'Esdeveniments',         desc: 'Horaris de sessions, informació de retransmissió i recordatoris de notificacions push.' }
        ],
        gallery_captions: { g1: 'Vista general del mapa del circuit amb marcadors de sectors', g2: 'Seguiment d\'ubicació en viu dins del circuit', g3: 'Directori d\'instal·lacions i navegació', g4: 'Horari d\'esdeveniments i informació de sessions' }
      }
    }
  },

  /* ─────────────────────────────────────────
     TRADICIONS MATARÓ
  ───────────────────────────────────────── */
  tradicions: {
    id: 'tradicions',
    year: '2023',
    status: 'live',
    tags: ['PHP', 'MySQL', 'Wordpress', 'Html, css', 'JavaScript'],
    hero: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1600&q=85',
    links: [
      { label: 'Live Site', url: 'https://tradicionsmataro.x10.mx/', icon: 'globe' }
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=900&q=80', captionKey: 'g1' },
      { url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80', captionKey: 'g2' },
      { url: 'https://images.unsplash.com/photo-1432139509613-5c4255815697?w=900&q=80', captionKey: 'g3' },
      { url: 'https://images.unsplash.com/photo-1470549813517-2fa741d25c92?w=900&q=80', captionKey: 'g4' }
    ],
    tech: {
      frontend: ['HTML5', 'CSS3', 'Vanilla JavaScript', 'Responsive Design'],
      backend:  ['PHP 8', 'MySQL', 'Apache / .htaccess', 'Custom MVC pattern'],
      tools:    ['Git', 'phpMyAdmin', 'VS Code', 'FileZilla']
    },
    i18n: {
      en: {
        title:        'Tradicions Mataró',
        subtitle:     'Local Culture Blog & Publishing Platform',
        role:         'Full Stack Developer',
        duration:     '2 months',
        overview:     `Tradicions Mataró is a web publication platform dedicated to preserving and sharing the rich cultural traditions and festivals of Mataró, a coastal city in the Maresme region of Catalonia. The site serves as a digital archive and active blog for local historians, community contributors, and culture enthusiasts.\n\nBuilt with vanilla PHP and MySQL without any framework, this project was a foundational exercise in server-side rendering, custom CMS development, and dynamic content management — demonstrating core web development principles from scratch.`,
        challenge:    `Building a full CMS from scratch without a framework meant architecting everything manually: routing, template inheritance, session management, and database abstraction. The biggest challenge was creating an intuitive editorial workflow that non-technical contributors could use comfortably.\n\nSEO was also a key concern for a local culture publication. Implementing clean URLs through <code>.htaccess</code> rewriting, structured metadata, and Open Graph tags helped the platform rank well for local searches.`,
        architecture: `The platform uses a lightweight custom MVC pattern with a front controller (<code>index.php</code>) handling all routing via URL rewriting. Controllers load models for database operations and pass data to HTML templates via a simple view renderer.\n\nDatabase queries use PDO with prepared statements throughout. Images are processed server-side with GD library for automatic resizing and WebP conversion, keeping load times fast for media-heavy culture articles.`,
        highlights: [
          { icon: '✍️', title: 'Custom CMS',            desc: 'Full content management system built from scratch — article creation, editing, media upload, and scheduling.' },
          { icon: '🏷️', title: 'Category & Tag System', desc: 'Hierarchical content organisation with categories, tags, and related article suggestions.' },
          { icon: '🔍', title: 'Full-Text Search',       desc: 'MySQL full-text search with highlighted results and filtering by category, date, and author.' },
          { icon: '📸', title: 'Media Gallery',          desc: 'Image gallery management with lazy loading and lightbox viewer for cultural photography.' },
          { icon: '👥', title: 'Multi-Author Support',   desc: 'Contributor accounts with moderation queue and editor approval workflow.' },
          { icon: '📱', title: 'Responsive Design',      desc: 'Mobile-first layout with clean typography optimised for long-form reading.' }
        ],
        gallery_captions: { g1: 'Homepage with featured articles', g2: 'Article detail with media gallery', g3: 'Local festival photography archive', g4: 'Category and archive browsing' }
      },
      es: {
        title:        'Tradicions Mataró',
        subtitle:     'Blog de Cultura Local y Plataforma de Publicación',
        role:         'Desarrollador Full Stack',
        duration:     '2 meses',
        overview:     `Tradicions Mataró es una plataforma de publicación web dedicada a preservar y compartir las ricas tradiciones culturales y fiestas de Mataró, una ciudad costera de la región del Maresme en Cataluña. El sitio sirve como archivo digital y blog activo para historiadores locales, colaboradores de la comunidad y entusiastas de la cultura.\n\nConstruida con PHP nativo y MySQL sin ningún framework, este proyecto fue un ejercicio fundacional en renderizado del lado del servidor, desarrollo de CMS personalizado y gestión dinámica de contenido — demostrando los principios básicos del desarrollo web desde cero.`,
        challenge:    `Construir un CMS completo desde cero sin framework significó arquitectar todo manualmente: enrutamiento, herencia de plantillas, gestión de sesiones y abstracción de base de datos. El mayor desafío fue crear un flujo editorial intuitivo que los colaboradores no técnicos pudieran usar cómodamente.\n\nEl SEO también fue una preocupación clave para una publicación de cultura local. Implementar URLs limpias mediante reescritura en <code>.htaccess</code>, metadatos estructurados y etiquetas Open Graph ayudó a que la plataforma posicionara bien en búsquedas locales.`,
        architecture: `La plataforma usa un patrón MVC personalizado ligero con un controlador frontal (<code>index.php</code>) que gestiona todo el enrutamiento mediante reescritura de URLs. Los controladores cargan modelos para operaciones de base de datos y pasan datos a las plantillas HTML mediante un renderizador de vistas simple.\n\nLas consultas a la base de datos usan PDO con sentencias preparadas en todo momento. Las imágenes se procesan en el servidor con la librería GD para redimensionado automático y conversión a WebP, manteniendo los tiempos de carga rápidos para los artículos de cultura con muchos medios.`,
        highlights: [
          { icon: '✍️', title: 'CMS Personalizado',         desc: 'Sistema de gestión de contenido completo construido desde cero — creación de artículos, edición, subida de medios y programación.' },
          { icon: '🏷️', title: 'Sistema de Categorías y Tags', desc: 'Organización de contenido jerárquica con categorías, etiquetas y sugerencias de artículos relacionados.' },
          { icon: '🔍', title: 'Búsqueda de Texto Completo', desc: 'Búsqueda full-text de MySQL con resultados destacados y filtrado por categoría, fecha y autor.' },
          { icon: '📸', title: 'Galería de Medios',          desc: 'Gestión de galería de imágenes con carga diferida y visor lightbox para fotografía cultural.' },
          { icon: '👥', title: 'Soporte Multi-Autor',        desc: 'Cuentas de colaboradores con cola de moderación y flujo de aprobación del editor.' },
          { icon: '📱', title: 'Diseño Responsivo',          desc: 'Maquetación mobile-first con tipografía limpia optimizada para lectura de largo formato.' }
        ],
        gallery_captions: { g1: 'Página principal con artículos destacados', g2: 'Detalle de artículo con galería de medios', g3: 'Archivo de fotografía de fiestas locales', g4: 'Exploración de categorías y archivo' }
      },
      ca: {
        title:        'Tradicions Mataró',
        subtitle:     'Blog de Cultura Local i Plataforma de Publicació',
        role:         'Desenvolupador Full Stack',
        duration:     '2 mesos',
        overview:     `Tradicions Mataró és una plataforma de publicació web dedicada a preservar i compartir les riques tradicions culturals i festes de Mataró, una ciutat costanera de la regió del Maresme a Catalunya. El lloc serveix com a arxiu digital i blog actiu per a historiadors locals, col·laboradors de la comunitat i entusiastes de la cultura.\n\nConstruïda amb PHP natiu i MySQL sense cap framework, aquest projecte va ser un exercici fonacional en renderitzat del costat del servidor, desenvolupament de CMS personalitzat i gestió dinàmica de contingut — demostrant els principis bàsics del desenvolupament web des de zero.`,
        challenge:    `Construir un CMS complet des de zero sense framework va significar arquitectar-ho tot manualment: enrutament, herència de plantilles, gestió de sessions i abstracció de base de dades. El major repte va ser crear un flux editorial intuïtiu que els col·laboradors no tècnics poguessin usar còmodament.\n\nEl SEO també va ser una preocupació clau per a una publicació de cultura local. Implementar URLs netes mitjançant reescriptura en <code>.htaccess</code>, metadades estructurades i etiquetes Open Graph va ajudar a que la plataforma posicionés bé en cerques locals.`,
        architecture: `La plataforma usa un patró MVC personalitzat lleuger amb un controlador frontal (<code>index.php</code>) que gestiona tot l'enrutament mitjançant reescriptura d'URLs. Els controladors carreguen models per a operacions de base de dades i passen dades a les plantilles HTML mitjançant un renderitzador de vistes simple.\n\nLes consultes a la base de dades usen PDO amb sentències preparades en tot moment. Les imatges es processen al servidor amb la llibreria GD per a redimensionament automàtic i conversió a WebP, mantenint els temps de càrrega ràpids per als articles de cultura amb molts medis.`,
        highlights: [
          { icon: '✍️', title: 'CMS Personalitzat',            desc: 'Sistema de gestió de contingut complet construït des de zero — creació d\'articles, edició, pujada de medis i programació.' },
          { icon: '🏷️', title: 'Sistema de Categories i Tags', desc: 'Organització de contingut jeràrquica amb categories, etiquetes i suggeriments d\'articles relacionats.' },
          { icon: '🔍', title: 'Cerca de Text Complet',        desc: 'Cerca full-text de MySQL amb resultats destacats i filtratge per categoria, data i autor.' },
          { icon: '📸', title: 'Galeria de Medis',             desc: 'Gestió de galeria d\'imatges amb càrrega diferida i visor lightbox per a fotografia cultural.' },
          { icon: '👥', title: 'Suport Multi-Autor',           desc: 'Comptes de col·laboradors amb cua de moderació i flux d\'aprovació de l\'editor.' },
          { icon: '📱', title: 'Disseny Responsiu',            desc: 'Maquetació mobile-first amb tipografia neta optimitzada per a lectura de llarg format.' }
        ],
        gallery_captions: { g1: 'Pàgina principal amb articles destacats', g2: 'Detall d\'article amb galeria de medis', g3: 'Arxiu de fotografia de festes locals', g4: 'Exploració de categories i arxiu' }
      }
    }
  },

  /* ─────────────────────────────────────────
     TRAPLIFE
  ───────────────────────────────────────── */
  traplife: {
    id: 'traplife',
    year: '2023–2024',
    status: 'completed',
    tags: ['Html, css', 'JavaScript'],
    hero: 'images/traplife.png',
    links: [
      { label: 'GitHub', url: 'https://github.com/DRAKEFISTFIRE/TrapLife', icon: 'github' }
    ],
    gallery: [
      { url: 'https://drakefistfire.github.io/web/images/projectes/homeTrap.png', captionKey: 'g1' },
      { url: 'https://drakefistfire.github.io/web/images/projectes/reglamentTrap.png', captionKey: 'g2' },
      { url: 'https://drakefistfire.github.io/web/images/projectes/elegirnosTrap.png', captionKey: 'g3' },
      { url: 'https://drakefistfire.github.io/web/images/projectes/homeTrap.png', captionKey: 'g4' }
    ],
    tech: {
      frontend: ['Html, css', 'JavaScript','Tailwind CSS'],
    },
    i18n: {
      en: {
        title: 'TrapLife',
        subtitle: 'GTA RolePlay Community Website',
        role: 'Frontend Developer',
        duration: '2 months',

        overview: `TrapLife is a frontend web platform created for a GTA RolePlay community. The website serves as the main hub where players can find server information, community rules, guides, announcements, and direct access to the Discord server.

      The project focused on delivering a modern, responsive, and immersive user experience that matched the visual identity of the RolePlay community while keeping navigation simple and accessible.`,

        challenge: `The main challenge was designing a clear and engaging interface capable of organizing large amounts of community information without overwhelming users. Special attention was given to responsive design and user experience across desktop and mobile devices.`,

        architecture: `The project was built entirely on the frontend using HTML, CSS, JavaScript and Tailwind CSS. The structure was optimized for performance, responsiveness and maintainability, providing a fast and intuitive browsing experience.`,

        highlights: [
          {
            icon: 'ℹ️',
            title: 'Server Information',
            desc: 'Centralized information about the community, systems, factions and server features.'
          },
          {
            icon: '📋',
            title: 'Rules & Guidelines',
            desc: 'Well-organized server rules and community standards for all players.'
          },
          {
            icon: '📢',
            title: 'Announcements',
            desc: 'Updates, events and important community news displayed in a clear format.'
          },
          {
            icon: '💬',
            title: 'Discord Access',
            desc: 'Direct access to the community Discord server from the website.'
          }
        ],

        gallery_captions: {
          g1: 'Homepage and community information',
          g2: 'Server rules section',
          g3: 'Community information pages',
          g4: 'Discord access and announcements'
        }
      },

      es: {
        title: 'TrapLife',
        subtitle: 'Página Web de Comunidad GTA RolePlay',
        role: 'Desarrollador Frontend',
        duration: '2 meses',

        overview: `TrapLife es una plataforma web desarrollada para una comunidad de GTA RolePlay. La página actúa como punto central donde los jugadores pueden consultar información del servidor, normativas, guías, anuncios y acceder directamente al servidor de Discord.

      El proyecto estuvo enfocado exclusivamente en el desarrollo frontend, ofreciendo una experiencia moderna, responsive e inmersiva alineada con la identidad visual de la comunidad.`,

        challenge: `El principal reto fue diseñar una interfaz clara y atractiva capaz de organizar una gran cantidad de información sin dificultar la navegación. Se priorizó la experiencia de usuario tanto en dispositivos móviles como en escritorio.`,

        architecture: `El proyecto fue desarrollado íntegramente en frontend utilizando HTML, CSS, JavaScript y Tailwind CSS. La estructura se optimizó para ofrecer rapidez, accesibilidad y una navegación intuitiva.`,

        highlights: [
          {
            icon: 'ℹ️',
            title: 'Información del Servidor',
            desc: 'Toda la información relevante de la comunidad, sistemas, facciones y características del servidor.'
          },
          {
            icon: '📋',
            title: 'Normativas',
            desc: 'Sección dedicada a las reglas y normas que regulan la comunidad.'
          },
          {
            icon: '📢',
            title: 'Anuncios',
            desc: 'Noticias, eventos y novedades publicadas para mantener informados a los jugadores.'
          },
          {
            icon: '💬',
            title: 'Acceso a Discord',
            desc: 'Enlace directo para unirse y participar en la comunidad.'
          }
        ],

        gallery_captions: {
          g1: 'Página principal e información de la comunidad',
          g2: 'Sección de normas del servidor',
          g3: 'Páginas informativas de la comunidad',
          g4: 'Acceso a Discord y anuncios'
        }
      },

      ca: {
        title: 'TrapLife',
        subtitle: 'Web de Comunitat GTA RolePlay',
        role: 'Desenvolupador Frontend',
        duration: '2 mesos',

        overview: `TrapLife és una plataforma web creada per a una comunitat de GTA RolePlay. La web funciona com a punt central on els jugadors poden consultar informació del servidor, normatives, guies, anuncis i accedir directament al servidor de Discord.

      El projecte es va centrar exclusivament en el desenvolupament frontend, oferint una experiència moderna, responsive i immersiva adaptada a la identitat visual de la comunitat.`,

        challenge: `El principal repte va ser dissenyar una interfície clara i atractiva capaç d'organitzar una gran quantitat d'informació sense complicar la navegació. Es va prioritzar l'experiència d'usuari tant en dispositius mòbils com en escriptori.`,

        architecture: `El projecte es va desenvolupar íntegrament en frontend utilitzant HTML, CSS, JavaScript i Tailwind CSS. L'estructura es va optimitzar per garantir rendiment, accessibilitat i una navegació intuïtiva.`,

        highlights: [
          {
            icon: 'ℹ️',
            title: 'Informació del Servidor',
            desc: 'Informació centralitzada sobre la comunitat, sistemes, faccions i característiques del servidor.'
          },
          {
            icon: '📋',
            title: 'Normatives',
            desc: 'Apartat dedicat a les normes i regles de la comunitat.'
          },
          {
            icon: '📢',
            title: 'Anuncis',
            desc: 'Novetats, esdeveniments i comunicats importants per als jugadors.'
          },
          {
            icon: '💬',
            title: 'Accés a Discord',
            desc: 'Enllaç directe per unir-se a la comunitat i participar-hi.'
          }
        ],

        gallery_captions: {
          g1: 'Pàgina principal i informació de la comunitat',
          g2: 'Apartat de normes del servidor',
          g3: 'Pàgines informatives de la comunitat',
          g4: 'Accés a Discord i anuncis'
        }
      }
    }
  },

  /* ─────────────────────────────────────────
     ROLL A BALL
  ───────────────────────────────────────── */
  rollaball: {
    id: 'rollaball',
    year: '2023',
    status: 'completed',
    tags: ['Unity', 'C#', 'Physics', 'Game Dev'],
    hero: 'images/roll-ball.png',
    links: [
      { label: 'GitHub', url: 'https://github.com/DRAKEFISTFIRE/Roll-a-Ball', icon: 'github' }
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=900&q=80', captionKey: 'g1' },
      { url: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?w=900&q=80', captionKey: 'g2' },
      { url: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=900&q=80', captionKey: 'g3' },
      { url: 'https://images.unsplash.com/photo-1569017388730-020b5f80a004?w=900&q=80', captionKey: 'g4' }
    ],
    tech: {
      frontend: ['Unity 2022 LTS', 'C#', 'Unity UI Toolkit', 'Cinemachine'],
      backend:  ['Unity PlayerPrefs (local persistence)', 'Unity Physics Engine'],
      tools:    ['Unity Editor', 'Visual Studio', 'Git / GitHub']
    },
    i18n: {
      en: {
        title:        'Roll a Ball',
        subtitle:     '3D Physics Game in Unity',
        role:         'Game Developer',
        duration:     '3 weeks',
        overview:     `Roll a Ball is a 3D physics-based game built in Unity as an introduction to game development fundamentals. The player controls a sphere rolling through an obstacle course, collecting pickups and avoiding hazards — all governed by Unity's Rigidbody physics engine.\n\nThe project served as my first deep dive into game programming concepts: physics-based movement, collision detection, trigger zones, score systems, UI overlays, and level design principles. Despite its simplicity, it required understanding the Unity Editor workflow, C# scripting, and the component-based entity model.`,
        challenge:    `The main learning curve was understanding the difference between physics-based movement (forces on Rigidbody) vs transform-based movement (direct position modification). Using AddForce correctly required understanding FixedUpdate timing vs Update, and how frame rate affects physics simulation.\n\nLevel design was a secondary challenge — creating a course that felt engaging with minimal assets required careful use of scale, elevation changes, and timing-based hazards.`,
        architecture: `The project follows Unity's component architecture. The ball has a <code>PlayerController</code> MonoBehaviour attached to its GameObject, listening for input in <code>Update()</code> and applying forces in <code>FixedUpdate()</code>. Pickups use trigger colliders with an <code>OnTriggerEnter</code> callback that fires a C# event consumed by the <code>GameManager</code> singleton.\n\nThe <code>GameManager</code> tracks score, level state, and UI updates. Camera follow is handled by a dedicated <code>CameraController</code> component using <code>Vector3.Lerp</code> for smooth tracking.`,
        highlights: [
          { icon: '⚽', title: 'Physics Movement',  desc: 'Rigidbody-based rolling physics with force application, friction tuning, and drag control.' },
          { icon: '💥', title: 'Collision System',  desc: 'Trigger-based pickup collection and hazard detection with visual and audio feedback.' },
          { icon: '🏆', title: 'Score System',      desc: 'Dynamic score counter with UI overlay, high score persistence via PlayerPrefs.' },
          { icon: '📷', title: 'Camera Follow',     desc: 'Smooth camera tracking script with offset configuration and smooth damp interpolation.' },
          { icon: '🎮', title: 'Input System',      desc: 'Cross-platform input handling supporting keyboard and controller via Unity Input System.' }
        ],
        gallery_captions: { g1: 'Main play area with pickup collectibles', g2: 'Physics obstacles and hazard zone', g3: 'Score UI and level completion screen', g4: 'Multi-level selection and high score board' }
      },
      es: {
        title:        'Roll a Ball',
        subtitle:     'Juego de Física 3D en Unity',
        role:         'Desarrollador de Videojuegos',
        duration:     '3 semanas',
        overview:     `Roll a Ball es un juego 3D basado en físicas construido en Unity como introducción a los fundamentos del desarrollo de videojuegos. El jugador controla una esfera que rueda por un circuito de obstáculos, recogiendo objetos y evitando peligros — todo gobernado por el motor de físicas Rigidbody de Unity.\n\nEl proyecto fue mi primera inmersión profunda en conceptos de programación de videojuegos: movimiento basado en físicas, detección de colisiones, zonas de trigger, sistemas de puntuación, overlays de UI y principios de diseño de niveles. A pesar de su simplicidad, requirió entender el flujo de trabajo del editor de Unity, el scripting en C# y el modelo de entidades basado en componentes.`,
        challenge:    `La principal curva de aprendizaje fue entender la diferencia entre movimiento basado en físicas (fuerzas en Rigidbody) vs movimiento basado en transform (modificación directa de posición). Usar AddForce correctamente requirió entender el timing de FixedUpdate vs Update, y cómo la tasa de fotogramas afecta a la simulación de físicas.\n\nEl diseño de niveles fue un desafío secundario — crear un circuito que se sintiera entretenido con assets mínimos requirió un uso cuidadoso de la escala, cambios de elevación y peligros basados en timing.`,
        architecture: `El proyecto sigue la arquitectura de componentes de Unity. La bola tiene un MonoBehaviour <code>PlayerController</code> adjunto a su GameObject, escuchando inputs en <code>Update()</code> y aplicando fuerzas en <code>FixedUpdate()</code>. Los objetos recogibles usan colliders de trigger con un callback <code>OnTriggerEnter</code> que dispara un evento C# consumido por el singleton <code>GameManager</code>.\n\nEl <code>GameManager</code> hace seguimiento de la puntuación, el estado del nivel y las actualizaciones de UI. El seguimiento de cámara está gestionado por un componente <code>CameraController</code> dedicado usando <code>Vector3.Lerp</code> para un seguimiento suave.`,
        highlights: [
          { icon: '⚽', title: 'Movimiento Físico',    desc: 'Física de rodadura basada en Rigidbody con aplicación de fuerzas, ajuste de fricción y control de arrastre.' },
          { icon: '💥', title: 'Sistema de Colisiones', desc: 'Recogida de objetos y detección de peligros basada en triggers con retroalimentación visual y de audio.' },
          { icon: '🏆', title: 'Sistema de Puntuación', desc: 'Contador de puntuación dinámico con overlay de UI y persistencia de puntuación máxima via PlayerPrefs.' },
          { icon: '📷', title: 'Seguimiento de Cámara', desc: 'Script de seguimiento de cámara suave con configuración de offset e interpolación smooth damp.' },
          { icon: '🎮', title: 'Sistema de Input',     desc: 'Manejo de input multiplataforma con soporte para teclado y mando via Unity Input System.' }
        ],
        gallery_captions: { g1: 'Área de juego principal con objetos recogibles', g2: 'Obstáculos físicos y zona de peligro', g3: 'UI de puntuación y pantalla de nivel completado', g4: 'Selección multinivel y tabla de mejores puntuaciones' }
      },
      ca: {
        title:        'Roll a Ball',
        subtitle:     'Joc de Física 3D en Unity',
        role:         'Desenvolupador de Videojocs',
        duration:     '3 setmanes',
        overview:     `Roll a Ball és un joc 3D basat en físiques construït en Unity com a introducció als fonaments del desenvolupament de videojocs. El jugador controla una esfera que roda per un circuit d'obstacles, recollint objectes i evitant perills — tot governat pel motor de físiques Rigidbody de Unity.\n\nEl projecte va ser la meva primera immersió profunda en conceptes de programació de videojocs: moviment basat en físiques, detecció de col·lisions, zones de trigger, sistemes de puntuació, overlays d'UI i principis de disseny de nivells. Malgrat la seva simplicitat, va requerir entendre el flux de treball de l'editor de Unity, el scripting en C# i el model d'entitats basat en components.`,
        challenge:    `La principal corba d'aprenentatge va ser entendre la diferència entre moviment basat en físiques (forces en Rigidbody) vs moviment basat en transform (modificació directa de posició). Usar AddForce correctament va requerir entendre el timing de FixedUpdate vs Update, i com la taxa de fotogrames afecta a la simulació de físiques.\n\nEl disseny de nivells va ser un repte secundari — crear un circuit que semblés entretingut amb assets mínims va requerir un ús acurat de l'escala, canvis d'elevació i perills basats en timing.`,
        architecture: `El projecte segueix l'arquitectura de components de Unity. La bola té un MonoBehaviour <code>PlayerController</code> adjunt al seu GameObject, escoltant inputs en <code>Update()</code> i aplicant forces en <code>FixedUpdate()</code>. Els objectes recollibles usen colliders de trigger amb un callback <code>OnTriggerEnter</code> que dispara un esdeveniment C# consumit pel singleton <code>GameManager</code>.\n\nEl <code>GameManager</code> fa seguiment de la puntuació, l'estat del nivell i les actualitzacions d'UI. El seguiment de càmera és gestionat per un component <code>CameraController</code> dedicat usant <code>Vector3.Lerp</code> per a un seguiment suau.`,
        highlights: [
          { icon: '⚽', title: 'Moviment Físic',        desc: 'Física de rodament basada en Rigidbody amb aplicació de forces, ajust de fricció i control d\'arrossegament.' },
          { icon: '💥', title: 'Sistema de Col·lisions', desc: 'Recollida d\'objectes i detecció de perills basada en triggers amb retroalimentació visual i d\'àudio.' },
          { icon: '🏆', title: 'Sistema de Puntuació',  desc: 'Comptador de puntuació dinàmic amb overlay d\'UI i persistència de puntuació màxima via PlayerPrefs.' },
          { icon: '📷', title: 'Seguiment de Càmera',   desc: 'Script de seguiment de càmera suau amb configuració d\'offset i interpolació smooth damp.' },
          { icon: '🎮', title: 'Sistema d\'Input',      desc: 'Gestió d\'input multiplataforma amb suport per a teclat i comandament via Unity Input System.' }
        ],
        gallery_captions: { g1: 'Àrea de joc principal amb objectes recollibles', g2: 'Obstacles físics i zona de perill', g3: 'UI de puntuació i pantalla de nivell completat', g4: 'Selecció multinivell i taula de millors puntuacions' }
      }
    }
  },

  /* ─────────────────────────────────────────
     LES SANTES
  ───────────────────────────────────────── */
  lessantes: {
  id: 'lessantes',
  year: '2025',
  status: 'live',
  tags: ['Web Design', 'UI/UX', 'Frontend', 'Accessibility'],
  hero: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&q=85',
  links: [
    { label: 'Live Site', url: 'https://www.lessantes.cat/', icon: 'globe' },
    { label: 'Mini Game', url: 'https://drakefistfire.github.io/web/joc.html', icon: 'gamepad' },
    { label: 'School Post', url: 'https://mataro.escolapia.cat/2026/05/19/alumnes-de-daw-de-lescola-pia-mataro-presenten-a-lajuntament-una-proposta-de-redisseny-de-la-web-de-les-santes/', icon: 'gamepad' },
    { label: 'Santes Post', url: 'https://www.lessantes.cat/posts/alumnes-de-daw-de-lescola-pia-mataro-presenten-a-lajuntament-una-proposta-de-redisseny-del-web-de-les-santes', icon: 'gamepad' }

  ],
  gallery: [
    { url: 'https://drakefistfire.github.io/web/images/projectes/searcher.png', captionKey: 'g1' },
    { url: 'https://drakefistfire.github.io/web/images/projectes/disseny.png', captionKey: 'g2' },
    { url: 'https://drakefistfire.github.io/web/images/projectes/agenda.png', captionKey: 'g3' },
    { url: 'https://drakefistfire.github.io/web/images/projectes/minisantes.png', captionKey: 'g4' }
  ],
  tech: {
    frontend: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'Responsive Design', 'Accessibility'],
    tools: ['Figma', 'Lighthouse', 'axe Accessibility', 'Git']
  },
  i18n: {
    en: {
      title: 'Les Santes de Mataró',
      subtitle: 'Official Les Santes Website Redesign',
      role: 'UI/UX Designer & Frontend Developer',
      duration: '2 months',

      overview: `This project focused on the redesign and frontend development of the official Les Santes website. The work covered the complete design process, including research, content analysis, information architecture, wireframing, prototyping, usability testing, visual redesign and implementation.

Several design proposals, iterations and validation phases were carried out before reaching the final solution. The objective was to improve navigation, accessibility and user experience while preserving the visual identity and cultural significance of Les Santes.

In addition to the website redesign, I also designed and developed an interactive browser mini-game as part of the digital experience.`,

      challenge: `One of the main challenges was reorganising a large amount of information into a clear structure for different audiences, including locals, visitors and mobile users during the festivities.

The project required balancing tradition and modern UI/UX principles while maintaining accessibility and usability standards. Multiple iterations, feedback cycles and design refinements were applied before final implementation.`,

      architecture: `The project was developed using HTML5, CSS3, JavaScript and GSAP. The process included research, wireframing, prototyping, visual design, frontend implementation, accessibility validation and performance optimisation.

Responsive design, interaction design and content hierarchy were key priorities to ensure a smooth experience across all devices.`,

      highlights: [
        {
          icon: '🔍',
          title: 'Research & Analysis',
          desc: 'Analysis of the existing website, content structure review and identification of UX and accessibility issues.'
        },
        {
          icon: '✏️',
          title: 'Wireframes & Prototyping',
          desc: 'Design of wireframes and interactive prototypes to validate structure and navigation before development.'
        },
        {
          icon: '🧪',
          title: 'Testing & Iteration',
          desc: 'Multiple iterations based on usability feedback and continuous design refinement.'
        },
        {
          icon: '🎨',
          title: 'Visual Redesign',
          desc: 'Modernisation of the interface while preserving the identity of Les Santes.'
        },
        {
          icon: '♿',
          title: 'Accessibility & Responsive Design',
          desc: 'Improved accessibility, readability and responsive behaviour across devices.'
        },
        {
          icon: '🎮',
          title: 'Interactive Mini-Game',
          desc: 'Custom browser mini-game designed and developed by me: https://drakefistfire.github.io/web/joc.html'
        }
      ],

      gallery_captions: {
        g1: 'Research and UX analysis',
        g2: 'Wireframes and structure exploration',
        g3: 'Visual redesign and interface system',
        g4: 'Final responsive implementation'
      }
    },

    es: {
      title: 'Les Santes de Mataró',
      subtitle: 'Rediseño de la Web Oficial de Les Santes',
      role: 'Diseñador UI/UX y Desarrollador Frontend',
      duration: '2 meses',

      overview: `Este proyecto se centró en el rediseño y desarrollo frontend de la web oficial de Les Santes. El trabajo incluyó todo el proceso de diseño: investigación, análisis de contenido, arquitectura de información, wireframes, prototipado, pruebas de usabilidad, rediseño visual e implementación.

Se realizaron varias iteraciones y validaciones antes de llegar a la solución final. El objetivo fue mejorar la navegación, la accesibilidad y la experiencia de usuario manteniendo la identidad cultural del proyecto.

Además, se diseñó y desarrolló un minijuego interactivo como parte de la experiencia digital.`,

      challenge: `Uno de los principales retos fue reorganizar una gran cantidad de información en una estructura clara para diferentes tipos de usuarios, incluyendo visitantes y usuarios móviles durante las fiestas.

El proyecto exigió equilibrar tradición y diseño moderno, manteniendo estándares de accesibilidad y usabilidad mediante múltiples iteraciones y mejoras continuas.`,

      architecture: `El proyecto se desarrolló con HTML5, CSS3, JavaScript y GSAP. El proceso incluyó investigación, prototipado, diseño visual, desarrollo frontend, validación de accesibilidad y optimización de rendimiento.

Se priorizó la experiencia responsive y la jerarquía de contenido para garantizar una navegación fluida en todos los dispositivos.`,

      highlights: [
        {
          icon: '🔍',
          title: 'Investigación y análisis',
          desc: 'Evaluación del sitio existente y detección de problemas de UX y accesibilidad.'
        },
        {
          icon: '✏️',
          title: 'Wireframes y prototipos',
          desc: 'Diseño de estructuras y prototipos interactivos para validar la experiencia.'
        },
        {
          icon: '🧪',
          title: 'Pruebas e iteración',
          desc: 'Mejoras continuas basadas en feedback de usabilidad.'
        },
        {
          icon: '🎨',
          title: 'Rediseño visual',
          desc: 'Modernización del diseño manteniendo la identidad del proyecto.'
        },
        {
          icon: '♿',
          title: 'Accesibilidad y responsive',
          desc: 'Optimización de accesibilidad y adaptación a dispositivos móviles.'
        },
        {
          icon: '🎮',
          title: 'Minijuego interactivo',
          desc: 'Minijuego desarrollado por mí: https://drakefistfire.github.io/web/joc.html'
        }
      ],

      gallery_captions: {
        g1: 'Análisis de investigación UX',
        g2: 'Exploración de wireframes',
        g3: 'Sistema visual y rediseño',
        g4: 'Implementación responsive final'
      }
    },

    ca: {
      title: 'Les Santes de Mataró',
      subtitle: 'Redisseny del Web Oficial de Les Santes',
      role: 'Dissenyador UI/UX i Desenvolupador Frontend',
      duration: '2 mesos',

      overview: `Aquest projecte es va centrar en el redisseny i desenvolupament frontend del web oficial de Les Santes. El treball va incloure tot el procés de disseny: recerca, anàlisi de contingut, arquitectura de la informació, wireframes, prototipat, proves d’usabilitat, redisseny visual i implementació.

Es van fer diverses iteracions i validacions abans d’arribar a la solució final. L’objectiu va ser millorar la navegació, l’accessibilitat i l’experiència d’usuari mantenint la identitat cultural del projecte.

A més, es va desenvolupar un minijoc interactiu com a part de l’experiència digital.`,

      challenge: `Un dels principals reptes va ser reorganitzar una gran quantitat d’informació en una estructura clara per a diferents tipus d’usuaris, incloent visitants i usuaris mòbils durant les festes.

El projecte va requerir equilibrar tradició i disseny modern mantenint estàndards d’accessibilitat i usabilitat amb múltiples iteracions.`,

      architecture: `El projecte es va desenvolupar amb HTML5, CSS3, JavaScript i GSAP. El procés va incloure recerca, prototipat, disseny visual, desenvolupament frontend, validació d’accessibilitat i optimització de rendiment.

Es va prioritzar el disseny responsive i la jerarquia de contingut per garantir una experiència fluida en tots els dispositius.`,

      highlights: [
        {
          icon: '🔍',
          title: 'Recerca i anàlisi',
          desc: 'Avaluació del lloc existent i detecció de problemes d’UX i accessibilitat.'
        },
        {
          icon: '✏️',
          title: 'Wireframes i prototips',
          desc: 'Disseny d’estructures i prototips interactius per validar la navegació.'
        },
        {
          icon: '🧪',
          title: 'Proves i iteració',
          desc: 'Millores contínues basades en feedback d’usabilitat.'
        },
        {
          icon: '🎨',
          title: 'Redisseny visual',
          desc: 'Modernització del disseny mantenint la identitat del projecte.'
        },
        {
          icon: '♿',
          title: 'Accessibilitat i responsive',
          desc: 'Optimització d’accessibilitat i adaptació a dispositius mòbils.'
        },
        {
          icon: '🎮',
          title: 'Minijoc interactiu',
          desc: 'Minijoc desenvolupat per mi: https://drakefistfire.github.io/web/joc.html'
        }
      ],

      gallery_captions: {
        g1: 'Recerca i anàlisi UX',
        g2: 'Exploració de wireframes',
        g3: 'Sistema visual i disseny',
        g4: 'Implementació responsive final'
      }
    }
  }
}
};


/* ══════════════════════════════════════════════════════════════
   PROJECT PAGE RENDERER
   Reads lang from localStorage (set by language.js)
   ══════════════════════════════════════════════════════════════ */

(function () {

  /* ── Helpers ──────────────────────────────── */
  function getLang() {
    return localStorage.getItem('portfolio-lang') || 'en';
  }

  /* ── Resolve project + lang ───────────────── */
  const params    = new URLSearchParams(window.location.search);
  const id        = params.get('id');
  const container = document.getElementById('project-page');

  if (!id || !PROJECTS_I18N[id]) {
    container.innerHTML = `
      <div style="padding:16rem 8vw;text-align:center">
        <div style="font-family:var(--font-display);font-size:5rem;color:var(--red)">404</div>
        <p style="color:var(--muted);margin-top:1rem">Project not found.</p>
        <a href="index.html" style="color:var(--red);font-family:var(--font-mono);font-size:.8rem;letter-spacing:.1em">← Back to portfolio</a>
      </div>`;
    return;
  }

  const proj = PROJECTS_I18N[id];

  /* ── Full render based on current lang ───── */
  function renderProject() {
    const lang  = getLang();
    const p     = proj.i18n[lang] || proj.i18n['en'];

    document.title = `${p.title} — Aniol Rodríguez`;

    /* Status badge */
    const statusMap = {
      'in-development': { en: 'In Development', es: 'En Desarrollo',   ca: 'En Desenvolupament', color: '#f59e0b' },
      'completed':      { en: 'Completed',       es: 'Completado',      ca: 'Completat',           color: '#10b981' },
      'live':           { en: 'Live',            es: 'En Vivo',         ca: 'En Viu',              color: '#3b82f6' }
    };
    const st = statusMap[proj.status] || statusMap['completed'];
    const stLabel = st[lang] || st['en'];

    /* Links */
    const linksLabels = { GitHub: 'GitHub', 'Live Site': { en: 'Live Site', es: 'Sitio en Vivo', ca: 'Lloc en Viu' } };
    const linksHTML = proj.links.map(l => {
      const label = typeof linksLabels[l.label] === 'object'
        ? (linksLabels[l.label][lang] || l.label)
        : l.label;
      return `
        <a href="${l.url}" target="_blank" class="pd-link">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            ${l.icon === 'github'
              ? '<path d="M8 .5C3.86.5.5 3.86.5 8a7.5 7.5 0 005.14 7.14c.38.07.52-.16.52-.36v-1.26c-2.1.46-2.54-.92-2.54-.92-.34-.87-.84-1.1-.84-1.1-.69-.47.05-.46.05-.46.76.05 1.16.78 1.16.78.67 1.15 1.77.82 2.2.63.07-.49.26-.82.48-1.01-1.67-.19-3.43-.84-3.43-3.73 0-.82.29-1.5.78-2.02-.08-.19-.34-.96.07-2 0 0 .64-.2 2.1.78a7.3 7.3 0 013.82 0c1.46-.98 2.1-.78 2.1-.78.41 1.04.15 1.81.07 2 .49.52.78 1.2.78 2.02 0 2.9-1.76 3.54-3.44 3.72.27.23.51.7.51 1.41v2.09c0 .2.14.44.52.36A7.5 7.5 0 0015.5 8C15.5 3.86 12.14.5 8 .5z"/>'
              : '<path d="M8.5 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM1 8a7.5 7.5 0 1115 0A7.5 7.5 0 011 8zm7-3.5a.75.75 0 01.75.75v3.5l2.25 1.3a.75.75 0 01-.75 1.3l-2.5-1.45A.75.75 0 017 9.25v-4A.75.75 0 018 4.5z"/>'}
          </svg>
          ${label} <span>→</span>
        </a>`;
    }).join('');

    /* Tags */
    const tagsHTML = proj.tags.map(t => `<span class="pd-tag">${t}</span>`).join('');

    /* Meta labels */
    const metaLabels = {
      en: { year: 'Year', role: 'Role', duration: 'Duration' },
      es: { year: 'Año',  role: 'Rol',  duration: 'Duración' },
      ca: { year: 'Any',  role: 'Rol',  duration: 'Duració'  }
    };
    const ml = metaLabels[lang] || metaLabels['en'];

    /* Section labels */
    const sectionLabels = {
      en: { overview: '// Overview',      challenge: '// The Challenge', gallery: '// Gallery', arch: '// Architecture & Technical Notes', links: '// Links', features: '// Key Features', stack: '// Tech Stack', more: '// More Projects' },
      es: { overview: '// Descripción',   challenge: '// El Desafío',    gallery: '// Galería', arch: '// Arquitectura y Notas Técnicas',  links: '// Enlaces', features: '// Funcionalidades Clave', stack: '// Stack Técnico', more: '// Más Proyectos' },
      ca: { overview: '// Descripció',    challenge: '// El Repte',      gallery: '// Galeria', arch: '// Arquitectura i Notes Tècniques', links: '// Enllaços', features: '// Funcionalitats Clau', stack: '// Stack Tècnic', more: '// Més Projectes' }
    };
    const sl = sectionLabels[lang] || sectionLabels['en'];

    /* Tech stack */
    const techCatLabels = {
      frontend: { en: 'Frontend', es: 'Frontend', ca: 'Frontend' },
      backend:  { en: 'Backend',  es: 'Backend',  ca: 'Backend'  },
      tools:    { en: 'Tools',    es: 'Herramientas', ca: 'Eines' }
    };
    const techHTML = Object.entries(proj.tech).map(([cat, items]) => `
      <div class="pd-tech-group">
        <div class="pd-tech-cat">${(techCatLabels[cat] || {})[lang] || cat}</div>
        <div class="pd-tech-pills">${items.map(i => `<span class="pd-tech-pill">${i}</span>`).join('')}</div>
      </div>
    `).join('');

    /* Highlights */
    const highlightsHTML = p.highlights.map(h => `
      <div class="pd-highlight">
        <div class="pd-hl-icon">${h.icon}</div>
        <div>
          <div class="pd-hl-title">${h.title}</div>
          <p class="pd-hl-desc">${h.desc}</p>
        </div>
      </div>
    `).join('');

    /* Gallery */
    const galleryHTML = proj.gallery.map((g, i) => {
      const caption = p.gallery_captions[g.captionKey] || '';
      return `
        <div class="pd-gallery-item reveal" style="animation-delay:${i * 0.1}s" onclick="openLightbox('${g.url}','${caption}')">
          <img src="${g.url}" alt="${caption}" loading="lazy"/>
          <div class="pd-gallery-caption">${caption}</div>
          <div class="pd-gallery-zoom">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M11 4h5v5M14 6l-9 9M4 9V4h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
        </div>`;
    }).join('');

    /* Prose: convert newlines to paragraphs */
    function prose(text) {
      return text.split('\n\n').map(block => `<p>${block}</p>`).join('');
    }

    /* ── Render HTML ──────────────────────── */
    container.innerHTML = `
      <div class="pd-hero" style="background-image:url('${proj.hero}')">
        <div class="pd-hero-overlay"></div>
        <div class="pd-hero-content">
          <div class="pd-status" style="color:${st.color};border-color:${st.color}20;background:${st.color}10">
            <span class="pd-status-dot" style="background:${st.color}"></span>${stLabel}
          </div>
          <h1 class="pd-title">${p.title}</h1>
          <p class="pd-subtitle">${p.subtitle}</p>
          <div class="pd-tags">${tagsHTML}</div>
        </div>
        <div class="pd-hero-meta">
          <div class="pd-meta-item"><span class="pd-meta-label">${ml.year}</span><span class="pd-meta-val">${proj.year}</span></div>
          <div class="pd-meta-item"><span class="pd-meta-label">${ml.role}</span><span class="pd-meta-val">${p.role}</span></div>
          <div class="pd-meta-item"><span class="pd-meta-label">${ml.duration}</span><span class="pd-meta-val">${p.duration}</span></div>
        </div>
      </div>

      <div class="pd-body">
        <div class="pd-main">
          <div class="pd-section reveal">
            <div class="pd-section-tag">${sl.overview}</div>
            <div class="pd-prose">${prose(p.overview)}</div>
          </div>
          <div class="pd-section reveal">
            <div class="pd-section-tag">${sl.challenge}</div>
            <div class="pd-prose">${prose(p.challenge)}</div>
          </div>
          <div class="pd-section reveal">
            <div class="pd-section-tag">${sl.gallery}</div>
            <div class="pd-gallery">${galleryHTML}</div>
          </div>
          <div class="pd-section reveal">
            <div class="pd-section-tag">${sl.arch}</div>
            <div class="pd-prose pd-prose--mono">${prose(p.architecture)}</div>
          </div>
        </div>

        <aside class="pd-aside">
          <div class="pd-aside-block reveal">
            <div class="pd-section-tag">${sl.links}</div>
            <div class="pd-links">${linksHTML}</div>
          </div>
          <div class="pd-aside-block reveal">
            <div class="pd-section-tag">${sl.features}</div>
            <div class="pd-highlights">${highlightsHTML}</div>
          </div>
          <div class="pd-aside-block reveal">
            <div class="pd-section-tag">${sl.stack}</div>
            <div class="pd-tech">${techHTML}</div>
          </div>
        </aside>
      </div>

      <div class="pd-more">
        <div class="pd-section-tag" style="justify-content:center;margin-bottom:2.5rem">${sl.more}</div>
        <div class="pd-more-grid" id="pd-more-grid"></div>
      </div>

      <div id="pd-lightbox" class="pd-lightbox" onclick="closeLightbox()">
        <div class="pd-lb-inner" onclick="event.stopPropagation()">
          <img id="pd-lb-img" src="" alt=""/>
          <div id="pd-lb-caption" class="pd-lb-caption"></div>
          <button class="pd-lb-close" onclick="closeLightbox()">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </div>`;

    /* ── More Projects ────────────────────── */
    const moreGrid = document.getElementById('pd-more-grid');
    const others   = Object.values(PROJECTS_I18N).filter(pr => pr.id !== id).slice(0, 3);
    moreGrid.innerHTML = others.map(pr => {
      const prp = pr.i18n[lang] || pr.i18n['en'];
      return `
        <a href="project.html?id=${pr.id}" class="pd-more-card">
          <div class="pd-more-thumb" style="background-image:url('${pr.hero}')"></div>
          <div class="pd-more-body">
            <div class="pd-more-title">${prp.title}</div>
            <div class="pd-more-sub">${prp.subtitle}</div>
            <div class="pd-more-tags">${pr.tags.slice(0,3).map(t=>`<span>${t}</span>`).join('')}</div>
          </div>
        </a>`;
    }).join('');

    /* ── Reveal observer ──────────────────── */
    const obs = new IntersectionObserver((entries, o) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('visible');
        o.unobserve(e.target);
      }
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  }

  /* ── Initial render ───────────────────────── */
  renderProject();

  /* ── Re-render when language changes ─────── */
  window.addEventListener('storage', e => {
    if (e.key === 'portfolio-lang') renderProject();
  });

  /* ── Also listen to custom event from language.js ─ */
  window.addEventListener('langchange', renderProject);

})();

/* ── Lightbox ───────────────────────────────── */
function openLightbox(url, caption) {
  const lb = document.getElementById('pd-lightbox');
  document.getElementById('pd-lb-img').src       = url;
  document.getElementById('pd-lb-caption').textContent = caption;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('pd-lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });