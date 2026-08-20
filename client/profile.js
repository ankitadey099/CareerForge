const form = document.getElementById("profileForm");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const profile = {
        name: document.getElementById("name").value,
        degree: document.getElementById("degree").value,
        branch: document.getElementById("branch").value,
        skills: document.getElementById("skills").value,
        interests: document.getElementById("interests").value,
        experience: document.getElementById("experience").value
    };

    localStorage.setItem("careerProfile", JSON.stringify(profile));

    alert("Profile saved successfully! 🎉");

    window.location.href = "dashboard.html";
});
