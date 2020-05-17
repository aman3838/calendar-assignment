import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { uniqueNum } from '../../utils/utility';
import { formatDate } from '../../utils/dateTimeFunctions'
 
Modal.setAppElement('#root')
 
function AddEvent(props) {
    const [state, updateState] = useState({
        name: null,
        repeat: false,
        showErr: false
    });

    useEffect(() => {
        reset()
    }, [props.isOpen]);
    
    function reset() {
        updateState({
            name: null,
            repeat: false,
            showErr: false
        })
    }

    function onNameChange(e) {
        const name = e.target.value;
        if (state.showErr && name.trim()) {
            updateState({
                ...state,
                showErr: false,
                name
            })
        } else {
            updateState({
                ...state,
                name
            })
        }
    }

    function toggleRepeat() {
        updateState({
            ...state,
            repeat: !state.repeat
        })
    }

    function repeatDiv() {
        if (!state.repeat) {
            return (<span className="block font-bold text-sm text-teal-400 cursor-pointer leading-loose" onClick={toggleRepeat}> 
                <img className="inline-block w-5 mr-1" src="icon-reboot.png" alt="Repeat"></img>
                Repeats every day
            </span>)
        }
        return (
            <span className="block font-bold text-sm text-red-400 cursor-pointer leading-loose" onClick={toggleRepeat}> 
                Do not repeat
            </span>
        )
    }

    function errorSpan() {
        if (state.showErr)
            return (<span className="error-span text-red-500 text-xs absolute bottom-0">Please enter the name.</span>)
        return null
    }

    function submitForm() {
        if (!state.name || !state.name.trim()) {
            updateState({
                ...state,
                showErr: true
            })
            return;
        }
        const event = {
            id: uniqueNum(),
            date: props.date,
            time: props.time,
            isRepeat: state.repeat,
            meetBy: state.name,
            endDate: null
        }
        props.formSubmit(event);
        reset();
    }

    const inputClasses = state.showErr ? "border-red-300" : "border-gray-300";

    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            className="add-event-modal modal p-8 rounded-xl flex flex-col focus:outline-none"
        >
            <span className="absolute top-0 left-0 p-2 cursor-pointer" onClick={props.onRequestClose}>
                <img src="icons-close.png" alt="Close"/>
            </span>
            <span className="block font-bold text-2xl">Please enter details</span>
            <span className="block font-bold text-xs">
                {formatDate(props.date, props.time) || "05-03-2020 10:00 am"}
            </span>
            <span className="block relative">
                <input className={`bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal my-2 ${inputClasses}`}
                    type="text"
                    placeholder="Meeting with"
                    value={state.name}
                    onChange={onNameChange}
                    />
                {errorSpan()}
            </span>
            {repeatDiv()}
            <span className="flex content-end align-bottom justify-evenly mt-5">
                <button className="bg-orange-400 hover:bg-orange-500 text-white text-sm py-1 px-4 border border-orange-500 rounded flex flex-row focus:outline-none"
                    onClick={submitForm}
                >
                    <img className="inline-block w-4 mr-1 self-center" src="icon-calendar.png" alt="Repeat"></img>
                    Confirm
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

export default AddEvent;