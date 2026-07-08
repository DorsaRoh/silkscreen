"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Board } from "@/lib/boards";

// Curated boards ship as filenames in public/images/; reddit-synced ones
// arrive as absolute URLs.
const src = (image: string) =>
  image.startsWith("http") ? image : `/images/${image}`;

// Stable per-board slug for shareable ?board= deep links: the image
// filename without extension (works for both local and i.redd.it images).
const slugOf = (b: Board) => {
  const base = b.image.split("?")[0];
  const m = base.match(/([A-Za-z0-9_-]+)\.\w+$/);
  return (m ? m[1] : base).toLowerCase();
};

// Boards pinned to a fixed flat grid slot, regardless of what the live
// Reddit feed prepends ahead of the curated list. At the default 3
// columns, column c holds flat indices c, c+3, c+6, ... in order, so
// "at: 0" = first card of column 1, "at: 1" = first card of column 2,
// "at: 5" = second card of column 3.
const PINS: { image: string; at: number }[] = [
  { image: "madeonearth.jpg", at: 0 },
  { image: "hobbit.jpg", at: 1 },
  { image: "it402m.jpg", at: 5 },
];

function withPins(boards: Board[]): Board[] {
  const pinnedImages = new Set(PINS.map((p) => p.image));
  const rest = boards.filter((b) => !pinnedImages.has(b.image));
  const byAt = new Map(
    PINS.map((p) => [p.at, boards.find((b) => b.image === p.image)]).filter(
      (e): e is [number, Board] => !!e[1]
    )
  );
  const out: Board[] = [];
  let r = 0;
  for (let i = 0; i < rest.length + byAt.size; i++) {
    const pinned = byAt.get(i);
    out.push(pinned ?? rest[r++]);
  }
  return out;
}

const ZOOM_MIN = 1;
const ZOOM_MAX = 4;
const ZOOM_CLICK = 2.5;
const clamp = (n: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, n));

export default function Gallery({ boards: boardsProp }: { boards: Board[] }) {
  const boards = withPins(boardsProp);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  // Zoom/pan on the lightbox image, so tiny silkscreened text is actually
  // readable. transform: translate() scale() (translate applied after
  // scale) so pan is a 1:1 screen-pixel offset regardless of zoom level.
  const [zoom, setZoom] = useState(1);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const drag = useRef<{
    x: number;
    y: number;
    panX: number;
    panY: number;
    moved: boolean;
  } | null>(null);

  const resetZoom = useCallback(() => {
    setZoom(1);
    setOrigin({ x: 50, y: 50 });
    setPan({ x: 0, y: 0 });
  }, []);

  const zoomToward = (
    e: { clientX: number; clientY: number },
    target: HTMLElement,
    scale: number
  ) => {
    const r = target.getBoundingClientRect();
    setOrigin({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
    setZoom(scale);
    setPan({ x: 0, y: 0 });
  };

  // Masonry as explicit flex columns instead of CSS `columns`: multicol
  // re-balances on any layout change inside it (hover effects made whole
  // rows shift in WebKit/Blink), and composited layers inside it paint
  // white in WebKit. Round-robin keeps newest boards across the top row.
  const [cols, setCols] = useState(3);
  useEffect(() => {
    const narrow = window.matchMedia("(max-width: 600px)");
    const mid = window.matchMedia("(max-width: 980px)");
    const update = () => setCols(narrow.matches ? 1 : mid.matches ? 2 : 3);
    update();
    for (const m of [narrow, mid]) m.addEventListener("change", update);
    return () => {
      for (const m of [narrow, mid]) m.removeEventListener("change", update);
    };
  }, []);

  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % boards.length)),
    [boards.length]
  );
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? i : (i - 1 + boards.length) % boards.length
      ),
    [boards.length]
  );

  // Deep link: ?board=<slug> opens that board's lightbox on load.
  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get("board");
    if (!s) return;
    const i = boards.findIndex((b) => slugOf(b) === s);
    if (i >= 0) setOpenIndex(i);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the URL in sync with the open board so the address bar is
  // always shareable; also reset the "copied" flash when switching.
  // Never strip ?board= before the deep-link effect above has applied
  // (on mount openIndex is still null and this effect runs first).
  const everOpened = useRef(false);
  useEffect(() => {
    setCopied(false);
    if (openIndex !== null) everOpened.current = true;
    if (openIndex === null && !everOpened.current) return;
    const url = new URL(window.location.href);
    if (openIndex === null) url.searchParams.delete("board");
    else url.searchParams.set("board", slugOf(boards[openIndex]));
    window.history.replaceState(null, "", url);
  }, [openIndex, boards]);

  useEffect(resetZoom, [openIndex, resetZoom]);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, next, prev]);

  const open = openIndex === null ? null : boards[openIndex];

  const shareUrl = (b: Board) =>
    `${window.location.origin}${window.location.pathname}?board=${slugOf(b)}`;

  return (
    <>
      <header className="top">
        <h1>silkscreen</h1>
        <p>
          circuit board easter eggs - found one?{" "}
          <a href="mailto:dorsa.rohani@gmail.com">send it in</a>
        </p>
      </header>

      <main className="grid">
        {Array.from({ length: cols }, (_, c) => (
          <div className="col" key={c}>
            {boards.map((b, i) =>
              i % cols === c ? (
                <button
                  className="card"
                  key={b.image}
                  onClick={() => setOpenIndex(i)}
                >
                  <img src={src(b.image)} alt={b.message} loading="lazy" />
                  <p className="label">{b.message}</p>
                  {b.device && <p className="sub">{b.device}</p>}
                </button>
              ) : null
            )}
          </div>
        ))}
      </main>

      <footer className="foot">
        <p>
          made with &lt;3 by{" "}
          <a href="https://dorsarohani.com" target="_blank" rel="noopener">
            dorsa
          </a>
        </p>
      </footer>

      {open && (
        <div className="lightbox" onClick={() => setOpenIndex(null)}>
          <button
            className="nav navPrev"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
          >
            &#8592;
          </button>

          <article className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="imgWrap">
              <img
                src={src(open.image)}
                alt={open.message}
                className={zoom > 1 ? "zoomed" : undefined}
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                  transformOrigin: `${origin.x}% ${origin.y}%`,
                }}
                onWheel={(e) => {
                  e.preventDefault();
                  const nextZoom = clamp(
                    zoom - e.deltaY * 0.0025 * zoom,
                    ZOOM_MIN,
                    ZOOM_MAX
                  );
                  zoomToward(e, e.currentTarget, nextZoom);
                }}
                onPointerDown={(e) => {
                  if (zoom === 1) return;
                  e.currentTarget.setPointerCapture(e.pointerId);
                  drag.current = {
                    x: e.clientX,
                    y: e.clientY,
                    panX: pan.x,
                    panY: pan.y,
                    moved: false,
                  };
                }}
                onPointerMove={(e) => {
                  if (!drag.current) return;
                  const dx = e.clientX - drag.current.x;
                  const dy = e.clientY - drag.current.y;
                  if (Math.abs(dx) > 3 || Math.abs(dy) > 3)
                    drag.current.moved = true;
                  setPan({
                    x: drag.current.panX + dx,
                    y: drag.current.panY + dy,
                  });
                }}
                onPointerUp={(e) => {
                  const moved = drag.current?.moved ?? false;
                  drag.current = null;
                  if (moved) return;
                  if (zoom > 1) resetZoom();
                  else zoomToward(e, e.currentTarget, ZOOM_CLICK);
                }}
              />
            </div>
            <div className="body">
              <p className="quote">{open.message}</p>
              {open.device && <p className="device">{open.device}</p>}
              {(open.credit || open.link) && (
                <p className="meta">
                  {open.credit}
                  {open.credit && open.link && " · "}
                  {open.link && (
                    <a href={open.link} target="_blank" rel="noopener">
                      source
                    </a>
                  )}
                </p>
              )}
              <p className="share">
                share{" "}
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    `"${open.message}"`
                  )}&url=${encodeURIComponent(shareUrl(open))}`}
                  target="_blank"
                  rel="noopener"
                >
                  on x
                </a>
                {" · "}
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    shareUrl(open)
                  )}`}
                  target="_blank"
                  rel="noopener"
                >
                  linkedin
                </a>
                {" · "}
                <button
                  className="copy"
                  onClick={() => {
                    navigator.clipboard.writeText(shareUrl(open)).then(() => {
                      setCopied(true);
                    });
                  }}
                >
                  {copied ? "copied!" : "copy link"}
                </button>
              </p>
            </div>
          </article>

          <button
            className="nav navNext"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
          >
            &#8594;
          </button>
        </div>
      )}
    </>
  );
}
