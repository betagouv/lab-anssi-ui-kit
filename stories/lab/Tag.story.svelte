<script lang="ts">
  import Tag from "$lib/lab/Tag.svelte";
  import type { Hst } from "@histoire/plugin-svelte";
  import OutilSelecteurTheme from "../OutilSelecteurTheme.svelte";

  export let Hst: Hst;

  let label: string = "libellé";
  let couleurTexte: string = "";
  let couleurFond: string = "";
  let taille: string = "sm";

  const taillesDisponibles = [
    { value: "sm", label: "Petit" },
    { value: "md", label: "Moyen" },
  ];
</script>

<Hst.Story title="Composants/Lab/Tag">
  <OutilSelecteurTheme />
  <div style="background-color:white; padding:48px;">
    <h3>Tag</h3>
    <Tag {label} {couleurTexte} {couleurFond} {taille} />
  </div>

  <svelte:fragment slot="controls">
    <Hst.ColorSelect title="Couleur Texte" bind:value={couleurTexte} />
    <Hst.ColorSelect title="Couleur Fond" bind:value={couleurFond} />
    <Hst.Select title="Taille" options={taillesDisponibles} bind:value={taille} />
    <Hst.Text title="Libellé" bind:value={label} />
  </svelte:fragment>
</Hst.Story>
