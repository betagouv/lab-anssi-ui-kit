<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import Bouton from "$lib/lab/Bouton.svelte";
  import OutilSelecteurTheme from "../OutilSelecteurTheme.svelte";

  export let Hst: Hst;

  let variante: string = "tertiaire";
  let taille: string = "sm";
  let icone: string = "leaf-line";
  let positionIcone: string = "droite";

  const variantesDisponibles = [
    { value: "primaire", label: "Primaire" },
    { value: "tertiaire", label: "Tertiaire" },
  ];
  const taillesDisponibles = [
    { value: "sm", label: "Petit" },
    { value: "md", label: "Moyen" },
    { value: "lg", label: "Grand" },
  ];

  const positionsIconeDisponibles = [
    { value: "sans", label: "Sans" },
    { value: "seule", label: "Seule" },
    { value: "droite", label: "À droite" },
    { value: "gauche", label: "À gauche" },
  ];
</script>

<Hst.Story title="Composants/Lab/Bouton">
  <OutilSelecteurTheme />
  <div style="background-color:white; padding:48px;">
    <h3>Bouton</h3>
    <Bouton titre="Libellé" {variante} {taille} {icone} {positionIcone} />
    <h4>Tertiaire sans bordure</h4>
    <Bouton titre="Libellé" variante="tertiaire" {taille} {icone} sansBordure />
  </div>
  <svelte:fragment slot="controls">
    <Hst.Text title="Icône" bind:value={icone} />
    <Hst.Select title="Variante" options={variantesDisponibles} bind:value={variante} />
    <Hst.Select title="Taille" options={taillesDisponibles} bind:value={taille} />
    <Hst.Select
      title="Position icône"
      options={positionsIconeDisponibles}
      bind:value={positionIcone}
    />
  </svelte:fragment>
</Hst.Story>
