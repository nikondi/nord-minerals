import {initDirections, initGallery, initHeader} from "@/components";
import {aboutPage, contactsPage, newsPage, projectsPage, welcomePage} from "@/pages";

document.addEventListener('DOMContentLoaded', function() {
  /* COMPONENTS */
  initHeader();
  initDirections();
  initGallery();
  /* COMPONENTS */

  /* PAGES */
  welcomePage();
  aboutPage();
  newsPage();
  contactsPage();
  projectsPage();
  /* PAGES */
})