# CLAUDE.md

## Git workflow

- Коммить и пушь после каждой важной точки (завершённая фича, рабочий билд, значимое изменение)
- Для больших фич — создавай feature-ветку, работай в ней, сливай в main по завершении, затем пуш main
- Коммит-сообщения: краткие, на английском, формат `feat:`, `fix:`, `docs:`, `refactor:`

## Project structure

- Путь view = URL: `aton/telegram-messenger/index.html` → `zevaeva.github.io/aton/telegram-messenger/`
- Дизайн-системы в `projects/{name}/`, view entry points в `{name}/{view}/`
- Статика в `public/`, импортируемый код в `shared/`
- Алиасы: `@aton` → `projects/aton`, `@shared` → `shared/`

## Tech

- pnpm, Vite 8, React 19, TypeScript, Tailwind CSS 4
- Один package.json в корне, все deps общие
- `pnpm dev` / `pnpm build` / `pnpm preview`
