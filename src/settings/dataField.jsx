import React from 'react';
import { generateInitials } from './settingsUtils.js'

export function DataField(props){
    const purpose = props.purpose;
    const fieldDisplayName = props.fieldDisplayName;
    const fieldData = props.fieldData;
    const changeFunction = props.changeFunction;
    const [isEditing, changeIsEditing] = React.useState(false);

    function saveData(field, value){
        fetch(`api/user/data/${field}`, {
            method:"PUT",
            body: JSON.stringify({
                "value":value
            }),
            headers:{
                "Content-type":"application/json; charset=UTF-8"
            }
        }).then((response)=>{
            if(!response.ok){
                throw new Error(response.status);
            }
        })
        .catch((err)=>{
            window.alert(err)
        })
        .finally(()=>{
            console.log("Data saved correctly")
        })
    }

    function saveChanges(value){
        changeFunction(value);
        saveData(purpose,value)
        changeIsEditing(false);
    }

    const normalField = () => {
        return (<div className="flex">
            <input className="bg-stone-900 outline-2 outline-solid outline-stone-700 rounded-full text-stone-300 pl-2 grow" type={purpose === "password" ? "password" : "text"} defaultValue={fieldData} disabled id="user-email-output"></input>
        </div>);
    }

    const editField = () => {
        return (<div>
            <h3>{fieldDisplayName}: </h3>
            <input className="max-w-100 w-1/1 bg-stone-900 outline-2 outline-solid outline-stone-700 rounded-full text-stone-300 pl-2" type="text" id={"user-" + purpose + "-input"}/>
        </div>);
    }

    const editButton = () => {
        return <button className="flex justify-end text-xs text-stone-400 hover:text-cyan-800" id="change-email-button" onClick={() => changeIsEditing(true)} type="button">Change {purpose}</button>
    }

    const submitEditButton = () => {
        return <button className="flex justify-end text-xs text-stone-400 hover:text-cyan-800" id="change-email-button" onClick={(e) => {saveChanges(document.getElementById("user-" + purpose + "-input").value)}} type="button">Save new {purpose}</button>
    }

    return (
        <div className="flex justify-center">
            <div className="flex flex-col mt-[1em] max-w-120 grow relative left-10">
                <h3>{purpose}: </h3>
                {isEditing ? editField() : normalField()}
                <div className="flex justify-end">
                    {isEditing ? submitEditButton() : editButton()}
                </div>
            </div>
        </div>
    );
}