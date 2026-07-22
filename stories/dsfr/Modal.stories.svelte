<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  import {
    modalArgs,
    modalArgTypes,
  } from "@gouvfr/dsfr/src/dsfr/component/modal/template/stories/modal-arg-types.js";

  import DsfrModal from "$lib/dsfr/DsfrModal.svelte";

  import DsfrButton from "$lib/dsfr/DsfrButton.svelte";
  import DsfrButtonsGroup from "$lib/dsfr/DsfrButtonsGroup.svelte";

  const body = `<p>Lorem ipsum dolor sit amet, consectetur adipiscing, incididunt, ut labore et dolore magna aliqua. Vitae sapien pellentesque habitant morbi tristique senectus et. Diam maecenas sed enim ut. Accumsan lacus vel facilisis volutpat est. Ut aliquam purus sit amet luctus. Lorem ipsum dolor sit amet consectetur adipiscing elit ut.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing, incididunt, ut labore et dolore magna aliqua. Vitae sapien pellentesque habitant morbi tristique senectus et. Diam maecenas sed enim ut. Accumsan lacus vel facilisis volutpat est. Ut aliquam purus sit amet luctus. Lorem ipsum dolor sit amet consectetur adipiscing elit ut.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing, incididunt, ut labore et dolore magna aliqua. Vitae sapien pellentesque habitant morbi tristique senectus et. Diam maecenas sed enim ut. Accumsan lacus vel facilisis volutpat est. Ut aliquam purus sit amet luctus. Lorem ipsum dolor sit amet consectetur adipiscing elit ut.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing, incididunt, ut labore et dolore magna aliqua. Vitae sapien pellentesque habitant morbi tristique senectus et. Diam maecenas sed enim ut. Accumsan lacus vel facilisis volutpat est. Ut aliquam purus sit amet luctus. Lorem ipsum dolor sit amet consectetur adipiscing elit ut.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing, incididunt, ut labore et dolore magna aliqua. Vitae sapien pellentesque habitant morbi tristique senectus et. Diam maecenas sed enim ut. Accumsan lacus vel facilisis volutpat est. Ut aliquam purus sit amet luctus. Lorem ipsum dolor sit amet consectetur adipiscing elit ut.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing, incididunt, ut labore et dolore magna aliqua. Vitae sapien pellentesque habitant morbi tristique senectus et. Diam maecenas sed enim ut. Accumsan lacus vel facilisis volutpat est. Ut aliquam purus sit amet luctus. Lorem ipsum dolor sit amet consectetur adipiscing elit ut.</p>`;

  const { Story } = defineMeta({
    title: "Composants/DSFR/Modal",
    component: DsfrModal,
    argTypes: {
      ...modalArgTypes,
      default: {
        description: "Contenu principal de la modale",
        control: false,
        table: { category: "Slots" },
      },
      onopen: {
        description: "Déclenché lors de l'ouverture de la modale.",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<void>" },
        },
        control: false,
      },
      onclose: {
        description: "Déclenché lors de la fermeture de la modale.",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<void>" },
        },
        control: false,
      },
      footerSlot: {
        name: "footer",
        description: "Contenu du footer",
        control: false,
        table: { category: "Slots" },
      },
    },
    args: {
      ...modalArgs,
      concealingBackdrop: true,
    },
    parameters: {
      actions: { handles: ["open", "close"] },
      docs: {
        source: {
          transform: webComponentSourceCode("dsfr-modal"),
        },
      },
    },
    render: template,
  });

  let openModals: Record<string, boolean> = $state({});
  const buttons = [
    {
      label: "Libellé du bouton 1",
      kind: "primary",
    },
    {
      label: "Libellé du bouton 2",
      kind: "secondary",
    },
  ];

  type Args = ComponentProps<DsfrModal>;
</script>

{#snippet template(args: Args)}
  <div class="story-container">
    <DsfrButton
      class="fr-btn"
      onclick={() => (openModals[args.id] = true)}
      label="Ouvrir la modale"
    />

    <dsfr-modal
      id={args.id}
      title={args.title}
      icon={args.icon}
      size={args.size}
      top={args.top || undefined}
      concealing-backdrop={args.concealingBackdrop}
      footer={args.footer || undefined}
      opened={openModals[args.id] || undefined}
      onclose={() => (openModals[args.id] = false)}
    >
      {@html body}

      {#if args.footer}
        <dsfr-buttons-group slot="footer" {buttons} size="md" inline="lg" align="center"
        ></dsfr-buttons-group>
      {/if}
    </dsfr-modal>
  </div>
{/snippet}

<Story name="Défaut" />

<Story name="Size SM" args={{ id: "modal-sm", size: "sm" }} />

<Story name="Size MD" args={{ id: "modal-md", size: "md" }} />

<Story name="Size LG" args={{ id: "modal-lg", size: "lg" }} />

<Story
  name="Footer"
  args={{
    id: "modal-footer",
    size: "md",
    footer: true,
  }}
/>

<style>
  .story-container {
    min-height: 30rem;
  }
</style>
