// Start at 0 and only one countdown
let intervalId = null;

document.getElementById("b1").addEventListener("click", () => {
  const url = document.getElementById("urlIn").value;
  chrome.tabs.create({ url });
});

// Display initial 0 in the counter at load
const counterElInit = document.getElementById("counter");
if (counterElInit) counterElInit.textContent = 0;

// Button b2 triggers the single countdown
document.getElementById("b2").addEventListener("click", () => {
  startCountdown();
});

// Single countdown on #counter
function startCountdown() {
  const minutesEl = document.getElementById("min");
  const counterEl = document.getElementById("counter");
  if (!minutesEl || !counterEl) return;

  const minutes = parseInt(minutesEl.value, 10);

  // If invalid or <= 0, show 0 and do nothing
  if (isNaN(minutes) || minutes <= 0) {
    counterEl.textContent = 0;
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    return;
  }

  let remainingSeconds = minutes * 60;

  // Initialize display
  counterEl.textContent = remainingSeconds;

  // Ensure only one countdown runs at a time
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }

  intervalId = setInterval(() => {
    remainingSeconds--;

    if (remainingSeconds > 0) {
      counterEl.textContent = remainingSeconds;
    } else {
      // Show 0 exactly and stop
      counterEl.textContent = 0;
      clearInterval(intervalId);
      intervalId = null;
    }
  }, 1000);
}

console.log("This is useful!");

// Dynamic reminder block (unchanged)
document.getElementById('addReminderBtn').addEventListener('click', () => {
  const container = document.getElementById('remindersContainer');
  const reminder = document.createElement('div');
  reminder.className = 'reminder';
  reminder.innerHTML = `
    <p>Register your reminder</p>
    <input type="text" placeholder="URL">
    <p>Add time to be completed in minutes</p>
    <input type="number" placeholder="Minutes">
    <div class="buttons">
      <button class="registerBtn">Register</button>
      <button class="b1">Go</button>
    </div>
    <div>Time remaining</div>
    <div class="counter">1000</div>
  `;
  container.insertBefore(reminder, document.getElementById('addReminderBtn').previousElementSibling);
});
