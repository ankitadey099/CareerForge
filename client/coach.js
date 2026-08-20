function sendMessage() {

    const input = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");

    const message = input.value.trim();

    if (message === "") {
        return;
    }

    chatBox.innerHTML += `
        <div class="user-message">
            <strong>You:</strong>
            <p>${message}</p>
        </div>
    `;

    let response = getCareerResponse(message);

    chatBox.innerHTML += `
        <div class="ai-message">
            <strong>CareerForge:</strong>
            <p>${response}</p>
        </div>
    `;

    input.value = "";

    chatBox.scrollTop = chatBox.scrollHeight;
}


function getCareerResponse(message) {

    const question = message.toLowerCase();

    if (question.includes("resume")) {
        return "Focus on measurable achievements, relevant technical skills, projects, and a clean one-page format.";
    }

    if (question.includes("interview")) {
        return "Practice explaining your projects clearly, revise CS fundamentals, and practice common behavioral questions.";
    }

    if (question.includes("java")) {
        return "Start with Java fundamentals, OOP, collections, exception handling, multithreading, and then move to Spring Boot.";
    }

    if (question.includes("dsa")) {
        return "Focus on arrays, strings, hashing, linked lists, stacks, queues, trees, graphs, recursion, greedy algorithms, and dynamic programming.";
    }

    if (question.includes("ai") || question.includes("machine learning")) {
        return "Build strong Python fundamentals first, then learn NumPy, Pandas, machine learning algorithms, model evaluation, and eventually deep learning.";
    }

    if (question.includes("career")) {
        return "Choose a career path based on your interests and strengths, then build projects and practice the skills required for your target role.";
    }

    return "That's a great question! CareerForge will provide a personalized AI-powered answer once the AI engine is connected.";
}
