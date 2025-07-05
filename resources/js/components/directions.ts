export default function initDirections() {
  initHiding();
  initSections();
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

function initSections() {
  document.querySelectorAll('.directions-section').forEach((section: HTMLElement) => {
    const button = section.querySelector('.directions-show-more') as HTMLElement;
    const list = section.querySelector('.directions-section-list') as HTMLElement;

    if(list.querySelectorAll('.direction').length > 3)
      button.classList.add('active');

    button.addEventListener('click', () => {
      list.style.overflow = 'hidden';
      list.style.height = list.getBoundingClientRect().height+'px';

      section.classList.add('directions-section--all');
      button.classList.remove('active');

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
