<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect } from "storybook/test";
  import { type ComponentProps } from "svelte";

  import DsfrMessagesGroup from "$lib/dsfr/DsfrMessagesGroup.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Messages Group",
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
    parameters: {
      docs: {
        source: {
          transform: webComponentSourceCode("dsfr-messages-group"),
        },
      },
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
    warningMessage={args.warningMessage}
    messages={args.messages}
  ></dsfr-messages-group>
{/snippet}

<Story
  name="Erreur"
  args={{ status: "error", errorMessage: "Le champ est obligatoire." }}
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-messages-group");
    const shadow = el?.shadowRoot;

    await step("Le message d'erreur est affiché avec le bon texte", async () => {
      const { status, errorMessage } = args as unknown as {
        status: string;
        errorMessage: string;
      };
      const message = shadow?.querySelector(`.fr-message--${status}`);

      await expect(message?.textContent?.trim()).toBe(errorMessage);
    });
  }}
/>

<Story
  name="Succès"
  args={{ status: "valid", validMessage: "La valeur a bien été enregistrée." }}
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-messages-group");
    const shadow = el?.shadowRoot;

    await step("Le message de succès est affiché avec le bon texte", async () => {
      const { status, validMessage } = args as unknown as {
        status: string;
        validMessage: string;
      };
      const message = shadow?.querySelector(`.fr-message--${status}`);

      await expect(message?.textContent?.trim()).toBe(validMessage);
    });
  }}
/>

<Story name="Information" args={{ status: "info", infoMessage: "200 caractères maximum." }} />

<Story
  name="Avertissement"
  args={{ status: "warning", warningMessage: "200 caractères maximum." }}
/>

<Story
  name="Plusieurs erreurs"
  args={{
    id: "champ-multi-erreurs",
    messages: {
      errors: ["Le champ est obligatoire.", "Le format attendu est JJ/MM/AAAA."],
    },
  }}
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-messages-group");
    const shadow = el?.shadowRoot;
    const errorsData = (args as unknown as { messages: { errors: string[] } }).messages.errors;

    await step("Les deux messages d'erreur sont rendus avec les bons textes", async () => {
      const messages = shadow?.querySelectorAll(".fr-message--error");

      await expect(messages?.length).toBe(errorsData.length);

      for (let i = 0; i < errorsData.length; i++) {
        await expect(messages?.[i]?.textContent?.trim()).toBe(errorsData[i]);
      }
    });
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
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-messages-group");
    const shadow = el?.shadowRoot;
    const messagesData = (args as unknown as { messages: { errors: string[]; infos: string[] } })
      .messages;

    await step("Les messages d'erreur sont rendus avec les bons textes", async () => {
      const errors = shadow?.querySelectorAll(".fr-message--error");

      await expect(errors?.length).toBe(messagesData.errors.length);

      for (let i = 0; i < messagesData.errors.length; i++) {
        await expect(errors?.[i]?.textContent?.trim()).toBe(messagesData.errors[i]);
      }
    });

    await step("Les messages d'information sont rendus avec les bons textes", async () => {
      const infos = shadow?.querySelectorAll(".fr-message--info");

      await expect(infos?.length).toBe(messagesData.infos.length);

      for (let i = 0; i < messagesData.infos.length; i++) {
        await expect(infos?.[i]?.textContent?.trim()).toBe(messagesData.infos[i]);
      }
    });
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
