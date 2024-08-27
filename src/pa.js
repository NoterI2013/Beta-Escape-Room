let keySequence = []; // Array to store the sequence of button presses
const specialKey = "FB#C#"; // The special key sequence you're looking for
const maxSequenceLength = specialKey.length; // Maximum allowed length of the sequence

const problemKey = "ProblemA"
const judgeResult = document.getElementById("judge-result");

document.addEventListener('DOMContentLoaded', function () {
    const keys = document.querySelectorAll('.piano-key');

    keys.forEach(key => {
        if(key.dataset.enable === "false") return;

        key.addEventListener('click', () => {
            playSound(key);
        });

        key.addEventListener('mousedown', (event) => {
            event.preventDefault();
            key.classList.add('active');
        });

        key.addEventListener('mouseup', () => {
            key.classList.remove('active');
        });

        key.addEventListener('mouseleave', () => {
            key.classList.remove('active');
        });
    });

    function playSound(key) {
        keySequence.push(key.dataset.note); // Add the button's text content to the array

        if (keySequence.length > maxSequenceLength) {
            keySequence.shift(); // Remove the first element to keep the array size within the limit
        }

        const note = key.dataset.note;
        const sound = new Howl({
            src: [`/public/sounds/${note}4.mp3`]
        });
        sound.play();

        
        axios.post('axios/test', {
            problem: problemKey,
            encrypt: keySequence.slice(-specialKey.length).join('')
        })
        .then(function (response) {
            if(response.data.accept === true){
                judgeResult.innerHTML = generate("success");
                judgeResult.children[0].innerHTML += `<hr> <a href="/certificate?arg=${response.data.secret}&p=${problemKey}" class="alert-link">點擊查看</a>`
            }else{
                judgeResult.innerHTML = generate("info");
            }
        })
        .catch(function (err) {
            console.error(err);
            judgeResult.innerHTML = generate("warning");
        });
    }
});

const judgeTable = {
    info : "空氣寂靜得就像什麼都沒有發生一樣... <hr> 魔法筆記本對你的答案不甚滿意，建議你再試試看",
    success: "你感覺現場出現一絲異樣，就像什麼東西要破繭而出一般...",
    danger: "Wrong Password",
    warning: "Error! Please retry or ask the administrator"
};

function generate(property){
    const resultDisplay = `
        <div class="alert alert-${property}" role="alert">
            ${judgeTable[property]}
        </div>
    `;
    return resultDisplay;
}