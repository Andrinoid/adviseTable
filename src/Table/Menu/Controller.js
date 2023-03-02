let setOpen;

export default class Controller {
  duration;
  position;
  isOpen;
  menu;
  target;
  setPosition;

  constructor(properties) {
    setOpen = properties["setOpen"];

    this.duration = properties["duration"];

    this.isOpen = properties["open"];
    this.menu = document.querySelector(properties["menuSelector"]);
    this.target = document.querySelector(properties["targetSelector"]);
  }

  execute(clientX, clientY) {
    const menu = this.menu;
    const target = this.target;
    const duration = this.duration;
    const setPosition = this.setPosition;

    if (menu && target && duration && setPosition) {
      this.close();
      setTimeout(() => {
        setPosition({
          x: this.getAdjustedX(clientX, menu, target),
          y: this.getAdjustedY(clientY, menu, target),
        });

        setTimeout(() => {
          this.open();
        }, duration);
      }, duration);
    }
  }

  open() {
    setOpen(true);
  }

  close() {
    setOpen(false);
  }
}