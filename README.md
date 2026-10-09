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

## Introduction

Le **UI Kit du Lab. ANSSI** est une bibliothèque de composants **Svelte**, pensée pour accélérer la création d’interfaces cohérentes et accessibles au sein des divers [produits du **Lab ANSSI**](https://beta.gouv.fr/incubateurs/lab-innov-anssi.html).

Cette bibliothèque propose à la fois des composants **Svelte** et leurs équivalents **WebComponents**, facilitant leur intégration dans différents environnements front-end.

Le projet s’appuie sur des outils modernes tels que **Svelte**, **Vite**, **Storybook** et **Vitest** pour garantir une expérience de développement fluide, des tests robustes et une documentation interactive.

## Pour commencer

### Prérequis

- **Node.js** _(version recommandée : >= 24.21.0)_
- **Svelte** _(version recommandée : >= 5.57.0)_
- **Vite** _(version recommandée : >= 8.3.0)_
- **Storybook** _(version recommandée : >= 10.6.1)_
- **pnpm** en version 11+

### Développement en local

Clonez le dépôt puis installez les dépendances :

```bash
git clone https://github.com/betagouv/lab-anssi-ui-kit.git
cd lab-anssi-ui-kit
pnpm install
```

### Documentation interactive

**Storybook** est intégré à ce dépôt afin de fournir des exemples d’utilisation, la liste des props et des cas d’usage pour chaque composant.<br/>
Les stories sont regroupées dans le dossier `stories/` et sont écrites en respectant [le format CSF](https://storybook.js.org/docs/writing-stories#component-story-format) de Storybook.

Pour explorer et tester les composants en local, lancez **Storybook** à l'aide de la commande :

```bash
pnpm run storybook:dev
```

Suite à l'exécution de cette commande, Storybook se lancera automatiquement en ouvrant une fenêtre de votre navigateur par défaut vers l'url [http://localhost:6006](http://localhost:6006).

> [!NOTE]
> Le **Storybook** de ce projet est également déployé en ligne sur **GitHub Pages** et est consultable à l'url suivante : [https://betagouv.github.io/lab-anssi-ui-kit/](https://betagouv.github.io/lab-anssi-ui-kit/)

## Usage

L’intégralité des composants présents dans ce dépôt sont publiés sur NPM afin qu’ils puissent être consommés dans différents environnements front-end.

La bibliothèque propose **deux modes de distribution** :

| Mode                  | Format                     | Dossier                          | Cas d’usage                                         |
| --------------------- | -------------------------- | -------------------------------- | --------------------------------------------------- |
| **Composants Svelte** | ES modules (tree-shakable) | `dist/composants` et `dist/dsfr` | Projets Svelte 5                                    |
| **WebComponents**     | Bundle IIFE                | `dist/webcomponents/`            | Tout projet HTML/JS (React, Vue, Angular, vanilla…) |

Le dossier `dist/` est construit à l’aide de la commande `pnpm run build`.

### Composants Svelte

#### Installation

```bash
pnpm add -D @lab-anssi/ui-kit@latest
```

> [!IMPORTANT]
> Le package déclare `svelte` (>= 5.57.0) en `peerDependencies`. Assurez-vous que votre projet utilise une version compatible.

#### Import

Les composants sont importables directement depuis le point d’entrée du package :

```ts
import { Alerte, CentreAide, ResumePssi } from "@lab-anssi/ui-kit";
```

Ils sont compilés par [`@sveltejs/package`](https://svelte.dev/docs/kit/packaging) et bénéficient du tree-shaking : seuls les composants importés sont inclus dans votre bundle final.

#### Exemple

```svelte
<script>
  import { Alerte } from "@lab-anssi/ui-kit";
</script>

<Alerte type="info" titre="Information">Ceci est une alerte informative.</Alerte>
```

### WebComponents

Les **WebComponents** sont disponibles sous forme de bundle IIFE dans `dist/webcomponents/` et peuvent être intégrés dans n’importe quel projet HTML/JS.

L’utilisation des **WebComponents** dans un projet, nécessite deux ressources :

1. **La feuille de styles des variables DSFR** (`dsfr-variables.css`) — fournit les variables CSS nécessaires au rendu des composants
2. **Le script de la librairie** (`lab-anssi-ui-kit.iife.js`) — enregistre les **WebComponents**

#### Via le CDN

```html
<!-- Variables CSS du DSFR -->
<link
  href="https://lab-anssi-ui-kit-prod-s3-assets.cellar-c2.services.clever-cloud.com/{version}/dsfr-variables.css"
  rel="stylesheet"
  nonce="{nonce}"
/>

<!-- Script de la librairie -->
<script
  src="https://lab-anssi-ui-kit-prod-s3-assets.cellar-c2.services.clever-cloud.com/{version}/lab-anssi-ui-kit.iife.js"
  defer
  nonce="{nonce}"
></script>
```

#### Via le package NPM

```html
<link
  href="node_modules/@lab-anssi/ui-kit/dist/assets/dsfr-variables.css"
  rel="stylesheet"
  nonce="{nonce}"
/>
<script
  src="node_modules/@lab-anssi/ui-kit/dist/webcomponents/lab-anssi-ui-kit.iife.js"
  nonce="{nonce}"
></script>
```

> [!NOTE]
> Sans la feuille de styles `dsfr-variables.css`, les composants s’afficheront sans les couleurs et espacements du DSFR.

> [!IMPORTANT]
> L’attribut `nonce` est nécessaire pour que la feuille de styles et le script soient autorisés par la [Content Security Policy (CSP)](https://developer.mozilla.org/fr/docs/Web/HTTP/CSP) de votre application. Sa valeur doit correspondre au nonce généré par votre serveur et déclaré dans l’en-tête HTTP `Content-Security-Policy`.

#### Exemple

Une fois ces ressources chargées, les WebComponents sont prêts à être utilisés :

```html
<lab-anssi-centre-aide nom-service="MonService" liens="[...]"></lab-anssi-centre-aide>
```

## Release

- Mettre à jour le `package.json` avec la nouvelle version
- Faire un commit et une PR `[VERSION] Passe à la version X.X.X`
- Valider la PR puis la merger
- Dans `GitHub > Release` cliquer sur le bouton `Draft a new release`
- Dans le formulaire `New release` :
  - Dérouler la liste puis cliquer sur `Create new tag`
  - Nommer le tag `vX.X.X`
  - La target reste `main`
  - Release title : `vX.X.X`
  - Release notes : utiliser le template ci-dessous :

    ```markdown
    # :package: Nouveaux Composants

    - **DSFR** - Ajoute le composant `<COMPOSANT>` – [#<ID_PR>](LIEN_PR)
    - **LAB** - Ajoute le composant `<COMPOSANT>` – [#<ID_PR>](LIEN_PR)

    # 🐞 Corrections et améliorations

    - **DSFR <NOM_COMPOSANT>** - <DESCRIPTION> – [#<ID_PR>](LIEN_PR)
    - **LAB <NOM_COMPOSANT>** - <DESCRIPTION> – [#<ID_PR>](LIEN_PR)
    ```

  - Cliquer sur `Publish release`, l'action `Publication du package sur NPM` se lance sur la version `vX.X.X` automatiquement.
