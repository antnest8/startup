
export class UserInstance{
    userName;
    initials;
    x;
    y;
    isTalking;

    constructor(userName, initials){
        this.userName = userName;
        this.x = 0;
        this.y = 0;
        this.initials = initials;
        this.isTalking = false;
    }

}