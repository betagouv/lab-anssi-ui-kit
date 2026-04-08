<svelte:options
  customElement={{
    tag: "dsfr-link",
    props: {
      label: { attribute: "label", type: "String" },
      size: { attribute: "size", type: "String" },
      id: { attribute: "id", type: "String" },
      disabled: { attribute: "disabled", type: "Boolean" },
      blank: { attribute: "blank", type: "Boolean" },
      title: { attribute: "title", type: "String" },
      href: { attribute: "href", type: "String" },
      download: { attribute: "download", type: "String" },
      detail: { attribute: "detail", type: "String" },
      hreflang: { attribute: "hreflang", type: "String" },
      assess: { attribute: "assess", type: "Boolean" },
      hasIcon: { attribute: "has-icon", type: "Boolean" },
      icon: { attribute: "icon", type: "String" },
      iconPlace: { attribute: "icon-place", type: "String" },
      neutral: { attribute: "neutral", type: "Boolean" },
    },
    extend: withIconsStyleSheet,
  }}
/>

<script lang="ts">
  import type { Size } from "$lib/types";
  import { withIconsStyleSheet, setIconClass, setThemeable } from "$lib/utilitaires";

  setThemeable($host());

  type LinkSize = Extract<Size, "sm" | "md" | "lg">;
  type IconPlace = "left" | "right";
  interface Props {
    /** Libellé du lien */
    label: string;
    /** Taille du lien */
    size?: LinkSize;
    /** Attribut 'id' du lien */
    id?: string;
    /** Le lien est désactivé */
    disabled?: boolean;
    /** Si true, target prend la valeur _blank, sinon _self */
    blank?: boolean;
    /** Attribut title du lien */
    title?: string;
    /** Adresse url du lien */
    href?: string;
    /**
     * Si défini, active le "mode" téléchargement du navigateur (i.e. n'ouvre pas un nouvel onglet)
     * Si chaîne vide, se base sur diverses sources pour calculer le nom du fichier (voir https://developer.mozilla.org/fr/docs/Web/HTML/Reference/Elements/a#download)
     * Si chaine non-vide, remplace le nom du fichier téléchargé
     *  */
    download?: string;
    /** Détail du lien de téléchargement */
    detail?: string;
    /** Code langue du fichier à télécharger */
    hreflang?: string;
    /** si true, ajoute l'attribut permettant le remplissage automatique des informations du fichier à télécharger. Si string, ajoute l'attribut avec la valeur de la string (ex: "bytes" pour les poids en bytes) */
    assess?: boolean;
    /** Le lien a une icône */
    hasIcon?: boolean;
    /** Nom de l'icône dans le lien */
    icon?: string;
    /** Emplacement de l'icône<br>Si non défini alors que le paramètre icon est défini, lien avec icône seule, sans label<br>valeurs :<br>- left : icône à gauche du label<br>- right : icône à droite du label */
    iconPlace?: IconPlace;
    /** Si true, affiche le lien dans une teinte neutre */
    neutral?: boolean;
  }

  let {
    label,
    size = "md",
    id,
    disabled,
    blank,
    title,
    href,
    download,
    detail,
    hreflang,
    hasIcon,
    icon,
    iconPlace = "left",
    neutral,
  }: Props = $props();

  const modeTelechargementActif = $derived(download !== undefined);

  const iconClass = $derived(!modeTelechargementActif && hasIcon && icon && setIconClass(icon));
</script>

<a
  href={!disabled ? href : undefined}
  {id}
  aria-disabled={disabled ? "true" : undefined}
  class={[
    "fr-link",
    `fr-link--${size}`,
    iconClass,
    { "fr-link--download": modeTelechargementActif, "fr-link--neutral": neutral },
  ]}
  class:fr-link--icon-left={hasIcon && iconPlace === "left"}
  class:fr-link--icon-right={hasIcon && iconPlace === "right"}
  {download}
  hreflang={modeTelechargementActif && hreflang ? hreflang : undefined}
  rel={blank ? "noopener external" : undefined}
  role={disabled ? "link" : undefined}
  target={blank ? "_blank" : "_self"}
  title={blank ? title : undefined}
>
  {#if modeTelechargementActif && detail}
    {label}<span class="fr-link__detail">{detail}</span>
  {:else}
    {label}
  {/if}
</a>

<style lang="scss">
  // DSFR Core styles
  @use "src/lib/styles/mixins-dsfr.scss" as *;
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/link";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/focus";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/hover";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/cursor";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/disabled";
  @import "@gouvfr/dsfr/src/dsfr/core/style/icon/module";
  @import "@gouvfr/dsfr/src/dsfr/core/style/scheme";
  @include _core-scheme;
  // DSFR Component styles
  @import "@gouvfr/dsfr/src/dsfr/component/link/main";

  @include set-shadow-host("inline", false, $tag: "dsfr-link");
  @include set-dsfr-sizing("link") {
    &--neutral {
      color: currentColor;
      font-size: inherit;
    }
  }
</style>
