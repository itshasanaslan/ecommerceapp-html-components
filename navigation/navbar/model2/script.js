document.addEventListener("DOMContentLoaded", function () {
    const categoriesBtn = document.getElementById('categories-btn');
    const cartBtn = document.getElementById('cart-btn');
    const profileBtn = document.getElementById('profile-btn');
    const categoriesDropdown = document.getElementById('categories-dropdown');
    const cartDropdown = document.getElementById('cart-dropdown');
    const profileDropdown = document.getElementById('profile-dropdown');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    categoriesBtn.addEventListener('click', () => {
        categoriesDropdown.style.display = categoriesDropdown.style.display === 'block' ? 'none' : 'block';
        cartDropdown.style.display = 'none';
        profileDropdown.style.display = 'none';
    });

    cartBtn.addEventListener('click', () => {
        cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
        categoriesDropdown.style.display = 'none';
        profileDropdown.style.display = 'none';
    });

    profileBtn.addEventListener('click', () => {
        profileDropdown.style.display = profileDropdown.style.display === 'block' ? 'none' : 'block';
        profileDropdown.style.top = profileBtn.offsetTop + profileBtn.offsetHeight + 'px';
        profileDropdown.style.right = document.body.clientWidth - profileBtn.getBoundingClientRect().right + 'px';
        categoriesDropdown.style.display = 'none';
        cartDropdown.style.display = 'none';
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.navbar') && !event.target.closest('.dropdown')) {
            categoriesDropdown.style.display = 'none';
            cartDropdown.style.display = 'none';
            profileDropdown.style.display = 'none';
        }
    });

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        if (query) {
            searchResults.style.display = 'block';
            searchResults.innerHTML = `
                <p class="mock-data">Result for "${query}" 1</p>
                <p class="mock-data">Result for "${query}" 2</p>
                <p class="mock-data">Result for "${query}" 3</p>
            `;
        } else {
            searchResults.style.display = 'none';
        }
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.search-container')) {
            searchResults.style.display = 'none';
        }
    });
});
