<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

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
    render: template,
  });

  type Args = ComponentProps<DsfrFooter>;
</script>

{#snippet template(args: Args)}
  <dsfr-footer
    id={args.id}
    is-mourning={args.isMourning || undefined}
    brand-logo-title={args.brandLogoTitle}
    brand-link-title={args.brandLinkTitle}
    brand-link-href={args.brandLinkHref}
    brand-link-id={args.brandLinkId}
    has-brand-operator={args.hasBrandOperator || undefined}
    brand-operator-alt={args.brandOperatorAlt}
    brand-operator-src={args.brandOperatorSrc}
    brand-operator-style={args.brandOperatorStyle}
    has-description={args.hasDescription || undefined}
    content-description={args.contentDescription}
    has-partners={args.hasPartners || undefined}
    partner-title={args.partnerTitle}
    main-partner-src={args.mainPartnerSrc}
    main-partner-href={args.mainPartnerHref}
    main-partner-alt={args.mainPartnerAlt}
    main-partner-style={args.mainPartnerStyle}
    sub-partners={JSON.stringify(args.subPartners)}
    bottom-links={JSON.stringify(args.bottomLinks)}
    bottom-copyright={args.bottomCopyright}
  ></dsfr-footer>
{/snippet}

<Story name="Défaut" />
