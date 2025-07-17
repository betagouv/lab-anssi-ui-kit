<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import Card from "$lib/lab/Card.svelte";
  import OutilSelecteurTheme from "../OutilSelecteurTheme.svelte";

  export let Hst: Hst;
</script>

<Hst.Story title="Composants/Lab/Card">
  <OutilSelecteurTheme />
  <div style="background-color:white; padding:48px;">
    <h3>Card</h3>
    <div class="card-wrapper">
      <Card
        titre="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        surtitre="Libellé"
        tags={["Libellé tag", "Libellé tag"]}
        image="https://placedog.net/600/400"
        lien="https://www.google.com"
        externe={false}
      />
      <Card
        titre="Lorem ipsum dolor sit amet,"
        surtitre="Libellé"
        badge={{ label: "Libellé badge", couleur: "#fee7fc", icone: "booklet-line" }}
        tags={["Libellé tag", "Libellé tag"]}
        image="https://placedog.net/600/800"
        lien="https://www.google.com"
        externe={true}
      />
      <Card
        titre="Lorem ipsum dolor sit amet,"
        surtitre="Libellé"
        tags={["Libellé tag", "Libellé tag"]}
        image="https://placedog.net/600/1400"
        lien="https://www.google.com"
        externe={true}
      />
      <Card
        titre="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        surtitre="Libellé"
        badge={{ label: "Libellé badge", couleur: "#b3e6ff", icone: "leaf-line" }}
        tags={["Libellé tag", "Libellé tag"]}
        image="https://placedog.net/100/400"
        lien="https://www.google.com"
        externe={false}
      />
      <Card
        titre="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        surtitre="Libellé"
        tags={["Libellé tag", "Libellé tag"]}
        image="https://placedog.net/1600/400"
        lien="https://www.google.com"
        externe={true}
      />
    </div>
  </div>
</Hst.Story>

<style lang="scss">
  .card-wrapper {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @include a-partir-de(tablette) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include a-partir-de(desktop) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
