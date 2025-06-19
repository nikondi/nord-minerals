import "swiper/css/bundle";
import Swiper from "swiper";
import {FreeMode, Scrollbar} from "swiper/modules";

export default function initAbout() {
  initDates();
}

function initDates() {
  const slider = document.querySelector(".about-dates-slider") as HTMLElement;

  if(!slider)
    return;

  const wrapper = document.querySelector(".about-dates") as HTMLElement;
  const scrollbar = wrapper.querySelector(".about-dates-scrollbar") as HTMLElement;

  new Swiper(slider, {
    slidesPerView: 'auto',
    modules: [FreeMode, Scrollbar],
    freeMode: true,
    scrollbar: {
      enabled: true,
      el: scrollbar,
      draggable: true,
      snapOnRelease: false,
      dragSize: 80
    },
    breakpoints: {
      768: {
        scrollbar: {
          dragSize: 200
        }
      }
    }
  })
}