<script lang="ts">
  import TagNombre from "$lib/TagNombre.svelte";
  import type { Hst } from "@histoire/plugin-svelte";
  import OutilSelecteurTheme from "./OutilSelecteurTheme.svelte";

  export let Hst: Hst;

  let nombre: number = 42;
  let variante: 'primaire' | 'desactive' = 'primaire';

  const optionsVariante = {
    primaire: 'Primaire',
    desactive: 'Désactivé'
  }
</script>

<Hst.Story title="Composants/Tag nombre" icon="material-symbols:auto-label">
  <OutilSelecteurTheme />
  <TagNombre nombre={0} {variante}/>
  <TagNombre nombre={10} {variante}/>
  <TagNombre nombre={100} {variante}/>
  <TagNombre {nombre} {variante} />

  <svelte:fragment slot="controls">
    <Hst.Number title="Nombre" bind:value={nombre} />
    <Hst.Select title="Variante" bind:value={variante} options={optionsVariante}/>
  </svelte:fragment>
</Hst.Story>
