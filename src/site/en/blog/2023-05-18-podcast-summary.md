---
title: 'From audio to text with AI'
description: 'The making of Skipcast.nl; summaries of popular Dutch podcasts'
alternateUrl: '/blog/podcast-summary'
bodyClass: 'body--blog body--blog-image-title'
blogImage: './src/site/assets/img/blog/podcast-transcibers.png'
blogImageOverlay: true
blogImageAlt: 'Podcast transcribers as imagined by Dall-E'
tags:
  - AI
  - podcasts
  - Astro
  - Preact
  - side projects
---

Podcasts have become very popular in recent years. More and more people are listening to their favorite shows while on the go, exercising or just relaxing at home. But how could you keep up to date with all these popular podcasts without having to listen to them directly?
That was the question I asked myself as I looked into the use of AI technology in web projects. Summarizing is something chatbots like ChatGPT can do very well [^1]. So why not with podcasts? I was already working with podcast data for my other hobby projects [1tuner.com](https://1tuner.com) and [topzender.nl](https://topzender.nl), so I already had the basic data. The first step was to automatically transcribe (convert audio to text) podcast episodes.

{{ 'blog/openai-logo.svg' | getInlineSVG('skipcast-openai-logo') | safe }}

**Whisper**  
In September 2022, [OpenAI](https://openai.com) made Whisper open source. Whisper is an automatic speech recognition system that can convert audio to text. There were already many variants based on the original code on Github. I saw that the [C/C++ port of Whisper](https://github.com/ggerganov/whisper.cpp) served as the basis for many projects. I just wasn't sure how I could use it.

**Chatting with Bing**  
AI to the rescue! I had just gained access to the new Bing chat, so decided to query it. 😃 I was given a 10-step guide from downloading from the Github repository to running the generated executable in a Powershell script. What a revelation. Of course, I could have searched this just fine on my own, but the speed and super specific handling of my question at that point was incredible - like suddenly stepping into the future of internet search.

**Powershell scripting**  
I had no experience with Powershell scripts before starting this project, but I could ask the Bing chat to do this as well. Soon I had a script running that downloaded the latest episodes of the Apple top-10 podcasts list. Then I used [ffmpeg](https://ffmpeg.org) to convert each mp3 file to a low-fi wav file so Whisper could work with it.
The first Dutch podcast I tried became an English text. So to my surprise, it was instantly translated into pretty good sounding English sentences!

**Whisper parameters**  
You can give Whisper parameters to indicate, for example, which model to load and what language the audio recording is in. I ended up working with the "small" model, which returns quite a lot of errors, but is acceptable in terms of performance and results.
Those "errors" can be seen in some sentences, in strange dialects or unclear speech. But it is most common with names (of people, places, companies, etc.). A funny example of this from the intro of the podcast "Weer een dag" by Marcel van Roosmalen and Gijs Groenteman:

{% image "./src/site/assets/img/blog/scheisse.png", "Intro text of the podcast 'Weer een dag'","article-image", [585] %}
_Scheisse Groentemann… 😄_

On my lightweight Windows server, transcribing does work quite slowly. But I found out that I could use ffmpeg to speed up the audio another 1.5x, which made transcribing slightly faster as well.

**Summarize**  
AI language models can summarize well. You can't access ChatGPT or Bing directly via code, but there are several APIs available. Although the OpenAI API is not free, the "gpt-3.5-turbo" model can be used inexpensively. For a few dollars, you can make a huge number of calls. And if you set the monthly limit to, say, $5, you can experiment quite a bit without the danger of accidentally overspending 😀.

Calling the API is actually similar to using a normal chatbot. Only this one doesn't have such a good memory. If you want to make a call, you have to provide the chat history yourself. However, you can still provide a "system prompt" for instructions in advance. For example, you can indicate that you want to receive results in Dutch only.

**Limitations**  
However, you can't just send in an entire chunk of text and have it summarized... There is a limit per prompt. However, you can split texts into pieces of up to 3000 characters, for example. It is recommended to split on whole sentences. For each piece of text I ask for a summary, and those separate summaries I paste back together. From the pasted result I then ask again for a nice summary. This is obviously not ideal and you may lose context, but generally the results for a podcast summary are fine.
What's funny is that the errors in the transcriptions are actually largely corrected in summarizing. Sometimes I looked at a transcription that I couldn't understand so quickly. Then the summary was very clear afterwards. 😄

**Writing style**  
For the website, I wanted summaries in different writing styles. For example, in the prompt I would write; "Can you summarize the following text for an 8-year-old: [text]". I now create summaries in the styles "News", "Kids", "Cynical" and "Gossip".

**The perfect prompt**  
For the news version, I wanted to adopt the [Axios.com](https://www.axios.com) writing style (see also the [Smart Brevity book](https://www.axios.com/smart-brevity)). My approach was to start with a catchy title, followed by a list of the three most important points, ending with a brief explanation of why this matters. This also pretty much became the prompt. And it gave good results, but strangely not always the same results (different lengths, different bullet points, etc).
Finally I came to the idea of asking for it in Markdown format. So after the prompt I ask for this exact format:

```
### Catchy title
- Important point
- Important point
- Important point

Why this matters:
```

This approach works very well because it allows you to really force the result into the desired format. And you can also easily integrate Markdown on a web site.

**Website**  
Based on the data, I could now start rendering the podcast episodes. I chose [Astro](https://astro.build), because I expected to create a static website. And Astro also allows you to (re)use Preact components, which I thought would also come in handy for this project.

[{{ 'skipcast-logo.svg' | getInlineSVG('skipcast-logo') | safe }}](http://skipcast.nl)

The website runs at [Vercel](https://vercel.com). Via the @astrojs/vercel adapter you can therefore easily turn on page statistics.
After a podcast episode is processed, a "deploy hook" is called which refreshes the website.

**POM Telegram community**  
I regularly listen to the [Dutch podcast POM](https://pom.show) - about media and technology. There is a related [group chat in Telegram](https://pom.community), where, for example, in the "Artificial Intelligence" channel many cool links and tips are shared. But also experiments from other listeners. For example, Jan created an Axios-style news website ([https://www.inhetkort.xyz](https://www.inhetkort.xyz)) and Frank a completely [AI-generated podcast](https://1tuner.com/podcast/beyond-the-screen/aHR0cHM6Ly9mZWVkcy50cmFuc2lzdG9yLmZtL2JleW9uZC10aGUtc2NyZWVuLTg1ZDg3ZWYzLWRjYzYtNDg5NC1iMjI2LTQxYWNkM2U3ZmRiMg==) using his own voice. So really 🤯. I also shared [skipcast.nl](http://skipcast.nl) there and not long after, [someone shared that on Twitter](https://twitter.com/AlexanderNL/status/1654425839566561282).

But even better, Skipcast ended up making it into the [podcast itself](<(https://share.podimo.com/play/episode/1c6e9037-53da-464e-a9ef-dd23e63bd90a/timestamp/2358?creatorId=1bd2d592-e31f-42a3-ac55-1fe40c92ecd9&key=UwRLg6r8r0OE)>)! 🤗🎉🎉

[{% image "./src/site/assets/img/blog/skipcast-youtube-pom.png", "Watch the snippet from the podcast on YouTube","article-image", [240,320,480] %}](https://www.youtube.com/watch?v=gBPxej3XCUE)
_The clip can also be found [on YouTube](https://www.youtube.com/watch?v=gBPxej3XCUE) (Dutch)_

**What's next?**  
I actually wanted to get the highlights from the transcripts and then provide quick access to those specific podcast snippets. Maybe I'll explore that idea further.
Another question on Twitter was whether it could also be sent via email. Some kind of personal overview would also be nice, of course.
As long as it stays fun, I'm still going to tinker with it. But it could also well be that I will set up another little AI experiment 🤓.

[^1]: By the way, ChatGPT can also write an introduction quite well, as you might have noticed. 😜
