export const setScrollTop = (el: Document | Element, top: number) => {
  // if (el === document || el === document.body) {
  //   top = Math.min(window.pageYOffset, document.documentElement.scrollHeight, document.body.scrollHeight, top);
  // }

  console.log('top', top);
  // @ts-ignore
  el.scrollTop = top;
};
