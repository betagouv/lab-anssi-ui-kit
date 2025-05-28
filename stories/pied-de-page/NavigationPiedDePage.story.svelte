<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import NavigationPiedDePage from "../../src/lib/pied-de-page/NavigationPiedDePage.svelte";

  export let Hst: Hst;

  let conforme = false;
  const source = `<NavigationPiedDePage {conforme} />`;
</script>

<Hst.Story
  {source}
  title="Composants/Pied de page/Navigation"
  icon="material-symbols:assistant-navigation"
>
  <NavigationPiedDePage {conforme} />

  <svelte:fragment slot="controls">
    <Hst.Checkbox title="Conforme" bind:value={conforme} />
  </svelte:fragment>
</Hst.Story>
