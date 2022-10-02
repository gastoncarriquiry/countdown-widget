let timer;
const _seconds = 1000;
const _minutes = _seconds * 60;
const _hours = _minutes * 60;
const _days = _hours * 24;
let i = 0;
const btnAdd = document.querySelector("#btn-add");
btnAdd.addEventListener("click", (e) => addEvent(e));

//Date format "YYYY/MM/DD"
const events = [{ title: "Event Title", description: "Event description", date: "2024/01/01" }];
// const events = [];

window.addEventListener("load", () => {
  if (events.length !== 0) {
    setTimeout(() => (document.querySelector("#countdown").style.display = "block"), 1000);
    sortEvents();
    timer = setInterval(() => {
      countdown(), renderNextUp();
    }, 1000);
    setEventInformation();
  }
  emptyForm();
});

function setEventInformation() {
  let eventDescription = document.querySelector("#event-description");
  document.querySelector("#event-title").innerHTML = events[i].title;

  eventDescription === ""
    ? (eventDescription.style.display = "none")
    : (eventDescription.innerHTML = events[i].description);
}

function countdown() {
  let currentDate = new Date();
  let finalDate = new Date(events[i].date);
  let dateDifference = finalDate - currentDate;
  if (dateDifference < 0) {
    finalDate = new Date(events[i + 1]);
    i++;
    return;
  }
  if (i > events.length) {
    document.querySelector(".timer").style.display = "none";
  }
  let days = Math.floor(dateDifference / _days);
  let hours = Math.floor((dateDifference % _days) / _hours);
  let minutes = Math.floor((dateDifference % _hours) / _minutes);
  let seconds = Math.floor((dateDifference % _minutes) / _seconds);

  document.querySelector("#days span").innerText = days;
  document.querySelector("#hours span").innerText = hours;
  document.querySelector("#minutes span").innerText = minutes;
  document.querySelector("#seconds span").innerText = seconds;
}

function renderNextUp() {
  const nextEvents = document.querySelector("#next-events");
  nextEvents.style.display = "flex";
  let currentDate = new Date();
  nextEvents.innerHTML = events
    .map((event) => {
      let finalDate = new Date(event.date);
      let dateDifference = finalDate - currentDate;

      let days = Math.floor(dateDifference / _days);
      let hours = Math.floor((dateDifference % _days) / _hours);
      let minutes = Math.floor((dateDifference % _hours) / _minutes);
      let seconds = Math.floor((dateDifference % _minutes) / _seconds);

      return `<div class="event">
            <h2>${event.title}</h2>
            <p>In ${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds.</p>
          </div>`;
    })
    .join(``);
}

function addEvent(e) {
  e.preventDefault();
  const eventTitle = document.querySelector("#title").value;
  const eventDescription = document.querySelector("#description").value;
  const eventDate = document.querySelector("#date").value;

  let currentDate = new Date();
  if (!eventTitle || !eventDate || new Date(eventDate) < currentDate)
    alert("Please enter a valid title and date for event.");
  else {
    events.push({
      title: eventTitle,
      description: eventDescription,
      date: eventDate,
    });
    emptyForm();
    sortEvents();
    setEventInformation();
  }
}

function sortEvents() {
  events.sort(function (a, b) {
    var c = new Date(a.date);
    var d = new Date(b.date);
    return c - d;
  });
}

function emptyForm() {
  document.querySelector("#title").value = "";
  document.querySelector("#description").value = "";
  document.querySelector("#date").value = "";
}
