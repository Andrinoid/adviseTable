let setOpen;

export default class Controller {
  duration;
  position;
  isOpen;
  menuSelector;
  targetSelector;
  setPosition;
  menu;
  target;

  constructor(properties) {
    setOpen = properties["setOpen"];

    this.duration = properties["duration"];

    this.isOpen = properties["open"];
    this.menuSelector = properties["menuSelector"]
    this.targetSelector = properties["targetSelector"];
    this.menu = document.querySelector(this.menuSelector);
    this.target = document.querySelector(this.targetSelector);

  }

  execute(clientX, clientY) {
    this.menu = document.querySelector(this.menuSelector);
    this.target = document.querySelector(this.targetSelector);

    if (this.menu && this.target && this.duration && this.setPosition) {
      const menu = this.menu;
      const target = this.target;
      const duration = this.duration;
      const setPosition = this.setPosition;
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
    console.log('close foi chamado')
    setOpen(false);
  }
}
