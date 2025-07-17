<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import Breadcrumb from "$lib/lab/Breadcrumb.svelte";
  import OutilSelecteurTheme from "../OutilSelecteurTheme.svelte";
  import { srcAsset } from "$lib/assets/assets.js";
  export let Hst: Hst;
</script>

<Hst.Story title="Composants/Lab/Breadcrumb">
  <Breadcrumb
    path={[
      {
        label: "Accueil",
        lien: "https://www.google.com",
      },

      {
        label: "Selection pour les enseignants",
      },
    ]}
  />
</Hst.Story>
