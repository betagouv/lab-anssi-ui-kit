<script lang="ts">
    import type {Hst} from "@histoire/plugin-svelte";
    import Icone from "$lib/lab/Icone.svelte";

    export let Hst: Hst;

    let nom: string = "leaf-line";
</script>

<Hst.Story title="Composants/Lab/Icone">
  <div style="background-color:white; padding:48px;">
    <h3>Icône</h3>
    <Icone {nom}/>
    <h4>Avec une couleur</h4>
    <span style="color:red">
      <Icone {nom}/>
    </span>
  </div>
  <svelte:fragment slot="controls">
    <Hst.Text title="Nom" bind:value={nom}/>
  </svelte:fragment>
</Hst.Story>
