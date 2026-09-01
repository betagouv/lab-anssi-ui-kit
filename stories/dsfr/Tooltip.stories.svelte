<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import DsfrTooltip from "$lib/dsfr/DsfrTooltip.svelte";

  import DsfrButton from "$lib/dsfr/DsfrButton.svelte";
  import DsfrLink from "$lib/dsfr/DsfrLink.svelte";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Tooltip",
    component: DsfrTooltip,
    argTypes: {
      id: {
        control: "text",
        description: "Identifiant de l'infobulle",
        type: {
          value: "string",
          required: true,
        },
      },
      content: {
        control: "text",
        description: "Contenu texte de l'infobulle",
      },
      type: {
        control: {
          type: "select",
        },
        description:
          "Type de déclenchement<br>Valeurs :<br>- hover : Information contextuelle (survol/focus)<br>- click : Infobulle (clic/focus)",
        options: ["hover", "click"],
      },
      default: {
        description: "Élément déclencheur de l'infobulle (élément focusable)",
        control: false,
        table: { category: "Slots" },
      },
    },
    args: {
      content: "lorem ipsum dolor sit amet consectetur adipiscing elit",
      type: "hover",
      id: "tooltip-1",
    },
    parameters: {
      docs: {
        description: {
          component:
            "[Voir la documentation du composant](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/infobulle)",
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrTooltip>;
</script>

{#snippet template(args: Args)}
  <dsfr-tooltip content={args.content} id={args.id} type={args.type}>
    {#if args.type === "click"}
      <DsfrButton label="infobulle" preset="tooltip" />
    {:else}
      <DsfrButton label="Information contextuelle" />
    {/if}
  </dsfr-tooltip>
{/snippet}

<Story name="Défaut" />

<Story name="Infobulle (clic)" args={{ type: "click", id: "tooltip-click" }}>
  {#snippet template(args: Args)}
    <dsfr-tooltip content={args.content} id={args.id} type="click">
      <DsfrButton label="infobulle" preset="tooltip" />
    </dsfr-tooltip>
  {/snippet}
</Story>

<Story name="Information contextuelle (survol)" args={{ type: "hover", id: "tooltip-hover" }}>
  {#snippet template(args: Args)}
    <dsfr-tooltip content={args.content} id={args.id} type="hover">
      <DsfrLink href="#" label="infobulle au survol" />
    </dsfr-tooltip>
  {/snippet}
</Story>
