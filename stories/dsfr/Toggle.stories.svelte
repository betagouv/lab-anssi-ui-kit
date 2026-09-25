<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect, userEvent } from "storybook/test";
  import { type ComponentProps } from "svelte";

  import {
    toggleArgTypes,
    toggleArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/toggle/template/stories/toggle-arg-types.js";

  import DsfrToggle from "$lib/dsfr/DsfrToggle.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Toggle",
    component: DsfrToggle,
    argTypes: {
      ...toggleArgTypes,
      hint: {
        description: "Contenu du texte additionnel (remplace la prop `hint` avec du HTML riche)",
        control: false,
        table: { category: "Slots" },
      },
      onvaluechanged: {
        description:
          "Déclenché lors du changement d'état de l'interrupteur.<br>" + "`detail: boolean`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<boolean>" },
        },
        control: false,
      },
    },
    args: toggleArgs,
    parameters: {
      actions: { handles: ["valuechanged"] },
      docs: {
        description: {
          component:
            "Le composant “Interrupteur” permet à l’utilisateur de faire un choix entre deux états opposés (activé / désactivé).<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/interrupteur)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-toggle"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrToggle>;
</script>

{#snippet template(args: Args)}
  <dsfr-toggle
    id={args.id}
    label={args.label}
    hint={args.hint}
    hint-id={args.hintId}
    disabled={args.disabled || undefined}
    checked={args.checked || undefined}
    border={args.border || undefined}
    left={args.left || undefined}
    state={args.state || undefined}
    status={args.status}
    error-message={args.errorMessage}
    valid-message={args.validMessage}
    form={args.form}
    required={args.required || undefined}
    hide-label={args.hideLabel || undefined}
  ></dsfr-toggle>
{/snippet}

<Story
  name="Défaut"
  play={async ({ canvasElement, step }) => {
    const dsfrToggle = canvasElement.querySelector("dsfr-toggle");

    await step("Le composant est rendu avec le toggle et le label", async () => {
      const toggle = dsfrToggle?.shadowRoot?.querySelector(".fr-toggle");
      await expect(toggle).toBeTruthy();

      const input = dsfrToggle?.shadowRoot?.querySelector("input.fr-toggle__input");
      await expect(input).toBeTruthy();
      await expect((input as HTMLInputElement)?.type).toBe("checkbox");

      const label = dsfrToggle?.shadowRoot?.querySelector("label.fr-toggle__label");
      await expect(label).toBeTruthy();
    });

    await step("Le clic bascule l'état de l'interrupteur", async () => {
      const input = dsfrToggle?.shadowRoot?.querySelector(
        "input.fr-toggle__input",
      ) as HTMLInputElement;
      await expect(input.checked).toBe(false);
      await userEvent.click(input);
      await expect(input.checked).toBe(true);
    });
  }}
/>

<Story name="Description" args={{ hint: "Texte additionnel de l'interrupteur" }} />

<Story name="État" args={{ state: true }} />

<Story name="Erreur" args={{ status: "error" }} />

<Story name="Valide" args={{ status: "valid" }} />

<Story
  name="Désactivé"
  args={{ disabled: true }}
  play={async ({ canvasElement }) => {
    const dsfrToggle = canvasElement.querySelector("dsfr-toggle");
    const input = dsfrToggle?.shadowRoot?.querySelector(
      "input.fr-toggle__input",
    ) as HTMLInputElement;
    await expect(input?.disabled).toBe(true);
  }}
/>
