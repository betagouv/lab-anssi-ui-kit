<svelte:options customElement="lab-anssi-mes-services-cyber-bandeau" />

<script lang="ts">
  import { slide } from "svelte/transition";
  import croix from "$lib/assets/icones/croix-blanche.svg";
  import tuile from "$lib/assets/illustrations/tuile-msc.svg";

  const CLE_LOCAL_STORAGE = "lab-anssi-ui-kit-msc-bandeau-affichage";

  type visibilite = "visible" | "invisible";
  let affichage: visibilite = (localStorage.getItem(CLE_LOCAL_STORAGE) as visibilite) || "visible";
</script>

{#if affichage === "visible"}
  <div class="contenu" transition:slide={{ duration: 160 }}>
    <img src={tuile} alt="" class="tuiles-background" />
    <h4>
      🚀 L'ANSSI lance MesServicesCyber !
      <button
        on:click={() => {
          affichage = "invisible";
          localStorage.setItem(CLE_LOCAL_STORAGE, "invisible");
        }}
      >
        <img src={croix} alt="fermer" />
      </button>
    </h4>
    <p>Avec MesServicesCyber découvrez les ressources cyber de l'ANSSI et ses partenaires.</p>

    <a href="https://messervices.cyber.gouv.fr/" target="_blank" rel="noopener">
      Je découvre MesServicesCyber
    </a>
  </div>
{/if}

<style lang="scss">
  .contenu {
    color: white;
    font-family: "Marianne";
    padding: 16px;

    font-size: 0.875rem;
    line-height: 1.5rem;

    position: relative;
    overflow: hidden;
    background: #0d0c21;

    .tuiles-background {
      position: absolute;
      top: 0;
      left: 0;
      transform: scale(60%);
      transform-origin: 0 0;
      pointer-events: none;
    }

    h4 {
      font-size: 0.875rem;
      line-height: 1.5rem;
      font-weight: 700;
      margin: 0;

      display: flex;
      flex-direction: row;
      justify-content: space-between;

      button {
        border: none;
        cursor: pointer;
        background: none;
        padding: 0;
        transition: transform 0.2s ease-in-out;

        &:hover {
          transform: scale(1.3);
        }
      }
    }

    p {
      font-weight: 400;
      font-size: 0.875rem;
      line-height: 1.5rem;
      margin: 0;
      padding-right: 32px;
    }

    a {
      display: block;
      color: #242424;
      background: white;
      margin-top: 8px;
      text-align: center;
      font-size: 0.875rem;
      line-height: 1.5rem;
      text-decoration: none;

      gap: 8px;
      border-radius: 4px;
      padding: 4px 12px;
    }
  }
</style>
