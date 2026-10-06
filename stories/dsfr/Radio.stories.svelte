<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect, fn, userEvent } from "storybook/test";
  import { type ComponentProps } from "svelte";

  import {
    radioArgTypes,
    radioArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/radio/template/stories/radio-arg-types.js";

  import DsfrRadio from "$lib/dsfr/DsfrRadio.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Radio",
    component: DsfrRadio,
    argTypes: {
      ...radioArgTypes,
      onvaluechanged: {
        description: "Déclenché lors de la sélection du bouton radio.<br>" + "`detail: string`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<string>" },
        },
        control: false,
      },
    },
    args: { ...radioArgs, value: "radio-1" },
    parameters: {
      actions: { handles: ["valuechanged"] },
      docs: {
        description: {
          component:
            "Le bouton radio permet à l’utilisateur de sélectionner une seule option dans une liste.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/bouton-radio)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-radio"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrRadio>;
</script>

{#snippet template(args: Args)}
  <dsfr-radio
    id={args.id}
    name={args.name}
    label={args.label}
    value={args.value}
    size={args.size}
    hint={args.hint}
    rich={args.rich || undefined}
    has-pictogram={args.hasPictogram || undefined}
    pictogram-name={args.pictogramName}
    pictogram-accent={args.pictogramAccent}
    disabled={args.disabled || undefined}
    form={args.form}
    required={args.required || undefined}
  ></dsfr-radio>
{/snippet}

<Story
  name="Par défaut"
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-radio");
    const shadow = el?.shadowRoot;

    await step("Le label est affiché", async () => {
      const label = shadow?.querySelector("label.fr-label");

      await expect(label?.textContent?.trim()).toBe(args.label);
    });

    await step("Le clic sur le radio le coche et émet l'événement valuechanged", async () => {
      const handler = fn();
      el?.addEventListener("valuechanged", handler);

      const input = shadow?.querySelector('input[type="radio"]') as HTMLInputElement;

      await userEvent.click(input);

      await expect(input.checked).toBe(true);
      await expect(handler).toHaveBeenCalledOnce();
      await expect(handler.mock.calls.at(-1)?.[0].detail).toBe(args.value);

      el?.removeEventListener("valuechanged", handler);
    });
  }}
/>
