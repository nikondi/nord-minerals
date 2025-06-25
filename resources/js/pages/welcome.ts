import "swiper/css/bundle";
import Swiper from "swiper";
import {Navigation, Pagination} from "swiper/modules";
import {getPointerPosition, offset, preventEvent} from "@/helpers";
import {CursorPosition, HorizontalBounds} from "@/types";

export default function initWelcome() {
  initFirstSlider();
  initClientsSlider();
  initGeography();
  initNewsSlider();
}

function initFirstSlider() {
  const slider = document.querySelector('.wf-slider') as HTMLElement;
  if(!slider)
    return;

  const container = document.querySelector('.wf-slider-container');

  new Swiper(slider, {
    slidesPerView: 1,
    modules: [Navigation, Pagination],
    loop: true,
    navigation: {
      prevEl: container?.querySelector('.big-slider-arrow--prev') as HTMLElement,
      nextEl: container?.querySelector('.big-slider-arrow--next') as HTMLElement,
    },
    pagination: {
      enabled: true,
      el: container.querySelector('.slider-pagination') as HTMLElement,
      clickable: true,
    }
  })
}

function initClientsSlider() {
  const slider = document.querySelector('.clients-slider') as HTMLElement;
  if(!slider)
    return;

  const container = document.querySelector('.clients-slider-container');

  new Swiper(slider, {
    slidesPerView: 'auto',
    modules: [Navigation, Pagination],
    centeredSlides: true,
    centeredSlidesBounds: true,
    spaceBetween: 24,
    navigation: {
      prevEl: container?.querySelector('.slider-arrow--prev') as HTMLElement,
      nextEl: container?.querySelector('.slider-arrow--next') as HTMLElement,
    },
    pagination: {
      enabled: true,
      el: container.querySelector('.slider-pagination') as HTMLElement,
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        centeredSlides: false,
        centeredSlidesBounds: false,
      },
      1101: {
        slidesPerView: 6,
        slidesPerGroup: 6,
        centeredSlides: false,
        centeredSlidesBounds: false,
      }
    }
  })
}



function initGeography() {
  const wrapper = document.querySelector('.geography-wrapper') as HTMLElement;
  const map = document.querySelector('.geography-map') as HTMLElement;
  if(!wrapper || !map)
    return;

  const map_width = map.getBoundingClientRect().width;

  let lastPoint: CursorPosition = null;
  let currentTranslate = 0;

  const moveMap = (left: number) => {
    if(left === null)
      map.style.left = null;
    else
      map.style.left = `${left}px`;
  }
  const getBounds = (): HorizontalBounds => {
    const left = offset(map).left;
    return {left, right: left + map_width}
  }

  const handleMove = (e: MouseEvent & TouchEvent) => {
    const currentPoint = getPointerPosition(e);

    const deltaX = currentPoint.x - lastPoint.x;
    const deltaY = currentPoint.y - lastPoint.y;

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
    window.addEventListener('touchmove', handleMove);
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

  const media = window.matchMedia("(min-width: 768px) and (max-width: 1439px)");

  const checkMedia = () => {
    if(media.matches) {
      wrapper.addEventListener('pointerdown', enable);
      wrapper.addEventListener('touchstart', enable);

      window.addEventListener('mouseup', disable);
      window.addEventListener('touchend', disable);

      wrapper.classList.add('moveable');

      currentTranslate = -(map_width - window.outerWidth) / 2;
      moveMap(currentTranslate);
    }
    else {
      wrapper.removeEventListener('pointerdown', enable);
      wrapper.removeEventListener('touchstart', enable);

      window.removeEventListener('mouseup', disable);
      window.removeEventListener('touchend', disable);

      wrapper.classList.remove('moveable');

      moveMap(null);
    }
  }

  checkMedia();
  media.addEventListener('change', checkMedia);
}

function initNewsSlider() {
  const slider = document.querySelector('.wn-slider') as HTMLElement;

  if(!slider)
    return;

  const container = document.querySelector('.wn-slider-container');

  let swiper = null;
  const initSlider = () => {
    swiper = new Swiper(slider, {
      slidesPerView: 1,
      modules: [Navigation, Pagination],
      spaceBetween: 30,
      navigation: {
        prevEl: container?.querySelector('.big-slider-arrow--prev') as HTMLElement,
        nextEl: container?.querySelector('.big-slider-arrow--next') as HTMLElement,
      },
      pagination: {
        enabled: true,
        el: container.querySelector('.slider-pagination') as HTMLElement,
        clickable: true,
      },
      breakpoints: {
        1101: {
          slidesPerView: 2,
        }
      }
    });
  }
  const destroySlider = () => swiper?.destroy();

  const media = window.matchMedia("(min-width: 768px)");
  const checkSlider = () => {
    if(media.matches) {
      initSlider();
    }
    else {
      destroySlider();
    }
  }

  checkSlider();
  media.addEventListener('change', checkSlider);
}