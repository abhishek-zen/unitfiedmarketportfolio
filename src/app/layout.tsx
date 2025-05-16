import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { EnvVarWarning } from "@/components/env-var-warning";
import AuthButton from "@/components/header-auth";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import { SidebarNavigation } from "@/components/sidebar-navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Unified Market and Portfolio Intelligence",
  description: "Strategic intelligence platform for dynamic, compliant, and market-aligned decisions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="bg-background text-foreground min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            {/* Navigation Header */}
            <nav className="w-full border-b border-b-foreground/10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm sticky top-0 z-40">
              <div className="w-full max-w-7xl mx-auto flex justify-between items-center p-3 px-5">
                {/* App Name and Logo */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                    <ChartBarIcon className="w-6 h-6 text-white" />
                  </div>
                  <Link 
                    href="/" 
                    className="text-xl font-bold hover:text-blue-600 transition-colors hidden sm:block"
                  >
                    Unified Market Intelligence
                  </Link>
                  <Link 
                    href="/" 
                    className="text-lg font-bold hover:text-blue-600 transition-colors sm:hidden"
                  >
                    UMI
                  </Link>
                </div>

                {/* Sidebar Navigation */}
                

                {/* Auth and Theme */}
                <div className="flex items-center gap-4">
                  {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
                  <ThemeSwitcher />
                </div>
              </div>
            </nav>
          <SidebarNavigation />
            <div className="flex flex-1">
              {/* Content with padding for desktop sidebar */}
              <div className="flex-1 lg:pl-64">
                {/* Main Content */}
                <main className="flex-1 w-full">
                  <div className="w-full max-w-7xl mx-auto px-4 sm:px-5 py-6">
                    {children}
                  </div>
                </main>

                {/* Footer */}
                <footer className="w-full border-t border-t-foreground/10 bg-white/95 dark:bg-gray-900/95">
                  <div className="max-w-7xl mx-auto px-4 sm:px-5 py-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-xs text-gray-600 dark:text-gray-400">
                        <p>© 2025 Vontier Corporation</p>
                        <p>
                          Powered by{" "}
                          <a
                            href="https://alchemistudio.ai"
                            target="_blank"
                            className="font-bold hover:underline hover:text-blue-600 transition-colors"
                            rel="noreferrer"
                          >
                            Alchemi
                          </a>
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-xs">
                        <Link href="/privacy" className="hover:text-blue-600 transition-colors">
                          Privacy
                        </Link>
                        <Link href="/terms" className="hover:text-blue-600 transition-colors">
                          Terms
                        </Link>
                        <Link href="/support" className="hover:text-blue-600 transition-colors">
                          Support
                        </Link>
                      </div>
                    </div>
                  </div>
                </footer>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}