import {lockBody, unlockBody} from "@/helpers/popup";

export default function initHeader() {
  initBurger();
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

  const media = window.matchMedia("(min-width: 768px)");
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
