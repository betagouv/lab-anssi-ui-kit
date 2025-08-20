<script module lang="ts">
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

<Story name="Defaut" />

<Story name="Inverse" args={{ inverse: true }} />

<Story name="SansImage" args={{ sansImage: true }} />
