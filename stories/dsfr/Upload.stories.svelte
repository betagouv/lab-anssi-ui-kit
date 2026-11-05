<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect, fn } from "storybook/test";
  import { type ComponentProps } from "svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  import {
    uploadArgTypes,
    uploadArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/upload/template/stories/upload-arg-types.js";

  import "$lib/dsfr/DsfrButton.svelte";
  import DsfrUpload from "$lib/dsfr/DsfrUpload.svelte";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Upload",
    component: DsfrUpload,
    argTypes: {
      ...uploadArgTypes,
      accept: {
        control: "text",
        description: "Types de fichiers acceptés (ex: .jpg,.png,.pdf)",
        type: {
          value: "string",
        },
      },
      required: {
        control: "boolean",
        description: "Rend le champ d'upload obligatoire",
        type: {
          value: "boolean",
        },
      },
      status: {
        control: {
          type: "select",
          labels: {
            default: "Défaut",
            valid: "Succès",
            error: "Erreur",
            info: "Information",
          },
        },
        description: "Statut du message",
        options: ["default", "valid", "error", "info"],
        type: {
          value: "string",
        },
        table: { category: "message" },
      },
      labelSize: {
        control: "select",
        options: [undefined, "xs", "sm", "md", "lg", "xl", "lead"],
        description:
          "Applique une classe utilitaire de taille de texte DSFR (fr-text--xs à fr-text--xl, fr-text--lead) sur le label",
      },
      labelWeight: {
        control: "select",
        options: [undefined, "light", "regular", "bold", "heavy"],
        description:
          "Applique une classe utilitaire de graisse DSFR (fr-text--light à fr-text--heavy) sur le label",
      },
      onvaluechanged: {
        description:
          "Déclenché lors du changement de fichier(s).<br>" + "`detail: FileList | null`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<FileList | null>" },
        },
        control: false,
      },
    },
    args: uploadArgs,
    parameters: {
      actions: { handles: ["valuechanged"] },
      docs: {
        description: {
          component:
            "Le téléversement de fichier permet à un utilisateur d'envoyer un ou plusieurs fichiers.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/ajout-de-fichier)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-upload"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrUpload>;
</script>

{#snippet template(args: Args)}
  <dsfr-upload
    id={args.id}
    label={args.label}
    hint={args.hint}
    name={args.name}
    accept={args.accept}
    multiple={args.multiple || undefined}
    disabled={args.disabled || undefined}
    required={args.required || undefined}
    status={args.status}
    error-message={args.status === "error" ? args.errorMessage : undefined}
    valid-message={args.status === "valid" ? args.validMessage : undefined}
    info-message={args.status === "info" ? args.infoMessage : undefined}
    label-size={args.labelSize}
    label-weight={args.labelWeight}
  ></dsfr-upload>
{/snippet}

<Story
  name="Par défaut"
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-upload");
    const shadow = el?.shadowRoot;

    await step("Le champ d'upload est de type file", async () => {
      const input = shadow?.querySelector("input");

      await expect(input?.type).toBe("file");
    });

    await step("Le label est affiché", async () => {
      const label = shadow?.querySelector(".fr-label");

      await expect(label).toBeTruthy();
    });

    await step("Le hint est affiché", async () => {
      const hint = shadow?.querySelector(".fr-hint-text");

      await expect(hint).toBeTruthy();
    });

    await step("Émet l'événement valuechanged lors de la sélection d'un fichier", async () => {
      const handler = fn();
      el?.addEventListener("valuechanged", handler);

      const input = shadow?.querySelector("input") as HTMLInputElement;
      const file = new File(["contenu"], "test.pdf", { type: "application/pdf" });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);

      input.files = dataTransfer.files;
      input.dispatchEvent(new Event("change", { bubbles: true }));

      await expect(handler).toHaveBeenCalled();
      await expect(handler.mock.calls.at(-1)?.[0].detail).toBeInstanceOf(FileList);

      el?.removeEventListener("valuechanged", handler);
    });
  }}
/>

<Story
  name="Multiple"
  args={{ multiple: true, label: "Ajouter des fichiers" }}
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-upload");
    const shadow = el?.shadowRoot;

    await step("Le champ accepte plusieurs fichiers", async () => {
      const input = shadow?.querySelector("input");

      await expect(input?.multiple).toBe(true);
    });
  }}
/>

<Story
  name="Désactivé"
  args={{ disabled: true }}
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-upload");
    const shadow = el?.shadowRoot;

    await step("Le champ est désactivé", async () => {
      const input = shadow?.querySelector("input");

      await expect(input?.disabled).toBe(true);
    });

    await step("Le groupe a la classe disabled", async () => {
      const group = shadow?.querySelector(".fr-upload-group");

      await expect(group?.classList.contains("fr-upload-group--disabled")).toBe(true);
    });
  }}
/>

<Story
  name="Erreur"
  args={{ status: "error" }}
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-upload");
    const shadow = el?.shadowRoot;

    await step("Le groupe a la classe de statut correspondante", async () => {
      const group = shadow?.querySelector(".fr-upload-group");

      await expect(group?.classList.contains("fr-upload-group--error")).toBe(true);
    });

    await step("Le champ a un aria-describedby pour le message d'erreur", async () => {
      const input = shadow?.querySelector("input");

      await expect(input?.getAttribute("aria-describedby")).toBeTruthy();
    });
  }}
/>

<Story
  name="Succès"
  args={{ status: "valid" }}
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-upload");
    const shadow = el?.shadowRoot;

    await step("Le groupe a la classe de statut correspondante", async () => {
      const group = shadow?.querySelector(".fr-upload-group");

      await expect(group?.classList.contains("fr-upload-group--valid")).toBe(true);
    });
  }}
/>

<Story name="Validation dans un formulaire" tags={["!autodocs"]}>
  {#snippet template(_args: Args)}
    <form
      onsubmit={(e) => {
        e.preventDefault();
      }}
    >
      <dsfr-upload
        id="upload-form-validation"
        label="Ajouter un justificatif"
        hint="Taille maximale : 500 Mo. Formats supportés : jpg, png, pdf."
        name="justificatif"
        required
      ></dsfr-upload>

      <div style="margin-top: 1rem;">
        <dsfr-button label="Soumettre" type="submit"></dsfr-button>
      </div>
    </form>
  {/snippet}
</Story>
