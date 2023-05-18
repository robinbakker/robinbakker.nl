---
title: 'Van audio naar tekst met AI'
description: 'Over het maken van Skipcast.nl; actuele podcast samenvattingen'
bodyClass: 'body--blog body--blog-image-title'
blogImage: './src/site/assets/img/blog/podcast-transcibers.png'
blogImageOverlay: true
blogImageAlt: 'Podcast transcribers as imagined by Dall-E'
tags:
  - AI
  - KI
  - podcasts
  - Astro
  - Preact
  - hobbyproject
---

Podcasts zijn de afgelopen jaren enorm populair geworden. Steeds meer mensen luisteren naar hun favoriete shows terwijl ze onderweg zijn, aan het sporten zijn of gewoon thuis ontspannen. Maar hoe zou je nu op de hoogte kunnen blijven van al die populaire podcasts, zonder er direct naar te hoeven luisteren?  
Dat was de vraag die ik me stelde toen ik me verdiepte in het gebruik van AI/KI technologie in web projecten. Samenvatten is iets wat chatbots zoals ChatGPT heel goed kunnen [^1]. Dus waarom niet met podcasts? Ik werkte al met podcastgegevens voor mijn andere hobbyprojecten [1tuner.com](https://1tuner.com) en [topzender.nl](https://topzender.nl), dus de basisgegevens had ik al. De eerste stap was het automatisch transcriberen (het omzetten van audio naar tekst) van podcastafleveringen.

{{ 'blog/openai-logo.svg' | getInlineSVG('skipcast-openai-logo') | safe }}

**Whisper**  
In september 2022 maakte [OpenAI](https://openai.com) Whisper open source. Whisper is een automatisch spraakherkenningssysteem dat audio kan omzetten naar tekst. Er stonden al veel varianten gebaseerd op de oorspronkelijke code op Github. Ik zag dat de [C/C++ port van Whisper](https://github.com/ggerganov/whisper.cpp) als basis diende voor veel projecten. Ik wist alleen niet goed hoe ik dit zou kunnen gebruiken.

**Chatten met Bing**  
AI to the rescue! Ik had net toegang gekregen tot de nieuwe [Bing chat](https://www.bing.com/search?q=Bing+AI&showconv=1&FORM=hpcodx), dus besloot ‘m te bevragen. 😃 Ik kreeg een 10-stappenplan vanaf het downloaden van de Github repository tot het draaien van de gegenereerde executable in een Powershell script. Wat een openbaring. Dit had ik natuurlijk ook prima zelf kunnen zoeken, maar de snelheid en super specifieke afhandeling van mijn vraag was op dat moment ongelooflijk - alsof je ineens in de toekomst van zoeken op internet was gestapt.

**Powershell scripting**  
Ik had geen ervaring met Powershell scripts voordat ik dit project begon, maar dit kon ik de Bing chat ook vragen. Al snel had ik een script draaien waarmee de laatste afleveringen van de Apple top-10 podcasts lijst werden gedownload. Vervolgens gebruikte ik [ffmpeg](https://ffmpeg.org) om elk mp3-bestand om te zetten naar een low-fi wav-bestand, zodat Whisper ermee aan de slag kon.  
Op mijn laptop ging het vrij snel. De eerste Nederlandse podcast die ik deed werd een Engelse tekst. Tot mijn verbazing was het dus direct vertaald in vrij goed lopende Engelstalige zinnen!

**Whisper parameters**  
Je kunt Whisper parameters meegeven om bijvoorbeeld aan te geven welk model ingeladen moet worden en in welke taal de audio-opname is. Uiteindelijk werkte ik met het “small” model, wat nog best veel foutjes teruggeeft, maar qua performance en resultaat acceptabel is.  
Die “foutjes” zie je terug in sommige zinnen, bij vreemde spreektaal of typetjes (iemand die plat Arnhems praat). Maar het komt het meest voor bij namen (van personen, plaatsen, bedrijven, etc.). Een leuk voorbeeld hiervan uit het intro van de podcast “Weer een dag” van Marcel van Roosmalen en Gijs Groenteman:

{% image "./src/site/assets/img/blog/scheisse.png", "Intro tekst van de podcast 'Weer een dag'","article-image", [585] %}
_Scheisse Groentemann… 😄_

Op mijn lichtgewicht Windows servertje werkt het transcriberen wel vrij traag. Maar ik kwam erachter dat ik met ffmpeg de audio nog 1.5x kon versnellen, waardoor het transcriberen ook iets sneller ging.

**Samenvatten**  
AI taalmodellen kunnen goed samenvatten. ChatGPT of Bing kun je niet direct aanroepen, maar er zijn verschillende API's beschikbaar. Hoewel de OpenAI API niet gratis is, kan het “gpt-3.5-turbo” model goedkoop worden gebruikt. Voor een paar dollar kun je enorm veel aanroepen doen. En als je de maandlimiet instelt op bijvoorbeeld 5 dollar, dan kun je flink experimenteren zonder het gevaar dat je per ongeluk teveel uitgeeft. 😀

De aanroep van de API is eigenlijk vergelijkbaar met het gebruik van een normale chatbot. Alleen heeft deze niet zo’n goed geheugen. Als je een gesprek wilt voeren moet je zelf de chathistorie meegeven. Je kunt wel nog vooraf een “system prompt” geven voor instructies vooraf. Zo kun je bijvoorbeeld aangeven dat je resultaten uitsluitend in het Nederlands wilt ontvangen.

**Beperkingen**  
Je kunt echter niet zomaar een hele lap tekst insturen en daar een samenvatting van laten maken… Er is een limiet per prompt. Je kunt teksten wel opsplitsen in stukken van bijvoorbeeld maximaal 3000 tekens. Een tip is om te splitsen op hele zinnen. Per stuk tekst vraag ik om een samenvatting, en die losse samenvattingen plak ik weer aan elkaar. Van het geplakte resultaat vraag ik dan nog eens om een mooie samenvatting. Dit is uiteraard niet ideaal en je verliest mogelijk context, maar over het algemeen zijn de resultaten voor een podcast samenvatting prima.  
Grappig is dat de foutjes in de transcripties eigenlijk grotendeels worden verbeterd bij het samenvatten. Soms keek ik naar een transcriptie waar ik zo snel geen kaas van kon maken. De samenvatting was dan vervolgens heel helder. 😄

**Schrijfstijl**  
Voor de website wilde ik samenvattingen in verschillende schrijfstijlen. In de prompt schrijf ik dan bijvoorbeeld; “Kun je de volgende tekst samenvatten voor een 8-jarige: \[tekst\]”. Ik maak nu samenvattingen in de stijlen "Nieuws", "Kids", "Cynisch" en "Roddels". De stijl "Teleshopping" heb ik laten vallen, die gaf het minst leuke resultaat.

**De perfecte prompt**  
Voor de nieuwsvariant wilde ik de [Axios.com](https://www.axios.com) schrijfstijl aanhouden (zie ook het [Smart Brevity boek](https://www.axios.com/smart-brevity)). Mijn benadering was om te beginnen met een pakkende titel, gevolgd door een opsomming van de drie belangrijkste punten, afgesloten met een korte uitleg over waarom dit belangrijk is. Dit werd ook zo ongeveer de prompt. En het gaf goede resultaten, maar vreemd genoeg niet altijd hetzelfde resultaat (verschillende lengtes, andere opsommingen, etc).  
Uiteindelijk kwam ik tot het idee om het in het Markdown-formaat te vragen. Dus na de prompt vraag ik om dit exacte formaat:

```
### Korte pakkende zin
- Belangrijk punt
- Belangrijk punt
- Belangrijk punt

Waarom dit ertoe doet:
```

Deze aanpak werkt erg goed, omdat je hiermee het resultaat echt kunt dwingen in het gewenste formaat. En je kunt Markdown op een website ook makkelijk integreren.

**Website**  
Op basis van de data kon ik nu de podcastafleveringen gaan afbeelden. Ik koos voor [Astro](https://astro.build), omdat ik verwachtte een statische website te kunnen maken. En met Astro kun je ook Preact componenten (her)gebruiken, wat mij voor dit project ook wel handig leek.

{{ 'skipcast-logo.svg' | getInlineSVG('skipcast-logo') | safe }}

De website draait bij [Vercel](https://vercel.com), via de @astrojs/vercel adapter kun je dan ook eenvoudig paginastatistieken aanzetten.  
Nadat een podcastaflevering is verwerkt, wordt een deploy hook aangeroepen waardoor de website vernieuwd wordt.

**POM Telegram community**  
Ik luister regelmatig naar de [podcast POM](https://pom.show) - over media en technologie. Er is een bijhorende [groepschat in Telegram](https://pom.community), waar bijvoorbeeld in het “Kunstmatige Intelligentie” kanaal veel toffe links en tips gedeeld worden. Maar ook experimenten van andere luisteraars. Zo maakte Jan een nieuws website in Axios-stijl ([https://www.inhetkort.xyz](https://www.inhetkort.xyz)) en Frank een volledig [door AI gegenereerde podcast](https://1tuner.com/podcast/beyond-the-screen/aHR0cHM6Ly9mZWVkcy50cmFuc2lzdG9yLmZtL2JleW9uZC10aGUtc2NyZWVuLTg1ZDg3ZWYzLWRjYzYtNDg5NC1iMjI2LTQxYWNkM2U3ZmRiMg==) met gebruik van zijn eigen stem. Echt 🤯 dus. Ik deelde daar ook [skipcast.nl](http://skipcast.nl) en niet lang daarna zette [iemand dat op Twitter](https://twitter.com/AlexanderNL/status/1654425839566561282).

Maar nog mooier is dat Skipcast het uiteindelijk heeft gehaald [in de podcast zelf](https://share.podimo.com/play/episode/1c6e9037-53da-464e-a9ef-dd23e63bd90a/timestamp/2358?creatorId=1bd2d592-e31f-42a3-ac55-1fe40c92ecd9&key=UwRLg6r8r0OE) (link naar Podimo op 39:18)! 🤗🎉🎉

[{% image "./src/site/assets/img/blog/skipcast-youtube-pom.png", "Bekijk het stukje uit de podcast op YouTube","article-image", [240,320,480] %}](https://www.youtube.com/watch?v=gBPxej3XCUE)
_Het fragment is ook te vinden [op YouTube](https://www.youtube.com/watch?v=gBPxej3XCUE)_

**En verder?**  
Ik wilde eigenlijk liever nog de hoogtepunten uit de transcripties halen en dan snel toegang bieden aan die specifieke podcast fragmenten. Misschien dat ik dat idee nog wel verder ga uitwerken.  
Een andere vraag op Twitter was of het ook via mail gestuurd zou kunnen worden. Een soort persoonlijk overzicht zou ook leuk zijn natuurlijk.  
Zolang het leuk blijft, ga ik er nog wel aan sleutelen. Maar het zou ook goed kunnen dat ik een volgend AI experimentje ga opzetten 🤓

[^1]: Een inleiding schrijven kan ChatGPT overigens ook vrij goed, zoals je misschien wel had gemerkt. 😜
