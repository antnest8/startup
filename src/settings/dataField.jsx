import React from 'react';

export function DataField(props){
    const purpose = props.purpose;
    const fieldData = props.fieldData;
    const changeFunction = props.changeFunction;
    const [isEditing, changeIsEditing] = React.useState(false);

    function saveChanges(value){
        changeFunction(value);
        changeIsEditing(false);
    }

    const normalField = () => {
        return (<div>
            <h3 id="user-email">{purpose}: </h3>
            <p className="max-w-100 bg-stone-900 outline-2 outline-solid outline-stone-700 rounded-full text-stone-300 pl-2" id="user-email-output">{fieldData}</p>
        </div>);
    }

    const editField = () => {
        return (<div>
            <h3 id="user-email">{purpose}: </h3>
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
            <div className="flex flex-col mt-[1em] max-w-100 grow">
                {isEditing ? editField() : normalField()}
                <div className="flex justify-end">
                    {isEditing ? submitEditButton() : editButton()}
                </div>
            </div>
        </div>
    );
}

export function PasswordField(props){
    const purpose = props.purpose;
    const fieldData = props.fieldData;
    const [isHidden, changeHidden] = React.useState(true);
    
    return (
        <div className="flex justify-center">
            <div className="flex flex-col mt-[1em] max-w-120 grow relative left-10">
                <label htmlFor="user-password">{purpose}: </label>
                <div className="flex">
                    <input className=" bg-stone-900 outline-2 outline-solid outline-stone-700 rounded-full text-stone-300 pl-2 grow" type={isHidden ? "password" : "text"} disabled id="user-password" value={fieldData}/> 
                    <button className="bg-stone-500 border-stone-600 max-w-[8em] min-w-[5em] rounded-md border-solid border-2 min-h-[2em] text-sm ml-[10px] hover:bg-stone-700" onClick={() => changeHidden(!isHidden)} id="password-visibility-toggle">{isHidden ? "🙉" : "🙈"}</button>
                </div>
                <div className="flex justify-end">
                    <button className="flex relative right-20 justify-end text-xs text-stone-400 hover:text-cyan-800" id="change-password-button" type="button">Change {purpose}</button>
                </div>
            </div>
        </div>
    );
}