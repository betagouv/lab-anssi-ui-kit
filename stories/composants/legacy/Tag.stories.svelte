<script module lang="ts">
  import { expect, userEvent } from "storybook/test";
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import Tag from "$lib/composants/Tag.svelte";

  const { Story } = defineMeta({
    title: "Composants/Lab ANSSI/Legacy/Tag",
    component: Tag,
    args: {
      couleurFond: undefined,
      couleurTexte: undefined,
      label: "libellé",
      taille: "md",
      type: "selectionnable",
      presse: false,
    },
    argTypes: {
      label: { control: "text", description: "Le libellé du tag" },
      couleurTexte: { control: "color", description: "La couleur du texte du tag" },
      couleurFond: { control: "color", description: "La couleur de fond du tag" },
      taille: { control: "select", options: ["sm", "md", "lg"], description: "La taille du tag" },
      type: {
        control: "select",
        options: ["defaut", "selectionnable"],
        description: "Le type de tag",
      },
      presse: { control: "boolean", description: "Indique si le tag est pressé" },
    },
    render: template,
  });

  type Args = ComponentProps<Tag>;
</script>

{#snippet template(args: Args)}
  <lab-anssi-tag
    label={args.label}
    couleur-texte={args.couleurTexte}
    couleur-fond={args.couleurFond}
    taille={args.taille}
    type={args.type}
    presse={args.presse || undefined}
  ></lab-anssi-tag>
{/snippet}

<Story
  name="Defaut"
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("lab-anssi-tag");
    await step("Le composant est rendu", async () => {
      const inner = el?.shadowRoot?.querySelector(".tag");
      await expect(inner).toBeTruthy();
    });
    await step("Le libellé est affiché", async () => {
      const tag = el?.shadowRoot?.querySelector(".tag");
      await expect(tag?.textContent?.trim()).toBe("libellé");
    });
    await step("Le tag sélectionnable est rendu comme un bouton", async () => {
      const button = el?.shadowRoot?.querySelector("button.tag");
      await expect(button).toBeTruthy();
    });
    await step("La classe de taille 'md' est appliquée", async () => {
      const tag = el?.shadowRoot?.querySelector(".tag.md");
      await expect(tag).toBeTruthy();
    });
    await step("Le clic bascule l'état aria-pressed", async () => {
      const button = el?.shadowRoot?.querySelector("button.tag") as HTMLButtonElement;
      await expect(button?.getAttribute("aria-pressed")).toBe("false");
      await userEvent.click(button);
      await expect(button?.getAttribute("aria-pressed")).toBe("true");
    });
  }}
/>
