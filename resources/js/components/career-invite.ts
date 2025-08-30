import {outsideClick} from "@/helpers";

export default function careerInvite() {
  document.querySelectorAll('.career-dropdown').forEach(function(wrapper: HTMLElement) {
    const list = wrapper.querySelector('.career-dropdown__list');
    const button = wrapper.querySelector('.career-dropdown__button');

    if(!list || !button)
      return true;

    const close = () => {
      list.classList.remove('active');
    }
    outsideClick(wrapper, close);

    const open = () => {
      list.classList.add('active');
    }
    button.addEventListener('click', () => {
      if(list.classList.contains('active'))
        close();
      else
        open();
    })
  });
}