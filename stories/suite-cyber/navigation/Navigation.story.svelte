<script lang="ts">
  import { SuiteCyberNavigation } from "$lib";
  import type { Hst } from "@histoire/plugin-svelte";

  export let Hst: Hst;
  let sourceUtm = "";
</script>

<Hst.Story title="Composants/SuiteCyber/Navigation" icon="healthicons:ui-menu-grid-outline">
  <div>
    <header>
      <SuiteCyberNavigation {sourceUtm} />
      <span>Jeanne Dupond</span>
    </header>
    <main><h1>Bienvenue</h1></main>
  </div>

  <svelte:fragment slot="controls">
    <Hst.Text bind:value={sourceUtm} title="Source UTM (Tracking)" />
  </svelte:fragment>
</Hst.Story>

<style lang="scss">
  div {
    background-color: white;
  }
  header {
    display: flex;
    gap: 10px;
    justify-content: end;
    padding: 16px;
    align-items: center;
    border-bottom: 1px solid #e5e5e5;
    span {
      font-family: "Marianne";
    }
  }
  main {
    height: 800px;
  }
</style>
