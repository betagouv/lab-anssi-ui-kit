<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import Placeholder from "@gouvfr/dsfr/example/img/placeholder.1x1.png";

  import BlocFonctionnalites from "$lib/composants/BlocFonctionnalites.svelte";

  import DsfrButton from "$lib/dsfr/DsfrButton.svelte";
  import DsfrTagsGroup from "$lib/dsfr/DsfrTagsGroup.svelte";

  const fonctionnalites = [
    {
      titre: "Lorem ipsum n°1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis amet, iaculis sagittis.",
      illustration: "https://placehold.co/588x528/e8edff/0063cb",
    },
    {
      titre: "Lorem ipsum n°2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis amet, iaculis sagittis.",
      illustration: "https://placehold.co/588x528/ffe9e6/b34000",
    },
    {
      titre: "Lorem ipsum n°3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis amet, iaculis sagittis.",
      illustration: "https://placehold.co/588x528/bafaee/37635f",
      badge: {
        label: "Libellé badge",
        accent: "green-bourgeon",
        size: "sm",
        type: "accent",
      },
      lien: {
        label: "Libellé lien",
        href: "#",
        icon: "arrow-right-line",
        blank: false,
        size: "sm",
      },
    },
    {
      titre: "Lorem ipsum n°4",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis amet, iaculis sagittis.",
      illustration: "https://placehold.co/588x528/feebd0/695240",
    },
  ];
  const fonctionnalitesMultiples = [
    [
      {
        titre: "Plan d’action cyber collaboratif",
        description:
          "Collaborez avec vos équipes, assignez les mesures de sécurité et suivez leur avancement.",
        illustration: "/images/plan_collaboratif.png",
      },
      {
        titre: "Indice cyber",
        description:
          "Obtenez une évaluation indicative du niveau de sécurisation du service et sa durée d’homologation recommandée",
        illustration: "/images/indice_cyber.png",
      },
      {
        titre: "Tableau de bord",
        description: "Visualisez vos services, priorités et échéances en un coup d’œil.",
        illustration: "/images/tableau_de_bord.png",
      },
      {
        titre: "Matrice de risques",
        description:
          "Identifiez et suivez vos risques en temps réel, au fil de la complétion de votre plan d’action cyber.",
        illustration: "/images/risques.png",
      },
    ],
    [
      {
        titre: "Supervision",
        description:
          "Vision globale de vos systèmes d’information avec des indicateurs clés pour piloter la sécurisation de votre entité.",
        illustration: "/images/supervision.png",
      },
      {
        titre: "Téléversement des systèmes d’information",
        description:
          "Importez tous vos systèmes d’information en une seule fois pour les centraliser.",
        illustration: "/images/televersement.png",
      },
      {
        titre: "Import des mesures",
        description:
          "Intégrez des mesures de sécurité spécifiques et réutilisez-les sur vos systèmes d’information.",
        illustration: "/images/import_des_mesures.png",
      },
      {
        titre: "Gestion des droits",
        description:
          "Gérez finement les accès de chaque utilisateur invité (équipes métier, prestataires, etc.)",
        illustration: "/images/gestions_des_droits.png",
      },
    ],
  ];
  const tags = [
    {
      label: "libellé tag 1",
      accent: "défaut",
      size: "md",
      href: "[URL - à modifier]",
      icon: "arrow-right-line",
      pressed: false,
      blank: false,
      disabled: false,
      id: "tag-group-2",
    },
    {
      label: "libellé tag 2",
      accent: "défaut",
      size: "md",
      href: "[URL - à modifier]",
      icon: "arrow-right-line",
      pressed: false,
      blank: false,
      disabled: false,
      id: "tag-group-3",
    },
    {
      label: "libellé tag 3",
      accent: "défaut",
      size: "md",
      href: "[URL - à modifier]",
      icon: "arrow-right-line",
      pressed: false,
      blank: false,
      disabled: false,
      id: "tag-group-4",
    },
  ];

  const { Story } = defineMeta({
    title: "Composants/Lab ANSSI/Bloc fonctionnalités",
    component: BlocFonctionnalites,
    args: {
      titre: "Titre lorem ipsum",
      baliseTitre: "h2",
      baliseSousTitre: "h3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi congue interdum erat, non porta nibh. Suspendisse facilisis, nibh ac dignissim malesuada, tellus ante rhoncus nulla, a efficitur nisi quam vel orci.",
      imagePlaceholder: "/images/bloc-fonctionnalites-placeholder.png",
      fonctionnalites: fonctionnalites,
    },
    render: template,
  });

  type Args = ComponentProps<BlocFonctionnalites>;
</script>

{#snippet template(args: Args)}
  <lab-anssi-fonctionnalites
    titre={args.titre}
    description={args.description}
    balise-titre={args.baliseTitre}
    avec-controle-segmente={args.avecControleSegmente || undefined}
    elements-du-controle-segmente={JSON.stringify(args.elementsDuControleSegmente)}
    fonctionnalites={args.fonctionnalites}
    balise-sous-titre={args.baliseSousTitre}
    cliquable={args.cliquable || undefined}
    avec-bouton={args.avecBouton || undefined}
    orientation-media={args.orientationMedia}
    image-placeholder={args.imagePlaceholder}
  >
    {#if args.afficheHautEntete}
      <dsfr-tags-group slot="hautentete" group-markup="ul" {tags}></dsfr-tags-group>
    {/if}

    <dsfr-button label="Libellé" slot="bouton"></dsfr-button>
  </lab-anssi-fonctionnalites>
{/snippet}

<Story name="Par défaut (non cliquable)" />

<Story name="Sans description" args={{ description: undefined }} />

<Story name="Avec Tags dans l'entête" args={{ afficheHautEntete: true }} />

<Story name="Avec média à gauche" args={{ orientationMedia: "gauche" }} />

<Story
  name="Avec Contrôle Segmenté"
  args={{
    avecControleSegmente: true,
    elementsDuControleSegmente: [
      {
        id: "segmented-1",
        label: "Pour toutes les équipes",
        name: "segmented",
        value: "equipes",
      },
      {
        id: "segmented-2",
        label: "Pour les FSSI & les RSSI",
        name: "segmented",
        value: "fssi-rssi",
      },
    ],
    fonctionnalites: fonctionnalitesMultiples,
  }}
/>

<Story name="Avec Bouton" args={{ avecBouton: true }} />

<Story
  name="Cliquable"
  args={{
    cliquable: true,
  }}
/>
