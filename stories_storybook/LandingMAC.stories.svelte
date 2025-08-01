<script context="module" lang="ts">
  import type { Image } from "$lib/types";
  import { genereImageDePlaceholder } from "$lib/generateurImagesPlaceholders";

  import Marelle from "$lib/lab/vitrines-produits/briques/marelle/Marelle.svelte";
  import BriqueHero from "$lib/lab/vitrines-produits/briques/BriqueHero.svelte";
  import BriqueTitreMultimedia from "$lib/lab/vitrines-produits/briques/BriqueTitreMultimedia.svelte";
  import Temoignages from "$lib/lab/vitrines-produits/briques/temoignages/Temoignages.svelte";
  import PresentationANSSI from "$lib/lab/vitrines-produits/briques/PresentationANSSI.svelte";
  import RejoindreLaCommunaute from "$lib/lab/vitrines-produits/briques/RejoindreLaCommunaute.svelte";
  import CarrouselTuiles from "$lib/lab/vitrines-produits/briques/CarrouselTuiles/CarrouselTuiles.svelte";

  const imageAffichee: Image = {
    lien: genereImageDePlaceholder(600, 400, "Illustration de couverture"),
    alt: "",
  };

  export const meta = {
    title: "Exemple/Landing MonAideCyber",
    component: PresentationANSSI,
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
  };
</script>

<script>
  import { Story, Template } from "@storybook/addon-svelte-csf";
</script>

<Template let:args>
  <BriqueHero
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
  />
  <CarrouselTuiles tuiles={args.tuiles} />
  <BriqueTitreMultimedia
    titre="Découvrez MonAideCyber en vidéo"
    multimedia={{
      source:
        "https://monservicesecurise-ressources.cellar-c2.services.clever-cloud.com/Video_MonServiceSecurise_Thumbnail.mp4",
      sourcesoustitres:
        "https://monservicesecurise-ressources.cellar-c2.services.clever-cloud.com/Nouvelle_doctrine_homologation.vtt",
      imagedecouverture: genereImageDePlaceholder(792, 446, "Vidéo d'exemple"),
    }}
  />
  <Marelle
    titre="Titre"
    etapesmarelle={args.etapesmarelle}
    action={{
      titre: "Action",
      lien: "#",
    }}
  />
  <Temoignages
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
  />
  <RejoindreLaCommunaute
    titre="Rejoignez la communauté des Aidants cyber !"
    raisons={[
      "Echanger directement avec les autres Aidants cyber",
      "Participer activement au développement du diagnostic cyber en nous partageant vos besoins et suggestions d'amélioration",
    ]}
    action={{ titre: "Rejoindre la communauté", lien: "#" }}
    illustration={{ lien: genereImageDePlaceholder(600, 400, "Image de substitution"), alt: "" }}
  />
  <PresentationANSSI />
</Template>

<Story name="Defaut" />
