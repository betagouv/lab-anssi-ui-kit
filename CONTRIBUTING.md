# Contribuer à l'UI Kit

## Processus de contribution

Pour contribuer à ce projet, veuillez suivre les étapes suivantes :

1. Forkez le dépôt sur votre compte GitHub.
2. Créez une branche dédiée à votre contribution (ex : `feature/mon-nouveau-composant`).
3. Développez votre fonctionnalité ou correctif en respectant les conventions du projet.
4. Vérifiez que le code build correctement (`npm run build`) et que les tests passent (`npm test`).
5. Soumettez une Pull Request (PR) détaillée sur le dépôt principal.
6. Attendez la revue et les retours éventuels des mainteneurs.

## Contenu attendu d'une PR pour un nouveau composant

Une PR pour l’ajout d’un nouveau composant doit contenir :

- Le fichier du composant Svelte dans `src/lib/<chemin>/<composant>.svelte`.
- Une story dédiée dans `stories/<chemin>/<composant>.stories.ts` ou `.stories.svelte`.
- Des exemples d’utilisation et la documentation des props dans la story (format CSF recommandé).
- Des tests unitaires si le composant contient de la logique métier.
- La vérification du build (`npm run build`) et des tests (`npm test`).

Chaque story doit être écrite en respectant la syntax [Component Story Format (CSF)](https://storybook.js.org/docs/writing-stories#component-story-format) de Storybook, qui dans sa forme minimale est à écrire comme ci-dessous :

```ts
import type { Meta, StoryObj } from "@storybook/svelte";

import <composant> from "$lib/<chemin>/<composant>.svelte";

const meta = {
  title: "Composants/<composant>",
  component: <composant>,
} satisfies Meta<<composant>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = {};
```

## Styleguides

### HTML

- Respecter la sémantique HTML (balises appropriées, accessibilité).
- Utiliser des attributs ARIA lorsque nécessaire pour l’accessibilité.
- Préférer les balises natives (button, nav, section, etc.)

### CSS

- Utiliser SCSS pour la structuration des styles.
- Privilégier les variables et mixins définis dans `src/variables.scss` et `src/responsive.scss`.
- Respecter la convention BEM pour la nommage des classes si besoin.
- Éviter les styles inline, préférer les fichiers `.scss` dédiés.

### Convention de commit

<!-- A définir -->
