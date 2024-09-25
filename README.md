## Overview

This aims to establish a vue baseline kickstart project that contains below features:

- pwa
- tailwindcss
- i18n
- idb
- signalr
- localpdf
- vue computed show case

No backend involved.

## Setup

```bash
npm create vite@latest ddtapefe -- --template vue-ts
npm install vue-router@4 vue-i18n@10
npm install -D tailwindcss postcss autoprefixer
npm i
npx tailwindcss init --ts -p
npx vite build --base=/ddtape/
```

Edit style.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Edit tailwind.config.ts

```typescript
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: []
} satisfies Config
```

Edit `main.ts`

```typescript
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  // something vue-i18n options here ...
})

const app = createApp({
  // something vue options here ...
})

app.use(i18n)
app.mount('#app')
```

## Notes on keybinding for Force format

```json
[
  {
    "key": "ctrl+alt+f",
    "command": "prettier.forceFormatDocument",
    "when": "editorIsOpen"
  }
]
```
