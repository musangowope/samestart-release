export const scrollToElement = (domNode, minusTop = 0) => {
  const top =
    window.pageYOffset +
    domNode.getBoundingClientRect().top -
    minusTop;
  window.scrollTo({
    top,
    behavior: 'smooth',
  });
};
