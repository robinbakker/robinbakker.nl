---
title: 'Creating a web app as side project'
description: 'About the process of building my personal little side project 1tuner.com 📻'
bodyClass: 'body--blog body--blog-image-title'
blogImage: './src/site/assets/img/blog/1tuner.jpg'
blogImageOverlay: true
blogImageAlt: '1tuner background image showing old radios'
tags:
  - side projects
  - web apps
  - Preact
  - 1tuner
  - radio
---

[1Tuner](https://1tuner.com) is a progressive web app that you can use to listen to online radio. And it allows you to plan your own ideal radio listening day, so the player switches between radio streams automatically.
The app is pretty basic, but it changed while I was learning during development of it. In this article I will try to describe the process and decisions.

## The "problem"

At the office, we always listened to good-old radio. For years, we tuned our browser to the audio stream of the Dutch public radio channel 3FM. We heard nice pop/rock tunes, some fine jocks and a good news service.
Then came our problem, jocks left the station, and a music format switch brought us shittier music (and OK, a better logo maybe). At the same time, the dusty Dutch Radio 2 was changing as well - for the better in our opinion (reluctantly admitted at first). We were also looking for other alternatives. In the end, we switched throughout the day to Radio 2, to 3FM, to Radio 2 etc...
I knew this had to be fixed. So I started a new web app to start Radio 2.5; an automatic stream switcher.

{% image "./src/site/assets/img/blog/1tuner-3fm.png", "NPO 3FM logo","article-image", [800, 1024, 1200] %}

## Where to start

I was fairly late to the "front-end framework party", and wanted to dive in. This side project seemed ideal for that. I started with [Vue.js](https://vuejs.org/), and wanted to try [Webpack](https://webpack.js.org/) as well. I found some basic boilerplate projects and started by trial and error. Lots of errors actually… The thing with side projects is: time. I'm not sure how other people manage this, but to be fair it's hard to start up each time when you leave your code behind for some days. And when you finally found out where you got stuck, it's time to sleep! 🙄 I was struggling in the world of Webpack modules and loaders, and somehow corrupted npm modules.
Another confusing problem at first, was the audio element. Initially I used the "autoplay" attribute, and then just changed the audio source. This worked in Chrome on desktop, but not on mobile - audio didn't play on mobile.
It took some time before I understood this was an "autoplay" problem (later on, the autoplay behaviour was the same on desktop).
From my experience; just avoid using autoplay 🙂. Nowadays you also should trigger audio change on user gestures like the tap/click of a button.

## Start over

Once I had a basic app that was switching the audio streams, I was done with it for some time. But I also read a lot about [Preact](https://preactjs.com/), and when [preact-cli](https://github.com/developit/preact-cli) came by in my Twitter timeline, I wanted to try that! So I started from scratch. Or maybe not really, because preact-cli works like a charm right out of the box.
One thing that bothered me with my previous setup was file size and loading times. I was using Firebase as well, which was actually quite big (with all the bells & whistles). And together with all inefficient things I had included, the total (optimized & minified) size was ridiculous - because I was just tinkering around.
The fresh start with Preact was also reason to keep things more efficient. Finally, I came to the conclusion that I needed to keep things as simple as possible. So no more authentication and saving to Firebase, but save all user data locally, and use the power of URL's! Progressive web apps rock! 😎

## UI / Design

OK, don't laugh. I really thought things through. I wanted an interface that was as clean as possible, because the main way to use the app would be to tap and listen.

### Icon

The main branding would be the app icon. But I still had to choose a name and register a domain. First it was stream-zapper, stream-switch, tunar, stream-tune... I ended up with 1tuner.com. One advantage of the name is that it's on top at your app list/drawer when it's sorted alphabetically. 😉

{% image "./src/site/assets/img/blog/1tuner-icons.png", "Progress in icons","article-image", [800, 1024, 1200] %}

For the logo and icons, I used the online vector tool [Gravit Designer](https://designer.gravit.io/) - it's free and pretty amazing actually. Open, edit and save to SVG.

### Fonts

Because I wanted a quick loading and a native-like app experience, I wanted to go with system fonts. By using system fonts, you always get the default font of the device. Stuart Frisby wrote a nice article about [implementing system fonts on Booking.com](https://booking.design/implementing-system-fonts-on-booking-com-a-lesson-learned-bdc984df627f).

### Layout

I started with a default header menu and a play button on the main screen. Then I moved the play button to a fixed positioned footer.
Recently I moved the navigation to a fixed icon/tab bar for mobile and left-hand menu for bigger screens. For web apps, the tab bar navigation can be problematic because in some browsers you get a double navigation at the bottom (app + browser navigation). But overall the experience is better this way I guess.

{% image "./src/site/assets/img/blog/1tuner-devices.png", "1tuner.com displayed on tablet and phone","article-image", [800, 1024, 1200] %}

## PWA features

I use the [Media Session API](https://developers.google.com/web/updates/2017/02/media-session) to display the current playing radio station notification. Obviously this puts in the "progressive" part in the web app, as this only seems to be supported in Chrome on Android right now. However, it works out great; you'll see the logo with play/pause on your lock screen, and even on your smartwatch!

{% image "./src/site/assets/img/blog/1tuner-media-session.jpg", "Testing the Media Session API","article-image", [800, 1024, 1200] %}

The Media Session API gives the web app a "native app feel"As you may have noticed there is only a "pause" icon. Because in the 1tuner app you are listening to "live" radio, I handle the pause event as "stop". Unfortunately, there seems to be no stop event/icon from the media notification right now.

The [Web Share API](https://developers.google.com/web/updates/2016/09/navigator-share) is another great addition to the app. It's easy to use and directly opens up the native share menu when you click the share icon.

### Other

- Navigator.languages/language for the default "Region" filter.
- I use [idb-keyval](https://github.com/jakearchibald/idb-keyval) from Jake Archibald, a simple way to store key/value data that is implemented with IndexedDB.

## Tools, services & resources

It's just so great that there are so much free tools and services!
Yes, I'm Dutch. 😁 An overview:

1. [Visual Studio Code](https://code.visualstudio.com/) is awesome to use with the integrated terminal, together with preact-cli and live reloading. 👍
2. [Preact-cli](https://github.com/preactjs/preact-cli) is amazing, you can start with some demo projects, routing, pre-render and a service worker that just works out of the box. [Preact](https://github.com/preactjs/preact) is like React, but smaller! Big thanks to Jason Miller.
3. I used the online vector design tool [Gravit Designer](https://designer.gravit.io/) for the logo and icons. You should really try this out!
4. Gravit Designer easily exports to SVG, but the output can still be optimized. If you don't have it automated in your project, you should use the excellent [SVGOMG](https://jakearchibald.github.io/svgomg/) from Jake Archibald.
5. To get all the app icons: https://realfavicongenerator.net. It's pretty full featured as you even get a Safari Pinned Tab SVG traced icon for instance. You can also use the favicon generator API and use this in your own automated tasks.
6. I use [Firebase](https://firebase.google.com/) for hosting and the database. I don't use much of the other features anymore, but authentication for client-side apps is really easy with Firebase!
7. The header image is from [Pexels](https://www.pexels.com/), a free stock photo library (CC0 license).

## Upcoming versions

Besides debugging and adding more radio stations, I have a couple more ideas that I would like to add to the app;

- Let users add radio stations.
- Share planning with timezone support. Had a quick look earlier, but this is a bit complex because of daylight saving times.
- Podcast support (also for use in the planner).
- An option to cast to Chromecast directly.

Edit 29 January 2020:
See also the follow up: [Updating my web app side project](../updating-my-web-app-side-project)

Thanks

❤ Rianne

🙂

Originally posted at [Medium.com](https://medium.com/@robinbakker/creating-a-web-app-as-side-project-2b8f96a44893)
