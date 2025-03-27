<script lang="ts">
  import { SuiteCyberNavigation } from "$lib";
  import type { Hst } from "@histoire/plugin-svelte";

  export let Hst: Hst;
</script>

<Hst.Story title="Composants/SuiteCyber/Navigation" icon="healthicons:ui-menu-grid-outline">
  <div>
    <header>
      <SuiteCyberNavigation />
      <span>Jeanne Dupond</span>
    </header>
    <main><h1>Bienvenue</h1></main>
  </div>
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
