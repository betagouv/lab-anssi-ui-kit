<script lang="ts">
  import { SuiteCyberNavigation } from "$lib";
  import type { Hst } from "@histoire/plugin-svelte";

  export let Hst: Hst;
</script>

<Hst.Story title="SuiteCyber/Navigation">
  <div style="background-color:bisque;">
    <SuiteCyberNavigation />
  </div>
  <div style="background-color: antiquewhite; height:800px;"><h1>Bienvenue</h1></div>
</Hst.Story>
