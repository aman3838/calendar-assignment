import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { format } from 'date-fns';
import { get12HoursTime, generateTimeArr, getDatesBetweenTwoDates, checkIsBlocked } from '../../utils/dateTimeFunctions';
import { checkEventExist } from '../../utils/eventsFormatFunctions';
import { BLOCKED_TIME } from '../../constants/constant';

 
Modal.setAppElement('#root')
 
function EventDetails(props) {
    const [state, updateState] = useState({
        repeat: false,
        showErr: false,
        timeSelected: null,
        dateSelected: null

    });

    function reset() {
        updateState({
            repeat: false,
            showErr: false
        })
    }

    useEffect(() => {
        reset()
    }, [props.isOpen]);

    function toggleRepeat() {
        updateState({
            ...state,
            repeat: !state.repeat
        })
    }

    function dropdownSelect(e, type) {
        const value = e.target.value;
        updateState({
            ...state,
            [type]: value
        })
    }

    function errorSpan() {
        if (state.showErr)
            return (<span className="error-span text-red-500 text-xs absolute top-0 ml-16 mt-4">Event already exist on this date and time.</span>)
        return null
    }

    function repeatDiv() {
        if (!state.repeat) {
            return (<span className="block font-bold text-sm text-teal-400 cursor-pointer leading-loose mt-3" onClick={toggleRepeat}> 
                <img className="inline-block w-5 mr-1" src="icon-reboot.png" alt="Repeat"></img>
                Repeats every day
            </span>)
        }
        return (
            <span className="block font-bold text-sm text-red-400 cursor-pointer leading-loose mt-3" onClick={toggleRepeat}> 
                Do not repeat
            </span>
        )
    }

    function onUpdate() {
        if (!state.timeSelected || !state.dateSelected)
            return;
        if (checkEventExist(props.allEvents, state.dateSelected, parseInt(state.timeSelected))) {
            updateState({
                ...state,
                showErr: true
            })
            return;
        }
        props.onUpdate(props.event, state.dateSelected, parseInt(state.timeSelected), state.repeat);
    }

    function generateTimeDropdown() {
        let timeArr = generateTimeArr();
        timeArr = timeArr.filter(time => {
            if(BLOCKED_TIME.indexOf(time) >= 0)
                return false;
            return true;
        })
        return (
            <select className="inline-block appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-3 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ml-3 cursor-pointer"
                onChange={(e) => {dropdownSelect(e, 'timeSelected')}}
            >
                <option disabled selected>Please Select</option>
                {timeArr.map(time => {
                    return (
                        <option value={time}>{get12HoursTime(time)}</option>
                    )
                })}
            </select>
        )
    }

    function generateDateDropdown() {
        let datesArr = getDatesBetweenTwoDates(props.startDate, props.endDate);
        datesArr = datesArr.filter(date => {
            if (checkIsBlocked(date))
                return false;
            return true;
        })
        return (
            <select className="inline-block appearance-none w-40 bg-gray-200 border border-gray-200 text-gray-700 py-3 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 cursor-pointer"
                onChange={(e) => {dropdownSelect(e, 'dateSelected')}}
            >
                <option disabled selected>Please Select</option>
                {datesArr.map(date => {
                    return (
                        <option value={date}>{format(new Date(date), 'cccc, LLL dd')}</option>
                    )
                })}
            </select>
        )
    }

    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            className="add-event-modal modal p-12 rounded-xl flex flex-col focus:outline-none"
        >
            <span className="absolute top-0 left-0 p-2 cursor-pointer" onClick={props.onRequestClose}>
                <img src="icons-close.png" alt="Close"/>
            </span>
            {errorSpan()}
            <span className="block font-bold text-2xl">{props.event?.meetBy}</span>
            <span className="flex font-bold text-xs">
                {generateDateDropdown()}
                {generateTimeDropdown()}
                {/* {formatDate(props.date, props.time) || "05-03-2020 10:00 am"} */}
            </span>
            {repeatDiv()}
            <span className="flex content-end align-bottom justify-between mt-5">
                <button className="bg-orange-400 hover:bg-orange-500 text-white text-sm py-1 px-4 border border-orange-500 rounded flex flex-row focus:outline-none"
                    onClick={onUpdate}
                >
                    <img className="inline-block w-4 mr-1 self-center" src="icon-calendar.png" alt="Repeat"></img>
                    Update
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white text-sm py-1 px-4 border border-red-700 rounded flex flex-row focus:outline-none"
                    onClick={props.onRequestClose}
                >
                    <img className="inline-block w-4 mr-1 self-center" src="icon-cancel.png" alt="Repeat"></img>
                    Cancel
                </button>
            </span>
        </Modal>
    );
}

export default EventDetails;