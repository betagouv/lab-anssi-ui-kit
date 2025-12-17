<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import type { Image } from "$lib/types";
  import { genereImageDePlaceholder } from "../utilitaires/generateurImagesPlaceholders";

  // @ts-ignore: Required Import to use this component as webcomponent
  import Marelle from "$lib/composants/vitrines-produits/briques/marelle/Marelle.svelte";
  // @ts-ignore: Required Import to use this component as webcomponent
  import BriqueHero from "$lib/composants/vitrines-produits/briques/BriqueHero.svelte";
  // @ts-ignore: Required Import to use this component as webcomponent
  import BriqueTitreMultimedia from "$lib/composants/vitrines-produits/briques/BriqueTitreMultimedia.svelte";
  // @ts-ignore: Required Import to use this component as webcomponent
  import Temoignages from "$lib/composants/vitrines-produits/briques/temoignages/Temoignages.svelte";
  // @ts-ignore: Required Import to use this component as webcomponent
  import PresentationANSSI from "$lib/composants/vitrines-produits/briques/PresentationANSSI.svelte";
  // @ts-ignore: Required Import to use this component as webcomponent
  import RejoindreLaCommunaute from "$lib/composants/vitrines-produits/briques/RejoindreLaCommunaute.svelte";
  // @ts-ignore: Required Import to use this component as webcomponent
  import CarrouselTuiles from "$lib/composants/vitrines-produits/briques/CarrouselTuiles/CarrouselTuiles.svelte";

  const imageAffichee: Image = {
    lien: genereImageDePlaceholder(600, 400, "Illustration de couverture"),
    alt: "",
  };

  const { Story } = defineMeta({
    title: "Exemple/ANSSI/Landing MonAideCyber",
    component: PresentationANSSI,
    render: template,
    argTypes: {
      tuiles: [
        {
          titre: "Un dispositif étatique",
          contenu:
            "Pourquoi, quoi, quand, qui, comment ? L'homologation de sécurité a été pensée pour être accessible à tous.",
          illustration: {
            lien: genereImageDePlaceholder(96, 97),
            alt: "",
          },
        },
        {
          titre: "Proportionnée",
          contenu: `D'une démarche "simplifiée" à une démarche "renforcée", l'homologation doit être adaptée à la criticité d'un système et à son exposition au risque.`,
          illustration: {
            lien: genereImageDePlaceholder(96, 97),
            alt: "",
          },
        },
        {
          titre: "Adaptée à vos usages",
          contenu:
            "Une homologation simplifiée pensée pour répondre à la diversité des contextes de mise en oeuvre de l'homologation de sécurité de vos systèmes d'homologation.",
          illustration: {
            lien: genereImageDePlaceholder(96, 97),
            alt: "",
          },
        },
      ],
      etapesmarelle: [
        {
          description: "Description",
          illustration: {
            lien: genereImageDePlaceholder(600, 400, "Illustration première étape"),
            alt: "",
          },
          lien: { href: "#", texte: "Lien vers ressource interne" },
          titre: "Première étape",
        },
        {
          description: "Description étape 2",
          illustration: {
            lien: genereImageDePlaceholder(600, 400, "Illustration deuxième étape"),
            alt: "",
          },
          lien: { href: "#", target: "_blank", texte: "Lien vers ressource externe" },
          titre: "Deuxième étape",
        },
      ],
    },
    tags: ["!autodocs"],
  });

  type Args = ComponentProps<PresentationANSSI>;
</script>

{#snippet template(args: Args)}
  <lab-anssi-brique-hero
    titre="MonAideCyber"
    soustitre="Des Aidants cyber mobilisés pour aider les entités publiques et privées à prendre leur cyberdépart !"
    illustration={imageAffichee}
    actiongauche={{
      titre: "Devenir Aidant cyber",
      lien: "https://monaide.cyber.gouv.fr/realiser-des-diagnostics-anssi",
    }}
    actiondroite={{
      titre: "Bénéficier d'un diagnostic cyber",
      lien: "https://messervices.cyber.gouv.fr/cyberdepart",
      target: "_blank",
    }}
  ></lab-anssi-brique-hero>
  <lab-anssi-carrousel-tuiles tuiles={args.tuiles}></lab-anssi-carrousel-tuiles>
  <lab-anssi-titre-multimedia
    titre="Découvrez MonAideCyber en vidéo"
    multimedia={{
      source:
        "https://monservicesecurise-ressources.cellar-c2.services.clever-cloud.com/Video_MonServiceSecurise_Thumbnail.mp4",
      sourcesoustitres:
        "https://monservicesecurise-ressources.cellar-c2.services.clever-cloud.com/Nouvelle_doctrine_homologation.vtt",
      imagedecouverture: genereImageDePlaceholder(792, 446, "Vidéo d'exemple"),
    }}
  ></lab-anssi-titre-multimedia>
  <lab-anssi-marelle
    titre="Titre"
    etapesmarelle={args.etapesmarelle}
    action={{
      titre: "Action",
      lien: "#",
    }}
  ></lab-anssi-marelle>
  <lab-anssi-temoignages
    titre="Les témoignages de nos Aidants cyber"
    temoignages={[
      {
        citation:
          "Encore merci pour cet outil qui, une fois la communauté d’aidants réunionnaise structurée et formée, nous aidera grandement dans le passage à l’échelle.",
        auteur: "Matthieu D.",
        source: "Un utilisateur de La Réunion (974)",
      },
      {
        citation:
          "MonAideCyber remplit très bien sa mission, et le fait de pouvoir tout de suite donner un rapport aux interlocuteurs est un réel atout.",
        auteur: "Didier L.",
        source: "Un Aidant cyber, réserviste de la Police, dans le Rhône (69)",
      },
    ]}
  ></lab-anssi-temoignages>
  <lab-anssi-brique-rejoindre-la-communaute
    titre="Rejoignez la communauté des Aidants cyber !"
    raisons={[
      "Echanger directement avec les autres Aidants cyber",
      "Participer activement au développement du diagnostic cyber en nous partageant vos besoins et suggestions d'amélioration",
    ]}
    action={{ titre: "Rejoindre la communauté", lien: "#" }}
    illustration={{ lien: genereImageDePlaceholder(600, 400, "Image de substitution"), alt: "" }}
  ></lab-anssi-brique-rejoindre-la-communaute>
  <lab-anssi-presentation-anssi></lab-anssi-presentation-anssi>
{/snippet}

<Story name="Defaut" />
