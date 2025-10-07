<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    translateArgTypes,
    translateArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/translate/template/stories/translate-arg-types.js";
  import DsfrTranslate from "$lib/dsfr/DsfrTranslate.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Translate",
    component: DsfrTranslate,
    argTypes: translateArgTypes,
    args: translateArgs,
  });
</script>

<Story name="Défaut" />
