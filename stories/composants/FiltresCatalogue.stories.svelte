<script module lang="ts">
  import { expect, fn, userEvent } from "storybook/test";
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import FiltresCatalogue from "$lib/composants/FiltresCatalogue.svelte";

  import Success from "@gouvfr/dsfr/dist/artwork/pictograms/system/success.svg?raw";

  const { Story } = defineMeta({
    title: "Composants/Lab ANSSI/Filtres catalogue",
    component: FiltresCatalogue,
    args: {
      filtres: [
        { libelle: "Tous les besoins", valeur: "category1", icone: Success },
        { libelle: "Se protéger", valeur: "category2", icone: Success },
        { libelle: "Découvrir la cybersécurité", valeur: "category3", icone: Success },
        { libelle: "Découvrir les métiers", valeur: "category4", icone: Success },
        { libelle: "Explorer les formations", valeur: "category5", icone: Success },
      ],
    },
    argTypes: {
      onvaleurachangee: {
        description: "Déclenché lors du changement de filtre sélectionné.<br>" + "`detail: string`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<string>" },
        },
        control: false,
      },
    },
    parameters: {
      actions: { handles: ["valeurachangee"] },
    },
    render: template,
  });

  type Args = ComponentProps<FiltresCatalogue>;
</script>

{#snippet template(args: Args)}
  <lab-anssi-filtres
    filtres={args.filtres}
    horizontal={args.horizontal || undefined}
    valeur={args.valeur}
  ></lab-anssi-filtres>
{/snippet}

<Story
  name="Defaut"
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("lab-anssi-filtres");

    await step("Le composant est rendu", async () => {
      await expect(el?.shadowRoot).toBeTruthy();
    });

    await step("Les filtres sont affichés avec leurs libellés", async () => {
      const labels = el?.shadowRoot?.querySelectorAll("label");
      await expect(labels?.length).toBe(args.filtres.length);
      for (let i = 0; i < args.filtres.length; i++) {
        await expect(labels?.[i]?.textContent).toContain(args.filtres[i].libelle);
      }
    });

    await step("Le clic sur un filtre déclenche l'événement valeurachangee", async () => {
      const spy = fn();
      el?.addEventListener("valeurachangee", spy);
      const labels = el?.shadowRoot?.querySelectorAll("label");
      await userEvent.click(labels![1]);
      await expect(spy).toHaveBeenCalledOnce();
      el?.removeEventListener("valeurachangee", spy);
    });
  }}
/>

<Story name="Horizontal" args={{ horizontal: true }} />
