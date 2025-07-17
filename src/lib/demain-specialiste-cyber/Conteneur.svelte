<script lang="ts">
  export let fluid: boolean = false;
</script>

<div class={fluid ? "fr-container--fluid" : "fr-container"}>
  <slot />
</div>
