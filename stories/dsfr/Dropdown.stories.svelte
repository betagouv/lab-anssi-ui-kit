<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import DsfrDropdown from "$lib/dsfr/DsfrDropdown.svelte";
  // @ts-ignore: Required Import to use this component as webcomponent
  import DsfrToggle from "$lib/dsfr/DsfrToggle.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Dropdown",
    component: DsfrDropdown,
    argTypes: {
      button: {
        description: "Bouton déclencheur personnalisé (remplace le DsfrButton généré par défaut)",
        control: false,
        table: { category: "Slots" },
      },
      default: {
        description: "Contenu du panneau déroulant",
        control: false,
        table: { category: "Slots" },
      },
    },
    args: {
      id: "dropdown-id",
      collapseId: "dropdown-collapse-id",
      buttonTitle: "Choisir une option",
      buttonKind: "tertiary",
      buttonSize: "md",
      buttonIcon: "arrow-down-s-line",
      contentType: "custom",
      align: "left",
    },
    parameters: {
      docs: {
        source: {
          transform: webComponentSourceCode("dsfr-dropdown"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrDropdown>;
</script>

{#snippet template(args: Args)}
  <dsfr-dropdown
    id={args.id}
    collapse-id={args.collapseId}
    button-id={args.buttonId}
    button-title={args.buttonTitle}
    button-kind={args.buttonKind}
    button-size={args.buttonSize}
    button-icon={args.buttonIcon}
    button-icon-place={args.buttonIconPlace}
    content-type={args.contentType}
    align={args.align}
  >
    <dsfr-toggle left label="Masquer de la vitrine des jeux" id="toggleExemple"></dsfr-toggle>
  </dsfr-dropdown>
{/snippet}

<Story name="Défaut" />
