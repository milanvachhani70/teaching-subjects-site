# Teaching Subjects Website

This folder contains a GitHub Pages-ready website that lets you host multiple subject HTML decks in one place.

## Current subject

- `MEM23007A` calculus deck is already added.

## Folder structure

```text
teaching-subjects-site/
  index.html
  styles.css
  app.js
  subjects/
    manifest.js
    mem23007/
      index.html
      assets/
```

## How to add another subject

1. Create a new folder inside `subjects/`, for example `subjects/new-subject/`.
2. Put that subject's HTML deck inside the folder as `index.html`.
3. Copy any related images or assets into the same folder.
4. Add one more object to `subjects/manifest.js`.

Example:

```js
{
  id: "physics-motion",
  code: "PHY101",
  title: "Motion And Forces",
  description: "Interactive HTML deck for classroom teaching.",
  category: "Physics",
  classes: "3 x 1-hour classes",
  level: "Introductory unit",
  slideCount: 52,
  entry: "./subjects/physics-motion/index.html"
}
```

## GitHub Pages recommendation

For the simplest setup, publish this folder in a GitHub repository and enable GitHub Pages from the `main` branch root.
