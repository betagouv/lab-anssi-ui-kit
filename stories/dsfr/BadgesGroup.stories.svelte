<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect } from "storybook/test";
  import { type ComponentProps } from "svelte";

  import {
    badgesGroupArgTypes,
    badgesGroupArgs,
  } from "@gouvfr/dsfr/src/dsfr/component/badge/template/stories/badges-group-arg-types.js";

  import DsfrBadgesGroup from "$lib/dsfr/DsfrBadgesGroup.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const { Story } = defineMeta({
    title: "Composants/DSFR/Badges Group",
    component: DsfrBadgesGroup,
    argTypes: badgesGroupArgTypes,
    args: badgesGroupArgs,
    parameters: {
      docs: {
        description: {
          component:
            "Le composant badge permet de mettre en avant une information de type “statut” ou “état” sur un élément du site.<br/>[Voir la documentation du composant sur le site du DSFR.](https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/badge)",
        },
        source: {
          transform: webComponentSourceCode("dsfr-badges-group"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrBadgesGroup>;
</script>

{#snippet template(args: Args)}
  <dsfr-badges-group badges={args.badges} size={args.size} group-markup={args.groupMarkup}
  ></dsfr-badges-group>
{/snippet}

<Story
  name="Par défaut"
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-badges-group");
    const shadow = el?.shadowRoot;

    await step("Le groupe est rendu avec le bon nombre de badges", async () => {
      const group = shadow?.querySelector(".fr-badges-group");
      await expect(group).toBeTruthy();

      const badgesData =
        (args as unknown as { badges: { label: string; accent?: string }[] }).badges ?? [];
      const badges = shadow?.querySelectorAll("p.fr-badge");
      await expect(badges?.length).toBe(badgesData.length);
    });

    await step("Chaque badge affiche le bon label", async () => {
      const badgesData =
        (args as unknown as { badges: { label: string; accent?: string }[] }).badges ?? [];
      const badges = shadow?.querySelectorAll("p.fr-badge");

      for (let i = 0; i < badgesData.length; i++) {
        await expect(badges?.[i]?.textContent?.trim()).toBe(badgesData[i].label);
      }
    });

    await step("Chaque badge avec un accent a la classe correspondante", async () => {
      const badgesData =
        (args as unknown as { badges: { label: string; accent?: string }[] }).badges ?? [];
      const badges = shadow?.querySelectorAll("p.fr-badge");

      for (let i = 0; i < badgesData.length; i++) {
        if (badgesData[i].accent) {
          await expect(badges?.[i]?.classList.contains(`fr-badge--${badgesData[i].accent}`)).toBe(
            true,
          );
        }
      }
    });
  }}
/>

<Story
  name="Taille MD"
  args={{
    size: "md",
    badges: [
      {
        label: "libellé badge 1",
        type: "accent",
        accent: "green-bourgeon",
        hasIcon: false,
        hasNoIcon: false,
        ellipsis: false,
      },
      {
        label: "libellé badge 2",
        type: "accent",
        accent: "green-menthe",
        hasIcon: false,
        hasNoIcon: false,
        ellipsis: false,
      },
      {
        label: "libellé badge 3",
        type: "accent",
        accent: "blue-ecume",
        hasIcon: false,
        hasNoIcon: false,
        ellipsis: false,
      },
    ],
  }}
/>

<Story
  name="Taille SM"
  args={{
    size: "sm",
    badges: [
      {
        label: "libellé badge 1",
        type: "accent",
        accent: "green-bourgeon",
        hasIcon: false,
        hasNoIcon: false,
        ellipsis: false,
      },
      {
        label: "libellé badge 2",
        type: "accent",
        accent: "green-menthe",
        hasIcon: false,
        hasNoIcon: false,
        ellipsis: false,
      },
      {
        label: "libellé badge 3",
        type: "accent",
        accent: "blue-ecume",
        hasIcon: false,
        hasNoIcon: false,
        ellipsis: false,
      },
    ],
  }}
/>
