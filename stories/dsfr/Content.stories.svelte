<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import Placeholder from "@gouvfr/dsfr/example/img/placeholder.16x9.png";
  import svg from "/static/images/gouvernement.svg?raw";

  import DsfrContent from "$lib/dsfr/DsfrContent.svelte";

  const { Story } = defineMeta({
    title: "Composants/dsfr/Content Media",
    component: DsfrContent,
    argTypes: {
      size: {
        control: { type: "select" },
        description: "Taille du contenu média",
        options: ["sm", "md", "lg"],
      },
      caption: {
        control: "text",
        description: "Texte de description ou source",
        type: {
          value: "string",
        },
      },
      hasLink: {
        control: "boolean",
        description: "Ajoute un lien à la suite du texte de description",
      },
      linkLabel: {
        if: { arg: "hasLink", eq: true },
        control: "text",
        description: "Libellé du lien",
        type: {
          value: "string",
        },
      },
      linkHref: {
        if: { arg: "hasLink", eq: true },
        control: "text",
        description: "URL de destination du lien",
        type: {
          value: "string",
        },
      },
      type: {
        control: { type: "select" },
        description: "Type de contenu",
        options: ["img", "svg", "video"],
      },
      imgRatio: {
        if: { arg: "type", eq: "img" },
        control: { type: "select" },
        description: "Ratio de l’image",
        options: ["32x9", "16x9", "3x2", "4x3", "1x1", "3x4", "2x3"],
      },
      vidRatio: {
        if: { arg: "type", eq: "video" },
        control: { type: "select" },
        description: "Ratio de la vidéo",
        options: ["16x9", "4x3", "1x1"],
      },
      img: {
        if: { arg: "type", eq: "img" },
        control: { type: "object" },
        description: "Image",
      },
      svg: {
        if: { arg: "type", eq: "svg" },
        control: { type: "object" },
        description: "SVG",
      },
      vid: {
        if: { arg: "type", eq: "video" },
        control: { type: "object" },
        description: "Vidéo",
      },
    },
    args: {
      size: "md",
      caption: "Description / Source",
      hasLink: false,
      linkLabel: "Libellé du lien",
      linkHref: "#",
      type: "img",
      imgRatio: "16x9",
      vidRatio: "16x9",
      img: {
        src: Placeholder,
        alt: " ",
      },
      vid: {
        src: "https://www.youtube.com/embed/HyirpmPL43I",
        title: "[À MODIFIER - titre de la vidéo]",
        attributes: {
          allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
          allowfullscreen: "",
        },
      },
      svg: svg,
    },
    render: template,
  });

  type Args = ComponentProps<DsfrContent>;
</script>

{#snippet template(args: Args)}
  <dsfr-content
    size={args.size}
    caption={args.caption}
    has-link={args.hasLink || undefined}
    link-label={args.linkLabel}
    link-href={args.linkHref}
    type={args.type}
    img-ratio={args.imgRatio}
    vid-ratio={args.vidRatio}
    img={args.img}
    vid={args.vid}
    svg={args.svg}
  ></dsfr-content>
{/snippet}

<Story name="Défaut" />
