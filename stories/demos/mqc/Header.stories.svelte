<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    headerArgTypes,
    headerArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/header/template/stories/header-arg-types";

  import DsfrHeader from "$lib/dsfr/DsfrHeader.svelte";
  import DsfrBadge from "$lib/dsfr/DsfrBadge.svelte";

  const { Story } = defineMeta({
    title: "Exemples/MQC",
    component: DsfrHeader,
    argTypes: headerArgTypes,
    args: headerArgs,
    tags: ["!autodocs"],
  });

  type Args = ComponentProps<DsfrHeader>;
</script>

<Story name="Header MQC">
  {#snippet template()}
    <dsfr-header
      brand-service="MesQuestionsCyber"
      has-brand-tagline
      brand-tagline="Innovation ANSSI"
      brand-link-href="https://cyber.gouv.fr/"
      has-brand-operator
      brand-operator-src="https://cyber.gouv.fr/themes/open_theme/logo.svg"
      brand-operator-style="width: 66px"
    >
      <dsfr-badge label="Bêta" accent="green-emeraude" type="accent" slot="headerbadge"
      ></dsfr-badge>
    </dsfr-header>
  {/snippet}
</Story>
