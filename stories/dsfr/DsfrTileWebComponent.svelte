<script lang="ts">
  interface Props {
    title: string;
    hasDescription?: boolean;
    description?: string;
    hasDetails?: boolean;
    details?: string;
    markupLevel?: 2 | 3 | 4 | 5;
    pictogramName?: string;
    hasBadge?: boolean;
    hasTag?: boolean;
    enlarge?: boolean;
    actionMarkup?: "a" | "button" | "false";
    href?: string;
    actionTitle?: string;
    noLink?: boolean;
    disabled?: boolean;
    blank?: boolean;
    download?: boolean;
    lang?: string;
    assess?: boolean;
    assessBytes?: boolean;
    size?: TileSize;
    horizontal?: boolean;
    verticalBreakpoint?: "false" | "md" | "lg";
    variations?: "none" | "grey" | "no-border" | "no-background" | "shadow";
  }

  let { title, hasDescription, description, hasDetails, details, markupLevel, pictogramName, hasBadge, hasTag, enlarge, actionMarkup, href, actionTitle, noLink, disabled, blank, download, lang, assess, assessBytes, size, horizontal, verticalBreakpoint, variations }: Props = $props();
</script>

<dsfr-tile
  {title}
  has-description={hasDescription}
  {description}
  has-details={hasDetails}
  {details}
  markup-level={markupLevel}
  pictogram-name={pictogramName}
  has-badge={hasBadge}
  has-tag={hasTag}
  {enlarge}
  action-markup={actionMarkup}
  {href}
  action-title={actionTitle}
  no-link={noLink}
  {disabled}
  {blank}
  {download}
  {lang}
  {assess}
  assess-bytes={assessBytes}
  {size}
  {horizontal}
  vertical-breakpoint={verticalBreakpoint}
  {variations}
></dsfr-tile>
