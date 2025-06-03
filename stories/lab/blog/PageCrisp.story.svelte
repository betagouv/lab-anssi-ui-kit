<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import PageCrisp from "$lib/lab/blog/PageCrisp.svelte";
  import OutilSelecteurTheme from "../../OutilSelecteurTheme.svelte";

  export let Hst: Hst;

  // Un bug d'histoire, qui utilise JSDom lors d'une des phases de montage du composant
  // https://github.com/histoire-dev/histoire/issues/420
  if (!window.matchMedia) {
    // @ts-ignore
    window.matchMedia = () => ({
      matches: false,
    });
  }

  const contenu = `<section><h2 id='id-titre1'>Premier titre</h2>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc porttitor quam vel volutpat fermentum. Donec et
    mauris a leo finibus porttitor. Cras dictum aliquam orci, sed consectetur magna ornare eu. Nullam nisl mi, laoreet
    sit amet imperdiet sed, gravida at lacus. Donec lacinia, ex ut ornare hendrerit, turpis risus imperdiet nulla, vel
    fringilla dolor metus et lorem. Donec massa lectus, ornare et mauris sed, eleifend bibendum augue. Cras ac ligula
    felis. Phasellus eros quam, ultrices vitae tincidunt tristique, fermentum at libero. Praesent nisi elit, sodales non
    sodales ut, aliquam eu metus. Phasellus sodales sem ac libero blandit mattis. Duis eu finibus lacus. Morbi eleifend
    tincidunt malesuada. </p>
  <p>Vestibulum in sem leo. Suspendisse id mauris sollicitudin ex condimentum molestie. Pellentesque consequat hendrerit
    diam eu ullamcorper. Pellentesque suscipit libero et massa tincidunt, malesuada congue nibh auctor. Suspendisse
    faucibus, metus sit amet vehicula convallis, purus lorem convallis turpis, eu iaculis neque arcu in erat. Aliquam
    ipsum ante, volutpat ac erat et, suscipit dictum lectus. Suspendisse potenti. Mauris sit amet efficitur dui, sit
    amet pellentesque sem. Sed luctus nisi felis, sit amet elementum odio commodo in. In hac habitasse platea dictumst.
    Vivamus facilisis turpis ac enim dignissim ultricies. Sed nunc sem, mattis quis sollicitudin ut, varius eu nibh.
    Vivamus bibendum erat a est malesuada consectetur ac sit amet mi. </p>
</section>
<section><h2 id='id-titre2'> Deuxième titre</h2>
  <p> Morbi semper lacus eu magna gravida condimentum. Proin suscipit porta facilisis. Morbi at ex sem. Aliquam sed
    tellus ullamcorper, ultricies arcu eu, posuere nisi. Maecenas eget diam sit amet mi egestas molestie. Vestibulum
    euismod felis sit amet erat maximus accumsan. Nam quis odio ipsum. Etiam in est neque. Vestibulum sed augue et enim
    fringilla sagittis nec nec eros. Fusce in eros non nunc placerat viverra.

  </p>
</section>
<section><h2 id='id-titre3'>Troisième titre</h2>
  <p> Vestibulum suscipit sapien ex, sit amet imperdiet diam gravida nec. Suspendisse elit purus, vulputate nec semper
    eu, bibendum ut eros. Nulla at elit eu neque aliquet eleifend sit amet at augue. Etiam rhoncus vestibulum tempor.
    Curabitur nec ligula nulla. Cras sagittis vehicula neque sit amet mollis. Suspendisse potenti. Suspendisse
    scelerisque lorem purus, vel pellentesque purus varius vel. Aenean dignissim commodo libero, sed rhoncus nunc luctus
    eu. Integer hendrerit mi at ante ultricies, in bibendum enim ornare. Duis elit ex, blandit sit amet arcu eu, blandit
    lobortis nisi. In dictum ut justo non laoreet. Nunc a massa in risus ullamcorper gravida. </p>
  <p> Etiam tincidunt eleifend nisl ac feugiat. Aenean aliquet lobortis viverra. Vivamus hendrerit tincidunt nulla vel
    porta. Nulla ac leo nunc. Donec sed sapien eu leo facilisis euismod quis id lectus. Praesent varius urna a auctor
    tempor. Donec congue, turpis quis pulvinar mollis, metus massa commodo lorem, ut blandit ligula mi eu sapien.
    Vivamus risus felis, hendrerit quis lacus vel, vestibulum iaculis magna. </p>
</section>
`;

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
  <PageCrisp
    {contenu}
    {tableDesMatieres}
  />
</Hst.Story>
