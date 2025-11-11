import type { Metadata } from "next";
import Sidebar from "../src/components/Sidebar";
import { ReduxProvider } from "../src/store/Provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "My ToDo",
  description: "Microsoft To Do Clone",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body className="bg-neutral-950 text-white flex">
          <Sidebar />
          <main className="flex-1 p-6">{children}</main>
        </body>
      </html>
    </ReduxProvider>
  );
}
