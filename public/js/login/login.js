 // Function to dynamically display flash messages
 function displayFlashMessage(type, message) {
    const flashDiv = document.createElement('div');
    flashDiv.className = `alert alert-${type}`;
    flashDiv.textContent = message;

    // Append to a container on the page
    // document.querySelector('#flash-container').appendChild(flashDiv);

    // Optionally, remove the flash message after a timeout
    setTimeout(() => {
        flashDiv.remove();
    }, 3000); // Flash message disappears after 3 seconds
}