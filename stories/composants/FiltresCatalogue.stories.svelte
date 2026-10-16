<script module lang="ts">
  import { expect, fn, userEvent } from "storybook/test";
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import FiltresCatalogue from "$lib/composants/FiltresCatalogue.svelte";

  import Success from "@gouvfr/dsfr/dist/artwork/pictograms/system/success.svg?raw";

  const elementsParDefautAvecDescription = [
    {
      libelle: "Libellé",
      valeur: "category1",
      icone: Success,
      description: "Lorem ipsum dolor sit amet.",
    },
    {
      libelle: "Libellé",
      valeur: "category2",
      icone: Success,
      description: "Lorem ipsum dolor sit amet.",
    },
    {
      libelle: "Libellé",
      valeur: "category3",
      icone: Success,
      description: "Lorem ipsum dolor sit amet.",
    },
    {
      libelle: "Libellé",
      valeur: "category4",
      icone: Success,
      description: "Lorem ipsum dolor sit amet.",
    },
    {
      libelle: "Libellé",
      valeur: "category5",
      icone: Success,
      description: "Lorem ipsum dolor sit amet.",
    },
  ];

  const elementsParDefautSansDescription = elementsParDefautAvecDescription.map(
    ({ description: _description, ...rest }) => rest,
  );

  const elementsLiens = elementsParDefautSansDescription.map((element) => ({
    ...element,
    href: `#${element.valeur}`,
  }));

  const { Story } = defineMeta({
    title: "Composants/Lab ANSSI/Filtres catalogue",
    component: FiltresCatalogue,
    args: {
      elements: elementsParDefautSansDescription,
    },
    argTypes: {
      onvaleurachangee: {
        description: "Déclenché lors du changement d'élément actif.<br>" + "`detail: string`",
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
    elements={args.elements}
    horizontal={args.horizontal || undefined}
    element-actif={args.elementActif}
    type={args.type}
  ></lab-anssi-filtres>
{/snippet}

<Story
  name="Par défaut (type 'Filtres')"
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("lab-anssi-filtres");
    const elements = args.elements ?? [];

    await step("Le composant est rendu", async () => {
      await expect(el?.shadowRoot).toBeTruthy();
    });

    await step("Les filtres sont affichés avec leurs libellés", async () => {
      const labels = el?.shadowRoot?.querySelectorAll("label");

      await expect(labels?.length).toBe(elements.length);

      for (let i = 0; i < elements.length; i++) {
        await expect(labels?.[i]?.textContent).toContain(elements[i].libelle);
      }
    });

    const valeurAttendue = elements[1].valeur;

    await step("Le clic sur un filtre déclenche l'événement valeurachangee", async () => {
      const spy = fn();

      el?.addEventListener("valeurachangee", spy);

      const labels = el?.shadowRoot?.querySelectorAll("label");

      await userEvent.click(labels![1]);
      await expect(spy).toHaveBeenCalledOnce();

      const event = spy.mock.calls[0][0] as CustomEvent;
      await expect(event.detail).toBe(valeurAttendue);

      el?.removeEventListener("valeurachangee", spy);
    });

    await step("Le filtre cliqué est sélectionné", async () => {
      const inputs = el?.shadowRoot?.querySelectorAll<HTMLInputElement>("input[type='radio']");

      await expect(inputs?.[1]?.checked).toBe(true);
    });
  }}
/>

<Story name="Avec Description" args={{ elements: elementsParDefautAvecDescription }} />

<Story name="Horizontal" args={{ horizontal: true }} />

<Story
  name="Liens"
  args={{ type: "liens", elements: elementsLiens, elementActif: "category1" }}
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("lab-anssi-filtres");
    const elements = args.elements ?? [];

    await step("Le composant est rendu", async () => {
      await expect(el?.shadowRoot).toBeTruthy();
    });

    await step("Les éléments sont affichés comme des liens", async () => {
      const liens = el?.shadowRoot?.querySelectorAll(".lab-anssi-filtres__lien");

      await expect(liens?.length).toBe(elements.length);

      for (let i = 0; i < elements.length; i++) {
        await expect(liens?.[i]?.textContent).toContain(elements[i].libelle);
      }
    });

    await step("Aucun input radio n'est présent", async () => {
      const inputs = el?.shadowRoot?.querySelectorAll("input[type='radio']");

      await expect(inputs?.length).toBe(0);
    });

    await step("Le lien actif a l'attribut aria-current", async () => {
      const lienActif = el?.shadowRoot?.querySelector(
        ".lab-anssi-filtres__lien[aria-current='page']",
      );

      await expect(lienActif).toBeTruthy();
      await expect(lienActif?.textContent).toContain(elements[0].libelle);
    });

    await step("L'élément actif a la classe 'actif'", async () => {
      const elementActif = el?.shadowRoot?.querySelector(".lab-anssi-filtres__element.actif");

      await expect(elementActif).toBeTruthy();
    });
  }}
/>
