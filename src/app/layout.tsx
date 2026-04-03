import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "AI 辅助工作经济学实验平台",
  description: "Professional experiment platform for Human-AI economics studies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
