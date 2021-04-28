/**
 * Every action, like addVideo, addUser should return ActionResult to the controller
 * The main purpose of the class is to structure the response of every action.
 * 
 * Usage:
 * 
 * i) To create a success action
 * return new ActionResult(true, "user added successfully", {userId})
 * 
 * ii) To create a failed action
 * return new ActionResult(false, "username already in use")
 * 
 */
class ActionResult {

    constructor(isSuccess, message, data={}) {
        this.isSuccess = isSuccess
        this.message = message
        this.data=data
    }
}

module.exports = ActionResult;
