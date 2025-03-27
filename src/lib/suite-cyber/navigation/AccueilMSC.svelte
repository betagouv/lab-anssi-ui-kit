<script lang="ts">
  import { srcAsset } from "$lib/mes-services-cyber/assets.js";
  const accueilMSC = srcAsset("/icones/bouton-accueil-msc.svg");
  const chevronDroite = srcAsset("/icones/chevron-noir.svg");
</script>

<a
  href="https://messervices.cyber.gouv.fr"
  target="_blank"
  class="accueil-msc"
  id="mes-services-cyber"
>
  <div class="icone">
    <img src={accueilMSC} alt="MesServicesCyber" />
  </div>
  <label for="mes-services-cyber">
    MesServicesCyber
    <span>Gérer mon profil et mes services</span>
  </label>
  <div class="chevron">
    <img src={chevronDroite} alt="Aller sur MesServicesCyber" />
  </div>
</a>

<style lang="scss">
  .accueil-msc {
    font-family: Marianne;
    font-style: normal;
    font-weight: normal;
    cursor: pointer;
    display: flex;
    margin-top: 8px;
    padding: 12px 16px;
    align-items: center;
    gap: 12px;
    align-self: stretch;
    text-decoration: none;

    &:hover {
      background-color: $background-default-grey-hover;
    }
    &:active {
      background-color: $background-default-grey-active;
    }

    label {
      display: flex;
      padding-bottom: 4px;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      flex: 1 0 0;
      color: $texte-defaut;
      font-family: Marianne;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: 28px;
      cursor: pointer;

      span {
        color: $texte-secondaire;
        font-family: Marianne;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
      }
    }
  }
</style>
