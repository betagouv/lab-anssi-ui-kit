<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import DsfrTooltip from "$lib/dsfr/DsfrTooltip.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

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
      triggerLabel: {
        control: "text",
        description:
          "Libellé accessible du bouton déclencheur (type 'click' uniquement)",
      },
      default: {
        description:
          "Élément déclencheur personnalisé (type 'hover' uniquement)",
        control: false,
        table: { category: "Slots" },
      },
    },
    args: {
      content: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
      type: "click",
      id: "tooltip-1",
      triggerLabel: "Information contextuelle",
    },
    parameters: {
      docs: {
        source: {
          transform: webComponentSourceCode("dsfr-tooltip"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrTooltip>;
</script>

{#snippet template(args: Args)}
  <dsfr-tooltip
    content={args.content}
    id={args.id}
    type={args.type}
    trigger-label={args.triggerLabel}
  ></dsfr-tooltip>
{/snippet}

<Story name="Défaut" />

<Story
  name="Information contextuelle (survol)"
  args={{ type: "hover", id: "tooltip-hover" }}
>
  {#snippet template(args: Args)}
    <dsfr-tooltip content={args.content} id={args.id} type="hover">
      <a class="fr-link" href="#">Lien avec infobulle</a>
    </dsfr-tooltip>
  {/snippet}
</Story>
