<script lang="ts">
  import Alerte from "$lib/Alerte.svelte";
  import type { Hst } from "@histoire/plugin-svelte";

  export let Hst: Hst;
</script>

<Hst.Story title="Composants/Alerte" icon="material-symbols:live-help">
  <div style="background-color:white; padding:48px;">
    <h3>Information</h3>
    <div style="margin: 16px 0;">
      <Alerte description="Lorem ipsum dolor sit" />
    </div>
    <div style="margin: 16px 0;">
      <Alerte
        description="
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam imperdiet laoreet tortor id tristique. Proin vestibulum mi non dui luctus, vitae ornare augue hendrerit."
      />
    </div>

    <h3>Erreur</h3>
    <div style="margin: 16px 0;">
      <Alerte description="Lorem ipsum dolor sit" type="erreur" />
    </div>
    <div style="margin: 16px 0;">
      <Alerte
        description="
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam imperdiet laoreet tortor id tristique. Proin vestibulum mi non dui luctus, vitae ornare augue hendrerit."
        type="erreur"
      />
    </div>
  </div>
</Hst.Story>
