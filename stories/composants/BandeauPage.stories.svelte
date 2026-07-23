<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import BandeauPage from "$lib/composants/BandeauPage.svelte";
  import DsfrBadgesGroup from "$lib/dsfr/DsfrBadgesGroup.svelte";
  import DsfrBreadcrumb from "$lib/dsfr/DsfrBreadcrumb.svelte";
  import DsfrButtonsGroup from "$lib/dsfr/DsfrButtonsGroup.svelte";

  const { Story } = defineMeta({
    title: "Composants/Lab ANSSI/Bandeau page",
    component: BandeauPage,
    argTypes: {
      actions: {
        description: "Boutons ou liens d'action affichés sous la description du bandeau",
        control: false,
        table: { category: "Slots" },
      },
    },
    args: {
      titre: "Titre lorem ipsum",
      baliseTitre: "h1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tincidunt felis in velit semper euismod.",
      inverse: false,
      urlImage: "/images/hero-placeholder.jpg",
      sansImage: false,
      boutons: [
        {
          label: "Libellé",
          kind: "inverted-primary",
        },
        {
          label: "Libellé",
          kind: "inverted-secondary",
        },
      ],
      liensFilAriane: [
        {
          id: "segment-0",
          label: "Accueil",
          href: "/#",
        },
        {
          id: "segment-1",
          label: "Page N2",
          href: "#",
        },
        {
          id: "segment-2",
          label: "Page N3",
          href: "#",
        },
        {
          id: "segment-3",
          label: "Page en cours",
          href: "#",
        },
      ],
      avecBadges: false,
      badges: [
        {
          label: "Libellé",
          accent: "purple-glycine",
          hasIcon: false,
          hasNoIcon: false,
          ellipsis: false,
        },
      ],
    },
    render: template,
  });

  type Args = ComponentProps<BandeauPage>;

  const boutonsInverse = [
    {
      label: "Libellé",
      kind: "primary",
    },
    {
      label: "Libellé",
      kind: "secondary",
    },
  ];
</script>

{#snippet template(args: Args)}
  <lab-anssi-bandeau-page
    titre={args.titre}
    balise-titre={args.baliseTitre}
    description={args.description}
    mention={args.mention}
    inverse={args.inverse || undefined}
    url-image={args.urlImage}
    sans-image={args.sansImage || undefined}
    avec-fil-ariane={args.avecFilAriane || undefined}
    liens-fil-ariane={JSON.stringify(args.liensFilAriane)}
    simple={args.simple || undefined}
    fiche-catalogue={args.ficheCatalogue || undefined}
  >
    {#if args.avecBadges}
      <dsfr-badges-group slot="badgesgroup" badges={args.badges} size="md"></dsfr-badges-group>
    {/if}

    <dsfr-buttons-group
      slot="buttonsgroup"
      buttons={args.boutons}
      inline="md"
      data-themeable="false"
    ></dsfr-buttons-group>
  </lab-anssi-bandeau-page>
{/snippet}

<Story name="Defaut" />

<Story name="Avec Fil d'Ariane" args={{ avecFilAriane: true }} />

<Story
  name="Avec une mention"
  args={{ mention: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }}
/>

<Story name="Avec un groupe de badges" args={{ avecBadges: true }} />

<Story name="Inverse" args={{ inverse: true, boutons: boutonsInverse }} />

<Story
  name="Inverse (avec Fil d'Ariane)"
  args={{ inverse: true, avecFilAriane: true, boutons: boutonsInverse }}
/>

<Story name="Simple" args={{ simple: true }} />

<Story name="Simple (avec Fil d'Ariane)" args={{ simple: true, avecFilAriane: true }} />

<Story
  name="Fiche catalogue (avec Fil d'Ariane)"
  args={{ ficheCatalogue: true, avecFilAriane: true }}
/>
