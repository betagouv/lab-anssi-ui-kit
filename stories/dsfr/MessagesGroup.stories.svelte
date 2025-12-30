<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import DsfrMessagesGroup from "$lib/dsfr/DsfrMessagesGroup.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Messages Group",
    component: DsfrMessagesGroup,
    args: {
      id: "messages-group-1",
      errorMessage: "Texte d'erreur obligatoire",
      validMessage: "Texte de validation optionnel",
      warningMessage: "Texte d'avertissement",
      infoMessage: "Texte d'information",
    },
    argTypes: {
      id: {
        control: "text",
        description: "Attribut id du groupe de messages",
        table: { category: "attributes" },
      },
      errorMessage: {
        control: "text",
        description: "Texte du message d'erreur",
        table: { category: "message" },
      },
      validMessage: {
        if: { arg: "errorMessage", eq: "" },
        control: "text",
        description: "Texte du message de succès",
        table: { category: "message" },
      },
      warningMessage: {
        control: "text",
        description: "Texte du message d'avertissement",
        table: { category: "message" },
      },
      infoMessage: {
        control: "text",
        description: "Texte du message d'information",
        table: { category: "message" },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrMessagesGroup>;
</script>

{#snippet template(args: Args)}
  <dsfr-messages-group
    id={args.id}
    error-message={args.errorMessage}
    info-message={args.infoMessage}
    valid-message={args.validMessage}
    warning-message={args.warningMessage}
  ></dsfr-messages-group>
{/snippet}

<Story name="Défaut" />
