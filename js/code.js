let timer;
let _seconds = 1000;
let _minutes = _seconds * 60;
let _hours = _minutes * 60;
let _days = _hours * 24;

//Date format "YYYY/MM/DD"
//Make sure newly added dates are in ascending chronological order in the array.
const eventDates = ["2023/01/01"];

$(document).ready(() => (timer = setInterval(countdown, 1000)));

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
    $(".timer").hide("medium");
  }
  let days = Math.floor(dateDifference / _days);
  let hours = Math.floor((dateDifference % _days) / _hours);
  let minutes = Math.floor((dateDifference % _hours) / _minutes);
  let seconds = Math.floor((dateDifference % _minutes) / _seconds);

  $("#days span").text(days);
  $("#hours span").text(hours);
  $("#minutes span").text(minutes);
  $("#seconds span").text(seconds);
}
