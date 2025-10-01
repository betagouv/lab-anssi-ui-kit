<svelte:options
  customElement={{
    tag: "dsfr-tag",
    props: {
      label: { attribute: "label", type: "String" },
      type: { attribute: "type", type: "String" },
      size: { attribute: "size", type: "String" },
      href: { attribute: "href", type: "String" },
      blank: { attribute: "blank", type: "Boolean" },
      title: { attribute: "title", type: "String" },
      pressed: { attribute: "pressed", type: "Boolean" },
      disabled: { attribute: "disabled", type: "Boolean" },
      hasIcon: { attribute: "has-icon", type: "Boolean" },
      icon: { attribute: "icon", type: "String" },
      accent: { attribute: "accent", type: "String" },
    },
  }}
/>

<script lang="ts">
  import type { Accent, Size } from "$lib/types";
  import { setIconClass } from "$lib/utilitaires";

  type TagSize = Extract<Size, "sm" | "md">;
  type Markup = "a" | "button" | "p" | undefined;
  interface Props {
    /** Libellé du tag */
    label: string;
    /** Type du tag<br>Valeurs :<br>- Défaut : tag non cliquable pour donner une information sur un contenu<br>- Cliquable : Le tag cliquable donne accès à une page avec des contenus associés à ce tag<br>- Sélectionnable : Le tag sélectionnable permet d’activer/désactiver un filtre<br>- Supprimable : Le tag supprimable permet de désactiver un filtre */
    type?: "default" | "clickable" | "pressable" | "dismissible";
    /** Taille du tag */
    size?: TagSize;
    /** Lien de redirection du tag cliquable */
    href?: string;
    /** Ouvre le lien dans un nouvel onglet */
    blank?: boolean;
    /** Attribut title de l\'actionneur. Si blank = true, il est obligatoire et doit reprendre le titre suivi de la mention "- nouvelle fenêtre" */
    title?: string;
    /** Le tag est sélectionné */
    pressed?: boolean;
    /** Le tag est désactivé */
    disabled?: boolean;
    /** Le tag a une icône */
    hasIcon?: boolean;
    /** Nom de l'icône dans le tag */
    icon?: string;
    /** Couleur du tag cliquable */
    accent?: Accent;
  }

  const {
    label,
    type = "default",
    size = "md",
    href,
    blank,
    title,
    pressed,
    disabled,
    hasIcon,
    icon,
    accent,
  }: Props = $props();

  const markup: Markup = $derived.by(() => {
    switch (type) {
      case "clickable":
        return "a";
      case "pressable":
      case "dismissible":
        return "button";
      default:
        return "p";
    }
  });

  const accentClass = $derived.by(() => {
    return type === "clickable" && accent && `fr-tag--${accent}`;
  });
  const dissmissClass = $derived.by(() => type === "dismissible" && "fr-tag--dismiss");
  const iconClass = $derived.by(() => {
    return hasIcon && icon && `fr-tag--icon-left ${setIconClass(icon)}`;
  });
  const sizeClass = $derived(`fr-tag--${size}`);
</script>

<svelte:element
  this={markup}
  class={["fr-tag", accentClass, dissmissClass, iconClass, sizeClass]}
  href={markup === "a" && !disabled ? href : undefined}
  aria-disabled={markup === "a" && disabled ? "true" : undefined}
  role={markup === "a" && disabled ? "link" : undefined}
  disabled={(type === "pressable" || type === "dismissible") && disabled}
>
  {label}
</svelte:element>

<style lang="scss">
  @use "@gouvfr/dsfr/src/dsfr/core/main" as *;
  @use "@gouvfr/dsfr/dist/component/tag/tag.min.css";

  .fr-tag {
    box-sizing: border-box;
  }
</style>
