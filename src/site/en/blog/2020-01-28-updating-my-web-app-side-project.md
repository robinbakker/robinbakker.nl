---
title: 'Updating my web app side project'
description: "This story is a follow up of 'Creating a web app as side project'"
tags:
  - side projects
  - web apps
  - Preact
  - 1tuner
  - radio
  - podcasts
---

My little side-project web app [https://1tuner.com](https://1tuner.com) is still running, and it’s fun to see a small number of people using it around the world.

But at work we don’t use 1tuner anymore unfortunately 😥. We have Sonos speakers now, so the radio playlist was no longer needed.

## New “problems”

Of course, me myself & I was still using 1tuner to listen to the radio when biking to the office. But now and then I wanted to listen to podcasts. So this was a new problem to work on! 🤓

Also, I wasn’t happy with the app logo and icon, and felt the UI could use some attention too. And when my colleague said his girlfriend wouldn’t use the app because of the looks of it — well, that was some extra motivation. 😁

## 🎙Working on podcasts

I started out working on the podcast functionality. This shouldn’t be that hard right (I thought)? It’s basically reading an RSS feed and load the audio into the existing audio player.
First I needed to find a way to search for the podcast feeds. I found [Listen Notes](https://listennotes.com/) and the [Apple iTunes Search API](https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/).
The Listen Notes API is very nice, but I only wanted a way to find podcasts and get a feed URL in return. This didn’t seem to be possible at the time I looked. Basically, you should use that API for searches as well as loading the podcast feeds in JSON format. I felt that it might was too fancy for what I was looking for.
So I was giving the free iTunes Search API a try. That worked out fine, finally I got some feed URL’s to work with. So I loaded the XML of some feeds of the Dutch public radio, and it just worked. Nice, time to show this to someone! 😎

“OK, I want to hear that popular podcast”

{% image "./src/site/assets/img/blog/updating-1tuner-cors.png", "A DevTools CORS error message","article-image", [800, 1024, 1200] %}
_💥BANG!_

🤦‍♂️of CORS, [Same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)... A bit silly that I didn’t thought about that in the first place. But I was only testing feeds from the Dutch public radio. And all responses from their feeds were all nicely provided with an “Access-Control-Allow-Origin” header set to the origin of the request. This really makes sense because it’s a public feed that you want to share with as many services/apps as possible I think. Strange that podcast platforms like [ART19](https://art19.com/) don’t do this?

Also something that is kind of hard to do with web apps specifically;

{% image "./src/site/assets/img/blog/updating-1tuner-tweet-slightlylate.png", "Tweet of Alex Russel (@slightlylate) about web app CORS issues", "article-image", [800, 1024, 1200] %}
_[See original tweet](https://twitter.com/slightlylate/status/1222107257980235776)_

So I needed a proxy, or still use the Listen Notes API. Until then, 1tuner.com was purely a static site/app. It loads some static JSON files and the audio streams from radio stations.
I found a nice example at Glitch: [https://glitch.com/~rss2json](https://glitch.com/~rss2json)
As I already parsed the XML itself client-side, I didn’t need the JSON conversion so I modified it a bit. When a feed request fails, it tries the same feed via that small proxy service. And because this is just my little hacky hobby project I decided to leave this for now 🤗
BTW: [Glitch](https://glitch.com/) is awesome!

## Logo update

The old logo was quite red and at first I wanted it to be some sort of a tuning knob. But as podcasts were also becoming part of the app, I experimented with 1 play icon (I used the online vector drawing tool [Gravit Designer](https://designer.gravit.io/) for this again).

{% image "./src/site/assets/img/blog/updating-1tuner-first-logos.png", "First logo experiments","article-image", [800, 1024, 1200] %}
_Some early experiments_

It may be not very original, but I think this works better and looks more friendly (and Dutch 😜):

{% image "./src/site/assets/img/blog/updating-1tuner-logo-old-new.png", "The old and new logo", "article-image", [800, 1024, 1200] %}
_Yes, that round thingy at the right hand side is the new one_

I also updated the manifest file of the web app with maskable icons. On Android, icons can be any shape (e.g. the Samsung squircle as opposed to the stock Android circle). Basically you add “bleed” and the OS crops it to the right shape.  
See also [Adaptive icon support in PWAs with maskable icons](https://web.dev/maskable-icon/) on web.dev.

## New UI

I also tried to draw new navigation icons, because the ones of the old UI weren’t too consistent. And I wanted to have the same look and feel as the new logo / app icon.

{% image "./src/site/assets/img/blog/updating-1tuner-nav-old-new.png", "1tuner navigation before and after", "article-image", [800, 1024, 1200] %}
_Old and new navigation icons_

Other elements of the original app UI were flat and simple. For the station and podcast links/buttons, there was some room for improvement. Now I blur the logo in the background with the icon as overlay.

{% image "./src/site/assets/img/blog/updating-1tuner-ui-old-new.png", "1tuner UI before and after", "article-image", [800, 1024, 1200] %}
_Before and after_

## Dark theme

No new UI without a dark theme! 😀 I added a settings page were you can switch from theme. By default it uses the preferred theme setting from your OS if applicable. This works really nice in CSS with CSS variables aka custom properties and a special media query.
See also [Dark Mode in CSS](https://css-tricks.com/dark-modes-with-css/) from CSS-Tricks.

{% image "./src/site/assets/img/blog/updating-1tuner-dark-theme.png", "1tuner UI before and after", "article-image", [800, 1024, 1200] %}
_The dark side_

## Other changes

- **New radio station pages**  
  For some radio stations I added related podcast links and “suggested stations”. The header is also updated.  
  Examples:  
  [https://1tuner.com/radio-station/kink](https://1tuner.com/radio-station/kink)  
  [https://1tuner.com/radio-station/bbcradio4](https://1tuner.com/radio-station/bbcradio4)
- **Preact version upgrade**  
  At v10.2.1 now. This was done a bit earlier, and was kind of tricky because I actually used state updates synchronously, which was “fixed” in [Preact X](https://preactjs.com/) but broke lots of things in my little app… Fixed now! ✔
- **Chromecast experimental feature**  
  At a secret place at settings you can enable Chromecast support. 😄Beware, this is not finished… At a very early stage of 1tuner I started with the [Remote Playback API](https://www.w3.org/TR/remote-playback/) already, but this seemed not very well implemented. As of today, for Chrome this still only works on Chrome on Android. So I’m implementing the “[Cast Chrome Sender Framework](https://developers.google.com/cast/docs/chrome_sender)” now.

## To do

Yeah, lots of things 😁

For example, with the new version I also changed the wording of “Planner” to “Playlists”. But this is still the same basic radio station stream switching. Ultimately I want to be able to switch between radio and podcasts.

❤ Rianne

Originally posted at [Medium.com](https://medium.com/@robinbakker/updating-my-web-app-side-project-3963d818226)
