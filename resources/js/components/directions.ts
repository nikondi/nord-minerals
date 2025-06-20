export default function initDirections() {
  initHiding();
}

function initHiding() {
  document.querySelectorAll('.directions-hiding').forEach((el: HTMLElement) => {
    const button = el.querySelector('.directions-show-more') as HTMLElement;
    const list = el.querySelector('.directions-list') as HTMLElement;

    button.addEventListener('click', () => {
      list.style.overflow = 'hidden';
      list.style.height = list.getBoundingClientRect().height+'px';

      el.classList.add('directions-hiding--all');
      list.style.height = list.scrollHeight+'px';
      list.addEventListener('transitionend', (e) => {
        if(e.target != list)
          return;

        list.style.overflow = null;
        list.style.height = null;
      })
    });
  })
}
