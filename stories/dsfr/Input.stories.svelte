<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    inputArgTypes,
    inputArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/input/template/stories/input-arg-types.js";
  import DsfrInput from "$lib/dsfr/DsfrInput.svelte";

  // Styles
  import "@gouvfr/dsfr/dist/core/core.min.css";
  import "@gouvfr/dsfr/dist/component/form/form.min.css";
  import "@gouvfr/dsfr/dist/component/input/input.min.css";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Input",
    component: DsfrInput,
    argTypes: inputArgTypes,
    args: inputArgs,
  });
</script>

<Story name="Défaut" />
