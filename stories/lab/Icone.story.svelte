<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import Icone from "$lib/lab/Icone.svelte";

  export let Hst: Hst;

  let nom: string = "leaf-line";
  let taille: string = "md";
  let couleur: string = "red";
  const taillesDisponibles = [
    { value: "sm", label: "Petite (1 rem)" },
    { value: "md", label: "Moyenne (1.5 rem)" },
    { value: "lg", label: "Grande  (2 rem)" },
  ];
</script>

<Hst.Story title="Composants/Lab/Icone">
  <div style="background-color:white; padding:48px;">
    <h3>Icône</h3>
    <p>
      Les icônes disponibles et leur code sont sur la page du <a
        href="https://www.systeme-de-design.gouv.fr/version-courante/fr/fondamentaux/icone"
        target="_blank">DSFR</a
      >. Les icônes du DSFR sont elles-mêmes issues de
      <a href="https://remixicon.com/" target="_blank">Remix Icons</a>.
    </p>
    <Icone {nom} {taille} />
    <h4>Avec une couleur</h4>
    <p>
      Les icônes sont au format SVG avec la couleur « currentColor ». Ces fichiers SVG sont utilisés
      comme image de masque et peuvent donc hériter de la couleur de leur élément parent :
    </p>
    <span style="color:{couleur}">
      <Icone {nom} {taille} />
    </span>
  </div>
  <svelte:fragment slot="controls">
    <Hst.Text title="Nom" bind:value={nom} />
    <Hst.Select title="Taille" options={taillesDisponibles} bind:value={taille} />
    <Hst.Text title="Couleur" bind:value={couleur} />
  </svelte:fragment>
</Hst.Story>
