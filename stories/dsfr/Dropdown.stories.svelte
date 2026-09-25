<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect, userEvent } from "storybook/test";
  import { type ComponentProps } from "svelte";

  import DsfrDropdown from "$lib/dsfr/DsfrDropdown.svelte";
  import "$lib/dsfr/DsfrToggle.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Dropdown",
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

<Story
  name="Buttons List"
  args={{ contentType: "buttons" }}
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-dropdown");

    await step("Le dropdown est rendu", async () => {
      const dropdown = el?.shadowRoot?.querySelector(".fr-dropdown");
      await expect(dropdown).toBeTruthy();
    });

    await step("Le bouton déclencheur est présent", async () => {
      const button = el?.shadowRoot?.querySelector("button[aria-expanded]");
      await expect(button).toBeTruthy();
      await expect(button?.getAttribute("aria-expanded")).toBe("false");
    });

    await step("Le panneau déroulant contient les items", async () => {
      const items = el?.shadowRoot?.querySelectorAll(".fr-dropdown__item");
      await expect(items?.length).toBe(3);
    });

    await step("Le clic ouvre le dropdown", async () => {
      const button = el?.shadowRoot?.querySelector("button[aria-expanded]") as HTMLElement;
      await userEvent.click(button);
      await expect(button?.getAttribute("aria-expanded")).toBe("true");
    });

    await step("Un second clic ferme le dropdown", async () => {
      const button = el?.shadowRoot?.querySelector("button[aria-expanded]") as HTMLElement;
      await userEvent.click(button);
      await expect(button?.getAttribute("aria-expanded")).toBe("false");
    });
  }}
/>

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

<Story
  name="Custom"
  play={async ({ canvasElement }) => {
    const el = canvasElement.querySelector("dsfr-dropdown");
    const customContent = el?.shadowRoot?.querySelector(".fr-dropdown__content--custom");
    await expect(customContent).toBeTruthy();
  }}
>
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
