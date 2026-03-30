<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    checkboxArgTypes,
    checkboxArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/checkbox/template/stories/checkbox-arg-types.js";

  import DsfrCheckbox from "$lib/dsfr/DsfrCheckbox.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Checkbox",
    component: DsfrCheckbox,
    argTypes: {
      ...checkboxArgTypes,
      default: {
        description: "Libellé personnalisé de la case à cocher (remplace la prop `label`)",
        control: false,
        table: { category: "Slots" },
      },
      onvaluechanged: {
        description: "Callback appelé lors du changement de valeur",
        control: false,
        table: { category: "Événements" },
      },
    },
    args: checkboxArgs,
    parameters: {
      docs: {
        source: {
          transform: webComponentSourceCode("dsfr-checkbox"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrCheckbox>;
</script>

{#snippet template(args: Args)}
  <dsfr-checkbox
    id={args.id}
    label={args.label}
    name={args.name}
    size={args.size}
    hint={args.hint}
    disabled={args.disabled || undefined}
    checked={args.checked || undefined}
    value={args.value}
    status={args.status}
    error-message={args.errorMessage}
    valid-message={args.validMessage}
    form={args.form}
    required={args.required || undefined}
    onvaluechanged={args.onvaluechanged}
  ></dsfr-checkbox>
{/snippet}

<Story name="Défaut" />

<Story name="Un label avec un lien" args={{ ...checkboxArgs, label: undefined }}>
  {#snippet template(args: Args)}
    <dsfr-checkbox {...args}>
      Un label avec un&nbsp;<a href="https://google.fr" target="_blank">lien</a>
    </dsfr-checkbox>
  {/snippet}
</Story>
