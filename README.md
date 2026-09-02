# Gtnn — Portafolio

Portafolio personal de Gtnn: desarrollador de software enfocado en seguridad, plugins y herramientas para comunidades digitales. Creador de NexCord y Vertex.

Created by Gtnn12.

## Rutas

- `/` — Portafolio
- `/plugins` — Catálogo de plugins de NexCord
- `/vertex` — Vertex, alternativa gratuita a Discord y TeamSpeak

## Stack

- TanStack Start
- TanStack Router
- React 19
- TypeScript
- Tailwind CSS
- Vite

## Desarrollo local

Requiere [Bun](https://bun.sh).

```sh
bun install
bun run dev
```

## Build estático (GitHub Pages)

```sh
bun run build:static
```

El resultado se genera en `dist/client` con `index.html` en la raíz. El workflow `.github/workflows/deploy-pages.yml` compila y publica el sitio automáticamente en cada push a `main`.