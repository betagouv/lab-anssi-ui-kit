<svelte:options customElement="lab-anssi-mes-services-cyber-lien-diagnostic-cyber" />

<script lang="ts">
  import { srcAsset } from "$lib/assets/assets";

  export let lien;
  export let versExterne = false;
  let target = versExterne ? "_blank" : "_self";
  let rel = versExterne ? "noreferrer" : undefined;
  let icone = versExterne ? "lien-externe" : "lien-interne";
</script>

<a href={lien} {target} class="lien-diagnostic-cyber" {rel}>
  Votre diagnostic cyber gratuit
  <img
    class="icone"
    src={srcAsset(`/icones/${icone}.svg`)}
    alt={`lien-${versExterne ? "externe" : "interne"}`}
  />
</a>
<div class="bloc">
  <div class="texte">
    <h6>Prenez votre cyberdépart !</h6>
    <p>
      Bénéficiez d'un <b>premier diagnostic gratuit</b> et anonyme dans vos locaux
      <b>accompagné par un Aidant de la communauté MonAideCyber</b>.
    </p>
  </div>
  <img
    class="illustration"
    src={srcAsset(`/illustrations/dino-kart.svg`)}
    alt="Votre diagnostic cyber gratuit"
  />
</div>

<style lang="scss">
  .lien-diagnostic-cyber {
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    text-decoration: none;
    color: $diagnostic-cyber-font-lien-color;
    padding: 4px 12px 4px 8px;
    display: flex;
    gap: 8px;
    border: 1px solid $diagnostic-cyber-lien-color;
    border-radius: 8px;
    cursor: pointer;
    align-items: center;
    width: fit-content;
    line-height: 1.5rem;
    &:hover + .bloc {
      visibility: visible;
      opacity: 1;
    }
  }

  .bloc {
    right: 0;
    border-radius: 8px;
    background: #fff;
    display: flex;
    width: 482px;
    padding: 24px;
    margin-top: 10px;
    align-items: center;
    box-shadow: 0px 4px 12px 0px rgba(0, 0, 18, 0.16);
    visibility: hidden;
    opacity: 0;
    transition:
      visibility 0.2s linear,
      opacity 0.2s linear;

    h6 {
      font-size: 1.25rem;
      font-style: normal;
      font-weight: 700;
      line-height: 1.75rem;
      color: $diagnostic-cyber-font-color;
      align-self: stretch;
      margin: 0;
      margin-block-start: 0;
      margin-block-end: 0;
    }

    .texte {
      display: flex;
      flex-direction: column;
      gap: 8px;

      > p {
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 400;
        align-self: stretch;
        line-height: 1.5rem;
        color: $diagnostic-cyber-font-color;
        margin: 0;
        margin-block-end: 0;
        margin-block-start: 0;
        width: 300px;
      }
    }
  }

  .illustration {
    display: flex;
    height: 144px;
    padding: 6.4px 0px 7.014px 0px;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    aspect-ratio: 4/3;
  }
</style>
