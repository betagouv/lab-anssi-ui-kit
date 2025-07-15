<script lang="ts">
  import Card from "$lib/Card.svelte";

  let image: string = "https://picsum.photos/496/279";
  let title: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
  let label: string = "Label";
  let tags: string[] = [{ label: "Alpha" }, { label: "Beta" }];
  let externalLink = false;

  export let Hst;
</script>

<Hst.Story title="Composants/Card">
  <div style="padding: 30px;">
    <Card title="{title}" label="{label}" tags="{tags}" link="#" image="{image}"
          externalLink="{externalLink}" />
  </div>

  <svelte:fragment slot="controls">
    <Hst.Text title="Title" bind:value={title} />
    <Hst.Text title="Image" bind:value={image} />
    <Hst.Text title="label" bind:value={label} />
    <Hst.Checkbox title="External link" bind:value={externalLink} />
  </svelte:fragment>
</Hst.Story>