<svelte:options
  customElement={{ extend: avecEnregistrementIdempotent("test-enregistrement-idempotent") }}
/>

<script lang="ts">
  import { avecEnregistrementIdempotent } from "../../src/lib/utilitaires";
</script>

<p>Premier composant avec enregistrement idempotent</p>
