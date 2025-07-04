import {initDirections, initGallery, initGeography, initHeader} from "@/components";
import {aboutPage, contactsPage, newsPage, projectsPage, welcomePage} from "@/pages";

document.addEventListener('DOMContentLoaded', function() {
  /* COMPONENTS */
  initHeader();
  initDirections();
  initGallery();
  initGeography();
  /* COMPONENTS */

  /* PAGES */
  welcomePage();
  aboutPage();
  newsPage();
  contactsPage();
  projectsPage();
  /* PAGES */
})