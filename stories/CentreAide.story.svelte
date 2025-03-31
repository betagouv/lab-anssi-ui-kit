<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import { logEvent } from 'histoire/client';

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
    {
      texte: "🎬 Faire une action 'custom'",
      preventDefault: true,
      id: "action-custom"
    },
  ];
  $: chaineLiens = JSON.stringify(liens);

  const gereClicLien = (e: CustomEvent<{target: EventTarget & HTMLAnchorElement}>) => {
    logEvent('lienclique', e.detail);
    if(e.detail.target.id === "action-custom")
      alert("Je fais une action 'custom'")
  };
</script>

<Hst.Story title="Composants/Centre d'aide" icon="material-symbols:live-help">
  <OutilSelecteurTheme />
  <CentreAide {nomService} liens={chaineLiens} on:lienclique={gereClicLien}/>

  <svelte:fragment slot="controls">
    <Hst.Text title="Nom du service" bind:value={nomService} />
    <Hst.Json title="Liens" bind:value={liens}/>
  </svelte:fragment>
</Hst.Story>
