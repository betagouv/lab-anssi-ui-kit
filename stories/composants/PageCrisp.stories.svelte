<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import { genereImageDePlaceholder } from "../utilitaires/generateurImagesPlaceholders.js";
  import exempleContenu from "../lab/blog/exemple-page-crisp.html?raw";

  import PageCrisp from "$lib/composants/blog/PageCrisp.svelte";

  const contenu = (exempleContenu as string).replaceAll(
    "%%IMAGE_1000_800%%",
    genereImageDePlaceholder(1000, 800),
  );

  const { Story } = defineMeta({
    title: "Composants/ANSSI/PageCrisp",
    component: PageCrisp,
    args: {
      contenu,
      tableDesMatieres: [
        { profondeur: 2, texte: "Premier titre", id: "id-titre1" },
        { profondeur: 2, texte: "Deuxième titre", id: "id-titre2" },
        { profondeur: 2, texte: "Troisième titre", id: "id-titre3" },
      ],
    },
    argTypes: {
      contenu: {
        control: "text",
        description: "Contenu HTML à afficher dans la page",
      },
      tableDesMatieres: {
        control: "object",
        description: "Table des matières contenant les titres et leurs identifiants",
        table: {
          type: { summary: "{ profondeur: number, texte: string, id: string }[]" },
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<PageCrisp>;
</script>

{#snippet template(args: Args)}
  <lab-anssi-page-crisp
    contenu={args.contenu}
    table-des-matieres={JSON.stringify(args.tableDesMatieres)}
  ></lab-anssi-page-crisp>
{/snippet}

<Story name="Defaut" />
