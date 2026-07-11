import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dorsarohani.com/silkscreens"),
  title: "Silkscreen",
  description:
    "A public gallery of the magical little messages hidden on circuit boards.",
  openGraph: {
    title: "silkscreen",
    description:
      "A public gallery of the magical little messages hidden on circuit boards.",
    url: "https://dorsarohani.com/silkscreens",
    siteName: "silkscreen",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "silkscreen",
    description:
      "A public gallery of the magical little messages hidden on circuit boards.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
