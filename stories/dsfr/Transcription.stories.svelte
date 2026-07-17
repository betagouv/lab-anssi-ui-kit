<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import {
    transcriptionArgTypes,
    transcriptionArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/transcription/template/stories/transcription-arg-types.js";

  import DsfrTranscription from "$lib/dsfr/DsfrTranscription.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Transcription",
    component: DsfrTranscription,
    args: transcriptionArgs,
    argTypes: {
      ...transcriptionArgTypes,
      default: {
        description: "Contenu textuel de la transcription",
        control: false,
        table: { category: "Slots" },
      },
    },
    parameters: {
      docs: {
        source: {
          transform: webComponentSourceCode("dsfr-transcription"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrTranscription>;
</script>

{#snippet template(args: Args)}
  <dsfr-transcription
    id={args.id}
    is-expanded={args.isExpanded || undefined}
    fullscreen={args.fullscreen}
    fullscreen-aria-label={args.fullscreenAriaLabel}
  >
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing, incididunt, ut labore et dolore magna
      aliqua. Vitae sapien pellentesque habitant morbi tristique senectus et. Diam maecenas sed enim
      ut. Accumsan lacus vel facilisis volutpat est. Ut aliquam purus sit amet luctus. Lorem ipsum
      dolor sit amet consectetur adipiscing elit ut.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing, incididunt, ut labore et dolore magna
      aliqua. Vitae sapien pellentesque habitant morbi tristique senectus et. Diam maecenas sed enim
      ut. Accumsan lacus vel facilisis volutpat est. Ut aliquam purus sit amet luctus. Lorem ipsum
      dolor sit amet consectetur adipiscing elit ut.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing, incididunt, ut labore et dolore magna
      aliqua. Vitae sapien pellentesque habitant morbi tristique senectus et. Diam maecenas sed enim
      ut. Accumsan lacus vel facilisis volutpat est. Ut aliquam purus sit amet luctus. Lorem ipsum
      dolor sit amet consectetur adipiscing elit ut.
    </p>
  </dsfr-transcription>
{/snippet}

<Story name="Defaut" />
