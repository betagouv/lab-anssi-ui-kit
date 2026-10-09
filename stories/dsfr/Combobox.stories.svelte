<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  import DsfrCombobox from "$lib/dsfr/DsfrCombobox.svelte";

  const defaultOptions = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
    { value: "4", label: "Option 4" },
    { value: "5", label: "Option 5" },
    { value: "6", label: "Option 6" },
    { value: "7", label: "Option 7" },
    { value: "8", label: "Option 8" },
  ];

  const groupedOptions = [
    {
      legend: "Groupe 1",
      options: [
        { value: "g1-1", label: "Option 1.1" },
        { value: "g1-2", label: "Option 1.2" },
        { value: "g1-3", label: "Option 1.3" },
      ],
    },
    {
      legend: "Groupe 2",
      options: [
        { value: "g2-1", label: "Option 2.1" },
        { value: "g2-2", label: "Option 2.2" },
        { value: "g2-3", label: "Option 2.3" },
      ],
    },
  ];

  const groupedOptionsWithHints = [
    {
      legend: "Fruits",
      hint: "Choisissez parmi les fruits disponibles",
      options: [
        { value: "pomme", label: "Pomme" },
        { value: "poire", label: "Poire" },
        { value: "banane", label: "Banane" },
      ],
    },
    {
      legend: "Légumes",
      hint: "Choisissez parmi les légumes disponibles",
      options: [
        { value: "carotte", label: "Carotte" },
        { value: "tomate", label: "Tomate" },
        { value: "courgette", label: "Courgette" },
      ],
    },
  ];

  const { Story } = defineMeta({
    title: "Composants/DSFR/Combobox",
    component: DsfrCombobox,
    argTypes: {
      id: {
        control: "text",
        description: "Attribut id de la liste déroulante riche",
      },
      label: {
        control: "text",
        description: "Libellé de la liste déroulante riche",
      },
      hideLabel: {
        control: "boolean",
        description: "Permet de masquer le label",
      },
      hint: {
        control: "text",
        description: "Texte additionnel sous le libellé",
      },
      placeholder: {
        control: "text",
        description: "Texte avant sélection d'une option",
      },
      multiple: {
        control: "boolean",
        description: "Active le mode sélection multiple",
      },
      searchable: {
        control: "boolean",
        description: "Active le champ de recherche dans la liste",
      },
      selectAllButton: {
        control: "boolean",
        description: "Affiche le bouton « Tout sélectionner » (mode multiple uniquement)",
      },
      disabled: {
        control: "boolean",
        description: "Désactive la liste déroulante riche",
      },
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
        table: { category: "message" },
      },
      errorMessage: {
        control: "text",
        description: "Texte du message d'erreur",
        table: { category: "message" },
      },
      validMessage: {
        control: "text",
        description: "Texte du message de succès",
        table: { category: "message" },
      },
      infoMessage: {
        control: "text",
        description: "Texte du message d'information",
        table: { category: "message" },
      },
      labelSize: {
        control: "select",
        options: [undefined, "xs", "sm", "md", "lg", "xl", "lead"],
        description: "Applique une classe utilitaire de taille de texte DSFR sur le label",
      },
      labelWeight: {
        control: "select",
        options: [undefined, "light", "regular", "bold", "heavy"],
        description: "Applique une classe utilitaire de graisse DSFR sur le label",
      },
      onvaluechanged: {
        description:
          "Déclenché lors du changement de valeur (mode simple).<br>" + "`detail: string`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<string>" },
        },
        control: false,
      },
      onvalueschanged: {
        description:
          "Déclenché lors du changement de valeurs (mode multiple).<br>" + "`detail: string[]`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<string[]>" },
        },
        control: false,
      },
    },
    args: {
      id: "combobox-1",
      label: "Libellé",
      placeholder: "Sélectionner une option",
      searchable: true,
      status: "default",
      options: defaultOptions,
    },
    parameters: {
      actions: { handles: ["valuechanged", "valueschanged"] },
      docs: {
        description: {
          component:
            "La liste déroulante riche fournit une liste d'options parmi lesquelles l'utilisateur peut en choisir une ou plusieurs. Elle permet de faire une recherche ou un filtrage dans cette liste d'options.<br/><br/>Ce composant est une déclinaison enrichie de la liste déroulante (select) native, avec support de la sélection multiple, de la recherche et du regroupement d'options.",
        },
        source: {
          transform: webComponentSourceCode("dsfr-combobox"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrCombobox>;
</script>

{#snippet template(args: Args)}
  <dsfr-combobox
    id={args.id}
    label={args.label}
    hide-label={args.hideLabel || undefined}
    hint={args.hint}
    placeholder={args.placeholder}
    multiple={args.multiple || undefined}
    searchable={args.searchable}
    select-all-button={args.selectAllButton || undefined}
    options={args.options}
    option-groups={args.optionGroups}
    value={args.value}
    values={args.values}
    disabled={args.disabled || undefined}
    status={args.status}
    error-message={args.errorMessage}
    valid-message={args.validMessage}
    info-message={args.infoMessage}
    name={args.name}
    form={args.form}
    required={args.required || undefined}
    label-size={args.labelSize}
    label-weight={args.labelWeight}
  ></dsfr-combobox>
{/snippet}

<Story name="Par défaut (Sélection unique)" />

<Story name="Avec texte de description" args={{ hint: "Texte de description additionnel" }} />

<Story
  name="Sélection multiple"
  args={{
    id: "combobox-multiple",
    multiple: true,
    selectAllButton: true,
  }}
/>

<Story
  name="Options groupées"
  args={{
    id: "combobox-grouped",
    options: undefined,
    optionGroups: groupedOptions,
  }}
/>

<Story
  name="Groupes avec descriptions"
  args={{
    id: "combobox-grouped-hints",
    options: undefined,
    optionGroups: groupedOptionsWithHints,
  }}
/>

<Story
  name="Sélection multiple avec groupes"
  args={{
    id: "combobox-multi-grouped",
    multiple: true,
    selectAllButton: true,
    options: undefined,
    optionGroups: groupedOptionsWithHints,
  }}
/>

<Story
  name="Sans recherche"
  args={{
    id: "combobox-no-search",
    searchable: false,
  }}
/>

<Story
  name="Désactivé"
  args={{
    id: "combobox-disabled",
    disabled: true,
  }}
/>

<Story
  name="Erreur"
  args={{
    id: "combobox-error",
    status: "error",
    errorMessage: "Texte d’erreur obligatoire",
  }}
/>

<Story
  name="Succès"
  args={{
    id: "combobox-success",
    status: "valid",
    validMessage: "Texte de validation optionnel",
  }}
/>
