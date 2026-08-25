requireLogin();
renderNavbar('interview');

let currentQuestion = null;

async function loadRoles() {
  try {
    const res = await authFetch('/api/interview/roles');
    const roles = await res.json();
    const select = document.getElementById('role-select');
    select.innerHTML = roles.map((r) => `<option value="${r}">${r}</option>`).join('');
  } catch (err) {
    console.error('Failed to load roles', err);
  }
}

async function getQuestion() {
  const role = document.getElementById('role-select').value;
  try {
    const res = await authFetch(`/api/interview/questions?role=${encodeURIComponent(role)}`);
    const questions = await res.json();
    if (questions.length === 0) return;

    currentQuestion = questions[Math.floor(Math.random() * questions.length)];
    document.getElementById('question-difficulty').textContent = currentQuestion.difficulty;
    document.getElementById('question-text').textContent = currentQuestion.question;
    document.getElementById('answer-input').value = '';
    document.getElementById('question-card').style.display = 'block';
    document.getElementById('feedback-card').style.display = 'none';
  } catch (err) {
    console.error('Failed to load question', err);
  }
}

async function submitAnswer() {
  const answer = document.getElementById('answer-input').value.trim();
  const errorBox = document.getElementById('answer-error');
  const btn = document.getElementById('submit-answer-btn');
  errorBox.innerHTML = '';

  if (!answer) {
    errorBox.innerHTML = `<div class="error-banner">Type an answer first.</div>`;
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Evaluating...';

  try {
    const res = await authFetch('/api/interview/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: currentQuestion.question, answer }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Evaluation failed');

    document.getElementById('feedback-score').textContent = `${data.score}/10`;
    document.getElementById('feedback-text').textContent = data.feedback;
    document.getElementById('feedback-hint').textContent = `A strong answer would include: ${data.modelAnswerHint}`;
    document.getElementById('feedback-card').style.display = 'block';
  } catch (err) {
    errorBox.innerHTML = `<div class="error-banner">${err.message}</div>`;
  } finally {
    btn.disabled = false;
    btn.textContent = 'Get feedback';
  }
}

document.getElementById('new-question-btn').addEventListener('click', getQuestion);
document.getElementById('submit-answer-btn').addEventListener('click', submitAnswer);

loadRoles();
