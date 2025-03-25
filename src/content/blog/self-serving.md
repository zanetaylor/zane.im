---
draft: true
title: Self serving
---
## Not ice cream

After 5+ years of hosting a remote media server for myself and friends and family, I migrated it off of the cloud and repatriated it on a large black box in the corner of my living room. This took several weeks of iterative work, in a process that I'd never attempted before. It all turned out to be mostly pretty easy, and more or less nothing went wrong. This is a write-up of how I did it, for my future self as much as anyone (in case of disaster, I can use this as a reference for how things were set up). It's by no means intended as a comprehensive guide for anyone looking to DIY, but I'll link to good resources for that throughout.

## Hardware

Deciding how to the approach the question of hardware was maybe the biggest challenge. Computer hardware is a huge ecosystem that I'm mostly not all that familiar with. I've built a few PCs from mostly new and modern parts, but that's really it.

At first, I thought a mini PC that I could stash in a nook or behind the TV would be ideal. Small, quiet, low power. But I quickly realized the obvious problem: mini PCs having almost no room for onboard storage, and I was going to need _a lot_ of storage. Plus, this would be mostly cheap HDD storage, which is bulky.

OK, well how about a NAS? This is what most people deploy for in-home shared storage, it must be an obvious choice. Except NAS devices are universally expensive, not modular, use custom firmware, and are relatively low spec'd (somewhere between a Pi Zero and a mini PC). In other words, an pricey one trick pony. If I just needed to expose a bunch of storage to other devices, the simplicity would justify the cost. But I'm trying to build my own internet here.

So, what then? I briefly considered going full neckbeard and tossing out bids on esoteric used rack components on Ebay and deciding which closet to fill with blinking lights and ethernet cables. Thankfully just before I did, it became clear that it made plenty of sense to stick with what I knew and just build a storage-optimized, Linux friendly, low noise, low power PC. Given my limited experience, this dramatically simplified things, and in the end the only challenging step here was getting the many massive storage HDDs connected up, something I'd never done before and which required a little bit of unfamiliar hardware in the form of a SAS bus card and breakout cable to increase the number of drives I could connect simultaneously to my consumer motherboard, which only had 4 onboard SATA ports.

## Software

### Proxmox

I had zero experience with Proxmox before looking into it for this project, although I'd heard of it. My initial plan was focused on the media server, and in that context I felt Proxmox might be overcomplicated, but as my ambitions grew toward a full blown homelab, it became a more obvious choice. I wouldn't recommend it to anyone looking to deploy just a media server or a single node, but it has proven to be very flexible and reliable, and the initial setup was unexpectedly easy.

### Docker

Let's take a moment and quietly air our grievances with Docker (and, gasp, Docker Compose) and what it means for production deployment and maintenance.

Now that we're done, we can feel calm and confident in saying that it's a blessing for hobbyist projects and their low stakes needs. It makes deploying standardized application stacks unbelievably simple, and enables things that would just be too time consuming or difficult to bother with otherwise for a casual endeavor.

My entire media server now runs on a single Docker instance in a Debian VM managed by Proxmox. This includes the library management tools as well as Plex itself, along with a smattering of related monitoring and automation tools to make the whole thing as low maintenance as possible, all configured in a single Compose file. At first, running containers under Docker within a Proxmox VM within a physical box sitting 10 feet from me seemed like a too convoluted approach, but I quickly remembered that these layers of virtualization would maximize both the flexibility and ease of management of the whole thing, and then I got over it. Remembering that each virtualization layer creates a barrier that prevents upgrades and issues in one system from directly impacting another...

### Media

### Networking

The networking set up ended up being the most tedious for me, but this is probably down to my particular needs and lack of networking expertise more than the objective difficulty level. The two requirements that complicated things for me were that I wanted some services accessible to me remotely and some other services accessible to friends and family remotely (in addition to Plex, which does a nice job handling its own remote access config for you).

[Tailscale](https://tailscale.com/) has been excellent for making the server accessible to other devices I control. It's really handy even if you don't run any kind of server, and the set up couldn't be easier. There are other products for this, but I've so far had no compelling reason to look for an alternative. It was only critical to install it in the Docker host VM, but I ended up installing it on the parent Proxmox host as well, so I could remotely handle any system admin tasks that might come up.

Traefik

### System tools

Homepage, Dozzle, Watchtower

### Homelab shit

You can check out the actual config [over in the repo](https://github.com/zanetaylor/homelab).

## Now what?