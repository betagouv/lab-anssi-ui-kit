import { describe, expect, it } from "vitest";
import { convertisProprietesTypesEnString } from "../../outils/vite-plugin-genere-jsx.js";

describe("Transformation des propriétés svelte", () => {
  describe("en propriétés JSX", () => {
    it("pour une propriété simple", () => {
      const propriete: string = "titre: string;";
      const proprieteFormatee = convertisProprietesTypesEnString(propriete);
      expect(proprieteFormatee).toBe('"titre": string');
    });

    it("pour une propriété en camelCase", () => {
      const propriete: string = "sousTitre: string;";
      const proprieteFormatee = convertisProprietesTypesEnString(propriete);
      expect(proprieteFormatee).toBe('"sous-titre": string');
    });

    it("pour une propriété optionelle", () => {
      const propriete: string = "titre?: string;";
      const proprieteFormatee = convertisProprietesTypesEnString(propriete);
      expect(proprieteFormatee).toBe('"titre"?: string');
    });

    it("avec un format étrange", () => {
      const propriete: string = "        titre: string;";
      const proprieteFormatee = convertisProprietesTypesEnString(propriete);
      expect(proprieteFormatee).toBe('"titre": string');
    });

    it("avec un type complexe", () => {
      const propriete: string = "titre: Image;";
      const proprieteFormatee = convertisProprietesTypesEnString(propriete);
      expect(proprieteFormatee).toBe('"titre": string');
    });
  });
});
