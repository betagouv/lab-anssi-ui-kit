<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Hero from "$lib/composants/Hero.svelte";

  const { Story } = defineMeta({
    component: Hero,
    title: "Composants/ANSSI/Hero",
    args: {
      titre: "Nom du Service",
      baliseTitre: "h1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id sodales sapien, sit amet ultrices est.",
      inverse: false,
      urlImage: "/static/images/hero-placeholder.jpg",
      sansImage: false,
    },
  });
</script>

<Story name="Défaut" />

<Story name="Inverse" args={{ inverse: true }} />

<Story name="SansImage" args={{ sansImage: true }} />

<Story name="AvecBoutons">
  {#snippet template(args)}
    <Hero {...args}>
      {#snippet actions()}{/snippet}
    </Hero>
  {/snippet}
</Story>
