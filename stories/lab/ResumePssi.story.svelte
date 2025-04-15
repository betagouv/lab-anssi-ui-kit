<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import ResumePssi from "$lib/lab/ResumePssi.svelte";

  export let Hst: Hst

</script>

<Hst.Story title="Composants/Lab/Résumé de la PSSI" icon="material-symbols:live-help">
  <ResumePssi nomService="MonService"/>
</Hst.Story>

