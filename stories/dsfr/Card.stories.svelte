<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    cardArgs,
    cardArgTypes,
  } from "@gouvfr/dsfr/src/dsfr/component/card/template/stories/card-arg-types.js";
  import DsfrCard from "$lib/dsfr/DsfrCard.svelte";
  import Placeholder from "@gouvfr/dsfr/example/img/placeholder.16x9.png";

  console.log("Placeholder :", Placeholder);

  // Styles
  import "@gouvfr/dsfr/dist/core/core.min.css";
  import "@gouvfr/dsfr/dist/component/link/link.min.css";
  import "@gouvfr/dsfr/dist/component/card/card.min.css";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Card",
    component: DsfrCard,
    args: { ...cardArgs, src: Placeholder },
    argTypes: cardArgTypes,
  });
</script>

<Story name="Défaut" />
