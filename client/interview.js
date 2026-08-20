
const questions = {
    software: [
        "Tell me about yourself.",
        "Why do you want to become a software developer?",
        "What programming languages do you know?",
        "What is object-oriented programming?",
        "Explain the four pillars of OOP.",
        "What is the difference between a stack and a queue?",
        "What is the difference between an array and a linked list?",
        "What is a hash table and how does it work?",
        "What is time complexity?",
        "Explain Big O notation.",
        "What is recursion?",
        "What is the difference between BFS and DFS?",
        "What is a binary search tree?",
        "What is dynamic programming?",
        "What is the difference between process and thread?",
        "What is an operating system?",
        "What is a deadlock?",
        "What is a database?",
        "What is the difference between SQL and NoSQL?",
        "What is an API?",
        "What is REST API?",
        "What is Git and why is it used?",
        "Tell me about one of your projects.",
        "What was the biggest challenge you faced in a project?",
        "Why should we hire you?"
    ],

    data: [
        "Tell me about yourself.",
        "Why are you interested in data analytics?",
        "What is data analysis?",
        "What is SQL?",
        "What is the difference between WHERE and HAVING?",
        "What is the difference between GROUP BY and ORDER BY?",
        "What are primary keys and foreign keys?",
        "What is a JOIN in SQL?",
        "Explain INNER JOIN and LEFT JOIN.",
        "What is normalization?",
        "What is a database?",
        "What is data cleaning?",
        "How do you handle missing values?",
        "What are outliers?",
        "What is correlation?",
        "What is the difference between correlation and causation?",
        "What is data visualization?",
        "Which visualization would you use to compare categories?",
        "What is a KPI?",
        "What is the difference between mean, median, and mode?",
        "What is Python used for in data analysis?",
        "What is Pandas?",
        "What is NumPy?",
        "Tell me about a data-related project you have worked on.",
        "Why should we hire you?"
    ],

    ai: [
        "Tell me about yourself.",
        "Why are you interested in Artificial Intelligence?",
        "What is Artificial Intelligence?",
        "What is Machine Learning?",
        "What is Deep Learning?",
        "What is the difference between AI, ML, and Deep Learning?",
        "What is supervised learning?",
        "What is unsupervised learning?",
        "What is reinforcement learning?",
        "What is classification?",
        "What is regression?",
        "What is clustering?",
        "What is a training dataset?",
        "What is a testing dataset?",
        "What is overfitting?",
        "How can you prevent overfitting?",
        "What is underfitting?",
        "What is cross-validation?",
        "What is feature engineering?",
        "What is a confusion matrix?",
        "What are precision and recall?",
        "What is an artificial neural network?",
        "What is a CNN?",
        "What is NLP?",
        "What are Large Language Models?",
        "What is Generative AI?",
        "What is an API?",
        "Which Python libraries have you used for AI/ML?",
        "Tell me about an AI/ML project you have worked on.",
        "Why should we hire you?"
    ],

    ece: [
        "Tell me about yourself.",
        "Why did you choose Electronics and Communication Engineering?",
        "What is a semiconductor?",
        "What is a PN junction diode?",
        "Explain forward and reverse bias.",
        "What is a Zener diode?",
        "What is the difference between Zener and avalanche breakdown?",
        "What is a transistor?",
        "Explain BJT and MOSFET.",
        "What is an amplifier?",
        "What is an oscillator?",
        "What is an operational amplifier?",
        "What is modulation?",
        "Why is modulation required?",
        "What is AM?",
        "What is FM?",
        "What is the difference between AM and FM?",
        "What is DSB-SC?",
        "What is SSB?",
        "What is sampling?",
        "State the Nyquist sampling theorem.",
        "What is a microprocessor?",
        "What is a microcontroller?",
        "What is the difference between a microprocessor and microcontroller?",
        "What is an embedded system?",
        "What is a sensor?",
        "What is IoT?",
        "Tell me about your ECE projects.",
        "Why do you want to move toward software/AI?",
        "Why should we hire you?"
    ]
};

let currentQuestion = 0;
let selectedRole = "";

function startInterview() {

    selectedRole = document.getElementById("role").value;
    currentQuestion = 0;

    showQuestion();
}

function showQuestion() {

    const questionBox = document.getElementById("questionBox");

    const question = questions[selectedRole][currentQuestion];

    questionBox.innerHTML = `
        <h3>Question ${currentQuestion + 1} of ${questions[selectedRole].length}</h3>

        <p>${question}</p>

        <textarea
            id="answer"
            placeholder="Type your answer here..."
        ></textarea>

        <br>

        <button onclick="nextQuestion()">Next Question</button>
    `;
}

function nextQuestion() {

    const answer = document.getElementById("answer").value;

    if (answer.trim() === "") {
        alert("Please enter your answer.");
        return;
    }

    currentQuestion++;

    if (currentQuestion >= questions[selectedRole].length) {

        document.getElementById("questionBox").innerHTML = `
            <h2>Interview Completed 🎉</h2>

            <p>
                You completed all ${questions[selectedRole].length}
                interview questions.
            </p>

            <button onclick="location.href='dashboard.html'">
                Back to Dashboard
            </button>
        `;

        return;
    }

    showQuestion();
}
