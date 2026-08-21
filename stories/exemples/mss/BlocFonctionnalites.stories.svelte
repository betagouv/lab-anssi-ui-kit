<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import BlocFonctionnalites from "$lib/composants/BlocFonctionnalites.svelte";

  const { Story } = defineMeta({
    title: "Exemples/LAB - MSS",
    component: BlocFonctionnalites,
    args: {
      titre: "Fonctionnalités clés",
      baliseTitre: "h2",
      baliseDesSousTitres: "h3",
      description:
        "Une plateforme pensée pour les équipes DSI, RSSI, DPO, chefs de projet avec les mesures ANSSI et CNIL intégrées d'emblée.",
      imagePlaceholder: "/images/bloc-fonctionnalites-placeholder.png",
      fonctionnalites: [
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
      ],
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
      tailleControleSegmente: "sm",
      avecControleSegmente: true,
      cliquable: true,
      activeDefilement: true,
    },
    tags: ["!autodocs"],
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
    taille-controle-segmente={args.tailleControleSegmente || undefined}
    fonctionnalites={args.fonctionnalites}
    balise-des-sous-titres={args.baliseDesSousTitres}
    cliquable={args.cliquable || undefined}
    avec-cta={args.avecCTA || undefined}
    orientation-media={args.orientationMedia}
    image-placeholder={args.imagePlaceholder}
    active-defilement={args.activeDefilement}
    delai-defilement={args.delaiDefilement}
  >
    {#if args.afficheHautEntete}
      <dsfr-tags-group slot="hautentete" group-markup="ul"></dsfr-tags-group>
    {/if}

    <dsfr-button label="Libellé" slot="cta"></dsfr-button>
  </lab-anssi-fonctionnalites>

  <style>
    lab-anssi-fonctionnalites {
      --padding-composant: 96px 0;
    }
  </style>
{/snippet}

<Story name="Fonctionnalités clés (Home MSS)" />
