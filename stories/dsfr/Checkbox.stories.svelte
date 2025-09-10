<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    checkboxArgTypes,
    checkboxArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/checkbox/template/stories/checkbox-arg-types.js";
  import DsfrCheckbox from "$lib/dsfr/DsfrCheckbox.svelte";

  // Styles
  import "@gouvfr/dsfr/dist/core/core.min.css";
  import "@gouvfr/dsfr/dist/component/form/form.min.css";
  import "@gouvfr/dsfr/dist/component/checkbox/checkbox.min.css";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Checkbox",
    component: DsfrCheckbox,
    argTypes: checkboxArgTypes,
    args: checkboxArgs,
  });
</script>

<Story name="Défaut" />
