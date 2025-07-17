<svelte:options
  customElement={{
    tag: "lab-anssi-header",
    props: {
      service: { reflect: false, type: "Object", attribute: "service" },
      quickAccess: { reflect: false, type: "Object", attribute: "quickAccess" },
      menu: { reflect: false, type: "Array", attribute: "menu" },
    },
  }}
/>

<script lang="ts">
  import Icone from "$lib/lab/Icone.svelte";
  import { srcAsset } from "$lib/assets/assets.js";

  type MenuItem = {
    label: string;
    lien: string;
    active?: boolean;
  };

  export let service: { titre: string; soustitre: string; logo: string };
  export let quickAccess: { icone: string; label: string; lien: string };
  export let menu: MenuItem[];
</script>

<header class="header">
  <div class="header-top">
    <div class="header-top-content">
      <div class="header-brand">
        <img
          class="header-marianne"
          src={srcAsset("/icones/marianne.svg")}
          alt="Marque de l'État"
        />
        <div class="header-service">
          <div class="header-service-logo">
            <img src={service.logo} alt={service.titre} />
          </div>
          <div class="header-service-content">
            <span class="header-service-title">
              {service.titre}
            </span>
            <span class="header-marque-subtitle">{service.soustitre}</span>
          </div>
        </div>
      </div>
      <a class="header-quick-access" href={quickAccess.lien}>
        <Icone nom={quickAccess.icone} taille="sm" />
        <span>
          {quickAccess.label}
        </span>
      </a>
      <button class="header-burger" on:click={() => alert("Imaginez une animation trop cool")}>
        <Icone nom="menu-fill" taille="sm" />
      </button>
    </div>
  </div>
  <div class="header-service-content-mobile">
    <span class="header-service-title">
      {service.titre}
    </span>
    <span class="header-marque-subtitle">{service.soustitre}</span>
  </div>
  <nav class="header-menu">
    <div class="header-menu-content">
      {#each menu as item}
        <a
          href={item.lien}
          class="header-menu-item"
          class:active={item.active}
          aria-current={item.active ? "page" : undefined}
        >
          {item.label}
        </a>
      {/each}
    </div>
  </nav>
</header>

<style lang="scss">
  @import "apparence-header.scss";
</style>
