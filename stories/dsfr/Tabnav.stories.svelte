<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import DsfrTabnav from "$lib/dsfr/DsfrTabnav.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const defaultLinks = [
    { label: "Présentation", href: "#presentation", current: true },
    { label: "Design", href: "#design" },
    { label: "Code", href: "#code" },
    { label: "Accessibilité", href: "#accessibilite" },
  ];

  const { Story } = defineMeta({
    title: "Composants/dsfr/Tabnav",
    component: DsfrTabnav,
    args: {
      links: defaultLinks,
      ariaLabel: "Navigation tertiaire",
    },
    argTypes: {
      links: {
        description:
          "Liste des liens de navigation. Chaque lien possède un `label`, un `href` et optionnellement `current: true` pour indiquer la page active.",
        control: { type: "object" },
        table: {
          type: {
            summary: "Array<{ label: string; href: string; current?: boolean }>",
          },
        },
      },
      ariaLabel: {
        description: "Valeur de l'attribut `aria-label` sur l'élément `<nav>`.",
        control: { type: "text" },
        table: { type: { summary: "string" } },
      },
      centered: {
        description:
          "Si `true`, la barre de navigation se réduit à la taille de son contenu et est centrée dans son conteneur.",
        control: { type: "boolean" },
        table: { type: { summary: "boolean" } },
      },
      routerMode: {
        description:
          "Si `true`, le clic sur un lien n'entraîne pas de navigation native. " +
          "L'événement `linkclicked` est émis dans tous les cas.",
        control: { type: "boolean" },
        table: { type: { summary: "boolean" } },
      },
      activeIndex: {
        description:
          "Index du lien actif. Prend le dessus sur `links[i].current` si fourni. " +
          "Permet un contrôle externe sans reconstruire le tableau `links`.",
        control: { type: "number" },
        table: { type: { summary: "number" } },
      },
      onlinkclicked: {
        description:
          "Déclenché au clic sur un lien de navigation.<br>" +
          "`detail: { index: number, link: { label, href, current? } }`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<{ index: number, link: TabnavLink }>" },
        },
        control: false,
      },
    },
    parameters: {
      actions: { handles: ["linkclicked"] },
      docs: {
        source: {
          transform: webComponentSourceCode("dsfr-tabnav"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrTabnav>;
</script>

{#snippet template(args: Args)}
  <dsfr-tabnav
    links={args.links}
    aria-label={args.ariaLabel}
    centered={args.centered || undefined}
    router-mode={args.routerMode || undefined}
    active-index={args.activeIndex}
  ></dsfr-tabnav>
{/snippet}

<Story name="Défaut" />

<Story
  name="Deuxième lien actif"
  args={{
    links: [
      { label: "Présentation", href: "#presentation" },
      { label: "Design", href: "#design", current: true },
      { label: "Code", href: "#code" },
      { label: "Accessibilité", href: "#accessibilite" },
    ],
  }}
/>

<Story
  name="Centré"
  args={{
    centered: true,
  }}
/>

<Story
  name="Nombreux liens"
  args={{
    links: [
      { label: "Vue d'ensemble", href: "#overview", current: true },
      { label: "Démarrage rapide", href: "#quickstart" },
      { label: "Configuration", href: "#configuration" },
      { label: "Composants", href: "#composants" },
      { label: "Accessibilité", href: "#accessibilite" },
      { label: "Changelog", href: "#changelog" },
    ],
  }}
/>

<Story name="Contrôle externe" args={{ activeIndex: 2 }} />

<Story name="Mode routeur" args={{ routerMode: true }}>
  {#snippet template(args: Args)}
    <dsfr-tabnav
      links={args.links}
      aria-label={args.ariaLabel}
      router-mode
      onlinkclicked={(e) => {
        args.links.forEach((l) => (l.current = false));
        args.links[e.detail.index].current = true;
      }}
    ></dsfr-tabnav>

    <p style="margin-top: 1rem; font-style: italic; color: var(--text-mention-grey);">
      Navigation simulée — aucun rechargement de page. Page active : <strong>
        {args.links.find((l) => l.current)?.label} - {args.links.find((l) => l.current)?.href}
      </strong>
    </p>
  {/snippet}
</Story>
