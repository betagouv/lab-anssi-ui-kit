<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import DsfrDropdown from "$lib/dsfr/DsfrDropdown.svelte";
  import DsfrToggle from "$lib/dsfr/DsfrToggle.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Dropdown",
    component: DsfrDropdown,
    args: {
      id: "dropdown-id",
      buttonTitle: "Choisir une option",
      buttonKind: "tertiary",
      buttonSize: "md",
      buttonIcon: "arrow-down-s-line",
      contentType: "custom",
      align: "left",
    },
  });
</script>

<Story name="Défaut">
  {#snippet template(args)}
    <DsfrDropdown {...args}>
      <DsfrToggle left label="Masquer de la vitrine des jeux" id="toggleExemple" />
    </DsfrDropdown>
  {/snippet}
</Story>
