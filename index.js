class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = document.querySelector(selector);
    this.targetDate = targetDate;
    this.refs = {
      days: this.selector.querySelector('[data-value="days"]'),
      hours: this.selector.querySelector('[data-value="hours"]'),
      mins: this.selector.querySelector('[data-value="mins"]'),
      secs: this.selector.querySelector('[data-value="secs"]')
    };
    this.start();
  }

  start() {
    let dateNow = Date.now();
    if (this.checkDate(dateNow)) {
      return;
    }
    this.math(dateNow);
    this.timer = setInterval(() => {
      dateNow = Date.now();
      if (this.checkDate(dateNow)) {
        this.stop();
        return;
      }
      this.math(dateNow);
    }, 1000);
  }

  checkDate(dateNow) {
    return dateNow >= this.targetDate.getTime();
  }

  math(date) {
    const time = this.targetDate - date;
    /*
     * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
     * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
     */
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    /*
     * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
     * остатка % и делим его на количество миллисекунд в одном часе
     * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
     */
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    /*
     * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
     * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
     */
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

    /*
     * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
     * миллисекунд в одной секунде (1000)
     */
    const secs = Math.floor((time % (1000 * 60)) / 1000);
    this.updateClockface(days, hours, mins, secs);
  }

  stop() {
    clearInterval(this.timer);
  }

  updateClockface(...args) {
    args.map((e, i) => {
      Object.values(this.refs)[i].textContent = this.pad(e);
    });
  }
  pad(value) {
    return String(value).padStart(2, "0");
  }
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("2019-07-06T00:47:50")
});
