const form = document.getElementById("loginForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    message.textContent = "Logging in...";

    try {

        const response = await fetch(
            "http://localhost:5000/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            // Save logged-in user
            localStorage.setItem(
                "careerforgeUser",
                JSON.stringify(data.user)
            );

            message.textContent = "Login successful!";

            // dashboard.html is outside the client folder
            setTimeout(() => {
                window.location.href = "../dashboard.html";
            }, 500);

        } else {

            message.textContent = data.message;

        }

    } catch (error) {

        console.error(error);

        message.textContent =
            "Unable to connect to CareerForge server.";

    }

});
