// Function to simulate a click on the hidden file input element
function handleUploadButtonClick() {
    document.getElementById('upload-input').click();
}

// Function to start the shrink and spin animation on a given element
function startShrinkSpinAnimation(element, duration = 5000) {
    // Apply the animation to the element
    element.style.animation = `shrink-spin 5s linear 1`;

    // Reset the animation after the specified duration (default is 5000ms)
    setTimeout(() => {
        element.style.animation = ''; // Reset the animation

        // Reset the upload icon image source to the default upload icon after the animation completes
        const uploadIcon = document.getElementById("uploadIcon");
        uploadIcon.src = 'images/upload_icon.svg';
    }, duration);
}

// Function to handle the file upload and update the UI accordingly
function handleFileUpload(event) {
    const file = event.target.files[0]; // Get the selected file from the file input
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const uploadIconImg = document.getElementById('uploadIcon');
            const image = document.getElementById('image');
            const logoPreview = document.getElementById('logo-preview');
            uploadIconImg.src = image.src; // Temporarily set the upload icon image to the current umbrella image

            // Hide the logo preview during the animation
            if (logoPreview.getAttribute('src'))
                logoPreview.style.display = 'none';

            // Start the shrink and spin animation on both the upload icon and the main image
            startShrinkSpinAnimation(uploadIconImg);
            startShrinkSpinAnimation(image);

            const uploadIconSpan = document.getElementById('upload-icon');
            uploadIconSpan.textContent = file.name; // Update the upload button text to the selected file name

            // After the animation completes, set the logo preview image and display it
            setTimeout(function () {
                logoPreview.src = e.target.result; // Set the logo preview source to the uploaded file's data URL
                logoPreview.style.display = 'block'; // Display the logo preview
                uploadIconImg.src = 'images/upload_icon.svg'; // Reset the upload icon image to the default
            }, 5000); // Delay execution for 5000ms to match the animation duration
        }
        // Read the selected file as a data URL
        reader.readAsDataURL(file);
    }
}

// Function to change the umbrella image and color based on user selection
function changeImageAndColor(buttonColor, bgColor, imageLocation) {
    const imageElement = document.getElementById("image");
    const uploadIcon = document.getElementById("uploadIcon");
    const logoPreview = document.getElementById('logo-preview');

    // Start the shrink and spin animation on both the main image and the upload icon
    startShrinkSpinAnimation(imageElement);
    startShrinkSpinAnimation(uploadIcon);

    // Hide the logo preview during the animation
    if (logoPreview.getAttribute('src'))
        logoPreview.style.display = 'none';

    // Set the source of the umbrella image to the new image location
    imageElement.src = imageLocation;
    // Set the source of the upload icon image to the new image location
    uploadIcon.src = imageLocation;

    // Change the background color of the upload label to match the button color
    const uploadInput = document.getElementById("upload-label");
    uploadInput.style.backgroundColor = buttonColor;

    // Change the background color of the upload button to match the button color
    const uploadButton = document.getElementById("upload-button");
    uploadButton.style.backgroundColor = buttonColor;

    // Change the background color of the body to the selected background color
    document.body.style.backgroundColor = bgColor;

    // After the animation completes, show the logo preview if it has a source set
    setTimeout(function () {
        if (logoPreview.getAttribute('src')) {
            logoPreview.style.display = 'block'; // Show the logo preview
        }
    }, 5000); // Delay execution for 5000ms to match the animation duration
}

