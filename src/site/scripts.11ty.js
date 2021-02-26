const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

// also used to define the output filename in our output /js folder.
const fileName = 'default.js';

module.exports = class {
  async data() {
    const rawFilepath = path.join(__dirname, `./_includes/js/${fileName}`);
    return {
      permalink: `js/${fileName}`,
      rawFilepath,
      rawJs: await fs.readFileSync(rawFilepath),
    };
  }

  async render({ rawJs }) {
    const minified = await minify(rawJs.toString());
    return minified.code;
  }
};
