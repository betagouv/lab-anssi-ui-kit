<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import BriqueHero from "$lib/lab/vitrines-produits/briques/BriqueHero.svelte";
  import OutilSelecteurTheme from "../../../OutilSelecteurTheme.svelte";

  export let Hst: Hst;

  const actionsDisponibles = [
    {
      titre: 'Libellé primaire',
      lien: "",
      variation: 'primaire'
    },
    {
      titre: 'Libellé secondaire',
      cheminFichier: "",
      variation: 'secondaire'
    }
  ]

  const imageAffichee = {
    titre: 'Image test',
    cheminFichier: 'src/lib/assets/illustrations/ordinateur.svg',
    alt: "Logo ordinateur"
  }

  const partenaires = [
    {
      titre: 'La CNIL',
      cheminFichier: 'src/lib/assets/illustrations/cnil.svg',
      alt: "Logo de la CNIL"
    }
  ]
</script>

<Hst.Story title="Composants/Lab/Sites vitrines/BriqueHero" icon="material-symbols:assistant-navigation">
  <OutilSelecteurTheme />
  <BriqueHero titre="Mon​Nom​De​Service"
              sousTitre="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id sodales sapien, sit amet ultrices est."
              illustration={JSON.stringify(imageAffichee)}
              actions={JSON.stringify(actionsDisponibles)}
              partenaires={JSON.stringify(partenaires)}
  />
</Hst.Story>
