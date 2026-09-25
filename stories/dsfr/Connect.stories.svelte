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
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-connect");

    await step("Le composant est rendu avec la classe ProConnect", async () => {
      const connectGroup = el?.shadowRoot?.querySelector(".fr-connect-group");
      await expect(connectGroup).toBeTruthy();
      const button = el?.shadowRoot?.querySelector(".fr-connect");
      await expect(button).toBeTruthy();
      await expect(button?.classList.contains("fr-connect--pro")).toBe(true);
    });

    await step("Le texte de la marque est ProConnect", async () => {
      const brand = el?.shadowRoot?.querySelector(".fr-connect__brand");
      await expect(brand?.textContent).toBe("ProConnect");
      const login = el?.shadowRoot?.querySelector(".fr-connect__login");
      await expect(login?.textContent).toBe("S'identifier avec");
    });

    await step("Le lien d'information est présent", async () => {
      const link = el?.shadowRoot?.querySelector("a.fr-link");
      await expect(link).toBeTruthy();
      await expect(link?.textContent).toContain("ProConnect");
    });
  }}
/>

<Story
  name="France Connect"
  args={{ id: "france-connect", variant: "default" }}
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-connect");

    await step("Le bouton n'a pas la classe pro ou plus", async () => {
      const button = el?.shadowRoot?.querySelector(".fr-connect");
      await expect(button).toBeTruthy();
      await expect(button?.classList.contains("fr-connect--pro")).toBe(false);
      await expect(button?.classList.contains("fr-connect--plus")).toBe(false);
    });

    await step("Le texte de la marque est FranceConnect", async () => {
      const brand = el?.shadowRoot?.querySelector(".fr-connect__brand");
      await expect(brand?.textContent).toBe("FranceConnect");
    });
  }}
/>

<Story
  name="France Connect Plus"
  args={{ id: "france-connect-plus", variant: "plus" }}
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-connect");

    await step("Le bouton a la classe fr-connect--plus", async () => {
      const button = el?.shadowRoot?.querySelector(".fr-connect");
      await expect(button).toBeTruthy();
      await expect(button?.classList.contains("fr-connect--plus")).toBe(true);
    });

    await step("Le texte de la marque est FranceConnect", async () => {
      const brand = el?.shadowRoot?.querySelector(".fr-connect__brand");
      await expect(brand?.textContent).toBe("FranceConnect");
    });

    await step("Le lien mentionne FranceConnect+", async () => {
      const link = el?.shadowRoot?.querySelector("a.fr-link");
      await expect(link?.textContent).toContain("FranceConnect+");
    });
  }}
/>
