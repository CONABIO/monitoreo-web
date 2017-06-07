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
const $body = document.body;

const elements = [];

let isOpen;

[].slice.call(document.querySelectorAll('a.js-open'))
.forEach(node => {
  node.addEventListener('click', e => {
    e.preventDefault();

    elements.push(e.currentTarget);

    $body.classList.add('blocked');
    $body.classList.add(e.currentTarget.dataset.is);

    if (e.currentTarget.dataset.is === 'embed') {
      $iframe.src = e.currentTarget.href;
      $iframe.onload = () => {
        setTimeout(() => {
          $iframe.classList.add('active');
        }, 300);
      };
    }

    isOpen = true;
  });
});

$close.addEventListener('click', e => {
  e.preventDefault();
  close();
});

function close() {
  if (isOpen) {
    const element = elements.pop();

    $body.classList.remove(element.dataset.is);

    if (element.dataset.is === 'embed') {
      setTimeout(() => {
        $iframe.classList.remove('active');
        $iframe.src = 'about:blank';
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
  const max = 550;
  const my = Math.max(window.scrollY, 400);
  const p = (Math.min(max, my) / max) * 100;

  $head.style.backgroundColor = `rgba(60, 60, 60, ${p / 100})`;
}

window.addEventListener('scroll', () => {
  check();
});

check();
