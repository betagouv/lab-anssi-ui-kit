<svelte:options customElement="lab-anssi-mes-services-cyber-lien-diagnostic-cyber" />

<script lang="ts">
  import { srcAsset } from "$lib/assets/assets";

  export let lien;
  export let versExterne = false;
  let target = versExterne ? "_blank" : "_self";
  let rel = versExterne ? "noreferrer" : undefined;
  let icone = versExterne ? "lien-externe" : "lien-interne";
</script>

<div class="racine">
  <a href={lien} {target} class="lien-diagnostic-cyber" {rel}>
    Votre diagnostic cyber gratuit
    <img
      src={srcAsset(`/icones/${icone}.svg`)}
      alt={`lien-${versExterne ? "externe" : "interne"}`}
    />
  </a>
  <div class="bloc">
    <div class="texte">
      <h6>Prenez votre cyberdépart !</h6>
      <p>
        Bénéficiez d'un <b>premier diagnostic gratuit</b> et anonyme dans vos locaux ou en visio
        <b>accompagné par un Aidant cyber</b>.
      </p>
    </div>
    <img
      class="illustration"
      src={srcAsset(`/illustrations/dino-kart.svg`)}
      alt="Votre diagnostic cyber gratuit"
    />
  </div>
</div>

<style lang="scss">
  .racine {
    position: relative;
    display: block;

    .lien-diagnostic-cyber {
      font-size: 1rem;
      line-height: 1.5rem;
      font-style: normal;
      font-weight: 500;
      text-decoration: none;
      color: $diagnostic-cyber-font-lien-color;
      padding: 10px 8px 8px 12px;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 8px;
      border: 1px solid $diagnostic-cyber-lien-color;
      border-radius: 8px;
      cursor: pointer;
      text-wrap: nowrap;
      justify-content: space-between;

      @include a-partir-de(desktop) {
        font-size: 0.875rem;
        line-height: 0.875rem;
        max-width: fit-content;
      }

      &:hover + .bloc {
        visibility: visible;
        opacity: 1;
        top: calc(1.5rem + 4px + 4px + 2px + 12px);
      }

      img {
        position: relative;
        top: -1px;
      }
    }

    .bloc {
      position: absolute;
      pointer-events: none;
      top: calc(1.5rem + 1px);
      right: 0;
      border-radius: 8px;
      background: #fff;
      display: flex;
      width: 482px;
      padding: 24px;
      align-items: center;
      box-shadow: 0px 4px 12px 0px rgba(0, 0, 18, 0.16);
      visibility: hidden;
      opacity: 0;
      transition:
        visibility 0.2s linear,
        opacity 0.2s linear,
        top 0.2s ease-out;
      z-index: 1;

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
  }
</style>
