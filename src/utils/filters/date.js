module.exports = (date, locale = 'nl-NL') => {
  const d = new Date(date);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  locale = locale === 'en' ? (locale = 'en-UK') : (locale = 'nl-NL');
  return d.toLocaleDateString(locale, options);
};
