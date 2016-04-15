# hexo-generator-json-feed
Hexo (https://hexo.io/) plugin to generate a JSON file similar to RSS feed channel structure with posts contents for generic use or consumption.

It's useful to serve compact and agile content data for microservices like AJAX site search, Twitter typeahead or public API.

## Installation

```bash
npm i -S hexo-generator-json-feed
```

## Usage

Hexo will run the generator *automagically* when you run `hexo serve` or `hexo generate`.
:smirk:

Using the default settings, the `content.json` file looks like the following structure:

```javascript
{
	title: hexo.config.title,
	description: hexo.config.description,
	language: hexo.config.language,
	link: hexo.config.url,
	pubDate: , // Last published post pubdate, UTC format, RSS pattern
	lastBuildDate: , // JSON file build datetime, UTC format, RSS pattern
	generator: 'hexo-generator-json-feed',
	webMaster: hexo.config.author,
	items: [
		{
			title: post.title,
			link: post.permalink,
			description: post.excerpt ? post.excerpt : post.content, // only text minified ;)
			pubDate: post.date, // UTC format, RSS pattern
			guid: post.permalink,
			category: post.categories.length ? post.categories : post.tags // Strings Array
		}
	]
}
```

`hexo.util.stripHTML` is used to get only clean text for post `excerpt` or `content`.

## Configuration

You can set some options in `_config.yml` to generate a custom `content.json`.

For now, only `limit` option is available.

Default options are as follows:

```yaml
jsonFeed:
  limit: 25
```

## Examples of use

Coming soon...