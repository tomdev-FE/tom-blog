import React from "react"
import { PostsExplorer, getAllTags } from "@/features/blog"
import { generateRssFeed } from "@/utils/rss"
import { filterPublishedPosts, getAllPosts } from "@/lib/notion"
import ProfileCard from "@/components/profile-card"
import Banner from "@/components/banner"
async function getData() {
  await generateRssFeed()
  const posts = await getAllPosts({ includePages: false })
  const filteredPosts = filterPublishedPosts({ posts, includePages: false })

  let tags: string[] = []
  if (posts) {
    tags = getAllTags(filteredPosts)
  }
  return { posts: filteredPosts, tags }
}

const Blog = async () => {
  const { posts, tags } = await getData()

  if (!posts) {
    return <div>No posts</div>
  }

  return (
    <div>
      {/* <h1 className="mb-4 text-center	text-4xl font-bold">
        Learn development with great articles.
      </h1> */}
      <Banner />
      <ProfileCard />
      <PostsExplorer posts={posts} tags={tags} />
    </div>
  )
}

export default Blog
