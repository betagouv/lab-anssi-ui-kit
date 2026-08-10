<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import BandeauPage from "$lib/composants/BandeauPage.svelte";

  import DsfrBadgesGroup from "$lib/dsfr/DsfrBadgesGroup.svelte";
  import DsfrButtonsGroup from "$lib/dsfr/DsfrButtonsGroup.svelte";

  const { Story } = defineMeta({
    title: "Composants/Lab ANSSI/Bandeau page",
    component: BandeauPage,
    argTypes: {
      type: {
        description: "Type du bandeau",
        control: { type: "select" },
        options: ["simple", "fiche"],
      },
      theme: {
        description: "Thème du bandeau",
        control: { type: "select" },
        options: ["clair", "sombre"],
      },
      badgesgroup: {
        description: "Groupe de badges affiché au-dessus du titre",
        control: false,
        table: { category: "Slots" },
      },
      buttonsgroup: {
        description: "Boutons ou liens d'action affichés sous la description du bandeau",
        control: false,
        table: { category: "Slots" },
      },
      media: {
        description: "Contenu média affiché dans la partie secondaire (image par défaut)",
        control: false,
        table: { category: "Slots" },
      },
      inverse: {
        table: { disable: true },
      },
      simple: {
        table: { disable: true },
      },
      ficheCatalogue: {
        table: { disable: true },
      },
      avecBadges: {
        table: { disable: true },
      },
      boutons: {
        table: { disable: true },
      },
      badges: {
        table: { disable: true },
      },
    },
    args: {
      titre: "Titre lorem ipsum",
      baliseTitre: "h1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tincidunt felis in velit semper euismod.",
      mention: "",
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

  const boutonsThemeClair = [
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
    url-image={args.urlImage}
    sans-image={args.sansImage || undefined}
    avec-fil-ariane={args.avecFilAriane || undefined}
    liens-fil-ariane={JSON.stringify(args.liensFilAriane)}
    type={args.type}
    theme={args.theme}
  >
    {#if args.avecBadges}
      <dsfr-badges-group slot="badgesgroup" badges={args.badges} size="md"></dsfr-badges-group>
    {/if}

    <dsfr-buttons-group
      slot="buttonsgroup"
      buttons={args.theme === "clair" ? boutonsThemeClair : args.boutons || []}
      inline="md"
      data-themeable="false"
    ></dsfr-buttons-group>
  </lab-anssi-bandeau-page>
{/snippet}

<Story name="Par défaut" />

<Story name="Avec Fil d'Ariane" args={{ avecFilAriane: true }} />

<Story
  name="Avec une mention"
  args={{ mention: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }}
/>

<Story name="Avec un groupe de badges" args={{ avecBadges: true }} />

<Story name="Thème Clair" args={{ theme: "clair" }} />

<Story name="Thème Clair (avec Fil d'Ariane)" args={{ theme: "clair", avecFilAriane: true }} />

<Story name="Simple" args={{ type: "simple" }} />

<Story name="Simple (avec Fil d'Ariane)" args={{ type: "simple", avecFilAriane: true }} />

<Story name="Fiche catalogue (avec Fil d'Ariane)" args={{ type: "fiche", avecFilAriane: true }} />

<Story name="Thème Clair avec une couleur de fond personnalisée" args={{ theme: "clair" }}>
  {#snippet template(args: Args)}
    <lab-anssi-bandeau-page
      titre={args.titre}
      balise-titre={args.baliseTitre}
      description={args.description}
      mention={args.mention}
      url-image={args.urlImage}
      sans-image={args.sansImage || undefined}
      avec-fil-ariane={args.avecFilAriane || undefined}
      liens-fil-ariane={JSON.stringify(args.liensFilAriane)}
      type={args.type}
      theme={args.theme}
    >
      {#if args.avecBadges}
        <dsfr-badges-group slot="badgesgroup" badges={args.badges} size="md"></dsfr-badges-group>
      {/if}

      <dsfr-buttons-group
        slot="buttonsgroup"
        buttons={args.theme === "clair" ? boutonsThemeClair : args.boutons || []}
        inline="md"
        data-themeable="false"
      ></dsfr-buttons-group>
    </lab-anssi-bandeau-page>

    <style lang="scss">
      lab-anssi-bandeau-page {
        --background-color: var(--yellow-moutarde-975-75);
      }
    </style>
  {/snippet}
</Story>
