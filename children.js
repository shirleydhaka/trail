// --- CRAZY FEATURE 1: Particle Background ---
const hero = document.getElementById('hero');
if (hero) {
    const particleCount = 100;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 8 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * hero.offsetHeight;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.backgroundColor = `rgba(255, 255, 255, ${Math.random() * 0.6 + 0.2})`;
        particle.style.opacity = 0;
        particle.speedX = (Math.random() - 0.5) * 0.5;
        particle.speedY = (Math.random() - 0.5) * 0.5;
        hero.appendChild(particle);
        particles.push(particle);

        // Initial fade-in
        setTimeout(() => {
            particle.style.opacity = 1;
        }, i * 20);
    }

    function updateParticles() {
        particles.forEach(particle => {
            particle.style.left = `${parseFloat(particle.style.left) + particle.speedX}px`;
            particle.style.top = `${parseFloat(particle.style.top) + particle.speedY}px`;

            if (parseFloat(particle.style.left) < 0 || parseFloat(particle.style.left) > window.innerWidth) {
                particle.speedX *= -1;
            }
            if (parseFloat(particle.style.top) < 0 || parseFloat(particle.style.top) > hero.offsetHeight) {
                particle.speedY *= -1;
            }
        });
        requestAnimationFrame(updateParticles);
    }

    updateParticles();
}

// --- CRAZY FEATURE 2: Interactive Pledge Button ---
const pledgeButton = document.querySelector('#safety-pledge .button.secondary');
if (pledgeButton) {
    pledgeButton.addEventListener('mouseover', () => {
        pledgeButton.style.transform = 'scale(1.1)';
        pledgeButton.style.boxShadow = '0 10px 30px rgba(40, 167, 69, 0.5)';
    });

    pledgeButton.addEventListener('mouseout', () => {
        pledgeButton.style.transform = 'scale(1)';
        pledgeButton.style.boxShadow = '0 5px 15px rgba(40, 167, 69, 0.3)';
    });

    pledgeButton.addEventListener('click', () => {
        alert('Thank you for taking the safety pledge! You are now a guardian of safety.');
        // You could add more interactive feedback here, like changing button text or showing a confirmation message.
        pledgeButton.textContent = 'Pledge Taken!';
        pledgeButton.classList.add('pledge-taken'); // Add a class for visual change
        pledgeButton.disabled = true;
    });
}

// --- CRAZY FEATURE 3: Dynamic Story Display with "Reveal" ---
const storyCards = document.querySelectorAll('#real-stories .story-card');
storyCards.forEach(card => {
    const fullText = card.querySelector('p:first-child').textContent;
    const shortText = fullText.substring(0, 100) + '... ';
    const readMoreButton = document.createElement('button');
    readMoreButton.textContent = 'Read More';
    readMoreButton.classList.add('read-more-button');
    let isExpanded = false;

    if (fullText.length > 100) {
        card.querySelector('p:first-child').textContent = shortText;
        card.appendChild(readMoreButton);

        readMoreButton.addEventListener('click', () => {
            card.querySelector('p:first-child').textContent = fullText;
            readMoreButton.remove();
            isExpanded = true;
        });
    }
});

// --- CRAZY FEATURE 4: Interactive Quiz (Basic Example) ---
const quizButton = document.querySelector('#safety-pledge .card:first-child .button.small');
if (quizButton) {
    quizButton.addEventListener('click', () => {
        const answer = prompt('Quick Quiz: What should you do if a stranger offers you candy? (A) Take it, (B) Politely refuse and tell a trusted adult, (C) Run away quietly.');
        if (answer && answer.toLowerCase() === 'b') {
            alert('Correct! Telling a trusted adult is the safest option.');
        } else if (answer) {
            alert(`Not quite! The best answer is (B) Politely refuse and tell a trusted adult.`);
        } else {
            alert('Please provide an answer!');
        }
    });
}

// --- CRAZY FEATURE 5: Animated Icons on Hover ---
const featureCards = document.querySelectorAll('.children-features .feature-card');
featureCards.forEach(card => {
    const icon = card.querySelector('.icon i');
    if (icon) {
        card.addEventListener('mouseover', () => {
            icon.style.transform = 'rotate(30deg) scale(1.2)';
            icon.style.transition = 'transform 0.3s ease-in-out';
        });
        card.addEventListener('mouseout', () => {
            icon.style.transform = 'rotate(0deg) scale(1)';
            icon.style.transition = 'transform 0.3s ease-out';
        });
    }
});

// --- CRAZY FEATURE 6: Subtle Background Animation on Hero ---
if (hero) {
    let hue = 0;
    function animateHeroBackground() {
        hue = (hue + 0.1) % 360;
        hero.style.background = `linear-gradient(135deg, hsl(${hue}, 70%, 60%) 0%, hsl(${(hue + 60) % 360}, 70%, 60%) 100%)`;
        requestAnimationFrame(animateHeroBackground);
    }
    animateHeroBackground();
}

// --- CRAZY FEATURE 7: Report Issue Chatbot (Simplified Placeholder) ---
const reportButton = document.querySelector('#reporting-helpline .button');
if (reportButton) {
    reportButton.addEventListener('click', () => {
        alert('Initiating secure chatbot... (This is a placeholder. A real chatbot would require more complex implementation)');
        // In a real scenario, you would trigger a chatbot UI here.
    });
}

// --- CRAZY FEATURE 8: Pledge Counter (Placeholder) ---
const pledgeSection = document.getElementById('safety-pledge');
if (pledgeSection) {
    const counterElement = document.createElement('p');
    counterElement.textContent = 'Current Pledges: Loading...';
    pledgeSection.querySelector('.pledge-quiz-container').appendChild(counterElement);

    // Simulate fetching pledge count
    setTimeout(() => {
        const pledgeCount = Math.floor(Math.random() * 500 + 100); // Random number between 100 and 600
        counterElement.textContent = `Current Pledges: ${pledgeCount}`;
    }, 2000);
}

// --- Add more crazy features as you like! ---