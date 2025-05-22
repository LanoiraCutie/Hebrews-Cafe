document.addEventListener('DOMContentLoaded', function () {
    startAnimation();
    buttonFilter();
    contentChecker();
    setupHeaderButtons();
    productPopup();
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

let isAnimating = false;

function buttonFilter() {
    const buttons = document.querySelectorAll('[data-filter]');
    const items = Array.from(document.getElementsByClassName('product'));
    const container = document.querySelector('.products-container');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            const currentlyActive = document.querySelector('.product-type-container .active');
            if (currentlyActive) {
                currentlyActive.classList.remove('active');
            }
            button.classList.add('active');

            const firstRects = new Map();
            items.forEach(item => {
                firstRects.set(item, item.getBoundingClientRect());
            });

            items.forEach(item => {
                if (filter === '*' || item.classList.contains(filter)) {
                    item.classList.remove('disp-none');
                    item.classList.add('disp-flex');
                    setTimeout(() => {
                        item.classList.remove('product-none');
                    }, 10);
                } else {
                    item.classList.add('product-none');
                    setTimeout(() => {
                        item.classList.remove('disp-flex');
                        item.classList.add('disp-none');
                    }, 500);
                }
            });

            setTimeout(() => {
                items.forEach(item => {
                    const first = firstRects.get(item);
                    const last = item.getBoundingClientRect();
                    const dx = first.left - last.left;
                    const dy = first.top - last.top;

                    if (dx || dy) {
                        item.classList.add('product-flip-start');
                        item.style.transform = `translate(${dx}px, ${dy}px)`;

                        requestAnimationFrame(() => {
                            item.classList.remove('product-flip-start');
                            item.classList.add('product-flip-animate');
                            item.style.transform = 'translate(0, 0)';

                            setTimeout(() => {
                                item.classList.remove('product-flip-animate');
                                item.style.transform = '';
                            }, 400);
                        });
                    }
                });
                setTimeout(() => {
                    isAnimating = false;
                }, 450);
            }, 10);
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

function productPopup() {
    const productImages = document.querySelectorAll('.productimg-container');
    const popup = document.getElementById('product-popup');
    const popupanimation = document.getElementById('popup-animation');
    const popupName = document.getElementById('popup-name');
    const popupPrice = document.getElementById('popup-price');
    const popupDesc = document.getElementById('popup-description');
    const closeBtn = document.getElementById('popup-close');

    productImages.forEach(img => {
        img.addEventListener('click', () => {
            const product = img.closest('.product');
            if (!product) return;

            // Extract data from product
            const name = product.getAttribute('data-name') || 'Unnamed';
            const price = product.getAttribute('data-price') || '';
            const desc = product.getAttribute('data-description') || 'No description provided.';

            popupName.textContent = name;
            popupPrice.textContent = price;
            popupDesc.textContent = desc;
            popup.classList.remove('disp-none');
            popup.classList.add("disp-flex");
            setTimeout(() => {
                popupanimation.classList.remove('popup-animated-bef');
                popupanimation.classList.add('popup-animated-aft');
            });
        });
    });

    function closePopup() {
        popupanimation.classList.remove('popup-animated-aft');
        popupanimation.classList.add('popup-animated-bef');

        setTimeout(() => {
            popup.classList.add('disp-none');
        }, 300);
    }

    closeBtn.addEventListener('click', closePopup);
    popup.addEventListener('click', (e) => {
        if (e.target === popup) closePopup();
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