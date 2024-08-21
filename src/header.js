const navInput  = document.getElementById('search-input');
const navButton = document.getElementById('search-btn');

const pages = {
    "12400": "/pa",
    "23880": "/pd",
    "52637": "/pe"
};

function displayAlertMessage() {
    const pinDisplay = document.getElementById('pin-display');
    if (pinDisplay) {
        pinDisplay.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert" style="text-align: center;">
                很抱歉，您查找的頁面不存在！
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
    }
}

navButton.addEventListener('click', function () {
    const inputValue = navInput.value.trim();  // Get the value from the input field and trim any whitespace
    if (Object.prototype.hasOwnProperty.call(pages, inputValue)) {
        // console.log(true);
        window.location.href = pages[inputValue];
    } else {
        // console.log(false);
        // Store a flag in localStorage to indicate that the alert should be displayed
        localStorage.setItem('displayAlert', 'true');
        // Redirect to the home page
        window.location.href = '/';
    }
});

// On page load, check if the alert should be displayed
if (window.location.pathname === '/' && localStorage.getItem('displayAlert') === 'true') {
    setTimeout(() => {
        displayAlertMessage();
        localStorage.removeItem('displayAlert');
    }, 150);
    // displayAlertMessage();
    // Remove the flag so the alert is not shown on subsequent reloads
    // localStorage.removeItem('displayAlert');
}
