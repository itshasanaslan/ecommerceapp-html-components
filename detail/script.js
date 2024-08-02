document.addEventListener('DOMContentLoaded', () => {
    const images = [
        'https://img-new.cgtrader.com/items/4291644/0d318a7034/large/nazgul-3d-model-0d318a7034.jpg',
        'https://img-new.cgtrader.com/items/2490078/6ef2f5f3de/large/diorama-nazgul-3d-model-stl.jpg',
        'https://i.ebayimg.com/images/g/uJ8AAOSwXrVjVdVo/s-l1200.webp'
    ];

    const tags = ['Magic', 'Fantasy', 'Sculpture'];

    const reviews = [
        { username: 'John', lastname: 'Doe', text: 'Great sculpture!', stars: 5 },
        { username: 'Jane', lastname: 'Smith', text: 'Amazing detail!', stars: 4 },
        { username: 'Alice', lastname: 'Brown', text: 'Love it!', stars: 5 }
    ];

    const shopProducts = [
        { title: 'Harry Potter Sculpture', price: '$30.00', img: 'https://via.placeholder.com/150' },
        { title: 'Gandalf Sculpture', price: '$45.00', img: 'https://via.placeholder.com/150' }
    ];

    const relatedProducts = [
        { title: 'Frodo Sculpture', price: '$25.00', img: 'https://via.placeholder.com/150' },
        { title: 'Sauron Sculpture', price: '$60.00', img: 'https://via.placeholder.com/150' }
    ];

    let currentIndex = 0;

    const mainImage = document.getElementById('main-image');
    const thumbnailGallery = document.getElementById('thumbnail-gallery');
    const indexIndicator = document.getElementById('index-indicator');

    const updateMainImage = (index) => {
        mainImage.src = images[index];
        indexIndicator.textContent = `${index + 1} / ${images.length}`;

        Array.from(thumbnailGallery.children).forEach((thumbnail, i) => {
            thumbnail.classList.toggle('active', i === index);
        });
    };

    const createThumbnail = (src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Thumbnail ${index + 1}`;
        img.loading = 'lazy';
        img.addEventListener('click', () => {
            currentIndex = index;
            updateMainImage(currentIndex);
        });
        thumbnailGallery.appendChild(img);
    };

    images.forEach((src, index) => createThumbnail(src, index));
    updateMainImage(currentIndex);

    document.getElementById('prev-button').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateMainImage(currentIndex);
    });

    document.getElementById('next-button').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateMainImage(currentIndex);
    });

    const tagsContainer = document.getElementById('tags');
    tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.textContent = tag;
        tagsContainer.appendChild(tagElement);
    });

    const reviewsList = document.getElementById('reviews-list');
    const latestReviewContainer = document.getElementById('latest-review');
    reviews.forEach((review, index) => {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');
        reviewElement.textContent = `${review.username} ${review.lastname}: ${review.text} (${review.stars} stars)`;
        reviewsList.appendChild(reviewElement);

        if (index === reviews.length - 1) {
            latestReviewContainer.textContent = `Latest review: ${review.username} ${review.lastname}: ${review.text} (${review.stars} stars)`;
        }
    });

    document.getElementById('review-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('review-username').value;
        const lastname = document.getElementById('review-lastname').value;
        const text = document.getElementById('review-text').value;
        const stars = document.getElementById('review-stars').value;

        const newReview = { username, lastname, text, stars: parseInt(stars) };
        reviews.push(newReview);

        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');
        reviewElement.textContent = `${username} ${lastname}: ${text} (${stars} stars)`;
        reviewsList.appendChild(reviewElement);

        latestReviewContainer.textContent = `Latest review: ${username} ${lastname}: ${text} (${stars} stars)`;
        event.target.reset();
    });

    const displayProductList = (container, products) => {
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <img src="${product.img}" alt="${product.title}" loading="lazy">
                <div>${product.title}</div>
                <div>${product.price}</div>
            `;
            container.appendChild(productElement);
        });
    };

    displayProductList(document.querySelector('#more-from-shop .product-list'), shopProducts);
    displayProductList(document.querySelector('#you-may-like .product-list'), relatedProducts);

    const popup = document.getElementById('popup');
    const popupImage = document.getElementById('popup-image');
    const popupClose = document.getElementById('popup-close');
    const popupPrevButton = document.getElementById('popup-prev-button');
    const popupNextButton = document.getElementById('popup-next-button');

    mainImage.addEventListener('click', () => {
        popupImage.src = mainImage.src;
        popup.style.display = 'flex';
    });

    popupClose.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    popupPrevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        popupImage.src = images[currentIndex];
    });

    popupNextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        popupImage.src = images[currentIndex];
    });

    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
});
