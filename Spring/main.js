const ball = document.querySelector('.ball');
const btn = document.querySelector('.btn-action');
const spring = document.querySelector('.spring');
const fill = document.querySelector('.fill');


const stretchSpring = () => {
console.log('naciągamy');
fill.style.animationPlayState = "running";
spring.style.animationPlayState = "running";
btn.textContent = "Puść sprężynę";
}

const releaseSpring = () => {
    console.log('puszczamy');
    const fillStyled = getComputedStyle(fill);
    const fillWidth = parseInt(fillStyled.width, 10);
    const barWidth = parseInt(getComputedStyle(document.querySelector('.bar')).width, 10);
    const processPercent = (fillWidth / barWidth).toFixed(2);
    btn.style.color = "black";
    btn.textContent = `Moc uderzenia to ${parseInt(processPercent * 100, 10)}%`;
    document.documentElement.style.setProperty("--power-x", `${30 + processPercent * 50}%`);
    ball.style.animation = "fly-ball-x 1s 1 forwards 0.15s cubic-bezier(0.075, 0.82, 0.165, 1), fly-ball-y 1s 0.15s 1 forwards";
    console.log(ball.style.animation);
    fill.style.animationPlayState = "paused";
    spring.style.animationPlayState = "pause";

    document.documentElement.style.setProperty('--spring-left', getComputedStyle(spring).left);
    spring.style.animation = 'release-spring .2s 1 forwards linear'

    //zablokowanie kliknięcia
    btn.removeEventListener('mousedown', stretchSpring);
    btn.removeEventListener('touchstart', stretchSpring);

    ball.addEventListener('animationend', resetAnimation);
}

const resetAnimation = () => {
    console.log('reset animacji');
    ball.addEventListener('animationend', resetAnimation);
    //reset 
    setTimeout(() => {
        btn.addEventListener('mousedown', stretchSpring);
        btn.addEventListener('mouseup', releaseSpring);
        btn.addEventListener('touchstart', stretchSpring);
        btn.addEventListener('touchend', releaseSpring);

        btn.style.color = 'white';
        btn.textContent = "Naciągnij sprężynę";
        spring.style.animation = "";
        ball.style.animation = "";
        fill.style.animationName = "none";
    }, 2000);
}

btn.addEventListener('mousedown', stretchSpring);
btn.addEventListener('mouseup', releaseSpring);
btn.addEventListener('touchstart', stretchSpring);
btn.addEventListener('touchend', releaseSpring);




