<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect, fn, userEvent } from "storybook/test";
  import { type ComponentProps } from "svelte";

  import {
    radiosGroupArgTypes,
    radiosGroupArgs,
    getRadiosGroupData,
  } from "@gouvfr/dsfr/src/dsfr/component/radio/template/stories/radios-group-arg-types.js";

  import DsfrRadiosGroup from "$lib/dsfr/DsfrRadiosGroup.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  delete radiosGroupArgs.elements;

  const { Story } = defineMeta({
    title: "Composants/DSFR/Radios Group",
    component: DsfrRadiosGroup,
    argTypes: {
      ...radiosGroupArgTypes,
      legendSize: {
        control: "select",
        options: [undefined, "xs", "sm", "md", "lg", "xl", "lead"],
        description:
          "Applique une classe utilitaire de taille de texte DSFR (fr-text--xs à fr-text--xl, fr-text--lead) sur la légende",
      },
      legendWeight: {
        control: "select",
        options: [undefined, "light", "regular", "bold", "heavy"],
        description:
          "Applique une classe utilitaire de graisse DSFR (fr-text--light à fr-text--heavy) sur la légende",
      },
      onvaluechanged: {
        description:
          "Déclenché lors du changement de la valeur sélectionnée.<br>" + "`detail: string`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<string>" },
        },
        control: false,
      },
    },
    args: {
      radios: getRadiosGroupData().map((r, i) => ({ ...r, value: `radio-${i + 1}` })),
      ...radiosGroupArgs,
    },
    parameters: {
      actions: { handles: ["valuechanged"] },
      docs: {
        description: {
          component:
            "Les boutons radio permettent à l’utilisateur de sélectionner une seule option dans une liste.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/bouton-radio)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-radios-group"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrRadiosGroup>;
</script>

{#snippet template(args: Args)}
  <dsfr-radios-group
    id={args.id}
    legend={args.legend}
    radios={args.radios}
    hint={args.hint}
    size={args.size}
    rich={args.rich || undefined}
    has-pictogram={args.hasPictogram || undefined}
    inline={args.inline || undefined}
    name={args.name}
    disabled={args.disabled || undefined}
    value={args.value || ""}
    status={args.status}
    error-message={args.errorMessage}
    valid-message={args.validMessage}
    legend-size={args.legendSize}
    legend-weight={args.legendWeight}
  ></dsfr-radios-group>
{/snippet}

<Story
  name="Par défaut"
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-radios-group");
    const shadow = el?.shadowRoot;
    const radiosData = (args as unknown as { radios: { value?: string }[] }).radios ?? [];

    await step("La légende est affichée", async () => {
      const legend = shadow?.querySelector("legend");

      await expect(legend?.textContent).toContain(args.legend);
    });

    await step("Les boutons radio sont rendus", async () => {
      const radios = shadow?.querySelectorAll('input[type="radio"]');

      await expect(radios?.length).toBe(radiosData.length);
    });

    await step("Un clic sur un radio le sélectionne et émet l'événement valuechanged", async () => {
      const handler = fn();
      el?.addEventListener("valuechanged", handler);

      const radios = shadow?.querySelectorAll('input[type="radio"]');
      const secondRadio = radios?.[1] as HTMLInputElement;

      await userEvent.click(secondRadio);

      await expect(secondRadio.checked).toBe(true);
      await expect(handler).toHaveBeenCalledOnce();
      await expect(handler.mock.calls.at(-1)?.[0].detail).toBe(radiosData[1]?.value);

      el?.removeEventListener("valuechanged", handler);
    });
  }}
/>

<Story
  name="Texte d'aide de la légende"
  args={{ hint: "Texte de description additionnel" }}
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-radios-group");
    const shadow = el?.shadowRoot;

    await step("Le texte d'aide de la légende est affiché", async () => {
      const hint = shadow?.querySelector("legend .fr-hint-text");

      await expect(hint?.textContent?.trim()).toBe(args.hint);
    });
  }}
/>

<Story
  name="Texte d'aide des radios"
  args={{ radios: getRadiosGroupData(3, true) }}
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-radios-group");
    const shadow = el?.shadowRoot;
    const radiosData = (args as unknown as { radios: { hint?: string }[] }).radios ?? [];

    await step("Chaque radio affiche son texte d'aide", async () => {
      const hints = shadow?.querySelectorAll(".fr-radio-group .fr-hint-text");

      await expect(hints?.length).toBe(radiosData.length);

      hints?.forEach((hint, i) => {
        expect(hint?.textContent?.trim()).toBe(radiosData[i]?.hint);
      });
    });
  }}
/>

<Story
  name="Désactivé"
  args={{ disabled: true }}
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-radios-group");
    const shadow = el?.shadowRoot;

    await step("Le fieldset est désactivé", async () => {
      const fieldset = shadow?.querySelector("fieldset") as HTMLFieldSetElement;

      await expect(fieldset?.disabled).toBe(true);
    });
  }}
/>

<Story name="Valide" args={{ status: "valid" }} />

<Story
  name="Erreur"
  args={{ status: "error" }}
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-radios-group");
    const shadow = el?.shadowRoot;
    const { status, errorMessage: errorText } = args as unknown as {
      status: string;
      errorMessage: string;
    };

    await step("Le fieldset a le statut correspondant", async () => {
      const fieldset = shadow?.querySelector("fieldset.fr-fieldset");

      await expect(fieldset?.classList.contains(`fr-fieldset--${status}`)).toBe(true);
    });

    await step("Le message d'erreur est affiché", async () => {
      const message = shadow?.querySelector(".fr-message--error");

      await expect(message?.textContent?.trim()).toBe(errorText);
    });
  }}
/>

<Story name="Taille MD" args={{ size: "md" }} />

<Story name="Taille SM" args={{ size: "sm" }} />

<Story name="En ligne" args={{ inline: true }} />

<!--
<Story name="Riche" args={{ rich: true }} />

<Story name="Riche avec indice" args={{ rich: true, hint: "Texte de description additionnel" }} />

<Story name="Riche en ligne" args={{ rich: true, inline: true }} />

<Story
  name="Riche en ligne avec indice"
  args={{ rich: true, inline: true, hint: "Texte de description additionnel" }}
/>

<Story name="Riche sans image" args={{ rich: true, hasPictogram: false }} />

<Story name="Riche sans image en ligne" args={{ rich: true, hasPictogram: false, inline: true }} />
-->
