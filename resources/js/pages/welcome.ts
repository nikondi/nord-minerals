import "swiper/css/bundle";
import Swiper from "swiper";
import {Navigation, Pagination} from "swiper/modules";

export default function initWelcome() {
  initFirstSlider();
  initClientsSlider();
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
      },
      1101: {
        slidesPerView: 7,
        slidesPerGroup: 7,
      }
    }
  })
}