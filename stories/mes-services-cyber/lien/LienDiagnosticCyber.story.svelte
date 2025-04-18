<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import { LienDiagnosticCyber } from "../../../src/lib";

  export let Hst: Hst;
  let versExterne = true;
</script>

<Hst.Story title="Composants/MesServicesCyber/LienDiagnosticCyber">
  <div style="height: 600px; padding: 30px">
    <div style="margin-left: 300px">
      <h3>Avant</h3>
      <LienDiagnosticCyber {versExterne} lien="https://" />
      <h3>Après</h3>
    </div>
  </div>
</Hst.Story>
