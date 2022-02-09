const fs = require('fs');
const path = require('path');
const cssnano = require('cssnano');

// also used to define the output filename in our output /css folder.
const fileName = "styles.css";

module.exports = class {
  async data () {
    const rawFilepath = path.join(__dirname, `./_includes/css/${fileName}`);
    return {
      permalink: `css/${fileName}`,
      rawFilepath,
      rawCss: await fs.readFileSync(rawFilepath)
    };
  };

  async render ({ rawCss, rawFilepath }) {
    return cssnano({ from: rawFilepath }).process(rawCss)
    .then(result => result.css);
  };
}
