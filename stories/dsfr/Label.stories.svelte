<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import DsfrLabel from "$lib/dsfr/DsfrLabel.svelte";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Label",
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
      labelSize: {
        control: "select",
        options: [undefined, "xs", "sm", "md", "lg", "xl", "lead"],
        description:
          "Applique une classe utilitaire de taille de texte DSFR (fr-text--xs à fr-text--xl, fr-text--lead)",
      },
      labelWeight: {
        control: "select",
        options: [undefined, "light", "regular", "bold", "heavy"],
        description:
          "Applique une classe utilitaire de graisse DSFR (fr-text--light à fr-text--heavy)",
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
    label-size={args.labelSize}
    label-weight={args.labelWeight}
  ></dsfr-label>
{/snippet}

<Story name="Défaut" />

<Story name="Avec texte additionnel" args={{ hint: "Format attendu : JJ/MM/AAAA." }} />

<Story name="Masqué (fr-sr-only)" args={{ hidden: true }} />

<Story name="Tailles de texte (fr-text--xs à fr-text--lead)">
  {#snippet template(args: Args)}
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      {#each ["xs", "sm", "md", "lg", "xl", "lead"] as size}
        <dsfr-label for={args.for} label={"Label en fr-text--" + size} label-size={size}
        ></dsfr-label>
      {/each}
    </div>
  {/snippet}
</Story>

<Story name="Graisses de texte (fr-text--light à fr-text--heavy)">
  {#snippet template(args: Args)}
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      {#each ["light", "regular", "bold", "heavy"] as weight}
        <dsfr-label for={args.for} label={"Label en fr-text--" + weight} label-weight={weight}
        ></dsfr-label>
      {/each}
    </div>
  {/snippet}
</Story>

<Story name="Taille et graisse combinées" args={{ labelSize: "lg", labelWeight: "bold" }} />
