<script lang="ts">
  import { srcAsset } from "$lib/assets/assets";

  import BlocMarque from "$lib/demain-specialiste-cyber/BlocMarque.svelte";
  import Conteneur from "$lib/demain-specialiste-cyber/Conteneur.svelte";

  export let id: string;
  export let hasDescription: boolean = false;
  export let brandLinkId: string;
  export let brandLinkHref: string = "/";
  export let brandLinkTitle: string;
  export let hasPartners: boolean = false;
  export let partnerTitle: string;
  export let mainPartnerSrc: string;
  export let mainPartnerHref: string;
  export let mainPartnerStyle: string;

  interface LinkGroup {
    title: string;
    href: string;
  }
  export let contentLinks: LinkGroup[];
  export let bottomLinks: LinkGroup[];
</script>

<footer class="fr-footer" role="contentinfo" {id}>
  <Conteneur>
    <div class="fr-footer__body">
      <!-- BRAND -->
      <div class="fr-footer__brand fr-enlarge-link">
        <a id={brandLinkId} title={brandLinkTitle} href={brandLinkHref}>
          <BlocMarque title="Gouvernement" />
        </a>
      </div>

      <!-- CONTENT -->
      <div class="fr-footer__content">
        {#if hasDescription && $$slots.description}
          <p class="fr-footer__content-desc">
            <slot name="description" />
          </p>
        {/if}

        <!-- CONTENT LIST -->
        <ul class="fr-footer__content-list">
          {#each contentLinks as link}
            <li class="fr-footer__content-item">
              <a
                title={`${link.title} - nouvelle fenêtre`}
                id={`footer__content-link-${link.title.toLowerCase().replace(/\s+/g, "-")}`}
                href={link.href}
                target="_blank"
                rel="noopener external"
                class="fr-footer__content-link"
              >
                {link.title}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>
    <!-- PARTNERS -->
    {#if hasPartners}
      <div class="fr-footer__partners">
        <h2 class="fr-footer__partners-title">{partnerTitle}</h2>
        <div class="fr-footer__partners-logos">
          <div class="fr-footer__partners-main">
            <a class="fr-footer__partners-link" href={mainPartnerHref}>
              <img
                class="fr-footer__logo"
                style={mainPartnerStyle}
                src={srcAsset(mainPartnerSrc)}
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
    {/if}

    <!-- BOTTOM -->
    <div class="fr-footer__bottom">
      <ul class="fr-footer__bottom-list">
        {#each bottomLinks as link}
          <li class="fr-footer__bottom-item">
            <a
              id={`footer__bottom-link-${link.title.toLowerCase().replace(/\s+/g, "-")}`}
              href={link.href}
              class="fr-footer__bottom-link"
            >
              {link.title}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </Conteneur>
</footer>
