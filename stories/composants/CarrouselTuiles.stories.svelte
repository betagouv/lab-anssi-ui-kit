<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import CarrouselTuiles from "$lib/composants/vitrines-produits/briques/CarrouselTuiles/CarrouselTuiles.svelte";

  import { genereImageDePlaceholder } from "../utilitaires/generateurImagesPlaceholders.js";

  const { Story } = defineMeta({
    title: "Composants/ANSSI/Carrousel de tuiles",
    component: CarrouselTuiles,
    args: {
      tuiles: [
        {
          titre: "Un dispositif étatique",
          contenu:
            "MonAideCyber est proposé par l'Agence nationale de la sécurité des systèmes d'information.",
          illustration: {
            lien: genereImageDePlaceholder(96, 97),
            alt: "",
          },
        },
        {
          titre: "Une communauté de confiance",
          contenu:
            "Les Aidants cyber sont issus de la sphère publique ou sont membres d'associations œuvrant pour un numérique de confiance.",
          illustration: {
            lien: genereImageDePlaceholder(96, 97),
            alt: "",
          },
        },
        {
          titre: "Au service de l'intérêt général",
          contenu:
            "Le diagnostic MonAideCyber aide les entités qui souhaitent se protéger contre les cyberattaques et passer à l'action.",
          illustration: {
            lien: genereImageDePlaceholder(96, 97),
            alt: "",
          },
        },
      ],
    },
    argTypes: {
      tuiles: {
        description: "Liste de tuiles affichées dans le carrousel.",
        control: {
          type: "object",
        },
        table: {
          type: {
            summary: "Array",
            detail:
              "{ titre: string; illustration: { lien: string; alt: string }; contenu: string }[]",
          },
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<CarrouselTuiles>;
</script>

{#snippet template(args: Args)}
  <lab-anssi-carrousel-tuiles {...args}></lab-anssi-carrousel-tuiles>
{/snippet}

<Story name="Defaut" />
