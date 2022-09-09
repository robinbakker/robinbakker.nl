const pluginPWA = require('eleventy-plugin-pwa');
const { minify } = require('terser');
const CleanCSS = require('clean-css');
const Image = require('@11ty/eleventy-img');
const path = require('path');
const pluginRss = require('@11ty/eleventy-plugin-rss');

const markdownIt = require('markdown-it');
const markdownItOptions = {
  html: true,
};
const mila = require('markdown-it-link-attributes');
const milaOptions = {
  pattern: /^https?:\/\//, //^(https?:\/\/)(?!(https:\/\/domain\.com|#)).*$
  attrs: {
    target: '_blank',
    rel: 'noopener',
  },
};

const imageShortcode = async (src, alt, className, widths = [null, 300, 600], formats = ['jpeg', 'webp'], sizes = '100vw') => {
  const metadata = await Image(src, {
    widths,
    formats,
    urlPath: '/assets/img/',
    outputDir: './dist/assets/img',
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src);
      const name = path.basename(src, extension);
      return `${name}-${width}w.${format}`;
    },
  });

  const imageAttributes = {
    alt,
    sizes,
    loading: 'lazy',
    decoding: 'async',
    class: className || '',
  };

  return Image.generateHTML(metadata, imageAttributes);
};

/**
 * Split a long title into multiple rows
 */
function wrapTitle(title, rowLength, maxRows) {
  if (!title || typeof title !== 'string') return [];
  let titleRows = [];
  let words = title.split(/(?<=[^a-zA-Z0-9()<>""''])/);
  let row = '';
  words.forEach((wrd) => {
    if (row.length + wrd.length >= rowLength) {
      titleRows.push(row);
      row = '';
    }
    row += wrd;
  });
  if (row) {
    titleRows.push(row);
  }
  // Limit rows...
  if (titleRows.length > maxRows) {
    titleRows.length = maxRows;
    titleRows[maxRows - 1] = titleRows[maxRows - 1].trimEnd() + '…';
  }
  return titleRows;
}

// Example from https://github.com/11ty/eleventy-img/issues/40
// Convert SVG to our social media sharing image
const socialImage = async (title, author, bgImage) => {
  let linesArray = wrapTitle(title, 20, 3); // Returns an array like ["my title","broken up","into lines."]
  linesArray[0] = linesArray[0] || '';
  linesArray[1] = linesArray[1] || '';
  linesArray[2] = linesArray[2] || '';

  const authorLine = author;
  const offsetLeft = 180;

  const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" style="isolation:isolate;fill:#fff;font-family:Arial,Helvetica,sans-serif;font-weight:bold;" viewBox="0 0 1200 630" font-family="sans-serif" font-size="80">
    <defs><clipPath id="a"><path d="M0 0h1200v630H0z"/></clipPath></defs>
    <g clip-path="url(#a)"><path ${
      bgImage ? `style="background-image:url(${bgImage});background-size:contain;"` : 'fill="#0072FF"'
    } d="M0 0h1200v630H0z"/>
      <circle vector-effect="non-scaling-stroke" cx="55.9" cy="214.8" r="159.3" fill="#FFF" fill-opacity=".4"/>
      <path d="M-5.777 303.313 174.451 483.54c12.433 12.434 12.433 32.623 0 45.057l-30.038 30.038c-12.434 12.434-32.623 12.434-45.057 0L-80.872 378.407c-12.433-12.433-12.433-32.623 0-45.056l30.038-30.038c12.434-12.434 32.623-12.434 45.057 0Z" fill="#FFF" fill-opacity=".4"/>
      <circle vector-effect="non-scaling-stroke" cx="1170.614" cy="214.8" r="159.3" fill="#FFF" fill-opacity=".4"/>
      <circle vector-effect="non-scaling-stroke" cx="1170.614" cy="427.2" r="159.3" fill="#FFF" fill-opacity=".4"/>
    </g>
    <text x="${offsetLeft}" y="200">${linesArray[0]}</text>
    <text x="${offsetLeft}" y="300">${linesArray[1]}</text>
    <text x="${offsetLeft}" y="400">${linesArray[2]}</text>
    <text x="${
      offsetLeft + 50
    }" y="520" font-size="40" style="font-family:Arial,Helvetica,sans-serif;font-weight:normal;" fill="#95c5ff">${authorLine}</text>
  </svg>`;

  const stats = await Image(Buffer.from(svgStr), {
    widths: [1200], // Facebook Opengraph image is 1200 x 630
    formats: ['png'],
    urlPath: '/assets/img/social/',
    outputDir: './dist/assets/img/social',
    //sourceUrl: svgUnique
  });

  // Iterate over formats and widths
  return stats['png'][0].url;
};

module.exports = function (config) {
  // A useful way to reference the context we are runing eleventy in
  let env = process.env.ELEVENTY_ENV;

  // Add service worker plugin
  config.addPlugin(pluginPWA, {
    //offlineGoogleAnalytics: true,
    // Define runtime caching rules.
    runtimeCaching: [
      {
        urlPattern: /\.(?:html|json|xml)$/,
        handler: 'NetworkFirst',
        options: {
          // Use a custom cache name.
          cacheName: 'content',
          expiration: {
            maxEntries: 100,
          },
        },
      },
      {
        urlPattern: /\.(?:png|jpg|jpeg|webp|svg)$/,
        handler: 'CacheFirst',
        options: {
          // Use a custom cache name.
          cacheName: 'images',
          expiration: {
            maxEntries: 100,
          },
        },
      },
    ],
  });

  config.addPlugin(pluginRss);

  // Layout aliases can make templates more portable
  config.addLayoutAlias('default', 'layouts/base.njk');

  // Minify the html output
  config.addTransform('htmlmin', require('./src/utils/minify-html.js'));

  config.addNunjucksAsyncFilter('jsmin', async function (code, callback) {
    try {
      const minified = await minify(code);
      callback(null, minified.code);
    } catch (err) {
      console.error('Terser error: ', err);
      // Fail gracefully.
      callback(null, code);
    }
  });

  config.addNunjucksAsyncShortcode('image', imageShortcode);
  config.addNunjucksAsyncShortcode('socialImage', socialImage);
  config.addShortcode('externalLink', (url, text) => `<a href="${url}" rel="noopener" target="_blank">${text}</a>`);

  const markdownLib = markdownIt(markdownItOptions).use(mila, milaOptions);
  config.setLibrary('md', markdownLib);

  config.addFilter('date', require('./src/utils/filters/date.js'));
  config.addFilter('dateISO', require('./src/utils/filters/dateISO.js'));
  config.addFilter('excludePage', require('./src/utils/filters/exclude-page.js'));
  config.addFilter('getInlineSVG', require('./src/utils/filters/get-inline-svg.js'));
  config.addFilter('removeUrlLocale', require('./src/utils/filters/remove-url-locale.js'));

  config.addFilter('cssmin', function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  config.addFilter('titleCase', function (text) {
    return text[0].toUpperCase() + text.slice(1);
  });

  // Make the seed target act like prod
  env = env == 'seed' ? 'prod' : env;

  config.addCollection('posts', function (collection) {
    const c = collection
      .getFilteredByGlob(['./src/site/blog/*.md', './src/site/en/blog/*.md'])
      .filter((item) => item.data.permalink !== false)
      .filter((item) => !(item.data.draft && env === 'prod'));
    return c;
  });

  // Create an array of all tags
  config.addCollection('tagList', function (collection) {
    let tagSet = new Set();
    collection
      .getFilteredByGlob(['./src/site/blog/*.md', './src/site/en/blog/*.md'])
      .filter((item) => {
        return item.data.permalink !== false && !(item.data.draft /*&& env === 'prod'*/);
      })
      .forEach((item) => {
        (item.data.tags || []).forEach((tag) => tagSet.add(tag));
      });
    return [...tagSet];
  });

  // Pass some assets right through
  config.addPassthroughCopy('./src/site/assets');
  config.addPassthroughCopy('./src/site/favicon.ico');
  config.addPassthroughCopy('./src/site/manifest.json');
  return {
    dir: {
      input: 'src/site',
      output: 'dist',
      data: `_data/${env}`,
    },
    templateFormats: ['njk', 'md', '11ty.js'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    passthroughFileCopy: true,
  };
};
