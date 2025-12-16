<script lang="ts">
  interface Props {
    text: string;
    id?: string;
    size?: HighlightSize;
    accent?: Accent;
  }

  let { text, id, size, accent }: Props = $props();
</script>

<dsfr-highlight
  {text}
  {id}
  {size}
  {accent}
></dsfr-highlight>
