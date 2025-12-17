<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    toggleArgTypes,
    toggleArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/toggle/template/stories/toggle-arg-types.js";

  import DsfrToggle from "$lib/dsfr/DsfrToggle.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Toggle",
    component: DsfrToggle,
    argTypes: toggleArgTypes,
    args: toggleArgs,
    render: template,
  });

  type Args = ComponentProps<DsfrToggle>;
</script>

{#snippet template(args: Args)}
  <dsfr-toggle
    id={args.id}
    label={args.label}
    hint={args.hint}
    hint-id={args.hintId}
    disabled={args.disabled || undefined}
    checked={args.checked || undefined}
    border={args.border || undefined}
    left={args.left || undefined}
    state={args.state || undefined}
    status={args.status}
    error-message={args.errorMessage}
    valid-message={args.validMessage}
    form={args.form}
    required={args.required || undefined}
  ></dsfr-toggle>
{/snippet}

<Story name="Défaut" />
