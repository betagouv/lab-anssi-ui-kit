<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import OutilSelecteurTheme from "../../../OutilSelecteurTheme.svelte";
  import Marelle from "$lib/lab/vitrines-produits/briques/marelle/Marelle.svelte";
  import { proprietesDeVariantsHero } from "../donneesProduits";

  export let Hst: Hst;
</script>

<Hst.Story title="Composants/Lab/Sites vitrines/Briques/Marelle" icon="material-symbols:brick-outline">
  <Hst.Variant title="MSS">
    <OutilSelecteurTheme themeSelectionne="MonServiceSécurisé" />
    <Marelle
      titre={proprietesDeVariantsHero['mss'].marelle.titre}
      etapesmarelle={proprietesDeVariantsHero['mss'].marelle.etapes}
      action={proprietesDeVariantsHero['mss'].marelle.action}
    />
  </Hst.Variant>
  <Hst.Variant title="MAC">
    <OutilSelecteurTheme themeSelectionne="MonAideCyber" />
    <Marelle
      titre={proprietesDeVariantsHero['mac'].marelle.titre}
      etapesmarelle={proprietesDeVariantsHero['mac'].marelle.etapes}
      action={proprietesDeVariantsHero['mac'].marelle.action}
    />
  </Hst.Variant>
</Hst.Story>