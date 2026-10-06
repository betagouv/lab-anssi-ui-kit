<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect, fn, userEvent } from "storybook/test";
  import { type ComponentProps } from "svelte";

  import {
    searchArgTypes,
    searchArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/search/template/stories/search-arg-types.js";

  import DsfrSearch from "$lib/dsfr/DsfrSearch.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Search",
    component: DsfrSearch,
    argTypes: {
      ...searchArgTypes,
      onvaluechanged: {
        description:
          "Déclenché lors du changement de valeur du champ de recherche.<br>" + "`detail: string`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<string>" },
        },
        control: false,
      },
      labelSize: {
        control: "select",
        options: [undefined, "xs", "sm", "md", "lg", "xl", "lead"],
        description:
          "Applique une classe utilitaire de taille de texte DSFR (fr-text--xs à fr-text--xl, fr-text--lead) sur le label",
      },
      labelWeight: {
        control: "select",
        options: [undefined, "light", "regular", "bold", "heavy"],
        description:
          "Applique une classe utilitaire de graisse DSFR (fr-text--light à fr-text--heavy) sur le label",
      },
      onsearch: {
        description: "Déclenché lors de la soumission de la recherche.<br>" + "`detail: string`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<string>" },
        },
        control: false,
      },
    },
    args: searchArgs,
    parameters: {
      actions: { handles: ["valuechanged", "search"] },
      docs: {
        description: {
          component:
            "La barre de recherche est un système de navigation qui permet à l'utilisateur d’accéder rapidement à un contenu en lançant une recherche sur un mot clé ou une expression.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/barre-de-recherche)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-search"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrSearch>;
</script>

{#snippet template(args: Args)}
  <dsfr-search
    input-id={args.inputId}
    input-label={args.inputLabel}
    button-label={args.buttonLabel}
    button-title={args.buttonTitle}
    size={args.size}
    placeholder={args.placeholder}
    value={args.value}
    disabled={args.disabled || undefined}
    form={args.form}
    maxlength={args.maxlength}
    minlength={args.minlength}
    name={args.name}
    pattern={args.pattern}
    readonly={args.readonly || undefined}
    required={args.required || undefined}
    label-size={args.labelSize}
    label-weight={args.labelWeight}
  ></dsfr-search>
{/snippet}

<Story
  name="Par défaut"
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-search");
    const shadow = el?.shadowRoot;

    await step("La saisie met à jour la valeur et émet l'événement valuechanged", async () => {
      const handler = fn();
      el?.addEventListener("valuechanged", handler);

      const input = shadow?.querySelector("input.fr-input") as HTMLInputElement;

      await userEvent.type(input, "test recherche");

      await expect(input.value).toBe("test recherche");
      await expect(handler).toHaveBeenCalled();
      await expect(handler.mock.calls.at(-1)?.[0].detail).toBe("test recherche");

      el?.removeEventListener("valuechanged", handler);
    });

    await step("Le clic sur le bouton émet l'événement search", async () => {
      const handler = fn();
      el?.addEventListener("search", handler);

      const button = shadow?.querySelector("button.fr-btn") as HTMLButtonElement;

      await userEvent.click(button);

      await expect(handler).toHaveBeenCalledOnce();
      await expect(handler.mock.calls.at(-1)?.[0].detail).toBe("test recherche");

      el?.removeEventListener("search", handler);
    });
  }}
/>

<Story
  name="Taille LG"
  args={{
    size: "lg",
  }}
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-search");
    const shadow = el?.shadowRoot;
    const size = (args as unknown as { size: string }).size;

    await step("La barre de recherche a la classe de taille correspondante", async () => {
      const searchBar = shadow?.querySelector(".fr-search-bar");

      await expect(searchBar?.classList.contains(`fr-search-bar--${size}`)).toBe(true);
    });
  }}
/>
