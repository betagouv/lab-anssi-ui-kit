<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import DsfrProConnectButton from "$lib/dsfr/DsfrProConnectButton.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/ProConnectButton",
    component: DsfrProConnectButton,
  });
</script>

<Story name="Défaut" />
