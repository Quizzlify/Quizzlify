import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "../provider/ToastProvider";
import ToastContainer from "../components/Utilities/Toast/ToastContainer";
import { UserProvider } from "@/provider/UserProvider";
import Footer from "@/components/Utilities/Footer";

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
        <UserProvider>
          <ToastProvider>
            <main className="flex-grow min-h-screen">
              {children}
            </main>
            <Footer />
            <ToastContainer />
          </ToastProvider>
        </UserProvider>
      </body>
    </html>
  );
}
