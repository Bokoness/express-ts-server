import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
// import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime"
import updateLocale from "dayjs/plugin/updateLocale"
import "dayjs/locale/he"

dayjs.extend(utc)
// dayjs.extend(timezone);
dayjs.extend(relativeTime)
dayjs.extend(updateLocale)

dayjs.updateLocale("he", {
  relativeTime: {
    future: "בעוד %s",
    past: "לפני %s",
    s: "כמה רגעים",
    m: "דקה",
    mm: "%d דקות",
    h: "שעה",
    hh: "%d שעות",
    d: "יום",
    dd: "%d ימים",
    M: "חודש",
    MM: "%d חודשים",
    y: "שנה",
    yy: "%d שנים",
  },
})

const dayStringMap = {
  0: { he: "ראשון" },
  1: { he: "שני" },
  2: { he: "שלישי" },
  3: { he: "רביעי" },
  4: { he: "חמישי" },
  5: { he: "שישי" },
  6: { he: "שבת" },
}

export default class Times {
  static formatTime(time) {
    return dayjs(time).format("DD.MM.YY HH:mmA")
  }
  static extractDateString(date = new Date(), isRtl = false) {
    const format = isRtl ? "YYYY-MM-DD" : "DD-MM-YYYY"
    return date ? dayjs(date).format(format) : ""
  }
  static extractTimeString(date) {
    return date ? dayjs(date).format("HH:mm") : ""
  }
  static extractDayString(date) {
    let dayCode = dayjs(date).day()
    return dayStringMap[dayCode].he
  }
  static setDateTime(date, time) {
    date = dayjs(date)
    let dateStr = this.extractDateString(date)
    dateStr += `T${time}`
    return dayjs(dateStr)
  }
  static isSameDay(d1, d2) {
    return this.extractDateString(d1) === this.extractDateString(d2)
  }
  static clacRelativeTimeString(date) {
    return dayjs(date).locale(this.$i18n.locale).fromNow()
  }
  static sortByISODate(dateISO1, dateISO2) {
    const date1 = new Date(dateISO1)
    const date2 = new Date(dateISO2)
    return date1 > date2 ? -1 : date1 < date2 ? 1 : 0
  }

  //checking if x's day is between y1, y2 days, or same as one
  static isSameOrBetweenDays(x, y1, y2) {
    x = dayjs(x)
    y1 = dayjs(y1)
    y2 = dayjs(y2)
    return (
      x.isBetween(y1, y2) || this.isSameDay(x, y1) || this.isSameDay(x, y2)
    )
  }

  //checking x's range overlaps with y's range
  static overLaps(xStart, xEnd, yStart, yEnd) {
    xStart = dayjs(xStart)
    xEnd = dayjs(xEnd)
    yStart = dayjs(yStart)
    yEnd = dayjs(yEnd)
    return (
      xStart.isBetween(yStart, yEnd) ||
      (xStart.isSameOrBefore(yStart) && (!xEnd || xEnd.isSameOrAfter(yEnd)))
    )
  }
}
