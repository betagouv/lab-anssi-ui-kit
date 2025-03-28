<script lang="ts">
  const variablesCSS = [
    "centre-aide-background-entete",
    "centre-aide-background-bouton",
    "centre-aide-font-color-bouton",
    "centre-aide-border-lien-secondaire",
    "centre-aide-font-color-lien-secondaire",
    "centre-aide-background-hover-lien",
    "centre-aide-background-hover-declencheur"
  ] as const;
  type VariablesCSS = (typeof variablesCSS)[number];

  type Service = "MonServiceSécurisé" | "MonAideCyber" | "MesServicesCyber" | "MonEspaceNIS2";

  const themes: Record<Service, Record<VariablesCSS, string>> = {
    MonServiceSécurisé: {
      "centre-aide-background-entete": "#0279D0",
      "centre-aide-background-bouton": "var(--centre-aide-background-entete)",
      "centre-aide-font-color-bouton": "white",
      "centre-aide-border-lien-secondaire": "var(--centre-aide-background-entete)",
      "centre-aide-font-color-lien-secondaire": "var(--centre-aide-background-entete)",
      "centre-aide-background-hover-lien": "#0C5C98",
      "centre-aide-background-hover-declencheur": "var(--centre-aide-background-hover-lien)"
    },
    MonAideCyber: {
      "centre-aide-background-entete": "#5D2A9D",
      "centre-aide-background-bouton": "var(--centre-aide-background-entete)",
      "centre-aide-font-color-bouton": "white",
      "centre-aide-border-lien-secondaire": "var(--centre-aide-background-entete)",
      "centre-aide-font-color-lien-secondaire": "var(--centre-aide-background-entete)",
      "centre-aide-background-hover-lien": "#9C51D0",
      "centre-aide-background-hover-declencheur": "var(--centre-aide-background-hover-lien)"
    },
    MesServicesCyber: {
      "centre-aide-background-entete": '#0d0c21 url("src/lib/assets/illustrations/tuile-msc.svg") repeat top left / 500px',
      "centre-aide-background-bouton": "#FED980",
      "centre-aide-font-color-bouton": "#0D0C21",
      "centre-aide-border-lien-secondaire": "#0D0C21",
      "centre-aide-font-color-lien-secondaire": "var(--centre-aide-font-color-bouton)",
      "centre-aide-background-hover-lien": "#E4C274",
      "centre-aide-background-hover-declencheur": '#22213C url("src/lib/assets/illustrations/tuile-msc.svg") repeat top left / 500px'
    },
    MonEspaceNIS2: {
      "centre-aide-background-entete": "#272771",
      "centre-aide-background-bouton": "var(--centre-aide-background-entete)",
      "centre-aide-font-color-bouton": "white",
      "centre-aide-border-lien-secondaire": "var(--centre-aide-background-entete)",
      "centre-aide-font-color-lien-secondaire": "var(--centre-aide-background-entete)",
      "centre-aide-background-hover-lien": "#41419F",
      "centre-aide-background-hover-declencheur": "var(--centre-aide-background-hover-lien)"
    },
  };

  let themeSelectionne: Service = "MonServiceSécurisé";

  $: {
    if (themeSelectionne) {
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
