<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import OutilSelecteurTheme from "../OutilSelecteurTheme.svelte";
  import Lien from "$lib/lab/Lien.svelte";

  export let Hst: Hst;

  let apparence: string = "lien";
  let variante: string = "tertiaire";
  let taille: string = "sm";
  let icone: string = "leaf-line";
  let positionIcone: string = "droite";
  let cible: string | undefined;

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
  const apparencesDisponibles = [
    { value: "lien", label: "Lien" },
    { value: "bouton", label: "Bouton" },
  ];

  const positionsIconeDisponibles = [
    { value: "sans", label: "Sans" },
    { value: "seule", label: "Seule" },
    { value: "droite", label: "À droite" },
    { value: "gauche", label: "À gauche" },
  ];
</script>

<Hst.Story title="Composants/Lab/Lien">
  <OutilSelecteurTheme />
  <div style="background-color:white; padding:48px;">
    <h3>Lien</h3>
    <Lien
      titre="libellé"
      href="#"
      {apparence}
      {variante}
      {taille}
      {icone}
      {cible}
      {positionIcone}
    />

    <h3>Lien dans du texte</h3>

    <h4>Taille de police 1rem</h4>
    <p style="font-size: 1rem; line-height: 1.5rem; color: #584cfc">
      Lorem ipsum <Lien titre="dolor sit plop" href="#" apparence="lien-texte" {cible} /> amet.
    </p>

    <h4>Taille de police 2rem</h4>
    <p style="font-size: 2rem; line-height: 3rem; color: #18753c">
      Lorem ipsum <Lien titre="dolor sit plop" href="#" apparence="lien-texte" {cible} /> amet.
    </p>

    <h3>Contenu riche</h3>
    <Lien apparence="bouton" taille="lg" variante="primaire">
      <b>En gras</b>-<i>en italique</i>
    </Lien>
  </div>
  <svelte:fragment slot="controls">
    <Hst.Text title="Icône" bind:value={icone} />
    <Hst.Select title="Apparence" options={apparencesDisponibles} bind:value={apparence} />
    <Hst.Select title="Variante" options={variantesDisponibles} bind:value={variante} />
    <Hst.Select title="Taille" options={taillesDisponibles} bind:value={taille} />
    <Hst.Select
      title="Position icône"
      options={positionsIconeDisponibles}
      bind:value={positionIcone}
    />
    <Hst.Text title="Cible" bind:value={cible} />
  </svelte:fragment>
</Hst.Story>
