<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    navigationArgTypes,
    navigationArgs,
    getItemArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/navigation/template/stories/navigation-arg-types.js";
  import Placeholder from "@gouvfr/dsfr/example/img/placeholder.16x9.png";

  import DsfrNavigation from "$lib/dsfr/DsfrNavigation.svelte";
  import DsfrBadge from "$lib/dsfr/DsfrBadge.svelte";
  import DsfrCard from "$lib/dsfr/DsfrCard.svelte";

  import webComponentSourceCode from "../../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Exemples/DSFR",
    component: DsfrNavigation,
    argTypes: navigationArgTypes,
    args: {
      ...navigationArgs,
      items: [
        {
          label: "Protéger mon organisation",
          type: "mega-menu",
          collapsable: true,
          collapseId: "menu-proteger",
          rich: true,
        },
        { label: "Directive NIS2", href: "#" },
        { label: "Catalogue Cyber", href: "#" },
        { label: "Test de maturité cyber", href: "#" },
        {
          label: "Contact utiles",
          type: "menu",
          collapsable: true,
          collapseId: "menus-contacts",
          items: [
            { label: "Contacts cyber", href: "#" },
            { label: "Prestataires qualifiés et labellisés", href: "#" },
          ],
        },
        { label: "Financements", href: "#" },
      ],
    },
    parameters: {
      docs: {
        source: {
          transform: webComponentSourceCode("dsfr-navigation"),
        },
      },
    },
    tags: ["!autodocs"],
    render: template,
  });

  type Args = ComponentProps<DsfrNavigation>;
</script>

{#snippet template(args: Args)}
  <dsfr-navigation
    id={args.id}
    aria-label={args.ariaLabel}
    items={args.items}
    rich={args.rich || undefined}
  >
    <div slot="menu-proteger-0" class="slot-content">
      <div class="mega-menu-main">
        <h2 class="mega-menu-main__title">Lorem ipsum dolor sit amet, consectetur</h2>
        <p class="mega-menu-main__description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies purus a erat
          molestie finibus. Cras finibus sem dui, vel consectetur elit dignissim ut. Vestibulum nec
          finibus sapien.
        </p>
      </div>

      <dsfr-card
        title="Parcours de sécurisation : préparez-vous progressivement à NIS 2"
        has-description
        description="Un parcours pensé pour les organisations qui souhaitent aller plus loin dans leur démarche de sécurisation, notamment si elles sont concernées..."
        href="#"
        has-header-badge
        src={Placeholder}
      >
        <dsfr-badge
          slot="headerbadges"
          label="Recommandé pour"
          type="accent"
          accent="yellow-tournesol"
          size="sm"
        ></dsfr-badge>
      </dsfr-card>
      <dsfr-card
        title="Cyberdépart : une liste d’actions simples pour réduire les riques les plus fréquents"
        has-description
        description="Une liste d’actions adaptées aux organisations qui débutent en cybersécurité, qui disposent de peu de temps ou qui souhaitent mettre en place les..."
        href="#"
        has-header-badge
        src={Placeholder}
      >
        <dsfr-badge
          slot="headerbadges"
          label="Recommandé pour"
          type="accent"
          accent="yellow-tournesol"
          size="sm"
        ></dsfr-badge>
      </dsfr-card>
    </div>
  </dsfr-navigation>

  <style>
    .slot-content {
      display: flex;
      gap: 1.5rem;
    }

    .mega-menu-main__title {
      font-size: 28px;
      line-height: 36px;
      font-weight: 700;
      margin-block: 0 24px;
    }

    .mega-menu-main__description {
      margin-block: 0;
      font-size: 16px;
      line-height: 24px;
    }
  </style>
{/snippet}

<Story
  name="Navigation - Mega Menus avec slot"
  args={{
    id: "navigation-mega-menus",
  }}
/>
