<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  // @ts-ignore: Required Import to use this component as webcomponent
  import DsfrInput from "$lib/dsfr/DsfrInput.svelte";

  // @ts-ignore: Required Import to use this component as webcomponent
  import DsfrTextarea from "$lib/dsfr/DsfrTextarea.svelte";

  // @ts-ignore: Required Import to use this component as webcomponent
  import DsfrButton from "$lib/dsfr/DsfrButton.svelte";

  // @ts-ignore: Required Import to use this component as webcomponent
  import DsfrSelect from "$lib/dsfr/DsfrSelect.svelte";

  // @ts-ignore: Required Import to use this component as webcomponent
  import DsfrCheckbox from "$lib/dsfr/DsfrCheckbox.svelte";

  // @ts-ignore: Required Import to use this component as webcomponent
  import DsfrRadiosGroup from "$lib/dsfr/DsfrRadiosGroup.svelte";

  // @ts-ignore: Required Import to use this component as webcomponent
  import DsfrCheckboxesGroup from "$lib/dsfr/DsfrCheckboxesGroup.svelte";

  const { Story } = defineMeta({
    title: "Exemples/DSFR",
    component: DsfrInput,
    args: {
      civilite: [
        { value: "madame", label: "Madame" },
        { value: "monsieur", label: "Monsieur" },
      ],
      competences: [
        { id: "skill-html", value: "html", label: "HTML" },
        { id: "skill-css", value: "css", label: "CSS" },
        { id: "skill-js", value: "javascript", label: "JavaScript" },
      ],
      statut: [
        {
          label: "Etudiant",
          id: "etudiant",
          name: "statut-1",
          value: "etudiant",
        },
        {
          label: "Freelance",
          id: "freelance",
          name: "statut-2",
          value: "freelance",
        },
        {
          label: "Salarié",
          id: "salarie",
          name: "statut-3",
          value: "salarie",
        },
      ],
    },
    tags: ["!autodocs"],
  });

  type Args = ComponentProps<DsfrInput>;
</script>

<Story name="Validation HTML des formulaires">
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
          <!-- Civilité -->
          <div class="fr-fieldset__element">
            <dsfr-select
              label="Civilité"
              id="webc-civilite"
              name="webc-civilite"
              placeholder="Sélectionnez une option"
              options={args.civilite}
              required
            ></dsfr-select>
          </div>
          <!-- Prénom -->
          <div class="fr-fieldset__element">
            <dsfr-input label="Prénom" id="webc-prenom" name="webc-prenom" required></dsfr-input>
          </div>
          <!-- Nom -->
          <div class="fr-fieldset__element">
            <dsfr-input label="Nom" id="webc-nom" name="webc-nom" required></dsfr-input>
          </div>
          <!-- Statut -->
          <div class="fr-fieldset__element">
            <dsfr-radios-group
              radios={args.statut}
              legend="Statut professionnel"
              size="md"
              id="webc-statut"
              name="webc-statut"
              required
            ></dsfr-radios-group>
          </div>
          <!-- Compétences -->
          <div class="fr-fieldset__element">
            <dsfr-checkboxes-group
              legend="Compétences"
              id="webc-competences"
              checkboxes={args.competences}
              inline
              required
            ></dsfr-checkboxes-group>
          </div>
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
                status="error"
                error-message="[Custom] Le commentaire doit comporter entre 10 et 200 caractères."
              ></dsfr-textarea>
            </div>
          </div>
          <!-- CGU -->
          <div class="fr-fieldset__element">
            <div class="fr-input-group">
              <dsfr-checkbox
                size="md"
                label="Accepter les conditions générales"
                id="webc-cgu"
                name="webc-cgu"
                required
              ></dsfr-checkbox>
            </div>
          </div>

          <div class="fr-fieldset__element">
            <button class="fr-btn" type="submit" id="submit-btn">
              Enregistrer les informations
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  {/snippet}
</Story>
