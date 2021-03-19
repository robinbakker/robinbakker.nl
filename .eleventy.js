const pluginPWA = require('eleventy-plugin-pwa');
const { minify } = require('terser');
const CleanCSS = require('clean-css');

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

  // Layout aliases can make templates more portable
  config.addLayoutAlias('default', 'layouts/base.njk');

  // minify the html output
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

  config.addFilter('getInlineSVG', require('./src/utils/filters/get-inline-svg.js'));

  config.addFilter('cssmin', function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // pass some assets right through
  config.addPassthroughCopy('./src/site/assets');
  config.addPassthroughCopy('./src/site/favicon.ico');
  config.addPassthroughCopy('./src/site/manifest.json');

  // make the seed target act like prod
  env = env == 'seed' ? 'prod' : env;
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
