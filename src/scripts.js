const coverImages = [].slice.call(document.querySelectorAll('.cover'));

let lastImg;
let inc = 0;

function cycle() {
  if (lastImg) {
    lastImg.classList.remove('active');
  }

  const imgNode = coverImages[inc++ % coverImages.length];

  if (!lastImg || lastImg !== imgNode) {
    setTimeout(() => {
      imgNode.classList.add('active');
    }, 400);

    setTimeout(cycle, 10000);

    lastImg = imgNode;
  }
}

if (coverImages.length) {
  cycle();
}

[].slice.call(document.querySelectorAll('ul.js-tabs'))
.forEach(srcNode => {
  const targetNode = srcNode.nextElementSibling;
  const tabList = [].slice.call(srcNode.querySelectorAll('li'));
  const tabBodiesList = [].slice.call(targetNode.querySelectorAll('li'));
  const count = tabList.length;

  let key = 0;

  tabList[key].classList.add('is-active');
  tabBodiesList[key].classList.add('is-active');

  srcNode.addEventListener('click', e => {
    if (e.target.tagName === 'A') {
      e.preventDefault();

      if (key >= 0) {
        tabList[key].classList.remove('is-active');
        tabBodiesList[key].classList.remove('is-active');
      }

      for (let x = 0; x < count; x += 1) {
        if (tabList[x] === e.target.parentNode) {
          key = x;
          tabList[x].classList.add('is-active');
          tabBodiesList[x].classList.add('is-active');
          break;
        }
      }
    }
  });
});

const $iframe = document.querySelector('.js-canvas iframe');
const $close = document.querySelector('.js-close');
const $head = document.querySelector('.header');
const $mouse = document.querySelector('.mouse-icon');
const $target = document.querySelector('.js-target');
const $body = document.body;

let tt;

function _onResize() {
  $target.style.transition = 'none';
  $target.style.top = `${$head.getBoundingClientRect().height}px`;

  clearTimeout(tt);
  tt = setTimeout(() => {
    $target.style.transition = '1s';
  }, 1000);
}

window.addEventListener('resize', _onResize);

_onResize();

const elements = [];

let isOpen;

[].slice.call(document.querySelectorAll('a.js-open'))
.forEach(node => {
  node.addEventListener('click', e => {
    e.preventDefault();

    let allowStack;

    if (elements[elements.length - 1]) {
      allowStack = elements[elements.length - 1].dataset.is !== e.currentTarget.dataset.is;
    }

    if (!isOpen || allowStack) {
      elements.push(e.currentTarget);

      $body.classList.add('blocked');
      $body.classList.add(e.currentTarget.dataset.is);
    }

    if (e.currentTarget.dataset.is === 'embed') {
      document.body.style.overflow = 'hidden';

      $iframe.src = e.currentTarget.href;
      $iframe.onload = () => {
        setTimeout(() => {
          $iframe.classList.add('active');
          _onResize();
        }, 300);
      };
    }

    isOpen = true;
  });
});

if ($close) {
  $close.addEventListener('click', e => {
    e.preventDefault();
    close();
  });
}

function close() {
  if (isOpen) {
    const element = elements.pop();

    $body.classList.remove(element.dataset.is);

    if (element.dataset.is === 'embed') {
      setTimeout(() => {
        document.body.style.overflow = '';

        $iframe.classList.remove('active');
        $iframe.src = 'about:blank';

        _onResize();
      }, 100);
    }

    if (!elements.length) {
      $body.classList.remove('blocked');
      isOpen = false;
    }
  }
}

window.addEventListener('keyup', e => {
  if (e.keyCode === 27) {
    close();
  }
});

function check() {
  const min = 500;
  const max = 700;
  const my = Math.max(window.scrollY, min);
  const p = (Math.min(max, my) / max) * 100;

  if ($head) {
    $head.style.backgroundColor = `rgba(60, 60, 60, ${p / 100})`;
  }

  if ($mouse) {
    $mouse.style.transform = `translateY(${p}%)`;
    $mouse.style.opacity = Math.abs((p / 100) - 1);
  }
}

window.addEventListener('scroll', () => {
  check();
});

check();
