let timer;
const _seconds = 1000;
const _minutes = _seconds * 60;
const _hours = _minutes * 60;
const _days = _hours * 24;
let i = 0;
const btnAdd = document.querySelector("#btn-add");
btnAdd.addEventListener("click", (e) => addEvent(e));

//Date format "YYYY/MM/DD"
//Make sure newly added dates are in ascending chronological order in the array.
const events = [
  { title: "Event Title", description: "Event description", date: "2023/01/01" },
  { title: "Event Title 2", description: "Event description 2", date: "2023/01/02" },
];

window.addEventListener("load", () => {
  sortEvents();
  timer = setInterval(countdown, 1000);
  setEventInformation();
});

function setEventInformation() {
  let eventDescription = document.querySelector("#event-description");
  document.querySelector("#event-title").innerHTML = events[i].title;

  eventDescription === ""
    ? (eventDescription.style.display = "none")
    : (eventDescription.innerHTML = events[i].description);
}

function countdown() {
  if (events.length !== 0) {
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
  } else return;
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
