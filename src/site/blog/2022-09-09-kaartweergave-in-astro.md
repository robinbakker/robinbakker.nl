---
title: 'Kaartweergave in Astro (en meer met maps)'
description: 'Searching for a simple map solution.'
alternateUrl: '/blog/maps-in-astro'
bodyClass: 'body--blog body--blog-image-title'
blogImage: './src/site/assets/img/blog/zion-road.jpg'
blogImageOverlay: true
blogImageAlt: 'De weg in Zion National Park, VS'
tags:
  - Maps
  - Astro
  - Preact
  - React
  - rroadtrips
---

Afgelopen zomer zijn we met een camper op rondreis gegaan door de VS... Te gek! 😎 Om thuis iedereen op de hoogte te houden wilde ik een reisblog maken ([rroadtrips.com](https://www.rroadtrips.com)), met een kaart om de route te tonen.

Ik wilde graag eens iets maken met [Astro](https://astro.build), een "static" site builder. Tegelijkertijd had ik er ook niet heel veel tijd voor vrijgemaakt. 😅 Dus ging ik op zoek naar een eenvoudige oplossing om een kaart weer te geven. Omdat Astro om kan gaan met verschillende front-end framework componenten, dacht ik dat het wel makkelijk zou zijn om een React component te zoeken en deze in te zetten.

Toch ben ik daar eigenlijk vrij snel van teruggekomen. Astro is vooral gericht op het genereren van statische pagina's, waarbij zoveel mogelijk javascript wordt weggelaten. Een maps component zou wel javascript moeten hebben om deze interacief te maken. Het leek me dan wel een beetje overdreven om dan de complete React library in te laden voor één component. 🤔 [Preact](https://preactjs.com) (het 3KB alternatief voor React) leek me een beter plan. En als ik dan toch Preact zou gaan gebruiken, dan zijn andere Preact components die statisch worden weergegeven in Astro ook makkelijker toe te voegen.

### Langer verhaal kort:

Uiteindelijk koos ik voor een simpele Preact component implementatie met [Leaflet](https://leafletjs.com) (en OpenStreetMap kaart). Voornamelijk gebaseerd op [dit stackoverflow artikel](https://stackoverflow.com/questions/70578136/leaflet-usage-in-preact-js). Vervolgens met het attribuut `client:only="preact"` om het component aan de client-side te laten opbouwen. Ik gebruikte TypeScript, en om het werkend te maken met Astro moest ik de import schrijven [includief ".tsx" extensie](https://twitter.com/robinbakker/status/1547685193682599939). Dat werkte! 🥳

{% image "./src/site/assets/img/blog/rroadtrips-map.png", "Voorbeeld van de kaartweergave op ons blogje; een kaart met markers en een lijst van locaties (Leaflet/OpenStreetMap)","article-image", [800, 1024, 1200] %}
_De kaartweergave op rroadtrips.com_

---

Toen ik op zoek was naar componenten en andere map oplossingen ben ik veel andere interessante bronnen tegengekomen. Ik zet ze hier even neer, voornamelijk voor mezelf om later terug te vinden - maar misschien is het ook voor anderen handig! 😜

## Handige React componenten

Hier zijn een paar componenten die ik heb geprobeerd voordat ik overstapte op het Preact component wat ik hierboven beschreef. ⬆️

### Pigeon Maps (React/OpenStreetMap)

[https://pigeon-maps.js.org](https://pigeon-maps.js.org)  
_Gebruikte dit component als eerste in Astro. Werkte goed, iets gelimiteerd in mogelijkheden_

### React Simple Maps (React/d3-geo/topojson)

[https://www.react-simple-maps.io](https://www.react-simple-maps.io)  
_Ook geprobeerd, maar door de oude package dependencies vond ik dit niet ideaal_

### React Leaflet (React/Leaflet)

[https://react-leaflet.js.org](https://react-leaflet.js.org)  
_Werkte ook, maar vond ik te groot/uitgebreid voor mijn usecase_

## Map providers

### Google Maps

[https://developers.google.com/maps/documentation](https://developers.google.com/maps/documentation)

### OpenStreetMap

[https://www.openstreetmap.org](https://www.openstreetmap.org)

### HERE maps

[https://developer.here.com/develop/javascript-api](https://developer.here.com/develop/javascript-api)

### Mapbox

[https://www.mapbox.com](https://www.mapbox.com)

### TomTom maps

[https://developer.tomtom.com/products/maps-api](https://developer.tomtom.com/products/maps-api)

### Mapzen/Nextzen/Tilezen

[https://www.mapzen.com](https://www.mapzen.com)  
[https://www.nextzen.org](https://www.nextzen.org)  
[https://github.com/tilezen](https://github.com/tilezen)

## Map libraries/frameworks

### Leaflet (javascript library)

[https://leafletjs.com](https://leafletjs.com)

### OpenLayers

[https://openlayers.org](https://openlayers.org)

### MapLibre

[https://maplibre.org](https://maplibre.org)

### Mapbox GL JS

[https://docs.mapbox.com/mapbox-gl-js](https://docs.mapbox.com/mapbox-gl-js)

### react-map-gl (React/Mapbox GL JS)

[https://visgl.github.io/react-map-gl](https://visgl.github.io/react-map-gl)

### deck.gl (WebGL)

[https://deck.gl](https://deck.gl)

### Maptalks (javascript)

[https://maptalks.org](https://maptalks.org)

### Tangram (javascript/WebGL)

[https://github.com/tangrams/tangram](https://github.com/tangrams/tangram)

## Overig

### Geolib

[https://github.com/manuelbieh/geolib](https://github.com/manuelbieh/geolib)  
Library to provide basic geospatial operations like distance calculation, conversion of decimal coordinates to sexagesimal and vice versa, etc.

### Turf.js

[https://turfjs.org](https://turfjs.org)  
Advanced geospatial analysis for browsers and Node.js

### Mapus

[https://github.com/alyssaxuu/mapus](https://github.com/alyssaxuu/mapus)  
Een map tool met real-time samenwerken

### OpenMapTiles

[https://openmaptiles.org](https://openmaptiles.org)  
Open-source maps gemaakt voor self-hosting
