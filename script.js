let userInput = document.getElementById('date');
// userInput.max = new Date().toISOString().split("T")[0];
let result = document.getElementById("result")

let typingSound = new Audio('sound.mp3');

function calculateAge() {
    let birthDate = new Date(userInput.value);

    let d1 = birthDate.getDate();
    let m1 = birthDate.getMonth() + 1 ;
    let y1 = birthDate.getFullYear();

    let today = new Date();
    let d2 = today.getDate();
    let m2 = today.getMonth() + 1;
    let y2 = today.getFullYear();

    let d3, m3, y3;

    y3 = y2 - y1;

    if (m2 >= m1) {
        m3 = m2 - m1;

    } else {
        y3--;
        m3 = 12 + m2 - m1;
    }

    if (d2 >= d1) {
        d3 = d2 - d1;
    } else {
        m3--;
        d3 = getDaysInMonth(y1, m1) + d2 - d1;
    }

    if (m3 < 0) {
        m3 = 11;
        y3--;
    }

    // Clear previous result
    result.innerHTML = "";

    // Define a function to simulate typing animation
    function typeWriter(text, i) {
        if (i < text.length) {
            // Play typing sound

            var Duration = 3;

            var playBackRate =  typingSound.duration / Duration ;

            typingSound.playbackRate = playBackRate

            typingSound.play();
            result.innerHTML += text.charAt(i);
            i++;
            setTimeout(function () {
                typeWriter(text, i);
            }, 50); // Adjust typing speed here (milliseconds)
        }
    }   

    // Start the typing animation for the result
    typeWriter(`You are ${y3} years, ${m3} months, ${d3} days`, 0);
}

function getDaysInMonth(year,month){
    return new Date(year,month, 0).getDate();
}

const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }
    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}


const particlesArray = [];
const numberOfParticles = 100;

function init() {
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        if (particlesArray[i].size <= 0.3) {
            particlesArray.splice(i, 1);
            particlesArray.push(new Particle());
            i--;
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
}

init();
animate();