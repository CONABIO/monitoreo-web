$iframe = document.querySelector('.js-canvas iframe');
$target = document.querySelector('.js-target');

let isOpen;

[].slice.call(document.querySelectorAll('a.js-frame'))
.forEach(node => {
  node.addEventListener('click', e => {
    e.preventDefault();

    $target.classList.add('active');

    $iframe.src = e.currentTarget.href;
    $iframe.onload = () => {
      setTimeout(() => {
        $target.classList.add('display');
        $iframe.classList.add('active');
      }, 300);
    };

    document.body.style.overflow = 'hidden';

    isOpen = true;
  });
});

[].slice.call(document.querySelectorAll('a.js-close'))
.forEach(node => {
  node.addEventListener('click', e => {
    e.preventDefault();
    close();
  });
});

function close() {
  if (isOpen) {
    $target.classList.remove('display');

    setTimeout(() => {
      $iframe.classList.remove('active');
      $target.classList.remove('active');
      $iframe.src = 'about:blank';
    }, 100);

    document.body.style.overflow = '';

    isOpen = false;
  }
}

$target.addEventListener('click', e => {
  if (e.target === $target) {
    close();
  }
});

window.addEventListener('keyup', e => {
  if (e.keyCode === 27) {
    close();
  }
});
