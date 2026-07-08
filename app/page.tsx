import { boards } from "@/lib/boards";
import { fetchRedditBoards, postKeys } from "@/lib/reddit";
import Gallery from "./gallery";

// Re-check r/Hiddenpcbeggs for new posts every 30 minutes.
export const revalidate = 1800;

export default async function Home() {
  const reddit = await fetchRedditBoards();
  const curated = new Set(boards.flatMap((b) => postKeys(b.link)));
  const fresh = reddit.filter(
    (b) => !postKeys(b.link).concat(postKeys(b.image)).some((k) => curated.has(k))
  );
  return <Gallery boards={[...fresh, ...boards]} />;
}
