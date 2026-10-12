# Pixials News — Versión Angular

Portal de noticias de tecnología desarrollado como proyecto del módulo de **Desarrollo Front-end** (Politécnico Grancolombiano). Permite explorar noticias, ver su detalle, guardarlas en favoritos, gestionarlas (crear y eliminar) y escribir a la redacción mediante un formulario con validaciones.

- **Aplicación desplegada:** https://pixials-news.netlify.app/
- **Repositorio del mockup inicial (HTML/CSS/JS):** https://github.com/DanielaM1293/Pixials-News

## Funcionalidades

| Vista | Ruta | Qué hace |
|---|---|---|
| Inicio | `/` | Hero con carrusel de noticias destacadas, tendencias recientes y llamado a la acción |
| Listado | `/listado` | Catálogo en tarjetas, filtro por categoría, buscador y panel para crear/eliminar noticias. `?filtro=favoritos` muestra solo favoritas |
| Detalle | `/detalle/:id` | Noticia completa, botón de favoritos y noticias relacionadas |
| Contacto | `/contacto` | Formulario con validaciones (campos obligatorios, correo válido) y mensaje de confirmación |

## Tecnologías

- Angular (componentes standalone, enrutador, *signals*, formularios con `ngModel`)
- Tailwind CSS
- `localStorage` para persistir noticias y favoritos
- Despliegue en Netlify

## Estructura del proyecto

```
src/app/
├── pages/
│   ├── home/        # Inicio y carrusel
│   ├── listado/     # Catálogo, filtros y mini CRUD
│   ├── detalle/     # Detalle de noticia
│   └── contacto/    # Formulario de contacto
├── shared/
│   ├── header/      # Menú de navegación y contador de favoritos
│   ├── footer/      # Pie de página
│   └── dialog/      # Modales de confirmación y aviso
├── services/
│   ├── noticias.ts  # Datos, favoritos y CRUD (signals + localStorage)
│   └── dialog.ts    # Estado de los modales
├── app.routes.ts    # Definición de rutas
└── app.config.ts    # Configuración de la aplicación
public/
└── _redirects       # Redirección a index.html para las rutas de Angular en Netlify
```

## Cómo ejecutarlo en local

Requisitos: Node.js y npm.

```bash
npm install
npm start
```

Abre http://localhost:4200/ en el navegador.

Para generar la versión de producción:

```bash
npm run build
```

## Despliegue

El sitio se publica en Netlify conectado a este repositorio:

- Comando de build: `npm run build`
- Carpeta de publicación: `dist/pixials-news-angular/browser`

El archivo `public/_redirects` evita errores 404 al recargar rutas internas como `/detalle/3`.

## Autora

Estefany Daniela Martínez Niño — Módulo Front-end, tutor John Olarte Ramos.
