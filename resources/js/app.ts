import initHeader from "@/components/header";
import initWelcome from "@/pages/welcome";
import initAbout from "@/pages/about";

document.addEventListener('DOMContentLoaded', function() {
  initHeader();

  initWelcome();
  initAbout();
})