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

## Publicarla en GitHub Pages

Cada push a `main` la publica con `.github/workflows/pages.yml`. Hace falta activarlo una vez:

1. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. GitHub Pages en un repo **privado** solo funciona con GitHub Pro (o Team). Con el plan
   gratuito, el repo tiene que ser público (**Settings → General → Danger Zone → Change
   visibility**). La web publicada es pública en los dos casos.
3. Si el primer despliegue falló porque Pages no estaba activado, en **Actions → Publicar en
   GitHub Pages → Run workflow** se vuelve a lanzar.

Sin dominio propio queda en `https://catunlock.github.io/impoluto-landing/` (el workflow le
pone ese prefijo a todas las rutas). Para servirla en **impoluto.app**:

1. **Settings → Pages → Custom domain**: `impoluto.app`, y marca **Enforce HTTPS** cuando
   lo permita (los dominios `.app` solo funcionan con HTTPS).
2. En el registrador, para la raíz (`@`), cuatro registros `A`: `185.199.108.153`,
   `185.199.109.153`, `185.199.110.153` y `185.199.111.153` (y, si quieres IPv6, `AAAA`
   `2606:50c0:8000::153`, `…8001::153`, `…8002::153` y `…8003::153`). Para `www`, un `CNAME`
   a `catunlock.github.io`.
3. Vuelve a lanzar el workflow para que las rutas y las URL canónicas pasen a impoluto.app.

## O en Vercel

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

Los botones «Create your home» / «Crear mi casa» llevan a la app publicada,
`https://impoluto-sepia.vercel.app` (`appUrl` en `site.config.js`, el mismo dominio que
`brand.json` en el repo de la app). Para pasarla a `app.impoluto.app`, en el proyecto de Vercel de la **app**
(no en este) añade el dominio `app.impoluto.app` y en el DNS un `CNAME` de `app` a
`cname.vercel-dns.com`. Si la app va en otra dirección, cambia `appUrl` y vuelve a publicar.
