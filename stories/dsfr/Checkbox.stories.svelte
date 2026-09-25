<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect, userEvent } from "storybook/test";
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
      default: {
        description: "Libellé personnalisé de la case à cocher (remplace la prop `label`)",
        control: false,
        table: { category: "Slots" },
      },
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
  name="Défaut"
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-checkbox");
    const shadow = el?.shadowRoot;

    await step("La checkbox est rendue", async () => {
      const group = shadow?.querySelector(".fr-checkbox-group");
      await expect(group).toBeTruthy();

      const input = shadow?.querySelector("input[type='checkbox']") as HTMLInputElement;
      await expect(input).toBeTruthy();
    });

    await step("Le label est affiché", async () => {
      const label = shadow?.querySelector("label.fr-label");
      await expect(label).toBeTruthy();
    });

    await step("La checkbox n'est pas cochée par défaut", async () => {
      const input = shadow?.querySelector("input[type='checkbox']") as HTMLInputElement;
      await expect(input.checked).toBe(false);
    });

    await step("Cliquer sur la checkbox la coche", async () => {
      const input = shadow?.querySelector("input[type='checkbox']") as HTMLInputElement;
      await userEvent.click(input);
      await expect(input.checked).toBe(true);
    });

    await step("Cliquer à nouveau décoche la checkbox", async () => {
      const input = shadow?.querySelector("input[type='checkbox']") as HTMLInputElement;
      await userEvent.click(input);
      await expect(input.checked).toBe(false);
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
