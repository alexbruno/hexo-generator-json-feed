import { has, specs } from './modules/utils'

const { config } = hexo

const options = has(config, 'jsonFeed') ? config.jsonFeed : { spec: 'rss' }
const file = options.spec === 'rss' ? 'rss' : 'feed'

hexo.extend.generator.register('json-feed', site => {
  const json = specs[options.spec](site, options.limit, config)

  return {
    path: `${file}.json`,
    data: JSON.stringify(json)
  }
})
