const form = document.getElementById("registerForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    // Check passwords

    if (password !== confirmPassword) {

        message.textContent =
            "Passwords do not match.";

        return;
    }


    if (password.length < 6) {

        message.textContent =
            "Password must be at least 6 characters.";

        return;
    }


    message.textContent =
        "Creating your account...";


    try {

        const response = await fetch(
            "http://localhost:5000/register",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            }
        );


        const data = await response.json();


        if (response.ok) {

            message.textContent =
                "Registration successful!";

            setTimeout(() => {

                window.location.href =
                    "login.html";

            }, 1000);

        } else {

            message.textContent =
                data.message;

        }


    } catch (error) {

        console.error(error);

        message.textContent =
            "Unable to connect to CareerForge server.";

    }

});
