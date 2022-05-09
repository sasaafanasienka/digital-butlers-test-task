export class Scroll {
  constructor() {
    this.header = document.querySelector('.header');
    this.mainContainer = document.querySelector('.service');
    this.sticky = document.querySelector('.service__sticky');
    this.container = document.querySelector('.service__container');
    this.slider = document.querySelector('.service__slider');
    this.progress = document.querySelector('.service__progress-bar');
    this.mainContainerHeight = this.mainContainer.clientHeight;
    this.mainContainerOffset = this.mainContainer.offsetTop;
    this.stickyHeight = this.sticky.clientHeight;
    this.containerWidth = this.container.clientWidth;
    this.sliderWidth = this.slider.clientWidth;
    this.amplitude = this.sliderWidth - this.containerWidth;
    this.percentGap = 0.2;
  }

  init = () => {
    this.initStyles();
    this.initScrollListener();
    this.initResizeListener();
  };

  initVariables = () => {
    this.mainContainerHeight = this.mainContainer.clientHeight;
    this.mainContainerOffset = this.mainContainer.offsetTop;
    this.stickyHeight = this.sticky.clientHeight;
    this.containerWidth = this.container.clientWidth;
    this.sliderWidth = this.slider.clientWidth;
    this.amplitude = this.sliderWidth - this.containerWidth;
  };

  initStyles = () => {
    this.initVariables();
    this.changeHeaderStyle();
    this.changeSliderStyles();
  };

  initScrollListener = () => {
    window.addEventListener('scroll', this.scroll);
  };

  initResizeListener = () => {
    window.addEventListener('resize', this.initStyles);
  };

  scroll = () => {
    this.changeHeaderStyle();
    this.changeSliderStyles();
  };

  changeSliderStyles = () => {
    const start = this.mainContainerOffset;
    const finish = this.mainContainerOffset + this.stickyHeight;
    const counteredScrollPercent =
      -this.percentGap +
      ((window.scrollY - start) / (finish - start)) * (1 + this.percentGap * 2);
    const percent =
      counteredScrollPercent < 0
        ? 0
        : counteredScrollPercent > 1
        ? 1
        : counteredScrollPercent;
    const sliderOffset = -percent * this.amplitude;
    this.slider.style.transform = `translateX(${sliderOffset}px)`;
    this.progress.style.width = `${percent * 100}%`;
  };

  changeHeaderStyle = () => {
    if (window.scrollY === 0) {
      this.header.style.backgroundColor = '#004d8500';
    } else {
      this.header.style.backgroundColor = '#004d85';
    }
  };
}

const scroll = new Scroll();

scroll.init();
