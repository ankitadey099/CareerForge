requireLogin();
renderNavbar('resume');

document.getElementById('analyze-btn').addEventListener('click', async () => {
  const fileInput = document.getElementById('resume-file');
  const errorBox = document.getElementById('analyze-error');
  const btn = document.getElementById('analyze-btn');
  errorBox.innerHTML = '';

  if (!fileInput.files[0]) {
    errorBox.innerHTML = `<div class="error-banner">Please choose a PDF file first.</div>`;
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Analyzing... (this can take a few seconds)';

  const formData = new FormData();
  formData.append('resume', fileInput.files[0]);

  try {
    const res = await authFetch('/api/resume/analyze', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || 'Analysis failed');

    document.getElementById('score-display').textContent = `${data.score}/100`;
    fillList('strengths-list', data.strengths);
    fillList('gaps-list', data.gaps);
    fillList('suggestions-list', data.suggestions);
    document.getElementById('result-card').style.display = 'block';
  } catch (err) {
    errorBox.innerHTML = `<div class="error-banner">${err.message}</div>`;
  } finally {
    btn.disabled = false;
    btn.textContent = 'Analyze resume';
  }
});

function fillList(id, items) {
  const el = document.getElementById(id);
  el.innerHTML = (items || []).map((item) => `<li>${item}</li>`).join('');
}
