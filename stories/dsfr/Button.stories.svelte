<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    buttonArgs,
    buttonArgTypes,
  } from "@gouvfr/dsfr/src/dsfr/component/button/template/stories/button-arg-types.js";
  import DsfrButton from "$lib/dsfr/DsfrButton.svelte";

  // Styles
  import "@gouvfr/dsfr/dist/core/core.min.css";
  import "@gouvfr/dsfr/dist/component/button/button.min.css";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Button",
    component: DsfrButton,
    argTypes: {
      ...buttonArgTypes,
      kind: {
        control: {
          type: "select",
        },
        description:
          "Type du bouton<br>Valeurs :<br>- Primaire : bouton d'action principal, unique dans la page<br>- Secondaire : bouton d'action moins prioritaire<br>- Tertiaire : bouton d'action contextuelle ou alternative<br>Tertiaire sans bordure : version alternative",
        options: ["primary", "secondary", "tertiary", "tertiary-no-outline", "inverted"],
      },
    },
    args: buttonArgs,
    parameters: {
      backgrounds: {
        options: {
          blueFranceLab: { name: "Blue France Lab", value: "#000091" },
        },
      },
    },
  });
</script>

<Story name="Défaut" />

<Story
  name="Inverted"
  args={{ ...buttonArgs, kind: "inverted" }}
  globals={{
    backgrounds: { value: "blueFranceLab" },
  }}
/>
