document.addEventListener('DOMContentLoaded', function () {
  startAnimation();
  setupHeaderButtons();
  setupShopButton();
  contentChecker();
  scrollRevealContentText();
  mobileButtons();
});

function startAnimation() {
  const element = document.getElementById('id-main-content');
  const button = document.getElementById('shop-button');
  element.classList.remove('main-animate-before');
  button.classList.remove('button-animate-before');
  element.classList.add('main-animate-after');
  button.classList.add('button-animate-after');
}

function setupShopButton() {
  const buttons = document.querySelectorAll('#shop-button');

  buttons.forEach(button => {
    button.addEventListener("click", exitAnimation);
  });
}

function exitAnimation() {
  const full = document.getElementById('full-animate');
  full.classList.add('exit-animate');
  const button = document.getElementById('shop-button');

  setTimeout(() => {
    button.style.pointerEvents = 'none';
    window.location.href = "index-shopnow.html";
  }, 1500);
}

function setupHeaderButtons() {
  const headerButtons = document.querySelectorAll('.button-container .he-bu');

  headerButtons.forEach(button => {
    button.addEventListener('click', function () {
      const target = button.getAttribute('data-target');

      const full = document.getElementById('full-animate');
      full.classList.add('exit-animate');

      closeMobileMenu();

      setTimeout(() => {
        button.style.pointerEvents = 'none';
        window.location.href = target;
      }, 1500);
    });
  });
}

function contentChecker() {
  const outer = document.querySelector('.blurred');
  if (outer) {
    outer.addEventListener("scroll", headerUpdate);
  }
}

function headerUpdate() {
  const content = document.getElementById('content');
  const outer = document.querySelector('.blurred');
  const headers = Array.from(document.getElementsByClassName('he-bu'));

  if (!content || !outer) return;

  const contentLocation = content.getBoundingClientRect().top;
  const outerLocation = outer.getBoundingClientRect().top;


  if (contentLocation <= outerLocation) {
    headers.forEach(header => {
      header.style.color = 'rgba(10, 6, 4, 1)';
    })
  } else {
    headers.forEach(header => {
      header.style.color = 'rgba(232, 229, 226, 1)';
    });
  }
}

function scrollRevealContentText() {
  const scrollContainer = document.querySelector('.blurred');
  const contents = document.querySelectorAll('#extra-content');

  function checkVisibility() {
    contents.forEach(el => {
      const rect = el.getBoundingClientRect();
      const containerTop = scrollContainer.getBoundingClientRect().top;
      const containerBottom = scrollContainer.getBoundingClientRect().bottom;

      const isVisible = rect.top < containerBottom && rect.bottom > containerTop;
      if (isVisible) {
        el.classList.add('content-after');
        el.classList.remove('content-before');
      } else {
        el.classList.add('content-before');
        el.classList.remove('content-after');
      }
    });
  }

  scrollContainer.addEventListener('scroll', checkVisibility);
  window.addEventListener('resize', checkVisibility);
  checkVisibility();
}

function mobileButtons() {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.mobile-menu-overlay');

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', function () {
      this.classList.toggle('activemenu');
      mobileMenu.classList.toggle('activemenu');
      overlay.classList.toggle('activemenu');
      document.body.classList.toggle('no-scroll');
    });

    overlay.addEventListener('click', closeMobileMenu);

    document.querySelectorAll('.mobile-menu-item').forEach(item => {
      item.addEventListener('click', function () {
        closeMobileMenu();
        const target = item.getAttribute('data-target');

        const full = document.getElementById('full-animate');
        full.classList.add('exit-animate');

        setTimeout(() => {
          item.style.pointerEvents = 'none';
          window.location.href = target;
        }, 1500);
      });
    });
  }
}


function closeMobileMenu() {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.mobile-menu-overlay');

  if (hamburgerBtn && mobileMenu && overlay) {
    hamburgerBtn.classList.remove('activemenu');
    mobileMenu.classList.remove('activemenu');
    overlay.classList.remove('activemenu');
    document.body.classList.remove('no-scroll');
  }
}