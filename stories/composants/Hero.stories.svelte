<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import Hero from "$lib/composants/Hero.svelte";

  const { Story } = defineMeta({
    title: "Composants/ANSSI/Hero",
    component: Hero,
    args: {
      titre: "Nom du Service",
      baliseTitre: "h1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id sodales sapien, sit amet ultrices est.",
      inverse: false,
      urlImage: "/static/images/hero-placeholder.jpg",
      sansImage: false,
    },
    render: template,
  });

  type Args = ComponentProps<Hero>;
</script>

{#snippet template(args: Args)}
  <lab-anssi-hero
    titre={args.titre}
    balise-titre={args.baliseTitre}
    description={args.description}
    inverse={args.inverse || undefined}
    url-image={args.urlImage}
    sans-image={args.sansImage || undefined}
  ></lab-anssi-hero>
{/snippet}

<Story name="Defaut" />

<Story name="Inverse" args={{ inverse: true }} />

<Story name="SansImage" args={{ sansImage: true }} />
