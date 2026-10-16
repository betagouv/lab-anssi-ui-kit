import pictogramData from "@gouvfr/dsfr/.config/pictogram.json";

type PictogramEntry = { name: string; category: string; path: string };

const categoryMap = new Map<string, string>(
  (pictogramData as PictogramEntry[]).map((p) => [p.name, p.category]),
);

export function getPictogramPath(name: string): string | undefined {
  const category = categoryMap.get(name);
  if (!category) return undefined;
  return `artwork/pictograms/${category}/${name}.svg`;
}
