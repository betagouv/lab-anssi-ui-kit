<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import Header from "$lib/lab/Header.svelte";
  import OutilSelecteurTheme from "../OutilSelecteurTheme.svelte";
  import { srcAsset } from "$lib/assets/assets.js";
  export let Hst: Hst;
</script>

<Hst.Story title="Composants/Lab/Header">
  <OutilSelecteurTheme />
  <Header
    service={{
      titre: "DemainSpécialisteCyber",
      soustitre: "Innovation ANSSI",
      logo: srcAsset("/illustrations/logo-anssi.svg"),
    }}
    quickAccess={{
      icone: "external-link-line",
      label: "Espace enseignant",
      lien: "https://www.google.com",
    }}
    menu={[
      {
        label: "Accueil",
        lien: "https://www.google.com",
      },
      {
        label: "Explorer les ressources",
        lien: "https://www.google.com",
      },
      {
        label: "Sélection pour les enseignants",
        lien: "https://www.google.com",
        active: true,
      },
      {
        label: "Sélection pour les élèves",
        lien: "https://www.google.com",
      },
      {
        label: "Découvrir CyberEnJeux",
        lien: "https://www.google.com",
      },
    ]}
  />
</Hst.Story>
