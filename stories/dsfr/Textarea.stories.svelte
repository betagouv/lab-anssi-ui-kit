<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    inputArgTypes,
    inputArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/input/template/stories/input-arg-types.js";
  import DsfrTextarea from "$lib/dsfr/DsfrTextarea.svelte";

  const args = { ...inputArgs, rows: 6 };

  const { Story } = defineMeta({
    title: "Composants/dsfr/Textarea",
    component: DsfrTextarea,
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
    args,
  });
</script>

<Story name="Défaut" />
