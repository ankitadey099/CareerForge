function analyzeResume() {

    const file = document.getElementById("resumeFile").files[0];
    const result = document.getElementById("result");

    if (!file) {
        result.innerHTML = "<p>Please upload your resume first.</p>";
        return;
    }

    result.innerHTML = `
        <h3>Resume Analysis</h3>
        <p>Resume uploaded successfully ✅</p>
        <p><strong>File:</strong> ${file.name}</p>
        <p><strong>Initial Score:</strong> 75/100</p>
        <p><strong>Suggestion:</strong> Add more measurable achievements and relevant technical skills.</p>
    `;
}
