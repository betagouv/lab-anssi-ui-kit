<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import BriqueHero from "$lib/lab/vitrines-produits/briques/BriqueHero.svelte";
  import OutilSelecteurTheme from "../../../OutilSelecteurTheme.svelte";
  import { genereImageDePlaceholder } from "$lib/generateurImagesPlaceholders";

  export let Hst: Hst;

  let badge = true;
  let titre = "Mon​Service​Sécurisé";
  let soustitre =
    "L'outil pour piloter en équipe la sécurité de tous vos services numériques et les homologuer rapidement";
  let illustration = { lien: genereImageDePlaceholder(600, 400), alt: "Logo placeholder" };
  let actiongauche = { titre: "Commencer à sécuriser", lien: "" };
  let actiondroite = { titre: "Être accompagné", lien: "" };
  let partenaires = [{ lien: "src/lib/assets/illustrations/cnil.svg", alt: "Logo de la CNIL" }];
</script>

<Hst.Story title="Composants/Lab/Sites vitrines/Brique Hero" icon="material-symbols:brick-outline">
  <OutilSelecteurTheme themeSelectionne="MonServiceSécurisé" />
  <BriqueHero
    {titre}
    {badge}
    {soustitre}
    {illustration}
    {actiongauche}
    {actiondroite}
    {partenaires}
  />

  <svelte:fragment slot="controls">
    <Hst.Checkbox title="Badge" bind:value={badge} />
    <Hst.Text title="Titre" bind:value={titre} />
    <Hst.Text title="Sous titre" bind:value={soustitre} />
    <Hst.Json title="Illustration" bind:value={illustration} />
    <Hst.Json title="Action Gauche" bind:value={actiongauche} />
    <Hst.Json title="Action Droite" bind:value={actiondroite} />
    <Hst.Json title="Partenaires" bind:value={partenaires} />
  </svelte:fragment>
</Hst.Story>
