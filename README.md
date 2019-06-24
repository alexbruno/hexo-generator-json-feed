# hexo-generator-json-feed
Hexo (https://hexo.io/) plugin to generate a JSON file as site feed with posts contents for generic use or consumption.

It's useful to serve compact and agile content data for microservices like AJAX site search, Twitter typeahead or public API.

JSON output can be similar to RSS like structure (default) or the new JSON Feed spec.

[RSS](http://www.rssboard.org/rss-specification)
[JSON Feed](https://jsonfeed.org/)

## News

It is now possible to:

- Select one of two specs to build your JSON: RSS like or JSON Feed

## Breaking change:

The output file name now will be `rss.json` or `feed.json`, depends on your `spec` setting. See bellow.

- [hexo-generator-json-feed](#hexo-generator-json-feed)
	- [News](#News)
	- [Breaking change:](#Breaking-change)
	- [Installation](#Installation)
	- [Usage](#Usage)
		- [RSS](#RSS)
		- [JSON Feed](#JSON-Feed)
	- [Settings](#Settings)
		- [Defaults](#Defaults)

## Installation

```bash
npm i -S hexo-generator-json-feed
```

## Usage

Hexo will run the generator *automagically* when you run `hexo serve` or `hexo generate`.
:smirk:

The output JSON file will depend on you `spec` setting. Options are `rss` (default) or `feed`. This option defines the data structure and the name of the JSON file output.

### RSS

Using the default settings (RSS), the `rss.json` file will look like the following structure:

```javascript
{
	title: hexo.config.title,
	description: hexo.config.description,
	language: hexo.config.language,
	link: hexo.config.url,
	webMaster: hexo.config.author,
	pubDate: post.date, // Last published post pubdate, UTC format, RSS pattern
	lastBuildDate: new Date(), // JSON file build datetime, UTC format, RSS pattern
	generator: 'hexo-generator-json-feed',
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

### JSON Feed

If you set `spec` as `feed` in your `_config.yml`, like this:

```yaml
jsonFeed:
	spec: feed
```

Then, your file will be a `feed.json` looking like the following structure:

```javascript
{
	version: 'https://jsonfeed.org/version/1',
	title: hexo.config.title,
	home_page_url: hexo.config.url,
	feed_url: `${hexo.config.url}/feed.json`,
	author: {
		name: hexo.config.author
	},
	items: [
		{
			id: post.permalink,
			url: post.permalink,
			title: post.title,
			content_html: post.content,
			content_text: post.content, // only text minified ;)
			summary: post.excerpt || post.content, // only text minified ;)
			date_published: post.date, // JSON universal date RFC 3339 format
			tags: [...categories.names, ...tags.names]
		}
	]
}
```

## Settings

You can customize settings in `_config.yml`.

### Defaults

Default settings are:

```yaml
jsonFeed:
	spec: rss
  limit: 25
```

`hexo.util.stripHTML` is used to get only clean text for post `excerpt` or `content`.
