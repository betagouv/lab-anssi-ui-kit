<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    headerArgTypes,
    headerArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/header/template/stories/header-arg-types.js";
  import DsfrHeader from "$lib/dsfr/DsfrHeader.svelte";
  import DsfrBadge from "$lib/dsfr/DsfrBadge.svelte";

  import PlaceholderPortrait from "@gouvfr/dsfr/example/img/placeholder.9x16.png";

  const { toolLinks } = headerArgs;

  const { Story } = defineMeta({
    title: "Composants/dsfr/Header",
    component: DsfrHeader,
    argTypes: headerArgTypes,
    args: {
      ...headerArgs,
      toolLinks: [
        ...toolLinks.buttons,
        {
          classes: ["fr-btn--display"],
          url: "#",
          label: "Paramètres d'affichage",
          markup: "button",
        },
      ],
      brandOperatorSrc: PlaceholderPortrait,
    },
  });
</script>

<Story name="Défaut" />

<Story name="Exemple - Header MQC">
  {#snippet template()}
    <DsfrHeader
      brandService="MesQuestionsCyber"
      hasBrandTagline
      brandTagline="Innovation ANSSI"
      brandLinkHref="https://cyber.gouv.fr/"
      hasBrandOperator
      brandOperatorSrc="https://cyber.gouv.fr/themes/open_theme/logo.svg"
      brandOperatorStyle="width: 66px"
    >
      <!-- Header Badge -->
      <DsfrBadge label="Bêta" accent="green-emeraude" type="accent" slot="headerbadge" />
    </DsfrHeader>
  {/snippet}
</Story>
