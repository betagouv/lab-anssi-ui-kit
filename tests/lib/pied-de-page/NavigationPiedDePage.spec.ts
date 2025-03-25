import { expect, it, describe, beforeEach, afterEach } from "vitest";
import NavigationPiedDePage from "$lib/pied-de-page/NavigationPiedDePage.svelte";
import { tick } from "svelte";

describe("Le composant de navigation de pied de page", () => {
  let composant: NavigationPiedDePage;

  beforeEach(() => {
    composant = new NavigationPiedDePage({
      target: document.body,
    });
  });

  afterEach(() => {
    composant.$destroy();
  });

  it("contient les liens", () => {
    expect(document.body.querySelector('a[href="/aPropos"]')).not.toBeNull();
    expect(document.body.querySelector('a[href="/mentionsLegales"]')).not.toBeNull();
    expect(document.body.querySelector('a[href="/confidentialite"]')).not.toBeNull();
    expect(document.body.querySelector('a[href="/cgu"]')).not.toBeNull();
    expect(document.body.querySelector('a[href="/statistiques"]')).not.toBeNull();
    expect(document.body.querySelector('a[href="/securite"]')).not.toBeNull();
    expect(document.body.querySelector('a[href="/accessibilite"]')).not.toBeNull();
  });

  it("peut afficher un état d'accessibilité conforme ou non", async () => {
    composant.$set({ conforme: true });
    await tick()
    expect(document.body.querySelector('a[href="/accessibilite"]')!.textContent).toBe(
      "Accessiblité: conforme",
    );

    composant.$set({ conforme: false });
    await tick()
    expect(document.body.querySelector('a[href="/accessibilite"]')!.textContent).toBe(
      "Accessiblité: non conforme",
    );
  });
});
