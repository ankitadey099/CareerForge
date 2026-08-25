document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const submitBtn = document.getElementById('submit-btn');
  const errorBox = document.getElementById('error-box');
  errorBox.innerHTML = '';

  submitBtn.disabled = true;
  submitBtn.textContent = 'Logging in...';

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Login failed');
    }

    setSession(data.token, data.user);
    window.location.href = 'dashboard.html';
  } catch (err) {
    errorBox.innerHTML = `<div class="error-banner">${err.message}</div>`;
    submitBtn.disabled = false;
    submitBtn.textContent = 'Log in';
  }
});
