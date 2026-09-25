<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect } from "storybook/test";
  import { type ComponentProps } from "svelte";

  import {
    linkArgTypes,
    linkArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/link/template/stories/link-arg-types.js";

  import DsfrLink from "$lib/dsfr/DsfrLink.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Link",
    component: DsfrLink,
    argTypes: {
      ...linkArgTypes,
      neutral: {
        control: "boolean",
        description: "Affiche le lien dans une teinte neutre",
        type: {
          value: "boolean",
        },
      },
    },
    args: linkArgs,
    parameters: {
      docs: {
        description: {
          component:
            "Le lien permet la navigation entre une page et un autre contenu au sein de la même page, du même site ou externe. Pour les actions d’un autre type - comme la soumission d’un formulaire - il faut utiliser le composant bouton.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/lien)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-link"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrLink>;
</script>

{#snippet template(args: Args)}
  <dsfr-link
    label={args.label}
    size={args.size}
    id={args.id}
    disabled={args.disabled || undefined}
    blank={args.blank || undefined}
    title={args.title}
    href={args.href}
    download={args.download || undefined}
    detail={args.detail}
    hreflang={args.hreflang}
    assess={args.assess || undefined}
    has-icon={args.hasIcon || undefined}
    icon={args.icon}
    icon-place={args.iconPlace}
    neutral={args.neutral || undefined}
  ></dsfr-link>
{/snippet}

<Story
  name="Défaut"
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-link");

    await step("Le lien est rendu", async () => {
      const link = el?.shadowRoot?.querySelector("a.fr-link");
      await expect(link).toBeTruthy();
      await expect(link?.classList.contains("fr-link--md")).toBe(true);
    });

    await step("Le texte du lien est affiché", async () => {
      const link = el?.shadowRoot?.querySelector("a.fr-link");
      await expect(link?.textContent?.trim()).toBe("libellé du lien");
    });

    await step("Le lien pointe vers la bonne URL", async () => {
      const link = el?.shadowRoot?.querySelector("a.fr-link");
      await expect(link?.getAttribute("href")).toBe("#");
    });
  }}
/>

<Story name="Lien texte (neutre)">
  {#snippet template(_args: Args)}
    <p>
      Lorem [...] elit, <dsfr-link label="lien interne" href="#" neutral></dsfr-link> incididunt [...]
      morbi.
    </p>
  {/snippet}
</Story>

<Story name="Icône">
  {#snippet template(_args: Args)}
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <dsfr-link
        label={linkArgs.label}
        href={linkArgs.href}
        has-icon
        icon="arrow-left-line"
        icon-place="left"
      ></dsfr-link>
      <dsfr-link
        label={linkArgs.label}
        href={linkArgs.href}
        has-icon
        icon="arrow-right-line"
        icon-place="right"
      ></dsfr-link>
    </div>
  {/snippet}
</Story>

<Story name="Tailles">
  {#snippet template(_args: Args)}
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
      <dsfr-link label={linkArgs.label} href={linkArgs.href} size="sm"></dsfr-link>
      <dsfr-link label={linkArgs.label} href={linkArgs.href} size="md"></dsfr-link>
      <dsfr-link label={linkArgs.label} href={linkArgs.href} size="lg"></dsfr-link>
    </div>
  {/snippet}
</Story>

<Story
  name="Désactivé"
  args={{ ...linkArgs, disabled: true }}
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-link");

    await step("Le lien est désactivé", async () => {
      const link = el?.shadowRoot?.querySelector("a.fr-link");
      await expect(link?.getAttribute("aria-disabled")).toBe("true");
      await expect(link?.hasAttribute("href")).toBe(false);
    });
  }}
/>

<Story
  name="Téléchargement"
  args={{
    ...linkArgs,
    label: "Télécharger le document lorem ipsum sit dolores amet",
    href: "img/image.jpg",
    download: true,
    detail: "JPG – 61,88 ko",
  }}
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-link");

    await step("Le lien est en mode téléchargement", async () => {
      const link = el?.shadowRoot?.querySelector("a.fr-link");
      await expect(link?.classList.contains("fr-link--download")).toBe(true);
    });

    await step("Le détail du fichier est affiché", async () => {
      const detail = el?.shadowRoot?.querySelector(".fr-link__detail");
      await expect(detail).toBeTruthy();
      await expect(detail?.textContent).toContain("JPG");
    });
  }}
/>

<Story
  name="Externe"
  args={{ ...linkArgs, blank: true }}
  play={async ({ canvasElement }) => {
    const el = canvasElement.querySelector("dsfr-link");
    const link = el?.shadowRoot?.querySelector("a.fr-link");
    await expect(link?.getAttribute("target")).toBe("_blank");
    await expect(link?.getAttribute("rel")).toBe("noopener external");
  }}
/>

<Story
  name="Retour en haut"
  args={{
    ...linkArgs,
    label: "Haut de page",
    href: "#top",
    hasIcon: true,
    icon: "arrow-up-fill",
    iconPlace: "left",
  }}
/>
