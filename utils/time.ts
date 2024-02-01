export const getFormatDayAndTime = (date: Date) => {
// use current timezone and format date and time
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const day = date.toLocaleDateString('en-CA', {timeZone}); // 'en-CA' format gives "YYYY-MM-DD"
const time = date.toLocaleTimeString('it-IT', {timeZone, hour: '2-digit', minute:'2-digit'}); // 'it-IT' format gives "HH:MM"
  return {
    day,
    time,
  }
}