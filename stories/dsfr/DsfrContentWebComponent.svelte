<script lang="ts">
  interface Props {
    size?: Size;
    caption?: string;
    hasLink?: boolean;
    linkLabel?: string;
    linkHref?: string;
    type?: "img" | "svg" | "video";
    imgRatio?: "32x9" | "16x9" | "3x2" | "4x3" | "1x1" | "3x4" | "2x3";
    vidRatio?: "16x9" | "4x3" | "1x1";
    img?: Image;
    vid?: Video;
    svg?: string;
  }

  let { size, caption, hasLink, linkLabel, linkHref, type, imgRatio, vidRatio, img, vid, svg }: Props = $props();
</script>

<dsfr-content
  {size}
  {caption}
  has-link={hasLink}
  link-label={linkLabel}
  link-href={linkHref}
  {type}
  img-ratio={imgRatio}
  vid-ratio={vidRatio}
  {img}
  {vid}
  {svg}
></dsfr-content>
