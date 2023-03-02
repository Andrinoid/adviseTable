import Controller from "./Controller";

export default class MenuController extends Controller {
  getAdjustedX(pageX, menu, viewport) {
    const menuRect = menu.getBoundingClientRect();
    const limit = viewport.offsetLeft + (viewport.clientWidth / 5)*4;

    if (pageX >= limit) {
      return pageX - menuRect.width;
    }

    return pageX;
  }

  getAdjustedY(pageY, menu, viewport) {
    const menuRect = menu.getBoundingClientRect();

    let distance = 0;

    let elem = viewport;

    do {
      distance += elem.offsetTop;

      elem = elem.offsetParent;
    } while (elem);

    distance = distance < 0 ? 0 : distance;
    const limit = distance + viewport.clientHeight / 2;

    if (pageY > limit) {
      return pageY - menuRect.height;
    }

    return pageY;
  }
}
