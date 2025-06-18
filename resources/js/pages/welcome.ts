import "swiper/css";
import Swiper from "swiper";
import {Navigation, Pagination} from "swiper/modules";

export default function initWelcome() {
  initFirstSlider();
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