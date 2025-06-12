function getScrollbarWidth() {
  // Creating invisible container
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll'; // forcing scrollbar to appear
  // @ts-ignore
  outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement('div');
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

  // Removing temporary elements from the DOM
  // @ts-ignore
  outer.parentNode.removeChild(outer);

  return scrollbarWidth;

}
const scrollbar_width = getScrollbarWidth();

let body_scrollTop = 0;
let is_locked_body = false;

export function lockBody() {
  if(is_locked_body)
    return;

  document.body.style.marginRight = scrollbar_width+'px';
  body_scrollTop = document.documentElement.scrollTop;
  document.body.style.top = -(body_scrollTop)+'px';
  document.body.classList.add('ohidden');

  is_locked_body = true;
}
export function unlockBody() {
  if(!is_locked_body)
    return;

  document.body.classList.remove('ohidden');
  document.documentElement.scrollTo(0, body_scrollTop);

  document.body.style.top = '';
  document.body.style.marginRight = '';
  is_locked_body = false;
}

window.onbeforeunload = function () {
  unlockBody();
};
