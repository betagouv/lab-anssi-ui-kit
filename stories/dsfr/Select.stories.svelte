<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect, fn, userEvent } from "storybook/test";
  import { type ComponentProps } from "svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  import {
    selectArgTypes,
    selectArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/select/template/stories/select-arg-types.js";

  import DsfrSelect from "$lib/dsfr/DsfrSelect.svelte";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Select",
    component: DsfrSelect,
    argTypes: {
      ...selectArgTypes,
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
          "Déclenché lors du changement de valeur de la liste déroulante.<br>" + "`detail: string`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<string>" },
        },
        control: false,
      },
      slotDefault: {
        name: "default",
        description:
          "Options `<option>` personnalisées (remplace les options générées par la prop `options`)",
        control: false,
        table: { category: "Slots" },
      },
    },
    args: selectArgs,
    parameters: {
      actions: { handles: ["valuechanged"] },
      docs: {
        description: {
          component:
            "La liste déroulante permet à un utilisateur de choisir un élément dans une liste donnée.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/liste-deroulante)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-select"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrSelect>;
</script>

{#snippet template(args: Args)}
  <dsfr-select
    id={args.id}
    label={args.label}
    value={args.value}
    grouped-options={args.groupedOptions || undefined}
    options={args.options}
    option-groups={args.optionGroups}
    hint={args.hint}
    placeholder={args.placeholder}
    placeholder-disabled={args.placeholderDisabled || undefined}
    disabled={args.disabled || undefined}
    status={args.status}
    error-message={args.errorMessage}
    valid-message={args.validMessage}
    info-message={args.infoMessage}
    form={args.form}
    required={args.required || undefined}
    label-size={args.labelSize}
    label-weight={args.labelWeight}
    hide-label={args.hideLabel || undefined}
  ></dsfr-select>
{/snippet}

<Story
  name="Par défaut"
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-select");
    const shadow = el?.shadowRoot;
    const optionsData =
      (args as unknown as { options: { value: string; label: string }[] }).options ?? [];

    await step("Le label est affiché", async () => {
      const label = shadow?.querySelector("label.fr-label");

      await expect(label?.textContent).toContain(args.label);
    });

    await step("Les options correspondent aux données", async () => {
      const select = shadow?.querySelector("select.fr-select");
      const options = select?.querySelectorAll('option:not([value=""])');

      await expect(options?.length).toBe(optionsData.length);
    });

    await step("La sélection d'une option émet l'événement valuechanged", async () => {
      const handler = fn();
      el?.addEventListener("valuechanged", handler);

      const select = shadow?.querySelector("select.fr-select") as HTMLSelectElement;
      const targetValue = optionsData[1]?.value;

      await userEvent.selectOptions(select, targetValue);

      await expect(select.value).toBe(targetValue);
      await expect(handler).toHaveBeenCalledOnce();
      await expect(handler.mock.calls.at(-1)?.[0].detail).toBe(targetValue);

      el?.removeEventListener("valuechanged", handler);
    });
  }}
/>

<Story
  name="Texte d'aide"
  args={{ hint: "Texte de description additionnel" }}
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-select");
    const shadow = el?.shadowRoot;

    await step("Le texte d'aide est affiché", async () => {
      const hint = shadow?.querySelector(".fr-hint-text");

      await expect(hint?.textContent?.trim()).toBe((args as unknown as { hint: string }).hint);
    });
  }}
/>
