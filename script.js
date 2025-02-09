// Frontend (script.js)
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

async function fetchGeminiResponse(message) {
    try {
        const response = await fetch('http://localhost:3030/response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: message })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.generatedText;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, "user-message");
    userInput.value = "";

    try {
        const botReply = await fetchGeminiResponse(message);
        addMessage(botReply, "bot-message");
    } catch (error) {
        console.error("Error fetching response:", error);
        addMessage("Oops! Something went wrong.", "bot-message");
    }
}

function addMessage(text, className) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", className);
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}
