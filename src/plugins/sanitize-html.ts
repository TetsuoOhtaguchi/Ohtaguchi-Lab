import sanitizeHTML from 'sanitize-html'

export default defineNuxtPlugin(() => {
  const sanitize = (html: string | undefined) =>
    sanitizeHTML(html, {
      allowedTags: [
        'h2',
        'h3',
        'h4',
        'p',
        'img',
        'pre',
        'code',
        'span',
        'ol',
        'ul',
        'li',
        'br',
        'a'
      ],
      allowedAttributes: {
        a: ['href', 'name', 'target'],
        img: ['src', 'alt'],
        span: ['class']
      }
    })
  return {
    provide: {
      sanitize
    }
  }
})
