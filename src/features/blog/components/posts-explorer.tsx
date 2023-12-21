"use client"

import React from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Github, Linkedin, Mail } from "@/assets/icons"
import { siteConfig } from "@/config"
import { useUpdateQueryStringValueWithoutNavigation } from "@/hooks/use-update-query"
import { TPost, TPosts } from "@/types"
import { useInView } from "framer-motion"
import { PostsList } from "./posts-list"
import { SearchBar } from "./search-bar"
import { TagsSelect } from "./tags-select"

interface PostsExplorerProps {
  posts: TPosts
  tags: string[]
}
const name = siteConfig.name
const mail = siteConfig.links.mail
const github = siteConfig.links.github
const mailLabel = siteConfig.mailLabel
const linkedin = siteConfig.links.linkedin

export const PostsExplorer = (props: PostsExplorerProps) => {
  const { posts, tags } = props

  const searchParams = useSearchParams()
  const loadMoreRef = React.useRef<HTMLDivElement | null>(null)
  const inView = useInView(loadMoreRef)
  const [numberDisplayedPosts, setNumberDisplayedPosts] =
    React.useState<number>(30)

  const initialSearchValue = searchParams.get("q") ?? ""
  const initialTags =
    searchParams
      .get("tags")
      ?.split(",")
      .filter((elem) => elem !== "") ?? []

  const [searchValue, setSearchValue] =
    React.useState<string>(initialSearchValue)
  const [selectedTags, setSelectedTags] = React.useState<string[]>(initialTags)

  useUpdateQueryStringValueWithoutNavigation("q", searchValue.trim())
  useUpdateQueryStringValueWithoutNavigation("tags", selectedTags.join(","))

  const handleTagClick = (tag: string) => {
    const selected = selectedTags.findIndex((elem) => elem === tag) > -1
    if (selected) {
      setSelectedTags(selectedTags.filter((elem) => elem !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const filteredPosts = React.useMemo(() => {
    return posts.filter((post: TPost) => {
      let matchesSearch = post.title
        .toLocaleLowerCase()
        .includes(searchValue.toLocaleLowerCase())
      let matchesTags = post.tags
        ? post.tags.some((tag) => selectedTags.includes(tag))
        : false
      if (selectedTags.length === 0) matchesTags = true
      if (searchValue === "") matchesSearch = true
      return matchesSearch && matchesTags
    })
  }, [posts, searchValue, selectedTags])

  React.useEffect(() => {
    if (inView) {
      setNumberDisplayedPosts((prevN) => prevN + 20)
    }
  }, [inView])

  return (
    <div>
      <div className="flex flex-col items-baseline md:flex-row	">
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center">
              <div className="mr-2 text-red-500">#</div>
              <h3 className="mx-0 text-xl font-bold leading-7">About</h3>
            </div>

            <p className="text-muted-foreground">
              I&apos;m <strong> {name}</strong>
            </p>
            <p className="text-muted-foreground">
              I have been working as a software engineer with expertise in
              <strong> Frontend/UI Development</strong>.
            </p>
            <p className=" text-muted-foreground">
              I&apos;m finding a <strong>Tech Startup</strong> to join. If you
              need a Frontend Developer, contact me.
            </p>
          </div>
        </section>
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center">
              <div className="mr-2 text-red-500">#</div>
              <h3 className="mx-0 text-xl font-bold leading-7">Contact</h3>
            </div>
            <Link
              className="text-muted-foreground flex"
              href={mail}
              target="_blank"
            >
              <Mail className="mr-1" /> {mailLabel}
            </Link>
            <Link
              className="text-muted-foreground flex"
              href={linkedin}
              target="_blank"
            >
              <Linkedin className="mr-1" /> {linkedin}
            </Link>
            <Link
              className="text-muted-foreground flex"
              href={github}
              target="_blank"
            >
              {" "}
              <Github className="mr-1" /> {github}
            </Link>
          </div>
        </section>
      </div>
      <div className="container mb-10 ml-0 max-w-md">
        <SearchBar
          value={searchValue}
          onChange={(event) => setSearchValue(event.currentTarget.value)}
        />
      </div>
      <div className="container mb-6 max-w-6xl">
        <TagsSelect
          tags={tags}
          selectedTags={selectedTags}
          handleTagClick={handleTagClick}
        />
        <h2 className="mb-5 text-xl font-bold">Posts</h2>

        {filteredPosts && (
          <PostsList posts={filteredPosts.slice(0, numberDisplayedPosts)} />
        )}
        <div ref={loadMoreRef} />
      </div>
    </div>
  )
}
