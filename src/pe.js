const problemKey = "ProblemE"
const judgeResult = document.getElementById("judge-result");

let keySequence = []; // Array to store the sequence of button presses
let weaponSequence = [];
const maxSequenceLength = 16;

const tacticTail = `<br/><br/><br/>
                        <button class="btn btn-outline-primary btn-sm float-right" id="key-tactic-send" style="margin-top: -2em;">確認</button>
                        <button class="btn btn-outline-primary btn-sm float-right" id="key-tactic-clear" style="margin-top: -2em;">取消</button>
                    `;

document.querySelectorAll('.weapon-btn').forEach(button => {
    button.addEventListener('click', function() {

        keySequence.push(button.dataset.note);
        weaponSequence.push(button.textContent);
        if(keySequence.length > maxSequenceLength){
            keySequence.shift();
            weaponSequence.shift();
        }
        
        judgeResult.innerHTML = generate('primary');
        judgeResult.children[0].innerHTML += (weaponSequence.slice(-weaponSequence.length).join(' → ') + tacticTail);
        document.getElementById('key-tactic-send').addEventListener('click', function() {
            judge();
            clearUserInput(true);
        });
        document.getElementById('key-tactic-clear').addEventListener('click', function() {
            clearUserInput(true);
        });

    });
});

function clearUserInput(status){
    keySequence = [];
    weaponSequence = [];
    if(status === true){
        judgeResult.innerHTML = "";
    }
}

function judge(){
        judgeResult.innerHTML = generate("info");
        axios.post('axios/test', {
            problem: problemKey,
            encrypt: keySequence.slice(-keySequence.length).join('')
        })
        .then(function (response) {
            if(response.data.accept === true){
                judgeResult.innerHTML = generate("success");
                judgeResult.children[0].innerHTML += `<hr> <a href="/certificate?arg=${response.data.secret}&p=${problemKey}" class="alert-link">點擊查看</a>`
                clearUserInput(false);
            }else{
                judgeResult.innerHTML = generate("danger");
                judgeResult.children[0].innerHTML += `<button class="btn btn-outline-primary btn-sm float-right" id="key-seq-reset">再試一次</button>`
                document.getElementById('key-seq-reset').addEventListener('click', function() {
                    clearUserInput(true);
                });
            }
        })
        .catch(function (err) {
            console.error(err);
            judgeResult.innerHTML = generate("warning");
        })
        // .finally(function () {
        //     keySequence = [];
        // })
}

const judgeTable = {
    info : "等待系統回應...",
    success: "你成功了！ 咦？這是什麼？",
    danger: "這方法似乎行不通... 換個方法試試（？<hr> 魔法筆記本對你的答案不甚滿意，建議你再試試看",
    warning: "Error! Please retry or ask the administrator",
    primary: `戰術準備：`
};

function generate(property){
    let resultDisplay = `
        <div class="alert alert-${property}" role="alert">
            ${judgeTable[property]}
        </div>
    `;
    return resultDisplay;
}

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