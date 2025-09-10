<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    radioArgTypes,
    radioArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/radio/template/stories/radio-arg-types.js";
  import DsfrRadio from "$lib/dsfr/DsfrRadio.svelte";

  // Styles
  import "@gouvfr/dsfr/dist/core/core.min.css";
  import "@gouvfr/dsfr/dist/component/radio/radio.min.css";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Radio",
    component: DsfrRadio,
    argTypes: radioArgTypes,
    args: radioArgs,
  });
</script>

<Story name="Défaut" />
