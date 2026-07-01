// --- Canvas Background Effect ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

function initCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 1,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
        });
    }
}

function animateCanvas() {
    requestAnimationFrame(animateCanvas);
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = 'rgba(46, 125, 50, 0.3)'; // Primary green accent color with low opacity

    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
    });
}

window.addEventListener('resize', initCanvas);
initCanvas();
animateCanvas();

// --- Navbar Sticky Effect ---
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// --- Hamburger Mobile Menu ---
const hamburger    = document.getElementById('hamburger');
const hamburgerIcon = document.getElementById('hamburger-icon');
const navLinks     = document.querySelector('.nav-links');
const navOverlay   = document.getElementById('nav-overlay');

function openMobileNav() {
    navLinks.classList.add('open');
    navOverlay.classList.add('active');
    hamburger.classList.add('open');
    hamburgerIcon.classList.replace('fa-bars', 'fa-times');
    document.body.style.overflow = 'hidden'; // prevent background scroll
}

function closeMobileNav() {
    navLinks.classList.remove('open');
    navOverlay.classList.remove('active');
    hamburger.classList.remove('open');
    hamburgerIcon.classList.replace('fa-times', 'fa-bars');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) {
        closeMobileNav();
    } else {
        openMobileNav();
    }
});

// Close when a nav link is tapped
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileNav);
});

// Close when backdrop overlay is tapped
navOverlay.addEventListener('click', closeMobileNav);

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileNav();
});

// --- Typewriter Effect ---
const typeWriterElement = document.querySelector('.typewriter');
const textSets = {
    en: ["Software Engineering Student", "QA", "Web Developer", "Machine Learning Enthusiast"],
    ne: ["सफ्टवेयर इन्जिनियरिङ विद्यार्थी", "QA", "वेब विकासकर्ता", "ML उत्साही"]
};
let typeWriterLang = localStorage.getItem('language') || 'en';
let texts = textSets[typeWriterLang];
let textIndex = 0;
let charIndex = 0;

window.addEventListener('languageChanged', (e) => {
    typeWriterLang = e.detail;
    texts = textSets[typeWriterLang];
    textIndex = 0;
    charIndex = 0;
    typeWriterElement.textContent = "";
});
let isDeleting = false;

function typeWriter() {
    const currentText = texts[textIndex];

    if (isDeleting) {
        typeWriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typeWriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500; // Pause before start
    }

    setTimeout(typeWriter, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    typeWriterElement.textContent = "";
    setTimeout(typeWriter, 1000);
});

// --- Chatbot Logic ---
const toggleBtn = document.getElementById('chatbot-toggle');
const closeBtn = document.getElementById('chatbot-close');
const chatWindow = document.getElementById('chatbot-window');
const sendBtn = document.getElementById('chatbot-send');
const chatInput = document.getElementById('chatbot-input');
const messagesContainer = document.getElementById('chatbot-messages');

toggleBtn.addEventListener('click', () => {
    chatWindow.classList.add('open');
});

closeBtn.addEventListener('click', () => {
    chatWindow.classList.remove('open');
});

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
    msgDiv.textContent = text;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getBotResponse(input) {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('skill') || lowerInput.includes('technology') || lowerInput.includes('programm')) {
        return "My technical skills include Programming (Python, JavaScript, C, SQL, Flutter), Machine Learning (Scikit-learn, TensorFlow, CNN, XGBoost, Random Forest), Web Dev (HTML, CSS, JS, Django), and Data Science (EDA, Pandas, NumPy).";
    }
    if (lowerInput.includes('project') || lowerInput.includes('work') || lowerInput.includes('portfolio')) {
        return "I have worked on 'MastishkhNet', a Brain Tumor Detection System using MRI images and CNNs, and an 'Alzheimer’s Detection' prediction system using ML and Streamlit.";
    }
    if (lowerInput.includes('education') || lowerInput.includes('study') || lowerInput.includes('university') || lowerInput.includes('degree')) {
        return "I am currently pursuing a BE in Software Engineering at Pokhara University (2022 - Present). Previously, I completed my NEB 10+2 at Kumudini Homes Secondary School (2019-2021).";
    }
    if (lowerInput.includes('certificat') || lowerInput.includes('course')) {
        return "I hold certifications in Cloud and DevOps Technology (Pokhara University), Data Science (5 min Engineering), Python & Web Design (freeCodeCamp), AI & Deep Learning (Coursera), and Git & GitHub (Udemy).";
    }
    if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('phone') || lowerInput.includes('number')) {
        return "You can reach me at +977 9815879153 or email me at singhrajiv18110922@gmail.com. You can also find my LinkedIn and GitHub in the contact section!";
    }
    if (lowerInput.includes('name') || lowerInput.includes('who are you')) {
        return "I am Rajeeb Kumar Singh, a Software Engineering student, QA, Web Developer, and Machine Learning enthusiast.";
    }
    if (lowerInput.includes('hello') || lowerInput.includes('hi ') || lowerInput === 'hi' || lowerInput.includes('hey')) {
        return "Hello! How can I help you learn more about my CV today?";
    }

    // Fallback exactly as requested
    return "sorry i dont have that info";
}

function handleSend() {
    const text = chatInput.value.trim();
    if (text === '') return;

    addMessage(text, 'user');
    chatInput.value = '';

    // Simulate thinking delay
    setTimeout(() => {
        const response = getBotResponse(text);
        addMessage(response, 'bot');
    }, 500);
}

sendBtn.addEventListener('click', handleSend);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
});

// --- Music Player ---
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const musicLabel = document.getElementById('music-label');
let isPlaying = false;

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
        musicLabel.textContent = 'Lofi Vibes 🎵';
        isPlaying = false;
    } else {
        bgMusic.play().then(() => {
            musicToggle.classList.add('playing');
            musicLabel.textContent = 'Now Playing ♪';
            isPlaying = true;
        }).catch(() => {
            musicLabel.textContent = 'Click to Play 🎵';
        });
    }
});
