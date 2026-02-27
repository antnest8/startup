
export function generateInitials(displayName){
    const nameArray = displayName.split(' ');

    console.log("creating new initials...")

    if(nameArray.length < 2){
        return displayName.slice(0,2);
    }
    else{
        return nameArray[0][0] + nameArray[1][0]
    }
}