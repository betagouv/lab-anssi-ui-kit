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

Le projet s’appuie sur des outils modernes tels que SvelteKit, Vite, Storybook et Vitest pour garantir une expérience de développement fluide, des tests robustes et une documentation interactive.

## Pour commencer

### Prérequis

- Node.js (version recommandée : >= 24)
- Svelte (version recommandée : >= 5.37.3)
- Vite (version recommandée : >= 7.0.6)
- Storybook (version recommandée : >= 9.1.1)
- pnpm (voir la version exacte spécifiée dans le `package.json`)

### Développement en local

Clonez le dépôt puis installez les dépendances :

```bash
git clone https://github.com/betagouv/lab-anssi-ui-kit.git
cd lab-anssi-ui-kit
pnpm install
```

### Documentation interactive

Storybook est intégré à ce dépôt afin de fournir des exemples d’utilisation, la liste des props et des cas d’usage pour chaque composant.<br/>
Les stories sont regroupées dans le dossier `stories/` et sont écrites en respectant [le format CSF](https://storybook.js.org/docs/writing-stories#component-story-format) de Storybook.

Pour explorer et tester les composants en local, lancez Storybook à l'aide de la commande :

```bash
pnpm run storybook:dev
```

Suite à l'exécution de cette commande, Storybook se lancera automatiquement en ouvrant une fenêtre de votre navigateur par défaut vers l'url [http://localhost:6006](http://localhost:6006).

> [!NOTE]
> Le Storybook est également déployé en ligne sur GitHub Pages et est consultable à l'url suivante : [https://betagouv.github.io/lab-anssi-ui-kit/](https://betagouv.github.io/lab-anssi-ui-kit/)

## Usage

L'intégralité des composants présents dans ce dépôts sont publiés sur NPM afin qu'ils puissent être consommés dans différents environnements front-end.<br/>
La bibliothèque expose ses composants dans un dossier `dist/` qui est construit à l'aide de la commande `pnpm run build`.

Ainsi, pour pouvoir consommer les éléments de cette librairie dans votre projet, vous devrez commencer par installer le package à l'aide de cette commande :

```bash
pnpm add -D @lab-anssi/ui-kit@latest
```

Vous pouvez ensuite importer les composants dans vos projets **Svelte** ou utiliser les **WebComponents** générés dans n’importe quelle application web.

### Exemple d’import Svelte

```ts
import { Alerte, CentreAide, ResumePssi } from "@lab-anssi/ui-kit";
```

### Exemple d'utilisation des WebComponents

Les **WebComponents** sont disponibles dans le dossier `dist/webcomponents` et peuvent être intégrés dans n’importe quel projet HTML/JS en commençant par importer la librairie WebComponents à l'aide du script suivant :

```html
<script src="https://lab-anssi-ui-kit-prod-s3-assets.cellar-c2.services.clever-cloud.com/1.23.2/lab-anssi-ui-kit.iife.js"></script>
```

Une fois cet import effectué, les WebComponents sont prêts à être consommés dans votre projet :

```html
<lab-anssi-centre-aide nom-service="MonService" liens="[...]"></lab-anssi-centre-aide>
```

## Release

- Mettre à jour le `package.json` avec la nouvelle version
- Exécuter `pnpm install`
- Faire un commit et une PR `[VERSION] Passe à la version X.X.X`
- Valider la PR puis la merger
- Dans `GitHub > Release` cliquer sur le bouton `Draft a new release`
- Dans le formulaire `New release` :
  - Dérouler la liste puis cliquer sur `Create new tag`
  - Nommer le tag `v.X.X.X`
  - La target reste `main`
  - Release title : `v.X.X.X`
  - Release notes : utiliser le template ci-dessous :

    ```markdown
    # :package: Nouveaux Composants

    - **DSFR** - Ajoute le composant `<COMPOSANT>` – [#<ID_PR>](LIEN_PR)
    - **LAB** - Ajoute le composant `<COMPOSANT>` – [#<ID_PR>](LIEN_PR)

    # 🐞 Corrections et améliorations

    - **DSFR <NOM_COMPOSANT>** - <DESCRIPTION> – [#<ID_PR>](LIEN_PR)
    - **LAB <NOM_COMPOSANT>** - <DESCRIPTION> – [#<ID_PR>](LIEN_PR)
    ```

  - Cliquer sur `Publish release`

- Aller dans les actions `GitHub > Publication du package sur NPM` et lancer la publication sur la version `vX.X.X`
