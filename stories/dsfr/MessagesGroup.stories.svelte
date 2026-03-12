<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import DsfrMessagesGroup from "$lib/dsfr/DsfrMessagesGroup.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Messages Group",
    component: DsfrMessagesGroup,
    argTypes: {
      id: {
        control: "text",
        description: "Attribut id du champ parent",
        table: { category: "commun" },
      },
      status: {
        control: {
          type: "select",
          labels: {
            default: "Défaut (aucun message)",
            valid: "Succès",
            error: "Erreur",
            info: "Information",
          },
        },
        description: "Statut du message (API simplifiée)",
        options: ["default", "valid", "error", "info"],
        table: { category: "API simplifiée" },
      },
      errorMessage: {
        control: "text",
        description: "Texte du message d'erreur",
        table: { category: "API simplifiée" },
      },
      validMessage: {
        control: "text",
        description: "Texte du message de succès",
        table: { category: "API simplifiée" },
      },
      infoMessage: {
        control: "text",
        description: "Texte du message d'information",
        table: { category: "API simplifiée" },
      },
      messages: {
        control: "object",
        description:
          "Messages structurés (API avancée). `errors` et `valids` sont mutuellement exclusifs.",
        table: { category: "API avancée" },
      },
    },
    args: {
      id: "champ-exemple",
      status: "default",
    },
    render: template,
  });

  type Args = ComponentProps<DsfrMessagesGroup>;
</script>

{#snippet template(args: Args)}
  <dsfr-messages-group
    id={args.id}
    status={args.status}
    errorMessage={args.errorMessage}
    validMessage={args.validMessage}
    infoMessage={args.infoMessage}
    messages={args.messages}
  ></dsfr-messages-group>
{/snippet}

<Story name="Erreur" args={{ status: "error", errorMessage: "Le champ est obligatoire." }} />

<Story
  name="Succès"
  args={{ status: "valid", validMessage: "La valeur a bien été enregistrée." }}
/>

<Story name="Information" args={{ status: "info", infoMessage: "200 caractères maximum." }} />

<Story
  name="Avertissement"
  args={{ id: "champ-avertissement", messages: { warnings: ["200 caractères maximum."] } }}
/>

<Story
  name="Plusieurs erreurs"
  args={{
    id: "champ-multi-erreurs",
    messages: {
      errors: ["Le champ est obligatoire.", "Le format attendu est JJ/MM/AAAA."],
    },
  }}
/>

<Story
  name="Erreurs et informations"
  args={{
    id: "champ-erreurs-infos",
    messages: {
      errors: ["La valeur saisie est invalide."],
      infos: ["Format attendu : JJ/MM/AAAA.", "La date doit être postérieure au 01/01/2020."],
    },
  }}
/>

<Story
  name="Succès et avertissement"
  args={{
    id: "champ-succes-warning",
    messages: {
      valids: ["La valeur a bien été enregistrée."],
      warnings: ["Cette modification sera visible après validation."],
    },
  }}
/>
