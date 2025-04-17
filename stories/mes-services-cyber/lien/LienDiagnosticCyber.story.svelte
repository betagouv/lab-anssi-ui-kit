<script lang="ts">
  import { LienDiagnosticCyber } from "$lib";
  import type { Hst } from "@histoire/plugin-svelte";

  export let Hst: Hst;
</script>

<Hst.Story title="Composants/MesServicesCyber/LienDiagnosticCyber">
  <LienDiagnosticCyber />

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
