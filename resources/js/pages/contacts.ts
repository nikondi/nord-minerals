import {ContactsMapDot} from "@/types";

export default function initContacts() {
  initMap();
}


function initMap() {
  const wrapper = document.querySelector('.contacts-geography');
  const popup = wrapper?.querySelector('.cg-popup') as HTMLElement;

  if (!wrapper)
    return;

  let currentDot: HTMLElement = null;

  popup.classList.add('js-enabled');

  const expandDot = (dot: HTMLElement, activeClass: string = 'hovered') => {
    const text = dot.querySelector('.cg-dot__text') as HTMLElement;
    const width = text.scrollWidth;

    text.style.width = width + 'px';
    dot.classList.add(activeClass);
  }
  const hideDot = (dot: HTMLElement, activeClass: string = 'hovered') => {
    if(!dot)
      return;

    const text = dot.querySelector('.cg-dot__text') as HTMLElement;
    text.style.width = text.getBoundingClientRect().width+'px';
    dot.classList.remove(activeClass);
    setTimeout(() => text.style.width = null);
  }

  wrapper.querySelectorAll('.cg-dot').forEach((dot: HTMLElement) => {
    const data = dot.dataset.dot?JSON.parse(dot.dataset.dot):null as ContactsMapDot;

    dot.addEventListener('mouseenter', () => {
      expandDot(dot);
    });
    dot.addEventListener('mouseleave', () => {
      hideDot(dot);
    });

    if(popup) {
      dot.addEventListener('click', () => {
        if (dot.classList.contains('active'))
          return;
        currentDot = dot;
        expandDot(dot, 'active');
        openDotPopup(data);
      });
    }
  });

  initDotPopup();


  function openDotPopup(data: ContactsMapDot) {
    const popupInner = popup.querySelector('.cg-popup-dot') as HTMLElement;

    popupInner.innerHTML = `<div class="cg-popup-dot__title">${data.title}</div>`;
    if(data.address)
      popupInner.innerHTML += `<div class="cg-popup-dot__address">${data.address}</div>`;
    if(data.phone)
      popupInner.innerHTML += `<a href="tel:${data.phone}" class="cg-popup-dot__contact">${data.phone}</a>`;
    if(data.email)
      popupInner.innerHTML += `<a href="mailto:${data.email}" class="cg-popup-dot__contact">${data.email}</a>`;

    popup.classList.add('active');
  }

  function initDotPopup() {
    const closePopup = () => {
      popup.classList.remove('active');
      hideDot(currentDot, 'active');
      currentDot = null;
    }

    popup.querySelector('.cg-popup-content')?.addEventListener('click', (e) => e.stopPropagation());

    wrapper.querySelectorAll('.cg-popup-close-trigger').forEach((el: HTMLElement) => {
      el.addEventListener('click', closePopup);
    });
  }
}