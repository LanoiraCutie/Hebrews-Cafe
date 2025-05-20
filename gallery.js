document.addEventListener('DOMContentLoaded', function () {
    startAnimation();
    contentChecker();
    setupHeaderButtons();
    mobileButtons();
})

function startAnimation() {
    const homeContainer = document.getElementById('home-container');
    const mainContainer = document.getElementById('main-container');

    if (mainContainer) {
        mainContainer.classList.remove('animated-opa-0');
        mainContainer.classList.add('animated-opa-1');
    }

    if (homeContainer) {
        homeContainer.classList.remove('animated-opa-0');
        homeContainer.classList.add('animated-opa-1');
    }
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

function setupHeaderButtons() {
    const headerButtons = document.querySelectorAll('.button-container .he-bu, .home-container');

    headerButtons.forEach(button => {
        button.addEventListener('click', function () {
            const target = button.getAttribute('data-target');

            const full = document.getElementById('main-container');
            full.classList.remove('animated-opa-1');
            full.classList.add('exit-animate');

            if (target.match('index.html')) {
                const homebutton = document.getElementById('home-container');
                homebutton.classList.remove('animated-opa-1');
                homebutton.classList.add('exit-animate');
            }

            closeMobileMenu();

            setTimeout(() => {
                button.style.pointerEvents = 'none';
                window.location.href = target;
            }, 1500);
        });
    });
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

                const full = document.getElementById('main-container');
                full.classList.remove('animated-opa-1');
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