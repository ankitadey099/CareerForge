requireLogin();
renderNavbar('coach');

const chatWindow = document.getElementById('chat-window');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

function addBubble(text, sender) {
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${sender}`;
  bubble.textContent = text;
  chatWindow.appendChild(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function loadHistory() {
  try {
    const res = await authFetch('/api/coach/history');
    const history = await res.json();
    history.forEach((h) => {
      addBubble(h.query, 'user');
      addBubble(h.response, 'ai');
    });
  } catch (err) {
    console.error('Failed to load coach history', err);
  }
}

async function sendMessage() {
  const message = chatInput.value.trim();
  const errorBox = document.getElementById('chat-error');
  errorBox.innerHTML = '';
  if (!message) return;

  addBubble(message, 'user');
  chatInput.value = '';
  sendBtn.disabled = true;
  addBubble('Thinking...', 'ai');

  try {
    const res = await authFetch('/api/coach/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();

    chatWindow.removeChild(chatWindow.lastChild); // remove "Thinking..."

    if (!res.ok) throw new Error(data.error || 'Failed to get a response');

    addBubble(data.reply, 'ai');
  } catch (err) {
    if (chatWindow.lastChild && chatWindow.lastChild.textContent === 'Thinking...') {
      chatWindow.removeChild(chatWindow.lastChild);
    }
    errorBox.innerHTML = `<div class="error-banner">${err.message}</div>`;
  } finally {
    sendBtn.disabled = false;
  }
}

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

loadHistory();
