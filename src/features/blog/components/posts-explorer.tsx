"use client"

import React from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useUpdateQueryStringValueWithoutNavigation } from "@/hooks"
import { TPost, TPosts } from "@/types"
import { useInView } from "framer-motion"
import { PostsList } from "./posts-list"
import { SearchBar } from "./search-bar"
import { TagsSelect } from "./tags-select"

interface PostsExplorerProps {
  posts: TPosts
  tags: string[]
}

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
      <div className="flex items-baseline">
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="flex max-w-[980px] flex-col items-start gap-2">
            <div className="flex items-center">
              <div className="mr-2 text-red-500">#</div>
              <h3 className="mx-0 text-[1.4rem] font-normal">About</h3>
            </div>

            <p className="text-muted-foreground">My name is Tuan Le - Tom.</p>
            <p className="text-muted-foreground">
              I have been working as a software engineer with expertise in
              frontend development.
            </p>
            <p className=" text-muted-foreground">
              I&apos;m finding a tech Startup to join. If you need a Frontend
              Developer, contact me.
            </p>
          </div>
        </section>
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="flex max-w-[980px] flex-col items-start gap-2">
            <div className="flex items-center">
              <div className="mr-2 text-red-500">#</div>
              <h3 className="mx-0 text-[1.4rem] font-normal">Contact</h3>
            </div>
            <Link
              className="text-muted-foreground"
              href={"tuanln.dev@gmail.com"}
            >
              Email: tuanln.dev@gmail.com
            </Link>
            <Link
              className="text-muted-foreground"
              href={"https://www.linkedin.com/feed/"}
            >
              Linkedin: https://www.linkedin.com/feed/
            </Link>
            <Link
              className="text-muted-foreground"
              href={"https://github.com/tomdev-FE"}
            >
              {" "}
              Github: https://github.com/tomdev-FE
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
