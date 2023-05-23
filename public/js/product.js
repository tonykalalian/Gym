const cartModalIcon = document.querySelector(".fa-cart-shopping");
const cartModal = document.querySelector(".cart-modal");
const cartModalOverlay = document.querySelector(".cart-modal-overlay");
const randomContainer = document.querySelector(".random-product");
const productCategories = document.querySelector(".product-categories");
const categoryContainer = document.querySelector(".category-product");
let newProductContainer;
let modalCartProductContainer;
let cartProductContainer;
let totalPrice = 0;
let cart = [];

const productArray = [
  {
    id: 0,
    name: "Whey Gold  ",
    price: 80,
    image: "images/whey.jpg",
    category: "whey",
  },
  {
    id: 1,
    name: "Nitro Tech",
    price: 50,
    image: "images/nitroteach.png",
    category: "whey",
  },
  {
    id: 2,
    name: "V Shape",
    price: 70,
    image: "images/vs.jpg",
    category: "whey",
  },
  {
    id: 3,
    name: "Vshape",
    price: 60,
    image: "images/whey.jpg",
    category: "whey",
  },
  {
    id: 4,
    name: "Optimum Nutrition",
    price: 40,
    image: "images/ON.jpg",
    category: "creatine",
  },
  {
    id: 5,
    name: "Nutri Cost",
    price: 110,
    image: "images/nutritech.png",
    category: "creatine",
  },
  {
    id: 6,
    name: "MedSys ",
    price: 110,
    image: "images/creatineaa.jpg",
    category: "creatine",
  },
  {
    id: 7,
    name: "Jacked Factory",
    price: 110,
    image: "images/jacked.png",
    category: "creatine",
  },
  {
    id: 8,
    name: "Cellucor C4",
    price: 49,
    image: "images/c4.jpg",
    category: "preworkout",
  },
  {
    id: 9,
    name: "Omega 3",
    price: 49,
    image: "images/omega3.jpg",
    category: "multivitamins",
  },
];

// Switch light/dark mode
const toggle = document.querySelector(".toggle-theme");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Mobile menu
const barsIcon = document.querySelector(".fa-bars");
barsIcon.addEventListener("click", () => {
  const mobileMenu = document.querySelector(".nav-menu-mobile");
  const navIcons = document.querySelector(".nav-right");
  mobileMenu.classList.toggle("open");
  navIcons.classList.toggle("open");
});

// Remove active class of product categories
const removeActiveClass = () => {
  for (let i = 0; i < productCategories.children.length; i++) {
    productCategories.children[i].classList.remove("active");
  }
};

if (productCategories) {
  for (let i = 0; i < productCategories.children.length; i++) {
    productCategories.children[i].addEventListener("click", (e) => {
      removeActiveClass();
      e.target.classList.add("active");
      renderCategoryProduct(e.target.textContent);
    });
  }
}

const createProductHtml = (index) => {
  newProductContainer = document.createElement("div");
  newProductContainer.innerHTML = `<div class="main-product" data-id="${productArray[index].id}" data-category="${productArray[index].category}"><img src="${productArray[index].image}"
        class="product-image"
        alt="product image"
        />
        <div class="main-product-info">
            <h3>${productArray[index].name}</h3>
            <h4>Price: <span>$${productArray[index].price}</span></h4>
            <select name="quantity" class="quantity">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <button class="add-cart-btn">Add to Cart</button>
        </div></div>`;
};

const renderRandomProduct = () => {
  // Display all available products under featured products
  let randomProductIndex = [];
  for (let i = 0; i < Math.round(productArray.length * 0.5); i++) {
    const randomNum = Math.floor(Math.random() * productArray.length);
    randomProductIndex.push(randomNum);
  }

  let uniqueProductIndex = [...new Set(randomProductIndex)];
  uniqueProductIndex.forEach((uniqIndex) => {
    createProductHtml(uniqIndex);
    randomContainer.insertAdjacentElement("beforeend", newProductContainer);
  });
};

const renderAllProduct = () => {
  for (let i = 0; i < productArray.length; i++) {
    createProductHtml(i);
    categoryContainer.insertAdjacentElement("beforeend", newProductContainer);
  }
};

const renderCategoryProduct = (selectedCategory) => {
  categoryContainer.innerHTML = "";
  // Display products depending on which category is selected
  for (let i = 0; i < productArray.length; i++) {
    createProductHtml(i);
    // Using switch/case instead of if/else so it's easier to read
    switch (selectedCategory) {
      // If the selected category is 'Headsets;
      case "Wheys":
        // Display products that are under the category of 'headset'
        newProductContainer.children[0].getAttribute("data-category") ===
          "whey" &&
          categoryContainer.insertAdjacentElement(
            "beforeend",
            newProductContainer
          );
        break;
      case "PreWorkout":
        newProductContainer.children[0].getAttribute("data-category") ===
          "preworkout" &&
          categoryContainer.insertAdjacentElement(
            "beforeend",
            newProductContainer
          );
        break;
      case "Creatine":
        newProductContainer.children[0].getAttribute("data-category") ===
          "creatine" &&
          categoryContainer.insertAdjacentElement(
            "beforeend",
            newProductContainer
          );
        break;
      case "Multivitamins":
        newProductContainer.children[0].getAttribute("data-category") ===
          "multivitamins" &&
          categoryContainer.insertAdjacentElement(
            "beforeend",
            newProductContainer
          );
        break;
    }
  }
};

const updateSelectedOption = (quantity) => {
  const selectedOption = (option) => {
    if (quantity === option) {
      return "selected";
    } else {
      return "";
    }
  };

  return `<select name="quantity" class="quantity modalQuantity">
    <option value="1" ${selectedOption(1)}>1</option>
    <option value="2" ${selectedOption(2)}>2</option>
    <option value="3" ${selectedOption(3)}>3</option>
    <option value="4" ${selectedOption(4)}>4</option>
    <option value="5" ${selectedOption(5)}>5</option>
    </select>`;
};

const updateLocalStorage = () => {
  localStorage.clear();
  localStorage.setItem("cart", JSON.stringify(cart));
};

const cartModalHistory = (id, quantity) => {
  modalCartProductContainer = document.createElement("div");
  modalCartProductContainer.innerHTML = `<div data-id=${id} class="cart-modal-product">
        <img
        class="cart-product-image"
        src="${productArray[id].image}"
        alt="product-image"
        />
        <div class="cart-modal-product-info">
            <h3>${productArray[id].name}</h3>
            <h4>Quantity: 
            ${updateSelectedOption(quantity)}</h4>
            <h4>Price: <span>$</span><span>${
              productArray[id].price * quantity
            }</span></h4>
            <button onclick="deleteItem(this)" class="cart-modal-remove-btn">Remove item</button>
        </div>
    </div>`;
};

const addNewProduct = (id, e) => {
  const quantity = e.target.previousElementSibling.selectedIndex + 1;
  cartModalHistory(id, quantity);
  const itemExist = cart.find((item) => {
    return item.id == id;
  });

  if (itemExist) {
    itemExist.quantity += quantity;
    for (let i = 0; i < cartModal.children.length - 3; i++) {
      if (cartModal.children[i].firstChild.getAttribute("data-id") === id) {
        const targetedProductContainer = cartModal.children[i].firstChild;
        let accumulatedProductPrice =
          targetedProductContainer.lastElementChild.lastElementChild
            .previousElementSibling.lastElementChild;
        const pricePerUnit = productArray[itemExist.id].price;
        const newPrice =
          parseInt(accumulatedProductPrice.textContent) +
          pricePerUnit * quantity;
        const selectOptionsElement =
          targetedProductContainer.lastElementChild.firstElementChild
            .nextElementSibling.lastElementChild;
        const selectedOptionIndex = selectOptionsElement.options.selectedIndex;
        selectOptionsElement.innerHTML = updateSelectedOption(
          selectedOptionIndex + 1 + quantity
        );
        accumulatedProductPrice.innerText = newPrice;
      }
    }
  } else {
    cart.push({ id, quantity });
    cartModal.insertAdjacentElement("afterbegin", modalCartProductContainer);
  }
  updateLocalStorage();
};

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-cart-btn")) {
    const productId = e.target.closest(".main-product").getAttribute("data-id");
    const addedQuantity = e.target.previousElementSibling.selectedIndex + 1;
    const unitPrice = productArray[productId].price;
    const addedProductPrice = addedQuantity * unitPrice;
    // Cart Modal
    addNewProduct(productId, e);
    const cartNotification = document.querySelector(".cart-notification");
    cartNotification.style.display = "flex";
    // Display Cart notification
    setTimeout(() => {
      cartNotification.style.display = "none";
    }, 1500);
    displayRedDot();
    totalPrice += addedProductPrice;
    renderTotalPrice(totalPrice);
  }
});

const updateProductChanges = (e, selectedIndex) => {
  const targetedProduct = e.target.closest(".cart-modal-product");
  const newProductId = targetedProduct.getAttribute("data-id");
  const productPrice = productArray[newProductId].price;
  const productInCart = cart.find((item) => item.id == newProductId);
  // Caluclate old price before changes
  const oldQuantity = productInCart.quantity;
  const oldPrice = productPrice * oldQuantity;
  // Calculate new price after changes
  const newQuantity = selectedIndex + 1;
  const newPrice = productPrice * newQuantity;
  // Update cart array
  productInCart.quantity = newQuantity;
  // Update Local storage
  updateLocalStorage();
  // Update product price
  e.target.parentElement.nextElementSibling.lastElementChild.innerText =
    newPrice;
  // Update total price
  totalPrice = totalPrice - oldPrice + newPrice;
  renderTotalPrice(totalPrice);
};

document.addEventListener("change", (e) => {
  if (e.target.classList.contains("modalQuantity")) {
    let selectedIndex = e.target.options.selectedIndex;
    for (let i = 0; i < e.target.options.length; i++) {
      e.target.options[i].removeAttribute("selected", "");
    }
    e.target.options[selectedIndex].setAttribute("selected", "");
    updateProductChanges(e, selectedIndex);
  }
});

const deleteItem = (button) => {
  const selectedProductContainer = button.parentElement.parentElement;
  selectedProductContainer.remove();
  const selectedProductPrice =
    button.previousElementSibling.lastElementChild.textContent;
  totalPrice -= selectedProductPrice;
  renderTotalPrice(totalPrice);
  const selectedProductId = selectedProductContainer.getAttribute("data-id");
  const productIndex = cart.findIndex((item) => item.id == selectedProductId);
  // Remove from cart
  cart.splice(productIndex, 1);
  updateLocalStorage();
};

const renderTotalPrice = (totalPrice) => {
  const totalPriceSpan = document.querySelector(".total-price span");
  totalPriceSpan.innerText = `$${totalPrice}`;
};

// Listen to click on cart icon
cartModalIcon.addEventListener("click", (e) => {
  e.preventDefault();
  cartModal.style.display = "inline";
  cartModalOverlay.style.display = "inline";
  const closeCartModalIcon = document.querySelector(".close-cart-modal");
  closeCartModalIcon.addEventListener("click", () => {
    cartModal.style.display = "none";
    cartModalOverlay.style.display = "none";
  });
  const continueShoppingModalIcon =
    document.querySelector(".continue-shopping");
  continueShoppingModalIcon.addEventListener("click", () => {
    cartModal.style.display = "none";
    cartModalOverlay.style.display = "none";
  });
});

const displayRedDot = () => {
  const cartRedDot = document.querySelector(".cart-red-dot");
  const noItemMessage = document.querySelector(".no-item-message");
  if (cartModal.childElementCount - 3 > 0) {
    cartRedDot.style.display = "inline";
    noItemMessage.style.display = "none";
  } else {
    noItemMessage.style.display = "inline";
  }
};

window.onload = () => {
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
    cart.map((item) => {
      cartModalHistory(item.id, item.quantity);
      cartModal.insertAdjacentElement("afterbegin", modalCartProductContainer);
      productArray.map((product) => {
        if (product.id == item.id) {
          totalPrice += product.price * item.quantity;
        }
      });
    });
    displayRedDot();
    renderTotalPrice(totalPrice);
  }

  if (randomContainer) {
    renderRandomProduct();
    renderAllProduct();
  }
};
