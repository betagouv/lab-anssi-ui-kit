<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import OutilSelecteurTheme from "../OutilSelecteurTheme.svelte";
  import Tabs from "$lib/lab/Tabs.svelte";
  export let Hst: Hst;
</script>

<Hst.Story title="Composants/Lab/Tabs">
  <OutilSelecteurTheme />
  <div style="background-color:white; padding:2rem;">
    <Tabs
      tabs={[
        { label: "Former", lien: "former" },
        { label: "Sensibiliser", lien: "sensibiliser", active: true },
        { label: "Guider", lien: "guider" },
        { label: "Se former", lien: "se-former" },
      ]}
    />
  </div>
</Hst.Story>
