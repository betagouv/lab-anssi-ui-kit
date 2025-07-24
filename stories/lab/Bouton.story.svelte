<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import Bouton from "$lib/lab/Bouton.svelte";
  import OutilSelecteurTheme from "../OutilSelecteurTheme.svelte";

  export let Hst: Hst;

  let variante: string = "tertiaire";
  let taille: string = "sm";
  let icone: string = "leaf-line";
  let positionIcone: string = "droite";
  let actif: boolean = true;

  const variantesDisponibles = [
    { value: "primaire", label: "Primaire" },
    { value: "tertiaire", label: "Tertiaire" },
    { value: "tertiaire-sans-bordure", label: "Tertiaire sans bordure" },
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
    <Bouton titre="Libellé" {variante} {taille} {icone} {positionIcone} {actif} />
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
    <Hst.Checkbox title="Actif" bind:value={actif} />
  </svelte:fragment>
</Hst.Story>
