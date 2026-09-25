<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect, userEvent } from "storybook/test";
  import { type ComponentProps } from "svelte";

  import {
    translateArgTypes,
    translateArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/translate/template/stories/translate-arg-types.js";

  import DsfrTranslate from "$lib/dsfr/DsfrTranslate.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Translate",
    component: DsfrTranslate,
    argTypes: translateArgTypes,
    args: translateArgs,
    parameters: {
      docs: {
        description: {
          component:
            "Le sélecteur de langue permet à l’utilisateur de choisir la langue dans laquelle est affiché le contenu du site, si celui-ci est disponible en plusieurs langues.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/selecteur-de-langue)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-translate"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrTranslate>;
</script>

{#snippet template(args: Args)}
  <dsfr-translate
    id={args.id}
    collapse-id={args.collapseId}
    no-border={args.noBorder || undefined}
    languages={args.languages}
    button-id={args.buttonId}
    button-title={args.buttonTitle}
    button-kind={args.buttonKind}
  ></dsfr-translate>
{/snippet}

<Story
  name="Défaut"
  play={async ({ canvasElement, step }) => {
    const dsfrTranslate = canvasElement.querySelector("dsfr-translate");

    await step("Le composant est rendu avec le bouton de langue active", async () => {
      const translate = dsfrTranslate?.shadowRoot?.querySelector(".fr-translate");
      await expect(translate).toBeTruthy();

      const button = dsfrTranslate?.shadowRoot?.querySelector("button[aria-controls]");
      await expect(button).toBeTruthy();
      await expect(button?.textContent).toContain("FR");
    });

    await step("Le menu est fermé par défaut", async () => {
      const collapse = dsfrTranslate?.shadowRoot?.querySelector(".fr-collapse");
      await expect(collapse?.classList.contains("fr-collapse--expanded")).toBe(false);
    });

    await step("Le clic sur le bouton ouvre le menu des langues", async () => {
      const button = dsfrTranslate?.shadowRoot?.querySelector(
        "button[aria-controls]",
      ) as HTMLElement;
      await userEvent.click(button);
      const collapse = dsfrTranslate?.shadowRoot?.querySelector(".fr-collapse");
      await expect(collapse?.classList.contains("fr-collapse--expanded")).toBe(true);
    });

    await step("Le menu contient les 4 langues", async () => {
      const links = dsfrTranslate?.shadowRoot?.querySelectorAll(".fr-translate__language");
      await expect(links?.length).toBe(4);
    });
  }}
/>

<Story name="Bouton tertiaire" args={{ buttonKind: "tertiary" }} />

<Story name="Bouton tertiaire sans bordure" args={{ buttonKind: "tertiary-no-outline" }} />
