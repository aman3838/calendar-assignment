import { addDays, differenceInDays, getDay, compareAsc, format } from 'date-fns';
import { BLOCKED_TIME, WEEK_DAYS } from '../constants/constant';

function get12HoursTime(time) {
    if (time < 12)
        return `${time} AM`;
    if (time === 12)
        return `12 PM`;
    return `${time - 12} PM`;
}

function getDatesBetweenTwoDates(startDate, endDate) {
    const days = differenceInDays(endDate, startDate);
    return [...Array(days+1).keys()].map((i) => addDays(startDate, i));
}

function generateTimeArr() {
    const timeArr = [];
    for (let i = 0; i < 13; i++) {
        timeArr[i] = 8 + i;
    }
    return timeArr;
}
function convertTimeArrIn12Hours(timeArr) {
    return timeArr.map((time) => get12HoursTime(time));
}

function checkIsBlocked(date, time) {
    if (BLOCKED_TIME.indexOf(time) >= 0 || WEEK_DAYS[getDay(date)] === "Saturday" || WEEK_DAYS[getDay(date)] === "Sunday")
        return true;
    return false
}

function isDatesEqual(date1, date2) {
    return compareDates(date1, date2) === 0;
}

function compareDates(date1, date2) {
    const firstDate = new Date(date1);
    const sencondDate = new Date(date2);
    return compareAsc(firstDate, sencondDate);
}

function formatDate(date, time) {
    if (!date || !time) return null;
    return (`${format(new Date(date), 'cccc, LLL dd')} at ${get12HoursTime(time).toLowerCase()}`);
}

export {
    get12HoursTime,
    getDatesBetweenTwoDates,
    generateTimeArr,
    convertTimeArrIn12Hours,
    checkIsBlocked,
    isDatesEqual,
    compareDates,
    formatDate
}