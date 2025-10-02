<svelte:options
  customElement={{
    tag: "dsfr-footer",
    props: {
      id: { attribute: "id", type: "String" },
      isMourning: { attribute: "is-mourning", type: "Boolean" },
      brandLogoTitle: { attribute: "brand-logo-title", type: "String" },
      brandLinkTitle: { attribute: "brand-link-title", type: "String" },
      brandLinkHref: { attribute: "brand-link-href", type: "String" },
      brandLinkId: { attribute: "brand-link-id", type: "String" },
      hasBrandOperator: { attribute: "has-brand-operator", type: "Boolean" },
      brandOperatorAlt: { attribute: "brand-operator-alt", type: "String" },
      brandOperatorSrc: { attribute: "brand-operator-src", type: "String" },
      brandOperatorStyle: { attribute: "brand-operator-style", type: "String" },
      hasDescription: { attribute: "has-description", type: "Boolean" },
      contentDescription: { attribute: "content-description", type: "String" },
      hasPartners: { attribute: "has-partners", type: "Boolean" },
      partnerTitle: { attribute: "partner-title", type: "String" },
      mainPartnerSrc: { attribute: "main-partner-src", type: "String" },
      mainPartnerHref: { attribute: "main-partner-href", type: "String" },
      mainPartnerAlt: { attribute: "main-partner-alt", type: "String" },
      mainPartnerStyle: { attribute: "main-partner-style", type: "String" },
      subPartners: { attribute: "sub-partners", type: "Array" },
      bottomLinks: { attribute: "bottom-links", type: "Array" },
      bottomCopyright: { attribute: "bottom-copyright", type: "String" },
    },
  }}
/>

<script lang="ts">
  type ContentLink = {
    label: string;
    href: string;
    blank: boolean;
    attributes?: { [key: string]: string };
  };
  type SubPartner = {
    src: string;
    href: string;
    alt?: string;
    style?: string;
  };
  type BottomLink = {
    label: string;
    href: string;
    markup: string;
  };

  interface Props {
    /** Attribut id du pied de page */
    id?: string;
    /** Passe le footer en mode deuil */
    isMourning?: boolean;
    /** Intitulé du logo */
    brandLogoTitle?: string;
    /** Attribut title du lien du bloc marque */
    brandLinkTitle?: string;
    /** Lien du bloc marque */
    brandLinkHref?: string;
    /** Attribut id du lien du bloc marque */
    brandLinkId?: string;
    /** Ajoute un logo opérateur dans le bloc marque */
    hasBrandOperator?: boolean;
    /** Texte alternatif du logo opérateur */
    brandOperatorAlt?: string;
    /** Chemin de l'image du logo opérateur */
    brandOperatorSrc?: string;
    /** Attribut style du logo opérateur (permet de définir la taille) */
    brandOperatorStyle?: string;
    /** Ajoute une description */
    hasDescription?: boolean;
    /** Texte de description */
    contentDescription?: string;
    /** Affiche le bloc partenaires */
    hasPartners?: boolean;
    /** Intitulé du bloc partenaires */
    partnerTitle: string;
    /** Chemin ver l'image du partenaire principal */
    mainPartnerSrc?: string;
    /** Lien du partenaire principal */
    mainPartnerHref?: string;
    /** Texte alternatif de l'image du partenaire principal */
    mainPartnerAlt?: string;
    /** Attribut style du partenaire principal (permet de définir la taille) */
    mainPartnerStyle?: string;
    /** Liste des partenaires secondaires */
    subPartners?: SubPartner[];
    /** Liste des liens du bloc du bas */
    bottomLinks?: BottomLink[];
    /** Texte de droits d'auteur */
    bottomCopyright?: string;
  }

  let {
    id,
    isMourning,
    brandLogoTitle = "République<br>Française",
    brandLinkTitle,
    brandLinkHref,
    brandLinkId,
    hasBrandOperator,
    brandOperatorAlt = "",
    brandOperatorSrc,
    brandOperatorStyle,
    hasDescription,
    contentDescription,
    hasPartners,
    partnerTitle,
    mainPartnerSrc,
    mainPartnerHref,
    mainPartnerAlt = "",
    mainPartnerStyle,
    subPartners,
    bottomLinks,
    bottomCopyright,
  }: Props = $props();

  /** Liste des liens (non modifiables) */
  const contentLinks: ContentLink[] = [
    {
      label: "info.gouv.fr",
      href: "https://info.gouv.fr",
      blank: true,
      attributes: { title: "info.gouv.fr - nouvelle fenêtre" },
    },
    {
      label: "service-public.gouv.fr",
      href: "https://service-public.gouv.fr",
      blank: true,
      attributes: { title: "service-public.gouv.fr - nouvelle fenêtre" },
    },
    {
      label: "legifrance.gouv.fr",
      href: "https://legifrance.gouv.fr",
      blank: true,
      attributes: { title: "legifrance.gouv.fr - nouvelle fenêtre" },
    },
    {
      label: "data.gouv.fr",
      href: "https://data.gouv.fr",
      blank: true,
      attributes: { title: "data.gouv.fr - nouvelle fenêtre" },
    },
  ];

  $effect(() => {
    const rootElement = $host() ?? document.documentElement;

    if (isMourning) {
      rootElement.setAttribute("data-fr-mourning", "");
    } else {
      rootElement.removeAttribute("data-fr-mourning");
    }
  });
</script>

<footer class="fr-footer" role="contentinfo" {id}>
  <div class="fr-container">
    <div class="fr-footer__body">
      <div class="fr-footer__brand fr-enlarge-link">
        {#if hasBrandOperator}
          <p class="fr-logo">{@html brandLogoTitle}</p>
          <a
            id={brandLinkId}
            title={brandLinkTitle}
            href={brandLinkHref}
            class="fr-footer__brand-link"
          >
            <img
              class="fr-footer__logo"
              style={brandOperatorStyle}
              src={brandOperatorSrc}
              alt={brandOperatorAlt}
            />
          </a>
        {:else}
          <a id={brandLinkId} title={brandLinkTitle} href={brandLinkHref}>
            <p class="fr-logo">{@html brandLogoTitle}</p>
          </a>
        {/if}
      </div>
      <div class="fr-footer__content">
        {#if hasDescription && contentDescription}
          <p class="fr-footer__content-desc">
            {contentDescription}
          </p>
        {/if}
        {#if contentLinks.length > 0}
          <ul class="fr-footer__content-list">
            {#each contentLinks as link, index}
              <li class="fr-footer__content-item">
                <a
                  title={link.attributes?.title}
                  id={"footer__content-link-" + index}
                  href={link.href}
                  target={link.blank ? "_blank" : "_self"}
                  rel={link.blank ? "noopener external" : undefined}
                  class="fr-footer__content-link"
                >
                  {link.label}
                </a>
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    </div>
    {#if hasPartners}
      <div class="fr-footer__partners">
        <h2 class="fr-footer__partners-title">{partnerTitle}</h2>
        <div class="fr-footer__partners-logos">
          <div class="fr-footer__partners-main">
            <a class="fr-footer__partners-link" href={mainPartnerHref}>
              <img
                class="fr-footer__logo"
                style={mainPartnerStyle}
                src={mainPartnerSrc}
                alt={mainPartnerAlt}
              />
            </a>
          </div>
          {#if subPartners && subPartners.length > 0}
            <div class="fr-footer__partners-sub">
              <ul>
                {#each subPartners as link, index}
                  <li>
                    <a class="fr-footer__partners-link" href={link.href}>
                      <img
                        class="fr-footer__logo"
                        style={link.style}
                        src={link.src}
                        alt={link.alt}
                      />
                    </a>
                  </li>
                {/each}
              </ul>
            </div>
          {/if}
        </div>
      </div>
    {/if}
    <div class="fr-footer__bottom">
      {#if bottomLinks && bottomLinks.length > 0}
        <ul class="fr-footer__bottom-list">
          {#each bottomLinks as link, index}
            <li class="fr-footer__bottom-item">
              <a
                id={"footer__bottom-link-" + index}
                href={link.href}
                class="fr-footer__bottom-link"
              >
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      {/if}
      {#if bottomCopyright}
        <div class="fr-footer__bottom-copy">
          <p>{@html bottomCopyright}</p>
        </div>
      {/if}
    </div>
  </div>
</footer>

<style lang="scss">
  // DSFR Core styles
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/link";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/focus";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/hover";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/enlarge";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/heading";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/paragraph";
  @import "@gouvfr/dsfr/src/dsfr/core/style/typography/module/list";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/box-sizing";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/tap-highlight";
  @import "@gouvfr/dsfr/src/dsfr/core/style/grid/module";
  @import "@gouvfr/dsfr/src/dsfr/core/style/outdated";
  // DSFR Component styles
  @import "@gouvfr/dsfr/dist/component/logo/logo.min.css";
  @import "@gouvfr/dsfr/dist/component/footer/footer.min.css";

  @include set-shadow-host();
  @include set-dsfr-sizing("footer");

  .fr-footer__bottom-link {
    &::after,
    &::before {
      display: inline-flex;
    }
  }

  .fr-footer__bottom-item {
    &:not(:first-of-type) {
      .fr-footer__bottom-link::before {
        content: "";
        width: 4px;
      }
    }

    &:not(:last-of-type) {
      .fr-footer__bottom-link::after {
        content: "";
        width: 5px;
      }
    }
  }
</style>
