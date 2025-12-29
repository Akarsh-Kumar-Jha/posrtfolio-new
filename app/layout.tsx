import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Akarsh Jha Portfolio",
  description: "Akarsh Jha Portfolio Website with Next.js",

  verification: {
    google: "oJHD9BwkLVDRAC78_6a7QQpc_KhWjXoeeOY0yEqm2bM",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground w-full overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="w-[92%] md:w-[75%] lg:w-[50%] mx-auto">
             <Toaster />
            <Navbar />
            <main>{children}</main>
            <footer className="w-full flex justify-center items-center text-base md:text-lg text-wrap mt-10 text-foreground p-3 border-t-2 border-border text-center">
              <div className="w-full">
                Design & Developed by Akarsh Jha © 2025. All rights reserved.
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
