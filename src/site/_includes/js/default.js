const themeClass = localStorage.getItem('theme');
let userLang = localStorage.getItem('lang');
const docLang = document.documentElement.lang;
if (themeClass) document.body.classList.add(themeClass);
if ('serviceWorker' in navigator) navigator.serviceWorker.register('/service-worker.js');
(function () {
  const switchLanguage = function (lang, url) {
    if (!url) {
      let langLink = document.querySelector('link[hreflang=' + userLang + ']');
      if (!langLink || !langLink.href) return;
      url = langLink.href;
    }
    document.documentElement.lang = lang;
    const langItems = document.querySelectorAll('.js-lang');
    if (!langItems || !langItems.length) {
      if (window.location.hostname === 'localhost') {
        url = window.location.href;
      } else {
        // no internal swich possible, redirect
        window.location.href = url;
        return;
      }
    }
    langItems.forEach((langItem) => {
      if (langItem.lang && langItem.lang == lang) {
        langItem.classList.remove('is-hidden');
      } else {
        langItem.classList.add('is-hidden');
      }
    });
    window.history.pushState({}, '', url);
  };
  if (userLang) {
    if (docLang != userLang) {
      localStorage.setItem('lang', userLang);
      switchLanguage(userLang);
    }
  } else if (navigator.language) {
    if (navigator.language.indexOf('nl') === 0) {
      //set to nl
      userLang = 'nl';
    } else {
      //set to en
      userLang = 'en';
    }
    localStorage.setItem('lang', userLang);
    switchLanguage(userLang);
  }

  const langSwitchLinks = document.querySelectorAll('.js-lang-click');
  langSwitchLinks.forEach((item) => {
    item.addEventListener('click', (ev) => {
      if (!ev.currentTarget.dataset || !ev.currentTarget.dataset.lang) return;
      localStorage.setItem('lang', ev.currentTarget.dataset.lang);
      switchLanguage(ev.currentTarget.dataset.lang, ev.currentTarget.href);
      ev.preventDefault();
    });
  });

  // observing intersection
  let homeItems = document.querySelectorAll('.js-home-item');
  const video = document.getElementById('homepage-video');
  const hiddenVideo = window.getComputedStyle(video).display === 'none';

  const callback = (entries, _observer) => {
    entries.forEach((entry) => {
      if (entry.target.classList.contains('home-item--start')) {
        document.body.className = entry.target.getAttribute('data-class');
        homeItems.forEach((item) => {
          item.classList.remove('fade-in');
        });
        return;
      } else if (entry.target.classList.contains('home-item--intro')) {
        if (video.paused && !hiddenVideo) {
          video.play();
        }
      } else if (entry.target.classList.contains('home-item--1tuner') && !hiddenVideo) {
        video.pause();
      }
      if (entry.isIntersecting) {
        document.body.className = entry.target.getAttribute('data-class');
        entry.target.classList.add('fade-in');
      }
    });
  };

  const options = {
    threshold: 0.7,
  };

  const observer = new IntersectionObserver(callback, options);

  homeItems.forEach((item) => observer.observe(item));

  const cLogFontStyle = 'font-size:16px;font-weight:bold;';
  console.log('%cI %c❤ %cDevTools', cLogFontStyle, 'font-size:14px;color:#f00;', cLogFontStyle);

  let hiCode = 'aGVlaGFhaWRpZWhvbw==';
  Object.defineProperty(window, atob(hiCode), {
    get: () => {
      console.log('Hi!');
      const hiButton = document.createElement('button');
      hiButton.appendChild(document.createTextNode('🙋‍♂️'));
      hiButton.addEventListener('click', function (ev) {
        ev.preventDefault();
        console.log('klik...');
        fetch('https://hi.robinbakker.workers.dev', { method: 'POST', mode: 'cors', headers: { 'X-Custom-Hi': hiCode }, body: 'hi=' + hiCode })
          .then((response) => response.text())
          .then((text) => {
            let items = document.querySelectorAll('.js-hi');
            [...items].forEach((item) => {
              item.innerHTML = text;
              item.className = '';
            });
          });
        hiButton.remove();
      });
      hiButton.className = 'hi';
      document.body.appendChild(hiButton);
    },
  });
  Object.defineProperty(window, 'hi', {
    get: () => {
      console.log('Hi!');
    },
  });

  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome from showing the mini-infobar
    e.preventDefault();
  });

  const dateNow = new Date();
  const hourOffset = dateNow.getMonth() > 2 && dateNow.getMonth < 10 ? 2 : 1;
  const myHour = dateNow.getUTCHours() + hourOffset;
  let showTimeElms;
  if (myHour > 22 || myHour < 7) {
    console.log(myHour + 'sleep');
    showTimeElms = document.querySelectorAll('.js-about-time--sleep');
  } else if (myHour === 7) {
    showTimeElms = document.querySelectorAll('.js-about-time--breakfast');
  } else if (myHour === 12) {
    showTimeElms = document.querySelectorAll('.js-about-time--lunch');
  } else if (myHour === 14) {
    showTimeElms = document.querySelectorAll('.js-about-time--fruit');
  } else if (myHour === 17) {
    showTimeElms = document.querySelectorAll('.js-about-time--dinner');
  } else if (myHour === 10 || myHour === 15 || myHour === 20) {
    showTimeElms = document.querySelectorAll('.js-about-time--coffee');
  }
  if (showTimeElms && showTimeElms.length) {
    showTimeElms.forEach((showItem) => {
      showItem.classList.remove('is-hidden');
    });
  }
})();
