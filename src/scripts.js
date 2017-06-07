$iframe = document.querySelector('.js-canvas iframe');
$close = document.querySelector('.js-close');
$head = document.querySelector('.header');
$body = document.body;

let isOpen;
let element;

[].slice.call(document.querySelectorAll('a.js-open'))
.forEach(node => {
  node.addEventListener('click', e => {
    e.preventDefault();

    element = e.currentTarget;

    $body.classList.add('blocked');
    $body.classList.add(element.dataset.is);

    if (element.dataset.is === 'embed') {
      $iframe.src = element.href;
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
    $body.classList.remove('blocked');
    $body.classList.remove(element.dataset.is);

    if (element.dataset.is === 'embed') {
      setTimeout(() => {
        $iframe.classList.remove('active');
        $iframe.src = 'about:blank';
      }, 100);
    }

    isOpen = false;
    element = null;
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
