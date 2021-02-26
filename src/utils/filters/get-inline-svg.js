const fs = require('fs');
const baseLocation = './src/site/assets/';

module.exports = (fileName) => {
  const fileLocation = `${baseLocation}${fileName}`;
  if (!fs.existsSync(fileLocation)) return '';
  let result = fs.readFileSync(fileLocation, 'utf8');
  return result;
};
