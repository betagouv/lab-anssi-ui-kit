<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import OutilSelecteurTheme from "../OutilSelecteurTheme.svelte";
  import Lien from "$lib/lab/Lien.svelte";

  export let Hst: Hst;

  let apparence: string = "lien";
  let variante: string = "tertiaire";
  let taille: string = "sm";
  let icone: string = "leaf-line";
  let cible: string | undefined;

  const variantesDisponibles = [{ value: "tertiaire", label: "Tertiaire" }];
  const taillesDisponibles = [{ value: "sm", label: "Petit" }];
  const apparencesDisponibles = [
    { value: "lien", label: "Lien" },
    { value: "bouton", label: "Bouton" },
  ];
</script>

<Hst.Story title="Composants/Lab/Lien">
  <OutilSelecteurTheme />
  <div style="background-color:white; padding:48px;">
    <h3>Lien</h3>
    <Lien titre="Libellé" href="#" {apparence} {variante} {taille} {icone} {cible} />
    <h4>Tertiaire sans bordure</h4>
    <Lien
      titre="Libellé"
      href="#"
      {apparence}
      variante="tertiaire"
      {taille}
      {icone}
      sansBordure
      {cible}
    />
  </div>
  <svelte:fragment slot="controls">
    <Hst.Text title="Icône" bind:value={icone} />
    <Hst.Select title="Apparence" options={apparencesDisponibles} bind:value={apparence} />
    <Hst.Select title="Variante" options={variantesDisponibles} bind:value={variante} />
    <Hst.Select title="Taille" options={taillesDisponibles} bind:value={taille} />
    <Hst.Text title="Cible" bind:value={cible} />
  </svelte:fragment>
</Hst.Story>
