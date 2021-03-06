import _isElement from 'lodash/isElement';
import _isString from 'lodash/isString';
import _throttle from 'lodash/throttle';
import autobind from 'auto-bind';

// import './sticky-header.scss';

export default class StickyHeader {
  defaultOptions = {
    header: '.sticky-header',
    wrapper: null,
    autoHide: true
  };

  scrollPosition = 0;
  headerOffsetTop = 0;
  scrollParent = window;
  header = null;
  autoHide = true;

  classNames = {
    header: 'sticky-header',
    placeholder: 'sticky-header-placeholder',
    stick: 'sticky-stick',
    show: 'sticky-show'
  };

  constructor(params) {
    autobind(this);

    const options = { ...this.defaultOptions, ...params };
    // Set scroll wrapper if present in params
    if (options.wrapper) {
      if (_isElement(options.wrapper)) {
        this.scrollParent = options.wrapper;
      } else if (_isString(options.wrapper)) {
        this.scrollParent = document.querySelector(options.wrapper);
      }
    }

    // Set header element if present in params
    if (options.header) {
      if (_isElement(options.header)) {
        this.header = options.header;
      } else if (_isString(options.header)) {
        this.header = document.querySelector(options.header);
      }
    }

    if (!this.header) {
      throw new Error('StickyHeader is missing header parameter!');
    }
    if (!this.scrollParent) {
      throw new Error('StickyHeader is missing scroll parent!');
    }

    // add core css class to the header if missing
    if (!this.header.classList.contains(this.classNames.header)) {
      this.header.classList.add(this.classNames.header);
    }

    this.autoHide = options.autoHide;

    this.handleScroll = _throttle(this.handleScroll, 10);
    this.scrollParent.addEventListener('scroll', this.handleScroll);
    this.scrollPosition = this.calculateScrollPosition();
    this.headerOffsetTop = this.header.offsetTop || 0;
    this.headerHeight = this.header.offsetHeight;
    this.placeholder = this.initPlaceholder();

    if (!this.autoHide) {
      this.header.classList.add(this.classNames.show);
    }
  }

  initPlaceholder() {
    const placeholder = document.createElement('div');
    placeholder.className = this.classNames.placeholder;
    placeholder.style.paddingTop = `${this.headerHeight}px`;
    this.header.parentElement.append(placeholder);

    return placeholder;
  }

  handleScroll() {
    const newPosition = this.calculateScrollPosition();

    if (newPosition < this.scrollPosition) {
      // scrolling up
      if (newPosition <= this.headerOffsetTop) {
        this.unfixHeader();
      } else if (this.autoHide) {
        this.showFixedHeader();
      }
    } else {
      // scrolling down
      if (this.autoHide) {
        this.hideFixedHeader();
      }

      if (newPosition >= this.headerOffsetTop) {
        this.fixHeader();
      }
    }

    this.scrollPosition = newPosition;
  }

  calculateScrollPosition() {
    if (_isElement(this.scrollParent)) {
      return this.scrollParent.scrollTop;
    }

    const doc = document.documentElement;
    return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  }

  fixHeader() {
    if (this.header.classList.contains(this.classNames.stick)) {
      return;
    }
    this.header.style.transitionDuration = '0ms'; // 0ms transition to avoid hiding animation after first fixing

    this.header.classList.add(this.classNames.stick);
    setTimeout(() => {
      this.header.style.transitionDuration = '';
    }, 500);
  }

  unfixHeader() {
    // already unfixed
    if (!this.header.classList.contains(this.classNames.stick)) {
      return;
    }

    this.header.style.transitionDuration = '0ms'; // 0ms transition to avoid hiding animation after first fixing
    this.header.classList.remove(this.classNames.stick);
    if (this.autoHide) {
      this.header.classList.remove(this.classNames.show);
    }
  }

  showFixedHeader() {
    if (this.header.classList.contains(this.classNames.stick)) {
      this.header.classList.add(this.classNames.show);
    }
  }

  hideFixedHeader() {
    if (this.header.classList.contains(this.classNames.stick)) {
      this.header.classList.remove(this.classNames.show);
    }
  }

  destroy() {
    this.scrollParent.removeEventListener('scroll', this.handleScroll);
  }
}
