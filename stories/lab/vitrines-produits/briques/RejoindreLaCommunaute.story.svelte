<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import OutilSelecteurTheme from "../../../OutilSelecteurTheme.svelte";
  import { genereImageDePlaceholder } from "$lib/generateurImagesPlaceholders";
  import RejoindreLaCommunaute from "$lib/lab/vitrines-produits/briques/RejoindreLaCommunaute.svelte";

  export let Hst: Hst;

  let titre = "Rejoindre la communauté";

  let raisons = ['Échanger directement avec les membres.'];
  let illustration = { lien: genereImageDePlaceholder(600, 400, 'Placeholder'), alt: "Logo placeholder" };
  let comporteUneAction = false;
  let action: { titre: string; lien: string } | undefined;
  $: action = comporteUneAction ? { titre: "Commencer à sécuriser", lien: "#" } : undefined;


</script>

<Hst.Story title="Composants/Lab/Sites vitrines/Brique Rejoindre la communauté" icon="material-symbols:brick-outline">
  <OutilSelecteurTheme themeSelectionne="MonServiceSécurisé" />
  <RejoindreLaCommunaute {titre} {raisons} {illustration} {action} />

  <svelte:fragment slot="controls">
    <Hst.Text title="Titre" bind:value={titre} />
    <Hst.Json title="Raisons" bind:value={raisons} />
    <Hst.Checkbox title="Comporte une action ?" bind:value={comporteUneAction}/>
    {#if comporteUneAction}
      <Hst.Json title="Action" bind:value={action} />
    {/if}
    <Hst.Json title="Illustration" bind:value={illustration} />
  </svelte:fragment>
</Hst.Story>
