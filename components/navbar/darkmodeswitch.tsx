import React from "react";
import { useTheme as useNextTheme } from "next-themes";
import { Switch, useTheme } from "@nextui-org/react";

export const DarkModeSwitch = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();
  return (
    <Switch
      css={{
        "& .nextui-switch-checked": {
          backgroundColor: isDark ? "#029DBB" : "lightgrey",
        },
      }}
      checked={isDark}
      onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
    />
  );
};
