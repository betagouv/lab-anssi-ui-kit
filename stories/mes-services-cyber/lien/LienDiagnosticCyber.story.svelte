<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import { LienDiagnosticCyber } from "../../../src/lib";

  export let Hst: Hst;
  let versExterne = true;
</script>

<Hst.Story title="Composants/MesServicesCyber/LienDiagnosticCyber">
  <div style="height: 600px; padding: 30px; background-color: #f0f0f0;">
    <div>
      <h3>Desktop</h3>
      <div
        style="display: flex;flex-direction: column;justify-content: center;align-items: flex-end;"
      >
        <LienDiagnosticCyber {versExterne} lien="https://" />
      </div>
      <h3>Mobile</h3>
      <div>
        <LienDiagnosticCyber {versExterne} lien="https://" />
      </div>
    </div>
  </div>
</Hst.Story>
