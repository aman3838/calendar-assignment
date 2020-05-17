import React, { Component } from 'react';
import WeekHeadingRow from './WeekHeadingRow';
import WeekEvents from './WeekEvents';
import AddEvent from './modals/AddEvent';
import UpdateEvent from './modals/UpdateEvent';
import EventDetails from './modals/EventDetails';
import { removeEvent } from '../utils/eventsFormatFunctions'

class Calendar extends Component {
	constructor() {
        super();
        this.state = {
			isAddEventModalOpen: false,
			isEventDetailsModalOpen: false,
			isUpdateEventModalOpen: false,
			events: {
				eventList : [{
					id: '1',
					date: '05-04-2020',
					meetBy: 'John carter',
					time: 14
				}, {
					id: '3',
					date: '05-05-2020',
					meetBy: 'Leon carter',
					time: 9
				}],
				repeatEvents: [{
					id: '2',
					date: '05-04-2020',
					meetBy: 'John carter',
					time: 16,
					endDate: null,
					isRepeat: true
				}]
			},
			addEvent: {
				date: null,
				time: null
			},
			eventDetailsModal: {
				date: null,
				time: null,
				event: null
			}
        }
	}

	openModal = (e, type, cb=()=>{}) => {
		e && e.preventDefault();
        this.setState({
            ...this.state,
            [type]: true
        }, () => {cb()});
    }
    
    closeModal = (type) => {
        this.setState({
            ...this.state,
            [type]: false
        });
	}
	
	onEventClick = (eventType, eventDetails, date, time) => {
		const type = eventType === "isAddEventModalOpen" ? "addEvent": "eventDetailsModal";
		this.setState({
			...this.state,
			[type]: {
				date,
				time,
				event: eventDetails
			}
		}, () => {
			this.openModal(null, eventType);
		})
	}

	addNewEvent = (eventDetails) => {
		if (eventDetails.isRepeat) {
			this.setState({
				...this.state,
				events: {
					...this.state.events,
					repeatEvents: [...this.state.events.repeatEvents, eventDetails]
				}
			}, () => {
				this.closeModal('isAddEventModalOpen');
			})
		}
		else {
			this.setState({
				...this.state,
				events: {
					...this.state.events,
					eventList: [...this.state.events.eventList, eventDetails]
				}
			}, () => {
				this.closeModal('isAddEventModalOpen');
			})
		}
	}

	onReschedule = () => {
		this.openModal(null, "isUpdateEventModalOpen", () => {
			this.closeModal("isEventDetailsModalOpen")
		});
	}

	onUpdate = (event, newDate, newTime, isRepeat) => {
		const allEvents = removeEvent(event, {...this.state.events});
		let updatedEvent = {
			id: event.id,
			date: newDate,
			meetBy: event.meetBy,
			time: newTime,
			endDate: null,
		};
		if (isRepeat) {
			updatedEvent = {
				...updatedEvent,
				isRepeat: true
			}
			this.setState({
				...this.state,
				events: {
					...allEvents,
					repeatEvents: [...allEvents.repeatEvents, updatedEvent]
				}
			}, () => {this.closeModal("isUpdateEventModalOpen")})
		} else {
			this.setState({
				...this.state,
				events: {
					...allEvents,
					eventList: [...allEvents.eventList, updatedEvent]
				}
			}, () => {this.closeModal("isUpdateEventModalOpen")})
		}
	}
	
	render() {
		return (
			<div className="calendar">
				<WeekHeadingRow
					startDate={new Date('05-03-2020')}
					endDate={new Date('05-09-2020')}
				/>
				<WeekEvents
					startDate={new Date('05-03-2020')}
					endDate={new Date('05-09-2020')}
					onEventClick={this.onEventClick}
					events={this.state.events}
				/>
				{/* Modal */}
				<AddEvent
					isOpen={this.state.isAddEventModalOpen}
					onRequestClose={() => {this.closeModal('isAddEventModalOpen')}}
					formSubmit={this.addNewEvent}
					date={this.state.addEvent.date}
					time={this.state.addEvent.time}

				/>
				{/* Modal */}
				<UpdateEvent
					isOpen={this.state.isUpdateEventModalOpen}
					onRequestClose={() => {this.closeModal('isUpdateEventModalOpen')}}
					onUpdate={this.onUpdate}
					event={this.state.eventDetailsModal.event}
					startDate={new Date('05-03-2020')}
					endDate={new Date('05-09-2020')}
					allEvents={this.state.events}
				/>
				<EventDetails
					isOpen={this.state.isEventDetailsModalOpen}
					onRequestClose={() => {this.closeModal('isEventDetailsModalOpen')}}
					onReschedule={this.onReschedule}
					event={this.state.eventDetailsModal.event}
				/>
			</div>
		);
	} 
}

export default Calendar;