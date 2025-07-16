<script lang="ts">
  import Badge from "$lib/Badge.svelte";

  let title: string = "Badge";
  let icon: string = "booklet-fill";

  const icons = [
    'booklet-fill',
    'success'
  ]

  export let Hst;
</script>

<Hst.Story title="Composants/Badge">
  <div style="padding: 30px;">
    <Badge title="{title}" icon="{icon}"/>
  </div>

  <svelte:fragment slot="controls">
    <Hst.Text title="Title" bind:value={title} />
    <Hst.Select title="Icon" options={icons} bind:value={icon} />
  </svelte:fragment>
</Hst.Story>