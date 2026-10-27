import { expect, test } from "vitest";

test("conserve le premier constructeur enregistré par deux bundles", async () => {
  const nomWebComponent = "test-enregistrement-idempotent";
  const { default: premierComposant } =
    await import("./ComposantAvecEnregistrementIdempotent.svelte");
  const constructeurEnregistre = customElements.get(nomWebComponent);

  expect(constructeurEnregistre).toBe(premierComposant.element);

  const { default: secondComposant } =
    await import("./SecondComposantAvecEnregistrementIdempotent.svelte");

  expect(secondComposant.element).not.toBe(constructeurEnregistre);
  expect((secondComposant.element as CustomElementConstructor & { origine: string }).origine).toBe(
    "second-composant",
  );
  expect(customElements.get(nomWebComponent)).toBe(constructeurEnregistre);
});
