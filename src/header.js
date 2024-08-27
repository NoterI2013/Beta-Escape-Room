const navInput  = document.getElementById('search-input');
const navButton = document.getElementById('search-btn');
const navForm   = document.getElementById('search-form');

const pages = {
    "95884": "/pa",
    "72043": "/pd",
    "14915": "/pe"
};

navForm.addEventListener('submit', function(event) {
    event.preventDefault();
    redirectPage();
});

navButton.addEventListener('click', function () {
    // const inputValue = navInput.value.trim();  // Get the value from the input field and trim any whitespace
    // if (Object.prototype.hasOwnProperty.call(pages, inputValue)) {
    //     window.location.href = pages[inputValue];
    // } else {
    //     // Store a flag in localStorage to indicate that the alert should be displayed
    //     localStorage.setItem('displayAlert', 'true');
    //     // Redirect to the home page
    //     window.location.href = '/';
    // }
    redirectPage();
});

function redirectPage(){
    const inputValue = navInput.value.trim();  // Get the value from the input field and trim any whitespace
    if (Object.prototype.hasOwnProperty.call(pages, inputValue)) {
        window.location.href = pages[inputValue];
    } else {
        localStorage.setItem('displayAlert', 'true');
        window.location.href = '/';
    }
}

// On page load, check if the alert should be displayed
if (window.location.pathname === '/' && localStorage.getItem('displayAlert') === 'true') {
    setTimeout(() => {
        displayAlertMessage();
        localStorage.removeItem('displayAlert');
    }, 150);
}

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
