import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { formatDate } from '../../utils/dateTimeFunctions';
 
Modal.setAppElement('#root')
 
function EventDetails(props) {
    const [state, updateState] = useState({
        repeat: false,
        showErr: false
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

    function reschedule() {
        props.onReschedule();
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
            <span className="block font-bold text-2xl">{props.event?.meetBy}</span>
            <span className="block font-bold text-xs">
                {formatDate(props.date, props.time) || "05-03-2020 10:00 am"}
            </span>
            {repeatDiv()}
            <span className="flex content-end align-bottom justify-between mt-5">
                <button className="bg-orange-400 hover:bg-orange-500 text-white text-sm py-1 px-4 border border-orange-500 rounded flex flex-row focus:outline-none"
                    onClick={reschedule}
                >
                    <img className="inline-block w-4 mr-1 self-center" src="icon-calendar.png" alt="Repeat"></img>
                    Reschedule
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