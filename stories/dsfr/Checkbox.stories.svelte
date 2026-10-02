<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect, fn, userEvent } from "storybook/test";
  import { type ComponentProps } from "svelte";

  import {
    checkboxArgTypes,
    checkboxArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/checkbox/template/stories/checkbox-arg-types.js";

  import DsfrCheckbox from "$lib/dsfr/DsfrCheckbox.svelte";
  import "$lib/dsfr/DsfrLink.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Checkbox",
    component: DsfrCheckbox,
    argTypes: {
      ...checkboxArgTypes,
      indeterminate: {
        control: "boolean",
        description: "Attribut indeterminate de la checkbox",
      },
      onvaluechanged: {
        description:
          "Déclenché lors du changement d'état de la case à cocher.<br>" + "`detail: boolean`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<boolean>" },
        },
        control: false,
      },
      slotDefault: {
        name: "default",
        description: "Libellé personnalisé de la case à cocher (remplace la prop `label`)",
        control: false,
        table: { category: "Slots" },
      },
    },
    args: checkboxArgs,
    parameters: {
      actions: { handles: ["valuechanged"] },
      docs: {
        description: {
          component:
            "La case à cocher permet à l’utilisateur de sélectionner une ou plusieurs options dans une liste. Elle est utilisée pour effectuer des sélections multiples (de 0 à N éléments), ou bien pour permettre un choix binaire, lorsque l’utilisateur peut sélectionner ou désélectionner une seule option.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/case-a-cocher)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-checkbox"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrCheckbox>;
</script>

{#snippet template(args: Args)}
  <dsfr-checkbox
    id={args.id}
    label={args.label}
    name={args.name}
    size={args.size}
    hint={args.hint}
    disabled={args.disabled || undefined}
    checked={args.checked || undefined}
    value={args.value}
    status={args.status}
    error-message={args.errorMessage}
    valid-message={args.validMessage}
    form={args.form}
    required={args.required || undefined}
    indeterminate={args.indeterminate || undefined}
  ></dsfr-checkbox>
{/snippet}

<Story
  name="Par défaut"
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-checkbox");
    const shadow = el?.shadowRoot;

    await step("Le label est affiché avec le bon texte", async () => {
      const label = shadow?.querySelector("label.fr-label");

      await expect(label).toBeTruthy();
      await expect(label?.textContent?.trim()).toContain(args.label);
    });

    await step("L'état initial de la checkbox correspond à la prop", async () => {
      const input = shadow?.querySelector("input[type='checkbox']") as HTMLInputElement;

      await expect(input).toBeTruthy();
      await expect(input.checked).toBe(args.checked ?? false);
    });

    await step("Cliquer sur la checkbox bascule l'état", async () => {
      const input = shadow?.querySelector("input[type='checkbox']") as HTMLInputElement;
      const checkedBefore = input.checked;

      await userEvent.click(input);

      await expect(input.checked).toBe(!checkedBefore);
    });

    await step("Cliquer à nouveau rétablit l'état initial", async () => {
      const input = shadow?.querySelector("input[type='checkbox']") as HTMLInputElement;

      await userEvent.click(input);

      await expect(input.checked).toBe(args.checked ?? false);
    });

    await step("L'événement valuechanged est émis avec la bonne valeur", async () => {
      const input = shadow?.querySelector("input[type='checkbox']") as HTMLInputElement;
      const handler = fn();
      el?.addEventListener("valuechanged", handler);

      await userEvent.click(input);

      await expect(handler).toHaveBeenCalledOnce();
      await expect(handler.mock.calls[0][0].detail).toBe(true);

      el?.removeEventListener("valuechanged", handler);
    });
  }}
/>

<Story name="Etat 'indeterminate'" args={{ ...checkboxArgs, indeterminate: true }} />

<Story name="Taille SM" args={{ ...checkboxArgs, size: "sm" }} />

<!-- Dans le cas d'une checkbox qui serait `checked` et `indeterminate`, le style `indeterminate` prend le dessus -->
<Story
  name="Etat 'checked & indeterminate'"
  args={{ ...checkboxArgs, checked: true, indeterminate: true }}
/>
