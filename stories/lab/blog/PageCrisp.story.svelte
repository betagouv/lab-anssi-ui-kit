<script lang="ts">
    import type {Hst} from "@histoire/plugin-svelte";
    import PageCrisp from "$lib/lab/blog/PageCrisp.svelte";
    import OutilSelecteurTheme from "../../OutilSelecteurTheme.svelte";

    export let Hst: Hst;

</script>

<Hst.Story title="Composants/Lab/Blog/Page Crisp" icon="uis:web-grid-alt">
  <OutilSelecteurTheme />
  <PageCrisp/>
</Hst.Story>
