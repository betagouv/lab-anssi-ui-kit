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
    "brique-carrousel-bouton-action-texte-couleur",
    "brique-marelle-titre-couleur",
    "brique-marelle-etapes-numero-etape-couleur",
    "brique-marelle-etapes-lien-couleur",
    "brique-marelle-bouton-background",
    "brique-marelle-bouton-background-hover",
    "brique-marelle-bouton-background-active",
    "brique-marelle-bouton-texte",
    "brique-temoignages-titre-couleur",
    "brique-temoignages-icone-couleur",
    "brique-contenu-deux-colonnes-action-bouton-background",
    "brique-contenu-deux-colonnes-action-bouton-background-hover",
    "brique-contenu-deux-colonnes-action-bouton-background-active",
    "brique-contenu-deux-colonnes-action-bouton-texte",
    "brique-presentation-anssi-titre-couleur",
    "brique-presentation-anssi-bouton-background",
    "brique-presentation-anssi-bouton-background-hover",
    "brique-presentation-anssi-bouton-background-active",
    "brique-presentation-anssi-bouton-texte",
    "bandeau-titre-background",
    "couleur-lien",
    "filtre-couleur-primaire",
    "sommaire-actif-indicateur-couleur",
    "sommaire-actif-couleur",
    "sommaire-mobile-fond"
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
      "brique-carrousel-bouton-action-texte-couleur": "#0279D0",
      "brique-marelle-titre-couleur": "#09416A",
      "brique-marelle-etapes-numero-etape-couleur": "#0279D0",
      "brique-marelle-etapes-lien-couleur": "#0279D0",
      "brique-marelle-bouton-background": "#0C5C98",
      "brique-marelle-bouton-background-hover": "#0279D0",
      "brique-marelle-bouton-background-active": "#0279D0",
      "brique-marelle-bouton-texte": "#FFFFFF",
      "brique-temoignages-titre-couleur": "#09416A",
      "brique-temoignages-icone-couleur": "#0279D0",
      "brique-contenu-deux-colonnes-action-bouton-background": "#FFFFFF",
      "brique-contenu-deux-colonnes-action-bouton-background-hover": "#F6F6F6",
      "brique-contenu-deux-colonnes-action-bouton-background-active": "#F6F6F6",
      "brique-contenu-deux-colonnes-action-bouton-texte": "#0279D0",
      "brique-presentation-anssi-titre-couleur": "#09416A",
      "brique-presentation-anssi-bouton-background": "transparent",
      "brique-presentation-anssi-bouton-background-hover": "rgba(0, 0, 0, 0.04)",
      "brique-presentation-anssi-bouton-background-active": "rgba(0, 0, 0, 0.08)",
      "brique-presentation-anssi-bouton-texte": "#0279D0",
      "bandeau-titre-background": "var(--centre-aide-background-entete)",
      "couleur-lien": "#0079d0",
      "filtre-couleur-primaire":
        "brightness(0) invert(29%) sepia(95%) saturate(1420%) hue-rotate(184deg) brightness(98%) contrast(101%)",
      "sommaire-actif-indicateur-couleur": "#0079D0",
      "sommaire-actif-couleur": "#0079D0",
      "sommaire-mobile-fond": "#F1F5F9",
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
      "brique-carrousel-bouton-action-texte-couleur": "#5D2A9D",
      "brique-marelle-titre-couleur": "#5D2A9D",
      "brique-marelle-etapes-numero-etape-couleur": "#9C51D0",
      "brique-marelle-etapes-lien-couleur": "#5D2A9D",
      "brique-marelle-bouton-background": "#5D2A9D",
      "brique-marelle-bouton-background-hover": "#9C51D0",
      "brique-marelle-bouton-background-active": "#9C51D0",
      "brique-marelle-bouton-texte": "#FFFFFF",
      "brique-temoignages-titre-couleur": "#5D2A9D",
      "brique-temoignages-icone-couleur": "#9C51D0",
      "brique-contenu-deux-colonnes-action-bouton-background": "white",
      "brique-contenu-deux-colonnes-action-bouton-background-hover": "#F6F6F6",
      "brique-contenu-deux-colonnes-action-bouton-background-active": "#F6F6F6",
      "brique-contenu-deux-colonnes-action-bouton-texte": "#5D2A9D",
      "brique-presentation-anssi-titre-couleur": "#5D2A9D",
      "brique-presentation-anssi-bouton-background": "#FFFFFF",
      "brique-presentation-anssi-bouton-background-hover": "rgba(0, 0, 0, 0.04)",
      "brique-presentation-anssi-bouton-background-active": "rgba(0, 0, 0, 0.08)",
      "brique-presentation-anssi-bouton-texte": "#5D2A9D",
      "bandeau-titre-background": "var(--centre-aide-background-entete)",
      "couleur-lien": "#5D2A9D",
      "filtre-couleur-primaire":
        "brightness(0) invert(13%) sepia(46%) saturate(5189%) hue-rotate(261deg) brightness(104%) contrast(89%)",
      "sommaire-actif-indicateur-couleur": "#FED980",
      "sommaire-actif-couleur": "#5D2A9D",
      "sommaire-mobile-fond": "#F5F1F9",
    },
    MesServicesCyber: {
      "centre-aide-background-entete":
        '#0d0c21 url("src/lib/assets/illustrations/tuile-msc.svg") repeat top left / 500px',
      "centre-aide-background-bouton": "#FED980",
      "centre-aide-font-color-bouton": "#0D0C21",
      "centre-aide-border-lien-secondaire": "#0D0C21",
      "centre-aide-font-color-lien-secondaire": "var(--centre-aide-font-color-bouton)",
      "centre-aide-background-hover-lien": "#E4C274",
      "centre-aide-background-hover-declencheur":
        '#22213C url("src/lib/assets/illustrations/tuile-msc.svg") repeat top left / 500px',
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
      "brique-carrousel-bouton-action-texte-couleur": "#0D0C21",
      "brique-marelle-titre-couleur": "#0D0C21",
      "brique-marelle-etapes-numero-etape-couleur": "#0D0C21",
      "brique-marelle-etapes-lien-couleur": "#0D0C21",
      "brique-marelle-bouton-background": "#FED980",
      "brique-marelle-bouton-background-hover": "#ECCA79",
      "brique-marelle-bouton-background-active": "#DDBD70",
      "brique-marelle-bouton-texte": "#0D0C21",
      "brique-temoignages-titre-couleur": "#0D0C21",
      "brique-temoignages-icone-couleur": "#FED980",
      "brique-contenu-deux-colonnes-action-bouton-background": "#FED980",
      "brique-contenu-deux-colonnes-action-bouton-background-hover": "#ECCA79",
      "brique-contenu-deux-colonnes-action-bouton-background-active": "#DDBD70",
      "brique-contenu-deux-colonnes-action-bouton-texte": "#0D0C21",
      "brique-presentation-anssi-titre-couleur": "#0D0C21",
      "brique-presentation-anssi-bouton-background": "transparent",
      "brique-presentation-anssi-bouton-background-hover": "rgba(0, 0, 0, 0.04)",
      "brique-presentation-anssi-bouton-background-active": "rgba(0, 0, 0, 0.08)",
      "brique-presentation-anssi-bouton-texte": "#0D0C21",
      "bandeau-titre-background": "var(--centre-aide-background-entete)",
      "couleur-lien": "#0D0C21",
      "filtre-couleur-primaire":
        "brightness(0) invert(3%) sepia(26%) saturate(6797%) hue-rotate(236deg) brightness(105%) contrast(97%)",
      "sommaire-actif-indicateur-couleur": "#FED980",
      "sommaire-actif-couleur": "#0D0C21",
      "sommaire-mobile-fond": "#FFF7DB"
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
      "brique-carrousel-bouton-action-texte-couleur": "#272771",
      "brique-marelle-titre-couleur": "#272771",
      "brique-marelle-etapes-numero-etape-couleur": "#272771",
      "brique-marelle-etapes-lien-couleur": "#272771",
      "brique-marelle-bouton-background": "#272771",
      "brique-marelle-bouton-background-hover": "#41419F",
      "brique-marelle-bouton-background-active": "#41419F",
      "brique-marelle-bouton-texte": "#FFFFFF",
      "brique-temoignages-titre-couleur": "#272771",
      "brique-temoignages-icone-couleur": "#41419F",
      "brique-contenu-deux-colonnes-action-bouton-background": "#FFFFFF",
      "brique-contenu-deux-colonnes-action-bouton-background-hover": "#FFFFFF",
      "brique-contenu-deux-colonnes-action-bouton-background-active": "#FFFFFF",
      "brique-contenu-deux-colonnes-action-bouton-texte": "#272771",
      "brique-presentation-anssi-titre-couleur": "#272771",
      "brique-presentation-anssi-bouton-background": "#FFFFFF",
      "brique-presentation-anssi-bouton-background-hover": "rgba(0, 0, 0, 0.04)",
      "brique-presentation-anssi-bouton-background-active": "rgba(0, 0, 0, 0.08)",
      "brique-presentation-anssi-bouton-texte": "#272771",
      "bandeau-titre-background": "var(--centre-aide-background-entete)",
      "couleur-lien": "#272771",
      "filtre-couleur-primaire":
        "brightness(0) invert(16%) sepia(31%) saturate(3600%) hue-rotate(224deg) brightness(93%) contrast(101%)",
      "sommaire-actif-indicateur-couleur": "#FED980",
      "sommaire-actif-couleur": "#272771",
      "sommaire-mobile-fond": "#F5F5FE"
    },
  };

  const emetEvenement = createEventDispatcher<{ themeSelectionne: Record<VariablesCSS, string> }>();
  export let themeSelectionne: Service = "MonServiceSécurisé";

  onMount(() => {
    emetEvenement("themeSelectionne", themes[themeSelectionne]);
  });

  $: {
    if (themeSelectionne) {
      emetEvenement("themeSelectionne", themes[themeSelectionne]);
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
