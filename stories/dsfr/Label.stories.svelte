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
  name="Par défaut"
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-label");
    const shadow = el?.shadowRoot;

    await step("Le texte du label est affiché", async () => {
      const span = shadow?.querySelector("label.fr-label > span");

      await expect(span?.textContent?.trim()).toContain(args.label);
    });

    await step("L'attribut for est défini", async () => {
      const label = shadow?.querySelector("label.fr-label");

      await expect(label?.getAttribute("for")).toBe(args.for);
    });
  }}
/>

<Story
  name="Avec texte additionnel"
  args={{ hint: "Format attendu : JJ/MM/AAAA." }}
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-label");
    const shadow = el?.shadowRoot;

    await step("Le texte additionnel est affiché", async () => {
      const hint = shadow?.querySelector(".fr-hint-text");

      await expect(hint?.textContent?.trim()).toContain(args.hint);
    });
  }}
/>

<Story
  name="Masqué (fr-sr-only)"
  args={{ hidden: true }}
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-label");
    const shadow = el?.shadowRoot;

    await step("Le label a la classe fr-sr-only", async () => {
      const label = shadow?.querySelector("label.fr-label");

      await expect(label?.classList.contains("fr-sr-only")).toBe(true);
    });

    await step("Le label n'est pas visuellement visible", async () => {
      const label = shadow?.querySelector("label.fr-label") as HTMLElement;
      const rect = label?.getBoundingClientRect();

      await expect(rect?.width).toBeLessThanOrEqual(1);
      await expect(rect?.height).toBeLessThanOrEqual(1);
    });
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
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-label");
    const shadow = el?.shadowRoot;

    await step("Le span a les classes de taille et de graisse correspondantes", async () => {
      const span = shadow?.querySelector("label.fr-label > span");

      await expect(span?.classList.contains(`fr-text--${args.labelSize}`)).toBe(true);
      await expect(span?.classList.contains(`fr-text--${args.labelWeight}`)).toBe(true);
    });
  }}
/>
