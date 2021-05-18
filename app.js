const resultPannelUlElem = document.getElementById('product-clicks');
const productImageSectionTag = document.getElementById('all-products');
const leftProductImageTag = document.getElementById('left-product-img');
const middleProductImageTag = document.getElementById('middle-product-img');
const rightProductImageTag = document.getElementById('right-product-img');
const leftProductH2Elem = document.getElementById('left-product-h2');
const middleProductH2Elem = document.getElementById('middle-product-h2');
const rightProductH2Elem = document.getElementById('right-product-h2');


let voteCounter = 0;

let currentLeftProduct = null;
let currentMiddleProduct = null;
let currentRightProduct = null;

function Product(name, imgPath) {
    this.name = name;
    this.imgPath = imgPath;
    this.votes = 0;
    this.timesShown = 0
}

Product.prototype.renderProduct = function(h2, imageTag) {
    imageTag.src = this.imgPath;
    h2.textContent = this.name;
}

function renderThreeProducts(leftProduct, middleProduct, rightProduct) {
    leftProduct.renderProduct(leftProductH2Elem, leftProductImageTag);
    middleProduct.renderProduct(middleProductH2Elem, middleProductImageTag);
    rightProduct.renderProduct(rightProductH2Elem, rightProductImageTag);
}

function pickProduct() {
    const leftProductIndex = Math.floor(Math.random() * Product.allProducts.length);

    let middleProductIndex = Math.floor(Math.random() * Product.allProducts.length);
    while (middleProductIndex === leftProductIndex) {
        middleProductIndex = Math.floor(Math.random() * Product.allProducts.length);
    }

    let rightProductIndex = Math.floor(Math.random() * Product.allProducts.length);
    while (rightProductIndex === leftProductIndex || rightProductIndex === middleProductIndex) {
        rightProductIndex = Math.floor(Math.random() * Product.allProducts.length);
    }

    currentLeftProduct = Product.allProducts[leftProductIndex];
    currentMiddleProduct = Product.allProducts[middleProductIndex];
    currentRightProduct = Product.allProducts[rightProductIndex];
}

function renderResults() {
    resultPannelUlElem.innerHTML = '';
    const h2Elem = document.createElement('h2');
    h2Elem.textContent = 'Customer likes';
    resultPannelUlElem.appendChild(h2Elem);
    for (let product of Product.allProducts) {
        const liElem = document.createElement('li');
        liElem.textContent = '$(product.name) : $(product.votes)';
        resultPannelUlElem.appendChild(liElem);
    }
}

function handleClick(e) {
    let customerClick = e.target;
    if (voteCounter < 5) {
        if(customerClick === leftProductImageTag || customerClick === middleProductImageTag || customerClick === rightProductImageTag) {
            voteCounter++;
            if(customerClick === leftProductImageTag) {
                currentLeftProduct.votes++;
            } else {
                if(customerClick === middleProductImageTag) {
                    currentMiddleProduct.votes++;
                    } else {
                    currentRightProduct.votes++
                    }
                pickProduct();
                renderThreeProducts(currentLeftProduct, currentMiddleProduct, currentRightProduct);
                }   

            } else {
                productImageSectionTag.removeEventListener('click', handleClick);
                renderResults();
            }
    }
}

productImageSectionTag.addEventListener('click', handleClick)

new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/.jpg');
new Product('cthulhu', 'img/chair.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet-sweep', 'img/pet-sweep.jpg');
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.jpg');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');

pickProduct();
renderThreeProducts(currentLeftProduct, currentMiddleProduct, currentRightProduct);





















