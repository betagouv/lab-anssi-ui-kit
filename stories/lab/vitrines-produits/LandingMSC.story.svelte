<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import BriqueHero from "$lib/lab/vitrines-produits/briques/BriqueHero.svelte";
  import OutilSelecteurTheme from "../../OutilSelecteurTheme.svelte";
  import type { Action, Image } from "$lib/types";
  import { genereImageDePlaceholder } from "$lib/generateurImagesPlaceholders";

  export let Hst: Hst;

  const imageAffichee: Image = {
    lien: genereImageDePlaceholder(600, 400),
    alt: ""
  }


</script>

<Hst.Story title="Composants/Lab/Sites vitrines/Landing MesServicesCyber" icon="uis:web-grid-alt">
  <OutilSelecteurTheme themeSelectionne="MesServicesCyber" />
  <BriqueHero titre="Mes​Services​Cyber"
              soustitre="Accédez aux services et ressources cyber proposés par l'Agence nationale de la sécurité des systèmes d'information et ses partenaires."
              illustration={imageAffichee}
              actionGauche={{
                titre: 'Découvrir les services adaptés à NIS2',
                lien: "",
              }}
              actionDroite={{
                titre: "Découvrir le catalogue complet",
                lien: "",
              }}
  />
</Hst.Story>
