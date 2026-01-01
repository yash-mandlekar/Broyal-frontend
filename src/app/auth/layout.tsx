"use client";
import { Toaster } from "sonner";
import "../css/euclid-circular-a-font.css";
import "../css/style.css";
import { ReduxProvider } from "@/redux/provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <>
          <Toaster />
          <ReduxProvider>{children}</ReduxProvider>
        </>
      </body>
    </html>
  );
}
