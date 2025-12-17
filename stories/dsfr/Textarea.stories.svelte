<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    inputArgTypes,
    inputArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/input/template/stories/input-arg-types.js";

  import DsfrTextarea from "$lib/dsfr/DsfrTextarea.svelte";

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
    },
    args,
    render: template,
  });

  type Args = ComponentProps<DsfrTextarea>;
</script>

{#snippet template(args: Args)}
  <dsfr-textarea
    id={args.id}
    label={args.label}
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
  ></dsfr-textarea>
{/snippet}

<Story name="Défaut" />
