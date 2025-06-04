<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import PageCrisp from "$lib/lab/blog/PageCrisp.svelte";
  import OutilSelecteurTheme from "../../OutilSelecteurTheme.svelte";
  import { genereImageDePlaceholder } from "$lib/generateurImagesPlaceholders";
  import exempleContenu from "./exemple-page-crisp.html?raw";

  export let Hst: Hst;

  // Un bug d'histoire, qui utilise JSDom lors d'une des phases de montage du composant
  // https://github.com/histoire-dev/histoire/issues/420
  if (!window.matchMedia) {
    // @ts-ignore
    window.matchMedia = () => ({
      matches: false,
    });
  }

  // Un bug d'histoire, qui utilise JSDom lors d'une des phases de montage du composant
  // https://github.com/histoire-dev/histoire/issues/407
  if (!window.IntersectionObserver) {
    // @ts-ignore
    window.IntersectionObserver = class IntersectionObserver {
      observe(): void {}
      unobserve(): void {}
    };
  }

  const contenu = (exempleContenu as string).replaceAll(
    "%%IMAGE_1000_800%%",
    genereImageDePlaceholder(1000, 800),
  );

  const tableDesMatieres = [
    {
      profondeur: 2,
      texte: "Premier titre",
      id: "id-titre1",
    },
    {
      profondeur: 2,
      texte: "Deuxième titre",
      id: "id-titre2",
    },
    {
      profondeur: 2,
      texte: "Troisième titre",
      id: "id-titre3",
    },
  ];
</script>

<Hst.Story title="Composants/Lab/Blog/Page Crisp" icon="uis:web-grid-alt">
  <OutilSelecteurTheme />
  <PageCrisp {contenu} {tableDesMatieres} />
</Hst.Story>
