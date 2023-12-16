import React from "react"
import Image from "next/image"
import { siteConfig } from "@/config/site"

type Props = {}

const Banner: React.FC<Props> = () => {
  return (
    <div className="mb-9 w-full ">
      <div className="relative h-[16vh] w-full">
        <Image src={siteConfig.bg} fill alt="" className="object-cover" />
      </div>
    </div>
  )
}

export default Banner
