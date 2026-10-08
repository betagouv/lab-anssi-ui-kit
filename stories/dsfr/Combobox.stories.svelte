<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect, fn, userEvent } from "storybook/test";
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
      slotSearch: {
        name: "search",
        description:
          "Champ de recherche personnalisé (remplace le DsfrInput par défaut). Visible uniquement si `searchable` est activé.",
        control: false,
        table: { category: "Slots" },
      },
      slotOptions: {
        name: "options",
        description:
          "Contenu personnalisé de la liste d'options (remplace le rendu automatique des groupes d'options)",
        control: false,
        table: { category: "Slots" },
      },
      slotMessagesGroup: {
        name: "messages-group",
        description: "Messages personnalisés (remplace le DsfrMessagesGroup par défaut)",
        control: false,
        table: { category: "Slots" },
      },
    },
    args: {
      id: "combobox-1",
      label: "Libellé",
      placeholder: "Sélectionner une option",
      searchable: true,
      status: "default",
      optionGroups: [{ options: defaultOptions }],
      onvaluechanged: fn(),
      onvalueschanged: fn(),
    },
    parameters: {
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
    option-groups={args.optionGroups ? JSON.stringify(args.optionGroups) : undefined}
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
    onvaluechanged={(e: CustomEvent) => args.onvaluechanged?.(e.detail)}
    onvalueschanged={(e: CustomEvent) => args.onvalueschanged?.(e.detail)}
  ></dsfr-combobox>
{/snippet}

<Story
  name="Par défaut (Sélection unique)"
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-combobox");
    const shadow = el?.shadowRoot;
    const optionGroups =
      (args as unknown as { optionGroups: { options: { value: string; label: string }[] }[] })
        .optionGroups ?? [];
    const allOptions = optionGroups.flatMap((g) => g.options);

    await step("Le label est affiché", async () => {
      const label = shadow?.querySelector("label.fr-label");

      await expect(label?.textContent).toContain(args.label);
    });

    await step("Le bouton affiche le placeholder", async () => {
      const buttonText = shadow?.querySelector(".fr-combobox__button-text");

      await expect(buttonText?.textContent).toContain(args.placeholder);
    });

    await step("Un clic sur le bouton ouvre le panel", async () => {
      const button = shadow?.querySelector(".fr-combobox__button") as HTMLButtonElement;

      await userEvent.click(button);

      await expect(button.getAttribute("aria-expanded")).toBe("true");
    });

    await step("Les options radio sont rendues", async () => {
      const radios = shadow?.querySelectorAll(".fr-radio-group input");

      await expect(radios?.length).toBe(allOptions.length);
    });

    await step("Un clic sur un radio le sélectionne et émet l’événement valuechanged", async () => {
      const handler = fn();
      el?.addEventListener("valuechanged", handler);

      const secondRadio = shadow?.querySelectorAll(".fr-radio-group input")[1] as HTMLInputElement;

      await userEvent.click(secondRadio);

      await expect(secondRadio.checked).toBe(true);
      await expect(handler).toHaveBeenCalledOnce();
      await expect(handler.mock.calls.at(-1)?.[0].detail).toBe(allOptions[1]?.value);

      el?.removeEventListener("valuechanged", handler);
    });
  }}
/>

<Story
  name="Avec texte de description"
  args={{ hint: "Texte de description additionnel" }}
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-combobox");
    const shadow = el?.shadowRoot;

    await step("Le texte d’aide est affiché", async () => {
      const hint = shadow?.querySelector(".fr-hint-text");

      await expect(hint?.textContent?.trim()).toBe((args as unknown as { hint: string }).hint);
    });
  }}
/>

<Story
  name="Sélection multiple"
  args={{
    id: "combobox-multiple",
    multiple: true,
    selectAllButton: true,
  }}
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-combobox");
    const shadow = el?.shadowRoot;
    const optionGroups =
      (args as unknown as { optionGroups: { options: { value: string; label: string }[] }[] })
        .optionGroups ?? [];
    const allOptions = optionGroups.flatMap((g) => g.options);

    await step("Un clic sur le bouton ouvre le panel", async () => {
      const button = shadow?.querySelector(".fr-combobox__button") as HTMLButtonElement;

      await userEvent.click(button);

      await expect(button.getAttribute("aria-expanded")).toBe("true");
    });

    await step("Les checkboxes sont rendues", async () => {
      const checkboxes = shadow?.querySelectorAll(".fr-checkbox-group input");

      await expect(checkboxes?.length).toBe(allOptions.length);
    });

    await step(
      "Cocher une checkbox met à jour son état et émet l’événement valueschanged",
      async () => {
        const handler = fn();
        el?.addEventListener("valueschanged", handler);

        const firstCheckbox = shadow?.querySelector(".fr-checkbox-group input") as HTMLInputElement;

        await userEvent.click(firstCheckbox);

        await expect(firstCheckbox.checked).toBe(true);
        await expect(handler).toHaveBeenCalledOnce();

        el?.removeEventListener("valueschanged", handler);
      },
    );
  }}
/>

<Story
  name="Options groupées"
  args={{
    id: "combobox-grouped",
    optionGroups: groupedOptions,
  }}
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-combobox");
    const shadow = el?.shadowRoot;

    await step("Un clic sur le bouton ouvre le panel", async () => {
      const button = shadow?.querySelector(".fr-combobox__button") as HTMLButtonElement;

      await userEvent.click(button);
    });

    await step("Les légendes des groupes sont affichées", async () => {
      const legends = shadow?.querySelectorAll("legend.fr-fieldset__legend");

      await expect(legends?.length).toBe(groupedOptions.length);

      for (let i = 0; i < groupedOptions.length; i++) {
        await expect(legends?.[i]?.textContent).toContain(groupedOptions[i].legend);
      }
    });

    await step("Le bon nombre de fieldsets est rendu", async () => {
      const fieldsets = shadow?.querySelectorAll("fieldset.fr-fieldset");

      await expect(fieldsets?.length).toBe(groupedOptions.length);
    });
  }}
/>

<Story
  name="Groupes avec descriptions"
  args={{
    id: "combobox-grouped-hints",
    optionGroups: groupedOptionsWithHints,
  }}
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-combobox");
    const shadow = el?.shadowRoot;

    await step("Un clic sur le bouton ouvre le panel", async () => {
      const button = shadow?.querySelector(".fr-combobox__button") as HTMLButtonElement;

      await userEvent.click(button);
    });

    await step("Les légendes et textes d’aide des groupes sont affichés", async () => {
      const legends = shadow?.querySelectorAll("legend.fr-fieldset__legend");

      await expect(legends?.length).toBe(groupedOptionsWithHints.length);

      for (let i = 0; i < groupedOptionsWithHints.length; i++) {
        await expect(legends?.[i]?.textContent).toContain(groupedOptionsWithHints[i].legend);

        const hint = legends?.[i]?.querySelector(".fr-hint-text");

        await expect(hint?.textContent?.trim()).toBe(groupedOptionsWithHints[i].hint);
      }
    });
  }}
/>

<Story
  name="Sélection multiple avec groupes"
  args={{
    id: "combobox-multi-grouped",
    multiple: true,
    selectAllButton: true,
    optionGroups: groupedOptionsWithHints,
  }}
/>

<Story
  name="Sans recherche"
  args={{
    id: "combobox-no-search",
    searchable: false,
  }}
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-combobox");
    const shadow = el?.shadowRoot;

    await step("Un clic sur le bouton ouvre le panel", async () => {
      const button = shadow?.querySelector(".fr-combobox__button") as HTMLButtonElement;

      await userEvent.click(button);
    });

    await step("Le champ de recherche n’est pas affiché", async () => {
      const search = shadow?.querySelector(".fr-combobox__search");

      await expect(search).toBeFalsy();
    });
  }}
/>

<Story
  name="Désactivé"
  args={{
    id: "combobox-disabled",
    disabled: true,
  }}
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-combobox");
    const shadow = el?.shadowRoot;

    await step("Le bouton est désactivé", async () => {
      const button = shadow?.querySelector(".fr-combobox__button") as HTMLButtonElement;

      await expect(button?.disabled).toBe(true);
    });
  }}
/>

<Story
  name="Erreur"
  args={{
    id: "combobox-error",
    status: "error",
    errorMessage: "Texte d’erreur obligatoire",
  }}
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-combobox");
    const shadow = el?.shadowRoot;

    await step("Le select-group a la classe de statut correspondante", async () => {
      const selectGroup = shadow?.querySelector(".fr-select-group");

      await expect(selectGroup?.classList.contains("fr-select-group--error")).toBe(true);
    });

    await step("Le message d’erreur est affiché", async () => {
      const message = shadow?.querySelector(".fr-message--error");

      await expect(message).toBeTruthy();
      await expect(message?.textContent?.trim()).toBe(
        (args as unknown as { errorMessage: string }).errorMessage,
      );
    });
  }}
/>

<Story
  name="Succès"
  args={{
    id: "combobox-success",
    status: "valid",
    validMessage: "Texte de validation optionnel",
  }}
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-combobox");
    const shadow = el?.shadowRoot;

    await step("Le select-group a la classe de statut correspondante", async () => {
      const selectGroup = shadow?.querySelector(".fr-select-group");

      await expect(selectGroup?.classList.contains("fr-select-group--valid")).toBe(true);
    });

    await step("Le message de succès est affiché", async () => {
      const message = shadow?.querySelector(".fr-message--valid");

      await expect(message).toBeTruthy();
      await expect(message?.textContent?.trim()).toBe(
        (args as unknown as { validMessage: string }).validMessage,
      );
    });
  }}
/>
