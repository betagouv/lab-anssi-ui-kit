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
  name="Par défaut"
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-translate");
    const shadow = el?.shadowRoot;
    const languagesData =
      (args as unknown as { languages: { locale: string; active?: boolean }[] }).languages ?? [];
    const activeLocale = languagesData.find((l) => l.active)?.locale ?? languagesData[0]?.locale;

    await step("Le bouton affiche la langue active", async () => {
      const button = shadow?.querySelector("button[aria-controls]");

      await expect(button?.textContent?.trim()).toContain(activeLocale?.toUpperCase());
    });

    await step("Le menu est fermé par défaut", async () => {
      const button = shadow?.querySelector("button[aria-controls]");
      const collapse = shadow?.querySelector(".fr-collapse");

      await expect(button?.getAttribute("aria-expanded")).toBe("false");
      await expect(collapse?.classList.contains("fr-collapse--expanded")).toBe(false);
    });

    await step("Le clic sur le bouton ouvre le menu des langues", async () => {
      const button = shadow?.querySelector("button[aria-controls]") as HTMLElement;

      await userEvent.click(button);

      const collapse = shadow?.querySelector(".fr-collapse");

      await expect(button.getAttribute("aria-expanded")).toBe("true");
      await expect(collapse?.classList.contains("fr-collapse--expanded")).toBe(true);
    });

    await step("Le menu contient toutes les langues", async () => {
      const links = shadow?.querySelectorAll(".fr-translate__language");

      await expect(links?.length).toBe(languagesData.length);
    });
  }}
/>

<Story name="Bouton tertiaire" args={{ buttonKind: "tertiary" }} />

<Story name="Bouton tertiaire sans bordure" args={{ buttonKind: "tertiary-no-outline" }} />
