import sanitizeHTML from 'sanitize-html'

export default defineNuxtPlugin(() => {
  const sanitize = (html: string) =>
    sanitizeHTML(html, {
      allowedTags: ['h2', 'h3', 'p', 'img'],
      allowedAttributes: {
        a: ['href', 'name', 'target'],
        img: ['src', 'alt']
      }
    })
  return {
    provide: {
      sanitize
    }
  }
})
