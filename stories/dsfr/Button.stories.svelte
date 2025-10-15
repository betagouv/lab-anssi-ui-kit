<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    buttonArgs,
    buttonArgTypes,
  } from "@gouvfr/dsfr/src/dsfr/component/button/template/stories/button-arg-types.js";
  import DsfrButton from "$lib/dsfr/DsfrButton.svelte";

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
  name="Inverted Primary"
  args={{ ...buttonArgs, kind: "inverted-primary" }}
  globals={{
    backgrounds: { value: "blueFranceLab" },
  }}
/>

<Story
  name="Inverted Secondary"
  args={{ ...buttonArgs, kind: "inverted-secondary" }}
  globals={{
    backgrounds: { value: "blueFranceLab" },
  }}
/>
