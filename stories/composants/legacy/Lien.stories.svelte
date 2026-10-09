<script module lang="ts">
  import { expect } from "storybook/test";
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import Lien from "$lib/composants/Lien.svelte";

  const { Story } = defineMeta({
    title: "Composants/Lab ANSSI/Legacy/Lien",
    component: Lien,
    tags: ["Avec slots"],
    args: {
      titre: "Libellé",
      cible: "#",
      apparence: "lien",
      variante: "primaire",
      taille: "sm",
      icone: "leaf-line",
      positionIcone: "droite",
      actif: true,
    },
    argTypes: {
      titre: { control: "text", description: "Le texte du lien" },
      href: { control: "text", description: "L'URL du lien" },
      cible: { control: "text", description: "Cible du lien" },
      apparence: {
        control: "select",
        options: ["lien", "bouton", "lien-texte"],
        description: "L'apparence du lien",
      },
      variante: {
        control: "select",
        options: ["primaire", "secondaire", "tertiaire", "tertiaire-sans-bordure"],
        description: "La variante du lien",
      },
      taille: {
        control: "select",
        options: ["sm", "md", "lg"],
        description: "La taille du lien",
      },
      icone: { control: "text", description: "Le nom de l'icône à afficher" },
      positionIcone: {
        control: "select",
        options: ["sans", "seule", "droite", "gauche"],
        description: "La position de l'icône par rapport au texte",
      },
      actif: { control: "boolean", description: "Indique si le lien est actif" },
    },
    render: template,
  });

  type Args = ComponentProps<Lien>;
</script>

{#snippet template(args: Args)}
  <lab-anssi-lien
    titre={args.titre}
    href={args.href}
    variante={args.variante}
    taille={args.taille}
    icone={args.icone}
    apparence={args.apparence}
    cible={args.cible}
    position-icone={args.positionIcone}
    actif={args.actif || undefined}
    largeur-maximale={args.largeurMaximale || undefined}
  ></lab-anssi-lien>
{/snippet}

<Story
  name="Par défaut"
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("lab-anssi-lien");
    const typedArgs = args as Record<string, unknown>;
    const link = el?.shadowRoot?.querySelector("a") as HTMLAnchorElement | null;

    await step("Le composant est rendu", async () => {
      await expect(link).toBeTruthy();
    });

    await step("Le libellé est affiché", async () => {
      await expect(link?.textContent).toContain(typedArgs.titre as string);
    });

    await step("Le lien est actif ou désactivé selon la prop", async () => {
      const expectedDisabled = typedArgs.actif ? "false" : "true";

      await expect(link?.getAttribute("aria-disabled")).toBe(expectedDisabled);
    });

    await step("L'icône est présente ou absente selon les props", async () => {
      const icone = el?.shadowRoot?.querySelector(".icone");

      if (typedArgs.positionIcone !== "sans" && typedArgs.icone) {
        await expect(icone).toBeTruthy();
        await expect(icone?.classList.contains(`fr-icon-${typedArgs.icone}`)).toBe(true);
      } else {
        await expect(icone).toBeNull();
      }
    });
  }}
/>

<Story name="Taille de police 1rem">
  <p style="font-size: 1rem; line-height: 1.5rem; color: #584cfc">
    Lorem ipsum <lab-anssi-lien titre="dolor sit plop" cible="#" apparence="lien-texte"
    ></lab-anssi-lien> amet.
  </p>
</Story>

<Story name="Taille de police 2rem">
  <p style="font-size: 2rem; line-height: 3rem; color: #18753c">
    Lorem ipsum <lab-anssi-lien titre="dolor sit plop" cible="#" apparence="lien-texte"
    ></lab-anssi-lien> amet.
  </p>
</Story>

<Story name="Avec usage du slot par défaut">
  {#snippet template(args: Args)}
    <lab-anssi-lien
      href={args.href}
      variante={args.variante}
      taille={args.taille}
      icone={args.icone}
      apparence={args.apparence}
      cible={args.cible}
      position-icone={args.positionIcone}
      actif={args.actif || undefined}
    >
      Libellé via le slot
    </lab-anssi-lien>
  {/snippet}
</Story>
