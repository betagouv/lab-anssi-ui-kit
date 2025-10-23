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
      download: { attribute: "download", type: "Boolean" },
      detail: { attribute: "detail", type: "String" },
      hreflang: { attribute: "hreflang", type: "String" },
      assess: { attribute: "assess", type: "Boolean" },
      hasIcon: { attribute: "has-icon", type: "Boolean" },
      icon: { attribute: "icon", type: "String" },
      iconPlace: { attribute: "icon-place", type: "String" },
    },
  }}
/>

<script lang="ts">
  import type { Size } from "$lib/types";
  import { setIconClass } from "$lib/utilitaires";

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
    /** Si true, lien de téléchargement */
    download?: boolean;
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
  }: Props = $props();

  const iconClass = $derived(!download && hasIcon && icon && setIconClass(icon));
</script>

<a
  href={!disabled ? href : undefined}
  {id}
  aria-disabled={disabled ? "true" : undefined}
  class={["fr-link", `fr-link--${size}`, iconClass, { "fr-link--download": download }]}
  class:fr-link--icon-left={hasIcon && iconPlace === "left"}
  class:fr-link--icon-right={hasIcon && iconPlace === "right"}
  download={download ? "true" : undefined}
  hreflang={download && hreflang ? hreflang : undefined}
  rel={blank ? "noopener external" : undefined}
  role={disabled ? "link" : undefined}
  target={blank ? "_blank" : "_self"}
  title={blank ? title : undefined}
>
  {#if download && detail}
    {label}<span class="fr-link__detail">{detail}</span>
  {:else}
    {label}
  {/if}
</a>

<style lang="scss">
  // DSFR Core styles
  @import "@gouvfr/dsfr/dist/core/core.main.css";
  @import "@gouvfr/dsfr/src/dsfr/utility/main";
  // DSFR Component styles
  @import "@gouvfr/dsfr/dist/component/link/link.main.css";

  @include set-shadow-host("inline");
  @include set-dsfr-sizing("link");
</style>
