<script lang="ts">
  interface Props {
    pages: PageLink[];
    hasFirstAndLast?: boolean;
    first?: PageLink;
    last?: PageLink;
    firstAndLastDisplayedLg?: boolean;
    hasPrevAndNext?: boolean;
    prev?: PageLink;
    next?: PageLink;
    prevAndNextDisplayedLg?: boolean;
    prevAndNextHasLgLabel?: boolean;
    currentPageIndex?: number;
  }

  let { pages, hasFirstAndLast, first, last, firstAndLastDisplayedLg, hasPrevAndNext, prev, next, prevAndNextDisplayedLg, prevAndNextHasLgLabel, currentPageIndex }: Props = $props();
</script>

<dsfr-pagination
  {pages}
  has-first-and-last={hasFirstAndLast}
  {first}
  {last}
  first-and-last-displayed-lg={firstAndLastDisplayedLg}
  has-prev-and-next={hasPrevAndNext}
  {prev}
  {next}
  prev-and-next-displayed-lg={prevAndNextDisplayedLg}
  prev-and-next-has-lg-label={prevAndNextHasLgLabel}
  current-page-index={currentPageIndex}
></dsfr-pagination>
