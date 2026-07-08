import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Silkscreen",
  description:
    "A public gallery of the magical little messages hidden on circuit boards.",
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
