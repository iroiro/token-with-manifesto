export const parameters = {
  layout: "fullscreen",
  actions: { argTypesRegex: "^on[A-Z].*" },
}

import React from "react"
import { StylesProvider } from "@material-ui/styles"
import { ThemeProvider } from "@material-ui/core/styles"
import { theme } from "../src/components/util/style/theme"

export const decorators = [
  (Story) => (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    </StylesProvider>
  ),
]
