# Slots Web Components pour le SEO et le SSR

## Sommaire

- [Introduction](#introduction)
- [Le problème : Shadow DOM et visibilité du contenu](#le-problème--shadow-dom-et-visibilité-du-contenu)
- [La solution : les slots](#la-solution--les-slots)
- [Le pattern utilisé](#le-pattern-utilisé)
  - [Slot par défaut](#slot-par-défaut-contenu-simple)
  - [Slots nommés](#slots-nommés-contenu-multiple)
  - [Slot `noscript` pour les composants interactifs](#slot-noscript-pour-les-composants-interactifs-liens-navigation)
- [Distribution duale : Svelte et Web Components](#distribution-duale--svelte-et-web-components)
- [Composants DSFR impactés](#composants-dsfr-impactés)
- [Composants Lab ANSSI impactés](#composants-lab-anssi-impactés)
- [Exemples d'utilisation](#exemples-dutilisation)
- [Identifier les composants dans Storybook](#identifier-les-composants-dans-storybook)
- [FAQ](#faq)

---

## Introduction

Les composants de ce projet sont développés en Svelte 5 et compilés en Web Components grâce à l'option `customElement: true`.<br/> En tant que Web Components, ils utilisent le **Shadow DOM** pour encapsuler leur style et leur structure HTML.

Cette encapsulation, bien que bénéfique pour l'isolation des styles, pose un problème majeur pour le **SEO** (Search Engine Optimization) et le **SSR** (Server-Side Rendering) : le contenu textuel placé dans le Shadow DOM est **invisible** pour les moteurs de recherche et les crawlers avant l'hydratation JavaScript.

---

## Le problème : Shadow DOM et visibilité du contenu

Lorsqu'un Web Component est rendu côté serveur ou analysé par un crawler :

```text
Avant hydratation (ce que voit le crawler)
──────────────────────────────────────────

<lab-anssi-alerte type="info" description="Information importante">
  #shadow-root (closed)
  │  ← Contenu invisible pour le crawler
</lab-anssi-alerte>
```

Le crawler ne voit qu'une balise HTML personnalisée **vide**.<br/> Le contenu textuel (titre, description, etc.) est passé sous forme d'**attributs** ou de **props**, et rendu uniquement à l'intérieur du Shadow DOM après exécution du JavaScript.<br/> En SSR, la page servie au navigateur ne contient donc aucun texte indexable pour ces composants.

---

## La solution : les slots

Les **slots** sont un mécanisme natif des Web Components qui permettent de projeter du contenu depuis le **Light DOM** (le DOM classique, visible par les crawlers) vers le **Shadow DOM**.

```text
Avec slots (ce que voit le crawler)
────────────────────────────────────

<lab-anssi-alerte type="info">
  <p>Information importante</p>    ← Visible dans le Light DOM !
</lab-anssi-alerte>
```

Le contenu placé dans un slot réside dans le Light DOM : il est **indexable** par les moteurs de recherche et **visible** avant l'hydratation JavaScript.

### Changement non-cassant

L'ajout de slots est un **changement rétrocompatible**.<br/> Les props existantes continuent de fonctionner : elles servent de **contenu de repli** (_fallback_) à l'intérieur du slot.<br/> Si aucun contenu n'est passé via le slot, la valeur de la prop est affichée, exactement comme avant.

```svelte
<!-- Avant : uniquement via prop -->
<lab-anssi-alerte description="Mon texte"></lab-anssi-alerte>

<!-- Après : les deux fonctionnent -->
<lab-anssi-alerte description="Mon texte"></lab-anssi-alerte>
<!-- ✅ Toujours valide -->
<lab-anssi-alerte><p>Mon texte</p></lab-anssi-alerte>
<!-- ✅ Nouveau : via slot -->
```

---

## Le pattern utilisé

### Slot par défaut (contenu simple)

Pour les composants avec **un seul** contenu textuel principal (titre, label, description), un **slot par défaut** est utilisé.<br/> La prop est rendue optionnelle et sert de fallback :

```svelte
<!-- Dans le composant Svelte -->
<span><slot>{titre}</slot></span>
```

### Slots nommés (contenu multiple)

Pour les composants avec **plusieurs** contenus textuels (titre + description + mention, etc.), des **slots nommés** sont utilisés :

```svelte
<!-- Dans le composant Svelte -->
<h1><slot name="titre">{titre}</slot></h1>
<p><slot name="description">{description}</slot></p>
```

Côté consommateur :

```html
<lab-anssi-bandeau-page>
  <h1 slot="titre">Mon titre</h1>
  <p slot="description">Ma description</p>
</lab-anssi-bandeau-page>
```

### Slot `noscript` pour les composants interactifs (liens, navigation)

Les patterns précédents _(slot par défaut et slots nommés)_ résolvent le problème pour le **contenu textuel** : titres, descriptions, labels.<br/> Mais pour les composants qui encapsulent des **liens** (`<a href="...">`), le slot seul ne suffit pas — la balise `<a>` et son attribut `href` restent dans le Shadow DOM et sont invisibles pour les crawlers.

C'est le cas notamment pour :

- `dsfr-link` — lien hypertexte
- `dsfr-button` — bouton avec lien
- `dsfr-breadcrumb` — fil d'Ariane
- `dsfr-navigation` — navigation principale
- `dsfr-tile` — tuile avec lien
- `dsfr-card` — carte avec lien

Pour ces composants, la recommandation est d'ajouter un **slot « factice »** nommé **`noscript`**.<br/> Ce slot n'étant mappé à aucun `<slot name="noscript">` dans le Shadow DOM du composant, son contenu **reste dans le Light DOM** sans être projeté visuellement — exactement le comportement souhaité.

Le nom `noscript` est choisi par analogie avec la balise HTML `<noscript>`, qui fournit du contenu alternatif lorsque JavaScript n'est pas disponible.<br/> C'est précisément le rôle de ce slot : rendre du contenu accessible aux crawlers et aux environnements sans JavaScript.

#### Exemple avec un lien

```html
<dsfr-link href="https://monsite.fr" label="Accéder au site">
  <a href="https://monsite.fr" slot="noscript">Accéder au site</a>
</dsfr-link>
```

```text
Ce que voit le crawler
──────────────────────

<dsfr-link href="https://monsite.fr" label="Accéder au site">
  #shadow-root
  │  <a href="https://monsite.fr">Accéder au site</a>   ← Non visible pré-hydratation
  <a href="https://monsite.fr" slot="noscript">Accéder au site</a>   ← Visible !
</dsfr-link>
```

#### Exemple avec un fil d'Ariane

```html
<dsfr-breadcrumb items="[...]">
  <nav slot="noscript" aria-label="Fil d'Ariane">
    <ol>
      <li><a href="/">Accueil</a></li>
      <li><a href="/services">Services</a></li>
      <li aria-current="page">Mon service</li>
    </ol>
  </nav>
</dsfr-breadcrumb>
```

#### Pourquoi `noscript` et pas un autre nom ?

- **Sémantique claire** : le nom fait directement référence à `<noscript>`, dont le rôle est similaire — fournir une alternative quand le JavaScript n'est pas exécuté.
- **Convention unifiée** : utiliser le même nom pour tous les composants facilite la lecture du code et la compréhension du pattern.
- **Non-intrusif** : aucun composant de la bibliothèque ne définit de `<slot name="noscript">` dans son Shadow DOM. Le contenu est donc garanti de rester dans le Light DOM sans interférer avec le rendu.

> **Important** : le contenu du slot `noscript` est présent dans le DOM mais **invisible visuellement** (car non projeté dans le Shadow DOM). Il est cependant bien **lisible par les crawlers** et les lecteurs d'écran en mode pré-hydratation. Après hydratation, le composant prend le relais et affiche son propre rendu.

---

## Distribution duale : Svelte et Web Components

> Contexte : commit [`474ad88c`](https://github.com/betagouv/lab-anssi-ui-kit/commit/474ad88c3f28441fc3802382f9fa197689298cd0) — _"[CORRECTION] Restaure la distribution des composants Svelte dans dist/"_

Le projet distribue les composants sous **deux formats** complémentaires :

| Format             | Fichier de sortie                             | Outil de build      | Usage                                             |
| ------------------ | --------------------------------------------- | ------------------- | ------------------------------------------------- |
| **Svelte**         | `dist/index.js`                               | `svelte-package`    | Consommation dans un projet Svelte (avec bundler) |
| **Web Components** | `dist/webcomponents/lab-anssi-ui-kit.iife.js` | `vite build` (IIFE) | Consommation universelle (HTML, React, Vue, etc.) |

### Pourquoi cette distribution duale est importante pour le SEO

Le bundle **Web Components** (IIFE) est le format utilisé par les applications qui ne sont pas développées en Svelte.<br/> C'est dans ce contexte que les slots prennent tout leur sens :

- Les **Web Components** utilisent le Shadow DOM → le contenu des props est invisible pré-hydratation.
- Les **slots** permettent de placer le contenu dans le Light DOM → visible pour les crawlers.

Pour les applications Svelte consommant directement les composants Svelte (via `dist/index.js`), la problématique SEO est gérée différemment par le framework lui-même (SSR natif avec SvelteKit, par exemple).

### Détails techniques du commit

Le commit `474ad88c` a modifié le pipeline de build pour générer les deux formats :

```json
{
  "scripts": {
    "build": "svelte-package && pnpm run build:manifest && pnpm run build:webcomponents && pnpm run copy:icons && publint"
  },
  "svelte": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "svelte": "./dist/index.js"
    },
    "./dist/webcomponents": {
      "types": "./dist/webcomponents/lab-anssi-ui-kit.jsx.d.ts",
      "import": "./dist/webcomponents/lab-anssi-ui-kit.iife.js"
    }
  }
}
```

- **`svelte-package`** génère les composants Svelte compilés dans `dist/` avec les déclarations de types.
- **`vite build`** (via `build:webcomponents`) génère le bundle IIFE des Web Components.
- Les champs `svelte` et `exports["."]` permettent aux bundlers de résoudre automatiquement les composants Svelte.
- Le champ `sideEffects: ["**/*.css"]` a été ajouté pour permettre le tree-shaking des modules JavaScript tout en préservant les imports CSS.

---

## Composants DSFR impactés

Les composants suivants, basés sur le [Système de Design de l'État (DSFR)](https://www.systeme-de-design.gouv.fr/), supportent les slots pour le SEO :

| Composant     | Web Component    | Slots                             |
| ------------- | ---------------- | --------------------------------- |
| DsfrAlert     | `dsfr-alert`     | `title`, `description`            |
| DsfrCallout   | `dsfr-callout`   | `title`, `description`            |
| DsfrBadge     | `dsfr-badge`     | slot par défaut                   |
| DsfrTag       | `dsfr-tag`       | slot par défaut                   |
| DsfrHighlight | `dsfr-highlight` | `title`, `text`                   |
| DsfrLink      | `dsfr-link`      | slot par défaut                   |
| DsfrContent   | `dsfr-content`   | `caption`                         |
| DsfrToggle    | `dsfr-toggle`    | `hint`                            |
| DsfrStepper   | `dsfr-stepper`   | `title`, `next-step`              |
| DsfrTile      | `dsfr-tile`      | `description`, `title`, `details` |
| DsfrNotice    | `dsfr-notice`    | `title`, `description`            |

---

## Composants Lab ANSSI impactés

Les composants suivants, développés spécifiquement pour le Lab ANSSI, supportent les slots pour le SEO :

| Composant                  | Web Component                              | Slots                             |
| -------------------------- | ------------------------------------------ | --------------------------------- |
| Alerte                     | `lab-anssi-alerte`                         | slot par défaut                   |
| Bouton                     | `lab-anssi-bouton`                         | slot par défaut                   |
| Lien                       | `lab-anssi-lien`                           | slot par défaut                   |
| Tag                        | `lab-anssi-tag`                            | slot par défaut                   |
| BandeauPage                | `lab-anssi-bandeau-page`                   | `titre`, `description`, `mention` |
| BlocFonctionnalites        | `lab-anssi-fonctionnalites`                | `titre`                           |
| BandeauTitre               | `lab-anssi-bandeau-titre`                  | `titre`, `description`            |
| BriqueContenuADeuxColonnes | `lab-anssi-brique-contenu-a-deux-colonnes` | `titre`, `paragraphe`             |
| BriqueHero                 | `lab-anssi-brique-hero`                    | `titre`, `soustitre`              |
| BriqueTitreMultimedia      | `lab-anssi-titre-multimedia`               | `titre`                           |
| PresentationANSSI          | `lab-anssi-presentation-anssi`             | `titre`, slot par défaut          |
| RejoindreLaCommunaute      | `lab-anssi-brique-rejoindre-la-communaute` | `titre`                           |
| Temoignages                | `lab-anssi-temoignages`                    | `titre`                           |

---

## Exemples d'utilisation

### Slot par défaut

```html
<!-- Alerte avec prop (compatible, mais non indexable) -->
<lab-anssi-alerte type="info" description="Ce service sera indisponible le 15 octobre.">
</lab-anssi-alerte>

<!-- Alerte avec slot (recommandé pour le SEO) -->
<lab-anssi-alerte type="info">
  <p>Ce service sera indisponible le <time datetime="2026-10-15">15 octobre</time>.</p>
</lab-anssi-alerte>
```

### Slots nommés

```html
<!-- BandeauPage avec props -->
<lab-anssi-bandeau-page
  titre="MonServiceSécurisé"
  description="Sécurisez vos services numériques."
  mention="Service proposé par l'ANSSI"
></lab-anssi-bandeau-page>

<!-- BandeauPage avec slots (recommandé pour le SEO) -->
<lab-anssi-bandeau-page>
  <h1 slot="titre">MonServiceSécurisé</h1>
  <p slot="description">Sécurisez vos <strong>services numériques</strong>.</p>
  <p slot="mention">
    Service proposé par l'<abbr title="Agence nationale de la sécurité des systèmes d'information"
      >ANSSI</abbr
    >
  </p>
</lab-anssi-bandeau-page>
```

### Contenu riche dans les slots

L'un des avantages des slots est de pouvoir utiliser du **HTML riche** :

```html
<lab-anssi-brique-hero illustration='{"lien": "/hero.webp", "alt": "Illustration"}'>
  <h2 slot="titre">Mon<wbr />Service<wbr />Sécurisé</h2>
  <p slot="soustitre">
    L'outil pour piloter en équipe la sécurité de tous vos
    <strong>services numériques</strong> et les homologuer rapidement.
  </p>
</lab-anssi-brique-hero>
```

---

## Identifier les composants dans Storybook

### Tag `"Avec slots"`

Tous les composants basés sur des slots sont identifiés dans Storybook par le tag **`"Avec slots"`**, déclaré dans le `defineMeta` de chaque story :

```ts
const { Story } = defineMeta({
  title: "Composants/DSFR/Alert",
  component: DsfrAlert,
  tags: ["Avec slots"],
  // ...
});
```

Ce tag permet de **filtrer les composants** directement depuis la barre latérale de Storybook, en utilisant le champ de recherche ou le filtre par tags.

### Indicateur dans la toolbar

En complément du filtrage, un **badge visuel** apparaît dans la toolbar _(la barre au-dessus du canvas)_ lorsque la story sélectionnée appartient à un composant basé sur des slots.

Ce badge est alimenté par un addon déclaré dans `.storybook/manager.ts` qui :

1. Écoute la story courante via `useStorybookState()`
2. Vérifie la présence du tag `"Avec slots"` dans les métadonnées de la story
3. Affiche le badge si le tag est présent, sinon n'affiche rien

Cela permet de savoir **en un coup d'œil** si le composant que l'on consulte supporte les slots, sans avoir à vérifier la documentation ou le code source.

### Stories dédiées

Chaque composant disposant de slots possède une story illustrant l'utilisation des slots :

- **"Avec usage du slot par défaut"** — pour les composants avec un slot par défaut
- **"Avec usage des slots"** ou **"Avec usage du slot titre"** — pour les composants avec des slots nommés

---

## FAQ

<details>
  <summary>Les props existantes continuent-elles de fonctionner ?</summary>

**Oui.** L'ajout de slots est entièrement rétrocompatible. Les props servent de contenu de repli à l'intérieur des slots. Si vous ne passez pas de contenu via un slot, la prop est utilisée comme avant.
</details>

<details>
  <summary>Dois-je migrer tout mon code pour utiliser les slots ?</summary>

**Non.** La migration vers les slots est **optionnelle** et recommandée uniquement si le SEO ou le SSR est important pour votre application. Pour les applications internes ou les SPAs où le SEO n'est pas critique, les props fonctionnent toujours parfaitement.
</details>

<details>
  <summary>Que se passe-t-il si je passe à la fois une prop et un slot ?</summary>

Le **contenu du slot a la priorité**. Le slot remplace le contenu de repli (la prop). Il est recommandé de ne pas fournir les deux simultanément pour éviter toute confusion.
</details>
