<script module lang="ts">
  import { expect } from "storybook/test";
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import Icone from "$lib/composants/Icone.svelte";

  /** Les icônes disponibles et leur code sont sur la page du [DSFR](https://www.systeme-de-design.gouv.fr/version-courante/fr/fondamentaux/icone). Les icônes du DSFR sont elles-mêmes issues de [Remix Icons](https://remixicon.com/). */
  const { Story } = defineMeta({
    title: "Composants/Lab ANSSI/Legacy/Icone",
    component: Icone,
    args: {
      nom: "leaf-line",
      taille: "md",
    },
    argTypes: {
      nom: { control: "text", description: "Le nom de l'icône" },
      taille: {
        control: "select",
        options: ["sm", "md", "lg"],
        description: "La taille de l'icône",
      },
    },
    render: template,
  });

  type Args = ComponentProps<Icone>;
</script>

{#snippet template(args: Args)}
  <span style={args.couleur ? `color: ${args.couleur}` : undefined}>
    <lab-anssi-icone {...args}></lab-anssi-icone>
  </span>
{/snippet}

<Story
  name="Defaut"
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("lab-anssi-icone");
    await step("Le composant est rendu", async () => {
      const inner = el?.shadowRoot?.querySelector(".icone");
      await expect(inner).toBeTruthy();
    });
    await step("La taille md est appliquée", async () => {
      const icone = el?.shadowRoot?.querySelector(".icone");
      await expect(icone?.classList.contains("md")).toBe(true);
    });
    await step("La classe de l'icône est appliquée", async () => {
      const icone = el?.shadowRoot?.querySelector(".icone");
      const classes = Array.from(icone?.classList ?? []);
      const hasIconClass = classes.some((c) => c !== "icone" && c !== "md");
      await expect(hasIconClass).toBe(true);
    });
  }}
/>

<!-- Les icônes sont au format SVG avec la couleur « currentColor ». Ces fichiers SVG sont utilisés
comme image de masque et peuvent donc hériter de la couleur de leur élément parent : -->
<Story
  name="Avec Une Couleur"
  args={{
    nom: "leaf-line",
    taille: "md",
    couleur: "red",
  }}
/>
