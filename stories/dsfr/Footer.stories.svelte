<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect } from "storybook/test";
  import { type ComponentProps } from "svelte";

  import {
    footerArgTypes,
    footerArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/footer/template/stories/footer-arg-types.js";

  import DsfrFooter from "$lib/dsfr/DsfrFooter.svelte";
  import "$lib/dsfr/DsfrLink.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  import PlaceholderPortrait from "@gouvfr/dsfr/example/img/placeholder.9x16.png";
  import PlaceholderPaysage from "@gouvfr/dsfr/example/img/placeholder.16x9.png";

  delete footerArgTypes.bottomCopyright;
  delete footerArgTypes.hasTopFooter;
  delete footerArgTypes.isMourning;
  delete footerArgs.bottomCopyright;
  delete footerArgs.hasTopFooter;
  delete footerArgs.isMourning;

  const { Story } = defineMeta({
    title: "Composants/DSFR/Footer",
    component: DsfrFooter,
    argTypes: {
      ...footerArgTypes,
      compact: {
        control: "boolean",
        description: "Affiche uniquement le bloc du bas",
        type: {
          value: "boolean",
        },
        table: { category: "bottom" },
      },
    },
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
    parameters: {
      docs: {
        description: {
          component:
            "Le pied de page propose des éléments d’information sur le site et une navigation secondaire pour l’utilisateur afin qu’il poursuive son parcours. Il est modulable selon les besoins et les exigences du site.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/pied-de-page)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-footer"),
        },
      },
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
    compact={args.compact || undefined}
  ></dsfr-footer>
{/snippet}

<Story
  name="Par défaut"
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-footer");
    const shadow = el?.shadowRoot;

    await step("Le logo est présent", async () => {
      const logo = shadow?.querySelector(".fr-logo");

      await expect(logo).toBeTruthy();
    });

    await step(
      "Les 4 liens institutionnels sont présents avec les bons labels et href",
      async () => {
        const expectedLinks = [
          { label: "info.gouv.fr", href: "https://info.gouv.fr" },
          { label: "service-public.gouv.fr", href: "https://service-public.gouv.fr" },
          { label: "legifrance.gouv.fr", href: "https://legifrance.gouv.fr" },
          { label: "data.gouv.fr", href: "https://data.gouv.fr" },
        ];
        const contentLinks = shadow?.querySelectorAll(".fr-footer__content-link");

        await expect(contentLinks?.length).toBe(4);

        for (let i = 0; i < expectedLinks.length; i++) {
          await expect(contentLinks?.[i]?.textContent?.trim()).toBe(expectedLinks[i].label);
          await expect(contentLinks?.[i]?.getAttribute("href")).toBe(expectedLinks[i].href);
        }
      },
    );

    await step("Les liens du bas sont présents avec les bons labels", async () => {
      const bottomLinksData =
        (args as unknown as { bottomLinks: { label: string }[] }).bottomLinks ?? [];
      const bottomLinks = shadow?.querySelectorAll(".fr-footer__bottom-link");

      await expect(bottomLinks?.length).toBe(bottomLinksData.length);

      for (let i = 0; i < bottomLinksData.length; i++) {
        await expect(bottomLinks?.[i]?.textContent?.trim()).toBe(bottomLinksData[i].label);
      }
    });
  }}
/>
