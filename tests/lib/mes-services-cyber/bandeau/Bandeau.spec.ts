import { expect, it, describe, beforeEach, afterEach } from "vitest";
import Bandeau from "$lib/mes-services-cyber/bandeau/Bandeau.svelte";
import { tick } from "svelte";

describe("Le composant du bandeau des MesServicesCyber", () => {
  let composant: Bandeau;

  beforeEach(async () => {
    localStorage.clear();
  });

  afterEach(() => {
    composant.$destroy();
  });

  it("peut se fermer", async () => {
    composant = new Bandeau({
      target: document.body,
    });

    expect(document.body.textContent).toContain("Découvrez MesServicesCyber");
    const boutonFermeture = document.querySelector("button.fermer") as HTMLButtonElement;
    boutonFermeture.click();

    await tick();
    expect(document.body.textContent).not.toContain("Découvrez MesServicesCyber");
  });

  it("ne s'affiche pas si la variable est déjà présente dans le local storage", async () => {
    localStorage.setItem("lab-anssi-ui-kit-msc-bandeau-affichage", "invisible");

    composant = new Bandeau({
      target: document.body,
    });

    await tick();
    expect(document.body.textContent).not.toContain("Découvrez MesServicesCyber");
  });
});
