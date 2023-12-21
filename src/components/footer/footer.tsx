import Link from "next/link"
import { Github, Linkedin, Mail } from "@/assets/icons"
import { siteConfig } from "@/config"
import { ILinks } from "@/types"
import { Button, Separator } from "../ui"

const links = siteConfig.links

const icons = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
}

export const Footer = async () => {
  return (
    <div className="container mt-12 pb-1">
      <Separator />
      <div className="flex justify-end py-4 sm:flex-row">
        <div className="flex">
          {Object.keys(links).map((key) => {
            if (links[key as keyof ILinks]) {
              const Icon = icons[key as keyof ILinks]
              return (
                <Link
                  key={key}
                  href={links[key as keyof ILinks]}
                  target="_blank"
                >
                  <Button size="icon" variant="ghost">
                    <Icon />
                  </Button>
                </Link>
              )
            }
          })}
        </div>
      </div>
    </div>
  )
}
