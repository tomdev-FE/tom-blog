import React from "react"
import Image from "next/image"
import { siteConfig } from "@/config/site"
import { ThemeToggle } from "./header/theme-toggle"

type Props = {}

const ProfileCard: React.FC<Props> = () => {
  return (
    <div className=" mt-[-60px] flex w-full justify-between	">
      <div className="flex">
        <div className="relative ml-[30px] h-[120px] w-[120px]">
          <Image src="/pop-cat.svg" fill alt="" className="bg-[wheat]" />
        </div>
        <div className="flex flex-col items-start justify-end p-2 pb-0">
          <div className="text-xl font-bold leading-7">{siteConfig.name}</div>
          <div className="text-sm">{siteConfig.role}</div>
        </div>
      </div>
      <div className="flex items-end space-x-2">
              <ThemeToggle />
            </div>
    </div>
  )
}

export default ProfileCard
