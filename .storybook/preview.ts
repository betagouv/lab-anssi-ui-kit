import type { Preview, SvelteRenderer } from "@storybook/svelte";
import { withThemeByClassName } from "@storybook/addon-themes";

import "./styles.fonts.css";
import "./styles.themes.css";

const preview: Preview = {
  decorators: [
    withThemeByClassName<SvelteRenderer>({
      themes: {
        MonServiceSécurisé: "theme-mss",
        MonAideCyber: "theme-mac",
        MesServicesCyber: "theme-msc",
        MonEspaceNIS2: "theme-men2",
      },
      defaultTheme: "MonServiceSécurisé",
    }),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ["autodocs"],
};

export default preview;
