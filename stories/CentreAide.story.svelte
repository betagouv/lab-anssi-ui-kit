<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import CentreAide from "$lib/CentreAide.svelte";
  import OutilSelecteurTheme from "./OutilSelecteurTheme.svelte";

  export let Hst: Hst;

  let nomService = "MonServiceSécurisé";
  let liens = [
    {
      texte: "💬 Nous contacter par chat",
      href: "https://aide.messervices.cyber.gouv.fr/fr/?chat=ouvert",
    },
    {
      texte: "🙌 Consulter la F.A.Q.",
      href: "https://aide.messervices.cyber.gouv.fr/fr",
    },
  ];
  $: chaineLiens = JSON.stringify(liens);
</script>

<Hst.Story title="Composants/Centre d'aide" icon="material-symbols:live-help">
  <OutilSelecteurTheme />
  <CentreAide {nomService} liens={chaineLiens} />

  <svelte:fragment slot="controls">
    <Hst.Text title="Nom du service" bind:value={nomService} />
    <Hst.Json title="Liens" bind:value={liens}/>
  </svelte:fragment>
</Hst.Story>
