let setOpen;
let setPosition;
let _menu;
let _viewport;
let _duration;

class MenuGateway {
  constructor(properties) {
    setOpen = properties["setOpen"];
    setPosition = properties["setPosition"];
    _menu = properties["menu"];
    _viewport = properties["viewport"];
    _duration = properties["duration"];
  }

  updatePosition(clientX, clientY) {
    close();

    setTimeout(() => {
      if (_viewport && _menu) {
        setPosition({
          x: getAdjustedX(clientX),
          y: getAdjustedY(clientY),
        });
      }

      setTimeout(() => {
        open();
      }, _duration);
    }, _duration);
  }
}

function close() {
  setOpen(false);
}

function getAdjustedX(clientX) {
  const menuRect = _menu.getBoundingClientRect();
  const viewportRect = _viewport.getBoundingClientRect();
  const rightBoundary = window.innerWidth - menuRect.width;

  return clientX > rightBoundary
    ? clientX - menuRect.width * 2 + 50
    : clientX - viewportRect.x;
}

function getAdjustedY(clientY) {
  const menuRect = _menu.getBoundingClientRect();
  const viewportRect = _viewport.getBoundingClientRect();
  const bottomBoundary = viewportRect.height + viewportRect.y - 150;

  return clientY > bottomBoundary
    ? clientY - menuRect.height + 188
    : clientY > window.innerHeight - 150
    ? clientY - menuRect.height - 120
    : clientY + 32 - viewportRect.y;
}

function open() {
  setOpen(true);
}

export default MenuGateway;
