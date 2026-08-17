<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import BlocFonctionnalites from "$lib/composants/BlocFonctionnalites.svelte";

  import DsfrButton from "$lib/dsfr/DsfrButton.svelte";
  import DsfrContainer from "$lib/dsfr/DsfrContainer.svelte";
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

  const fonctionnalitesAvecId = [
    {
      titre: "Analyse de risques",
      description: "Identifiez et évaluez les risques cyber de votre organisation.",
      id: "analyse",
      rich: true,
    },
    {
      titre: "Plan d'action",
      description: "Définissez et suivez vos mesures de sécurité prioritaires.",
      id: "plan",
      rich: true,
    },
    {
      titre: "Tableau de bord",
      description: "Visualisez l'état de votre sécurité en un coup d'œil.",
      id: "tableau",
      rich: true,
    },
    {
      titre: "Alertes",
      description: "Recevez des notifications en temps réel sur les menaces.",
      id: "alertes",
      rich: true,
    },
  ];

  const { Story } = defineMeta({
    title: "Composants/Lab ANSSI/Bloc fonctionnalités",
    component: BlocFonctionnalites,
    argTypes: {
      media: {
        description:
          "Remplace tout le contenu de la zone média. L'attribut `data-active-item` sur le host reflète l'`id` de la fonctionnalité active.",
        control: false,
        table: { category: "Slots" },
      },
      "media-{id}": {
        description:
          "Contenu personnalisé cloné dans la zone média quand la fonctionnalité correspondante est active. Nécessite `rich: true` et un `id` sur la fonctionnalité.",
        control: false,
        table: { category: "Slots" },
      },
    },
    args: {
      titre: "Titre lorem ipsum",
      baliseTitre: "h2",
      balisesDesSousTitres: "h3",
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
  <div class="conteneur-story">
    <DsfrContainer>
      <lab-anssi-fonctionnalites
        titre={args.titre}
        description={args.description}
        balise-titre={args.baliseTitre}
        avec-controle-segmente={args.avecControleSegmente || undefined}
        elements-du-controle-segmente={JSON.stringify(args.elementsDuControleSegmente)}
        fonctionnalites={args.fonctionnalites}
        balise-des-sous-titres={args.baliseDesSousTitres}
        cliquable={args.cliquable || undefined}
        avec-cta={args.avecCTA || undefined}
        orientation-media={args.orientationMedia}
        image-placeholder={args.imagePlaceholder}
        active-defilement={args.activeDefilement}
        delai-defilement={args.delaiDefilement}
      >
        {#if args.afficheSlotHautEntete}
          <dsfr-tags-group slot="hautentete" group-markup="ul" {tags}></dsfr-tags-group>
        {/if}

        <dsfr-button label="Libellé" slot="cta"></dsfr-button>
      </lab-anssi-fonctionnalites>
    </DsfrContainer>
  </div>

  <style>
    .conteneur-story {
      padding-block: 96px;
    }
  </style>
{/snippet}

<Story name="Par défaut (non cliquable)" />

<Story name="Sans description principale" args={{ description: undefined }} />

<Story name="Avec Tags dans l'entête" args={{ afficheSlotHautEntete: true }} />

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

<Story name="Avec CTA" args={{ avecCTA: true }} />

<Story
  name="Cliquable"
  args={{
    cliquable: true,
  }}
/>

<Story
  name="Cliquable avec défilement automatique"
  args={{
    cliquable: true,
    activeDefilement: true,
  }}
/>

<Story
  name={"Avec slot media-{id}"}
  args={{
    cliquable: true,
    fonctionnalites: fonctionnalitesAvecId,
    activeDefilement: true,
  }}
>
  {#snippet template(args: Args)}
    <div class="conteneur-story">
      <DsfrContainer>
        <lab-anssi-fonctionnalites
          titre={args.titre}
          description={args.description}
          fonctionnalites={args.fonctionnalites}
          cliquable={args.cliquable || undefined}
          active-defilement={args.activeDefilement || undefined}
        >
          <div
            slot="media-analyse"
            class="slot-media-id-demo"
            style="background:linear-gradient(135deg,#e8edff,#cacafb)"
          >
            <svg viewBox="0 0 200 200" width="240" height="240" xmlns="http://www.w3.org/2000/svg">
              <style>
                @keyframes radar-pulse {
                  0% {
                    r: 10;
                    opacity: 0.8;
                  }
                  100% {
                    r: 80;
                    opacity: 0;
                  }
                }
                @keyframes radar-sweep {
                  from {
                    transform: rotate(0deg);
                  }
                  to {
                    transform: rotate(360deg);
                  }
                }
                .rp {
                  fill: none;
                  stroke: #0063cb;
                  stroke-width: 1.5;
                  animation: radar-pulse 3s ease-out infinite;
                }
                .rp2 {
                  animation-delay: 1s;
                }
                .rp3 {
                  animation-delay: 2s;
                }
                .rs {
                  transform-origin: 100px 100px;
                  animation: radar-sweep 4s linear infinite;
                }
              </style>
              <circle
                cx="100"
                cy="100"
                r="60"
                fill="none"
                stroke="#0063cb"
                stroke-width=".5"
                opacity=".3"
              />
              <circle
                cx="100"
                cy="100"
                r="40"
                fill="none"
                stroke="#0063cb"
                stroke-width=".5"
                opacity=".3"
              />
              <circle
                cx="100"
                cy="100"
                r="20"
                fill="none"
                stroke="#0063cb"
                stroke-width=".5"
                opacity=".3"
              />
              <circle cx="100" cy="100" r="10" class="rp" />
              <circle cx="100" cy="100" r="10" class="rp rp2" />
              <circle cx="100" cy="100" r="10" class="rp rp3" />
              <line
                x1="100"
                y1="100"
                x2="100"
                y2="30"
                stroke="#0063cb"
                stroke-width="2"
                class="rs"
              />
              <circle cx="100" cy="100" r="5" fill="#0063cb" />
            </svg>
          </div>

          <div
            slot="media-plan"
            class="slot-media-id-demo"
            style="background:linear-gradient(135deg,#ffe9e6,#ffd0c7)"
          >
            <svg viewBox="0 0 200 200" width="240" height="240" xmlns="http://www.w3.org/2000/svg">
              <style>
                @keyframes bar-grow {
                  0%,
                  100% {
                    transform: scaleY(0.1);
                  }
                  40%,
                  60% {
                    transform: scaleY(1);
                  }
                }
                .bg {
                  transform-box: fill-box;
                  transform-origin: bottom;
                  animation: bar-grow 3s ease-in-out infinite;
                }
                .bg2 {
                  animation-delay: 0.2s;
                }
                .bg3 {
                  animation-delay: 0.4s;
                }
                .bg4 {
                  animation-delay: 0.6s;
                }
                .bg5 {
                  animation-delay: 0.8s;
                }
              </style>
              <line
                x1="30"
                y1="40"
                x2="175"
                y2="40"
                stroke="#b34000"
                stroke-width=".3"
                opacity=".2"
              />
              <line
                x1="30"
                y1="80"
                x2="175"
                y2="80"
                stroke="#b34000"
                stroke-width=".3"
                opacity=".2"
              />
              <line
                x1="30"
                y1="120"
                x2="175"
                y2="120"
                stroke="#b34000"
                stroke-width=".3"
                opacity=".2"
              />
              <line
                x1="30"
                y1="160"
                x2="175"
                y2="160"
                stroke="#b34000"
                stroke-width=".3"
                opacity=".2"
              />
              <rect x="38" y="60" width="22" height="100" rx="4" fill="#b34000" class="bg" />
              <rect
                x="68"
                y="80"
                width="22"
                height="80"
                rx="4"
                fill="#b34000"
                opacity=".8"
                class="bg bg2"
              />
              <rect
                x="98"
                y="40"
                width="22"
                height="120"
                rx="4"
                fill="#b34000"
                opacity=".9"
                class="bg bg3"
              />
              <rect
                x="128"
                y="100"
                width="22"
                height="60"
                rx="4"
                fill="#b34000"
                opacity=".7"
                class="bg bg4"
              />
              <rect
                x="158"
                y="50"
                width="22"
                height="110"
                rx="4"
                fill="#b34000"
                opacity=".85"
                class="bg bg5"
              />
            </svg>
          </div>

          <div
            slot="media-tableau"
            class="slot-media-id-demo"
            style="background:linear-gradient(135deg,#bafaee,#a0e8d8)"
          >
            <svg viewBox="0 0 200 200" width="240" height="240" xmlns="http://www.w3.org/2000/svg">
              <style>
                @keyframes orbit {
                  from {
                    transform: rotate(0deg);
                  }
                  to {
                    transform: rotate(360deg);
                  }
                }
                .orb {
                  transform-origin: 100px 100px;
                  animation: orbit 3s linear infinite;
                }
                .orb2 {
                  animation-duration: 5s;
                  animation-direction: reverse;
                }
                .orb3 {
                  animation-duration: 7s;
                }
              </style>
              <circle
                cx="100"
                cy="100"
                r="70"
                fill="none"
                stroke="#37635f"
                stroke-width=".5"
                opacity=".3"
              />
              <circle
                cx="100"
                cy="100"
                r="50"
                fill="none"
                stroke="#37635f"
                stroke-width=".5"
                opacity=".3"
              />
              <circle
                cx="100"
                cy="100"
                r="30"
                fill="none"
                stroke="#37635f"
                stroke-width=".5"
                opacity=".3"
              />
              <g class="orb"><circle cx="170" cy="100" r="6" fill="#37635f" /></g>
              <g class="orb2"><circle cx="150" cy="100" r="4" fill="#37635f" opacity=".7" /></g>
              <g class="orb3"><circle cx="130" cy="100" r="3" fill="#37635f" opacity=".5" /></g>
              <circle cx="100" cy="100" r="8" fill="#37635f" />
            </svg>
          </div>

          <div
            slot="media-alertes"
            class="slot-media-id-demo"
            style="background:linear-gradient(135deg,#feebd0,#f5d5a8)"
          >
            <svg viewBox="0 0 200 200" width="240" height="240" xmlns="http://www.w3.org/2000/svg">
              <style>
                @keyframes beacon {
                  0% {
                    r: 15;
                    opacity: 0.6;
                  }
                  100% {
                    r: 70;
                    opacity: 0;
                  }
                }
                .bcn {
                  fill: none;
                  stroke: #695240;
                  stroke-width: 2;
                  animation: beacon 2s ease-out infinite;
                }
                .bcn2 {
                  animation-delay: 0.7s;
                }
                .bcn3 {
                  animation-delay: 1.4s;
                }
              </style>
              <circle cx="100" cy="100" r="15" class="bcn" />
              <circle cx="100" cy="100" r="15" class="bcn bcn2" />
              <circle cx="100" cy="100" r="15" class="bcn bcn3" />
              <path d="M100 70 L120 85 L120 115 L100 125 L80 115 L80 85 Z" fill="#695240" />
              <path
                d="M92 95 L98 105 L112 85"
                fill="none"
                stroke="white"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </lab-anssi-fonctionnalites>
      </DsfrContainer>
    </div>

    <style>
      .conteneur-story {
        padding-block: 96px;
      }

      :global(.slot-media-id-demo) {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        aspect-ratio: 588 / 528;
        border-radius: 16px;
      }
    </style>
  {/snippet}
</Story>
