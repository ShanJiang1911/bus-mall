'use strict';

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

const Product = function(name, imgPath) {
    this.name = name;
    this.imgPath = imgPath;
    this.votes = 0;
    this.timesShown = 0

    Product.allImgs.push(this);
}

Product.allImgs = [];


const renderProduct = function() {
    leftProductImag.src = leftProduct.imgPath;
    middleProductImg.src = middleProduct.imgPath;
    rightProductImg.src = rightProduct.imgPath;
    leftProductH2Elem.textContent = leftProduct.name;
    middleProductH2Elem.textContent = middleProduct.name;
    rightProductH2Elem.textContent = rightProduct.name;
}



function productPicker() {
    const doNotUse = [];
    doNotUse.push(leftProduct);
    doNotUse.push(middleProduct);
    doNotUse.push(rightProduct);

    while(doNotUse.indludes(leftProduct)) {
        let leftIndex = Math.floor(Math.random() * Product.allImgs.length);
        leftProduct = Product.allImgs[leftIndex];
    }

    while(doNotUse.indludes(middleProduct)) {
        let middleIndex = Math.floor(Math.random() * Product.allImgs.length);
        middleProduct = Product.allImgs[middleIndex];
    }

    while(doNotUse.indludes(rightProduct)) {
        let rightIndex = Math.floor(Math.random() * Product.allImgs.length);
        rightProduct = Product.allImgs[rightIndex];
    }
}

function displayVoteCount() {
    results.innerHTML = '';
    let h2Elem = document.createElement('h2')
    h2Elem.textContent = 'Customer Likes'
    results.appendChild(h2Elem);
    for (let product of Product.allImgs) {
        const liElem = document.createElement('li');
        liElem.textContent = '${product.name}: ${product.clicks}';
        results.appendChild(liElem);
    }
}

const makeAProductChart = function() {
    const productChart = document.getElementById('productChart').getContext('2d');
    const productData = [];
    const productLabels = [];

    for (let product of Product.allImgs) {
        productData.push(product.clicks);
        productLabels.push(product.name);
    }

    const colors = [];
    for (let i = 0; i < Product.allImgs.length; i++) {
        if (i % 2 === 0) {
            colors.push('rgb(255, 168, 55)')
        } else {
            colors.push('rgb(0,0,0)');
        }
    }

    const myChart = new Chart(productChart, {
        type: 'bar',
        data: {
          labels: productLabels,
          datasets: [{
            label: '# of Votes',
            data: productData,
            backgroundColor: colors,
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero:true
              }
            }]
          }
        }
      });


}

function handleClick(event) {
    const clickedTarget = event.target;
    const id = clickedTarget.id;

    if (totalClicks < 5) {
        if (id === 'left_product_img' || id === 'middle_product_img' || id === 'right_product_img') {
            if (id === 'left_product_img') {
                leftProduct.clicks++;
            } else if (id === 'middle_product_img') {
                middleProduct.clicks++;
            } else {
                rightProduct.clicks++;
            }
            totalClicks++;
            leftProduct.timesShown++;
            middleProduct.timesShown++;
            rightProduct.timesShown++;
            productPicker();
            renderProduct();
        }
    }
    if (totalClicks === 5) {
        bothProduct.removeEventListener('click', handleClick);
        displayVoteCount();
        makeAProductChart();
    }
}




// broken code for previous lab:

// Product.prototype.renderProduct = function(h2, imageTag) {
//     imageTag.src = this.imgPath;
//     h2.textContent = this.name;
// }

// function renderThreeProducts(leftProduct, middleProduct, rightProduct) {
//     leftProduct.renderProduct(leftProductH2Elem, leftProductImageTag);
//     middleProduct.renderProduct(middleProductH2Elem, middleProductImageTag);
//     rightProduct.renderProduct(rightProductH2Elem, rightProductImageTag);
// }



// function pickProduct() {
//     const leftProductIndex = Math.floor(Math.random() * Product.allProducts.length);

//     let middleProductIndex = Math.floor(Math.random() * Product.allProducts.length);
//     while (middleProductIndex === leftProductIndex) {
//         middleProductIndex = Math.floor(Math.random() * Product.allProducts.length);
//     }

//     let rightProductIndex = Math.floor(Math.random() * Product.allProducts.length);
//     while (rightProductIndex === leftProductIndex || rightProductIndex === middleProductIndex) {
//         rightProductIndex = Math.floor(Math.random() * Product.allProducts.length);
//     }

//     currentLeftProduct = Product.allProducts[leftProductIndex];
//     currentMiddleProduct = Product.allProducts[middleProductIndex];
//     currentRightProduct = Product.allProducts[rightProductIndex];
// }

// function renderResults() {
//     resultPannelUlElem.innerHTML = '';
//     const h2Elem = document.createElement('h2');
//     h2Elem.textContent = 'Customer likes';
//     resultPannelUlElem.appendChild(h2Elem);
//     for (let product of Product.allProducts) {
//         const liElem = document.createElement('li');
//         liElem.textContent = '$(product.name) : $(product.votes)';
//         resultPannelUlElem.appendChild(liElem);
//     }
// }

// function handleClick(e) {
//     let customerClick = e.target;
//     if (voteCounter < 5) {
//         if(customerClick === leftProductImageTag || customerClick === middleProductImageTag || customerClick === rightProductImageTag) {
//             voteCounter++;
//             if(customerClick === leftProductImageTag) {
//                 currentLeftProduct.votes++;
//             } else {
//                 if(customerClick === middleProductImageTag) {
//                     currentMiddleProduct.votes++;
//                     } else {
//                     currentRightProduct.votes++
//                     }
//                 pickProduct();
//                 renderThreeProducts(currentLeftProduct, currentMiddleProduct, currentRightProduct);
//                 }   

//             } else {
//                 productImageSectionTag.removeEventListener('click', handleClick);
//                 renderResults();
//             }
//     }
// }

// productImageSectionTag.addEventListener('click', handleClick)
// pickProduct();
// renderThreeProducts(currentLeftProduct, currentMiddleProduct, currentRightProduct);


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

bothProduct.addEventListener('click', handleClick);

productPicker();
renderProduct();
bothProduct();






















