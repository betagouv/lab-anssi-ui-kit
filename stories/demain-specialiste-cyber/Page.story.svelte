<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";

  import {
    headerData,
    navData,
    bannerData,
    breadcrumbData,
    segmentedItems,
    sectionsData,
    footerData,
  } from "./dsc-data.js";
  import "./dsc-page.scss";

  import Entete from "$lib/demain-specialiste-cyber/Entete.svelte";
  import Navigation from "$lib/demain-specialiste-cyber/Navigation.svelte";
  import Banniere from "$lib/demain-specialiste-cyber/Banniere.svelte";
  import FilAriane from "$lib/demain-specialiste-cyber/FilAriane.svelte";
  import ControleSegmente from "$lib/demain-specialiste-cyber/ControleSegmente.svelte";
  import Section from "$lib/demain-specialiste-cyber/Section.svelte";
  import PiedDePage from "$lib/demain-specialiste-cyber/PiedDePage.svelte";

  export let Hst: Hst;
</script>

<Hst.Story title="DemainSpecialisteCyber/Home" layout={{ type: "single", iframe: true }}>
  <Hst.Variant title="default">
    <div class="page-dsc">
      <!-- Header -->
      <Entete {...headerData}>
        <div slot="navigation">
          <Navigation {...navData} />
        </div>
      </Entete>

      <!-- Banniere -->
      <Banniere {...bannerData}>
        <FilAriane {...breadcrumbData} />
      </Banniere>

      <!-- Segmented Control -->
      <ControleSegmente items={segmentedItems} />

      <!-- Sections -->
      {#each sectionsData as section, index}
        <Section id={"section" + (index + 1)} {...section} />
      {/each}

      <!-- Pied de page -->
      <PiedDePage {...footerData}>
        <span slot="description">
          DemainSpécialisteCyber est une campagne nationale co-construite par l'<a href="/"
            ><abbr title="Agence Nationale de la Sécurité des Systèmes d'Information">ANSSI</abbr
            ></a
          >
          et son laboratoire d'innovation, le
          <a href="/">Ministère de l'Education Nationale et de la Jeunesse</a>
          et le <a href="/">Campus Cyber</a>, en vue de valoriser la cybersécurité et ses métiers.
        </span>
      </PiedDePage>
    </div>
  </Hst.Variant>
</Hst.Story>

<style lang="scss">
  @import "@gouvfr/dsfr/dist/core/core.main.min.css";

  :global(html) {
    scroll-behavior: smooth;
    scroll-padding-top: 76px;
  }

  // NOTE: solution de contournement pour contourner les problèmes de rendu d'Histoire.
  :global(.__histoire-render-story:not(.__histoire-render-custom-controls)) {
    overflow: initial;
  }
</style>
