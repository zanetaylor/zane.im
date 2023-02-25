import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import { SITE } from '$/config'

export const get = async () => {
  const posts = await getCollection('blog', ({ data }) => {
    return data.draft !== true;
  })

	return rss({
		title: SITE.title,
		description: SITE.description,
		site: import.meta.env.SITE,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.publishDate,
			link: post.slug,
		})),
	})
}