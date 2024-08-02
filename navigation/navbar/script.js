// script.js

function toggleNavbar() {
    const navbarLinks = document.querySelector('.navbar-links');
    navbarLinks.classList.toggle('show');
}

function toggleCart() {
    const cartDropdown = document.querySelector('.cart-dropdown');
    cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
}

function toggleCategories() {
    const categoriesDropdown = document.querySelector('.categories-dropdown');
    categoriesDropdown.style.display = categoriesDropdown.style.display === 'block' ? 'none' : 'block';
}
