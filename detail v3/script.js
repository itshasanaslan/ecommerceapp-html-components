window.addEventListener('DOMContentLoaded',function () {
  
   var thumbnails = document.getElementsByClassName("img-thumbnail");

});


function triggerCardButton(id) {
    alert("clicked card");
}

function triggerAddToCartForRelated(id) {
    alert("Clicked add to cart")
}

document.getElementById('buyNow').addEventListener('click', () => {
    alert('Buy it now clicked');
    // Implement actual buy now functionality here
});

document.getElementById('addToCart').addEventListener('click', () => {
    alert('Add to cart clicked');
    // Implement actual add to cart functionality here
});

document.getElementById('addToCollection').addEventListener('click', () => {
    alert('Add to collection clicked');
    // Implement actual add to collection functionality here
});




var displayingFullScreenNow = false;
const thumbnails = document.querySelectorAll('.img-thumbnail');
const mainImage = document.querySelector('.main-image');
const fullscreenOverlay = document.querySelector('.fullscreen-overlay');
const fullscreenImage = fullscreenOverlay.querySelector('img');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const closeBtn = document.querySelector('.close-btn');
let currentImageIndex = 0;

const images = [
    '1.jpg',
    '2.jpg',
    '3.jpg', '4.jpg', '5.jpg', '6.jpg'
];

let lastImageIndex = images.length;


thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        mainImage.src = images[index];
        currentImageIndex = index;
    });
    thumbnail.onmouseover = function() 
    {
        mainImage.src = images[index];
        currentImageIndex = index;
    }
    thumbnail.innerHTML = index;
});

mainImage.addEventListener('click', () => {
   displayFullScreen();
});

closeBtn.addEventListener('click', () => {
   hideFullScreen();
});

leftArrow.addEventListener('click', (event) => {
  displayPictureOnTheLeft();
});

rightArrow.addEventListener('click', (event) => {
    displayPictureOnTheRight();
});

fullscreenOverlay.addEventListener('click', (event) => {
    if (event.target === fullscreenOverlay) {
       hideFullScreen();
    }
});

function displayPictureOnTheRight(){
    event.stopPropagation();
    currentImageIndex = (currentImageIndex < images.length - 1) ? currentImageIndex + 1 : 0;
    fullscreenImage.src = images[currentImageIndex];
}
function displayPictureOnTheLeft(){
    event.stopPropagation();
    currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : images.length - 1;
    fullscreenImage.src = images[currentImageIndex];
}

function hideFullScreen(){
    fullscreenOverlay.style.visibility = 'hidden';
    displayingFullScreenNow = false;
}

function displayFullScreen(){
    fullscreenImage.src = mainImage.src;
    fullscreenOverlay.style.display = 'flex';
    fullscreenOverlay.style.visibility = "visible";
    displayingFullScreenNow = true;
}

setInterval(function () {
if (!displayingFullScreenNow){
    if (currentImageIndex+1 != lastImageIndex) {
        currentImageIndex++;
    }
    else {
        currentImageIndex = 0;
    }
    mainImage.src = images[currentImageIndex];

}
}, 5000);


document.addEventListener("keydown", (e) => {
if (event.keyCode== 37) {
   displayPictureOnTheLeft();
}
if (event.keyCode== 39) {
displayPictureOnTheRight();
}
//esc
if (event.keyCode == 27) {
hideFullScreen();
}

});

