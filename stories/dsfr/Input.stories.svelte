<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  import {
    inputArgTypes,
    inputArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/input/template/stories/input-arg-types.js";

  import DsfrButton from "$lib/dsfr/DsfrButton.svelte";
  import DsfrInput from "$lib/dsfr/DsfrInput.svelte";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Input",
    component: DsfrInput,
    argTypes: {
      ...inputArgTypes,
      status: {
        control: {
          type: "select",
          labels: {
            default: "Défaut",
            valid: "Succès",
            error: "Erreur",
            info: "Information",
          },
        },
        description: "Statut du message",
        options: ["default", "valid", "error", "info"],
        type: {
          value: "string",
        },
        table: { category: "message" },
      },
      labelSize: {
        control: "select",
        options: [undefined, "xs", "sm", "md", "lg", "xl", "lead"],
        description:
          "Applique une classe utilitaire de taille de texte DSFR (fr-text--xs à fr-text--xl, fr-text--lead) sur le label",
      },
      labelWeight: {
        control: "select",
        options: [undefined, "light", "regular", "bold", "heavy"],
        description:
          "Applique une classe utilitaire de graisse DSFR (fr-text--light à fr-text--heavy) sur le label",
      },
      onvaluechanged: {
        description:
          "Déclenché lors du changement de valeur du champ de saisie.<br>" + "`detail: string`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<string>" },
        },
        control: false,
      },
    },
    args: inputArgs,
    parameters: {
      actions: { handles: ["valuechanged"] },
      docs: {
        source: {
          transform: webComponentSourceCode("dsfr-input"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrInput>;
</script>

{#snippet template(args: Args)}
  <dsfr-input
    id={args.id}
    label={args.label}
    hide-label={args.hideLabel || undefined}
    hint={args.hint}
    type={args.type}
    icon={args.icon}
    value={args.value}
    placeholder={args.placeholder}
    name={args.name}
    autocomplete={args.autocomplete}
    disabled={args.disabled || undefined}
    status={args.status}
    error-message={args.errorMessage}
    valid-message={args.validMessage}
    info-message={args.infoMessage}
    form={args.form}
    max={args.max}
    maxlength={args.maxlength}
    min={args.min}
    minlength={args.minlength}
    pattern={args.pattern}
    readonly={args.readonly || undefined}
    required={args.required || undefined}
    step={args.step}
    label-size={args.labelSize}
    label-weight={args.labelWeight}
  ></dsfr-input>
{/snippet}

<Story name="Défaut" />

<Story name="Erreur" args={{ status: "error" }} />

<Story name="Succès" args={{ status: "valid" }} />

<Story name="Désactivé" args={{ disabled: true }} />

<Story name="Avec icône" args={{ label: "Champ avec une icône", icon: "warning-line" }} />

<Story
  name="Téléphone"
  args={{
    label: "Numéro de téléphone",
    hint: "Exemple: 0123456789",
    type: "tel",
  }}
/>

<Story
  name="Nombre"
  args={{
    label: "Champ de saisie de nombre",
    hint: "Saisissez un nombre entier",
    type: "number",
  }}
/>

<Story
  name="Mot de passe"
  args={{
    label: "Champ type mot de passe",
    type: "password",
  }}
/>

<Story
  name="Recherche"
  args={{
    label: "Champ type recherche",
    type: "search",
  }}
/>

<Story
  name="Avec description et icône"
  args={{
    icon: "alert-line",
    hint: "Texte de description additionnel",
  }}
/>

<Story
  name="Date"
  args={{
    label: "Date simple",
    type: "date",
  }}
/>

<Story
  name="URL"
  args={{
    label: "Adresse du site",
    placeholder: "https://",
    hint: "Saisissez une url valide, commençant par https://",
  }}
/>

<Story
  name="Avec bouton d'envoi (addon)"
  args={{ label: "Champ avec bouton d'envoi associé", addon: true }}
>
  {#snippet template(args: Args)}
    <dsfr-input
      id={args.id}
      label={args.label}
      addon={args.addon || undefined}
      status={args.status}
      error-message={args.errorMessage}
      valid-message={args.validMessage}
    >
      <dsfr-button slot="button" label="Envoyer" type="submit"></dsfr-button>
    </dsfr-input>
  {/snippet}
</Story>

<Story
  name="Avec bouton d'action (action)"
  args={{ label: "Champ avec bouton d'action associé", action: true }}
>
  {#snippet template(args: Args)}
    <dsfr-input
      id={args.id}
      label={args.label}
      action={args.action || undefined}
      status={args.status}
      error-message={args.errorMessage}
      valid-message={args.validMessage}
    >
      <dsfr-button
        slot="button"
        label="Supprimer le champ"
        kind="secondary"
        has-icon
        icon="delete-line"
        type="button"
        icon-place="only"
      ></dsfr-button>
    </dsfr-input>
  {/snippet}
</Story>
