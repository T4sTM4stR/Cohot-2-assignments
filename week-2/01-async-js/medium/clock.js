let hours = 0;
let minutes = 0;
let seconds = 0;

function hrs() {
  return ++hours;
}
function min() {
  if (minutes >= 59) {
    minutes = 0;
    hrs();
  }
  return ++minutes;
}
function sec() {
  if (seconds >= 59) {
    seconds = 0;
    min();
  }
  return ++seconds;
}

const clock = () => {
  setInterval(sec, 1000);
  setInterval(min, 60 * 1000);
  setInterval(hrs, 60 * 60 * 1000);
  setInterval(() => {
    console.clear();
    console.log(`${hours}:${minutes}:${seconds}`);
  }, 1);
};

clock();
