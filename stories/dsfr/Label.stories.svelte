<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import DsfrLabel from "$lib/dsfr/DsfrLabel.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Label",
    component: DsfrLabel,
    argTypes: {
      for: {
        control: "text",
        description: "Attribut for du label (id du champ associé)",
      },
      label: {
        control: "text",
        description: "Texte du label",
      },
      hint: {
        control: "text",
        description: "Texte additionnel sous le label",
      },
      hidden: {
        control: "boolean",
        description: "Masque visuellement le label tout en le gardant accessible (fr-sr-only)",
      },
      id: {
        control: "text",
        description: "Attribut id du label",
      },
    },
    args: {
      for: "champ-exemple",
      label: "Libellé du champ",
      hidden: false,
    },
    render: template,
  });

  type Args = ComponentProps<DsfrLabel>;
</script>

{#snippet template(args: Args)}
  <dsfr-label
    for={args.for}
    label={args.label}
    hint={args.hint}
    hidden={args.hidden || undefined}
    id={args.id}
  ></dsfr-label>
{/snippet}

<Story name="Défaut" />

<Story name="Avec texte additionnel" args={{ hint: "Format attendu : JJ/MM/AAAA." }} />

<Story name="Masqué (fr-sr-only)" args={{ hidden: true }} />
