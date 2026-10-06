<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect, userEvent } from "storybook/test";
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
      slotDefault: {
        name: "default",
        description: "Contenu textuel de la transcription",
        control: false,
        table: { category: "Slots" },
      },
    },
    parameters: {
      docs: {
        description: {
          component:
            "[Voir la documentation du composant](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/transcription)",
        },
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

<Story
  name="Par défaut"
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-transcription");
    const shadow = el?.shadowRoot;

    await step("Le bouton Transcription est affiché", async () => {
      const button = shadow?.querySelector(".fr-transcription__btn");

      await expect(button?.textContent?.trim()).toBe("Transcription");
    });

    await step("Le contenu est fermé par défaut", async () => {
      const button = shadow?.querySelector(".fr-transcription__btn");
      const collapse = shadow?.querySelector(".fr-collapse");

      await expect(button?.getAttribute("aria-expanded")).toBe("false");
      await expect(collapse?.classList.contains("fr-collapse--expanded")).toBe(false);
    });

    await step("Le clic sur le bouton ouvre la transcription", async () => {
      const button = shadow?.querySelector(".fr-transcription__btn") as HTMLElement;

      await userEvent.click(button);

      const collapse = shadow?.querySelector(".fr-collapse");

      await expect(button.getAttribute("aria-expanded")).toBe("true");
      await expect(collapse?.classList.contains("fr-collapse--expanded")).toBe(true);
    });
  }}
/>
