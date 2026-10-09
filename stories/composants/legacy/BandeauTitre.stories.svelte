<script module lang="ts">
  import { expect } from "storybook/test";
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import BandeauTitre from "$lib/composants/blog/BandeauTitre.svelte";

  const { Story } = defineMeta({
    title: "Composants/Lab ANSSI/Legacy/Bandeau Titre",
    component: BandeauTitre,
    tags: ["Avec slots"],
    args: {
      titre: "Titre de la page",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      filAriane: [
        { label: "Accueil", href: "#" },
        { label: "Page N2", href: "#" },
        { label: "Page N3" },
      ],
    },
    argTypes: {
      titre: { control: "text", description: "Le titre du bandeau" },
      description: { control: "text", description: "La description du bandeau" },
      filAriane: {
        control: "object",
        description: "Le fil d'Ariane à afficher",
        table: {
          type: { summary: "Array<{ label: string, href?: string }>" },
        },
      },
      infosTag: {
        control: "object",
        description: "Les informations du tag à afficher",
        table: {
          type: { summary: "{ label: string, couleurTexte: string, couleurFond: string }" },
          defaultValue: { summary: "{}" },
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<BandeauTitre>;
</script>

{#snippet template(args: Args)}
  <lab-anssi-bandeau-titre
    titre={args.titre}
    description={args.description}
    fil-ariane={JSON.stringify(args.filAriane)}
    infos-tag={args.infosTag}
  ></lab-anssi-bandeau-titre>
{/snippet}

<Story
  name="Par défaut"
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("lab-anssi-bandeau-titre");
    const typedArgs = args as Record<string, unknown>;
    const segments = (typedArgs.filAriane ?? []) as { label: string; href?: string }[];

    await step("Le composant est rendu", async () => {
      await expect(el?.shadowRoot).toBeTruthy();
    });

    await step("Le titre est affiché", async () => {
      const h1 = el?.shadowRoot?.querySelector("h1");

      await expect(h1?.textContent).toBe(typedArgs.titre);
    });

    await step("La description est affichée", async () => {
      const description = el?.shadowRoot?.querySelector(".conteneur-corps span");
      await expect(description?.textContent).toContain(typedArgs.description as string);
    });

    await step("Le fil d'Ariane contient les segments attendus", async () => {
      const filAriane = el?.shadowRoot?.querySelector(".fil-ariane");
      const liens = filAriane?.querySelectorAll("a");
      const spans = filAriane?.querySelectorAll("span");
      const segmentsAvecHref = segments.filter((s) => "href" in s);
      const segmentsSansHref = segments.filter((s) => !("href" in s));

      await expect(liens?.length).toBe(segmentsAvecHref.length);
      await expect(spans?.length).toBe(segmentsSansHref.length);

      for (let i = 0; i < segments.length; i++) {
        await expect(filAriane?.textContent).toContain(segments[i].label);
      }
    });
  }}
/>

<Story name="Avec usage des slots">
  {#snippet template(args: Args)}
    <lab-anssi-bandeau-titre fil-ariane={JSON.stringify(args.filAriane)} infos-tag={args.infosTag}>
      <h1 slot="titre">Titre de la page (slot)</h1>
      <p slot="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit (slot).</p>
    </lab-anssi-bandeau-titre>
  {/snippet}
</Story>
