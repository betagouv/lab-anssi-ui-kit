<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect } from "storybook/test";
  import { type ComponentProps } from "svelte";

  import DsfrHeader from "$lib/dsfr/DsfrHeader.svelte";
  import "$lib/dsfr/DsfrButton.svelte";

  import webComponentSourceCode from "../../utilitaires/webComponentSource.js";

  const navigationItems = [
    { id: "nav-01", type: "link" as const, label: "Accueil", href: "#" },
    { id: "nav-02", type: "link" as const, label: "Services", href: "#" },
    { id: "nav-03", type: "link" as const, label: "Contact", href: "#" },
  ];

  const { Story } = defineMeta({
    title: "Exemples/DSFR",
    component: DsfrHeader,
    args: {
      brandLogoTitle: "République<br>Française",
      brandService: "Mon Service",
      hasBrandTagline: true,
      brandTagline: "Baseline du service",
      brandLinkHref: "#",
      hasNavigation: true,
      navigationId: "header-nav",
      navigationAriaLabel: "Menu principal",
      navigationItems,
      menuId: "menu-btn",
      menuModalId: "menu-modal",
    },
    parameters: {
      docs: {
        source: {
          transform: webComponentSourceCode("dsfr-header"),
        },
      },
    },
    tags: ["!autodocs", "!test"],
    render: template,
  });

  type Args = ComponentProps<DsfrHeader>;
</script>

{#snippet template(args: Args)}
  <dsfr-header
    brand-logo-title={args.brandLogoTitle}
    brand-service={args.brandService}
    has-brand-tagline={args.hasBrandTagline || undefined}
    brand-tagline={args.brandTagline}
    brand-link-href={args.brandLinkHref}
    has-navigation={args.hasNavigation || undefined}
    has-slot-after-navigation={args.hasSlotAfterNavigation || undefined}
    navigation-id={args.navigationId}
    navigation-aria-label={args.navigationAriaLabel}
    navigation-items={JSON.stringify(args.navigationItems)}
    menu-id={args.menuId}
    menu-modal-id={args.menuModalId}
  >
    {#if args.hasSlotAfterNavigation}
      <dsfr-button slot="afternavigation" label="Se connecter" icon="account-circle-line">
        Se connecter
      </dsfr-button>
    {/if}
  </dsfr-header>
{/snippet}

<Story
  name="Header - Avec slot after navigation"
  args={{ hasSlotAfterNavigation: true }}
  play={async ({ canvasElement, step }) => {
    const header = canvasElement.querySelector("dsfr-header");
    const shadow = header?.shadowRoot;

    await step("La navigation est présente", async () => {
      const nav = shadow?.querySelector("nav");
      await expect(nav).toBeTruthy();
    });

    await step("Le conteneur afternavigation est slotté dans DsfrNavigation", async () => {
      const navShadow = shadow?.querySelector("dsfr-navigation")?.shadowRoot;
      const afterNavItem = navShadow?.querySelector(".fr-nav__item--last");
      await expect(afterNavItem).toBeTruthy();

      const navSlot = afterNavItem?.querySelector(
        "slot[name='afternavigation']",
      ) as HTMLSlotElement | null;
      await expect(navSlot).toBeTruthy();

      const assignedToNav = navSlot!.assignedElements();
      const container = assignedToNav.find((el) =>
        el.classList.contains("last-nav-item-container"),
      );
      await expect(container).toBeTruthy();
    });

    await step("Le bouton Se connecter est slotté dans le conteneur", async () => {
      const navShadow = shadow?.querySelector("dsfr-navigation")?.shadowRoot;
      const container = navShadow
        ?.querySelector(".fr-nav__item--last slot[name='afternavigation']")
        ?.assignedElements()
        ?.find((el) => el.classList.contains("last-nav-item-container")) as HTMLElement | undefined;

      const innerSlot = container?.querySelector("slot[name='afternavigation']") as
        HTMLSlotElement | undefined;
      await expect(innerSlot).toBeTruthy();

      const assignedToContainer = innerSlot!.assignedElements();
      const button = assignedToContainer.find(
        (el) => el.tagName.toLowerCase() === "dsfr-button",
      ) as HTMLElement | undefined;
      await expect(button).toBeTruthy();
      await expect(button!.getAttribute("label")).toBe("Se connecter");
    });
  }}
/>
