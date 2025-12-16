<script lang="ts">
  interface Props {
    id?: string;
    href?: string;
    variant?: "default" | "plus" | "pro";
    markup?: "button" | "a";
    disabled?: boolean;
  }

  let { id, href, variant, markup, disabled }: Props = $props();
</script>

<dsfr-connect
  {id}
  {href}
  {variant}
  {markup}
  {disabled}
></dsfr-connect>
