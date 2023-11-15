/**
 * Content type
 *
 * {
 *   _id: string;
 *   _sys: {
 *     createdAt: string;
 *     updatedAt: string;
 *     raw: {
 *       createdAt: string;
 *       updatedAt: string;
 *       firstPublishedAt: string;
 *       publishedAt: string;
 *     };
 *   };
 * }
 */
import { Content } from 'newt-client-js'

type Image = {
  _id: string
  src: string
  fileType: string
  fileName: string
  fileSize: number
  width: number
  height: number
  title: string
  altText: string
  description: string
  metadata: {}
}

export type Article = Content & {
  topicTitle: string
  thumbnail: Image
  postExcerpt: string
  body: string
  slug: string
  tag: number
}
