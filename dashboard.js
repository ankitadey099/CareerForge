requireLogin();
renderNavbar('dashboard');

const user = getUser();
if (user) {
  document.getElementById('greeting').textContent = `Welcome back, ${user.name.split(' ')[0]}`;
}

async function loadStats() {
  try {
    const res = await authFetch('/api/dashboard');
    const data = await res.json();

    const statusMap = Object.fromEntries(
      data.applicationsByStatus.map((s) => [s.status, s.count])
    );

    const cards = [
      { label: 'Total Applications', value: data.totalApplications },
      { label: 'In Progress', value: (statusMap['Interviewing'] || 0) + (statusMap['OA/Screening'] || 0) },
      { label: 'Offers', value: statusMap['Offer'] || 0 },
      { label: 'Latest Resume Score', value: data.latestResumeScore !== null ? `${data.latestResumeScore}/100` : '—' },
      { label: 'Coach Conversations', value: data.coachInteractions },
      { label: 'Avg Interview Score', value: data.avgInterviewScore !== null ? `${data.avgInterviewScore}/10` : '—' },
    ];

    const grid = document.getElementById('stat-grid');
    grid.innerHTML = cards
      .map(
        (c) => `
        <div class="stat-card">
          <div class="stat-num">${c.value}</div>
          <div class="stat-label">${c.label}</div>
        </div>`
      )
      .join('');

    document.getElementById('stats-loader').style.display = 'none';
    grid.style.display = 'grid';
  } catch (err) {
    document.getElementById('stats-loader').textContent = 'Could not load stats. Try refreshing.';
  }
}

loadStats();
