import { addons, types, useStorybookState } from "storybook/manager-api";
import themeANSSI from "./anssi.theme";

// @ts-expect-error React is provided by Storybook's manager runtime
import React from "react";

addons.setConfig({
  theme: themeANSSI,
});

const SLOT_BASED_TAG = "Avec slots";

const SlotBasedBadge = () => {
  const state = useStorybookState();
  const entry = state.storyId ? state.index?.[state.storyId] : null;

  if (!entry || !("tags" in entry) || !entry.tags?.includes(SLOT_BASED_TAG)) {
    return null;
  }

  return React.createElement(
    "span",
    {
      style: {
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 8px",
        fontSize: "11px",
        fontWeight: 600,
        borderRadius: "4px",
        backgroundColor: "#c3fad5",
        color: "#297254",
        lineHeight: "1",
      },
    },
    SLOT_BASED_TAG,
  );
};

addons.register("slot-based-indicator", () => {
  addons.add("slot-based-indicator/tool", {
    type: types.TOOL,
    title: SLOT_BASED_TAG,
    render: SlotBasedBadge,
  });
});
