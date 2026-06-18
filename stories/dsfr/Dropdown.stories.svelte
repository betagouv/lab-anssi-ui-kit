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
      buttonSize: {
        control: { type: "select" },
        description: "Taille du bouton",
        options: ["sm", "md", "lg"],
      },
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
      onitemclicked: {
        description:
          "Déclenché au clic sur un élément du menu déroulant.<br>" +
          "`detail: { item: DropdownItem, index: number }`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<{ item: DropdownItem, index: number }>" },
        },
        control: false,
      },
      disabled: {
        control: "boolean",
        description: "Désactive le bouton d'ouverture du dropdown",
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
      items: [
        {
          label: "Libellé du bouton",
          icon: "checkbox-line",
          iconPlace: "left",
        },
        { label: "Libellé du bouton", disabled: true },
        { label: "Libellé du bouton" },
      ],
    },
    parameters: {
      actions: { handles: ["itemclicked"] },
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
  <div class="dropdown-wrapper">
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
      items={args.items}
      disabled={args.disabled || undefined}
    >
    </dsfr-dropdown>
  </div>
{/snippet}

<Story name="Buttons List" args={{ contentType: "buttons" }} />

<Story
  name="Links List"
  args={{
    id: "dropdown-links-id",
    collapseId: "dropdown-links-collapse-id",
    contentType: "links",
    items: [
      {
        label: "Lien externe",
        href: "https://www.gouvernement.fr",
        target: "_blank",
        icon: "external-link-line",
        iconPlace: "right",
      },
      {
        label: "Lien interne",
        href: "/",
        target: "_self",
      },
      {
        label: "Lien désactivé",
        href: "/",
        disabled: true,
      },
    ],
  }}
/>

<Story name="Custom">
  {#snippet template(args: Args)}
    <div class="dropdown-wrapper">
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
    </div>
  {/snippet}
</Story>
