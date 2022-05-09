const start_btn = document.getElementById('start_btn');
const end_btn = document.getElementById('end_btn');
const screens = document.querySelectorAll('.screen');
const choose_insect_btns = document.querySelectorAll('.choose_insect_btn');
const game_container = document.querySelector('.game_container');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const annoying_message = document.getElementById('annoying_message');

let seconds = 0;
let score = 0;
let selected_insect = {};


start_btn.addEventListener('click', () => {
    screens[0].classList.add('up');
});

end_btn.addEventListener('click', () => {
    screens[0].classList.remove('up');
});

choose_insect_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img');
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt');
        selected_insect = {
            src,
            alt
        };
        screens[1].classList.add('up');
        setTimeout(createInsect, 1000);
        startGame();
    })
})

function startGame() {
    setInterval(increaseTime, 1000);
}

function createInsect() {
    const insect = document.createElement('div');
    const { x, y } = getRandomLocation();
    insect.classList.add('insect');
    insect.style.left=`${x}px`;
    insect.style.top=`${y}px`;

    insect.innerHTML = `<img src="${selected_insect.src}" arc="${
        selected_insect.alt
    }" style="transform: rotate(${Math.random() * 360}deg)"/>`;

    insect.addEventListener('click', catchInsect);

    game_container.appendChild(insect);
}

function getRandomLocation() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = Math.random() * (width - 200) + 100;
    const y = Math.random() * (height - 200) + 100;

    return { x, y };
}

function addInsects() {
    setTimeout(createInsect, 1000);
    setTimeout(createInsect, 1500);
}

function catchInsect() {
    increaseScore();
    this.classList.add('catch');
    setTimeout(() => {
        this.remove();
    }, 2000);
    addInsects();

}

function increaseScore() {
    score++;
    if (score > 11) {
        annoying_message.classList.add('visible');
    }
    scoreEl.innerHTML = `Счёт: ${score}`;
}

function increaseTime() {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;

    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;

    timeEl.innerHTML = `Время: ${m}:${s}`;

    seconds++;
}