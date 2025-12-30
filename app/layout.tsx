import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.akarshjha.dev/"),

  title: {
    default: "Akarsh Jha | Full Stack Developer",
    template: "%s | Akarsh Jha",
  },

  description:
    "Portfolio of Akarsh Jha, a full-stack developer building modern web applications using Next.js, React, MongoDB, Supabase, and AI.",
 icons: {
    icon: "/favicon.ico",         
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png" 
  },
  keywords: [
    "Akarsh Jha",
    "Full Stack Developer",
    "Next.js Portfolio",
    "React Developer",
    "Web Developer",
    "MongoDB",
    "Supabase",
    "AI Projects",
  ],

  authors: [{ name: "Akarsh Jha" }],
  creator: "Akarsh Jha",

  verification: {
    google: "oJHD9BwkLVDRAC78_6a7QQpc_KhWjXoeeOY0yEqm2bM",
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Akarsh Jha | Full Stack Developer",
    description:
      "Explore projects, blogs, and experiments built with modern web technologies and AI.",
    url: "https://www.akarshjha.dev/",
    siteName: "Akarsh Jha Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Akarsh Jha Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Akarsh Jha | Full Stack Developer",
    description:
      "Projects, blogs, and experiments built using Next.js, React, Supabase, and AI.",
    images: ["/og-image.png"],
    creator: "@AkarshJha_",
  },

  robots: {
    index: true,
    follow: true,
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
            <footer className="w-full flex justify-center items-center text-sm md:text-xs text-wrap mt-10 text-foreground p-3 border-t-2 border-border text-center">
              <div className="w-full">
                Design & Developed by Akarsh Jha © {new Date().getFullYear()}. All rights reserved.
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
