<svelte:options
  customElement={{
    tag: "lab-anssi-tabs",
    props: {
      tabs: { reflect: false, type: "Array", attribute: "tabs" },
    },
  }}
/>

<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  export let tabs: { label: string; lien: string; active?: boolean }[];

  let activeTabs = [...tabs];
  let observer: IntersectionObserver;

  const scrollToSection = (event: Event, lien: string) => {
    event.preventDefault();
    const targetElement = document.getElementById(lien);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  onMount(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const lien = entry.target.id;
            activeTabs = tabs.map((tab) => ({
              ...tab,
              active: tab.lien === lien,
            }));
          }
        });
      },
      { rootMargin: "-20% 0% -70% 0%" },
    );

    activeTabs.forEach((tab) => {
      const element = document.getElementById(tab.lien);
      if (element) observer.observe(element);
    });
  });

  onDestroy(() => {
    if (observer) observer.disconnect();
  });
</script>

<nav class="tabs" aria-label="Navigation des onglets">
  <div class="tabs-content">
    <div class="tabs-items">
      {#each activeTabs as item}
        <a
          href={`#${item.lien}`}
          class="tabs-item"
          class:active={item.active}
          aria-current={item.active ? "page" : undefined}
          tabindex="0"
          on:click={(e) => scrollToSection(e, item.lien)}
        >
          {item.label}
        </a>
      {/each}
    </div>
  </div>
</nav>

<style lang="scss">
  @import "apparence-tabs.scss";
</style>
