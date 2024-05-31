//- - - - - - - - - - - - - - - - ->  READ ME: Some of the functions or event lister doesnt work when putted 
//- - - - - - - - - - - - - - - - ->           on the same event listener therefore they are mostly seperated.

//- - - - - - - - - - - - - - - - -> Log Out

function logout() {
    alert('Logging Out... Press Ok to Continue.');
    setTimeout(() => {
        window.location.href = 'index.html';
        history.pushState(null, null, 'JoyStick_Home.html');
    }, 1000);
};

//- - - - - - - - - - - - - - - - -> Show Cart Panel

document.getElementById('toggle-button').addEventListener('change', function() {
    var panel = document.querySelector('.cart-panel');
    var covers = document.querySelectorAll('.cover');
    var toggled = document.getElementById('toggle-button');
    
    if (this.checked) {
        panel.classList.add('active');
        covers.forEach(function(cover) {
            cover.style.display = 'block';
            cover.addEventListener('click', function() {
                toggled.checked = false;
                panel.classList.remove('active');
                cover.style.display = 'none';
            });
        });
    } else {
        panel.classList.remove('active');
        covers.forEach(function(cover) {
            cover.style.display = 'none';
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    //- - - - - - - - - - - - - - - - -> Loading Screen
    function hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.style.opacity = '0'; 
    
        setTimeout(() => {
          loadingScreen.classList.add('hide'); 
          document.body.classList.remove('hide-scrollbar');
          loadingScreen.parentNode.removeChild(loadingScreen);
        }, 1000); 
      }
    
      setTimeout(hideLoadingScreen, 1500);
    
      document.body.classList.add('hide-scrollbar');

    //- - - - - - - - - - - - - - - - -> Create The Products Within The Collection
    const products = [
      { name: "Mystbloom Melee", price: "4350.00", img: "assets/Mystbloom-Melee.png" },
      { name: "Mystbloom Judge", price: "2175.00", img: "assets/Mystbloom-Judge.png" },
      { name: "Mystbloom Phantom", price: "2175.00", img: "assets/Mystbloom-Phantom.png" },
      { name: "Mystbloom Sheriff", price: "2175.00", img: "assets/Mystbloom-Sheriff.png" },
      { name: "Mystbloom Operator", price: "2175.00", img: "assets/Mystbloom-Operator.png" },
      { name: "Kuronami Melee", price: "5350.00", img: "assets/Kuronami-Melee.png" },
      { name: "Kuronami Spectre", price: "2375.00", img: "assets/Kuronami-Spectre.png" },
      { name: "Kuronami Vandal", price: "2375.00", img: "assets/Kuronami-Vandal.png" },
      { name: "Kuronami Sheriff", price: "2375.00", img: "assets/Kuronami-Sheriff.png" },
      { name: "Kuronami Marshal", price: "2375.00", img: "assets/Kuronami-Marshal.png" },
      { name: "Prime Melee", price: "3550.00", img: "assets/Prime-Melee.png" },
      { name: "Prime Bucky", price: "1775.00", img: "assets/Prime-Bucky.png" },
      { name: "Prime Phantom", price: "1775.00", img: "assets/Prime-Phantom.png" },
      { name: "Prime Frenzy", price: "1775.00", img: "assets/Prime-Frenzy.png" },
      { name: "Prime Odin", price: "1775.00", img: "assets/Prime-Odin.png" },
      { name: "BlastX Melee", price: "4350.00", img: "assets/BlastX-Melee.png" },
      { name: "BlastX Spectre", price: "2175.00", img: "assets/BlastX-Spectre.png" },
      { name: "BlastX Phantom", price: "2175.00", img: "assets/BlastX-Phantom.png" },
      { name: "BlastX Frenzy", price: "2175.00", img: "assets/BlastX-Frenzy.png" },
      { name: "BlastX Odin", price: "2175.00", img: "assets/BlastX-Odin.png" }
    ];
  
    const productGrid = document.getElementById("product-grid");
  
    const categories = {};
  
    products.forEach(product => {
      const [brand, type] = product.name.split(" ");
      if (!categories[type]) {
        categories[type] = [];
      }
      categories[type].push(product);
    });
  
    for (const type in categories) {
      const categorySection = document.createElement("div");
      categorySection.classList.add("category-section");
  
      const categoryTitle = document.createElement("h2");
      categoryTitle.textContent = type;
      categorySection.appendChild(categoryTitle);
  
      categories[type].forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
  
        productElement.innerHTML = `
          <img src="${product.img}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>Php. ${product.price}</p>
          <label>
            <div class="clickable-area">
              <hr>
              <input type="checkbox" class="product-checkbox" data-name="${product.name}" data-price="${product.price}" data-img="${product.img}">
              <span class="addlabel">ADD TO CART</span>
            </div>
          </label>
        `;
  
        categorySection.appendChild(productElement);
      });
  
      productGrid.appendChild(categorySection);
    }

    //- - - - - - - - - - - - - - - - -> Flickering Of The Home Text To Not Block The Videos
    var heading = document.querySelector('.H-content h1');
    var isTransparent = true;

    setInterval(function() {
        if (isTransparent) {
            heading.style.opacity = '0.50'; 
        } else {
            heading.style.opacity = '0'; 
        }
        isTransparent = !isTransparent;
    }, 5000);
});

//- - - - - - - - - - - - - - - - -> Add Item To The Panel When The Product Is Selected
//                                   And The Indication That That Product Is 

document.addEventListener('DOMContentLoaded', function() {
    const searchBar = document.getElementById('search-bar');
    const products = document.querySelectorAll('.product');
    const searchResultContainer = document.getElementById('search-result');
    const noItemsElement = document.querySelector('.No-items'); 

    searchBar.addEventListener('input', function() {
        const searchValue = searchBar.value.trim().toLowerCase();
        const searchResults = [];

        if (searchValue === '') {
            searchResultContainer.innerHTML = '<i class="bx bx-search-alt-2"></i>';
            searchResultContainer.classList.remove('found');
            return;
        }

        products.forEach(function(product) {
            const productName = product.querySelector('h3').textContent.toLowerCase();
            const productId = product.querySelector('.product-checkbox').getAttribute('data-name').toLowerCase();

            if (productName.includes(searchValue) || productId.includes(searchValue)) {
                searchResults.push(product.cloneNode(true));
            }
        });

        renderSearchResults(searchResults);
    });

    function renderSearchResults(results) {
        searchResultContainer.innerHTML = '';
        if (results.length === 0) {
            searchResultContainer.innerHTML = '<h2>Item Not Found</h2><i class="bx bx-search-alt-2"></i>';
            searchResultContainer.classList.remove('found');
        } else {
            results.forEach(function(result) {
                searchResultContainer.appendChild(result);
            });
            searchResultContainer.classList.add('found');
        }
        
        attachCheckboxEventListeners();
    }
    
    function attachCheckboxEventListeners() {
        const checkboxes = document.querySelectorAll('.product-checkbox');
        checkboxes.forEach(function(checkbox) {
            checkbox.addEventListener('click', checkboxEventListener);
        });
    }

    function checkboxEventListener(event) {
        const checkbox = event.target;
        updateCheckedItems();
        updateProductAppearance(checkbox);
        
        const productId = checkbox.getAttribute('data-name').toLowerCase();
        const searchedProductCheckbox = document.querySelector(`#search-result .product-checkbox[data-name="${productId}"]`);
        if (searchedProductCheckbox) {
            searchedProductCheckbox.checked = checkbox.checked;
            updateProductAppearance(searchedProductCheckbox);
        }
    }

    //- - - - - - - - - - - - - - - - -> Go to the transaction methods
    const payButton = document.querySelector('.pay-button');
    var covers = document.querySelectorAll('.cover');
    const paymentPanel = document.getElementById('payment-panel');
    var toggled = document.getElementById('toggle-button');

    payButton.addEventListener('click', function() {
        const checkedItems = document.querySelectorAll('.product-checkbox:checked');
        var panel = document.querySelector('.cart-panel');

        if (checkedItems.length === 0) {
            alert('Please select items before proceeding to payment.');
            return;
        } else {
            panel.classList.remove('active');
            toggled.checked = false;
            covers.forEach(function(cover) {
                cover.style.display = 'block';
                cover.addEventListener('click', function() {
                    toggled.checked = false;
                    cover.style.display = 'none';
                    paymentPanel.classList.remove('show')
                    paymentPanel.classList.add('hide');
                });
                toggled.checked = false;
                paymentPanel.classList.remove('hide')
                paymentPanel.classList.add('show');
            });        
        }
    });

    //- - - - - - - - - - - - - - - - -> Storing of all checked items to the cart
    function updateCheckedItems() {
        const checkedItems = document.querySelectorAll('.product-checkbox:checked');
        const checkedItemsList = document.getElementById('checked-items');
        checkedItemsList.innerHTML = '';
        let totalAmount = 0;

        const checkedProducts = new Set();

        checkedItems.forEach(function(item) {
            const itemName = item.dataset.name;

            if (!checkedProducts.has(itemName)) {
                checkedProducts.add(itemName);
                const listItem = document.createElement('li');
                const img = document.createElement('img');
                const text = document.createElement('span');
                const trashIcon = document.createElement('i');

                const itemPrice = parseFloat(item.dataset.price);
                const itemImg = item.dataset.img;

                img.src = itemImg;
                text.textContent = `${itemName} - Php. ${itemPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

                trashIcon.className = 'bx bxs-trash';
                trashIcon.addEventListener('click', function() {
                    listItem.remove();
                    item.checked = false;
                    updateTotalAmount();
                    updateProductAppearance(item);
                    checkIfNoItems();
                });

                listItem.appendChild(img);
                listItem.appendChild(text);
                listItem.appendChild(trashIcon);

                checkedItemsList.appendChild(listItem);

                totalAmount += itemPrice;
            }
        });

        document.getElementById('total-amount-value').textContent = totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        checkIfNoItems();
        displayReceiptItems();
        displayDetailItems();
        updateTotalAmount();
    }

    //- - - - - - - - - - - - - - - - -> Total Amount computation
    function updateTotalAmount() {
        const checkedItems = document.querySelectorAll('.product-checkbox:checked');
        totalAmount = 0; // Reset total amount
        checkedItems.forEach(function(item) {
            const itemPrice = parseFloat(item.dataset.price);
            totalAmount += itemPrice;
        });

        // Update the total amount display in all relevant panels
        document.getElementById('total-amount-value').textContent = totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        document.getElementById('display-amount-value').textContent = totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        document.getElementById('receipt-total-amount').textContent = totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

        //- - - - - - - - - - - - - - - - -> Indication that the product is added
    function updateProductAppearance(checkbox) {
        const productDiv = checkbox.closest('.product');
        const label = productDiv.querySelector('.addlabel');
        label.textContent = checkbox.checked ? 'ADDED' : 'ADD TO CART';
        productDiv.classList.toggle('selected', checkbox.checked);
    }

    //- - - - - - - - - - - - - - - - -> Cart indication that no items are added
    function checkIfNoItems() {
        const checkedItems = document.querySelectorAll('.product-checkbox:checked');
        const noItemsElement = document.querySelector('.No-items');
        if (checkedItems.length === 0) {
            noItemsElement.classList.remove('hide');
        } else {
            noItemsElement.classList.add('hide');
        }
    }

    attachCheckboxEventListeners();
    updateTotalAmount();
    checkIfNoItems();
});

//- - - - - - - - - - - - - - - - -> Transasction Method

const paymentPanel = document.querySelector('.panel');
const detailsPanel = document.getElementById('details-panel');
const receiptPanel = document.getElementById('receipt-panel');
const nextPaymentDetailsBtns = document.querySelectorAll('.next-payment-details');
const confirmPaymentBtn = document.getElementById('confirm-payment');
const cancelPaymentBtn = document.getElementById('cancel-payment');
const downloadReceiptBtn = document.getElementById('download-receipt');
const userIdInput = document.getElementById('user-id');
const totalAmountValue = document.getElementById('total-amount-value');
const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
const paymentForms = {
    'card': document.getElementById('card-form'),
    'paypal': document.getElementById('paypal-form'),
    'gcash': document.getElementById('gcash-form')
};
const displayUserId = document.getElementById('display-user-id');
const displayPaymentMethod = document.getElementById('display-payment-method');
const displayTotalAmount = document.getElementById('display-total-amount');
const transactionNumberElem = document.getElementById('transaction-number');
const receiptUserId = document.getElementById('receipt-user-id');
const receiptPaymentMethod = document.getElementById('receipt-payment-method');
const receiptTotalAmount = document.getElementById('receipt-total-amount');
const receiptTransactionNumber = document.getElementById('receipt-transaction-number');
let selectedPaymentMethod = '';
let transactionNumber = '';

function displayReceiptItems() {
    const checkedItems = document.querySelectorAll('.product-checkbox:checked');
    const receiptList = document.getElementById('receipt-items');
    
    receiptList.innerHTML = '';

    checkedItems.forEach(function(item) {
        const itemName = item.dataset.name;
        const itemPrice = parseFloat(item.dataset.price);
        
        const listItem = document.createElement('li');
        listItem.textContent = `${itemName} - Php. ${itemPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        
        receiptList.appendChild(listItem);
    });
}

function displayDetailItems() {
    const checkedItems = document.querySelectorAll('.product-checkbox:checked');
    const receiptList = document.getElementById('detail-items');
    
    receiptList.innerHTML = '';

    checkedItems.forEach(function(item) {
        const itemName = item.dataset.name;
        const itemPrice = parseFloat(item.dataset.price);
        
        const listItem = document.createElement('li');
        listItem.textContent = `${itemName} - Php. ${itemPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        
        receiptList.appendChild(listItem);
    });
}

paymentMethods.forEach(method => {
    method.addEventListener('change', () => {
        selectedPaymentMethod = method.value;
        Object.values(paymentForms).forEach(form => form.classList.add('hide'));
        const selectedForm = paymentForms[selectedPaymentMethod];
        if (selectedForm) {
            selectedForm.classList.remove('hide');
        }
    });
});

nextPaymentDetailsBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        var userId = userIdInput.value.trim();
        if (!userId || !selectedPaymentMethod) {
            alert('Please enter your User ID and select a payment method.');
            return;
        }
        if (userId.length < 3 || userId.indexOf('#') < 1 || userId.indexOf('#') === userId.length - 1 || userId === '') {
            alert('Please enter a valid User ID with at least 1 character before and after the "#"');
            return;
        }

        const selectedForm = paymentForms[selectedPaymentMethod];
        if (!validateForm(selectedForm)) {
            return;
        }
        
        transactionNumber = 'TXN' + Math.floor(Math.random() * 1000000000);
        displayUserId.textContent = userId;
        displayPaymentMethod.textContent = selectedPaymentMethod.toUpperCase();
        displayTotalAmount.textContent = totalAmountValue.textContent;
        transactionNumberElem.textContent = transactionNumber;
        
        const currentForm = btn.parentElement;
        const currentPanel = currentForm.parentElement;
        
        currentPanel.classList.add('hide');
        
        let nextPanel;
        if (currentPanel.id === 'payment-form-container') {
            nextPanel = document.getElementById('details-panel');
            
        } else if (currentPanel.id === 'details-panel') {
            nextPanel = document.getElementById('receipt-panel');
        }
        
        if (nextPanel) {
            nextPanel.classList.remove('hide');
        }
    });
});

function attachRadioButtonEventListeners() {
    paymentMethods.forEach(method => {
        method.addEventListener('change', () => {
            selectedPaymentMethod = method.value;
            Object.values(paymentForms).forEach(form => form.classList.add('hide'));
            const selectedForm = paymentForms[selectedPaymentMethod];
            if (selectedForm) {
                selectedForm.classList.remove('hide');
            }
        });
    });
}

attachRadioButtonEventListeners();

cancelPaymentBtn.addEventListener('click', () => {
    detailsPanel.classList.add('hide');
    paymentPanel.classList.remove('hide');
    
    attachRadioButtonEventListeners();
});


const closePaymentPanelBtn = document.getElementById('close-payment-panel');

closePaymentPanelBtn.addEventListener('click', () => {
    covers.forEach(function(cover) {
        cover.style.display = 'none';
    });
    paymentPanel.classList.add('hide');
});

function validateForm(form) {
    const inputs = form.querySelectorAll('input[type="text"]');
    for (let i = 0; i < inputs.length; i++) {
        if (!inputs[i].value.trim()) {
            alert('Please fill in all the fields.');
            return false;
        }
    }
    return true;
}

confirmPaymentBtn.addEventListener('click', () => {
    receiptUserId.textContent = displayUserId.textContent;
    receiptPaymentMethod.textContent = displayPaymentMethod.textContent;
    receiptTotalAmount.textContent = displayTotalAmount.textContent;
    receiptTransactionNumber.textContent = transactionNumberElem.textContent;
    detailsPanel.classList.add('hide');
    receiptPanel.classList.remove('hide');
    
});

downloadReceiptBtn.addEventListener('click', () => {
    downloadReceiptBtn.style.display = 'none';
    
    const receiptContent = document.querySelector('.receipt');
    html2canvas(receiptContent).then(canvas => {
        const link = document.createElement('a');
        link.download = 'receipt.png';
        link.href = canvas.toDataURL('image/png');
        link.click();

        downloadReceiptBtn.style.display = 'inline-block';
        covers.forEach(function(cover) {
            cover.style.display = 'none';
        });
        paymentPanel.classList.add('hide');
        receiptPanel.classList.add('hide');
    });
});

//- - - - - - - - - - - - - - - - -> Video Rotation After Every End
const videos = ["assets/yt5s.io-Enter the Tigris __ VALORANT Lunar New Year 2022-(1080p).mp4", 
"assets/yt5s.io-Myst Bloom Bundle Trailer - VALORANT-(1080p) - 1.mp4",
"assets/yt5s.io-Myst Bloom Bundle Trailer - VALORANT-(1080p) - 2.mp4",
"assets/yt5s.io-Myst Bloom Bundle Trailer - VALORANT-(1080p) - 3.mp4",
"assets/yt5s.io-Myst Bloom Bundle Trailer - VALORANT-(1080p) - 4.mp4",
"assets/yt5s.io-Myst Bloom Bundle Trailer - VALORANT-(1080p) - 5.mp4",
"assets/Kuronami Bundle (1080p) - 1.mp4",  
"assets/Kuronami Bundle (1080p) - 2.mp4",  
"assets/Kuronami Bundle (1080p) - 3.mp4",  
"assets/yt5s.io-Weaponized Perfection __ Prime 2.0 Skin Reveal Trailer - VALORANT-(1080p).mp4",
"assets/yt5s.io-YOURE IN __ XER0FANG Skin Reveal Trailer - VALORANT-(1080p) - 1.mp4",
"assets/yt5s.io-YOURE IN __ XER0FANG Skin Reveal Trailer - VALORANT-(1080p) - 2.mp4",
"assets/yt5s.io-YOURE IN __ XER0FANG Skin Reveal Trailer - VALORANT-(1080p) - 3.mp4",
"assets/yt5s.io-Play with FORCE __ BlastX Skin Reveal Trailer - VALORANT-(1080p).mp4"
];
const videoElement = document.getElementById("myVideo");
let currentVideoIndex = 0

videoElement.addEventListener("ended", changeVideo);

function changeVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % videos.length;
    videoElement.src = videos[currentVideoIndex];
    videoElement.play();
}


//- - - - - - - - - - - - - - - - -> MOUSE TRACKER
const circleElement = document.querySelector('.circle');

const mouse = { x: 0, y: 0 }; 
const previousMouse = { x: 0, y: 0 }
const circle = { x: 0, y: 0 }; 

let currentScale = 0; 
let currentAngle = 0; 

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

const speed = 0.20;

const tick = () => {
  circle.x += (mouse.x - circle.x) * speed;
  circle.y += (mouse.y - circle.y) * speed;

  const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;

  const deltaMouseX = mouse.x - previousMouse.x;
  const deltaMouseY = mouse.y - previousMouse.y;
  previousMouse.x = mouse.x;
  previousMouse.y = mouse.y;

  const mouseVelocity = Math.min(Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2) * 4, 150); 
  const scaleValue = (mouseVelocity / 150) * 0.5;
  currentScale += (scaleValue - currentScale) * speed;

  const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;

  const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI;
  if (mouseVelocity > 20) {
    currentAngle = angle;
  }
  const rotateTransform = `rotate(${currentAngle}deg)`;

  circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;
  window.requestAnimationFrame(tick);
}

tick();

const elementsToWatch = document.querySelectorAll('a, button, input[type="checkbox"]');

elementsToWatch.forEach(element => {
  element.addEventListener('mouseenter', () => {
    circleElement.classList.add('pointer');
  });

  element.addEventListener('mouseleave', () => {
    circleElement.classList.remove('pointer');
  });
});

//- - - - - - - - - - - - - - - - -> Message Delivery to the website owner

document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.querySelector('.message-me-submit-btn');
    
    submitButton.addEventListener('click', function(event) {
        event.preventDefault(); 
        
        alert('Your message has been delivered successfully');
    });
});

//- - - - - - - - - - - - - - - - -> Href Link Hightlight Whenever The Site Is At That Area
document.querySelectorAll('.navbar-menu a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });

        document.querySelectorAll('.navbar-menu a[href^="#"]').forEach(anchor => {
            anchor.classList.remove('active');
        });
        this.classList.add('active');
    });
});


window.addEventListener('scroll', () => {
    const currentSection = document.querySelectorAll('section[id]').item(Array.from(document.querySelectorAll('section[id]')).findIndex(section => section.getBoundingClientRect().top >= 0));

    document.querySelectorAll('.navbar-menu a').forEach(anchor => {
        anchor.style.color = '';
        anchor.style.textShadow = '';
    });

    if (currentSection) {
        const correspondingLink = document.querySelector(`.navbar-menu a[href="#${currentSection.getAttribute('id')}"]`);
        if (correspondingLink) {
            correspondingLink.style.color = 'red';
            correspondingLink.style.textShadow = '2px 2px 4px red, 0px 0px 1px whitesmoke'; 
        }
    }
});

const searchBar = document.getElementById('search-bar');
const searchIcon = document.querySelector('.search-container-input i');

searchBar.addEventListener('focus', () => {
  searchIcon.style.transform = 'translate(-13px, -50%)';
});

searchBar.addEventListener('blur', () => {
  searchIcon.style.transform = 'translate(0, -50%)';
});

