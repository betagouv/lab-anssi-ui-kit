# UI Kit du Lab. ANSSI

![Version Typescript](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fbetagouv%2Flab-anssi-ui-kit%2Frefs%2Fheads%2Fmain%2Fpackage.json&query=%24.devDependencies.typescript&logo=typescript&label=Typescript&color=%232d79c7)
![Version Svelte](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fbetagouv%2Flab-anssi-ui-kit%2Frefs%2Fheads%2Fmain%2Fpackage.json&query=%24.devDependencies.svelte&logo=svelte&label=Svelte&color=%23ff3e00)
![Version Vite](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fbetagouv%2Flab-anssi-ui-kit%2Frefs%2Fheads%2Fmain%2Fpackage.json&query=%24.devDependencies.vite&logo=vite&label=Vite&color=%23ffd528&logoColor=%23ffd528)
![Version Vitest](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fbetagouv%2Flab-anssi-ui-kit%2Frefs%2Fheads%2Fmain%2Fpackage.json&query=%24.devDependencies.vitest&logo=vitest&label=Vitest&color=%23709b1b)

![État Build](https://img.shields.io/github/actions/workflow/status/betagouv/lab-anssi-ui-kit/integration-continue.yml?label=Int%C3%A9gration%20continue&logo=github)
![État Déploiement Storybook](https://img.shields.io/github/actions/workflow/status/betagouv/lab-anssi-ui-kit/publication-storybook.yml?label=D%C3%A9ploiement%20Storybook&logo=github)

![État Déploiement NPM](https://img.shields.io/github/actions/workflow/status/betagouv/lab-anssi-ui-kit/publication-npm.yml?label=D%C3%A9ploiement%20NPM&logo=github)
![Version NPM](https://img.shields.io/npm/v/%40lab-anssi%2Fui-kit?style=flat&label=Version%20package&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40lab-anssi%2Fui-kit)

---

## Storybook des composants

Le storybook des composants est disponible [ici](https://betagouv.github.io/lab-anssi-ui-kit/).

Il est construit avec [Histoire](https://histoire.dev/)

## Architecture de build
Cette librairie a pour objectif de produire des composants Svelte et leurs équivalents [Webcomponent](https://developer.mozilla.org/en-US/docs/Web/API/Web_components).

L'architecture pour produire du Svelte utilise [SvelteKit](https://svelte.dev/docs/kit/packaging), configuré via le wizard `npx sv create`.
C'est ce qui explique les nombreux fichiers de configuration Svelte (Prettier, Vitest, etc...) : Ils ont été rajoutés par le wizard.

Pour rajouter le build des Webcomponents, on rajoute manuellement un fichier de configuration [`vite.webcomponents.config.ts`](./vite.webcomponents.config.ts). et des appels à la commande `vite -c vite.webcomponents.config.ts build` lors des étapes de build du package.

Résultat : dans le repertoire `dist/` on retrouvera les composants Svelte et leurs équivalents Webcomponents. Tous le contenu de `dist/` est publié via `npm publish`.
