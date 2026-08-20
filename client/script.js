async function startCareerForge() {
    try {
        const response = await fetch("http://localhost:5000/");
        const data = await response.json();

        alert(data.message);
    } catch (error) {
        alert("Server is not running.");
        console.error(error);
    }
}
