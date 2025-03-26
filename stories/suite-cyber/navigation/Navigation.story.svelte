<script lang="ts">
  import { SuiteCyberNavigation } from "$lib";
  import type { Hst } from "@histoire/plugin-svelte";

  export let Hst: Hst;
</script>

<Hst.Story title="SuiteCyber/Navigation">
  <div style="background-color:bisque;display:flex;gap:10px">
    <div style="margin-left: auto; margin-right:1Opx">
      <SuiteCyberNavigation />
    </div>
    <div>Jean Dujardin</div>
  </div>
  <div style="background-color: antiquewhite; height:800px;"><h1>Bienvenue</h1></div>
</Hst.Story>
