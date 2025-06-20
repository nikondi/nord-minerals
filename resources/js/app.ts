import {initDirections, initGallery, initHeader} from "@/components";
import {initAbout, initContacts, initNews, initWelcome} from "@/pages";

document.addEventListener('DOMContentLoaded', function() {
  /* COMPONENTS */
  initHeader();
  initDirections();
  initGallery();
  /* COMPONENTS */

  /* PAGES */
  initWelcome();
  initAbout();
  initNews();
  initContacts();
  /* PAGES */
})