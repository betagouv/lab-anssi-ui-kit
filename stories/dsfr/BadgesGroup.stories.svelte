<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    badgesGroupArgTypes,
    badgesGroupArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/badge/template/stories/badges-group-arg-types.js";
  import DsfrBadgesGroup from "$lib/dsfr/DsfrBadgesGroup.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Badges Group",
    component: DsfrBadgesGroup,
    argTypes: badgesGroupArgTypes,
    args: badgesGroupArgs,
  });
</script>

<Story name="Défaut" />
