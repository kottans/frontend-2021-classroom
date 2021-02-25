export default function switchScreens(screenToShow, screenToHide, button) {
  screenToHide.classList.add('hidden');
  screenToShow.classList.remove('hidden');
  button.focus();
}
