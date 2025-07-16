<script lang="ts">
  export let title: string = "";
  export let icon: string = "booklet-fill";

  const icons = {
    'booklet-fill': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M8 2v20H4v-4H2v-2h2v-3H2v-2h2V8H2V6h2V2h4Zm12.005 0C21.107 2 22 2.898 22 3.99v16.02c0 1.099-.893 1.99-1.995 1.99H10V2h10.005Z"/></svg>',
    'success': '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.00004 14.6667C4.31804 14.6667 1.33337 11.682 1.33337 8.00004C1.33337 4.31804 4.31804 1.33337 8.00004 1.33337C11.682 1.33337 14.6667 4.31804 14.6667 8.00004C14.6667 11.682 11.682 14.6667 8.00004 14.6667ZM7.33537 10.6667L12.0487 5.95271L11.106 5.01004L7.33537 8.78137L5.44937 6.89537L4.50671 7.83804L7.33537 10.6667Z"/></svg>',
  }
</script>

<div class="lab-badge">
  {#key icon}
    <i class="lab-badge__icon">
      {@html icons[icon]}
    </i>
  {/key}

  <span class="lab-badge__text">{title}</span>
</div>

<style lang="scss">
    @use "assets/badge/styles";
</style>
