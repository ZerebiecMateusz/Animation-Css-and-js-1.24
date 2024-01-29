const div = document.querySelector('div');
let time = 0;

const timer = () => {
time+=0.1;
setTimeout(timer, 100)
div.textContent = time.toFixed(1);
}

timer();