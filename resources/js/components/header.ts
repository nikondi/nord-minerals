import {lockBody, unlockBody} from "@/helpers/popup";

export default function initHeader() {
  initBurger();
  initScrollUp();
}

function initBurger() {
  const mobileMenu = document.querySelector(".header");
  const button = document.querySelector(".burger-button");

  if(!mobileMenu || !button)
    return;


  const openMenu = () => {
    lockBody();
    mobileMenu.classList.add("active");
    button.classList.add("active");
  }
  const closeMenu = () => {
    mobileMenu.classList.remove("active");
    button.classList.remove("active");
    unlockBody();
  }

  button.addEventListener("click", () => {
    if(mobileMenu.classList.contains("active"))
      closeMenu();
    else
      openMenu();
  });

  const media = window.matchMedia("(min-width: 1101px)");
  const checkMedia = () => {
    if(media.matches) {
      mobileMenu.classList.remove("inited");
      closeMenu();
    }
    else {
      mobileMenu.classList.add("inited");
    }
  }
  setTimeout(checkMedia, 0);
  media.addEventListener('change', checkMedia);

  document.addEventListener("keyup", (e) => {
    if(e.key === "Escape")
      closeMenu();
  });
}

function initScrollUp() {
  const button = document.querySelector('.scroll-up') as HTMLButtonElement;

  const checkScroll = () => {
    if(window.scrollY > 300)
      button.classList.add("active");
    else
      button.classList.remove("active");
  };

  checkScroll();
  window.addEventListener('scroll', checkScroll);

  button.addEventListener("click", () => {
    window.scrollTo({top: 0, behavior: "smooth"});
  });
}
