<script module lang="ts">
  import { expect } from "storybook/test";
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import Bouton from "$lib/composants/Bouton.svelte";

  const { Story } = defineMeta({
    title: "Composants/Lab ANSSI/Legacy/Bouton",
    component: Bouton,
    args: {
      titre: "Libellé",
      variante: "primaire",
      taille: "sm",
      icone: "leaf-line",
      positionIcone: "droite",
      actif: true,
    },
    argTypes: {
      titre: { control: "text", description: "Le libellé du bouton" },
      variante: {
        control: "select",
        options: ["primaire", "secondaire", "tertiaire", "tertiaire-sans-bordure"],
        description: "La variante du bouton",
      },
      taille: {
        control: "select",
        options: ["sm", "md", "lg"],
        description: "La taille du bouton",
      },
      icone: { control: "text", description: "L'icône du bouton" },
      positionIcone: {
        control: "select",
        options: ["sans", "seule", "droite", "gauche"],
        description: "La position de l'icône dans le bouton",
      },
      actif: { control: "boolean", description: "Indique si le bouton est actif ou non" },
      largeurMaximale: {
        control: "boolean",
        description: "Indique si le bouton prend toute la largeur ou non",
      },
    },
    render: template,
  });

  type Args = ComponentProps<Bouton>;
</script>

{#snippet template(args: Args)}
  <lab-anssi-bouton
    titre={args.titre}
    variante={args.variante}
    taille={args.taille}
    icone={args.icone}
    position-icone={args.positionIcone}
    actif={args.actif || undefined}
    largeur-maximale={args.largeurMaximale || undefined}
  ></lab-anssi-bouton>
{/snippet}

<Story
  name="Defaut"
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("lab-anssi-bouton");
    await step("Le composant est rendu", async () => {
      const inner = el?.shadowRoot?.querySelector(".bouton");
      await expect(inner).toBeTruthy();
    });
    await step("Le libellé est affiché", async () => {
      const span = el?.shadowRoot?.querySelector(".bouton span");
      await expect(span?.textContent).toBe("Libellé");
    });
    await step("La variante primaire est appliquée", async () => {
      const button = el?.shadowRoot?.querySelector(".bouton");
      await expect(button?.classList.contains("primaire")).toBe(true);
    });
    await step("La taille sm est appliquée", async () => {
      const button = el?.shadowRoot?.querySelector(".bouton");
      await expect(button?.classList.contains("sm")).toBe(true);
    });
    await step("La position de l'icône est correcte", async () => {
      const button = el?.shadowRoot?.querySelector(".bouton");
      await expect(button?.classList.contains("icone-droite")).toBe(true);
    });
    await step("Le bouton est actif (non désactivé)", async () => {
      const button = el?.shadowRoot?.querySelector("button") as HTMLButtonElement | null;
      await expect(button?.disabled).toBe(false);
    });
  }}
/>
