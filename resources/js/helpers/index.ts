import {CursorPosition} from "@/types";

export function offset(el: HTMLElement) {
  const rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

export function preventEvent(event: Event) {
  event.preventDefault();
}

export function getPointerPosition(e: MouseEvent & TouchEvent): CursorPosition {
  return {
    y: e.touches ? (e.touches[0]?.clientY || e.clientY) : e.y,
    x: e.touches ? (e.touches[0]?.clientX || e.clientX) : e.x
  }
}