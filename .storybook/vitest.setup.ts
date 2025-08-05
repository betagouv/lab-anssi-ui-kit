import * as a11yAddonAnnotations from "@storybook/addon-a11y/preview";
import { setProjectAnnotations } from "@storybook/sveltekit";
import * as projectAnnotations from "./preview";

// Il s'agit d'une étape importante pour appliquer la bonne configuration lorsque vous testez vos histoires.
// Plus d'informations à l'adresse suivante: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
setProjectAnnotations([a11yAddonAnnotations, projectAnnotations]);
