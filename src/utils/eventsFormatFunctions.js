import { isDatesEqual, compareDates } from './dateTimeFunctions';

function eventByDateTime(eventsObj, date, time) {
    let dateEvents = []
    let singleDateEvents =  eventsObj.eventList.filter(event => {
      if (isDatesEqual(event.date, date) && event.time === time)
        return true;
      return false;
    })

    let eventFromRepeatedEvents = eventsObj.repeatEvents.filter(event => {
      if (event.endDate && compareDates(date, event.endDate) > 0) {
        return false;
      }
      if (event.time === time && compareDates(date, event.date) >= 0 ) {
        return true
      }
      return false;
    })

    return dateEvents.concat(singleDateEvents).concat(eventFromRepeatedEvents);
}

function checkEventExist(allEvents, date, time) {
    let bool = false;
    bool = allEvents.eventList.some(event => {
        if (isDatesEqual(event.date, date) && event.time === time)
            return true;
        return false;
    })

    if (bool) return true;
    bool = allEvents.repeatEvents.some(event => {
        if (event.endDate && compareDates(date, event.endDate) > 0) {
            return false;
        }
        if (event.time === time && compareDates(date, event.date) >= 0 ) {
            return true;
        }
        return false;
    })
    return bool;
}

function removeEvent(oldEvent, allEvents) {
    if (oldEvent.isRepeat) {
        allEvents.repeatEvents = allEvents.repeatEvents.filter(event => event.id !== oldEvent.id)
    } else {
        allEvents.eventList = allEvents.eventList.filter(event => event.id !== oldEvent.id)
    }
    return allEvents;
}

export {
    eventByDateTime,
    checkEventExist,
    removeEvent
}