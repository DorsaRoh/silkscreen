# Silkscreen

A public gallery of the hidden messages engineers leave on circuit boards.

Next.js (App Router, TypeScript), no other dependencies.

## Run it

```sh
npm install
npm run dev
```

Then open http://localhost:3000.

## Add a board

1. Drop the photo into `public/images/`
2. Add an entry to the top of the `boards` array in `lib/boards.ts`:

```ts
{
  image: "my-board.jpg",       // filename in public/images/
  message: "The hidden text",  // transcription (optional)
  device: "IT-402M",           // what board it's from (optional)
  credit: "@someone",          // who found it (optional)
  link: "https://…",           // source URL (optional)
}
```
