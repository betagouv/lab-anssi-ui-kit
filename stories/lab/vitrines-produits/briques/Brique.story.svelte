<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import Brique from "$lib/lab/vitrines-produits/briques/Brique.svelte";
  import OutilSelecteurTheme from "../../../OutilSelecteurTheme.svelte";
  export let Hst: Hst
</script>

<Hst.Story title="Composants/Lab/Vitrines Produits/Briques" icon="token-branded:brick">
  <OutilSelecteurTheme />
  <Brique variation="primaire">
    <h1>Un titre</h1>
    <p>Du texte</p>
  </Brique>
</Hst.Story>
