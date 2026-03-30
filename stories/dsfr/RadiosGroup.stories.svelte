<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    radiosGroupArgTypes,
    radiosGroupArgs,
    getRadiosGroupData,
  } from "@gouvfr/dsfr/src/dsfr/component/radio/template/stories/radios-group-arg-types.js";

  import DsfrRadiosGroup from "$lib/dsfr/DsfrRadiosGroup.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Radios Group",
    component: DsfrRadiosGroup,
    argTypes: {
      ...radiosGroupArgTypes,
      onvaluechanged: {
        description: "Callback appelé lors du changement de valeur",
        control: false,
        table: { category: "Événements" },
      },
    },
    args: { ...radiosGroupArgs, radios: getRadiosGroupData() },
    parameters: {
      docs: {
        source: {
          transform: webComponentSourceCode("dsfr-radios-group"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrRadiosGroup>;
</script>

{#snippet template(args: Args)}
  <dsfr-radios-group
    id={args.id}
    legend={args.legend}
    radios={args.radios}
    hint={args.hint}
    size={args.size}
    rich={args.rich || undefined}
    has-pictogram={args.hasPictogram || undefined}
    inline={args.inline || undefined}
    disabled={args.disabled || undefined}
    value={args.value}
    status={args.status}
    error-message={args.errorMessage}
    valid-message={args.validMessage}
    onvaluechanged={args.onvaluechanged}
  ></dsfr-radios-group>
{/snippet}

<Story name="Défaut" />
