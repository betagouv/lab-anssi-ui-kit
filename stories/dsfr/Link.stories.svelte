<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    linkArgTypes,
    linkArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/link/template/stories/link-arg-types.js";

  import DsfrLink from "$lib/dsfr/DsfrLink.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Link",
    component: DsfrLink,
    argTypes: linkArgTypes,
    args: linkArgs,
    render: template,
  });

  type Args = ComponentProps<DsfrLink>;
</script>

{#snippet template(args: Args)}
  <dsfr-link
    label={args.label}
    size={args.size}
    id={args.id}
    disabled={args.disabled}
    blank={args.blank}
    title={args.title}
    href={args.href}
    download={args.download}
    detail={args.detail}
    hreflang={args.hreflang}
    assess={args.assess}
    has-icon={args.hasIcon}
    icon={args.icon}
    icon-place={args.iconPlace}
  ></dsfr-link>
{/snippet}

<Story name="Défaut" />

<Story name="Ouverture dans un nouvel onglet" args={{ ...linkArgs, blank: true }} />
