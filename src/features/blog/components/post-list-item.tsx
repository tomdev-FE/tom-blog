"use client"

import React from "react"
import Link from "next/link"
import { cn, formatDate } from "@/utils"
import { Badge } from "@/components/ui"

interface PostListItemProps {
  href: string
  title: string
  createdTime: string
  summary?: string
  tags?: string[]
  thumbnail?: string
}

export const PostListItem = (props: PostListItemProps) => {
  const { href, title, createdTime, summary, tags } =
    props

  return (
    <Link href={href}>
      <li className="group relative cursor-pointer">
        {/* background */}
        <div className="absolute left-0 top-0 z-[-1] h-full w-full rounded-xl bg-[rgba(50,50,50,0.1)] opacity-30 shadow-md transition-all duration-300 group-hover:opacity-100 dark:bg-[rgba(230,230,230,0.1)] dark:from-transparent dark:via-transparent dark:to-transparent" />
        {/* content */}
        <div className="flex space-x-2 p-6 sm:flex-row">
          <div className="w-full">
            <div className="mb-1 flex space-x-1">
              <div>
                <h2 className="text-lg font-bold">{title}</h2>
                <p className="mb-2 text-sm text-gray-400">
                  Released on {formatDate(createdTime)}
                </p>
              </div>
            </div>
            <p className="mb-3 text-sm">{summary}</p>
            <div className="flex flex-wrap gap-2">
              {tags &&
                tags.map((tag) => (
                  <Badge variant="outlined" key={tag}>
                    {tag}
                  </Badge>
                ))}
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}
