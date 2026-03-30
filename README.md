# zevaeva.github.io

Монорепо для UI-прототипов. Несколько проектов (ATON, Dana, ...), у каждого своя дизайн-система и набор независимых views. Каждый view — отдельное React-приложение с шарибельной ссылкой.

**Live:** `zevaeva.github.io`

## Стек

| | |
|---|---|
| React 19 + TypeScript | UI |
| Vite 8 | Сборка, dev-сервер, HMR |
| Tailwind CSS 4 | Стили |
| pnpm | Пакетный менеджер |
| GitHub Pages + Actions | Деплой |

## Быстрый старт

```bash
pnpm install
pnpm dev        # http://localhost:5173
```

## Структура

```
├── aton/                           # view entry points (путь = URL)
│   └── telegram-messenger/
│       ├── index.html              # точка входа
│       ├── main.tsx                # createRoot + импорт ДС
│       ├── App.tsx                 # корневой компонент
│       └── components/             # компоненты этого view
│
├── projects/                       # дизайн-системы (не URL-роуты)
│   └── aton/
│       ├── tokens.css              # CSS-токены (@theme)
│       ├── fonts.css               # @font-face
│       └── components/             # shared React-компоненты
│           ├── Button.tsx
│           ├── DeviceFrame.tsx
│           ├── StatusBar.tsx
│           └── index.ts            # barrel export
│
├── public/shared/                  # статика (копируется as-is в dist/)
│   └── figma-toolbar.js            # dev-only тулбар (?dev в URL)
│
├── specs/                          # спецификации
├── vite.config.ts                  # auto-discovery views
└── tsconfig.json                   # алиасы @aton, @shared
```

**Принцип:** путь к view в файловой системе = URL на сайте.
`aton/telegram-messenger/index.html` → `zevaeva.github.io/aton/telegram-messenger/`

## Добавить новый view

```bash
mkdir -p aton/portfolio
```

Создать три файла:

**`aton/portfolio/index.html`**
```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>ATON Portfolio</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="./main.tsx"></script>
  <script src="/shared/figma-toolbar.js"></script>
</body>
</html>
```

**`aton/portfolio/main.tsx`**
```tsx
import { createRoot } from 'react-dom/client'
import '@aton/tokens.css'
import '@aton/fonts.css'
import { App } from './App'

createRoot(document.getElementById('root')!).render(<App />)
```

**`aton/portfolio/App.tsx`**
```tsx
import { DeviceFrame } from '@aton/components'

export function App() {
  return (
    <DeviceFrame>
      {/* контент */}
    </DeviceFrame>
  )
}
```

`pnpm dev` — view подхватится автоматически на `/aton/portfolio/`.

## Добавить новый проект

```bash
mkdir -p projects/dana/components dana/first-view
```

1. Создать `projects/dana/tokens.css` с токенами дизайн-системы
2. Создать компоненты в `projects/dana/components/`
3. Создать view в `dana/first-view/` (аналогично шаблону выше)
4. Добавить алиас в `vite.config.ts` и `tsconfig.json`:

```ts
// vite.config.ts → resolve.alias
'@dana': resolve(import.meta.dirname, 'projects/dana'),
```
```json
// tsconfig.json → compilerOptions.paths
"@dana/*": ["./projects/dana/*"]
```

## Алиасы

| Алиас | Путь | Назначение |
|---|---|---|
| `@aton/*` | `projects/aton/*` | Дизайн-система ATON |
| `@dana/*` | `projects/dana/*` | Дизайн-система Dana |
| `@shared/*` | `shared/*` | Общие хуки, утилиты |

```tsx
import { Button, DeviceFrame } from '@aton/components'
```

## Зависимости

Один `package.json` в корне. Все пакеты общие для всех views.

```bash
pnpm add framer-motion     # доступен всем views
pnpm add three              # только view, который импортирует, получит в бандл
```

Vite tree-shakes неиспользуемое — пакет попадает только в бандл того view, который его импортирует.

## Оптимизация билда

- `vendor-react` выносится в отдельный чанк — загружается один раз, кешируется браузером
- Каждый view получает свой JS/CSS чанк
- Tailwind treeshake — только используемые классы

## Figma Toolbar

Dev-only тулбар для захвата экранов в Figma. Подключается в каждом view:

```html
<script src="/shared/figma-toolbar.js"></script>
```

Виден только с `?dev` в URL. Без параметра — чистая страница.

## Деплой

Автоматический на каждый push в `main`:

1. GitHub Actions запускает `pnpm install` + `pnpm build`
2. `dist/` деплоится на GitHub Pages

**Настройка GitHub:** Settings → Pages → Source: **GitHub Actions**

## Команды

| Команда | Назначение |
|---|---|
| `pnpm dev` | Dev-сервер с HMR |
| `pnpm build` | Production-сборка в `dist/` |
| `pnpm preview` | Просмотр production-билда локально |
