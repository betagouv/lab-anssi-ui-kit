<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect } from "storybook/test";
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

<Story
  name="Défaut"
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-label");

    await step("Le label est rendu", async () => {
      const label = el?.shadowRoot?.querySelector("label.fr-label");
      await expect(label).toBeTruthy();
    });

    await step("Le texte du label est affiché", async () => {
      const span = el?.shadowRoot?.querySelector("label.fr-label > span");
      await expect(span?.textContent).toContain("Libellé du champ");
    });

    await step("L'attribut for est défini", async () => {
      const label = el?.shadowRoot?.querySelector("label.fr-label");
      await expect(label?.getAttribute("for")).toBe("champ-exemple");
    });
  }}
/>

<Story
  name="Avec texte additionnel"
  args={{ hint: "Format attendu : JJ/MM/AAAA." }}
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-label");

    await step("Le texte additionnel est affiché", async () => {
      const hint = el?.shadowRoot?.querySelector(".fr-hint-text");
      await expect(hint).toBeTruthy();
      await expect(hint?.textContent).toContain("Format attendu");
    });
  }}
/>

<Story
  name="Masqué (fr-sr-only)"
  args={{ hidden: true }}
  play={async ({ canvasElement }) => {
    const el = canvasElement.querySelector("dsfr-label");
    const label = el?.shadowRoot?.querySelector("label.fr-label");
    await expect(label?.classList.contains("fr-sr-only")).toBe(true);
  }}
/>

<Story name="Tailles de texte (fr-text--xs à fr-text--lead)">
  {#snippet template(args: Args)}
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      {#each ["xs", "sm", "md", "lg", "xl", "lead"] as size (size)}
        <dsfr-label for={args.for} label={"Label en fr-text--" + size} label-size={size}
        ></dsfr-label>
      {/each}
    </div>
  {/snippet}
</Story>

<Story name="Graisses de texte (fr-text--light à fr-text--heavy)">
  {#snippet template(args: Args)}
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      {#each ["light", "regular", "bold", "heavy"] as weight (weight)}
        <dsfr-label for={args.for} label={"Label en fr-text--" + weight} label-weight={weight}
        ></dsfr-label>
      {/each}
    </div>
  {/snippet}
</Story>

<Story
  name="Taille et graisse combinées"
  args={{ labelSize: "lg", labelWeight: "bold" }}
  play={async ({ canvasElement }) => {
    const el = canvasElement.querySelector("dsfr-label");
    const span = el?.shadowRoot?.querySelector("label.fr-label > span");
    await expect(span?.classList.contains("fr-text--lg")).toBe(true);
    await expect(span?.classList.contains("fr-text--bold")).toBe(true);
  }}
/>
