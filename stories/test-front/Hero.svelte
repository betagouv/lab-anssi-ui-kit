<script lang="ts">
  import Breadcrumb from "$lib/lab/Breadcrumb.svelte";
  import { srcAsset } from "$lib/assets/assets.js";
</script>

<div class="hero">
  <div class="hero-content">
    <Breadcrumb
      path={[{ label: "Accueil", lien: "/" }, { label: "Ressources pour les enseignants" }]}
    />
    <h1 class="hero-title">Ressources pour les enseignants</h1>
    <p class="hero-subtitle">
      Formez, sensibilisez, accompagnez vos élèves… et développez aussi vos propres compétences en
      cybersécurité
    </p>
    <img src={srcAsset("/illustrations/hedgehog.svg")} alt="" class="hero-hedgehog" />
  </div>
</div>

<style lang="scss">
  .hero {
    position: relative;
    overflow: hidden;
    margin-bottom: 1rem;
    background-image: url("/src/lib/assets/illustrations/hero.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    &-content {
      max-width: $largeur-max-contenu;
      margin: 0 auto;
      padding: 1.5rem;
      color: white;
    }

    &-title {
      margin: 0.5rem 0 0.25rem;
      font-size: 2.5rem;
      line-height: 1.2;
    }

    &-subtitle {
      margin: 0 0 0.75rem;
      font-size: 1.125rem;
      line-height: 1.55;
    }

    &-hedgehog {
      position: absolute;
      bottom: 0;
      right: 1rem;
      display: block;
      width: 2rem;
      height: auto;
      animation: apparition 33s infinite alternate;
    }
  }

  @keyframes apparition {
    0% {
      transform: translateY(100%);
    }
    94% {
      transform: translateY(100%);
    }
    97% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(100%);
    }
  }
</style>
