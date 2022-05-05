const start_btn = document.getElementById('start_btn');
const end_btn = document.getElementById('end_btn');
const screens = document.querySelectorAll('.screen');

start_btn.addEventListener('click', () => {
    screens[0].classList.add('up');
});

end_btn.addEventListener('click', () => {
    screens[0].classList.remove('up');
});
