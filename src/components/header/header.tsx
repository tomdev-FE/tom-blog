import React, { Suspense } from "react"
import Link from "next/link"
import { siteConfig } from "@/config"
import { cn } from "@/utils"
import { Background } from "./background"
import { ThemeToggle } from "./theme-toggle"

const name = siteConfig.name

export const Header = () => {
  return (
    <header className={cn("sticky top-0 z-40 w-full")}>
      <div className="relative">
        <div className="container flex h-16 items-center justify-between px-8">
          <Link
            href="/"
            className="mr-8 flex items-center space-x-2 text-lg font-bold transition-all hover:opacity-80"
          >
            {name}
          </Link>
          <div className="flex space-x-2">
            <ThemeToggle />
          </div>
        </div>
        <Suspense fallback={null}>
          <Background />
        </Suspense>
      </div>
    </header>
  )
}

export default Header
