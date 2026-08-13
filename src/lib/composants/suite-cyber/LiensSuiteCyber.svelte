<script lang="ts">
  import DsfrTag from "$lib/dsfr/DsfrTag.svelte";

  type Service = {
    nom: string;
    lien: string;
    icone: string;
    labels?: string[];
    classeTracking: string;
  };

  interface Props {
    titre: string;
    services: Service[];
  }

  let { titre, services }: Props = $props();
</script>

<div class="bloc">
  <div class="titre">{titre}</div>

  <div class="conteneur">
    {#each services as { nom, lien, icone, labels, classeTracking }, i}
      <a href={lien} target="_blank" class={["service", classeTracking]}>
        <img class="logo-service" src={icone} alt={nom} />

        <div class="contenu-service">
          <div class="titre-service">{nom}</div>

          {#if labels}
            <div class="tags">
              {#each labels as label}
                <DsfrTag {label} size="sm" />
              {/each}
            </div>
          {/if}
        </div>
      </a>

      {#if i < services.length - 1}
        <hr />
      {/if}
    {/each}
  </div>
</div>

<style lang="scss">
  .bloc {
    &:not(:last-child) {
      margin-block-end: rem(12px);
    }
  }

  .titre {
    color: var(--text-mention-grey);
    font-size: rem(12px);
    font-weight: 700;
    line-height: rem(20px);
    margin-block-end: rem(8px);
    text-transform: uppercase;
  }

  .conteneur {
    display: flex;
    flex-direction: column;
    align-self: stretch;
    border: 1px solid var(--border-default-grey);

    hr {
      border: 0;
      border-top: 1px solid var(--grey-900-175, #ddd);
      margin: 0 16px;
    }
  }

  .service {
    display: flex;
    align-items: flex-start;
    gap: rem(12px);
    padding: rem(12px);
    text-decoration: none;

    &:hover {
      background-color: var(--background-default-grey-hover);
    }

    &:active {
      background-color: var(--background-default-grey-active);
    }
  }

  .logo-service {
    height: rem(32px);
    flex-shrink: 0;
    width: rem(32px);
  }

  .contenu-service {
    padding-block: rem(2px) rem(4px);
  }

  .titre-service {
    color: var(--text-title-grey);
    font-size: rem(16px);
    font-weight: 500;
    line-height: rem(24px);

    &:not(:only-child) {
      margin-block-end: rem(10px);
    }
  }

  .tags {
    display: flex;
    align-items: flex-start;
    align-content: flex-start;
    gap: rem(8px);
    align-self: stretch;
    flex-wrap: wrap;
  }
</style>
