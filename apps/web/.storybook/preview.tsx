import type { Preview } from '@storybook/nextjs-vite'
import { fontClassNames } from "../app/fonts"
import "../app/globals.css"
import { useEffect } from 'react'

const preview: Preview = {
  decorators: [
    (Story) => {
      useEffect(() => {
        document.body.classList.add(
          ...fontClassNames
            .split(' ')
            .filter(Boolean)
        )
      }, [])

      return <Story />
    }
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