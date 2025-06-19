import "swiper/css/bundle";
import Swiper from "swiper";
import {Navigation, Pagination} from "swiper/modules";

export default function initGallery() {
  document.querySelectorAll('.gallery').forEach((el) => {
    const slider = el.querySelector('.gallery-slider') as HTMLElement;
    const pagination = el.querySelector('.gallery-pagination') as HTMLElement;

    new Swiper(slider, {
      modules: [Pagination, Navigation],
      loop: true,
      pagination: {
        el: pagination,
        clickable: true,
      },
      navigation: {
        prevEl: el.querySelector('.big-slider-arrow--prev') as HTMLElement,
        nextEl: el.querySelector('.big-slider-arrow--next') as HTMLElement,
      }
    });
  });
}