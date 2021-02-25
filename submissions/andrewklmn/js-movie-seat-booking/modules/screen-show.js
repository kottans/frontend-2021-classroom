import { screens } from './config';

export default function showScreen(activeScreen, focusedElement) {
  Object.keys(screens).forEach((key) => {
    if (screens[key] === activeScreen) {
      screens[key].classList.remove('hidden');
      return;
    }
    screens[key].classList.add('hidden');
  });
  focusedElement.focus();
}
