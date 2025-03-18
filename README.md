# UI Kit du Lab. ANSSI

## Architecture de build
Cette librairie a pour objectif de produire des composants Svelte et leurs équivalents [Webcomponent](https://developer.mozilla.org/en-US/docs/Web/API/Web_components).

L'architecture pour produire du Svelte utilise [SvelteKit](https://svelte.dev/docs/kit/packaging), configuré via le wizard `npx sv create`.
C'est ce qui explique les nombreux fichiers de configuration Svelte (Prettier, Vitest, etc...) : Ils ont été rajoutés par le wizard.

Pour rajouter le build des Webcomponents, on rajoute manuellement un fichier de configuration [`vite.webcomponents.config.ts`](./vite.webcomponents.config.ts). et des appels à la commande `vite -c vite.webcomponents.config.ts build` lors des étapes de build du package.

Résultat : dans le repertoire `dist/` on retrouvera les composants Svelte et leurs équivalents Webcomponents. Tous le contenu de `dist/` est publié via `npm publish`.
