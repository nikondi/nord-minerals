import {initDirections, initGallery, initHeader} from "@/components";
import {initAbout, initWelcome} from "@/pages";

document.addEventListener('DOMContentLoaded', function() {
  /* COMPONENTS */
  initHeader();
  initDirections();
  initGallery();
  /* COMPONENTS */

  /* PAGES */
  initWelcome();
  initAbout();
  /* PAGES */
})