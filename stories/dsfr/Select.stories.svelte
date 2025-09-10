<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    selectArgTypes,
    selectArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/select/template/stories/select-arg-types.js";
  import DsfrSelect from "$lib/dsfr/DsfrSelect.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Select",
    component: DsfrSelect,
    argTypes: selectArgTypes,
    args: selectArgs,
  });
</script>

<Story name="Défaut" />
