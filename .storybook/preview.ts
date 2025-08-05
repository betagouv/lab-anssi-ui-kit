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

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
  tags: ["autodocs"],
};

export default preview;
