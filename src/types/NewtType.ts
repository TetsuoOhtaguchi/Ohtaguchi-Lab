import { Content } from 'newt-client-js'

export type Blog = Content & {
  topicTitle: string
  publishedAt: string
  body: string
  slug: string
}
