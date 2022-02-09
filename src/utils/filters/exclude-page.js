module.exports = (pageList, excludePage) => {
  return pageList.filter((p) => p.inputPath !== excludePage.inputPath);
};
