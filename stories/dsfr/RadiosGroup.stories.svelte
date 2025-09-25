<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    radiosGroupArgTypes,
    radiosGroupArgs,
    getRadiosGroupData,
  } from "@gouvfr/dsfr/src/dsfr/component/radio/template/stories/radios-group-arg-types.js";
  import DsfrRadiosGroup from "$lib/dsfr/DsfrRadiosGroup.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Radios Group",
    component: DsfrRadiosGroup,
    argTypes: radiosGroupArgTypes,
    args: { ...radiosGroupArgs, radios: getRadiosGroupData() },
  });
</script>

<Story name="Défaut" />
