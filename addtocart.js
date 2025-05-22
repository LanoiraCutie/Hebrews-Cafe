document.getElementById("cart-button").addEventListener("click", () => {
    const cart = document.getElementById("product-cart");
    const cartanimate = document.getElementById("cart-animation");
    const closeBtn = document.getElementById('cart-close');
    cart.classList.remove("disp-none");
    cart.classList.add("disp-flex");

    setTimeout(() => {
        cartanimate.classList.remove('popup-animated-bef');
        cartanimate.classList.add('popup-animated-aft');
    });

    function closePopup() {
        cartanimate.classList.remove('popup-animated-aft');
        cartanimate.classList.add('popup-animated-bef');

        setTimeout(() => {
            cart.classList.add('disp-none');
        }, 300);
    }

    closeBtn.addEventListener('click', closePopup);
    cart.addEventListener('click', (e) => {
        if (e.target === cart) closePopup();
    });
});

let totalvalue = 0;

document.getElementById("addcart-button").addEventListener("click", () => {
    const name = document.getElementById("popup-name").innerText;
    const price = document.getElementById("popup-price").innerText;
    const qty = document.getElementById("popup-qty").value;
    const valuetext = document.getElementById("total_value");

    const cartItems = document.getElementById("cart-items");

    var qtyprice = parseInt(price, 10) * parseInt(qty, 10);
    if (isNaN(qtyprice)) {
        qtyprice = 0;
    }
    totalvalue += qtyprice;

    const li = document.createElement("li");


    const itemText = document.createElement("span");
    itemText.classList.add('hc-font');
    itemText.textContent = `${qty} x ${name} - Php ${qtyprice}`;

    const removeBtn = document.createElement("button");
    removeBtn.title = "Remove Item";
    removeBtn.style.background = "transparent";
    removeBtn.style.border = "none";
    removeBtn.style.cursor = "pointer";

    const icon = document.createElement("img");
    icon.src = "./pics/trash.svg";
    icon.alt = "Remove";
    icon.style.width = "20px";
    icon.style.height = "20px";

    removeBtn.appendChild(icon);
    removeBtn.addEventListener("click", () => {
        cartItems.removeChild(li);
        totalvalue -= qtyprice;
        valuetext.innerHTML = `Php ${totalvalue}`;
    });

    li.appendChild(itemText);
    li.appendChild(removeBtn);
    cartItems.appendChild(li);

    valuetext.innerHTML = totalvalue;

    const alert = document.getElementById("add-alert");
    alert.classList.remove("popup-animated-bef");
    alert.classList.add("popup-animated-aft");

    setTimeout(() => {
        alert.classList.remove("popup-animated-aft");
        alert.classList.add("popup-animated-bef");
    }, 1000);
});

document.getElementById("clearall").addEventListener("click", () => {
    const cartItems = document.getElementById("cart-items");
    const valuetext = document.getElementById("total_value");

    // Remove all children from the list
    while (cartItems.firstChild) {
        cartItems.removeChild(cartItems.firstChild);
    }

    // Reset total value
    totalvalue = 0;
    valuetext.innerHTML = `Php ${totalvalue}`;

    const alert = document.getElementById("cart-alert");
    alert.classList.remove("popup-animated-bef");
    alert.classList.add("popup-animated-aft");

    setTimeout(() => {
        alert.classList.remove("popup-animated-aft");
        alert.classList.add("popup-animated-bef");
    }, 1500);
});