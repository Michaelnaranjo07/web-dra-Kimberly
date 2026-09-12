import type { SiteContent } from './types'

/** Fotos reales del consultorio (public/images) */
const IMG_HERO = '/images/fachada-clinica.png'
const IMG_TRUST = '/images/dra-kimberly.jpg'
const IMG_CLINIC = '/images/planeacion-tratamiento.jpg'
const IMG_ORTO = '/images/servicio-ortodoncia.jpg'
const IMG_WHITE = '/images/servicio-blanqueamiento.jpg'
const IMG_PROTESIS = '/images/protesis-dental.png'
const IMG_ENDO = '/images/servicio-endodoncia.jpg'
const IMG_GEST = '/images/servicio-gestantes.jpg'
const VID_ORTO = '/images/servicio-ortodoncia.mp4'
const VID_WHITE = '/images/servicio-blanqueamiento.mp4'
const VID_ENDO = '/images/servicio-endodoncia.mp4'
/** Testimonios: stock hasta tener consentimiento de pacientes */
const IMG_PACIENTE_1 =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80'
const IMG_PACIENTE_2 =
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80'
const IMG_PACIENTE_3 =
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80'
const IMG_PACIENTE_4 =
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80'

const ADDRESS =
  'Calle 64A Sur #72-18 Local 1, Barrio Perdomo, Bogotá, Colombia'
const MAP_QUERY = encodeURIComponent(ADDRESS)
const GOOGLE_REVIEWS_URL =
  'https://www.google.com/maps/search/?api=1&query=Calle+64A+Sur+%2372-18+Local+1+Barrio+Perdomo+Bogotá'

export const defaultContent: SiteContent = {
  seo: {
    title: 'Dra. Kimberly Martínez — Odontología en Bogotá | Perdomo',
    description:
      'Consultorio odontológico en Barrio Perdomo, Bogotá. Ortodoncia, blanqueamiento, prótesis, endodoncia y odontología para gestantes. Agenda por WhatsApp.',
    keywords:
      'odontología Bogotá, dra kimberly martinez, ortodoncia Perdomo, blanqueamiento dental, prótesis flexibles, endodoncia, odontología gestantes',
    ogImage: '/images/fachada-clinica.png',
  },
  hero: {
    brand: 'Dra. Kimberly Martínez',
    logoUrl: '/logo-sin-texto.png',
    eyebrow: 'Odontología de precisión en Bogotá',
    lineOne: 'Precisión que se siente',
    accentWord: 'natural.',
    lineTwo: '',
    promise:
      'Diagnóstico claro, tratamientos precisos y un trato cercano. Agenda tu valoración y da el siguiente paso con calma.',
    watermark: 'PRECISIÓN',
    primaryCtaLabel: 'Agendar cita',
    secondaryCtaLabel: 'Ver tratamientos',
    secondaryCtaHref: '#tratamientos',
    doctorImageUrl: IMG_HERO,
    floatingCardTitle: 'Agenda tu valoración con calma',
    floatingCardBody: 'Un solo camino de consulta. Sin presión, con plan claro.',
    highlights: [
      { id: 'h1', label: 'Valoración clara' },
      { id: 'h2', label: 'Plan a tu ritmo' },
      { id: 'h3', label: 'Diagnóstico primero' },
      { id: 'h4', label: 'Atención cercana' },
    ],
    paymentTitle: 'Medios de pago',
    paymentMethods: [
      {
        id: 'p1',
        label: 'Codensa',
        logoUrl: '/payments/codensa.png',
        notes: 'Crédito Codensa para tratamientos.',
        enabled: true,
      },
      {
        id: 'p2',
        label: 'Sistecrédito',
        logoUrl: '/payments/sistecredito.webp',
        notes: 'Financiación en cuotas.',
        enabled: true,
      },
      {
        id: 'p3',
        label: 'Visa',
        logoUrl: '/payments/visa-logo-png.png',
        notes: 'Tarjetas Visa.',
        enabled: true,
      },
      {
        id: 'p4',
        label: 'Mastercard',
        logoUrl: '/payments/mastercard.svg',
        notes: 'Tarjetas Mastercard.',
        enabled: true,
      },
      {
        id: 'p5',
        label: 'Efectivo',
        logoUrl: '/payments/efectivo.svg',
        notes: 'Pago en efectivo en consultorio.',
        enabled: true,
      },
      {
        id: 'p6',
        label: 'Welli',
        logoUrl: '/payments/welli.png',
        notes: 'Financiación Welli.',
        enabled: true,
      },
    ],
    stats: [
      { id: 's1', value: '10+', label: 'Años de experiencia' },
      { id: 's2', value: '5+', label: 'Áreas de tratamiento' },
      { id: 's3', value: '1:1', label: 'Atención personalizada' },
    ],
    trustStatValue: '10+',
    trustStatLabel: 'años de experiencia clínica',
  },
  journey: {
    title: 'De la incertidumbre a la confianza informada.',
    intro:
      'El recorrido refleja cómo decides: reducir ansiedad, entender el plan, ver criterio clínico y dar el siguiente paso con calma.',
    watermark: 'CONFIANZA',
    activeStepIndex: 1,
    steps: [
      {
        id: 'j1',
        title: 'REDUCIR ANSIEDAD',
        description: 'Un primer contacto claro, sin presión ni tecnicismos innecesarios.',
      },
      {
        id: 'j2',
        title: 'CONSTRUIR ENTENDIMIENTO',
        description: 'Capítulos claros que traducen el tratamiento en decisiones simples.',
      },
      {
        id: 'j3',
        title: 'PROBAR CREDIBILIDAD',
        description: 'Proceso, materiales y resultados reales hacen visible la experiencia.',
      },
      {
        id: 'j4',
        title: 'HABILITAR ACCIÓN',
        description: 'Un solo camino de consulta cierra el recorrido sin presión.',
      },
    ],
    flowLabels: ['INCERTIDUMBRE', 'CLARIDAD', 'PRUEBA', 'CONFIANZA', 'ACCIÓN'],
  },
  services: {
    eyebrow: 'Servicios',
    title: 'Tratamientos pensados para tu día a día',
    intro:
      'Ortodoncia, blanqueamiento, prótesis, endodoncia y odontología para gestantes en Bogotá — cada opción explicada en lenguaje claro: qué cambia para ti, cómo se siente el proceso y para quién tiene más sentido.',
    ctaLabel: 'Agendar valoración',
    ctaHref: '#cita',
    items: [
      {
        id: 'ortodoncia',
        title: 'Ortodoncia',
        benefit: 'Alinear con un plan que entiendes desde la primera cita.',
        description:
          'Corrige la posición de tus dientes con un seguimiento cercano y pasos claros. Ideal si buscas mejorar mordida, estética o comodidad al hablar y comer, sin sorpresas en el camino.',
        pageBody:
          'En el consultorio de la Dra. Kimberly Martínez en Barrio Perdomo, la ortodoncia empieza por una valoración clara: qué quieres corregir, cómo se ve el proceso y qué implica en tu rutina. El plan se explica sin tecnicismos innecesarios, con controles cercanos para que avances con tranquilidad. Trabajamos alineación, mordida y comodidad al hablar o comer, siempre con decisiones compartidas y sin presión.',
        audience:
          'Ideal si buscas mejorar la posición de tus dientes, la mordida o la estética de tu sonrisa con un seguimiento cercano.',
        slug: 'ortodoncia',
        imageUrl: IMG_ORTO,
        imageAlt:
          'Ortodoncia en el consultorio Dra. Kimberly Martínez, Bogotá',
        videoUrl: VID_ORTO,
        highlights: [
          { id: 'o1', label: 'Valoración y plan explicados desde el inicio' },
          { id: 'o2', label: 'Seguimiento cercano en cada etapa' },
          { id: 'o3', label: 'Decisiones a tu ritmo, sin presión' },
        ],
        faqs: [
          {
            id: 'orto-f1',
            question: '¿Cuánto dura un tratamiento de ortodoncia?',
            answer:
              'Depende de cada caso: la complejidad, la colaboración en los controles y el tipo de aparatología influyen. En la valoración te explicamos un rango realista y cómo se ajusta el plan si hace falta.',
          },
          {
            id: 'orto-f2',
            question: '¿Duele ponerse brackets o alineadores?',
            answer:
              'Es normal sentir presión o sensibilidad los primeros días después de un ajuste. Suele ser manejable y te orientamos sobre cómo aliviar la molestia en casa.',
          },
          {
            id: 'orto-f3',
            question: '¿Puedo empezar ortodoncia siendo adulto?',
            answer:
              'Sí. Muchas personas adultas corrigen alineación o mordida. Evaluamos tu salud periodontal y tus objetivos antes de proponer un plan.',
          },
          {
            id: 'orto-f4',
            question: '¿Qué tipos de ortodoncia manejan?',
            answer:
              'En la valoración te mostramos las opciones disponibles en el consultorio — incluyendo brackets metálicos y estéticos — con sus tiempos, cuidados diarios y diferencias reales, para que decidas con información y no solo por estética.',
          },
          {
            id: 'orto-f5',
            question: '¿Necesito sacarme dientes para la ortodoncia?',
            answer:
              'No siempre. Depende del espacio disponible y la posición de tus dientes. Si una extracción hace parte del plan, te lo explicamos como paso necesario desde el inicio, no como sorpresa a mitad de tratamiento.',
          },
        ],
        seoTitle: 'Ortodoncia en Bogotá — Dra. Kimberly Martínez | Perdomo',
        seoDescription:
          'Ortodoncia en Barrio Perdomo, Bogotá. Plan claro, seguimiento cercano y decisiones sin presión. Agenda con la Dra. Kimberly Martínez.',
        seoKeywords:
          'ortodoncia Bogotá, ortodoncia Perdomo, brackets Bogotá, alineación dental, dra kimberly martinez',
      },
      {
        id: 'blanqueamiento',
        title: 'Blanqueamiento dental',
        benefit: 'Más luminosidad, con control y cuidado de tu esmalte.',
        description:
          'Aclara el tono de tus dientes de forma supervisada, respetando la salud de tu boca. Pensado para quienes quieren verse más descansados y seguros, sin agresiones innecesarias al esmalte.',
        pageBody:
          'El blanqueamiento dental en el consultorio se hace con criterio: primero valoramos el estado de tu esmalte y tus expectativas, después elegimos un enfoque supervisado para aclarar el tono con seguridad. Buscamos un resultado natural — más luminosidad sin agresiones innecesarias — para que te veas descansada y segura, cuidando la salud de tu boca en cada paso.',
        audience:
          'Ideal si quieres un tono más claro y natural, con supervisión profesional y respeto por tu esmalte.',
        slug: 'blanqueamiento-dental',
        imageUrl: IMG_WHITE,
        imageAlt:
          'Blanqueamiento dental en el consultorio Dra. Kimberly Martínez, Bogotá',
        videoUrl: VID_WHITE,
        highlights: [
          { id: 'b1', label: 'Valoración previa del esmalte y la sonrisa' },
          { id: 'b2', label: 'Proceso supervisado, resultado natural' },
          { id: 'b3', label: 'Cuidado de la salud bucal en cada paso' },
        ],
        faqs: [
          {
            id: 'blanc-f1',
            question: '¿El blanqueamiento daña el esmalte?',
            answer:
              'Con valoración previa y un protocolo supervisado, el objetivo es respetar el esmalte. No todos los casos son candidatos; por eso revisamos caries, sensibilidad y restauraciones antes de avanzar.',
          },
          {
            id: 'blanc-f2',
            question: '¿Cuánto dura el resultado?',
            answer:
              'Varía según hábitos (café, té, tabaco) e higiene. Te orientamos sobre mantenimiento realista; no prometemos un tono permanente.',
          },
          {
            id: 'blanc-f3',
            question: '¿Puedo blanquear si tengo coronas o resinas?',
            answer:
              'El blanqueamiento actúa sobre el diente natural. Las restauraciones no cambian de color igual; en la cita te explicamos qué se puede armonizar y qué no.',
          },
          {
            id: 'blanc-f4',
            question: '¿Cuántas sesiones necesito?',
            answer:
              'Varía según el tono de partida y tus expectativas. En la valoración te damos un número realista de sesiones — no prometemos un resultado en una sola cita si tu caso no lo permite.',
          },
          {
            id: 'blanc-f5',
            question: '¿Puedo blanquear si tengo los dientes sensibles?',
            answer:
              'Sí, evaluamos primero el nivel de sensibilidad y ajustamos el protocolo o el producto según tu caso. Si la sensibilidad es alta, te lo decimos antes de empezar, no después.',
          },
        ],
        seoTitle:
          'Blanqueamiento dental en Bogotá — Dra. Kimberly Martínez',
        seoDescription:
          'Blanqueamiento dental controlado en Bogotá. Resultado natural y cuidado del esmalte en el consultorio de la Dra. Kimberly Martínez en Perdomo.',
        seoKeywords:
          'blanqueamiento dental Bogotá, blanqueamiento Perdomo, dientes más blancos, dra kimberly martinez',
      },
      {
        id: 'protesis',
        title: 'Prótesis dental',
        benefit: 'Recuperar masticar y sonreír con naturalidad.',
        description:
          'Reemplaza dientes ausentes o dañados para volver a comer y hablar con confianza. Incluye prótesis flexibles, una opción más cómoda y discreta para quienes buscan un ajuste amable en el día a día.',
        pageBody:
          'Las prótesis dentales ayudan a recuperar función y estética cuando faltan dientes o hay piezas muy comprometidas. En el consultorio evaluamos tu caso y te explicamos opciones claras — incluida la prótesis flexible, pensada para mayor comodidad y discreción en el día a día. El objetivo es volver a masticar, hablar y sonreír con naturalidad, con un plan que entiendes desde la primera cita.',
        audience:
          'Ideal si necesitas reemplazar dientes ausentes o dañados y buscas comodidad, función y un resultado natural.',
        slug: 'protesis-dental',
        imageUrl: IMG_PROTESIS,
        imageAlt:
          'Prótesis dental flexible en el consultorio Dra. Kimberly Martínez, Bogotá',
        highlights: [
          { id: 'p1', label: 'Opciones claras, incluida prótesis flexible' },
          { id: 'p2', label: 'Enfoque en comodidad y naturalidad' },
          { id: 'p3', label: 'Plan explicado antes de avanzar' },
        ],
        faqs: [
          {
            id: 'prot-f1',
            question: '¿Qué es una prótesis flexible?',
            answer:
              'Es una opción removible con materiales más flexibles que las bases rígidas tradicionales. En muchos casos resulta más cómoda y discreta; evaluamos si encaja con tu anatomía y necesidades.',
          },
          {
            id: 'prot-f2',
            question: '¿Cuánto tarda adaptarse a una prótesis?',
            answer:
              'Los primeros días pueden sentirse extraños al hablar o masticar. Con controles y ajustes el proceso suele volverse más natural; te acompañamos en esa etapa.',
          },
          {
            id: 'prot-f3',
            question: '¿Cómo se cuida una prótesis en casa?',
            answer:
              'Higiene diaria, limpieza adecuada del aparato y revisiones periódicas ayudan a mantener comodidad y función. Te dejamos indicaciones claras según el tipo de prótesis.',
          },
          {
            id: 'prot-f4',
            question: '¿Cuál es la diferencia entre prótesis parcial y total?',
            answer:
              'La parcial reemplaza algunos dientes ausentes y se apoya en los que conservas; la total sustituye toda la arcada. Cuál te conviene depende de cuántas piezas te faltan y del estado de las que quedan — se define en la valoración.',
          },
          {
            id: 'prot-f5',
            question: '¿Una prótesis se ve natural?',
            answer:
              'Buscamos que el color y la forma coincidan con tu sonrisa. El grado de naturalidad depende del tipo de prótesis y de tu anatomía; en la cita te mostramos qué resultado es razonable esperar.',
          },
        ],
        seoTitle: 'Prótesis dental en Bogotá — Dra. Kimberly Martínez',
        seoDescription:
          'Prótesis dental y prótesis flexibles en Bogotá. Recuperar función y estética con un plan claro en Barrio Perdomo.',
        seoKeywords:
          'prótesis dental Bogotá, prótesis flexibles Perdomo, dentadura Bogotá, dra kimberly martinez',
      },
      {
        id: 'endodoncia',
        title: 'Endodoncia',
        benefit: 'Aliviar el dolor y conservar tu diente cuando aún es posible.',
        description:
          'Trata la inflamación o infección dentro del diente para quitar el dolor y evitar una extracción innecesaria. Para quienes llegan con molestia intensa y quieren una solución calmada, explicada paso a paso.',
        pageBody:
          'La endodoncia trata la inflamación o infección dentro del diente para aliviar el dolor y, cuando es posible, conservar la pieza. Si llegas con molestia intensa, priorizamos calma y claridad: te explicamos qué está pasando, qué implica el tratamiento y cómo se cuida después. El objetivo es resolver el problema sin precipitar una extracción si tu diente aún se puede salvar.',
        audience:
          'Ideal si tienes dolor dental intenso o infección y quieres una solución clara para conservar tu diente.',
        slug: 'endodoncia',
        imageUrl: IMG_ENDO,
        imageAlt:
          'Endodoncia en el consultorio Dra. Kimberly Martínez, Bogotá',
        videoUrl: VID_ENDO,
        highlights: [
          { id: 'e1', label: 'Alivio del dolor con explicación paso a paso' },
          { id: 'e2', label: 'Prioridad a conservar el diente cuando es viable' },
          { id: 'e3', label: 'Atención calmada en momentos de molestia' },
        ],
        faqs: [
          {
            id: 'endo-f1',
            question: '¿La endodoncia duele?',
            answer:
              'Se realiza con anestesia local para que el procedimiento sea cómodo. Después puede haber sensibilidad leve; te indicamos cómo cuidarte en casa.',
          },
          {
            id: 'endo-f2',
            question: '¿Siempre se puede salvar el diente?',
            answer:
              'No en todos los casos. Valoramos la viabilidad con radiografías y examen clínico. Si la extracción es la opción más prudente, te lo explicamos con claridad.',
          },
          {
            id: 'endo-f3',
            question: '¿Qué sigue después del tratamiento de conducto?',
            answer:
              'Suele necesitarse una restauración (obturación o corona según el caso) para proteger la pieza. Te explicamos el siguiente paso antes de cerrar la cita.',
          },
          {
            id: 'endo-f4',
            question: '¿Cuántas citas toma un tratamiento de conducto?',
            answer:
              'La mayoría de los casos se resuelven en una o dos citas, según la complejidad del diente y si hay infección activa. Te damos un estimado claro después de revisar la radiografía.',
          },
          {
            id: 'endo-f5',
            question: '¿Puedo comer normal después de la endodoncia?',
            answer:
              'Es mejor esperar a que pase el efecto de la anestesia y evitar morder fuerte con ese diente hasta que quede protegido con la restauración final. Te damos indicaciones concretas al salir de la cita.',
          },
        ],
        seoTitle: 'Endodoncia en Bogotá — Dra. Kimberly Martínez | Perdomo',
        seoDescription:
          'Endodoncia en Bogotá para aliviar el dolor y conservar tu diente. Atención clara en el consultorio de la Dra. Kimberly Martínez en Perdomo.',
        seoKeywords:
          'endodoncia Bogotá, tratamiento de conducto Perdomo, dolor dental, dra kimberly martinez',
      },
      {
        id: 'gestantes',
        title: 'Odontología para gestantes',
        benefit: 'Cuidado dental seguro mientras esperas a tu bebé.',
        description:
          'Atención pensada para el embarazo: valoración cuidadosa, explicaciones tranquilas y decisiones que priorizan tu bienestar y el de tu bebé. Un diferenciador del consultorio — aquí el cuidado dental durante la gestación se trata con criterio y calma.',
        pageBody:
          'Durante el embarazo, la salud bucal merece atención con criterio y calma. En el consultorio de la Dra. Kimberly Martínez ofrecemos odontología para gestantes: valoración cuidadosa, explicaciones tranquilas y decisiones que priorizan tu bienestar y el de tu bebé. Es un diferenciador del consultorio — aquí no se improvisa: se escucha, se explica y se actúa con prudencia clínica en cada etapa del embarazo.',
        audience:
          'Ideal si estás embarazada y quieres cuidado dental seguro, claro y sin alarmismo innecesario.',
        slug: 'odontologia-gestantes',
        imageUrl: IMG_GEST,
        imageAlt:
          'Odontología para gestantes en el consultorio Dra. Kimberly Martínez, Bogotá',
        highlights: [
          { id: 'g1', label: 'Valoración cuidadosa en cada trimestre' },
          { id: 'g2', label: 'Explicaciones tranquilas, sin presión' },
          { id: 'g3', label: 'Decisiones que cuidan a mamá y bebé' },
        ],
        faqs: [
          {
            id: 'gest-f1',
            question: '¿Es seguro ir al dentista durante el embarazo?',
            answer:
              'En muchos casos sí, con valoración individual y prudencia clínica. Priorizamos lo necesario, explicamos cada paso y coordinamos con tu control prenatal cuando hace falta.',
          },
          {
            id: 'gest-f2',
            question: '¿Puedo hacerme radiografías si estoy embarazada?',
            answer:
              'Cuando son necesarias, se usan con criterios de protección y justificación clínica. Te explicamos el porqué antes de tomar cualquier imagen.',
          },
          {
            id: 'gest-f3',
            question: '¿El sangrado de encías es normal en el embarazo?',
            answer:
              'Es frecuente por cambios hormonales, pero conviene valorarlo. Una limpieza y orientación de higiene suelen ayudar; no lo ignores si persiste o molesta.',
          },
          {
            id: 'gest-f4',
            question:
              '¿En qué trimestre es mejor hacer tratamientos que no son urgentes?',
            answer:
              'El segundo trimestre suele ser el más cómodo para procedimientos no urgentes, pero cada caso se valora individualmente junto con tu control prenatal.',
          },
          {
            id: 'gest-f5',
            question: '¿Puedo recibir anestesia local estando embarazada?',
            answer:
              'Sí, cuando es necesaria se usa con protocolos seguros para el embarazo. Te explicamos el porqué antes de aplicar cualquier procedimiento — nunca se hace sin conversarlo contigo primero.',
          },
        ],
        seoTitle: 'Odontología para gestantes en Bogotá | Dra. Kimberly',
        seoDescription:
          'Odontología segura para gestantes en Bogotá. Atención tranquilizadora y criterio clínico en Perdomo con la Dra. Kimberly Martínez.',
        seoKeywords:
          'odontología gestantes Bogotá, dentista embarazo Perdomo, salud bucal embarazo, dra kimberly martinez',
      },
    ],
  },
  trust: {
    eyebrow: 'Nosotros',
    title: 'Cercanía y criterio en cada consulta',
    body:
      'La Dra. Kimberly Martínez acompaña a sus pacientes en Barrio Perdomo con una forma de atender sencilla y cercana: primero entender qué te preocupa, después explicar el plan con claridad. Más de 10 años de experiencia en odontología general, con un enfoque integral y seguimiento cercano.',
    imageUrl: IMG_TRUST,
    imageAlt:
      'Dra. Kimberly Martínez, odontóloga en consultorio de Barrio Perdomo, Bogotá',
    secondaryImageUrl: IMG_CLINIC,
    secondaryImageAlt:
      'Consultorio odontológico de la Dra. Kimberly Martínez en Barrio Perdomo, Bogotá',
    highlights: [
      {
        id: 'th1',
        label: 'Diagnóstico claro antes de tratar',
      },
      {
        id: 'th2',
        label: 'Plan explicado a tu ritmo, sin presión',
      },
      {
        id: 'th3',
        label: 'Odontología para gestantes con criterio',
      },
    ],
    ctaLabel: 'Conocer a la Dra. Kimberly',
    ctaHref: '/nosotros',
    credentials: [
      {
        id: 'exp',
        label: 'Experiencia',
        value: 'Más de 10 años',
      },
      {
        id: 'formacion',
        label: 'Formación',
        value: 'Odontóloga · Atención integral',
      },
      {
        id: 'enfoque',
        label: 'Enfoque',
        value: 'Diagnóstico primero, plan a tu ritmo',
      },
      {
        id: 'lugar',
        label: 'Consultorio',
        value: 'Barrio Perdomo, Bogotá',
      },
      {
        id: 'rethus',
        label: 'Tarjeta profesional / RETHUS',
        value: 'Pendiente de publicar (consultar en consultorio)',
      },
      {
        id: 'universidad',
        label: 'Universidad',
        value: 'Universidad (actualizar con formación real)',
      },
    ],
  },
  testimonials: {
    titleLineOne: 'Pacientes',
    titleLineTwo: 'felices.',
    titleLineThree: '#PacientesFelices',
    intro:
      'Voces de quienes ya dieron el paso. También puedes ver más historias en Instagram con #PacientesFelices.',
    hashtag: '#PacientesFelices',
    watermark: 'RESULTADOS',
    items: [
      {
        id: 't1',
        quote:
          'Me explicaron cada paso sin presión. Salí entendiendo el plan y con mucha más calma.',
        name: 'M.R.',
        detail: 'Ortodoncia',
        imageUrl: IMG_PACIENTE_1,
        imageAlt: 'Paciente #PacientesFelices — ortodoncia',
      },
      {
        id: 't2',
        quote:
          'El blanqueamiento se sintió controlado y natural. Me gustó que cuidaran el esmalte.',
        name: 'A.L.',
        detail: 'Blanqueamiento dental',
        imageUrl: IMG_PACIENTE_2,
        imageAlt: 'Paciente #PacientesFelices — blanqueamiento',
      },
      {
        id: 't3',
        quote:
          'Durante el embarazo me atendieron con mucha tranquilidad. Me sentí acompañada de verdad.',
        name: 'C.G.',
        detail: 'Odontología para gestantes',
        imageUrl: IMG_PACIENTE_3,
        imageAlt: 'Paciente #PacientesFelices — gestantes',
      },
      {
        id: 't4',
        quote:
          'Llegué con dolor y me explicaron opciones claras. Recuperé la confianza de masticar bien.',
        name: 'J.P.',
        detail: 'Endodoncia',
        imageUrl: IMG_PACIENTE_4,
        imageAlt: 'Paciente #PacientesFelices — endodoncia',
      },
    ],
  },
  visit: {
    title: 'Ubicación y horarios',
    intro:
      'Estamos en Barrio Perdomo. Agenda con anticipación para dedicarte el tiempo que tu caso merece.',
    address: ADDRESS,
    streetAddress: 'Calle 64A Sur #72-18 Local 1',
    addressLocality: 'Bogotá',
    addressRegion: 'Cundinamarca',
    postalCode: '111921',
    addressCountry: 'CO',
    latitude: 4.588,
    longitude: -74.1701,
    priceRange: '$$',
    hours:
      'Lunes a viernes: 10:00 a.m. – 6:30 p.m. · Sábados: 10:00 a.m. – 3:00 p.m.',
    openingHours: [
      {
        days: 'Monday,Tuesday,Wednesday,Thursday,Friday',
        opens: '10:00',
        closes: '18:30',
      },
      { days: 'Saturday', opens: '10:00', closes: '15:00' },
    ],
    phone: '',
    email: 'info@drakimberlymartinez.com',
    whatsapp: '',
    whatsappUrl: 'https://wa.me/message/SEK3UXCDLIJZJ1',
    mapEmbedUrl: `https://maps.google.com/maps?q=${MAP_QUERY}&t=&z=16&ie=UTF8&iwloc=&output=embed`,
    instagram: 'https://instagram.com/drakimberlymartinez',
    instagramHandle: '@drakimberlymartinez',
    facebook: '',
    googleReviewsUrl: GOOGLE_REVIEWS_URL,
  },
  finalCta: {
    title: '¿Tienes una duda antes de agendar?',
    body: 'Escríbenos por WhatsApp. Resolvemos preguntas con calma y, si tiene sentido, coordinamos tu valoración.',
    ctaLabel: 'Escribir por WhatsApp',
  },
  footer: {
    note: 'Consultorio en Barrio Perdomo, Bogotá · Atención con cita',
    privacyLabel: 'Privacidad',
    privacyHref: '/politica-de-privacidad',
    termsLabel: 'Términos',
    termsHref: '/terminos-y-condiciones',
  },
  blog: {
    title: 'Blog del consultorio',
    intro:
      'Artículos claros sobre salud bucal, gestación y tratamientos — sin alarmismo.',
    posts: [
      {
        id: 'b1',
        title: 'Cómo prepararte para tu primera valoración',
        slug: 'primera-valoracion',
        excerpt:
          'Qué llevar, qué preguntar y cómo llegar con más calma a tu primera cita.',
        body: 'La primera valoración no tiene que sentirse como un examen. Es un espacio para escucharte, revisar tu boca con calma y explicar qué opciones tienen sentido para ti.\n\nÚtil llevar una lista breve de molestias, medicamentos y preguntas. Si tienes radiografías recientes, puedes traerlas; si no, decidimos juntos si hacen falta.\n\nSaldrás con un panorama claro — sin presión para decidir en el momento. Si quieres agendar, escríbenos por WhatsApp y coordinamos un horario con anticipación.',
        coverUrl: IMG_CLINIC,
        status: 'draft',
        publishedAt: '',
        relatedServiceSlug: '',
        seoTitle: 'Primera valoración odontológica — Dra. Kimberly Martínez',
        seoDescription:
          'Guía para tu primera valoración en el consultorio de la Dra. Kimberly Martínez en Barrio Perdomo, Bogotá.',
      },
      {
        id: 'b2',
        title: 'Odontología en el embarazo: qué sí y qué esperar',
        slug: 'odontologia-embarazo',
        excerpt:
          'Criterio clínico y tranquilidad para cuidar tu boca durante la gestación.',
        body: 'Durante el embarazo es frecuente notar cambios en encías o sensibilidad. No todo requiere tratamiento urgente; lo importante es valorarlo con calma y sin alarmismo.\n\nEn la consulta priorizamos higiene, prevención y lo necesario para tu bienestar. Te explicamos cada paso y, cuando corresponde, alineamos la atención con tu control prenatal.\n\nSi estás gestando y tienes dudas, conoce más sobre odontología para gestantes en nuestra página de servicios. También puedes escribirnos por WhatsApp para agendar con tiempo.',
        coverUrl: IMG_GEST,
        status: 'draft',
        publishedAt: '',
        relatedServiceSlug: 'odontologia-gestantes',
        seoTitle: 'Odontología en el embarazo — Dra. Kimberly Martínez',
        seoDescription:
          'Cuidado dental durante el embarazo en Bogotá. Atención con criterio en Perdomo.',
      },
      {
        id: 'b3',
        title: 'Blanqueamiento: expectativas realistas',
        slug: 'blanqueamiento-expectativas',
        excerpt:
          'Qué cambia el tono, qué no, y por qué el control del esmalte importa.',
        body: 'El blanqueamiento puede aclarar el tono de los dientes naturales, pero el resultado depende del punto de partida, hábitos y el estado del esmalte. No todos los casos son candidatos.\n\nEn la valoración revisamos caries, sensibilidad y restauraciones. Buscamos un cambio natural y controlado — no un tono extremo ni promesas imposibles.\n\nSi te interesa este tratamiento, conoce más sobre blanqueamiento dental en nuestra página de servicios. Agenda por WhatsApp cuando quieras conversarlo con calma.',
        coverUrl: IMG_WHITE,
        status: 'published',
        publishedAt: '2026-08-01',
        relatedServiceSlug: 'blanqueamiento-dental',
        seoTitle: 'Blanqueamiento dental: expectativas — Dra. Kimberly',
        seoDescription:
          'Expectativas realistas del blanqueamiento dental en el consultorio de la Dra. Kimberly Martínez.',
      },
      {
        id: 'b4',
        title: 'Ortodoncia en adultos: sí es posible',
        slug: 'ortodoncia-adulto',
        excerpt:
          'Alinear o mejorar la mordida en la adultez, con un plan claro y realista.',
        body: 'La ortodoncia no es solo para adolescentes. Muchas personas adultas buscan mejorar alineación, mordida o comodidad al masticar, con un plan que encaje en su rutina.\n\nAntes de empezar revisamos salud de encías, objetivos y posibles opciones de aparatología. El tiempo varía según cada caso; te damos un rango honesto en la valoración.\n\nConoce más sobre ortodoncia en nuestra página de servicios. Si quieres dar el primer paso, escríbenos por WhatsApp y agendamos con anticipación.',
        coverUrl: IMG_ORTO,
        status: 'draft',
        publishedAt: '',
        relatedServiceSlug: 'ortodoncia',
        seoTitle: 'Ortodoncia en adultos — Dra. Kimberly Martínez | Bogotá',
        seoDescription:
          'Ortodoncia para adultos en Barrio Perdomo, Bogotá. Plan claro y seguimiento cercano.',
      },
      {
        id: 'b5',
        title: 'Brackets metálicos vs. estéticos: cómo elegir',
        slug: 'brackets-metalicos-vs-esteticos',
        excerpt:
          'Diferencias prácticas para decidir con información, no con presión.',
        body: 'Los brackets metálicos y los estéticos cumplen el mismo propósito de mover dientes; cambian materiales, visibilidad y, a veces, el cuidado diario.\n\nNo hay una opción “mejor” para todos. Depende de tu caso clínico, presupuesto y preferencias. En la consulta te mostramos pros y contras sin empujar una sola ruta.\n\nSi estás explorando ortodoncia, conoce más sobre este servicio en nuestra página. También puedes agendar por WhatsApp cuando quieras resolver dudas en persona.',
        coverUrl: IMG_ORTO,
        status: 'draft',
        publishedAt: '',
        relatedServiceSlug: 'ortodoncia',
        seoTitle: 'Brackets metálicos vs. estéticos — Dra. Kimberly Martínez',
        seoDescription:
          'Comparación clara de brackets metálicos y estéticos en el consultorio de Perdomo, Bogotá.',
      },
      {
        id: 'b6',
        title: 'Dolor de muela: cuándo conviene consultar',
        slug: 'dolor-de-muela',
        excerpt:
          'Señales para pedir cita sin alarmarte, y qué puedes hacer mientras tanto.',
        body: 'Un dolor de muela puede ir de una molestia leve a una sensibilidad intensa. No siempre significa extracción; a veces se trata de inflamación que se puede abordar a tiempo.\n\nSi el dolor interrumpe el sueño, aumenta con frío/calor o hay hinchazón, conviene una valoración pronto. Mientras tanto, evita automedicarte de más y no apliques calor externo sin orientación.\n\nEn muchos casos evaluamos si una endodoncia puede ayudar a conservar el diente. Conoce más sobre endodoncia en nuestra página de servicios o escríbenos por WhatsApp para agendar.',
        coverUrl: IMG_ENDO,
        status: 'draft',
        publishedAt: '',
        relatedServiceSlug: 'endodoncia',
        seoTitle: 'Dolor de muela: cuándo consultar — Dra. Kimberly Martínez',
        seoDescription:
          'Orientación calmada sobre el dolor de muela y cuándo pedir cita en Bogotá.',
      },
      {
        id: 'b7',
        title: 'Endodoncia: mitos que conviene aclarar',
        slug: 'endodoncia-mitos',
        excerpt:
          'Qué es realmente un tratamiento de conducto y qué no debes creer.',
        body: 'La endodoncia tiene mala fama por mitos: que “duele mucho” o que “es mejor sacar el diente”. Con anestesia adecuada y un plan claro, el objetivo es aliviar y, cuando es viable, conservar la pieza.\n\nCada caso es distinto. Valoramos radiografías, síntomas y el estado del diente antes de proponer el tratamiento. Si la extracción es más prudente, también te lo explicamos con honestidad.\n\nConoce más sobre endodoncia en nuestra página de servicios. Si llegas con molestia, puedes escribirnos por WhatsApp para coordinar una cita con calma.',
        coverUrl: IMG_ENDO,
        status: 'draft',
        publishedAt: '',
        relatedServiceSlug: 'endodoncia',
        seoTitle: 'Mitos de la endodoncia — Dra. Kimberly Martínez',
        seoDescription:
          'Aclaramos mitos comunes sobre el tratamiento de conducto en el consultorio de Perdomo.',
      },
      {
        id: 'b8',
        title: 'Prótesis flexible: comodidad y naturalidad',
        slug: 'protesis-flexible',
        excerpt:
          'Una opción removible pensada para el día a día, cuando encaja con tu caso.',
        body: 'La prótesis flexible busca mayor comodidad y discreción frente a bases rígidas tradicionales. No es la única solución, pero para muchas personas es una alternativa amable.\n\nEn la valoración revisamos tu anatomía, mordida y expectativas. Te explicamos qué se puede lograr y qué cuidados implica, sin promesas exageradas.\n\nConoce más sobre prótesis dental en nuestra página de servicios. Si quieres explorarlo, agenda por WhatsApp y conversamos sin prisa.',
        coverUrl: IMG_PROTESIS,
        status: 'draft',
        publishedAt: '',
        relatedServiceSlug: 'protesis-dental',
        seoTitle: 'Prótesis flexible en Bogotá — Dra. Kimberly Martínez',
        seoDescription:
          'Qué es la prótesis flexible y para quién puede tener sentido en Barrio Perdomo.',
      },
      {
        id: 'b9',
        title: 'Cómo cuidar tu prótesis en casa',
        slug: 'cuidar-protesis',
        excerpt:
          'Hábitos simples para higiene, comodidad y revisiones a tiempo.',
        body: 'Una prótesis bien cuidada se siente más cómoda y dura mejor. La higiene diaria del aparato y de tu boca es tan importante como el ajuste en consultorio.\n\nEvita productos abrasivos no recomendados y no improvises reparaciones en casa. Si duele, se mueve o lastima, pide un control: un ajuste oportuno suele marcar la diferencia.\n\nPara opciones de rehabilitación, conoce más sobre prótesis dental en nuestra página de servicios. También puedes escribirnos por WhatsApp para agendar una revisión.',
        coverUrl: IMG_PROTESIS,
        status: 'draft',
        publishedAt: '',
        relatedServiceSlug: 'protesis-dental',
        seoTitle: 'Cuidado de prótesis dental — Dra. Kimberly Martínez',
        seoDescription:
          'Consejos prácticos para cuidar tu prótesis en casa, con criterio clínico en Bogotá.',
      },
      {
        id: 'b10',
        title: 'Radiografías en el embarazo: cuándo y por qué',
        slug: 'radiografias-embarazo',
        excerpt:
          'Orientación tranquila sobre imágenes dentales durante la gestación.',
        body: 'Las radiografías dentales no se indican “por rutina” en el embarazo: se usan cuando aportan información útil para decidir un tratamiento necesario.\n\nSi hacen falta, explicamos el motivo y aplicamos medidas de protección. La decisión siempre es individual y con criterio clínico, no con miedo ni con prisas.\n\nSi estás embarazada y tienes dudas, conoce más sobre odontología para gestantes en nuestra página de servicios. Puedes agendar por WhatsApp cuando te sientas lista.',
        coverUrl: IMG_GEST,
        status: 'draft',
        publishedAt: '',
        relatedServiceSlug: 'odontologia-gestantes',
        seoTitle: 'Radiografías dentales en el embarazo — Dra. Kimberly',
        seoDescription:
          'Cuándo pueden ser necesarias las radiografías dentales en el embarazo, con enfoque calmado.',
      },
      {
        id: 'b11',
        title: 'Sangrado de encías en el embarazo',
        slug: 'sangrado-encias-embarazo',
        excerpt:
          'Por qué ocurre con frecuencia y cómo abordarlo sin alarmarte.',
        body: 'Los cambios hormonales del embarazo pueden hacer que las encías sangren con más facilidad al cepillarse. Es común, pero no debe ignorarse si persiste o molesta.\n\nUna valoración suave, orientación de higiene y, si corresponde, una limpieza profesional suelen ayudar. El objetivo es cuidarte con calma, no generar ansiedad.\n\nConoce más sobre odontología para gestantes en nuestra página de servicios. Si necesitas cita, escríbenos por WhatsApp y coordinamos un espacio.',
        coverUrl: IMG_GEST,
        status: 'draft',
        publishedAt: '',
        relatedServiceSlug: 'odontologia-gestantes',
        seoTitle: 'Sangrado de encías en el embarazo — Dra. Kimberly Martínez',
        seoDescription:
          'Orientación clara sobre el sangrado gingival en gestantes en el consultorio de Perdomo.',
      },
      {
        id: 'b12',
        title: 'Tu consultorio en Barrio Perdomo',
        slug: 'consultorio-perdomo',
        excerpt:
          'Dónde estamos, cómo llegar y qué esperar en tu visita.',
        body: 'Atendemos en Calle 64A Sur #72-18 Local 1, Barrio Perdomo, Bogotá. Es un espacio pensado para citas con tiempo: escucharte, explicar el plan y avanzar sin prisa.\n\nAgenda con anticipación, sobre todo si buscas un horario concreto. Los sábados trabajamos con cita previa en franja de mañana.\n\nSi quieres conocernos, escríbenos por WhatsApp. También puedes revisar ubicación y horarios en la sección de visita del sitio.',
        coverUrl: IMG_CLINIC,
        status: 'draft',
        publishedAt: '',
        relatedServiceSlug: '',
        seoTitle: 'Consultorio en Barrio Perdomo — Dra. Kimberly Martínez',
        seoDescription:
          'Ubicación y visita al consultorio odontológico en Barrio Perdomo, Bogotá.',
      },
      {
        id: 'b13',
        title: 'Rutina de higiene oral que sí se sostiene',
        slug: 'rutina-higiene-oral',
        excerpt:
          'Pasos simples para el día a día, sin listas imposibles.',
        body: 'Una buena higiene no necesita ser perfecta: necesita ser constante. Cepillado suave dos veces al día, hilo o interdentales y atención a las encías suelen marcar más diferencia que productos milagro.\n\nSi sangras o sientes sensibilidad, no dejes de cepillar: pide orientación. A veces un ajuste de técnica o una limpieza profesional basta para empezar mejor.\n\nCuando quieras una revisión personalizada, agenda por WhatsApp. En la valoración te dejamos indicaciones claras según tu boca, sin sermones.',
        coverUrl: IMG_CLINIC,
        status: 'draft',
        publishedAt: '',
        relatedServiceSlug: '',
        seoTitle: 'Rutina de higiene oral — Dra. Kimberly Martínez',
        seoDescription:
          'Consejos prácticos de higiene oral para el día a día, desde el consultorio en Perdomo.',
      },
      {
        id: 'b14',
        title: '¿Cada cuánto ir al odontólogo?',
        slug: 'cada-cuanto-odontologo',
        excerpt:
          'Una guía orientativa — tu caso puede necesitar otro ritmo.',
        body: 'Para muchas personas, una revisión periódica (por ejemplo cada seis meses) ayuda a detectar caries o inflamación a tiempo. Quienes tienen prótesis, ortodoncia activa o condiciones especiales pueden necesitar otro intervalo.\n\nNo hay una cifra mágica para todos. En la consulta te proponemos un ritmo realista según tu historia y tu higiene.\n\nSi hace tiempo no te revisas, escribe por WhatsApp y agendamos una valoración sin presión. El primer paso es simplemente saber cómo estás.',
        coverUrl: IMG_HERO,
        status: 'draft',
        publishedAt: '',
        relatedServiceSlug: '',
        seoTitle: '¿Cada cuánto ir al odontólogo? — Dra. Kimberly Martínez',
        seoDescription:
          'Orientación sobre la frecuencia de visitas al odontólogo en Bogotá.',
      },
    ],
  },
  about: {
    title: 'Dra. Kimberly Martínez',
    intro:
      'Odontóloga en Barrio Perdomo: atención cercana, diagnóstico claro y planes a tu ritmo.',
    bio: 'Soy Kimberly Martínez, odontóloga en Barrio Perdomo, Bogotá. Llevo más de 10 años acompañando pacientes que llegan con dudas, con ansiedad, o simplemente con ganas de entender qué les pasa antes de decidir un tratamiento. Mi forma de trabajar parte de una idea simple: primero escuchar, después explicar, y solo entonces proponer un plan — nunca al revés. Me especializo en atención integral, con un interés particular en la odontología para gestantes, un área donde la calma y el criterio clínico hacen toda la diferencia. Fuera de la silla dental, creo que la salud bucal no debería sentirse como un examen: por eso cada valoración empieza con una conversación, no con un diagnóstico apurado. Si tienes una duda antes de decidir, con gusto la resolvemos primero.',
    formation:
      'Odontóloga con más de 10 años de experiencia en atención integral, con actualización continua en odontología para gestantes.',
    credentialsNote:
      'Las credenciales profesionales (tarjeta / RETHUS) se confirman en el consultorio y se publicarán en el sitio apenas estén verificadas para publicación.',
    imageUrl: IMG_TRUST,
    imageAlt:
      'Dra. Kimberly Martínez, odontóloga en consultorio de Barrio Perdomo, Bogotá',
    rethus: 'A publicar',
    university: 'A confirmar',
    specialty: 'Odontología general · Odontología para gestantes',
  },
  reviews: {
    title: 'Opiniones de pacientes',
    intro:
      'Reseñas reales de pacientes de la Dra. Kimberly Martínez en Barrio Perdomo, Bogotá. Deja la tuya en Google.',
    googleUrl: GOOGLE_REVIEWS_URL,
    ctaLabel: 'Ver reseñas en Google',
  },
  clinicFaqs: {
    eyebrow: 'Dudas frecuentes',
    title: 'Preguntas del consultorio',
    items: [
      {
        id: 'clinic-f1',
        question: '¿Cómo agendo una cita?',
        answer:
          'Escríbenos por WhatsApp contándonos brevemente qué necesitas — así podemos sugerirte un horario que le dé el tiempo adecuado a tu caso.',
      },
      {
        id: 'clinic-f2',
        question: '¿Qué medios de pago aceptan?',
        answer:
          'Codensa, Sistecrédito, Welli, tarjetas Visa y Mastercard, y efectivo en el consultorio. Puedes ver el detalle de cada uno en la sección de medios de pago del sitio.',
      },
      {
        id: 'clinic-f3',
        question: '¿Atienden urgencias dentales?',
        answer:
          'Escríbenos por WhatsApp contándonos qué sientes — según la disponibilidad de agenda te decimos si podemos verte el mismo día o te damos la recomendación más prudente mientras tanto.',
      },
      {
        id: 'clinic-f4',
        question: '¿Cuánto dura la primera cita?',
        answer:
          'Una primera valoración suele tomar entre 30 y 45 minutos: tiempo suficiente para escucharte, revisar tu boca con calma y explicarte un plan sin apuros.',
      },
      {
        id: 'clinic-f5',
        question: '¿Atienden niños?',
        answer:
          'El consultorio está enfocado en atención a adultos y gestantes. Si tu consulta es sobre un niño, cuéntanos el caso por WhatsApp y te orientamos sobre la mejor opción.',
      },
      {
        id: 'clinic-f6',
        question: '¿Puedo cancelar o reprogramar mi cita?',
        answer:
          'Sí. Escríbenos por WhatsApp con la mayor anticipación posible y coordinamos un nuevo horario sin problema.',
      },
      {
        id: 'clinic-f7',
        question: '¿Trabajan con EPS o solo de forma particular?',
        answer:
          'La atención es particular. Si tienes dudas sobre algún convenio o cobertura específica, pregúntanos por WhatsApp antes de agendar.',
      },
      {
        id: 'clinic-f8',
        question: '¿Debo escribir por WhatsApp o puedo llamar?',
        answer:
          'Por ahora coordinamos todas las citas por WhatsApp. En cuanto el consultorio publique un número de teléfono directo, esta respuesta se actualiza.',
      },
    ],
  },
  modules: {
    items: [
      {
        id: 'mod-pay',
        key: 'paymentMarquee',
        label: 'Medios de pago',
        description: 'Carrusel bajo el hero con Codensa, tarjetas y efectivo.',
        enabled: true,
      },
      {
        id: 'mod-journey',
        key: 'journey',
        label: 'Recorrido',
        description: 'Sección “De la incertidumbre a la confianza informada”.',
        enabled: true,
      },
      {
        id: 'mod-services',
        key: 'services',
        label: 'Servicios',
        description: 'Grid de tratamientos con enlace a páginas SEO.',
        enabled: true,
      },
      {
        id: 'mod-marquee',
        key: 'servicesMarquee',
        label: 'Marquee de servicios',
        description: 'Franja azul con nombres de tratamientos.',
        enabled: true,
      },
      {
        id: 'mod-trust',
        key: 'trust',
        label: 'Nosotros',
        description: 'Bloque de cercanía y criterio con collage.',
        enabled: true,
      },
      {
        id: 'mod-patients',
        key: 'testimonials',
        label: '#PacientesFelices',
        description: 'Cards de pacientes / testimonios.',
        enabled: true,
      },
      {
        id: 'mod-clinic-faqs',
        key: 'clinicFaqs',
        label: 'Preguntas del consultorio',
        description: 'FAQ general de agenda, pagos y atención en home.',
        enabled: true,
      },
      {
        id: 'mod-visit',
        key: 'visit',
        label: 'Ubicación',
        description: 'Dirección, horarios y mapa.',
        enabled: true,
      },
      {
        id: 'mod-cta',
        key: 'finalCta',
        label: 'CTA final',
        description: 'Bloque oscuro de WhatsApp al cierre.',
        enabled: true,
      },
    ],
  },
  analytics: {
    googleAnalyticsId: '',
    googleTagManagerId: '',
    notes: 'Pega aquí el ID de medición (G-XXXXXXXX) o el contenedor GTM (GTM-XXXX).',
  },
}
