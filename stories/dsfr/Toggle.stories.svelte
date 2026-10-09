<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect, fn, userEvent } from "storybook/test";
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
    tags: ["Avec slots"],
    argTypes: {
      ...toggleArgTypes,
      onvaluechanged: {
        description:
          "Déclenché lors du changement d'état de l'interrupteur.<br>" + "`detail: boolean`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<boolean>" },
        },
        control: false,
      },
      slotHint: {
        name: "hint",
        description: "Contenu du texte additionnel (remplace la prop `hint` avec du HTML riche)",
        control: false,
        table: { category: "Slots" },
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
  name="Par défaut"
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-toggle");
    const shadow = el?.shadowRoot;

    await step("Le label est affiché", async () => {
      const label = shadow?.querySelector("label.fr-toggle__label");

      await expect(label?.textContent?.trim()).toBe(args.label);
    });

    await step("Le clic bascule l'état et émet valuechanged", async () => {
      const handler = fn();
      el?.addEventListener("valuechanged", handler);

      const input = shadow?.querySelector("input.fr-toggle__input") as HTMLInputElement;

      await expect(input.checked).toBe(false);

      await userEvent.click(input);

      await expect(input.checked).toBe(true);
      await expect(handler).toHaveBeenCalledOnce();
      await expect(handler.mock.calls.at(-1)?.[0].detail).toBe(true);

      el?.removeEventListener("valuechanged", handler);
    });
  }}
/>

<Story
  name="Description"
  args={{ hint: "Texte additionnel de l'interrupteur" }}
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-toggle");
    const shadow = el?.shadowRoot;

    await step("Le texte additionnel est affiché", async () => {
      const hint = shadow?.querySelector(".fr-hint-text");

      await expect(hint?.textContent?.trim()).toBe((args as unknown as { hint: string }).hint);
    });
  }}
/>

<Story name="État" args={{ state: true }} />

<Story
  name="Erreur"
  args={{ status: "error" }}
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-toggle");
    const shadow = el?.shadowRoot;

    await step("La classe de statut erreur est appliquée", async () => {
      const toggle = shadow?.querySelector(".fr-toggle");

      await expect(toggle?.classList.contains("fr-toggle--error")).toBe(true);
    });
  }}
/>

<Story name="Valide" args={{ status: "valid" }} />

<Story
  name="Désactivé"
  args={{ disabled: true }}
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-toggle");
    const shadow = el?.shadowRoot;

    await step("L'interrupteur est désactivé", async () => {
      const input = shadow?.querySelector("input.fr-toggle__input") as HTMLInputElement;

      await expect(input?.disabled).toBe(true);
    });
  }}
/>
