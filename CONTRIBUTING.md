# Contribuer à l'UI Kit

## Flow de travail

- Forker le repo
- Créer une PR depuis le fork

## Contenu attendu d'une PR pour un nouveau composant

Une PR pour nouveau composant aura typiquement 2 éléments principaux :

- le composant Svelte ajouté par la PR
- l'histoire dédiée au composant

Le composant sera à ranger dans `/src/lib/<chemin>/<composant>.svelte` et l'histoire dans `/stories/<chemin>/<composant>.story.svelte`.

L'histoire aura une forme similaire à toutes les histoires existantes :

```sveltehtml
<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";

  export let Hst: Hst;
</script>

<Hst.Story title="Composants/<composant>">
  <!-- Utilisation du composant -->
</Hst.Story>
```

Il est utile de vérifier que le code build correctement en jouant `npm run build` en local.
