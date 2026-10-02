<script module lang="ts">
  import { expect, fn, userEvent } from "storybook/test";
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
  name="Par défaut"
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("lab-anssi-multi-select");
    const opts = args.options ?? [];
    const vals = args.values ?? [];

    await step("Le composant est rendu", async () => {
      await expect(el?.shadowRoot).toBeTruthy();
    });

    await step("Le label est affiché", async () => {
      const label = el?.shadowRoot?.querySelector(".fr-select-group > .fr-label");

      await expect(label?.textContent).toContain(args.label);
    });

    await step("Le hint est affiché", async () => {
      const hint = el?.shadowRoot?.querySelector(".fr-hint-text");

      await expect(hint?.textContent?.trim()).toBe(args.hint);
    });

    await step("Le résumé indique la sélection", async () => {
      const summary = el?.shadowRoot?.querySelector("summary");

      await expect(summary?.textContent?.trim()).toContain(
        vals.length === 1 ? "1 option sélectionnée" : `${vals.length} options sélectionnées`,
      );
    });

    await step("L'option pré-sélectionnée est cochée", async () => {
      const checkboxes =
        el?.shadowRoot?.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');

      for (let i = 0; i < opts.length; i++) {
        if (vals.includes(opts[i].value)) {
          await expect(checkboxes?.[i]?.checked).toBe(true);
        } else {
          await expect(checkboxes?.[i]?.checked).toBe(false);
        }
      }
    });

    await step("Le dropdown s'ouvre au clic sur le résumé", async () => {
      const details = el?.shadowRoot?.querySelector("details");
      const summary = el?.shadowRoot?.querySelector("summary");

      await userEvent.click(summary!);

      await expect(details?.open).toBe(true);
    });

    await step("Le clic sur une checkbox émet l'événement valueschanged", async () => {
      const summary = el?.shadowRoot?.querySelector("summary");

      await userEvent.click(summary!);

      const spy = fn();
      el?.addEventListener("valueschanged", spy);

      const checkboxes =
        el?.shadowRoot?.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');

      await userEvent.click(checkboxes![0]);

      await expect(spy).toHaveBeenCalledOnce();

      el?.removeEventListener("valueschanged", spy);
    });

    await step("Le dropdown se ferme à l'appui sur Échap", async () => {
      const details = el?.shadowRoot?.querySelector("details");

      await userEvent.keyboard("{Escape}");

      await expect(details?.open).toBe(false);
    });
  }}
/>

<Story name="Désactivé" args={{ disabled: true }} />
