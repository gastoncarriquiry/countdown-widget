let timer;
let _seconds = 1000;
let _minutes = _seconds * 60;
let _hours = _minutes * 60;
let _days = _hours * 24;

//Date format "YYYY/MM/DD"
//Make sure newly added dates are in ascending chronological order in the array.
const eventDates = ["2023/01/01"];

window.addEventListener("load", () => (timer = setInterval(countdown, 1000)));

function countdown() {
  let currentDate = new Date();
  let i = 0;
  let finalDate = new Date(eventDates[i]);
  let dateDifference = finalDate - currentDate;
  if (dateDifference < 0) {
    finalDate = new Date(eventDates[i + 1]);
    i++;
    return;
  }
  if (i > eventDates.length) {
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
