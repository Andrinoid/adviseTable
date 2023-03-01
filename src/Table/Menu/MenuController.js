import Controller from './Controller';

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
      const bottomBoundary = viewportRect.height + viewportRect.y - 150;
    
      return clientY > bottomBoundary
        ? clientY - menuRect.height + 188
        : clientY > window.innerHeight - 150
        ? clientY - menuRect.height - 120
        : clientY + 32 - viewportRect.y;
    }
  }