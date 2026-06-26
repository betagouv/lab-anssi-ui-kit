<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    searchArgTypes,
    searchArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/search/template/stories/search-arg-types.js";

  import DsfrSearch from "$lib/dsfr/DsfrSearch.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Search",
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

<Story name="Défaut" />
