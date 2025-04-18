<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  //@ts-ignore
  import stylesCSS from "../src/variables.scss?raw"; // On récupère ici le contenu "raw" de notre feuille de style
  import OutilSelecteurTheme from "./OutilSelecteurTheme.svelte";
  import IconeCopier from "./icones/IconeCopier.svelte";

  export let Hst: Hst;

  const variablesCSS = [...stylesCSS.matchAll(/var\((--.*)\);/gm)];
  let themeSelectionne;
</script>

<Hst.Story title="Documentation" icon="oui:documentation">
  <h1>Documentation de l'UI Kit</h1>
  <p>Ceci est la documentation technique de l'UI Kit.</p>
  {#if variablesCSS}
    <div class="conteneur-titre">
      <h2>Variables CSS utilisées dans l’UI kit</h2>
      <i>Celles qui n’ont pas de valeur par défaut sont obligatoires</i>
    </div>
    <div class="conteneur-style">
      <pre>{":root {"}</pre>
      {#each variablesCSS as [_, variable] }
        <pre>    {variable}: "..."</pre>
      {/each}
      <pre>{"}"}</pre>
    </div>
  {/if}

  <hr style="margin: 32px 0;"/>

  <h2>Centre d’Aide : obtenir mon thème</h2>
  <div class="conteneur-titre">
    <OutilSelecteurTheme on:themeSelectionne={(e) =>{  themeSelectionne = e.detail; }}/>
    <button on:click={() => navigator.clipboard.writeText(document.getElementById('style-theme-selectionne').textContent)} title="Copier">
      <IconeCopier />
    </button>
  </div>
  {#if themeSelectionne}
    <div class="conteneur-style" id="style-theme-selectionne">
      <pre>{":root {\n"}</pre>
      {#each Object.entries(themeSelectionne) as [cle, valeur]}
        <pre>{`    --${cle}: ${valeur};\n`}</pre>
      {/each}
      <pre>{"}\n"}</pre>
    </div>
  {/if}
</Hst.Story>

<style>
  h1,
  h2,
  p {
    font-family: Marianne;
  }

  .conteneur-titre {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    width: 20px;
    height: 20px;
    transition: transform 0.2s ease-in-out;
    padding: 0;
  }

  button:hover {
    filter: invert(37%) sepia(91%) saturate(6221%) hue-rotate(240deg) brightness(106%) contrast(98%);
  }

  button:active {
    transform: scaleX(-1);
  }

  .conteneur-style {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 32px;
  }

  pre {
    margin: 0;
  }
</style>
