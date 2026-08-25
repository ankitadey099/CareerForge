requireLogin();
renderNavbar('profile');

const fields = ['headline', 'targetRole', 'skills', 'education', 'bio'];
const fieldToDbKey = {
  headline: 'headline',
  targetRole: 'target_role',
  skills: 'skills',
  education: 'education',
  bio: 'bio',
};

async function loadProfile() {
  try {
    const res = await authFetch('/api/profile');
    const data = await res.json();
    fields.forEach((f) => {
      const el = document.getElementById(f);
      if (el && data[fieldToDbKey[f]]) el.value = data[fieldToDbKey[f]];
    });
  } catch (err) {
    console.error('Failed to load profile', err);
  }
}

document.getElementById('profile-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const submitBtn = document.getElementById('submit-btn');
  const statusBox = document.getElementById('status-box');
  statusBox.innerHTML = '';
  submitBtn.disabled = true;
  submitBtn.textContent = 'Saving...';

  const payload = Object.fromEntries(fields.map((f) => [f, document.getElementById(f).value.trim()]));

  try {
    const res = await authFetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to save profile');

    statusBox.innerHTML = `<div class="success-banner">Profile saved.</div>`;
  } catch (err) {
    statusBox.innerHTML = `<div class="error-banner">${err.message}</div>`;
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Save profile';
  }
});

loadProfile();
