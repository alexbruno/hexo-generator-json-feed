import { has, specs } from './modules/utils'

const { config } = hexo
const defs = { spec: 'rss', limit: 25 }
const opts = has(config, 'jsonFeed') ? config.jsonFeed : {}
const options = { ...defs, ...opts }
const file = options.spec === 'rss' ? 'rss' : 'feed'

hexo.extend.generator.register('json-feed', site => {
  const json = specs[options.spec](site, options.limit, config)

  return {
    path: `${file}.json`,
    data: JSON.stringify(json)
  }
})
