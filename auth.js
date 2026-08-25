function getToken() {
  return localStorage.getItem('cf_token');
}

function getUser() {
  const raw = localStorage.getItem('cf_user');
  return raw ? JSON.parse(raw) : null;
}

function setSession(token, user) {
  localStorage.setItem('cf_token', token);
  localStorage.setItem('cf_user', JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem('cf_token');
  localStorage.removeItem('cf_user');
}

function logout() {
  clearSession();
  window.location.href = 'login.html';
}


function requireLogin() {
  if (!getToken()) {
    window.location.href = 'login.html';
  }
}

async function authFetch(url, options = {}) {
  const headers = options.headers ? { ...options.headers } : {};
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    clearSession();
    window.location.href = 'login.html';
    throw new Error('Session expired');
  }

  return response;
}


function renderNavbar(active) {
  const slot = document.getElementById('navbar-slot');
  if (!slot) return;
  const user = getUser();

  const links = [
    { href: 'dashboard.html', label: 'Dashboard', key: 'dashboard' },
    { href: 'applications.html', label: 'Applications', key: 'applications' },
    { href: 'resume.html', label: 'Resume', key: 'resume' },
    { href: 'interview.html', label: 'Interview Prep', key: 'interview' },
    { href: 'coach.html', label: 'AI Coach', key: 'coach' },
    { href: 'profile.html', label: 'Profile', key: 'profile' },
  ];

  slot.innerHTML = `
    <nav class="navbar">
      <div class="container">
        <a href="dashboard.html" class="brand"><span class="spark">&#9670;</span> CareerForge</a>
        <div class="nav-links">
          ${links
            .map(
              (l) =>
                `<a href="${l.href}" class="${l.key === active ? 'active' : ''}">${l.label}</a>`
            )
            .join('')}
          <button class="logout-btn" onclick="logout()">Log out${
            user ? ` (${user.name.split(' ')[0]})` : ''
          }</button>
        </div>
      </div>
    </nav>
  `;
}
