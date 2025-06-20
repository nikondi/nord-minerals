import {ContactsMapDot} from "@/types";

export default function initContacts() {
  initMap();
}


function initMap() {
  const wrapper = document.querySelector('.cg-wrapper');
  const popup = wrapper.querySelector('.cg-popup') as HTMLElement;

  if (!wrapper)
    return;

  popup.classList.add('js-enabled');

  wrapper.querySelectorAll('.cg-dot').forEach((dot: HTMLElement) => {
    const data = dot.dataset.dot?JSON.parse(dot.dataset.dot):null as ContactsMapDot;
    const text = dot.querySelector('.cg-dot__text') as HTMLElement;
    const width = text.scrollWidth;

    dot.addEventListener('mouseenter', () => {
      text.style.width = width + 'px';
      dot.classList.add('hovered');
    });
    dot.addEventListener('mouseleave', () => {
      text.style.width = null;
      dot.classList.remove('hovered')
    });

    dot.addEventListener('click', () => {
      if(dot.classList.contains('active'))
        return;
      dot.classList.add('active');
      openDotPopup(dot, data);
    })
  });
}

function openDotPopup(dot: HTMLElement, data: ContactsMapDot) {
  const wrapper = document.querySelector('.cg-wrapper');
  const popup = wrapper.querySelector('.cg-popup') as HTMLElement;

  initDotPopup(popup, dot);

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

function initDotPopup(popup: HTMLElement, dot: HTMLElement) {
  if(popup.classList.contains('inited'))
    return;

  const background = popup.querySelector('.cg-popup-background') as HTMLElement;
  const button = popup.querySelector('.cg-popup-close') as HTMLElement;
  const text = dot.querySelector('.cg-dot__text') as HTMLElement;

  const closePopup = () => {
    popup.classList.remove('active');

    text.style.width = text.getBoundingClientRect().width + 'px';
    dot.classList.remove('active');
    setTimeout(() => text.style.width = null)
  }

  background.addEventListener('click', closePopup)
  button.addEventListener('click', closePopup)
}