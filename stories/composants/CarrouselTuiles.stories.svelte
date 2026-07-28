<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import { genereImageDePlaceholder } from "../utilitaires/generateurImagesPlaceholders.js";

  import CarrouselTuiles from "$lib/composants/carrousel-tuiles/CarrouselTuiles.svelte";

  import DsfrCard from "$lib/dsfr/DsfrCard.svelte";
  import DsfrContainer from "$lib/dsfr/DsfrContainer.svelte";

  const { Story } = defineMeta({
    title: "Composants/Lab ANSSI/Carrousel Tuiles",
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
      fond: "clair",
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
      fond: {
        description: "Défini le type de fond du conteneur du carrousel.",
        control: {
          type: "select",
          options: ["clair", "sombre"],
        },
        table: {
          type: {
            summary: "string",
            detail: '"clair" | "sombre"',
          },
          defaultValue: { summary: '"clair"' },
        },
      },
      default: {
        description: "Tuiles personnalisées (remplace les tuiles générées par la prop `tuiles`)",
        control: false,
        table: { category: "Slots" },
      },
    },
    render: template,
  });

  type Args = ComponentProps<CarrouselTuiles>;
</script>

{#snippet template(args: Args)}
  <lab-anssi-carrousel-tuiles {...args}></lab-anssi-carrousel-tuiles>
{/snippet}

<Story name="Par défaut" />

<Story name="Avec fond de couleur clair (personnalisé)">
  {#snippet template(args: Args)}
    <div class="section-exemple">
      <DsfrContainer>
        <lab-anssi-carrousel-tuiles {...args}></lab-anssi-carrousel-tuiles>
      </DsfrContainer>
    </div>

    <style>
      .section-exemple {
        background-color: var(--background-alt-blue-france);
        padding-block: 72px;
      }
    </style>
  {/snippet}
</Story>

<Story name="Avec fond de couleur sombre (personnalisé)" args={{ fond: "sombre" }}>
  {#snippet template(args: Args)}
    <div class="section-exemple">
      <DsfrContainer>
        <lab-anssi-carrousel-tuiles {...args}></lab-anssi-carrousel-tuiles>
      </DsfrContainer>
    </div>

    <style>
      .section-exemple {
        background-color: var(--artwork-major-blue-france);
        padding-block: 72px;
      }
    </style>
  {/snippet}
</Story>

<Story name="Avec fond 'dégradé' (personnalisé)">
  {#snippet template(args: Args)}
    <div class="section-exemple">
      <DsfrContainer>
        <lab-anssi-carrousel-tuiles {...args}></lab-anssi-carrousel-tuiles>
      </DsfrContainer>
    </div>

    <style>
      .section-exemple {
        background: linear-gradient(
          to bottom,
          #0079d0 0%,
          #0079d0 30%,
          transparent 30%,
          transparent 100%
        );
        padding-block: 72px;
      }
    </style>
  {/snippet}
</Story>

<Story name="Avec des cartes">
  {#snippet template(args: Args)}
    <div class="section-exemple">
      <DsfrContainer>
        <lab-anssi-carrousel-tuiles {...args}>
          {#each { length: 4 }, index}
            <dsfr-card
              title="Intitulé de la carte"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing, incididunt, ut labore et dolore magna aliqua. Vitae sapien pellentesque habitant morbi tristique senectus et"
              detail-start="détail (optionnel)"
              detail-start-icon="warning-fill"
              detail-end="détail (optionnel)"
              detail-end-icon="warning-fill"
              markup="h3"
              action-markup="a"
              href="[URL - à modifier]"
              size="md"
              src="https://betagouv.github.io/lab-anssi-ui-kit/assets/placeholder.16x9-BgJU1mfU.png"
              alt="[À MODIFIER - vide ou texte alternatif de l’image]"
              image-ratio="default"
              variations="none"
              has-description
              enlarge
            ></dsfr-card>
          {/each}
        </lab-anssi-carrousel-tuiles>
      </DsfrContainer>
    </div>

    <style>
      .section-exemple {
        background-color: var(--background-alt-blue-france);
        padding-block: 72px;
      }
    </style>
  {/snippet}
</Story>
