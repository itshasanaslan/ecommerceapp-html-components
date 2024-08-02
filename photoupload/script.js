document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting immediately
    const files = document.getElementById('fileInput').files;
    const requiredWidth = 300; // Change this to your required width

    if (files.length === 0) {
        alert('Please select at least one image.');
        return;
    }

    checkImageDimensions(files, requiredWidth).then(isValid => {
        if (isValid) {
            alert('All images have the required width.');
            // If validation is successful, you can submit the form programmatically
            // this.submit(); // Uncomment this line to submit the form after validation
        } else {
            alert('One or more images do not meet the required width.');
        }
    });
});

function checkImageDimensions(files, requiredWidth) {
    return new Promise((resolve) => {
        let valid = true;
        let imagesProcessed = 0;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const img = new Image();

            img.onload = function() {
                if (img.width !== requiredWidth) {
                    valid = false;
                }
                imagesProcessed++;
                if (imagesProcessed === files.length) {
                    resolve(valid);
                }
            };

            img.onerror = function() {
                valid = false;
                imagesProcessed++;
                if (imagesProcessed === files.length) {
                    resolve(valid);
                }
            };

            img.src = URL.createObjectURL(file);
        }
    });
}
