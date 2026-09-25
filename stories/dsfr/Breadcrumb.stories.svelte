<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect, userEvent } from "storybook/test";
  import { type ComponentProps } from "svelte";

  import {
    breadcrumbArgTypes,
    breadcrumbArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/breadcrumb/template/stories/breadcrumb-arg-types.js";

  import DsfrBreadcrumb from "$lib/dsfr/DsfrBreadcrumb.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Breadcrumb",
    component: DsfrBreadcrumb,
    argTypes: breadcrumbArgTypes,
    args: {
      ...breadcrumbArgs,
      buttonAriaLabel: "vous êtes ici :",
      buttonLabel: "Voir le fil d'Ariane",
    },
    parameters: {
      backgrounds: {
        options: {
          blueFranceLab: { name: "Blue France Lab", value: "#000091" },
        },
      },
      docs: {
        description: {
          component:
            "Le fil d’Ariane est un système de navigation secondaire qui permet à l’utilisateur de se situer sur le site qu’il consulte.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/fil-d-ariane)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-breadcrumb"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrBreadcrumb>;
</script>

{#snippet template(args: Args)}
  <dsfr-breadcrumb
    id={args.id}
    segments={args.segments}
    button-aria-label={args.buttonAriaLabel}
    button-label={args.buttonLabel}
    inverse={args.inverse || undefined}
    markup={args.markup}
    has-margin-variant={args.hasMarginVariant || undefined}
  ></dsfr-breadcrumb>
{/snippet}

<Story
  name="Défaut"
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-breadcrumb");
    const shadow = el?.shadowRoot;

    await step("Le fil d'Ariane est rendu avec le rôle navigation", async () => {
      const nav = shadow?.querySelector("nav[role='navigation']");
      await expect(nav).toBeTruthy();
    });

    await step("La liste des segments est rendue", async () => {
      const list = shadow?.querySelector("ol.fr-breadcrumb__list");
      await expect(list).toBeTruthy();
      const items = shadow?.querySelectorAll("ol.fr-breadcrumb__list li");
      await expect(items?.length).toBeGreaterThan(0);
    });

    await step("Le dernier segment a aria-current='page'", async () => {
      const links = shadow?.querySelectorAll(".fr-breadcrumb__link");
      const lastLink = links?.[links.length - 1];
      await expect(lastLink?.getAttribute("aria-current")).toBe("page");
    });

    await step("Cliquer sur le bouton ouvre le collapse", async () => {
      const button = shadow?.querySelector("button.fr-breadcrumb__button") as HTMLElement;
      await expect(button).toBeTruthy();
      await userEvent.click(button);
      await expect(button?.getAttribute("aria-expanded")).toBe("true");

      const collapse = shadow?.querySelector(".fr-collapse");
      await expect(collapse?.classList.contains("fr-collapse--expanded")).toBe(true);
    });
  }}
/>

<Story
  name="Inverse"
  args={{ inverse: true }}
  globals={{
    backgrounds: { value: "blueFranceLab" },
  }}
/>
