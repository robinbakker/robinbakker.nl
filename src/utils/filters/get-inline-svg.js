const fs = require('fs');
const baseLocation = './src/site/assets/img/';

module.exports = (fileName, wrapperClassName) => {
  const fileLocation = `${baseLocation}${fileName}`;
  if (!fs.existsSync(fileLocation)) return '';
  let result = fs.readFileSync(fileLocation, 'utf8');
  return wrapperClassName ? `<div class="svg-wrapper ${wrapperClassName}">${result}</div>` : result;
};
