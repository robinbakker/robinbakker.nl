---
title: 'Displaying maps in Astro (and maps resources)'
description: 'Searching for a simple map solution.'
alternateUrl: '/blog/kaartweergave-in-astro'
bodyClass: 'body--blog body--blog-image-title'
blogImage: './src/site/assets/img/blog/zion-road.jpg'
blogImageOverlay: true
blogImageAlt: 'The road in Zion National Park, USA'
tags:
  - Maps
  - Astro
  - Preact
  - React
  - rroadtrips
---

Last summer we went on a family road trip in the USA with an RV. That was awesome! For fun and to keep everyone up to date at home, I wanted to create a travel blog ([rroadtrips.com](https://www.rroadtrips.com)) with a map to show the route.

I wanted to build something with [Astro](https://astro.build) and was very time limited. 😅 So I was looking for a simple solution to display a map. Because Astro works with all kind of components/frameworks, I thought it would be easy to drop-in an existing React component and then just go with it...

However, I quickly found out that it wouldn't be that logical to do that. Astro is all about static rendering and zero javascript, and that would not be the case with an interactive map. So loading the complete React library for just one component? 🤔 [Preact](https://preactjs.com) (the 3KB React alternative) would be a better fit for this! And I could easily add other custom Preact components that would mostly render completely static with Astro.

### TL;DR

Ultimately I implemented a simple Preact component with the [Leaflet](https://leafletjs.com) libary using OpenStreetMap. Mostly based on [this answer on stackoverflow.com](https://stackoverflow.com/questions/70578136/leaflet-usage-in-preact-js). Then used the attribute `client:only="preact"` to render the component on the client-side. I had set it up as TypeScript component, and I had to import the component [with the ".tsx" extension](https://twitter.com/robinbakker/status/1547685193682599939). Then it worked! 🥳

{% image "./src/site/assets/img/blog/rroadtrips-map.png", "Example of the maps usage for our blog; a map with markers and a list of locations (Leaflet/OpenStreetMap)","article-image", [800, 1024, 1200] %}
_Map at rroadtrips.com_

---

While I was looking for components and map solutions I also stumbled upon other nice map/location resources. So I just list them here mainly for myself but well, maybe it's usefull for others too! 😜

## Useful React components

These are some of the components I tried before setting up the Preact component decribed above. ⬆️

### Pigeon Maps (React/OpenStreetMap)

[https://pigeon-maps.js.org](https://pigeon-maps.js.org)  
_Started with this one in Astro, worked very well, a bit limited_

### React Simple Maps (React/d3-geo/topojson)

[https://www.react-simple-maps.io](https://www.react-simple-maps.io)  
_Tried it but it had old dependencies and warnings, so quickly moved to the next..._

### React Leaflet (React/Leaflet)

[https://react-leaflet.js.org](https://react-leaflet.js.org)  
_Worked, but was too much for this use case_

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

## Misc

### Geolib

[https://github.com/manuelbieh/geolib](https://github.com/manuelbieh/geolib)  
Library to provide basic geospatial operations like distance calculation, conversion of decimal coordinates to sexagesimal and vice versa, etc.

### Turf.js

[https://turfjs.org](https://turfjs.org)  
Advanced geospatial analysis for browsers and Node.js

### Mapus

[https://github.com/alyssaxuu/mapus](https://github.com/alyssaxuu/mapus)  
A map tool with real-time collaboration

### OpenMapTiles

[https://openmaptiles.org](https://openmaptiles.org)  
Open-source maps made for self-hosting
