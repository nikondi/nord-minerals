import "swiper/css/bundle";
import Swiper from "swiper";
import {FreeMode, Mousewheel, Pagination} from "swiper/modules";

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


  const firstRowDates = wrapper.querySelectorAll(".about-history-row--first .about-date");
  const secondRowDates = wrapper.querySelectorAll(".about-history-row--second .about-date");

  const totalDates = firstRowDates.length + secondRowDates.length;

  const dates: HTMLElement[] = [];
  for(let i = 0; i <= Math.max(firstRowDates.length, secondRowDates.length); i++) {
    if(secondRowDates[i])
      dates.push(secondRowDates[i] as HTMLElement);
    if(firstRowDates[i])
      dates.push(firstRowDates[i] as HTMLElement);
  }


  const handleTranslate = (swiper: Swiper, translate: number) => {
    let progress = translate / (swiper.maxTranslate() - swiper.minTranslate()) * 100;
    if(progress < 0)
      progress = 0;
    if(progress > 100)
      progress = 100;

    progressbar.style.width = progress+'%';

    dates.forEach((date, i) => {
      if(progress >= (i / totalDates) * 100 && progress <= ((i + 1) / totalDates) * 100)
        date.classList.add('about-date--marked');
      else
        date.classList.remove('about-date--marked');
    })
  }

  const swiper = new Swiper(slider, {
    slidesPerView: 'auto',
    modules: [FreeMode, Pagination, Mousewheel],
    mousewheel: {
      enabled: true,
      releaseOnEdges: true,
    },
    grabCursor: true,
    freeMode: true,
    on: {
      init: (instance) => {
        handleTranslate(instance, instance.translate);
      }
    }
  });

  let moving = false;
  let animRef = null;

  if(window.requestAnimationFrame) {
    const handleFrame = () => {
      handleTranslate(swiper, swiperWrapper.getBoundingClientRect().x - swiper.el.getBoundingClientRect().x);
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
  }

  swiper.on('sliderMove', () => {
    if(animRef)
      moving = false;

    handleTranslate(swiper, swiper.translate);
  });
  swiper.on('setTranslate', () => {
    if(animRef)
      moving = false;

    handleTranslate(swiper, swiper.translate);
  });
}