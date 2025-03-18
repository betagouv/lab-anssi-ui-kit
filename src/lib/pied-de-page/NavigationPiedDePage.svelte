<svelte:options customElement="lab-anssi-navigation-pied-de-page" />

<script lang="ts">
  export let conformiteAccessibilite: "conforme" | "nonConforme" = "conforme";
</script>

<div class="conteneur-navigation-pied-de-page">
  <a href="/aPropos">À propos</a>
  <div class="separateur"></div>
  <a href="/mentionsLegales">Mentions légales</a>
  <div class="separateur"></div>
  <a href="/confidentialite">Politique de confidentialité</a>
  <div class="separateur"></div>
  <a href="/cgu">Conditions générales</a>
  <div class="separateur"></div>
  <a href="/statistiques">Statistiques d’utilisation</a>
  <div class="separateur"></div>
  <a href="/securite">Sécurité</a>
  <div class="separateur"></div>
  <a href="/accessibilite"
    >Accessiblité: {conformiteAccessibilite === "conforme" ? "conforme" : "non conforme"}</a
  >
</div>

<style lang="scss">
  .conteneur-navigation-pied-de-page {
    font-family: "Marianne";
    list-style: none;
    display: flex;
    flex-direction: row;
    align-items: end;
    row-gap: 16px;
    column-gap: 8px;
    margin: 0 16px;
    padding: 16px 0;
    flex-wrap: wrap;
    border-top: 1px solid $border-default-grey;

    @include a-partir-de(desktop) {
      margin: 0 24px;
      column-gap: 16px;
    }

    a {
      color: $text-mention-grey;
      text-decoration: none;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      white-space: nowrap;

      &:hover {
        text-decoration: underline;
        text-decoration-thickness: 1.5px;
        text-underline-offset: 4px;
      }

      &:active {
        background: #ededed;
      }
    }
  }

  .separateur {
    width: 1px;
    height: 16px;
    background: #dddddd;
  }
</style>
