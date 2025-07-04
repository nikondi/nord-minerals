import "swiper/css/bundle";
import Swiper from "swiper";
import {Navigation, Pagination} from "swiper/modules";

export default function initWelcome() {
  initFirstSlider();
  initClientsSlider();
  initNewsSlider();
  initVideo();
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

function initVideo() {
  const video = document.querySelector(".wf-background video") as HTMLVideoElement;
  if (video) {
    video.muted = true;
    video.play();
  }
}