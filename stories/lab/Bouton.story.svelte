<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import Bouton from "$lib/lab/Bouton.svelte";
  import OutilSelecteurTheme from "../OutilSelecteurTheme.svelte";

  export let Hst: Hst;

  let variante: string = "tertiaire";
  let taille: string = "sm";
  let icone: string = "leaf-line";

  const variantesDisponibles = [{ value: "tertiaire", label: "Tertiaire" }];
  const taillesDisponibles = [{ value: "sm", label: "Petit" }];
</script>

<Hst.Story title="Composants/Lab/Bouton">
  <OutilSelecteurTheme />
  <div style="background-color:white; padding:48px;">
    <h3>Bouton</h3>
    <Bouton titre="Libellé" {variante} {taille} {icone} />
    <h4>Tertiaire sans bordure</h4>
    <Bouton titre="Libellé" variante="tertiaire" {taille} {icone} sansBordure />
  </div>
  <svelte:fragment slot="controls">
    <Hst.Text title="Icône" bind:value={icone} />
    <Hst.Select title="Variante" options={variantesDisponibles} bind:value={variante} />
    <Hst.Select title="Taille" options={taillesDisponibles} bind:value={taille} />
  </svelte:fragment>
</Hst.Story>
