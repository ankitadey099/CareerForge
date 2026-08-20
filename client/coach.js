const input = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");

async function sendMessage() {
    const message = input.value.trim();

    if (!message) {
        return;
    }

    // Show user's message
    chatBox.innerHTML += `
        <div class="user-message">
            <strong>You:</strong>
            <p>${message}</p>
        </div>
    `;

    // Clear input
    input.value = "";

    // Show loading message
    const loadingMessage = document.createElement("div");
    loadingMessage.className = "ai-message";
    loadingMessage.innerHTML = `
        <strong>CareerForge:</strong>
        <p>Thinking... 🤔</p>
    `;

    chatBox.appendChild(loadingMessage);

    try {
        const response = await fetch("http://localhost:5000/coach", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        // Remove loading message
        loadingMessage.remove();

        // Show AI response
        chatBox.innerHTML += `
            <div class="ai-message">
                <strong>CareerForge:</strong>
                <p>${data.answer || data.message}</p>
            </div>
        `;

    } catch (error) {

        loadingMessage.remove();

        chatBox.innerHTML += `
            <div class="ai-message">
                <strong>CareerForge:</strong>
                <p>
                    Sorry, I couldn't connect to the CareerForge server.
                    Please make sure the server is running.
                </p>
            </div>
        `;

        console.error("Error:", error);
    }

    // Scroll to latest message
    chatBox.scrollTop = chatBox.scrollHeight;
}


// Allow pressing Enter to send
input.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }

});
