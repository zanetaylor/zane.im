import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import { SITE } from '$/config'

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => {
    return data.draft !== true;
  })

	return rss({
		title: SITE.title,
		description: SITE.description,
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.publishDate,
			link: `/blog/${post.slug}/`,
		})),
	})
}