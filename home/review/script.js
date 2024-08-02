document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.star');
    const reviewText = document.getElementById('review-text');
    const submitButton = document.getElementById('submit-review');
    const writeReviewButton = document.getElementById('write-review-button');
    const reviewDialog = document.getElementById('review-dialog');
    let rating = 0;

    writeReviewButton.addEventListener('click', function() {
        reviewDialog.style.display = 'block';
    });

    stars.forEach(star => {
        star.addEventListener('mouseover', function() {
            highlightStars(star.dataset.value);
        });

        star.addEventListener('mouseout', function() {
            highlightStars(rating);
        });

        star.addEventListener('click', function() {
            rating = star.dataset.value;
            highlightStars(rating);
            console.log(`You rated ${rating} stars`);
        });
    });

    function highlightStars(stars) {
        stars = parseInt(stars);
        document.querySelectorAll('.star').forEach((star, index) => {
            star.style.color = index < stars ? 'gold' : 'lightgray';
            star.classList.toggle('selected', index < stars);
        });
    }

    submitButton.addEventListener('click', function() {
        const review = reviewText.value;
        alert(`You submitted ${rating} stars with the review: "${review}"`);
    });
});
