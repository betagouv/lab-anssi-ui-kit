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
  import { setThemeable } from "$lib/utilitaires";
  import { getPictogramPath } from "$lib/utilitaires/pictogramPath";

  setThemeable($host());

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
    /** Couleur d’accentuation du pictogramme */
    pictogramAccent?: Accent;
    /** Désactive le radio */
    disabled?: boolean;
    /** Attribut form du composant */
    form?: string;
    /** Attribut required du composant */
    required?: boolean;
    /** `ElementInternals` interface pour l’association du composant aux formulaires */
    internals?: ElementInternals;
    /** Callback appelé lors de la sélection du bouton radio */
    onvaluechanged?: (value: string) => void;
  }

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
    internals: _internals,
    onvaluechanged,
  }: Props = $props();

  const richClass = $derived(rich && "fr-radio-rich");
  const sizeClass = $derived(!rich && `fr-radio-group--${size}`);
  const pictogramPath = $derived(pictogramName ? getPictogramPath(pictogramName) : undefined);
  const accentClass = $derived(
    pictogramAccent && pictogramAccent !== "défaut" ? `fr-artwork--${pictogramAccent}` : undefined,
  );

  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    onvaluechanged?.(target.value);
    $host()?.dispatchEvent(
      new CustomEvent("valuechanged", { detail: target.value, bubbles: true }),
    );
  }
</script>

<div class={["fr-radio-group", richClass, sizeClass]}>
  <input type="radio" {id} {name} {value} {disabled} onchange={handleChange} {form} {required} />
  <label class="fr-label" for={id}>
    {label}
    {#if hint}
      <span class="fr-hint-text">{hint}</span>
    {/if}
  </label>
  {#if rich && (hasPictogram || $$slots.pictogram)}
    <div class="fr-radio-rich__pictogram">
      <slot name="pictogram">
        {#if pictogramPath}
          <svg
            aria-hidden="true"
            class={["fr-artwork", accentClass]}
            viewBox="0 0 80 80"
            width="80px"
            height="80px"
          >
            <use class="fr-artwork-decorative" href={`${pictogramPath}#artwork-decorative`}></use>
            <use class="fr-artwork-minor" href={`${pictogramPath}#artwork-minor`}></use>
            <use class="fr-artwork-major" href={`${pictogramPath}#artwork-major`}></use>
          </svg>
        {/if}
      </slot>
    </div>
  {/if}
</div>

<style lang="scss">
  // DSFR Core styles
  @use "src/lib/styles/mixins-dsfr.scss" as *;
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/input";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/focus";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/hover";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/cursor";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/disabled";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/box-sizing";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/tap-highlight";
  @import "@gouvfr/dsfr/src/dsfr/core/style/scheme";
  @import "@gouvfr/dsfr/src/dsfr/core/style/artwork/module";
  // DSFR Component styles
  @import "@gouvfr/dsfr/dist/component/form/form.main.css";
  @import "@gouvfr/dsfr/dist/component/radio/radio.main.css";

  @include _core-artwork-scheme;
  @include set-shadow-host();
  @include set-dsfr-sizing("radio-group");
</style>
