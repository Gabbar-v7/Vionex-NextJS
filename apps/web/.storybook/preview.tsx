import type { Preview } from '@storybook/nextjs-vite'
import { inter, geistSans, geistMono } from "../app/fonts"
import { cn } from "../lib/utils"
import "../app/globals.css"

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className={cn("h-full antialiased", inter.variable, geistSans.variable, geistMono.variable, "font-sans")}>
        <Story />
      </div>
    )
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
      test: 'todo'
    }
  },
};

export default preview;