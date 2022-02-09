---
title: 'Starting a static side project'
description: 'Creating a website with lists of most popular podcasts and radio stations'
bodyClass: 'body--blog'
blogImage: './src/site/assets/img/blog/topzender-header.png'
blogImageAlt: 'Topzender waves image'
tags:
  - side projects
  - Eleventy
  - Topzender
  - podcasts
  - radio
---

> **TL;DR** I’ve created a basic website for fun; [topzender.nl](https://topzender.nl). It contains lists of podcasts and radio stations (mostly Dutch). Built with Eleventy, updated using Cloudflare Workers and generated and hosted via Netlify. I just want to share a little bit about the process, as this was quite new to me. So get ready for the long story… 😀 Or scroll down for the list of used resources/inspiration.

## Why and what

I really wanted to do something with [Eleventy](https://www.11ty.dev/), the static site generator from Zach Leatherman. Eleventy is becoming quite popular, and is used by sites like [web.dev](https://web.dev/) and [V8 docs](https://v8.dev/). There is a lot of buzz around going “serverless” ([JAMstack](https://jamstack.org/)), and the promises are great; better performance, lower cost and greater scalability than a site on a “traditional stack”.

So I needed a new side-[side project](/en/blog/creating-a-web-app-as-side-project/). 😁 I figured I could do some kind of spin-off project by using the existing radio and podcasts JSON data from my little web app [1tuner.com](https://1tuner.com). But just spitting out the data would be kind of cheap and boring, so I was looking for some other data sources that I could combine with it.

I already had some experience with the iTunes Search API, so I was looking what else you could do. Then I noticed the [RSS Feed Generator](https://rss.itunes.apple.com/) from Apple, with the option to get “Top Podcasts” lists that I could combine with the 1tuner data… 😎
I decided to get the top podcast list data for the Netherlands. I thought it would be better to use this in a smaller region to narrow down the results and was also interested to see new/trending podcasts in my own country. I also knew a site where I could get NL radio listening figures, so it was clear I was going to build a Dutch website in the first place. Next I was looking for a new domain. I ended up with the corny [topzender.nl](https://topzender.nl/) (“top channel”).
Well OK, what the heck… 😜

{% image "./src/site/assets/img/blog/topzender-logo.png", "The Topzender logo","article-image", [800, 1024, 1200] %}
_Topzender logo_

## Fetching data

Of course, seemingly simple things quickly become more complex. For example, the podcast data from the RSS Feed Generator doesn’t have the original podcast feed URL’s in it, only the Apple ID… and at 1tuner.com I only use a feed URL as identifier. So I had to lookup the records and update data somehow. Luckily there is also a lookup URL from Apple based on the Apple ID, so there I could fill the gaps. Today there is another nice free alternative for this: [podcastindex.org](https://podcastindex.org/).

For the radio listening figures I thought of the monthly [Dutch radio audience research](https://nationaalluisteronderzoek.nl/) reports. But I couldn’t find anything useful in their existing data service right away, so I tried the service [Import.io](https://import.io/) to transform the main results right from their website to JSON. It felt wrong — but it works surprisingly good. 🙄

## 11ty setup

Now that I had some data, I could start adding pages. Earlier on I found the starter project [EleventyOne](https://github.com/philhawksworth/eleventyone) from [Phil Hawksworth](https://www.hawksworx.com/), so I decided to start from there. I copied… uhm, I mean _learned_ a lot. 🙂  
He does fancy stuff with a static JSON search file, a sitemap XML, and a “seed” option to use the same data over and over again during develop. Then I found out about [pagination](https://www.11ty.dev/docs/pagination/) in 11ty to iterate over data sets, and suddenly I had lots of files generated instantly. Push to GitHub, let Netlify pick this up automatically and online in seconds… 😮 That’s awesome!

It was really fun to see how quickly this can be used. Along the way I found some great stuff from other people like [Max Böck](https://mxb.dev/); see for example his extreme lightweight [Emergency Website Kit](https://mxb.dev/blog/emergency-website-kit).

The thing that’s just so great about this all, is that you are working very close to HTML and the output is also plain HTML, CSS and Javascript. These files can be placed anywhere, on any CDN. Page loading is not as a single page application would be, but in this case it’s all pretty small. And of course you’re free to add fancy loading stuff anyway. I didn’t do that, but tried to add just as much as things you couldn’t do in 1998. 👴 So I’ve added a service worker, dark mode, web share, etc.

I think the search functionality is a cool part that makes it all feel less static. This is also something I learned from the starter projects. Basically, because it’s so easy to iterate over all the data with Eleventy, you can also create a customized search index JSON file (with common words filtered out). So now when you click on the search icon, it loads this JSON file, and you’re ready to search in it. Of course the JSON file is cached via the service worker for next requests.

{% image "./src/site/assets/img/blog/topzender-search.png", "The search bar with suggestions below it","article-image", [800, 1024, 1200] %}
_Topzender.nl search functionality_

Maybe for more complex sites you would use something more sophisticated. But for this purpose it suits really well I think!

## Again, data

Until this point I had all data being fetched and overwritten at each 11ty production build (or “seed”). I needed to save some data somewhere to keep track of the lists, so I used the simple Realtime Database from Firebase because I worked with that before.

Also, I wanted to learn about cloud functions. So I tried Cloudflare Workers, because I [remembered this](https://gomakethings.com/getting-started-with-serverless-using-cloudflare-workers-and-vanilla-js/) from the “Daily Developer Tips” email newsletter from Chris Fernandi. This was actually a nice takeaway — that this newsletter pushes things into your inbox that you maybe don’t need directly, but once read you may think about it later.
Cloudflare Workers turned out very quickly to put in place, so I was able to move some of the top lists data fetching to the cloud. Now I needed something to trigger...

## Putting it together

I wanted to call my worker URL every once and a while to fetch the top podcasts. Therefore I added a “bot” at [Automate.io](https://gomakethings.com/getting-started-with-serverless-using-cloudflare-workers-and-vanilla-js/) with a daily timer connected to a webhook (which is the Cloudflare Worker URL).  
Over time I found out that the feed from Apple is not always that consistent in when it’s updated — or I got some sort of cached result. But when you return an HTTP error in those cases, you can easily find out that the webhook call didn’t work. In the end I cloned my existing bot a couple of times so it just tries it a couple of times a day.  
Last week Cloudflare announced “[Cron Triggers](https://blog.cloudflare.com/introducing-cron-triggers-for-cloudflare-workers)” that you can use to execute workers on a schedule! 🎉 Haven’t implemented yet, but I think I can remove one service out of these [weaved webs](https://css-tricks.com/weaved-webs). 😀

{% image "./src/site/assets/img/blog/topzender-flow1.png", "Flowchart: From automate.io to Cloudflare Worker that saves to Firebase data, to the build in Netlify (which reads Firebase data) resulting in a new website update","article-image", [800, 1024, 1200] %}

I already had Import.io converting the radio listening chart HTML table to JSON data. Because the numbers are coming in only once per month on a Tuesday, it runs only on those days. They also have an option to call a webhook right after the data is successfully fetched, so that’s nice! I call another special worker for the radio station data.

{% image "./src/site/assets/img/blog/topzender-flow2.png", "Flowchart: From import.io to Cloudflare Worker that saves to Firebase data, to the build in Netlify (which reads Firebase data) resulting in a new website update","article-image", [800, 1024, 1200] %}

In the workers, if there is new data, it’s saved to Firebase and another webhook from Netlify is called to trigger a new deploy of the website.
And now... Everything is working automatically! 🚀

## Thanks

Zach Leatherman for creating Eleventy (and everything regarding web fonts — I still think of the [Mitt Romney font problem](https://www.zachleat.com/web/mitt-romney-webfont-problem)).  
Also thanks to all other people & services listed in this little story.  
Netlify is really excellent. If you have linked your domain and GitHub repo, you don’t have to think about anything else. It just deploys the website (only updating files that have been changed). Each deploy has its own preview URL, so you can still have a look at what an older deploy looked like (also revert if you want to). And I haven’t even touched other features yet.
There are other services like [Vercel](https://vercel.com/) that may be this good as well, but I haven’t tried yet. Please note that I once won a bottle with a Netlify logo on it, when Phil Hawksworth organized a small raffle, so I’m fully influenced and biased here! 😁

{% image "./src/site/assets/img/blog/topzender-netlify-bottle.png", "Cropped picture of a Netlify bottle","article-image", [800, 1024, 1200] %}

❤ Rianne

## Resources

### Data

- iTunes Search API  
  [https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/index.html](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/index.html)
- RSS Feed Generator from Apple  
  [https://rss.itunes.apple.com](https://rss.itunes.apple.com)
- Podcastindex.org open podcast API (from Adam Curry)  
  [https://podcastindex.org](https://podcastindex.org)
- Nationaal Luister Onderzoek (Dutch radio audience research)  
  [https://nationaalluisteronderzoek.nl](https://nationaalluisteronderzoek.nl)
- Import.io (HTML to JSON)  
  [https://www.import.io](https://www.import.io)

### Tools & Services

- Eleventy (static site generator)  
  [https://www.11ty.dev](https://www.11ty.dev)
- Netlify (automated deployment)  
  [https://www.netlify.com](https://www.netlify.com)
- GitHub (source code host)  
  [https://github.com](https://github.com)
- Cloudflare Workers (cloud functions)  
  [https://workers.cloudflare.com](https://workers.cloudflare.com)
- Firebase Realtime Database (store JSON data)  
  [https://firebase.google.com](https://firebase.google.com)
- Automate.io (webhook timers)  
  [https://automate.io](https://automate.io)
- Gravit Designer (creating vector graphics)  
  [https://designer.gravit.io](https://designer.gravit.io)
- Feather (awesome icons)  
  [https://feathericons.com](https://feathericons.com)
- Get Waves (nice footer 😁)  
  [https://getwaves.io](https://getwaves.io)
- eleventy-plugin-pwa (service worker via Google WorkBox)  
  [https://github.com/okitavera/eleventy-plugin-pwa](https://github.com/okitavera/eleventy-plugin-pwa)

### Other / Inspiration

- Zach Leatherman (Mr 11ty aka Mr web fonz)  
  [https://www.zachleat.com](https://www.zachleat.com)
- EleventyOne (starter project from Phil Hawksworth)  
  [https://github.com/philhawksworth/eleventyone](https://github.com/philhawksworth/eleventyone)  
  [https://www.hawksworx.com](https://www.hawksworx.com)
- Daily Developer Tips newsletter (from Chris Fernandi)  
  [https://gomakethings.com](https://gomakethings.com)
- Max Böck  
  [https://mxb.dev](https://mxb.dev)
  [https://whimsical.club](https://whimsical.club)
- Piccalilli (👍 newsletter from Andy Bell)  
  [https://piccalil.li](https://piccalil.li)
- Weaved Webs (about possible complexities with Jamstack sites)  
  [https://css-tricks.com/weaved-webs/](https://css-tricks.com/weaved-webs/)

Originally posted at [Medium.com](https://medium.com/@robinbakker/starting-a-static-side-project-75428dd41d9f)
