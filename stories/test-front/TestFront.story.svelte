<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import Card from "$lib/lab/Card.svelte";
  import Hero from "./Hero.svelte";
  import Header from "$lib/lab/Header.svelte";
  import Footer from "$lib/lab/Footer.svelte";
  import Tabs from "$lib/lab/Tabs.svelte";
  import { srcAsset } from "$lib/assets/assets.js";
  import Animation from "./Animation.svelte";
  export let Hst: Hst;
</script>

<Hst.Story title="Composants/Test Front">
  <div class="test-front">
    <Header
      service={{
        titre: "DemainSpécialisteCyber",
        soustitre: "Innovation ANSSI",
        logo: srcAsset("/illustrations/logo-anssi.svg"),
      }}
      quickAccess={{
        icone: "external-link-line",
        label: "Espace enseignant",
        lien: "https://www.google.com",
      }}
      menu={[
        {
          label: "Accueil",
          lien: "https://www.google.com",
        },
        {
          label: "Explorer les ressources",
          lien: "https://www.google.com",
        },
        {
          label: "Sélection pour les enseignants",
          lien: "https://www.google.com",
          active: true,
        },
        {
          label: "Sélection pour les élèves",
          lien: "https://www.google.com",
        },
        {
          label: "Découvrir CyberEnJeux",
          lien: "https://www.google.com",
        },
      ]}
    />
    <Hero />
    <div class="tabs-wrapper">
      <Tabs
        tabs={[
          { label: "Former", lien: "former" },
          { label: "Sensibiliser", lien: "sensibiliser" },
          { label: "Guider", lien: "guider" },
          { label: "Se former", lien: "se-former" },
        ]}
      />
    </div>
    <section class="section" id="former">
      <div class="section-wrapper">
        <div class="section-content">
          <h2 class="section-title">Former</h2>
          <p class="section-description">
            Formez vos élèves à la cybersécurité grâce au kit pédagogique CyberEnjeux et à la
            présentation.
          </p>
          <Animation />
        </div>
        <div class="section-cards">
          <h3 class="section-cards-title">Les ressources</h3>
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
              titre="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              surtitre="Libellé"
              badge={{ label: "Libellé badge", couleur: "#fee7fc", icone: "booklet-line" }}
              tags={["Libellé tag", "Libellé tag"]}
              image="https://placedog.net/600/800"
              lien="https://www.google.com"
              externe={true}
            />
            <Card
              titre="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
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
          </div>
        </div>
      </div>
    </section>
    <section class="section" id="sensibiliser">
      <div class="section-wrapper">
        <div class="section-content">
          <h2 class="section-title">Sensibiliser</h2>
          <p class="section-description">
            Des ressources pour pouvoir parler de la cyber à vos élèves.
          </p>
        </div>
        <div class="section-cards">
          <h3 class="section-cards-title">Les ressources</h3>
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
              titre="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              surtitre="Libellé"
              tags={["Libellé tag", "Libellé tag"]}
              image="https://placedog.net/600/800"
              lien="https://www.google.com"
              externe={true}
            />
          </div>
        </div>
      </div>
    </section>
    <section class="section" id="guider">
      <div class="section-wrapper">
        <div class="section-content">
          <h2 class="section-title">Guider</h2>
          <p class="section-description">
            L’ANSSI répertorie toutes les formations cyber labelisées, n’hésitez pas à en prendre
            connaissances pour en parler à vos élèves.
          </p>
        </div>
        <div class="section-cards">
          <h3 class="section-cards-title">Les ressources</h3>
          <div class="card-wrapper">
            <Card
              titre="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              surtitre="Libellé"
              tags={["Libellé tag", "Libellé tag"]}
              image="https://placedog.net/600/400"
              lien="https://www.google.com"
              externe={false}
            />
          </div>
        </div>
      </div>
    </section>
    <section class="section" id="se-former">
      <div class="section-wrapper">
        <div class="section-content">
          <h2 class="section-title">Se former</h2>
          <p class="section-description">
            Trouvez des formations sur le numérique et la cybersécurité pour développer vos
            compétences et renforcer vos connaissances dans un domaine en constante évolution.
            présentation.
          </p>
        </div>
        <div class="section-cards">
          <h3 class="section-cards-title">Les ressources</h3>
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
              titre="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              surtitre="Libellé"
              tags={["Libellé tag", "Libellé tag"]}
              image="https://placedog.net/1600/400"
              lien="https://www.google.com"
              externe={true}
            />
          </div>
        </div>
      </div>
    </section>
  </div>
  <Footer
    description="DemainSpécialisteCyber est une campagne nationale co-construite par l'ANSSI et son laboratoire d'innovation, le Ministère de l'Education Nationale et de la Jeunesse et le Campus Cyber, en vue de valoriser la cybersécurité et ses métiers."
    liensPrincipaux={[
      {
        label: "info.gouv.fr",
        href: "https://www.google.com",
      },
      {
        label: "service-public.fr",
        href: "https://www.google.com",
      },
      {
        label: "legifrance.gouv.fr",
        href: "https://www.google.com",
      },
      {
        label: "data.gouv.fr",
        href: "https://www.google.com",
      },
    ]}
    contributeurs={[
      {
        label: "Contributeur 1",
        image: "https://placedog.net/100/100",
      },
    ]}
    liensNavigation={[
      { label: "À propos", href: "#" },
      { label: "Mentions légales", href: "#" },
      { label: "Politique de confidentialité", href: "#" },
      { label: "Conditions générales d'utilisation", href: "#" },
      { label: "Statistiques d'utilisation", href: "#" },
      { label: "Sécurité", href: "#" },
      { label: "Accéssibilité: non conforme", href: "#" },
    ]}
  />
</Hst.Story>

<style lang="scss">
  .test-front {
    background-color: white;
    font-family: $police;
  }

  .tabs-wrapper {
    position: sticky;
    top: 0;
    z-index: 100;

    margin: 0 auto 1.5rem;
    padding: 1rem 0;
    background-color: white;
  }

  .section {
    scroll-margin-top: 2.875rem;

    &:nth-of-type(even) {
      background-color: #f5f5fe;
    }

    &-wrapper {
      display: flex;
      flex-direction: column;
      max-width: $largeur-max-contenu;
      gap: 2.5rem;
      margin: 0 auto;
      padding: 2.5rem 1.5rem;

      @include a-partir-de(desktop) {
        flex-direction: row;
      }
    }

    &-content {
      @include a-partir-de(desktop) {
        max-width: 17.625rem;
      }
    }

    &-title {
      margin: 0 0 0.75rem;
      font-size: 2rem;
      font-weight: 700;
      line-height: 1.2;
      color: $texte-dsfr;
    }

    &-description {
      font-size: 1.125rem;
      line-height: 1.55;
    }

    &-cards {
      flex: 1;
      padding-top: 1rem;

      &-title {
        margin: 0 0 2rem;
        font-weight: 700;
        font-size: 1.75rem;
        line-height: 1.15;
      }
    }
  }

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
