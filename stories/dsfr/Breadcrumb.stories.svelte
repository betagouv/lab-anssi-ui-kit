<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    breadcrumbArgTypes,
    breadcrumbArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/breadcrumb/template/stories/breadcrumb-arg-types.js";
  import DsfrBreadcrumb from "$lib/dsfr/DsfrBreadcrumb.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Breadcrumb",
    component: DsfrBreadcrumb,
    argTypes: breadcrumbArgTypes,
    args: {
      ...breadcrumbArgs,
      buttonAriaLabel: "vous êtes ici :",
      buttonLabel: "Voir le fil d'Ariane",
    },
    parameters: {
      backgrounds: {
        options: {
          blueFranceLab: { name: "Blue France Lab", value: "#000091" },
        },
      },
    },
  });
</script>

<Story name="Defaut" />

<Story
  name="Inverse"
  args={{ inverse: true }}
  globals={{
    backgrounds: { value: "blueFranceLab" },
  }}
/>
