export const isElementInViewport = (el, padding) => {
    const rect = el.getBoundingClientRect();
    const space = {left: 0, right: 0, top: 0, bottom: 0, ...padding}
    return (
        rect.top + space.top >= 0 &&
        rect.left + space.left >= 0 &&
        rect.bottom + space.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right + space.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}