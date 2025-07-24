const ANSSI = "ANSSI - Agence nationale de la sécurité des systèmes d'information";
const MODAL_ID = "dsc-modal";
const MODAL_TRIGGER_ID = "dsc-modal-button";

const dataSection1 = {
  title: "Former",
  description:
    "Formez vos élèves à la cybersécurité grâce au kit pédagogique CyberEnjeux et à la présentation.",
  cardItems: [
    {
      detailStart: "Libellé",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tagItems: ["Libellé tag"],
      hasDetailStart: true,
      hasTag: true,
    },
    {
      detailStart: "Libellé",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tagItems: ["Libellé tag"],
      badgeItems: ["Libellé badge"],
      hasDetailStart: true,
      hasTag: true,
    },
    {
      detailStart: "Libellé",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tagItems: ["Libellé tag"],
      hasDetailStart: true,
      hasTag: true,
    },
    {
      detailStart: "Libellé",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tagItems: ["Libellé tag"],
      hasDetailStart: true,
      hasTag: true,
      blank: true,
    },
  ],
  hasVisual: true,
};

const dataSection2 = {
  title: "Sensibiliser",
  description: "Des ressources pour pouvoir parler de la cyber à vos élèves.",
  cardItems: [
    {
      detailStart: "Libellé",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tagItems: ["Libellé tag"],
      hasDetailStart: true,
      hasTag: true,
      blank: true,
    },
    {
      detailStart: "Libellé",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tagItems: ["Libellé tag"],
      hasDetailStart: true,
      hasTag: true,
      blank: true,
    },
  ],
};

const dataSection3 = {
  title: "Guider",
  description:
    "L’ANSSI répertorie toutes les formations cyber labelisées, n’hésitez pas à en prendre connaissances pour en parler à vos élèves.",
  cardItems: [
    {
      detailStart: "Libellé",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tagItems: ["Libellé tag"],
      hasDetailStart: true,
      hasTag: true,
      blank: true,
    },
  ],
};

const dataSection4 = {
  title: "Se former",
  description:
    "Trouvez des formations sur le numérique et la cybersécurité pour développer vos compétences et renforcer vos connaissances dans un domaine en constante évolution.",
  cardItems: [
    {
      detailStart: "Libellé",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tagItems: ["Libellé tag"],
      hasDetailStart: true,
      hasTag: true,
      blank: true,
    },
    {
      detailStart: "Libellé",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      tagItems: ["Libellé tag"],
      hasDetailStart: true,
      hasTag: true,
      blank: true,
    },
  ],
};

export const headerData = {
  brandService: "DemainSpécialisteCyber",
  brandTagline: "Innovation ANSSI",
  brandLinkTitle: `Accueil - ${ANSSI}`,
  brandOperatorAlt: ANSSI,
  brandOperatorSrc: "/illustrations/logo-anssi.svg",
  brandOperatorStyle: "width: 4.125rem",
  modalId: MODAL_ID,
  modalTriggerId: MODAL_TRIGGER_ID,
  hasBrandTagline: true,
  hasBrandOperator: true,
};

export const sectionsData = [dataSection1, dataSection2, dataSection3, dataSection4];

export const navData = {
  id: "navigation-7776",
  ariaLabel: "Menu principal",
  items: [
    { title: "Accueil", href: "#", current: false },
    { title: "Explorer les ressources", href: "#", current: false },
    { title: "Sélection pour les enseignants", href: "#", current: true },
    { title: "Sélection pour les élèves", href: "#", current: false },
    { title: "Découvrir CyberEnJeux", href: "#", current: false },
  ],
};

export const bannerData = {
  title: "Ressources pour les enseignants",
  description:
    "Formez, sensibilisez, accompagnez vos élèves… et développez aussi vos propres compétences en cybersécurité",
};

export const breadcrumbData = {
  id: "ds-breadcrumb",
  spacing: "fr-m-0 fr-mb-1v",
  items: [
    { label: "Accueil", href: "/", current: false },
    { label: "Sélection pour les enseignants", href: "/", current: true },
  ],
};

export const segmentedItems = [
  { title: "Former", href: "#section1" },
  { title: "Sensibiliser", href: "#section2" },
  { title: "Guider", href: "#section3", active: true },
  { title: "Se former", href: "#section4" },
];

export const footerData = {
  id: "footer-7929",
  hasDescription: true,
  brandLinkId: "logoFooter",
  brandLinkHref: "/",
  brandLinkTitle:
    "Retour à l’accueil du site - Nom de l’entité (ministère, secrétariat d'état, gouvernement)",
  hasPartners: true,
  partnerTitle: "Partenaires",
  mainPartnerSrc: "/illustrations/placeholder.16x9.png",
  mainPartnerHref: "https://www.ssi.gouv.fr",
  mainPartnerStyle: "height: 5.625rem",
  contentLinks: [
    {
      title: "info.gouv.fr",
      href: "https://info.gouv.fr",
    },
    {
      title: "service-public.fr",
      href: "https://service-public.fr",
    },
    {
      title: "legifrance.gouv.fr",
      href: "https://legifrance.gouv.fr",
    },
    {
      title: "data.gouv.fr",
      href: "https://data.gouv.fr",
    },
  ],
  bottomLinks: [
    {
      title: "A propos",
      href: "/",
    },
    {
      title: "Mentions légales",
      href: "/",
    },
    {
      title: "Politique de confidentialité",
      href: "/",
    },
    {
      title: "Conditions générales d’utilisation",
      href: "/",
    },
    {
      title: "Statistiques d’utilisation",
      href: "/",
    },
    {
      title: "Sécurité",
      href: "/",
    },
    {
      title: "Accessibilité : non conforme",
      href: "/",
    },
  ],
};
