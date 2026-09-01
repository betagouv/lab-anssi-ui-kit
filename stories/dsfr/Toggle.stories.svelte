<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
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
    argTypes: {
      ...toggleArgTypes,
      hint: {
        description: "Contenu du texte additionnel (remplace la prop `hint` avec du HTML riche)",
        control: false,
        table: { category: "Slots" },
      },
      onvaluechanged: {
        description:
          "Déclenché lors du changement d'état de l'interrupteur.<br>" + "`detail: boolean`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<boolean>" },
        },
        control: false,
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

<Story name="Défaut" />

<Story name="Description" args={{ hint: "Texte additionnel de l'interrupteur" }} />

<Story name="État" args={{ state: true }} />

<Story name="Erreur" args={{ status: "error" }} />

<Story name="Valide" args={{ status: "valid" }} />

<Story name="Désactivé" args={{ disabled: true }} />
