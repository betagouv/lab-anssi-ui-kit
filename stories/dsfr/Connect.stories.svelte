<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect } from "storybook/test";
  import { type ComponentProps } from "svelte";

  import DsfrConnect from "$lib/dsfr/DsfrConnect.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Connect Button",
    component: DsfrConnect,
    argTypes: {
      id: {
        control: "text",
        description: "Attribut id du bouton franceConnect",
        type: {
          value: "string",
        },
        table: { category: "attributes" },
      },
      variant: {
        control: {
          type: "select",
          labels: {
            default: "FranceConnect",
            // agent: 'AgentConnect',
            plus: "FranceConnect+",
            pro: "ProConnect",
          },
        },
        description: "Variation de bouton franceConnect",
        options: ["default", "plus", "pro"],
      },
      markup: {
        control: { type: "select" },
        description: "Type de balise HTML",
        options: ["button", "a"],
      },
      disabled: {
        control: "boolean",
        description: "Désactive le bouton",
        type: {
          value: "boolean",
        },
      },
    },
    args: {
      variant: "pro",
      markup: "button",
      disabled: false,
      id: "france-connect",
      href: "#",
    },
    parameters: {
      docs: {
        description: {
          component:
            "[Voir la documentation du composant](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/bouton-franceconnect)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-connect"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrConnect>;
</script>

{#snippet template(args: Args)}
  <dsfr-connect
    id={args.id}
    href={args.href}
    variant={args.variant}
    markup={args.markup}
    disabled={args.disabled || undefined}
  ></dsfr-connect>
{/snippet}

<Story
  name="Défaut (Pro Connect)"
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-connect");
    const shadow = el?.shadowRoot;
    const variant = ((args as unknown as { variant?: string }).variant ?? "pro") as
      "default" | "plus" | "pro";
    const brands: Record<string, { label: string; name: string }> = {
      pro: { label: "ProConnect", name: "ProConnect" },
      plus: { label: "FranceConnect", name: "FranceConnect+" },
      default: { label: "FranceConnect", name: "FranceConnect" },
    };
    const expectedBrand = brands[variant];

    await step("Le bouton a la classe de variante correspondante", async () => {
      const button = shadow?.querySelector(".fr-connect");

      if (variant !== "default") {
        await expect(button?.classList.contains(`fr-connect--${variant}`)).toBe(true);
      } else {
        await expect(button?.classList.contains("fr-connect--pro")).toBe(false);
        await expect(button?.classList.contains("fr-connect--plus")).toBe(false);
      }
    });

    await step("Le texte de la marque correspond à la variante", async () => {
      const brand = shadow?.querySelector(".fr-connect__brand");

      await expect(brand?.textContent?.trim()).toBe(expectedBrand.label);

      const login = shadow?.querySelector(".fr-connect__login");

      await expect(login?.textContent?.trim()).toBe("S'identifier avec");
    });

    await step("Le lien d'information est présent", async () => {
      const link = shadow?.querySelector("a.fr-link");

      await expect(link).toBeTruthy();
      await expect(link?.textContent?.trim()).toContain(expectedBrand.name);
    });
  }}
/>

<Story
  name="France Connect"
  args={{ id: "france-connect", variant: "default" }}
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-connect");
    const shadow = el?.shadowRoot;

    await step("Le bouton n'a pas la classe pro ou plus", async () => {
      const button = shadow?.querySelector(".fr-connect");

      await expect(button?.classList.contains("fr-connect--pro")).toBe(false);
      await expect(button?.classList.contains("fr-connect--plus")).toBe(false);
    });

    await step("Le texte de la marque est FranceConnect", async () => {
      const brand = shadow?.querySelector(".fr-connect__brand");

      await expect(brand?.textContent?.trim()).toBe("FranceConnect");
    });
  }}
/>

<Story
  name="France Connect Plus"
  args={{ id: "france-connect-plus", variant: "plus" }}
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-connect");
    const shadow = el?.shadowRoot;

    await step("Le bouton a la classe fr-connect--plus", async () => {
      const button = shadow?.querySelector(".fr-connect");

      await expect(button?.classList.contains("fr-connect--plus")).toBe(true);
    });

    await step("Le texte de la marque est FranceConnect", async () => {
      const brand = shadow?.querySelector(".fr-connect__brand");

      await expect(brand?.textContent?.trim()).toBe("FranceConnect");
    });

    await step("Le lien mentionne FranceConnect+", async () => {
      const link = shadow?.querySelector("a.fr-link");

      await expect(link?.textContent?.trim()).toContain("FranceConnect+");
    });
  }}
/>
