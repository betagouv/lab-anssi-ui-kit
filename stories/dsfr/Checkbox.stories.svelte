<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    checkboxArgTypes,
    checkboxArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/checkbox/template/stories/checkbox-arg-types.js";
  import DsfrCheckbox from "$lib/dsfr/DsfrCheckbox.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Checkbox",
    component: DsfrCheckbox,
    argTypes: checkboxArgTypes,
    args: checkboxArgs,
  });
</script>

<Story name="Défaut" />

<Story name="Un label avec un lien" args={{ ...checkboxArgs, label: undefined }}>
  {#snippet template(args)}
    <DsfrCheckbox {...args}>
      Un label avec un&nbsp;<a href="https://google.fr" target="_blank">lien</a>
    </DsfrCheckbox>
  {/snippet}
</Story>
