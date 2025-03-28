<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import { MesServicesCyberBandeau } from "$lib";

  export let Hst: Hst;
</script>

<Hst.Story title="Composants/MesServicesCyber/Bandeau">
  <MesServicesCyberBandeau />

  <svelte:fragment slot="controls">
    <button
      style="margin: 30px 0 0 10px; padding: 5px; cursor: pointer;"
      on:click={() => {
        localStorage.setItem("lab-anssi-ui-kit-msc-bandeau-affichage", "visible");
        location.reload();
      }}
    >
      Faire réapparaître
    </button>
  </svelte:fragment>
</Hst.Story>
