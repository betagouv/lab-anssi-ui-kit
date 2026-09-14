<script module lang="ts">
  import { expect } from "storybook/test";
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import MultiSelect from "$lib/composants/MultiSelect.svelte";

  const { Story } = defineMeta({
    title: "Composants/Lab ANSSI/MultiSelect",
    component: MultiSelect,
    args: {
      id: "multi-select-1",
      label: "Label du multi-select",
      hint: "Hint du multi-select",
      placeholder: "Sélectionnez une valeur",
      options: [
        { id: "option1", value: "option1", label: "Option 1" },
        { id: "option2", value: "option2", label: "Option 2" },
        { id: "option3", value: "option3", label: "Option 3" },
      ],
      values: ["option2"],
      disabled: false,
      required: false,
      errorMessage: "",
    },
    argTypes: {
      values: {
        control: { type: "array" },
      },
      onvaluechanged: {
        description:
          "Déclenché lors du changement de la dernière valeur sélectionnée ou désélectionnée.<br>" +
          "`detail: string[]`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<string[]>" },
        },
        control: false,
      },
      onvalueschanged: {
        description:
          "Déclenché lors du changement de l'ensemble des valeurs sélectionnées.<br>" +
          "`detail: string[]`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<string[]>" },
        },
        control: false,
      },
    },
    parameters: {
      actions: { handles: ["valuechanged", "valueschanged"] },
    },
    render: template,
  });

  type Args = ComponentProps<MultiSelect>;
</script>

{#snippet template(args: Args)}
  <lab-anssi-multi-select
    id={args.id}
    label={args.label}
    options={args.options}
    hint={args.hint}
    placeholder={args.placeholder}
    disabled={args.disabled || undefined}
    values={args.values}
    status={args.status}
    error-message={args.errorMessage}
    valid-message={args.validMessage}
  ></lab-anssi-multi-select>
{/snippet}

<Story
  name="Defaut"
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("lab-anssi-multi-select");
    await step("Le composant est rendu", async () => {
      await expect(el?.shadowRoot).toBeTruthy();
    });
    await step("Le label est affiché", async () => {
      await expect(el?.shadowRoot?.textContent).toContain("Label du multi-select");
    });
    await step("Le hint est affiché", async () => {
      await expect(el?.shadowRoot?.textContent).toContain("Hint du multi-select");
    });
    await step("Le résumé indique la sélection", async () => {
      const summary = el?.shadowRoot?.querySelector("summary");
      await expect(summary?.textContent?.trim()).toContain("1 option sélectionnée");
    });
    await step("Les options sont rendues sous forme de checkboxes", async () => {
      const checkboxes = el?.shadowRoot?.querySelectorAll('input[type="checkbox"]');
      await expect(checkboxes?.length).toBe(3);
    });
  }}
/>

<Story name="Désactivé" args={{ disabled: true }} />
