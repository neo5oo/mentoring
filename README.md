# Mentoring Website

Личный сайт-лендинг по менторству в системном анализе на Hugo.

## Стек

- Hugo
- Tailwind CSS
- JavaScript

## Структура

- `content/` — страницы (в т.ч. юридические документы)
- `data/` — контент секций главной в YAML
- `layouts/` — шаблоны сайта
- `assets/` — стили, скрипты, изображения
- `config/_default/hugo.yaml` — основная конфигурация

## Локальный запуск

```bash
npm install
npm run dev
```

Сайт будет доступен на `http://localhost:1313`.

## Прод-сборка

```bash
hugo --environment production --cleanDestinationDir
```

Результат сборки: папка `public/`.
