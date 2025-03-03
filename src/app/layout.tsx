import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "../provider/ToastProvider";
import ToastContainer from "../components/Utilities/Toast/ToastContainer";

export const metadata: Metadata = {
  title: "Quizzlify"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`m-0`}
      >
        <ToastProvider>
          {children}
          <ToastContainer />
        </ToastProvider>
      </body>
    </html>
  );
}
