// Main application functionality
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const sosBtn = document.getElementById('activateSOS');
    const sosStatus = document.getElementById('sosStatus');
    const locationDisplay = document.getElementById('locationDisplay');
    const audioIndicator = document.getElementById('audioIndicator');
    const userInput = document.getElementById('userInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');
    
    // SOS Functionality
    let isSOSActive = false;
    let audioStream = null;
    
    sosBtn.addEventListener('click', toggleSOS);
    
    async function toggleSOS() {
        if (!isSOSActive) {
            // Activate SOS
            isSOSActive = true;
            sosBtn.textContent = 'SOS ACTIVE';
            sosBtn.classList.add('activated');
            sosStatus.textContent = 'Status: Emergency Alert Sent';
            
            // Get location
            try {
                const position = await getLocation();
                locationDisplay.textContent = `Location: ${position.coords.latitude}, ${position.coords.longitude}`;
                
                // Start audio recording
                audioStream = await startAudioRecording();
                audioIndicator.textContent = 'Audio: Recording';
                
                // In a real app, here you would send this data to emergency contacts
                console.log('SOS Activated with location and audio');
                
            } catch (error) {
                console.error('Error during SOS activation:', error);
                locationDisplay.textContent = 'Location: Error getting location';
            }
            
        } else {
            // Deactivate SOS
            isSOSActive = false;
            sosBtn.textContent = 'ACTIVATE SOS';
            sosBtn.classList.remove('activated');
            sosStatus.textContent = 'Status: Ready';
            locationDisplay.textContent = 'Location: Not available';
            
            // Stop audio recording
            if (audioStream) {
                stopAudioRecording(audioStream);
                audioStream = null;
            }
            audioIndicator.textContent = 'Audio: Off';
        }
    }
    
    function getLocation() {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            } else {
                reject(new Error('Geolocation is not supported by this browser.'));
            }
        });
    }
    
    async function startAudioRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            return stream;
        } catch (error) {
            console.error('Error accessing microphone:', error);
            throw error;
        }
    }
    
    function stopAudioRecording(stream) {
        stream.getTracks().forEach(track => track.stop());
    }
    
    // AI Chat Functionality
    sendMessage.addEventListener('click', sendChatMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });
    
    function sendChatMessage() {
        const message = userInput.value.trim();
        if (message === '') return;
        
        // Add user message to chat
        addMessageToChat(message, 'user');
        userInput.value = '';
        
        // Simulate AI response (in a real app, this would call an API)
        setTimeout(() => {
            const responses = [
                "I'm here to help. Can you tell me more about your situation?",
                "Your safety is important. Have you contacted anyone about this?",
                "Would you like me to connect you with local authorities?",
                "Remember, you can press the SOS button at any time for immediate help.",
                "I've logged this conversation securely on the blockchain for your records."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessageToChat(randomResponse, 'bot');
            
            // In a real app, you would also log this to blockchain
            console.log('Chat message logged to blockchain');
        }, 1000);
    }
    
    function addMessageToChat(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Initialize blockchain connection
    initializeBlockchain();
});

// Sample blockchain functions (implemented in blockchain.js)
function initializeBlockchain() {
    console.log('Initializing blockchain connection...');
    // Actual implementation would connect to Web3 and smart contracts
}

const canvas = document.getElementById("incidentMap");
const ctx = canvas.getContext("2d");

// Generate random red dot positions (simulate incident reports)
const incidents = Array.from({ length: 25 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: 5 + Math.random() * 3,
    pulse: 0,
}));

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    incidents.forEach(dot => {
        dot.pulse = (dot.pulse + 0.05) % (2 * Math.PI);
        const opacity = 0.5 + 0.5 * Math.sin(dot.pulse);
        const radius = dot.radius + 2 * Math.sin(dot.pulse);

        // Outer glow
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius + 3, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 0, 0, ${opacity * 0.4})`;
        ctx.fill();

        // Inner dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 0, 0, ${opacity})`;
        ctx.fill();
    });

    requestAnimationFrame(draw);
}
draw();

const publishStoryBtn = document.getElementById("publishStoryBtn");
const storyFormContainer = document.getElementById("storyFormContainer");
const storyForm = document.getElementById("storyForm");

publishStoryBtn.addEventListener("click", () => {
    storyFormContainer.style.display = storyFormContainer.style.display === "block" ? "none" : "block";
});

storyForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const storyText = document.getElementById("storyText").value.trim();
    const storyAuthor = document.getElementById("storyAuthor").value.trim() || "Anonymous";

    if (storyText.length === 0) return;

    const newStoryCard = document.createElement("div");
    newStoryCard.classList.add("real-story-card");
    newStoryCard.innerHTML = `
        <p class="story-text">“${storyText}”</p>
        <p class="story-author">— ${storyAuthor}</p>
    `;

    document.querySelector(".real-stories-container").prepend(newStoryCard);

    storyForm.reset();
    storyFormContainer.style.display = "none";
});

const logIncidentBtn = document.getElementById("logIncident");
const incidentModal = document.getElementById("incidentModal");
const closeModal = document.getElementById("closeModal");
const incidentForm = document.getElementById("incidentForm");
const successMsg = document.getElementById("successMsg");
const locationInput = document.getElementById("incidentLocation");

// Show modal on button click
logIncidentBtn.addEventListener("click", () => {
    incidentModal.style.display = "flex";

    // Auto-detect location using Geolocation API
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            locationInput.value = `Lat: ${latitude.toFixed(4)}, Long: ${longitude.toFixed(4)}`;
        }, () => {
            locationInput.value = "Location permission denied";
        });
    } else {
        locationInput.value = "Geolocation not supported";
    }
});

// Close modal
closeModal.addEventListener("click", () => {
    incidentModal.style.display = "none";
    successMsg.style.display = "none";
    incidentForm.reset();
});

// Form submission
incidentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Optional: Save to blockchain or database here

    successMsg.style.display = "block";

    setTimeout(() => {
        incidentModal.style.display = "none";
        successMsg.style.display = "none";
        incidentForm.reset();
    }, 3000);
});
incidentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const desc = document.getElementById("incidentDesc").value;
    const location = document.getElementById("incidentLocation").value;

    const report = {
        description: desc,
        location: location,
        time: new Date().toLocaleString()
    };

    // Save to localStorage
    const existingReports = JSON.parse(localStorage.getItem("incidents")) || [];
    existingReports.push(report);
    localStorage.setItem("incidents", JSON.stringify(existingReports));

    // Show success message
    successMsg.style.display = "block";

    setTimeout(() => {
        incidentModal.style.display = "none";
        successMsg.style.display = "none";
        incidentForm.reset();
    }, 3000);
});
const viewLogsBtn = document.getElementById("viewLogs");
const incidentList = document.getElementById("incidentList");

viewLogsBtn.addEventListener("click", () => {
    const reports = JSON.parse(localStorage.getItem("incidents")) || [];

    if (reports.length === 0) {
        incidentList.innerHTML = "<p>No reports found.</p>";
        return;
    }

    incidentList.innerHTML = reports.map((report, index) => `
        <div class="incident-card">
            <h4>Incident #${index + 1}</h4>
            <p><strong>Description:</strong> ${report.description}</p>
            <p><strong>Location:</strong> ${report.location}</p>
            <p><strong>Time:</strong> ${report.time}</p>
        </div>
    `).join('');
});