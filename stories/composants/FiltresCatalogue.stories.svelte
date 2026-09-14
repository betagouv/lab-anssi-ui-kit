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
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("lab-anssi-filtres");
    await step("Le composant est rendu", async () => {
      const inner = el?.shadowRoot?.querySelector(".lab-anssi-filtres");
      await expect(inner).toBeTruthy();
    });
    await step("Les cinq filtres sont affichés", async () => {
      const elements = el?.shadowRoot?.querySelectorAll(".lab-anssi-filtres__element");
      await expect(elements?.length).toBe(5);
    });
    await step("Les libellés des filtres sont visibles", async () => {
      const labels = el?.shadowRoot?.querySelectorAll(".lab-anssi-filtres__libelle");
      await expect(labels?.[0]?.textContent?.trim()).toBe("Tous les besoins");
      await expect(labels?.[1]?.textContent?.trim()).toBe("Se protéger");
    });
    await step("Le clic sur un filtre déclenche l'événement valeurachangee", async () => {
      const spy = fn();
      el?.addEventListener("valeurachangee", spy);
      const elements = el?.shadowRoot?.querySelectorAll(".lab-anssi-filtres__element");
      await userEvent.click(elements![1]);
      await expect(spy).toHaveBeenCalledOnce();
      el?.removeEventListener("valeurachangee", spy);
    });
  }}
/>

<Story name="Horizontal" args={{ horizontal: true }} />
