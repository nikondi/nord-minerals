import axios from "axios";

export default function projectsPage() {
  initProjectsList();
}

function initProjectsList() {
  const wrapper = document.querySelector('.projects-list-wrapper') as HTMLElement;
  const list = wrapper?.querySelector('.projects-list') as HTMLElement;
  const button = wrapper?.querySelector('.projects-show-more') as HTMLButtonElement;

  if(!wrapper || !list)
    return;

  const endpoint = wrapper.dataset.endpoint;
  const per_page = parseInt(wrapper.dataset.per_page);

  let page = 1;

  const onBefore = () => {
    wrapper.classList.add('loading');
    button.disabled = true;
  };
  const onFinally = () => {
    wrapper.classList.remove('loading');
    button.disabled = false;
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
        list.innerHTML += data.results;

        if(!data.has_more)
          button.remove();

        onFinally();
      })
      .catch(() => {
        page--;
        onFinally();
      });
  });


}