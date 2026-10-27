<svelte:options
  customElement={{
    extend: avecEnregistrementIdempotent(
      "test-enregistrement-idempotent",
      (constructeur) =>
        class extends constructeur {
          static origine = "second-composant";
        },
    ),
  }}
/>

<script lang="ts">
  import { avecEnregistrementIdempotent } from "../../src/lib/utilitaires";
</script>

<p>Second composant avec enregistrement idempotent</p>
