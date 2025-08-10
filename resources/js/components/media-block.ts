import "swiper/css/bundle";
import Swiper from "swiper";
import {Navigation, Pagination} from "swiper/modules";

export default function initMediaBlock() {
  document.querySelectorAll('.media-block-slider').forEach(function (el: HTMLElement) {
    const videos = el.querySelectorAll('.media-block-media__video');

    const prevEl = el.querySelector('.big-slider-arrow--prev') as HTMLElement;
    const nextEl = el.querySelector('.big-slider-arrow--next') as HTMLElement;

    const swiper = new Swiper(el, {
      modules: [Pagination, Navigation],
      pagination: {
        el: el.querySelector('.swiper-pagination') as HTMLElement
      },
      navigation: {
        prevEl,
        nextEl
      },
      on: {
        transitionStart: function(){
          videos.forEach(function(video){
            video.querySelector('video')?.pause();
          });
        }
      }
    });

    videos.forEach(function(wrapper: HTMLElement) {
      const video = wrapper.querySelector('video');
      const button = wrapper.querySelector('.media-block-media__video-play') as HTMLButtonElement;
      const poster = wrapper.querySelector('.media-block-media__video-poster') as HTMLImageElement;

      button.addEventListener('click', function() {
        if(video.paused)
          video.play();
        else
          video.pause();
      });

      video.addEventListener('play', function () {
        poster.style.display = 'none';
        wrapper.classList.add('played');
        video.controls = true;

        swiper.el.classList.add('locked');
        swiper.isLocked = true;
        swiper.update();
      });
      video.addEventListener('pause', function () {
        if (video.seeking)
          return;

        wrapper.classList.remove('played');
        video.controls = false;

        swiper.el.classList.remove('locked');
        swiper.isLocked = false;
        swiper.update();
      });

      video.addEventListener('ended', function () {
        poster.style.display = 'block';
      });
    });
  });
}