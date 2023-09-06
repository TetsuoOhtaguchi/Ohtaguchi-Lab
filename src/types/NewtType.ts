import { Content } from 'newt-client-js'

export type Blog = Content & {
  topicTitle: string
  publishedAt: string
  updatedAt: string
  body: string
  slug: string
}
