<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    inputArgTypes,
    inputArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/input/template/stories/input-arg-types.js";

  import DsfrTextarea from "$lib/dsfr/DsfrTextarea.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const args = { ...inputArgs, rows: 6 };

  const { Story } = defineMeta({
    title: "Composants/dsfr/Textarea",
    component: DsfrTextarea,
    argTypes: {
      ...inputArgTypes,
      status: {
        control: {
          type: "select",
          labels: {
            default: "Défaut",
            valid: "Succès",
            error: "Erreur",
            info: "Information",
          },
        },
        description: "Statut du message",
        options: ["default", "valid", "error", "info"],
        type: {
          value: "string",
        },
        table: { category: "message" },
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
      onvaluechanged: {
        description:
          "Déclenché lors du changement de valeur du champ de saisie.<br>" + "`detail: string`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<string>" },
        },
        control: false,
      },
    },
    args,
    parameters: {
      actions: { handles: ["valuechanged"] },
      docs: {
        source: {
          transform: webComponentSourceCode("dsfr-textarea"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrTextarea>;
</script>

{#snippet template(args: Args)}
  <dsfr-textarea
    id={args.id}
    label={args.label}
    hide-label={args.hideLabel || undefined}
    hint={args.hint}
    value={args.value}
    placeholder={args.placeholder}
    name={args.name}
    autocomplete={args.autocomplete}
    disabled={args.disabled || undefined}
    status={args.status}
    error-message={args.errorMessage}
    valid-message={args.validMessage}
    rows={args.rows}
    info-message={args.infoMessage}
    label-size={args.labelSize}
    label-weight={args.labelWeight}
  ></dsfr-textarea>
{/snippet}

<Story name="Défaut" />
