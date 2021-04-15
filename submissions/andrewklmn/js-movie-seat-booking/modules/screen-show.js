import { screens } from './config';

export default function showScreen(activeScreen, focusedElement) {
  Object.keys(screens).forEach((key) => {
    if (screens[key] === activeScreen) {
      screens[key].classList.remove('hidden');
      screens[key].classList.remove('tab_disabled');
      return;
    }
    screens[key].classList.add('hidden');
    screens[key].classList.add('tab_disabled');
  });
  focusedElement.focus();
}
