<script lang="ts">
  interface Props {
    title: string;
    size?: LogoSize;
  }

  let { title, size }: Props = $props();
</script>

<dsfr-logo
  {title}
  {size}
></dsfr-logo>
