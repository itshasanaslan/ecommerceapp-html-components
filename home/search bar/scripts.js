// scripts.js
document.getElementById('search-input').addEventListener('input', function() {
    const query = this.value.trim().toLowerCase();
    const searchResults = document.getElementById('search-results');
    
    // Mock product data
    const products = [
        { id: 1, name: 'Product One', thumbnail: 'https://via.placeholder.com/50', description: 'This is product one.', price: '$10', url: '#' },
        { id: 2, name: 'Product Two', thumbnail: 'https://via.placeholder.com/50', description: 'This is product two.', price: '$20', url: '#' },
        { id: 3, name: 'Product Three', thumbnail: 'https://via.placeholder.com/50', description: 'This is product three.', price: '$30', url: '#' }
    ];

    // Filter products based on search query
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
    
    // Clear previous results
    searchResults.innerHTML = '';
    
    if (filteredProducts.length > 0) {
        searchResults.style.display = 'block'; // Show the results container
        
        filteredProducts.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.onclick = () => {
                window.location.href = product.url;
            };
            
            const productThumbnail = document.createElement('img');
            productThumbnail.src = product.thumbnail;
            productThumbnail.alt = product.name;
            
            const productDetails = document.createElement('div');
            productDetails.className = 'product-details';
            
            const productName = document.createElement('div');
            productName.className = 'product-name';
            productName.textContent = product.name;
            
            const productDescription = document.createElement('div');
            productDescription.className = 'product-description';
            productDescription.textContent = product.description;
            
            const productPrice = document.createElement('div');
            productPrice.className = 'product-price';
            productPrice.textContent = product.price;
            
            productDetails.appendChild(productName);
            productDetails.appendChild(productDescription);
            productDetails.appendChild(productPrice);
            productItem.appendChild(productThumbnail);
            productItem.appendChild(productDetails);
            searchResults.appendChild(productItem);
        });
    } else {
        searchResults.style.display = 'none'; // Hide the results container if no products match
    }
});
