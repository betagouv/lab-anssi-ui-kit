# Contribuer à l'UI Kit

## Flow de travail

- Forker le repo
- Créer une PR depuis le fork

## Contenu attendu d'une PR pour un nouveau composant

Une PR pour nouveau composant aura typiquement 2 éléments principaux :

- le composant Svelte ajouté par la PR
- une "story" dédiée au composant

Le composant sera à ranger dans `/src/lib/<chemin>/<composant>.svelte` et la story dans `/stories/<chemin>/<composant>.stories.ts`.

Chaque story est écrite en respectant la syntax [Component Story Format (CSF)](https://storybook.js.org/docs/writing-stories#component-story-format) de Storybook, qui dans sa forme minimale est à écrire comme ci-dessous :

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

Il est utile de vérifier que le code build correctement en jouant `npm run build` en local.
