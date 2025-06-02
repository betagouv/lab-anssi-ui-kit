<script lang="ts">
  import TagNombre from "$lib/TagNombre.svelte";
  import type { Hst } from "@histoire/plugin-svelte";
  import OutilSelecteurTheme from "./OutilSelecteurTheme.svelte";

  export let Hst: Hst;

  let nombre: number = 42;
</script>

<Hst.Story title="Composants/Tag nombre" icon="material-symbols:auto-label">
  <OutilSelecteurTheme />
  <TagNombre nombre={0} />
  <TagNombre nombre={10} />
  <TagNombre nombre={100} />
  <TagNombre {nombre} />

  <svelte:fragment slot="controls">
    <Hst.Number title="Nombre" bind:value={nombre} />
  </svelte:fragment>
</Hst.Story>
