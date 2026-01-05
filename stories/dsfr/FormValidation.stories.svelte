<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  // @ts-ignore: Required Import to use this component as webcomponent
  import DsfrInput from "$lib/dsfr/DsfrInput.svelte";

  // @ts-ignore: Required Import to use this component as webcomponent
  import DsfrTextarea from "$lib/dsfr/DsfrTextarea.svelte";

  // @ts-ignore: Required Import to use this component as webcomponent
  import DsfrButton from "$lib/dsfr/DsfrButton.svelte";

  const { Story } = defineMeta({
    title: "Exemple/Validation Formulaire",
    component: DsfrInput,
    args: {},
    tags: ["!autodocs"],
  });

  type Args = ComponentProps<DsfrInput>;
</script>

<Story name="Défaut">
  {#snippet template(args: Args)}
    <div class="fr-container">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@gouvfr/dsfr@1.14.1/dist/dsfr.min.css"
      />
      <h1>[POC] — Validation des champs de formulaires</h1>

      <form action="https://postman-echo.com/post" method="post">
        <fieldset class="fr-fieldset" aria-labelledby="text-legend text-messages">
          <legend class="fr-fieldset__legend" id="text-legend">
            Légende pour l’ensemble des éléments
            <span class="fr-hint-text">Texte de description additionnel</span>
          </legend>
          <!-- Prénom -->
          <div class="fr-fieldset__element">
            <dsfr-input label="Prénom" id="webc-prenom" name="webc-prenom" required></dsfr-input>
          </div>
          <!-- Nom -->
          <div class="fr-fieldset__element">
            <dsfr-input label="Nom" id="webc-nom" name="webc-nom" required></dsfr-input>
          </div>
          <!-- Email -->
          <!-- <div class="fr-fieldset__element">
            <dsfr-input
              label="Email"
              id="webc-email"
              name="webc-email"
              required
              pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
            ></dsfr-input>
          </div> -->
          <!-- Ville -->
          <div class="fr-fieldset__element">
            <dsfr-input label="Ville" id="webc-ville" name="webc-ville" required></dsfr-input>
          </div>
          <!-- Commentaire -->
          <div class="fr-fieldset__element">
            <div class="fr-input-group">
              <dsfr-textarea
                label="Libellé champ de saisie (Web Component)"
                name="webc-textarea"
                id="webc-textarea"
                rows="10"
                required
                minlength="10"
                maxlength="200"
                valid-message="Le champ est valide !"
              ></dsfr-textarea>
            </div>
          </div>
        </fieldset>

        <button class="fr-btn" type="submit" id="submit-btn"> Enregistrer les informations </button>
      </form>
    </div>

    <style lang="scss">
      .lab-anssi-carte-jeux {
        &__header,
        &__reactions {
          border: 1px solid #dddddd;
        }

        &__header {
          border-bottom-width: 0;
        }

        &__actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 3px;
        }

        &__masque {
          background-color: #e8edff;
          display: flex;
          align-items: center;
          gap: 4px;
          color: #0063cb;
          font-size: 12px;
          line-height: 20px;
          padding: 4px 8px;
          margin-block: 0;
        }

        &__reactions {
          border-top-width: 0;
          padding: 5px;
        }
      }
    </style>
  {/snippet}
</Story>
