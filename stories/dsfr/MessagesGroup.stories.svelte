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
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-messages-group");

    await step("Le groupe de messages est rendu avec le statut erreur", async () => {
      const group = el?.shadowRoot?.querySelector(".fr-messages-group");
      await expect(group).toBeTruthy();
      const message = el?.shadowRoot?.querySelector(".fr-message--error");
      await expect(message).toBeTruthy();
      await expect(message?.textContent).toBe("Le champ est obligatoire.");
    });
  }}
/>

<Story
  name="Succès"
  args={{ status: "valid", validMessage: "La valeur a bien été enregistrée." }}
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-messages-group");

    await step("Le groupe de messages est rendu avec le statut succès", async () => {
      const message = el?.shadowRoot?.querySelector(".fr-message--valid");
      await expect(message).toBeTruthy();
      await expect(message?.textContent).toBe("La valeur a bien été enregistrée.");
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
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-messages-group");

    await step("Les deux messages d'erreur sont rendus", async () => {
      const messages = el?.shadowRoot?.querySelectorAll(".fr-message--error");
      await expect(messages?.length).toBe(2);
      await expect(messages?.[0]?.textContent).toBe("Le champ est obligatoire.");
      await expect(messages?.[1]?.textContent).toBe("Le format attendu est JJ/MM/AAAA.");
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
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-messages-group");

    await step("Les messages d'erreur et d'information sont rendus", async () => {
      const errors = el?.shadowRoot?.querySelectorAll(".fr-message--error");
      await expect(errors?.length).toBe(1);
      const infos = el?.shadowRoot?.querySelectorAll(".fr-message--info");
      await expect(infos?.length).toBe(2);
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
