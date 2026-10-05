<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect, fn, userEvent } from "storybook/test";
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
      slotDefault: {
        name: "default",
        description: "Contenu du panneau déroulant",
        control: false,
        table: { category: "Slots" },
      },
      slotButton: {
        name: "button",
        description: "Bouton déclencheur personnalisé (remplace le DsfrButton généré par défaut)",
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
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-dropdown");
    const shadow = el?.shadowRoot;
    const itemsData = (args as unknown as { items: { label: string }[] }).items ?? [];

    await step("Le bouton déclencheur a aria-expanded à false", async () => {
      const button = shadow?.querySelector("button[aria-expanded]");

      await expect(button?.getAttribute("aria-expanded")).toBe("false");
    });

    await step("Le panneau déroulant contient les items avec les bons labels", async () => {
      const items = shadow?.querySelectorAll(".fr-dropdown__item");

      await expect(items?.length).toBe(itemsData.length);

      for (let i = 0; i < itemsData.length; i++) {
        await expect(items?.[i]?.textContent?.trim()).toContain(itemsData[i].label);
      }
    });

    await step("Le clic ouvre le dropdown", async () => {
      const button = shadow?.querySelector("button[aria-expanded]") as HTMLElement;

      await userEvent.click(button);

      await expect(button?.getAttribute("aria-expanded")).toBe("true");

      await new Promise((resolve) => requestAnimationFrame(resolve));
      const collapse = shadow?.querySelector(".fr-collapse");

      await expect(collapse?.classList.contains("fr-collapse--expanded")).toBe(true);
    });

    await step("Un second clic ferme le dropdown", async () => {
      const button = shadow?.querySelector("button[aria-expanded]") as HTMLElement;

      await userEvent.click(button);

      await expect(button?.getAttribute("aria-expanded")).toBe("false");

      await new Promise((resolve) => requestAnimationFrame(resolve));
      const collapse = shadow?.querySelector(".fr-collapse");

      await expect(collapse?.classList.contains("fr-collapse--expanded")).toBe(false);
    });

    await step("Le clic sur un item émet l'événement itemclicked", async () => {
      const handler = fn();
      el?.addEventListener("itemclicked", handler);

      const button = shadow?.querySelector("button[aria-expanded]") as HTMLElement;

      await userEvent.click(button);
      await new Promise((resolve) => requestAnimationFrame(resolve));

      const firstItemButton = shadow?.querySelector(".fr-dropdown__item button") as HTMLElement;

      firstItemButton.click();

      await expect(handler).toHaveBeenCalledOnce();
      await expect(handler.mock.calls[0][0].detail.index).toBe(0);
      await expect(handler.mock.calls[0][0].detail.item.label).toBe(itemsData[0].label);

      el?.removeEventListener("itemclicked", handler);
    });

    await step("Le clic en dehors ferme le dropdown", async () => {
      const button = shadow?.querySelector("button[aria-expanded]") as HTMLElement;

      await expect(button?.getAttribute("aria-expanded")).toBe("true");

      await userEvent.click(canvasElement);
      await new Promise((resolve) => requestAnimationFrame(resolve));

      await expect(button?.getAttribute("aria-expanded")).toBe("false");

      const collapse = shadow?.querySelector(".fr-collapse");

      await expect(collapse?.classList.contains("fr-collapse--expanded")).toBe(false);
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
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-dropdown");
    const shadow = el?.shadowRoot;

    await step("Le contenu personnalisé est affiché", async () => {
      const customContent = shadow?.querySelector(".fr-dropdown__content--custom");

      await expect(customContent).toBeTruthy();
    });
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
