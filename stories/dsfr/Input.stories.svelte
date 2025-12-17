<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    inputArgTypes,
    inputArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/input/template/stories/input-arg-types.js";

  import DsfrInput from "$lib/dsfr/DsfrInput.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Input",
    component: DsfrInput,
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
    args: inputArgs,
    render: template,
  });

  type Args = ComponentProps<DsfrInput>;
</script>

{#snippet template(args: Args)}
  <dsfr-input
    id={args.id}
    label={args.label}
    hint={args.hint}
    type={args.type}
    icon={args.icon}
    value={args.value}
    placeholder={args.placeholder}
    name={args.name}
    autocomplete={args.autocomplete}
    disabled={args.disabled || undefined}
    status={args.status}
    error-message={args.errorMessage}
    valid-message={args.validMessage}
    info-message={args.infoMessage}
    form={args.form}
    max={args.max}
    maxlength={args.maxlength}
    min={args.min}
    minlength={args.minlength}
    pattern={args.pattern}
    readonly={args.readonly || undefined}
    required={args.required || undefined}
    step={args.step}
  ></dsfr-input>
{/snippet}

<Story name="Défaut" />

<Story
  name="Message d'information"
  args={{ status: "info", infoMessage: "200 caractères maximum." }}
/>
