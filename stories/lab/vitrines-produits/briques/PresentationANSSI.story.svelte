<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import PresentationANSSI from "$lib/lab/vitrines-produits/briques/PresentationANSSI.svelte";
  import OutilSelecteurTheme from "../../../OutilSelecteurTheme.svelte";

  export let Hst: Hst;
</script>

<Hst.Story
  title="Composants/Lab/Sites vitrines/Qu'est-ce que l'ANSSI ?"
  icon="material-symbols:brick-outline"
>
  <OutilSelecteurTheme themeSelectionne="MonAideCyber" />
  <PresentationANSSI />
</Hst.Story>
