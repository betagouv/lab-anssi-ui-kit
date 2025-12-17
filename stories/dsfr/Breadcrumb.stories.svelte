<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    breadcrumbArgTypes,
    breadcrumbArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/breadcrumb/template/stories/breadcrumb-arg-types.js";

  import DsfrBreadcrumb from "$lib/dsfr/DsfrBreadcrumb.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Breadcrumb",
    component: DsfrBreadcrumb,
    argTypes: breadcrumbArgTypes,
    args: {
      ...breadcrumbArgs,
      buttonAriaLabel: "vous êtes ici :",
      buttonLabel: "Voir le fil d'Ariane",
    },
    parameters: {
      backgrounds: {
        options: {
          blueFranceLab: { name: "Blue France Lab", value: "#000091" },
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrBreadcrumb>;
</script>

{#snippet template(args: Args)}
  <dsfr-breadcrumb
    id={args.id}
    segments={args.segments}
    button-aria-label={args.buttonAriaLabel}
    button-label={args.buttonLabel}
    inverse={args.inverse || undefined}
    markup={args.markup}
    has-margin-variant={args.hasMarginVariant || undefined}
  ></dsfr-breadcrumb>
{/snippet}

<Story name="Defaut" />

<Story
  name="Inverse"
  args={{ inverse: true }}
  globals={{
    backgrounds: { value: "blueFranceLab" },
  }}
/>
