module.exports = (date, locale = 'nl-NL') => {
  const d = new Date(date);
  return d.toISOString(locale);
};
