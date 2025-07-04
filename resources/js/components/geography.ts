import {getPointerPosition, offset, preventEvent} from "@/helpers";
import {CursorPosition, HorizontalBounds} from "@/types";

const mobile_map_width = 400;

export default function initGeography() {
  const wrapper = document.querySelector('.geography-wrapper') as HTMLElement;
  const map = document.querySelector('.geography-map') as HTMLElement;
  if(!wrapper || !map)
    return;

  let map_width: number;

  let lastPoint: CursorPosition = null;
  let currentTranslate = 0;

  const moveMap = (left: number) => {
    if(left === null)
      map.style.left = null;
    else
      map.style.left = `${left}px`;
  }
  const centerMap = () => {
    currentTranslate = -(map_width - window.outerWidth) / 2;
    moveMap(currentTranslate);
  }
  const getBounds = (): HorizontalBounds => {
    const left = offset(map).left;
    return {left, right: left + map_width}
  }

  const handleMove = (e: MouseEvent & TouchEvent) => {
    const currentPoint = getPointerPosition(e);

    const deltaX = currentPoint.x - lastPoint.x;
    const deltaY = currentPoint.y - lastPoint.y;

    if(Math.abs(deltaX) > Math.abs(deltaY))
      e.preventDefault();

    lastPoint = currentPoint;

    if(Math.abs(deltaY) > Math.abs(deltaX))
      return;

    const bounds = getBounds();
    let speed = 1;
    if(bounds.right < window.outerWidth || bounds.left > 0) {
      if(bounds.right < window.outerWidth) {
        if(Math.abs(bounds.right) > window.outerWidth)
          speed = 0;
        else
          speed = Math.abs(1 - (window.outerWidth - bounds.right) / window.outerWidth);
      }
      else {
        speed = ((window.outerWidth - bounds.left) / window.outerWidth);
      }
      if(speed < 1)
        speed = speed * speed / 2;
    }

    currentTranslate += deltaX * speed;

    moveMap(currentTranslate);
  }

  let timeout = null;
  const handleBounds = () => {
    map.style.transitionDuration = `300ms`;
    timeout = setTimeout(() => {
      map.style.transitionDuration = null;
    }, 300);
  }

  const enable = (e: MouseEvent & TouchEvent) => {
    clearTimeout(timeout);
    map.style.transitionDuration = null;

    lastPoint = getPointerPosition(e);

    wrapper.classList.add('grabbing');

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove, {passive: false});
    window.addEventListener('selectstart', preventEvent);
  }
  const disable = () => {
    wrapper.classList.remove('grabbing');

    window.removeEventListener('mousemove', handleMove);
    window.removeEventListener('touchmove', handleMove);
    window.removeEventListener('selectstart', preventEvent);

    const bounds = getBounds();

    if(bounds.right < window.outerWidth || bounds.left > 0) {
      if(bounds.right < window.outerWidth)
        currentTranslate = window.outerWidth - map_width;
      else
        currentTranslate = 0;
      moveMap(currentTranslate);
      handleBounds();
    }
  }

  const media = window.matchMedia("(max-width: "+mobile_map_width+"px) or ((min-width: 768px) and (max-width: 1439px))");

  const checkMedia = () => {
    if(media.matches) {
      if(window.outerWidth >= 768) {
        map_width = map.getBoundingClientRect().width;
        centerMap();
      }
      else {
        map_width = mobile_map_width;

        currentTranslate = -37;
        moveMap(currentTranslate);
      }

      wrapper.addEventListener('pointerdown', enable);
      // wrapper.addEventListener('touchstart', enable);

      window.addEventListener('mouseup', disable);
      window.addEventListener('touchend', disable);
      window.addEventListener('pointerleave', disable);

      wrapper.classList.add('moveable');
    }
    else {
      wrapper.removeEventListener('pointerdown', enable);
      wrapper.removeEventListener('touchstart', enable);

      window.removeEventListener('mouseup', disable);
      window.removeEventListener('touchend', disable);
      window.removeEventListener('pointerleave', disable);

      wrapper.classList.remove('moveable');

      moveMap(null);
    }
  }

  checkMedia();
  media.addEventListener('change', checkMedia);
}