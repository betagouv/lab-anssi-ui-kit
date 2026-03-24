<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    checkboxArgTypes,
    checkboxArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/checkbox/template/stories/checkbox-arg-types.js";

  import DsfrCheckbox from "$lib/dsfr/DsfrCheckbox.svelte";
  // @ts-ignore: Required Import to use this component as webcomponent
  import DsfrLink from "$lib/dsfr/DsfrLink.svelte";
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

<Story name="Hint simple" args={{ ...checkboxArgs, hint: "Texte de description additionnel" }} />

<Story name="Hint avec un DsfrLink" args={{ ...checkboxArgs }}>
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
    >
      <span slot="hint">
        Texte de description avec un&nbsp;<dsfr-link
          href="https://cyber.gouv.fr/"
          blank
          label="lien vers plus d'informations"
          neutral
        ></dsfr-link>
      </span>
    </dsfr-checkbox>
  {/snippet}
</Story>
