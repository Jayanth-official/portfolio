// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const menuOverlay = document.getElementById('menuOverlay');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking on overlay
menuOverlay.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close mobile menu when clicking on a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Reveal animations on scroll
const reveals = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const revealTop = reveals[i].getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active');
        }
    }
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission (placeholder)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    const submitBtn = contactForm.querySelector('button');
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = '#22c55e';
            contactForm.reset();
        }, 2000);
    });
}

// Chatbot functionality
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatNotification = document.getElementById('chatNotification');

// Chatbot responses
const chatbotResponses = {
    'experience': "Jayanth has experience as a Java with Android Intern at Pantech e-Learning Pvt Ltd in 2023. He's currently pursuing his M.Sc in Information Technology and has worked on projects like SmartATS and E-book Management systems.",
    'skills': "Jayanth is skilled in JavaScript, Python, React.js, Node.js, PostgreSQL, Git, MongoDB, and Next.js. He's a Full Stack Developer with expertise in both frontend and backend technologies.",
    'projects': "Jayanth has worked on several projects including:\n• SmartATS - An AI-powered resume builder and optimizer\n• E-book Management - A comprehensive digital library system\nBoth projects showcase his full-stack development skills.",
    'contact': "You can reach Jayanth at:\n📧 Email: jayanthsj99@gmail.com\n📱 Phone: +91 7200176530\n📍 Location: Chennai, Tamil Nadu\n\nFeel free to connect with him for opportunities!",
    'social': "Connect with Jayanth on social media:\n🔗 GitHub: github.com/Jayanth-official\n💼 LinkedIn: linkedin.com/in/jayanth-sj\n🐦 Twitter: twitter.com/jayanth_sj\n📸 Instagram: instagram.com/jayanth_sj\n\nYou can also find these links in the footer!",
    'hello': "Hello! Nice to meet you! I'm here to help you learn more about Jayanth S.J. What would you like to know?",
    'hi': "Hi there! 👋 I'm Jayanth's virtual assistant. How can I help you today?",
    'about': "Jayanth S.J is a passionate Full Stack Developer based in Chennai. He's currently pursuing M.Sc in Information Technology and has a strong foundation in both frontend and backend development.",
    'education': "Jayanth is currently pursuing M.Sc in Information Technology at Vels Institute of Science, Technology & Advanced Studies (2026 - Present). He completed his BCA from Avichi College of Arts and Science (2020 - 2023).",
    'default': "I'm here to help you learn about Jayanth! You can ask me about his experience, skills, projects, contact information, social media, or education. What would you like to know?"
};

// Toggle chatbot
chatbotToggle.addEventListener('click', () => {
    chatbotWindow.classList.toggle('active');
    chatNotification.style.display = 'none';
});

// Close chatbot
chatbotClose.addEventListener('click', () => {
    chatbotWindow.classList.remove('active');
});

// Send message
function sendMessage() {
    const message = chatbotInput.value.trim();
    if (message) {
        addMessage(message, 'user');
        chatbotInput.value = '';
        
        // Simulate typing delay
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response, 'bot');
        }, 1000);
    }
}

// Add message to chat
function addMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    const messageText = document.createElement('p');
    messageText.textContent = message;
    content.appendChild(messageText);
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Get bot response
function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('job')) {
        return chatbotResponses.experience;
    } else if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech')) {
        return chatbotResponses.skills;
    } else if (lowerMessage.includes('project') || lowerMessage.includes('portfolio') || lowerMessage.includes('work')) {
        return chatbotResponses.projects;
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone') || lowerMessage.includes('reach')) {
        return chatbotResponses.contact;
    } else if (lowerMessage.includes('social') || lowerMessage.includes('github') || lowerMessage.includes('linkedin') || lowerMessage.includes('twitter') || lowerMessage.includes('instagram')) {
        return chatbotResponses.social;
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
        return chatbotResponses.hello;
    } else if (lowerMessage.includes('hi') || lowerMessage.includes('hii')) {
        return chatbotResponses.hi;
    } else if (lowerMessage.includes('about') || lowerMessage.includes('who')) {
        return chatbotResponses.about;
    } else if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('degree')) {
        return chatbotResponses.education;
    } else {
        return chatbotResponses.default;
    }
}

// Event listeners
chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Quick reply buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('quick-reply')) {
        const message = e.target.getAttribute('data-message');
        addMessage(message, 'user');
        
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response, 'bot');
        }, 1000);
        
        // Hide quick replies after use
        e.target.parentElement.style.display = 'none';
    }
});
