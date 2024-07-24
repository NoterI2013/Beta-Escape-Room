const numDisplay = document.getElementById('numDisplay');

document.querySelectorAll('.num-btn').forEach(button => {
    button.addEventListener('click', function() {
        // let numDisplay = document.getElementById('numDisplay');
        numDisplay.value += this.textContent;
    })
});

document.querySelector('.num-clear').addEventListener('click', function() {
    // console.log('clear clicked');
    numDisplay.value = "";
});

document.querySelector('.num-backspace').addEventListener('click', function() {
    numDisplay.value = numDisplay.value.slice(0, -1);
});

document.querySelector('.num-enter').addEventListener('click', function() {
    // console.log('enter clicked');
    if(numDisplay.value === "")
        return;

    // alert(`User Input: ${numDisplay.value}`);
    axios.post('/axios/test', {
        problem: "ProblemA",
        encrypt: numDisplay.value
    })
    .then(function (response) {
        console.log(response.data.accept);
    })
    .catch(function (err) {
        console.error(err);
    })
    // .finally(function () {
    //     console.log('hi ho');
    // });
    numDisplay.value = "";

});

const coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}