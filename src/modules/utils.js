import { stripHTML } from 'hexo-util'

export const specs = {
  rss (site, limit, config) {
    const build = new Date().toUTCString()

    const items = posts(site, limit).map(post => {
      return {
        title: post.title,
        link: post.permalink,
        description: summary(post),
        pubDate: post.date.toDate().toUTCString(),
        guid: post.permalink,
        category: tags(post)
      }
    })

    const rss = {
      title: config.title,
      description: config.description,
      language: config.language,
      link: config.url,
      webMaster: config.author,
      pubDate: posts.length ? posts[0].pubDate : build,
      lastBuildDate: build,
      generator: 'hexo-generator-json-feed',
      items
    }

    return rss
  },

  feed (site, limit, config) {
    const items = posts(site, limit).map(post => {
      return {
        id: post.permalink,
        url: post.permalink,
        title: post.title,
        content_html: post.content,
        content_text: minify(post.content),
        summary: summary(post),
        date_published: post.date.toDate().toJSON(),
        tags: tags(post)
      }
    })

    const json = {
      version: 'https://jsonfeed.org/version/1',
      name: config.title,
      home_page_url: config.url,
      feed_url: `${config.url}/feed.json`,
      author: {
        name: config.author
      },
      items
    }

    return json
  }
}

// Helpers

function minify (str) {
  return stripHTML(str).trim().replace(/\s+/g, ' ')
}

function posts (site, limit) {
  return site.posts.sort('-date').filter(post => post.published).slice(0, limit || 25)
}

function summary (post) {
  return post.excerpt ? minify(post.excerpt) : minify(post.content)
}

function tags (post) {
  const cats = post.categories.map(cat => cat.name)
  const tags = post.tags.map(tag => tag.name)

  return [...cats, ...tags]
}
