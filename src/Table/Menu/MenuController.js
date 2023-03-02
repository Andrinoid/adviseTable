import Controller from "./Controller";

export default class MenuController extends Controller {
  getAdjustedX(clientX, menu, viewport) {
    const menuRect = menu.getBoundingClientRect();
    const viewportRect = viewport.getBoundingClientRect();
    const rightBoundary = window.innerWidth - menuRect.width;

    return clientX > rightBoundary
      ? clientX - menuRect.width - 245
      : clientX - viewportRect.x;
  }

  getAdjustedY(clientY, menu, viewport) {
    const menuRect = menu.getBoundingClientRect();
    const viewportRect = viewport.getBoundingClientRect();

    const limit =
      window.innerHeight -
      window.innerHeight * (menuRect.height / window.innerHeight);

    if (clientY >= limit) {
      return clientY - menuRect.height - 120;
    }

    return clientY + 32 - viewportRect.y;
  }
}
