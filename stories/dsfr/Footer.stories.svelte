<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    footerArgTypes,
    footerArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/footer/template/stories/footer-arg-types.js";

  import DsfrFooter from "$lib/dsfr/DsfrFooter.svelte";

  import PlaceholderPortrait from "@gouvfr/dsfr/example/img/placeholder.9x16.png";
  import PlaceholderPaysage from "@gouvfr/dsfr/example/img/placeholder.16x9.png";

  delete footerArgTypes.bottomCopyright;
  delete footerArgTypes.hasTopFooter;
  delete footerArgTypes.isMourning;
  delete footerArgs.bottomCopyright;
  delete footerArgs.hasTopFooter;
  delete footerArgs.isMourning;

  const { Story } = defineMeta({
    title: "Composants/dsfr/Footer",
    component: DsfrFooter,
    argTypes: footerArgTypes,
    args: {
      ...footerArgs,
      brandOperatorSrc: PlaceholderPortrait,
      mainPartnerSrc: PlaceholderPaysage,
      subPartners: [
        {
          src: PlaceholderPaysage,
          href: "#",
          alt: "Intitulé du partenaire secondaire",
          style: "height: 5.625rem",
        },
        {
          src: PlaceholderPaysage,
          href: "#",
          alt: "Intitulé du partenaire secondaire",
          style: "height: 5.625rem",
        },
        {
          src: PlaceholderPaysage,
          href: "#",
          alt: "Intitulé du partenaire secondaire",
          style: "height: 5.625rem",
        },
      ],
    },
  });
</script>

<Story name="Défaut" />
