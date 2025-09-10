<svelte:options
  customElement={{
    tag: "dsfr-radio",
    props: {
      id: { attribute: "id", type: "String" },
      label: { attribute: "label", type: "String" },
      name: { attribute: "name", type: "String" },
      size: { attribute: "size", type: "String" },
      hint: { attribute: "hint", type: "String" },
      rich: { attribute: "rich", type: "Boolean" },
      hasPictogram: { attribute: "has-pictogram", type: "Boolean" },
      pictogramName: { attribute: "pictogram-name", type: "String" },
      pictogramAccent: { attribute: "pictogram-accent", type: "String" },
      disabled: { attribute: "disabled", type: "Boolean" },
    },
  }}
/>

<script lang="ts">
  import type { Accent, Size } from "$lib/types";

  type RadioSize = Extract<Size, "sm" | "md">;

  interface Props {
    /** Attribut id du radio */
    id: string;
    /** Attribut name du radio */
    name: string;
    /** Libellé du radio */
    label?: string;
    /** Taille du radio */
    size?: RadioSize;
    /** Texte additionnel du radio */
    hint?: string;
    /** Passe en mode radios riches (ajoute un encadré et la possibilité d’associer un pictogramme) */
    rich?: boolean;
    /** Ajoute un pictogramme au radio riche */
    hasPictogram?: boolean;
    /** Nom du pictogramme du radio */
    pictogramName?: string;
    /** Couleur d'accentuation du pictogramme */
    pictogramAccent?: Accent;
    /** Désactive le radio */
    disabled?: boolean;
  }

  let {
    id,
    label,
    name,
    size,
    hint,
    rich,
    hasPictogram,
    pictogramName,
    pictogramAccent,
    disabled,
  }: Props = $props();

  let richClass = $derived.by(() => {
    return rich && "fr-radio-rich";
  });
  let sizeClass = $derived(`fr-radio-group--${size}`);
</script>

<div class={["fr-radio-group", richClass, sizeClass]}>
  <input type="radio" {id} {name} {disabled} />
  <label class="fr-label" for={id}>
    {label}
    {#if hint}
      <span class="fr-hint-text">{hint}</span>
    {/if}
  </label>
</div>
