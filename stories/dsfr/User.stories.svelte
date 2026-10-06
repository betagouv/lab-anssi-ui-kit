<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { expect, userEvent, waitFor } from "storybook/test";
  import { type ComponentProps } from "svelte";

  import DsfrUser from "$lib/dsfr/DsfrUser.svelte";
  import webComponentSourceCode from "../utilitaires/webComponentSource.js";

  const defaultLinks = [
    { label: "Mon profil utilisateur", icon: "account-line", href: "#profil" },
    { label: "Messagerie", icon: "mail-line", href: "#messagerie" },
    { label: "Notifications", icon: "notification-3-line", href: "#notifications", active: true },
    { label: "Paramètres du compte", icon: "settings-5-line", href: "#parametres" },
  ];

  const { Story } = defineMeta({
    title: "Composants/DSFR/User",
    component: DsfrUser,
    argTypes: {
      buttonKind: {
        control: { type: "select" },
        description: "Variante du bouton déclencheur",
        options: ["tertiary", "tertiary-no-outline"],
      },
      align: {
        control: { type: "select" },
        description: "Alignement du menu déroulant",
        options: ["left", "right"],
      },
      onlogout: {
        description: "Déclenché lors du clic sur le bouton de déconnexion.",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<void>" },
        },
        control: false,
      },
      onlinkclicked: {
        description:
          "Déclenché au clic sur un lien du menu utilisateur.<br>" +
          "`detail: { link: UserLink, index: number }`",
        table: {
          category: "Événements",
          type: { summary: "CustomEvent<{ link: UserLink, index: number }>" },
        },
        control: false,
      },
      slotLogout: {
        name: "logout",
        description:
          "Contenu personnalisé du bouton de déconnexion — remplace le `DsfrButton` généré par défaut lorsque `hasLogout` est `true`.",
        control: false,
        table: { category: "Slots" },
      },
    },
    args: {
      id: "user-menu",
      collapseId: "user-menu-collapse",
      buttonId: "user-menu-btn",
      buttonLabel: "Mon espace",
      buttonKind: "tertiary-no-outline",
      buttonIcon: "account-circle-fill",
      userName: "Libellé [Prénom Nom] utilisateur ",
      userEmail: "adresse-electronique@utilisateur.fr",
      links: defaultLinks,
      hasLogout: true,
      logoutLabel: "Se déconnecter",
    },
    parameters: {
      actions: { handles: ["logout", "linkclicked"] },
      docs: {
        source: {
          transform: webComponentSourceCode("dsfr-user"),
        },
      },
    },
    render: template,
  });

  type Args = ComponentProps<DsfrUser>;
</script>

{#snippet template(args: Args)}
  <dsfr-user
    id={args.id}
    collapse-id={args.collapseId}
    button-id={args.buttonId}
    button-label={args.buttonLabel}
    button-kind={args.buttonKind}
    button-icon={args.buttonIcon}
    disabled={args.disabled || undefined}
    align={args.align}
    user-name={args.userName}
    user-email={args.userEmail}
    links={args.links}
    has-logout={args.hasLogout || undefined}
    logout-label={args.logoutLabel}
  ></dsfr-user>
{/snippet}

<Story
  name="Par défaut"
  play={async ({ args, canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-user");
    const shadow = el?.shadowRoot;
    const linksData = (args as unknown as { links: unknown[] }).links ?? [];

    await step("Le bouton déclencheur affiche le libellé", async () => {
      const button = shadow?.querySelector(".fr-user__btn");

      await expect(button?.textContent?.trim()).toBe(args.buttonLabel);
    });

    await step("Le clic ouvre le menu utilisateur", async () => {
      const button = shadow?.querySelector(".fr-user__btn") as HTMLElement;

      await expect(button.getAttribute("aria-expanded")).toBe("false");

      await userEvent.click(button);

      await expect(button.getAttribute("aria-expanded")).toBe("true");

      const collapse = shadow?.querySelector(".fr-collapse");

      await waitFor(() => expect(collapse?.classList.contains("fr-collapse--expanded")).toBe(true));
    });

    await step("Le menu contient les informations utilisateur", async () => {
      const userName = shadow?.querySelector(".fr-user__name");

      await expect(userName?.textContent?.trim()).toContain((args.userName as string)?.trim());

      const userEmail = shadow?.querySelector(".fr-user__email");

      await expect(userEmail?.textContent?.trim()).toBe(args.userEmail);
    });

    await step("Les liens de navigation correspondent aux données", async () => {
      const links = shadow?.querySelectorAll(".fr-user__link");

      await expect(links?.length).toBe(linksData.length);
    });

    await step("Le bouton de déconnexion est présent", async () => {
      const logoutBtn = shadow?.querySelector(".fr-user__logout .fr-btn");

      await expect(logoutBtn).toBeTruthy();
      await expect(logoutBtn?.textContent?.trim()).toBe("Se déconnecter");
    });
  }}
/>

<Story
  name="Sans texte d'information"
  args={{
    id: "user-menu-no-info",
    collapseId: "user-menu-no-info-collapse",
    userName: undefined,
    userEmail: undefined,
  }}
/>

<Story
  name="Sans bouton de déconnexion"
  args={{
    id: "user-menu-no-logout",
    collapseId: "user-menu-no-logout-collapse",
    hasLogout: false,
  }}
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-user");
    const shadow = el?.shadowRoot;

    await step("Le bouton de déconnexion est absent", async () => {
      const logout = shadow?.querySelector(".fr-user__logout");

      await expect(logout).toBeNull();
    });
  }}
/>

<Story
  name="Désactivé"
  args={{
    id: "user-menu-disabled",
    collapseId: "user-menu-disabled-collapse",
    disabled: true,
  }}
  play={async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector("dsfr-user");
    const shadow = el?.shadowRoot;

    await step("Le bouton déclencheur est désactivé", async () => {
      const button = shadow?.querySelector(".fr-user__btn") as HTMLButtonElement;

      await expect(button?.disabled).toBe(true);
    });
  }}
/>
