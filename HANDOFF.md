# Guía de traspaso — golf-in-mexico.com

Este documento es para Pablo o para el próximo desarrollador que contrate.
Explica cómo funciona el sitio, cómo se publica, y qué queda pendiente.

## 1. Qué es este repo

Este repo es el código del sitio **golf-in-mexico.com**. Es una app en
React (Create React App + craco), y se sirve en Vercel. Todo el código
vive dentro de la carpeta `frontend/`.

## 2. Cómo se publica

La rama `main` está protegida en GitHub. Esto significa:

- No se puede subir código directo a `main`. Todo cambio entra por un
  **Pull Request (PR)**.
- Cuando un PR se aprueba y se hace merge a `main`, Vercel despliega
  automáticamente a producción. **Merge a main = el sitio cambia en vivo.**

**Advertencia clara:** no edites archivos directo en GitHub sobre `main`
si no entiendes bien el proceso de build (ver sección 3). Un cambio mal
hecho puede tumbar el build o dejar páginas fuera del sitemap.

## 3. El pipeline de build (LO MÁS DELICADO)

El comando `yarn build` corre tres pasos en orden:

1. `generate:seo` — genera archivos para buscadores/IA (llms.txt, sitemap).
2. `craco build` — compila la app de React normal.
3. `prerender` — abre un Chromium sin pantalla (headless) y renderiza las
   25 rutas del sitio (las que están en `build/sitemap.xml`) a HTML
   estático, para que Google y las IAs puedan leer el contenido.

**Si el prerender termina con menos de 25/25 rutas, algo se rompió.**
Eso significa que Google va a dejar de ver esas páginas. Siempre hay
que revisar el resultado del build antes de confiar en un deploy.

Si agregas una página nueva, tienes que registrarla en
`frontend/scripts/generate-llms.mjs` para que entre al sitemap. Si no,
la página existe pero es invisible para buscadores e IA.

## 4. Integraciones y dónde viven

**HubSpot** — portal `51554591`. Todos los formularios del sitio postean
a través de `frontend/src/config/hubspot.js` (ahí están mapeados los GUIDs
de cada formulario). Las propiedades de contacto `trip_focus` y
`unique_cities` se agregaron el 2026-09-03 y ya están verificadas y
funcionando. El manual completo está en `docs/hubspot-integration.md`.

**Advertencia importante:** nunca actives CAPTCHA en los formularios de
HubSpot. El sitio envía los formularios por API (no por el iframe de
HubSpot), y un CAPTCHA rechazaría el 100% de los envíos.

**Analytics** — GA4, Meta Pixel y Clarity viven como variables de entorno
en Vercel. Esas variables viajan junto con el proyecto al transferirlo.
El tag de Google Ads **no está instalado** — es un pendiente (ver sección 6).

**Calendly** — el botón "book a call" del Trip Builder apunta a
`calendly.com/pablo-golf-in-mexico/trip-builder`.

**Dominio** — `golf-in-mexico.com` está registrado a nombre de Pablo. El
DNS ya apunta a Vercel.

## 5. Después del traspaso de Vercel (2 clicks)

Cuando el proyecto de Vercel se transfiera a la cuenta de Pablo, hay que
reconectar el repo de Git:

- Vercel → Settings del proyecto → Git → conectar el repo de GitHub
  transferido.
- El primer push después de conectar dispara el primer deploy.

## 6. Pendientes conocidos (punch list)

- [ ] **Google Ads**: instalar su tag (o, mejor, vincular Google Ads con
      GA4 e importar las conversiones desde ahí — es lo recomendado). La
      conversión de "page view" que se probó el 2 de septiembre no se
      detectó porque el tag nunca se instaló.
- [ ] **GA4**: marcar `book_call_click` y `trip_builder_complete` como
      conversiones (key events).
- [ ] **Videos de Cancún y Puerto Vallarta**: los espacios para el video
      ya existen en esas landing pages. Se activan solos en cuanto se
      pone el ID de YouTube en `frontend/src/data/packagePages.js`, campo
      `filmVideoId` (Los Cabos y Punta Mita ya lo tienen puesto).
- [ ] **Feedback del documento del 2 de septiembre, sin construir todavía**:
  1. La tarjeta de región "Puerto Vallarta & Riviera Nayarit" → renombrar
     a "Punta Mita & Nayarit" y apuntarla a la página de Punta Mita.
  2. Poner fotos reales en las tarjetas Luxury Stay / Golf Every Day /
     Golf & Beach (hoy son gradientes de color, no fotos).
  3. Hay una sección por quitar del sitio (todavía no identificada cuál).
  4. Los botones "Claim Preferred Rates" (6 por página en las landing
     pages de Cancún, Los Cabos y Puerto Vallarta) hoy abren una pestaña
     nueva con un link externo — cambiarlos a links internos.
- [ ] La página **Contact** todavía usa un link de Google Calendar
      distinto — falta cambiarlo a Calendly.
- [ ] La página **/experience** ya no tiene entrada desde el menú (el CTA
      principal ahora va directo a /golf-packages). Decidir si se
      elimina la página o se deja sin acceso.

## 7. Comandos básicos

```bash
git clone <url-del-repo>
cd golf-in-mexico-v2/frontend
yarn
yarn start          # correr local
yarn build          # build de producción — verificar que diga 25/25 rutas
```
