document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const submitBtn = document.getElementById('submit-btn');
  const errorBox = document.getElementById('error-box');
  errorBox.innerHTML = '';

  submitBtn.disabled = true;
  submitBtn.textContent = 'Creating account...';

  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Registration failed');
    }

    setSession(data.token, data.user);
    window.location.href = 'dashboard.html';
  } catch (err) {
    errorBox.innerHTML = `<div class="error-banner">${err.message}</div>`;
    submitBtn.disabled = false;
    submitBtn.textContent = 'Create account';
  }
});
