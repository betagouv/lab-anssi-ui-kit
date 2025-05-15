<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";


  const variablesCSS = [
    "centre-aide-background-entete",
    "centre-aide-background-bouton",
    "centre-aide-font-color-bouton",
    "centre-aide-border-lien-secondaire",
    "centre-aide-font-color-lien-secondaire",
    "centre-aide-background-hover-lien",
    "centre-aide-background-hover-declencheur",
    "brique-background-primaire",
    "brique-hero-bouton-gauche-background",
    "brique-hero-bouton-gauche-background-hover",
    "brique-hero-bouton-gauche-background-active",
    "brique-hero-bouton-gauche-texte",
    "brique-hero-bouton-droite-background",
    "brique-hero-bouton-droite-background-hover",
    "brique-hero-bouton-droite-background-active",
    "brique-hero-bouton-droite-texte",
    "titre-couleur-primaire",
    "brique-background-secondaire",
  ] as const;
  type VariablesCSS = (typeof variablesCSS)[number];

  type Service = "MonServiceSécurisé" | "MonAideCyber" | "MesServicesCyber" | "MonEspaceNIS2";

  const themes: Record<Service, Record<VariablesCSS, string>> = {
    MonServiceSécurisé: {
      "centre-aide-background-entete": "#0279D0",
      "centre-aide-background-bouton": "var(--centre-aide-background-entete)",
      "centre-aide-font-color-bouton": "#FFFFFF",
      "centre-aide-border-lien-secondaire": "var(--centre-aide-background-entete)",
      "centre-aide-font-color-lien-secondaire": "var(--centre-aide-background-entete)",
      "centre-aide-background-hover-lien": "#0C5C98",
      "centre-aide-background-hover-declencheur": "var(--centre-aide-background-hover-lien)",
      "brique-background-primaire": "var(--centre-aide-background-entete)",
      "brique-background-secondaire": "transparent",
      "brique-hero-bouton-gauche-background": "#FFFFFF",
      "brique-hero-bouton-gauche-background-hover": "#F6F6F6",
      "brique-hero-bouton-gauche-background-active": "#F6F6F6",
      "brique-hero-bouton-gauche-texte": "#0279D0",
      "brique-hero-bouton-droite-background": "transparent",
      "brique-hero-bouton-droite-background-hover": "rgba(255, 255, 255, 0.08)",
      "brique-hero-bouton-droite-background-active": "rgba(255, 255, 255, 0.16)",
      "brique-hero-bouton-droite-texte": "#FFFFFF",
      "titre-couleur-primaire": "#09416A",
    },
    MonAideCyber: {
      "centre-aide-background-entete": "#5D2A9D",
      "centre-aide-background-bouton": "var(--centre-aide-background-entete)",
      "centre-aide-font-color-bouton": "white",
      "centre-aide-border-lien-secondaire": "var(--centre-aide-background-entete)",
      "centre-aide-font-color-lien-secondaire": "var(--centre-aide-background-entete)",
      "centre-aide-background-hover-lien": "#9C51D0",
      "centre-aide-background-hover-declencheur": "var(--centre-aide-background-hover-lien)",
      "brique-background-primaire": "var(--centre-aide-background-entete)",
      "brique-background-secondaire": "#F5F1F9",
      "brique-hero-bouton-gauche-background": "white",
      "brique-hero-bouton-gauche-background-hover": "#F6F6F6",
      "brique-hero-bouton-gauche-background-active": "#F6F6F6",
      "brique-hero-bouton-gauche-texte": "#5D2A9D",
      "brique-hero-bouton-droite-background": "transparent",
      "brique-hero-bouton-droite-background-hover": "rgba(255, 255, 255, 0.08)",
      "brique-hero-bouton-droite-background-active": "rgba(255, 255, 255, 0.16)",
      "brique-hero-bouton-droite-texte": "white",
      "titre-couleur-primaire": "#5D2A9D",
    },
    MesServicesCyber: {
      "centre-aide-background-entete": '#0d0c21 url("src/lib/assets/illustrations/tuile-msc.svg") repeat top left / 500px',
      "centre-aide-background-bouton": "#FED980",
      "centre-aide-font-color-bouton": "#0D0C21",
      "centre-aide-border-lien-secondaire": "#0D0C21",
      "centre-aide-font-color-lien-secondaire": "var(--centre-aide-font-color-bouton)",
      "centre-aide-background-hover-lien": "#E4C274",
      "centre-aide-background-hover-declencheur": '#22213C url("src/lib/assets/illustrations/tuile-msc.svg") repeat top left / 500px',
      "brique-background-primaire": "var(--centre-aide-background-entete)",
      "brique-background-secondaire": "transparent",
      "brique-hero-bouton-gauche-background": "#FED980",
      "brique-hero-bouton-gauche-background-hover": "#ECCA79",
      "brique-hero-bouton-gauche-background-active": "#DDBD70",
      "brique-hero-bouton-gauche-texte": "#0D0C21",
      "brique-hero-bouton-droite-background": "transparent",
      "brique-hero-bouton-droite-background-hover": "rgba(255, 255, 255, 0.08)",
      "brique-hero-bouton-droite-background-active": "rgba(255, 255, 255, 0.16)",
      "brique-hero-bouton-droite-texte": "#FFFFFF",
      "titre-couleur-primaire": "#0D0C21",
    },
    MonEspaceNIS2: {
      "centre-aide-background-entete": "#272771",
      "centre-aide-background-bouton": "var(--centre-aide-background-entete)",
      "centre-aide-font-color-bouton": "white",
      "centre-aide-border-lien-secondaire": "var(--centre-aide-background-entete)",
      "centre-aide-font-color-lien-secondaire": "var(--centre-aide-background-entete)",
      "centre-aide-background-hover-lien": "#41419F",
      "centre-aide-background-hover-declencheur": "var(--centre-aide-background-hover-lien)",
      "brique-background-primaire": "var(--centre-aide-background-entete)",
      "brique-background-secondaire": "transparent",
      "brique-hero-bouton-gauche-background": "#FFFFFF",
      "brique-hero-bouton-gauche-background-hover": "#FFFFFF",
      "brique-hero-bouton-gauche-background-active": "#FFFFFF",
      "brique-hero-bouton-gauche-texte": "#272771",
      "brique-hero-bouton-droite-background": "transparent",
      "brique-hero-bouton-droite-background-hover": "rgba(255, 255, 255, 0.08)",
      "brique-hero-bouton-droite-background-active": "rgba(255, 255, 255, 0.16)",
      "brique-hero-bouton-droite-texte": "#FFFFFF",
      "titre-couleur-primaire": "#272771",
    },
  };

  const emetEvenement = createEventDispatcher<{ themeSelectionne: Record<VariablesCSS, string> }>();
  export let themeSelectionne: Service = "MonServiceSécurisé";

  onMount(() => {
    emetEvenement('themeSelectionne', themes[themeSelectionne]);
  });

  $: {
    if (themeSelectionne) {
      emetEvenement('themeSelectionne', themes[themeSelectionne]);
      const root: HTMLElement = document.querySelector(":root");
      for (const nomVariable in themes[themeSelectionne]) {
        root.style.setProperty(`--${nomVariable}`, themes[themeSelectionne][nomVariable]);
      }
    }
  }
</script>

<label for="select-theme">Thème</label>
<select bind:value={themeSelectionne} id="select-theme">
  {#each Object.keys(themes) as theme}
    <option value={theme}>{theme}</option>
  {/each}
</select>

<style lang="scss">
  label {
    font-family: Marianne;
    font-weight: bold;
    margin-right: 16px;
  }

  select {
    font-family: Marianne;
    padding: 8px 16px;
    font-weight: 500;
    background: none;
    border: none;
    border-bottom: 2px solid #584cfc;
    cursor: pointer;
  }
</style>
