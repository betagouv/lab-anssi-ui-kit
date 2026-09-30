<script module lang="ts">
  import { expect, fn, userEvent } from "storybook/test";
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { type ComponentProps } from "svelte";

  import Reactions from "$lib/composants/Reactions.svelte";

  const { Story } = defineMeta({
    title: "Composants/Lab ANSSI/Reactions",
    component: Reactions,
    args: {
      reactions: [
        { id: "1", emoji: "🔥", compteur: 9 },
        { id: "2", emoji: "❤️", compteur: 12, actif: true },
        { id: "3", emoji: "👍", compteur: 34 },
      ],
      variant: "tertiaire-sans-bordure",
      tooltipTexte: "Ajouter une réaction",
      tooltipId: "tooltipReactions",
    },
    argTypes: {
      onajouteReaction: {
        description: "Déclenché lorsqu'une réaction est ajoutée.<br>" + "`detail: string`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<string>" },
        },
        control: false,
      },
      onsupprimeReaction: {
        description: "Déclenché lorsqu'une réaction est retirée.<br>" + "`detail: string`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<string>" },
        },
        control: false,
      },
    },
    parameters: {
      actions: { handles: ["ajouteReaction", "supprimeReaction"] },
      layout: "centered",
    },
    render: template,
  });

  type Args = ComponentProps<Reactions>;
</script>

{#snippet template(args: Args)}
  <lab-anssi-reactions
    reactions={args.reactions}
    variant={args.variant}
    tooltip-texte={args.tooltipTexte}
    tooltip-id={args.tooltipId}
  ></lab-anssi-reactions>
{/snippet}

<Story
  name="Par défaut"
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("lab-anssi-reactions");
    type Reaction = { id: string; emoji: string; compteur?: number | null; actif?: boolean };
    const reactionsArgs = ((args as Record<string, unknown>).reactions ?? []) as Reaction[];
    const reactionsAvecCompteur = reactionsArgs.filter((r) => r.compteur);
    const reactionsActives = reactionsArgs.filter((r) => r.actif);

    await step("Le composant est rendu", async () => {
      await expect(el?.shadowRoot).toBeTruthy();
    });

    await step("Les boutons de réaction sont rendus", async () => {
      const conteneur = el?.shadowRoot?.querySelector(
        ".lab-anssi-reactions > .lab-anssi-reactions__conteneur",
      );
      const boutons = conteneur?.querySelectorAll(".lab-anssi-reactions__bouton");

      await expect(boutons?.length).toBe(reactionsAvecCompteur.length);
    });

    await step("Les compteurs de réaction sont affichés", async () => {
      const compteurs = el?.shadowRoot?.querySelectorAll(".lab-anssi-reactions__compteur");

      for (let i = 0; i < reactionsAvecCompteur.length; i++) {
        await expect(compteurs?.[i]?.textContent?.trim()).toBe(
          String(reactionsAvecCompteur[i].compteur),
        );
      }
    });

    await step("Le bouton d'ajout de réaction est présent", async () => {
      const trigger = el?.shadowRoot?.querySelector("button[popovertarget]");

      await expect(trigger).toBeTruthy();
    });

    await step("Les réactions actives ont l'attribut aria-pressed", async () => {
      const pressed = el?.shadowRoot?.querySelectorAll(
        '.lab-anssi-reactions > .lab-anssi-reactions__conteneur [aria-pressed="true"]',
      );

      await expect(pressed?.length).toBe(reactionsActives.length);
    });

    await step("Le clic sur une réaction inactive émet l'événement ajouteReaction", async () => {
      const spy = fn();
      el?.addEventListener("ajouteReaction", spy);

      const boutons = el?.shadowRoot?.querySelectorAll<HTMLButtonElement>(
        ".lab-anssi-reactions > .lab-anssi-reactions__conteneur > .lab-anssi-reactions__bouton",
      );
      const boutonInactif = Array.from(boutons ?? []).find(
        (b) => b.getAttribute("aria-pressed") === "false",
      );

      await userEvent.click(boutonInactif!);

      await expect(spy).toHaveBeenCalledOnce();

      el?.removeEventListener("ajouteReaction", spy);
    });

    await step("Le clic sur une réaction active émet l'événement supprimeReaction", async () => {
      const spy = fn();
      el?.addEventListener("supprimeReaction", spy);

      const boutons = el?.shadowRoot?.querySelectorAll<HTMLButtonElement>(
        ".lab-anssi-reactions > .lab-anssi-reactions__conteneur > .lab-anssi-reactions__bouton",
      );
      const boutonActif = Array.from(boutons ?? []).find(
        (b) => b.getAttribute("aria-pressed") === "true",
      );

      await userEvent.click(boutonActif!);

      await expect(spy).toHaveBeenCalledOnce();

      el?.removeEventListener("supprimeReaction", spy);
    });
  }}
/>

<Story name="Variation tertiaire" args={{ variant: "tertiaire" }} />
