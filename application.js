requireLogin();
renderNavbar('applications');

const STATUS_BADGE_CLASS = {
  Applied: 'badge-applied',
  'OA/Screening': 'badge-oa',
  Interviewing: 'badge-interviewing',
  Offer: 'badge-offer',
  Rejected: 'badge-rejected',
};

const STATUSES = ['Applied', 'OA/Screening', 'Interviewing', 'Offer', 'Rejected'];

document.getElementById('new-app-btn').addEventListener('click', () => {
  document.getElementById('new-app-form').style.display = 'block';
});
document.getElementById('cancel-app-btn').addEventListener('click', () => {
  document.getElementById('new-app-form').style.display = 'none';
});

document.getElementById('save-app-btn').addEventListener('click', async () => {
  const company = document.getElementById('company').value.trim();
  const role = document.getElementById('role').value.trim();
  const status = document.getElementById('status').value;
  const appliedDate = document.getElementById('appliedDate').value;
  const notes = document.getElementById('notes').value.trim();
  const errorBox = document.getElementById('form-error');
  errorBox.innerHTML = '';

  if (!company || !role) {
    errorBox.innerHTML = `<div class="error-banner">Company and role are required.</div>`;
    return;
  }

  try {
    const res = await authFetch('/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ company, role, status, appliedDate, notes }),
    });
    if (!res.ok) throw new Error('Failed to save application');

    document.getElementById('company').value = '';
    document.getElementById('role').value = '';
    document.getElementById('appliedDate').value = '';
    document.getElementById('notes').value = '';
    document.getElementById('new-app-form').style.display = 'none';
    loadApplications();
  } catch (err) {
    errorBox.innerHTML = `<div class="error-banner">${err.message}</div>`;
  }
});

async function updateStatus(id, newStatus) {
  await authFetch(`/api/applications/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: newStatus }),
  });
  loadApplications();
}

async function deleteApplication(id) {
  if (!confirm('Delete this application?')) return;
  await authFetch(`/api/applications/${id}`, { method: 'DELETE' });
  loadApplications();
}

async function loadApplications() {
  try {
    const res = await authFetch('/api/applications');
    const apps = await res.json();

    document.getElementById('apps-loader').style.display = 'none';

    if (apps.length === 0) {
      document.getElementById('apps-empty').style.display = 'block';
      document.getElementById('apps-table').style.display = 'none';
      return;
    }

    document.getElementById('apps-empty').style.display = 'none';
    document.getElementById('apps-table').style.display = 'table';

    const tbody = document.getElementById('apps-tbody');
    tbody.innerHTML = apps
      .map(
        (app) => `
        <tr>
          <td>${escapeHtml(app.company)}</td>
          <td>${escapeHtml(app.role)}</td>
          <td>
            <select onchange="updateStatus(${app.id}, this.value)" style="width:auto; padding:4px 8px; font-size:0.8rem;">
              ${STATUSES.map(
                (s) => `<option value="${s}" ${s === app.status ? 'selected' : ''}>${s}</option>`
              ).join('')}
            </select>
          </td>
          <td>${app.applied_date || '—'}</td>
          <td><button class="btn btn-danger btn-sm" onclick="deleteApplication(${app.id})">Delete</button></td>
        </tr>`
      )
      .join('');
  } catch (err) {
    document.getElementById('apps-loader').textContent = 'Could not load applications.';
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

loadApplications();
