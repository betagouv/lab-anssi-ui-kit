<script lang="ts">
  interface Props {
    src?: string;
    alt?: "string";
    id?: string;
    title?: string;
    hasDescription?: boolean;
    description?: string;
    hasDetailStart?: boolean;
    detailStart?: string;
    hasDetailStartIcon?: boolean;
    detailStartIcon?: string;
    hasDetailEnd?: boolean;
    detailEnd?: string;
    hasDetailEndIcon?: boolean;
    detailEndIcon?: string;
    hasBadge?: boolean;
    hasTag?: boolean;
    markup?: "h2" | "h3" | "h4" | "h5";
    enlarge?: boolean;
    actionMarkup?: "a" | "button";
    actionTitle?: string;
    href?: string;
    blank?: boolean;
    noLink?: boolean;
    disabled?: boolean;
    size?: CardSize;
    horizontal?: boolean;
    horizontalProportion?: "default" | "tier" | "half";
    hasHeaderBadge?: boolean;
    imageRatio?: "default" | "32x9" | "3x2" | "4x3" | "1x1" | "3x4" | "2x3";
    hasButtons?: boolean;
    hasLinks?: boolean;
    variations?: "none" | "grey" | "no-border" | "no-background" | "shadow";
    download?: boolean;
    hasDownloadIcon?: boolean;
    lang?: string;
  }

  let { src, alt, id, title, hasDescription, description, hasDetailStart, detailStart, hasDetailStartIcon, detailStartIcon, hasDetailEnd, detailEnd, hasDetailEndIcon, detailEndIcon, hasBadge, hasTag, markup, enlarge, actionMarkup, actionTitle, href, blank, noLink, disabled, size, horizontal, horizontalProportion, hasHeaderBadge, imageRatio, hasButtons, hasLinks, variations, download, hasDownloadIcon, lang }: Props = $props();
</script>

<dsfr-card
  {src}
  {alt}
  {id}
  {title}
  has-description={hasDescription}
  {description}
  has-detail-start={hasDetailStart}
  detail-start={detailStart}
  has-detail-start-icon={hasDetailStartIcon}
  detail-start-icon={detailStartIcon}
  has-detail-end={hasDetailEnd}
  detail-end={detailEnd}
  has-detail-end-icon={hasDetailEndIcon}
  detail-end-icon={detailEndIcon}
  has-badge={hasBadge}
  has-tag={hasTag}
  {markup}
  {enlarge}
  action-markup={actionMarkup}
  action-title={actionTitle}
  {href}
  {blank}
  no-link={noLink}
  {disabled}
  {size}
  {horizontal}
  horizontal-proportion={horizontalProportion}
  has-header-badge={hasHeaderBadge}
  image-ratio={imageRatio}
  has-buttons={hasButtons}
  has-links={hasLinks}
  {variations}
  {download}
  has-download-icon={hasDownloadIcon}
  {lang}
></dsfr-card>
