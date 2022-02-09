---
title: 'Lekker bloggen'
description: 'Met Eleventy (11ty) is bloggen lekker overzichtelijk'
alternateUrl: '/en/blog/lets-blog'
tags:
  - Eleventy
  - Jamstack
  - IndieWeb
  - Netlify
  - GitHub
---

Ik heb eerder stukjes geschreven op [Medium.com](https://medium.com/@robinbakker). Nu leek het mij ook wel logisch om deze artikelen op mijn eigen website te plaatsen. Tijd dus om een blog gedeel toe te voegen! Dan is het ook makkelijk om hier nieuwe posts toe te voegen.

## Eleventy (11ty)

Voor mijn eigen website gebruik ik [Eleventy](https://www.11ty.dev/), een static site generator. Dit biedt heel veel flexibiliteit en is in de basis snel en eenvoudig te gebruiken. De output is net zo simpel; statische HTML, CSS en javascript (wat je na het builden ook nog begrijpt 😉).

### Voorbeelden

Omdat ik eerder een vrij simpele setup had met enkele pagina's, ging ik even op zoek naar voorbeelden. Je kunt er heel wat vinden op de [Starter Projects](https://www.11ty.dev/docs/starter/) pagina van 11ty, maar ik heb met name naar deze gekeken;

1. [eleventy-base-blog](https://github.com/11ty/eleventy-base-blog) van [Zach Leatherman](https://www.zachleat.com/) (Mr 11ty)
1. [Eleventastic](https://github.com/maxboeck/eleventastic/) van [Max Böck](https://mxb.dev)
1. [Sample 11ty blog](https://github.com/jeromecoupe/sample-11ty-blog) van [Jérôme Coupé](https://www.webstoemp.com/)

Eigenlijk komt het erop neer dat je alle teksten in Markdown schrijft, en er dan eigenlijk al bent. Je hebt zelf de vrijheid om custom meta informatie toe te voegen (en zelf te implementeren).

### Talen

Omdat ik graag zowel Engels als Nederlands wil gebruiken, moest ik weer even denken over de te gebruiken url's. Eerder had ik er al voor gekozen om voor Engels alles onder "/en" te plaatsen, en dit voor Nederlands niet te doen. In normale situaties zou je ervoor kiezen om alle talen dan zo te doen, maar op een "nl" domein vond ik het een beetje dubbelzinnig om daar dan ook nog "/nl" achter te gaan plakken. Vanwege de talen heb ik ervoor gekozen voor een optionele "alternateUrl" property, zodat als ik een blog post voor beide talen zou schrijven, dat ook terug te zien zou zijn in de "alternate" links in HTML.

### Afbeeldingen

Daarnaast had ik ook nog een oplossing nodig voor het eenvoudig toevoegen van afbeeldingen. Met de [eleventy-img](https://www.11ty.dev/docs/plugins/image/) plugin kun je high-res afbeeldingen opnemen in je project en dan bij build-time de afbeeldingen laten genereren naar verschillende gewenste formaten (en laten optimaliseren).  
Je kunt ook een gemakkelijke "shortcode" gebruiken om een HTML picture element te laten genereren met de afbeeldingen in verschillende formaten voor verschillende schermgroottes.

## Publiceren

Elke wijziging of toevoeging push ik naar de GitHub repo. In combinatie met de automatische builds op [Netlity](https://www.netlify.com/) is dat echt fantastische oplossing!  
GitHub is zo de bron voor de website, Netlify koppel je aan je domein en deze dienst build dus de website automatisch. Van elke build kun je ook achteraf nog de website bekijken (je kunt versies terug). Dit is wel echt de basis van wat Netlify biedt, maar werkt echt verdomd goed. 🚀

Je bent overigens ook niet gebonden aan de bovenstaande setup. Er zijn ook verschillende vergelijkbare alternatieven zoals [GitLab](https://about.gitlab.com/) i.p.v. GitHub en andere "providers" zoals [Vercel](https://vercel.com/) of [Cloudflare Pages](https://pages.cloudflare.com/) die ook vergelijkbaar werken.

## Distributie?

Vooralsnog voeg ik dus nieuwe stukjes toe op mijn eigen website, maar dit zal incidenteel zijn. Distributie is dan wel een probleem, want wie kijkt hier nu? Cross-posten op Medium en andere sites als [dev.to](https://dev.to) en [Hashnode](https://hashnode.com/) zal dan misschien wel een optie zijn. Onderdeel worden van de IndieWeb [POSSE](https://indieweb.org/POSSE). 😉 Daar ben ik nog niet helemaal uit.  
Eerst maar posten op Twitter...

👋
