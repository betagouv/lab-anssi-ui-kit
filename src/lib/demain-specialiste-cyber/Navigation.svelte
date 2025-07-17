<script lang="ts">
  export let id: string;
  export let ariaLabel: string;

  interface NavItem {
    title: string;
    href: string;
    current?: boolean;
  }
  export let items: NavItem[];
</script>

<nav class="fr-nav" {id} role="navigation" aria-label={ariaLabel}>
  <ul class="fr-nav__list">
    {#each items as item}
      <li class="fr-nav__item">
        <a
          id={`nav-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
          type="link"
          href={item.href}
          class="fr-nav__link"
          aria-current={item.current ? "page" : undefined}
        >
          {item.title}
        </a>
      </li>
    {/each}
  </ul>
</nav>
