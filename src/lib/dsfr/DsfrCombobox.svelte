<svelte:options
  customElement={{
    props: {
      id: { attribute: "id", type: "String" },
      label: { attribute: "label", type: "String" },
      hideLabel: { attribute: "hide-label", type: "Boolean" },
      hint: { attribute: "hint", type: "String" },
      placeholder: { attribute: "placeholder", type: "String" },
      multiple: { attribute: "multiple", type: "Boolean" },
      searchable: { attribute: "searchable", type: "Boolean" },
      selectAllButton: { attribute: "select-all-button", type: "Boolean" },
      optionGroups: { attribute: "option-groups", type: "Object" },
      value: { attribute: "value", type: "String", reflect: true },
      values: { attribute: "values", type: "Object", reflect: true },
      disabled: { attribute: "disabled", type: "Boolean", reflect: true },
      status: { attribute: "status", type: "String" },
      errorMessage: { attribute: "error-message", type: "String" },
      validMessage: { attribute: "valid-message", type: "String" },
      infoMessage: { attribute: "info-message", type: "String" },
      name: { attribute: "name", type: "String", reflect: true },
      form: { attribute: "form", type: "String", reflect: true },
      required: { attribute: "required", type: "Boolean" },
      labelSize: { attribute: "label-size", type: "String" },
      labelWeight: { attribute: "label-weight", type: "String" },
    },
    extend: avecEnregistrementIdempotent("dsfr-combobox", (customElementConstructor) => {
      return class extends customElementConstructor {
        static formAssociated = true;

        constructor() {
          super();
          this.internals = this.attachInternals();
        }

        connectedCallback() {
          super.connectedCallback();

          const iconsStyleSheet = getIconsStyleSheet();
          const shadow = this.shadowRoot;

          if (shadow && !shadow.adoptedStyleSheets.includes(iconsStyleSheet)) {
            shadow.adoptedStyleSheets = [iconsStyleSheet, ...shadow.adoptedStyleSheets];
          }
        }
      };
    }),
  }}
/>

<script lang="ts">
  import type { TextSize, TextWeight } from "$lib/types";
  import { avecEnregistrementIdempotent, getIconsStyleSheet, setThemeable } from "$lib/utilitaires";
  import { createFormValidation } from "$lib/utilitaires/createFormValidation.svelte";

  import DsfrButton from "$lib/dsfr/DsfrButton.svelte";
  import DsfrInput from "$lib/dsfr/DsfrInput.svelte";
  import DsfrLabel from "$lib/dsfr/DsfrLabel.svelte";
  import DsfrMessagesGroup from "./DsfrMessagesGroup.svelte";

  type ComboboxOption = {
    value: string;
    label: string;
    disabled?: boolean;
  };

  type ComboboxOptionGroup = {
    legend?: string;
    hint?: string;
    options: ComboboxOption[];
  };

  interface Props {
    /** Attribut id de la liste déroulante riche */
    id: string;
    /** Libellé de la liste déroulante riche */
    label: string;
    /** Permet de masquer le label */
    hideLabel?: boolean;
    /** Texte additionnel sous le libellé */
    hint?: string;
    /** Texte avant sélection d'une option */
    placeholder?: string;
    /** Active le mode sélection multiple (cases à cocher au lieu de boutons radio) */
    multiple?: boolean;
    /** Active le champ de recherche dans la liste */
    searchable?: boolean;
    /** Affiche le bouton "Tout sélectionner" (mode multiple uniquement) */
    selectAllButton?: boolean;
    /** Groupes d'options de la liste déroulante */
    optionGroups?: ComboboxOptionGroup[];
    /** Valeur sélectionnée (mode "sélection unique") */
    value?: string;
    /** Valeurs sélectionnées (mode "sélection multiple") */
    values?: string[];
    /** Désactive la liste déroulante riche */
    disabled?: boolean;
    /** Statut du message */
    status?: "default" | "valid" | "error" | "info";
    /** Texte du message d'erreur */
    errorMessage?: string;
    /** Texte du message de succès */
    validMessage?: string;
    /** Texte du message d'information */
    infoMessage?: string;
    /** Attribut name du champ */
    name?: string;
    /** Attribut form du composant */
    form?: string;
    /** Rend la sélection obligatoire */
    required?: boolean;
    /** `ElementInternals` interface pour l'association du composant aux formulaires */
    internals?: ElementInternals;
    /** Callback appelé lors du changement de valeur (mode "sélection unique") */
    onvaluechanged?: (value: string) => void;
    /** Callback appelé lors du changement de valeurs (mode "sélection multiple") */
    onvalueschanged?: (values: string[]) => void;
    /** Applique une classe utilitaire de taille de texte DSFR sur le label */
    labelSize?: TextSize;
    /** Applique une classe utilitaire de graisse DSFR sur le label */
    labelWeight?: TextWeight;
  }

  let {
    id,
    label,
    hideLabel = false,
    hint,
    placeholder = "Sélectionner une option",
    multiple = false,
    searchable = true,
    selectAllButton = false,
    optionGroups = [],
    value = $bindable(),
    values = $bindable(),
    disabled,
    status = "default",
    errorMessage,
    validMessage,
    infoMessage,
    name,
    form,
    required,
    internals,
    onvaluechanged,
    onvalueschanged,
    labelSize,
    labelWeight,
  }: Props = $props();

  let hostElement: HTMLElement = $host();
  setThemeable(hostElement);

  let validationElement: HTMLInputElement;
  let triggerElement: HTMLButtonElement;
  let panelElement: HTMLDivElement;

  let expanded = $state(false);
  let searchQuery = $state("");

  const formValidation = createFormValidation();

  const isUserControlled = $derived(status !== "default");
  const computedStatus = $derived(isUserControlled ? status : formValidation.localStatus);
  const computedErrorMessage = $derived(
    isUserControlled ? errorMessage : formValidation.localErrorMessage,
  );

  const disabledClass = $derived(disabled && "fr-select-group--disabled");
  const statusClass = $derived(
    computedStatus !== "info" &&
      computedStatus !== "default" &&
      `fr-select-group--${computedStatus}`,
  );

  const allOptions = $derived(optionGroups.flatMap((g) => g.options));

  const filteredGroups = $derived.by<ComboboxOptionGroup[]>(() => {
    if (!searchQuery) return optionGroups;

    const query = searchQuery.toLowerCase();
    return optionGroups
      .map((group) => {
        if (group.legend?.toLowerCase().includes(query)) return group;

        return {
          ...group,
          options: group.options.filter((o) => o.label.toLowerCase().includes(query)),
        };
      })
      .filter((group) => group.options.length > 0);
  });

  const filteredEnabledOptions = $derived(
    filteredGroups.flatMap((g) => g.options).filter((o) => !o.disabled),
  );

  const displayText = $derived.by(() => {
    if (multiple) {
      const count = values?.length ?? 0;
      if (count === 0) return placeholder;
      return `${count} option${count > 1 ? "s" : ""} sélectionnée${count > 1 ? "s" : ""}`;
    }
    if (!value) return placeholder;
    const selected = allOptions.find((o) => o.value === value);
    return selected?.label ?? placeholder;
  });

  const isPlaceholder = $derived(multiple ? (values?.length ?? 0) === 0 : !value);

  const allFilteredSelected = $derived.by(() => {
    if (!multiple || !values) return false;
    return (
      filteredEnabledOptions.length > 0 &&
      filteredEnabledOptions.every((o) => values!.includes(o.value))
    );
  });

  function expand() {
    if (expanded || disabled) return;
    expanded = true;
    searchQuery = "";
    panelElement?.classList.add("fr-collapse--expanded");
  }

  function close() {
    if (!expanded) return;
    expanded = false;
    panelElement?.classList.remove("fr-collapse--expanded");
    triggerElement?.focus();
  }

  function handleExpanded() {
    if (expanded) close();
    else expand();
  }

  function handleClickOutside(event: PointerEvent) {
    if (!expanded) return;
    const path = event.composedPath();
    if (!path.includes(hostElement)) {
      close();
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape" && expanded) {
      close();
      event.preventDefault();
    }
  }

  function handleRadioChange(optionValue: string) {
    value = optionValue;
    onvaluechanged?.(optionValue);
    hostElement.dispatchEvent(
      new CustomEvent("valuechanged", { detail: optionValue, bubbles: true }),
    );
    close();
  }

  function toggleValue(optionValue: string) {
    if (values?.includes(optionValue)) {
      values = values.filter((v) => v !== optionValue);
    } else {
      values = [...(values ?? []), optionValue];
    }
    onvalueschanged?.(values);
    hostElement.dispatchEvent(new CustomEvent("valueschanged", { detail: values, bubbles: true }));
  }

  function handleSelectAll() {
    const filteredSet = new Set(filteredEnabledOptions.map((o) => o.value));
    if (allFilteredSelected) {
      values = (values ?? []).filter((v) => !filteredSet.has(v));
    } else {
      const existing = new Set(values ?? []);
      values = [...existing, ...filteredSet.values().filter((v) => !existing.has(v))];
    }
    onvalueschanged?.(values);
    hostElement.dispatchEvent(new CustomEvent("valueschanged", { detail: values, bubbles: true }));
  }

  export function setCustomValidity(message: string) {
    formValidation.setCustomValidity(message);
  }

  $effect(() => {
    if (expanded) {
      window.addEventListener("pointerdown", handleClickOutside);
      return () => window.removeEventListener("pointerdown", handleClickOutside);
    }
  });

  $effect(() => {
    formValidation.setup(internals, validationElement, hostElement, () => {
      if (multiple) {
        values = [];
      } else {
        value = "";
      }
    });
  });

  $effect(() => {
    if (!internals) return;

    if (multiple) {
      const formData = new FormData();
      const fieldName = name ?? id;
      if (values && values.length > 0) {
        for (const val of values) {
          formData.append(fieldName, val);
        }
        internals.setFormValue(formData);
      } else {
        internals.setFormValue("");
      }

      if (isUserControlled) {
        internals.setValidity({});
      } else {
        formValidation.updateValidity();
      }
    } else {
      formValidation.syncFormValue(value, isUserControlled);
    }
  });

  $effect(() => {
    if (isUserControlled) {
      internals?.setValidity({});
    }
  });

  $effect(() => {
    return formValidation.attachListeners();
  });
</script>

<div class={["fr-select-group", statusClass, disabledClass]}>
  <DsfrLabel
    for={id}
    {label}
    {hint}
    hidden={hideLabel}
    context="field"
    {status}
    {disabled}
    {labelSize}
    {labelWeight}
  />

  <input
    bind:this={validationElement}
    type="hidden"
    {name}
    value={multiple ? (values ?? []).join(",") : (value ?? "")}
    {required}
    {form}
    tabindex={-1}
    aria-hidden="true"
  />

  <div class="fr-combobox">
    <button
      bind:this={triggerElement}
      type="button"
      class="fr-combobox__button"
      class:fr-combobox__button--placeholder={isPlaceholder}
      {id}
      {disabled}
      aria-expanded={expanded}
      aria-controls={`${id}-panel`}
      onclick={handleExpanded}
      onkeydown={handleKeydown}
    >
      <span class="fr-combobox__button-text">{displayText}</span>
      <span
        class="fr-combobox__chevron"
        class:fr-combobox__chevron--expanded={expanded}
        aria-hidden="true"
      ></span>
    </button>

    <div
      bind:this={panelElement}
      class="fr-collapse fr-combobox__panel"
      id={`${id}-panel`}
      role="presentation"
      onkeydown={handleKeydown}
    >
      <div class="fr-combobox__content">
        {#if multiple && selectAllButton}
          <DsfrButton
            label={allFilteredSelected ? "Tout désélectionner" : "Tout sélectionner"}
            kind="tertiary"
            iconPlace="left"
            icon={allFilteredSelected ? "close-circle-line" : "check-line"}
            hasIcon
            centered
            disabled={filteredEnabledOptions.length === 0}
            onclick={handleSelectAll}
          />
        {/if}

        {#if searchable}
          <div class="fr-combobox__search">
            <slot name="search">
              <DsfrInput
                id="recherche-liste"
                type="search"
                label="Rechercher dans la liste"
                placeholder="Rechercher"
                icon="search-line"
                bind:value={searchQuery}
                hideLabel
              />
            </slot>
          </div>
        {/if}

        <div class="fr-combobox__options">
          <slot name="options">
            {#each filteredGroups as group, groupIndex (groupIndex)}
              <fieldset
                class="fr-fieldset"
                aria-labelledby={group.legend ? `${id}-group-${groupIndex}-legend` : undefined}
              >
                {#if group.legend}
                  <legend
                    class="fr-fieldset__legend--regular fr-fieldset__legend"
                    id={`${id}-group-${groupIndex}-legend`}
                  >
                    {group.legend}
                    {#if group.hint}
                      <span class="fr-hint-text">{group.hint}</span>
                    {/if}
                  </legend>
                {/if}

                {#each group.options as option (option.value)}
                  <div class="fr-fieldset__element">
                    {#if multiple}
                      <div class="fr-checkbox-group fr-checkbox-group--sm">
                        <input
                          type="checkbox"
                          id={`${id}-option-${option.value}`}
                          {name}
                          value={option.value}
                          checked={values?.includes(option.value)}
                          onchange={() => toggleValue(option.value)}
                          disabled={option.disabled}
                          {form}
                        />
                        <label class="fr-label" for={`${id}-option-${option.value}`}>
                          {option.label}
                        </label>
                      </div>
                    {:else}
                      <div class="fr-radio-group fr-radio-group--sm">
                        <input
                          type="radio"
                          id={`${id}-option-${option.value}`}
                          name={name ?? id}
                          value={option.value}
                          checked={value === option.value}
                          onchange={() => handleRadioChange(option.value)}
                          disabled={option.disabled}
                          {form}
                        />
                        <label class="fr-label" for={`${id}-option-${option.value}`}>
                          {option.label}
                        </label>
                      </div>
                    {/if}
                  </div>
                {/each}
              </fieldset>
            {/each}
          </slot>
        </div>
      </div>
    </div>
  </div>

  <slot name="messages-group">
    {#if computedStatus !== "default"}
      <DsfrMessagesGroup
        {id}
        status={computedStatus}
        errorMessage={isUserControlled ? errorMessage : computedErrorMessage}
        {validMessage}
        {infoMessage}
      />
    {/if}
  </slot>
</div>

<style lang="scss">
  @use "src/lib/styles/mixins-dsfr.scss" as *;
  @import "@gouvfr/dsfr/src/dsfr/core/index";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/input";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/focus";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/hover";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/cursor";
  @import "@gouvfr/dsfr/src/dsfr/core/style/action/module/disabled";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/box-sizing";
  @import "@gouvfr/dsfr/src/dsfr/core/style/reset/module/tap-highlight";
  @import "@gouvfr/dsfr/src/dsfr/core/style/collapse/module";
  @import "@gouvfr/dsfr/src/dsfr/core/style/scheme";
  @include _core-scheme;
  @import "@gouvfr/dsfr/dist/component/form/form.main.css";
  @import "@gouvfr/dsfr/dist/component/select/select.main.css";
  @import "@gouvfr/dsfr/dist/component/input/input.main.css";
  @import "@gouvfr/dsfr/dist/component/radio/radio.main.css";
  @import "@gouvfr/dsfr/dist/component/checkbox/checkbox.main.css";

  @include set-shadow-host();
  @include set-dsfr-sizing("select-group");
  @include set-dsfr-sizing("fieldset") {
    margin: 0;

    &:not(:last-child) {
      border-bottom: 1px solid var(--border-default-grey, #ddd);
      margin-block-end: 1rem;
    }
  }

  .fr-select-group:not(:last-child) {
    margin-bottom: 0;
  }

  .fr-select-group--error .fr-combobox__button {
    border-bottom-color: var(--border-plain-error);
  }

  .fr-select-group--valid .fr-combobox__button {
    border-bottom-color: var(--border-plain-success);
  }

  .fr-combobox {
    position: relative;
    min-width: var(--dsfr-combobox-min-width, #{rem(282px)});

    &__button {
      appearance: none;
      width: 100%;
      display: flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.5rem 1rem;
      background-color: var(--background-contrast-grey);
      border: none;
      border-bottom: 2px solid var(--border-plain-grey);
      border-radius: 0.25rem 0.25rem 0 0;
      font: inherit;
      font-size: 1rem;
      line-height: 1.5rem;
      color: var(--text-label-grey);
      cursor: pointer;
      text-align: left;

      &--placeholder {
        color: var(--text-default-grey);
      }

      &:focus-visible {
        outline: 2px solid var(--border-action-high-blue-france);
        outline-offset: 2px;
      }

      &:hover:not(:disabled) {
        background-color: var(--background-contrast-grey-hover);
      }

      &:active:not(:disabled) {
        background-color: var(--background-contrast-grey-active);
      }

      &:disabled {
        color: var(--text-disabled-grey);
        border-color: var(--border-disabled-grey);
        cursor: not-allowed;
      }
    }

    &__button-text {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &__chevron {
      flex-shrink: 0;
      width: 1rem;
      height: 1rem;
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z'/%3E%3C/svg%3E");
      mask-size: contain;
      mask-repeat: no-repeat;
      mask-position: center;
      background-color: currentColor;
      transition: transform 0.3s;

      &--expanded {
        transform: rotate(180deg);
      }
    }

    &__panel {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      z-index: 1000;
      background-color: var(--background-overlap-grey);
      box-shadow: 0 4px 12px rgb(0 0 18 / 16%);
      transition: none;

      &::before {
        transition: none;
      }

      &.fr-collapse--expanded {
        --collapse-max-height: 26.875rem;
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
    }

    &__search {
      flex-shrink: 0;
    }

    &__options {
      flex: 1;
      overflow-y: auto;
      min-height: 0;

      // .fr-fieldset + .fr-fieldset {
      //   border-top: 1px solid var(--border-default-grey);
      //   padding-top: 1rem;
      // }
    }
  }

  @include set-dsfr-sizing("checkbox-group") {
    @include set-themeable-checkbox();
    @include set-themeable-checkbox-sm();
  }
</style>
