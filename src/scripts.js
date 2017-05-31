$iframe = document.querySelector('.js-canvas iframe');
$close = document.querySelector('.js-close');
$body = document.body;

let isOpen;

[].slice.call(document.querySelectorAll('a.js-frame'))
.forEach(node => {
  node.addEventListener('click', e => {
    e.preventDefault();

    $body.classList.add('blocked');

    $iframe.src = e.currentTarget.href;
    $iframe.onload = () => {
      setTimeout(() => {
        $iframe.classList.add('active');
      }, 300);
    };

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

    setTimeout(() => {
      $iframe.classList.remove('active');
      $iframe.src = 'about:blank';
    }, 100);

    isOpen = false;
  }
}

window.addEventListener('keyup', e => {
  if (e.keyCode === 27) {
    close();
  }
});
