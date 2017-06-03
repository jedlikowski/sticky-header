import throttle from 'lodash/throttle';
import isElement from 'lodash/isElement';
import isString from 'lodash/isString';

import './sticky-header.scss';

export default class StickyHeader {
  scrollPosition = 0;
  defaultOptions = {
    header: '.sticky-header',
    wrapper: null,
    autoHide: true,
  };
  scrollParent = window;
  header = null;
  autoHide = true;
  stickClassName = 'sticky-stick';
  showClassName = 'sticky-show';

  constructor(params) {
    const options = Object.assign({}, this.defaultOptions, params);
    window.isElement = isElement;
    // Set scroll wrapper if present in params
    if (options.wrapper) {
      if (isElement(options.wrapper)) {
        this.scrollParent = options.wrapper;
      } else if (isString(options.wrapper)) {
        this.scrollParent = document.querySelector(options.wrapper);
      }
    }

    // Set header element if present in params
    if (options.header) {
      if (isElement(options.header)) {
        this.header = options.header;
      } else if (isString(options.header)) {
        this.header = document.querySelector(options.header);
      }
    }

    if (!this.header) {
      throw new Error('StickyHeader is missing header parameter!');
    }
    if (!this.scrollParent) {
      throw new Error('StickyHeader is missing scroll parent!');
    }

    this.autoHide = options.autoHide;

    this.handleScroll = throttle(this.handleScroll.bind(this), 10);
    this.scrollParent.addEventListener('scroll', this.handleScroll);
    this.scrollPosition = this.calculateScrollPosition();

    if (!this.autoHide) {
      this.header.classList.add(this.showClassName);
    }
  }

  handleScroll() {
    const newPosition = this.calculateScrollPosition();

    if (newPosition < this.scrollPosition) {
      if (newPosition <= 0) {
        this.unfixHeader();
      } else if (this.autoHide) {
        this.showFixedHeader();
      }
    } else {
      if (this.autoHide) {
        this.hideFixedHeader();
      }

      if (newPosition >= this.header.offsetHeight) {
        this.fixHeader();
      }
    }
    this.scrollPosition = newPosition;
  }

  calculateScrollPosition() {
    if (isElement(this.scrollParent)) {
      return this.scrollParent.scrollTop;
    } else {
      const doc = document.documentElement;
      return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    }
  }

  fixHeader() {
    if (!this.header.classList.contains(this.stickClassName)) {
      this.header.style.transitionDuration = '0ms'; // 0ms transition to avoid hiding animation after first fixing

      if (isElement(this.scrollParent)) {
        this.scrollParent.style.paddingTop = `${this.header.offsetHeight}px`;
      } else {
        document.body.style.paddingTop = `${this.header.offsetHeight}px`;
      }

      this.header.classList.add(this.stickClassName);
      setTimeout(() => {
        this.header.style.transitionDuration = '';
      }, 500);
    }
  }

  unfixHeader() {
    if (this.header.classList.contains(this.stickClassName)) {
      if (isElement(this.scrollParent)) {
        this.scrollParent.style.paddingTop = '';
      } else {
        document.body.style.paddingTop = '';
      }

      this.header.style.transitionDuration = '0ms'; // 0ms transition to avoid hiding animation after first fixing
      this.header.classList.remove(this.stickClassName);
      if (this.autoHide) {
        this.header.classList.remove(this.showClassName);
      }
    }
  }

  showFixedHeader() {
    if (this.header.classList.contains(this.stickClassName)) {
      this.header.classList.add(this.showClassName);
    }
  }

  hideFixedHeader() {
    if (this.header.classList.contains(this.stickClassName)) {
      this.header.classList.remove(this.showClassName);
    }
  }

  destroy() {
    removeEventListener('scroll', this.handleScroll);
  }
}
