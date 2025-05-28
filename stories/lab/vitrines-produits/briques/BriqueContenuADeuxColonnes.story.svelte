<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import OutilSelecteurTheme from "../../../OutilSelecteurTheme.svelte";
  import { genereImageDePlaceholder } from "$lib/generateurImagesPlaceholders";
  import BriqueContenuADeuxColonnes from "$lib/lab/vitrines-produits/briques/BriqueContenuADeuxColonnes.svelte";

  export let Hst: Hst;

  let titre = "Mon​Service​Sécurisé";
  let paragraphe =
    "L'outil pour piloter en équipe la sécurité de tous vos services numériques et les homologuer rapidement";
  let illustration = {
    lien: genereImageDePlaceholder(600, 400, "Placeholder"),
    alt: "Logo placeholder",
  };
  let comporteUneAction = false;
  let action: { titre: string; lien: string } | undefined;
  $: action = comporteUneAction ? { titre: "Commencer à sécuriser", lien: "#" } : undefined;

  let ordre: "texte-gauche" | "texte-droite" = "texte-gauche";

  const options = [
    {
      value: "texte-gauche",
      label: "Contenu à gauche",
    },
    {
      value: "texte-droite",
      label: "Contenu à droite",
    },
  ];
</script>

<Hst.Story
  title="Composants/Lab/Sites vitrines/Brique Contenu à deux colonnes"
  icon="material-symbols:brick-outline"
>
  <OutilSelecteurTheme themeSelectionne="MonServiceSécurisé" />
  <BriqueContenuADeuxColonnes {titre} {paragraphe} {illustration} {action} {ordre} />

  <svelte:fragment slot="controls">
    <Hst.Select title="Position du contenu" {options} bind:value={ordre} />
    <Hst.Text title="Titre" bind:value={titre} />
    <Hst.Text title="Texte" bind:value={paragraphe} />
    <Hst.Checkbox title="Comporte une action ?" bind:value={comporteUneAction} />
    {#if comporteUneAction}
      <Hst.Json title="Action" bind:value={action} />
    {/if}
    <Hst.Json title="Illustration" bind:value={illustration} />
  </svelte:fragment>
</Hst.Story>
