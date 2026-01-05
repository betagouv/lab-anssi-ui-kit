<svelte:options
  customElement={{
    tag: "dsfr-radio",
    props: {
      id: { attribute: "id", type: "String" },
      name: { attribute: "name", type: "String" },
      label: { attribute: "label", type: "String" },
      value: { attribute: "value", type: "String", reflect: true },
      size: { attribute: "size", type: "String" },
      hint: { attribute: "hint", type: "String" },
      rich: { attribute: "rich", type: "Boolean" },
      hasPictogram: { attribute: "has-pictogram", type: "Boolean" },
      pictogramName: { attribute: "pictogram-name", type: "String" },
      pictogramAccent: { attribute: "pictogram-accent", type: "String" },
      disabled: { attribute: "disabled", type: "Boolean" },
      form: { attribute: "form", type: "String" },
      required: { attribute: "required", type: "Boolean" },
    },
    extend: (customElementConstructor) => {
      return class extends customElementConstructor {
        static formAssociated = true;

        constructor() {
          super();
          this.internals = this.attachInternals();
        }
      };
    },
  }}
/>

<script lang="ts">
  import type { Accent, Size } from "$lib/types";
  import { createEventDispatcher } from "svelte";

  type RadioSize = Extract<Size, "sm" | "md">;
  interface Props {
    /** Attribut id du radio */
    id: string;
    /** Attribut name du radio */
    name: string;
    /** Libellé du radio */
    label?: string;
    /** Valeur du champ de saisie */
    value?: string;
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
    /** Attribut form du composant */
    form?: string;
    /** Attribut required du composant */
    required?: boolean;
    /** `ElementInternals` interface pour l'association du composant aux formulaires */
    internals?: ElementInternals;
  }

  const dispatch = createEventDispatcher();

  let {
    id,
    label,
    value,
    name,
    size,
    hint,
    rich,
    hasPictogram,
    pictogramName,
    pictogramAccent,
    disabled,
    form,
    required,
    internals,
  }: Props = $props();

  const richClass = $derived.by(() => {
    return rich && "fr-radio-rich";
  });
  const sizeClass = $derived(`fr-radio-group--${size}`);

  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    dispatch("valuechanged", target.value);
  }

  $effect(() => {
    if (!internals) return;

    if (checked) {
      internals.setFormValue(value);
    } else {
      internals.setFormValue(null);
    }
  });
</script>

<div class={["fr-radio-group", richClass, sizeClass]}>
  <input type="radio" {id} {name} {value} {disabled} onchange={handleChange} {form} {required} />
  <label class="fr-label" for={id}>
    {label}
    {#if hint}
      <span class="fr-hint-text">{hint}</span>
    {/if}
  </label>
</div>

<style lang="scss">
  // DSFR Core styles
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/input";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/focus";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/hover";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/cursor";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/disabled";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/box-sizing";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/tap-highlight";
  // DSFR Component styles
  @import "@gouvfr/dsfr/src/dsfr/component/form/style/module/hint-text";
  @import "@gouvfr/dsfr/src/dsfr/component/form/style/module/label";
  @import "@gouvfr/dsfr/src/dsfr/component/form/style/scheme";
  @include _form-scheme();
  @import "@gouvfr/dsfr/dist/component/radio/radio.main.css";

  @include set-shadow-host();
  @include set-dsfr-sizing("radio-group");
</style>
