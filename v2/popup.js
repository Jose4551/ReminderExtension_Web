
//getting element by ID to redirect to the webpage separately
document.getElementById("b1").addEventListener("click", () => {
  const url = document.getElementById("urlIn").value;
  chrome.tabs.create({ url });
});

let intervalId = null; // for single countdown

//converting seconds into seconds and minutes
function formatMMSS(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return m + ':' + s.toString().padStart(2, '0');
}

// display initial top counter
const counterElInit = document.getElementById("counter");
if (counterElInit) counterElInit.textContent = formatMMSS(0);

document.getElementById("b2").addEventListener("click", () => {
  startCountdown();
});

// starting countdown 
function startCountdown() {
  const minutesEl = document.getElementById("min");
  const counterEl = document.getElementById("counter");
  if (!minutesEl || !counterEl) return;

  const minutes = parseInt(minutesEl.value, 10);

  // for negative time
  if (isNaN(minutes) || minutes <= 0) {
    counterEl.textContent = formatMMSS(0);
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    return;
  }

  let remainingSeconds = minutes * 60;

  // initialize display
  counterEl.textContent = formatMMSS(remainingSeconds);

  // only one timer at a time
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }

  intervalId = setInterval(() => {
    remainingSeconds--;

    if (remainingSeconds > 0) {
      counterEl.textContent = formatMMSS(remainingSeconds);
    } else {
      // conditions for alerts at 5 min and 50 seconds
      counterEl.textContent = formatMMSS(0);
      clearInterval(intervalId);
      intervalId = null;
    }
    if (remainingSeconds ==290){
      alert("!!Be careful you have less than 5 minutes to complete your task");
    }
    if (remainingSeconds ==110){
      alert("!!Complete your task");
    }
  
  }, 1000);
}

console.log("This is useful!");

// auto creation for dynamic blocks
document.getElementById('addReminderBtn').addEventListener('click', () => {
  const container = document.getElementById('remindersContainer');
  const reminder = document.createElement('div');
  reminder.className = 'reminder';
  reminder.innerHTML = `
    <p>Register your reminder</p>
    <input class="container" type="text" placeholder="URL">
    <p>Add time to be completed in minutes</p>
    <input class="container" type="number" placeholder="Minutes">
    <div class="buttons">
      <button class="registerBtn">Register</button>
      <button class="b1">Go</button>
    </div>
    <div class"container">Time remaining</div>
    <div class="counter">1000</div>
  `;
  container.insertBefore(
    reminder,
    document.getElementById('addReminderBtn').previousElementSibling
  );

  // logic for timer of each new block
  const ctr = reminder.querySelector('.counter');
  if (ctr) ctr.textContent = formatMMSS(0);
  reminder._intervalId = null;
});

// buttons events for each new button at new block
document.getElementById('remindersContainer').addEventListener('click', (e) => {
  const reminder = e.target.closest('.reminder');
  if (!reminder) return; // clicked outside a reminder block

  // start timer after pressing the buton
  if (e.target.classList.contains('registerBtn')) {
    const minutesInput = reminder.querySelector('input[type="number"]');
    const counterEl = reminder.querySelector('.counter');
    if (!minutesInput || !counterEl) return;

    const minutes = parseInt(minutesInput.value, 10);

    // Clear any previous countdown 
    if (reminder._intervalId) {
      clearInterval(reminder._intervalId);
      reminder._intervalId = null;
    }

    // seconds into minutes and seconds
    if (isNaN(minutes) || minutes <= 0) {
      counterEl.textContent = formatMMSS(0);
      return;
    }

    let remainingSeconds = minutes * 60;
    counterEl.textContent = formatMMSS(remainingSeconds);

   
// starting countdown
reminder._intervalId = setInterval(() => {
  remainingSeconds--;

  if (remainingSeconds > 0) {
    counterEl.textContent = formatMMSS(remainingSeconds);
  } else {
    counterEl.textContent = formatMMSS(0);
    clearInterval(reminder._intervalId);
    reminder._intervalId = null;
  }

  // alerts for dynamic block at 5 min and 50 sec
  if (remainingSeconds === 290) {
    alert("!!Be careful you have less than 5 minutes to complete your task");
  }
  if (remainingSeconds === 50) {
    alert("!!Complete your task");
  }
}, 1000);
  }

  // go event for dynamic block
  if (e.target.classList.contains('b1')) {
    const urlInput = reminder.querySelector('input[type="text"]');
    if (!urlInput) return;

    const url = urlInput.value.trim();
    if (url) {
      chrome.tabs.create({ url });
    }
  }
});
