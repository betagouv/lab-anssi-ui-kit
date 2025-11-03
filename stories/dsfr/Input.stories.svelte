<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    inputArgTypes,
    inputArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/input/template/stories/input-arg-types.js";
  import DsfrInput from "$lib/dsfr/DsfrInput.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Input",
    component: DsfrInput,
    argTypes: {
      ...inputArgTypes,
      status: {
        control: {
          type: "select",
          labels: {
            default: "Défaut",
            valid: "Succès",
            error: "Erreur",
            info: "Information",
          },
        },
        description: "Statut du message",
        options: ["default", "valid", "error", "info"],
        type: {
          value: "string",
        },
        table: { category: "message" },
      },
    },
    args: inputArgs,
  });
</script>

<Story name="Défaut" />

<Story
  name="Message d'information"
  args={{ status: "info", infoMessage: "200 caractères maximum." }}
/>
