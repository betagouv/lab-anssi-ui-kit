<script lang="ts">
  import Tag from "$lib/lab/Tag.svelte";
  import type { Hst } from "@histoire/plugin-svelte";
  import OutilSelecteurTheme from "../OutilSelecteurTheme.svelte";

  export let Hst: Hst;

  let label: string = "libellé";
  let couleurTexte: string = "";
  let couleurFond: string = "";
  let taille: string = "md";
  let type: string = "selectionnable";
  let presse: boolean = false;

  const taillesDisponibles = [
    { value: "sm", label: "Petit" },
    { value: "md", label: "Moyen" },
  ];

  const typesDisponibles = [
    { value: "defaut", label: "Défaut" },
    { value: "selectionnable", label: "Sélectionnable" },
  ];
</script>

<Hst.Story title="Composants/Lab/Tag">
  <OutilSelecteurTheme />
  <div style="background-color:white; padding:48px;">
    <h3>Tag</h3>
    <Tag {label} {couleurTexte} {couleurFond} {taille} {type} {presse} />
  </div>

  <svelte:fragment slot="controls">
    <Hst.ColorSelect title="Couleur Texte" bind:value={couleurTexte} />
    <Hst.ColorSelect title="Couleur Fond" bind:value={couleurFond} />
    <Hst.Select title="Taille" options={taillesDisponibles} bind:value={taille} />
    <Hst.Select title="Type" options={typesDisponibles} bind:value={type} />
    <Hst.Text title="Libellé" bind:value={label} />
    <Hst.Checkbox title="Pressé" bind:value={presse} />
  </svelte:fragment>
</Hst.Story>
