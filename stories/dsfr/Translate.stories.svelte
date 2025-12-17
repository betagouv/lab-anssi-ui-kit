<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    translateArgTypes,
    translateArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/translate/template/stories/translate-arg-types.js";

  import DsfrTranslate from "$lib/dsfr/DsfrTranslate.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Translate",
    component: DsfrTranslate,
    argTypes: translateArgTypes,
    args: translateArgs,
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

<Story name="Défaut" />
