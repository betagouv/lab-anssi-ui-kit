<script lang="ts">
  import type { Hst } from "@histoire/plugin-svelte";
  import BriqueHero from "$lib/lab/vitrines-produits/briques/BriqueHero.svelte";
  import OutilSelecteurTheme from "../../../OutilSelecteurTheme.svelte";
  import { proprietesDeVariantsHero } from "../donneesProduits";

  export let Hst: Hst;
</script>

<Hst.Story title="Composants/Lab/Sites vitrines/Brique Hero" icon="material-symbols:brick-outline">
  <Hst.Variant title="MSS">
    <OutilSelecteurTheme themeSelectionne="MonServiceSécurisé" />
    <BriqueHero titre={proprietesDeVariantsHero['mss'].titre}
                badge={proprietesDeVariantsHero['mss'].badge}
                soustitre={proprietesDeVariantsHero['mss'].soustitre}
                illustration={proprietesDeVariantsHero['mss'].illustration}
                actions={proprietesDeVariantsHero['mss'].actions}
                partenaires={proprietesDeVariantsHero['mss'].partenaires}
    />
  </Hst.Variant>
  <Hst.Variant title="MAC">
    <OutilSelecteurTheme themeSelectionne="MonAideCyber" />
    <BriqueHero titre={proprietesDeVariantsHero['mac'].titre}
                badge={proprietesDeVariantsHero['mac'].badge}
                soustitre={proprietesDeVariantsHero['mac'].soustitre}
                illustration={proprietesDeVariantsHero['mac'].illustration}
                actions={proprietesDeVariantsHero['mac'].actions}
                partenaires={proprietesDeVariantsHero['mac'].partenaires}
    />
  </Hst.Variant>
  <Hst.Variant title="MSC">
    <OutilSelecteurTheme themeSelectionne="MesServicesCyber" />
    <BriqueHero titre={proprietesDeVariantsHero['msc'].titre}
                badge={proprietesDeVariantsHero['msc'].badge}
                soustitre={proprietesDeVariantsHero['msc'].soustitre}
                illustration={proprietesDeVariantsHero['msc'].illustration}
                actions={proprietesDeVariantsHero['msc'].actions}
                partenaires={proprietesDeVariantsHero['msc'].partenaires}
    />
  </Hst.Variant>
</Hst.Story>
