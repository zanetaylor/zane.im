---
draft: false
publishDate: 2023-02-25T22:50:04.516Z
title: So I rebuilt the site with Astro
description: Another ode to the hot new(ish) static site generator on the block.
  I'll try to keep this short.
tags:
  - dev
  - ssg
  - astro
---
## Any excuse to refactor

I enjoy using my own site as a place to play around with new frontend tools and techniques. It's a convenient place for me to learn and break things in a low stakes way without having to go through the trouble of setting up a new project or diving into a refactor of something more complex. After spending some time using [Astro](https://astro.build) v1.x to rebuild a couple pages, I realized I'd finally found a static site generator I really vibed with. With the recent release of v2.0, I decided it was time to go all in and finish the job.

There's no shortage of takes from folks across the dev web over the last year on why they like Astro. Up front, its own site touts two major features: excellent performance and "island architecture." These are both big, and part of what initially drew me in, but what really made Astro click for me was how familiar and intuitive it felt after working with component-based UI frameworks like Vue, React, and Svelte.

## Fresh but familiar

Astro is written in JS, which for me means no language barrier compared to something like Jekyll or Hugo whose respective languages aren't daily drivers for me. I get that there's a pile of reasons that those languages (and others) make sense for an SSG, but for me none of them have proven more compelling than the ability to work in JS/TS for the whole codebase.

Other popular JS SSGs like [Eleventy](https://www.11ty.dev/) and [Hexo](https://hexo.io/) were attractive, but their workflow and methodology also felt a little unfamiliar, like something I would have to spend some time learning before I could work with them. It was also less obvious at a glance how easily it would be to integrate UI framework components with them, should I need to. These aren't real criticisms, just an attempt to pin down whey they didn't stick for me.

## Sometimes a framework

If you're familiar with component-based frameworks, Astro is easy to pick up, since its basic application structure and native component system are similar. But, you don't actually need any of those frameworks (or their complexity, build processes, or performance overhead) to build a site. Astro doesn't include or push you toward any particular UI framework, or even toward a framework in general. Together, these two features are huge for me.

```
---
import Button from './Button.astro';

// Access passed-in component props, like `<X title="Hello, World" />`
const {title} = Astro.props;
// Fetch external data, even from a private API or database
const data = await fetch('SOME_SECRET_API_URL/users').then(r => r.json());
---
<div>
  <h1>{title}</h1>
  <Button title="Da Button" />
</div>
```
Look, an Astro component! Easy.

## Island time

This brings me to the "island" stuff. Basically, islands are how Astro handles components with runtime JS on any given page. Whether just a native Astro component with client JS or one written in your favorite framework, Astro wraps it in an island during the build and lazyloads it in the browser. If you've got component JS that doesn't actually need to run in the client, Astro will just run it during the build and ship the resulting HTML, sans JS. I'm really oversimplifying it, so you should take a look at [their explanation](https://docs.astro.build/en/concepts/islands/), but it's pretty cool.

The point I actually want to get to here is that the way Astro handles UI components makes it easy to use any framework, or even more than one, for your components, without the impact on build size, load time, and runtime performance you would expect. It has [first-party integrations](https://docs.astro.build/en/core-concepts/framework-components/) for a number of popular frameworks to make it easy to bring them into your project this way.

## 2.0 and beyond

To wrap up I'll mention that part of the reason the 2.0 release spurred me to finish migrating the site to Astro was the new features for working with content, namely [content collections](https://docs.astro.build/en/guides/content-collections/). Astro was already pretty dandy when it came to building a blog, but the content collections functionality made it even easier and more intuitive to work with sets of MD or MDX files for a blog or any other site driven by local content files.

The dev experience with Astro so far has been excellent, and the results impressive I'm looking forward to expanding the site on its new foundation over the next several months.