import "swiper/css/bundle";
import Swiper from "swiper";
import {FreeMode, Pagination, Scrollbar} from "swiper/modules";

export default function aboutPage() {
  initHistory();
}

function initHistory() {
  const slider = document.querySelector(".about-history-slider") as HTMLElement;

  if(!slider)
    return;

  const wrapper = document.querySelector(".about-history") as HTMLElement;
  const swiperWrapper = document.querySelector(".swiper-wrapper") as HTMLElement;
  const progressbar = wrapper.querySelector(".about-history-progressbar") as HTMLElement;


  const handleTranslate = (translate: number) => {
    let progress = translate / (swiper.maxTranslate() - swiper.minTranslate()) * 100;
    if(progress < 0)
      progress = 0;
    if(progress > 100)
      progress = 100;

    progressbar.style.width = progress+'%';
  }

  const swiper = new Swiper(slider, {
    slidesPerView: 'auto',
    modules: [FreeMode, Pagination],
    freeMode: true
  });

  if(window.requestAnimationFrame) {
    let moving = false;
    let animRef = null;

    const handleFrame = () => {
      handleTranslate(swiperWrapper.getBoundingClientRect().x - swiper.el.getBoundingClientRect().x);
      if(moving) {
        requestAnimationFrame(handleFrame);
      }
      else {
        cancelAnimationFrame(animRef);
        animRef = null;
      }
    }

    const onTransitionStart = () => {
      moving = true;
      animRef = requestAnimationFrame(handleFrame);
    }
    const onTransitionEnd = () => {
      moving = false;
    }

    swiper.on('transitionStart', onTransitionStart);
    swiper.on('transitionEnd', onTransitionEnd);
    swiper.on('sliderMove', () => {
      if(animRef)
        moving = false;

      handleTranslate(swiper.translate);
    });
  }


}