import axios from "axios";

export default function initNews() {
  initList();
}

function initList() {
  const wrapper = document.querySelector('.news-list-wrapper') as HTMLElement;
  const list = wrapper?.querySelector('.news-list') as HTMLElement;
  const button = wrapper?.querySelector('.news-show-more') as HTMLButtonElement;

  const endpoint = wrapper.dataset.endpoint;
  const per_page = parseInt(wrapper.dataset.per_page);

  if(!wrapper || !list)
    return;

  let page = 1;

  const onBefore = () => {
    wrapper.classList.add('loading');
    button.disabled = true;
    for(let i = 0; i < per_page; i++)
      list.innerHTML += '<div class="skeleton news-card-skeleton"></div>';

  };
  const onFinally = () => {
    wrapper.classList.remove('loading');
    button.disabled = false;

    list.querySelectorAll('.news-card-skeleton').forEach((element) => element.remove());
  };

  button.addEventListener('click', () => {
    if(wrapper.classList.contains('loading'))
      return;

    onBefore();

    axios.get(endpoint, {
      params: {
        page: ++page,
        per_page,
      }
    })
      .then(({data}) => {
        onFinally();

        list.innerHTML += data.results;

        if(!data.has_more)
          button.remove();
      })
      .catch(() => onFinally());
  });
}