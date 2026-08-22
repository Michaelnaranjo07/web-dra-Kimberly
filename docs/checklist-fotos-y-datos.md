# Checklist — fotos y datos pendientes

**Dra. Kimberly Martínez** · Odontología, Barrio Perdomo, Bogotá  
Documento para entregar a la Dra. / fotógrafo / quien complete el contenido real del sitio.

---

## 1. Fotos (prioridad alta)

Tamaños = recomendación de exportación. El sitio recorta con CSS; mejor sobrar resolución que faltar.

| # | Sección | Qué mostrar | Ratio / tamaño sugerido | Notas |
|---|---|---|---|---|
| 1 | **Hero (inicio)** | Consultorio o escena clínica real | **16:9 o 3:2** · ideal **2400×1600** px (mín. 1920×1280) · JPG | Ocupa casi toda la pantalla |
| 2 | **Nosotros (home)** | Retrato profesional de la Dra. Kimberly | **4:5** · ideal **1200×1500** px · JPG | Foto principal del collage |
| 3 | **Nosotros (home)** | Detalle del consultorio / sillón | **1:1** · ideal **1000×1000** px · JPG | Foto pequeña superpuesta |
| 4 | **Servicios — Ortodoncia** | Escena o detalle del tratamiento | **4:3** · ideal **1600×1200** px · JPG | También aparece en megamenú y ficha |
| 5 | **Servicios — Blanqueamiento** | Idem | **4:3** · **1600×1200** · JPG | |
| 6 | **Servicios — Prótesis** | Idem | **4:3** · **1600×1200** · JPG | |
| 7 | **Servicios — Endodoncia** | Idem | **4:3** · **1600×1200** · JPG | |
| 8 | **Servicios — Odontología gestantes** | Idem (cuidado: tono respetuoso) | **4:3** · **1600×1200** · JPG | Diferenciador del consultorio |
| 9–12 | **#PacientesFelices** (×4) | Pacientes reales | **4:3** · **1200×900** · JPG | **Solo con consentimiento informado firmado** |
| 13 | **Blog — portadas** | Una por artículo (hoy hay varias; al menos la publicada) | **16:10** · **1600×1000** · JPG | |
| 14 | **Vista previa en redes (OG)** | Imagen al compartir el link (WhatsApp, IG, FB) | **1200×630** · JPG | Hoy usa el logo; mejor foto o arte con marca |

### Formato y entrega

- JPG o WebP, color sRGB, **sin texto** encima de la foto.
- Preferible odontóloga / consultorio reales (no stock genérico a largo plazo).
- Carpeta sugerida en el proyecto: `public/images/`  
  Nombres sugeridos:
  - `hero-consultorio.jpg`
  - `dra-kimberly.jpg`
  - `consultorio-detalle.jpg`
  - `servicio-ortodoncia.jpg`
  - `servicio-blanqueamiento.jpg`
  - `servicio-protesis.jpg`
  - `servicio-endodoncia.jpg`
  - `servicio-gestantes.jpg`
  - `paciente-01.jpg` … `paciente-04.jpg`
  - `og-share.jpg`
  - `blog/…` para portadas

### Ya listo (no hace falta rehacer)

- Logo con texto y logo sin texto (`public/logo-dra-kimberly.*`, `public/logo-sin-texto.png`)
- Logos de medios de pago (`public/payments/`)

---

## 2. Datos del consultorio

| Dato | Estado actual | Para qué sirve |
|---|---|---|
| **Teléfono** | Vacío | Contacto en el sitio + Google / schema SEO |
| **Correo** | Vacío | Privacidad, contacto, habeas data |
| **Número de WhatsApp** | El link de chat existe; falta el número en el campo NAP | Consistencia con Google y el sitio |
| **Facebook** (opcional) | Vacío | Redes en schema / footer |
| **RETHUS / tarjeta profesional** | “A publicar” | Credibilidad (E-E-A-T) en Nosotros |
| **Universidad / formación** | “A confirmar” | Página Nosotros |
| **Link oficial de Google Business / reseñas** | Genérico por dirección | Página Opiniones + botón de reseñas |
| **Horario de atención** | Ya hay un texto; **confirmar** si es exacto | Visita + schema de horarios |

---

## 3. Marketing e infraestructura (fuera de fotos)

| Ítem | Quién / dónde |
|---|---|
| **Google Analytics 4** (`G-…`) y/o **Tag Manager** (`GTM-…`) | Admin del sitio → Analytics |
| **Perfil de Negocio de Google** | Crear o verificar con el **mismo** nombre, dirección y teléfono del sitio |
| **Variables en Vercel** | `VITE_SITE_URL`, claves de Supabase |
| **Usuario admin (Supabase Auth)** | Acceso a `/admin` |
| **Consentimiento de pacientes** | Obligatorio si se publican fotos reales en testimonios |

---

## 4. Orden sugerido de entrega

1. Retrato de la Dra. + foto hero del consultorio  
2. Cinco fotos de tratamientos  
3. Teléfono, correo, RETHUS / universidad  
4. Link real de Google Business  
5. Fotos de pacientes (con permiso) + portadas de blog  
6. Imagen OG 1200×630 + IDs de Analytics  

---

## 5. Contacto técnico

Cuando tengas los archivos y datos, se cargan en el sitio (admin o `src/content/defaults.ts`) y se reemplazan las fotos de stock actuales de Unsplash.
