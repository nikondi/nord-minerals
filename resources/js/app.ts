import {initDirections, initHeader} from "@/components";
import {initAbout, initWelcome} from "@/pages";

document.addEventListener('DOMContentLoaded', function() {
  /* COMPONENTS */
  initHeader();
  initDirections();
  /* COMPONENTS */

  /* PAGES */
  initWelcome();
  initAbout();
  /* PAGES */
})