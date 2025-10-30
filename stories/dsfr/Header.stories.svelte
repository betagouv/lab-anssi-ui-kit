<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    headerArgTypes,
    headerArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/header/template/stories/header-arg-types";
  import DsfrHeader from "$lib/dsfr/DsfrHeader.svelte";
  import DsfrBadge from "$lib/dsfr/DsfrBadge.svelte";
  import DsfrButtonsGroup from "$lib/dsfr/DsfrButtonsGroup.svelte";

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

<Story name="Avec Tool Links" args={{ hasToolLinks: true }}>
  {#snippet template(args)}
    <DsfrHeader {...args}>
      <!-- Tool Links -->
      <DsfrButtonsGroup
        slot="toolLinks"
        size="sm"
        buttons={[
          {
            label: "Contact",
            preset: "team",
            href: "#",
          },
          {
            label: "Espace recruteur",
            preset: "briefcase",
            href: "#",
          },
          {
            label: "Espace compte",
            preset: "account",
            href: "#",
          },
        ]}
        inline="true"
      />
      <!-- Tool Links (modal) -->
      <DsfrButtonsGroup
        slot="modalToolLinks"
        buttons={[
          {
            label: "Contact",
            preset: "team",
            href: "#",
          },
          {
            label: "Espace recruteur",
            preset: "briefcase",
            href: "#",
          },
          {
            label: "Espace compte",
            preset: "account",
            href: "#",
          },
        ]}
      />
    </DsfrHeader>
  {/snippet}
</Story>

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
