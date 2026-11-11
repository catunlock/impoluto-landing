# Impoluto · landing

La web pública de Impoluto, para servir en **impoluto.app**. La app está en
[catunlock/impoluto](https://github.com/catunlock/impoluto).

- Inglés en `/` y español en `/es/` (con `hreflang`, sitemap y una barra discreta que ofrece el
  otro idioma según el navegador; nunca redirige sola).
- HTML y CSS estáticos, sin frameworks ni dependencias. Sin cookies ni analítica. La fuente
  (Inter) va servida desde aquí, no desde Google Fonts.
- Las capturas son de la app de verdad con una casa de ejemplo («Casa del Parque», con Lucía,
  Marc y Sara), generada con el plano tipo de 3 dormitorios y 2 baños y «Amueblar
  automáticamente».

## Estructura

| Archivo | Qué es |
| --- | --- |
| `src/i18n/en.js`, `src/i18n/es.js` | Todos los textos. Mismas claves en los dos. Para otro idioma, copia uno y cambia `lang`, `locale` y `path`. |
| `build.mjs` | Genera `dist/`: una página por idioma, `sitemap.xml` y `robots.txt`. |
| `site.config.js` | La URL de la web (`siteUrl`) y la de la app (`appUrl`, adonde van los botones). |
| `src/styles.css`, `src/main.js` | Estilos y el poco JavaScript que hay (barra de idioma y la línea bajo la cabecera). |
| `public/` | Imágenes, iconos, fuentes y `og.png` (la imagen al compartir el enlace). |
| `scripts/og.html` | Plantilla de `og.png`: se abre a 1200×630 y se hace una captura. |

## Probarla

```bash
npm run dev      # construye y sirve dist/ en http://localhost:3000
npm run build    # solo construye
```

Necesita Node 20 o más.

## Publicarla en Vercel

1. En Vercel, **Add New → Project** e importa `catunlock/impoluto-landing`. No hay que tocar
   nada: `vercel.json` ya dice que se construye con `node build.mjs` y se sirve `dist/`.
2. En el proyecto, **Settings → Domains**, añade `impoluto.app` y `www.impoluto.app` (que
   redirija a `impoluto.app`).
3. En el registrador del dominio, pon los registros DNS que te enseña Vercel en esa pantalla.
   Suelen ser:
   - `A` para `@` (la raíz) → la IP que indique Vercel (hasta ahora `76.76.21.21`).
   - `CNAME` para `www` → `cname.vercel-dns.com`.
4. Vercel saca el certificado HTTPS solo. Los dominios `.app` solo funcionan con HTTPS, así
   que hasta que el certificado esté listo el navegador no abrirá la web.

## La app en app.impoluto.app

Los botones «Create your home» / «Crear mi casa» llevan a `https://app.impoluto.app`
(`appUrl` en `site.config.js`). Para que funcionen, en el proyecto de Vercel de la **app**
(no en este) añade el dominio `app.impoluto.app` y en el DNS un `CNAME` de `app` a
`cname.vercel-dns.com`. Si la app va en otra dirección, cambia `appUrl` y vuelve a publicar.
