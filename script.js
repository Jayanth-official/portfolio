// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 3D Background with Three.js
function init3DBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 5;
    
    // Create 3D particles
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];
    
    for (let i = 0; i < 5000; i++) {
        vertices.push(
            Math.random() * 2000 - 1000,
            Math.random() * 2000 - 1000,
            Math.random() * 2000 - 1000
        );
        
        colors.push(0.22, 0.74, 0.97); // Primary color
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 2,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    
    const points = new THREE.Points(geometry, material);
    scene.add(points);
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        points.rotation.x += 0.0005;
        points.rotation.y += 0.0005;
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Initialize 3D background
if (typeof THREE !== 'undefined') {
    init3DBackground();
}

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// GSAP Scroll Animations
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate sections on scroll
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 100,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // Animate skill cards
    gsap.utils.toArray('.skill-card').forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            scale: 0.5,
            rotation: 180,
            duration: 0.8,
            delay: index * 0.1,
            scrollTrigger: {
                trigger: card,
                start: 'top 90%'
            }
        });
    });
    
    // Animate project cards
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            x: index % 2 === 0 ? -100 : 100,
            duration: 1,
            scrollTrigger: {
                trigger: card,
                start: 'top 85%'
            }
        });
    });
}

// 3D Card Tilt Effect
document.querySelectorAll('.glass').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
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
document.addEventListener('DOMContentLoaded', function() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatNotification = document.getElementById('chatNotification');

    // Check if elements exist
    if (!chatbotToggle || !chatbotWindow) {
        console.error('Chatbot elements not found');
        return;
    }

    // Chatbot responses with Python emphasis
    const chatbotResponses = {
        'experience': "Jayanth has diverse work experience:\n• 2024: Mobile Servicing and Laptops Technician at CFix\n• 2023: Java with Android Intern & Web Developer Intern at Pantech e-Learning Pvt Ltd\n\nHe's currently pursuing his M.Sc in Information Technology and has worked on projects like SmartATS and E-book Management systems.",
        'skills': "Jayanth is skilled in:\n🌐 HTML5 - Semantic markup, modern web standards\n🎨 CSS3 - Responsive design, animations, flexbox/grid\n🐍 Python - Backend development, Django, Data processing\n💻 JavaScript - React.js, Node.js, Full-stack development\n🗄️ Databases - PostgreSQL, MongoDB\n⚛️ Frontend - React.js, Next.js\n🔧 Tools - Git, Version Control\n📱 Mobile - Android development\n🛠️ Hardware - Mobile and laptop servicing",
        'python': "Yes! Jayanth is proficient in Python. He uses it for:\n• Backend development with Django\n• Data processing and automation\n• Building scalable applications\n• Database management with PostgreSQL\nPython is one of his core skills!",
        'projects': "Jayanth has worked on several projects including:\n• SmartATS - An AI-powered resume builder and optimizer (React.js, Node.js, AI/ML)\n• E-book Management - A comprehensive digital library system (Python, Django, PostgreSQL)\nBoth projects showcase his full-stack development skills.",
        'contact': "You can reach Jayanth at:\n📧 Email: jayanth19990728@gmail.com\n📱 Phone: +91 7200176530\n📍 Location: Chennai, Tamil Nadu\n\nFeel free to connect with him for opportunities!",
        'social': "Connect with Jayanth on social media:\n🔗 GitHub: github.com/Jayanth-official\n💼 LinkedIn: linkedin.com/in/jayanth-s-j-a41b66382\n\nYou can also find these links in the footer!",
        'hello': "Hello! Nice to meet you! I'm here to help you learn more about Jayanth S.J. What would you like to know?",
        'hi': "Hi there! 👋 I'm Jayanth's virtual assistant. How can I help you today?",
        'about': "Jayanth S.J is a passionate Full Stack Developer based in Chennai. He's currently pursuing M.Sc in Information Technology and has experience in software development, web development, and hardware servicing.",
        'education': "Jayanth is currently pursuing M.Sc in Information Technology at Vels Institute of Science, Technology & Advanced Studies (2026 - Present). He completed his BCA from Avichi College of Arts and Science (2020 - 2023).",
        'default': "I'm here to help you learn about Jayanth! You can ask me about his experience, skills, Python expertise, projects, contact information, social media, or education. What would you like to know?"
    };

    // Toggle chatbot
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.toggle('active');
        if (chatNotification) {
            chatNotification.style.display = 'none';
        }
    });

    // Close chatbot
    if (chatbotClose) {
        chatbotClose.addEventListener('click', () => {
            chatbotWindow.classList.remove('active');
        });
    }

    // Send message
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            chatbotInput.value = '';
            
            // Show typing indicator
            showTypingIndicator();
            
            // Simulate typing delay
            setTimeout(() => {
                removeTypingIndicator();
                const response = getBotResponse(message);
                addMessage(response, 'bot');
            }, 1000);
        }
    }

    // Show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p>Typing...</p>
            </div>
        `;
        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Remove typing indicator
    function removeTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
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
        messageText.style.whiteSpace = 'pre-line';
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
        
        if (lowerMessage.includes('python') || lowerMessage.includes('django')) {
            return chatbotResponses.python;
        } else if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('job') || lowerMessage.includes('intern')) {
            return chatbotResponses.experience;
        } else if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech') || lowerMessage.includes('language')) {
            return chatbotResponses.skills;
        } else if (lowerMessage.includes('project') || lowerMessage.includes('portfolio')) {
            return chatbotResponses.projects;
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone') || lowerMessage.includes('reach')) {
            return chatbotResponses.contact;
        } else if (lowerMessage.includes('social') || lowerMessage.includes('github') || lowerMessage.includes('linkedin')) {
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
    if (chatbotSend) {
        chatbotSend.addEventListener('click', sendMessage);
    }
    
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Quick reply buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('quick-reply')) {
            const message = e.target.getAttribute('data-message');
            addMessage(message, 'user');
            
            showTypingIndicator();
            
            setTimeout(() => {
                removeTypingIndicator();
                const response = getBotResponse(message);
                addMessage(response, 'bot');
            }, 1000);
            
            // Hide quick replies after use
            e.target.parentElement.style.display = 'none';
        }
    });
});
