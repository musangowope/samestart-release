export const scrollToElement = (
  domNode,
  minusTop = 0,
  behavior = 'smooth',
) => {
  const top =
    window.pageYOffset +
    domNode.getBoundingClientRect().top -
    minusTop;
  window.scrollTo({
    top,
    behavior,
  });
};
