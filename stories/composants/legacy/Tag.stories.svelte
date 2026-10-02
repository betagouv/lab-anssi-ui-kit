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
  name="Par défaut"
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("lab-anssi-tag");
    const typedArgs = args as Record<string, unknown>;

    await step("Le composant est rendu", async () => {
      await expect(el?.shadowRoot).toBeTruthy();
    });

    if (typedArgs.type === "selectionnable") {
      const button = el?.shadowRoot?.querySelector("button") as HTMLButtonElement | null;

      await step("Le tag sélectionnable est rendu comme un bouton", async () => {
        await expect(button).toBeTruthy();
      });

      await step("Le libellé est affiché", async () => {
        await expect(button?.textContent?.trim()).toContain(typedArgs.label as string);
      });

      await step("L'état aria-pressed initial correspond à la prop", async () => {
        const expectedPressed = typedArgs.presse ? "true" : "false";

        await expect(button?.getAttribute("aria-pressed")).toBe(expectedPressed);
      });

      await step("Le clic bascule l'état aria-pressed", async () => {
        const pressedBefore = button?.getAttribute("aria-pressed");
        await userEvent.click(button!);

        const expectedAfterClick = pressedBefore === "true" ? "false" : "true";
        await expect(button?.getAttribute("aria-pressed")).toBe(expectedAfterClick);
      });

      await step("Le re-clic rétablit l'état aria-pressed initial", async () => {
        const expectedPressed = typedArgs.presse ? "true" : "false";
        await userEvent.click(button!);

        await expect(button?.getAttribute("aria-pressed")).toBe(expectedPressed);
      });
    } else {
      const span = el?.shadowRoot?.querySelector("span.tag");

      await step("Le tag par défaut est rendu comme un span", async () => {
        await expect(span).toBeTruthy();
      });

      await step("Le libellé est affiché", async () => {
        await expect(span?.textContent?.trim()).toContain(typedArgs.label as string);
      });
    }
  }}
/>

<Story name="Avec usage du slot par défaut">
  {#snippet template(args: Args)}
    <lab-anssi-tag
      couleur-texte={args.couleurTexte}
      couleur-fond={args.couleurFond}
      taille={args.taille}
      type={args.type}
      presse={args.presse || undefined}
    >
      Libellé via le slot
    </lab-anssi-tag>
  {/snippet}
</Story>
