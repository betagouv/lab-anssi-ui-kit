<script lang="ts">
  import { LienDiagnosticCyber } from "$lib";
  import type { Hst } from "@histoire/plugin-svelte";

  export let Hst: Hst;
</script>

<Hst.Story title="Composants/MesServicesCyber/LienDiagnosticCyber">
  <div style="height: 600px; padding: 30px">
    <div style="margin-left: 300px">
      <h3>Avant</h3>
      <LienDiagnosticCyber />
      <h3>Après</h3>
    </div>

  </div>
</Hst.Story>
