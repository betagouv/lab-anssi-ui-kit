<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    inputArgTypes,
    inputArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/input/template/stories/input-arg-types.js";
  import DsfrTextarea from "$lib/dsfr/DsfrTextarea.svelte";

  const args = { ...inputArgs, rows: 6 };

  const { Story } = defineMeta({
    title: "Composants/dsfr/Textarea",
    component: DsfrTextarea,
    argTypes: inputArgTypes,
    args,
  });
</script>

<Story name="Défaut" />
