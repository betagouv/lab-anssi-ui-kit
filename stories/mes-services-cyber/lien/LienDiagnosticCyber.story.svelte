<script lang="ts">
  import { LienDiagnosticCyber } from "$lib";
  import type { Hst } from "@histoire/plugin-svelte";

  export let Hst: Hst;
</script>

<Hst.Story title="Composants/MesServicesCyber/LienDiagnosticCyber">
  <div style="height: 600px; padding: 30px">
    <LienDiagnosticCyber />
  </div>
</Hst.Story>
